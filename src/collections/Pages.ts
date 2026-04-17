import { PersonalBento } from '@/blocks/PersonalBento'
import { CollectionConfig, slugField } from 'payload'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    slugField(),

    {
      type: 'tabs',
      tabs: [
        {
          label: 'content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [PersonalBento],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
      ],
    },
  ],
}
