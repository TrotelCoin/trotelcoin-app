if(!self.define){let s,e={};const a=(a,i)=>(a=new URL(a+".js",i).href,e[a]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=a,s.onload=e,document.head.appendChild(s)}else s=a,importScripts(a),e()})).then((()=>{let s=e[a];if(!s)throw new Error(`Module ${a} didn’t register its module`);return s})));self.define=(i,n)=>{const t=s||("document"in self?document.currentScript.src:"")||location.href;if(e[t])return;let c={};const r=s=>a(s,t),o={module:{uri:t},exports:c,require:r};e[t]=Promise.all(i.map((s=>o[s]||r(s)))).then((s=>(n(...s),c)))}}define(["./workbox-9b4d2a02"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"93148fffd21816b88aba3bdfaf60cc2f"},{url:"/_next/static/YsAjsqeALUkTpREEOxa-s/_buildManifest.js",revision:"2b54d7db375d2b4c0e6af318090bebea"},{url:"/_next/static/YsAjsqeALUkTpREEOxa-s/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1103-35a640af7c65c515.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/1174.b266dd48f74236b6.js",revision:"b266dd48f74236b6"},{url:"/_next/static/chunks/1189-d049a35cb9af432e.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/1291.4c91993284698d70.js",revision:"4c91993284698d70"},{url:"/_next/static/chunks/1490-fd575d5fde20b741.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/223.8e62b77d6d6e34a9.js",revision:"8e62b77d6d6e34a9"},{url:"/_next/static/chunks/2418-d4864ac8266721bf.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/2478-1bc1127ad392bcf5.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/2567-bb2a0cc93dbb67a7.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/2bd3f8c6-c3073dc958e32777.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/3283-85b6fc58e5266abe.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/3317-473e16f38a747f25.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/3847-36f9608ebcdc6bff.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/4478.bf869ec6f1dbbe4f.js",revision:"bf869ec6f1dbbe4f"},{url:"/_next/static/chunks/4696.18bb8043b3a4cb4c.js",revision:"18bb8043b3a4cb4c"},{url:"/_next/static/chunks/4858-03d73b510f7288d0.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/5188-28a09b712c9f125e.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/5250-1d59ba113329731e.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/5562-b1fa7188315bce26.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/5589-b3cfaff90064c8b4.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/5883.e4477e9126daa625.js",revision:"e4477e9126daa625"},{url:"/_next/static/chunks/590-e6943902af5226df.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/5923-ac78a4b8ff32027e.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/6299-b8df8d7a73601a13.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/6380-e08c79f0d69d2017.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/6526-cfcb244d420b35bc.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/6621-b5cdc697895105d5.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/6770.00daeb6b03469e87.js",revision:"00daeb6b03469e87"},{url:"/_next/static/chunks/6779-546223324bdc92b5.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/680-5b15600bc9d7bd8f.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/6878.5657c32e06476a2e.js",revision:"5657c32e06476a2e"},{url:"/_next/static/chunks/703-6f0ec9bfb52c7db6.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/7169-a80ccecfa7bc4021.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/7238-4368dbbdb3a8d5ec.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/7280-87f04056ffad66ad.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/7291-e4627dba14172326.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/7908-20bae58fe21de58f.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/7922-ee3497786da90a2d.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/8016-8b28e1360fbaa44b.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/8069-6086411732849f97.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/8263-768ba12219cb7ec5.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/8388-59e6c6849e6d23c2.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/8426-bdf1536f3d56c9fe.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/8480-489fc91320802aa1.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/8950-cc192586d8aac0fe.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/9012-0a360b66f994a373.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/9081-bb588b2e1cfb7d38.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/9288-96ee3738dfc1b589.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/9296-1ae690953831168e.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/9412-3258305aae692c6f.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/9434-dc935c57384aae85.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/9888-3182c8f923565b39.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5B...not-found%5D/page-d2b12450b325ead5.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/bitcoin/introduction-to-bitcoin/page-2801304fbdfceb28.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/bitcoin/the-halving/page-a6a7fd5f35fcda4b.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/bitcoin/the-history-of-bitcoin/page-e75e23a8ea6cf3e3.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/blockchain/censorship-resistance/page-3285215e47f48eab.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/blockchain/consensus-mechanisms/page-6920f5930c303ac4.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/blockchain/what-is-a-blockchain/page-45b7629b6c3146b5.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/evm/page-e3769a692ee564aa.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/introduction-to-ethereum/page-ce852bf1a16e6af1.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/smart-contracts/page-502fea9730feb6f0.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/understand-the-layers-2/page-b710dabe44e0b848.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/governance/snapshot-protocol/page-06fb5ec23ca7944a.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/governance/types-of-daos/page-5289d3852511ab05.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/governance/what-are-daos/page-f2107f8fccfa9d9f.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/investing/bonds-vs-stocks/page-1d8afd680df896fb.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/investing/dollar-cost-averaging/page-bd11cb2c42078d23.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/investing/fundamental-analysis/page-1af364b2c111ae5e.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/layout-7d92c160afe877b0.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/metaverse/the-metaverse/page-1de4cbf16913ee47.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/nfts/introduction-to-nfts/page-149f0bfc947aa5e5.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/nfts/price-floor/page-1ace6649a0fd3e26.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/nfts/soulbound-tokens/page-1872675b1384d077.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/stablecoins/introduction-to-stablecoins/page-6820c7759930785f.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/stablecoins/terra-luna-crash/page-de9cfef69f4385a9.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/stablecoins/usdc-by-circle/page-3310bc115681a13d.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trading/5-cognitive-biases/page-13985ad692025abf.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trading/5-trading-rules/page-fe262239bfd184ab.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trading/day-trading/page-3d098d9506ea3bda.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trading/futures-contracts/page-e5219052df49c20d.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trotelcoin/buy-the-nfts/page-72c1c3c0fad7f507.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trotelcoin/introduction-to-trotelcoin/page-0c8fa4569dee7b9c.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trotelcoin/stake-your-trotel/page-6f7004075b0a7f90.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/create-your-first-wallet/page-c5e126c6e13dbd91.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/make-your-first-transaction/page-61f3011ad4936028.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/secure-your-wallet/page-755ca3a2e4e73c2e.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/sign-in-with-your-wallet/page-51db74687f998255.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/web3/airdrops/page-86b38258014c7057.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/web3/ens/page-a9a92d467d378d7a.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/web3/ipfs/page-9735e23e48e0cc91.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/web3/oracles/page-57558da86243db9e.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/web3/web3-essentials/page-af74ddf31b12a301.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/account/page-581bdfb47382101f.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/buy/page-f194219528c61d2f.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/category/%5Bcategory%5D/page-2244d5cd06e27ed1.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/claim/page-e067d824514b5066.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/home/page-818e695bc8515709.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/inventory/page-568fbcd60aa76225.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/layout-974d0a4297ffc39e.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/leaderboard/page-bcb71ee13f14c70c.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/learn/page-2ea4176aa650f4fe.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/not-found-de8b3807e0b55926.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/not-premium/page-818dbc6d865aabfc.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/premium/page-099f65a68e804301.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/receive/page-2f440e3a3b152a1b.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/send/page-408567ac109ed3f1.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/shop/page-16c1584b6ffcefb0.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/stake/page-1717a0fa3fa5df1f.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/statistics/page-da76d3be8ede0873.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/submit-a-course/page-dbf38681d08fb5a8.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/swap/page-32afa5d1030bd000.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/terms-of-service/page-4f3b0be86ef4b4d4.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/%5Blang%5D/vocabulary/page-463e7885af4ae166.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/app/_not-found-a8a4a338dd233099.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/fd9d1056-28cf2dc9a72dfb63.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/framework-08aa667e5202eed8.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/main-app-25082b317387445b.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/main-b445fd4582d6c5d9.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/pages/_app-57bdff7978360b1c.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/pages/_error-29037c284dd0eec6.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-939c53f110d5b886.js",revision:"YsAjsqeALUkTpREEOxa-s"},{url:"/_next/static/css/2a6779f958390607.css",revision:"2a6779f958390607"},{url:"/_next/static/css/7c81f1e1351f6790.css",revision:"7c81f1e1351f6790"},{url:"/_next/static/css/9b12fb59ed7d39f6.css",revision:"9b12fb59ed7d39f6"},{url:"/_next/static/css/cf17286077aa32b2.css",revision:"cf17286077aa32b2"},{url:"/_next/static/media/0484562807a97172-s.woff2",revision:"b550bca8934bd86812d1f5e28c9cc1de"},{url:"/_next/static/media/0a03a6d30c07af2e-s.woff2",revision:"79da53ebaf3308c806394df4882b343d"},{url:"/_next/static/media/30cd8f99d32fa6e8-s.woff2",revision:"e5c1b944d9e3380a062bf911e26728a3"},{url:"/_next/static/media/3f9466fc53690ba7-s.woff2",revision:"173212bc7f69965527b29df7419d615c"},{url:"/_next/static/media/46c21389e888bf13-s.woff2",revision:"272930c09ba14c81bb294be1fe18b049"},{url:"/_next/static/media/4c285fdca692ea22-s.woff2",revision:"42d3308e3aca8742731f63154187bdd7"},{url:"/_next/static/media/6245472ced48d3be-s.woff2",revision:"335da181ffc3c425a4abf0e8fc0f1e42"},{url:"/_next/static/media/7108afb8b1381ad1-s.woff2",revision:"d5a9cbc34d22ffd5c4eb636dcca02f5d"},{url:"/_next/static/media/7db6c35d839a711c-s.woff2",revision:"de2b6fe4e663c0669007e5b501c2026b"},{url:"/_next/static/media/8888a3826f4a3af4-s.woff2",revision:"792477d09826b11d1e5a611162c9797a"},{url:"/_next/static/media/8d346445d24062b5-s.woff2",revision:"c965abed1310982a4d2148cb81765b56"},{url:"/_next/static/media/94575ae3783e7c88-s.woff2",revision:"a56bc9adab4ad49a6e6d19f72ac23bc0"},{url:"/_next/static/media/9e82d62334b205f4-s.woff2",revision:"1c2ea932e7620e3a752301d0e54d3d91"},{url:"/_next/static/media/b957ea75a84b6ea7-s.woff2",revision:"0bd523f6049956faaf43c254a719d06a"},{url:"/_next/static/media/dfa2ccbeca9e77a8-s.woff2",revision:"4d88c8f550833714f8721257780b9000"},{url:"/_next/static/media/eafabf029ad39a43-s.woff2",revision:"43751174b6b810eb169101a20d8c26f8"},{url:"/_next/static/media/f5767adec246cdc1-s.woff2",revision:"7a1c6501aa2b3327c1cf556362a851cb"},{url:"/_next/static/media/f7099cae2a5aa83f-s.woff2",revision:"8717ab2d20ae5ec51c6ac277e0331511"},{url:"/assets/banner/trotelcoin-banner.png",revision:"75317bc4dff27403f345de67c7f2b644"},{url:"/assets/courses/bitcoin/introduction-to-bitcoin.jpg",revision:"fd4642b626e179c39fe4666b2b8da5a1"},{url:"/assets/courses/bitcoin/the-halving.jpg",revision:"c1898152a93c3b2e00ae72821ee43d79"},{url:"/assets/courses/bitcoin/the-history-of-bitcoin.jpg",revision:"3445457496ed64cd3253be58d96aba7d"},{url:"/assets/courses/blockchain/censorship-resistance.jpg",revision:"803bad22ffabb6e6dd0651f72d918e88"},{url:"/assets/courses/blockchain/consensus-mechanisms.jpg",revision:"4f335c9075a784112318a858640ff60c"},{url:"/assets/courses/blockchain/what-is-a-blockchain.jpg",revision:"ded6c92417b19fe75ece6258b31af6e7"},{url:"/assets/courses/ethereum/evm.jpg",revision:"a6111ce46010d758952d23c483b88899"},{url:"/assets/courses/ethereum/introduction-to-ethereum.jpg",revision:"10a48e84585edde0b9061b4b252866c8"},{url:"/assets/courses/ethereum/smart-contracts.jpg",revision:"af4bfa009474233669854c0d749dc5b6"},{url:"/assets/courses/ethereum/understand-the-layers-2.jpg",revision:"96b5539300d7cdb7cb2f04363f807ae9"},{url:"/assets/courses/governance/snapshot-protocol.jpg",revision:"c1e6b9859182019ff2912ae6d9302cf9"},{url:"/assets/courses/governance/types-of-daos.jpg",revision:"34fbd03d3754961f1ecf802b3842b0b4"},{url:"/assets/courses/governance/what-are-daos.jpg",revision:"252f2e00730bd1ba9015cf770933a0ff"},{url:"/assets/courses/investing/bonds-vs-stocks.jpg",revision:"980f82228c62f71dbbccd134f2185ae9"},{url:"/assets/courses/investing/dca.jpg",revision:"04c7c6566a3c571347c5895f8ee67dfb"},{url:"/assets/courses/investing/fundamental-analysis.jpg",revision:"349ab2399daaedf971b667e2bfa18a03"},{url:"/assets/courses/metaverse/the-metaverse.jpg",revision:"3cdddb65244ec418cf5704cb31fb49d0"},{url:"/assets/courses/nfts/floor-price.jpg",revision:"2954094578c15e4c8d13ec8c62a12950"},{url:"/assets/courses/nfts/introduction-to-nfts.jpg",revision:"85db119a6528ae9103ba1a6f9933d475"},{url:"/assets/courses/nfts/soulbound-tokens.jpg",revision:"99ed7fc3817563347d507c020a0b7b37"},{url:"/assets/courses/stablecoins/introduction-to-stablecoins.jpg",revision:"017e22aa0ae4860753fa126007713d88"},{url:"/assets/courses/stablecoins/terra-luna-crash.jpg",revision:"513b544e55239dd7076cd55f6271aced"},{url:"/assets/courses/stablecoins/usdc-by-circle.jpg",revision:"71a899039b37f5d0d66b85a66fbf8d0a"},{url:"/assets/courses/trading/biaises.jpg",revision:"8acde2fad21fab4ca8cfbf03ced3b75e"},{url:"/assets/courses/trading/day-trading.jpg",revision:"20468abe3ddaafc9e359ed16ef86a565"},{url:"/assets/courses/trading/futures.jpg",revision:"58a4722b339f95c957f804ca2e6ef4c4"},{url:"/assets/courses/trading/trading-rules.jpg",revision:"c93568f9ee7f60ce9de8585f24351d4c"},{url:"/assets/courses/trotelcoin/buy-the-nfts.jpg",revision:"260a47c00f0259d78d99166f470a1502"},{url:"/assets/courses/trotelcoin/introduction-to-trotelcoin.jpg",revision:"6dba4e133e24b3842ccc91691287841f"},{url:"/assets/courses/trotelcoin/stake-your-trotel.jpg",revision:"91bce53eacd49e4b5b893bd4f2d4273e"},{url:"/assets/courses/wallet/create-your-first-wallet.jpg",revision:"3f77e71cd324bf7e052fd7f1fc1d6db1"},{url:"/assets/courses/wallet/make-your-first-transaction.jpg",revision:"6392a4fe95f2fb6cf40a091a6d7fb776"},{url:"/assets/courses/wallet/secure-your-wallet.jpg",revision:"3b20f47905cd108b55f9b206e5753d88"},{url:"/assets/courses/wallet/sign-in-with-your-wallet.jpg",revision:"1f08bd12aaff81c3cf972110959f2a0f"},{url:"/assets/courses/web3/airdrops.jpg",revision:"9119e73eea518cec29ad6ad691ca2a5b"},{url:"/assets/courses/web3/ens.jpg",revision:"6de1370e4ed307a3c7d529157b404add"},{url:"/assets/courses/web3/ipfs.jpg",revision:"8e828e20e9a1c3fdd2d9f7615a6bd788"},{url:"/assets/courses/web3/oracles.jpg",revision:"be7c765bf026c2273623e8da52985f24"},{url:"/assets/courses/web3/web3-essentials.jpg",revision:"2d3f759eaf036eb404aa025f049a29a6"},{url:"/assets/logo/trotelcoin-dark.jpg",revision:"23f70fe00aac836aec67700d750eaef1"},{url:"/assets/logo/trotelcoin-white-72.png",revision:"8b51c182745a54a17d5d6de1e8b49f18"},{url:"/assets/logo/trotelcoin-white.png",revision:"6aea91084927610a4cfcf32837d5b568"},{url:"/assets/logo/trotelcoin.png",revision:"eff77de0be1ad2a5974c57835e0e5620"},{url:"/assets/logo/trotelcoin.svg",revision:"dff0ddd0d6f485783a6bfa1fd792f416"},{url:"/audio/sounds/bad-answer.wav",revision:"234fd1e4988fc36f204abca174aaf496"},{url:"/audio/sounds/claimed-rewards.wav",revision:"6e3db8991d28b95e9751ad5f553c47b9"},{url:"/audio/sounds/course-finished.wav",revision:"131108985b657c263e1414966c6da8ec"},{url:"/audio/sounds/fail-modal.wav",revision:"1f3b2259f99dd816d287063a283f48e7"},{url:"/audio/sounds/good-answer.wav",revision:"8fb75c98bb5ee8764a33b368b68caeb5"},{url:"/audio/sounds/potion.wav",revision:"7789f96e7176876d8c8880c5472fdcdc"},{url:"/audio/sounds/success-modal.wav",revision:"9623ac57bd85a14167bac1e07d9b85e5"},{url:"/audio/sounds/warning-modal.wav",revision:"1d1ae8f5915153d8e3f16279fdb36a74"},{url:"/manifest.json",revision:"4c303dbb9d32c1b1b8e093554685e2d9"},{url:"/mintme.html",revision:"10bc6ee3356dbdf6c29635b2c704f22f"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:a,state:i})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
