if(!self.define){let s,e={};const a=(a,i)=>(a=new URL(a+".js",i).href,e[a]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=a,s.onload=e,document.head.appendChild(s)}else s=a,importScripts(a),e()})).then((()=>{let s=e[a];if(!s)throw new Error(`Module ${a} didn’t register its module`);return s})));self.define=(i,c)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let t={};const r=s=>a(s,n),d={module:{uri:n},exports:t,require:r};e[n]=Promise.all(i.map((s=>d[s]||r(s)))).then((s=>(c(...s),t)))}}define(["./workbox-9b4d2a02"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"48162ea602ef9a20866556df9f399c10"},{url:"/_next/static/Ua8iHSF63Dc3ysTjBkdLD/_buildManifest.js",revision:"3e2d62a10f4d6bf0b92e14aecf7836f4"},{url:"/_next/static/Ua8iHSF63Dc3ysTjBkdLD/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1085.855758b3d8074ca3.js",revision:"855758b3d8074ca3"},{url:"/_next/static/chunks/1151-982f5776032350f6.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/1979-a26cb94da266866b.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/2270-d1381f994e6896f5.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/231-7ba94310a072825e.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/232-66be46098580014c.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/2366-7d788dea395ad052.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/2381.118b44e7e07b6fe7.js",revision:"118b44e7e07b6fe7"},{url:"/_next/static/chunks/2437-d0d45564f5f8e8b0.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/3206-37d6423263cb1520.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/3246-77d07ce4607f88db.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/3453-b5b114c5a1388678.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/3482-6958d19bc1b2b127.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/3571-cf02cc5e10c2cacb.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/4196-80f8a2b0004d6148.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/4430-fb9d972c7b87c040.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/450-13d78ffcd4d146a9.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/4914-c7d4793b81c6d134.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/4942.008cee6b38c57544.js",revision:"008cee6b38c57544"},{url:"/_next/static/chunks/5026.65c3c295651fca75.js",revision:"65c3c295651fca75"},{url:"/_next/static/chunks/508202eb.0e2d9c385b1f2007.js",revision:"0e2d9c385b1f2007"},{url:"/_next/static/chunks/5137-5fd84d8e99cd4e2f.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/525-f8844b9a937467de.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/5286-81439d44869e33d2.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/5318.dedf1503b6c5f634.js",revision:"dedf1503b6c5f634"},{url:"/_next/static/chunks/5467-bc396218fc9ee417.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/5837-9ff91e5b1e9ce25f.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/5ab80550-89b2aad507ee9750.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/610-804aac13163f9d82.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/6575-fcb41a29c5427cc3.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/6648-95fa60067806c283.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/6731-3a2966a73377f27c.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/6735-485f257c2a02c77c.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/6861.ed9f7d9de55fc97b.js",revision:"ed9f7d9de55fc97b"},{url:"/_next/static/chunks/6901-82cca7d5df519169.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/7023-3d4dc0a86cf0cf20.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/7046.9b86f7dc651c515b.js",revision:"9b86f7dc651c515b"},{url:"/_next/static/chunks/7322.9ed8545c718b2294.js",revision:"9ed8545c718b2294"},{url:"/_next/static/chunks/7434.6865e4d4a52af017.js",revision:"6865e4d4a52af017"},{url:"/_next/static/chunks/7610-6b1eedb665970a52.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/767-7707ad6d2ce73363.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/8128-d4a94e00b38e34a5.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/8235-1fb4be67d7f22b04.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/8472-a4643418fda51d24.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/8847-e5d2bf705b8706ed.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/8890-846efc66537ba676.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/893-a7f18672b523ed8f.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/9039-d6c76b3c68302ab8.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/9424.5d9a8d694142c705.js",revision:"5d9a8d694142c705"},{url:"/_next/static/chunks/app/%5Blang%5D/%5B...not-found%5D/page-4bb56edcc9e00b1c.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/bim-finance/what-is-bim-finance/page-ff179eb0116dcf84.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/bitcoin/introduction-to-bitcoin/page-0ac0ecc1d334eca4.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/bitcoin/lightning-network/page-c9f7071ac3953818.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/bitcoin/the-halving/page-0df5feb8f5d17367.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/bitcoin/the-history-of-bitcoin/page-3c7de0cc81a86af3.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/blockchain/censorship-resistance/page-d4c9f6494ce0aa4c.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/blockchain/consensus-mechanisms/page-7afec67d96f4f9a2.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/blockchain/what-is-a-blockchain/page-aeabcb3884e73a64.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/evm/page-23268906c8136734.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/introduction-to-ethereum/page-984dde0c2bb9368b.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/liquid-staking/page-478a3535f36cc498.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/smart-contracts/page-0068d36aa3650d42.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/understand-the-layers-2/page-ea9697c4a9a8deb6.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/governance/snapshot-protocol/page-3c159a32fd2e0fe9.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/governance/types-of-daos/page-0449b03cc72acf63.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/governance/what-are-daos/page-4f85de5622ecc755.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/investing/bonds-vs-stocks/page-84bbe42e9dd8c96f.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/investing/dollar-cost-averaging/page-3203935c3704b6ce.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/investing/fundamental-analysis/page-95c3ec430f7ca8bc.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/layout-bfe1803db90c7a07.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/metaverse/the-metaverse/page-6b691276db0cc963.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/nfts/introduction-to-nfts/page-914c0b83f5ba823c.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/nfts/price-floor/page-5d3f38896357a851.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/nfts/soulbound-tokens/page-09e37b14f0728879.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/stablecoins/introduction-to-stablecoins/page-d16fc8f3377350ea.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/stablecoins/terra-luna-crash/page-86158b39e48bdd15.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/stablecoins/usdc-by-circle/page-de9e70dcec6360d9.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trading/5-cognitive-biases/page-3311c8080ffa2635.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trading/5-trading-rules/page-f39ca145ab4f4d11.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trading/day-trading/page-56b4934496b68b4b.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trading/futures-contracts/page-71c8833964e6aac4.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trotelcoin/buy-the-nfts/page-37083656b99cf0c7.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trotelcoin/introduction-to-trotelcoin/page-01c20ecfc97281d9.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trotelcoin/proof-of-collective-intelligence/page-8402a2c0b3b3436e.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trotelcoin/stake-your-trotel/page-b93c31dba826784a.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/create-your-first-wallet/page-56e72166c1481a08.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/make-your-first-transaction/page-3d02d0c7ec4c9946.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/secure-your-wallet/page-839c24e0d5b26b94.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/sign-in-with-your-wallet/page-38883b4bd95b02f3.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/web3/airdrops/page-af5becc4fb440c79.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/web3/ens/page-f4e049d40d94e1bf.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/web3/ipfs/page-f404753158f3dea2.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/web3/oracles/page-4418361ffb07366b.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/web3/web3-essentials/page-87f52800d78dfde6.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/account/page-fb3db052239389df.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/buy/page-c466aeb9fd6ea46c.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/category/%5BcategoryUrl%5D/page-2882de8e28f99555.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/claim/page-17ac9c9c040be435.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/home/page-edd8034e4dc144a3.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/inventory/page-75003f2456856409.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/layout-f344df618025a555.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/leaderboard/page-27860dc70fe56ee0.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/learn/page-d5b591ad42afcadc.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/not-found-baa26f808d5f369a.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/not-premium/page-6083d9202f9f9eee.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/premium/page-a3036f83d68de94e.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/receive/page-e4d8a4486b527972.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/send/page-bdeb76e8d0be0231.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/shop/page-ba678fb7f6ff076e.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/stake/page-d21ed4b37ffae43d.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/statistics/page-7952792b1d4ba897.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/submit-a-course/page-3d4f87e67b6d9285.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/swap/page-b3675b964532ae40.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/terms-of-service/page-6feb761b87fc438b.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/%5Blang%5D/vocabulary/page-6d7e10402476d6bd.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/app/_not-found/page-a2c82038ee3c0413.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/f8e4659f-afbb88509c34e7ac.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/fd9d1056-7ca343e28e514773.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/framework-8e0e0f4a6b83a956.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/main-9303aa4bf8ab27d7.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/main-app-53b930afef1ba611.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/pages/_app-f870474a17b7f2fd.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-8a43c07c32828a8c.js",revision:"Ua8iHSF63Dc3ysTjBkdLD"},{url:"/_next/static/css/070d216f498cf568.css",revision:"070d216f498cf568"},{url:"/_next/static/css/43fddeb3b6bb8b4e.css",revision:"43fddeb3b6bb8b4e"},{url:"/_next/static/css/c88eb6171b8ddd4e.css",revision:"c88eb6171b8ddd4e"},{url:"/_next/static/css/ffc03de3ebc3b635.css",revision:"ffc03de3ebc3b635"},{url:"/_next/static/media/0484562807a97172-s.p.woff2",revision:"b550bca8934bd86812d1f5e28c9cc1de"},{url:"/_next/static/media/0a03a6d30c07af2e-s.woff2",revision:"79da53ebaf3308c806394df4882b343d"},{url:"/_next/static/media/30cd8f99d32fa6e8-s.woff2",revision:"e5c1b944d9e3380a062bf911e26728a3"},{url:"/_next/static/media/3f9466fc53690ba7-s.woff2",revision:"173212bc7f69965527b29df7419d615c"},{url:"/_next/static/media/46c21389e888bf13-s.woff2",revision:"272930c09ba14c81bb294be1fe18b049"},{url:"/_next/static/media/4c285fdca692ea22-s.p.woff2",revision:"42d3308e3aca8742731f63154187bdd7"},{url:"/_next/static/media/6245472ced48d3be-s.p.woff2",revision:"335da181ffc3c425a4abf0e8fc0f1e42"},{url:"/_next/static/media/7108afb8b1381ad1-s.p.woff2",revision:"d5a9cbc34d22ffd5c4eb636dcca02f5d"},{url:"/_next/static/media/7db6c35d839a711c-s.p.woff2",revision:"de2b6fe4e663c0669007e5b501c2026b"},{url:"/_next/static/media/8888a3826f4a3af4-s.p.woff2",revision:"792477d09826b11d1e5a611162c9797a"},{url:"/_next/static/media/8d346445d24062b5-s.woff2",revision:"c965abed1310982a4d2148cb81765b56"},{url:"/_next/static/media/94575ae3783e7c88-s.woff2",revision:"a56bc9adab4ad49a6e6d19f72ac23bc0"},{url:"/_next/static/media/9e82d62334b205f4-s.p.woff2",revision:"1c2ea932e7620e3a752301d0e54d3d91"},{url:"/_next/static/media/b957ea75a84b6ea7-s.p.woff2",revision:"0bd523f6049956faaf43c254a719d06a"},{url:"/_next/static/media/dfa2ccbeca9e77a8-s.woff2",revision:"4d88c8f550833714f8721257780b9000"},{url:"/_next/static/media/eafabf029ad39a43-s.p.woff2",revision:"43751174b6b810eb169101a20d8c26f8"},{url:"/_next/static/media/f5767adec246cdc1-s.woff2",revision:"7a1c6501aa2b3327c1cf556362a851cb"},{url:"/_next/static/media/f7099cae2a5aa83f-s.woff2",revision:"8717ab2d20ae5ec51c6ac277e0331511"},{url:"/assets/banner/trotelcoin-banner.png",revision:"75317bc4dff27403f345de67c7f2b644"},{url:"/assets/courses/bim-finance/what-is-bim-finance.jpg",revision:"d18ccf5e4d05527fd082335f43724c1a"},{url:"/assets/courses/bitcoin/introduction-to-bitcoin.jpg",revision:"fd4642b626e179c39fe4666b2b8da5a1"},{url:"/assets/courses/bitcoin/lightning-network.jpg",revision:"853026f3de9c6e52dbf1a8340dc64e19"},{url:"/assets/courses/bitcoin/the-halving.jpg",revision:"c1898152a93c3b2e00ae72821ee43d79"},{url:"/assets/courses/bitcoin/the-history-of-bitcoin.jpg",revision:"3445457496ed64cd3253be58d96aba7d"},{url:"/assets/courses/blockchain/censorship-resistance.jpg",revision:"803bad22ffabb6e6dd0651f72d918e88"},{url:"/assets/courses/blockchain/consensus-mechanisms.jpg",revision:"4f335c9075a784112318a858640ff60c"},{url:"/assets/courses/blockchain/what-is-a-blockchain.jpg",revision:"ded6c92417b19fe75ece6258b31af6e7"},{url:"/assets/courses/ethereum/evm.jpg",revision:"a6111ce46010d758952d23c483b88899"},{url:"/assets/courses/ethereum/introduction-to-ethereum.jpg",revision:"10a48e84585edde0b9061b4b252866c8"},{url:"/assets/courses/ethereum/liquid-staking.jpg",revision:"272b6a06816512855d8d0fdff9d61c44"},{url:"/assets/courses/ethereum/smart-contracts.jpg",revision:"af4bfa009474233669854c0d749dc5b6"},{url:"/assets/courses/ethereum/understand-the-layers-2.jpg",revision:"96b5539300d7cdb7cb2f04363f807ae9"},{url:"/assets/courses/governance/snapshot-protocol.jpg",revision:"c1e6b9859182019ff2912ae6d9302cf9"},{url:"/assets/courses/governance/types-of-daos.jpg",revision:"34fbd03d3754961f1ecf802b3842b0b4"},{url:"/assets/courses/governance/what-are-daos.jpg",revision:"252f2e00730bd1ba9015cf770933a0ff"},{url:"/assets/courses/investing/bonds-vs-stocks.jpg",revision:"980f82228c62f71dbbccd134f2185ae9"},{url:"/assets/courses/investing/dca.jpg",revision:"04c7c6566a3c571347c5895f8ee67dfb"},{url:"/assets/courses/investing/fundamental-analysis.jpg",revision:"349ab2399daaedf971b667e2bfa18a03"},{url:"/assets/courses/metaverse/the-metaverse.jpg",revision:"3cdddb65244ec418cf5704cb31fb49d0"},{url:"/assets/courses/nfts/floor-price.jpg",revision:"2954094578c15e4c8d13ec8c62a12950"},{url:"/assets/courses/nfts/introduction-to-nfts.jpg",revision:"85db119a6528ae9103ba1a6f9933d475"},{url:"/assets/courses/nfts/soulbound-tokens.jpg",revision:"99ed7fc3817563347d507c020a0b7b37"},{url:"/assets/courses/stablecoins/introduction-to-stablecoins.jpg",revision:"017e22aa0ae4860753fa126007713d88"},{url:"/assets/courses/stablecoins/terra-luna-crash.jpg",revision:"513b544e55239dd7076cd55f6271aced"},{url:"/assets/courses/stablecoins/usdc-by-circle.jpg",revision:"71a899039b37f5d0d66b85a66fbf8d0a"},{url:"/assets/courses/trading/biaises.jpg",revision:"8acde2fad21fab4ca8cfbf03ced3b75e"},{url:"/assets/courses/trading/day-trading.jpg",revision:"20468abe3ddaafc9e359ed16ef86a565"},{url:"/assets/courses/trading/futures.jpg",revision:"58a4722b339f95c957f804ca2e6ef4c4"},{url:"/assets/courses/trading/trading-rules.jpg",revision:"c93568f9ee7f60ce9de8585f24351d4c"},{url:"/assets/courses/trotelcoin/buy-the-nfts.jpg",revision:"260a47c00f0259d78d99166f470a1502"},{url:"/assets/courses/trotelcoin/introduction-to-trotelcoin.jpg",revision:"6dba4e133e24b3842ccc91691287841f"},{url:"/assets/courses/trotelcoin/proof-of-collective-intelligence.jpg",revision:"745a2300cc863450037c7cc9f9796537"},{url:"/assets/courses/trotelcoin/stake-your-trotel.jpg",revision:"91bce53eacd49e4b5b893bd4f2d4273e"},{url:"/assets/courses/wallet/create-your-first-wallet.jpg",revision:"3f77e71cd324bf7e052fd7f1fc1d6db1"},{url:"/assets/courses/wallet/make-your-first-transaction.jpg",revision:"6392a4fe95f2fb6cf40a091a6d7fb776"},{url:"/assets/courses/wallet/secure-your-wallet.jpg",revision:"3b20f47905cd108b55f9b206e5753d88"},{url:"/assets/courses/wallet/sign-in-with-your-wallet.jpg",revision:"1f08bd12aaff81c3cf972110959f2a0f"},{url:"/assets/courses/web3/airdrops.jpg",revision:"9119e73eea518cec29ad6ad691ca2a5b"},{url:"/assets/courses/web3/ens.jpg",revision:"6de1370e4ed307a3c7d529157b404add"},{url:"/assets/courses/web3/ipfs.jpg",revision:"8e828e20e9a1c3fdd2d9f7615a6bd788"},{url:"/assets/courses/web3/oracles.jpg",revision:"be7c765bf026c2273623e8da52985f24"},{url:"/assets/courses/web3/web3-essentials.jpg",revision:"2d3f759eaf036eb404aa025f049a29a6"},{url:"/assets/logo/trotelcoin-dark.jpg",revision:"23f70fe00aac836aec67700d750eaef1"},{url:"/assets/logo/trotelcoin-white-72.png",revision:"8b51c182745a54a17d5d6de1e8b49f18"},{url:"/assets/logo/trotelcoin-white.png",revision:"6aea91084927610a4cfcf32837d5b568"},{url:"/assets/logo/trotelcoin.png",revision:"eff77de0be1ad2a5974c57835e0e5620"},{url:"/assets/logo/trotelcoin.svg",revision:"dff0ddd0d6f485783a6bfa1fd792f416"},{url:"/assets/sponsors/bim-finance/bim-finance-logo.png",revision:"1ec7b1742fedd379c57719b381539fae"},{url:"/audio/sounds/bad-answer.wav",revision:"234fd1e4988fc36f204abca174aaf496"},{url:"/audio/sounds/claimed-rewards.wav",revision:"6e3db8991d28b95e9751ad5f553c47b9"},{url:"/audio/sounds/course-finished.wav",revision:"131108985b657c263e1414966c6da8ec"},{url:"/audio/sounds/fail-modal.wav",revision:"1f3b2259f99dd816d287063a283f48e7"},{url:"/audio/sounds/good-answer.wav",revision:"8fb75c98bb5ee8764a33b368b68caeb5"},{url:"/audio/sounds/potion.wav",revision:"7789f96e7176876d8c8880c5472fdcdc"},{url:"/audio/sounds/success-modal.wav",revision:"9623ac57bd85a14167bac1e07d9b85e5"},{url:"/audio/sounds/warning-modal.wav",revision:"1d1ae8f5915153d8e3f16279fdb36a74"},{url:"/manifest.json",revision:"4c303dbb9d32c1b1b8e093554685e2d9"},{url:"/mintme.html",revision:"3396024d39143989d719cf5ebeb4ef86"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:a,state:i})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
