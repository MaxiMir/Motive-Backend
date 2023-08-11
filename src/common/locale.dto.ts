export const LOCALES = ['en', 'ru', 'uk', 'zh-CN'] as const;

export type LocaleDto = (typeof LOCALES)[number];
