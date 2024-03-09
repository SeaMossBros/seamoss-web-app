import { Center } from '@mantine/core'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const UpdatePasswordClientSide = dynamic(() => import('@/components/UpdatePassword'), {
  ssr: false,
})

export const metadata: Metadata = {
  title: 'Forgot Password | SeaTheMoss',
}

const ResetPasswordPage: React.FC = async () => {
  return (
    <Center>
      <UpdatePasswordClientSide />
    </Center>
  )
}

export default ResetPasswordPage
