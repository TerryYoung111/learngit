var db = require("./database");

//根据不同条件查询电影
module.exports.findByOption = function(option,curpage,eachpage,func){
    for(var key in option){
        option[key] = {$regex:option[key]};
    }
    db.collection("films").findByPage(curpage,eachpage,option,func);
}


//根据id查询电影
module.exports.findById = function(id,func){
    db.collection("films").find({_id:db.ObjectID(id)},func);
}

//添加电影
module.exports.insert = function(option,func){

    db.collection("films").insert(option,func);
}

//修改电影
module.exports.update = function(id,option,func){
    db.collection("films").update({_id:db.ObjectID(id)},{$set:option},func);
}

//删除电影
module.exports.del = function(ids,func){
    var removeIds = ids.map(function(id){
        return db.ObjectID(id);
    });
    db.collection("films").remove({_id:{$in:removeIds}},func);
}

//分页查询正在热映
exports.findShow = function(curpage,eachpage,func){
	db.collection("show").findByPage(curpage,eachpage,{},function(data){
		db.findJoin(data.data,"films",function(pageData){
			data.data = pageData;
			func(data);
		});
	});
}

//查询所有正在热映
exports.findAllShow = function(func){
	db.collection("show").find({},function(data){
		db.findJoin(data,"films",func);
	});
}

//增加正在热映
exports.insertShow = function(pid,func){
	db.collection("sell").insert({product:{
		$ref:"product",
		$id:db.ObjectID(pid)
	}},func);
}

//删除所有正在热映
exports.delAllShow = function(func){
	db.collection("show").remove({},func);
}
//根据ID删除正在热映
exports.delShow = function(id,func){
	db.collection("show").remove({_id:db.ObjectID(id)},func);
}

//分页查询即将上映
exports.findNotShow = function(option,curpage,eachpage,func){
	db.collection("show").findByPage(curpage,eachpage,option,function(data){
		db.findJoin(data.data,"films",function(pageData){
			data.data = pageData;
			func(data);
		});
	});
}

//查询所有即将上映
exports.findAllNotShow = function(func){
	db.collection("notshow").find({},function(data){
		db.findJoin(data,"films",func);
	});
}

//增加即将上映
exports.insertNotShow = function(pid,func){
	db.collection("notshow").insert({product:{
		$ref:"films",
		$id:db.ObjectID(pid)
	}},func);
}

//删除所有即将上映
exports.delAllNotShow = function(func){
	db.collection("notshow").remove({},func);
}
//根据ID删除即将上映
exports.delNotShow = function(id,func){
	db.collection("notshow").remove({_id:db.ObjectID(id)},func);
}


//分页查询热播电影
exports.findHot = function(curpage,eachpage,func){
	db.collection("hot").findByPage(curpage,eachpage,{},function(data){
		db.findJoin(data.data,"films",function(pageData){
			data.data = pageData;
			func(data);
		});
	});
}

//查询所有热播电影
exports.findAllHot= function(func){
	db.collection("hot").find({},function(data){
		db.findJoin(data,"films",func);
	});
}

//增加热播电影
exports.insertHot = function(pid,func){
	db.collection("hot").insert({product:{
		$ref:"films",
		$id:db.ObjectID(pid)
	}},func);
}

//删除所有热播电影
exports.delAllHot = function(func){
	db.collection("hot").remove({},func);
}
//根据ID删除热播电影
exports.delHot = function(id,func){
	db.collection("hot").remove({_id:db.ObjectID(id)},func);
}
