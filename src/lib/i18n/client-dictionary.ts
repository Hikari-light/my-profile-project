import en from './dictionaries/en.json'
import zh from './dictionaries/zh.json'
import ja from './dictionaries/ja.json'

const dictionaries = {
  en,
  zh,
  ja,
} as const

export type Locale = keyof typeof dictionaries

export function getClientDictionary(locale: Locale) {
  return dictionaries[locale]
}
