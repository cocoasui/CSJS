CS.GlobalMask = {
    Dom: null,
    Init: function(){
        var objDiv = document.createElement("div");
        objDiv.id = "cs-globalMask";
        objDiv.className = "cs-mask";
        objDiv.style.display = "none";
        objDiv.innerHTML = "<span class='cs-mask-text'>waiting.....</span>";
        document.body.appendChild(objDiv);
        this.Dom = objDiv;
    },
    ShowMask: function(){
        this.Dom.style.display = "";
    },
    HideMask: function(){
        this.Dom.style.display = "none";
    }
};