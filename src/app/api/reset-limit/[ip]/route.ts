import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { ip: string } }
) {
  try {
    const { error } = await supabase
      .from('submission_limits')
      .delete()
      .eq('ip_address', params.ip)

    if (error) {
      return NextResponse.json(
        { error: '删除记录失败' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: '提交限制已重置' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: '重置提交限制失败' },
      { status: 500 }
    )
  }
}
