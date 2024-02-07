import { useState } from 'react';
import { AppShell, AppShellAside, Button, SegmentedControl, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import {
    IconShoppingCart,
    IconLicense,
    IconMessage2,
    IconBellRinging,
    IconMessages,
    IconFingerprint,
    IconKey,
    IconSettings,
    Icon2fa,
    IconUsers,
    IconFileAnalytics,
    IconDatabaseImport,
    IconReceipt2,
    IconReceiptRefund,
    IconLogout,
    IconSwitchHorizontal,
} from '@tabler/icons-react';
import { link, linkIcon, navbarStyles, navbarMain, footer } from './navbar-segment.css';
import { UserType } from '@/types/User';
import UserButton from './UserButton';
import { useDisclosure } from '@mantine/hooks';

interface NavbarSegmentProps {
    user: UserType
}

const tabs = {
    account: [
        { link: '', label: 'Notifications', icon: IconBellRinging },
        { link: '', label: 'Change Password', icon: IconKey },
        { link: '', label: 'Other Settings', icon: IconSettings },
        // { link: '', label: 'Billing', icon: IconReceipt2 }, // * link to Stripe
        // { link: '', label: 'Security', icon: IconFingerprint },
        // { link: '', label: 'Databases', icon: IconDatabaseImport },
        // { link: '', label: 'Authentication', icon: Icon2fa },
    ],
    general: [
        { link: '', label: 'Orders', icon: IconLicense },
        { link: '', label: 'Reviews', icon: IconMessage2 },
        { link: '', label: 'Messages', icon: IconMessages },
        { link: '', label: 'Refunds', icon: IconReceiptRefund },
        // { link: '', label: 'Customers', icon: IconUsers },
        // { link: '', label: 'Files', icon: IconFileAnalytics },
    ],
};

const NavbarSegment = ({ user }: NavbarSegmentProps) => {
    const [asideOpened, aside] = useDisclosure(false)
    const { colors, defaultRadius } = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const isDarkTheme = colorScheme === 'dark';
    const [section, setSection] = useState<'account' | 'general'>('account');
    const [active, setActive] = useState('Billing');

    const links = tabs[section].map((item) => (
        <a
            className={link}
            style={{ borderRadius: defaultRadius, color: isDarkTheme ? colors.red[4] : colors.teal[9] }}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
            }}
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
                    <Button onClick={aside.open} mt={21}>
                        {'<-'} Open
                    </Button>
                )}
                {asideOpened && <AppShellAside withBorder className={navbarStyles}>
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
                        { label: 'Account', value: 'account' },
                        { label: 'General', value: 'general' },
                        ]}
                    />

                    <div className={navbarMain}>{links}</div>
                    <div className={footer}>
                        {/* <a 
                            href="#" 
                            className={link} 
                            onClick={(event) => event.preventDefault()}
                            style={{ borderRadius: defaultRadius }}
                        >
                            <IconSwitchHorizontal className={linkIcon} stroke={1.5} />
                            <span>Change account</span>
                        </a> */}

                        <a 
                            href="#" 
                            className={link} 
                            onClick={(event) => event.preventDefault()}
                            style={{ borderRadius: defaultRadius }}
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
