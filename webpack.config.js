var path = require("path");
module.exports = {
    //入口
    entry : path.join(__dirname, "public/js/main.js"),
    //输出
    output : {
        path : path.join(__dirname, "public/dist"),
        filename : "[name].bundle.js"
    },
    module : {
        loaders : [
          {test:/\.css$/,loader:"style!css"},
          {test: /\.js$/,exclude:/node_modules/,loader:"babel",query:{presets:['es2015','react']}}
        ]
    },
    resolve:{
			root:path.join(__dirname,"public"),
			alias:{
        "MainPage":"modules/index/MainPage",
        "ajax":"modules/common/tools",
				"Login":"modules/login/Login",
        "Manage":"modules/manage/Manage",
        "Films":"modules/films/Films",
        "Hot":"modules/hot/Hot",
        "Informations":"modules/informations/Informations",
        "Notshow":"modules/notshow/Notshow",
        "Screenings":"modules/screenings/Screenings",
        "Show":"modules/show/Show",
        "store":"modules/common/store"
			}
		}
}
