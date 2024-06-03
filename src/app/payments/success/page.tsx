import { notFound, redirect, RedirectType } from 'next/navigation'
import QueryString, { ParsedQs } from 'qs'

import getQueryClient from '@/react-query/getQueryClient'
import OrderService from '@/services/order.service'

import PaymentSuccessModal from './PaymentSuccessModal'

const PaymentSuccessPage: React.FC<{
  searchParams: ParsedQs
}> = async ({ searchParams }) => {
  const queryClient = getQueryClient()
  const orderService = new OrderService()
  const searchParamsData = searchParams

  if (!searchParamsData.session_id) notFound()

  const { session_id } = searchParamsData

  const res = await queryClient.fetchQuery({
    queryKey: OrderService.queryKeys.confirmPayment(session_id as string),
    queryFn: () => orderService.confirmPayment(session_id as string),
    gcTime: 0,
  })

  if (res.status !== 'complete') {
    if (res.status === 'expired') {
      redirect(
        `/payments/cancel${QueryString.stringify(
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
  }

  return <PaymentSuccessModal order={res.order!} user={res.user!} defaultOpened />
}

export default PaymentSuccessPage
