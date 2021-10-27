if (!["true"].includes(process.env.JD_LZCLIENT)) {
    console.log("请设置环境变量JD_LZCLIENT为\"true\")来运行本脚本")
	console.log('本脚本耗时巨长，请做好准备，有无豆子看脸。')
    return
}
/*
https://lzkj-isv.isvjcloud.com/wxgame/activity/8530275?activityId=
*/
const $ = new Env('加购物车抽奖');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let cookiesArr = [], cookie = '', message = '';
let activityIdList = [
    "95a036d4a5d64af8aa25bce946ae8aec",
    "3ca396c3d40b4a4eb8bc884dad4e45d7",
    "5409c2b9f6db4591964b712a5ecde939",
    "6169e46916784333b31872a001549ce3",
    "3a541178cda644849987889842892ddf",
    "bdacfcba95964d04b3e1cf0cb0e186dd",
    "95296c37ca8e4d5ea5bc54d561c1b118",
    "8b8937e629124044a72719a7b73d472d",
    "a6ff7d34eab0490bb5dfead2fcd4d5b7",
    "60d5d203147e47f1b7e6e31bf3d4f64e",
    "381f278f30034c1c968ec27475d52ab8",
    "e169d5f957694a5198b2609d93d0cd21",
    "540ddf14f8144f54b14735e84d5b5794",
    "5be87273f10e421f969ab44f2e89cb6b",
    "8e0c9ae62f214d4e893c1edefdd39831",
    "84e214d3142f462c935f34be632e755f",
    "3951a6101a8d4c2b91fe0588f3b90d4d",
    "22f12d38c1e74baaa536fc7caa8536d4",
    "021167e2993d4785adf3d3a8cbcd92a9",
    "1900f76d7d37467ca2eaf17992e67e57",
    "a39f1d98e3ca47fab0b09a387e2f6d31",
    "cee3b7b8f3f0456a84a7341eb245c63f",
    "6a9f3d3fe1734665993ca7be444013ae",
    "0900ad251b2d4bcaa0509e1eb1943ecc",
    "99ba887559804bef9130b988abbf9437",
    "5d200f87a36546ba950281555c21e53b",
    "ed4131ffb1ed4853acd8064b60f77378",
    "d9c51f0aa0634afc81721f195e358aac",
    "71b16635f12540cfaa165d07c53fb1a5",
    "6ddc3889cd0e4bc798e06cf86b8c4db9",
    "beb103015b694349bcc4f74fa4f93f12",
    "ffb4403800e44cfb8a1e52bdda58aa3e",
    "186a059e6ba74a11a1421ccb06a89d95",
    "83756dd037514790926694bcc731a8f9",
    "c22f4dd40946446d96fb8a935c40a2ae",
    "1749940c7e674648817de6927b6f76eb",
    "a6db8c4763114329b46a34ecf67402d5",
    "6fd93d74cd484e55a15f47d832276785",
    "5676445d266742d1988b381e04e69b1f",
    "6efdd0d7f67c4bf48b3ba2d2711a661a",
    "a6084ff3eb8d4c8f8a772749f92970d9",
    "699aa4c8cd1b41cd9d9b54d591862bb9",
    "9198140b216343d29f739c161ab98461",
    "47edff69a42143afa2921be8e323a53c",
    "763c8182470f483eb3990f19391d99fb",
    "05d0b09edb2447f99df985b2ed5da6cb",
    "7795a1d59100485b86760d8de3e78868",
    "1653cbfc99834c05974f55bac1115a4b",
    "8f6d8c4c57214dd8be81e7676683276c",
    "cddba69152894bc586daadaa1c76da49",
    "79d4df50165c49d79526571dc68cd048",
    "8b1d7eb6e9f84e23bb75bc348ca06c05",
    "3a5d0d24cc1b4a2f8fa28b4ee84d88bf",
    "97e13975d303414a9b206c09e0b126ac",
    "80fceed7a970414482a8240025871c39",
    "66c747244a834a87b0cb5fcbf7f11930",
    "fc34aeb0b1974b47b55c7972eaaaaff3",
    "f8af2abb3550430ea71d16db95c122ae",
    "c9f986702fc54e9bb8d90dd35aa0bf53",
    "e83b82b7701146119053dc321492a239",
    "c6c7f5c3c5d449e0b7f14f0d442f6d78",
    "72a13ace86b1499b8bf17831cd151539",
    "166c4360ff084dcf8b745eca0fba2350",
    "378bb02797cb43dbbd225f6149cee42f",
    "2344971a8957480fa2af6fe5c5b4115d",
    "9025a6d98ab3419285e99610510379ed",
    "7dac0e36cee3404d83712529e415093b",
    "fd1847bff86142099ac50b27efe5f0be",
    "304b12397e154c7a9dc42bb266736429",
    "1b4159ed1e9640699017e86838615407",
    "1f7713bc5bc443998047406b0633f425",
    "23068145aa2d496a90d61a72ef42b386",
    "d3182fa5c2d043fbbf0f6bb1ddb30801",
    "78061db5fa9f46eda7f346266d50f1fd",
    "d11163cf367c42cea5390ba7b0212cd4",
    "6a960b3684a2441ca50e55223507a860",
    "f016576357ed419eac21aa69fdc38dbb",
    "eba9a226726e45e9b0443d172a6fe42d",
    "e41b26532b8f4833a55df00c03e0f9d5",
    "c5a7bda439354ce39f815dfbf1b4e5b8",
    "061707c1ba0d4bc1a185aa9e75d3d810",
    "d77c4a24865b4617be5b1d38f3297241",
    "6bda76236dc84bf0a4414a793df9cf68",
    "e257ed5ec9024633944a9b2a17c0d7d0",
    "c067594aeee041818a094403b0a62b60",
    "00289aef303b4a8792152d8408f8d089",
    "fa6a0c1efddc4715ba297036bf2d20e2",
    "07b35bc86eb646ee8a8646027c0b5be7",
    "43a2826534f3428bbe87d91de5852322",
    "209d82e1608a40dc8582383baa8d362d",
    "a4896f81f3914cb880578e26e51f88fa",
    "2f3c55901805489ab47b7cb657ce7a7f",
    "a7d94be098c0431ba2761a1a0a09487a",
    "6f387544869048c297d31953ef218189",
    "aac8e875e7b249cfbdc89a94ee436672",
    "d2c7271d878b4f659628007ef852fce0",
    "274669ab3b514ba0a72567565c89043b",
    "2ba9f8db763842b990f220a0875c989d",
    "f182d87db82b4ee786e8549306fd536c",
    "5407fc0a3c9c4e8d8a0fdb6f8779098a",
    "42a7dc943c01482ea773e3f09ef89a8b",
    "b5df7d1e569f4c8e9ec50b0e7b704041",
    "bdecf2138bb9427a9a21e7629ecc4232",
    "6b554980de5f4576a0c989699dbb6bbe",
    "f1e322b121b740c0ab658cc584f135b0",
    "2cdcfb454bdc435cb1f8e4f0e9a53c2e",
    "19c8c557a42242939024f15c4e514498",
    "4de739cf07804af0be1c5420a5aea6e7",
    "e5917ef9679a4bfbb4e8ee7590084262",
    "1ea5ce9afdd645f29682824a52599e8d",
    "33951aa85e374e3fbce656b767137b46",
    "4709cd3b2f504658b11087c6823efb37",
    "87017c2dca7148a1be64257a79a2d9f9",
    "a28b58fd1d5f4bb48d467db602579809",
    "b0060cefd88f41129e33ec977e9fd4ec",
    "32c5e20b0ea145ca959d320c8e30e33d",
    "90350f5b9a4543b09693cf4a26fbb817",
    "a0ffbc5eaf2142f895906c85f071e60f",
    "09a666ea0de54731a9d161463b0d2968",
    "5ee259b3b42d423c9b092edbe4bba7f7",
    "a7c342d7a67b4a3cab0de22406dc2f32",
    "58b35633322046ab9751abfff8fcd477",
    "1f55a47cf2a744fb9609ee147cb5c701",
    "41b719e536674fad931c9293fc134b1b",
    "4002a7d857434e4e86245094ad9909f4",
    "f3ad71df9c034f2ba7372a496f55fb42",
    "2c6fd0cc08f24a968c939d8ec86bf6cd",
    "568da9fd3b694556bed6129494f061f9",
    "7024ef78b7d74f579645d9f74ee54c40",
    "c8e58e1b1c594ae98d8baec5e1235063",
    "136e61b05fd042d0b39f5ed7d00248d0",
    "cc38b884eed94b299b93c1250437b14a",
    "87f74ace4b2d42c5bb99fe0ce2be8c77",
    "147a9e5762d24f79a5d2779db56b79dd",
    "7df4a950b8ce47c9a47975fea79fb554",
    "8c8fa8048db04cfab0fed02f57f20c17",
    "6ddaf2876d72486a8176e7745ca5afe8",
    "54328759eb5f4bb6b79f0c86e70c2126",
    "e738cfad8d2e4244b504fcd82fdc42c9",
    "8b7c254b67b14df49c658636d6664bc9",
    "8a20add0eee24a7ab875c86971c5c56d",
    "ad48ad3902164c7c920d42b00101fcb9",
    "f56041f707864ec5bccd47f9ce6b1c79",
    "c509c06ef0ee4f7bb90fe7d07892ab47",
    "a39eca744f604aeea030d4b3fc022f11",
    "18d93071150c49b7814f689e0c294f70",
    "2002c2a70b9d46358e962c152d58dacf",
    "f71f790dca0e471dac4d52d42c668d2d",
    "823d62d5423a437a9800b6bea5c9c2ca",
    "c66adbf2a4e24df9a0a9c07216e5fedd",
    "8aacc31c039e43ebbc78a52e525287f9",
    "3759216838a54078806baecae257683b",
    "66f87d0f04f04138a6e64425852e70cd",
    "e40d66cd0ac94835a580f876a7d83fd1",
    "bbaa3a5c5c8d4225a4127110e596313c",
    "dfb3fc9830814fbe881406198e46f7d6",
    "223af331a66a4408a959a04145355cc6",
    "2091af4a778d4140ab948354f1282a43",
    "c8530ed0ba734eba9467fb8eca7077f3",
    "50a569498e8443ed8d12bb7bc1cdda0f",
    "f4a5909258e64f3a8553d723395a48f3",
    "41c110be1ec645768ec8800419c2df27",
    "620b41d78ce245d4ac8b567fa663ef72",
    "48fb2f10a1504347b11a51c9d547025f",
    "5ede0e6049544817a2ef9463f1de1da7",
    "75a2e1a4041e40f4b1a4d3dbebd75bf0",
    "5b33138190b24a14b4ca9dcc3ae6decc",
    "f403d7ae443048f9bffa8d85e4a2ad0a",
    "4c7d52a8bc58407baf34e78dd562ff5f",
    "c8fb05044d6d497eb668c3060c49a2e4",
    "5998ff5fad4b4235b3638764b2b19589",
    "eb896b2199d248cdbe16b5568a1fc5f0",
    "fadd7832312541d28ca2439566acda5e",
    "eeff77200c264e50956c788b95264b05",
    "2c9d2f8e390f4daf9ddfb7b334748d46",
    "872603648e784ee38daaa3b61431fd57",
    "d3ee56fa66964eceab2cc226873f8d48",
    "5ef69e786f79470dabbc49b2d5f0523a",
    "3029f9e9faf8440e825a1237a5c68172",
    "ecf679fd851443a88763ea8aed7fc0b8",
    "f4739c9c45f64e69b84c7739d41a030d",
    "ad0cd9a80dfe49368eedc31b1d19cc67",
    "f8cd40d008a649d48adb935680c13de9",
    "f51b5e93f8914bb8922c98582143a431",
    "55e16abe4c644e7092a58a5770ab97a3",
    "45c2262894b84cc6af24035ed9a46a29",
    "394dba7c2b3f4142af75ae7217eeb214",
    "407a12b58be9461fa296b68dd313006f",
    "20e7afd9326a4cb18fc4e56ce4991bc6",
    "321d4e2d9c9a4765852280f52e45b5a1",
    "1367f751ec5b40fabc74d29feb766f16",
    "8a64c2ceb55546a0baaeaab04f434f45",
    "09ae40074f9b4c378a1f8d2a51cef279",
    "a45d28df24b14c7189df274596e5fb92",
    "bbdd6c28c9b440e390653be4a16d1db0",
    "f0ae73aca3ab4e49b81ca1f4b371bc48",
    "29eb7c7d45ce41edb37bb4872c5b1817",
    "c91b3bd90ee5482f9ee540939c3c42bc",
    "0bade175470542828571e754e7950334",
    "4dd6ddbe97d04abea16bec783a245181",
]
let lz_cookie = {}

