var keyt=[54, 23, 43, 23, 28, 99, 12, 29, 84, 19, 37, 118,104, 85, 121, 27, 93, 86, 24, 55, 102, 24, 98, 26, 67, 29, 9, 2, 49, 69, 73, 92];

var encryption = function(pas){
  var char;
  var pwd="";
  for(i in pas){
    char=pas[i].charCodeAt();
    char=char^keyt[i];
    char=String.fromCharCode(char);
    pwd+=char;
  }
  return pwd;
}

var deciphering = function(pwd){
  var char;
  var pas="";
  for(i in pwd){
    char=pwd[i].charCodeAt();
    char^=keyt[i];
    char=String.fromCharCode(char);
    pas+=char;
  }
  return pas;
}

exports.encryption = encryption;
exports.deciphering = deciphering;
