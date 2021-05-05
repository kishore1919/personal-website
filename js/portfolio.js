const portfolioItems = document.getElementsByClassName('portfolio-link')
const portfolioSlides = document.getElementsByClassName('portfolio-items-wrapper')

let slideIndex = 1

undarkenImg()
darkenImg()
showSlides(slideIndex)
hideButton()

function darkenImg() {
    for (let i = 0; i < portfolioItems.length; i++) {
        const portfolioItem = portfolioItems[i]
        portfolioItem.addEventListener('mouseover', () => {
            portfolioItem.firstChild.classList.add('img-darken');
        })
    }
}

function undarkenImg() {
    for (let i = 0; i < portfolioItems.length; i++) {
        const portfolioItem = portfolioItems[i]
        portfolioItem.addEventListener('mouseout', () => {
            portfolioItem.firstChild.classList.remove('img-darken');
        })
    }
}

function hideButton() {
    if (portfolioSlides.length === 1) {
        const buttons = document.getElementsByClassName('button')
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.visibility = 'hidden'
        }
        const dots = document.getElementById('dots').childNodes
        for (let i = 0; i < dots.length; i++) {
            dots[i].style.visibility = 'hidden'
        }
    }
}

// Next/previous controls
function plusSlides(n) {showSlides(slideIndex += n, n)}

// Thumbnail image controls
function currentSlide(n) {showSlides(slideIndex = n)}

function showSlides(n, isPrevious) {
    const dots = document.getElementsByClassName('dot')
    if (n > portfolioSlides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = portfolioSlides.length
    }
    for (let i = 0; i < portfolioSlides.length; i++) {
        portfolioSlides[i].style.display = 'none'
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '')
    }
    portfolioSlides[slideIndex - 1].style.display = 'inline-flex'
    if (isPrevious === -1 && portfolioSlides.length > 1) {
        portfolioSlides[slideIndex - 1].style.animation = 'fadeIn 0.5s'
    }
    dots[slideIndex - 1].className += ' active'
}