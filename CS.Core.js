
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
     * 根据传入的[基类]和[派生类的成员]，创建派生类。
     * paras:
     *      objBase:Function 类型。基类。
     *      objMemeberSet:Object 类型。派生类的成员。
     * return:Function 类型。派生类。
     */
    Extend:function(objBase,objMemberSet){
        try{
            //检查参数
            if(true){
                if((objBase instanceof Function) == false){
                    throw new Error("[objBase] must be Function");
                }

                if(objMemberSet == null){
                    throw new Error("[objMemberSet] can not be null!");
                }
            }

            var derrivedClass = function(objConfig){
                //初始化成员
                this._InitMember(objConfig);

                //其他需要在构造函数中执行的代码
                this._Constructor(objConfig);
            };
            
            derrivedClass.prototype = Object.create(objBase.prototype);
            derrivedClass.prototype.constructor = derrivedClass;
            CS.Apply(derrivedClass.prototype,objMemberSet);
            derrivedClass.prototype.BaseType = objBase;
            return derrivedClass;
        }
        catch(ex){
            throw "CS.Extend():" + ex.message + "\r\n";
        }
        
    }
}

/**
 * 建立最顶层基类。其他自定义类都是由其派生。
 * paras:
 *      objConfig:Object 类型。参数集合。
 */
CS.Base = function(objConfig){
    //初始化成员
    this._InitMember(objConfig);
    //执行其他代码
    this._Constructor(objConfig);
};

//该类的基类。
CS.Base.prototype.BaseType = null;

/**
 * 初始化对象成员。
 * paras:
 *      objConfig:Object 类型。参数集合。
 */
CS.Base.prototype._InitMember = function(objConfig){};

/**
 * 用于执行需要在构造函数中执行的代码。
 * paras:
 *      objConfig:Object 类型。参数集合。
 */
CS.Base.prototype._Constructor = function(objConfig){};


