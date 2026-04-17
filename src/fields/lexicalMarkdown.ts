import { convertLexicalToMarkdown, editorConfigFactory } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Field, RichTextField } from 'payload'

type LexicalFieldOption = {
  /**
   * Whether the lexicalHTML field should be hidden in the admin panel
   *
   * @default true
   */
  hidden?: boolean
  suffix?: string
  /**
   * A string which matches the lexical field name you want to convert to HTML.
   *
   * This has to be a sibling field of this lexicalHTML field - otherwise, it won't be able to find the lexical field.
   **/
  lexicalFieldName: string
  /**
   * Whether the HTML should be stored in the database
   *
   * @default false
   */
  storeInDB?: boolean
}

export const lexicalMarkdownField = ({
  storeInDB = false,
  suffix = '_md',
  hidden = true,
  lexicalFieldName,
}: LexicalFieldOption): Field => ({
  name: lexicalFieldName + suffix,
  type: 'textarea',
  admin: { hidden },
  hooks: {
    afterRead: [
      ({ siblingData, siblingFields }) => {
        const data: SerializedEditorState = siblingData[lexicalFieldName]

        if (!data) return ''

        const markdown = convertLexicalToMarkdown({
          data,
          editorConfig: editorConfigFactory.fromField({
            field: siblingFields.find(
              (field) => 'name' in field && field.name === lexicalFieldName,
            ) as RichTextField,
          }),
        })

        return markdown
      },
    ],
    beforeChange: [
      ({ siblingData }) => {
        if (!storeInDB) delete siblingData['markdown']
        return null
      },
    ],
  },
})
