

import { Button, Center, Container, Text } from '@mantine/core';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { AuthUser } from '@/types/Auth';
import { getSessionFromCookies } from '@/lib/crypt';
import { Link } from 'tabler-icons-react';

const CreateBlogPostPageClientSide = dynamic(() => import('./CreateBlogPostPageClientSide'), { ssr: false });

export const metadata: Metadata = {
  title: 'Profile | SeaTheMoss',
};

const ProfilePage: React.FC = async () => {
    const user: AuthUser | null = await getSessionFromCookies();
    if (user?.role?.type !== 'admin') {
        return (
            <Container>
                <Text c="dimmed" size="lg">
                    The page you are trying to access is reserved for admin use only. If you are a admin, please contact your rep.
                </Text>
                <Text c="dimmed" size="lg">
                    If this was an accident, sorry for the interruption. Get back to browsing!
                </Text>
                <Link href="/blogs">
                    <Button variant="outline" size="md" mt="xl">
                        Go to blogs page
                    </Button>
                </Link>
                <Link href="/products">
                    <Button size="md" mt="xl">
                    Go to products page
                    </Button>
                </Link>
            </Container>
        )
    } 

    return (
        <Container>
            <CreateBlogPostPageClientSide />
        </Container>
    );
};

export default ProfilePage;