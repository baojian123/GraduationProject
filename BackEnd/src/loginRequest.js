var http=require('http');

// var data = {
//   user_name: 'aaa',
//   user_pwd: '123'
// };

var data = {"IsBus":false,"Filter":"0","Catalog":"","IsGaoTie":false,"IsDongChe":false,"CatalogName":"","DepartureCity":"beijing","ArrivalCity":"hangzhou","HubCity":"","DepartureCityName":"北京","ArrivalCityName":"杭州","DepartureDate":"2018-03-21","DepartureDateReturn":"2018-03-22","ArrivalDate":"","TrainNumber":""};

var option = {
  hostname: 'trains.ctrip.com',
  port: 80,
  path: 'http://trains.ctrip.com/TrainBooking/Ajax/SearchListHandler.ashx?Action=getSearchList',
  method: 'POST',
  // json: true,
  rejectUnauthorized: true,
  headers: {
    'Accept':'*/*',
     "Connection": "keep-alive",
     // "Content-Length": 111,
     'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.8',
     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.104 Safari/537.36 Core/1.53.4549.400 QQBrowser/9.7.12900.400"  ,
     "Origin": 'http://trains.ctrip.com',
    "Referer": "http://trains.ctrip.com/TrainBooking/Search.aspx?from=beijing&to=&day=2&number=&fromCn=%B1%B1%BE%A9&toCn=%BA%BC%D6%DD"
 }
}

var json = JSON.stringify(data);
var start = function(){
  console.log("请求车票");
  var req=http.request(option,function(res){
    console.log("STATUS:" + res.statusCode);
    res.setEncoding('utf-8');
    res.on('data',function(data){
      console.log(data);
    })
  });

  req.on('error',function(e){
    console.log(e.message);
  })

  req.write(json);

  req.end();
}();

exports.start = start;
