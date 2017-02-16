var db = require("./database");

//根据手机号和密码查询用户
module.exports.findByPhoneAndPwd = function(phone,pwd,func){
    db.collection("users").find({phone:phone,pwd:pwd},func);
}

//根据手机号查询用户
module.exports.findByPhone = function(phone,func){
    db.collection("users").find({phone:phone},func);
}
//根据条件查询用户
module.exports.findByOption = function(option,curpage,eachpage,func){
    for(var key in option){
        option[key] = {$regex:option[key]};
    }
    db.collection("users").findByPage(curpage,eachpage,option,func);
}
//查询所有用户
module.exports.findAll = function(curpage,eachpage,func){
    db.collection("users").findByPage(curpage,eachpage,func);
}

//查询ID所有用户
module.exports.findById = function(id,func){
    db.collection("users").find({_id:db.ObjectID(id)},func);
}

//添加用户
module.exports.insert = function(username,phone,pwd,func){
    var id = db.ObjectID();
    if(!username){
        //随机取名,利用ID的前四个字节和后三个字节组成
        username = "my"+id.toString().substring(0,8) + id.toString().substring(id.toString().length - 6);
    }

    db.collection("users").insert({_id:id,username:username,phone:phone,pwd:pwd},func);
}
//修改用户
module.exports.update = function(id,username,phone,pwd,func){
    db.collection("users").update({_id:db.ObjectID(id)},{$set:{username:username,phone:phone,pwd:pwd}},func);
}

//删除用户
module.exports.del = function(ids,func){
    var removeIds = ids.map(function(id){
        return db.ObjectID(id);
    });
    db.collection("users").remove({_id:{$in:removeIds}},func);
}
