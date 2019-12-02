const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

let url = 'https://www.qu.la/book/85467/4563618.html';//章节连接
let oldUrl = 'https://www.qu.la/book/85467/'  //主页面连接


//封装函数
let str = '';
function getText(options, callback) {
    request(options, (err, res, body) => {
        if (!err && res.statusCode == 200) {
            let html = body
            let $ = cheerio.load(html);
            let txt = $('#content').text();
            let bname = $('.bookname h1').text();//标题
            let lj = $('.next').attr('href');
            let newUrl = oldUrl + lj;
            setTimeout(function () {
                callback(txt,bname);
                getText(newUrl, callback);
            }, 800)

        }
    })
}
// fs.appendFileSync('newss/'+bt+'.txt',txt);
getText(url,function(text,bname){
    //let time = new Date().valueOf();
    fs.appendFileSync('news/'+bname+'.txt',text);
});


//    //console.log($)
//    let bt = $('.box_con .bookname h1').text();//章节名称
//    let txt = $('#content').text()//内容核心
//    //console.log(txt);
//    let lj = $('.next').attr('href');//下一章连接
//    console.log(lj)
//    // let newUrl = oldUrl + lj;
//    fs.appendFileSync('newss/'+'重生之都市仙尊.txt',txt);
//    // getText(newUrl);