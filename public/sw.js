if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let n={};const r=e=>a(e,t),d={module:{uri:t},exports:n,require:r};s[t]=Promise.all(c.map((e=>d[e]||r(e)))).then((e=>(i(...e),n)))}}define(["./workbox-9b4d2a02"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"514c8581dd5fc9a0bbdbb954fba68ba8"},{url:"/_next/static/chunks/0429ce87-f6c9428884fef0ca.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/0861ec54-3ab2e964c4aa25d6.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/0e5ce63c-e173fe1bdcf89db8.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/1009.6c87c559aaa54c89.js",revision:"6c87c559aaa54c89"},{url:"/_next/static/chunks/1017-37762e5b43668e5a.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/1174.7b073f9a119b5c1d.js",revision:"7b073f9a119b5c1d"},{url:"/_next/static/chunks/1293.506f265cf5360072.js",revision:"506f265cf5360072"},{url:"/_next/static/chunks/1303.b689676f45b462e2.js",revision:"b689676f45b462e2"},{url:"/_next/static/chunks/1607-96cb5698e994d0fe.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/1634-9eab185b4ff90901.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/1733.7a7dec2a49dfbe42.js",revision:"7a7dec2a49dfbe42"},{url:"/_next/static/chunks/1787.b525df14e705696f.js",revision:"b525df14e705696f"},{url:"/_next/static/chunks/2184.39d129a24c51e592.js",revision:"39d129a24c51e592"},{url:"/_next/static/chunks/223.7179a6f4233d451a.js",revision:"7179a6f4233d451a"},{url:"/_next/static/chunks/2447.f03cbcbb0488bcce.js",revision:"f03cbcbb0488bcce"},{url:"/_next/static/chunks/2687.357d77bc339f97bb.js",revision:"357d77bc339f97bb"},{url:"/_next/static/chunks/2717.f7b2828b034513f8.js",revision:"f7b2828b034513f8"},{url:"/_next/static/chunks/2731.c1747b1033c77da1.js",revision:"c1747b1033c77da1"},{url:"/_next/static/chunks/2762.9fa7c84c5a05488a.js",revision:"9fa7c84c5a05488a"},{url:"/_next/static/chunks/2766.5edd27c1a64a775a.js",revision:"5edd27c1a64a775a"},{url:"/_next/static/chunks/2882.1af5f3366ee207e1.js",revision:"1af5f3366ee207e1"},{url:"/_next/static/chunks/2919.be0e24244ea88cba.js",revision:"be0e24244ea88cba"},{url:"/_next/static/chunks/2e10a248.03bacdcab1486b94.js",revision:"03bacdcab1486b94"},{url:"/_next/static/chunks/2e317778-d2860c513c3d1dd7.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/3159.92fc763991dad6d1.js",revision:"92fc763991dad6d1"},{url:"/_next/static/chunks/3175.edf24e1507d92327.js",revision:"edf24e1507d92327"},{url:"/_next/static/chunks/3437.abd424572b96b138.js",revision:"abd424572b96b138"},{url:"/_next/static/chunks/3560.c300c76ec75fa53b.js",revision:"c300c76ec75fa53b"},{url:"/_next/static/chunks/3585.96c40284fbd99fc4.js",revision:"96c40284fbd99fc4"},{url:"/_next/static/chunks/3994.67c92cc7bcb16e94.js",revision:"67c92cc7bcb16e94"},{url:"/_next/static/chunks/3df6895e.ba5730557ae0e46d.js",revision:"ba5730557ae0e46d"},{url:"/_next/static/chunks/4001.73490b4549ac7445.js",revision:"73490b4549ac7445"},{url:"/_next/static/chunks/4053.db568b558b183e6f.js",revision:"db568b558b183e6f"},{url:"/_next/static/chunks/4247.c37ae7a75855c4f0.js",revision:"c37ae7a75855c4f0"},{url:"/_next/static/chunks/4279.804c1f5815eb210b.js",revision:"804c1f5815eb210b"},{url:"/_next/static/chunks/4338.7328a34ee5752f0f.js",revision:"7328a34ee5752f0f"},{url:"/_next/static/chunks/4380.7e9b925a70078442.js",revision:"7e9b925a70078442"},{url:"/_next/static/chunks/4468.95acfe890d54abb9.js",revision:"95acfe890d54abb9"},{url:"/_next/static/chunks/4604.7e983f9c8696278a.js",revision:"7e983f9c8696278a"},{url:"/_next/static/chunks/4654.025985e1454e7db7.js",revision:"025985e1454e7db7"},{url:"/_next/static/chunks/4694-9be2d243df687148.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/4696.34ee9c72c4a77ad6.js",revision:"34ee9c72c4a77ad6"},{url:"/_next/static/chunks/4723.acdd263090718748.js",revision:"acdd263090718748"},{url:"/_next/static/chunks/4756.47e40d8cf92cce6f.js",revision:"47e40d8cf92cce6f"},{url:"/_next/static/chunks/4818.98cf7163b6ee71f1.js",revision:"98cf7163b6ee71f1"},{url:"/_next/static/chunks/4867.66d35312c11647aa.js",revision:"66d35312c11647aa"},{url:"/_next/static/chunks/4899.ff422cf806e0374b.js",revision:"ff422cf806e0374b"},{url:"/_next/static/chunks/4939.98de946ebd250edd.js",revision:"98de946ebd250edd"},{url:"/_next/static/chunks/5070.a11f5c9d4fe827cc.js",revision:"a11f5c9d4fe827cc"},{url:"/_next/static/chunks/5239.fb8e1606a6c0f637.js",revision:"fb8e1606a6c0f637"},{url:"/_next/static/chunks/5250-5711d5884ae16455.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/5272.043d40ce62c477be.js",revision:"043d40ce62c477be"},{url:"/_next/static/chunks/5290.f4ae4d5bdce9c7aa.js",revision:"f4ae4d5bdce9c7aa"},{url:"/_next/static/chunks/5311.102dc8c5dded2680.js",revision:"102dc8c5dded2680"},{url:"/_next/static/chunks/5426.6caba7b6a056baa5.js",revision:"6caba7b6a056baa5"},{url:"/_next/static/chunks/5539.2d73417675e0064b.js",revision:"2d73417675e0064b"},{url:"/_next/static/chunks/5557.10871f1d4b6d4655.js",revision:"10871f1d4b6d4655"},{url:"/_next/static/chunks/5598.b50d7b324bb4789f.js",revision:"b50d7b324bb4789f"},{url:"/_next/static/chunks/562.8018ac590d44dfd9.js",revision:"8018ac590d44dfd9"},{url:"/_next/static/chunks/5834.389834d104629477.js",revision:"389834d104629477"},{url:"/_next/static/chunks/5973.f8cd3592bcbb2bb4.js",revision:"f8cd3592bcbb2bb4"},{url:"/_next/static/chunks/6079.8951851f37da66bf.js",revision:"8951851f37da66bf"},{url:"/_next/static/chunks/6174.e6843e6f92553853.js",revision:"e6843e6f92553853"},{url:"/_next/static/chunks/6305.05c8b09dd6a755ad.js",revision:"05c8b09dd6a755ad"},{url:"/_next/static/chunks/6363.6a7ee0d39a401c18.js",revision:"6a7ee0d39a401c18"},{url:"/_next/static/chunks/640.523f44f6f0ffae27.js",revision:"523f44f6f0ffae27"},{url:"/_next/static/chunks/6482.70289934ee580a74.js",revision:"70289934ee580a74"},{url:"/_next/static/chunks/6641.4c15b64d0c47388f.js",revision:"4c15b64d0c47388f"},{url:"/_next/static/chunks/6694.4979bf772252bed4.js",revision:"4979bf772252bed4"},{url:"/_next/static/chunks/6784.a7bb7be4b336ac7d.js",revision:"a7bb7be4b336ac7d"},{url:"/_next/static/chunks/6839.0e6faa7ba56dfdd6.js",revision:"0e6faa7ba56dfdd6"},{url:"/_next/static/chunks/6885.529b5aa6241933cf.js",revision:"529b5aa6241933cf"},{url:"/_next/static/chunks/6887.9169c082a5e9e4d6.js",revision:"9169c082a5e9e4d6"},{url:"/_next/static/chunks/6935-ddfe013ba566e535.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/7404.5345313cb57b47a8.js",revision:"5345313cb57b47a8"},{url:"/_next/static/chunks/7406-9319abccd9f5bed3.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/7432.4aedb12b2c1d6fe3.js",revision:"4aedb12b2c1d6fe3"},{url:"/_next/static/chunks/7505.45ade662264082a0.js",revision:"45ade662264082a0"},{url:"/_next/static/chunks/7582.383b599f815e54c4.js",revision:"383b599f815e54c4"},{url:"/_next/static/chunks/7735-6a2717429f3d8d1b.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/790.af697283d468f34d.js",revision:"af697283d468f34d"},{url:"/_next/static/chunks/7909-b1b2e56ccc843d0f.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/7912.4a1fea17b23fb66f.js",revision:"4a1fea17b23fb66f"},{url:"/_next/static/chunks/794.9790d7d7c09ff8b7.js",revision:"9790d7d7c09ff8b7"},{url:"/_next/static/chunks/8069-7bcc49867c2d7362.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/8133.c8b68c50ec627499.js",revision:"c8b68c50ec627499"},{url:"/_next/static/chunks/8279.5ed53d080151fa55.js",revision:"5ed53d080151fa55"},{url:"/_next/static/chunks/8345.6dfe0cfc6102b359.js",revision:"6dfe0cfc6102b359"},{url:"/_next/static/chunks/8354.4f14d34466733ac3.js",revision:"4f14d34466733ac3"},{url:"/_next/static/chunks/8402.911e0b816ca5318c.js",revision:"911e0b816ca5318c"},{url:"/_next/static/chunks/8469.6a191f5a025ea41f.js",revision:"6a191f5a025ea41f"},{url:"/_next/static/chunks/8641.403927d55244620b.js",revision:"403927d55244620b"},{url:"/_next/static/chunks/8740.ebd6d09f7550cfa5.js",revision:"ebd6d09f7550cfa5"},{url:"/_next/static/chunks/8825.bcd17f17f91fb0b3.js",revision:"bcd17f17f91fb0b3"},{url:"/_next/static/chunks/8838.7db34479b9bf2573.js",revision:"7db34479b9bf2573"},{url:"/_next/static/chunks/8922.527b76e5541896a4.js",revision:"527b76e5541896a4"},{url:"/_next/static/chunks/8932.107ea663acb97804.js",revision:"107ea663acb97804"},{url:"/_next/static/chunks/9149.abe35b79e1dcf1a0.js",revision:"abe35b79e1dcf1a0"},{url:"/_next/static/chunks/9243.bba563fbe6d8e7f3.js",revision:"bba563fbe6d8e7f3"},{url:"/_next/static/chunks/936b3b83-001baf5d5775eb8d.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/9750.dda197873396b1dd.js",revision:"dda197873396b1dd"},{url:"/_next/static/chunks/9990.ae4db9e0602dce90.js",revision:"ae4db9e0602dce90"},{url:"/_next/static/chunks/app/%5Blang%5D/%5B...not-found%5D/page-18b36eef7ac43d3e.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/bitcoin/introduction-to-bitcoin/page-ae509e1ac4fe325b.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/bitcoin/the-history-of-bitcoin/page-14ea54852b716d8a.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/blockchain/consensus-mechanisms/page-b844fd812b8d2fd3.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/blockchain/what-is-a-blockchain/page-c91d68f6e4bec673.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/evm/page-c41133cc43b48923.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/introduction-to-ethereum/page-df5571cfa74d3236.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/smart-contracts/page-9a074193ef184496.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/ethereum/understand-the-layers-2/page-f367386c2f4931da.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/governance/what-are-daos/page-9dcc3e3429cabbf4.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/layout-a719379eccd82aab.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trotelcoin/claim-your-nfts/page-a18deb64032ce2d0.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/trotelcoin/introduction-to-trotelcoin/page-3f19aa1158740a21.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/create-your-first-wallet/page-9d1af0fa14dd3710.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/make-your-first-transaction/page-8ad8ff66dc4ab017.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/secure-your-wallet/page-7aa7fa2d617b0159.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/%5BquizId%5D/wallet/sign-in-with-your-wallet/page-4e1baaee1850d588.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/account/page-b7a8b7164ec10f7e.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/home/page-a7504bf9c248cabf.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/layout-28659660cd043a10.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/leaderboard/page-357d83d30384a0ee.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/learn/page-f2edf74ae33acd09.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/not-found-de8b3807e0b55926.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/not-premium/page-3ab2a084dfbadc02.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/premium/page-c8e54c23662abf3c.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/statistics/page-ce00e5a94d8e1bb5.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/terms-of-service/page-e53becee629882e1.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/%5Blang%5D/wallet/page-78d951cbe46db13a.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/app/_not-found-54df56a4be149f44.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/b536a0f1.19fc0f3e3d5d59bc.js",revision:"19fc0f3e3d5d59bc"},{url:"/_next/static/chunks/ef05af88.95fd4be36efee56e.js",revision:"95fd4be36efee56e"},{url:"/_next/static/chunks/fd9d1056-c0a240b29cdb25de.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/feabad31-ef113060dbddde04.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/framework-08aa667e5202eed8.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/main-add6d3d4caddd5a2.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/main-app-25082b317387445b.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/pages/_app-57bdff7978360b1c.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/pages/_error-29037c284dd0eec6.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-c2275bfe37138b5d.js",revision:"rR-99RU2Gvre8O3RvEIv8"},{url:"/_next/static/css/7c81f1e1351f6790.css",revision:"7c81f1e1351f6790"},{url:"/_next/static/css/b65918c9ee7c902c.css",revision:"b65918c9ee7c902c"},{url:"/_next/static/media/0662b626da5db789-s.p.woff2",revision:"7092f7117afa134bee383085e5baffcb"},{url:"/_next/static/media/10939feefdad71be-s.woff2",revision:"72b3ae37567ee5efdf2254b657c36ba9"},{url:"/_next/static/media/1b097aa12b72d9f9-s.woff2",revision:"ba40202b1c1dcacbdbb7bcd2042a410f"},{url:"/_next/static/media/1fe84a733deddad4-s.woff2",revision:"c9f346d5d19d0d10e27b26904f5f6d7f"},{url:"/_next/static/media/20b8b8f6f47c1e10-s.p.woff2",revision:"7def222d1a45cb1cb7d8c3ae675dbdcc"},{url:"/_next/static/media/370d1cc320ec5619-s.woff2",revision:"a6ff41d10fa89e7f8fec937c243d7428"},{url:"/_next/static/media/376dd8dc38524313-s.woff2",revision:"af4d371a10271dafeb343f1eace762bc"},{url:"/_next/static/media/3828f203592f7603-s.p.woff2",revision:"e9fd398a43c9e51f9ee14e757eaf95d9"},{url:"/_next/static/media/51051a7edfeea436-s.p.woff2",revision:"f1b74fe764967ea8636858297f750d66"},{url:"/_next/static/media/591327bf3b62a611-s.woff2",revision:"0ed299a4bb5262e17e2145783b2c18f1"},{url:"/_next/static/media/7777133e901cd5ed-s.woff2",revision:"a09f2fccfee35b7247b08a1a266f0328"},{url:"/_next/static/media/7a78f1ce0329757f-s.woff2",revision:"15ef609d3bea2ccc8a36910ba440e1f3"},{url:"/_next/static/media/839135d04a097cea-s.p.woff2",revision:"79e6e81d255edac7e8627c7e16baccf5"},{url:"/_next/static/media/87c72f23c47212b9-s.p.woff2",revision:"790d0c8dbcd491d29d58f1369c199d40"},{url:"/_next/static/media/8d1a51bb45dd4d14-s.p.woff2",revision:"185244e129c78b5a1e8de9b0319e5f93"},{url:"/_next/static/media/916d3686010a8de2-s.woff2",revision:"9212f6f9860f9fc6c69b02fedf6db8c3"},{url:"/_next/static/media/953974ac5e9ff354-s.woff2",revision:"6731e1ba3788bda094c89ee8fc131aef"},{url:"/_next/static/media/9a881e2ac07d406b-s.woff2",revision:"25b0e113ca7cce3770d542736db26368"},{url:"/_next/static/media/9b44cfc48addbfc9-s.woff2",revision:"b8f12782fb372c92a5c8e3380f926e17"},{url:"/_next/static/media/ac614beb32f7a7c2-s.p.woff2",revision:"20f5992a9c019fb146a38e1cc0c101d3"},{url:"/_next/static/media/aefc8ad6d88b3354-s.woff2",revision:"6a4298fc0390ec22c52f618daa0e82bf"},{url:"/_next/static/media/bd427f25ac24d036-s.woff2",revision:"5426bf50c8455aab7a3e89d1138eb969"},{url:"/_next/static/media/c04551857776278f-s.woff2",revision:"8d91ec1ca2d8b56640a47117e313a3e9"},{url:"/_next/static/media/d36a2a2bb416f59e-s.woff2",revision:"a7f7eebec745ef48ccf7a3d08c66d84a"},{url:"/_next/static/media/d869208648ca5469-s.woff2",revision:"72993dddf88a63e8f226656f7de88e57"},{url:"/_next/static/media/e025c64520263018-s.p.woff2",revision:"dc820d9f0f62811268590ff631f36be9"},{url:"/_next/static/media/f93b79c1ea023ab6-s.woff2",revision:"96b6d54684daa94742f7bfd72a981213"},{url:"/_next/static/rR-99RU2Gvre8O3RvEIv8/_buildManifest.js",revision:"2b54d7db375d2b4c0e6af318090bebea"},{url:"/_next/static/rR-99RU2Gvre8O3RvEIv8/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/assets/banner/trotelcoin-banner.png",revision:"75317bc4dff27403f345de67c7f2b644"},{url:"/assets/courses/1/algorithm-simulation.png",revision:"2d1ddf40410d9b84e7b84e5a24ad190c"},{url:"/assets/courses/1/distribution.png",revision:"53608a4854f5e7ce9d4f78fdbb4c23d3"},{url:"/assets/courses/1/liquidity.png",revision:"60d81a539755799af589e5a8cfbdce05"},{url:"/assets/courses/1/tokenomics.png",revision:"4d1b53e4e8ba44444fa4d2cfae88baff"},{url:"/assets/courses/1/web2-web3.png",revision:"4d4858ad6310d2adfb1a47b288facfea"},{url:"/assets/courses/2/advantages.png",revision:"b88da50b1a769510d93ae60a6d2b37b6"},{url:"/assets/courses/2/claim.png",revision:"9a8f8ef83a453f0a081e284381dcbf4d"},{url:"/assets/courses/placeholder.gif",revision:"4f562754810fb0faf14089f31f5036f7"},{url:"/assets/logo/trotelcoin-white-72.png",revision:"8b51c182745a54a17d5d6de1e8b49f18"},{url:"/assets/logo/trotelcoin-white.png",revision:"9d08d1c9af9de6cdc494308fef714961"},{url:"/assets/logo/trotelcoin.png",revision:"996a66652415c2390172a8a065bc8b7e"},{url:"/assets/logo/trotelcoin.svg",revision:"dff0ddd0d6f485783a6bfa1fd792f416"},{url:"/audio/correct-answer.mp3",revision:"fff351701562233dfc33081675500bf0"},{url:"/audio/lofi.mp3",revision:"f0934ff7e5a95393b11804ca00200cc6"},{url:"/favicon.ico",revision:"9a9859b4a8b2e3dae8a07a821b74578c"},{url:"/manifest.json",revision:"4c303dbb9d32c1b1b8e093554685e2d9"},{url:"/mintme.html",revision:"10bc6ee3356dbdf6c29635b2c704f22f"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
