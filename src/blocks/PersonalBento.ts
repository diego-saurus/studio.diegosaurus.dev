import { Block } from 'payload'
import Contact from './Contact'
import { Greet } from './Greet'
import { Location } from './Location'
import { lexicalHTMLField } from '@payloadcms/richtext-lexical'

export const PersonalBento: Block = {
  slug: 'personal-bento',
  fields: [
    Greet,
    Contact,
    Location,
    {
      label: 'About',
      type: 'collapsible',
      fields: [
        {
          label: '',
          type: 'group',
          name: 'about',
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
            },
            {
              name: 'content',
              type: 'richText',
              localized: true,
            },
            lexicalHTMLField({
              lexicalFieldName: 'content',
              htmlFieldName: 'content_html',
            }),
            {
              name: 'background',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'foreground',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}
