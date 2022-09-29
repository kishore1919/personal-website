import styled from 'styled-components';
import { GlobalContainer } from '../../../theme/GlobalTheme';

const Container = styled(GlobalContainer)`
    position: fixed;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    font-family: ${({ theme }) => theme.fontFamily}, sans-serif !important;
    background-color: ${({ theme }) => theme.theme.primaryColor};
`;

const LoadingMessage = styled.p`
    font-size: 35px;
    margin: 0 0 50px 0 !important;
    color: ${({ theme }) => theme.theme.secondaryColor};
`;

const InnerContainer = styled.div`
    display: grid;
    place-items: center;
`;

export { Container, LoadingMessage, InnerContainer };
