import { Center, Container } from '@mantine/core';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { AuthUser } from '@/types/Auth';
import { getSessionFromCookies } from '@/lib/crypt';

const NavbarClientSide = dynamic(() => import('../NavbarSegment'), { ssr: false });

export const metadata: Metadata = {
  title: 'Settings | Profile | SeaTheMoss',
};

const SettingsPage: React.FC = async () => {
  const user: AuthUser | null = await getSessionFromCookies();
  if (!user || !user) return <div>No User Info</div>;
  
  return (
    <Container display='flex' pos={'relative'} w={'100vw'} h={'100vh'} style={{ justifyContent: 'end' }}>
      <Center display={'flex'} w={'100%'} h={'100%'} style={{flexDirection: 'column'}}>
        <div>Settings</div>
      </Center>
      <NavbarClientSide user={user} key={2}/>
    </Container>
  );
};

export default SettingsPage;
