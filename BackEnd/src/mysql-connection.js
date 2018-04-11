var mysql=require('mysql');
var connection='' ;
var aa = 0;
var DB ;

//配置并链接数据库
var connect = function (database){
  connection = mysql.createConnection({
  	host: '127.0.0.1',
    port: 3306,
  	user: 'root',
  	password: '0000',
  	database: database
  });
  DB =database;
  connection.connect();
}

//query语句
var query = function(string,params,res){
  connection.query(string,params,function(error,results,fields){
    if(error){
      console.log(error.message);
    }
    res(results);
  })
}

//查找数据条数
var findCount = function (table) {
  var string = "select count(*) from "+table;
  query(string,[],function(){

  });
}

//插入数据
var insert = function(table,params){
  var cnt = 0;
  var string = "insert into "+table+" values(";
  for (i in params){
    if(cnt!=0){
      string+=","
      console.log(i);
    }
    if(typeof(params[i])=="string"){
        string+="'";
        string+=params[i];
        string+="'";
    }else{
      string+=params[i]
    }
    cnt++;
  }
  string+=");";
  console.log(string);
  connection.query(string,params);
}
//获取所链接数据库的所有表名
var getTableNames = function(res){
  var string ="select distinct TABLE_NAME from information_schema.columns where table_schema='"+DB+"';";
  connection.query(string,function(error,results,fields){
    if(error){
      console.log(error.message);
    }
    res(results);
  });
}

//根据表名获取所有字段名
var getColumnNames = function(table,res){
  var string =" select distinct column_NAME from information_schema.columns where table_name='"+table+"'AND TABLE_SCHEMA='"+DB+"';"
  connection.query(string,function(error,results,fields){
    if(error){
      console.log(error.message);
    }
    res(results);
  })
}

//根据表名搜索所有信息
var searchData = function(table,res){
  var string ="select * from "+table;
  connection.query(string,function(error,results,fields){
    if(error){
      console.log(error.message);
    }
    res(results);
  })
}


exports.connect = connect;
exports.query = query;
exports.insert = insert;
exports.getTableNames = getTableNames;
exports.getColumnNames = getColumnNames;
exports.searchData = searchData;
