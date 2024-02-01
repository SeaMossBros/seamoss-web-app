'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Text } from '@mantine/core';
import AuthService from '@/services/auth.service';
import { User } from '@/types/User';

const CallbackPage: React.FC = () => {
  const [user, setUser] = useState({} as User || null);
  const searchParams = useSearchParams();
  const authService = new AuthService();

  const accessToken = searchParams.get('access_token');

  if (!accessToken) return null;

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

  return (
    <Container>
      <img src={user && user.picture} width={'auto'} height={'auto'} alt='user-profile pic' style={{borderRadius: '15px'}} />
      <Text>Your Email: {user.email}</Text>
    </Container>
  );
};

export default CallbackPage;
