import { link } from '@/fields/link'
import { defaultValueByLocale } from '@/utils/defaultValueByLocale'
import { Field } from 'payload'

const Contact: Field = {
  name: 'contact',
  type: 'group',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'detail',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: defaultValueByLocale({
            en: 'Contact Details',
            id: 'Detail Kontak',
          }),
          localized: true,
        },
        {
          name: 'items',
          type: 'array',
          fields: [link({ appearances: false })],
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: defaultValueByLocale({
            en: 'Socials',
            id: 'Sosial Media',
          }),
          localized: true,
        },
        {
          name: 'items',
          type: 'array',
          fields: [link({ appearances: false })],
        },
      ],
    },
  ],
}

export default Contact
