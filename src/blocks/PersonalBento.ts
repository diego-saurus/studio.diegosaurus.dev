import { Block } from 'payload'
import Contact from './Contact'
import { Greet } from './Greet'
import { Location } from './Location'

export const PersonalBento: Block = {
  slug: 'personal-bento',
  fields: [Greet, Contact, Location],
}
