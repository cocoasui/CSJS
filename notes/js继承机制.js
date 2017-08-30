
/**
 * 下面的 demo 展示了 javascript 中的继承实现机制。
 * 私有成员在构造函数中声明，如[this.ClassName]。
 * 公有成员声明在原型(prototype)上，如[BaseClass.prototype.CommonVarInBase]。
 */
function BaseClass(){
    //基类声明私有成员。
    this.VarInBase = "Variable In BaseClass";
}

//基类声明公有成员。
BaseClass.prototype.CommonVarInBase = "Common Variable In BaseClass";

function DerrivedClass(){
    //这里呼叫 BaseClass.apply()，使 DerrivedClass 的对象获得 BaseClass 的私有成员。
    BaseClass.apply(this,arguments);

    //派生类声明自己的私有成员。
    this.VarInDerrived = "Variable In DerrivedClass";
}

/**
 * 将派生类的 prototype 指向[根据基类的 prototype 生成的空对象]。
 * Object.create(BaseClass.prototype)会生成一个 BaseClass 的对象，但是这个对象没有 BaseClass 的私有成员。
 */
DerrivedClass.prototype = Object.create(BaseClass.prototype);
DerrivedClass.prototype.constructor = DerrivedClass;

//设定完派生类的 prototype 之后，声明派生类的公有成员。
DerrivedClass.prototype.CommonVarInDerrived = "Common Variable In DerrivedClass";

/**
 * 上面的方案是 javascript 中实现继承的最完美方案，没有额外生成对象，没有额外占用不必要的内存。 
 * 但是无法封装到一个函数中，使用起来不太方便。
 * CSJS 中使用下面的方案实现继承，所有的成员都在 prototype 上声明，
 * 这样只要派生类的 prototype 指向基类的对象，派生类的对象就可以访问到基类的成员。
 * 这种方案的问题是：
 *      1. prototype 上也会有私有成员，需要占用额外的内存。
 *      2. 表面上看，类的对象拥有自己的私有成员，其实都是从 prototype 取得。
 *          只有在对某个私有成员进行赋值操作之后，类的对象才真正拥有了该私有成员，而不是从 prototype 取得。
 */
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

/**
 * 为方便使用，将上述第二种继承机制封装在 CS.Extend() 方法中。
 */
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
        //派生类默认构造函数。
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