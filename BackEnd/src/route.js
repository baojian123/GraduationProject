var express = require('express');
var app = express();
// var login = require('./login');
var bodyParser=require('body-parser');
var https = require('https');
var qs = require('querystring');
	var nodemailer = require('nodemailer')

var mysql = require('./mysql-connection');
var constant = require('./constant');
var cityCode = require('./cityCode')
var tuNiu = require('./tuniuAPI')
console.log(typeof(constant.day))
var cookieConfigure={maxAge:30*constant.day,path:'/',httpOnly:false};

// var DB = 'DigDugDog';
var DB = 'Graduation_Project';

var getRandom = function (length) {
	var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	var max = 62
	var temp
	var check_key = ''
	for (var i = 0; i < length; i++) {
		temp = Math.floor(Math.random()*max)
		check_key+=str[temp]
	}
	return check_key
}

app.use(bodyParser.json());

mysql.connect(DB);


//测试块
var init = function () {
	mysql.getTableNames(function(results){
		for (i in results){
			console.log(results[i].TABLE_NAME);
		}
	});
	var database = require('./database');

	//数据库初始化
	database.setDB(DB);
	database.dropTable();
	database.initTable();
	database.setData();

	// mysql.insert("user",{
	// 	user_id : 10005,
	// 	user_name : "rongcheng",
	// 	user_pwd : "laogewen"
	// });
}

//添加酒店
app.use('/addhotel', function (req, res) {
	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	var hotel_id = 0
	var hotel_name = req.body.hotel_name
	var hotel_address = req.body.hotel_address
	var hotel_describe = req.body.hotel_describe
	var sqlString = 'select count(hotel_id) as count from hotel;'
	mysql.query(sqlString, [], function (results) {
		sqlString = 'insert into hotel(hotel_id,hotel_name,hotel_address,hotel_describe) values(?,?,?,?)'
		hotel_id = results[0].count + constant.user_bound + 1
		mysql.query(sqlString,[hotel_id,hotel_name,hotel_address,hotel_describe],function (results){
			res.write('添加酒店成功')
			res.send()
		})

	})
})

//获取酒店
app.use('/gethotel', function (req, res) {
	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	var sqlString = "select * from hotel where hotel_address like '省?市%';"
	var city_name = req.body.city_name
	var json = []

	var url = 'http://hotel.tuniu.com/ajax/list?search%5Bcity%5D=602&search%5BcheckInDate%5D=2018-4-16&search%5BcheckOutDate%5D=2018-4-17&search%5BcityCode%5D=602&page=1'
})
//获取用户所有信息
app.use('/userallinfo', function(req,res){
	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	var sqlString = 'select user_id,user_icon from user where user_id = ?;';
	var user_id = req.body.user_id;
	var json = {
		user_info:{
			user_id:''
		},
		follower_list:[],
		following_list:[],
	}
	// console.log(user_name);
	mysql.query(sqlString,[user_id],function(results){
		console.log("user_info:"+results[0])
		var user_id;
		if (results[0] === undefined){
			user_id = ''
			json.user_info.user_id = ''
		}else{
			json.user_info = results[0];
			user_id = results[0].user_id
		}
		sqlString = "select user_id,user_icon from user where user_id in (select following_id from follow where follower_id = ?);";//关注的人
		mysql.query(sqlString,[user_id],function(results){
			console.log(results);
			for (var i in results){
				json.following_list[i]=results[i];
			}

			sqlString = "select user_id,user_icon from user where user_id in (select follower_id from follow where following_id = ?);"//被关注的人
			mysql.query(sqlString,[user_id],function(results){
				for (var i in results){
					json.follower_list[i]=results[i];
				}
				// sqlString = "select * from passage from"
				console.log(json)
				res.write(JSON.stringify(json));
				res.send();
			});


		});
	})
});

//获取用户头像
app.use('/getusericon', function (req, res){
	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	var user_id = req.body.user_id
	var json ={
		user_id: '',
		user_icon: '',
	}
	var sqlString = 'select user_id, user_icon from user where user_id = ?;'
	mysql.query(sqlString, [user_id], function (results) {
		if (results.length == 1){
			json.user_id = results[0].user_id
			json.user_icon = results[0].user_icon
			res.write(JSON.stringify(json))
		} else {
			res.write('用户不存在')
		}
		res.send()
	})
})

