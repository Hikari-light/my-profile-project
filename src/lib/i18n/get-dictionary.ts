import 'server-only'
import type { DictionaryEntry } from './types'
import en from './dictionaries/en.json'
import zh from './dictionaries/zh.json'
import ja from './dictionaries/ja.json'
import logger from '../logger'

const dictionaries = {
  en,
  zh,
  ja,
} as const

export type Locale = keyof typeof dictionaries

export const getDictionary = async (locale: Locale): Promise<DictionaryEntry> => {
  try {
    logger.debug(`Loading dictionary for locale: ${locale}`)
    console.log('Available dictionaries:', Object.keys(dictionaries))
    
    if (!dictionaries[locale]) {
      logger.warn(`Dictionary not found for locale: ${locale}`)
      return dictionaries.en as DictionaryEntry
    }

    const dictionary = dictionaries[locale]
    console.log('Loaded dictionary:', dictionary)
    
    if (!dictionary.metadata) {
      logger.error(`Metadata missing in dictionary for locale: ${locale}`)
      return dictionaries.en as DictionaryEntry
    }

    return dictionary as DictionaryEntry
  } catch (error) {
    logger.error(`Failed to load dictionary for locale ${locale}:`, error)
    return dictionaries.en as DictionaryEntry
  }
}
