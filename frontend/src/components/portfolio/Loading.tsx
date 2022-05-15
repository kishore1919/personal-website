import * as React from 'react';
import styled from 'styled-components';
import { FullScreenContainer } from '../../theme/GlobalTheme';
import SyncLoader from 'react-spinners/SyncLoader';
import { primaryTheme } from '../../theme/colorTheme';

const Loading = () => (
    <Container>
        <SyncLoader
            loading={true}
            size={20}
            color={primaryTheme.theme.secondaryColor}
        />
    </Container>
);

const Container = styled(FullScreenContainer)`
    background-color: #00000066;
`;

export default Loading;