//修改密码
app.use('/changepassword', function (req, res) {
	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	var user_pwd = req.body.user_pwd
	var user_id = req.body.user_id
	var sqlString = 'update user set user_pwd = ? where user_id = ? ;'
	mysql.query(sqlString, [user_pwd, user_id], function (results) {
		res.write('修改成功')
		res.send()
	})
})

// 发送重置密码右键
app.use('/resetpassword', function (req, res) {
	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	var user_id = req.body.user_id
	var apply_time = new Date()
	var check_key = getRandom(32)

	var sqlString = 'select user_email from user where user_id = ? '
	mysql.query(sqlString, [user_id], function (results) {
		if (results.length === 0 ) {
			res.write('用户不存在')
			res.send()
		}
		else{
			var user_email = results[0].user_email

			sqlString = 'insert into resetpwd values(?,?,?);'
			mysql.query(sqlString, [user_id, apply_time, check_key], function (results) {
				var transporter = nodemailer.createTransport({
					service: 'qq',
					port: 465,
					auth: {
						user: '351211168@qq.com',
						pass: 'axvfsohdnkswbgdf' //授权码,通过QQ获取
					}
				})
				var host = sever.address().host;
				var port = sever.address().port;

				var querystring = {
					user_id: user_id,
					apply_time: apply_time.toLocaleString(),
					check_key: check_key
				}

				var url = 'http://localhost:3000/checkingkey?' + qs.stringify(querystring)
				console.log(results)
				var mailOptions = {
					from: '351211168@qq.com',
					to: user_email,
					subject: '交游旅游网站——账户密码重置',
					html: '你好！亲爱的' + user_id + '点击一下链接即可重置你的账户密码<a href="' + url + '"> ' + url + ''
				}
				console.log(mailOptions)
				if (results != undefined) {
					transporter.sendMail(mailOptions, function (err, info) {
						if (err) {
							console.log(err)
							return
						}
						console.log(info)
					})
				}
			})
		}
	})
})

// 重置密码
app.use('/checkingkey', function (req, res) {
	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	var length = Math.floor(Math.random() * 8 + 8)
	var user_id = req.query.user_id
	var apply_time = new Date(req.query.apply_time)
	var check_key = req.query.check_key
	var user_pwd = getRandom(length)
	var now_time = new Date ()
	var expires_time = 0.5 * constant.hour
	var sqlString = 'select * from resetpwd where user_id = ?;'
	console.log(user_pwd)
	mysql.query(sqlString, [user_id], function (results) {
		if (results.length != 0) {
			if (check_key === results[0].check_key) {
				if (now_time - apply_time <=expires_time) {
					sqlString = 'update user set user_pwd = ? where user_id = ? ;'
					mysql.query(sqlString,[user_pwd, user_id], function (results) {
						var json = {
							user_pwd: user_pwd
						}
						sqlString = 'delete from resetpwd where user_id = ? ;'
						mysql.query(sqlString, [user_id], function (results) {
							sqlString = 'select user_email from user where user_id = ? ;'
							mysql.query(sqlString, [user_id], function (results) {
								var user_email = results[0].user_email
								var mailOptions = {
									from: '351211168@qq.com',
									to: user_email,
									subject: '交游旅游网站——账户密码重置',
									html: '你好！亲爱的' + user_id + '你的账户密码已重置为<strong > ' + user_pwd + '</strong>'
								}
								console.log(mailOptions)
								transporter.sendMail(mailOptions, function (err, info) {
									if (err) {
										console.log(err)
										return
									}
									console.log(info)
								})
								res.send()
							})
						})
					})
				}else {
					res.write("该链接已过期")
					console.log("该链接已过期")
					res.send()
				}
			}else {
				res.write("链接错误")
				console.log("链接错误")
				res.send()
			}
		}else {
			res.write("该用户尚未申请重置密码")
			console.log("该用户尚未申请重置密码")
			res.send()
		}
	})
})

