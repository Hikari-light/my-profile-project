import { NextWebVitalsMetric } from 'next/app';
import logger from './logger';

export function reportWebVitals(metric: NextWebVitalsMetric) {
  // 这里可以集成 Google Analytics 或其他分析服务
  logger.debug('Web Vitals:', metric);
  
  // 示例：发送到自定义分析端点
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metric),
    }).catch((error) => logger.error('Failed to send analytics:', error));
  }
}

export function trackPageView(url: string) {
  // 这里可以集成页面浏览跟踪
  logger.debug('Page view:', url);
}

export function trackEvent(category: string, action: string, label?: string) {
  // 这里可以集成事件跟踪
  logger.debug('Event:', { category, action, label });
} 