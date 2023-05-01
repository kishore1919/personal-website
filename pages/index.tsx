import React from 'react';
import type { NextPage } from 'next';
import headerLinks from '../src/web/components/header';
import Intro from '../src/web/components/intro';
import Projects from '../src/web/components/projects';
import Contact from '../src/web/components/contact';
import Seo from '../src/web/components/seo';
import { BlurryClusterHoverEffect } from '../src/web/components/common/hover-effect';

const Index: NextPage = () => {
    const links = headerLinks();

    return (
        <BlurryClusterHoverEffect>
            <Seo
                title="Website"
                keywords={['Personal Website']}
                description="I am Gervin Fung Da Xuen. Everything you want to know about me as a software engineer, can be found here. Feel free to poke around. Every side projects deemed important/useful will be shown here. All side projects is available as repositories/organization on Github"
            />
            <links.Component />
            <Intro id={links.ids[0]} />
            <Projects id={links.ids[1]} />
            <Contact id={links.ids[2]} />
        </BlurryClusterHoverEffect>
    );
};

export default Index;
