var express = require('express');
var router = express.Router();
var filmAndScreenDAO = require('../dao/FilmAndScreenDAO.js');


//分页查询所有电影和院线的匹配关系
router.get('/showByOption', function(req, res, next) {
    var option = {};
    var curpage = req.query.curpage;
    var eachpage = 5;
    filmAndScreenDAO.findByOption(option,curpage,eachpage,function(data){
        res.send(data);
    });
});


//增加匹配关系
router.post('/add', function(req, res, next) {
    var filmId = req.body.filmId;
    var screeningId = req.body.screeningId;
    var rooms = JSON.parse(req.body.rooms);
    filmAndScreenDAO.insert(filmId,screeningId,rooms,function(data){
        res.send({status:1});
    });
});

//修改院线中放映厅播放电影的内容(购票也可从这里操作)
router.post('/update', function(req, res, next) {
    var id = req.body.id;
    var rooms = JSON.parse(req.body.rooms);
    filmAndScreenDAO.update(id,rooms,function(data){
        res.send({status:1});
    });
});

//删除匹配关系
router.post('/del', function(req, res, next) {
    var id = req.body.id;
    filmAndScreenDAO.del(id,function(data){
        res.send({status:1});
    });
});

module.exports = router;
