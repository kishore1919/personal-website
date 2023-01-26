import styled, { createGlobalStyle, keyframes } from 'styled-components';

const FadeIn = keyframes`
    0% {
        opacity:0;
        transform: scale(1);
    }
    100% {
        opacity:1;
        transform: scale(1);
    }
`;

const FullScreenContainer = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    left: 0;
    top: 0;
    overflow: auto;
    align-items: center;
    justify-content: center;
    display: flex;
`;

const GlobalContainer = styled.div`
    overflow: hidden;
    font-family: ${({ theme }) => theme.fontFamily}, sans-serif !important;
    animation: ${FadeIn} ease 0.4s;
    -moz-animation: ${FadeIn} ease 0.4s;
    -webkit-animation: ${FadeIn} ease 0.4s;
    -o-animation: ${FadeIn} ease 0.4s;
    -ms-animation: ${FadeIn} ease 0.4s;
`;

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        background-color: ${({ theme }) => theme.theme.primaryColor};
        transition: all ease-in-out 0.1s;
    }
    html {
        scroll-behavior: smooth;
    }
    * {
        scrollbar-width: thin;
    }
    *::-webkit-scrollbar {
        width: 7px;
    }
    *::-webkit-scrollbar-thumb {
        background-color: gray;
    }
`;

export { GlobalContainer, FullScreenContainer };

export default GlobalStyle;
