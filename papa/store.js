const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const http = require('http');
const iconvlite = require('iconv-lite');

//let url = 'http://www.92aat.com/novellist.x?classid=6'
//let url = 'http://sports.sina.com.cn/nba/1.shtml'
let url = 'http://www.xiaole8.com/gushihui/'
// request.get({url:url,encoding:null},function(err,res,body){
//     if(!err&&res.statusCode==200){
//         var inxx = iconvlite.decode(body,'gb2312')
//         let $ = cheerio.load(inxx);
//         let tt = $('.cright a').each(function(){
//            let tt = $(this).text();
//            let rr = $(this).attr('href')
//            console.log(rr)
//         })


//     }
// })

getText(url,function($){
    $('.cright a').each(function(){
        let bt = $(this).text();
        let rr = $(this).attr('href')
        getText(rr,function($){
            let txt = $('.wzcon p').text();
            fs.appendFileSync('./stroe/'+bt +'.txt',txt);
        })
    })
    
})

function getText(url,callback ){
    request({ url: url, encoding: null }, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            var inxx = iconvlite.decode(body, 'gb2312')
            let $ = cheerio.load(inxx);
                // let tt = $(this).text();
                // let rr = $(this).attr('href')
                // console.log(rr)
                callback($)
                //console.log($)
                //console.log(inxx)
        }
    })
}


// http.get(url,(res)=>{
//     let html = '';
//     res.on('data',(doc)=>{
//         html +=doc;
//     })
//     res.on('end',()=>{
//         console.log(html)
//     })
// })