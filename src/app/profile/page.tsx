import { Center, Container } from '@mantine/core';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { AuthUser } from '@/types/Auth';
import { getSessionFromCookies } from '@/lib/crypt';
import { pageCont, pageDetails } from './profile-page.css';

const NavbarClientSide = dynamic(() => import('./NavbarSegment'), { ssr: false });

export const metadata: Metadata = {
  title: 'Profile | SeaTheMoss',
};

const ProfilePage: React.FC = async () => {
  const user: AuthUser | null = await getSessionFromCookies();
  if (!user || !user) return <div>No User Info</div>;
  
  return (
    <Container size={'100vw'} className={pageCont}>
      <Center className={pageDetails}>
        <div>id: {user.id}</div>
        <div>username: {user.username}</div>
        <div>email: {user.email}</div>
        <div>role: {user.role?.name || 'none in obj'}</div>
        <div>confirmed: {`${user.confirmed}`}</div>
        <div>provider: {user.provider}</div>
        <div>blocked: {`${user.blocked}`}</div>
        <div>confirmationToken: {`${user.confirmationToken}`}</div>
        <div>
          created: {`${new Date(user.createdAt).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})}`}
        </div>
        {/* // TODO: Get orders, support messages, product reviews, and notifications sent out by us */}
        {/* {user.orderIds?.map((orderId, i) => (
          <p key={i}>orderId: {orderId}</p>
        ))} */}
        {/* {user.stripeSessionIds?.map((stripeSessionId, i) => (
          <p key={i}>stripeSessionId: {stripeSessionId}</p>
        ))} */}
      </Center>
      <NavbarClientSide user={user} key={1}/>
    </Container>
  );
};

export default ProfilePage;
