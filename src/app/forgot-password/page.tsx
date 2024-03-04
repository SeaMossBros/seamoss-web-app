import { Center } from '@mantine/core'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { getSessionFromCookies } from '@/lib/crypt'
import { AuthUser } from '@/types/Auth'

const ForgotPasswordClientSide = dynamic(() => import('./ForgotPassword'), { ssr: false })

export const metadata: Metadata = {
  title: 'Forgot Password | SeaTheMoss',
}

const ChangePasswordPage: React.FC = async () => {
  const user: AuthUser | null = await getSessionFromCookies()

  return (
    <Center>
      <ForgotPasswordClientSide email={user?.email || ''} />
    </Center>
  )
}

export default ChangePasswordPage
