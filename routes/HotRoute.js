var express = require('express');
var router = express.Router();
var filmDAO = require('../dao/FilmDAO.js');


//分页查询所有热播影片的电影
router.get('/showByOption', function(req, res, next) {
    var option = {};
    var curpage = req.query.curpage;
    var eachpage = 5;
    filmDAO.findHot(option,curpage,eachpage,function(data){
        res.send(data);
    });
});

//查询所有热播影片的电影
router.get('/showAll', function(req, res, next) {

    filmDAO.findAllHot(function(data){
        res.send(data);
    });
});



//增加热播影片电影
router.post('/add', function(req, res, next) {
    var id = req.body.id;
    filmDAO.insertHot(id,function(data){
        res.send({status:1});
    });
});


//删除所有热播影片的电影
router.post('/delAll', function(req, res, next) {

    filmDAO.delAllHot(function(data){
        res.send({status:1});
    });
});
//根据ID删除热播影片的电影
router.post('/del', function(req, res, next) {
    var id = req.query.id;
    filmDAO.delHot(id,function(data){
        res.send({status:1});
    });
});

module.exports = router;
