'use client'

import {
  Anchor,
  Card,
  Container,
  Divider,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import OrderService from '@/services/order.service'
import { AuthUser } from '@/types/Auth'
import { getStrapiUploadUrl } from '@/utils/cms'
import { formatDescription } from '@/utils/common'

import { cartItemCard, description, orderStyle, orderWrapper } from './order-list.css'

interface OrdersListProps {
  user: AuthUser
}

const OrdersList = ({ user }: OrdersListProps) => {
  const { defaultRadius } = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const isDarkTheme = colorScheme === 'dark'
  const [carts, setCarts] = useState<any[]>([])
  const [cartItems, setCartItems] = useState<any[][]>([[]])
  const redirect = useRouter()

  useEffect(() => {
    if (!user.email) return
    const orderService = new OrderService()

    const fetchOrders = async () => {
      const { carts, cartItems } = await orderService.getOrdersByEmail(user.email)
      setCarts(carts)
      setCartItems(cartItems)
    }

    fetchOrders()
  }, [user.email])

  if (!user.id) return <div>no user</div>

  return (
    <Container
      className={orderWrapper}
      style={{ borderBottomLeftRadius: defaultRadius, borderBottomRightRadius: defaultRadius }}
    >
      {carts.map((cart, i) => {
        // console.log('order:::', cart);

        return (
          <Group key={i} className={orderStyle} style={{ borderRadius: defaultRadius }}>
            {cart && (
              <Flex
                gap="md"
                w="100%"
                px={9}
                display={'flex'}
                justify={'space-between'}
                style={{ alignItems: 'center', borderRadius: defaultRadius }}
              >
                {/* // * this is fine! leave it! Just had to mix order type and cart[] type in getOrdersByEmail() */}
                <Text ml={12}>Order #{cart.orderId}</Text>
                <Group>
                  <Text>
                    {new Date(cart.attributes.createdAt).toLocaleDateString(undefined, {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </Text>
                  <Divider labelPosition="center" my="xs" variant="dotted" orientation="vertical" />
                  {/* // * this is fine! leave it! Just had to mix order type and cart[] type in getOrdersByEmail() */}
                  <Text c={'teal'} fz={'xl'} fw={900}>
                    ${cart.orderTotal.toFixed(2)}
                  </Text>
                </Group>
              </Flex>
            )}
            {cartItems[i] && cart.attributes.cart_items.data.length && (
              <Stack h={'fit-content'}>
                {cartItems[i].map((cartItem, num) => {
                  const slug = cartItem.attributes.product?.data.attributes.slug || ''
                  // console.log('cartItem:::', cartItem)
                  return (
                    <Card key={num} className={cartItemCard} mih={'240px'}>
                      <Group
                        display={'flex'}
                        style={{ flexDirection: 'column' }}
                        w={'21%'}
                        miw={'100px'}
                      >
                        <Image
                          src={
                            getStrapiUploadUrl(
                              cartItem.attributes.product?.data.attributes.thumbnail?.data
                                .attributes.url || '',
                            ) || '/images/img-placeholder.webp'
                          }
                          alt="product-image"
                          w="100%"
                          h="auto"
                          onClick={() => redirect.push(`/products/${slug}`)}
                          style={{ cursor: 'pointer', borderRadius: defaultRadius }}
                        />
                        <Anchor
                          fz={'sm'}
                          w={'100%'}
                          href={`/products/${slug}`}
                          c={isDarkTheme ? 'lightgray' : 'gray'}
                        >
                          {cartItem.attributes.product?.data.attributes.name}
                        </Anchor>
                      </Group>
                      <Group display={'flex'} style={{ flexDirection: 'column' }} w={'100%'}>
                        <Divider
                          label="Ingredients"
                          labelPosition="center"
                          my="xs"
                          w={'90%'}
                          variant="dashed"
                        />
                        <Text fz={'sm'}>
                          {cartItem.attributes.product?.data.attributes.ingredients || ''}
                        </Text>
                        <Divider
                          label="Tips For Storage"
                          labelPosition="center"
                          my="xs"
                          w={'90%'}
                          variant="dotted"
                        />
                        <Text fz={'sm'}>
                          {cartItem.attributes.product?.data.attributes.tipsForStorage || ''}
                        </Text>
                        <Divider
                          label="Weight"
                          labelPosition="center"
                          my="xs"
                          w={'90%'}
                          variant="dashed"
                        />
                        <Text fz={'sm'}>
                          {`${cartItem.attributes.product?.data.attributes.weight} ${cartItem.attributes.product?.data.attributes.units}` ||
                            ''}
                        </Text>
                        <Divider
                          label="for more info"
                          labelPosition="center"
                          my="xs"
                          variant="dotted"
                          w={'90%'}
                        />
                        <Anchor fz={'sm'} href={`/products/${slug}`} c={'teal'} ml={5}>
                          Visit Product Page
                        </Anchor>
                      </Group>
                      <Group style={{ flexDirection: 'column' }} w={'100%'} className={description}>
                        <Text fz={'md'}>Description</Text>
                        <Text fz={'sm'}>
                          {formatDescription(
                            cartItem.attributes.product?.data.attributes.description || '',
                            555,
                          ) || ''}
                        </Text>
                      </Group>
                    </Card>
                  )
                })}
              </Stack>
            )}
          </Group>
        )
      })}
    </Container>
  )
}

export default OrdersList
