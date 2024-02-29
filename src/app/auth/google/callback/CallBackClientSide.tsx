'use client';

import { Center, Stack } from '@mantine/core';
import { useSearchParams } from 'next/navigation';

const CallBackClientSide: React.FC = () => {
    const searchParams = useSearchParams();
    console.log('search params from callback page', searchParams);

    return (
        <Stack justify="center" mt={64}>
            <Center>
                <div>
                    callback page
                </div>
            </Center>
        </Stack>
    )
}

export default CallBackClientSide
