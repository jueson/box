var rule={
    title: '光影',
    host: 'https://www.gyf.lol',
    url: '/index.php/vod/show/id/fyclass/page/fypage.htm',
    searchUrl: '/index.php/vod/search.html?wd=**',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    headers: {
                'User-Agent':'MOBILE_UA', // "Cookie":"searchneed=ok"
            },
class_name: '电影&电视剧&综艺&动漫&短剧',
class_url: '1&2&3&4&21',
    play_parse: true,
    lazy: '',
    limit: 6,
    推荐: '*',
    double: true,
    一级: '.public-list-box;a&&title;.lazy&&data-src;.public-prt&&Text;a&&href',
    二级: {
    "title": ".slide-info-title&&Text",
    "img": ".lazy&&data-src",
    "desc": ".slide-info-remarks:eq(0)&&Text;.slide-info-remarks:eq(1)&&Text;.slide-info-remarks:eq(2)&&Text;.slide-info:eq(0)&&Text;.slide-info:eq(2)&&Text",
    "content": ".switch-box&&Text",
    "tabs": ".anthology-tab&&.swiper-slide",
    "lists": ".anthology-list-play:eq(#id) a"},
      搜索: '.public-list-box;.thumb-txt.cor4.hide&&a&&Text;.lazy&&data-src;.public-prt&&Text;a&&href',
      }