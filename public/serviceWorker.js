const cacheName = 'cache';
const filesToCache = [
    '/',
    '.gitignore',
    'package-lock.json',
    'package.json',
    'Procfile',
    'public/css/about.css',
    'public/css/contact.css',
    'public/css/font/Montserrat/Montserrat-Light.woff',
    'public/css/font/Montserrat/Montserrat-Light.woff2',
    'public/css/font/Montserrat/stylesheet.css',
    'public/css/font/Orbitron/Orbitron-Regular.woff',
    'public/css/font/Orbitron/Orbitron-Regular.woff2',
    'public/css/font/Orbitron/stylesheet.css',
    'public/css/index/index.css',
    'public/css/index/tictactoe.css',
    'public/css/portfolio.css',
    'public/css/resume.css',
    'public/css/styles.css',
    'public/files/portfolio.txt',
    'public/files/resume/GervinFungDaXuenResume_UTAR_dark.pdf',
    'public/files/resume/GervinFungDaXuenResume_UTAR_light.pdf',
    'public/images/appIcon/favicon.ico',
    'public/images/appIcon/icon128.png',
    'public/images/appIcon/icon144.png',
    'public/images/appIcon/icon152.png',
    'public/images/appIcon/icon192.png',
    'public/images/appIcon/icon256.png',
    'public/images/appIcon/icon512.png',
    'public/images/logos/AndroidSimpleAIChess.jpg',
    'public/images/logos/CommonSortingAlgorithms.jpg',
    'public/images/logos/Connect4.jpg',
    'public/images/logos/KnapsackProblem.jpg',
    'public/images/logos/LibGDX-Chess-Game.jpg',
    'public/images/logos/MPN_CPP.jpg',
    'public/images/logos/PythonCalculator.jpg',
    'public/images/logos/Room.jpg',
    'public/images/logos/SimpleParallelChessAI.jpg',
    'public/images/logos/SimpleParallelDispatcher.jpg',
    'public/images/logos/TextEditor.jpg',
    'public/images/logos/TextEditorFX.jpg',
    'public/images/logos/Tic-Tac-Toe-AI.jpg',
    'public/images/logos/TicTacToe.jpg',
    'public/images/others/about.jpg',
    'public/images/others/nextButton.jpg',
    'public/images/others/previousButton.jpg',
    'public/images/others/resume.jpg',
    'public/images/others/surprised.gif',
    'public/images/others/tick.jpg',
    'public/images/portfolio_background/AndroidSimpleAIChess.jpg',
    'public/images/portfolio_background/CommonSortingAlgorithms.jpg',
    'public/images/portfolio_background/Connect4.jpg',
    'public/images/portfolio_background/KnapsackProblem.jpg',
    'public/images/portfolio_background/LibGDX-Chess-Game.jpg',
    'public/images/portfolio_background/MPN_CPP.jpg',
    'public/images/portfolio_background/PythonCalculator.jpg',
    'public/images/portfolio_background/Room.jpg',
    'public/images/portfolio_background/SimpleParallelChessAI.jpg',
    'public/images/portfolio_background/SimpleParallelDispatcher.jpg',
    'public/images/portfolio_background/TextEditor.jpg',
    'public/images/portfolio_background/TextEditorFX.jpg',
    'public/images/portfolio_background/Tic-Tac-Toe-AI.jpg',
    'public/images/portfolio_background/TicTacToe.jpg',
    'public/js/allPage.js',
    'public/js/allPath.js',
    'public/js/Connect4JS/board/Board.js',
    'public/js/Connect4JS/board/Tile.js',
    'public/js/Connect4JS/move/Move.js',
    'public/js/Connect4JS/piece/League.js',
    'public/js/Connect4JS/piece/Piece.js',
    'public/js/Connect4JS/player/ai/Evaluator.js',
    'public/js/Connect4JS/player/ai/Minimax.js',
    'public/js/Connect4JS/player/Player.js',
    'public/js/contact.js',
    'public/js/index/connect4.js',
    'public/js/index/tictactoe.js',
    'public/js/portfolio.js',
    'public/js/TicTacToe/board/Board.js',
    'public/js/TicTacToe/board/Tile.js',
    'public/js/TicTacToe/move/Move.js',
    'public/js/TicTacToe/piece/League.js',
    'public/js/TicTacToe/piece/Piece.js',
    'public/js/TicTacToe/player/ai/Minimax.js',
    'public/js/TicTacToe/player/Player.js',
    'public/manifest.json',
    'public/serviceWorker.js',
    'routes/handlers.js',
    'server.js',
    'views/main/main.handlebars',
    'views/pages/about.handlebars',
    'views/pages/contact.handlebars',
    'views/pages/index.handlebars',
    'views/pages/portfolio.handlebars',
    'views/pages/resume.handlebars'
];

startService();

function startService() {
    caches.delete(cacheName);
    self.addEventListener('install', (event) => {
        console.log('Service worker install event!');
        event.waitUntil(
            caches.open(cacheName).then(cache => {
                return cache.addAll(filesToCache);
            }).catch((err) => {
                console.error(err);
            })
        );
        self.skipWaiting();
    })
    self.addEventListener('activate', (event) => {
        console.log('Service worker activate event!');
        event.waitUntil(
            caches.keys().then((keyList) => {
                    return Promise.all(keyList.map((key) => {
                        if (filesToCache.indexOf(key) === -1) {
                            return caches.delete(key);
                        }
                    })
                );
            })
        );
    });
    self.addEventListener('fetch', (event) => {
        console.log('Fetch intercepted for:', event.request.url);
        event.respondWith(
            caches.match(event.request).then((resp) => {
                return resp || fetch(event.request).then(async (response) => {
                    const cache = await caches.open(cacheName);
                    cache.put(event.request, response.clone());
                    return response;
                }).catch((err) => {
                    console.err(err);
                });
            })
        );
    })
}