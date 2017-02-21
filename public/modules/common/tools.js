var ajax = function(params){
    var paramStr = "";
    var fetchObj;
    for(var key in params.data){
        paramStr += key + "=" + params.data[key] + "&";
    }
    if(params.type != "post" && params.type != "POST"){
        params.url += "?" + paramStr;
        fetchObj = fetch(params.url,{credentials:'include'});
    }else{
        fetchObj = fetch(params.url,{
            method:"post",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body:paramStr,
            credentials:'include'
        });
    }
    fetchObj.then(function(res){
        if(res.ok){
            res.text().then(function(data){
                try{
                    params.success(JSON.parse(data));
                }catch(e){
                    console.log("error:",e);
                    params.success(data);
                }

            });
        }
    });
}
var hasValue = function(ary,value,attr){
       for(var i = 0;ary && i < ary.length;i++){
           if(attr){
               var aryValue = eval("ary["+i+"].films."+attr);
               if(aryValue == value){
                   return i;
               }
           }else{
               if(ary[i] == value){
                   return i;
               }
           }
       }
       return -1;
   }
export {ajax,hasValue}
