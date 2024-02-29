import { Center, Container } from '@mantine/core';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { AuthUser } from '@/types/Auth';
import { getSessionFromCookies } from '@/lib/crypt';
import OrderService from '@/services/order.service';

const NavbarClientSide = dynamic(() => import('../NavbarSegment'), { ssr: false });
const OrdersListClientSide = dynamic(() => import('./OrdersList'), { ssr: false });

export const metadata: Metadata = {
  title: 'Orders | Profile | SeaTheMoss',
};

const OrdersPage: React.FC = async () => {
  const user: AuthUser | null = await getSessionFromCookies();
  if (!user || !user.id) return <div>No User Info</div>;
  
  return (
    <Container display='flex' pos={'relative'} w={'100vw'} h={'100vh'} style={{ justifyContent: 'end' }}>
      <Center display={'flex'} w={'100%'} h={'100%'} style={{flexDirection: 'column'}}>
        <OrdersListClientSide user={user} />
      </Center>
      <NavbarClientSide user={user} key={4}/>
    </Container>
  );
};

export default OrdersPage;
