const https = require('https');//引入https模块
const cheerio = require('cheerio')
const fs = require('fs');

https.get('https://baijiahao.baidu.com/s?id=1606852223025273375&wfr=spider&for=pc', (res) => {
    //发出请求
    let str = '';
    res.on('data', (doc) => {
        str += doc;//获取html进行拼接
    })
    res.on('end', () => {            
    let $ = cheerio.load(str);
    $('.article-content .bjh-p').each(function () {
        let tt = $(this).text();
        //console.log(tt);
        if(tt == ''){
            console.log(1)
        }else{
        fs.appendFileSync('土味情话.txt',tt);
        }

    })
})
}).on('error', (err) => {
    console.log(err.message);
})