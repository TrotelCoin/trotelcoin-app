if(!self.define){let e,a={};const t=(t,s)=>(t=new URL(t+".js",s).href,a[t]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=a,document.head.appendChild(e)}else e=t,importScripts(t),a()})).then((()=>{let e=a[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(s,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(a[c])return;let n={};const r=e=>t(e,c),l={module:{uri:c},exports:n,require:r};a[c]=Promise.all(s.map((e=>l[e]||r(e)))).then((e=>(i(...e),n)))}}define(["./workbox-9b4d2a02"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"ae25a2bad2bba461c41db0fb132f6655"},{url:"/_next/static/chunks/1103-35a640af7c65c515.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/1174.b266dd48f74236b6.js",revision:"b266dd48f74236b6"},{url:"/_next/static/chunks/1189-91027f0a51124ad1.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/1291.4c91993284698d70.js",revision:"4c91993284698d70"},{url:"/_next/static/chunks/223.8e62b77d6d6e34a9.js",revision:"8e62b77d6d6e34a9"},{url:"/_next/static/chunks/2478-1bc1127ad392bcf5.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/2567-bb2a0cc93dbb67a7.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/2bd3f8c6-c3073dc958e32777.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/3147-965ad3e234b88542.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/3283-64984b692800dc67.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/4478.bf869ec6f1dbbe4f.js",revision:"bf869ec6f1dbbe4f"},{url:"/_next/static/chunks/4696.18bb8043b3a4cb4c.js",revision:"18bb8043b3a4cb4c"},{url:"/_next/static/chunks/5010-cc28ff614b20c511.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/5188-097456fa388a5265.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/5250-1d59ba113329731e.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/5562-b1fa7188315bce26.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/5589-b3cfaff90064c8b4.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/5883.e4477e9126daa625.js",revision:"e4477e9126daa625"},{url:"/_next/static/chunks/590-e6943902af5226df.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/5923-ac78a4b8ff32027e.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/608-7cf5fea6092cba2e.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/6299-b8df8d7a73601a13.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/6306-aab5eb485a6784b1.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/6380-e08c79f0d69d2017.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/6526-cfcb244d420b35bc.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/6621-b5cdc697895105d5.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/6770.00daeb6b03469e87.js",revision:"00daeb6b03469e87"},{url:"/_next/static/chunks/6779-546223324bdc92b5.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/6780-3ae17b9ccc90d857.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/680-5b15600bc9d7bd8f.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/6878.5657c32e06476a2e.js",revision:"5657c32e06476a2e"},{url:"/_next/static/chunks/703-6f0ec9bfb52c7db6.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/7169-febedd71bc2acf7e.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/7238-4368dbbdb3a8d5ec.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/7280-87f04056ffad66ad.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/7291-e4627dba14172326.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/7908-20bae58fe21de58f.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/7922-ee3497786da90a2d.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/8016-8b28e1360fbaa44b.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/802-4d9bf092cdd1c679.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/8069-6086411732849f97.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/8263-768ba12219cb7ec5.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/8388-59e6c6849e6d23c2.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/8426-bdf1536f3d56c9fe.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/8480-489fc91320802aa1.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/8950-cc192586d8aac0fe.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/9012-0a360b66f994a373.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/9288-96ee3738dfc1b589.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/9296-1ae690953831168e.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/9412-3258305aae692c6f.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/9434-cab651d4b1488956.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/9888-3182c8f923565b39.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5B...not-found%5D/page-d2b12450b325ead5.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/bitcoin/introduction-to-bitcoin/page-c954fc8b4a1cbf36.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/bitcoin/the-halving/page-eaba4d33a4ef5e91.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/bitcoin/the-history-of-bitcoin/page-0607e4daa85aaed0.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/blockchain/censorship-resistance/page-81f669a222716a7d.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/blockchain/consensus-mechanisms/page-24262a2f526ed1e9.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/blockchain/what-is-a-blockchain/page-aef1924fc2913e01.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/evm/page-ca446ec13825d899.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/introduction-to-ethereum/page-fe8ff82212d792c7.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/smart-contracts/page-992193721bce06a4.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/understand-the-layers-2/page-443d9152a2bf4b67.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/governance/types-of-daos/page-88fe79cd5a0dd33d.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/governance/what-are-daos/page-0c0af343bf00b040.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/investing/dollar-cost-averaging/page-381182042078c924.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/layout-eab8d4f9310272dc.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/nfts/introduction-to-nfts/page-117a2665cb1ee923.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/nfts/price-floor/page-0b8d20f838c209d3.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/nfts/soulbound-tokens/page-3d81f3477e11b129.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/stablecoins/introduction-to-stablecoins/page-2ab872a760279e90.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/stablecoins/terra-luna-crash/page-63672d0fed318f87.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trading/5-cognitive-biases/page-e9359a612c71c0fd.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trading/day-trading/page-9c3a5a505f51e733.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trotelcoin/buy-the-nfts/page-faaa7e35c8f57469.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trotelcoin/introduction-to-trotelcoin/page-8aab4ead0ed2d07f.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trotelcoin/stake-your-trotelcoins/page-248a28f0350a9638.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/create-your-first-wallet/page-e063d6545184986a.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/make-your-first-transaction/page-abb15bb42bce87df.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/secure-your-wallet/page-f34acab55aea742e.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/sign-in-with-your-wallet/page-42bff3f70d298bd5.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/web3/airdrops/page-dc9ed16f0d14e064.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/web3/ens/page-97c6a4f2473f5378.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/web3/web3-essentials/page-51c7e50289d68312.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/account/page-547dd43e7c06e1a8.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/buy/page-a346e3ddb40ca840.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/category/%5Bcategory%5D/page-f316f95f18c8a735.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/claim/page-f3bf46fd2d9aba9b.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/home/page-c840420eaded7ecb.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/inventory/page-503f2655d5caa766.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/layout-3ce24bbf8ccdc4a3.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/leaderboard/page-59f768ceb6e00b5b.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/learn/page-b0d0d0a429c7bdbb.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/not-found-de8b3807e0b55926.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/not-premium/page-3499496e0320ebcc.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/premium/page-97dfa4c89c82140b.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/receive/page-f5b29ca6388a49cd.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/send/page-b52f791d78e11d7e.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/shop/page-4bd7b52e20cba234.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/stake/page-c92c8ad8ca546edf.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/statistics/page-cf04f078b7bf53a2.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/submit-a-course/page-f4fedd9b75b5454b.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/swap/page-b4f0d1091dcbb1be.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/terms-of-service/page-4f3b0be86ef4b4d4.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/%5Blang%5D/vocabulary/page-643ee9e03c9985c2.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/app/_not-found-a8a4a338dd233099.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/fd9d1056-28cf2dc9a72dfb63.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/framework-08aa667e5202eed8.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/main-7996d48e626d2ff6.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/main-app-25082b317387445b.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/pages/_app-57bdff7978360b1c.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/pages/_error-29037c284dd0eec6.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-00e3354066e10144.js",revision:"fZc4e3itaG2zM_lwROtay"},{url:"/_next/static/css/2a6779f958390607.css",revision:"2a6779f958390607"},{url:"/_next/static/css/7c81f1e1351f6790.css",revision:"7c81f1e1351f6790"},{url:"/_next/static/css/9b12fb59ed7d39f6.css",revision:"9b12fb59ed7d39f6"},{url:"/_next/static/css/f3d6eb55666d739e.css",revision:"f3d6eb55666d739e"},{url:"/_next/static/fZc4e3itaG2zM_lwROtay/_buildManifest.js",revision:"2b54d7db375d2b4c0e6af318090bebea"},{url:"/_next/static/fZc4e3itaG2zM_lwROtay/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/0484562807a97172-s.woff2",revision:"b550bca8934bd86812d1f5e28c9cc1de"},{url:"/_next/static/media/0a03a6d30c07af2e-s.woff2",revision:"79da53ebaf3308c806394df4882b343d"},{url:"/_next/static/media/30cd8f99d32fa6e8-s.woff2",revision:"e5c1b944d9e3380a062bf911e26728a3"},{url:"/_next/static/media/3f9466fc53690ba7-s.woff2",revision:"173212bc7f69965527b29df7419d615c"},{url:"/_next/static/media/46c21389e888bf13-s.woff2",revision:"272930c09ba14c81bb294be1fe18b049"},{url:"/_next/static/media/4c285fdca692ea22-s.woff2",revision:"42d3308e3aca8742731f63154187bdd7"},{url:"/_next/static/media/6245472ced48d3be-s.woff2",revision:"335da181ffc3c425a4abf0e8fc0f1e42"},{url:"/_next/static/media/7108afb8b1381ad1-s.woff2",revision:"d5a9cbc34d22ffd5c4eb636dcca02f5d"},{url:"/_next/static/media/7db6c35d839a711c-s.woff2",revision:"de2b6fe4e663c0669007e5b501c2026b"},{url:"/_next/static/media/8888a3826f4a3af4-s.woff2",revision:"792477d09826b11d1e5a611162c9797a"},{url:"/_next/static/media/8d346445d24062b5-s.woff2",revision:"c965abed1310982a4d2148cb81765b56"},{url:"/_next/static/media/94575ae3783e7c88-s.woff2",revision:"a56bc9adab4ad49a6e6d19f72ac23bc0"},{url:"/_next/static/media/9e82d62334b205f4-s.woff2",revision:"1c2ea932e7620e3a752301d0e54d3d91"},{url:"/_next/static/media/b957ea75a84b6ea7-s.woff2",revision:"0bd523f6049956faaf43c254a719d06a"},{url:"/_next/static/media/dfa2ccbeca9e77a8-s.woff2",revision:"4d88c8f550833714f8721257780b9000"},{url:"/_next/static/media/eafabf029ad39a43-s.woff2",revision:"43751174b6b810eb169101a20d8c26f8"},{url:"/_next/static/media/f5767adec246cdc1-s.woff2",revision:"7a1c6501aa2b3327c1cf556362a851cb"},{url:"/_next/static/media/f7099cae2a5aa83f-s.woff2",revision:"8717ab2d20ae5ec51c6ac277e0331511"},{url:"/assets/banner/trotelcoin-banner.png",revision:"75317bc4dff27403f345de67c7f2b644"},{url:"/assets/logo/trotelcoin-dark.jpg",revision:"23f70fe00aac836aec67700d750eaef1"},{url:"/assets/logo/trotelcoin-white-72.png",revision:"8b51c182745a54a17d5d6de1e8b49f18"},{url:"/assets/logo/trotelcoin-white.png",revision:"6aea91084927610a4cfcf32837d5b568"},{url:"/assets/logo/trotelcoin.png",revision:"eff77de0be1ad2a5974c57835e0e5620"},{url:"/assets/logo/trotelcoin.svg",revision:"dff0ddd0d6f485783a6bfa1fd792f416"},{url:"/audio/sounds/bad-answer.wav",revision:"234fd1e4988fc36f204abca174aaf496"},{url:"/audio/sounds/claimed-rewards.wav",revision:"6e3db8991d28b95e9751ad5f553c47b9"},{url:"/audio/sounds/course-finished.wav",revision:"131108985b657c263e1414966c6da8ec"},{url:"/audio/sounds/fail-modal.wav",revision:"1f3b2259f99dd816d287063a283f48e7"},{url:"/audio/sounds/good-answer.wav",revision:"8fb75c98bb5ee8764a33b368b68caeb5"},{url:"/audio/sounds/potion.wav",revision:"7789f96e7176876d8c8880c5472fdcdc"},{url:"/audio/sounds/success-modal.wav",revision:"9623ac57bd85a14167bac1e07d9b85e5"},{url:"/audio/sounds/warning-modal.wav",revision:"1d1ae8f5915153d8e3f16279fdb36a74"},{url:"/manifest.json",revision:"4c303dbb9d32c1b1b8e093554685e2d9"},{url:"/mintme.html",revision:"10bc6ee3356dbdf6c29635b2c704f22f"},{url:"/sw 2.js",revision:"01605050e01138fdb15f670e04394fae"},{url:"/sw 3.js",revision:"159426603a20d7b57b8a8cd107c7837b"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:t,state:s})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
