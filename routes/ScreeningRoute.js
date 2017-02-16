var express = require('express');
var router = express.Router();
var screeningDAO = require('../dao/ScreeningDAO.js');


//分页查询所有院线或根据条件查询
router.get('/showByOption', function(req, res, next) {

    var option = {};
    if(req.query.optionName && req.query.optionValue){
        option[req.query.optionName] = req.query.optionValue;
    }
    var curpage = req.query.page;
    var eachpage = parseInt(req.query.rows);
    screeningDAO.findByOption(option,curpage,eachpage,function(data){
        res.send(data);
    });
});

//根据ID查询院线
router.get('/showById', function(req, res, next) {
    var id = req.query.id;
    screeningDAO.findById(id,function(data){
        res.send(data[0]);
    });
});

//增加院线
router.post('/add', function(req, res, next) {
    var option = {
        name:req.body.name,
        addr:req.body.addr,
        tel:req.body.tel,
        rooms:JSON.parse(req.body.rooms || "[]" ),
    }
    screeningDAO.insert(option,function(data){
        res.send({status:1});
    });
});

//修改院线
router.post('/update', function(req, res, next) {
    var id = req.body.id;
    var option = {
        name:req.body.name,
        addr:req.body.addr,
        tel:req.body.tel,
        rooms:JSON.parse(req.body.rooms || "[]" ),
    }
    screeningDAO.update(id,option,function(data){
        res.send({status:1});
    });
});

//删除院线
router.post('/del', function(req, res, next) {
    var ids = JSON.parse(req.body.ids);
    screeningDAO.del(ids,function(data){
        res.send({status:1});
    });
});

module.exports = router;
