const viewedKey = 'VIEWED';
const numRegex = /(\d+)/;
const dots = document.getElementsByClassName('dot');
const numberOfPagination = dots.length - 1;

mouseOverRepoEffect();
displayAndCloseThankYouMsg();
sideBySideButton();
highlightDot();
languageQuery();
dotButton();

function mouseOverRepoEffect() {
    const portfolioItems = document.getElementsByClassName('portfolio-item-wrapper');
    for (let i = 0; i < portfolioItems.length; i++) {
        const portfolioItem = portfolioItems[i];
        portfolioItem.addEventListener('mouseover', () => {
            portfolioItem.childNodes[1].classList.add('img-darken');
        });
        portfolioItem.addEventListener('mouseout', () => {
            portfolioItem.childNodes[1].classList.remove('img-darken');
        });
    }
}

function formLangQuery(url) {
    return url.includes('language=') ? url.split('language=')[1].trim() : 'All';
}

function formNumQuery(url) {
    if (url.includes('page=')) {
        const parsed = parseInt(url.split('page=')[1].trim());
        return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
}

function highlightDot() {
    try {
        const page = formNumQuery(location.href.replace('#footer', '').replace('#top', ''));
        const i = page <= 0 ? 0 : page >= numberOfPagination ? numberOfPagination : page;
        dots[i].className += ' active';
    } catch (TypeError) {/*remove dot when theres no such need*/}
}

function sideBySideButton() {
    try {
        const prevButton = document.getElementById('prev');
        prevButton.addEventListener('click', () => {
            const url = location.href.replace('#footer', '').replace('#top', '');
            const lang = formLangQuery(url)
            const portfolioPage = formNumQuery(url);
            location.search = `page=${portfolioPage <= 0 ? numberOfPagination : portfolioPage - 1}&language=${lang}`;
        });
        const nextButton = document.getElementById('next');
        nextButton.addEventListener('click', () => {
            const url = location.href.replace('#footer', '').replace('#top', '');
            const lang = formLangQuery(url);
            const portfolioPage = formNumQuery(url);
            location.search = `page=${portfolioPage >= numberOfPagination ? 0 : portfolioPage + 1}&language=${lang}`;
        });
    } catch (TypeError) {/*remove button when theres no such need*/}
}

function dotButton() {
    try {
        const dots = document.getElementById('dots').childNodes;
        for (let i = 0; i < dots.length; i++) {
            const dot = dots[i];
            dot.addEventListener('click', () => {
                const url = location.href.replace('#footer', '').replace('#top', '');
                const lang = formLangQuery(url);
                location.search = `page=${i}&language=${lang}`;
            });
        }
    } catch (TypeError) {
        
    }
}

function displayAndCloseThankYouMsg() {
    const surprised = document.getElementById('surprised');
    if (JSON.parse(sessionStorage.getItem(viewedKey))) {
        return;
    }
    setTimeout(() => {
        surprised.style.display = 'flex';
        document.body.style.overflowY = 'hidden';
        sessionStorage.setItem(viewedKey, JSON.stringify(true))
    }, 5500);
    document.getElementById('close-msg').addEventListener('click', () => {
        surprised.style.display = 'none';
        document.body.style.overflowY = 'auto';
    })
}

function languageQuery() {
    const languages = document.getElementById('languages').childNodes;
    for (let i = 0; i < languages.length; i++) {
        const language = languages[i];
        language.addEventListener('click', () => {
            location.search = `page=0&language=${language.innerHTML === 'C++' ? 'CPP' : language.innerHTML}`;
        });
    }
}