'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Text } from '@mantine/core';
import AuthService from '@/services/auth.service';
import { UserType } from '@/types/User';
import NavbarSegment from './NavbarSegment';

const CallbackPage: React.FC = () => {
  const [user, setUser] = useState({} as UserType || null);
  const searchParams = useSearchParams();
  const authService = new AuthService();

  const accessToken = searchParams.get('access_token');

  useEffect(() => {
    const getUserInfo = async () => {
      try {
          if (!accessToken) return;
          const data = await authService.getUserInfo(accessToken);
          setUser(data); 
      } catch (err) {
          console.error('error', err);
      };
    }

    getUserInfo();
  }, [])

  if (!user) return null;

  return (
    <Container display='flex' pos={'relative'} w={'100vw'} style={{ justifyContent: 'end' }}>
      <NavbarSegment user={user}/>
    </Container>
  );
};

export default CallbackPage;
