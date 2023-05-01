import React from 'react';
import Typography, { type TypographyProps } from '@mui/material/Typography';
import Holder from '../common/holder';
import type { ID } from '../header';
import consts from '../../const';
import useBreakpoint from '../../hooks/use-breakpoint-value';

const Content = (props: TypographyProps) => (
    <Typography
        {...props}
        variant="subtitle1"
        sx={{
            mt: 3,
            textAlign: 'justify',
            color: 'text.secondary',
            ...props.sx,
        }}
    />
);

const Intro = ({ id }: ID) => {
    const [time, setTime] = React.useState(Date.now());

    React.useEffect(() => {
        const timer = setTimeout(() => setTime(Date.now()), 1000);
        return () => clearTimeout(timer);
    }, [time]);

    const isDay = () => {
        const hours = new Date(time).getHours();
        return hours >= 6 && hours < 18;
    };

    const breakPoint = useBreakpoint();

    return (
        <Holder id={id}>
            <Typography
                variant={!breakPoint ? 'h2' : breakPoint === 'xs' ? 'h1' : 'h2'}
                sx={({ palette }) => ({
                    my: '16px',
                    textShadow: [
                        `4px 1px ${palette.custom.striking.green}`,
                        `-4px 1px ${palette.custom.striking.red}`,
                    ].join(' ,'),
                })}
            >
                GERVIN
            </Typography>
            <Holder sx={{ width: consts.width }}>
                <Content sx={{ color: 'text.primary', mt: 3 }}>
                    {isDay() ? 'Bonjour' : 'Bonsoir'}! Je vous remercie de votre
                    visite!
                </Content>
                <Content>
                    I am Gervin Fung Da Xuen, and I am not French. I build
                    software both for fun and for a living. I am passionate
                    about open-source software, and I build websites, desktop
                    applications, mobile applications, and development tools.
                </Content>
                <Content>
                    I have been coding since 2021, and it all started when I
                    wanted to make a Chess game with Java Swing and then with
                    the LibGDX framework. Later, during an intern applicant
                    test, I broadened my skillset to include TypeScript and
                    began making web and mobile applications. After some time, I
                    began using Rust to create terminal applications.
                </Content>
                <Content>
                    TypeScript, Java, and Rust are my primary languages in
                    software engineering, although I believe I am capable of
                    using other languages as well, aside from PHP. My passion
                    lies in the ability to work on web applications, mobile
                    applications, and development tools. You can find my full
                    projects list online.
                </Content>
                <Content>
                    Outside of programming, I enjoy reading interesting
                    articles, working out, and playing video games with my
                    friends.
                </Content>
            </Holder>
        </Holder>
    );
};

export default Intro;
