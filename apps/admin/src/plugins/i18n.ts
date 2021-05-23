import { createI18n } from 'vue-i18n'

// @ts-ignore
import en from '../i18n/en.json'

export const i18n = createI18n({
	legacy: false,
	globalInjection: true,
	locale: 'en',
	warnHtmlInMessage: false,
	silentTranslationWarn: true,
	missing: (lang, key) => {
		return key
	},
	messages: { en }
})

const loadedLanguages: string[] = []

const setI18nLanguage = (lang) => {
	i18n.global.locale.value = lang
	return lang
}

export const loadLanguageAsync = (lang = 'en') => {
	if (i18n.global.locale.value === lang) {
		return Promise.resolve(setI18nLanguage(lang))
	}

	if (loadedLanguages.includes(lang)) {
		return Promise.resolve(setI18nLanguage(lang))
	}

	return import(`../i18n/${lang}.json`).then((messages) => {
		i18n.global.setLocaleMessage(lang, messages.default)
		loadedLanguages.push(lang)
		return setI18nLanguage(lang)
	})
}

export const translate = (key: string): string => {
	return i18n.global.t(key) as string || key
}
