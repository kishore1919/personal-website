const viewedKey = 'VIEWED';
const dots = document.getElementsByClassName('dot');
const numberOfPagination = dots.length - 1;

const mouseOverRepoEffect = () => {
    const portfolioItems = Array.from(document.getElementsByClassName('portfolio-item-wrapper'));
    portfolioItems.forEach((portfolioItem) => {
        portfolioItem.addEventListener('mouseover', () => {
            portfolioItem.childNodes[1].classList.add('img-darken');
        });
        portfolioItem.addEventListener('mouseout', () => {
            portfolioItem.childNodes[1].classList.remove('img-darken');
        });
    });
};

const formLangQuery = (url) => (url.includes('language=') ? url.split('language=')[1].trim() : 'All');

const formNumQuery = (url) => {
    if (url.includes('page=')) {
        const parsed = parseInt(url.split('page=')[1].trim(), 10);
        return Number.isNaN(parsed) ? 0 : parsed;
    }
    return 0;
};

const highlightDot = () => {
    try {
        const page = formNumQuery(processURL());
        if (page <= 0) {
            dots[0].className += ' active';
            return;
        }
        dots[page >= numberOfPagination ? numberOfPagination : page].className += ' active';
    } catch (TypeError) { /* remove dot when theres no such need */ }
};

const sideBySideButton = () => {
    try {
        const prevButton = document.getElementById('prev');
        prevButton.addEventListener('click', () => {
            const url = processURL();
            const lang = formLangQuery(url);
            const portfolioPage = formNumQuery(url);
            window.location.search = `page=${portfolioPage <= 0 ? numberOfPagination : portfolioPage - 1}&language=${lang}`;
        });
        const nextButton = document.getElementById('next');
        nextButton.addEventListener('click', () => {
            const url = processURL();
            const lang = formLangQuery(url);
            const portfolioPage = formNumQuery(url);
            window.location.search = `page=${portfolioPage >= numberOfPagination ? 0 : portfolioPage + 1}&language=${lang}`;
        });
    } catch (TypeError) { /* remove button when theres no such need */ }
};

const dotButton = () => {
    try {
        const dotsFromID = Array.from(document.getElementById('dots').childNodes);
        dotsFromID.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                const url = processURL();
                const lang = formLangQuery(url);
                window.location.search = `page=${i}&language=${lang}`;
            });
        });
    } catch (TypeError) { /* remove dot button when theres no such need */ }
};

const displayAndCloseThankYouMsg = () => {
    const surprised = document.getElementById('surprised');
    if (JSON.parse(window.sessionStorage.getItem(viewedKey))) {
        return;
    }
    setTimeout(() => {
        surprised.style.display = 'flex';
        document.body.style.overflowY = 'hidden';
        window.sessionStorage.setItem(viewedKey, JSON.stringify(true));
    }, 5500);
    document.getElementById('close-msg').addEventListener('click', () => {
        surprised.style.display = 'none';
        document.body.style.overflowY = 'auto';
    });
};

const languageQuery = () => {
    const languages = document.getElementById('languages');
    languages.addEventListener('change', () => {
        const language = languages[languages.selectedIndex];
        window.location.search = `page=0&language=${language.innerHTML === 'C++' ? 'CPP' : language.innerHTML}`;
    })
};

mouseOverRepoEffect();
displayAndCloseThankYouMsg();
sideBySideButton();
highlightDot();
languageQuery();
dotButton();
