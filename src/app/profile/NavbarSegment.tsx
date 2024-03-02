'use client';

import { useEffect, useState } from 'react';
import { Button, Group, SegmentedControl, useMantineTheme } from '@mantine/core';
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
    const { defaultRadius, spacing } = useMantineTheme();
    const [sideNavbarOpen, setSideNavbarOpen] = useState(true)
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
            await axios('/api/auth/logout', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })

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

    // <>
        {/* {!sideNavbarOpen && (
            <Button onClick={() => setSideNavbarOpen(true)} className={openButton}>
                {'<-'} Open Sidebar
            </Button>
        )} */}
    return (
        <Group className={navbarStyles} w={sideNavbarOpen ? '300px' : '0'} px={sideNavbarOpen ? spacing.md : 0} pt={spacing.md}>
            {/* <Button onClick={() => setSideNavbarOpen(false)} className={closeButton}>
                CLOSE {'->'}
            </Button> */}
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
                w={'100%'}
            />

            <div className={navbarMain}>{links}</div>
            <div className={footer}>
                <Button 
                    className={link} 
                    onClick={(event) => {event.preventDefault();handleLogout();}}
                    variant='subtle'
                >
                    <IconLogout className={linkIcon} stroke={0.9} />
                    <span>Logout</span>
                </Button>
            </div>
            <UserButton user={user} />
        </Group>
    );
}
{/* </> */}

export default NavbarSegment;
