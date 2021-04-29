!function (e) {
    var t = {};

    function n(i) {
        if (t[i]) return t[i].exports;
        var o = t[i] = {i: i, l: !1, exports: {}};
        return e[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }

    n.m = e, n.c = t, n.d = function (e, t, i) {
        n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: i})
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (n.r(i), Object.defineProperty(i, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var o in e) n.d(i, o, function (t) {
            return e[t]
        }.bind(null, o));
        return i
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 13)
}({
    1: function (e, t, n) {
        var i;/*! layer mobile-v2.0 弹层组件移动版 License LGPL http://layer.layui.com/mobile By 贤心 */
        !function (o) {
            "use strict";
            var r = document, s = "getElementsByClassName", a = function (e) {
                return r.querySelectorAll(e)
            }, l = {type: 0, shade: !0, shadeClose: !0, fixed: !0, anim: "scale"}, c = {
                extend: function (e) {
                    var t = JSON.parse(JSON.stringify(l));
                    for (var n in e) t[n] = e[n];
                    return t
                }, timer: {}, end: {}, touch: function (e, t) {
                    e.addEventListener("click", function (e) {
                        t.call(this, e)
                    }, !1)
                }
            }, d = 0, u = ["layui-m-layer"], y = function (e) {
                this.config = c.extend(e), this.view()
            };
            y.prototype.view = function () {
                var e = this, t = e.config, n = r.createElement("div");
                e.id = n.id = u[0] + d, n.setAttribute("class", u[0] + " " + u[0] + (t.type || 0)), n.setAttribute("index", d);
                var i = function () {
                    var e = "object" == typeof t.title;
                    return t.title ? '<h3 style="' + (e ? t.title[1] : "") + '">' + (e ? t.title[0] : t.title) + "</h3>" : ""
                }(), o = function () {
                    "string" == typeof t.btn && (t.btn = [t.btn]);
                    var e, n = (t.btn || []).length;
                    return 0 !== n && t.btn ? (e = '<span yes type="1">' + t.btn[0] + "</span>", 2 === n && (e = '<span no type="0">' + t.btn[1] + "</span>" + e), '<div class="layui-m-layerbtn">' + e + "</div>") : ""
                }();
                if (t.fixed || (t.top = t.hasOwnProperty("top") ? t.top : 100, t.style = t.style || "", t.style += " top:" + (r.body.scrollTop + t.top) + "px"), 2 === t.type && (t.content = '<i></i><i class="layui-m-layerload"></i><i></i><p>' + (t.content || "") + "</p>"), t.skin && (t.anim = "up"), "msg" === t.skin && (t.shade = !1), n.innerHTML = (t.shade ? "<div " + ("string" == typeof t.shade ? 'style="' + t.shade + '"' : "") + ' class="layui-m-layershade"></div>' : "") + '<div class="layui-m-layermain" ' + (t.fixed ? "" : 'style="position:static;"') + '><div class="layui-m-layersection"><div class="layui-m-layerchild ' + (t.skin ? "layui-m-layer-" + t.skin + " " : "") + (t.className ? t.className : "") + " " + (t.anim ? "layui-m-anim-" + t.anim : "") + '" ' + (t.style ? 'style="' + t.style + '"' : "") + ">" + i + '<div class="layui-m-layercont">' + t.content + "</div>" + o + "</div></div></div>", !t.type || 2 === t.type) {
                    var l = r[s](u[0] + t.type);
                    l.length >= 1 && layer.close(l[0].getAttribute("index"))
                }
                document.body.appendChild(n);
                var c = e.elem = a("#" + e.id)[0];
                t.success && t.success(c), e.index = d++, e.action(t, c)
            }, y.prototype.action = function (e, t) {
                var n = this;
                e.time && (c.timer[n.index] = setTimeout(function () {
                    layer.close(n.index)
                }, 1e3 * e.time));
                var i = function () {
                    0 == this.getAttribute("type") ? (e.no && e.no(), layer.close(n.index)) : e.yes ? e.yes(n.index) : layer.close(n.index)
                };
                if (e.btn) for (var o = t[s]("layui-m-layerbtn")[0].children, r = o.length, a = 0; r > a; a++) c.touch(o[a], i);
                if (e.shade && e.shadeClose) {
                    var l = t[s]("layui-m-layershade")[0];
                    c.touch(l, function () {
                        layer.close(n.index, e.end)
                    })
                }
                e.end && (c.end[n.index] = e.end)
            }, o.layer = {
                v: "2.0", index: d, open: function (e) {
                    return new y(e || {}).index
                }, close: function (e) {
                    var t = a("#" + u[0] + e)[0];
                    t && (t.innerHTML = "", r.body.removeChild(t), clearTimeout(c.timer[e]), delete c.timer[e], "function" == typeof c.end[e] && c.end[e](), delete c.end[e])
                }, closeAll: function () {
                    for (var e = r[s](u[0]), t = 0, n = e.length; n > t; t++) layer.close(0 | e[0].getAttribute("index"))
                }
            }, void 0 === (i = function () {
                return layer
            }.call(t, n, t, e)) || (e.exports = i)
        }(window)
    }, 13: function (e, t, n) {
        var i = n(1);

        function o(e, t, n) {
            e.type = "turnOnVideoBtn"
            if ("alert" == e.type) i.open({
                content: e.content,
                skin: "msg",
                time: e.time
            }); else if ("closeVideoBtn" == e.type) {
                if (document.getElementById("substr")) {
                    document.getElementsByClassName("cyxy-video-trans")[0].click()
                }
            } else if ("turnOnVideoBtn" == e.type) {
                document.getElementsByClassName("cyxy-video-trans");
                if (!document.getElementById("substr")) {
                    document.querySelector("video:not(#rewardvideo)") && chrome.runtime.sendMessage({type: "showSubByVideoBtn"})
                }
            }
        }

        document.head.appendChild(document.createElement("style")).innerHTML = ".cyxy-video-trans {\n        position: fixed;\n        bottom: 90px;\n        right: 20px;\n        z-index: 109999;\n        cursor: pointer;\n        filter: grayscale(100%);\n    }\n    .cyxy-video-trans-btn {\n        height: 36px !important;\n        width: 36px !important;\n        border-radius: 50%;\n        overflow: hidden;\n    }", function () {
            let e = document.getElementsByClassName("cyxy-video-trans");
            //e.length = 1;
            if (0 == e.length) {
                let t = document.createElement("div");
                t.className = "cyxy-video-trans";
                let n = chrome.extension.getURL("images/fanyi-btn-subtitle.png");
                t.innerHTML = `<img class=cyxy-video-trans-btn src=${n} />`, document.body.appendChild(t), e[0].onclick = function () {
                    //substr = "showSubByVideoBtn"
                    document.getElementById("substr") ? chrome.runtime.sendMessage({type: "closeSubByVideoBtn"}) : chrome.runtime.sendMessage({type: "showSubByVideoBtn"})
                }
            }
        }(), chrome.runtime.onMessage.hasListener(o) || chrome.runtime.onMessage.addListener(o)

    }
});