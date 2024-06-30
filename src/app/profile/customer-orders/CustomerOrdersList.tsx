'use client'

import {
  Anchor,
  Card,
  Checkbox,
  Container,
  Divider,
  Flex,
  Group,
  Image,
  SegmentedControl,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'
import OrderService, { CartArrType, CartItemArrType, OrderResult } from '@/services/order.service'
import { AuthUser } from '@/types/Auth'
import { getStrapiUploadUrl } from '@/utils/cms'

import {
  arrowShow,
  cartItemCard,
  description,
  dividerPrice,
  orderDateAndPriceCont,
  orderNumberCont,
  orderPrice,
  orderStyle,
  orderWrapper,
} from './customer-order-list.css'

interface OrdersListProps {
  user: AuthUser
  setTotalOrders: (num: number) => void
}

const OrdersList = ({ user, setTotalOrders }: OrdersListProps) => {
  const { defaultRadius, colors } = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const isDarkTheme = colorScheme === 'dark'
  const [carts, setCarts] = useState<CartArrType>()
  const [cartItems, setCartItems] = useState<CartItemArrType>()
  const redirect = useRouter()
  const [shouldShowCartItems, setShouldShowCartItems] = useState<boolean[]>([])
  const [shouldShowNotPrinted, setShouldShowNotPrinted] = useState<boolean>(true)
  const [section, setSection] = useState<'Not Yet Printed' | 'Already Printed'>('Not Yet Printed')
  const orderService = new OrderService()

  const fetchOrdersWithLabels = async () => {
    const { carts, cartItems }: OrderResult = await orderService.getOrders({
      mustHaveLabels: true,
    })
    // console.log('carts', carts)
    setCarts(carts)
    setCartItems(cartItems)
    setTotalOrders(carts.filter((cart) => !cart.label_is_printed).length)
    setShouldShowCartItems(new Array(carts.length).fill(false))
  }

  useEffect(() => {
    if (!user.email) return
    fetchOrdersWithLabels()
  }, [setTotalOrders, user.email])

  const handleShowOrderClick = (e: any, i: number) => {
    setShouldShowCartItems((prev) => {
      const newArr = [...prev]
      newArr[i] = !prev[i]
      if (e.target.childNodes[0].data === '>') {
        e.target.style.transform = newArr[i] ? 'rotate(90deg)' : 'rotate(0deg)'
      } else {
        e.target.offsetParent.firstElementChild.childNodes[0].childNodes[0].style.transform =
          newArr[i] ? 'rotate(90deg)' : 'rotate(0deg)'
      }
      return newArr
    })
  }

  const handleLabelPrintedCheckbox = async (cartIndex: number) => {
    if (carts && carts[cartIndex]) {
      await orderService.update(carts[cartIndex].orderId, {
        label_is_printed: !!!carts[cartIndex].label_is_printed,
      })
      fetchOrdersWithLabels()
    }
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
      <Group>
        <SegmentedControl
          value={section}
          onChange={(value: any) => {
            setShouldShowNotPrinted(value !== 'Already Printed')
            return setSection(value)
          }}
          transitionTimingFunction="ease"
          fullWidth
          data={[
            { label: 'Not Yet Printed', value: 'Not Yet Printed' },
            { label: 'Already Printed', value: 'Already Printed' },
          ]}
          maw={'fit-content'}
          mb={42}
        />
      </Group>
      {carts &&
        carts.map((cart, i) => {
          // console.log(cart.label_is_printed)
          if (
            (shouldShowNotPrinted && cart.label_is_printed) ||
            (!shouldShowNotPrinted && !cart.label_is_printed)
          )
            return
          // console.log('cart', cart)
          return (
            <Group
              key={i}
              className={orderStyle}
              style={{ borderRadius: defaultRadius }}
              justify="center"
            >
              {cart && (
                <Flex
                  gap="md"
                  w="100%"
                  px={9}
                  display={'flex'}
                  justify={'space-between'}
                  style={{ alignItems: 'center', borderRadius: defaultRadius }}
                  wrap={'wrap'}
                >
                  <Group
                    onClick={(e) => handleShowOrderClick(e, i)}
                    w={'fit-contnent'}
                    h={'fit-contnent'}
                    className={orderNumberCont}
                    style={{ borderRadius: defaultRadius }}
                  >
                    <Text
                      fz={'xs'}
                      fw={600}
                      className={arrowShow}
                      bg={isDarkTheme ? colors.dark[3] : colors.dark[0]}
                      c={'black'}
                      style={{ borderRadius: defaultRadius }}
                    >
                      &gt;
                    </Text>
                    <Text fz={'xs'}>Order #{cart.orderId}</Text>
                  </Group>
                  <Group justify="center">
                    <Anchor
                      fz={'sm'}
                      href={cart.label_url || '/not-found'}
                      target="_blank"
                      underline="always"
                      c={'grape'}
                      ml={9}
                    >
                      View Label
                    </Anchor>
                    <Divider orientation="vertical" />
                    <Checkbox
                      label={
                        section === 'Already Printed'
                          ? "Move to 'Not Yet Printed'"
                          : 'Label has been printed'
                      }
                      onChange={() => {
                        setTimeout(() => handleLabelPrintedCheckbox(i), 150)
                      }}
                      size="sm"
                      c="gray"
                      mr={4}
                      miw={'96px'}
                      classNames={{ input: 'pointer-cursor' }}
                    />
                  </Group>
                  <Group display={'flex'} align={'center'} className={orderDateAndPriceCont}>
                    <Text fz={'xs'}>
                      {new Date(cart.attributes.updatedAt).toLocaleDateString(undefined, {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </Text>
                    <Divider
                      labelPosition="center"
                      my="xs"
                      mx="xs"
                      variant="dotted"
                      orientation="vertical"
                      className={dividerPrice}
                    />
                    <Text c={'teal'} fw={900} className={orderPrice}>
                      ${cart.orderTotal.toFixed(2)}
                    </Text>
                  </Group>
                </Flex>
              )}
              {shouldShowCartItems[i] && (
                <Stack
                  bg={isDarkTheme ? colors.dark[8] : colors.gray[1]}
                  p={6}
                  align="center"
                  style={{ borderRadius: defaultRadius }}
                  w={'100%'}
                >
                  <Anchor
                    fz={'sm'}
                    href={cart.tracking_url_provider || '/not-found'}
                    target="_blank"
                    underline="always"
                    c={'grape'}
                  >
                    Track Order
                  </Anchor>
                  <Divider label="Customers Email" labelPosition="center" my="xs" w={'90%'} />
                  <Text fz={'sm'} c={isDarkTheme ? colors.gray[2] : colors.dark[9]}>
                    {cart.user_email}
                  </Text>
                  <Group style={{ flexDirection: 'column' }} w={'100%'} className={description}>
                    <Divider label="Payment Status" labelPosition="center" my="xs" w={'90%'} />
                    <Text fz={'sm'} c={cart.payment_status === 'success' ? 'green' : 'red'}>
                      {cart.payment_status.toUpperCase()}
                    </Text>
                    <Divider label="Shopping Experience" labelPosition="center" my="xs" w={'90%'} />
                    <Text
                      fz={'sm'}
                      py={3}
                      px={6}
                      display={cart.customer_experience?.length ? 'block' : 'none'}
                      bg={isDarkTheme ? colors.gray[9] : colors.gray[1]}
                      style={{ borderRadius: defaultRadius }}
                    >
                      {cart.customer_experience}
                    </Text>
                  </Group>
                </Stack>
              )}
              {cartItems && cartItems[i] && shouldShowCartItems[i] && (
                <Stack h={'fit-content'} w={'100%'}>
                  {cartItems[i].map((cartItem, num) => {
                    if (!cartItem.attributes.product?.data) {
                      // product is not in db (or is not published)
                      return (
                        <Card key={num + Math.random()}>
                          <Group display={'flex'} style={{ flexDirection: 'column' }} w={'100%'}>
                            <Text fz={'lg'} w="100%" ff={'fantasy'}>
                              Item {num + 1}:
                            </Text>
                            <Text fz={'sm'}>Product is No longer Available.</Text>
                          </Group>
                        </Card>
                      )
                    }

                    const slug = cartItem.attributes.product?.data?.attributes.slug || ''
                    const productUrl = ROUTE_PATHS.PRODUCT.SLUG.replace('{slug}', slug)
                    return (
                      <Card key={num} className={cartItemCard} mih={'240px'}>
                        <Group
                          display={'flex'}
                          style={{ flexDirection: 'column' }}
                          w={'21%'}
                          miw={'100px'}
                        >
                          <Text fz={'lg'} w="100%" ff={'fantasy'}>
                            Item {num + 1}:
                          </Text>
                          <Image
                            src={
                              getStrapiUploadUrl(
                                cartItem.attributes.product?.data?.attributes.thumbnail?.data
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
                            {cartItem.attributes.product?.data?.attributes.name}
                          </Anchor>
                        </Group>
                        <Group display={'flex'} style={{ flexDirection: 'column' }} w={'100%'}>
                          <Divider
                            label={
                              cartItem.attributes.product?.data?.attributes.unit_property_selection_text?.split(
                                ' ',
                              )[1] || ''
                            }
                            labelPosition="center"
                            my="xs"
                            w={'90%'}
                            variant="dashed"
                          />
                          <Text fz={'sm'}>
                            {cartItem.attributes.options?.properties[0]?.product_property?.data
                              ?.attributes.name || ''}
                          </Text>
                          <Divider
                            label="Ingredients"
                            labelPosition="center"
                            my="xs"
                            w={'90%'}
                            variant="dashed"
                          />
                          <Text fz={'sm'}>
                            {cartItem.attributes.product?.data?.attributes.ingredients || ''}
                          </Text>
                          <Divider
                            label="Tips For Storage"
                            labelPosition="center"
                            my="xs"
                            w={'90%'}
                            variant="dotted"
                          />
                          <Text fz={'sm'}>
                            {cartItem.attributes.product?.data?.attributes.tipsForStorage || ''}
                          </Text>
                          <Divider
                            label="Weight"
                            labelPosition="center"
                            my="xs"
                            w={'90%'}
                            variant="dashed"
                          />
                          <Text fz={'sm'}>
                            {`${cartItem.attributes.options?.product_variant?.data?.attributes.weight} ${cartItem.attributes.options?.product_variant?.data?.attributes.weight_unit}` ||
                              ''}
                          </Text>
                          <Divider
                            label="more info"
                            labelPosition="center"
                            my="xs"
                            variant="dotted"
                            w={'90%'}
                          />
                          <Anchor fz={'sm'} href={productUrl} c={'teal'} ml={5}>
                            Visit Product Page
                          </Anchor>
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
