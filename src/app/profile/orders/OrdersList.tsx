'use client';

import OrderService from "@/services/order.service";
import { AuthUser } from "@/types/Auth";
import { CartItem } from "@/types/CartItem";
import { Button, Card, Container, Flex, Group, Image, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from 'react';
import { orderStyle, orderWrapper } from "./order-list.css";
import { getStrapiUploadUrl } from "@/utils/cms";
import { Cart } from "@/types/Cart";

interface OrdersListProps {
    user: AuthUser
}

const OrdersList = ({ user }: OrdersListProps) => {
    const { defaultRadius } = useMantineTheme();
    const orderService = new OrderService();
    const [carts, setCarts] = useState<Cart[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[][]>([[]]);
    const [expandedOrder, setExpandedOrder] = useState<number>(-1);

    if (!user.id) return <div>no user</div>

    useEffect(() => {
        if (!user.email) return;

        const fetchOrders = async () => {
            const { carts, cartItems } = await orderService.getOrdersByEmail(user.email);
            setCarts(carts);
            setCartItems(cartItems);
        }

        fetchOrders();
    }, [])

    return (
        <Container className={orderWrapper}>
            <Title fw={600} mb={21}>Your Orders</Title>
            {[...carts, ...carts, ...carts].map((cart, i) => { // TODO: include pagination with 5 orders per page
                console.log('order:::', cart);

                return (
                    <Card 
                        key={i}
                        className={orderStyle}
                        withBorder 
                    >
                        {cart && (
                            <Flex
                                gap="md" 
                                w="100%" 
                                mb={expandedOrder === i ? 21 : 0} 
                                display={'flex'} 
                                justify={'space-between'}
                                style={{ alignItems: 'center', borderRadius: defaultRadius, border: `${expandedOrder === i ? '1px' : '0px'} solid lightgray` }}
                                onClick={() => setExpandedOrder(expandedOrder === i ? -1 : i)}
                            >
                                <Text ml={12}>Order {i + 1}</Text>
                                <Group>
                                    <Text>
                                        {new Date(cart.attributes.createdAt).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})}
                                    </Text>
                                    {expandedOrder === i ? (
                                        <Button bg={'red'}>Close</Button>
                                    ) : (
                                        <Button variant='outline'>Details</Button>
                                    )}
                                </Group>
                            </Flex>
                        )}  
                        {expandedOrder === i && cart.attributes.cart_items.data.length && (
                            <Stack h={'fit-content'} style={{ overflowY: 'auto' }}>
                                {cartItems[i].map((cartItem, i) => {
                                    // console.log('cartItem', cartItem)
                                    return <Card key={i} mih={'240px'}>
                                        <img 
                                            src={getStrapiUploadUrl(cartItem.attributes.product?.data.attributes.thumbnail?.data.attributes.url || '')
                                                || '/images/img-placeholder.webp'}
                                            alt="product-image"
                                            width='21%'
                                            height='auto'
                                        />
                                        <Text>
                                            {cartItem.attributes.product?.data.attributes.name}
                                        </Text>
                                        {/* <Text>
                                            
                                        </Text> */}
                                    </Card>
                                })}
                            </Stack>
                        )}
                    </Card>
                )
            })}
        </Container>
    )
}

export default OrdersList;