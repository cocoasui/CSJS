function BaseClass(){
    //可以在构造函数中处理私有成员。
    this.VarInBase = "Handle variable in constructor";
}

//基类声明公有成员、私有成员。
BaseClass.prototype.VarInBase = "Variable In BaseClass";
BaseClass.prototype.CommonVarInBase = "Common Variable In BaseClass";

function DerrivedClass(){
}

/**
 * 将派生类的 prototype 指向[根据基类的 prototype 生成的空对象]。
 * Object.create(BaseClass.prototype)会生成一个 BaseClass 的对象，但是这个对象没有 BaseClass 的私有成员。
 */
DerrivedClass.prototype = Object.create(BaseClass.prototype);
DerrivedClass.prototype.constructor = DerrivedClass;

//设定完派生类的 prototype 之后，声明派生类的公有成员、私有成员。
DerrivedClass.prototype.VarInBase = "Variable In DerrivedClass";
DerrivedClass.prototype.CommonVarInDerrived = "Common Variable In DerrivedClass";

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
        var derrivedClass = function(config){
            objBase.Apply(this,arguments);
        };

        if(objMemberSet.hasOwnProperty("constructor")){
            derrivedClass = objMemberSet.constructor;
        }
        
        derrivedClass.prototype = Object.create(objBase.prototype);
        derrivedClass.prototype.constructor = derrivedClass;
        CS.Apply(derrivedClass.prototype,objMemberSet);
        return derrivedClass;
    }
}