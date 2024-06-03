import { Center } from '@mantine/core'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { getSessionFromCookies } from '@/lib/crypt'
import { AuthUser } from '@/types/Auth'

const ForgotPasswordClientSide = dynamic(() => import('@/components/ForgotPassword'), {
  ssr: false,
})

export const metadata: Metadata = {
  title: 'Forgot Password | SeaTheMoss',
}


/* // TODO: Fix error
error: SMTP code:550 msg:550-5.7.25 [65.220.21.34] The IP address sending this message does not have a
550-5.7.25 PTR record setup, or the corresponding forward DNS entry does not
550-5.7.25 match the sending IP. As a policy, Gmail does not accept messages
550-5.7.25 from IPs with missing PTR records. For more information, go to
550-5.7.25  https://support.google.com/a?p=sender-guidelines-ip 
550-5.7.25 To learn more about Gmail requirements for bulk senders, visit
550 5.7.25  https://support.google.com/a?p=sender-guidelines. 5b1f17b1804b1-4201735bc59si10245035e9.216 - gsmtp

Error: SMTP code:550 msg:550-5.7.25 [65.220.21.34] The IP address sending this message does not have a
550-5.7.25 PTR record setup, or the corresponding forward DNS entry does not
550-5.7.25 match the sending IP. As a policy, Gmail does not accept messages
550-5.7.25 from IPs with missing PTR records. For more information, go to
550-5.7.25  https://support.google.com/a?p=sender-guidelines-ip 
550-5.7.25 To learn more about Gmail requirements for bulk senders, visit
550 5.7.25  https://support.google.com/a?p=sender-guidelines. 5b1f17b1804b1-4201735bc59si10245035e9.216 - gsmtp

  at response (/Users/elijahmusaally/Desktop/sea-moss-api/node_modules/sendmail/sendmail.js:217:24)
  at onLine (/Users/elijahmusaally/Desktop/sea-moss-api/node_modules/sendmail/sendmail.js:234:11)
  at Socket.<anonymous> (/Users/elijahmusaally/Desktop/sea-moss-api/node_modules/sendmail/sendmail.js:141:11)
  at Socket.emit (node:events:517:28)
  at Socket.emit (node:domain:489:12)
  at addChunk (node:internal/streams/readable:335:12)
  at readableAddChunk (node:internal/streams/readable:304:11)
  at Readable.push (node:internal/streams/readable:245:10)
  at TCP.onStreamRead (node:internal/stream_base_commons:190:23)
  at TCP.callbackTrampoline (node:internal/async_hooks:130:17)
*/

const ChangePasswordPage: React.FC = async () => {
  const user: AuthUser | null = await getSessionFromCookies()

  return (
    <Center>
      <ForgotPasswordClientSide email={user?.email || ''} />
    </Center>
  )
}

export default ChangePasswordPage
