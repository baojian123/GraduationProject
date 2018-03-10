# 数据库表格

## 用户表 user

字段|类型|是否为空|含义
:-:|:-:|:-:|:-:
user_id |int|not null|用户ID
user_name|varchar(32)|not null|用户名
user_pwd|varchar(32)|not null|用户密码
user_nickname|varchar(32)|not null|昵称
user_icon|img|not null|用户头像

## SQL代码
```
CREATE TABLE user(
  user_id  int not null,
  user_name varchar(32) not null,
  user_pwd varchar(32) not null,
  user_nickname varchar(32) not null,
  user_icon varchar(200) not null,
  CONSTRAINT PRIMARY KEY (user_id)
);
```
---
## 管理员表 manager
字段|类型|是否为空|含义
:-:|:-:|:-:|:-:
manager_id|int|not null|管理员ID
manager_name|varchar(32)|not null|管理员账号名
manager_pwd|varchar(32)|not null|管理员密码
manager_rank|int|not null|管理员权限等级

## SQL代码
```
CREATE TABLE manager(
  manager_id  int not null,
  manager_name varchar(32) not null,
  manager_pwd varchar(32) not null,
  manager_rank int not null,
  CONSTRAINT PRIMARY KEY (manager_id)
);
```
---
## 旅游攻略表 passage

字段|类型|是否为空|含义
:-:|:-:|:-:|:-:
user_id|int|not null|作者ID
passage_id|int|not null|文章ID
submit_date|date|not null|发表日期
passage_content|text|null|文章内容

## SQL代码
```
CREATE TABLE passage(
  user_id int not null ,
  passage_id int not null ,
  submit_date date not null ,
  passage_content text null ,
  CONSTRAINT PRIMARY KEY (passage_id),
  CONSTRAINT FOREIGN KEY (user_id) REFERENCES user(user_id)
);
```
---
## 评论表 comment

字段|类型|是否为空|含义
:-:|:-:|:-:|:-:
comment_id|int|not null|评论ID
passage_id|int|not null|文章ID
user_id|int|not null|评论者ID
comment_content|text|null|评论内容

## SQL代码
```
CREATE TABLE comment(
  comment_id int not null,
  passage_id int not null,
  user_id int not null,
  comment_content text null,
  CONSTRAINT PRIMARY KEY (comment_id),
  CONSTRAINT FOREIGN KEY (passage_id) REFERENCES passage(passage_id)
);
```
---
## 关注关系表 follow

字段|类型|是否为空|含义
:-:|:-:|:-:|:-:
follower_id|int|not null|关注者id
following_id|int|not null|被关注者id

## SQL代码
```
CREATE TABLE follow(
  follower_id int not null,
  following_id int not null,
  CONSTRAINT PRIMARY KEY (follower_id,following_id),
  CONSTRAINT FOREIGN KEY (follower_id) REFERENCES user(user_id),
  CONSTRAINT FOREIGN KEY (following_id) REFERENCES user(user_id)
);
```
---
## 酒店表 hotel

字段|类型|是否为空|含义
:-:|:-:|:-:|:-:
hotel_id|int|not null|酒店ID
hotel_adress|varchar(200)|null|酒店地址
hotel_describe|text|null|酒店描述
hotel_rank|numeric(10,5)|not null|酒店星级

## SQL代码
```
CREATE TABLE hotel(
  hotel_id int not null,
  hotel_adress varchar(200) null,
  hotel_describe text null,
  hotel_rank numeric(10,5) not null,
  CONSTRAINT PRIMARY KEY (hotel_id)
);
```
---
## 房间表 room
字段|类型|是否为空|含义
:-:|:-:|:-:|:-:
hotel_id|int|not null|酒店ID
room_id|int|not null|房型ID
room_name|varchar(200)|not null|房型
room_area|int|not null|房间面积
room_bed|varchar(32)|not null|床型
room_price|numeric(18,2)|not null|房间价格
room_wifi|varchar(32)|not null|房间wifi
room_breakfast|varchar(32)|not null|房间早餐
room_gifts|varchar(1000)|not null|房间福利

## SQL代码
```
CREATE TABLE room(
  hotel_id int not null,
  room_id int not null,
  room_name varchar(200) not null,
  room_area int not null,
  room_bed varchar(32) not null,
  room_price numeric(18,2) not null,
  room_wifi varchar(32) not null,
  room_breakfast varchar(32) not null,
  room_gifts varchar(1000) not null,
  CONSTRAINT PRIMARY KEY (room_id),
  CONSTRAINT FOREIGN KEY (hotel_id) REFERENCES hotel(hotel_id)
);
```
---
## 房间空余表 room_remain

字段|类型|是否为空|含义
:-:|:-:|:-:|:-:
room_id|int|not null|房型ID
date|date|not null|日期
remain|int|not null|房间剩余量

## SQL代码
```
CREATE TABLE room_remain(
  room_id int not null ,
  date date not null ,
  remain int not null ,
  CONSTRAINT PRIMARY KEY (room_id,date),
  CONSTRAINT FOREIGN KEY (room_id) REFERENCES room(room_id)
);
```
---
## 房间订单表 room_order

字段|类型|是否为空|含义
:-:|:-:|:-:|:-:
order_id|int|not null|订单ID
room_id|int|not null|房间ID
room_price|numeric(18,2)|not null|房间价格
checkin_date|date|not null|入住日期
checkout_date|date|not null|退房日期
buy_date|date|not null|购买日期
order_status|varchar(32)|('已支付',‘未支付’，‘退订’)|订单状态

## SQL代码
```
CREATE TABLE room_order(
  order_id int not null ,
  room_id int not null ,
  room_price numeric(18,2) not null,
  checkin_date date not null ,
  checkout_date date not null ,
  buy_date date not null ,
  order_status varchar(32) ,
  CONSTRAINT CHECK (order_status in  ('已支付',‘未支付’，‘退订’)),
  CONSTRAINT PRIMARY KEY (order_id),
  CONSTRAINT FOREIGN KEY (room_id) REFERENCES room(room_id)
);
```
---
## 火车 train

用12306接口实现


---
## 火车订单表 trainOrder

字段|类型|是否为空|含义
:-:|:-:|:-:|:-:
order_id|int|not null|订单ID

订单状态

---
## 旅游表 trip

字段|类型|是否为空|含义
:-:|:-:|:-:|:-:



---
