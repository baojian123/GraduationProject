var  mysql = require('./mysql-connection');
var algorithm = require('./algorithm');
var DB;

var dataSet = {
  table:["user","manager"],
  data: [[{
      user_id : 10001,
      user_name : "xifei",
      user_pwd : "haolo"
    },{
      user_id : 10002,
      user_name : "zhihao",
      user_pwd : "diaolo"
    },{
      user_id : 10003,
      user_name : "jiansen",
      user_pwd : "emmmmm"
    }],
    [{
        manager_id : 10001,
        manager_name : "root",
        manager_pwd : "0000",
        manager_rank : 5
      },{
        manager_id : 10002,
        manager_name : "baojian",
        manager_pwd : "baojian123",
        manager_rank : 5
      },{
        manager_id : 10003,
        manager_name : "tangjin",
        manager_pwd : "pangjin",
        manager_rank : 6
    }]
  ]
};



var setDB = function (database){
  DB = database;
  mysql.connect(DB);
}


var initTable = function() {
  mysql.query("CREATE TABLE user( user_id  int not null, user_name varchar(32) not null, user_pwd varchar(32) not null, CONSTRAINT PRIMARY KEY (user_id) );",function(){});
  mysql.query("CREATE TABLE manager( manager_id  int not null, manager_name varchar(32) not null, manager_pwd varchar(32) not null, manager_rank int not null, CONSTRAINT PRIMARY KEY (manager_id) );",function() {});
}

var dropTable = function () {
  for (i in dataSet.table){
    temp = function (i){
      mysql.query("drop table "+dataSet.table[i]+";",function(){});
    }(i);
  }
}

var setData = function () {
  for (x in dataSet.table){
    for(y in dataSet.data[x]){
      temp = function (i,j){
        // console.log("插入成功:"+dataSet.data[i][j]);
        var cnt=0;
        for (k in dataSet.data[i][j]){
          console.log("加密后："+dataSet.data[i][j][k]);
          console.log("k:"+cnt);
          if(cnt==2){
            dataSet.data[i][j][k] = algorithm.encryption(dataSet.data[i][j][k]);
          }
          cnt++;
        }
        mysql.insert(dataSet.table[i], dataSet.data[i][j]);
      }(x,y);
    }
  }
}

exports.setDB = setDB;
exports.initTable = initTable;
exports.dropTable = dropTable;
exports.setData = setData;
