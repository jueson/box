var rule = {
  title: '次元',
  host: 'https://www.cyfz.vip/',
  url: 'vodshow/fyclass/page/fypage.html',
  searchUrl: 'https://www.cyfz.vip/search.html?wd=**',
  searchable: 2,
  quickSearch: 0,
  filterable: 0,
  class_name: 'TV动画&国漫&欧美动漫&特摄&剧场版',
  class_url: '24&21&22&28&26',
  headers: {
    'User-Agent': 'MOBILE_UA',
  },
  timeout: 5000,
  cate_exclude: '',
  play_parse: 0,
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
  double: true,
  //推荐: '列表1;列表2;标题;图片;描述;链接;详情',
  一级: '.public-list-box;a&&title;img&&data-src;span.ft2&&Text;a&&href;详情',
  二级: {
    title: 'h3&&Text',
   // img: '.detail-pic img&&data-src',
    desc: 'span.slide-info-remarks:eq(5)&&Text;span.slide-info-remarks:eq(0)&&Text;span.slide-info-remarks:eq(1)&&Text;span.slide-info-remarks:eq(2)&&Text;导演',
    content: '.check&&Text',
    tabs: '.anthology-tab .swiper-wrapper&&a',
    lists: '.anthology-list .anthology-list-box:eq(#id)&&a',
  },
  搜索: '.row-right .public-list-box;.thumb-txt a&&Text;img&&data-src;span.public-list-prb&&Text;a&&href;详情',
}