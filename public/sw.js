if(!self.define){let e,s={};const a=(a,t)=>(a=new URL(a+".js",t).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(t,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let i={};const u=e=>a(e,n),r={module:{uri:n},exports:i,require:u};s[n]=Promise.all(t.map((e=>r[e]||u(e)))).then((e=>(c(...e),i)))}}define(["./workbox-9b4d2a02"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"f29759faf188c2628d50633132f0e13e"},{url:"/_next/static/chunks/1174.b266dd48f74236b6.js",revision:"b266dd48f74236b6"},{url:"/_next/static/chunks/1484-c975f84e14c496d1.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/188.852dbd1148666379.js",revision:"852dbd1148666379"},{url:"/_next/static/chunks/223.b5292fac0b08664c.js",revision:"b5292fac0b08664c"},{url:"/_next/static/chunks/245-b381b5b6b91e00ff.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/2bd3f8c6-c3073dc958e32777.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/3096-d2567255db213cb2.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/3147-965ad3e234b88542.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/325-c1e3c3070d7dc1c1.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/3289-bf469c3f842ff5ed.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/3317-3e233341ca0c85f5.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/3498-8de262e95130ca68.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/3819-12dba88318cff661.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/3926-cea1f21e88064a9e.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/4319-c159a3293c08e8e6.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/4478.aefffeb37352c5b5.js",revision:"aefffeb37352c5b5"},{url:"/_next/static/chunks/4696.b4352c6297349a0f.js",revision:"b4352c6297349a0f"},{url:"/_next/static/chunks/5250-1d59ba113329731e.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/5544-c28eae5d70a576f6.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/5763-005c60b67568ed40.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/5806-8a1127661b42a6ec.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/5883.e4477e9126daa625.js",revision:"e4477e9126daa625"},{url:"/_next/static/chunks/6380-9809031bdca38dfa.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/6526-cfcb244d420b35bc.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/655-320ee1b0735760a1.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/6621-b5cdc697895105d5.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/6770.00daeb6b03469e87.js",revision:"00daeb6b03469e87"},{url:"/_next/static/chunks/6873-5326c5a630835e61.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/6878.5657c32e06476a2e.js",revision:"5657c32e06476a2e"},{url:"/_next/static/chunks/703-6f0ec9bfb52c7db6.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/7186-9a2ec148be87e143.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/7238-f32c506ea9ebe284.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/767-eb51874b6f8676ec.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/7738-d8ff5fd8d3def0ab.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/7908-2c4af83c4c8b9e7a.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/8016-8b28e1360fbaa44b.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/8069-6086411732849f97.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/8388-9dc006f33df8b62f.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/8599-15d29858765004ea.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/9251-ba6b3b04962b2e54.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/9296-17072e853cc7618b.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/9315-8fa5cdff9afa1472.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/94-6d6104ccb973c7d2.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/940-73520ff94e2ee01d.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/9888-3182c8f923565b39.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/%5B...not-found%5D/page-d2b12450b325ead5.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/bitcoin/introduction-to-bitcoin/page-db1a87d5140ea9ae.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/bitcoin/the-history-of-bitcoin/page-1d4f48acce4a11a4.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/blockchain/consensus-mechanisms/page-c2f272e0c2b688b1.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/blockchain/what-is-a-blockchain/page-8df7773e1ae93e29.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/evm/page-daf67a771f9e09f3.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/introduction-to-ethereum/page-13c010d2b9788610.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/smart-contracts/page-4216f6ee7d703aec.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/understand-the-layers-2/page-83e9ed864a174ef8.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/governance/what-are-daos/page-d71a8ad1af7a2fe1.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/layout-492407936359b044.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/stablecoins/introduction-to-stablecoins/page-bb31ebda67f4188a.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trotelcoin/buy-the-nfts/page-ea77f8a923d58c7e.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trotelcoin/introduction-to-trotelcoin/page-9e01717210aa273e.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trotelcoin/stake-your-trotelcoins/page-87217d8d0f40be58.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/create-your-first-wallet/page-850e1556bd02edae.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/make-your-first-transaction/page-02edbd56a02df43d.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/secure-your-wallet/page-0ce72b16ec9243cd.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/sign-in-with-your-wallet/page-e80282c9880079c4.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/web3/web3-essentials/page-304ea680ac32e3a4.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/account/page-6df74c65a244bb32.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/category/%5Bcategory%5D/page-8994bde4d466260c.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/home/page-cb2c7201e14412fa.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/layout-68f572d2ce24ac8a.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/leaderboard/page-a3c22cb44a33be1d.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/learn/chapters/page-23a1f123d3f5e640.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/learn/page-4594aef59e69cdb1.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/learn/vocabulary/page-74fa8427c4762c5e.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/not-found-de8b3807e0b55926.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/not-premium/page-3499496e0320ebcc.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/shop/inventory/page-eb60593e90d56e9f.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/shop/items/page-ddc3c434e34c9961.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/shop/page-557c1a825dcf7422.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/shop/ranks/page-fd4e939d0c7f7678.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/statistics/page-e4bd8a0e3dfd591a.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/terms-of-service/page-4f3b0be86ef4b4d4.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/wallet/buy/page-aa39cda6f618ca75.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/wallet/claim/page-a8a8446e2f85a7a9.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/wallet/page-562cbc91b2485b70.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/wallet/receive/page-4ec3c92af53d4575.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/wallet/send/page-e3c5dfa8f96564ae.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/wallet/stake/page-3f1501f9a9939ea7.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/%5Blang%5D/wallet/swap/page-ed570c89c193491f.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/app/_not-found-a8a4a338dd233099.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/fd9d1056-28cf2dc9a72dfb63.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/framework-08aa667e5202eed8.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/main-8573755155f07d22.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/main-app-25082b317387445b.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/pages/_app-57bdff7978360b1c.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/pages/_error-29037c284dd0eec6.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-b3450382b10c86d6.js",revision:"zzqWN1d_-VDUtuKL7czMI"},{url:"/_next/static/css/2a6779f958390607.css",revision:"2a6779f958390607"},{url:"/_next/static/css/7c81f1e1351f6790.css",revision:"7c81f1e1351f6790"},{url:"/_next/static/css/9b12fb59ed7d39f6.css",revision:"9b12fb59ed7d39f6"},{url:"/_next/static/css/cc4e42590866e121.css",revision:"cc4e42590866e121"},{url:"/_next/static/media/0484562807a97172-s.woff2",revision:"b550bca8934bd86812d1f5e28c9cc1de"},{url:"/_next/static/media/0a03a6d30c07af2e-s.woff2",revision:"79da53ebaf3308c806394df4882b343d"},{url:"/_next/static/media/30cd8f99d32fa6e8-s.woff2",revision:"e5c1b944d9e3380a062bf911e26728a3"},{url:"/_next/static/media/3f9466fc53690ba7-s.woff2",revision:"173212bc7f69965527b29df7419d615c"},{url:"/_next/static/media/46c21389e888bf13-s.woff2",revision:"272930c09ba14c81bb294be1fe18b049"},{url:"/_next/static/media/4c285fdca692ea22-s.woff2",revision:"42d3308e3aca8742731f63154187bdd7"},{url:"/_next/static/media/6245472ced48d3be-s.woff2",revision:"335da181ffc3c425a4abf0e8fc0f1e42"},{url:"/_next/static/media/7108afb8b1381ad1-s.woff2",revision:"d5a9cbc34d22ffd5c4eb636dcca02f5d"},{url:"/_next/static/media/7db6c35d839a711c-s.woff2",revision:"de2b6fe4e663c0669007e5b501c2026b"},{url:"/_next/static/media/8888a3826f4a3af4-s.woff2",revision:"792477d09826b11d1e5a611162c9797a"},{url:"/_next/static/media/8d346445d24062b5-s.woff2",revision:"c965abed1310982a4d2148cb81765b56"},{url:"/_next/static/media/94575ae3783e7c88-s.woff2",revision:"a56bc9adab4ad49a6e6d19f72ac23bc0"},{url:"/_next/static/media/9e82d62334b205f4-s.woff2",revision:"1c2ea932e7620e3a752301d0e54d3d91"},{url:"/_next/static/media/b957ea75a84b6ea7-s.woff2",revision:"0bd523f6049956faaf43c254a719d06a"},{url:"/_next/static/media/dfa2ccbeca9e77a8-s.woff2",revision:"4d88c8f550833714f8721257780b9000"},{url:"/_next/static/media/eafabf029ad39a43-s.woff2",revision:"43751174b6b810eb169101a20d8c26f8"},{url:"/_next/static/media/f5767adec246cdc1-s.woff2",revision:"7a1c6501aa2b3327c1cf556362a851cb"},{url:"/_next/static/media/f7099cae2a5aa83f-s.woff2",revision:"8717ab2d20ae5ec51c6ac277e0331511"},{url:"/_next/static/zzqWN1d_-VDUtuKL7czMI/_buildManifest.js",revision:"2b54d7db375d2b4c0e6af318090bebea"},{url:"/_next/static/zzqWN1d_-VDUtuKL7czMI/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/assets/banner/trotelcoin-banner.png",revision:"75317bc4dff27403f345de67c7f2b644"},{url:"/assets/courses/1/algorithm-simulation.png",revision:"2d1ddf40410d9b84e7b84e5a24ad190c"},{url:"/assets/courses/1/distribution.png",revision:"53608a4854f5e7ce9d4f78fdbb4c23d3"},{url:"/assets/courses/1/liquidity.png",revision:"60d81a539755799af589e5a8cfbdce05"},{url:"/assets/courses/1/tokenomics.png",revision:"4d1b53e4e8ba44444fa4d2cfae88baff"},{url:"/assets/courses/1/web2-web3.png",revision:"4d4858ad6310d2adfb1a47b288facfea"},{url:"/assets/courses/16/staking-interface.png",revision:"edd8fa29718bae875e3eab4eea9b026e"},{url:"/assets/courses/16/staking-voting-power.png",revision:"98ddc788792c233d7fc74032b40e9e91"},{url:"/assets/courses/2/advantages.png",revision:"b88da50b1a769510d93ae60a6d2b37b6"},{url:"/assets/courses/2/claim.png",revision:"9a8f8ef83a453f0a081e284381dcbf4d"},{url:"/assets/courses/3/seed-phrase.png",revision:"3f043c4a4315833e4bf06beb60641942"},{url:"/assets/courses/3/wallet.png",revision:"609ad5302997ed58960a4b6276e42580"},{url:"/assets/courses/9/commodities.png",revision:"986d88efd875f0ed5e57be00c9b44a4e"},{url:"/assets/courses/9/encryption.png",revision:"04a50e34a73b848325c4d84f11371d17"},{url:"/assets/courses/9/gold-and-bitcoin.png",revision:"f54bec0ac1a1c13e274c8540f8e1a0b6"},{url:"/assets/courses/9/unicorn-exchange.png",revision:"b2e53cc4f11125d2789970d79a54cbe7"},{url:"/assets/courses/placeholder.gif",revision:"4f562754810fb0faf14089f31f5036f7"},{url:"/assets/logo/trotelcoin-dark.jpg",revision:"23f70fe00aac836aec67700d750eaef1"},{url:"/assets/logo/trotelcoin-white-72.png",revision:"8b51c182745a54a17d5d6de1e8b49f18"},{url:"/assets/logo/trotelcoin-white.png",revision:"6aea91084927610a4cfcf32837d5b568"},{url:"/assets/logo/trotelcoin.png",revision:"eff77de0be1ad2a5974c57835e0e5620"},{url:"/assets/logo/trotelcoin.svg",revision:"dff0ddd0d6f485783a6bfa1fd792f416"},{url:"/audio/lofi.mp3",revision:"f0934ff7e5a95393b11804ca00200cc6"},{url:"/audio/sounds/bad-answer.wav",revision:"234fd1e4988fc36f204abca174aaf496"},{url:"/audio/sounds/blue-button.wav",revision:"0c98a6b5fc9a66e0c474b9716bab3a03"},{url:"/audio/sounds/claimed-rewards.wav",revision:"6e3db8991d28b95e9751ad5f553c47b9"},{url:"/audio/sounds/course-finished.wav",revision:"131108985b657c263e1414966c6da8ec"},{url:"/audio/sounds/fail-modal.wav",revision:"1f3b2259f99dd816d287063a283f48e7"},{url:"/audio/sounds/good-answer.wav",revision:"8fb75c98bb5ee8764a33b368b68caeb5"},{url:"/audio/sounds/potion.wav",revision:"7789f96e7176876d8c8880c5472fdcdc"},{url:"/audio/sounds/success-modal.wav",revision:"9623ac57bd85a14167bac1e07d9b85e5"},{url:"/audio/sounds/warning-modal.wav",revision:"1d1ae8f5915153d8e3f16279fdb36a74"},{url:"/manifest.json",revision:"4c303dbb9d32c1b1b8e093554685e2d9"},{url:"/mintme.html",revision:"10bc6ee3356dbdf6c29635b2c704f22f"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