if (process.env.ACTIVITY_ID && process.env.ACTIVITY_ID != "") {
    activityId = process.env.ACTIVITY_ID;
}

if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    let cookiesData = $.getdata('CookiesJD') || "[]";
    cookiesData = JSON.parse(cookiesData);
    cookiesArr = cookiesData.map(item => item.cookie);
    cookiesArr.reverse();
    cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
    cookiesArr.reverse();
    cookiesArr = cookiesArr.filter(item => !!item);
}
let removeSize = process.env.JD_CART_REMOVESIZE || 20; // 运行一次取消多全部已关注的商品。数字0表示不取关任何商品
let isRemoveAll = process.env.JD_CART_REMOVEALL || true;    //是否清空，如果为false，则上面设置了多少就只删除多少条
$.keywords = process.env.JD_CART_KEYWORDS || []
$.keywordsNum = 0;
!(async () => {
	console.log('活动预计跑很久，禁止并发直接黑IP')
	console.log('跑完100豆子++++++++')
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    for(let a in activityIdList){
        activityId = activityIdList[a];
        console.log("开起第 "+ a +" 个活动，活动id："+activityId)
        for (let i = 0; i < cookiesArr.length; i++) {
            if (cookiesArr[i]) {
                cookie = cookiesArr[i]
                originCookie = cookiesArr[i]
                newCookie = ''
                $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
                $.index = i + 1;
                $.isLogin = true;
                $.nickName = '';
                await checkCookie();
                console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
                if (!$.isLogin) {
                    $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
                    if ($.isNode()) {
                        await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                    }
                    continue
                }
                authorCodeList = [
                    'b5d9535918264a4f92fff9d314d7db81',
                ]
                $.bean = 0;
                $.ADID = getUUID('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', 1);
                $.UUID = getUUID('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
                $.authorCode = authorCodeList[random(0, authorCodeList.length)]
                $.authorNum = `${random(1000000, 9999999)}`
                $.activityId = activityId
                $.activityUrl = `https://lzkj-isv.isvjcloud.com/wxCollectionActivity/activity2/${$.authorNum}?activityId=${$.activityId}&shareUuid=${encodeURIComponent($.authorCode)}&adsource=null&sid=&un_area=`
                $.drawInfoName = false
                $.getPrize = null;
                await addCart();
                if($.drawInfoName === false || $.getPrize === null){
                    break
                } else if($.getPrize != null && !$.getPrize.includes("京豆")){
                    break
                }
                await $.wait(3000)
                await requireConfig();
                do {
                    await getCart_xh();
                    $.keywordsNum = 0
                    if($.beforeRemove !== "0"){
                        await cartFilter_xh(venderCart);
                        if(parseInt($.beforeRemove) !== $.keywordsNum) await removeCart();
                        else {
                            console.log('由于购物车内的商品均包含关键字，本次执行将不删除购物车数据')
                            break;
                        }
                    } else break;
                } while(isRemoveAll && $.keywordsNum !== $.beforeRemove)
                if ($.bean > 0) {
                    message += `\n【京东账号${$.index}】${$.nickName || $.UserName} \n       └ 获得 ${$.bean} 京豆。`
                }
            }
        }
        await $.wait(3000)
    }
    if (message !== '') {
        if ($.isNode()) {
            await notify.sendNotify($.name, message, '', `\n`);
        } else {
            $.msg($.name, '有点儿收获', message);
        }
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })


async function addCart() {
    $.token = null;
    $.secretPin = null;
    $.venderId = null;
    await getFirstLZCK()
    await getToken();
    await task('customer/getSimpleActInfoVo', `activityId=${$.activityId}`, 1)
    if ($.token) {
        await getMyPing();
        if ($.secretPin) {
            await task('common/accessLogWithAD', `venderId=${$.venderId}&code=6&pin=${encodeURIComponent($.secretPin)}&activityId=${$.activityId}&pageUrl=${$.activityUrl}&subType=app&adSource=tg_xuanFuTuBiao`, 1);
            // await task('wxActionCommon/getUserInfo', `pin=${encodeURIComponent($.secretPin)}`, 1)
            await task('activityContent', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}`)
            if ($.activityContent.drawInfo.name.includes("京豆")) {
                $.log("-> 加入购物车")
                for(let i in $.activityContent.cpvos){
                    await $.wait(3000)
                    await task('addCart', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}&productId=${$.activityContent.cpvos[i].skuId}`)
                }
                $.log("-> 抽奖")
                await $.wait(3000)
                await task('getPrize', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}`)
            } else {
                $.log("未能成功获取到活动信息")
            }
        } else {
            $.log("没有成功获取到用户信息")
        }
    } else {
        $.log("没有成功获取到用户鉴权信息")
    }
}

function task(function_id, body, isCommon = 0) {
    return new Promise(resolve => {
        $.post(taskUrl(function_id, body, isCommon), async (err, resp, data) => {
            try {
                if (err) {
                    $.log(err)
                } else {

                    if (data) {
                        data = JSON.parse(data);
                        if (resp['headers']['set-cookie']) {
                            cookie = `${originCookie};`
                            for (let sk of resp['headers']['set-cookie']) {
                                lz_cookie[sk.split(";")[0].substr(0, sk.split(";")[0].indexOf("="))] = sk.split(";")[0].substr(sk.split(";")[0].indexOf("=") + 1)
                            }
                            for (const vo of Object.keys(lz_cookie)) {
                                cookie += vo + '=' + lz_cookie[vo] + ';'
                            }
                        }
                        if (data.result) {
                            switch (function_id) {
                                case 'customer/getSimpleActInfoVo':
                                    $.jdActivityId = data.data.jdActivityId;
                                    $.venderId = data.data.venderId;
                                    $.activityShopId = data.data.venderId;
                                    break;
                                case 'activityContent':
                                    $.activityContent = data.data;
                                    $.drawInfoName = $.activityContent.drawInfo.name.includes("京豆")
                                    break;
                                case 'addCart':
                                    console.log(data.data)
                                    break
                                case 'getPrize':
                                    console.log(data.data.name)
                                    $.getPrize = data.data.name;
                                    //await notify.sendNotify($.name, data.data.name, '', `\n`);
                                    break
                                default:
                                    $.log(JSON.stringify(data))
                                    break;
                            }
                        }
                    } else {
                        $.log("京东没有返回数据")
                    }
                }
            } catch (error) {
                $.log(error)
            } finally {
                resolve();
            }
        })
    })
}
function taskUrl(function_id, body, isCommon) {
    return {
        url: isCommon ? `https://lzkj-isv.isvjcloud.com/${function_id}` : `https://lzkj-isv.isvjcloud.com/wxCollectionActivity/${function_id}`,
        headers: {
            Host: 'lzkj-isv.isvjcloud.com',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': 'zh-cn',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            Origin: 'https://lzkj-isv.isvjcloud.comm',
            'User-Agent': `jdapp;iPhone;9.5.4;13.6;${$.UUID};network/wifi;ADID/${$.ADID};model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
            Connection: 'keep-alive',
            Referer: $.activityUrl,
            Cookie: cookie
        },
        body: body

    }
}

function getMyPing() {
    let opt = {
        url: `https://lzkj-isv.isvjcloud.com/customer/getMyPing`,
        headers: {
            Host: 'lzkj-isv.isvjcloud.com',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': 'zh-cn',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            Origin: 'https://lzkj-isv.isvjcloud.com',
            'User-Agent': `jdapp;iPhone;9.5.4;13.6;${$.UUID};network/wifi;ADID/${$.ADID};model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
            Connection: 'keep-alive',
            Referer: $.activityUrl,
            Cookie: cookie,
        },
        body: `userId=${$.activityShopId}&token=${$.token}&fromType=APP&riskType=1`
    }
    return new Promise(resolve => {
        $.post(opt, (err, resp, data) => {
            try {
                if (err) {
                    $.log(err)
                } else {
                    if (resp['headers']['set-cookie']) {
                        cookie = `${originCookie};`
                        for (let sk of resp['headers']['set-cookie']) {
                            lz_cookie[sk.split(";")[0].substr(0, sk.split(";")[0].indexOf("="))] = sk.split(";")[0].substr(sk.split(";")[0].indexOf("=") + 1)
                        }
                        for (const vo of Object.keys(lz_cookie)) {
                            cookie += vo + '=' + lz_cookie[vo] + ';'
                        }
                    }
                    if (data) {
                        data = JSON.parse(data)
                        if (data.result) {
                            $.log(`你好：${data.data.nickname}`)
                            $.pin = data.data.nickname;
                            $.secretPin = data.data.secretPin;
                        } else {
                            $.log(data.errorMessage)
                        }
                    } else {
                        $.log("京东返回了空数据")
                    }
                }
            } catch (error) {
                $.log(error)
            } finally {
                resolve();
            }

        })
    })
}
function getFirstLZCK() {
    return new Promise(resolve => {
        $.get({ url: $.activityUrl }, (err, resp, data) => {
            try {
                if (err) {
                    console.log(err)
                } else {
                    if (resp['headers']['set-cookie']) {
                        cookie = `${originCookie};`
                        for (let sk of resp['headers']['set-cookie']) {
                            lz_cookie[sk.split(";")[0].substr(0, sk.split(";")[0].indexOf("="))] = sk.split(";")[0].substr(sk.split(";")[0].indexOf("=") + 1)
                        }
                        for (const vo of Object.keys(lz_cookie)) {
                            cookie += vo + '=' + lz_cookie[vo] + ';'
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            } finally {
                resolve();
            }
        })
    })
}
function getToken() {
    let opt = {
        url: `https://api.m.jd.com/client.action?functionId=isvObfuscator`,
        headers: {
            Host: 'api.m.jd.com',
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: '*/*',
            Connection: 'keep-alive',
            Cookie: cookie,
            'User-Agent': 'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)',
            'Accept-Language': 'zh-Hans-CN;q=1',
            'Accept-Encoding': 'gzip, deflate, br',
        },
        body: `body=%7B%22url%22%3A%20%22https%3A//lzdz1-isv.isvjcloud.com%22%2C%20%22id%22%3A%20%22%22%7D&uuid=72124265217d48b7955781024d65bbc4&client=apple&clientVersion=9.4.0&st=1621796702000&sv=120&sign=14f7faa31356c74e9f4289972db4b988`
    }
    return new Promise(resolve => {
        $.post(opt, (err, resp, data) => {
            try {
                if (err) {
                    $.log(err)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.code === "0") {
                            $.token = data.token
                        }
                    } else {
                        $.log("京东返回了空数据")
                    }
                }
            } catch (error) {
                $.log(error)
            } finally {
                resolve();
            }
        })
    })
}
function random(min, max) {

    return Math.floor(Math.random() * (max - min)) + min;

}
function requireConfig(){
    return new Promise(resolve => {
        if($.isNode() && process.env.JD_CART){
            if(process.env.JD_CART_KEYWORDS){
                $.keywords = process.env.JD_CART_KEYWORDS.split('@')
            }
        }
        resolve()
    })
}
function getCart_xh(){
    console.log('正在获取购物车数据...')
    return new Promise((resolve) => {
        const option = {
            url: 'https://p.m.jd.com/cart/cart.action?fromnav=1&sceneval=2',
            headers: {
                "Cookie": cookie,
                "User-Agent": "jdapp;JD4iPhone/167724 (iPhone; iOS 15.0; Scale/3.00)",
            },
        }
        $.get(option, async(err, resp, data) => {
            try{
                data = JSON.parse(getSubstr(data, "window.cartData = ", "window._PFM_TIMING"));
                $.areaId = data.areaId;   // locationId的传值
                $.traceId = data.traceId; // traceid的传值
                venderCart = data.cart.venderCart;
                postBody = 'pingouchannel=0&commlist=';
                $.beforeRemove = data.cartJson.num
                console.log(`获取到购物车数据 ${$.beforeRemove} 条`)
            } catch(e){
                $.logErr(e, resp);
            } finally{
                resolve(data);
            }
        });
    })
}
function cartFilter_xh(cartData){
    console.log("正在整理数据...")
    let pid;
    $.pushed = 0
    for(let cartJson of cartData){
        if($.pushed === removeSize) break;
        for(let sortedItem of cartJson.sortedItems){
            if($.pushed === removeSize) break;
            pid = typeof (sortedItem.polyItem.promotion) !== "undefined" ? sortedItem.polyItem.promotion.pid : ""
            for(let product of sortedItem.polyItem.products){
                if($.pushed === removeSize) break;
                let mainSkuName = product.mainSku.name
                $.isKeyword = false
                $.isPush = true
                for(let keyword of $.keywords){
                    if(mainSkuName.indexOf(keyword) !== -1){
                        $.keywordsNum += 1
                        $.isPush = false
                        $.keyword = keyword;
                        break;
                    } else $.isPush = true
                }
                if($.isPush){
                    let skuUuid = product.skuUuid;
                    let mainSkuId = product.mainSku.id
                    if(pid === "") postBody += `${mainSkuId},,1,${mainSkuId},1,,0,skuUuid:${skuUuid}@@useUuid:0$`
                    else postBody += `${mainSkuId},,1,${mainSkuId},11,${pid},0,skuUuid:${skuUuid}@@useUuid:0$`
                    $.pushed += 1;
                } else {
                    console.log(`\n${mainSkuName}`)
                    console.log(`商品已被过滤，原因：包含关键字 ${$.keyword}`)
                    $.isKeyword = true
                }
            }
        }
    }
    postBody += `&type=0&checked=0&locationid=${$.areaId}&templete=1&reg=1&scene=0&version=20190418&traceid=${$.traceId}&tabMenuType=1&sceneval=2`
}
function removeCart(){
    console.log('正在删除购物车数据...')
    return new Promise((resolve) => {
        const option = {
            url: 'https://wq.jd.com/deal/mshopcart/rmvCmdy?sceneval=2&g_login_type=1&g_ty=ajax',
            body: postBody,
            headers: {
                "Cookie": cookie,
                "User-Agent": "jdapp;JD4iPhone/167724 (iPhone; iOS 15.0; Scale/3.00)",
                "referer": "https://p.m.jd.com/",
                "origin": "https://p.m.jd.com/"
            },
        }
        $.post(option, async(err, resp, data) => {
            try{
                data = JSON.parse(data);
                $.afterRemove = data.cartJson.num
                if($.afterRemove < $.beforeRemove){
                    console.log(`删除成功，当前购物车剩余数据 ${$.afterRemove} 条\n`)
                    $.beforeRemove = $.afterRemove
                } else {
                    console.log('删除失败')
                    console.log(data.errMsg)
                    isRemoveAll = false;
                }
            } catch(e){
                $.logErr(e, resp);
            } finally{
                resolve(data);
            }
        });
    })
}
function getSubstr(str, leftStr, rightStr){
    let left = str.indexOf(leftStr);
    let right = str.indexOf(rightStr, left);
    if(left < 0 || right < left) return '';
    return str.substring(left + leftStr.length, right);
}
function getUUID(format = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', UpperCase = 0) {
    return format.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        if (UpperCase) {
            uuid = v.toString(36).toUpperCase();
        } else {
            uuid = v.toString(36)
        }
        return uuid;
    });
}
function checkCookie() {
    const options = {
        url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
        headers: {
            "Host": "me-api.jd.com",
            "Accept": "*/*",
            "Connection": "keep-alive",
            "Cookie": cookie,
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1",
            "Accept-Language": "zh-cn",
            "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
            "Accept-Encoding": "gzip, deflate, br",
        }
    };
    return new Promise(resolve => {
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    $.logErr(err)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.retcode === "1001") {
                            $.isLogin = false; //cookie过期
                            return;
                        }
                        if (data.retcode === "0" && data.data.hasOwnProperty("userInfo")) {
                            $.nickName = data.data.userInfo.baseInfo.nickname;
                        }
                    } else {
                        $.log('京东返回了空数据');
                    }
                }
            } catch (e) {
                $.logErr(e)
            } finally {
                resolve();
            }
        })
    })
}
// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
