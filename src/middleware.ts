import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 支持的语言列表
const locales = ['en', 'zh', 'ja']

// 获取真实IP地址
function getClientIp(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const remoteAddr = request.headers.get('remote-addr')
  const ip = xff ? xff.split(',')[0].trim() : realIp || remoteAddr
  return ip || '127.0.0.1'
}

// 获取语言的匹配得分
function getLocaleScore(locale: string, acceptLanguage: string | null): number {
  if (!acceptLanguage) return 0
  const langs = acceptLanguage.split(',').map(lang => {
    const [l, q = '1'] = lang.split(';q=')
    return { lang: l.split('-')[0], q: parseFloat(q) }
  })
  const match = langs.find(l => l.lang === locale)
  return match ? match.q : 0
}

// 中间件处理函数
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 如果是API请求，添加客户端IP
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next()
    const clientIp = getClientIp(request)
    response.headers.set('x-client-ip', clientIp)
    return response
  }

  // 检查是否是静态资源请求
  const isStaticAsset = /\.(jpg|jpeg|png|gif|ico|svg|webp|avif)$/i.test(pathname)
  if (isStaticAsset) {
    return NextResponse.next()
  }

  // 检查路径是否已经有语言前缀
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // 从 cookie、Accept-Language 头和默认语言中选择最合适的语言
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  const acceptLanguage = request.headers.get('accept-language')

  let locale = 'en' // 默认语言

  if (cookieLocale && locales.includes(cookieLocale)) {
    locale = cookieLocale
  } else if (acceptLanguage) {
    const scores = locales.map(l => ({
      locale: l,
      score: getLocaleScore(l, acceptLanguage)
    }))
    const bestMatch = scores.reduce((a, b) => a.score > b.score ? a : b)
    if (bestMatch.score > 0) {
      locale = bestMatch.locale
    }
  }

  // 重定向到带有语言前缀的路径
  return NextResponse.redirect(
    new URL(
      `/${locale}${pathname === '/' ? '' : pathname}`,
      request.url
    )
  )
}

export const config = {
  matcher: [
    // 只匹配根路径和页面路径
    '/',
    '/((?!_next|api|favicon.ico).*)',
  ],
}
