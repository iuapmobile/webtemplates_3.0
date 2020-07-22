//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// include : UMP.Web.EventMgr | UMP.Web.AttrEventMgr
// Author gct@yonyou.com
//-----------------------------------------------------------------------
UM = {};
UM._inherit = (function () {
    var F = function () {
    };
    return function (C, P) {
        F.prototype = P.prototype;
        C.prototype = new F();
        C.base =  P.prototype;
        C.prototype.constructor = C;
    };
})();

UM.EventMgr = function() {
    this._events = {};
    /*
     this._events = {
     "oninit" :[function(){},function(){}],
     "onload" :[function(){},function(){}]
     }
     */
}
UM.EventMgr.prototype.on = function(evtName, handler) {
    if (this._events[evtName] == null) {
        this._events[evtName] = [];
    }
    this._events[evtName].push(handler);
}
UM.EventMgr.prototype.off = function(evtName, handler) {
    var handlers = this._events[evtName];
    if (typeof handler == "undefined") {
        delete handlers;
    } else {
        var index = -1;
        for (var i = 0, len = handlers.length; i < len; i++) {
            if (handler == handlers[i]) {
                index = i;
                break;
            }
        }
        if (index > 0)
            handlers.remove(index);
    }
}
UM.EventMgr.prototype.trigger = function(evtName, sender, args) {
    try{
        var handlers = this._events[evtName] || [];
        var handler;
        args = args || {};
        for (var i=0,len=handlers.length; i < len; i++) {
            handler = handlers[i];
            handler(sender, args);
        }
    }catch(e){
        alert(e);
    }
}
