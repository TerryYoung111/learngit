var express = require('express');
var router = express.Router();
var infomationDAO = require('../dao/InformationDAO.js');


//分页查询所有资讯或根据条件查询
router.get('/showByOption', function(req, res, next) {
    var option = {};
    var curpage = req.query.curpage;
    var eachpage = 5;
    infomationDAO.findByOption(option,curpage,eachpage,function(data){
        res.send(data);
    });
});

//根据ID查询资讯
router.get('/showById', function(req, res, next) {
    var id = req.query.id;
    infomationDAO.findById(id,function(data){
        res.send(data[0]);
    });
});

//增加资讯
router.post('/add', function(req, res, next) {
    var option = {
        title:req.body.title,
        date:req.body.date,
        praise:req.body.praise,
        titleImg:req.body.titleImg,
        content:req.body.content
    }
    infomationDAO.insert(option,function(data){
        res.send({status:1});
    });
});

//修改资讯
router.post('/update', function(req, res, next) {
    var id = req.body.id;
    var option = {
        title:req.body.title,
        date:req.body.date,
        praise:req.body.praise,
        titleImg:req.body.titleImg,
        content:req.body.content
    }
    infomationDAO.update(id,option,function(data){
        res.send({status:1});
    });
});

//删除资讯
router.post('/del', function(req, res, next) {
    var id = req.body.id;
    infomationDAO.del(id,function(data){
        res.send({status:1});
    });
});

module.exports = router;
