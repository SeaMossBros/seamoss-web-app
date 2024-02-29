'use client';

import { useEffect, useState } from 'react';
import { AppShell, AppShellAside, Button, SegmentedControl, useMantineTheme } from '@mantine/core';
import {
    IconLicense,
    IconMessage2,
    IconBellRinging,
    IconKey,
    IconSettings,
    IconLogout,
} from '@tabler/icons-react';
import { link, linkIcon, navbarStyles, navbarMain, footer } from './navbar-segment.css';
import { AuthUser } from '@/types/Auth';
import UserButton from './UserButton';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';

interface NavbarSegmentProps {
    user: AuthUser
}

const tabs = {
    general: [
        { link: '/orders', label: 'Orders', icon: IconLicense },
        { link: '/reviews', label: 'Your Reviews', icon: IconMessage2 },
    ],
    account: [
        { link: '/notifications', label: 'Notifications', icon: IconBellRinging },
        { link: '/change-password', label: 'Change Password', icon: IconKey },
        { link: '/settings', label: 'Other Settings', icon: IconSettings },
        // { link: '', label: 'Billing', icon: IconReceipt2 }, // * link to Stripe
    ]
};

const NavbarSegment = ({ user }: NavbarSegmentProps) => {

    const router = useRouter();
    const { defaultRadius } = useMantineTheme();
    const [asideOpened, aside] = useDisclosure(false)
    const [section, setSection] = useState<'account' | 'general'>('general');

    const pathname = usePathname();
    const currentPath = pathname.split('/')[2];
    let activeLabel = '';
    switch (currentPath) {
        case 'orders':
            activeLabel = 'Orders';
            break;
    
        case 'reviews':
            activeLabel = 'Your Reviews'; 
            break;
    
        case 'notifications':
            activeLabel = 'Notifications';
            break;
    
        case 'change-password':
            activeLabel = 'Change Password';
            break;
    
        case 'settings':
            activeLabel = 'Other Settings';
            break;
    
        default:
            break;
    }
    const [active, setActive] = useState(activeLabel);

    useEffect(() => {
        const isOnGeneralSection = !currentPath || pathname.includes('orders') || pathname.includes('reviews')
        setSection(isOnGeneralSection ? 'general' : 'account')
    }, [])

    const handleLogout = async () => {
        try {
            const data = await axios('/api/auth/logout', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })

            console.log('data on logout', data);

            router.prefetch('/products');
            router.push('/products');
        } catch (err) {
            console.log(err);
        }
    }

    const links = tabs[section].map((item) => (
        <Button 
            key={item.link}
            variant="outline"
            size="md"
            mt="xl"
            className={link}
            data-active={item.label === active || undefined}
            style={{ borderRadius: defaultRadius }} 
            c='gray'
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
                router.push(`/profile${item.link}`)
            }}
        >
            <item.icon className={linkIcon} stroke={1.5} />
            {item.label}
        </Button>
    ));

    return (
        <AppShell
            aside={{
                width: 1,
                breakpoint: 'md',
            }}
        >
            <div>
                {!asideOpened && (
                    <Button onClick={aside.open} mt={21} pos={'fixed'} top={51} right={30}>
                        {'<-'} Open Sidebar
                    </Button>
                )}
                {asideOpened && <AppShellAside withBorder className={navbarStyles} h={'94%'}>
                    <Button onClick={aside.close}>
                        CLOSE {'->'}
                    </Button>
                    <br/>
                    <SegmentedControl
                        value={section}
                        onChange={(value: any) => setSection(value)}
                        transitionTimingFunction="ease"
                        fullWidth
                        data={[
                        { label: 'General', value: 'general' },
                        { label: 'Account', value: 'account' },
                        ]}
                    />

                    <div className={navbarMain}>{links}</div>
                    <div className={footer}>
                        <a 
                            href="#" 
                            className={link} 
                            onClick={(event) => {event.preventDefault();handleLogout();}}
                        >
                            <IconLogout className={linkIcon} stroke={1.5} />
                            <span>Logout</span>
                        </a>
                    </div>
                    <UserButton user={user} />
                </AppShellAside>}
            </div>
        </AppShell>
    );
}

export default NavbarSegment;
