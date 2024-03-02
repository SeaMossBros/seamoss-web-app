import { Center, Container } from '@mantine/core';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { AuthUser } from '@/types/Auth';
import { getSessionFromCookies } from '@/lib/crypt';
import { pageCont, pageDetails } from '../profile-page.css';

const NavbarClientSide = dynamic(() => import('../NavbarSegment'), { ssr: false });

export const metadata: Metadata = {
  title: 'Notifications | Profile | SeaTheMoss',
};

const NotificationsPage: React.FC = async () => {
  const user: AuthUser | null = await getSessionFromCookies();
  if (!user || !user) return <div>No User Info</div>;
  
  return (
    <Container size={'100vw'} className={pageCont}>
      <Center className={pageDetails}>
        <div>Notifications</div>
      </Center>
      <NavbarClientSide user={user} key={5}/>
    </Container>
  );
};

export default NotificationsPage;
