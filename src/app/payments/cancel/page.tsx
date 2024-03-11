import { redirect, RedirectType } from 'next/navigation'
import QueryString, { ParsedQs } from 'qs'

import getQueryClient from '@/react-query/getQueryClient'
import OrderService from '@/services/order.service'

import PaymentCancelModal from './PaymentCancelModal'

const PaymentCancelPage: React.FC<{
  searchParams: ParsedQs
}> = async ({ searchParams }) => {
  const queryClient = getQueryClient()
  const orderService = new OrderService()

  const { session_id } = searchParams

  if (session_id) {
    const getRes = async () => {
      const res = await queryClient.fetchQuery({
        queryKey: OrderService.queryKeys.confirmPayment(session_id as string),
        queryFn: () => orderService.confirmPayment(session_id as string),
        gcTime: 0,
      })

      if (res.status !== 'expired') {
        if (res.status === 'complete') {
          redirect(
            `/payments/success${QueryString.stringify(
              {
                session_id,
              },
              {
                addQueryPrefix: true,
              },
            )}`,
            RedirectType.replace,
          )
        }
        redirect('/error')
      }
    }
    getRes()
  }

  return <PaymentCancelModal defaultOpened />
}

export default PaymentCancelPage
