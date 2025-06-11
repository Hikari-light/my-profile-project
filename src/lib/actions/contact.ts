'use server'

import { supabase } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { FingerprintJS } from '@fingerprintjs/fingerprintjs'

// 生成设备指纹
async function getDeviceId() {
  const fp = await FingerprintJS.load()
  const result = await fp.get()
  return result.visitorId
}

// 检查提交限制
async function checkSubmissionLimit(deviceId: string) {
  const { data, error } = await supabase
    .from('submission_limits')
    .select('*')
    .eq('device_id', deviceId)
    .single()

  if (error) {
    console.error('Error checking submission limit:', error)
    return { canSubmit: true, remainingTime: 0 }
  }

  if (!data) {
    return { canSubmit: true, remainingTime: 0 }
  }

  const now = new Date()
  const lastSubmission = new Date(data.last_submission)
  const timeDiff = now.getTime() - lastSubmission.getTime()
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60))

  // 如果距离上次提交超过 24 小时，重置计数
  if (hoursDiff >= 24) {
    await supabase
      .from('submission_limits')
      .update({ count: 0, last_submission: now.toISOString() })
      .eq('device_id', deviceId)
    return { canSubmit: true, remainingTime: 0 }
  }

  // 如果 24 小时内提交次数达到限制
  if (data.count >= 5) {
    const remainingHours = 24 - hoursDiff
    return { canSubmit: false, remainingTime: remainingHours }
  }

  return { canSubmit: true, remainingTime: 0 }
}

// 更新提交记录
async function updateSubmissionRecord(deviceId: string) {
  const now = new Date().toISOString()
  
  const { data, error } = await supabase
    .from('submission_limits')
    .select('*')
    .eq('device_id', deviceId)
    .single()

  if (error || !data) {
    // 如果记录不存在，创建新记录
    await supabase
      .from('submission_limits')
      .insert({
        device_id: deviceId,
        count: 1,
        last_submission: now
      })
  } else {
    // 更新现有记录
    await supabase
      .from('submission_limits')
      .update({
        count: data.count + 1,
        last_submission: now
      })
      .eq('device_id', deviceId)
  }
}

// 提交表单
export async function submitContactForm(formData: FormData) {
  try {
    // 获取设备指纹
    const deviceId = await getDeviceId()
    
    // 检查提交限制
    const { canSubmit, remainingTime } = await checkSubmissionLimit(deviceId)
    
    if (!canSubmit) {
      return {
        success: false,
        error: `您已达到今日提交限制，请 ${remainingTime} 小时后再试。`
      }
    }

    // 验证表单数据
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    if (!name || !email || !message) {
      return {
        success: false,
        error: '请填写所有必填字段。'
      }
    }

    // 保存表单数据
    const { error: saveError } = await supabase
      .from('contact_messages')
      .insert({
        name,
        email,
        message,
        device_id: deviceId
      })

    if (saveError) {
      return {
        success: false,
        error: '保存消息失败，请稍后重试。'
      }
    }

    // 更新提交记录
    await updateSubmissionRecord(deviceId)

    return {
      success: true,
      message: '消息已成功发送！'
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    return {
      success: false,
      error: '提交失败，请稍后重试。'
    }
  }
}

// 重置提交限制
export async function resetSubmissionLimit(deviceId: string) {
  try {
    const { error } = await supabase
      .from('submission_limits')
      .delete()
      .eq('device_id', deviceId)

    if (error) {
      return {
        success: false,
        error: '重置限制失败，请稍后重试。'
      }
    }

    return {
      success: true,
      message: '提交限制已重置。'
    }
  } catch (error) {
    console.error('Error resetting limit:', error)
    return {
      success: false,
      error: '重置限制失败，请稍后重试。'
    }
  }
} 