//关注
app.use('/follow',function(req,res){
	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	var follower_id = req.body.follower_id;
	var following_id = req.body.following_id;
	console.log(follower_id)
	mysql.insert('follow',[follower_id,following_id])
	res.end('关注成功');
});

//取消关注
app.use('/unfollow',function(req,res){
	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
	var follower_id = req.body.follower_id;
	var following_id = req.body.following_id;
	var sqlString = 'delete from follow where follower_id = ? and following_id = ?';
	mysql.query(sqlString,[follower_id,following_id],function (response) {
		res.end('取消关注');
	})
});

//提交文章
app.use('/passage',function(req,res){
	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
	var json = {
		user_id: req.body.user_id,
		passage_id: '',
		submit_date: req.body.submit_date,
		passage_title: req.body.passage_title,
		passage_content: req.body.passage_content,
		passage_status: '未审核'
	}
	var sqlString = 'select count(passage_id) as count from passage;';
	mysql.query(sqlString, [],function (results) {
		console.log('接收到文章');
		console.log(sqlString);
		console.log(results);
		json.passage_id = results[0].count +constant.user_bound +1;
		sqlString = 'insert into passage(user_id,passage_id,submit_date,passage_title,passage_content) values(?,?,?,?,?);';
		mysql.query(sqlString,[json.user_id,json.passage_id,json.submit_date,json.passage_title,json.passage_content],function(results) {
			console.log(json);
			res.send('提交成功，请等待审核')
		})
	});
});

//获取关注文章
app.use('/getpassage', function (req,res) {
	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
	var sqlString = 'select * from passage where user_id in (select following_id from follow where follower_id = ?) order by submit_date desc ;';
	var user_id = req.body.user_id;
	var json = {
		data:[]
	};
	mysql.query(sqlString,[user_id],function (results){
		for (var i in results) {
			json.data[i] = results[i];
			json.data[i].submit_date = new Date(results[i].submit_date).toLocaleDateString()
		}
		res.write(JSON.stringify(json));
		res.end();
	});
});

//获取所有最新文章
app.use('/getallpassage', function (req, res) {
	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	// var sqlString = 'select * from passage order by submit_date desc;'
	var sqlString = "select * from passage where passage_status = '已审核' order by submit_date desc;"
	var json = {
		data:[]
	}
	mysql.query(sqlString, [], function (results) {
		for ( var i in results) {
			json.data[i] = results[i]
			json.data[i].submit_date = new Date(results[i].submit_date).toLocaleDateString()
			// console.log(typeof(results[i].submit_date))
			// console.log(new Date(results[i].submit_date).toLocaleDateString())
		}
		res.write(JSON.stringify(json))
		res.end();
	})
});

// 未完成
//举报文章
app.use('/reportpassage', function (req, res) {
	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	// var sql =
})

//关注攻略
app.use('/collect', function (req, res) {
	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	var passage_id = req.body.passage_id
	var sqlString = 'update passage set collect_count = collect_count + 1 where passage_id = ? ;'
	mysql.query(sqlString, [passage_id], function (results) {
		res.write('关注攻略成功')
		res.send()
	})
})

//取消关注
app.use('/uncollect', function (req, res) {
	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
	var passage_id = req.body.passage_id
	var sqlString = 'update passage set collect_count = collect_count -1 where passage_id = ?;'
	mysql.query(sqlString, [passage_id], function (results) {
		res.write('取消关注')
		res.send()
	})
})
//提交评论
app.use('/comment', function (req, res) {
	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	var json = {
		comment_id: 0,
		passage_id: req.body.passage_id,
		user_id: req.body.user_id,
		comment_content: req.body.comment_content
	}
	var sqlString = 'select count(comment_id) as count from comment;'
	mysql.query(sqlString, [], function (results) {
		sqlString = 'insert into comment(comment_id,passage_id,user_id,comment_content) values(?,?,?,?);'
		json.comment_id = results[0].count + constant.user_bound +1;
		mysql.query(sqlString, [json.comment_id, json.passage_id, json.user_id, json.comment_content],function (results) {
			sqlString = 'update passage set comment_count = comment_count + 1 ;'
			mysql.query(sqlString, [], function (results) {
				res.write('评论成功')
				res.end();
			})
		})
	})
})

