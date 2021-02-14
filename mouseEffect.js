const portfolioItems = document.querySelectorAll('.portfolio-item-wrapper');
const portfolioSlides = document.getElementsByClassName("portfolio-items-wrapper");

portfolioItems.forEach(portfolioItem => {
    portfolioItem.addEventListener('mouseover', () => {
        portfolioItem.childNodes[1].classList.add('img-darken');
    });
})

portfolioItems.forEach(portfolioItem => {
    portfolioItem.addEventListener('mouseout', () => {
        portfolioItem.childNodes[1].classList.remove('img-darken');
    });
})

window.addEventListener("pageshow",function (event) {
    var historyTraversal = event.persisted || (typeof window.performance != "undefined" && window.performance.type === 2);
    if (historyTraversal) {
        // Handle page restore.
        window.location.reload();
    }
});

var slideIndex = 1
this.showSlides(this.slideIndex);
if (portfolioSlides.length == 1) { 
    console.log(1);
    const buttons = document.getElementsByClassName("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.visibility = "hidden";
    }
}
// Next/previous controls
function plusSlides(n) {
    this.showSlides(slideIndex += n, n);
}

// Thumbnail image controls
function currentSlide(n) {
    this.showSlides(slideIndex = n);
}

function showSlides(n, isPrevious) {
    const dots = document.getElementsByClassName("dot");
    if (n > portfolioSlides.length) {
        this.slideIndex = 1
    }
    if (n < 1) {
        this.slideIndex = portfolioSlides.length
    }
    for (i = 0; i < portfolioSlides.length; i++) {
        portfolioSlides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    portfolioSlides[this.slideIndex - 1].style.display = "inline-flex";
    if (isPrevious === -1 && portfolioSlides.length > 1) {
        portfolioSlides[this.slideIndex - 1].style.animation = "slide-in-from-left 0.5s";
    }
    dots[this.slideIndex - 1].className += " active";
}

var autoSlideIndex = 0;
if (portfolioSlides.length > 1) {
    this.autoShowSlides()
}
function autoShowSlides() {
    for (i = 0; i < portfolioSlides.length; i++) {
        portfolioSlides[i].style.display = "none";
    }
    this.autoSlideIndex++;
    if (this.autoSlideIndex > portfolioSlides.length) {
        this.autoSlideIndex = 1;
    }
    portfolioSlides[this.autoSlideIndex - 1].style.display = "inline-flex";
    setTimeout(this.autoShowSlides, 5000); // Change image every 5 seconds
}