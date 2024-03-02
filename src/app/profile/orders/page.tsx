import { Center, Container } from '@mantine/core';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { AuthUser } from '@/types/Auth';
import { getSessionFromCookies } from '@/lib/crypt';
import { pageCont, pageDetails } from '../profile-page.css';

const NavbarClientSide = dynamic(() => import('../NavbarSegment'), { ssr: false });
const OrdersListClientSide = dynamic(() => import('./OrdersList'), { ssr: false });

export const metadata: Metadata = {
  title: 'Orders | Profile | SeaTheMoss',
};

const OrdersPage: React.FC = async () => {
  const user: AuthUser | null = await getSessionFromCookies();
  if (!user || !user.id) return <div>No User Info</div>;
  
  return (
    <Container size={'100vw'} className={pageCont}>
      <Center className={pageDetails}>
        <OrdersListClientSide user={user} />
      </Center>
      <NavbarClientSide user={user} key={4}/>
    </Container>
  );
};

export default OrdersPage;
