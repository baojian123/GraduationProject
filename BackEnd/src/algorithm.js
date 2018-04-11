var keyt=[54, 24, 43, 23, 28, 99, 12, 29, 84, 19, 37, 118,104, 85, 121, 27, 93, 86, 24, 55, 102, 24, 98, 26, 67, 29, 9, 2, 49, 69, 73, 92];
//keyt长度 32
var start=[48,65,97];
var arr=[0,10,36];
var max=62;

var findIndex = function(char，arr){
  for(i in arr){
    if(arr[i]<=char){
      return i;
    }
  }
}

var encryption = function(pas){
  var char;
  var pwd="";
  var temp;
  for(i in pas){
    char=pas[i].charCodeAt();
    char=char^keyt[i];

    temp=findIndex(char%max,arr);
    char-=arr[temp];
    char+=start[temp];

    char=String.fromCharCode(char);
    pwd+=char;
  }
  return pwd;
}

var deciphering = function(pwd){
  var temp;
  var char;
  var pas="";
  for(i in pwd){
    var temp;
    char=pwd[i].charCodeAt();

    temp=find(Index)

    char^=keyt[i];
    char=String.fromCharCode(char);
    pas+=char;
  }
  return pas;
}

exports.encryption = encryption;
exports.deciphering = deciphering;
