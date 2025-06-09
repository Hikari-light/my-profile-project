import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // 从请求头中获取 IP 地址
  const clientIp = request.headers.get('x-client-ip') || '127.0.0.1'
  
  return NextResponse.json({ ip: clientIp })
}
