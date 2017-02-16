var db = require("./database");

//根据不同条件查询院线
module.exports.findByOption = function(option,curpage,eachpage,func){
    for(var key in option){
        option[key] = {$regex:option[key]};
    }
    db.collection("screenings").findByPage(curpage,eachpage,option,func);
}

// //查询所有院线
// module.exports.findAll = function(curpage,eachpage,func){
//     db.collection("screenings").findByPage(curpage,eachpage,func);
// }

//根据id查询院线
module.exports.findById = function(id,func){
    db.collection("screenings").find({_id:db.ObjectID(id)},func);
}

//添加院线
module.exports.insert = function(option,func){

    db.collection("screenings").insert(option,func);
}

//修改院线
module.exports.update = function(id,option,func){
    db.collection("screenings").update({_id:db.ObjectID(id)},{$set:option},func);
}

//删除院线
module.exports.del = function(ids,func){
    var removeIds = ids.map(function(id){
        return db.ObjectID(id);
    });
    db.collection("screenings").remove({_id:{$in:removeIds}},func);
}
