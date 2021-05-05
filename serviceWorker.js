const cacheName = 'cache'
const filesToCache = [
    '/',
    'css/about.css',
    'css/contact.css',
    'css/font/Orbitron/demo.html',
    'css/font/Orbitron/Orbitron-Regular.woff',
    'css/font/Orbitron/Orbitron-Regular.woff2',
    'css/font/Orbitron/stylesheet.css',
    'css/index.css',
    'css/portfolio.css',
    'css/styles.css',
    'favicon.ico',
    'files/portfolio.txt',
    'files/sphere.txt',
    'images/about_page.jpg',
    'images/appIcon/icon128.png',
    'images/appIcon/icon144.png',
    'images/appIcon/icon152.png',
    'images/appIcon/icon192.png',
    'images/appIcon/icon256.png',
    'images/appIcon/icon512.png',
    'images/contact_page.jpg',
    'images/home_page.jpg',
    'images/logos/AndroidSimpleAIChess.jpg',
    'images/logos/CommonSortingAlgorithms.jpg',
    'images/logos/KnapsackProblem.jpg',
    'images/logos/LibGDX-Chess-Game.jpg',
    'images/logos/MPN_CPP.jpg',
    'images/logos/My-First-Web.jpg',
    'images/logos/PythonCalculator.jpg',
    'images/logos/SimpleChess.jpg',
    'images/logos/SimpleParallelChessAI.jpg',
    'images/logos/SimpleParallelDispatcher.jpg',
    'images/logos/TextEditor.jpg',
    'images/logos/TicTacToe.jpg',
    'images/nextButton.jpg',
    'images/portfolio_background/AndroidSimpleAIChess.jpg',
    'images/portfolio_background/CommonSortingAlgorithms.jpg',
    'images/portfolio_background/KnapsackProblem.jpg',
    'images/portfolio_background/LibGDX-Chess-Game.jpg',
    'images/portfolio_background/MPN_CPP.jpg',
    'images/portfolio_background/My-First-Web.jpg',
    'images/portfolio_background/PythonCalculator.jpg',
    'images/portfolio_background/SimpleChess.jpg',
    'images/portfolio_background/SimpleParallelChessAI.jpg',
    'images/portfolio_background/SimpleParallelDispatcher.jpg',
    'images/portfolio_background/TextEditor.jpg',
    'images/portfolio_background/TicTacToe.jpg',
    'images/portfolio_page.jpg',
    'images/previousButton.jpg',
    'images/profile.gif',
    'index.php',
    'js/allPage.js',
    'js/allPath.js',
    'js/contactFormValidation.js',
    'js/index.js',
    'js/portfolio.js',
    'manifest.json',
    'php/about.php',
    'php/contact.php',
    'php/footer.php',
    'php/header.php',
    'php/portfolio.php'
]

startService()

function startService() {
    self.addEventListener('install', event => {
        console.log('Service worker install event!')
        event.waitUntil(
            caches.open(cacheName)
            .then(cache => {
                return cache.addAll(filesToCache)
            })
        )
        self.skipWaiting()
    })
    self.addEventListener('activate', () => {console.log('Service worker activate event!')})
    self.addEventListener('fetch', event => {
        console.log('Fetch interceptd for:', event.request.url)
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(event.request)
            })
        )
    })
}