var rule = {
    title: '雪糕',
    host: 'https://www.xgitv.com/',
    url: '/vshow/fyclass--------fypage---.html',
    searchUrl: '/vsearch/**----------fypage---.html',
    searchable: 2,//是否启用全局搜索,
    quickSearch: 0,//是否启用快速搜索,
    filterable: 0,//是否启用分类筛选,
    headers: {
                'User-Agent':'MOBILE_UA', // "Cookie":"searchneed=ok"
            },
    timeout: 5000,
    class_name:'电影&电视剧&动漫&综艺',
  class_url:'dianying&dianshiju&dongman&zongyi',
  tab_exclude: '热播榜|友情|猜你喜欢',
    play_parse: true,
    lazy: `js:
            if(/\\.(m3u8|mp4)/.test(input)){
                input = {parse:0,url:input}
            }else{
                if(rule.parse_url.startsWith('json:')){
                    let purl = rule.parse_url.replace('json:','')+input;
                    let html = request(purl);
                    input = {parse:0,url:JSON.parse(html).url}
                }else{
                    input= rule.parse_url+input; 
                }
            `,
    limit: 6,
    推荐: '*',
    double: true,
一级: '.hl-vod-list li;a&&title;.hl-lazy&&data-original;.hl-pic-text&&Text;a&&href',
    double: true,
    二级: {
                title: ".h2&&Text;.hl-full-box&&li:eq(0)&&Text",
                img: "hl-lazy&&data-original",
                desc: '.hl-full-box&&ul&&li:eq(1)&&Text;.hl-full-box&&ul&&li:eq(2)&&Text;.hl-full-box&&ul&&li:eq(3)&&Text;.hl-full-box&&ul&&li:eq(4)&&Text;.hl-full-box&&ul&&li:eq(5)&&Text',
                content: ".hl-content-text&&Text",
                tabs: ".hl-plays-from&&a",
                lists: ".hl-list-wrap:eq(#id) li"
            },
            搜索: '.hl-list-wrap&&ul&&li;a&&title;.hl-lazy&&data-original;.hl-item-content&&p:eq(0)&&Text;a&&href',
}