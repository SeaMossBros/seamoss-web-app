import { Button, Card, Divider, Flex, Skeleton, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'
import { useCallback, useState } from 'react'

import { useCart } from '@/hooks/useCart'
import { useCartBillingDetails } from '@/queries/useCartBillingDetails'
import { CartItem } from '@/types/CartItem'

import CartItemUpdateModal from '../CartItemUpdateModal'
import CartItemSingle from './CartItemSingle'
import { bottomCheckoutButton, bottomCheckoutDivider } from './CartItemSingle.css'

export type CartItemsProps = {
  isLoading: boolean
  isFetched: boolean
  items: Array<CartItem>
  billingInfo: Record<
    number,
    {
      totalPrice: number
      discountedPrice: number | null
    }
  >
  onRefetch: () => void
  onCheckout: () => void
  isCheckingOut: boolean
}

const CartItems: React.FC<CartItemsProps> = ({
  isLoading,
  isFetched,
  items,
  billingInfo,
  onRefetch,
  onCheckout,
  isCheckingOut,
}) => {
  const { cartId } = useCart()
  const { data: billingDetails } = useCartBillingDetails(cartId!)

  const onCheckoutClick = useCallback(() => {
    onCheckout()
  }, [onCheckout])

  const [itemToUpdate, setItemToUpdate] = useState<CartItem | null>(null)
  const [updateModalOpened, updateModal] = useDisclosure(false, {
    onClose: () => {
      setItemToUpdate(null)
      onRefetch()
    },
  })

  const onRequestUpdate = useCallback(
    (item: CartItem) => {
      setItemToUpdate(item)
      updateModal.open()
    },
    [updateModal],
  )

  if (isFetched && !items?.length)
    return (
      <Card withBorder>
        <Flex direction={'column'} align={'center'} pt={33} pb={33}>
          <Text mb={21}>There are no items in your cart. </Text>
          <Link href="/products" passHref>
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </Flex>
      </Card>
    )

  const total: number | undefined = billingDetails?.data.total

  return (
    <Stack gap="sm">
      {isLoading
        ? Array(5)
            .fill(0)
            .map((_, index) => <Skeleton key={index} height={100} visible />)
        : items.map((item) => (
            <CartItemSingle
              key={item.id}
              item={item}
              total={billingInfo?.[item.id]?.totalPrice ?? null}
              discountedPrice={billingInfo?.[item.id]?.discountedPrice ?? null}
              onRefetch={onRefetch}
              onRequestUpdate={onRequestUpdate}
            />
          ))}
      {itemToUpdate ? (
        <CartItemUpdateModal
          item={itemToUpdate}
          opened={updateModalOpened}
          onClose={updateModal.close}
        />
      ) : null}
      <Flex direction={'column'} align={'center'} pt={33}>
        <Button
          loading={isCheckingOut}
          onClick={onCheckoutClick}
          w={'60%'}
          className={bottomCheckoutButton}
          disabled={!total || total === 0}
        >
          CHECKOUT
        </Button>
        <Divider label="or" variant="solid" className={bottomCheckoutDivider} />
        <Link href="/products" passHref style={{ width: '60%' }}>
          <Button variant="outline" w={'100%'}>
            Continue Shopping
          </Button>
        </Link>
      </Flex>
    </Stack>
  )
}

export default CartItems
