import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';

const Contact: NextPage = () => {
    const router = useRouter();

    React.useEffect(() => {
        router.replace('/?part=contact');
    }, []);

    return <Box sx={{ height: '100vh', width: '100vw' }} />;
};

export default Contact;
