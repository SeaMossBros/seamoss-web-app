'use client';

import { redirect } from 'next/navigation';
import { showNotification } from '@mantine/notifications';
import { Paper, Text, Stack, TextInput, PasswordInput, Group, Button } from '@mantine/core';
import { useState } from 'react';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailValid = (value: string) => /^\S+@\S+$/.test(value) ? true : 'Invalid email';
  const passwordValid = (value: string | any[]) => value.length < 6 ? 'Password must be at least 6 characters' : true;

  const handleEmailChange = (newText: string) => {
    if (!emailValid(newText)) return email;
    setEmail(newText);
  }

  const handlePasswordChange = (newText: string) => {
    if (!passwordValid(newText)) return password;
    setPassword(newText);
  }

  const onLogin = (e: any) => {
    e.preventDefault();
    handleAdminLogin(email, password);
  }

  const handleAdminLogin = async (email: string, password: string) => {
    // Directly call the Next.js API route for admin login
    try {
      console.log('in handle login', {email, password});
      const response = await fetch('/api/auth/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('data', data);
        // Handle successful login here, e.g., redirect or store token
        showNotification({ message: 'Login successful!', color: 'green' });
        redirect('/admin'); // Redirect to admin dashboard
      } else {
        showNotification({ message: 'Login failed. Please try again.', color: 'red' });
      }
    } catch (error) {
      console.error('Login error:', error);
      showNotification({ message: 'An error occurred during login.', color: 'red' });
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder shadow="md" m="xl">
      <Stack align="center">
        <Text size="lg" fw={500}>
          Admin Login
        </Text>
      </Stack>
      <Stack>
        <TextInput
          required
          label="Email"
          placeholder="admin@seathemoss.com"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          error={!emailValid(email) && email ? 'Invalid email' : null}
        />

        <PasswordInput
          required
          label="Password"
          placeholder="Your admin password"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          error={!passwordValid(password) && password ? 'Password must be at least 6 characters' : null}
        />
      </Stack>

      <Group mt="xl">
          <Button type="submit" onClick={onLogin}>Login</Button>
      </Group>
    </Paper>
    );
};

export default AdminLoginPage;

// import { Metadata } from 'next';
// import dynamic from 'next/dynamic';
// const AdminLoginClientSide = dynamic(() => import('./AdminLoginClientSide'), { ssr: false });

// export const metadata: Metadata = {
//   title: 'Admin Login | SeaTheMoss',
// };