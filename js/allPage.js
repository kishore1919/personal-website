highlightActiveNavLink();
restorePage();
load();
handleToggleThemeIcon();

function restorePage() {
    window.addEventListener('pageshow', function (event) {
        const historyTraversal = event.persisted || (typeof window.performance !== 'undefined' && window.performance.type === 2)
        if (historyTraversal) {
            // Handle page restore.
            window.location.reload();
        }
    })
}

function highlightActiveNavLink() {
    const currentLink = location.href.replace('#footer', '').replace('.php', '');
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
            const serviceWorker = location.href.replace('#footer', '').includes('/php/') ? '.' : '';
            navigator.serviceWorker.register(serviceWorker + './serviceWorker.js')
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