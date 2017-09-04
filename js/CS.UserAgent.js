/**
 * 根据 navigator.userAgent 判断客户端的相关信息。
 */
CS.UserAgent = {
    /**
     * 是否为移动设备。
     * Boolean 类型。
     */
    IsMobile:false
};

(function (){
    var regExp = / mobile[ \/]/i;
    CS.UserAgent.IsMobile = regExp.test(navigator.userAgent);
})();