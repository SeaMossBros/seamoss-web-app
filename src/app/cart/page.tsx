'use client'

import { Container, Grid, Stack, Title } from '@mantine/core'
import { useCallback } from 'react'

import BillingDetail from '@/components/BillingDetail'
import CartItems from '@/components/CartItems'
import { useCart } from '@/hooks/useCart'
import { useCheckout } from '@/mutations/useCheckout'
import { useCartBillingDetails } from '@/queries/useCartBillingDetails'
import { useCartItems } from '@/queries/useCartItems'

const CartPage: React.FC = () => {
  const { cartId } = useCart()

  const {
    data: cartItems,
    isPending,
    refetch: refetchItems,
    isFetched,
  } = useCartItems(cartId!, {
    enabled: Boolean(cartId),
    gcTime: 0,
  })

  const { data: billingDetails, refetch: refetchBilling } = useCartBillingDetails(cartId!)
  const { mutate: checkout, isPending: isCheckingOut } = useCheckout()

  const onRefetch = useCallback(() => {
    refetchItems()
    refetchBilling()
  }, [refetchBilling, refetchItems])

  const onCheckout = useCallback(() => {
    if (!cartId) return
    checkout(cartId, {
      onSuccess: (res) => {
        window.location.assign(res.paymentUrl)
      },
    })
  }, [cartId, checkout])

  return (
    <Container>
      <Stack gap="lg">
        <Title order={3} ta="center" c="primary-gray">
          Your Shopping Cart
        </Title>
        <Grid>
          <Grid.Col
            order={{
              base: 2,
              sm: 1,
            }}
            span={{
              base: 12,
              sm: 9,
            }}
          >
            <CartItems
              isLoading={cartId ? isPending : false}
              isFetched={cartId ? isFetched : true}
              items={cartItems?.data ?? []}
              billingInfo={billingDetails?.data.items ?? {}}
              onRefetch={onRefetch}
            />
          </Grid.Col>
          <Grid.Col
            order={{
              base: 1,
              sm: 2,
            }}
            span={{
              base: 12,
              sm: 3,
            }}
          >
            {cartId ? (
              <BillingDetail
                total={billingDetails?.data.total ?? null}
                onCheckout={onCheckout}
                isCheckingOut={isCheckingOut}
              />
            ) : null}
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  )
}

export default CartPage
