let showMenu = false;

highlightActiveNavLink();
restorePage();
load();
handleToggleThemeIcon();
fullScreenNavMenu();

function restorePage() {
    window.addEventListener('pageshow', function (event) {
        const historyTraversal = event.persisted || (typeof window.performance !== 'undefined' && window.performance.type === 2)
        if (historyTraversal) {
            // Handle page restore.
            window.location.reload();
        }
    })
}

function processURL() {
    const url = location.href.replace('#footer', '').replace('#top', '');
    return url.includes('?') ? url.split('?')[0].replace('?', '') : url;
}

function highlightActiveNavLink() {
    const currentLink = processURL();
    const allNavLink = document.getElementsByClassName('nav-link-wrapper');
    let isActiveFound = false;
    for (let i = 0; i < allNavLink.length; i++) {
        const element = allNavLink[i];
        if (element.firstChild.href === currentLink) {
            element.className = 'nav-link-wrapper active-nav-link';
            isActiveFound = true;
        } else {
            element.className = 'nav-link-wrapper';
        }
    }
    if (isActiveFound) {
        return;
    }
    allNavLink[0].className = 'nav-link-wrapper active-nav-link';
}

function load() {
    window.addEventListener('load', () => {
        'use strict';
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('serviceWorker.js')
            .then(reg => {
                console.log('Service worker registered! 😎', reg);
            }).catch(err => {
                console.log('😥 Service worker registration failed: ', err);
            })
        }
    })
}

function handleToggleThemeIcon() {
    const toggle = document.getElementById('toggle-theme');
    const classList = document.body.classList;
    const THEME_KEY = 'THEME_KEY';
    if (JSON.parse(sessionStorage.getItem(THEME_KEY)) === true) {
        classList.toggle('light-theme');
        toggle.className = 'fas fa-moon';
    } else {
        toggle.className = 'fas fa-sun';
    }
    toggle.addEventListener('click', () => {
        classList.toggle('light-theme');
        const isLight = classList.contains('light-theme');
        toggle.className = `fas ${isLight ? 'fa-moon' : 'fa-sun'}`;
        sessionStorage.setItem(THEME_KEY, isLight);
    })
}

function fullScreenNavMenu() {
    const fullScreenMenu = document.getElementById('full-screen-nav');
    const navToTop = document.getElementById('back-to-top-wrapper')
    document.getElementById('hamburger-nav').addEventListener('click', () => {
        showMenu = true;
        setFullScreenAnimation(fullScreenMenu, 'fullMenuSlideIn ease 0.5s')
        fullScreenMenu.style.display = 'flex';
        document.body.style.overflowY = 'hidden';
        setTimeout(() => {
            navToTop.style.display = 'none';
        }, 350);
    })
    document.getElementById('close-nav').addEventListener('click', () => {
        showMenu = false;
        setFullScreenAnimation(fullScreenMenu, 'fullMenuSlideOut ease 0.5s')
        document.body.style.overflowY = 'auto';
        navToTop.style.display = 'flex';
        setTimeout(() => {
            fullScreenMenu.style.display = 'none';
        }, 500);
    })
}

function setFullScreenAnimation(fullScreenMenu, animation) {
    fullScreenMenu.style.animation = fullScreenMenu.style.mozAnimation = fullScreenMenu.style.webkitAnimation = fullScreenMenu.style.oAnimation = fullScreenMenu.style.msAnimation = animation;
}