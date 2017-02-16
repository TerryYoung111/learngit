var db = require("./database");

//根据不同条件查询资讯
module.exports.findByOption = function(option,curpage,eachpage,func){
    db.collection("informations").findByPage(curpage,eachpage,option,func);
}

//查询所有资讯
// module.exports.findAll = function(curpage,eachpage,func){
//     db.collection("informations").findByPage(curpage,eachpage,func);
// }

//根据id查询资讯
module.exports.findById = function(id,func){
    db.collection("informations").find({_id:db.ObjectID(id)},func);
}

//添加资讯
module.exports.insert = function(option,func){

    db.collection("informations").insert(option,func);
}

//修改资讯
module.exports.update = function(id,option,func){
    db.collection("informations").update({_id:db.ObjectID(id)},{$set:option},func);
}

//删除资讯
module.exports.del = function(id,func){
    db.collection("informations").remove({_id:db.ObjectID(id)},func);
}
