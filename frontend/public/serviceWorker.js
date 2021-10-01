const cacheName = 'cache';
const filesToCache = [
    'frontend/.eslintrc',
    '/',
    'frontend/package.json',
    'frontend/public/asset/files/resume/GervinFungDaXuenResume_UTAR_dark.pdf',
    'frontend/public/asset/files/resume/GervinFungDaXuenResume_UTAR_light.pdf',
    'frontend/public/asset/images/icons/favicon.ico',
    'frontend/public/asset/images/icons/icon-128x128.png',
    'frontend/public/asset/images/icons/icon-144x144.png',
    'frontend/public/asset/images/icons/icon-152x152.png',
    'frontend/public/asset/images/icons/icon-192x192.png',
    'frontend/public/asset/images/icons/icon-384x384.png',
    'frontend/public/asset/images/icons/icon-512x512.png',
    'frontend/public/asset/images/icons/icon-72x72.png',
    'frontend/public/asset/images/icons/icon-96x96.png',
    'frontend/public/asset/images/logo/AndroidSimpleAIChess.webp',
    'frontend/public/asset/images/logo/CommonSortingAlgorithms.webp',
    'frontend/public/asset/images/logo/Connect4.webp',
    'frontend/public/asset/images/logo/KnapsackProblem.webp',
    'frontend/public/asset/images/logo/LibGDX-Chess-Game.webp',
    'frontend/public/asset/images/logo/MPN_CPP.webp',
    'frontend/public/asset/images/logo/PythonCalculator.webp',
    'frontend/public/asset/images/logo/RealTimeMarkdown.webp',
    'frontend/public/asset/images/logo/Room.webp',
    'frontend/public/asset/images/logo/SimpleParallelChessAI.webp',
    'frontend/public/asset/images/logo/SimpleParallelDispatcher.webp',
    'frontend/public/asset/images/logo/TextEditor.webp',
    'frontend/public/asset/images/logo/TextEditorFX.webp',
    'frontend/public/asset/images/logo/Tic-Tac-Toe-AI.webp',
    'frontend/public/asset/images/logo/TicTacToe.webp',
    'frontend/public/asset/images/others/about.webp',
    'frontend/public/asset/images/others/nextButton.webp',
    'frontend/public/asset/images/others/previousButton.webp',
    'frontend/public/asset/images/others/resume.webp',
    'frontend/public/asset/images/others/surprised.gif',
    'frontend/public/asset/images/others/tick.webp',
    'frontend/public/asset/images/portfolioBackground/AndroidSimpleAIChess.webp',
    'frontend/public/asset/images/portfolioBackground/CommonSortingAlgorithms.webp',
    'frontend/public/asset/images/portfolioBackground/Connect4.webp',
    'frontend/public/asset/images/portfolioBackground/KnapsackProblem.webp',
    'frontend/public/asset/images/portfolioBackground/LibGDX-Chess-Game.webp',
    'frontend/public/asset/images/portfolioBackground/MPN_CPP.webp',
    'frontend/public/asset/images/portfolioBackground/PythonCalculator.webp',
    'frontend/public/asset/images/portfolioBackground/RealTimeMarkdown.webp',
    'frontend/public/asset/images/portfolioBackground/Room.webp',
    'frontend/public/asset/images/portfolioBackground/SimpleParallelChessAI.webp',
    'frontend/public/asset/images/portfolioBackground/SimpleParallelDispatcher.webp',
    'frontend/public/asset/images/portfolioBackground/TextEditor.webp',
    'frontend/public/asset/images/portfolioBackground/TextEditorFX.webp',
    'frontend/public/asset/images/portfolioBackground/Tic-Tac-Toe-AI.webp',
    'frontend/public/asset/images/portfolioBackground/TicTacToe.webp',
    'frontend/public/index.html',
    'frontend/public/manifest.webmanifest',
    'frontend/public/robots.txt',
    'frontend/public/serviceWorker.js',
    'frontend/src/App.tsx',
    'frontend/src/cachePath.js',
    'frontend/src/components/CloseFullScreen.tsx',
    'frontend/src/components/contact/Message.tsx',
    'frontend/src/components/Footer.tsx',
    'frontend/src/components/FullScreenNav.tsx',
    'frontend/src/components/HashLoading.tsx',
    'frontend/src/components/Header.tsx',
    'frontend/src/components/index/Game.tsx',
    'frontend/src/components/index/HomeMessage.tsx',
    'frontend/src/components/NavLinks.tsx',
    'frontend/src/components/portfolio/Surprise.tsx',
    'frontend/src/components/resume/ResumeLeft.tsx',
    'frontend/src/components/resume/ResumeRight.tsx',
    'frontend/src/components/Title.tsx',
    'frontend/src/game/board/Board.ts',
    'frontend/src/game/board/BoardUtil.ts',
    'frontend/src/game/board/Tile.ts',
    'frontend/src/game/endgame/EndgameChecker.ts',
    'frontend/src/game/minimax/connectFourEval/ConnectFourEvaluator.ts',
    'frontend/src/game/minimax/Minimax.ts',
    'frontend/src/game/move/Move.ts',
    'frontend/src/game/piece/League.ts',
    'frontend/src/game/piece/Piece.ts',
    'frontend/src/game/player/Player.ts',
    'frontend/src/index.tsx',
    'frontend/src/package.json',
    'frontend/src/page/about.tsx',
    'frontend/src/page/contact.tsx',
    'frontend/src/page/error.tsx',
    'frontend/src/page/index.tsx',
    'frontend/src/page/portfolio.tsx',
    'frontend/src/page/resume.tsx',
    'frontend/src/react-app-env.d.ts',
    'frontend/src/reportWebVitals.ts',
    'frontend/src/serviceWorker.ts',
    'frontend/src/util/contact.ts',
    'frontend/src/util/portfolio.ts',
    'frontend/src/util/theme/colorTheme.ts',
    'frontend/src/util/theme/GlobalTheme.tsx',
    'frontend/src/util/theme/Theme.d.ts',
    'frontend/src/util/url.ts',
    'frontend/tsconfig.json',
    'frontend/yarn.lock',
    'package.json',
    'Procfile',
    'src/asset/files/portfolio.txt',
    'src/server.js',
    'src/util/contact.js',
    'src/util/portfolio.js',
    'yarn.lock',
];

const startService = () => {
    this.caches.delete(cacheName);
    this.addEventListener('install', (event) => {
        this.console.log('Service worker install event!');
        event.waitUntil(
            this.caches.open(cacheName).then(cache => {
                return cache.addAll(filesToCache);
            }).catch((err) => {
                this.console.error(err);
            })
        );
        this.skipWaiting();
    })
    this.addEventListener('activate', (event) => {
        this.console.log('Service worker activate event!');
        event.waitUntil(
            this.caches.keys().then((keyList) => {
                    return Promise.all(keyList.map((key) => {
                        if (filesToCache.indexOf(key) === -1) {
                            return this.caches.delete(key);
                        }
                        return key;
                    })
                );
            })
        );
    });
    this.addEventListener('fetch', (event) => {
        this.console.log('Fetch intercepted for:', event.request.url);
        event.respondWith(
            this.caches.match(event.request).then((resp) => {
                return resp || this.fetch(event.request).then(async (response) => {
                    const cache = await this.caches.open(cacheName);
                    cache.put(event.request, response.clone());
                    return response;
                }).catch((err) => {
                    this.console.log(err)
                });
            })
        );
    })
}

startService();