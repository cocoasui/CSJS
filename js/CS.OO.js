
CS.Apply(CS,{
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

            var CSDefineType = CS.Base;
            
            CSDefineType.prototype = Object.create(objBase.prototype);
            CSDefineType.prototype.constructor = CSDefineType;
            CS.Apply(CSDefineType.prototype,objMemberSet);
            CSDefineType.prototype.BaseType = objBase;
            return CSDefineType;
        }
        catch(ex){
            throw "CS.Extend():" + ex.message + "\r\n";
        }
        
    }
});

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

//该类的名称。
CS.Base.prototype.ClassName = "CS.Base";

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


