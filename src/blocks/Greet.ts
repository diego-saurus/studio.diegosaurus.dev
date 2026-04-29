import { lexicalMarkdownField } from '@/fields/lexicalMarkdown'
import { lexicalHTMLField } from '@payloadcms/richtext-lexical'
import { Field } from 'payload'

export const Greet: Field = {
  label: 'Greet',
  type: 'collapsible',
  admin: {
    initCollapsed: true,
  },
  fields: [
    {
      label: '',
      name: 'greet',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'description',
          type: 'richText',
          localized: true,
        },
        lexicalMarkdownField({
          lexicalFieldName: 'description',
        }),
        lexicalHTMLField({
          lexicalFieldName: 'description',
          htmlFieldName: 'description_html',
        }),
        {
          name: 'profileImage',
          relationTo: 'media',
          type: 'upload',
        },
      ],
    },
  ],
}
