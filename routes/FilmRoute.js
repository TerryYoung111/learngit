var express = require('express');
var multiparty = require('multiparty');
var router = express.Router();
var filmDAO = require('../dao/FilmDAO.js');


router.post('/upload',function(req,res){
    var form=new multiparty.Form({uploadDir:'./public/images'});
    console.log("form",form);
    form.parse(req,function(err,fields,files){
        if(err){
            res.send(err);
        }else{

            var path=files.file[0].path.substring(files.file[0].path.indexOf("images"));
            console.log(path);
            res.send(path);
        }
    });
});
//分页查询所有电影或根据条件查询
router.get('/showByOption', function(req, res, next) {
    var option = {};
    if(req.query.optionName && req.query.optionValue){
        option[req.query.optionName] = req.query.optionValue;
    }
    var curpage = req.query.page;
    var eachpage = parseInt(req.query.rows);
    filmDAO.findByOption(option,curpage,eachpage,function(data){
        res.send(data);
    });
});

//根据ID查询电影
router.get('/showById', function(req, res, next) {
    var id = req.query.id;
    filmDAO.findById(id,function(data){
        res.send(data[0]);
    });
});

//增加电影
router.post('/add', function(req, res, next) {
    var option = {
        cnname:req.body.cnname,
        enname:req.body.enname,
        type:req.body.type,
        area:req.body.area,
        year:req.body.year,
        time:req.body.time,
        uptime:req.body.uptime,
        uparea:req.body.uparea,
        want:0,
        grade:0,
        gradeCount:0,
        boxOffice:0,
        intro:req.body.intro,
        director:JSON.parse(req.body.director || "{}" ),
        actor:JSON.parse(req.body.actor || "[]"),
        awards:JSON.parse(req.body.awards || "[]"),
        indexImg:req.body.indexImg,
        allImg:JSON.parse(req.body.allImg || "[]")

    }
    filmDAO.insert(option,function(data){
        res.send({status:1});
    });
});

//修改电影
router.post('/update', function(req, res, next) {
    var id = req.body.id;
    var option = {
        cnname:req.body.cnname,
        enname:req.body.enname,
        type:req.body.type,
        area:req.body.area,
        year:req.body.year,
        time:req.body.time,
        uptime:req.body.uptime,
        uparea:req.body.uparea,
        want:0,
        grade:0,
        gradeCount:0,
        boxOffice:0,
        intro:req.body.intro,
        director:JSON.parse(req.body.director || "{}" ),
        actor:JSON.parse(req.body.actor || "[]"),
        awards:JSON.parse(req.body.awards || "[]"),
        indexImg:req.body.indexImg,
        allImg:JSON.parse(req.body.allImg || "[]")

    }
    filmDAO.update(id,option,function(data){
        res.send({status:1});
    });
});

//删除电影
router.post('/del', function(req, res, next) {
    var ids = JSON.parse(req.body.ids);
    filmDAO.del(ids,function(data){
        res.send({status:1});
    });
});




module.exports = router;
