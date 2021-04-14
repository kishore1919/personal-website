const portfolioItems = document.querySelectorAll('.portfolio-item-wrapper')
const portfolioSlides = document.getElementsByClassName("portfolio-items-wrapper")


var autoSlideIndex = 0
var slideIndex = 1
var timeOut = 5000

undarkenImg()
darkenImg()
autoShowSlides()
showSlides(slideIndex)
hideButton()

function darkenImg() {
    portfolioItems.forEach(portfolioItem => {
        portfolioItem.addEventListener('mouseover', () => {
            portfolioItem.firstChild.classList.add('img-darken')
        })
    })
}

function undarkenImg() {
    portfolioItems.forEach(portfolioItem => {
        portfolioItem.addEventListener('mouseout', () => {
            portfolioItem.firstChild.classList.remove('img-darken')
        })
    })
}

function hideButton() {
    if (portfolioSlides.length === 1) {
        const buttons = document.getElementsByClassName("button")
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.visibility = "hidden"
        }
    }
}

// Next/previous controls
function plusSlides(n) {
    this.showSlides(slideIndex += n, n)
}

// Thumbnail image controls
function currentSlide(n) {
    this.showSlides(slideIndex = n)
}

function showSlides(n, isPrevious) {
    const dots = document.getElementsByClassName("dot")
    if (n > portfolioSlides.length) {
        this.slideIndex = 1
    }
    if (n < 1) {
        this.slideIndex = portfolioSlides.length
    }
    for (let i = 0; i < portfolioSlides.length; i++) {
        portfolioSlides[i].style.display = "none"
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "")
    }
    portfolioSlides[this.slideIndex - 1].style.display = "inline-flex"
    if (isPrevious === -1 && portfolioSlides.length > 1) {
        portfolioSlides[this.slideIndex - 1].style.animation = "fadeIn 0.5s"
    }
    dots[this.slideIndex - 1].className += " active"
    timeOut = 5000
}

function autoShowSlides() {
    if (portfolioSlides.length > 1) {
        for (let i = 0; i < portfolioSlides.length; i++) {
            portfolioSlides[i].style.display = "none"
        }
        autoSlideIndex++
        if (autoSlideIndex > portfolioSlides.length) {
            autoSlideIndex = 1
        }
        this.slideIndex = autoSlideIndex
        showSlides(this.slideIndex)
        setTimeout(this.autoShowSlides, timeOut) // Change image every 5 seconds
        timeOut = 5000
    }
}