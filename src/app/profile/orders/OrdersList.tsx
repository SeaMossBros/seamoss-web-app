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

import { ROUTE_PATHS } from '@/consts/route-paths'
import OrderService from '@/services/order.service'
import { AuthUser } from '@/types/Auth'
import { Cart } from '@/types/Cart'
import { CartItem } from '@/types/CartItem'
import { getStrapiUploadUrl } from '@/utils/cms'
import { formatDescription } from '@/utils/common'

import { cartItemCard, description, orderPrice, orderStyle, orderWrapper } from './order-list.css'

interface OrdersListProps {
  user: AuthUser
  setTotalOrders: (num: number) => void
}

type CartArrType = (Cart & {
  orderId: number[]
  orderTotal: number
})[]

type CartItemArrType = CartItem[][]

interface OrderResult {
  carts: CartArrType
  cartItems: CartItemArrType
}

const OrdersList = ({ user, setTotalOrders }: OrdersListProps) => {
  const { defaultRadius } = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const isDarkTheme = colorScheme === 'dark'
  const [carts, setCarts] = useState<CartArrType>()
  const [cartItems, setCartItems] = useState<CartItemArrType>()
  const redirect = useRouter()

  useEffect(() => {
    if (!user.email) return
    const orderService = new OrderService()

    const fetchOrders = async () => {
      const { carts, cartItems }: OrderResult = await orderService.getOrdersByEmail(user.email)
      setCarts(carts)
      setCartItems(cartItems)
      setTotalOrders(carts.length)
    }

    fetchOrders()
  }, [user.email])

  const getProductReviewUrl = (productUrl: string): string => {
    if (!productUrl) return ''
    const myURL = new URL(productUrl, window.location.origin)
    myURL.searchParams.append('showReviewModal', 'true')
    return myURL.toString()
  }

  if (!user.id) return <div>no user</div>

  return (
    <Container
      className={orderWrapper}
      style={{
        borderBottomLeftRadius: defaultRadius,
        borderBottomRightRadius: defaultRadius,
        boxShadow: carts && carts.length > 0 ? '0px -12px 9px -12px inset teal' : '',
      }}
    >
      {carts &&
        carts.map((cart, i) => {
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
                  <Text fz={'xs'}>Order #{cart.orderId}</Text>
                  <Group display={'flex'} align={'center'}>
                    <Text fz={'xs'}>
                      {new Date(cart.attributes.updatedAt).toLocaleDateString(undefined, {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </Text>
                    <Divider
                      labelPosition="center"
                      my="xs"
                      mx="xs"
                      variant="dotted"
                      orientation="vertical"
                    />
                    {/* // * this is fine! leave it! Just had to mix order type and cart[] type in getOrdersByEmail() */}
                    <Text c={'teal'} fw={900} className={orderPrice}>
                      ${cart.orderTotal.toFixed(2)}
                    </Text>
                  </Group>
                </Flex>
              )}
              {cartItems &&
                cartItems[i] && ( // ? not sure why this was included, but if breaks put back... && cart.attributes.cart_items.data.length
                  <Stack h={'fit-content'} w={'100%'}>
                    {cartItems[i].map((cartItem, num) => {
                      const slug = cartItem.attributes.product?.data.attributes.slug || ''
                      const productUrl = ROUTE_PATHS.PRODUCT.SLUG.replace('{slug}', slug)
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
                                    .attributes.url ||
                                    // || cartItem.attributes.,
                                    '',
                                ) || '/images/img-placeholder.webp'
                              }
                              alt="product-image"
                              w={81}
                              h="auto"
                              onClick={() => redirect.push(productUrl)}
                              style={{ cursor: 'pointer', borderRadius: defaultRadius }}
                            />
                            <Anchor
                              fz={'sm'}
                              w={'100%'}
                              href={productUrl}
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
                              label="more info"
                              labelPosition="center"
                              my="xs"
                              variant="dotted"
                              w={'90%'}
                            />
                            <Flex>
                              <Anchor fz={'sm'} href={productUrl} c={'teal'} ml={5}>
                                Visit Product Page
                              </Anchor>
                              <Anchor
                                fz={'sm'}
                                href={getProductReviewUrl(productUrl)}
                                c={'yellow'}
                                ml={9}
                              >
                                Leave A Review
                              </Anchor>
                            </Flex>
                          </Group>
                          <Group
                            style={{ flexDirection: 'column' }}
                            w={'100%'}
                            className={description}
                          >
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
