var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport({
  service: 'qq',
  port: 465, 
  auth: {
    user: '351211168@qq.com',
    pass: 'axvfsohdnkswbgdf' //授权码,通过QQ获取
  }
})

var mailOptions = {
   from: '351211168@qq.com',
   to: 'helloworld.wen@icloud.com',
   subject: '交游旅游网站——账户密码重置',
   html: '<a href="#">测试HTML用</a>'
}

transporter.sendMail(mailOptions, function (err, info) {
  if (err) {
    console.log(err)
    return
  }
  console.log(info)
})