//获取文章评论
app.use('/getcomment', function (req,res) {
	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	var passage_id = req.body.passage_id
	var json = {
		data: []
	}
	var sqlString = 'select * from comment where passage_id = ?;'
	mysql.query(sqlString, [passage_id], function (results) {
		for (var i in results) {
			json.data[i] = results[i]
		}
		res.write(JSON.stringify(json))
		res.send();
	})
})

//评论点赞
app.use('/like', function (req, res) {
	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	var comment_id = req.body.comment_id
	var sqlString = 'update comment set like_count = like_count + 1 where comment_id = ? ;'
	mysql.query(sqlString, [comment_id], function (results) {
		res.write('评论点赞成功')
		res.send()
	})
})

//取消点赞
app.use('/unlike', function (req,res) {
	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	var comment_id = req.body.comment_id
	var sqlString = 'updata comment set like_count = like_count - 1 where comment_id = ?;'
	mysql.query(sqlString, [comment_id], function (results) {
		res.write('取消点赞')
		res.send()
	})
})

//文章审核通过
app.use('/auditingpassage', function (req, res) {
	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	var passage_id = req.body.passage_id
	var json = {
		data:[]
	}
	var sqlString = "update passage set passage_status = '已审核' where passage_id = ? ;"
	mysql.query(sqlString, [passage_id], function (results) {
		res.write('审核通过')
		res.send()
	})
})

//获取审核文章
app.use('/getauditingpassage', function (req, res) {
	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	var json = {
		data: []
	}
	var sqlString = "select * from passage where passage_status = '未审核';"
	mysql.query(sqlString, [], function (results) {
		for (var i in results) {
			json.data[i] = results[i]
			json.data[i].submit_date = new Date(results[i].submit_date).toLocaleDateString()
		}
		res.write(JSON.stringify(json))
		res.send()
	})
})

//获取数据
app.use('/data',function(req,res){
	// res.setHeader( "Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");//
	// res.setHeader( "Access-Control-Allow-Origin", "*" ); //可以访问此域资源的域。*为所有
	// res.setHeader( "Access-Control-Allow-Methods", "POST" ); //可以访问此域的脚本方法类型
	// res.setHeader( "Access-Control-Max-Age", "1000" ); //
	// res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
	var json={
		table_name:[],
		column_name: [],
		data:[[]]
	};
		mysql.getTableNames(function(results){
			var temp=[];
			for(i=0;i<3;i++){
				for(j=0;j<=i;j++){
					temp[i]=[];
					console.log("i:"+i+"  j:"+j);
					temp[i][j]=i+j;
				}
			}
			console.log(temp);
			var find;
			for (i in results){
				// console.log(results[i].TABLE_NAME+":"+i);
				json.table_name[i]=results[i].TABLE_NAME;
				tables=function (table_name,index){
					mysql.getColumnNames(table_name,function(column_name){
						// console.log("i length"+results.length);
						// console.log("i:"+index);
						json.column_name[index]=[];
						for(k in column_name){
							// console.log(index+" k:"+k);
							// console.log("column_name:"+column_name[k].column_NAME);
							json.column_name[index][k]=column_name[k].column_NAME;
						}
						mysql.searchData(table_name,function(data){
							// console.log(table_name+":aaa:"+index);
							// console.log(data.lenth);
							var j;
							json.data[index]=[];
							for(j in data){
								console.log(data[j]);
								console.log(j);
								json.data[index][j]=data[j];
								// console.log("i length"+results.length);
								// console.log("i:"+index);
								// console.log("j length"+data.length);
								// console.log("j:"+j+"\n");
								// console.log("res send success!")
							}
							// console.log(typeof(data));
							// console.log(data=="");
							if(index==results.length-1){
								if(j==data.length-1||data==""){
									console.log(json);
									res.write(JSON.stringify(json));
									res.send();
								}
							}
						});
					});
				}(results[i].TABLE_NAME,i);
			}
			console.log(":"+json);
		});
		// require('./loginRequest').start();
});

