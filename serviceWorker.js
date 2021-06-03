const cacheName = 'cache'
const filesToCache = [
    '/',
    '.htaccess',
    'css/about.css',
    'css/contact.css',
    'css/font/Orbitron/Orbitron-Regular.woff',
    'css/font/Orbitron/Orbitron-Regular.woff2',
    'css/font/Orbitron/stylesheet.css',
    'css/index.css',
    'css/portfolio.css',
    'css/styles.css',
    'favicon.ico',
    'files/portfolio.txt',
    'images/about.jpg',
    'images/appIcon/icon128.png',
    'images/appIcon/icon144.png',
    'images/appIcon/icon152.png',
    'images/appIcon/icon192.png',
    'images/appIcon/icon256.png',
    'images/appIcon/icon512.png',
    'images/contact_page.jpg',
    'images/home_page.jpg',
    'images/logos/AndroidSimpleAIChess.jpg',
    'images/logos/Connect4.JPG',
    'images/logos/KnapsackProblem.jpg',
    'images/logos/LibGDX-Chess-Game.jpg',
    'images/logos/SimpleParallelChessAI.jpg',
    'images/logos/SimpleParallelDispatcher.jpg',
    'images/logos/TextEditor.jpg',
    'images/logos/TextEditorFX.jpg',
    'images/logos/TicTacToe.jpg',
    'images/nextButton.jpg',
    'images/portfolio_background/AndroidSimpleAIChess.jpg',
    'images/portfolio_background/Connect4.jpg',
    'images/portfolio_background/KnapsackProblem.jpg',
    'images/portfolio_background/LibGDX-Chess-Game.jpg',
    'images/portfolio_background/SimpleParallelChessAI.jpg',
    'images/portfolio_background/SimpleParallelDispatcher.jpg',
    'images/portfolio_background/TextEditor.jpg',
    'images/portfolio_background/TextEditorFX.jpg',
    'images/portfolio_background/TicTacToe.jpg',
    'images/portfolio_page.jpg',
    'images/previousButton.jpg',
    'images/tick.jpg',
    'index.php',
    'js/aiWorker.js',
    'js/allPage.js',
    'js/allPath.js',
    'js/Connect4JS/board/Board.js',
    'js/Connect4JS/board/Tile.js',
    'js/Connect4JS/move/Move.js',
    'js/Connect4JS/package.json',
    'js/Connect4JS/piece/League.js',
    'js/Connect4JS/piece/Piece.js',
    'js/Connect4JS/player/ai/Evaluator.js',
    'js/Connect4JS/player/ai/Minimax.js',
    'js/Connect4JS/player/Player.js',
    'js/contactFormValidation.js',
    'js/contactPopUp.js',
    'js/index.js',
    'js/portfolio.js',
    'manifest.json',
    'php/about.php',
    'php/contact.php',
    'php/footer.php',
    'php/header.php',
    'php/portfolio.php',
    'serviceWorker.js'
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