import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import { primaryTheme } from '../../theme/colorTheme';
import { Container, InnerContainer, LoadingMessage } from './styled';

const HashLoading = () => (
    <Container>
        <InnerContainer>
            <LoadingMessage>Loading...</LoadingMessage>
            <FadeLoader
                loading={true}
                color={primaryTheme.theme.secondaryColor}
            />
        </InnerContainer>
    </Container>
);

export default HashLoading;
