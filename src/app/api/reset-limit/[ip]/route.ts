import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

type RouteContext = {
  params: {
    ip: string
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { error } = await supabase
      .from('submission_limits')
      .delete()
      .eq('ip', context.params.ip)

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
