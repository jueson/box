var rule={
title:'可可影视',
编码: 'utf-8',
host:'https://www.keke1.app',
url: '/channel/fyclass.html',
class_name:'电影&电视剧&综艺&动漫&短剧',
class_url:'1&2&4&3&6',
searchUrl:'/search?k=**&page=fypage',	
searchable:2,//是否启用全局搜索,
quickSearch:0,//是否启用快速搜索,
filterable:0,//是否启用分类筛选,
play_parse:true,
预处理: $js.toString(() => {
        let html = request(rule.host);
        let scripts = pdfa(html, 'script');
        let img_script = scripts.find(it => pdfh(it, 'script&&src').includes('rdul.js'));
        if (img_script) {
            let img_url = img_script.match(/src="(.*?)"/)[1];
            //console.log(img_url);
            let img_html = request(img_url);
            let img_host = img_html.match(/'(.*?)'/)[1];
            log(img_host);
            rule.图片替换 = rule.host + '=>' + img_host;
        }
    }),
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
                }`,
limit:6,
推荐:'*',
double:false, // 推荐内容是否双层定位
一级: '.v-item;.v-item-title&&Text;.v-item-cover img:eq(-1)&&data-original;.v-item-bottom&&Text;a&&href',
 二级:{
    "title": ".detail-title strong:eq(1)&&Text",
    "img": ".detail-pic&&img&&data-original",
       "desc": ";.data:eq(0) a:eq(2)&&Text;.data:eq(0) a:eq(1)&&Text;.data:eq(2)&&Text;.data:eq(3)&&Text",
    "content": ".detail-desc&&Text",
    "tabs": ".source-swiper-slide a",
    "lists": ".episode-list:eq(#id) a"
},
搜索: '.search-result-item;img:eq(-1)&&title;img:eq(-1)&&data-original;.search-result-item-header&&Text;*'
}