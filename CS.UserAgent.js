/**
 * 根据 navigator.userAgent 判断客户端的相关信息。
 */
CS.UserAgent = {
    /**
     * 是否为移动设备。
     * Boolean 类型。
     */
    IsMobile:false,

    /**
     * 是否为 IPhone。
     * Boolean 类型。
     */
    IsIPhone:false,
};

(function (){
    var regExp = /mobile[ \/]/i;
    CS.UserAgent.IsMobile = regExp.test(navigator.userAgent);

    var regExp = /iphone/i;
    CS.UserAgent.IsIPhone = regExp.test(navigator.userAgent);
})();