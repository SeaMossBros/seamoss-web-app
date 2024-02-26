'use client';

import { useState } from 'react';
import { AppShell, AppShellAside, Button, SegmentedControl, useMantineColorScheme, useMantineTheme } from '@mantine/core';
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
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

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
    const [active, setActive] = useState('Billing');

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
            router.push('/'); 
        } catch (err) {
            console.log(err);
        }
    }

    const links = tabs[section].map((item) => (
        <a
            className={link}
            data-active={item.label === active || undefined}
            href={`/profile/${user.username}${item.link}`}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
            }}
            style={{ borderRadius: defaultRadius }}
        >
            <item.icon className={linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
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
