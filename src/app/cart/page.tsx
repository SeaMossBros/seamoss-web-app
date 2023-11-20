'use client'

import { Container, Grid, Stack, Title } from '@mantine/core'
import { useCallback } from 'react'

import BillingDetail from '@/components/BillingDetail'
import CartItems from '@/components/CartItems'
import { useCart } from '@/hooks/useCart'
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

  const onRefetch = useCallback(() => {
    refetchItems()
    refetchBilling()
  }, [refetchBilling, refetchItems])

  return (
    <Container>
      <Stack gap="lg">
        <Title order={3} ta="center" c="primary-gray">
          Your Shopping Cart
        </Title>
        <Grid>
          <Grid.Col
            span={{
              base: 12,
              sm: 9,
            }}
          >
            <CartItems
              isLoading={isPending}
              isFetched={isFetched}
              items={cartItems?.data ?? []}
              billingInfo={billingDetails?.data.items ?? {}}
              onRefetch={onRefetch}
            />
          </Grid.Col>
          <Grid.Col
            visibleFrom="sm"
            span={{
              base: 12,
              sm: 3,
            }}
          >
            <BillingDetail total={billingDetails?.data.total ?? null} />
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  )
}

export default CartPage
