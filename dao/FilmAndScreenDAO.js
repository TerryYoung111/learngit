var db = require("./database");

//根据不同条件查询电影和院线的匹配关系，仅能根据电影ID或院线ID查询
module.exports.findByOption = function(option,curpage,eachpage,func){
    db.collection("filmAndScreen").findByPage(curpage,eachpage,option,function(data){
        db.findJoin(data.data,"films",function(pageData){
			data.data = pageData;
            db.findJoin(data.data,"screenings",function(pageData){
    			data.data = pageData;
    			func(data);
		    });
		});
    });
}



//添加匹配关系
module.exports.insert = function(filmId,screeningId,rooms,func){

    db.collection("filmAndScreen").insert({
        films:{$ref:"films",$id:db.ObjectID(filmId)},
        screenings:{$ref:"screenings",$id:db.ObjectID(screeningId)},
        rooms:rooms
    },func);
}

//修改匹配
module.exports.update = function(id,rooms,func){
    db.collection("filmAndScreen").update({_id:db.ObjectID(id)},{$set:{rooms:rooms}},func);
}

//删除匹配关系
module.exports.del = function(id,func){
    db.collection("filmAndScreen").remove({_id:db.ObjectID(id)},func);
}
