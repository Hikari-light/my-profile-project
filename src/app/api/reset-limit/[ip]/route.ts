import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// @ts-expect-error - Next.js 15 App Router type generation issue
export async function DELETE(
  request: NextRequest,
  { params }: { params: { ip: string } }
) {
  try {
    const { error } = await supabase
      .from('submission_limits')
      .delete()
      .eq('ip', params.ip)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
