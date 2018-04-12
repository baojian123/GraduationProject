# 数据库表格

## 用户表 user

字段|类型|是否为空|含义|约束条件
:-:|:-:|:-:|:-:|:-:
user_id |varchar(32)|not null|用户ID|主键
user_pwd|varchar(32)|not null|用户密码|
user_email|varchar(32)|null|邮箱|
user_icon|varchar(200)|not null|用户头像|

## SQL代码
```
CREATE TABLE user(
  user_id  varchar(32) not null,
  user_pwd varchar(32) not null,
  user_email varchar(32) null,
  user_icon varchar(200) default 'default-icon.jpg',
  CONSTRAINT PRIMARY KEY (user_id)
);
```
---
## 管理员表 manager
字段|类型|是否为空|含义|约束条件
:-:|:-:|:-:|:-:|:-:
manager_id|varchar(32)|not null|管理员ID|主键
manager_pwd|varchar(32)|not null|管理员密码|
manager_rank|int|not null|管理员权限等级|

## SQL代码
```
CREATE TABLE manager(
  manager_id  varchar(32) not null,
  manager_pwd varchar(32) not null,
  manager_rank int not null default 1,
  CONSTRAINT PRIMARY KEY (manager_id)
);
```
---
## 旅游攻略表 passage

字段|类型|是否为空|含义|约束条件
:-:|:-:|:-:|:-:|:-:
passage_id|int|not null|文章ID|主键
user_id|varchar(32)|not null|作者ID|外键(user)
submit_date|date|not null|发表日期|
passage_title|varchar(80)|not null|文章题目|
passage_content|text|null|文章内容|
passage_status|varchar(32)|('已审核','未审核','撤除')|文章状态|
comment_count|int|not null|评论数|
collect_count|int|not null|收藏数|

## SQL代码
```
CREATE TABLE passage(
  user_id varchar(32) not null ,
  passage_id int not null ,
  submit_date date not null ,
  passage_title varchar(80) not null,
  passage_content text null ,
  passage_status varchar(32) not null default '未审核',
  comment_count int not null default 0,
  collect_count int not null default 0,
  CONSTRAINT CHECK (passage_status in ('已审核','未审核','撤除')),
  CONSTRAINT PRIMARY KEY (passage_id),
  CONSTRAINT FOREIGN KEY (user_id) REFERENCES user(user_id)
);
```
---
## 评论表 comment

字段|类型|是否为空|含义|约束条件
:-:|:-:|:-:|:-:|:-:
comment_id|int|not null|评论ID|主键
passage_id|int|not null|文章ID|外键(passage)
user_id|varchar(32)|not null|评论者ID|
comment_content|text|null|评论内容|
comment_status|varchar(32)|('正常','撤除')|评论状态|
like_count|int|not null|点赞数|

## SQL代码
```
CREATE TABLE comment(
  comment_id int not null,
  passage_id int not null,
  user_id varchar(32) not null,
  like_count int not null default 0,
  comment_content text null,
  comment_status varchar(32) not null default '正常',
  CONSTRAINT CHECK (comment_status in ('正常','撤除')),
  CONSTRAINT PRIMARY KEY (comment_id),
  CONSTRAINT FOREIGN KEY (passage_id) REFERENCES passage(passage_id)
);
```
---
## 关注关系表 follow

字段|类型|是否为空|含义|约束条件
:-:|:-:|:-:|:-:|:-:
follower_id|varchar(32)|not null|关注者id|主键、外键(user)
following_id|varchar(32)|not null|被关注者id|主键、外键(user)

## SQL代码
```
CREATE TABLE follow(
  follower_id varchar(32) not null,
  following_id varchar(32) not null,
  CONSTRAINT PRIMARY KEY (follower_id,following_id),
  CONSTRAINT FOREIGN KEY (follower_id) REFERENCES user(user_id),
  CONSTRAINT FOREIGN KEY (following_id) REFERENCES user(user_id)
);
```
---
## 酒店表 hotel

