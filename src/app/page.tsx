import payloadConfig from '@/payload.config'
import { redirect } from 'next/navigation'

const Page = async () => {
  const config = await payloadConfig
  return redirect(config.routes.admin)
}

export default Page
