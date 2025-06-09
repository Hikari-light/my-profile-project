import { supabase } from './supabase'
import logger from './logger'
import { getClientDictionary } from './i18n/client-dictionary'
import type { Locale } from './i18n/get-dictionary'

// 获取客户端 IP
async function getClientIp(): Promise<string> {
  try {
    const response = await fetch('/api/client-ip')
    const data = await response.json()
    return data.ip
  } catch (error) {
    logger.error('获取客户端 IP 失败:', error)
    return '127.0.0.1'
  }
}

// 格式化日期为数据库格式
function formatDateForDB(date: Date): string {
  return date.toISOString().replace('T', ' ').replace('Z', '+00')
}

export async function checkSubmissionLimit(lang: Locale = 'zh'): Promise<{
  canSubmit: boolean
  remainingSubmissions: number
  error?: string
}> {
  try {
    const ipAddress = await getClientIp()
    logger.debug(`当前IP地址: ${ipAddress}`)
    
    // 获取当前日期的开始时间和结束时间（UTC）
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)
    const todayFormatted = formatDateForDB(today)
    
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowFormatted = formatDateForDB(tomorrow)

    logger.debug(`查询时间范围: ${todayFormatted} - ${tomorrowFormatted}`)

    // 查询今天的提交记录
    const { data: existingSubmission, error: queryError } = await supabase
      .from('submission_limits')
      .select('*')
      .eq('ip_address', ipAddress)
      .gte('last_submission', todayFormatted)
      .lt('last_submission', tomorrowFormatted)
      .order('last_submission', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (queryError) {
      logger.error('查询提交记录失败:', queryError)
      throw queryError
    }

    // 如果今天没有提交记录
    if (!existingSubmission) {
      logger.info('没有找到今天的记录，创建新记录')
      
      // 创建新记录
      const { error: insertError } = await supabase
        .from('submission_limits')
        .insert([{ 
          ip_address: ipAddress, 
          count: 1,
          last_submission: formatDateForDB(new Date())
        }])
        .select()
        .single()

      if (insertError) {
        logger.error('创建提交记录失败:', insertError)
        throw insertError
      }

      return { canSubmit: true, remainingSubmissions: 4 }
    }

    // 如果已经有提交记录，检查是否达到限制
    const submissionCount = existingSubmission.count
    logger.debug(`当前提交次数: ${submissionCount}`)

    if (submissionCount >= 5) {
      // 超过每日限制
      const hours = Math.ceil((tomorrow.getTime() - new Date().getTime()) / (1000 * 60 * 60))
      const dict = getClientDictionary(lang)
      
      return {
        canSubmit: false,
        remainingSubmissions: 0,
        error: dict.contact.limitExceededWithHours.replace('{hours}', hours.toString())
      }
    }

    // 更新提交次数
    const newCount = submissionCount + 1
    const { error: updateError } = await supabase
      .from('submission_limits')
      .update({ 
        count: newCount,
        last_submission: formatDateForDB(new Date())
      })
      .eq('id', existingSubmission.id)
      .select()
      .single()

    if (updateError) {
      logger.error('更新提交记录失败:', updateError)
      throw updateError
    }

    // 计算剩余次数（5 - 更新后的次数）
    const remainingSubmissions = 5 - newCount

    return {
      canSubmit: true,
      remainingSubmissions: Math.max(0, remainingSubmissions)
    }
  } catch (error) {
    logger.error('检查提交限制时出错:', error)
    const dict = getClientDictionary(lang)
    return {
      canSubmit: false,
      remainingSubmissions: 0,
      error: dict.contact.errorMessage
    }
  }
}