字段|类型|是否为空|含义|约束条件
:-:|:-:|:-:|:-:|:-:
hotel_id|int|not null|酒店ID|主键
hotel_adress|varchar(200)|null|酒店地址|
hotel_describe|text|null|酒店描述|
hotel_rank|numeric(10,5)|not null|酒店星级|

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
字段|类型|是否为空|含义|约束条件
:-:|:-:|:-:|:-:|:-:
room_id|int|not null|房型ID|主键
hotel_id|int|not null|酒店ID|外键(hotel)
room_name|varchar(200)|not null|房型|
room_area|int|not null|房间面积|
room_bed|varchar(32)|not null|床型|
room_price|numeric(18,2)|not null|房间价格|
room_wifi|varchar(32)|not null|房间wifi|
room_breakfast|varchar(32)|not null|房间早餐|
room_gifts|varchar(1000)|not null|房间福利|

## SQL代码
```
CREATE TABLE room(
  room_id int not null,
  hotel_id int not null,
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

字段|类型|是否为空|含义|约束条件
:-:|:-:|:-:|:-:|:-:
room_id|int|not null|房型ID|主键、外键(room)
date|date|not null|日期|主键
remain|int|not null|房间剩余量|

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

字段|类型|是否为空|含义|约束条件
:-:|:-:|:-:|:-:|:-:
order_id|int|not null|订单ID|主键
room_id|int|not null|房间ID|外键(room)
user_id|varchar(32)|not null|用户ID|外键(user)
room_price|numeric(18,2)|not null|房间价格|
checkin_date|date|not null|入住日期|
checkout_date|date|not null|退房日期|
buy_date|date|not null|购买日期|
order_status|varchar(32)|('已支付','未支付','退订')|订单状态|

## SQL代码
```
CREATE TABLE room_order(
  order_id int not null ,
  room_id int not null ,
  user_id varchar(32) not null,
  room_price numeric(18,2) not null,
  checkin_date date not null ,
  checkout_date date not null ,
  buy_date date not null ,
  order_status varchar(32) ,
  CONSTRAINT CHECK (order_status in  ('已支付','未支付','退订')),
  CONSTRAINT PRIMARY KEY (order_id),
  CONSTRAINT FOREIGN KEY (room_id) REFERENCES room(room_id)
  CONSTRAINT FOREIGN KEY (user_id) REFERENCES user(user_id)
);
```
---
## 火车 train

字段|类型|是否为空|含义|约束条件
:-:|:-:|:-:|:-:|:-:
train_id|int|not null|火车id|主键
train_code|varchar(32)|not null|班次编码|
train_date|date|not null|出发日期|
from_station|varchar(32)|not null|出发站|
to_station|varcha(32)|not null|终点站|
each_station|varchar(32)|not null|经停站|

## SQL代码
```
```
---
## 火车票价格
字段|类型|是否为空|含义|约束条件
:-:|:-:|:-:|:-:|:-:
train_id|int|not null|火车id

## 火车订单表 trainOrder

字段|类型|是否为空|含义|约束条件
:-:|:-:|:-:|:-:|:-:
order_id|int|not null|订单ID

订单状态

---
## 旅游表 trip

字段|类型|是否为空|含义|约束条件
:-:|:-:|:-:|:-:|:-:



---
## 景点表 park

字段|类型|是否为空|含义|约束条件
:-:|:-:|:-:|:-:|:-:
park_id|int|not null|景点ID
park_name|varchar(80)|not null|景点名
park_address|varchar(200)|not null|景点地址
park_summary|varchar(80)|not null|景点概括


## SQL代码
```
CREATE TABLE park(
  park_id int not null,
  park_name varchar(80) not null,
  park_address varchar(80) not null,
  park_summary varchar(80) not null,
  CONSTRAINT PRIMARY KEY (park_id)
);
```
---
## 门票表 ticket

字段|类型|是否为空|含义|约束条件
:-:|:-:|:-:|:-:|:-:
ticket_id|int|not null|票型id
park_id|int|not null|景点id
ticket_name|varchar(80)|not null|票型名字
ticket_price|numeric(18,2)|not null|票型价格
advance_time|int|not null|提前购买时间

## SQL代码
```
```
---
## 门票订单表 ticket_submit_order

字段|类型|是否为空|含义|约束条件
:-:|:-:|:-:|:-:|:-:
order_id|int|not null|订单id
ticket_id|int|not null|票型id
ticket_price|numeric(18,2)|not null|订单价格
buy_date|date|not null|购买日期
order_status|varchar(32)|('已支付','未支付','退订')|订单状态

## SQL代码
```

```
---
