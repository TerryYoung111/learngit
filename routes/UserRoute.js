var express = require('express');
var router = express.Router();
var userDAO = require('../dao/UserDAO.js');

//登录
router.post('/login', function(req, res, next) {
    var phone = req.body.phone;
    var pwd =req.body.pwd;
    console.log(phone,pwd);
    userDAO.findByPhoneAndPwd(phone,pwd,function(data){
        if(data.length > 0){
            res.send({status:1});
        }else{
            res.send({status:0});
        }
    });
});
//注册
router.post('/reg', function(req, res, next) {
    var phone = req.body.phone;
    var pwd =req.body.pwd;
    userDAO.insert(null,phone,pwd,function(data){
        res.send({status:1});
    });
});
//判断手机号是否已注册,status=0表示重复不可用，status=1表示可用
router.get('/isUse',function(req,res,next){
    var phone = req.query.phone;
    userDAO.findByPhone(phone,function(data){
        if(data.length > 0){
            res.send({status:0});
        }else{
            res.send({status:1});
        }

    });
});

//根据ID查询用户
router.get('/showById', function(req, res, next) {
    var id = req.query.id;
    userDAO.findById(id,function(data){
        res.send(data[0]);
    });
});

//查询所有用户
router.get('/showByOption', function(req, res, next) {
    var option = {};
    if(req.query.optionName && req.query.optionValue){
        option[req.query.optionName] = req.query.optionValue;
    }
    var curpage = req.query.page;
    var eachpage = parseInt(req.query.rows);
    userDAO.findByOption(option,curpage,eachpage,function(data){
        res.send(data);
    });
});

//增加用户
router.post('/add', function(req, res, next) {
    var username = req.body.username;
    var phone = req.body.phone;
    var pwd =req.body.pwd;
    userDAO.insert(username,phone,pwd,function(data){
        res.send({status:1});
    });
});

//修改用户
router.post('/update', function(req, res, next) {
    var id = req.body.id;
    var username = req.body.username;
    var phone = req.body.phone;
    var pwd =req.body.pwd;
    userDAO.update(id,username,phone,pwd,function(data){
        res.send({status:1});
    });
});

//删除用户
router.post('/del', function(req, res, next) {
    var ids = JSON.parse(req.body.ids);
    userDAO.del(ids,function(data){
        res.send({status:1});
    });
});

module.exports = router;
