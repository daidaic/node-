//地址 www.qu.la 笔趣阁小说战斗 分析
const http = require('http');
const fs = require('fs');
const cheerio = require('cheerio');
const https = require('https');
const request = require('request')

var URL = 'https://www.qu.la/book/85467/4563618.html';
var Book = 'https://www.qu.la/book/85467/';
function myRequest(url,callback){
    var options= {
        url:url,
        encoding:null,
    }
    request(options,callback);
}
function getNovel(url){
    myRequest(url,function(err,res,body){
        if(!err&&res.statusCode===200){
            var html = body;
            var $ = cheerio.load(html);
            var content = $('div#content').text();
            var urlNext = $('a#pager_next').attr('href');
            let bt = $('.box_con .bookname h1').text();//章节名称
            var realURLNext = Book+urlNext;
            // console.log(content); 
            // console.log(realURLNext);
            fs.appendFileSync('aaa.txt',content);
           getNovel(realURLNext);
        }
    })
}
getNovel(URL);
