var http = require('https');
var qs = require('querystring');

var data = {
  'leftTicketDTO.train_date': '2018-03-20',
  'leftTicketDTO.from_station': 'BJP',
  'leftTicketDTO.to_station': 'CQW',
  purpose_codes: 'ADULT' };

var content = qs.stringify(data);

var option = {
  hostname: 'kyfw.12306.cn',
  port: 443,
  path: 'https://kyfw.12306.cn/otn/leftTicket/queryO?'+content,
  method: 'GET',
  // json: true,
  // rejectUnauthorized: true,
  // headers: {
  //   'Accept': 'application/json;version=2.0',
  //       'Content-Type': 'application/json'             //此地方和json很有关联，需要注意
  // }
  // headers:{
  //   'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  //   'Content-Type':'text/html'
  // }
  // headers: {
  //          "Connection": "keep-alive",
  //          // "Content-Length": 111,
  //          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  //          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.104 Safari/537.36 Core/1.53.4549.400 QQBrowser/9.7.12900.400"  ,
  //          "Origin": 'http://localhost:8080',
  //          "Referer": "http://localhost:8080"
  //      }
}

// console.log(require('url').parse(option.path));
// option.path='https://www.baidu.com/s?wd=123';

// http.get(option.path,function(req,res){
//   // console.log('STATUS:'+res.get);
//   req.setEncoding('utf-8');
//   res.on('data',function(data){
//     console.log(option.path);
//     // console.log(content);
//     console.log(data);
//   })
//   res.on('end',function(){
//
//   });
// });

// var json = JSON.stringify(leftTicketDTO);
console.log(option.path);

var req=http.request(option,function(res){
  console.log('STATUS:'+res.statusCode);
  res.setEncoding('utf-8');
  res.on('data',function(data){
    // console.log(content);
    console.log(data);
  })
});
console.log('HEADERS:'+req.headers);
req.on('error',function(e){
  console.log(e.message);
})

// req.write(json);

req.end();
