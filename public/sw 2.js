if(!self.define){let s,e={};const i=(i,a)=>(i=new URL(i+".js",a).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(a,t)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let c={};const r=s=>i(s,n),f={module:{uri:n},exports:c,require:r};e[n]=Promise.all(a.map((s=>f[s]||r(s)))).then((s=>(t(...s),c)))}}define(["./workbox-9b4d2a02"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"d12b69a95c196139f8da283665d7cbc8"},{url:"/_next/static/JZhtgTYisqkW65XsfrBvj/_buildManifest.js",revision:"2b54d7db375d2b4c0e6af318090bebea"},{url:"/_next/static/JZhtgTYisqkW65XsfrBvj/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/117-e5cd6599987c1982.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/1174.b266dd48f74236b6.js",revision:"b266dd48f74236b6"},{url:"/_next/static/chunks/1189-d049a35cb9af432e.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/1291.4c91993284698d70.js",revision:"4c91993284698d70"},{url:"/_next/static/chunks/223.a3b11a23dafb9be4.js",revision:"a3b11a23dafb9be4"},{url:"/_next/static/chunks/2bd3f8c6-c3073dc958e32777.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/3096-49a4c16058d08692.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/3147-965ad3e234b88542.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/325-f9ae9ebd880a68a7.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/3283-64984b692800dc67.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/3317-80450fb443975ba1.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/3436-e0fd57b9e8308740.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/3498-8de262e95130ca68.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/3895-3c4f0114aef510df.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/4045-409e7cf94780d901.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/4478.bf869ec6f1dbbe4f.js",revision:"bf869ec6f1dbbe4f"},{url:"/_next/static/chunks/4696.18bb8043b3a4cb4c.js",revision:"18bb8043b3a4cb4c"},{url:"/_next/static/chunks/4881-d9a1ab497bbbbc57.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/5250-1d59ba113329731e.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/5589-b3cfaff90064c8b4.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/5616-eb6925623d1f82c9.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/5883.e4477e9126daa625.js",revision:"e4477e9126daa625"},{url:"/_next/static/chunks/5923-ac78a4b8ff32027e.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/6001-d0bb4b249185caa1.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/6380-e08c79f0d69d2017.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/6526-cfcb244d420b35bc.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/6621-b5cdc697895105d5.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/6770.00daeb6b03469e87.js",revision:"00daeb6b03469e87"},{url:"/_next/static/chunks/6779-546223324bdc92b5.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/6820-e01efe4ebf964575.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/6873-00d87c20a81c1f6f.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/6878-4348de8a2e59d917.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/703-6f0ec9bfb52c7db6.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/7169-febedd71bc2acf7e.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/7238-4368dbbdb3a8d5ec.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/7848-3f2a1bfd9c2bf603.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/7908-20bae58fe21de58f.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/7922-ee3497786da90a2d.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/8016-8b28e1360fbaa44b.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/8069-6086411732849f97.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/8388-59e6c6849e6d23c2.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/8480-489fc91320802aa1.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/8950-cc192586d8aac0fe.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/9012-0a360b66f994a373.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/9066.478698928abf344d.js",revision:"478698928abf344d"},{url:"/_next/static/chunks/9296-1ae690953831168e.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/9434-b407e3e6ad7e46e2.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/9888-3182c8f923565b39.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/%5B...not-found%5D/page-d2b12450b325ead5.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/bitcoin/introduction-to-bitcoin/page-411e8a3bb96769df.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/bitcoin/the-history-of-bitcoin/page-30d7eb8108964e27.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/blockchain/censorship-resistance/page-bdee0122a5c4723a.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/blockchain/consensus-mechanisms/page-06ed0edf881a1820.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/blockchain/what-is-a-blockchain/page-e6ade91d1d144143.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/evm/page-1c1143e9a464cb1a.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/introduction-to-ethereum/page-5da2137b67677c4f.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/smart-contracts/page-b3cc9e1595e061bd.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/understand-the-layers-2/page-bfef7ebdceaca553.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/governance/what-are-daos/page-e9a07ba392175e23.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/layout-4d5abb2368196d3e.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/stablecoins/introduction-to-stablecoins/page-1be08a1cf47dfe51.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trading/day-trading/page-db3adec51e13fea2.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trotelcoin/buy-the-nfts/page-797abedd420fad1e.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trotelcoin/introduction-to-trotelcoin/page-ec2d6f2eb74e893d.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trotelcoin/stake-your-trotelcoins/page-8580464235272e9d.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/create-your-first-wallet/page-8708723020a48cca.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/make-your-first-transaction/page-7a172e374aa64a46.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/secure-your-wallet/page-454b62bfb39248cd.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/sign-in-with-your-wallet/page-7bcafe7ccaa5d383.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/web3/web3-essentials/page-3a730766f23d1d6d.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/account/page-26b9bde57cea1ef3.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/category/%5Bcategory%5D/page-5a7269dce9f55587.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/home/page-b8fa769b80899d5c.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/layout-87e8ea0fe26b2728.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/leaderboard/page-efc96db1ccf643b7.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/learn/chapters/page-23a1f123d3f5e640.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/learn/page-5f06e2718322d12c.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/learn/vocabulary/page-f72db9e8f842d103.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/not-found-de8b3807e0b55926.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/not-premium/page-3499496e0320ebcc.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/shop/inventory/page-a7aa99f9cbb06ec8.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/shop/items/page-d4d07d979856c24e.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/shop/page-5d9df2874b79150f.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/shop/ranks/page-439d1b55e75d4a0f.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/statistics/page-d504ba1958dd237b.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/submit-a-course/page-3a6f6a47617b7e9c.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/terms-of-service/page-4f3b0be86ef4b4d4.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/wallet/buy/page-aa39cda6f618ca75.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/wallet/claim/page-258023960e7d1c05.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/wallet/page-6551c505813a4da7.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/wallet/receive/page-96ff8b46f8422d0d.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/wallet/send/page-1c5971f6178f1368.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/wallet/stake/page-8c0648d7803613de.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/%5Blang%5D/wallet/swap/page-bccade6d16c4a93d.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/app/_not-found-a8a4a338dd233099.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/fd9d1056-28cf2dc9a72dfb63.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/framework-08aa667e5202eed8.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/main-7312131dd3ce5e81.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/main-app-25082b317387445b.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/pages/_app-57bdff7978360b1c.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/pages/_error-29037c284dd0eec6.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-0a1dff098d62d52d.js",revision:"JZhtgTYisqkW65XsfrBvj"},{url:"/_next/static/css/2a6779f958390607.css",revision:"2a6779f958390607"},{url:"/_next/static/css/7c81f1e1351f6790.css",revision:"7c81f1e1351f6790"},{url:"/_next/static/css/91f63d40368dfe71.css",revision:"91f63d40368dfe71"},{url:"/_next/static/css/9b12fb59ed7d39f6.css",revision:"9b12fb59ed7d39f6"},{url:"/_next/static/media/0484562807a97172-s.woff2",revision:"b550bca8934bd86812d1f5e28c9cc1de"},{url:"/_next/static/media/0a03a6d30c07af2e-s.woff2",revision:"79da53ebaf3308c806394df4882b343d"},{url:"/_next/static/media/30cd8f99d32fa6e8-s.woff2",revision:"e5c1b944d9e3380a062bf911e26728a3"},{url:"/_next/static/media/3f9466fc53690ba7-s.woff2",revision:"173212bc7f69965527b29df7419d615c"},{url:"/_next/static/media/46c21389e888bf13-s.woff2",revision:"272930c09ba14c81bb294be1fe18b049"},{url:"/_next/static/media/4c285fdca692ea22-s.woff2",revision:"42d3308e3aca8742731f63154187bdd7"},{url:"/_next/static/media/6245472ced48d3be-s.woff2",revision:"335da181ffc3c425a4abf0e8fc0f1e42"},{url:"/_next/static/media/7108afb8b1381ad1-s.woff2",revision:"d5a9cbc34d22ffd5c4eb636dcca02f5d"},{url:"/_next/static/media/7db6c35d839a711c-s.woff2",revision:"de2b6fe4e663c0669007e5b501c2026b"},{url:"/_next/static/media/8888a3826f4a3af4-s.woff2",revision:"792477d09826b11d1e5a611162c9797a"},{url:"/_next/static/media/8d346445d24062b5-s.woff2",revision:"c965abed1310982a4d2148cb81765b56"},{url:"/_next/static/media/94575ae3783e7c88-s.woff2",revision:"a56bc9adab4ad49a6e6d19f72ac23bc0"},{url:"/_next/static/media/9e82d62334b205f4-s.woff2",revision:"1c2ea932e7620e3a752301d0e54d3d91"},{url:"/_next/static/media/b957ea75a84b6ea7-s.woff2",revision:"0bd523f6049956faaf43c254a719d06a"},{url:"/_next/static/media/dfa2ccbeca9e77a8-s.woff2",revision:"4d88c8f550833714f8721257780b9000"},{url:"/_next/static/media/eafabf029ad39a43-s.woff2",revision:"43751174b6b810eb169101a20d8c26f8"},{url:"/_next/static/media/f5767adec246cdc1-s.woff2",revision:"7a1c6501aa2b3327c1cf556362a851cb"},{url:"/_next/static/media/f7099cae2a5aa83f-s.woff2",revision:"8717ab2d20ae5ec51c6ac277e0331511"},{url:"/assets/banner/trotelcoin-banner.png",revision:"75317bc4dff27403f345de67c7f2b644"},{url:"/assets/courses/1/algorithm-simulation.png",revision:"2d1ddf40410d9b84e7b84e5a24ad190c"},{url:"/assets/courses/1/distribution.png",revision:"53608a4854f5e7ce9d4f78fdbb4c23d3"},{url:"/assets/courses/1/liquidity.png",revision:"60d81a539755799af589e5a8cfbdce05"},{url:"/assets/courses/1/tokenomics.png",revision:"4d1b53e4e8ba44444fa4d2cfae88baff"},{url:"/assets/courses/1/web2-web3.png",revision:"4d4858ad6310d2adfb1a47b288facfea"},{url:"/assets/courses/16/staking-interface.png",revision:"edd8fa29718bae875e3eab4eea9b026e"},{url:"/assets/courses/16/staking-voting-power.png",revision:"98ddc788792c233d7fc74032b40e9e91"},{url:"/assets/courses/2/advantages.png",revision:"b88da50b1a769510d93ae60a6d2b37b6"},{url:"/assets/courses/2/claim.png",revision:"9a8f8ef83a453f0a081e284381dcbf4d"},{url:"/assets/courses/3/seed-phrase.png",revision:"3f043c4a4315833e4bf06beb60641942"},{url:"/assets/courses/3/wallet.png",revision:"609ad5302997ed58960a4b6276e42580"},{url:"/assets/courses/9/commodities.png",revision:"986d88efd875f0ed5e57be00c9b44a4e"},{url:"/assets/courses/9/encryption.png",revision:"04a50e34a73b848325c4d84f11371d17"},{url:"/assets/courses/9/gold-and-bitcoin.png",revision:"f54bec0ac1a1c13e274c8540f8e1a0b6"},{url:"/assets/courses/9/unicorn-exchange.png",revision:"b2e53cc4f11125d2789970d79a54cbe7"},{url:"/assets/courses/placeholder.gif",revision:"4f562754810fb0faf14089f31f5036f7"},{url:"/assets/logo/trotelcoin-dark.jpg",revision:"23f70fe00aac836aec67700d750eaef1"},{url:"/assets/logo/trotelcoin-white-72.png",revision:"8b51c182745a54a17d5d6de1e8b49f18"},{url:"/assets/logo/trotelcoin-white.png",revision:"6aea91084927610a4cfcf32837d5b568"},{url:"/assets/logo/trotelcoin.png",revision:"eff77de0be1ad2a5974c57835e0e5620"},{url:"/assets/logo/trotelcoin.svg",revision:"dff0ddd0d6f485783a6bfa1fd792f416"},{url:"/audio/lofi.mp3",revision:"f0934ff7e5a95393b11804ca00200cc6"},{url:"/audio/sounds/bad-answer.wav",revision:"234fd1e4988fc36f204abca174aaf496"},{url:"/audio/sounds/claimed-rewards.wav",revision:"6e3db8991d28b95e9751ad5f553c47b9"},{url:"/audio/sounds/course-finished.wav",revision:"131108985b657c263e1414966c6da8ec"},{url:"/audio/sounds/fail-modal.wav",revision:"1f3b2259f99dd816d287063a283f48e7"},{url:"/audio/sounds/good-answer.wav",revision:"8fb75c98bb5ee8764a33b368b68caeb5"},{url:"/audio/sounds/potion.wav",revision:"7789f96e7176876d8c8880c5472fdcdc"},{url:"/audio/sounds/success-modal.wav",revision:"9623ac57bd85a14167bac1e07d9b85e5"},{url:"/audio/sounds/warning-modal.wav",revision:"1d1ae8f5915153d8e3f16279fdb36a74"},{url:"/manifest.json",revision:"4c303dbb9d32c1b1b8e093554685e2d9"},{url:"/mintme.html",revision:"10bc6ee3356dbdf6c29635b2c704f22f"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:i,state:a})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));