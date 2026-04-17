import { DefaultValue, TypedLocale } from 'payload'

export function defaultValueByLocale(value: Record<TypedLocale, string>): DefaultValue {
  return ({ locale }) => (locale ? value[locale] : value.en)
}
