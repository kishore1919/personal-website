import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';

const Projects: NextPage = () => {
    const router = useRouter();

    React.useEffect(() => {
        router.replace('/?part=projects');
    }, []);

    return <Box sx={{ height: '100vh', width: '100vw' }} />;
};

export default Projects;