//查询火车班次
app.use('/query',function(req,res){
	// res.setHeader( "Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");//
	// res.setHeader( "Access-Control-Allow-Origin", "*" ); //可以访问此域资源的域。*为所有
	// res.setHeader("Access-Control-Allow-Credentials","true");
	// res.setHeader("Access-Control-Allow-Credentials", "true");
	// res.setHeader( "Access-Control-Allow-Methods", "*" ); //可以访问此域的脚本方法类型
	// res.setHeader( "Access-Control-Max-Age", "1000" ); //
	// res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	console.log(req.body);
	// console.log(typeof(req.body.from_station))
	// console.log(cityCode.cityCode[req.body.to_station])
	var data = {
		'leftTicketDTO.train_date': req.body.train_date,
		'leftTicketDTO.from_station': cityCode.cityCode[req.body.from_station],
		'leftTicketDTO.to_station': cityCode.cityCode[req.body.to_station],
		purpose_codes:req.body.purpose_codes
	};
	console.log("1");

	// var params = url.parse(req.url, true).query;
	var option = {
		hostname: 'kyfw.12306.cn',
		port: 443,
		path: "https://kyfw.12306.cn/otn/leftTicket/queryO?"+qs.stringify(data),
		method:'GET'
	};
	// console.log(params);
	console.log(option.path);
	var request = https.request(option,function(response){
		var data ="";
		response.on('data',function(results){
			// console.log(typeof(data));
			data+=results;
		});
		response.on('end',function(results){

			// // console.log(typeof(data));
			res.end(data);
		});
	});
	request.on('error',function(e){
		console.log(e.message);
	});
	request.end();
});

//添加酒店信息
app.use('/addhotel', function (req, body) {
	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

})

//登陆
app.use('/login',function(req,res){
	// res.setHeader( "Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");//
	// res.setHeader( "Access-Control-Allow-Origin", "*" ); //可以访问此域资源的域。*为所有
	// res.setHeader("Access-Control-Allow-Credentials","true");
	// // res.setHeader("Access-Control-Allow-Credentials", "true");
	// res.setHeader( "Access-Control-Allow-Methods", "*" ); //可以访问此域的脚本方法类型


	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");


	var sqlString='select * from user where user_id = ?;';

	// req.body=JSON.parse(req.body);
	console.log(req.body);
	var user_id=req.body.user_id;
	var user_pwd=req.body.user_pwd;
	mysql.query(sqlString,[user_id,user_pwd],function(results){
		if(results.length){
			if(user_pwd==results[0].user_pwd){
				res.cookie('user','user_id='+user_id,cookieConfigure);
				console.log("登陆成功");
				res.write("登陆成功");
			}else{
				console.log("密码错误");
				res.write("密码错误");
			}
		}else{
			console.log("找不到用户名");
			res.write("找不到用户名");
		}
		res.send();
	});
});

//注册
app.use('/register',function(req,res){
	// res.setHeader( "Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");//
	// res.setHeader( "Access-Control-Allow-Origin", "*" ); //可以访问此域资源的域。*为所有
	// res.setHeader( "Access-Control-Allow-Methods", "POST" ); //可以访问此域的脚本方法类型
	// res.setHeader( "Access-Control-Max-Age", "1000" ); //
	// res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	res.header('Access-Control-Allow-Origin', req.header('Origin'));
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header( "Access-Control-Max-Age", "1000" ); //
	res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	var sqlString='select * from user where user_id = ? ;';
	var user_id=req.body.user_id;
	var user_pwd=req.body.user_pwd;
	var user_email = req.body.user_email;
	mysql.query(sqlString,[user_id],function(results){
		console.log("length"+results.length)
		if(results.length){
			console.log("用户名已存在");
			res.write("用户名已存在");
		}else{
			res.cookie('user','user_id='+user_id,cookieConfigure);
			console.log("注册成功");
			res.write("注册成功");
			sqlString='insert into user(user_id,user_pwd,user_email) values(?,?,?);'
			mysql.query(sqlString,[user_id,user_pwd,user_email],function(results){
				console.log('插入成功:'+results);
			});
		}
		res.send();
	})
});

//部署
var sever =app.listen(3000, 'localhost', function(){
	var host = sever.address().address;
	var port = sever.address().port;

	console.log('Example app listening at http://%s:%s',host,port);
});
