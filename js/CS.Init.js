var CS = {
    /**
     * 将来源对象的自身属性赋给目标对象。
     * paras:
     *      objTarget:Object 类型。目标对象。
     *      objSource:Object 类型。来源对象。
     */
    Apply:function(objTarget,objSource){
        for(var item in objSource){
            if(objSource.hasOwnProperty(item)){
                objTarget[item] = objSource[item];
            }
        }
    },

    /**
     * Init the library [CSJS]. 
     */
    Init:function(){
        CS.GlobalMask.Init();
    }
};

window.addEventListener("load",CS.Init,false);
