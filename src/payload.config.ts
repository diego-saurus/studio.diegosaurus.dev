import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  serverURL: process.env.SERVER_URL || '',
  collections: [Users, Media, Pages],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  localization: {
    fallback: true,
    defaultLocale: 'en',
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Indonesia',
        code: 'id',
      },
    ],
  },
  plugins: [
    s3Storage({
      collections: {
        media: {
          generateFileURL: ({ filename }) => `${process.env.R2_PUBLIC_URL}/${filename}`,
        }, // Assuming your collection is named 'media'
      },

      bucket: process.env.R2_BUCKET_NAME || '',
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        // Cloudflare R2 requires 'auto' or a placeholder like 'us-east-1'
        region: 'auto',
        // This is your unique Cloudflare Account ID endpoint
        endpoint: process.env.R2_URL,
        forcePathStyle: true,
      },
    }),
  ],
})
