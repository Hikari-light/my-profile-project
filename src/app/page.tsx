import { headers } from 'next/headers';
import { redirect } from "next/navigation";

export default async function Page() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  const preferredLanguage = acceptLanguage.split(',')[0].split('-')[0];
  const supportedLanguages = ['en', 'zh']; // 添加支持的语言
  const defaultLanguage = 'en';
  
  const language = supportedLanguages.includes(preferredLanguage) 
    ? preferredLanguage 
    : defaultLanguage;
    
  redirect(`/${language}`);
}
