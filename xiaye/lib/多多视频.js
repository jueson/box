var rule = {
    title: '多多视频',
    host: 'http://www.duoduotv.cc',
    url: '/vodtype/fyclass-fypage.html',
    searchUrl: '/vodsearch/**-------------.html',
    searchable: 2,//是否启用全局搜索,
    quickSearch: 0,//是否启用快速搜索,
    filterable: 0,//是否启用分类筛选,
    headers: {
                'User-Agent':'Mozilla/5.0', // "Cookie":"searchneed=ok"
            },
    编码: 'utf-8',
    timeout: 5000,
    class_name:'Netflix&电影&追剧&动漫&综艺',
    class_url:'20&1&2&3&4',
    tab_exclude: '*',
    play_parse: true,
    lazy: `js:
    let html = request(input);
    let hconf = html.match(/r player_.*?=(.*?)</)[1];
    let json = JSON5.parse(hconf);
    let url = json.url;
    if (json.encrypt == '1') {
      url = unescape(url);
    } else if (json.encrypt == '2') {
      url = unescape(base64Decode(url));
    }
    if (/\\.(m3u8|mp4|m4a|mp3)/.test(url)) {
      input = {
        parse: 0,
        jx: 0,
        url: url,
      };
    } else {
      input;
    }`,
    limit: 6,
    double: true,
    推荐: '*',
    一级: '.stui-vodlist__box;a&&title;a&&data-original;.pic-text&&Text;a&&href',
    二级: $js.toString(() => {
        VOD = {};
        let html = request(input);
        VOD.vod_name = pdfh(html, "h1&&Text");
        VOD.vod_pic = pd(html, "img&&data-original");
        VOD.vod_year = pdfh(html, ".stui-content__detail&&p:eq(5)&&Text");
        VOD.vod_area = pdfh(html, ".stui-content__detail&&p:eq(3)&&Text");
        VOD.type_name = pdfh(html, ".module-info-tag-link:eq(2)&&Text");
        VOD.vod_actor = pdfh(html, ".stui-content__detail&&p:eq(6)&&Text");
        VOD.vod_director = pdfh(html, ".stui-content__detail&&p:eq(7)&&Text");
        VOD.vod_remarks = "";
        VOD.vod_content = pdfh(html, ".detail-content&&Text");
        let playFrom = [];
        let playUrl = [];
        let tabs = pdfa(html, ".nav-tabs&&a");
        tabs.forEach((it, index) => {
            playFrom.push(pdfh(it, 'a&&Text'));
            let playTag = "div.tab-content&&ul:eq(" + index + ") li";
            let tags = pdfa(html, playTag);
            let mapUrl = tags.map((tag) => {
                let title = pdfh(tag, "a&&Text").trim();
                let purl = pdfh(tag, "a&&href");
                return title + "$" + rule.host + urlencode(purl);
            });
            playUrl.push(mapUrl.join("#"))
        });
        VOD.vod_play_from = playFrom.join("$$$");
        VOD.vod_play_url = playUrl.join("$$$");
    }),
    double: false,
    搜索:'.stui-vodlist__box;a&&title;a&&data-original;.pic-text&&Text;a&&href',
        }