/*! This file is created by bitwater, welcome to bit world. */
!function (e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var i = n[r] = {exports: {}, id: r, loaded: !1};
        return e[r].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
    }

    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function (t, exports, n) {
    !function () {
        function t() {
            try {
                var e = document.querySelectorAll(".cyxy-target-popup");
                if (e && e.length > 0) return;
                f(), V.preload([G.XIAOYI_DEFAULT_URL, G.FAVOR_IMG_URL, G.CHECKED_IMG_URL, G.LEFT_SLIDE_URL, G.RIGHT_SLIDE_URL]), a(), p(), u(), i(), setTimeout(function () {
                    r(), setInterval(function () {
                        r()
                    }, 3e3)
                }, 9e3)
            } catch (e) {
                console.error(e)
            }
        }

        function r() {
            document.URL.indexOf("slack.com") >= 0 || location.origin + location.pathname != Re && (console.log("url changed!!!"), c(), Re = location.origin + location.pathname)
        }

        function i() {
            var e = document.createElement("iframe");
            e.src = ("https:" == document.location.protocol ? "https://" : "http://") + "caiyunapp.com/xiaoyi/web_translate_data_stat.html", e.setAttribute("style", "display: none;"), document.body.appendChild(e)
        }

        function o() {
            var e = ["interpreter.caiyunai.com", "cdn.caiyunapp.com", "interpreter-staging.caiyunai.com"], t = "web";
            return e.indexOf(location.host) >= 0 ? (t = "share", K("a").on("click", function (e) {
                this.href && "#" != this.getAttribute("href")[0] && (e.preventDefault(), window.open(G.LNADING_URL + "?targetUrl=" + encodeURIComponent(this.href)))
            })) : O() && window.js ? t = "android" : M() ? (Be = window.cyUserData ? window.cyUserData : K("#cy-ios-user").text(), t = Be ? "ios" : "web") : t = "web", t
        }

        function a() {
            if ("share" == Ne) (new F).get(function (e, t) {
                Te = e, c()
            }); else if ("android" == Ne) try {
                var e = JSON.parse(window.js.getUserData());
                Ee = e.device_id, e.user && (_e = {
                    username: e.user.username || "",
                    _id: e.user._id || "",
                    avatar_url: e.user.avatar_url || G.DEFAULT_AVATAR_URL
                }, ke = e.user._id || ""), c()
            } catch (e) {
                console.error(e), H.open({content: ue + e, skin: "msg", time: 5})
            } else if ("ios" == Ne) try {
                var e = JSON.parse(decodeURIComponent(Be));
                Ee = e.device_id || "", Ce = e.lang || "zh", e.user && (_e = {
                    username: e.user.username || "",
                    _id: e.user._id || "",
                    avatar_url: e.user.avatar_url || G.DEFAULT_AVATAR_URL
                }, ke = e.user._id || ""), c()
            } catch (e) {
                console.error(e), H.open({content: ue + e, skin: "msg", time: 5})
            } else j.testCookie(function (e) {
                e ? (ke = e._id, s(ke, function (e) {
                    _e = e, e && !e.avatar_url && (_e.avatar_url = G.DEFAULT_AVATAR_URL), c()
                })) : (new F).get(function (e, t) {
                    Te = e, c()
                })
            })
        }

        function s(e, t) {
            var n = (N(), G.TRS_URL + "/v1/user/" + e);
            chrome.runtime.sendMessage({
                method: "POST",
                contentScriptQuery: "fetchUrl",
                url: n,
                headers: {"X-Authorization": "token " + G.token},
                data: {user_id: ke, page_id: Se, url: document.URL}
            }, function (e) {
                if ("ok" == e.status) {
                    var n = JSON.parse(e.data);
                    0 == n.rc ? (t(n.user), n.user.avatar_url && K(".cyxy-personal .cyxy-favorite-btn").attr("src", n.user.avatar_url)) : H.open({
                        content: le,
                        skin: "msg",
                        time: 3
                    })
                }
            })
        }

        function c() {
            var t = N(), n = G.TRS_URL + "/v1/page/auth";
            chrome.runtime.sendMessage({
                method: "POST",
                contentScriptQuery: "fetchUrl",
                url: n,
                headers: {"X-Authorization": "token " + G.token},
                data: {user_id: ke, browser_id: Te, device_id: Ee, url: document.URL, title: document.title}
            }, function (n) {
                if ("ok" != n.status) throw console.error(t, e), H.open({
                    content: se,
                    skin: "msg",
                    time: 5
                }), new Error("PageAuth Error", e);
                var r = JSON.parse(n.data), i = r.auth_type;
                //alert(i);
                //alert(r.rc)
                //alert(JSON.stringify(n));
                var i = 3;
                r.rc = 0;
                0 == r.rc ? i >= 0 && ("android" == Ne ? window.js.showSpendCMoney(ee, "") : "ios" == Ne ? window.webkit.messageHandlers.showSpendCMoney.postMessage({
                    title1: ee,
                    title2: ""
                }) : H.open({
                    className: W,
                    content: ee,
                    skin: "msg",
                    time: 2.3
                }), Se = r.page_id, b(), setTimeout(function () {
                    d()
                }, 4e3), "android" == Ne ? window.js.cancelLoading() : "ios" == Ne && window.webkit.messageHandlers.removeLoadingView.postMessage(), 6 === i && I()) : i == -1 ? "android" == Ne ? window.js.showLoginDialog(re) : "ios" == Ne ? window.webkit.messageHandlers.showLoginDialog.postMessage({title: re}) : H.open({
                    content: re,
                    btn: ["登录", "取消"],
                    yes: function (e) {
                        H.close(e), window.open(G.LOGIN_URL, "_blank")
                    }
                }) : i == -101 && ("android" == Ne ? window.js.showOpeningVIPDialog(ie) : "ios" == Ne ? window.webkit.messageHandlers.showOpeningVIPDialog.postMessage({title: ie}) : H.open({
                    content: ie,
                    btn: ["成为VIP", "取消"],
                    yes: function (e) {
                        j.alipayForOneMonthRedeem(ke, function (e) {
                            0 == e.rc && e.alipay.notify_url ? window.open(e.alipay.notify_url, "_blank") : H.open({
                                content: ce,
                                skin: "msg",
                                time: 3
                            })
                        }), H.close(e)
                    }
                }))
            })
        }

        function u() {
            if (!(location.host.indexOf("bing.com") >= 0 || location.host.indexOf("wx.qq.com") >= 0 || location.host.indexOf("slack.com") >= 0)) {
                var e = document.createElement("div");
                e.className = "cyxy-footer " + W, e.innerHTML = "<div class='cyxy-footer-p'>本网页由彩云小译<font id='cyxy-footer-translator'></font>翻译<div/>", "share" == Ne && (e.innerHTML = "<div class='cyxy-footer-p'>原网页由彩云小译<font id='cyxy-footer-translator'></font>翻译<div/>"), document.body.appendChild(e)
            }
        }

        function l() {
            var e = K("#cyxy-footer-translator").text(), t = "", n = "", r = "、";
            e.indexOf(_e.username) < 0 && (e || (r = "", t = "和", n = "共同"), K("#cyxy-footer-translator").text(t + _e.username + r + e + n))
        }

        function d(t) {
            var n = (N(), G.TRS_URL + "/v1/page/" + Se + "/author");
            chrome.runtime.sendMessage({
                method: "POST",
                contentScriptQuery: "fetchUrl",
                url: n,
                headers: {"X-Authorization": "token " + G.token},
                data: {user_id: ke}
            }, function (t) {
                if ("ok" != t.status) throw new Error("fetchPageTranslator Error", e);
                var n = JSON.parse(t.data);
                if (0 == n.rc) {
                    var r = n.user_list, i = r.length, o = "", a = "", s = "";
                    r.forEach(function (e, t) {
                        if (e.username && "彩云小译" != e.username) {
                            var n = "、";
                            a = "和", s = "共同", o = o + e.username + n
                        }
                    }), o = o.substr(0, o.length - 1), i > 5 && (o += "等"), K("#cyxy-footer-translator").text(a + o + s);
                    var c = (K(".cyxy-footer-p").text(), 9e3);
                    "和" == a && K(".cyxy-footer").show(), "share" == Ne && (K(".cyxy-footer").show(), K(".cyxy-footer").click(function () {
                        location.href = G.DOWNLOAD_URL
                    }), c = 3e4), setTimeout(function () {
                        K(".cyxy-footer").css({opacity: .88}), K(".cyxy-footer").hide()
                    }, c)
                }
            })
        }

        function p() {
            var e = document.createElement("div");
            e.className = "cyxy-personal " + W, e.innerHTML = '<a href = "https://fanyi.caiyunapp.com/user/center/" target="_blank"><img class="cyxy-favorite-btn" src = "https://www.caiyunapp.com/imgs/webtrs/default.png" /></a>', document.body.appendChild(e);
            var t = document.createElement("div");
            t.className = "cyxy-function " + W;
            var n = "https://www.caiyunapp.com/";
            t.innerHTML = '<img class="cyxy-favorite-btn"  src="' + n + 'imgs/webtrs/fanyi-btn-hover.png" />', document.body.appendChild(t), $favoerit = K(".cyxy-function >img"), K(".cyxy-function").click(function () {
                Me ? ($favoerit.attr("src", "" + n + "imgs/webtrs/fanyi-btn.png"), K("." + Q).hide(), Me = !1) : ($favoerit.attr("src", "" + n + "imgs/webtrs/fanyi-btn-hover.png"), K("." + Q).show(), Me = !0)
            });
            var r = document.createElement("div");
            r.className = "cyxy-favorite", r.innerHTML = '<img class="cyxy-favorite-btn" id="cyxyFavoriteBtn" src="https://caiyunapp.com/imgs/webtrs/favorite-btn.png" />', document.body.appendChild(r);
            var i = !1;
            K(".cyxy-favorite").click(function () {
                i || (console.log(ke), j.postFavorite(document.URL, ke, function (e) {
                    0 == e.rc ? (H.open({
                        type: 4,
                        content: "<div class='collection-success'>收藏成功<a href='http://fanyi.caiyunapp.com/user/center/#/mine/favorite' target='_blank'><span class='collection-icon'></span></a></div>",
                        time: 8,
                        skin: "msg"
                    }), $("#cyxyFavoriteBtn").attr("src", "https://caiyunapp.com/imgs/webtrs/favorite-on-btn.png"), i = !0) : H.open({
                        content: "收藏失败",
                        skin: "msg",
                        time: 3
                    })
                }))
            })
        }

        function f() {
            function e() {
                var e = parseInt(K("#cyxy-popup-favour-num").text()) + 1;
                K("#cyxy-popup-favour-num").text(e), q.data("comment", "like");
                var t = q.data("targetInfo");
                t && (t.rate.LIKE = e, q.data("targetInfo", t));
                var n = q.data("targetList"), r = q.data("index");
                n && n.length > 0 && r >= 0 && (n[r].rate.lIKE = e, q.data("targetList", n))
            }

            function t() {
                K("#cyxy-popup-oppose-num").text(parseInt(K("#cyxy-popup-oppose-num").text()) + 1), q.data("comment", "unlike")
            }

            var n = document.createElement("div");
            n.className = "cyxy-target-popup " + W, n.innerHTML = '<div style="margin: auto"><img id="cyxy-popup-left-slide" src="https://caiyunapp.com/imgs/webtrs/left-slide.png"> <div id="cyxy-popup-userinfo"><img id="cyxy-popup-avatar" src="https://caiyunapp.com/imgs/xiaoyilogo.jpg" /> <div id="cyxy-popup-name-time"> <span id="cyxy-popup-name">彩云小译</span> <span id="cyxy-popup-time">刚刚</span></div></div><div id="cyxy-popup-favour"><img id="cyxy-popup-favour-img" src="https://caiyunapp.com/images/favour.png"><span id="cyxy-popup-favour-num">0</span></div><img id="cyxy-popup-right-slide" src="https://caiyunapp.com/imgs/webtrs/right-slide.png"></div>', document.body.appendChild(n), K(".cyxy-target-popup").hide(), K("#cyxy-popup-left-slide").hide(), K("#cyxy-popup-right-slide").hide(), K(".cyxy-target-popup").click(function () {
            }), K(document).mouseup(function (e) {
                var t = K(".cyxy-target-popup");
                t.is(e.target) || 0 !== t.has(e.target).length || K("#cyxy-popup-favour").hasClass("commit") || t.hide()
            }), K("#cyxy-popup-left-slide").click(function () {
                m();
                var e = q.data("targetList"), t = q.data("index");
                if (!isNaN(t)) {
                    t--, t <= 0 && (t = 0, K("#cyxy-popup-left-slide").hide()), K("#cyxy-popup-right-slide").show();
                    var n = e[t];
                    q.data("targetInfo", n), q[0].sentence_id = n.id, q.data("comment", ""), q.text(n.content), K("#cyxy-popup-favour-img").attr("src", G.FAVOR_IMG_URL), K("#cyxy-popup-avatar").attr("src", n.user.avatar_url), K("#cyxy-popup-name").text(n.user.username), K("#cyxy-popup-time").text(V.getDateDiff(n.updated_at)), K("#cyxy-popup-favour-num").text(n.rate.LIKE || 0), K("#cyxy-popup-oppose-num").text(n.rate.UNLIKE || 0), q.data("index", t)
                }
            }), K("#cyxy-popup-right-slide").click(function () {
                m();
                var e = q.data("targetList"), t = q.data("index");
                if (!isNaN(t)) {
                    t++, t >= e.length - 1 && K("#cyxy-popup-right-slide").hide(), t > 0 && K("#cyxy-popup-left-slide").show();
                    var n = e[t];
                    q.text(n.content), q.data("targetInfo", n), q[0].sentence_id = n.id, q.data("comment", ""), K("#cyxy-popup-favour-img").attr("src", G.FAVOR_IMG_URL), K("#cyxy-popup-avatar").attr("src", n.user.avatar_url), K("#cyxy-popup-name").text(n.user.username), K("#cyxy-popup-time").text(V.getDateDiff(n.updated_at)), K("#cyxy-popup-favour-num").text(n.rate.LIKE || 0), K("#cyxy-popup-oppose-num").text(n.rate.UNLIKE || 0), q.data("index", t)
                }
            }), K("#cyxy-popup-favour").click(function () {
                if (K("#cyxy-popup-favour").hasClass("commit")) h(1); else {
                    var t = q[0].sentence_id;
                    t ? x(t, "POINT_LIKE_SENTENCE", e) : y(q.data("source_text"), q.data("xiaoyiText"), "", function (n) {
                        n && 0 == n.rc && (t = n.sentence_id, q[0].sentence_id = t, x(t, "POINT_LIKE_SENTENCE", e))
                    }, G.XIAOYI_USERID)
                }
            }), K("#cyxy-popup-oppose").click(function () {
                var e = q.data("comment"), n = q.data("sentence_id");
                e ? "like" == e ? x(n, "POINT_CANCEL_LIKE_SENTENCE", function () {
                    K("#cyxy-popup-favour-num").text(parseInt(K("#cyxy-popup-favour-num").text()) - 1), K("#cyxy-popup-favour-img").css("height", "18px"), q.data("comment", "cancel")
                }) : "unlike" == e ? x(n, "POINT_CANCEL_LIKE_SENTENCE", function () {
                    K("#cyxy-popup-oppose-num").text(parseInt(K("#cyxy-popup-oppose-num").text()) - 1), q.data("comment", "cancel"), K("#cyxy-popup-oppose-img").css("height", "18px")
                }) : "cancel" == e && x(n, "POINT_UNLIKE_SENTENCE", t) : n ? x(n, "POINT_UNLIKE_SENTENCE", t) : y(q.data("source_text"), q.data("before"), "", function (e) {
                    e && 0 == e.rc && (n = e.sentence_id, q[0].sentence_id = n, x(n, "POINT_UNLIKE_SENTENCE", t))
                }, G.XIAOYI_USERID)
            })
        }

        function h(e) {
            function t(e) {
                if (K("#cyxy-popup-favour").removeClass("commit"), e && 0 == e.rc) {
                    q[0].sentence_id = e.sentence_id, K("#cyxy-popup-favour-img").attr("src", G.FAVOR_IMG_URL), K("#cyxy-popup-favour-num").text(K("cyxy-popup-favour-num").text() || 0), q.data("before", q.text());
                    var t = {
                        id: e.sentence_id,
                        content: q.text(),
                        updated_at: Date.now(),
                        user: {id: ke, avatar_url: _e.avatar_url, username: _e.username},
                        rate: {LIKE: K("cyxy-popup-favour-num").text(), UNLIKE: 0}
                    };
                    q.data("targetInfo", t);
                    var n = q.data("targetList");
                    n && n.length > 0 && q.data("targetList", n.concat(t)), l(), "android" == Ne ? window.js.showEditSuccess(te, ne + e.point.total_point) : "ios" == Ne ? window.webkit.messageHandlers.showEditSuccess.postMessage({
                        title1: te,
                        title2: ne + e.point.total_point
                    }) : H.open({content: te + ne + e.point.total_point, skin: "msg", time: 3})
                } else H.open({content: fe, skin: "msg", time: 3})
            }

            ke && (q.data("before") !== q.text() ? q.data("user_s_id") ? v(q.data("source_text"), q.data("user_s_id"), q.text(), function (e) {
                if (K("#cyxy-popup-favour").removeClass("commit"), e && 0 == e.rc) {
                    K("#cyxy-popup-favour-img").attr("src", G.FAVOR_IMG_URL);
                    var t = q.data("targetList"), n = q.data("user_index"), r = 0;
                    q.data("targetInfo") && (r = q.data("targetInfo").rate.LIKE), t && t.length > 0 && n >= 0 && (t[n].content = q.text(), t[n].rate.lIKE = r, q.data("targetList", t)), K("#cyxy-popup-favour-num").text(r || 0), q.data("targetInfo", {
                        id: e.sentence_id,
                        content: q.text(),
                        updated_at: Date.now(),
                        user: {id: ke, avatar_url: _e.avatar_url, username: _e.username},
                        rate: {LIKE: r, UNLIKE: 0}
                    }), q.data("before", q.text()), H.open({content: de, skin: "msg", time: 2})
                } else H.open({content: fe, skin: "msg", time: 3})
            }) : y(q.data("source_text"), q.text(), "", t) : 1 == e && (K("#cyxy-popup-favour-img").attr("src", G.FAVOR_IMG_URL), K("#cyxy-popup-favour-num").text(K("cyxy-popup-favour-num").text() || 0), H.open({
                content: pe,
                skin: "msg",
                time: 2
            }))), setTimeout(function () {
                K("#cyxy-popup-favour").removeClass("commit")
            }, 2e3)
        }

        function g() {
            null !== Ue && clearTimeout(Ue), Ue = setTimeout(function () {
                K(".cyxy-target-popup").hide()
            }, 3e3)
        }

        function m() {
            null !== Ue && clearTimeout(Ue)
        }

        function y(t, n, r, i, o) {
            if (!Fe) {
                var a = (N(), G.TRS_URL + "/v1/page/" + Se + "/sentence"), s = ke;
                o && (s = o), Fe = !0, chrome.runtime.sendMessage({
                    method: "POST",
                    contentScriptQuery: "fetchUrl",
                    url: a,
                    headers: {"X-Authorization": "token " + G.token},
                    data: {user_id: s, page_id: Se, source: t, target: n, trans_type: "en2zh", action: r || ""}
                }, function (t) {
                    if ("ok" != t.status) throw Fe = !1, H.open({
                        content: fe,
                        skin: "msg",
                        time: 3
                    }), console.error(e), new Error("commitPageSentence Error", e);
                    var n = JSON.parse(t.data);
                    Fe = !1, i(n)
                })
            }
        }

        function v(t, n, r, i) {
            if (!Fe) {
                var o = (N(), G.TRS_URL + "/v1/page/" + Se + "/sentence/" + n);
                Fe = !0, chrome.runtime.sendMessage({
                    method: "POST",
                    contentScriptQuery: "fetchUrl",
                    url: o,
                    headers: {"X-Authorization": "token " + G.token},
                    data: {source: t, target: r, user_id: ke, sentence_id: n, trans_type: "en2zh"}
                }, function (t) {
                    if ("ok" != t.status) throw Fe = !1, H.open({
                        content: fe,
                        skin: "msg",
                        time: 3
                    }), console.error(e), i(), new Error("commentPageSentence Error", e);
                    var n = JSON.parse(t.data);
                    Fe = !1, i(n)
                })
            }
        }

        function x(t, n, r, i) {
            if (!Fe) {
                Fe = !0, n = n.toUpperCase();
                var o = G.TRS_URL + "/v1/page/" + Se + "/sentence/" + t + "/comment";
                chrome.runtime.sendMessage({
                    method: "POST",
                    contentScriptQuery: "fetchUrl",
                    url: o,
                    headers: {"X-Authorization": "token " + G.token},
                    data: {user_id: ke, sentence_id: t, trans_type: "en2zh", action: n}
                }, function (t) {
                    if ("ok" != t.status) throw Fe = !1, H.open({
                        content: fe,
                        skin: "msg",
                        time: 3
                    }), console.error(e), new Error("commentPageSentence Error", e);
                    var n = JSON.parse(t.data);
                    0 == n.rc ? (H.open({content: he, skin: "msg", time: 2}), r()) : n.rc == -1 ? H.open({
                        content: ge,
                        skin: "msg",
                        time: 2
                    }) : H.open({content: fe, skin: "msg", time: 3})
                })
            }
        }

        function A() {
            He || (He = !0, H.open({
                className: W,
                content: "想修改译文成为共同译者吗？<br>快来下载「彩云小译」吧！",
                btn: ["立即下载", "取消"],
                yes: function (e) {
                    H.close(e), window.open(DOWNLOAD_URL, "_blank")
                },
                end: function () {
                    setTimeout(function () {
                        He = !1
                    }, 500)
                }
            }))
        }

        function b() {
            function t(e) {
                if (!(K(e).is(":hidden") || "SCRIPT" == e.nodeName || "LINK" == e.nodeName || "STYLE" == e.nodeName || "CODE" == e.nodeName || "NOSCRIPT" == e.nodeName || "CITE" == e.nodeName || e.classList && (e.classList.contains(W) || e.classList.contains(J) || e.classList.contains(Q) || e.classList.contains("qq_face") || e.classList.contains("msg_input_wrapper") || e.classList.contains("prettyprint") || e.classList.contains("PROGRAMLISTING")))) for (var r = e.childNodes, i = 0, o = r.length; i < o; i++) {
                    var a = r[i];
                    if (a && (!a.classList || !a.classList.contains(W) && !a.classList.contains(Q))) if (a.classList && (a.classList.contains("js_message_plain") || a.classList.contains("message_body"))) K(r[i]).children("." + Q).length > 0 || (n(a), u.push(a)); else if ("PRE" != a.nodeName) if ("P" != a.nodeName) {
                        if (E(a)) {
                            if (a.nodeName.indexOf("H") >= 0 && ("H1" == a.nodeName || "H2" == a.nodeName || "H3" == a.nodeName || "H4" == a.nodeName || "H5" == a.nodeName || "H6" == a.nodeName) && !(a.firstElementChild && ("SPAN" == a.firstElementChild.nodeName || "SPAN" == a.lastElementChild.nodeName || "A" == a.firstElementChild.nodeName || "A" == a.lastElementChild.nodeName) || a.parentElement && "A" == a.parentElement.nodeName)) {
                                k(a, W), l.push(a);
                                continue
                            }
                            if (!("SPAN" != a.nodeName && "LABEL" != a.nodeName && "LI" != a.nodeName || a.firstElementChild && "STRONG" != a.firstElementChild.nodeName)) {
                                k(a, W), p.push(a);
                                continue
                            }
                            if ("A" == a.nodeName && (!a.firstElementChild || "STRONG" == a.firstElementChild.nodeName)) {
                                k(a, W), d.push(a);
                                continue
                            }
                        }
                        a.nodeType === Node.TEXT_NODE && S(a) ? (k(a.parentElement, W), y.push(a)) : a.nodeType === Node.ELEMENT_NODE && t(a)
                    } else k(a, W), c.push(a)
                }
            }

            function n(e) {
                var t = document.createElement("font");
                k(t, Q), e.appendChild(t)
            }

            function r() {
                for (var e = [], t = [], n = [], r = [], o = [], a = [], s = 0, f = l.length; s < f; s++) R(l[s]) && (e = e.concat(l.splice(s, 1)), s--);
                for (var s = 0, f = c.length; s < f; s++) R(c[s]) && (t = t.concat(c.splice(s, 1)), s--);
                u.length > 0 && (n = n.concat(u.splice(0, u.length)), i(n, "pre"));
                for (var s = 0, f = d.length; s < f; s++) R(d[s]) && (r = r.concat(d.splice(s, 1)), s--);
                for (var s = 0, f = p.length; s < f; s++) R(p[s]) && (o = o.concat(p.splice(s, 1)), s--);
                for (var s = 0, f = y.length; s < f; s++) L(y[s]) && (a = a.concat(y.splice(s, 1)), s--);
                var h = e.length + t.length + r.length + o.length, g = l.length + c.length + d.length + p.length,
                    m = h / (h + g).toFixed(2) * 100;
                isNaN(m) && (m = 0), i(e, "h"), i(t, "p"), i(r, "a"), i(o, "span"), i(a, "text"), w(m)
            }

            function i(e, t) {
                for (var n = [], r = [], i = [], a = [], s = [], c = [], u = [], l = [], d = [], p = 0, f = e.length; p < f; p++) {
                    var h = e[p], g = h.innerText;
                    if ("text" == t && (g = h.nodeValue), g = g.trim()) {
                        var m = V.detectLang(g), y = g.length;
                        if ("jp" == m) y > 30 ? u.push(h) : y > 8 ? l.push(h) : d.push(h); else if ("zh" == m) y > 30 ? s.push(h) : y > 8 ? a.push(h) : c.push(h); else {
                            var v = g.split(" ").length;
                            v > 30 ? i.push(h) : v > 6 ? r.push(h) : n.push(h)
                        }
                    }
                }
                n.sort(function (e, n) {
                    var r = e.innerText, i = n.innerText;
                    return "text" == t && (r = e.nodeValue, i = n.nodeValue), r.trim().split(" ").length - i.trim().split(" ").length
                }), o(n, t, 50, "en2zh"), o(r, t, 10, "en2zh"), o(i, t, 2, "en2zh"), o(c, t, 50, "zh2en"), o(a, t, 10, "zh2en"), o(s, t, 2, "zh2en"), o(d, t, 50, "ja2zh"), o(l, t, 20, "ja2zh"), o(u, t, 2, "ja2zh")
            }

            function o(e, t, n, r) {
                var i = 25;
                for (n && (i = n); e.length > 0;) {
                    var o = e.splice(0, i);
                    a(o, t, r)
                }
            }

            function a(t, n, r) {
                function i() {
                    console.log("translate retry:", t), setTimeout(function () {
                        a(t, n, r)
                    }, 15e3)
                }

                for (var o = [], s = 0, c = t.length; s < c; s++) {
                    var u = t[s].innerText;
                    "text" == n && (u = t[s].nodeValue), o.push(C(u))
                }
                if (!(o.length <= 0)) {
                    var l = "en2zh", d = G.TRS_URL + "/v1/page/translator";
                    "ja2zh" == r ? (l = "ja2zh", d = G.TRS_URL + "/v1/page/translator") : "zh2en" == r && (l = "zh2en", d = G.TRS_URL + "/v1/page/translator"), chrome.runtime.sendMessage({
                        method: "POST",
                        contentScriptQuery: "fetchUrl",
                        url: d,
                        headers: {"X-Authorization": "token " + G.token},
                        data: {
                            source: o,
                            trans_type: l,
                            request_id: ke || Ee || Te || "web-translate",
                            url: document.URL,
                            page_id: Se,
                            replaced: !0,
                            cached: G.CACHED
                        }
                    }, function (r) {
                        if ("ok" != r.status) throw i(), console.error(xhr, e), new Error("Translate Error", e);
                        var a = JSON.parse(r.data);
                        if (a && 0 == a.rc) {
                            var s = a.target;
                            if (o.length != s.length) throw new Error("sources targets length error");
                            for (var c = 0, u = t.length; c < u; c++) {
                                var l = t[c], d = "";
                                if (s[c] && s[c].target && (d = s[c].target.trim(), o[c].trim().toLowerCase() !== d.toLowerCase())) {
                                    var p = 0;
                                    s[c].sentence_id && (p = s[c].sentence_id);
                                    var f = s[c].count || 0;
                                    if ("p" == n) {
                                        var h = l.cloneNode(!0);
                                        if (h.innerText = d, h.contentEditable = !0, k(h, Q), h.sentence_id = p, h.source_text = C(l.innerText), f > 1) {
                                            var g = document.createElement("span");
                                            g.className = Y, g.innerText = "(" + f + ")", h.appendChild(g)
                                        }
                                        l.parentNode.insertBefore(h, l.nextSibling)
                                    } else if ("pre" == n) {
                                        var h = K(l).children("." + Q)[0];
                                        if ("" != h.innerText) continue;
                                        d = _(d), d.length > 4 && (h.contentEditable = !0), h.sentence_id = p, h.source_text = C(l.innerText), h.innerText = " " + d
                                    } else if ("h" == n) {
                                        d = _(d);
                                        var h = l.cloneNode(!0);
                                        if (h.innerText = d, h.contentEditable = !0, h.sentence_id = p, h.source_text = C(l.innerText), k(h, Q), f > 1) {
                                            var g = document.createElement("span");
                                            g.className = Y, g.innerText = "(" + f + ")", h.appendChild(g)
                                        }
                                        l.parentNode.insertBefore(h, l.nextSibling)
                                    } else if ("a" == n || "span" == n) {
                                        if (d = _(d), o[c].trim().toLowerCase() === d.toLowerCase()) continue;
                                        var m = document.createElement("font");
                                        if (k(m, Q), d.length > 4 && "span" == n && (m.contentEditable = !0), m.sentence_id = p, m.source_text = C(l.innerText), f > 1) {
                                            var g = document.createElement("span");
                                            g.className = Y, g.innerText = "(" + f + ")", m.appendChild(g)
                                        }
                                        m.innerText = " " + d, l.appendChild(m)
                                    } else {
                                        if (d = _(d), o[c].trim().toLowerCase() === d.toLowerCase()) continue;
                                        var m = document.createElement("font");
                                        if (k(m, Q), d.length > 4 && "A" != l.parentNode.nodeName && (m.contentEditable = !0), m.sentence_id = p, m.source_text = C(l.nodeValue), f > 1) {
                                            var g = document.createElement("span");
                                            g.className = Y, g.innerText = "(" + f + ")", m.appendChild(g)
                                        }
                                        m.innerText = " " + d, l.parentNode.insertBefore(m, l.nextSibling)
                                    }
                                    k(l, z)
                                }
                            }
                        } else console.error(a, t)
                    })
                }
            }

            var s = document.querySelectorAll("." + W);
            if (!(s && s.length > 5)) {
                var c = [], u = [], l = [], d = [], p = [], f = (Date.now(), null), y = [];
                Le = setInterval(function () {
                    t(document.body), r()
                }, Oe), w(20), t(document.body), w(40), r(), w(80), window.onscroll = function (e) {
                    null !== f && clearTimeout(f), f = setTimeout(function () {
                        t(document.body), r(), K(window).scrollTop() + K(window).height() >= K(document).height() && (K(".cyxy-footer").show(), setTimeout(function () {
                            K(".cyxy-footer").hide()
                        }, 7500))
                    }, 200)
                }, setTimeout(function () {
                }, 500);
                K("body").on("click", "." + Q + "[contenteditable]", function () {
                    if (!K("#cyxy-popup-favour").hasClass("commit")) {
                        q = K(this), q.data("source_text") || q.data("source_text", this.source_text), K(this).find("." + Y).remove();
                        var e = this.sentence_id;
                        /**if (m(), !ke) {
                            if ("share" == Ne) return A(), K(this);
                            if ("android" == Ne) return window.js.showLoginDialog(oe), K(this);
                            if ("ios" == Ne) return window.webkit.messageHandlers.showLoginDialog.postMessage({title: oe}), K(this);
                            j.testCookie(function (e) {
                                return e ? (ke = e._id, void (_e = {
                                    username: e.name || "***",
                                    _id: e._id,
                                    avatar_url: e.avatar || G.DEFAULT_AVATAR_URL
                                })) : (H.open({
                                    content: ae, btn: [Ae, be], yes: function (e) {
                                        H.close(e), window.open(G.LOGIN_URL, "_blank")
                                    }
                                }), K(this))
                            })
                        }**/
                        e ? j.fetchPageSentenceTargetList(e, ke, Se, function (e) {
                            if (0 == e.rc) {
                                var t, n = e.sentence;
                                if (n && n.length > 0) {
                                    q.data("index", 0), K("#cyxy-popup-left-slide").hide(), q.data("targetList", n);
                                    for (var r = 0, i = n.length; r < i; r++) n[r] && (n[r].user && ke == n[r].user.id && (q.data("user_s_id", n[r].id), q.data("user_index", r)), n[r].invalid && (n.splice(r, 1), r--));
                                    n.length > 1 && K("#cyxy-popup-right-slide").show()
                                }
                                t = n[0], q.data("targetInfo") && q.data("targetInfo").user.id != t.user.id && (t = q.data("targetInfo"), q.data("index", -1)), K("#cyxy-popup-avatar").attr("src", t.user.avatar_url), K("#cyxy-popup-name").text(t.user.username), K("#cyxy-popup-time").text(V.getDateDiff(t.updated_at)), K("#cyxy-popup-favour-num").text(t.rate.LIKE || 0), K("#cyxy-popup-favour-img").attr("src", G.FAVOR_IMG_URL), K("#cyxy-popup-oppose-num").text(t.rate.UNLIKE || 0)
                            }
                        }) : (q.data("targetList", []), K("#cyxy-popup-left-slide").hide(), K("#cyxy-popup-right-slide").hide(), K("#cyxy-popup-avatar").attr("src", G.XIAOYI_DEFAULT_URL), K("#cyxy-popup-name").text(me), K("#cyxy-popup-time").text(ye), K("#cyxy-popup-favour-num").text("0"), K("#cyxy-popup-favour-img").attr("src", G.FAVOR_IMG_URL), K(this).data("xiaoyiText", K(this).text()));
                        for (var t = this, n = t.offsetTop + t.offsetHeight + 5, r = t.offsetLeft; t.offsetParent;) t = t.offsetParent, n += t.offsetTop, r += t.offsetLeft;
                        return r > window.innerWidth / 3 && (r = .25 * window.innerWidth), K(".cyxy-target-popup").css({
                            top: n,
                            left: r
                        }), K(".cyxy-target-popup").show(), K(this).data("before", K(this).text()), K(this)
                    }
                }).on("paste input", "." + Q + "[contenteditable]", function () {
                    if (!K("#cyxy-popup-favour").hasClass("commit")) return K(this).data("before") !== K(this).text() && (q.data("status", "edit"), K("#cyxy-popup-avatar").attr("src", _e.avatar_url), K("#cyxy-popup-name").text(_e.username), K("#cyxy-popup-time").text(xe), K("#cyxy-popup-favour-num").text(ve), K("#cyxy-popup-favour-img").attr("src", G.CHECKED_IMG_URL), K("#cyxy-popup-favour").addClass("commit"), K("#cyxy-popup-oppose-num").text("0")), K(this)
                }).on("blur focusout", "." + Q + "[contenteditable]", function () {
                    return h(), g(), K(this)
                })
            }
        }

        function w(e) {
            "android" == Ne && window.js.changeProgress(e)
        }

        function T(e) {
            return !!e.match(/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?/gi)
        }

        function E(e) {
            return e.innerText && e.innerText.trim().length > 1 && e.innerText.length < 2048 && isNaN(e.innerText) && !T(e.innerText)
        }

        function S(e) {
            if (e.nodeValue) {
                var t = e.nodeValue.trim();
                return t.length > 1 && e.nodeValue.length < 2048 && isNaN(t) && !T(t)
            }
            return !1
        }

        function C(e) {
            return e.trim().replace("\n", "").replace("<br>", "").replace("&nbsp;", "")
        }

        function _(e) {
            var t = e[e.length - 1];
            return "." != t && "。" != t && "！" != t || (e = e.substr(0, e.length - 1).trim()), e
        }

        function k(e, t) {
            var n = e.className || "";
            if ("String" != typeof n || n.indexOf(t) === -1) {
                var r = "" != n ? " " : "", i = n + r + t;
                e.className = i, Me || K(".cyxy-trs-target").hide()
            }
        }

        function R(e) {
            if (e) {
                for (var t = e.offsetTop || 0, n = e.offsetLeft || 0; e.offsetParent;) e = e.offsetParent, t += e.offsetTop, n += e.offsetLeft;
                return t < window.pageYOffset + window.innerHeight * Z
            }
        }

        function L(e) {
            if (e && e.parentElement) {
                for (var t = e.parentElement, n = t.offsetTop || 0, r = t.offsetLeft || 0; t.offsetParent;) t = t.offsetParent, n += t.offsetTop, r += t.offsetLeft;
                return n < window.pageYOffset + window.innerHeight * Z && r < window.pageXOffset + window.innerWidth
            }
        }

        function O() {
            return we.indexOf("Android") > 0
        }

        function M() {
            return /(iPhone|iPad|iPod)/i.test(we)
        }

        function N() {
            for (var e = [function () {
                return new XMLHttpRequest
            }, function () {
                return new ActiveXObject("Msxml2.XMLHTTP")
            }, function () {
                return new ActiveXObject("Msxml3.XMLHTTP")
            }, function () {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }], t = !1, n = 0; n < e.length; n++) {
                try {
                    t = e[n]()
                } catch (e) {
                    continue
                }
                break
            }
            return t
        }

        function D() {
            var e = window.location.href, t = window.location.protocol + "//";
            return e = e.slice(e.indexOf(t) + t.length)
        }

        function I() {
            var e = "file:" == window.location.protocol ? "http:" : window.location.protocol,
                t = '<div class="cy_free_box" >';
            t += '<div class="cy_free_content"><img id="cy_free_content" src="' + e + '//www.caiyunapp.com/images/free-trs-box1.png" /></div>', t += '<div class="cy_free_button">', t += '<img  id="cy_free_button" src="' + e + '//www.caiyunapp.com/images/free-trs-button1.png" />', t += '<img  id="cy_free_del" src="' + e + '//www.caiyunapp.com/images/free-trs-del-button.png" />', t += "</div>", t += "</div>", H.open({
                content: t,
                skin: "cy_free_content"
            }), K("#cy_free_content,#cy_free_button").click(function () {
                P()
            }), K("#cy_free_del").click(function () {
                H.closeAll()
            })
        }

        function P() {
            var e = G.TRS_URL + "/v1/coupon/generate";
            chrome.runtime.sendMessage({
                method: "POST",
                contentScriptQuery: "fetchUrl",
                url: e,
                headers: {"X-Authorization": "token " + G.token},
                data: {browser_id: Te}
            }, function (e) {
                var t = JSON.parse(e.data), n = {};
                0 == t.rc && (console.log(t), t.coupon && (localStorage.setItem("cy_coupon_code", JSON.stringify({
                    coupon_code: t.coupon.coupon_code,
                    device_id: t.coupon.device_id
                })), n = {coupon_code: t.coupon.coupon_code, device_id: t.coupon.device_id})), B(n)
            })
        }

        function B(e) {
            var t = "", n = "", r = "";
            e.coupon_code && e.device_id && (t = "?coupon_code=" + e.coupon_code + "&device_id=" + e.device_id, n = e.coupon_code, r = e.coupon_code), "android" == Ne ? window.js.showLoginDialog(re, r) : "ios" == Ne ? window.webkit.messageHandlers.showLoginDialog.postMessage({
                title: re,
                coupon_code: n
            }) : window.location.href = G.LOGIN_URL + t
        }

        var U = document.querySelectorAll(".cyxy-target-popup");
        if (!(U && U.length > 0)) {
            var Raven = n(1), F = n(8), H = (n(9), n(13)), j = n(14), G = n(15), X = n(16), V = n(17), K = n(18);
            if (G.disable !== !0) {
                var q, W = "cyxy-trs-source", z = "cyxy-trs-source-ted", Q = "cyxy-trs-target", Y = "cyxy-target-count",
                    J = "cyxy-no-trs", Z = (G.token, 2.2), ee = "小译火力全开！LingoCloud, FIRE!", te = "", ne = "+30 彩云朵！现有：",
                    re = "限免次数已不足，成为小译注册用户，畅享更多阅读次数！现在注册还送彩云朵哟~", ie = "诶呦喂~彩云朵不足！修订译文或点击赞、分享赚取彩云朵，或购买VIP畅享无限阅读次数",
                    oe = "您还没有登录，是否登录编辑译文？", ae = "您还没有登录，是否登录编辑译文？如果已经登录，请刷新页面重试哦", se = "抱歉，网页认证有误，请刷新重试",
                    ce = "抱歉，网络请求有误，请刷新重试", ue = "抱歉，本地数据获取异常，请刷新重试", le = "抱歉，获取用户信息失败，请刷新重试", de = "修改译文成功",
                    pe = "译文未修改", fe = "提交有误", he = "感谢点赞，+5 彩云朵！", ge = "已经赞过啦", me = "彩云小译", ye = "刚刚", ve = "提交",
                    xe = "现在", Ae = "登录", be = "取消", we = navigator.userAgent, Te = "", Ee = "", Se = 0, Ce = "",
                    _e = {}, ke = "", Re = location.origin + location.pathname, Le = null, Oe = 2300, Me = !0;
                (location.host.indexOf("youtube.com") >= 0 || location.host.indexOf("wx.qq.com") >= 0 || location.host.indexOf("slack.com") >= 0) && (Oe = 1e3), "local" != G.ENV && Raven.config("https://c49231b0334e4624b8941767b8f6bfa4@sentry.in.caiyunapp.com/22", {
                    release: G.VERSION,
                    environment: G.ENV,
                    sampleRate: 1
                }).install();
                for (var Ne = o(), De = !1, Ie = D(), Pe = 0; Pe < X.no_urlArr.length; Pe++) if (Ie == X.no_urlArr[Pe]) {
                    console.log("停止翻译"), De = !0;
                    break
                }
                if (De) return void console.log("禁止翻译");
                Raven.context(function () {
                    t()
                });
                var Be, Ue = null, Fe = !1, He = !1, je = new Date;
                window.cyPageMark = function () {
                    var e = V.wordStatistics(document.body),
                        t = Math.round(((new Date).getTime() - je.getTime()) / 1e3),
                        n = (1.6 * e.en_words + e.zh_chars) / 9, r = t / n;
                    r >= 1 && (r = 1), j.pageMark({
                        time: t,
                        chars: Math.round(e.chars * r),
                        en_words: Math.round(e.en_words * r),
                        zh_chars: Math.round(e.zh_chars * r)
                    }, ke, Se, function (e) {
                    })
                }, window.onbeforeunload = function () {
                    cyPageMark()
                }
            }
        }
    }()
}, function (e, exports, t) {
    (function (n) {
        "use strict";
        var r = t(2),
            i = "undefined" != typeof window ? window : "undefined" != typeof n ? n : "undefined" != typeof self ? self : {},
            o = i.Raven, Raven = new r;
        Raven.noConflict = function () {
            return i.Raven = o, Raven
        }, Raven.afterLoad(), e.exports = Raven
    }).call(exports, function () {
        return this
    }())
}, function (e, exports, t) {
    (function (n) {
        "use strict";

        function r() {
            return +new Date
        }

        function i(e, t) {
            return a(t) ? function (n) {
                return t(n, e)
            } : t
        }

        function Raven() {
            this._hasJSON = !("object" != typeof JSON || !JSON.stringify), this._hasDocument = !o(D), this._hasNavigator = !o(I), this._lastCapturedException = null, this._lastData = null, this._lastEventId = null, this._globalServer = null, this._globalKey = null, this._globalProject = null, this._globalContext = {}, this._globalOptions = {
                logger: "javascript",
                ignoreErrors: [],
                ignoreUrls: [],
                whitelistUrls: [],
                includePaths: [],
                crossOrigin: "anonymous",
                collectWindowErrors: !0,
                maxMessageLength: 0,
                maxUrlLength: 250,
                stackTraceLimit: 50,
                autoBreadcrumbs: !0,
                instrument: !0,
                sampleRate: 1
            }, this._ignoreOnError = 0, this._isRavenInstalled = !1, this._originalErrorStackTraceLimit = Error.stackTraceLimit, this._originalConsole = N.console || {}, this._originalConsoleMethods = {}, this._plugins = [], this._startTime = r(), this._wrappedBuiltIns = [], this._breadcrumbs = [], this._lastCapturedEvent = null, this._keypressTimeout, this._location = N.location, this._lastHref = this._location && this._location.href, this._resetBackoff();
            for (var e in this._originalConsole) this._originalConsoleMethods[e] = this._originalConsole[e]
        }

        function o(e) {
            return void 0 === e
        }

        function a(e) {
            return "function" == typeof e
        }

        function s(e) {
            return "[object String]" === P.toString.call(e)
        }

        function c(e) {
            for (var t in e) return !1;
            return !0
        }

        function u(e, t) {
            var n, r;
            if (o(e.length)) for (n in e) f(e, n) && t.call(null, n, e[n]); else if (r = e.length) for (n = 0; n < r; n++) t.call(null, n, e[n])
        }

        function l(e, t) {
            return t ? (u(t, function (t, n) {
                e[t] = n
            }), e) : e
        }

        function d(e) {
            return !!Object.isFrozen && Object.isFrozen(e)
        }

        function p(e, t) {
            return !t || e.length <= t ? e : e.substr(0, t) + "…"
        }

        function f(e, t) {
            return P.hasOwnProperty.call(e, t)
        }

        function h(e) {
            for (var t, n = [], r = 0, i = e.length; r < i; r++) t = e[r], s(t) ? n.push(t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : t && t.source && n.push(t.source);
            return new RegExp(n.join("|"), "i")
        }

        function g(e) {
            var t = [];
            return u(e, function (e, n) {
                t.push(encodeURIComponent(e) + "=" + encodeURIComponent(n))
            }), t.join("&")
        }

        function m(e) {
            var t = e.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
            if (!t) return {};
            var n = t[6] || "", r = t[8] || "";
            return {protocol: t[2], host: t[4], path: t[5], relative: t[5] + n + r}
        }

        function y() {
            var e = N.crypto || N.msCrypto;
            if (!o(e) && e.getRandomValues) {
                var t = new Uint16Array(8);
                e.getRandomValues(t), t[3] = 4095 & t[3] | 16384, t[4] = 16383 & t[4] | 32768;
                var n = function (e) {
                    for (var t = e.toString(16); t.length < 4;) t = "0" + t;
                    return t
                };
                return n(t[0]) + n(t[1]) + n(t[2]) + n(t[3]) + n(t[4]) + n(t[5]) + n(t[6]) + n(t[7])
            }
            return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (e) {
                var t = 16 * Math.random() | 0, n = "x" === e ? t : 3 & t | 8;
                return n.toString(16)
            })
        }

        function v(e) {
            for (var t, n = 5, r = 80, i = [], o = 0, a = 0, s = " > ", c = s.length; e && o++ < n && (t = x(e), !("html" === t || o > 1 && a + i.length * c + t.length >= r));) i.push(t), a += t.length, e = e.parentNode;
            return i.reverse().join(s)
        }

        function x(e) {
            var t, n, r, i, o, a = [];
            if (!e || !e.tagName) return "";
            if (a.push(e.tagName.toLowerCase()), e.id && a.push("#" + e.id), t = e.className, t && s(t)) for (n = t.split(/\s+/), o = 0; o < n.length; o++) a.push("." + n[o]);
            var c = ["type", "name", "title", "alt"];
            for (o = 0; o < c.length; o++) r = c[o], i = e.getAttribute(r), i && a.push("[" + r + '="' + i + '"]');
            return a.join("")
        }

        function A(e, t) {
            return !!(!!e ^ !!t)
        }

        function b(e, t) {
            return !A(e, t) && (e = e.values[0], t = t.values[0], e.type === t.type && e.value === t.value && w(e.stacktrace, t.stacktrace))
        }

        function w(e, t) {
            if (A(e, t)) return !1;
            var n = e.frames, r = t.frames;
            if (n.length !== r.length) return !1;
            for (var i, o, a = 0; a < n.length; a++) if (i = n[a], o = r[a], i.filename !== o.filename || i.lineno !== o.lineno || i.colno !== o.colno || i.function !== o.function) return !1;
            return !0
        }

        function T(e, t, n, r) {
            var i = e[t];
            e[t] = n(i), r && r.push([e, t, i])
        }

        var E = t(3), S = t(5), C = t(6), _ = t(4), k = _.isError, R = _.isObject, L = t(7).wrapMethod,
            O = "source protocol user pass host port path".split(" "),
            M = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/,
            N = "undefined" != typeof window ? window : "undefined" != typeof n ? n : "undefined" != typeof self ? self : {},
            D = N.document, I = N.navigator;
        Raven.prototype = {
            VERSION: "3.17.0", debug: !1, TraceKit: E, config: function (e, t) {
                var n = this;
                if (n._globalServer) return this._logDebug("error", "Error: Raven has already been configured"), n;
                if (!e) return n;
                var r = n._globalOptions;
                t && u(t, function (e, t) {
                    "tags" === e || "extra" === e || "user" === e ? n._globalContext[e] = t : r[e] = t
                }), n.setDSN(e), r.ignoreErrors.push(/^Script error\.?$/), r.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/), r.ignoreErrors = h(r.ignoreErrors), r.ignoreUrls = !!r.ignoreUrls.length && h(r.ignoreUrls), r.whitelistUrls = !!r.whitelistUrls.length && h(r.whitelistUrls), r.includePaths = h(r.includePaths), r.maxBreadcrumbs = Math.max(0, Math.min(r.maxBreadcrumbs || 100, 100));
                var i = {xhr: !0, console: !0, dom: !0, location: !0}, o = r.autoBreadcrumbs;
                "[object Object]" === {}.toString.call(o) ? o = l(i, o) : o !== !1 && (o = i), r.autoBreadcrumbs = o;
                var a = {tryCatch: !0}, s = r.instrument;
                return "[object Object]" === {}.toString.call(s) ? s = l(a, s) : s !== !1 && (s = a), r.instrument = s, E.collectWindowErrors = !!r.collectWindowErrors, n
            }, install: function () {
                var e = this;
                return e.isSetup() && !e._isRavenInstalled && (E.report.subscribe(function () {
                    e._handleOnErrorStackInfo.apply(e, arguments)
                }), e._globalOptions.instrument && e._globalOptions.instrument.tryCatch && e._instrumentTryCatch(), e._globalOptions.autoBreadcrumbs && e._instrumentBreadcrumbs(), e._drainPlugins(), e._isRavenInstalled = !0), Error.stackTraceLimit = e._globalOptions.stackTraceLimit, this
            }, setDSN: function (e) {
                var t = this, n = t._parseDSN(e), r = n.path.lastIndexOf("/"), i = n.path.substr(1, r);
                t._dsn = e, t._globalKey = n.user, t._globalSecret = n.pass && n.pass.substr(1), t._globalProject = n.path.substr(r + 1), t._globalServer = t._getGlobalServer(n), t._globalEndpoint = t._globalServer + "/" + i + "api/" + t._globalProject + "/store/", this._resetBackoff()
            }, context: function (e, t, n) {
                return a(e) && (n = t || [], t = e, e = void 0), this.wrap(e, t).apply(this, n)
            }, wrap: function (e, t, n) {
                function r() {
                    var r = [], o = arguments.length, s = !e || e && e.deep !== !1;
                    for (n && a(n) && n.apply(this, arguments); o--;) r[o] = s ? i.wrap(e, arguments[o]) : arguments[o];
                    try {
                        return t.apply(this, r)
                    } catch (t) {
                        throw i._ignoreNextOnError(), i.captureException(t, e), t
                    }
                }

                var i = this;
                if (o(t) && !a(e)) return e;
                if (a(e) && (t = e, e = void 0), !a(t)) return t;
                try {
                    if (t.__raven__) return t;
                    if (t.__raven_wrapper__) return t.__raven_wrapper__
                } catch (e) {
                    return t
                }
                for (var s in t) f(t, s) && (r[s] = t[s]);
                return r.prototype = t.prototype, t.__raven_wrapper__ = r, r.__raven__ = !0, r.__inner__ = t, r
            }, uninstall: function () {
                return E.report.uninstall(), this._restoreBuiltIns(), Error.stackTraceLimit = this._originalErrorStackTraceLimit, this._isRavenInstalled = !1, this
            }, captureException: function (e, t) {
                if (!k(e)) return this.captureMessage(e, l({trimHeadFrames: 1, stacktrace: !0}, t));
                this._lastCapturedException = e;
                try {
                    var n = E.computeStackTrace(e);
                    this._handleStackInfo(n, t)
                } catch (t) {
                    if (e !== t) throw t
                }
                return this
            }, captureMessage: function (e, t) {
                if (!this._globalOptions.ignoreErrors.test || !this._globalOptions.ignoreErrors.test(e)) {
                    t = t || {};
                    var n = l({message: e + ""}, t);
                    if (this._globalOptions.stacktrace || t && t.stacktrace) {
                        var r;
                        try {
                            throw new Error(e)
                        } catch (e) {
                            r = e
                        }
                        r.name = null, t = l({fingerprint: e, trimHeadFrames: (t.trimHeadFrames || 0) + 1}, t);
                        var i = E.computeStackTrace(r), o = this._prepareFrames(i, t);
                        n.stacktrace = {frames: o.reverse()}
                    }
                    return this._send(n), this
                }
            }, captureBreadcrumb: function (e) {
                var t = l({timestamp: r() / 1e3}, e);
                if (a(this._globalOptions.breadcrumbCallback)) {
                    var n = this._globalOptions.breadcrumbCallback(t);
                    if (R(n) && !c(n)) t = n; else if (n === !1) return this
                }
                return this._breadcrumbs.push(t), this._breadcrumbs.length > this._globalOptions.maxBreadcrumbs && this._breadcrumbs.shift(), this
            }, addPlugin: function (e) {
                var t = [].slice.call(arguments, 1);
                return this._plugins.push([e, t]), this._isRavenInstalled && this._drainPlugins(), this
            }, setUserContext: function (e) {
                return this._globalContext.user = e, this
            }, setExtraContext: function (e) {
                return this._mergeContext("extra", e), this
            }, setTagsContext: function (e) {
                return this._mergeContext("tags", e), this
            }, clearContext: function () {
                return this._globalContext = {}, this
            }, getContext: function () {
                return JSON.parse(S(this._globalContext))
            }, setEnvironment: function (e) {
                return this._globalOptions.environment = e, this
            }, setRelease: function (e) {
                return this._globalOptions.release = e, this
            }, setDataCallback: function (e) {
                var t = this._globalOptions.dataCallback;
                return this._globalOptions.dataCallback = i(t, e), this
            }, setBreadcrumbCallback: function (e) {
                var t = this._globalOptions.breadcrumbCallback;
                return this._globalOptions.breadcrumbCallback = i(t, e), this
            }, setShouldSendCallback: function (e) {
                var t = this._globalOptions.shouldSendCallback;
                return this._globalOptions.shouldSendCallback = i(t, e), this
            }, setTransport: function (e) {
                return this._globalOptions.transport = e, this
            }, lastException: function () {
                return this._lastCapturedException
            }, lastEventId: function () {
                return this._lastEventId
            }, isSetup: function () {
                return !!this._hasJSON && (!!this._globalServer || (this.ravenNotConfiguredError || (this.ravenNotConfiguredError = !0, this._logDebug("error", "Error: Raven has not been configured.")), !1))
            }, afterLoad: function () {
                var e = N.RavenConfig;
                e && this.config(e.dsn, e.config).install()
            }, showReportDialog: function (e) {
                if (D) {
                    e = e || {};
                    var t = e.eventId || this.lastEventId();
                    if (!t) throw new C("Missing eventId");
                    var n = e.dsn || this._dsn;
                    if (!n) throw new C("Missing DSN");
                    var r = encodeURIComponent, i = "";
                    i += "?eventId=" + r(t), i += "&dsn=" + r(n);
                    var o = e.user || this._globalContext.user;
                    o && (o.name && (i += "&name=" + r(o.name)), o.email && (i += "&email=" + r(o.email)));
                    var a = this._getGlobalServer(this._parseDSN(n)), s = D.createElement("script");
                    s.async = !0, s.src = a + "/api/embed/error-page/" + i, (D.head || D.body).appendChild(s)
                }
            }, _ignoreNextOnError: function () {
                var e = this;
                this._ignoreOnError += 1, setTimeout(function () {
                    e._ignoreOnError -= 1
                })
            }, _triggerEvent: function (e, t) {
                var n, r;
                if (this._hasDocument) {
                    t = t || {}, e = "raven" + e.substr(0, 1).toUpperCase() + e.substr(1), D.createEvent ? (n = D.createEvent("HTMLEvents"), n.initEvent(e, !0, !0)) : (n = D.createEventObject(), n.eventType = e);
                    for (r in t) f(t, r) && (n[r] = t[r]);
                    if (D.createEvent) D.dispatchEvent(n); else try {
                        D.fireEvent("on" + n.eventType.toLowerCase(), n)
                    } catch (e) {
                    }
                }
            }, _breadcrumbEventHandler: function (e) {
                var t = this;
                return function (n) {
                    if (t._keypressTimeout = null, t._lastCapturedEvent !== n) {
                        t._lastCapturedEvent = n;
                        var r;
                        try {
                            r = v(n.target)
                        } catch (e) {
                            r = "<unknown>"
                        }
                        t.captureBreadcrumb({category: "ui." + e, message: r})
                    }
                }
            }, _keypressEventHandler: function () {
                var e = this, t = 1e3;
                return function (n) {
                    var r;
                    try {
                        r = n.target
                    } catch (e) {
                        return
                    }
                    var i = r && r.tagName;
                    if (i && ("INPUT" === i || "TEXTAREA" === i || r.isContentEditable)) {
                        var o = e._keypressTimeout;
                        o || e._breadcrumbEventHandler("input")(n), clearTimeout(o), e._keypressTimeout = setTimeout(function () {
                            e._keypressTimeout = null
                        }, t)
                    }
                }
            }, _captureUrlChange: function (e, t) {
                var n = m(this._location.href), r = m(t), i = m(e);
                this._lastHref = t, n.protocol === r.protocol && n.host === r.host && (t = r.relative), n.protocol === i.protocol && n.host === i.host && (e = i.relative), this.captureBreadcrumb({
                    category: "navigation",
                    data: {to: t, from: e}
                })
            }, _instrumentTryCatch: function () {
                function e(e) {
                    return function (t, r) {
                        for (var i = new Array(arguments.length), o = 0; o < i.length; ++o) i[o] = arguments[o];
                        var s = i[0];
                        return a(s) && (i[0] = n.wrap(s)), e.apply ? e.apply(this, i) : e(i[0], i[1])
                    }
                }

                function t(e) {
                    var t = N[e] && N[e].prototype;
                    t && t.hasOwnProperty && t.hasOwnProperty("addEventListener") && (T(t, "addEventListener", function (t) {
                        return function (r, o, a, s) {
                            try {
                                o && o.handleEvent && (o.handleEvent = n.wrap(o.handleEvent))
                            } catch (e) {
                            }
                            var c, u, l;
                            return i && i.dom && ("EventTarget" === e || "Node" === e) && (u = n._breadcrumbEventHandler("click"), l = n._keypressEventHandler(), c = function (e) {
                                if (e) {
                                    var t;
                                    try {
                                        t = e.type
                                    } catch (e) {
                                        return
                                    }
                                    return "click" === t ? u(e) : "keypress" === t ? l(e) : void 0
                                }
                            }), t.call(this, r, n.wrap(o, void 0, c), a, s)
                        }
                    }, r), T(t, "removeEventListener", function (e) {
                        return function (t, n, r, i) {
                            try {
                                n = n && (n.__raven_wrapper__ ? n.__raven_wrapper__ : n)
                            } catch (e) {
                            }
                            return e.call(this, t, n, r, i)
                        }
                    }, r))
                }

                var n = this, r = n._wrappedBuiltIns, i = this._globalOptions.autoBreadcrumbs;
                T(N, "setTimeout", e, r), T(N, "setInterval", e, r), N.requestAnimationFrame && T(N, "requestAnimationFrame", function (e) {
                    return function (t) {
                        return e(n.wrap(t))
                    }
                }, r);
                for (var o = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], s = 0; s < o.length; s++) t(o[s])
            }, _instrumentBreadcrumbs: function () {
                function e(e, n) {
                    e in n && a(n[e]) && T(n, e, function (e) {
                        return t.wrap(e)
                    })
                }

                var t = this, n = this._globalOptions.autoBreadcrumbs, r = t._wrappedBuiltIns;
                if (n.xhr && "XMLHttpRequest" in N) {
                    var i = XMLHttpRequest.prototype;
                    T(i, "open", function (e) {
                        return function (n, r) {
                            return s(r) && r.indexOf(t._globalKey) === -1 && (this.__raven_xhr = {
                                method: n,
                                url: r,
                                status_code: null
                            }), e.apply(this, arguments)
                        }
                    }, r), T(i, "send", function (n) {
                        return function (r) {
                            function i() {
                                if (o.__raven_xhr && (1 === o.readyState || 4 === o.readyState)) {
                                    try {
                                        o.__raven_xhr.status_code = o.status
                                    } catch (e) {
                                    }
                                    t.captureBreadcrumb({type: "http", category: "xhr", data: o.__raven_xhr})
                                }
                            }

                            for (var o = this, s = ["onload", "onerror", "onprogress"], c = 0; c < s.length; c++) e(s[c], o);
                            return "onreadystatechange" in o && a(o.onreadystatechange) ? T(o, "onreadystatechange", function (e) {
                                return t.wrap(e, void 0, i)
                            }) : o.onreadystatechange = i, n.apply(this, arguments)
                        }
                    }, r)
                }
                n.xhr && "fetch" in N && T(N, "fetch", function (e) {
                    return function (n, r) {
                        for (var i = new Array(arguments.length), o = 0; o < i.length; ++o) i[o] = arguments[o];
                        var a, s = i[0], c = "GET";
                        "string" == typeof s ? a = s : (a = s.url, s.method && (c = s.method)), i[1] && i[1].method && (c = i[1].method);
                        var u = {method: c, url: a, status_code: null};
                        return t.captureBreadcrumb({
                            type: "http",
                            category: "fetch",
                            data: u
                        }), e.apply(this, i).then(function (e) {
                            return u.status_code = e.status, e
                        })
                    }
                }, r), n.dom && this._hasDocument && (D.addEventListener ? (D.addEventListener("click", t._breadcrumbEventHandler("click"), !1), D.addEventListener("keypress", t._keypressEventHandler(), !1)) : (D.attachEvent("onclick", t._breadcrumbEventHandler("click")), D.attachEvent("onkeypress", t._keypressEventHandler())));
                var o = N.chrome, c = o && o.app && o.app.runtime, l = !c && N.history && history.pushState;
                if (n.location && l) {
                    var d = N.onpopstate;
                    N.onpopstate = function () {
                        var e = t._location.href;
                        if (t._captureUrlChange(t._lastHref, e), d) return d.apply(this, arguments)
                    }, T(history, "pushState", function (e) {
                        return function () {
                            var n = arguments.length > 2 ? arguments[2] : void 0;
                            return n && t._captureUrlChange(t._lastHref, n + ""), e.apply(this, arguments)
                        }
                    }, r)
                }
                if (n.console && "console" in N && console.log) {
                    var p = function (e, n) {
                        t.captureBreadcrumb({message: e, level: n.level, category: "console"})
                    };
                    u(["debug", "info", "warn", "error", "log"], function (e, t) {
                        L(console, t, p)
                    })
                }
            }, _restoreBuiltIns: function () {
                for (var e; this._wrappedBuiltIns.length;) {
                    e = this._wrappedBuiltIns.shift();
                    var t = e[0], n = e[1], r = e[2];
                    t[n] = r
                }
            }, _drainPlugins: function () {
                var e = this;
                u(this._plugins, function (t, n) {
                    var r = n[0], i = n[1];
                    r.apply(e, [e].concat(i))
                })
            }, _parseDSN: function (e) {
                var t = M.exec(e), n = {}, r = 7;
                try {
                    for (; r--;) n[O[r]] = t[r] || ""
                } catch (t) {
                    throw new C("Invalid DSN: " + e)
                }
                if (n.pass && !this._globalOptions.allowSecretKey) throw new C("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");
                return n
            }, _getGlobalServer: function (e) {
                var t = "//" + e.host + (e.port ? ":" + e.port : "");
                return e.protocol && (t = e.protocol + ":" + t), t
            }, _handleOnErrorStackInfo: function () {
                this._ignoreOnError || this._handleStackInfo.apply(this, arguments)
            }, _handleStackInfo: function (e, t) {
                var n = this._prepareFrames(e, t);
                this._triggerEvent("handle", {
                    stackInfo: e,
                    options: t
                }), this._processException(e.name, e.message, e.url, e.lineno, n, t)
            }, _prepareFrames: function (e, t) {
                var n = this, r = [];
                if (e.stack && e.stack.length && (u(e.stack, function (e, t) {
                    var i = n._normalizeFrame(t);
                    i && r.push(i)
                }), t && t.trimHeadFrames)) for (var i = 0; i < t.trimHeadFrames && i < r.length; i++) r[i].in_app = !1;
                return r = r.slice(0, this._globalOptions.stackTraceLimit)
            }, _normalizeFrame: function (e) {
                if (e.url) {
                    var t = {filename: e.url, lineno: e.line, colno: e.column, function: e.func || "?"};
                    return t.in_app = !(this._globalOptions.includePaths.test && !this._globalOptions.includePaths.test(t.filename) || /(Raven|TraceKit)\./.test(t.function) || /raven\.(min\.)?js$/.test(t.filename)), t
                }
            }, _processException: function (e, t, n, r, i, o) {
                var a;
                if ((!this._globalOptions.ignoreErrors.test || !this._globalOptions.ignoreErrors.test(t)) && (t += "", i && i.length ? (n = i[0].filename || n, i.reverse(), a = {frames: i}) : n && (a = {
                    frames: [{
                        filename: n,
                        lineno: r,
                        in_app: !0
                    }]
                }), (!this._globalOptions.ignoreUrls.test || !this._globalOptions.ignoreUrls.test(n)) && (!this._globalOptions.whitelistUrls.test || this._globalOptions.whitelistUrls.test(n)))) {
                    var s = l({exception: {values: [{type: e, value: t, stacktrace: a}]}, culprit: n}, o);
                    this._send(s)
                }
            }, _trimPacket: function (e) {
                var t = this._globalOptions.maxMessageLength;
                if (e.message && (e.message = p(e.message, t)), e.exception) {
                    var n = e.exception.values[0];
                    n.value = p(n.value, t)
                }
                var r = e.request;
                return r && (r.url && (r.url = p(r.url, this._globalOptions.maxUrlLength)), r.Referer && (r.Referer = p(r.Referer, this._globalOptions.maxUrlLength))), e.breadcrumbs && e.breadcrumbs.values && this._trimBreadcrumbs(e.breadcrumbs), e
            }, _trimBreadcrumbs: function (e) {
                for (var t, n, r, i = ["to", "from", "url"], o = 0; o < e.values.length; ++o) if (n = e.values[o], n.hasOwnProperty("data") && R(n.data) && !d(n.data)) {
                    r = l({}, n.data);
                    for (var a = 0; a < i.length; ++a) t = i[a], r.hasOwnProperty(t) && (r[t] = p(r[t], this._globalOptions.maxUrlLength));
                    e.values[o].data = r
                }
            }, _getHttpData: function () {
                if (this._hasNavigator || this._hasDocument) {
                    var e = {};
                    return this._hasNavigator && I.userAgent && (e.headers = {"User-Agent": navigator.userAgent}), this._hasDocument && (D.location && D.location.href && (e.url = D.location.href), D.referrer && (e.headers || (e.headers = {}), e.headers.Referer = D.referrer)), e
                }
            }, _resetBackoff: function () {
                this._backoffDuration = 0, this._backoffStart = null
            }, _shouldBackoff: function () {
                return this._backoffDuration && r() - this._backoffStart < this._backoffDuration
            }, _isRepeatData: function (e) {
                var t = this._lastData;
                return !(!t || e.message !== t.message || e.culprit !== t.culprit) && (e.stacktrace || t.stacktrace ? w(e.stacktrace, t.stacktrace) : !e.exception && !t.exception || b(e.exception, t.exception))
            }, _setBackoffState: function (e) {
                if (!this._shouldBackoff()) {
                    var t = e.status;
                    if (400 === t || 401 === t || 429 === t) {
                        var n;
                        try {
                            n = e.getResponseHeader("Retry-After"), n = 1e3 * parseInt(n, 10)
                        } catch (e) {
                        }
                        this._backoffDuration = n ? n : 2 * this._backoffDuration || 1e3, this._backoffStart = r()
                    }
                }
            }, _send: function (e) {
                var t = this._globalOptions,
                    n = {project: this._globalProject, logger: t.logger, platform: "javascript"},
                    i = this._getHttpData();
                if (i && (n.request = i), e.trimHeadFrames && delete e.trimHeadFrames, e = l(n, e), e.tags = l(l({}, this._globalContext.tags), e.tags), e.extra = l(l({}, this._globalContext.extra), e.extra), e.extra["session:duration"] = r() - this._startTime, this._breadcrumbs && this._breadcrumbs.length > 0 && (e.breadcrumbs = {values: [].slice.call(this._breadcrumbs, 0)}), c(e.tags) && delete e.tags, this._globalContext.user && (e.user = this._globalContext.user), t.environment && (e.environment = t.environment), t.release && (e.release = t.release), t.serverName && (e.server_name = t.serverName), a(t.dataCallback) && (e = t.dataCallback(e) || e), e && !c(e) && (!a(t.shouldSendCallback) || t.shouldSendCallback(e))) return this._shouldBackoff() ? void this._logDebug("warn", "Raven dropped error due to backoff: ", e) : void ("number" == typeof t.sampleRate ? Math.random() < t.sampleRate && this._sendProcessedPayload(e) : this._sendProcessedPayload(e))
            }, _getUuid: function () {
                return y()
            }, _sendProcessedPayload: function (e, t) {
                var n = this, r = this._globalOptions;
                if (this.isSetup()) {
                    if (this._lastEventId = e.event_id || (e.event_id = this._getUuid()), e = this._trimPacket(e), !this._globalOptions.allowDuplicates && this._isRepeatData(e)) return void this._logDebug("warn", "Raven dropped repeat event: ", e);
                    this._lastData = e, this._logDebug("debug", "Raven about to send:", e);
                    var i = {
                        sentry_version: "7",
                        sentry_client: "raven-js/" + this.VERSION,
                        sentry_key: this._globalKey
                    };
                    this._globalSecret && (i.sentry_secret = this._globalSecret);
                    var o = e.exception && e.exception.values[0];
                    this.captureBreadcrumb({
                        category: "sentry",
                        message: o ? (o.type ? o.type + ": " : "") + o.value : e.message,
                        event_id: e.event_id,
                        level: e.level || "error"
                    });
                    var a = this._globalEndpoint;
                    (r.transport || this._makeRequest).call(this, {
                        url: a,
                        auth: i,
                        data: e,
                        options: r,
                        onSuccess: function () {
                            n._resetBackoff(), n._triggerEvent("success", {data: e, src: a}), t && t()
                        },
                        onError: function (r) {
                            n._logDebug("error", "Raven transport failed to send: ", r), r.request && n._setBackoffState(r.request), n._triggerEvent("failure", {
                                data: e,
                                src: a
                            }), r = r || new Error("Raven send failed (no additional details provided)"), t && t(r)
                        }
                    })
                }
            }, _makeRequest: function (e) {
                var t = new XMLHttpRequest, n = "withCredentials" in t || "undefined" != typeof XDomainRequest;
                if (n) {
                    var r = e.url;
                    "withCredentials" in t ? t.onreadystatechange = function () {
                        if (4 === t.readyState) if (200 === t.status) e.onSuccess && e.onSuccess(); else if (e.onError) {
                            var n = new Error("Sentry error code: " + t.status);
                            n.request = t, e.onError(n)
                        }
                    } : (t = new XDomainRequest, r = r.replace(/^https?:/, ""), e.onSuccess && (t.onload = e.onSuccess), e.onError && (t.onerror = function () {
                        var n = new Error("Sentry error code: XDomainRequest");
                        n.request = t, e.onError(n)
                    })), t.open("POST", r + "?" + g(e.auth)), t.send(S(e.data))
                }
            }, _logDebug: function (e) {
                this._originalConsoleMethods[e] && this.debug && Function.prototype.apply.call(this._originalConsoleMethods[e], this._originalConsole, [].slice.call(arguments, 1))
            }, _mergeContext: function (e, t) {
                o(t) ? delete this._globalContext[e] : this._globalContext[e] = l(this._globalContext[e] || {}, t)
            }
        };
        var P = Object.prototype;
        "undefined" != typeof __DEV__ && __DEV__ && (Raven.utils = {
            isUndefined: o,
            isFunction: a,
            isString: s,
            isObject: R,
            isEmptyObject: c,
            isError: k,
            each: u,
            objectMerge: l,
            truncate: p,
            hasKey: f,
            joinRegExp: h,
            urlencode: g,
            uuid4: y,
            htmlTreeAsString: v,
            htmlElementAsString: x,
            parseUrl: m,
            fill: T
        }), Raven.prototype.setUser = Raven.prototype.setUserContext, Raven.prototype.setReleaseContext = Raven.prototype.setRelease, e.exports = Raven
    }).call(exports, function () {
        return this
    }())
}, function (e, exports, t) {
    (function (n) {
        "use strict";

        function r() {
            return "undefined" == typeof document || "undefined" == typeof document.location ? "" : document.location.href
        }

        var i = t(4), o = {collectWindowErrors: !0, debug: !1},
            a = "undefined" != typeof window ? window : "undefined" != typeof n ? n : "undefined" != typeof self ? self : {},
            s = [].slice, c = "?",
            u = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
        o.report = function () {
            function e(e) {
                p(), v.push(e)
            }

            function t(e) {
                for (var t = v.length - 1; t >= 0; --t) v[t] === e && v.splice(t, 1)
            }

            function n() {
                f(), v = []
            }

            function l(e, t) {
                var n = null;
                if (!t || o.collectWindowErrors) {
                    for (var r in v) if (v.hasOwnProperty(r)) try {
                        v[r].apply(null, [e].concat(s.call(arguments, 2)))
                    } catch (e) {
                        n = e
                    }
                    if (n) throw n
                }
            }

            function d(e, t, n, a, s) {
                var d = null;
                if (b) o.computeStackTrace.augmentStackTraceWithInitialElement(b, t, n, e), h(); else if (s && i.isError(s)) d = o.computeStackTrace(s), l(d, !0); else {
                    var p, f = {url: t, line: n, column: a}, g = void 0, y = e;
                    if ("[object String]" === {}.toString.call(e)) {
                        var p = e.match(u);
                        p && (g = p[1], y = p[2])
                    }
                    f.func = c, d = {name: g, message: y, url: r(), stack: [f]}, l(d, !0)
                }
                return !!m && m.apply(this, arguments)
            }

            function p() {
                y || (m = a.onerror, a.onerror = d, y = !0)
            }

            function f() {
                y && (a.onerror = m, y = !1, m = void 0)
            }

            function h() {
                var e = b, t = x;
                x = null, b = null, A = null, l.apply(null, [e, !1].concat(t))
            }

            function g(e, t) {
                var n = s.call(arguments, 1);
                if (b) {
                    if (A === e) return;
                    h()
                }
                var r = o.computeStackTrace(e);
                if (b = r, A = e, x = n, setTimeout(function () {
                    A === e && h()
                }, r.incomplete ? 2e3 : 0), t !== !1) throw e
            }

            var m, y, v = [], x = null, A = null, b = null;
            return g.subscribe = e, g.unsubscribe = t, g.uninstall = n, g
        }(), o.computeStackTrace = function () {
            function e(e) {
                if ("undefined" != typeof e.stack && e.stack) {
                    for (var t, n, i, o = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, a = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, s = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, u = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, l = /\((\S*)(?::(\d+))(?::(\d+))\)/, d = e.stack.split("\n"), p = [], f = (/^(.*) is undefined$/.exec(e.message), 0), h = d.length; f < h; ++f) {
                        if (n = o.exec(d[f])) {
                            var g = n[2] && 0 === n[2].indexOf("native"), m = n[2] && 0 === n[2].indexOf("eval");
                            m && (t = l.exec(n[2])) && (n[2] = t[1], n[3] = t[2], n[4] = t[3]), i = {
                                url: g ? null : n[2],
                                func: n[1] || c,
                                args: g ? [n[2]] : [],
                                line: n[3] ? +n[3] : null,
                                column: n[4] ? +n[4] : null
                            }
                        } else if (n = s.exec(d[f])) i = {
                            url: n[2],
                            func: n[1] || c,
                            args: [],
                            line: +n[3],
                            column: n[4] ? +n[4] : null
                        }; else {
                            if (!(n = a.exec(d[f]))) continue;
                            var m = n[3] && n[3].indexOf(" > eval") > -1;
                            m && (t = u.exec(n[3])) ? (n[3] = t[1], n[4] = t[2], n[5] = null) : 0 !== f || n[5] || "undefined" == typeof e.columnNumber || (p[0].column = e.columnNumber + 1), i = {
                                url: n[3],
                                func: n[1] || c,
                                args: n[2] ? n[2].split(",") : [],
                                line: n[4] ? +n[4] : null,
                                column: n[5] ? +n[5] : null
                            }
                        }
                        !i.func && i.line && (i.func = c), p.push(i)
                    }
                    return p.length ? {name: e.name, message: e.message, url: r(), stack: p} : null
                }
            }

            function t(e, t, n, r) {
                var i = {url: t, line: n};
                if (i.url && i.line) {
                    if (e.incomplete = !1, i.func || (i.func = c), e.stack.length > 0 && e.stack[0].url === i.url) {
                        if (e.stack[0].line === i.line) return !1;
                        if (!e.stack[0].line && e.stack[0].func === i.func) return e.stack[0].line = i.line, !1
                    }
                    return e.stack.unshift(i), e.partial = !0, !0
                }
                return e.incomplete = !0, !1
            }

            function n(e, a) {
                for (var s, u, l = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, d = [], p = {}, f = !1, h = n.caller; h && !f; h = h.caller) if (h !== i && h !== o.report) {
                    if (u = {
                        url: null,
                        func: c,
                        line: null,
                        column: null
                    }, h.name ? u.func = h.name : (s = l.exec(h.toString())) && (u.func = s[1]), "undefined" == typeof u.func) try {
                        u.func = s.input.substring(0, s.input.indexOf("{"))
                    } catch (e) {
                    }
                    p["" + h] ? f = !0 : p["" + h] = !0, d.push(u)
                }
                a && d.splice(0, a);
                var g = {name: e.name, message: e.message, url: r(), stack: d};
                return t(g, e.sourceURL || e.fileName, e.line || e.lineNumber, e.message || e.description), g
            }

            function i(t, i) {
                var a = null;
                i = null == i ? 0 : +i;
                try {
                    if (a = e(t)) return a
                } catch (e) {
                    if (o.debug) throw e
                }
                try {
                    if (a = n(t, i + 1)) return a
                } catch (e) {
                    if (o.debug) throw e
                }
                return {name: t.name, message: t.message, url: r()}
            }

            return i.augmentStackTraceWithInitialElement = t, i.computeStackTraceFromStackProp = e, i
        }(), e.exports = o
    }).call(exports, function () {
        return this
    }())
}, function (e, exports) {
    "use strict";

    function t(e) {
        return "object" == typeof e && null !== e
    }

    function n(e) {
        switch ({}.toString.call(e)) {
            case"[object Error]":
                return !0;
            case"[object Exception]":
                return !0;
            case"[object DOMException]":
                return !0;
            default:
                return e instanceof Error
        }
    }

    function r(e) {
        function t(t, n) {
            var r = e(t) || t;
            return n ? n(r) || r : r
        }

        return t
    }

    e.exports = {isObject: t, isError: n, wrappedCallback: r}
}, function (e, exports) {
    "use strict";

    function t(e, t) {
        for (var n = 0; n < e.length; ++n) if (e[n] === t) return n;
        return -1
    }

    function n(e, t, n, i) {
        return JSON.stringify(e, r(t, i), n)
    }

    function r(e, n) {
        var r = [], i = [];
        return null == n && (n = function (e, n) {
            return r[0] === n ? "[Circular ~]" : "[Circular ~." + i.slice(0, t(r, n)).join(".") + "]"
        }), function (o, a) {
            if (r.length > 0) {
                var s = t(r, this);
                ~s ? r.splice(s + 1) : r.push(this), ~s ? i.splice(s, 1 / 0, o) : i.push(o), ~t(r, a) && (a = n.call(this, o, a))
            } else r.push(a);
            return null == e ? a : e.call(this, o, a)
        }
    }

    exports = e.exports = n, exports.getSerialize = r
}, function (e, exports) {
    "use strict";

    function t(e) {
        this.name = "RavenConfigError", this.message = e
    }

    t.prototype = new Error, t.prototype.constructor = t, e.exports = t
}, function (e, exports) {
    "use strict";
    var t = function (e, t, n) {
        var r = e[t], i = e;
        if (t in e) {
            var o = "warn" === t ? "warning" : t;
            e[t] = function () {
                var e = [].slice.call(arguments), t = "" + e.join(" "),
                    a = {level: o, logger: "console", extra: {arguments: e}};
                n && n(t, a), r && Function.prototype.apply.call(r, i, e)
            }
        }
    };
    e.exports = {wrapMethod: t}
}, function (e, exports) {
    !function (t, n, r) {
        "use strict";
        "function" == typeof window.define && window.define.amd ? window.define(r) : "undefined" != typeof e && e.exports ? e.exports = r() : n.exports ? n.exports = r() : n.Fingerprint2 = r()
    }(0, this, function () {
        "use strict";
        var e = function (t) {
            return this instanceof e ? (this.options = this.extend(t, {
                swfContainerId: "fingerprintjs2",
                swfPath: "flash/compiled/FontList.swf",
                detectScreenOrientation: !0,
                sortPluginsFor: [/palemoon/i],
                userDefinedFonts: [],
                excludeDoNotTrack: !0,
                excludePixelRatio: !0
            }), this.nativeForEach = Array.prototype.forEach, this.nativeMap = Array.prototype.map, void 0) : new e(t)
        };
        return e.prototype = {
            extend: function (e, t) {
                if (null == e) return t;
                for (var n in e) null != e[n] && t[n] !== e[n] && (t[n] = e[n]);
                return t
            }, get: function (e) {
                var t = this, n = {
                    data: [], addPreprocessedComponent: function (e) {
                        var r = e.value;
                        "function" == typeof t.options.preprocessor && (r = t.options.preprocessor(e.key, r)), n.data.push({
                            key: e.key,
                            value: r
                        })
                    }
                };
                n = this.userAgentKey(n), n = this.languageKey(n), n = this.colorDepthKey(n), n = this.deviceMemoryKey(n), n = this.pixelRatioKey(n), n = this.hardwareConcurrencyKey(n), n = this.screenResolutionKey(n), n = this.availableScreenResolutionKey(n), n = this.timezoneOffsetKey(n), n = this.sessionStorageKey(n), n = this.localStorageKey(n), n = this.indexedDbKey(n), n = this.addBehaviorKey(n), n = this.openDatabaseKey(n), n = this.cpuClassKey(n), n = this.platformKey(n), n = this.doNotTrackKey(n), n = this.pluginsKey(n), n = this.canvasKey(n), n = this.webglKey(n), n = this.webglVendorAndRendererKey(n), n = this.adBlockKey(n), n = this.hasLiedLanguagesKey(n), n = this.hasLiedResolutionKey(n), n = this.hasLiedOsKey(n), n = this.hasLiedBrowserKey(n), n = this.touchSupportKey(n), n = this.customEntropyFunction(n), this.fontsKey(n, function (n) {
                    var r = [];
                    t.each(n.data, function (e) {
                        var t = e.value;
                        t && "function" == typeof t.join && (t = t.join(";")), r.push(t)
                    });
                    var i = t.x64hash128(r.join("~~~"), 31);
                    return e(i, n.data)
                })
            }, customEntropyFunction: function (e) {
                return "function" == typeof this.options.customFunction && e.addPreprocessedComponent({
                    key: "custom",
                    value: this.options.customFunction()
                }), e
            }, userAgentKey: function (e) {
                return this.options.excludeUserAgent || e.addPreprocessedComponent({
                    key: "user_agent",
                    value: this.getUserAgent()
                }), e
            }, getUserAgent: function () {
                return navigator.userAgent
            }, languageKey: function (e) {
                return this.options.excludeLanguage || e.addPreprocessedComponent({
                    key: "language",
                    value: navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || ""
                }), e
            }, colorDepthKey: function (e) {
                return this.options.excludeColorDepth || e.addPreprocessedComponent({
                    key: "color_depth",
                    value: window.screen.colorDepth || -1
                }), e
            }, deviceMemoryKey: function (e) {
                return this.options.excludeDeviceMemory || e.addPreprocessedComponent({
                    key: "device_memory",
                    value: this.getDeviceMemory()
                }), e
            }, getDeviceMemory: function () {
                return navigator.deviceMemory || -1
            }, pixelRatioKey: function (e) {
                return this.options.excludePixelRatio || e.addPreprocessedComponent({
                    key: "pixel_ratio",
                    value: this.getPixelRatio()
                }), e
            }, getPixelRatio: function () {
                return window.devicePixelRatio || ""
            }, screenResolutionKey: function (e) {
                return this.options.excludeScreenResolution ? e : this.getScreenResolution(e)
            }, getScreenResolution: function (e) {
                var t;
                return t = this.options.detectScreenOrientation && window.screen.height > window.screen.width ? [window.screen.height, window.screen.width] : [window.screen.width, window.screen.height], e.addPreprocessedComponent({
                    key: "resolution",
                    value: t
                }), e
            }, availableScreenResolutionKey: function (e) {
                return this.options.excludeAvailableScreenResolution ? e : this.getAvailableScreenResolution(e)
            }, getAvailableScreenResolution: function (e) {
                var t;
                return window.screen.availWidth && window.screen.availHeight && (t = this.options.detectScreenOrientation ? window.screen.availHeight > window.screen.availWidth ? [window.screen.availHeight, window.screen.availWidth] : [window.screen.availWidth, window.screen.availHeight] : [window.screen.availHeight, window.screen.availWidth]), void 0 !== t && e.addPreprocessedComponent({
                    key: "available_resolution",
                    value: t
                }), e
            }, timezoneOffsetKey: function (e) {
                return this.options.excludeTimezoneOffset || e.addPreprocessedComponent({
                    key: "timezone_offset",
                    value: (new Date).getTimezoneOffset()
                }), e
            }, sessionStorageKey: function (e) {
                return !this.options.excludeSessionStorage && this.hasSessionStorage() && e.addPreprocessedComponent({
                    key: "session_storage",
                    value: 1
                }), e
            }, localStorageKey: function (e) {
                return !this.options.excludeSessionStorage && this.hasLocalStorage() && e.addPreprocessedComponent({
                    key: "local_storage",
                    value: 1
                }), e
            }, indexedDbKey: function (e) {
                return !this.options.excludeIndexedDB && this.hasIndexedDB() && e.addPreprocessedComponent({
                    key: "indexed_db",
                    value: 1
                }), e
            }, addBehaviorKey: function (e) {
                return !this.options.excludeAddBehavior && document.body && document.body.addBehavior && e.addPreprocessedComponent({
                    key: "add_behavior",
                    value: 1
                }), e
            }, openDatabaseKey: function (e) {
                return !this.options.excludeOpenDatabase && window.openDatabase && e.addPreprocessedComponent({
                    key: "open_database",
                    value: 1
                }), e
            }, cpuClassKey: function (e) {
                return this.options.excludeCpuClass || e.addPreprocessedComponent({
                    key: "cpu_class",
                    value: this.getNavigatorCpuClass()
                }), e
            }, platformKey: function (e) {
                return this.options.excludePlatform || e.addPreprocessedComponent({
                    key: "navigator_platform",
                    value: this.getNavigatorPlatform()
                }), e
            }, doNotTrackKey: function (e) {
                return this.options.excludeDoNotTrack || e.addPreprocessedComponent({
                    key: "do_not_track",
                    value: this.getDoNotTrack()
                }), e
            }, canvasKey: function (e) {
                return !this.options.excludeCanvas && this.isCanvasSupported() && e.addPreprocessedComponent({
                    key: "canvas",
                    value: this.getCanvasFp()
                }), e
            }, webglKey: function (e) {
                return !this.options.excludeWebGL && this.isWebGlSupported() && e.addPreprocessedComponent({
                    key: "webgl",
                    value: this.getWebglFp()
                }), e
            }, webglVendorAndRendererKey: function (e) {
                return !this.options.excludeWebGLVendorAndRenderer && this.isWebGlSupported() && e.addPreprocessedComponent({
                    key: "webgl_vendor",
                    value: this.getWebglVendorAndRenderer()
                }), e
            }, adBlockKey: function (e) {
                return this.options.excludeAdBlock || e.addPreprocessedComponent({
                    key: "adblock",
                    value: this.getAdBlock()
                }), e
            }, hasLiedLanguagesKey: function (e) {
                return this.options.excludeHasLiedLanguages || e.addPreprocessedComponent({
                    key: "has_lied_languages",
                    value: this.getHasLiedLanguages()
                }), e
            }, hasLiedResolutionKey: function (e) {
                return this.options.excludeHasLiedResolution || e.addPreprocessedComponent({
                    key: "has_lied_resolution",
                    value: this.getHasLiedResolution()
                }), e
            }, hasLiedOsKey: function (e) {
                return this.options.excludeHasLiedOs || e.addPreprocessedComponent({
                    key: "has_lied_os",
                    value: this.getHasLiedOs()
                }), e
            }, hasLiedBrowserKey: function (e) {
                return this.options.excludeHasLiedBrowser || e.addPreprocessedComponent({
                    key: "has_lied_browser",
                    value: this.getHasLiedBrowser()
                }), e
            }, fontsKey: function (e, t) {
                return this.options.excludeJsFonts ? this.flashFontsKey(e, t) : this.jsFontsKey(e, t)
            }, flashFontsKey: function (e, t) {
                return this.options.excludeFlashFonts ? t(e) : this.hasSwfObjectLoaded() && this.hasMinFlashInstalled() ? void 0 === this.options.swfPath ? t(e) : void this.loadSwfAndDetectFonts(function (n) {
                    e.addPreprocessedComponent({key: "swf_fonts", value: n.join(";")}), t(e)
                }) : t(e)
            }, jsFontsKey: function (e, t) {
                var n = this;
                return setTimeout(function () {
                    var r = ["monospace", "sans-serif", "serif"],
                        i = ["Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style", "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Geneva", "Georgia", "Helvetica", "Helvetica Neue", "Impact", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO", "Palatino", "Palatino Linotype", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS", "Verdana", "Wingdings", "Wingdings 2", "Wingdings 3"];
                    n.options.extendedJsFonts && (i = i.concat(["Abadi MT Condensed Light", "Academy Engraved LET", "ADOBE CASLON PRO", "Adobe Garamond", "ADOBE GARAMOND PRO", "Agency FB", "Aharoni", "Albertus Extra Bold", "Albertus Medium", "Algerian", "Amazone BT", "American Typewriter", "American Typewriter Condensed", "AmerType Md BT", "Andalus", "Angsana New", "AngsanaUPC", "Antique Olive", "Aparajita", "Apple Chancery", "Apple Color Emoji", "Apple SD Gothic Neo", "Arabic Typesetting", "ARCHER", "ARNO PRO", "Arrus BT", "Aurora Cn BT", "AvantGarde Bk BT", "AvantGarde Md BT", "AVENIR", "Ayuthaya", "Bandy", "Bangla Sangam MN", "Bank Gothic", "BankGothic Md BT", "Baskerville", "Baskerville Old Face", "Batang", "BatangChe", "Bauer Bodoni", "Bauhaus 93", "Bazooka", "Bell MT", "Bembo", "Benguiat Bk BT", "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed", "BernhardFashion BT", "BernhardMod BT", "Big Caslon", "BinnerD", "Blackadder ITC", "BlairMdITC TT", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni MT", "Bodoni MT Black", "Bodoni MT Condensed", "Bodoni MT Poster Compressed", "Bookshelf Symbol 7", "Boulder", "Bradley Hand", "Bradley Hand ITC", "Bremen Bd BT", "Britannic Bold", "Broadway", "Browallia New", "BrowalliaUPC", "Brush Script MT", "Californian FB", "Calisto MT", "Calligrapher", "Candara", "CaslonOpnface BT", "Castellar", "Centaur", "Cezanne", "CG Omega", "CG Times", "Chalkboard", "Chalkboard SE", "Chalkduster", "Charlesworth", "Charter Bd BT", "Charter BT", "Chaucer", "ChelthmITC Bk BT", "Chiller", "Clarendon", "Clarendon Condensed", "CloisterBlack BT", "Cochin", "Colonna MT", "Constantia", "Cooper Black", "Copperplate", "Copperplate Gothic", "Copperplate Gothic Bold", "Copperplate Gothic Light", "CopperplGoth Bd BT", "Corbel", "Cordia New", "CordiaUPC", "Cornerstone", "Coronet", "Cuckoo", "Curlz MT", "DaunPenh", "Dauphin", "David", "DB LCD Temp", "DELICIOUS", "Denmark", "DFKai-SB", "Didot", "DilleniaUPC", "DIN", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Edwardian Script ITC", "Elephant", "English 111 Vivace BT", "Engravers MT", "EngraversGothic BT", "Eras Bold ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC", "EucrosiaUPC", "Euphemia", "Euphemia UCAS", "EUROSTILE", "Exotc350 Bd BT", "FangSong", "Felix Titling", "Fixedsys", "FONTIN", "Footlight MT Light", "Forte", "FrankRuehl", "Fransiscan", "Freefrm721 Blk BT", "FreesiaUPC", "Freestyle Script", "French Script MT", "FrnkGothITC Bk BT", "Fruitger", "FRUTIGER", "Futura", "Futura Bk BT", "Futura Lt BT", "Futura Md BT", "Futura ZBlk BT", "FuturaBlack BT", "Gabriola", "Galliard BT", "Gautami", "Geeza Pro", "Geometr231 BT", "Geometr231 Hv BT", "Geometr231 Lt BT", "GeoSlab 703 Lt BT", "GeoSlab 703 XBd BT", "Gigi", "Gill Sans", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Gisha", "Gloucester MT Extra Condensed", "GOTHAM", "GOTHAM BOLD", "Goudy Old Style", "Goudy Stout", "GoudyHandtooled BT", "GoudyOLSt BT", "Gujarati Sangam MN", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Gurmukhi MN", "Haettenschweiler", "Harlow Solid Italic", "Harrington", "Heather", "Heiti SC", "Heiti TC", "HELV", "Herald", "High Tower Text", "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Hoefler Text", "Humanst 521 Cn BT", "Humanst521 BT", "Humanst521 Lt BT", "Imprint MT Shadow", "Incised901 Bd BT", "Incised901 BT", "Incised901 Lt BT", "INCONSOLATA", "Informal Roman", "Informal011 BT", "INTERSTATE", "IrisUPC", "Iskoola Pota", "JasmineUPC", "Jazz LET", "Jenson", "Jester", "Jokerman", "Juice ITC", "Kabel Bk BT", "Kabel Ult BT", "Kailasa", "KaiTi", "Kalinga", "Kannada Sangam MN", "Kartika", "Kaufmann Bd BT", "Kaufmann BT", "Khmer UI", "KodchiangUPC", "Kokila", "Korinna BT", "Kristen ITC", "Krungthep", "Kunstler Script", "Lao UI", "Latha", "Leelawadee", "Letter Gothic", "Levenim MT", "LilyUPC", "Lithograph", "Lithograph Light", "Long Island", "Lydian BT", "Magneto", "Maiandra GD", "Malayalam Sangam MN", "Malgun Gothic", "Mangal", "Marigold", "Marion", "Marker Felt", "Market", "Marlett", "Matisse ITC", "Matura MT Script Capitals", "Meiryo", "Meiryo UI", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Minion", "Minion Pro", "Miriam", "Miriam Fixed", "Mistral", "Modern", "Modern No. 20", "Mona Lisa Solid ITC TT", "Mongolian Baiti", "MONO", "MoolBoran", "Mrs Eaves", "MS LineDraw", "MS Mincho", "MS PMincho", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MUSEO", "MV Boli", "Nadeem", "Narkisim", "NEVIS", "News Gothic", "News GothicMT", "NewsGoth BT", "Niagara Engraved", "Niagara Solid", "Noteworthy", "NSimSun", "Nyala", "OCR A Extended", "Old Century", "Old English Text MT", "Onyx", "Onyx BT", "OPTIMA", "Oriya Sangam MN", "OSAKA", "OzHandicraft BT", "Palace Script MT", "Papyrus", "Parchment", "Party LET", "Pegasus", "Perpetua", "Perpetua Titling MT", "PetitaBold", "Pickwick", "Plantagenet Cherokee", "Playbill", "PMingLiU", "PMingLiU-ExtB", "Poor Richard", "Poster", "PosterBodoni BT", "PRINCETOWN LET", "Pristina", "PTBarnum BT", "Pythagoras", "Raavi", "Rage Italic", "Ravie", "Ribbon131 Bd BT", "Rockwell", "Rockwell Condensed", "Rockwell Extra Bold", "Rod", "Roman", "Sakkal Majalla", "Santa Fe LET", "Savoye LET", "Sceptre", "Script", "Script MT Bold", "SCRIPTINA", "Serifa", "Serifa BT", "Serifa Th BT", "ShelleyVolante BT", "Sherwood", "Shonar Bangla", "Showcard Gothic", "Shruti", "Signboard", "SILKSCREEN", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "Sinhala Sangam MN", "Sketch Rockwell", "Skia", "Small Fonts", "Snap ITC", "Snell Roundhand", "Socket", "Souvenir Lt BT", "Staccato222 BT", "Steamer", "Stencil", "Storybook", "Styllo", "Subway", "Swis721 BlkEx BT", "Swiss911 XCm BT", "Sylfaen", "Synchro LET", "System", "Tamil Sangam MN", "Technical", "Teletype", "Telugu Sangam MN", "Tempus Sans ITC", "Terminal", "Thonburi", "Traditional Arabic", "Trajan", "TRAJAN PRO", "Tristan", "Tubular", "Tunga", "Tw Cen MT", "Tw Cen MT Condensed", "Tw Cen MT Condensed Extra Bold", "TypoUpright BT", "Unicorn", "Univers", "Univers CE 55 Medium", "Univers Condensed", "Utsaah", "Vagabond", "Vani", "Vijaya", "Viner Hand ITC", "VisualUI", "Vivaldi", "Vladimir Script", "Vrinda", "Westminster", "WHITNEY", "Wide Latin", "ZapfEllipt BT", "ZapfHumnst BT", "ZapfHumnst Dm BT", "Zapfino", "Zurich BlkEx BT", "Zurich Ex BT", "ZWAdobeF"])),
                        i = (i = i.concat(n.options.userDefinedFonts)).filter(function (e, t) {
                            return i.indexOf(e) === t
                        });
                    var o = document.getElementsByTagName("body")[0], a = document.createElement("div"),
                        s = document.createElement("div"), c = {}, u = {}, l = function () {
                            var e = document.createElement("span");
                            return e.style.position = "absolute", e.style.left = "-9999px", e.style.fontSize = "72px", e.style.fontStyle = "normal", e.style.fontWeight = "normal", e.style.letterSpacing = "normal", e.style.lineBreak = "auto", e.style.lineHeight = "normal", e.style.textTransform = "none", e.style.textAlign = "left", e.style.textDecoration = "none", e.style.textShadow = "none", e.style.whiteSpace = "normal", e.style.wordBreak = "normal", e.style.wordSpacing = "normal", e.innerHTML = "mmmmmmmmmmlli", e
                        }, d = function (e) {
                            for (var t = !1, n = 0; n < r.length; n++) if (t = e[n].offsetWidth !== c[r[n]] || e[n].offsetHeight !== u[r[n]]) return t;
                            return t
                        }, p = function () {
                            for (var e = [], t = 0, n = r.length; t < n; t++) {
                                var i = l();
                                i.style.fontFamily = r[t], a.appendChild(i), e.push(i)
                            }
                            return e
                        }();
                    o.appendChild(a);
                    for (var f = 0, h = r.length; f < h; f++) c[r[f]] = p[f].offsetWidth, u[r[f]] = p[f].offsetHeight;
                    var g = function () {
                        for (var e, t, n, o = {}, a = 0, c = i.length; a < c; a++) {
                            for (var u = [], d = 0, p = r.length; d < p; d++) {
                                var f = (e = i[a], t = r[d], n = void 0, (n = l()).style.fontFamily = "'" + e + "'," + t, n);
                                s.appendChild(f), u.push(f)
                            }
                            o[i[a]] = u
                        }
                        return o
                    }();
                    o.appendChild(s);
                    for (var m = [], y = 0, v = i.length; y < v; y++) d(g[i[y]]) && m.push(i[y]);
                    o.removeChild(s), o.removeChild(a), e.addPreprocessedComponent({key: "js_fonts", value: m}), t(e)
                }, 1)
            }, pluginsKey: function (e) {
                return this.options.excludePlugins || (this.isIE() ? this.options.excludeIEPlugins || e.addPreprocessedComponent({
                    key: "ie_plugins",
                    value: this.getIEPlugins()
                }) : e.addPreprocessedComponent({key: "regular_plugins", value: this.getRegularPlugins()})), e
            }, getRegularPlugins: function () {
                var e = [];
                if (navigator.plugins) for (var t = 0, n = navigator.plugins.length; t < n; t++) navigator.plugins[t] && e.push(navigator.plugins[t]);
                return this.pluginsShouldBeSorted() && (e = e.sort(function (e, t) {
                    return e.name > t.name ? 1 : e.name < t.name ? -1 : 0
                })), this.map(e, function (e) {
                    var t = this.map(e, function (e) {
                        return [e.type, e.suffixes].join("~")
                    }).join(",");
                    return [e.name, e.description, t].join("::")
                }, this)
            }, getIEPlugins: function () {
                var e = [];
                return (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject") || "ActiveXObject" in window) && (e = this.map(["AcroPDF.PDF", "Adodb.Stream", "AgControl.AgControl", "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", "QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "Scripting.Dictionary", "SWCtl.SWCtl", "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", "Skype.Detection", "TDCCtl.TDCCtl", "WMPlayer.OCX", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1"], function (e) {
                    try {
                        return new window.ActiveXObject(e), e
                    } catch (e) {
                        return null
                    }
                })), navigator.plugins && (e = e.concat(this.getRegularPlugins())), e
            }, pluginsShouldBeSorted: function () {
                for (var e = !1, t = 0, n = this.options.sortPluginsFor.length; t < n; t++) {
                    var r = this.options.sortPluginsFor[t];
                    if (navigator.userAgent.match(r)) {
                        e = !0;
                        break
                    }
                }
                return e
            }, touchSupportKey: function (e) {
                return this.options.excludeTouchSupport || e.addPreprocessedComponent({
                    key: "touch_support",
                    value: this.getTouchSupport()
                }), e
            }, hardwareConcurrencyKey: function (e) {
                return this.options.excludeHardwareConcurrency || e.addPreprocessedComponent({
                    key: "hardware_concurrency",
                    value: this.getHardwareConcurrency()
                }), e
            }, hasSessionStorage: function () {
                try {
                    return !!window.sessionStorage
                } catch (e) {
                    return !0
                }
            }, hasLocalStorage: function () {
                try {
                    return !!window.localStorage
                } catch (e) {
                    return !0
                }
            }, hasIndexedDB: function () {
                try {
                    return !!window.indexedDB
                } catch (e) {
                    return !0
                }
            }, getHardwareConcurrency: function () {
                return navigator.hardwareConcurrency ? navigator.hardwareConcurrency : "unknown"
            }, getNavigatorCpuClass: function () {
                return navigator.cpuClass ? navigator.cpuClass : "unknown"
            }, getNavigatorPlatform: function () {
                return navigator.platform ? navigator.platform : "unknown"
            }, getDoNotTrack: function () {
                return navigator.doNotTrack ? navigator.doNotTrack : navigator.msDoNotTrack ? navigator.msDoNotTrack : window.doNotTrack ? window.doNotTrack : "unknown"
            }, getTouchSupport: function () {
                var e = 0, t = !1;
                void 0 !== navigator.maxTouchPoints ? e = navigator.maxTouchPoints : void 0 !== navigator.msMaxTouchPoints && (e = navigator.msMaxTouchPoints);
                try {
                    document.createEvent("TouchEvent"), t = !0
                } catch (e) {
                }
                return [e, t, "ontouchstart" in window]
            }, getCanvasFp: function () {
                var e = [], t = document.createElement("canvas");
                t.width = 2e3, t.height = 200, t.style.display = "inline";
                var n = t.getContext("2d");
                return n.rect(0, 0, 10, 10), n.rect(2, 2, 6, 6), e.push("canvas winding:" + (!1 === n.isPointInPath(5, 5, "evenodd") ? "yes" : "no")), n.textBaseline = "alphabetic", n.fillStyle = "#f60", n.fillRect(125, 1, 62, 20), n.fillStyle = "#069", this.options.dontUseFakeFontInCanvas ? n.font = "11pt Arial" : n.font = "11pt no-real-font-123", n.fillText("Cwm fjordbank glyphs vext quiz, 😃", 2, 15), n.fillStyle = "rgba(102, 204, 0, 0.2)", n.font = "18pt Arial", n.fillText("Cwm fjordbank glyphs vext quiz, 😃", 4, 45), n.globalCompositeOperation = "multiply", n.fillStyle = "rgb(255,0,255)", n.beginPath(), n.arc(50, 50, 50, 0, 2 * Math.PI, !0), n.closePath(), n.fill(), n.fillStyle = "rgb(0,255,255)", n.beginPath(), n.arc(100, 50, 50, 0, 2 * Math.PI, !0), n.closePath(), n.fill(), n.fillStyle = "rgb(255,255,0)", n.beginPath(), n.arc(75, 100, 50, 0, 2 * Math.PI, !0), n.closePath(), n.fill(), n.fillStyle = "rgb(255,0,255)", n.arc(75, 75, 75, 0, 2 * Math.PI, !0), n.arc(75, 75, 25, 0, 2 * Math.PI, !0), n.fill("evenodd"), t.toDataURL && e.push("canvas fp:" + t.toDataURL()), e.join("~")
            }, getWebglFp: function () {
                var e, t = function (t) {
                    return e.clearColor(0, 0, 0, 1), e.enable(e.DEPTH_TEST), e.depthFunc(e.LEQUAL), e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT), "[" + t[0] + ", " + t[1] + "]"
                };
                if (!(e = this.getWebglCanvas())) return null;
                var n = [], r = e.createBuffer();
                e.bindBuffer(e.ARRAY_BUFFER, r);
                var i = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
                e.bufferData(e.ARRAY_BUFFER, i, e.STATIC_DRAW), r.itemSize = 3, r.numItems = 3;
                var o = e.createProgram(), a = e.createShader(e.VERTEX_SHADER);
                e.shaderSource(a, "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"), e.compileShader(a);
                var s = e.createShader(e.FRAGMENT_SHADER);
                e.shaderSource(s, "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"), e.compileShader(s), e.attachShader(o, a), e.attachShader(o, s), e.linkProgram(o), e.useProgram(o), o.vertexPosAttrib = e.getAttribLocation(o, "attrVertex"), o.offsetUniform = e.getUniformLocation(o, "uniformOffset"), e.enableVertexAttribArray(o.vertexPosArray), e.vertexAttribPointer(o.vertexPosAttrib, r.itemSize, e.FLOAT, !1, 0, 0), e.uniform2f(o.offsetUniform, 1, 1), e.drawArrays(e.TRIANGLE_STRIP, 0, r.numItems);
                try {
                    n.push(e.canvas.toDataURL())
                } catch (e) {
                }
                n.push("extensions:" + (e.getSupportedExtensions() || []).join(";")), n.push("webgl aliased line width range:" + t(e.getParameter(e.ALIASED_LINE_WIDTH_RANGE))), n.push("webgl aliased point size range:" + t(e.getParameter(e.ALIASED_POINT_SIZE_RANGE))), n.push("webgl alpha bits:" + e.getParameter(e.ALPHA_BITS)), n.push("webgl antialiasing:" + (e.getContextAttributes().antialias ? "yes" : "no")), n.push("webgl blue bits:" + e.getParameter(e.BLUE_BITS)), n.push("webgl depth bits:" + e.getParameter(e.DEPTH_BITS)), n.push("webgl green bits:" + e.getParameter(e.GREEN_BITS)), n.push("webgl max anisotropy:" + function (e) {
                    var t = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic");
                    if (t) {
                        var n = e.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
                        return 0 === n && (n = 2), n
                    }
                    return null
                }(e)), n.push("webgl max combined texture image units:" + e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS)), n.push("webgl max cube map texture size:" + e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE)), n.push("webgl max fragment uniform vectors:" + e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS)), n.push("webgl max render buffer size:" + e.getParameter(e.MAX_RENDERBUFFER_SIZE)), n.push("webgl max texture image units:" + e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS)), n.push("webgl max texture size:" + e.getParameter(e.MAX_TEXTURE_SIZE)), n.push("webgl max varying vectors:" + e.getParameter(e.MAX_VARYING_VECTORS)), n.push("webgl max vertex attribs:" + e.getParameter(e.MAX_VERTEX_ATTRIBS)), n.push("webgl max vertex texture image units:" + e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)), n.push("webgl max vertex uniform vectors:" + e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS)), n.push("webgl max viewport dims:" + t(e.getParameter(e.MAX_VIEWPORT_DIMS))), n.push("webgl red bits:" + e.getParameter(e.RED_BITS)), n.push("webgl renderer:" + e.getParameter(e.RENDERER)), n.push("webgl shading language version:" + e.getParameter(e.SHADING_LANGUAGE_VERSION)), n.push("webgl stencil bits:" + e.getParameter(e.STENCIL_BITS)), n.push("webgl vendor:" + e.getParameter(e.VENDOR)), n.push("webgl version:" + e.getParameter(e.VERSION));
                try {
                    var c = e.getExtension("WEBGL_debug_renderer_info");
                    c && (n.push("webgl unmasked vendor:" + e.getParameter(c.UNMASKED_VENDOR_WEBGL)), n.push("webgl unmasked renderer:" + e.getParameter(c.UNMASKED_RENDERER_WEBGL)))
                } catch (e) {
                }
                return e.getShaderPrecisionFormat ? (n.push("webgl vertex shader high float precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision), n.push("webgl vertex shader high float precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).rangeMin), n.push("webgl vertex shader high float precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).rangeMax), n.push("webgl vertex shader medium float precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision), n.push("webgl vertex shader medium float precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).rangeMin), n.push("webgl vertex shader medium float precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).rangeMax), n.push("webgl vertex shader low float precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT).precision), n.push("webgl vertex shader low float precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT).rangeMin), n.push("webgl vertex shader low float precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT).rangeMax), n.push("webgl fragment shader high float precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision), n.push("webgl fragment shader high float precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).rangeMin), n.push("webgl fragment shader high float precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).rangeMax), n.push("webgl fragment shader medium float precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision), n.push("webgl fragment shader medium float precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).rangeMin), n.push("webgl fragment shader medium float precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).rangeMax), n.push("webgl fragment shader low float precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT).precision), n.push("webgl fragment shader low float precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT).rangeMin), n.push("webgl fragment shader low float precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT).rangeMax), n.push("webgl vertex shader high int precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT).precision), n.push("webgl vertex shader high int precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT).rangeMin), n.push("webgl vertex shader high int precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT).rangeMax), n.push("webgl vertex shader medium int precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT).precision), n.push("webgl vertex shader medium int precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT).rangeMin), n.push("webgl vertex shader medium int precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT).rangeMax), n.push("webgl vertex shader low int precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT).precision), n.push("webgl vertex shader low int precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT).rangeMin), n.push("webgl vertex shader low int precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT).rangeMax), n.push("webgl fragment shader high int precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT).precision), n.push("webgl fragment shader high int precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT).rangeMin), n.push("webgl fragment shader high int precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT).rangeMax), n.push("webgl fragment shader medium int precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_INT).precision), n.push("webgl fragment shader medium int precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_INT).rangeMin), n.push("webgl fragment shader medium int precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_INT).rangeMax), n.push("webgl fragment shader low int precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT).precision), n.push("webgl fragment shader low int precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT).rangeMin), n.push("webgl fragment shader low int precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT).rangeMax), n.join("~")) : n.join("~")
            }, getWebglVendorAndRenderer: function () {
                try {
                    var e = this.getWebglCanvas(), t = e.getExtension("WEBGL_debug_renderer_info");
                    return e.getParameter(t.UNMASKED_VENDOR_WEBGL) + "~" + e.getParameter(t.UNMASKED_RENDERER_WEBGL)
                } catch (e) {
                    return null
                }
            }, getAdBlock: function () {
                var e = document.createElement("div");
                e.innerHTML = "&nbsp;", e.className = "adsbox";
                var t = !1;
                try {
                    document.body.appendChild(e), t = 0 === document.getElementsByClassName("adsbox")[0].offsetHeight, document.body.removeChild(e)
                } catch (e) {
                    t = !1
                }
                return t
            }, getHasLiedLanguages: function () {
                if (void 0 !== navigator.languages) try {
                    if (navigator.languages[0].substr(0, 2) !== navigator.language.substr(0, 2)) return !0
                } catch (e) {
                    return !0
                }
                return !1
            }, getHasLiedResolution: function () {
                return window.screen.width < window.screen.availWidth || window.screen.height < window.screen.availHeight
            }, getHasLiedOs: function () {
                var e, t = navigator.userAgent.toLowerCase(), n = navigator.oscpu, r = navigator.platform.toLowerCase();
                if (e = t.indexOf("windows phone") >= 0 ? "Windows Phone" : t.indexOf("win") >= 0 ? "Windows" : t.indexOf("android") >= 0 ? "Android" : t.indexOf("linux") >= 0 ? "Linux" : t.indexOf("iphone") >= 0 || t.indexOf("ipad") >= 0 ? "iOS" : t.indexOf("mac") >= 0 ? "Mac" : "Other", ("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) && "Windows Phone" !== e && "Android" !== e && "iOS" !== e && "Other" !== e) return !0;
                if (void 0 !== n) {
                    if ((n = n.toLowerCase()).indexOf("win") >= 0 && "Windows" !== e && "Windows Phone" !== e) return !0;
                    if (n.indexOf("linux") >= 0 && "Linux" !== e && "Android" !== e) return !0;
                    if (n.indexOf("mac") >= 0 && "Mac" !== e && "iOS" !== e) return !0;
                    if ((-1 === n.indexOf("win") && -1 === n.indexOf("linux") && -1 === n.indexOf("mac")) != ("Other" === e)) return !0
                }
                return r.indexOf("win") >= 0 && "Windows" !== e && "Windows Phone" !== e || (r.indexOf("linux") >= 0 || r.indexOf("android") >= 0 || r.indexOf("pike") >= 0) && "Linux" !== e && "Android" !== e || (r.indexOf("mac") >= 0 || r.indexOf("ipad") >= 0 || r.indexOf("ipod") >= 0 || r.indexOf("iphone") >= 0) && "Mac" !== e && "iOS" !== e || (-1 === r.indexOf("win") && -1 === r.indexOf("linux") && -1 === r.indexOf("mac")) != ("Other" === e) || void 0 === navigator.plugins && "Windows" !== e && "Windows Phone" !== e
            }, getHasLiedBrowser: function () {
                var e, t = navigator.userAgent.toLowerCase(), n = navigator.productSub;
                if (("Chrome" == (e = t.indexOf("firefox") >= 0 ? "Firefox" : t.indexOf("opera") >= 0 || t.indexOf("opr") >= 0 ? "Opera" : t.indexOf("chrome") >= 0 ? "Chrome" : t.indexOf("safari") >= 0 ? "Safari" : t.indexOf("trident") >= 0 ? "Internet Explorer" : "Other") || "Safari" === e || "Opera" === e) && "20030107" !== n) return !0;
                var r, i = eval.toString().length;
                if (37 === i && "Safari" !== e && "Firefox" !== e && "Other" !== e) return !0;
                if (39 === i && "Internet Explorer" !== e && "Other" !== e) return !0;
                if (33 === i && "Chrome" !== e && "Opera" !== e && "Other" !== e) return !0;
                try {
                    throw"a"
                } catch (e) {
                    try {
                        e.toSource(), r = !0
                    } catch (e) {
                        r = !1
                    }
                }
                return !(!r || "Firefox" === e || "Other" === e)
            }, isCanvasSupported: function () {
                var e = document.createElement("canvas");
                return !(!e.getContext || !e.getContext("2d"))
            }, isWebGlSupported: function () {
                if (!this.isCanvasSupported()) return !1;
                var e = this.getWebglCanvas();
                return !!window.WebGLRenderingContext && !!e
            }, isIE: function () {
                return "Microsoft Internet Explorer" === navigator.appName || !("Netscape" !== navigator.appName || !/Trident/.test(navigator.userAgent))
            }, hasSwfObjectLoaded: function () {
                return void 0 !== window.swfobject
            }, hasMinFlashInstalled: function () {
                return window.swfobject.hasFlashPlayerVersion("9.0.0")
            }, addFlashDivNode: function () {
                var e = document.createElement("div");
                e.setAttribute("id", this.options.swfContainerId), document.body.appendChild(e)
            }, loadSwfAndDetectFonts: function (e) {
                var t = "___fp_swf_loaded";
                window[t] = function (t) {
                    e(t)
                };
                var n = this.options.swfContainerId;
                this.addFlashDivNode();
                var r = {onReady: t};
                window.swfobject.embedSWF(this.options.swfPath, n, "1", "1", "9.0.0", !1, r, {
                    allowScriptAccess: "always",
                    menu: "false"
                }, {})
            }, getWebglCanvas: function () {
                var e = document.createElement("canvas"), t = null;
                try {
                    t = e.getContext("webgl") || e.getContext("experimental-webgl")
                } catch (e) {
                }
                return t || (t = null), t
            }, each: function (e, t, n) {
                if (null !== e) if (this.nativeForEach && e.forEach === this.nativeForEach) e.forEach(t, n); else if (e.length === +e.length) {
                    for (var r = 0, i = e.length; r < i; r++) if (t.call(n, e[r], r, e) === {}) return
                } else for (var o in e) if (e.hasOwnProperty(o) && t.call(n, e[o], o, e) === {}) return
            }, map: function (e, t, n) {
                var r = [];
                return null == e ? r : this.nativeMap && e.map === this.nativeMap ? e.map(t, n) : (this.each(e, function (e, i, o) {
                    r[r.length] = t.call(n, e, i, o)
                }), r)
            }, x64Add: function (e, t) {
                e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
                var n = [0, 0, 0, 0];
                return n[3] += e[3] + t[3], n[2] += n[3] >>> 16, n[3] &= 65535, n[2] += e[2] + t[2], n[1] += n[2] >>> 16, n[2] &= 65535, n[1] += e[1] + t[1], n[0] += n[1] >>> 16, n[1] &= 65535, n[0] += e[0] + t[0], n[0] &= 65535, [n[0] << 16 | n[1], n[2] << 16 | n[3]]
            }, x64Multiply: function (e, t) {
                e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
                var n = [0, 0, 0, 0];
                return n[3] += e[3] * t[3], n[2] += n[3] >>> 16, n[3] &= 65535, n[2] += e[2] * t[3], n[1] += n[2] >>> 16, n[2] &= 65535, n[2] += e[3] * t[2], n[1] += n[2] >>> 16, n[2] &= 65535, n[1] += e[1] * t[3], n[0] += n[1] >>> 16, n[1] &= 65535, n[1] += e[2] * t[2], n[0] += n[1] >>> 16, n[1] &= 65535, n[1] += e[3] * t[1], n[0] += n[1] >>> 16, n[1] &= 65535, n[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0], n[0] &= 65535, [n[0] << 16 | n[1], n[2] << 16 | n[3]]
            }, x64Rotl: function (e, t) {
                return 32 === (t %= 64) ? [e[1], e[0]] : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t | e[0] >>> 32 - t] : (t -= 32, [e[1] << t | e[0] >>> 32 - t, e[0] << t | e[1] >>> 32 - t])
            }, x64LeftShift: function (e, t) {
                return 0 === (t %= 64) ? e : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t] : [e[1] << t - 32, 0]
            }, x64Xor: function (e, t) {
                return [e[0] ^ t[0], e[1] ^ t[1]]
            }, x64Fmix: function (e) {
                return e = this.x64Xor(e, [0, e[0] >>> 1]), e = this.x64Multiply(e, [4283543511, 3981806797]), e = this.x64Xor(e, [0, e[0] >>> 1]), e = this.x64Multiply(e, [3301882366, 444984403]), e = this.x64Xor(e, [0, e[0] >>> 1])
            }, x64hash128: function (e, t) {
                e = e || "", t = t || 0;
                for (var n = e.length % 16, r = e.length - n, i = [0, t], o = [0, t], a = [0, 0], s = [0, 0], c = [2277735313, 289559509], u = [1291169091, 658871167], l = 0; l < r; l += 16) a = [255 & e.charCodeAt(l + 4) | (255 & e.charCodeAt(l + 5)) << 8 | (255 & e.charCodeAt(l + 6)) << 16 | (255 & e.charCodeAt(l + 7)) << 24, 255 & e.charCodeAt(l) | (255 & e.charCodeAt(l + 1)) << 8 | (255 & e.charCodeAt(l + 2)) << 16 | (255 & e.charCodeAt(l + 3)) << 24], s = [255 & e.charCodeAt(l + 12) | (255 & e.charCodeAt(l + 13)) << 8 | (255 & e.charCodeAt(l + 14)) << 16 | (255 & e.charCodeAt(l + 15)) << 24, 255 & e.charCodeAt(l + 8) | (255 & e.charCodeAt(l + 9)) << 8 | (255 & e.charCodeAt(l + 10)) << 16 | (255 & e.charCodeAt(l + 11)) << 24], a = this.x64Multiply(a, c), a = this.x64Rotl(a, 31), a = this.x64Multiply(a, u), i = this.x64Xor(i, a), i = this.x64Rotl(i, 27), i = this.x64Add(i, o), i = this.x64Add(this.x64Multiply(i, [0, 5]), [0, 1390208809]), s = this.x64Multiply(s, u), s = this.x64Rotl(s, 33), s = this.x64Multiply(s, c), o = this.x64Xor(o, s), o = this.x64Rotl(o, 31), o = this.x64Add(o, i), o = this.x64Add(this.x64Multiply(o, [0, 5]), [0, 944331445]);
                switch (a = [0, 0], s = [0, 0], n) {
                    case 15:
                        s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(l + 14)], 48));
                    case 14:
                        s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(l + 13)], 40));
                    case 13:
                        s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(l + 12)], 32));
                    case 12:
                        s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(l + 11)], 24));
                    case 11:
                        s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(l + 10)], 16));
                    case 10:
                        s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(l + 9)], 8));
                    case 9:
                        s = this.x64Xor(s, [0, e.charCodeAt(l + 8)]), s = this.x64Multiply(s, u), s = this.x64Rotl(s, 33), s = this.x64Multiply(s, c), o = this.x64Xor(o, s);
                    case 8:
                        a = this.x64Xor(a, this.x64LeftShift([0, e.charCodeAt(l + 7)], 56));
                    case 7:
                        a = this.x64Xor(a, this.x64LeftShift([0, e.charCodeAt(l + 6)], 48));
                    case 6:
                        a = this.x64Xor(a, this.x64LeftShift([0, e.charCodeAt(l + 5)], 40));
                    case 5:
                        a = this.x64Xor(a, this.x64LeftShift([0, e.charCodeAt(l + 4)], 32));
                    case 4:
                        a = this.x64Xor(a, this.x64LeftShift([0, e.charCodeAt(l + 3)], 24));
                    case 3:
                        a = this.x64Xor(a, this.x64LeftShift([0, e.charCodeAt(l + 2)], 16));
                    case 2:
                        a = this.x64Xor(a, this.x64LeftShift([0, e.charCodeAt(l + 1)], 8));
                    case 1:
                        a = this.x64Xor(a, [0, e.charCodeAt(l)]), a = this.x64Multiply(a, c), a = this.x64Rotl(a, 31), a = this.x64Multiply(a, u), i = this.x64Xor(i, a)
                }
                return i = this.x64Xor(i, [0, e.length]), o = this.x64Xor(o, [0, e.length]), i = this.x64Add(i, o), o = this.x64Add(o, i), i = this.x64Fmix(i), o = this.x64Fmix(o), i = this.x64Add(i, o), o = this.x64Add(o, i), ("00000000" + (i[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (i[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (o[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (o[1] >>> 0).toString(16)).slice(-8)
            }
        }, e.VERSION = "1.8.0", e
    })
}, function (e, exports, t) {
    var n = t(10);
    "string" == typeof n && (n = [[e.id, n, ""]]);
    t(12)(n, {});
    n.locals && (e.exports = n.locals)
}, function (e, exports, t) {
    exports = e.exports = t(11)(), exports.push([e.id, '[contenteditable=true]:active,[contenteditable=true]:focus{outline:thin solid #00b977;background-color:rgba(0,185,119,.05)}.cyxy-target-popup{padding:1.3rem 12px;position:absolute;display:inline-flex;flex-direction:row;overflow:scroll;vertical-align:middle;z-index:199099;top:1px;left:1px;background:#fff;opacity:.98;height:auto;width:auto;border:1px solid #e6e6e6;box-shadow:0 0 8px 0 rgba(0,0,0,.13);border-radius:5px}@media (max-width:468px){.cyxy-target-popup{left:10%}}#cyxy-popup-left-slide{margin-right:14px}#cyxy-popup-left-slide,#cyxy-popup-right-slide{height:22px;display:inline;vertical-align:middle;cursor:pointer}#cyxy-popup-right-slide{margin-left:0}#cyxy-popup-userinfo{display:inline}.cyxy-target-count{display:inline;vertical-align:middle;font-size:10px}#cyxy-popup-avatar{display:inline;height:32px;vertical-align:middle;border-radius:16px}#cyxy-popup-name-time{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:left;margin-left:6px}#cyxy-popup-name{font-size:14px;color:#333;height:18px;overflow:hidden;max-width:84px}#cyxy-popup-time{font-size:12px;margin-top:4px;color:#999}.cyxy-footer{display:none;position:fixed;bottom:0;padding:0;left:0;right:0;margin:auto;opacity:.9;border:1px solid #e6e6e6;box-shadow:0 0 8px 0 rgba(0,0,0,.13);border-radius:2px;z-index:201712;text-align:center}.cyxy-footer-p{padding:12px 0;margin:0;font-size:12px;color:#333;background:#fff;text-align:center;line-height:1.6;font-weight:200}#cyxy-popup-favour{text-align:center;display:inline;margin-right:20px;margin-left:46px;cursor:pointer}#cyxy-popup-oppose{text-align:center;display:inline;cursor:pointer}#cyxy-popup-favour-img{display:inline;height:20px;vertical-align:middle}#cyxy-popup-oppose-img{display:inline;height:18px;vertical-align:middle}#cyxy-popup-favour-num,#cyxy-popup-oppose-num{font-size:14px;margin-left:4px;color:#999}@media (max-width:320px){#cyxy-popup-favour{margin-right:.8rem;margin-left:1.5rem}#cyxy-popup-left-slide{margin-right:.8rem}#cyxy-popup-right-slide{margin-left:1rem}}.layui-m-layer{position:relative;z-index:19891014}.layui-m-layer *{box-sizing:content-box}.layui-m-layermain,.layui-m-layershade{position:fixed;left:0;top:0;width:100%;height:100%}.layui-m-layershade{background-color:rgba(0,0,0,.7);pointer-events:auto}.layui-m-layermain{display:table;font-family:Helvetica,arial,sans-serif;pointer-events:none}.layui-m-layermain .layui-m-layersection{display:table-cell;vertical-align:middle;text-align:center}.layui-m-layerchild{position:relative;display:inline-block;text-align:left;background-color:#fff;font-size:14px;border-radius:5px;box-shadow:0 0 8px rgba(0,0,0,.1);pointer-events:auto;-webkit-overflow-scrolling:touch;animation-fill-mode:both;animation-duration:.2s}@keyframes layui-m-anim-scale{0%{opacity:0;transform:scale(.5)}to{opacity:1;transform:scale(1)}}.layui-m-anim-scale{animation-name:layui-m-anim-scale;-webkit-animation-name:layui-m-anim-scale}@keyframes layui-m-anim-up{0%{opacity:0;transform:translateY(800px)}to{opacity:1;transform:translateY(0)}}.layui-m-anim-up{animation-name:layui-m-anim-up}.layui-m-layer0 .layui-m-layerchild{width:90%;max-width:640px}.layui-m-layer1 .layui-m-layerchild{border:none;border-radius:0}.layui-m-layer2 .layui-m-layerchild{width:auto;max-width:260px;min-width:40px;border:none;background:0 0;box-shadow:none;color:#fff}.layui-m-layerchild h3{padding:0 10px;height:60px;line-height:60px;font-size:16px;font-weight:400;border-radius:5px 5px 0 0;text-align:center}.layui-m-layerbtn span,.layui-m-layerchild h3{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.layui-m-layercont{padding:50px 30px;line-height:22px;text-align:center}.layui-m-layer1 .layui-m-layercont{padding:0;text-align:left}.layui-m-layer2 .layui-m-layercont{text-align:center;padding:0;line-height:0}.layui-m-layer2 .layui-m-layercont i{width:25px;height:25px;margin-left:8px;display:inline-block;background-color:#fff;border-radius:100%;animation:layui-m-anim-loading 1.4s infinite ease-in-out;animation-fill-mode:both}.layui-m-layerbtn,.layui-m-layerbtn span{position:relative;text-align:center;border-radius:0 0 5px 5px}.layui-m-layer2 .layui-m-layercont p{margin-top:20px}@keyframes layui-m-anim-loading{0%,80%,to{transform:scale(0);-webkit-transform:scale(0)}40%{transform:scale(1);-webkit-transform:scale(1)}}.layui-m-layer2 .layui-m-layercont i:first-child{margin-left:0;animation-delay:-.32s}.layui-m-layer2 .layui-m-layercont i.layui-m-layerload{animation-delay:-.16s}.layui-m-layer2 .layui-m-layercont>div{line-height:22px;padding-top:7px;margin-bottom:20px;font-size:14px}.layui-m-layerbtn{display:box;display:-moz-box;display:-webkit-box;width:100%;height:50px;line-height:50px;font-size:0;border-top:1px solid #d0d0d0;background-color:#f2f2f2}.layui-m-layerbtn span{display:block;box-flex:1;-webkit-box-flex:1;font-size:14px;cursor:pointer}.layui-m-layerbtn span[yes]{color:#40affe}.layui-m-layerbtn span[no]{border-right:1px solid #d0d0d0;border-radius:0 0 0 5px}.layui-m-layerbtn span:active{background-color:#f6f6f6}.layui-m-layerend{position:absolute;right:7px;top:10px;width:30px;height:30px;border:0;font-weight:400;background:0 0;cursor:pointer;-webkit-appearance:none;font-size:30px}.layui-m-layerend:after,.layui-m-layerend:before{position:absolute;left:5px;top:15px;content:"";width:18px;height:1px;background-color:#999;transform:rotate(45deg);-webkit-transform:rotate(45deg);border-radius:3px}.layui-m-layerend:after{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}body .layui-m-layer .layui-m-layer-footer{position:fixed;width:95%;max-width:100%;margin:0 auto;left:0;right:0;bottom:10px;background:0 0}.layui-m-layer-footer .layui-m-layercont{padding:20px;border-radius:5px 5px 0 0;background-color:hsla(0,0%,100%,.8)}.layui-m-layer-footer .layui-m-layerbtn{display:block;height:auto;background:0 0;border-top:none}.layui-m-layer-footer .layui-m-layerbtn span{background-color:hsla(0,0%,100%,.8)}.layui-m-layer-footer .layui-m-layerbtn span[no]{color:#fd482c;border-top:1px solid #c2c2c2;border-radius:0 0 5px 5px}.layui-m-layer-footer .layui-m-layerbtn span[yes]{margin-top:10px;border-radius:5px}body .layui-m-layer .layui-m-layer-msg{width:auto;max-width:90%;margin:0 auto;bottom:-150px;background-color:rgba(0,0,0,.7);color:#fff}.layui-m-layer-msg .layui-m-layercont{padding:10px 20px}.cyxy-function{bottom:140px}.cyxy-function,.cyxy-personal{position:fixed;right:20px;z-index:109999;cursor:pointer}.cyxy-personal{bottom:190px}.cyxy-personal .cyxy-favorite-btn{border:2px solid #5ebb8d;box-sizing:border-box}.cyxy-switch{position:relative;display:inline-block;width:54px;height:28px}.cyxy-switch input{display:none}.slider{cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc}.slider,.slider:before{position:absolute;transition:.4s}.slider:before{content:"";height:20px;width:20px;left:4px;bottom:4px;background-color:#fff}input:checked+.slider{background-color:#00b976}input:focus+.slider{box-shadow:0 0 1px #00b976}input:checked+.slider:before{transform:translateX(26px)}.cyxy-favorite{position:fixed;bottom:90px;right:20px;z-index:109999;cursor:pointer}.cyxy-favorite-btn{height:36px;width:36px;border-radius:50%;overflow:hidden}.slider.round{border-radius:34px}.slider.round:before{border-radius:50%}.collection-success,.collection-success:hover{color:#fff}.layui-m-layercont .cyxy-trs-target{display:none}.collection-icon{width:12px;height:13px;background:url("//staging.caiyunapp.com/imgs/layar-target.png") no-repeat;display:inline-block;background-size:cover;background-position:50%}.collection-success>a{margin-left:12px;vertical-align:middle}.cy_free_box{position:relative}.cy_free_box img{width:100%;cursor:pointer;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none}.cy_free_button img{width:40%;margin:0 10px}.cy_free_del{position:absolute;width:6%;height:6%;right:0;top:0;cursor:pointer;z-index:10}.layui-m-layer-cy_free_content{background:inherit!important}', ""])
}, function (e, exports) {
    e.exports = function () {
        var e = [];
        return e.toString = function () {
            for (var e = [], t = 0; t < this.length; t++) {
                var n = this[t];
                n[2] ? e.push("@media " + n[2] + "{" + n[1] + "}") : e.push(n[1])
            }
            return e.join("")
        }, e.i = function (t, n) {
            "string" == typeof t && (t = [[null, t, ""]]);
            for (var r = {}, i = 0; i < this.length; i++) {
                var o = this[i][0];
                "number" == typeof o && (r[o] = !0)
            }
            for (i = 0; i < t.length; i++) {
                var a = t[i];
                "number" == typeof a[0] && r[a[0]] || (n && !a[2] ? a[2] = n : n && (a[2] = "(" + a[2] + ") and (" + n + ")"), e.push(a))
            }
        }, e
    }
}, function (e, exports, t) {
    function n(e, t) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n], i = p[r.id];
            if (i) {
                i.refs++;
                for (var o = 0; o < i.parts.length; o++) i.parts[o](r.parts[o]);
                for (; o < r.parts.length; o++) i.parts.push(c(r.parts[o], t))
            } else {
                for (var a = [], o = 0; o < r.parts.length; o++) a.push(c(r.parts[o], t));
                p[r.id] = {id: r.id, refs: 1, parts: a}
            }
        }
    }

    function r(e) {
        for (var t = [], n = {}, r = 0; r < e.length; r++) {
            var i = e[r], o = i[0], a = i[1], s = i[2], c = i[3], u = {css: a, media: s, sourceMap: c};
            n[o] ? n[o].parts.push(u) : t.push(n[o] = {id: o, parts: [u]})
        }
        return t
    }

    function i(e, t) {
        var n = g(), r = v[v.length - 1];
        if ("top" === e.insertAt) r ? r.nextSibling ? n.insertBefore(t, r.nextSibling) : n.appendChild(t) : n.insertBefore(t, n.firstChild), v.push(t); else {
            if ("bottom" !== e.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
            n.appendChild(t)
        }
    }

    function o(e) {
        e.parentNode.removeChild(e);
        var t = v.indexOf(e);
        t >= 0 && v.splice(t, 1)
    }

    function a(e) {
        var t = document.createElement("style");
        return t.type = "text/css", i(e, t), t
    }

    function s(e) {
        var t = document.createElement("link");
        return t.rel = "stylesheet", i(e, t), t
    }

    function c(e, t) {
        var n, r, i;
        if (t.singleton) {
            var c = y++;
            n = m || (m = a(t)), r = u.bind(null, n, c, !1), i = u.bind(null, n, c, !0)
        } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = s(t), r = d.bind(null, n), i = function () {
            o(n), n.href && URL.revokeObjectURL(n.href)
        }) : (n = a(t), r = l.bind(null, n),
            i = function () {
                o(n)
            });
        return r(e), function (t) {
            if (t) {
                if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                r(e = t)
            } else i()
        }
    }

    function u(e, t, n, r) {
        var i = n ? "" : r.css;
        if (e.styleSheet) e.styleSheet.cssText = x(t, i); else {
            var o = document.createTextNode(i), a = e.childNodes;
            a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(o, a[t]) : e.appendChild(o)
        }
    }

    function l(e, t) {
        var n = t.css, r = t.media;
        if (r && e.setAttribute("media", r), e.styleSheet) e.styleSheet.cssText = n; else {
            for (; e.firstChild;) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(n))
        }
    }

    function d(e, t) {
        var n = t.css, r = t.sourceMap;
        r && (n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */");
        var i = new Blob([n], {type: "text/css"}), o = e.href;
        e.href = URL.createObjectURL(i), o && URL.revokeObjectURL(o)
    }

    var p = {}, f = function (e) {
        var t;
        return function () {
            return "undefined" == typeof t && (t = e.apply(this, arguments)), t
        }
    }, h = f(function () {
        return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase())
    }), g = f(function () {
        return document.head || document.getElementsByTagName("head")[0]
    }), m = null, y = 0, v = [];
    e.exports = function (e, t) {
        t = t || {}, "undefined" == typeof t.singleton && (t.singleton = h()), "undefined" == typeof t.insertAt && (t.insertAt = "bottom");
        var i = r(e);
        return n(i, t), function (e) {
            for (var o = [], a = 0; a < i.length; a++) {
                var s = i[a], c = p[s.id];
                c.refs--, o.push(c)
            }
            if (e) {
                var u = r(e);
                n(u, t)
            }
            for (var a = 0; a < o.length; a++) {
                var c = o[a];
                if (0 === c.refs) {
                    for (var l = 0; l < c.parts.length; l++) c.parts[l]();
                    delete p[c.id]
                }
            }
        }
    };
    var x = function () {
        var e = [];
        return function (t, n) {
            return e[t] = n, e.filter(Boolean).join("\n")
        }
    }()
}, function (e, exports, t) {
    var n;
    !function (r) {
        "use strict";
        var i = document, o = "querySelectorAll", a = "getElementsByClassName", s = function (e) {
            return i[o](e)
        }, c = {type: 0, shade: !0, shadeClose: !0, fixed: !0, anim: "scale"}, u = {
            extend: function (e) {
                var t = JSON.parse(JSON.stringify(c));
                for (var n in e) t[n] = e[n];
                return t
            }, timer: {}, end: {}
        };
        u.touch = function (e, t) {
            e.addEventListener("click", function (e) {
                t.call(this, e)
            }, !1)
        };
        var l = 0, d = ["layui-m-layer"], p = function (e) {
            var t = this;
            t.config = u.extend(e), t.view()
        };
        p.prototype.view = function () {
            var e = this, t = e.config, n = i.createElement("div");
            e.id = n.id = d[0] + l, n.setAttribute("class", d[0] + " " + d[0] + (t.type || 0)), n.setAttribute("index", l);
            var r = function () {
                var e = "object" == typeof t.title;
                return t.title ? '<h3 style="' + (e ? t.title[1] : "") + '">' + (e ? t.title[0] : t.title) + "</h3>" : ""
            }(), o = function () {
                "string" == typeof t.btn && (t.btn = [t.btn]);
                var e, n = (t.btn || []).length;
                return 0 !== n && t.btn ? (e = '<span yes type="1">' + t.btn[0] + "</span>", 2 === n && (e = '<span no type="0">' + t.btn[1] + "</span>" + e), '<div class="layui-m-layerbtn">' + e + "</div>") : ""
            }();
            if (t.fixed || (t.top = t.hasOwnProperty("top") ? t.top : 100, t.style = t.style || "", t.style += " top:" + (i.body.scrollTop + t.top) + "px"), 2 === t.type && (t.content = '<i></i><i class="layui-m-layerload"></i><i></i><p>' + (t.content || "") + "</p>"), t.skin && (t.anim = "up"), "msg" === t.skin && (t.shade = !1), n.innerHTML = (t.shade ? "<div " + ("string" == typeof t.shade ? 'style="' + t.shade + '"' : "") + ' class="layui-m-layershade"></div>' : "") + '<div class="layui-m-layermain" ' + (t.fixed ? "" : 'style="position:static;"') + '><div class="layui-m-layersection"><div class="layui-m-layerchild ' + (t.skin ? "layui-m-layer-" + t.skin + " " : "") + (t.className ? t.className : "") + " " + (t.anim ? "layui-m-anim-" + t.anim : "") + '" ' + (t.style ? 'style="' + t.style + '"' : "") + ">" + r + '<div class="layui-m-layercont">' + t.content + "</div>" + o + "</div></div></div>", !t.type || 2 === t.type) {
                var c = i[a](d[0] + t.type), u = c.length;
                u >= 1 && layer.close(c[0].getAttribute("index"))
            }
            document.body.appendChild(n);
            var p = e.elem = s("#" + e.id)[0];
            t.success && t.success(p), e.index = l++, e.action(t, p)
        }, p.prototype.action = function (e, t) {
            var n = this;
            e.time && (u.timer[n.index] = setTimeout(function () {
                layer.close(n.index)
            }, 1e3 * e.time));
            var r = function () {
                var t = this.getAttribute("type");
                0 == t ? (e.no && e.no(), layer.close(n.index)) : e.yes ? e.yes(n.index) : layer.close(n.index)
            };
            if (e.btn) for (var i = t[a]("layui-m-layerbtn")[0].children, o = i.length, s = 0; o > s; s++) u.touch(i[s], r);
            if (e.shade && e.shadeClose) {
                var c = t[a]("layui-m-layershade")[0];
                u.touch(c, function () {
                    layer.close(n.index, e.end)
                })
            }
            e.end && (u.end[n.index] = e.end)
        }, r.layer = {
            v: "2.0", index: l, open: function (e) {
                var t = new p(e || {});
                return t.index
            }, close: function (e) {
                var t = s("#" + d[0] + e)[0];
                t && (t.innerHTML = "", i.body.removeChild(t), clearTimeout(u.timer[e]), delete u.timer[e], "function" == typeof u.end[e] && u.end[e](), delete u.end[e])
            }, closeAll: function () {
                for (var e = i[a](d[0]), t = 0, n = e.length; n > t; t++) layer.close(0 | e[0].getAttribute("index"))
            }
        }, n = function () {
            return layer
        }.call(exports, t, exports, e), !(void 0 !== n && (e.exports = n))
    }(window)
}, function (t, exports, n) {
    function r() {
        for (var e = [function () {
            return new XMLHttpRequest
        }, function () {
            return new ActiveXObject("Msxml2.XMLHTTP")
        }, function () {
            return new ActiveXObject("Msxml3.XMLHTTP")
        }, function () {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }], t = !1, n = 0; n < e.length; n++) {
            try {
                t = e[n]()
            } catch (e) {
                continue
            }
            break
        }
        return t.onerror = function (e) {
            throw console.error(t, e), o.open({
                content: i.NETWORK_ERROR_MSG,
                skin: "msg",
                time: 3
            }), new Error("XHR.onerror", e)
        }, t
    }

    var i = n(15), o = n(13);
    t.exports.testCookie = function (t) {
        chrome.runtime.sendMessage({
            method: "GET",
            contentScriptQuery: "fetchUrl",
            url: "https://biz.caiyunapp.com/test_cookies"
        }, function (n) {
            if (console.log(n), "ok" == n.status) {
                var r = JSON.parse(n.data);
                console.log("testCookie:", r), "ok" == r.status && r.cookies && r.cookies.cy_user ? t(JSON.parse(decodeURIComponent(r.cookies.cy_user))) : t()
            } else console.error(xhr, e), o.open({content: i.PAGE_COOKIE_ERROR_MSG, skin: "msg", time: 6})
        })
    }, t.exports.alipayForOneMonthRedeem = function (e, t) {
        chrome.runtime.sendMessage({
            method: "POST",
            contentScriptQuery: "fetchUrl",
            url: i.TRS_URL + "/v1/user/redeem",
            headers: {"X-Authorization": "token " + i.token},
            data: {user_id: e, product_id: 16, os_type: "web", version: "1.0.3", timestamp: 0, pay_channel: "alipay"}
        }, function (e) {
            if ("ok" == e.status) {
                var n = JSON.parse(e.data);
                t(n)
            }
        })
    }, exports.fetchPageSentenceTargetList = function (e, t, n, r) {
        chrome.runtime.sendMessage({
            method: "POST",
            contentScriptQuery: "fetchUrl",
            url: i.TRS_URL + "/v1/page/sentence",
            headers: {"X-Authorization": "token " + i.token},
            data: {user_id: t, page_id: n, sentence_id: e, trans_type: "en2zh"}
        }, function (e) {
            if (console.log(e), "ok" == e.status) {
                var t = JSON.parse(e.data);
                r(t)
            }
        })
    }, exports.updatePageSentence = function (t, n, r, a) {
        xhrLoading || chrome.runtime.sendMessage({
            method: "POST",
            contentScriptQuery: "fetchUrl",
            url: i.TRS_URL + "/v1/page/" + pageId + "/sentence/" + n,
            headers: {"X-Authorization": "token " + i.token},
            data: {source: t, target: r, user_id: userId, sentence_id: n, trans_type: "en2zh"}
        }, function (t) {
            if ("ok" != t.status) throw xhrLoading = !1, o.open({
                content: UPDATE_TARGET_ERROR,
                skin: "msg",
                time: 3
            }), console.error(e), a(), new Error("commentPageSentence Error", e);
            var n = JSON.parse(t.data);
            a(n)
        })
    }, exports.commitPageSentence = function (t, n, r, a, s) {
        if (!xhrLoading) {
            var c = i.TRS_URL + "/v1/page/" + pageId + "/sentence", u = userId;
            s && (u = s), chrome.runtime.sendMessage({
                method: "POST",
                contentScriptQuery: "fetchUrl",
                url: c,
                headers: {"X-Authorization": "token " + i.token},
                data: {user_id: u, page_id: pageId, source: t, target: n, trans_type: "en2zh", action: r || ""}
            }, function (t) {
                if (console.log(t), "ok" != t.status) throw xhrLoading = !1, o.open({
                    content: UPDATE_TARGET_ERROR,
                    skin: "msg",
                    time: 3
                }), console.error(e), new Error("commitPageSentence Error", e);
                xhrLoading = !1;
                var n = JSON.parse(t.data);
                a(n)
            })
        }
    }, exports.commitPageSentence = function (t, n, r, a, s) {
        if (!xhrLoading) {
            var c = i.TRS_URL + "/v1/page/" + pageId + "/sentence", u = userId;
            s && (u = s), xhrLoading = !0, chrome.runtime.sendMessage({
                method: "POST",
                contentScriptQuery: "fetchUrl",
                url: c,
                headers: {"X-Authorization": "token " + i.token},
                data: {user_id: u, page_id: pageId, source: t, target: n, trans_type: "en2zh", action: r || ""}
            }, function (t) {
                if ("ok" != t.status) throw xhrLoading = !1, o.open({
                    content: UPDATE_TARGET_ERROR,
                    skin: "msg",
                    time: 3
                }), console.error(e), new Error("commitPageSentence Error", e);
                var n = JSON.parse(t.data);
                xhrLoading = !1, a(n)
            })
        }
    }, exports.commentPageSentence = function (t, n, a) {
        if (!xhrLoading) {
            r();
            xhrLoading = !0, n = n.toUpperCase();
            var s = i.TRS_URL + "/v1/page/" + pageId + "/sentence/" + t + "/comment";
            chrome.runtime.sendMessage({
                method: "POST",
                contentScriptQuery: "fetchUrl",
                url: s,
                headers: {"X-Authorization": "token " + i.token},
                data: {user_id: userId, sentence_id: t, trans_type: "en2zh", action: n}
            }, function (t) {
                if ("ok" != t.status) throw xhrLoading = !1, o.open({
                    content: UPDATE_TARGET_ERROR,
                    skin: "msg",
                    time: 3
                }), console.error(e), new Error("commentPageSentence Error", e);
                var n = JSON.parse(t.data);
                xhrLoading = !1, a(n)
            })
        }
    }, exports.pageAuth = function (t, n, a, s) {
        var c = r(), u = i.TRS_URL + "/v1/page/auth";
        chrome.runtime.sendMessage({
            method: "POST",
            contentScriptQuery: "fetchUrl",
            url: u,
            headers: {"X-Authorization": "token " + i.token},
            data: {user_id: t, browser_id: n, device_id: a, url: document.URL, title: document.title}
        }, function (t) {
            if ("ok" != t.status) throw console.error(c, e), o.open({
                content: i.PAGE_AUTH_ERROR_MSG,
                skin: "msg",
                time: 3
            }), new Error("PageAuth Error", e);
            var n = JSON.parse(t.data);
            s(n)
        })
    }, exports.postFavorite = function (t, n, a) {
        var s = r(), c = i.TRS_URL + "/v1/page/favorite";
        chrome.runtime.sendMessage({
            method: "POST",
            contentScriptQuery: "fetchUrl",
            url: c,
            headers: {"X-Authorization": "token " + i.token},
            data: {url: t, user_id: n, article: !0}
        }, function (t) {
            if ("ok" != t.status) throw console.error(s, e), o.open({
                content: i.PAGE_AUTH_ERROR_MSG,
                skin: "msg",
                time: 3
            }), new Error("PageAuth Error", e);
            xhrLoading = !1;
            var n = JSON.parse(t.data);
            a(n)
        })
    }, exports.fetchPageTranslator = function (t, n, r) {
        var o = i.TRS_URL + "/v1/page/" + t + "/author";
        chrome.runtime.sendMessage({
            method: "POST",
            contentScriptQuery: "fetchUrl",
            url: o,
            headers: {"X-Authorization": "token " + i.token},
            data: {user_id: n}
        }, function (t) {
            if ("ok" != t.status) throw console.error(e), new Error("fetchPageTranslator Error", e);
            var n = JSON.parse(t.data);
            r(n)
        })
    }, exports.pageMark = function (e, t, n, o) {
        var a = (r(), i.TRS_URL + "/v1/page/mark");
        chrome.runtime.sendMessage({
            method: "POST",
            contentScriptQuery: "fetchUrl",
            url: a,
            headers: {"X-Authorization": "token " + i.token},
            data: {
                user_id: t,
                page_id: n,
                reading_chars: e.chars,
                reading_en_words: e.en_words,
                reading_zh_chars: e.zh_chars,
                reading_time: e.time
            }
        }, function (e) {
            if ("ok" == e.status) {
                xhrLoading = !1;
                var t = JSON.parse(e.data);
                o(t)
            }
        })
    }
}, function (e, exports) {
    var t = "prd", n = "1.1.0", r = "", i = "", o = "", a = "https://caiyunapp.com/user/login/", s = !0,
        c = "lqkr1tfixq1wa9kmj9po", u = !1;
    "prd" == t ? (r = "https://api.interpreter.caiyunai.com", i = "https://biz.caiyunapp.com", a = "https://www.caiyunapp.com/user/login/", o = "5a096eec830f7876a48aac47", s = !0) : "staging" == t ? (r = "https://api-staging.interpreter.caiyunai.com", i = "https://biz-staging.caiyunapp.com", a = "http://staging.caiyunapp.com/user/login/", o = "5a096eec830f7876a48aac47", s = !1) : "test" == t && (r = "https://api-staging.interpreter.caiyunai.com", i = "http://luo.user.caiyunapp.com:88", a = "http://staging.caiyunapp.com/user/login/", o = "59fad5be1d28d263ea346f39", s = !1), "object" == typeof CAIYUN && (CAIYUN.key && (c = CAIYUN.key), CAIYUN.disable && (u = CAIYUN.disable)), e.exports = {
        ENV: t,
        VERSION: n,
        token: c,
        disable: u,
        TRS_URL: r,
        BIZ_URL: i,
        LOGIN_URL: a,
        XIAOYI_USERID: o,
        CACHED: s,
        DOWNLOAD_URL: "http://a.app.qq.com/o/simple.jsp?pkgname=com.caiyuninterpreter.activity",
        LNADING_URL: "http://caiyunapp.com/xiaoyi/landing.html",
        NETWORK_ERROR_MSG: "抱歉，网络请求有误，请刷新重试 ",
        PAGE_AUTH_ERROR_MSG: "抱歉，网页认证有误，请刷新重试 ",
        PAGE_COOKIE_ERROR_MSG: "抱歉，Cookie数据获取异常，请刷新重试 ",
        DATA_ERROR_MSG: "抱歉，数据有误，请重试 ",
        DEFAULT_AVATAR_URL: "data:image/png;base64,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",
        XIAOYI_DEFAULT_URL: "data:image/jpeg;base64,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",
        LEFT_SLIDE_URL: "data:image/png;base64,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",
        RIGHT_SLIDE_URL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABFCAYAAAAcjSspAAAAAXNSR0IArs4c6QAACPJJREFUeAHtXFtsFFUY/mfb0jtaKAULKFAbqKViEDASGy0CGqwpoFQxgeCLD0J8ICatiYlr4kNJjCZcTMREBB5I8EFQRMVqSSSCUhCBBppabtLKpVBotzfa7vh/Zy57Zrvdpdudnd3Cl8Bcd+Z8X8/9fP8oFC3UuDOot3s+qVRIijqdSOF/lMvHmURqBu+n8b9OPu8hhdp5v5nP15Oq1PNxHSWl/E4lbg+ftx2KrW/4uaKIyFVOXu8CUpR5pKqJYb9PUfr493+Sy/UrkXc3LdpwKuxnhfhh5EX5rTKLupQ3OeGrOBc8EeL94V9W6AQLvpNS1W1UXNUa/oMG/jJyovzkziGlez3/Nd/m13CRsELhMlCUOYHmjp5E+WnZlJ8+lh5JGUOjE0dRekIypSUkUWd/L3X091Bb3x262H2TGjpuUENnCx1tu0yn2q+wxqr1odpRO+fCz0hN+YRecF8LdMNQzw1flIaNyXShuZLFqOA0p8oJSHElUum4AlqaU0jPZE2hMYmWy/KtIfdv9nXRodYLtOdaHe27foa6vX3W3yjUxeJsoCm5VZT/To/14tCOhidKdeWL1K9u5lfmya8tyMihtZOfpmU5MykzYZR8KSL77f136Jtrp2nLv4fpjGdA5mikBGUdLaz6MdyXhScKcsf55o85d6yTXzwr8yGqmPocvZQ9gwuL/UBh+r7lLG04f5D+bv/P+kJF2UxTc98NJ9cMPe3VldM4d3zNKZhtpCKLi4U7byGtmTgnKmIY7zW2Xi6325uOkbuxmlq5mEk4zrlmBeeac9K5kLtDE6W6ci551f2chmzjyUuyp9OWgqU0NgndDGdxo7eT1p7ZQ/tb6n0JUaiFXMoSFuao72TwvYTgl6WrByoXc3H5gQV50Di7fkoxbZpRJloO45yTW7Rgr4wvojtqPx2+dclICv5ab9Cq4lraeajROBlse3c5BYKQuo8FScLDkrlV2VJQRuXjHw/2bEev7b56knPNXuoxWimFerm3XEqLqw6ESlhoUbQiU8OCpONhE5IzaVfRSnpy9MRQz3b8+rG2Jlp5ahdd6cGogaFQBxelklBFKbgov7yfR/29R4w6BILUzHmLJiaP1l4SB/9f7rlNC2q/kIVBHfNUsMrXNSgvNLt9vbsNQVBkkEPiSRBwm5T8gEg30i+ARgKtJ/gNgsFFQT9EanZRh8RDkQnEE+lG+iXMFv0s6YS8G7j1QU/Vq240bkQrgx5qPKMwYzz1WFulebSm+A/acegff14Dc0qNO0Xvuot70Q/5YNpC/9/F5TF4gI8JDFECFKOBovR1V/CPxFgGPVV0zILXxuYrYn4HPMAHvHTkicGscaRvraJg+I/Rrg503WOhp2qkJxJb8AEvE+AL3hKsooj5EG34j8EdxjIjEeAFfgKY7gBvCT5RMGOmTRCJyxjtjpRiI/EVu+AFfibAG/x1+EQRU4jajBnmQzD8txuHb10kDOKcAPiBp45MbQpVO/KJoqqrjTvWTZ5vey452HqOyk7soJf/2u6IMMgt1m4Gzynr0EQRs+7qLJxLdSWJ6UPjBju2Lb0dtPLkLjGleNpzxTFhMDMIvgKYZBc68HS4dsZVbpAvHTfDlilE4/nYZiel06fTSzk3arWWU8JgqhR8fdB00ETBuoyOMp5kjgZenzCLPn9smePCWPjqOrgIK3dYqGLgL4dZ92ghFoQBXyPHCh1YD5e2lKmt3GFdZjjLEOGI6bQw4AveAljB5KVdF08NmOUFC1VOwGlhLLxZD5e22K1JgZU7p+CkMBbevPjPFa1iVr9YynQSTglj5a1AFNIHASTWdp0UBe92QhisaUvIRZ1iLoZjsTsWEG1hLLxZD65TfKJk8Op/rCCawlh4sx6cU1RzxiWVF5NiCdESxsKb9UCdYg5T4Q+JNSwam08Pp5qLklTnuUpHbl+KaDL9eHei9fEYb4BhJpaAaQWMoi92aUYl9DwxNIj0tIaVt+JBnaIvn5FwEMWKKIYgGCwCEGRr4XLROkU6jXBOmWA9UHzYhagBlqpYQCBBkENes2nt2o93M4vCtkwd8Jg5jcEEQaVrF6y81XpufdinqgOmOyfhhCDga+HNeqBOqTOEgAvRKTglCPhaeLMeLuFkhnGXAVsmXIjRhpOCgC94C0AHdna7hLUbTmYGfKqwZUYTTgoCnuBr+nOhA1vd0frwTC2s3Rr2sk81WnBaEPCEL9eEroMmCrzuOr5j4y58qnYjFgQBTxiVfdB00ESB+V943UksO8C4aydg60RPVe6YoR9iZ7MbiA94ms5t8NeDIPScgp+w+V8HnMwBXfDGDcPcZvJo/NE0bULL6LpHWxDwA08ffPx9oiAagrQuP6zdcDLbhUTFRV8Wvsr2zpliLBNtQcAL/CQLe7uIBtEJ+0RBeAiiIXTA2m1nboEw2wpXRL3IgB54gZ8J8JbCY3yi4A6EhyAaggGv+1dNtdgdcQAv08sPvuAtwSoK4mUQHqIDXne0EiMJ4ANeJsDXL07IKgruTEyBKMKujVYCXnc7i5GZuCjsgAf4SEENjSI+yO/dA0UpcXeLeBn9Rpj/PzwnKev3gHg6BA9LMAPiggIETCUEJAUb5epirIyJNWaY//O4CYXtMl4Br/57DVJcFOKBFlVtCsRnYE4x7kIAEdFx4xDmf3jd4xFIN9Iv4bgIkJJOyLuDi4JslZhUzq2RmGRBNATM/009bfLvY34f6UW6pWiOFhEYFaDYGGQGFwV3PP9RowggQvQDA9EQJbVb4ybHIIcgvX5RHAiIChopdncGyHss3idwRYtsIQMRVavYx67Qcj49ql/10rc8uoTX/dmsaXw6doBmF60MKlWkU0DkdKXsbgKgcP/Q+NwjMYRDEwUyIjAKcUBS2IvT0abIHei6OxNtClGA+3HJmg4B/w8SwQ6DMsL5750IdlkhxAchHCbAtw5g3IVPFbbMSH3rAHPI+66fpS6vnxnA+NYBxm4YqgwDQ69TBnvZML6KAX8I7BBd7HrwjIivYviLdP/7Kf6K+B3f/9KOnyD+h8G+yQSLGRxVisKzYDxP7PA3mf4HejdeBFqgWdYAAAAASUVORK5CYII=",
        CHECKED_IMG_URL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAABDCAYAAADHyrhzAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOtSURBVHhe7ZpraxNBFIbX++UHiXe03kVU1IqKYFVURIoWzZlUKREpUkSsiqiIN1RE6gUp2sxskfrJT/4Yr2i1Ws+ZOWvT5HSlmKTJ7DzwEsK+7M55c3ayl4kCgUAgEAgEAoHa0dc6I+ovzOdvGYaC0PAw0upttgNxQdyLjBplxdG7jnm8NUMUCtOx+LslQbCgGPUVZrMrA4xG0/C0uF0ZxF89Z6fnUBBG3SorvkQwHOncVnZ7jA0CbsghkDCIImxjt8fYUwOuySGgtPqB2s5uj3FzxBUxBJKGn9gVO9jtOUb1VgQwppEozrey03M0XBICSDSCc8ROdnqOhgtCAIlG8NTYxU7PMdAjBJBoBIPaw07PMaq7rPhSYUeovez0HK3OlRVfKgqijZ2eo6FQVnyJ4Bdu389OzzHQJYeA0uo36gA7PSdWp8UQSBSEgYPs9BytlBgCyXYEHGKn52g4JYZAch1xhJ2eY1RHRQCJXEccZafnaDghhkCyHaGOsdNztGrnguUgaHvVKaot+Ass4G+NAf3iaUHE6jg7q0ic34iTzzAe4EPDBEKT4URBkOjUqToxrMOdfx87CAYSw0LeOjXQ32NaEDSZVh2jWvAX+Fp2IBdIMb+IXfWFrhxTO0KdZGeV0fBaPCDJnTKL2Vkf6F6C7imk8Tjl2FkD6PWahjfCQVnwsW6BGNiHx6S7TGEcKLryrDkUiIFBcQBWGIjpXMLu2kDPG9KCMNDJzjrgOsTIA7H6FA2qpeyuLnF+N+4/pSPgDDvrCL2A1UqLA3KqfiD0cDa9I7rYOQUMFebiAIrywFAaPkfF3DJ2/x/0uD41CHWWnVNIPQKhN1n0RkvaP4ke5TUMA+1zcEAD4kBJWn3Bz+Xsnhz0bpOudqX9OnWzs4GgNQsGXgmDZdmLtckFEuc2pwah1Xl2NiAUiIZ+ceBWGEhRrWB3Ojq3Kb0joIedDYzrkJdyASQMROdWslvGwIbUIOhNWNPgOuSFWIiVPWVa2D0enV+P28ZuBCsEF9nZRLgOeSYXRMJA4twqdjtMfi2G+E32o+glcdPy/vAsnOSeioVZ0RySX229GtZwxwg+q17ra2qGCjOx0D6hOBbNIXgJnRaEhst2QYkX0HpKA0/EQv8puOpPEAlugeljueAJRGusvAsiwXaIelRRtCi47m8QCS6QB5XFl0irm/4HkWBPGXVfDIIWpGYmiATXIePXZtMS5cwFkTBusTrcyW4QCS6QNvsZCAQCgUAgkHmi6A/+bsV/gdPAhwAAAABJRU5ErkJggg==",
        FAVOR_IMG_URL: "data:image/png;base64,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"
    }
}, function (e, exports) {
    var t = ["blog.caiyunapp.com/whats-new-on-2018-09-11/", "blog.caiyunapp.com/cun-shang-chun-shu-dang-wo-xie-xiao-shuo-de-shi-hou-wo-hui-qu-yi-xie-qi-guai-de-mi-mi-de-di-fang-2/"];
    e.exports = {no_urlArr: t}
}, function (e, exports) {
    exports.levenshteinDistance = function (e, t) {
        if (0 == e.length) return t.length;
        if (0 == t.length) return e.length;
        var n, r = [];
        for (n = 0; n <= t.length; n++) r[n] = [n];
        var i;
        for (i = 0; i <= e.length; i++) r[0][i] = i;
        for (n = 1; n <= t.length; n++) for (i = 1; i <= e.length; i++) t.charAt(n - 1) == e.charAt(i - 1) ? r[n][i] = r[n - 1][i - 1] : r[n][i] = Math.min(r[n - 1][i - 1] + 1, Math.min(r[n][i - 1] + 1, r[n - 1][i] + 1));
        return r[t.length][e.length]
    }, exports.getDateDiff = function (e) {
        "string" == typeof e && (e = new Date(e).getTime());
        var t = 6e4, n = 60 * t, r = 24 * n, i = 30 * r, o = (new Date).getTime(), a = o - 1e3 * e, s = "刚刚";
        if (a < 0) return s;
        var c = a / i, u = a / (7 * r), l = a / r, d = a / n, p = a / t;
        return s = c >= 1 ? "" + parseInt(c) + "月前" : u >= 1 ? "" + parseInt(u) + "周前" : l >= 1 ? "" + parseInt(l) + "天前" : d >= 1 ? "" + parseInt(d) + "小时前" : p >= 1 ? "" + parseInt(p) + "分钟前" : "刚刚"
    }, exports.isURL = function (e) {
        return !!e.match(/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?/gi)
    }, exports.detectLang = function (e) {
        if ("string" != typeof e) return "en";
        var t = "en", n = e.match(/[\u4e00-\u9fa5]/g) || [], r = n.length / e.length,
            i = /[\u3020-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\u31F0-\u31FF]/g, o = e.match(i) || [],
            a = o.length / e.length;
        return a > .03 ? t = "jp" : r >= .1 && (t = "zh"), t
    }, exports.preload = function (e) {
        for (var t = 0, n = e; t < n; t++) (new Image).src = e[t]
    }, exports.uuid = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
            var t = 16 * Math.random() | 0, n = "x" == e ? t : 3 & t | 8;
            return n.toString(16)
        })
    }, exports.wordStatistics = function (e) {
        for (var t = e.innerText.replace(/\r\n/g, "\n"), n = t.replace(/\n/g, ""), r = t.match(/[\u4e00-\u9fa5]/g) || [], i = t.match(/\b\w+\b/g) || [], o = t.match(/\b\d+\b/g) || [], a = (n.match(/[|\~|\`|\!|\@|\#|\jq|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g) || [], 0), s = 0; s < n.length; s++) {
            var c = n.charAt(s);
            c.match(/[^\x00-\xff]/) && a++
        }
        for (var u = n.match(/[A-Za-z]/g) || [], l = (u.length, n.match(/[0-9]/g) || []), d = (l.length, 0), p = t.split("\n"), s = 0; s < p.length; s++) p[s].length > 0 && d++;
        return {chars: n.length, en_words: i.length - o.length, zh_chars: r.length}
    }
}, function (e, exports, t) {
    var n, r;/*!
	 * jQuery JavaScript Library v3.3.1
	 * https://jquery.com/
	 *
	 * Includes Sizzle.js
	 * https://sizzlejs.com/
	 *
	 * Copyright JS Foundation and other contributors
	 * Released under the MIT license
	 * https://jquery.org/license
	 *
	 * Date: 2018-01-20T17:24Z
	 */
    !function (t, n) {
        "use strict";
        "object" == typeof e && "object" == typeof e.exports ? e.exports = t.document ? n(t, !0) : function (e) {
            if (!e.document) throw new Error("jQuery requires a window with a document");
            return n(e)
        } : n(t)
    }("undefined" != typeof window ? window : this, function (t, i) {
        "use strict";

        function o(e, t, n) {
            t = t || ue;
            var r, i = t.createElement("script");
            if (i.text = e, n) for (r in Te) n[r] && (i[r] = n[r]);
            t.head.appendChild(i).parentNode.removeChild(i)
        }

        function a(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? ge[me.call(e)] || "object" : typeof e
        }

        function s(e) {
            var t = !!e && "length" in e && e.length, n = a(e);
            return !be(e) && !we(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
        }

        function c(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }

        function u(e, t, n) {
            return be(t) ? jQuery.grep(e, function (e, r) {
                return !!t.call(e, r, e) !== n
            }) : t.nodeType ? jQuery.grep(e, function (e) {
                return e === t !== n
            }) : "string" != typeof t ? jQuery.grep(e, function (e) {
                return he.call(t, e) > -1 !== n
            }) : jQuery.filter(t, e, n)
        }

        function l(e, t) {
            for (; (e = e[t]) && 1 !== e.nodeType;) ;
            return e
        }

        function d(e) {
            var t = {};
            return jQuery.each(e.match(Pe) || [], function (e, n) {
                t[n] = !0
            }), t
        }

        function p(e) {
            return e
        }

        function f(e) {
            throw e
        }

        function h(e, t, n, r) {
            var i;
            try {
                e && be(i = e.promise) ? i.call(e).done(t).fail(n) : e && be(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
            } catch (e) {
                n.apply(void 0, [e])
            }
        }

        function g() {
            ue.removeEventListener("DOMContentLoaded", g), t.removeEventListener("load", g), jQuery.ready()
        }

        function m(e, t) {
            return t.toUpperCase()
        }

        function y(e) {
            return e.replace(He, "ms-").replace(je, m)
        }

        function v() {
            this.expando = jQuery.expando + v.uid++
        }

        function x(e) {
            return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : Ke.test(e) ? JSON.parse(e) : e)
        }

        function A(e, t, n) {
            var r;
            if (void 0 === n && 1 === e.nodeType) if (r = "data-" + t.replace(qe, "-$&").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) {
                try {
                    n = x(n)
                } catch (e) {
                }
                Ve.set(e, t, n)
            } else n = void 0;
            return n
        }

        function b(e, t, n, r) {
            var i, o, a = 20, s = r ? function () {
                    return r.cur()
                } : function () {
                    return jQuery.css(e, t, "")
                }, c = s(), u = n && n[3] || (jQuery.cssNumber[t] ? "" : "px"),
                l = (jQuery.cssNumber[t] || "px" !== u && +c) && ze.exec(jQuery.css(e, t));
            if (l && l[3] !== u) {
                for (c /= 2, u = u || l[3], l = +c || 1; a--;) jQuery.style(e, t, l + u), (1 - o) * (1 - (o = s() / c || .5)) <= 0 && (a = 0), l /= o;
                l *= 2, jQuery.style(e, t, l + u), n = n || []
            }
            return n && (l = +l || +c || 0, i = n[1] ? l + (n[1] + 1) * n[2] : +n[2], r && (r.unit = u, r.start = l, r.end = i)), i
        }

        function w(e) {
            var t, n = e.ownerDocument, r = e.nodeName, i = Ze[r];
            return i ? i : (t = n.body.appendChild(n.createElement(r)), i = jQuery.css(t, "display"), t.parentNode.removeChild(t), "none" === i && (i = "block"), Ze[r] = i, i)
        }

        function T(e, t) {
            for (var n, r, i = [], o = 0, a = e.length; o < a; o++) r = e[o], r.style && (n = r.style.display, t ? ("none" === n && (i[o] = Xe.get(r, "display") || null, i[o] || (r.style.display = "")), "" === r.style.display && Ye(r) && (i[o] = w(r))) : "none" !== n && (i[o] = "none", Xe.set(r, "display", n)));
            for (o = 0; o < a; o++) null != i[o] && (e[o].style.display = i[o]);
            return e
        }

        function E(e, t) {
            var n;
            return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && c(e, t) ? jQuery.merge([e], n) : n
        }

        function S(e, t) {
            for (var n = 0, r = e.length; n < r; n++) Xe.set(e[n], "globalEval", !t || Xe.get(t[n], "globalEval"))
        }

        function C(e, t, n, r, i) {
            for (var o, s, c, u, l, d, p = t.createDocumentFragment(), f = [], h = 0, g = e.length; h < g; h++) if (o = e[h], o || 0 === o) if ("object" === a(o)) jQuery.merge(f, o.nodeType ? [o] : o); else if (rt.test(o)) {
                for (s = s || p.appendChild(t.createElement("div")), c = (et.exec(o) || ["", ""])[1].toLowerCase(), u = nt[c] || nt._default, s.innerHTML = u[1] + jQuery.htmlPrefilter(o) + u[2], d = u[0]; d--;) s = s.lastChild;
                jQuery.merge(f, s.childNodes), s = p.firstChild, s.textContent = ""
            } else f.push(t.createTextNode(o));
            for (p.textContent = "", h = 0; o = f[h++];) if (r && jQuery.inArray(o, r) > -1) i && i.push(o); else if (l = jQuery.contains(o.ownerDocument, o), s = E(p.appendChild(o), "script"), l && S(s), n) for (d = 0; o = s[d++];) tt.test(o.type || "") && n.push(o);
            return p
        }

        function _() {
            return !0
        }

        function k() {
            return !1
        }

        function R() {
            try {
                return ue.activeElement
            } catch (e) {
            }
        }

        function L(e, t, n, r, i, o) {
            var a, s;
            if ("object" == typeof t) {
                "string" != typeof n && (r = r || n, n = void 0);
                for (s in t) L(e, s, n, r, t[s], o);
                return e
            }
            if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), i === !1) i = k; else if (!i) return e;
            return 1 === o && (a = i, i = function (e) {
                return jQuery().off(e), a.apply(this, arguments)
            }, i.guid = a.guid || (a.guid = jQuery.guid++)), e.each(function () {
                jQuery.event.add(this, t, i, r, n)
            })
        }

        function O(e, t) {
            return c(e, "table") && c(11 !== t.nodeType ? t : t.firstChild, "tr") ? jQuery(e).children("tbody")[0] || e : e
        }

        function M(e) {
            return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
        }

        function N(e) {
            return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
        }

        function D(e, t) {
            var n, r, i, o, a, s, c, u;
            if (1 === t.nodeType) {
                if (Xe.hasData(e) && (o = Xe.access(e), a = Xe.set(t, o), u = o.events)) {
                    delete a.handle, a.events = {};
                    for (i in u) for (n = 0, r = u[i].length; n < r; n++) jQuery.event.add(t, i, u[i][n])
                }
                Ve.hasData(e) && (s = Ve.access(e), c = jQuery.extend({}, s), Ve.set(t, c))
            }
        }

        function I(e, t) {
            var n = t.nodeName.toLowerCase();
            "input" === n && $e.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
        }

        function P(e, t, n, r) {
            t = pe.apply([], t);
            var i, a, s, c, u, l, d = 0, p = e.length, f = p - 1, h = t[0], g = be(h);
            if (g || p > 1 && "string" == typeof h && !Ae.checkClone && lt.test(h)) return e.each(function (i) {
                var o = e.eq(i);
                g && (t[0] = h.call(this, i, o.html())), P(o, t, n, r)
            });
            if (p && (i = C(t, e[0].ownerDocument, !1, e, r), a = i.firstChild, 1 === i.childNodes.length && (i = a), a || r)) {
                for (s = jQuery.map(E(i, "script"), M), c = s.length; d < p; d++) u = i, d !== f && (u = jQuery.clone(u, !0, !0), c && jQuery.merge(s, E(u, "script"))), n.call(e[d], u, d);
                if (c) for (l = s[s.length - 1].ownerDocument, jQuery.map(s, N), d = 0; d < c; d++) u = s[d], tt.test(u.type || "") && !Xe.access(u, "globalEval") && jQuery.contains(l, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? jQuery._evalUrl && jQuery._evalUrl(u.src) : o(u.textContent.replace(dt, ""), l, u))
            }
            return e
        }

        function B(e, t, n) {
            for (var r, i = t ? jQuery.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || jQuery.cleanData(E(r)), r.parentNode && (n && jQuery.contains(r.ownerDocument, r) && S(E(r, "script")), r.parentNode.removeChild(r));
            return e
        }

        function U(e, t, n) {
            var r, i, o, a, s = e.style;
            return n = n || ft(e), n && (a = n.getPropertyValue(t) || n[t], "" !== a || jQuery.contains(e.ownerDocument, e) || (a = jQuery.style(e, t)), !Ae.pixelBoxStyles() && pt.test(a) && ht.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a
        }

        function F(e, t) {
            return {
                get: function () {
                    return e() ? void delete this.get : (this.get = t).apply(this, arguments)
                }
            }
        }

        function H(e) {
            if (e in At) return e;
            for (var t = e[0].toUpperCase() + e.slice(1), n = xt.length; n--;) if (e = xt[n] + t, e in At) return e
        }

        function j(e) {
            var t = jQuery.cssProps[e];
            return t || (t = jQuery.cssProps[e] = H(e) || e), t
        }

        function G(e, t, n) {
            var r = ze.exec(t);
            return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
        }

        function X(e, t, n, r, i, o) {
            var a = "width" === t ? 1 : 0, s = 0, c = 0;
            if (n === (r ? "border" : "content")) return 0;
            for (; a < 4; a += 2) "margin" === n && (c += jQuery.css(e, n + Qe[a], !0, i)), r ? ("content" === n && (c -= jQuery.css(e, "padding" + Qe[a], !0, i)), "margin" !== n && (c -= jQuery.css(e, "border" + Qe[a] + "Width", !0, i))) : (c += jQuery.css(e, "padding" + Qe[a], !0, i), "padding" !== n ? c += jQuery.css(e, "border" + Qe[a] + "Width", !0, i) : s += jQuery.css(e, "border" + Qe[a] + "Width", !0, i));
            return !r && o >= 0 && (c += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - c - s - .5))), c
        }

        function V(e, t, n) {
            var r = ft(e), i = U(e, t, r), o = "border-box" === jQuery.css(e, "boxSizing", !1, r), a = o;
            if (pt.test(i)) {
                if (!n) return i;
                i = "auto"
            }
            return a = a && (Ae.boxSizingReliable() || i === e.style[t]), ("auto" === i || !parseFloat(i) && "inline" === jQuery.css(e, "display", !1, r)) && (i = e["offset" + t[0].toUpperCase() + t.slice(1)], a = !0), i = parseFloat(i) || 0, i + X(e, t, n || (o ? "border" : "content"), a, r, i) + "px"
        }

        function K(e, t, n, r, i) {
            return new K.prototype.init(e, t, n, r, i)
        }

        function q() {
            wt && (ue.hidden === !1 && t.requestAnimationFrame ? t.requestAnimationFrame(q) : t.setTimeout(q, jQuery.fx.interval), jQuery.fx.tick())
        }

        function W() {
            return t.setTimeout(function () {
                bt = void 0
            }), bt = Date.now()
        }

        function z(e, t) {
            var n, r = 0, i = {height: e};
            for (t = t ? 1 : 0; r < 4; r += 2 - t) n = Qe[r], i["margin" + n] = i["padding" + n] = e;
            return t && (i.opacity = i.width = e), i
        }

        function Q(e, t, n) {
            for (var r, i = (Z.tweeners[t] || []).concat(Z.tweeners["*"]), o = 0, a = i.length; o < a; o++) if (r = i[o].call(n, t, e)) return r
        }

        function Y(e, t, n) {
            var r, i, o, a, s, c, u, l, d = "width" in t || "height" in t, p = this, f = {}, h = e.style,
                g = e.nodeType && Ye(e), m = Xe.get(e, "fxshow");
            n.queue || (a = jQuery._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function () {
                a.unqueued || s()
            }), a.unqueued++, p.always(function () {
                p.always(function () {
                    a.unqueued--, jQuery.queue(e, "fx").length || a.empty.fire()
                })
            }));
            for (r in t) if (i = t[r], Tt.test(i)) {
                if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
                    if ("show" !== i || !m || void 0 === m[r]) continue;
                    g = !0
                }
                f[r] = m && m[r] || jQuery.style(e, r)
            }
            if (c = !jQuery.isEmptyObject(t), c || !jQuery.isEmptyObject(f)) {
                d && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], u = m && m.display, null == u && (u = Xe.get(e, "display")), l = jQuery.css(e, "display"), "none" === l && (u ? l = u : (T([e], !0), u = e.style.display || u, l = jQuery.css(e, "display"), T([e]))), ("inline" === l || "inline-block" === l && null != u) && "none" === jQuery.css(e, "float") && (c || (p.done(function () {
                    h.display = u
                }), null == u && (l = h.display, u = "none" === l ? "" : l)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function () {
                    h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
                })), c = !1;
                for (r in f) c || (m ? "hidden" in m && (g = m.hidden) : m = Xe.access(e, "fxshow", {display: u}), o && (m.hidden = !g), g && T([e], !0), p.done(function () {
                    g || T([e]), Xe.remove(e, "fxshow");
                    for (r in f) jQuery.style(e, r, f[r])
                })), c = Q(g ? m[r] : 0, r, p), r in m || (m[r] = c.start, g && (c.end = c.start, c.start = 0))
            }
        }

        function J(e, t) {
            var n, r, i, o, a;
            for (n in e) if (r = y(n), i = t[r], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = jQuery.cssHooks[r], a && "expand" in a) {
                o = a.expand(o), delete e[r];
                for (n in o) n in e || (e[n] = o[n], t[n] = i)
            } else t[r] = i
        }

        function Z(e, t, n) {
            var r, i, o = 0, a = Z.prefilters.length, s = jQuery.Deferred().always(function () {
                delete c.elem
            }), c = function () {
                if (i) return !1;
                for (var t = bt || W(), n = Math.max(0, u.startTime + u.duration - t), r = n / u.duration || 0, o = 1 - r, a = 0, c = u.tweens.length; a < c; a++) u.tweens[a].run(o);
                return s.notifyWith(e, [u, o, n]), o < 1 && c ? n : (c || s.notifyWith(e, [u, 1, 0]), s.resolveWith(e, [u]), !1)
            }, u = s.promise({
                elem: e,
                props: jQuery.extend({}, t),
                opts: jQuery.extend(!0, {specialEasing: {}, easing: jQuery.easing._default}, n),
                originalProperties: t,
                originalOptions: n,
                startTime: bt || W(),
                duration: n.duration,
                tweens: [],
                createTween: function (t, n) {
                    var r = jQuery.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                    return u.tweens.push(r), r
                },
                stop: function (t) {
                    var n = 0, r = t ? u.tweens.length : 0;
                    if (i) return this;
                    for (i = !0; n < r; n++) u.tweens[n].run(1);
                    return t ? (s.notifyWith(e, [u, 1, 0]), s.resolveWith(e, [u, t])) : s.rejectWith(e, [u, t]), this
                }
            }), l = u.props;
            for (J(l, u.opts.specialEasing); o < a; o++) if (r = Z.prefilters[o].call(u, e, l, u.opts)) return be(r.stop) && (jQuery._queueHooks(u.elem, u.opts.queue).stop = r.stop.bind(r)), r;
            return jQuery.map(l, Q, u), be(u.opts.start) && u.opts.start.call(e, u), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always), jQuery.fx.timer(jQuery.extend(c, {
                elem: e,
                anim: u,
                queue: u.opts.queue
            })), u
        }

        function $(e) {
            var t = e.match(Pe) || [];
            return t.join(" ")
        }

        function ee(e) {
            return e.getAttribute && e.getAttribute("class") || ""
        }

        function te(e) {
            return Array.isArray(e) ? e : "string" == typeof e ? e.match(Pe) || [] : []
        }

        function ne(e, t, n, r) {
            var i;
            if (Array.isArray(t)) jQuery.each(t, function (t, i) {
                n || It.test(e) ? r(e, i) : ne(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
            }); else if (n || "object" !== a(t)) r(e, t); else for (i in t) ne(e + "[" + i + "]", t[i], n, r)
        }

        function re(e) {
            return function (t, n) {
                "string" != typeof t && (n = t, t = "*");
                var r, i = 0, o = t.toLowerCase().match(Pe) || [];
                if (be(n)) for (; r = o[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
            }
        }

        function ie(e, t, n, r) {
            function i(s) {
                var c;
                return o[s] = !0, jQuery.each(e[s] || [], function (e, s) {
                    var u = s(t, n, r);
                    return "string" != typeof u || a || o[u] ? a ? !(c = u) : void 0 : (t.dataTypes.unshift(u), i(u), !1)
                }), c
            }

            var o = {}, a = e === Wt;
            return i(t.dataTypes[0]) || !o["*"] && i("*")
        }

        function oe(e, t) {
            var n, r, i = jQuery.ajaxSettings.flatOptions || {};
            for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
            return r && jQuery.extend(!0, e, r), e
        }

        function ae(e, t, n) {
            for (var r, i, o, a, s = e.contents, c = e.dataTypes; "*" === c[0];) c.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
            if (r) for (i in s) if (s[i] && s[i].test(r)) {
                c.unshift(i);
                break
            }
            if (c[0] in n) o = c[0]; else {
                for (i in n) {
                    if (!c[0] || e.converters[i + " " + c[0]]) {
                        o = i;
                        break
                    }
                    a || (a = i)
                }
                o = o || a
            }
            if (o) return o !== c[0] && c.unshift(o), n[o]
        }

        function se(e, t, n, r) {
            var i, o, a, s, c, u = {}, l = e.dataTypes.slice();
            if (l[1]) for (a in e.converters) u[a.toLowerCase()] = e.converters[a];
            for (o = l.shift(); o;) if (e.responseFields[o] && (n[e.responseFields[o]] = t), !c && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), c = o, o = l.shift()) if ("*" === o) o = c; else if ("*" !== c && c !== o) {
                if (a = u[c + " " + o] || u["* " + o], !a) for (i in u) if (s = i.split(" "), s[1] === o && (a = u[c + " " + s[0]] || u["* " + s[0]])) {
                    a === !0 ? a = u[i] : u[i] !== !0 && (o = s[0], l.unshift(s[1]));
                    break
                }
                if (a !== !0) if (a && e.throws) t = a(t); else try {
                    t = a(t)
                } catch (e) {
                    return {state: "parsererror", error: a ? e : "No conversion from " + c + " to " + o}
                }
            }
            return {state: "success", data: t}
        }

        var ce = [], ue = t.document, le = Object.getPrototypeOf, de = ce.slice, pe = ce.concat, fe = ce.push,
            he = ce.indexOf, ge = {}, me = ge.toString, ye = ge.hasOwnProperty, ve = ye.toString, xe = ve.call(Object),
            Ae = {}, be = function (e) {
                return "function" == typeof e && "number" != typeof e.nodeType
            }, we = function (e) {
                return null != e && e === e.window
            }, Te = {type: !0, src: !0, noModule: !0}, Ee = "3.3.1", jQuery = function (e, t) {
                return new jQuery.fn.init(e, t)
            }, Se = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        jQuery.fn = jQuery.prototype = {
            jquery: Ee, constructor: jQuery, length: 0, toArray: function () {
                return de.call(this)
            }, get: function (e) {
                return null == e ? de.call(this) : e < 0 ? this[e + this.length] : this[e]
            }, pushStack: function (e) {
                var t = jQuery.merge(this.constructor(), e);
                return t.prevObject = this, t
            }, each: function (e) {
                return jQuery.each(this, e)
            }, map: function (e) {
                return this.pushStack(jQuery.map(this, function (t, n) {
                    return e.call(t, n, t)
                }))
            }, slice: function () {
                return this.pushStack(de.apply(this, arguments))
            }, first: function () {
                return this.eq(0)
            }, last: function () {
                return this.eq(-1)
            }, eq: function (e) {
                var t = this.length, n = +e + (e < 0 ? t : 0);
                return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
            }, end: function () {
                return this.prevObject || this.constructor()
            }, push: fe, sort: ce.sort, splice: ce.splice
        }, jQuery.extend = jQuery.fn.extend = function () {
            var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, c = arguments.length, u = !1;
            for ("boolean" == typeof a && (u = a, a = arguments[s] || {}, s++), "object" == typeof a || be(a) || (a = {}), s === c && (a = this, s--); s < c; s++) if (null != (e = arguments[s])) for (t in e) n = a[t], r = e[t], a !== r && (u && r && (jQuery.isPlainObject(r) || (i = Array.isArray(r))) ? (i ? (i = !1, o = n && Array.isArray(n) ? n : []) : o = n && jQuery.isPlainObject(n) ? n : {}, a[t] = jQuery.extend(u, o, r)) : void 0 !== r && (a[t] = r));
            return a
        }, jQuery.extend({
            expando: "jQuery" + (Ee + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
                throw new Error(e)
            }, noop: function () {
            }, isPlainObject: function (e) {
                var t, n;
                return !(!e || "[object Object]" !== me.call(e)) && (!(t = le(e)) || (n = ye.call(t, "constructor") && t.constructor, "function" == typeof n && ve.call(n) === xe))
            }, isEmptyObject: function (e) {
                var t;
                for (t in e) return !1;
                return !0
            }, globalEval: function (e) {
                o(e)
            }, each: function (e, t) {
                var n, r = 0;
                if (s(e)) for (n = e.length; r < n && t.call(e[r], r, e[r]) !== !1; r++) ; else for (r in e) if (t.call(e[r], r, e[r]) === !1) break;
                return e
            }, trim: function (e) {
                return null == e ? "" : (e + "").replace(Se, "")
            }, makeArray: function (e, t) {
                var n = t || [];
                return null != e && (s(Object(e)) ? jQuery.merge(n, "string" == typeof e ? [e] : e) : fe.call(n, e)), n
            }, inArray: function (e, t, n) {
                return null == t ? -1 : he.call(t, e, n)
            }, merge: function (e, t) {
                for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
                return e.length = i, e
            }, grep: function (e, t, n) {
                for (var r, i = [], o = 0, a = e.length, s = !n; o < a; o++) r = !t(e[o], o), r !== s && i.push(e[o]);
                return i
            }, map: function (e, t, n) {
                var r, i, o = 0, a = [];
                if (s(e)) for (r = e.length; o < r; o++) i = t(e[o], o, n), null != i && a.push(i); else for (o in e) i = t(e[o], o, n), null != i && a.push(i);
                return pe.apply([], a)
            }, guid: 1, support: Ae
        }), "function" == typeof Symbol && (jQuery.fn[Symbol.iterator] = ce[Symbol.iterator]), jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
            ge["[object " + t + "]"] = t.toLowerCase()
        });
        var Ce =/*!
	 * Sizzle CSS Selector Engine v2.3.3
	 * https://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-08-08
	 */
            function (e) {
                function t(e, t, n, r) {
                    var i, o, a, s, c, u, l, p = t && t.ownerDocument, h = t ? t.nodeType : 9;
                    if (n = n || [], "string" != typeof e || !e || 1 !== h && 9 !== h && 11 !== h) return n;
                    if (!r && ((t ? t.ownerDocument || t : j) !== N && M(t), t = t || N, I)) {
                        if (11 !== h && (c = ye.exec(e))) if (i = c[1]) {
                            if (9 === h) {
                                if (!(a = t.getElementById(i))) return n;
                                if (a.id === i) return n.push(a), n
                            } else if (p && (a = p.getElementById(i)) && F(t, a) && a.id === i) return n.push(a), n
                        } else {
                            if (c[2]) return Z.apply(n, t.getElementsByTagName(e)), n;
                            if ((i = c[3]) && w.getElementsByClassName && t.getElementsByClassName) return Z.apply(n, t.getElementsByClassName(i)), n
                        }
                        if (w.qsa && !q[e + " "] && (!P || !P.test(e))) {
                            if (1 !== h) p = t, l = e; else if ("object" !== t.nodeName.toLowerCase()) {
                                for ((s = t.getAttribute("id")) ? s = s.replace(be, we) : t.setAttribute("id", s = H), u = C(e), o = u.length; o--;) u[o] = "#" + s + " " + f(u[o]);
                                l = u.join(","), p = ve.test(e) && d(t.parentNode) || t
                            }
                            if (l) try {
                                return Z.apply(n, p.querySelectorAll(l)), n
                            } catch (e) {
                            } finally {
                                s === H && t.removeAttribute("id")
                            }
                        }
                    }
                    return k(e.replace(se, "$1"), t, n, r)
                }

                function n() {
                    function e(n, r) {
                        return t.push(n + " ") > T.cacheLength && delete e[t.shift()], e[n + " "] = r
                    }

                    var t = [];
                    return e
                }

                function r(e) {
                    return e[H] = !0, e
                }

                function i(e) {
                    var t = N.createElement("fieldset");
                    try {
                        return !!e(t)
                    } catch (e) {
                        return !1
                    } finally {
                        t.parentNode && t.parentNode.removeChild(t), t = null
                    }
                }

                function o(e, t) {
                    for (var n = e.split("|"), r = n.length; r--;) T.attrHandle[n[r]] = t
                }

                function a(e, t) {
                    var n = t && e, r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
                    if (r) return r;
                    if (n) for (; n = n.nextSibling;) if (n === t) return -1;
                    return e ? 1 : -1
                }

                function s(e) {
                    return function (t) {
                        var n = t.nodeName.toLowerCase();
                        return "input" === n && t.type === e
                    }
                }

                function c(e) {
                    return function (t) {
                        var n = t.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && t.type === e
                    }
                }

                function u(e) {
                    return function (t) {
                        return "form" in t ? t.parentNode && t.disabled === !1 ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && Ee(t) === e : t.disabled === e : "label" in t && t.disabled === e
                    }
                }

                function l(e) {
                    return r(function (t) {
                        return t = +t, r(function (n, r) {
                            for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                        })
                    })
                }

                function d(e) {
                    return e && "undefined" != typeof e.getElementsByTagName && e
                }

                function p() {
                }

                function f(e) {
                    for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
                    return r
                }

                function h(e, t, n) {
                    var r = t.dir, i = t.next, o = i || r, a = n && "parentNode" === o, s = X++;
                    return t.first ? function (t, n, i) {
                        for (; t = t[r];) if (1 === t.nodeType || a) return e(t, n, i);
                        return !1
                    } : function (t, n, c) {
                        var u, l, d, p = [G, s];
                        if (c) {
                            for (; t = t[r];) if ((1 === t.nodeType || a) && e(t, n, c)) return !0
                        } else for (; t = t[r];) if (1 === t.nodeType || a) if (d = t[H] || (t[H] = {}), l = d[t.uniqueID] || (d[t.uniqueID] = {}), i && i === t.nodeName.toLowerCase()) t = t[r] || t; else {
                            if ((u = l[o]) && u[0] === G && u[1] === s) return p[2] = u[2];
                            if (l[o] = p, p[2] = e(t, n, c)) return !0
                        }
                        return !1
                    }
                }

                function g(e) {
                    return e.length > 1 ? function (t, n, r) {
                        for (var i = e.length; i--;) if (!e[i](t, n, r)) return !1;
                        return !0
                    } : e[0]
                }

                function m(e, n, r) {
                    for (var i = 0, o = n.length; i < o; i++) t(e, n[i], r);
                    return r
                }

                function y(e, t, n, r, i) {
                    for (var o, a = [], s = 0, c = e.length, u = null != t; s < c; s++) (o = e[s]) && (n && !n(o, r, i) || (a.push(o), u && t.push(s)));
                    return a
                }

                function v(e, t, n, i, o, a) {
                    return i && !i[H] && (i = v(i)), o && !o[H] && (o = v(o, a)), r(function (r, a, s, c) {
                        var u, l, d, p = [], f = [], h = a.length, g = r || m(t || "*", s.nodeType ? [s] : s, []),
                            v = !e || !r && t ? g : y(g, p, e, s, c), x = n ? o || (r ? e : h || i) ? [] : a : v;
                        if (n && n(v, x, s, c), i) for (u = y(x, f), i(u, [], s, c), l = u.length; l--;) (d = u[l]) && (x[f[l]] = !(v[f[l]] = d));
                        if (r) {
                            if (o || e) {
                                if (o) {
                                    for (u = [], l = x.length; l--;) (d = x[l]) && u.push(v[l] = d);
                                    o(null, x = [], u, c)
                                }
                                for (l = x.length; l--;) (d = x[l]) && (u = o ? ee(r, d) : p[l]) > -1 && (r[u] = !(a[u] = d))
                            }
                        } else x = y(x === a ? x.splice(h, x.length) : x), o ? o(null, a, x, c) : Z.apply(a, x)
                    })
                }

                function x(e) {
                    for (var t, n, r, i = e.length, o = T.relative[e[0].type], a = o || T.relative[" "], s = o ? 1 : 0, c = h(function (e) {
                        return e === t
                    }, a, !0), u = h(function (e) {
                        return ee(t, e) > -1
                    }, a, !0), l = [function (e, n, r) {
                        var i = !o && (r || n !== R) || ((t = n).nodeType ? c(e, n, r) : u(e, n, r));
                        return t = null, i
                    }]; s < i; s++) if (n = T.relative[e[s].type]) l = [h(g(l), n)]; else {
                        if (n = T.filter[e[s].type].apply(null, e[s].matches), n[H]) {
                            for (r = ++s; r < i && !T.relative[e[r].type]; r++) ;
                            return v(s > 1 && g(l), s > 1 && f(e.slice(0, s - 1).concat({value: " " === e[s - 2].type ? "*" : ""})).replace(se, "$1"), n, s < r && x(e.slice(s, r)), r < i && x(e = e.slice(r)), r < i && f(e))
                        }
                        l.push(n)
                    }
                    return g(l)
                }

                function A(e, n) {
                    var i = n.length > 0, o = e.length > 0, a = function (r, a, s, c, u) {
                        var l, d, p, f = 0, h = "0", g = r && [], m = [], v = R, x = r || o && T.find.TAG("*", u),
                            A = G += null == v ? 1 : Math.random() || .1, b = x.length;
                        for (u && (R = a === N || a || u); h !== b && null != (l = x[h]); h++) {
                            if (o && l) {
                                for (d = 0, a || l.ownerDocument === N || (M(l), s = !I); p = e[d++];) if (p(l, a || N, s)) {
                                    c.push(l);
                                    break
                                }
                                u && (G = A)
                            }
                            i && ((l = !p && l) && f--, r && g.push(l))
                        }
                        if (f += h, i && h !== f) {
                            for (d = 0; p = n[d++];) p(g, m, a, s);
                            if (r) {
                                if (f > 0) for (; h--;) g[h] || m[h] || (m[h] = Y.call(c));
                                m = y(m)
                            }
                            Z.apply(c, m), u && !r && m.length > 0 && f + n.length > 1 && t.uniqueSort(c)
                        }
                        return u && (G = A, R = v), g
                    };
                    return i ? r(a) : a
                }

                var b, w, T, E, S, C, _, k, R, L, O, M, N, D, I, P, B, U, F, H = "sizzle" + 1 * new Date,
                    j = e.document, G = 0, X = 0, V = n(), K = n(), q = n(), W = function (e, t) {
                        return e === t && (O = !0), 0
                    }, z = {}.hasOwnProperty, Q = [], Y = Q.pop, J = Q.push, Z = Q.push, $ = Q.slice, ee = function (e, t) {
                        for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
                        return -1
                    },
                    te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    ne = "[\\x20\\t\\r\\n\\f]", re = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                    ie = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + re + "))|)" + ne + "*\\]",
                    oe = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ie + ")*)|.*)\\)|)",
                    ae = new RegExp(ne + "+", "g"),
                    se = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
                    ce = new RegExp("^" + ne + "*," + ne + "*"),
                    ue = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
                    le = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"), de = new RegExp(oe),
                    pe = new RegExp("^" + re + "$"), fe = {
                        ID: new RegExp("^#(" + re + ")"),
                        CLASS: new RegExp("^\\.(" + re + ")"),
                        TAG: new RegExp("^(" + re + "|[*])"),
                        ATTR: new RegExp("^" + ie),
                        PSEUDO: new RegExp("^" + oe),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + te + ")$", "i"),
                        needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
                    }, he = /^(?:input|select|textarea|button)$/i, ge = /^h\d$/i, me = /^[^{]+\{\s*\[native \w/,
                    ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ve = /[+~]/,
                    xe = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"), Ae = function (e, t, n) {
                        var r = "0x" + t - 65536;
                        return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
                    }, be = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, we = function (e, t) {
                        return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
                    }, Te = function () {
                        M()
                    }, Ee = h(function (e) {
                        return e.disabled === !0 && ("form" in e || "label" in e)
                    }, {dir: "parentNode", next: "legend"});
                try {
                    Z.apply(Q = $.call(j.childNodes), j.childNodes), Q[j.childNodes.length].nodeType
                } catch (e) {
                    Z = {
                        apply: Q.length ? function (e, t) {
                            J.apply(e, $.call(t))
                        } : function (e, t) {
                            for (var n = e.length, r = 0; e[n++] = t[r++];) ;
                            e.length = n - 1
                        }
                    }
                }
                w = t.support = {}, S = t.isXML = function (e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return !!t && "HTML" !== t.nodeName
                }, M = t.setDocument = function (e) {
                    var t, n, r = e ? e.ownerDocument || e : j;
                    return r !== N && 9 === r.nodeType && r.documentElement ? (N = r, D = N.documentElement, I = !S(N), j !== N && (n = N.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", Te, !1) : n.attachEvent && n.attachEvent("onunload", Te)), w.attributes = i(function (e) {
                        return e.className = "i", !e.getAttribute("className")
                    }), w.getElementsByTagName = i(function (e) {
                        return e.appendChild(N.createComment("")), !e.getElementsByTagName("*").length
                    }), w.getElementsByClassName = me.test(N.getElementsByClassName), w.getById = i(function (e) {
                        return D.appendChild(e).id = H, !N.getElementsByName || !N.getElementsByName(H).length
                    }), w.getById ? (T.filter.ID = function (e) {
                        var t = e.replace(xe, Ae);
                        return function (e) {
                            return e.getAttribute("id") === t
                        }
                    }, T.find.ID = function (e, t) {
                        if ("undefined" != typeof t.getElementById && I) {
                            var n = t.getElementById(e);
                            return n ? [n] : []
                        }
                    }) : (T.filter.ID = function (e) {
                        var t = e.replace(xe, Ae);
                        return function (e) {
                            var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                            return n && n.value === t
                        }
                    }, T.find.ID = function (e, t) {
                        if ("undefined" != typeof t.getElementById && I) {
                            var n, r, i, o = t.getElementById(e);
                            if (o) {
                                if (n = o.getAttributeNode("id"), n && n.value === e) return [o];
                                for (i = t.getElementsByName(e), r = 0; o = i[r++];) if (n = o.getAttributeNode("id"), n && n.value === e) return [o]
                            }
                            return []
                        }
                    }), T.find.TAG = w.getElementsByTagName ? function (e, t) {
                        return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0
                    } : function (e, t) {
                        var n, r = [], i = 0, o = t.getElementsByTagName(e);
                        if ("*" === e) {
                            for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                            return r
                        }
                        return o
                    }, T.find.CLASS = w.getElementsByClassName && function (e, t) {
                        if ("undefined" != typeof t.getElementsByClassName && I) return t.getElementsByClassName(e)
                    }, B = [], P = [], (w.qsa = me.test(N.querySelectorAll)) && (i(function (e) {
                        D.appendChild(e).innerHTML = "<a id='" + H + "'></a><select id='" + H + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && P.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || P.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + H + "-]").length || P.push("~="), e.querySelectorAll(":checked").length || P.push(":checked"), e.querySelectorAll("a#" + H + "+*").length || P.push(".#.+[+~]")
                    }), i(function (e) {
                        e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                        var t = N.createElement("input");
                        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && P.push("name" + ne + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && P.push(":enabled", ":disabled"), D.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && P.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), P.push(",.*:")
                    })), (w.matchesSelector = me.test(U = D.matches || D.webkitMatchesSelector || D.mozMatchesSelector || D.oMatchesSelector || D.msMatchesSelector)) && i(function (e) {
                        w.disconnectedMatch = U.call(e, "*"), U.call(e, "[s!='']:x"), B.push("!=", oe)
                    }), P = P.length && new RegExp(P.join("|")), B = B.length && new RegExp(B.join("|")), t = me.test(D.compareDocumentPosition), F = t || me.test(D.contains) ? function (e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
                        return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                    } : function (e, t) {
                        if (t) for (; t = t.parentNode;) if (t === e) return !0;
                        return !1
                    }, W = t ? function (e, t) {
                        if (e === t) return O = !0, 0;
                        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                        return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !w.sortDetached && t.compareDocumentPosition(e) === n ? e === N || e.ownerDocument === j && F(j, e) ? -1 : t === N || t.ownerDocument === j && F(j, t) ? 1 : L ? ee(L, e) - ee(L, t) : 0 : 4 & n ? -1 : 1)
                    } : function (e, t) {
                        if (e === t) return O = !0, 0;
                        var n, r = 0, i = e.parentNode, o = t.parentNode, s = [e], c = [t];
                        if (!i || !o) return e === N ? -1 : t === N ? 1 : i ? -1 : o ? 1 : L ? ee(L, e) - ee(L, t) : 0;
                        if (i === o) return a(e, t);
                        for (n = e; n = n.parentNode;) s.unshift(n);
                        for (n = t; n = n.parentNode;) c.unshift(n);
                        for (; s[r] === c[r];) r++;
                        return r ? a(s[r], c[r]) : s[r] === j ? -1 : c[r] === j ? 1 : 0
                    }, N) : N
                }, t.matches = function (e, n) {
                    return t(e, null, null, n)
                }, t.matchesSelector = function (e, n) {
                    if ((e.ownerDocument || e) !== N && M(e), n = n.replace(le, "='$1']"), w.matchesSelector && I && !q[n + " "] && (!B || !B.test(n)) && (!P || !P.test(n))) try {
                        var r = U.call(e, n);
                        if (r || w.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
                    } catch (e) {
                    }
                    return t(n, N, null, [e]).length > 0
                }, t.contains = function (e, t) {
                    return (e.ownerDocument || e) !== N && M(e), F(e, t)
                }, t.attr = function (e, t) {
                    (e.ownerDocument || e) !== N && M(e);
                    var n = T.attrHandle[t.toLowerCase()],
                        r = n && z.call(T.attrHandle, t.toLowerCase()) ? n(e, t, !I) : void 0;
                    return void 0 !== r ? r : w.attributes || !I ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
                }, t.escape = function (e) {
                    return (e + "").replace(be, we)
                }, t.error = function (e) {
                    throw new Error("Syntax error, unrecognized expression: " + e)
                }, t.uniqueSort = function (e) {
                    var t, n = [], r = 0, i = 0;
                    if (O = !w.detectDuplicates, L = !w.sortStable && e.slice(0), e.sort(W), O) {
                        for (; t = e[i++];) t === e[i] && (r = n.push(i));
                        for (; r--;) e.splice(n[r], 1)
                    }
                    return L = null, e
                }, E = t.getText = function (e) {
                    var t, n = "", r = 0, i = e.nodeType;
                    if (i) {
                        if (1 === i || 9 === i || 11 === i) {
                            if ("string" == typeof e.textContent) return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling) n += E(e)
                        } else if (3 === i || 4 === i) return e.nodeValue
                    } else for (; t = e[r++];) n += E(t);
                    return n
                }, T = t.selectors = {
                    cacheLength: 50,
                    createPseudo: r,
                    match: fe,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {dir: "parentNode", first: !0},
                        " ": {dir: "parentNode"},
                        "+": {dir: "previousSibling", first: !0},
                        "~": {dir: "previousSibling"}
                    },
                    preFilter: {
                        ATTR: function (e) {
                            return e[1] = e[1].replace(xe, Ae), e[3] = (e[3] || e[4] || e[5] || "").replace(xe, Ae), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                        }, CHILD: function (e) {
                            return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                        }, PSEUDO: function (e) {
                            var t, n = !e[6] && e[2];
                            return fe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && de.test(n) && (t = C(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function (e) {
                            var t = e.replace(xe, Ae).toLowerCase();
                            return "*" === e ? function () {
                                return !0
                            } : function (e) {
                                return e.nodeName && e.nodeName.toLowerCase() === t
                            }
                        }, CLASS: function (e) {
                            var t = V[e + " "];
                            return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && V(e, function (e) {
                                return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                            })
                        }, ATTR: function (e, n, r) {
                            return function (i) {
                                var o = t.attr(i, e);
                                return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(ae, " ") + " ").indexOf(r) > -1 : "|=" === n && (o === r || o.slice(0, r.length + 1) === r + "-"))
                            }
                        }, CHILD: function (e, t, n, r, i) {
                            var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
                            return 1 === r && 0 === i ? function (e) {
                                return !!e.parentNode
                            } : function (t, n, c) {
                                var u, l, d, p, f, h, g = o !== a ? "nextSibling" : "previousSibling", m = t.parentNode,
                                    y = s && t.nodeName.toLowerCase(), v = !c && !s, x = !1;
                                if (m) {
                                    if (o) {
                                        for (; g;) {
                                            for (p = t; p = p[g];) if (s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) return !1;
                                            h = g = "only" === e && !h && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (h = [a ? m.firstChild : m.lastChild], a && v) {
                                        for (p = m, d = p[H] || (p[H] = {}), l = d[p.uniqueID] || (d[p.uniqueID] = {}), u = l[e] || [], f = u[0] === G && u[1], x = f && u[2], p = f && m.childNodes[f]; p = ++f && p && p[g] || (x = f = 0) || h.pop();) if (1 === p.nodeType && ++x && p === t) {
                                            l[e] = [G, f, x];
                                            break
                                        }
                                    } else if (v && (p = t, d = p[H] || (p[H] = {}), l = d[p.uniqueID] || (d[p.uniqueID] = {}), u = l[e] || [], f = u[0] === G && u[1], x = f), x === !1) for (; (p = ++f && p && p[g] || (x = f = 0) || h.pop()) && ((s ? p.nodeName.toLowerCase() !== y : 1 !== p.nodeType) || !++x || (v && (d = p[H] || (p[H] = {}), l = d[p.uniqueID] || (d[p.uniqueID] = {}), l[e] = [G, x]), p !== t));) ;
                                    return x -= i, x === r || x % r === 0 && x / r >= 0
                                }
                            }
                        }, PSEUDO: function (e, n) {
                            var i,
                                o = T.pseudos[e] || T.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                            return o[H] ? o(n) : o.length > 1 ? (i = [e, e, "", n], T.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function (e, t) {
                                for (var r, i = o(e, n), a = i.length; a--;) r = ee(e, i[a]), e[r] = !(t[r] = i[a])
                            }) : function (e) {
                                return o(e, 0, i)
                            }) : o
                        }
                    },
                    pseudos: {
                        not: r(function (e) {
                            var t = [], n = [], i = _(e.replace(se, "$1"));
                            return i[H] ? r(function (e, t, n, r) {
                                for (var o, a = i(e, null, r, []), s = e.length; s--;) (o = a[s]) && (e[s] = !(t[s] = o))
                            }) : function (e, r, o) {
                                return t[0] = e, i(t, null, o, n), t[0] = null, !n.pop()
                            }
                        }), has: r(function (e) {
                            return function (n) {
                                return t(e, n).length > 0
                            }
                        }), contains: r(function (e) {
                            return e = e.replace(xe, Ae), function (t) {
                                return (t.textContent || t.innerText || E(t)).indexOf(e) > -1
                            }
                        }), lang: r(function (e) {
                            return pe.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(xe, Ae).toLowerCase(), function (t) {
                                var n;
                                do if (n = I ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                        }), target: function (t) {
                            var n = e.location && e.location.hash;
                            return n && n.slice(1) === t.id
                        }, root: function (e) {
                            return e === D
                        }, focus: function (e) {
                            return e === N.activeElement && (!N.hasFocus || N.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                        }, enabled: u(!1), disabled: u(!0), checked: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && !!e.checked || "option" === t && !!e.selected
                        }, selected: function (e) {
                            return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                        }, empty: function (e) {
                            for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                            return !0
                        }, parent: function (e) {
                            return !T.pseudos.empty(e)
                        }, header: function (e) {
                            return ge.test(e.nodeName)
                        }, input: function (e) {
                            return he.test(e.nodeName)
                        }, button: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && "button" === e.type || "button" === t
                        }, text: function (e) {
                            var t;
                            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                        }, first: l(function () {
                            return [0]
                        }), last: l(function (e, t) {
                            return [t - 1]
                        }), eq: l(function (e, t, n) {
                            return [n < 0 ? n + t : n]
                        }), even: l(function (e, t) {
                            for (var n = 0; n < t; n += 2) e.push(n);
                            return e
                        }), odd: l(function (e, t) {
                            for (var n = 1; n < t; n += 2) e.push(n);
                            return e
                        }), lt: l(function (e, t, n) {
                            for (var r = n < 0 ? n + t : n; --r >= 0;) e.push(r);
                            return e
                        }), gt: l(function (e, t, n) {
                            for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                            return e
                        })
                    }
                }, T.pseudos.nth = T.pseudos.eq;
                for (b in {radio: !0, checkbox: !0, file: !0, password: !0, image: !0}) T.pseudos[b] = s(b);
                for (b in {submit: !0, reset: !0}) T.pseudos[b] = c(b);
                return p.prototype = T.filters = T.pseudos, T.setFilters = new p, C = t.tokenize = function (e, n) {
                    var r, i, o, a, s, c, u, l = K[e + " "];
                    if (l) return n ? 0 : l.slice(0);
                    for (s = e, c = [], u = T.preFilter; s;) {
                        r && !(i = ce.exec(s)) || (i && (s = s.slice(i[0].length) || s), c.push(o = [])), r = !1, (i = ue.exec(s)) && (r = i.shift(), o.push({
                            value: r,
                            type: i[0].replace(se, " ")
                        }), s = s.slice(r.length));
                        for (a in T.filter) !(i = fe[a].exec(s)) || u[a] && !(i = u[a](i)) || (r = i.shift(), o.push({
                            value: r,
                            type: a,
                            matches: i
                        }), s = s.slice(r.length));
                        if (!r) break
                    }
                    return n ? s.length : s ? t.error(e) : K(e, c).slice(0)
                }, _ = t.compile = function (e, t) {
                    var n, r = [], i = [], o = q[e + " "];
                    if (!o) {
                        for (t || (t = C(e)), n = t.length; n--;) o = x(t[n]), o[H] ? r.push(o) : i.push(o);
                        o = q(e, A(i, r)), o.selector = e
                    }
                    return o
                }, k = t.select = function (e, t, n, r) {
                    var i, o, a, s, c, u = "function" == typeof e && e, l = !r && C(e = u.selector || e);
                    if (n = n || [], 1 === l.length) {
                        if (o = l[0] = l[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && 9 === t.nodeType && I && T.relative[o[1].type]) {
                            if (t = (T.find.ID(a.matches[0].replace(xe, Ae), t) || [])[0], !t) return n;
                            u && (t = t.parentNode), e = e.slice(o.shift().value.length)
                        }
                        for (i = fe.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !T.relative[s = a.type]);) if ((c = T.find[s]) && (r = c(a.matches[0].replace(xe, Ae), ve.test(o[0].type) && d(t.parentNode) || t))) {
                            if (o.splice(i, 1), e = r.length && f(o), !e) return Z.apply(n, r), n;
                            break
                        }
                    }
                    return (u || _(e, l))(r, t, !I, n, !t || ve.test(e) && d(t.parentNode) || t), n
                }, w.sortStable = H.split("").sort(W).join("") === H, w.detectDuplicates = !!O, M(), w.sortDetached = i(function (e) {
                    return 1 & e.compareDocumentPosition(N.createElement("fieldset"))
                }), i(function (e) {
                    return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
                }) || o("type|href|height|width", function (e, t, n) {
                    if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                }), w.attributes && i(function (e) {
                    return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
                }) || o("value", function (e, t, n) {
                    if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
                }), i(function (e) {
                    return null == e.getAttribute("disabled")
                }) || o(te, function (e, t, n) {
                    var r;
                    if (!n) return e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
                }), t
            }(t);
        jQuery.find = Ce, jQuery.expr = Ce.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, jQuery.uniqueSort = jQuery.unique = Ce.uniqueSort, jQuery.text = Ce.getText, jQuery.isXMLDoc = Ce.isXML, jQuery.contains = Ce.contains, jQuery.escapeSelector = Ce.escape;
        var _e = function (e, t, n) {
            for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType;) if (1 === e.nodeType) {
                if (i && jQuery(e).is(n)) break;
                r.push(e)
            }
            return r
        }, ke = function (e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }, Re = jQuery.expr.match.needsContext, Le = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
        jQuery.filter = function (e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? jQuery.find.matchesSelector(r, e) ? [r] : [] : jQuery.find.matches(e, jQuery.grep(t, function (e) {
                return 1 === e.nodeType
            }))
        }, jQuery.fn.extend({
            find: function (e) {
                var t, n, r = this.length, i = this;
                if ("string" != typeof e) return this.pushStack(jQuery(e).filter(function () {
                    for (t = 0; t < r; t++) if (jQuery.contains(i[t], this)) return !0
                }));
                for (n = this.pushStack([]), t = 0; t < r; t++) jQuery.find(e, i[t], n);
                return r > 1 ? jQuery.uniqueSort(n) : n
            }, filter: function (e) {
                return this.pushStack(u(this, e || [], !1))
            }, not: function (e) {
                return this.pushStack(u(this, e || [], !0))
            }, is: function (e) {
                return !!u(this, "string" == typeof e && Re.test(e) ? jQuery(e) : e || [], !1).length
            }
        });
        var Oe, Me = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, Ne = jQuery.fn.init = function (e, t, n) {
            var r, i;
            if (!e) return this;
            if (n = n || Oe, "string" == typeof e) {
                if (r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : Me.exec(e), !r || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (r[1]) {
                    if (t = t instanceof jQuery ? t[0] : t, jQuery.merge(this, jQuery.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : ue, !0)), Le.test(r[1]) && jQuery.isPlainObject(t)) for (r in t) be(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                    return this
                }
                return i = ue.getElementById(r[2]), i && (this[0] = i, this.length = 1), this
            }
            return e.nodeType ? (this[0] = e, this.length = 1, this) : be(e) ? void 0 !== n.ready ? n.ready(e) : e(jQuery) : jQuery.makeArray(e, this)
        };
        Ne.prototype = jQuery.fn, Oe = jQuery(ue);
        var De = /^(?:parents|prev(?:Until|All))/, Ie = {children: !0, contents: !0, next: !0, prev: !0};
        jQuery.fn.extend({
            has: function (e) {
                var t = jQuery(e, this), n = t.length;
                return this.filter(function () {
                    for (var e = 0; e < n; e++) if (jQuery.contains(this, t[e])) return !0
                })
            }, closest: function (e, t) {
                var n, r = 0, i = this.length, o = [], a = "string" != typeof e && jQuery(e);
                if (!Re.test(e)) for (; r < i; r++) for (n = this[r]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && jQuery.find.matchesSelector(n, e))) {
                    o.push(n);
                    break
                }
                return this.pushStack(o.length > 1 ? jQuery.uniqueSort(o) : o)
            }, index: function (e) {
                return e ? "string" == typeof e ? he.call(jQuery(e), this[0]) : he.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            }, add: function (e, t) {
                return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(e, t))))
            }, addBack: function (e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }), jQuery.each({
            parent: function (e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            }, parents: function (e) {
                return _e(e, "parentNode")
            }, parentsUntil: function (e, t, n) {
                return _e(e, "parentNode", n)
            }, next: function (e) {
                return l(e, "nextSibling")
            }, prev: function (e) {
                return l(e, "previousSibling")
            }, nextAll: function (e) {
                return _e(e, "nextSibling")
            }, prevAll: function (e) {
                return _e(e, "previousSibling")
            }, nextUntil: function (e, t, n) {
                return _e(e, "nextSibling", n)
            }, prevUntil: function (e, t, n) {
                return _e(e, "previousSibling", n)
            }, siblings: function (e) {
                return ke((e.parentNode || {}).firstChild, e)
            }, children: function (e) {
                return ke(e.firstChild)
            }, contents: function (e) {
                return c(e, "iframe") ? e.contentDocument : (c(e, "template") && (e = e.content || e), jQuery.merge([], e.childNodes))
            }
        }, function (e, t) {
            jQuery.fn[e] = function (n, r) {
                var i = jQuery.map(this, t, n);
                return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = jQuery.filter(r, i)), this.length > 1 && (Ie[e] || jQuery.uniqueSort(i), De.test(e) && i.reverse()), this.pushStack(i)
            }
        });
        var Pe = /[^\x20\t\r\n\f]+/g;
        jQuery.Callbacks = function (e) {
            e = "string" == typeof e ? d(e) : jQuery.extend({}, e);
            var t, n, r, i, o = [], s = [], c = -1, u = function () {
                for (i = i || e.once, r = t = !0; s.length; c = -1) for (n = s.shift(); ++c < o.length;) o[c].apply(n[0], n[1]) === !1 && e.stopOnFalse && (c = o.length, n = !1);
                e.memory || (n = !1), t = !1, i && (o = n ? [] : "")
            }, l = {
                add: function () {
                    return o && (n && !t && (c = o.length - 1, s.push(n)), function t(n) {
                        jQuery.each(n, function (n, r) {
                            be(r) ? e.unique && l.has(r) || o.push(r) : r && r.length && "string" !== a(r) && t(r)
                        })
                    }(arguments), n && !t && u()), this
                }, remove: function () {
                    return jQuery.each(arguments, function (e, t) {
                        for (var n; (n = jQuery.inArray(t, o, n)) > -1;) o.splice(n, 1), n <= c && c--
                    }), this
                }, has: function (e) {
                    return e ? jQuery.inArray(e, o) > -1 : o.length > 0
                }, empty: function () {
                    return o && (o = []), this
                }, disable: function () {
                    return i = s = [], o = n = "", this
                }, disabled: function () {
                    return !o
                }, lock: function () {
                    return i = s = [], n || t || (o = n = ""), this
                }, locked: function () {
                    return !!i
                }, fireWith: function (e, n) {
                    return i || (n = n || [], n = [e, n.slice ? n.slice() : n], s.push(n), t || u()), this
                }, fire: function () {
                    return l.fireWith(this, arguments), this
                }, fired: function () {
                    return !!r
                }
            };
            return l
        }, jQuery.extend({
            Deferred: function (e) {
                var n = [["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]],
                    r = "pending", i = {
                        state: function () {
                            return r
                        }, always: function () {
                            return o.done(arguments).fail(arguments), this
                        }, catch: function (e) {
                            return i.then(null, e)
                        }, pipe: function () {
                            var e = arguments;
                            return jQuery.Deferred(function (t) {
                                jQuery.each(n, function (n, r) {
                                    var i = be(e[r[4]]) && e[r[4]];
                                    o[r[1]](function () {
                                        var e = i && i.apply(this, arguments);
                                        e && be(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[r[0] + "With"](this, i ? [e] : arguments)
                                    })
                                }), e = null
                            }).promise()
                        }, then: function (e, r, i) {
                            function o(e, n, r, i) {
                                return function () {
                                    var s = this, c = arguments, u = function () {
                                        var t, u;
                                        if (!(e < a)) {
                                            if (t = r.apply(s, c), t === n.promise()) throw new TypeError("Thenable self-resolution");
                                            u = t && ("object" == typeof t || "function" == typeof t) && t.then, be(u) ? i ? u.call(t, o(a, n, p, i), o(a, n, f, i)) : (a++, u.call(t, o(a, n, p, i), o(a, n, f, i), o(a, n, p, n.notifyWith))) : (r !== p && (s = void 0, c = [t]), (i || n.resolveWith)(s, c))
                                        }
                                    }, l = i ? u : function () {
                                        try {
                                            u()
                                        } catch (t) {
                                            jQuery.Deferred.exceptionHook && jQuery.Deferred.exceptionHook(t, l.stackTrace), e + 1 >= a && (r !== f && (s = void 0, c = [t]), n.rejectWith(s, c))
                                        }
                                    };
                                    e ? l() : (jQuery.Deferred.getStackHook && (l.stackTrace = jQuery.Deferred.getStackHook()), t.setTimeout(l))
                                }
                            }

                            var a = 0;
                            return jQuery.Deferred(function (t) {
                                n[0][3].add(o(0, t, be(i) ? i : p, t.notifyWith)), n[1][3].add(o(0, t, be(e) ? e : p)), n[2][3].add(o(0, t, be(r) ? r : f))
                            }).promise()
                        }, promise: function (e) {
                            return null != e ? jQuery.extend(e, i) : i
                        }
                    }, o = {};
                return jQuery.each(n, function (e, t) {
                    var a = t[2], s = t[5];
                    i[t[1]] = a.add, s && a.add(function () {
                        r = s
                    }, n[3 - e][2].disable, n[3 - e][3].disable, n[0][2].lock, n[0][3].lock), a.add(t[3].fire), o[t[0]] = function () {
                        return o[t[0] + "With"](this === o ? void 0 : this, arguments), this
                    }, o[t[0] + "With"] = a.fireWith
                }), i.promise(o), e && e.call(o, o), o
            }, when: function (e) {
                var t = arguments.length, n = t, r = Array(n), i = de.call(arguments), o = jQuery.Deferred(),
                    a = function (e) {
                        return function (n) {
                            r[e] = this, i[e] = arguments.length > 1 ? de.call(arguments) : n, --t || o.resolveWith(r, i)
                        }
                    };
                if (t <= 1 && (h(e, o.done(a(n)).resolve, o.reject, !t), "pending" === o.state() || be(i[n] && i[n].then))) return o.then();
                for (; n--;) h(i[n], a(n), o.reject);
                return o.promise()
            }
        });
        var Be = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        jQuery.Deferred.exceptionHook = function (e, n) {
            t.console && t.console.warn && e && Be.test(e.name) && t.console.warn("jQuery.Deferred exception: " + e.message, e.stack, n)
        }, jQuery.readyException = function (e) {
            t.setTimeout(function () {
                throw e
            })
        };
        var Ue = jQuery.Deferred();
        jQuery.fn.ready = function (e) {
            return Ue.then(e).catch(function (e) {
                jQuery.readyException(e)
            }), this
        }, jQuery.extend({
            isReady: !1, readyWait: 1, ready: function (e) {
                (e === !0 ? --jQuery.readyWait : jQuery.isReady) || (jQuery.isReady = !0, e !== !0 && --jQuery.readyWait > 0 || Ue.resolveWith(ue, [jQuery]))
            }
        }), jQuery.ready.then = Ue.then, "complete" === ue.readyState || "loading" !== ue.readyState && !ue.documentElement.doScroll ? t.setTimeout(jQuery.ready) : (ue.addEventListener("DOMContentLoaded", g), t.addEventListener("load", g));
        var Fe = function (e, t, n, r, i, o, s) {
            var c = 0, u = e.length, l = null == n;
            if ("object" === a(n)) {
                i = !0;
                for (c in n) Fe(e, t, c, n[c], !0, o, s)
            } else if (void 0 !== r && (i = !0, be(r) || (s = !0), l && (s ? (t.call(e, r), t = null) : (l = t, t = function (e, t, n) {
                return l.call(jQuery(e), n)
            })), t)) for (; c < u; c++) t(e[c], n, s ? r : r.call(e[c], c, t(e[c], n)));
            return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
        }, He = /^-ms-/, je = /-([a-z])/g, Ge = function (e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        };
        v.uid = 1, v.prototype = {
            cache: function (e) {
                var t = e[this.expando];
                return t || (t = {}, Ge(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                    value: t,
                    configurable: !0
                }))), t
            }, set: function (e, t, n) {
                var r, i = this.cache(e);
                if ("string" == typeof t) i[y(t)] = n; else for (r in t) i[y(r)] = t[r];
                return i
            }, get: function (e, t) {
                return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][y(t)]
            }, access: function (e, t, n) {
                return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
            }, remove: function (e, t) {
                var n, r = e[this.expando];
                if (void 0 !== r) {
                    if (void 0 !== t) {
                        Array.isArray(t) ? t = t.map(y) : (t = y(t), t = t in r ? [t] : t.match(Pe) || []), n = t.length;
                        for (; n--;) delete r[t[n]]
                    }
                    (void 0 === t || jQuery.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                }
            }, hasData: function (e) {
                var t = e[this.expando];
                return void 0 !== t && !jQuery.isEmptyObject(t)
            }
        };
        var Xe = new v, Ve = new v, Ke = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, qe = /[A-Z]/g;
        jQuery.extend({
            hasData: function (e) {
                return Ve.hasData(e) || Xe.hasData(e)
            }, data: function (e, t, n) {
                return Ve.access(e, t, n)
            }, removeData: function (e, t) {
                Ve.remove(e, t)
            }, _data: function (e, t, n) {
                return Xe.access(e, t, n)
            }, _removeData: function (e, t) {
                Xe.remove(e, t)
            }
        }), jQuery.fn.extend({
            data: function (e, t) {
                var n, r, i, o = this[0], a = o && o.attributes;
                if (void 0 === e) {
                    if (this.length && (i = Ve.get(o), 1 === o.nodeType && !Xe.get(o, "hasDataAttrs"))) {
                        for (n = a.length; n--;) a[n] && (r = a[n].name, 0 === r.indexOf("data-") && (r = y(r.slice(5)), A(o, r, i[r])));
                        Xe.set(o, "hasDataAttrs", !0)
                    }
                    return i
                }
                return "object" == typeof e ? this.each(function () {
                    Ve.set(this, e)
                }) : Fe(this, function (t) {
                    var n;
                    if (o && void 0 === t) {
                        if (n = Ve.get(o, e), void 0 !== n) return n;
                        if (n = A(o, e), void 0 !== n) return n
                    } else this.each(function () {
                        Ve.set(this, e, t)
                    })
                }, null, t, arguments.length > 1, null, !0)
            }, removeData: function (e) {
                return this.each(function () {
                    Ve.remove(this, e)
                })
            }
        }), jQuery.extend({
            queue: function (e, t, n) {
                var r;
                if (e) return t = (t || "fx") + "queue", r = Xe.get(e, t), n && (!r || Array.isArray(n) ? r = Xe.access(e, t, jQuery.makeArray(n)) : r.push(n)), r || []
            }, dequeue: function (e, t) {
                t = t || "fx";
                var n = jQuery.queue(e, t), r = n.length, i = n.shift(), o = jQuery._queueHooks(e, t), a = function () {
                    jQuery.dequeue(e, t)
                };
                "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
            }, _queueHooks: function (e, t) {
                var n = t + "queueHooks";
                return Xe.get(e, n) || Xe.access(e, n, {
                    empty: jQuery.Callbacks("once memory").add(function () {
                        Xe.remove(e, [t + "queue", n])
                    })
                })
            }
        }), jQuery.fn.extend({
            queue: function (e, t) {
                var n = 2;
                return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? jQuery.queue(this[0], e) : void 0 === t ? this : this.each(function () {
                    var n = jQuery.queue(this, e, t);
                    jQuery._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && jQuery.dequeue(this, e)
                })
            }, dequeue: function (e) {
                return this.each(function () {
                    jQuery.dequeue(this, e)
                })
            }, clearQueue: function (e) {
                return this.queue(e || "fx", [])
            }, promise: function (e, t) {
                var n, r = 1, i = jQuery.Deferred(), o = this, a = this.length, s = function () {
                    --r || i.resolveWith(o, [o])
                };
                for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) n = Xe.get(o[a], e + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
                return s(), i.promise(t)
            }
        });
        var We = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            ze = new RegExp("^(?:([+-])=|)(" + We + ")([a-z%]*)$", "i"), Qe = ["Top", "Right", "Bottom", "Left"],
            Ye = function (e, t) {
                return e = t || e, "none" === e.style.display || "" === e.style.display && jQuery.contains(e.ownerDocument, e) && "none" === jQuery.css(e, "display")
            }, Je = function (e, t, n, r) {
                var i, o, a = {};
                for (o in t) a[o] = e.style[o], e.style[o] = t[o];
                i = n.apply(e, r || []);
                for (o in t) e.style[o] = a[o];
                return i
            }, Ze = {};
        jQuery.fn.extend({
            show: function () {
                return T(this, !0)
            }, hide: function () {
                return T(this)
            }, toggle: function (e) {
                return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                    Ye(this) ? jQuery(this).show() : jQuery(this).hide()
                })
            }
        });
        var $e = /^(?:checkbox|radio)$/i, et = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
            tt = /^$|^module$|\/(?:java|ecma)script/i, nt = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        nt.optgroup = nt.option, nt.tbody = nt.tfoot = nt.colgroup = nt.caption = nt.thead, nt.th = nt.td;
        var rt = /<|&#?\w+;/;
        !function () {
            var e = ue.createDocumentFragment(), t = e.appendChild(ue.createElement("div")),
                n = ue.createElement("input");
            n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), Ae.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", Ae.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
        }();
        var it = ue.documentElement, ot = /^key/, at = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            st = /^([^.]*)(?:\.(.+)|)/;
        jQuery.event = {
            global: {}, add: function (e, t, n, r, i) {
                var o, a, s, c, u, l, d, p, f, h, g, m = Xe.get(e);
                if (m) for (n.handler && (o = n, n = o.handler, i = o.selector), i && jQuery.find.matchesSelector(it, i), n.guid || (n.guid = jQuery.guid++), (c = m.events) || (c = m.events = {}), (a = m.handle) || (a = m.handle = function (t) {
                    return "undefined" != typeof jQuery && jQuery.event.triggered !== t.type ? jQuery.event.dispatch.apply(e, arguments) : void 0
                }), t = (t || "").match(Pe) || [""], u = t.length; u--;) s = st.exec(t[u]) || [], f = g = s[1], h = (s[2] || "").split(".").sort(), f && (d = jQuery.event.special[f] || {}, f = (i ? d.delegateType : d.bindType) || f, d = jQuery.event.special[f] || {}, l = jQuery.extend({
                    type: f,
                    origType: g,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && jQuery.expr.match.needsContext.test(i),
                    namespace: h.join(".")
                }, o), (p = c[f]) || (p = c[f] = [], p.delegateCount = 0, d.setup && d.setup.call(e, r, h, a) !== !1 || e.addEventListener && e.addEventListener(f, a)), d.add && (d.add.call(e, l), l.handler.guid || (l.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, l) : p.push(l), jQuery.event.global[f] = !0)
            }, remove: function (e, t, n, r, i) {
                var o, a, s, c, u, l, d, p, f, h, g, m = Xe.hasData(e) && Xe.get(e);
                if (m && (c = m.events)) {
                    for (t = (t || "").match(Pe) || [""], u = t.length; u--;) if (s = st.exec(t[u]) || [], f = g = s[1], h = (s[2] || "").split(".").sort(), f) {
                        for (d = jQuery.event.special[f] || {}, f = (r ? d.delegateType : d.bindType) || f, p = c[f] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length; o--;) l = p[o], !i && g !== l.origType || n && n.guid !== l.guid || s && !s.test(l.namespace) || r && r !== l.selector && ("**" !== r || !l.selector) || (p.splice(o, 1), l.selector && p.delegateCount--, d.remove && d.remove.call(e, l));
                        a && !p.length && (d.teardown && d.teardown.call(e, h, m.handle) !== !1 || jQuery.removeEvent(e, f, m.handle), delete c[f])
                    } else for (f in c) jQuery.event.remove(e, f + t[u], n, r, !0);
                    jQuery.isEmptyObject(c) && Xe.remove(e, "handle events")
                }
            }, dispatch: function (e) {
                var t, n, r, i, o, a, s = jQuery.event.fix(e), c = new Array(arguments.length),
                    u = (Xe.get(this, "events") || {})[s.type] || [], l = jQuery.event.special[s.type] || {};
                for (c[0] = s, t = 1; t < arguments.length; t++) c[t] = arguments[t];
                if (s.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, s) !== !1) {
                    for (a = jQuery.event.handlers.call(this, s, u), t = 0; (i = a[t++]) && !s.isPropagationStopped();) for (s.currentTarget = i.elem, n = 0; (o = i.handlers[n++]) && !s.isImmediatePropagationStopped();) s.rnamespace && !s.rnamespace.test(o.namespace) || (s.handleObj = o, s.data = o.data, r = ((jQuery.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, c), void 0 !== r && (s.result = r) === !1 && (s.preventDefault(), s.stopPropagation()));
                    return l.postDispatch && l.postDispatch.call(this, s), s.result
                }
            }, handlers: function (e, t) {
                var n, r, i, o, a, s = [], c = t.delegateCount, u = e.target;
                if (c && u.nodeType && !("click" === e.type && e.button >= 1)) for (; u !== this; u = u.parentNode || this) if (1 === u.nodeType && ("click" !== e.type || u.disabled !== !0)) {
                    for (o = [], a = {}, n = 0; n < c; n++) r = t[n], i = r.selector + " ", void 0 === a[i] && (a[i] = r.needsContext ? jQuery(i, this).index(u) > -1 : jQuery.find(i, this, null, [u]).length), a[i] && o.push(r);
                    o.length && s.push({elem: u, handlers: o})
                }
                return u = this, c < t.length && s.push({elem: u, handlers: t.slice(c)}), s
            }, addProp: function (e, t) {
                Object.defineProperty(jQuery.Event.prototype, e, {
                    enumerable: !0,
                    configurable: !0,
                    get: be(t) ? function () {
                        if (this.originalEvent) return t(this.originalEvent)
                    } : function () {
                        if (this.originalEvent) return this.originalEvent[e]
                    },
                    set: function (t) {
                        Object.defineProperty(this, e, {enumerable: !0, configurable: !0, writable: !0, value: t})
                    }
                })
            }, fix: function (e) {
                return e[jQuery.expando] ? e : new jQuery.Event(e)
            }, special: {
                load: {noBubble: !0}, focus: {
                    trigger: function () {
                        if (this !== R() && this.focus) return this.focus(), !1
                    }, delegateType: "focusin"
                }, blur: {
                    trigger: function () {
                        if (this === R() && this.blur) return this.blur(), !1
                    }, delegateType: "focusout"
                }, click: {
                    trigger: function () {
                        if ("checkbox" === this.type && this.click && c(this, "input")) return this.click(), !1
                    }, _default: function (e) {
                        return c(e.target, "a")
                    }
                }, beforeunload: {
                    postDispatch: function (e) {
                        void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            }
        }, jQuery.removeEvent = function (e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n)
        }, jQuery.Event = function (e, t) {
            return this instanceof jQuery.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? _ : k, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && jQuery.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), void (this[jQuery.expando] = !0)) : new jQuery.Event(e, t)
        }, jQuery.Event.prototype = {
            constructor: jQuery.Event,
            isDefaultPrevented: k,
            isPropagationStopped: k,
            isImmediatePropagationStopped: k,
            isSimulated: !1,
            preventDefault: function () {
                var e = this.originalEvent;
                this.isDefaultPrevented = _, e && !this.isSimulated && e.preventDefault()
            },
            stopPropagation: function () {
                var e = this.originalEvent;
                this.isPropagationStopped = _, e && !this.isSimulated && e.stopPropagation()
            },
            stopImmediatePropagation: function () {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = _, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
            }
        }, jQuery.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            char: !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: function (e) {
                var t = e.button;
                return null == e.which && ot.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && at.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
            }
        }, jQuery.event.addProp), jQuery.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function (e, t) {
            jQuery.event.special[e] = {
                delegateType: t, bindType: t, handle: function (e) {
                    var n, r = this, i = e.relatedTarget, o = e.handleObj;
                    return i && (i === r || jQuery.contains(r, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
                }
            }
        }), jQuery.fn.extend({
            on: function (e, t, n, r) {
                return L(this, e, t, n, r)
            }, one: function (e, t, n, r) {
                return L(this, e, t, n, r, 1)
            }, off: function (e, t, n) {
                var r, i;
                if (e && e.preventDefault && e.handleObj) return r = e.handleObj, jQuery(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                if ("object" == typeof e) {
                    for (i in e) this.off(i, t, e[i]);
                    return this
                }
                return t !== !1 && "function" != typeof t || (n = t, t = void 0), n === !1 && (n = k), this.each(function () {
                    jQuery.event.remove(this, e, n, t)
                })
            }
        });
        var ct = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
            ut = /<script|<style|<link/i, lt = /checked\s*(?:[^=]|=\s*.checked.)/i,
            dt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        jQuery.extend({
            htmlPrefilter: function (e) {
                return e.replace(ct, "<$1></$2>")
            }, clone: function (e, t, n) {
                var r, i, o, a, s = e.cloneNode(!0), c = jQuery.contains(e.ownerDocument, e);
                if (!(Ae.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || jQuery.isXMLDoc(e))) for (a = E(s), o = E(e), r = 0, i = o.length; r < i; r++) I(o[r], a[r]);
                if (t) if (n) for (o = o || E(e), a = a || E(s), r = 0, i = o.length; r < i; r++) D(o[r], a[r]); else D(e, s);
                return a = E(s, "script"), a.length > 0 && S(a, !c && E(e, "script")), s
            }, cleanData: function (e) {
                for (var t, n, r, i = jQuery.event.special, o = 0; void 0 !== (n = e[o]); o++) if (Ge(n)) {
                    if (t = n[Xe.expando]) {
                        if (t.events) for (r in t.events) i[r] ? jQuery.event.remove(n, r) : jQuery.removeEvent(n, r, t.handle);
                        n[Xe.expando] = void 0
                    }
                    n[Ve.expando] && (n[Ve.expando] = void 0)
                }
            }
        }), jQuery.fn.extend({
            detach: function (e) {
                return B(this, e, !0)
            }, remove: function (e) {
                return B(this, e)
            }, text: function (e) {
                return Fe(this, function (e) {
                    return void 0 === e ? jQuery.text(this) : this.empty().each(function () {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                    })
                }, null, e, arguments.length)
            }, append: function () {
                return P(this, arguments, function (e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = O(this, e);
                        t.appendChild(e)
                    }
                })
            }, prepend: function () {
                return P(this, arguments, function (e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = O(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            }, before: function () {
                return P(this, arguments, function (e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            }, after: function () {
                return P(this, arguments, function (e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            }, empty: function () {
                for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (jQuery.cleanData(E(e, !1)), e.textContent = "");
                return this
            }, clone: function (e, t) {
                return e = null != e && e, t = null == t ? e : t, this.map(function () {
                    return jQuery.clone(this, e, t)
                })
            }, html: function (e) {
                return Fe(this, function (e) {
                    var t = this[0] || {}, n = 0, r = this.length;
                    if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                    if ("string" == typeof e && !ut.test(e) && !nt[(et.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = jQuery.htmlPrefilter(e);
                        try {
                            for (; n < r; n++) t = this[n] || {}, 1 === t.nodeType && (jQuery.cleanData(E(t, !1)), t.innerHTML = e);
                            t = 0
                        } catch (e) {
                        }
                    }
                    t && this.empty().append(e)
                }, null, e, arguments.length)
            }, replaceWith: function () {
                var e = [];
                return P(this, arguments, function (t) {
                    var n = this.parentNode;
                    jQuery.inArray(this, e) < 0 && (jQuery.cleanData(E(this)), n && n.replaceChild(t, this))
                }, e)
            }
        }), jQuery.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function (e, t) {
            jQuery.fn[e] = function (e) {
                for (var n, r = [], i = jQuery(e), o = i.length - 1, a = 0; a <= o; a++) n = a === o ? this : this.clone(!0), jQuery(i[a])[t](n), fe.apply(r, n.get());
                return this.pushStack(r)
            }
        });
        var pt = new RegExp("^(" + We + ")(?!px)[a-z%]+$", "i"), ft = function (e) {
            var n = e.ownerDocument.defaultView;
            return n && n.opener || (n = t), n.getComputedStyle(e)
        }, ht = new RegExp(Qe.join("|"), "i");
        !function () {
            function e() {
                if (u) {
                    c.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", u.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", it.appendChild(c).appendChild(u);
                    var e = t.getComputedStyle(u);
                    r = "1%" !== e.top, s = 12 === n(e.marginLeft), u.style.right = "60%", a = 36 === n(e.right), i = 36 === n(e.width), u.style.position = "absolute", o = 36 === u.offsetWidth || "absolute", it.removeChild(c), u = null
                }
            }

            function n(e) {
                return Math.round(parseFloat(e))
            }

            var r, i, o, a, s, c = ue.createElement("div"), u = ue.createElement("div");
            u.style && (u.style.backgroundClip = "content-box", u.cloneNode(!0).style.backgroundClip = "", Ae.clearCloneStyle = "content-box" === u.style.backgroundClip, jQuery.extend(Ae, {
                boxSizingReliable: function () {
                    return e(), i
                }, pixelBoxStyles: function () {
                    return e(), a
                }, pixelPosition: function () {
                    return e(), r
                }, reliableMarginLeft: function () {
                    return e(), s
                }, scrollboxSize: function () {
                    return e(), o
                }
            }))
        }();
        var gt = /^(none|table(?!-c[ea]).+)/, mt = /^--/,
            yt = {position: "absolute", visibility: "hidden", display: "block"},
            vt = {letterSpacing: "0", fontWeight: "400"}, xt = ["Webkit", "Moz", "ms"],
            At = ue.createElement("div").style;
        jQuery.extend({
            cssHooks: {
                opacity: {
                    get: function (e, t) {
                        if (t) {
                            var n = U(e, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {},
            style: function (e, t, n, r) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var i, o, a, s = y(t), c = mt.test(t), u = e.style;
                    return c || (t = j(s)), a = jQuery.cssHooks[t] || jQuery.cssHooks[s], void 0 === n ? a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : u[t] : (o = typeof n, "string" === o && (i = ze.exec(n)) && i[1] && (n = b(e, t, i), o = "number"), null != n && n === n && ("number" === o && (n += i && i[3] || (jQuery.cssNumber[s] ? "" : "px")), Ae.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (c ? u.setProperty(t, n) : u[t] = n)), void 0)
                }
            },
            css: function (e, t, n, r) {
                var i, o, a, s = y(t), c = mt.test(t);
                return c || (t = j(s)), a = jQuery.cssHooks[t] || jQuery.cssHooks[s], a && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = U(e, t, r)), "normal" === i && t in vt && (i = vt[t]), "" === n || n ? (o = parseFloat(i), n === !0 || isFinite(o) ? o || 0 : i) : i
            }
        }), jQuery.each(["height", "width"], function (e, t) {
            jQuery.cssHooks[t] = {
                get: function (e, n, r) {
                    if (n) return !gt.test(jQuery.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? V(e, t, r) : Je(e, yt, function () {
                        return V(e, t, r)
                    })
                }, set: function (e, n, r) {
                    var i, o = ft(e), a = "border-box" === jQuery.css(e, "boxSizing", !1, o), s = r && X(e, t, r, a, o);
                    return a && Ae.scrollboxSize() === o.position && (s -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - X(e, t, "border", !1, o) - .5)), s && (i = ze.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n, n = jQuery.css(e, t)), G(e, n, s)
                }
            }
        }), jQuery.cssHooks.marginLeft = F(Ae.reliableMarginLeft, function (e, t) {
            if (t) return (parseFloat(U(e, "marginLeft")) || e.getBoundingClientRect().left - Je(e, {marginLeft: 0}, function () {
                return e.getBoundingClientRect().left
            })) + "px"
        }), jQuery.each({margin: "", padding: "", border: "Width"}, function (e, t) {
            jQuery.cssHooks[e + t] = {
                expand: function (n) {
                    for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) i[e + Qe[r] + t] = o[r] || o[r - 2] || o[0];
                    return i
                }
            }, "margin" !== e && (jQuery.cssHooks[e + t].set = G)
        }), jQuery.fn.extend({
            css: function (e, t) {
                return Fe(this, function (e, t, n) {
                    var r, i, o = {}, a = 0;
                    if (Array.isArray(t)) {
                        for (r = ft(e), i = t.length; a < i; a++) o[t[a]] = jQuery.css(e, t[a], !1, r);
                        return o
                    }
                    return void 0 !== n ? jQuery.style(e, t, n) : jQuery.css(e, t)
                }, e, t, arguments.length > 1)
            }
        }), jQuery.Tween = K, K.prototype = {
            constructor: K, init: function (e, t, n, r, i, o) {
                this.elem = e, this.prop = n, this.easing = i || jQuery.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (jQuery.cssNumber[n] ? "" : "px")
            }, cur: function () {
                var e = K.propHooks[this.prop];
                return e && e.get ? e.get(this) : K.propHooks._default.get(this)
            }, run: function (e) {
                var t, n = K.propHooks[this.prop];
                return this.options.duration ? this.pos = t = jQuery.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : K.propHooks._default.set(this), this
            }
        }, K.prototype.init.prototype = K.prototype, K.propHooks = {
            _default: {
                get: function (e) {
                    var t;
                    return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = jQuery.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
                }, set: function (e) {
                    jQuery.fx.step[e.prop] ? jQuery.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[jQuery.cssProps[e.prop]] && !jQuery.cssHooks[e.prop] ? e.elem[e.prop] = e.now : jQuery.style(e.elem, e.prop, e.now + e.unit)
                }
            }
        }, K.propHooks.scrollTop = K.propHooks.scrollLeft = {
            set: function (e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        }, jQuery.easing = {
            linear: function (e) {
                return e
            }, swing: function (e) {
                return .5 - Math.cos(e * Math.PI) / 2
            }, _default: "swing"
        }, jQuery.fx = K.prototype.init, jQuery.fx.step = {};
        var bt, wt, Tt = /^(?:toggle|show|hide)$/, Et = /queueHooks$/;
        jQuery.Animation = jQuery.extend(Z, {
            tweeners: {
                "*": [function (e, t) {
                    var n = this.createTween(e, t);
                    return b(n.elem, e, ze.exec(t), n), n
                }]
            }, tweener: function (e, t) {
                be(e) ? (t = e, e = ["*"]) : e = e.match(Pe);
                for (var n, r = 0, i = e.length; r < i; r++) n = e[r], Z.tweeners[n] = Z.tweeners[n] || [], Z.tweeners[n].unshift(t)
            }, prefilters: [Y], prefilter: function (e, t) {
                t ? Z.prefilters.unshift(e) : Z.prefilters.push(e)
            }
        }), jQuery.speed = function (e, t, n) {
            var r = e && "object" == typeof e ? jQuery.extend({}, e) : {
                complete: n || !n && t || be(e) && e,
                duration: e,
                easing: n && t || t && !be(t) && t
            };
            return jQuery.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in jQuery.fx.speeds ? r.duration = jQuery.fx.speeds[r.duration] : r.duration = jQuery.fx.speeds._default), null != r.queue && r.queue !== !0 || (r.queue = "fx"), r.old = r.complete, r.complete = function () {
                be(r.old) && r.old.call(this), r.queue && jQuery.dequeue(this, r.queue)
            }, r
        }, jQuery.fn.extend({
            fadeTo: function (e, t, n, r) {
                return this.filter(Ye).css("opacity", 0).show().end().animate({opacity: t}, e, n, r)
            }, animate: function (e, t, n, r) {
                var i = jQuery.isEmptyObject(e), o = jQuery.speed(t, n, r), a = function () {
                    var t = Z(this, jQuery.extend({}, e), o);
                    (i || Xe.get(this, "finish")) && t.stop(!0)
                };
                return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
            }, stop: function (e, t, n) {
                var r = function (e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                    var t = !0, i = null != e && e + "queueHooks", o = jQuery.timers, a = Xe.get(this);
                    if (i) a[i] && a[i].stop && r(a[i]); else for (i in a) a[i] && a[i].stop && Et.test(i) && r(a[i]);
                    for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                    !t && n || jQuery.dequeue(this, e)
                })
            }, finish: function (e) {
                return e !== !1 && (e = e || "fx"), this.each(function () {
                    var t, n = Xe.get(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = jQuery.timers,
                        a = r ? r.length : 0;
                    for (n.finish = !0, jQuery.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                    for (t = 0; t < a; t++) r[t] && r[t].finish && r[t].finish.call(this);
                    delete n.finish
                })
            }
        }), jQuery.each(["toggle", "show", "hide"], function (e, t) {
            var n = jQuery.fn[t];
            jQuery.fn[t] = function (e, r, i) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(z(t, !0), e, r, i)
            }
        }), jQuery.each({
            slideDown: z("show"),
            slideUp: z("hide"),
            slideToggle: z("toggle"),
            fadeIn: {opacity: "show"},
            fadeOut: {opacity: "hide"},
            fadeToggle: {opacity: "toggle"}
        }, function (e, t) {
            jQuery.fn[e] = function (e, n, r) {
                return this.animate(t, e, n, r)
            }
        }), jQuery.timers = [], jQuery.fx.tick = function () {
            var e, t = 0, n = jQuery.timers;
            for (bt = Date.now(); t < n.length; t++) e = n[t], e() || n[t] !== e || n.splice(t--, 1);
            n.length || jQuery.fx.stop(), bt = void 0
        }, jQuery.fx.timer = function (e) {
            jQuery.timers.push(e), jQuery.fx.start()
        }, jQuery.fx.interval = 13, jQuery.fx.start = function () {
            wt || (wt = !0, q())
        }, jQuery.fx.stop = function () {
            wt = null
        }, jQuery.fx.speeds = {slow: 600, fast: 200, _default: 400}, jQuery.fn.delay = function (e, n) {
            return e = jQuery.fx ? jQuery.fx.speeds[e] || e : e, n = n || "fx", this.queue(n, function (n, r) {
                var i = t.setTimeout(n, e);
                r.stop = function () {
                    t.clearTimeout(i)
                }
            })
        }, function () {
            var e = ue.createElement("input"), t = ue.createElement("select"),
                n = t.appendChild(ue.createElement("option"));
            e.type = "checkbox", Ae.checkOn = "" !== e.value, Ae.optSelected = n.selected, e = ue.createElement("input"), e.value = "t", e.type = "radio", Ae.radioValue = "t" === e.value
        }();
        var St, Ct = jQuery.expr.attrHandle;
        jQuery.fn.extend({
            attr: function (e, t) {
                return Fe(this, jQuery.attr, e, t, arguments.length > 1)
            }, removeAttr: function (e) {
                return this.each(function () {
                    jQuery.removeAttr(this, e)
                })
            }
        }), jQuery.extend({
            attr: function (e, t, n) {
                var r, i, o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? jQuery.prop(e, t, n) : (1 === o && jQuery.isXMLDoc(e) || (i = jQuery.attrHooks[t.toLowerCase()] || (jQuery.expr.match.bool.test(t) ? St : void 0)), void 0 !== n ? null === n ? void jQuery.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : (r = jQuery.find.attr(e, t), null == r ? void 0 : r))
            }, attrHooks: {
                type: {
                    set: function (e, t) {
                        if (!Ae.radioValue && "radio" === t && c(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t), n && (e.value = n), t
                        }
                    }
                }
            }, removeAttr: function (e, t) {
                var n, r = 0, i = t && t.match(Pe);
                if (i && 1 === e.nodeType) for (; n = i[r++];) e.removeAttribute(n)
            }
        }), St = {
            set: function (e, t, n) {
                return t === !1 ? jQuery.removeAttr(e, n) : e.setAttribute(n, n), n
            }
        }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (e, t) {
            var n = Ct[t] || jQuery.find.attr;
            Ct[t] = function (e, t, r) {
                var i, o, a = t.toLowerCase();
                return r || (o = Ct[a], Ct[a] = i, i = null != n(e, t, r) ? a : null, Ct[a] = o), i
            }
        });
        var _t = /^(?:input|select|textarea|button)$/i, kt = /^(?:a|area)$/i;
        jQuery.fn.extend({
            prop: function (e, t) {
                return Fe(this, jQuery.prop, e, t, arguments.length > 1)
            }, removeProp: function (e) {
                return this.each(function () {
                    delete this[jQuery.propFix[e] || e]
                })
            }
        }), jQuery.extend({
            prop: function (e, t, n) {
                var r, i, o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return 1 === o && jQuery.isXMLDoc(e) || (t = jQuery.propFix[t] || t, i = jQuery.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
            }, propHooks: {
                tabIndex: {
                    get: function (e) {
                        var t = jQuery.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : _t.test(e.nodeName) || kt.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            }, propFix: {for: "htmlFor", class: "className"}
        }), Ae.optSelected || (jQuery.propHooks.selected = {
            get: function (e) {
                var t = e.parentNode;
                return t && t.parentNode && t.parentNode.selectedIndex, null
            }, set: function (e) {
                var t = e.parentNode;
                t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
            }
        }), jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
            jQuery.propFix[this.toLowerCase()] = this
        }), jQuery.fn.extend({
            addClass: function (e) {
                var t, n, r, i, o, a, s, c = 0;
                if (be(e)) return this.each(function (t) {
                    jQuery(this).addClass(e.call(this, t, ee(this)))
                });
                if (t = te(e), t.length) for (; n = this[c++];) if (i = ee(n), r = 1 === n.nodeType && " " + $(i) + " ") {
                    for (a = 0; o = t[a++];) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                    s = $(r), i !== s && n.setAttribute("class", s)
                }
                return this
            }, removeClass: function (e) {
                var t, n, r, i, o, a, s, c = 0;
                if (be(e)) return this.each(function (t) {
                    jQuery(this).removeClass(e.call(this, t, ee(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if (t = te(e), t.length) for (; n = this[c++];) if (i = ee(n), r = 1 === n.nodeType && " " + $(i) + " ") {
                    for (a = 0; o = t[a++];) for (; r.indexOf(" " + o + " ") > -1;) r = r.replace(" " + o + " ", " ");
                    s = $(r), i !== s && n.setAttribute("class", s)
                }
                return this
            }, toggleClass: function (e, t) {
                var n = typeof e, r = "string" === n || Array.isArray(e);
                return "boolean" == typeof t && r ? t ? this.addClass(e) : this.removeClass(e) : be(e) ? this.each(function (n) {
                    jQuery(this).toggleClass(e.call(this, n, ee(this), t), t)
                }) : this.each(function () {
                    var t, i, o, a;
                    if (r) for (i = 0, o = jQuery(this), a = te(e); t = a[i++];) o.hasClass(t) ? o.removeClass(t) : o.addClass(t); else void 0 !== e && "boolean" !== n || (t = ee(this), t && Xe.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || e === !1 ? "" : Xe.get(this, "__className__") || ""))
                })
            }, hasClass: function (e) {
                var t, n, r = 0;
                for (t = " " + e + " "; n = this[r++];) if (1 === n.nodeType && (" " + $(ee(n)) + " ").indexOf(t) > -1) return !0;
                return !1
            }
        });
        var Rt = /\r/g;
        jQuery.fn.extend({
            val: function (e) {
                var t, n, r, i = this[0];
                {
                    if (arguments.length) return r = be(e), this.each(function (n) {
                        var i;
                        1 === this.nodeType && (i = r ? e.call(this, n, jQuery(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : Array.isArray(i) && (i = jQuery.map(i, function (e) {
                            return null == e ? "" : e + ""
                        })), t = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                    });
                    if (i) return t = jQuery.valHooks[i.type] || jQuery.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(Rt, "") : null == n ? "" : n)
                }
            }
        }), jQuery.extend({
            valHooks: {
                option: {
                    get: function (e) {
                        var t = jQuery.find.attr(e, "value");
                        return null != t ? t : $(jQuery.text(e))
                    }
                }, select: {
                    get: function (e) {
                        var t, n, r, i = e.options, o = e.selectedIndex, a = "select-one" === e.type, s = a ? null : [],
                            u = a ? o + 1 : i.length;
                        for (r = o < 0 ? u : a ? o : 0; r < u; r++) if (n = i[r], (n.selected || r === o) && !n.disabled && (!n.parentNode.disabled || !c(n.parentNode, "optgroup"))) {
                            if (t = jQuery(n).val(), a) return t;
                            s.push(t)
                        }
                        return s
                    }, set: function (e, t) {
                        for (var n, r, i = e.options, o = jQuery.makeArray(t), a = i.length; a--;) r = i[a], (r.selected = jQuery.inArray(jQuery.valHooks.option.get(r), o) > -1) && (n = !0);
                        return n || (e.selectedIndex = -1), o
                    }
                }
            }
        }), jQuery.each(["radio", "checkbox"], function () {
            jQuery.valHooks[this] = {
                set: function (e, t) {
                    if (Array.isArray(t)) return e.checked = jQuery.inArray(jQuery(e).val(), t) > -1
                }
            }, Ae.checkOn || (jQuery.valHooks[this].get = function (e) {
                return null === e.getAttribute("value") ? "on" : e.value
            })
        }), Ae.focusin = "onfocusin" in t;
        var Lt = /^(?:focusinfocus|focusoutblur)$/, Ot = function (e) {
            e.stopPropagation()
        };
        jQuery.extend(jQuery.event, {
            trigger: function (e, n, r, i) {
                var o, a, s, c, u, l, d, p, f = [r || ue], h = ye.call(e, "type") ? e.type : e,
                    g = ye.call(e, "namespace") ? e.namespace.split(".") : [];
                if (a = p = s = r = r || ue, 3 !== r.nodeType && 8 !== r.nodeType && !Lt.test(h + jQuery.event.triggered) && (h.indexOf(".") > -1 && (g = h.split("."), h = g.shift(), g.sort()), u = h.indexOf(":") < 0 && "on" + h, e = e[jQuery.expando] ? e : new jQuery.Event(h, "object" == typeof e && e), e.isTrigger = i ? 2 : 3, e.namespace = g.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = r), n = null == n ? [e] : jQuery.makeArray(n, [e]), d = jQuery.event.special[h] || {}, i || !d.trigger || d.trigger.apply(r, n) !== !1)) {
                    if (!i && !d.noBubble && !we(r)) {
                        for (c = d.delegateType || h, Lt.test(c + h) || (a = a.parentNode); a; a = a.parentNode) f.push(a), s = a;
                        s === (r.ownerDocument || ue) && f.push(s.defaultView || s.parentWindow || t)
                    }
                    for (o = 0; (a = f[o++]) && !e.isPropagationStopped();) p = a, e.type = o > 1 ? c : d.bindType || h, l = (Xe.get(a, "events") || {})[e.type] && Xe.get(a, "handle"), l && l.apply(a, n), l = u && a[u], l && l.apply && Ge(a) && (e.result = l.apply(a, n), e.result === !1 && e.preventDefault());
                    return e.type = h, i || e.isDefaultPrevented() || d._default && d._default.apply(f.pop(), n) !== !1 || !Ge(r) || u && be(r[h]) && !we(r) && (s = r[u], s && (r[u] = null), jQuery.event.triggered = h, e.isPropagationStopped() && p.addEventListener(h, Ot), r[h](), e.isPropagationStopped() && p.removeEventListener(h, Ot), jQuery.event.triggered = void 0, s && (r[u] = s)), e.result
                }
            }, simulate: function (e, t, n) {
                var r = jQuery.extend(new jQuery.Event, n, {type: e, isSimulated: !0});
                jQuery.event.trigger(r, null, t)
            }
        }), jQuery.fn.extend({
            trigger: function (e, t) {
                return this.each(function () {
                    jQuery.event.trigger(e, t, this)
                })
            }, triggerHandler: function (e, t) {
                var n = this[0];
                if (n) return jQuery.event.trigger(e, t, n, !0)
            }
        }), Ae.focusin || jQuery.each({focus: "focusin", blur: "focusout"}, function (e, t) {
            var n = function (e) {
                jQuery.event.simulate(t, e.target, jQuery.event.fix(e))
            };
            jQuery.event.special[t] = {
                setup: function () {
                    var r = this.ownerDocument || this, i = Xe.access(r, t);
                    i || r.addEventListener(e, n, !0), Xe.access(r, t, (i || 0) + 1)
                }, teardown: function () {
                    var r = this.ownerDocument || this, i = Xe.access(r, t) - 1;
                    i ? Xe.access(r, t, i) : (r.removeEventListener(e, n, !0), Xe.remove(r, t))
                }
            }
        });
        var Mt = t.location, Nt = Date.now(), Dt = /\?/;
        jQuery.parseXML = function (e) {
            var n;
            if (!e || "string" != typeof e) return null;
            try {
                n = (new t.DOMParser).parseFromString(e, "text/xml")
            } catch (e) {
                n = void 0
            }
            return n && !n.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + e), n
        };
        var It = /\[\]$/, Pt = /\r?\n/g, Bt = /^(?:submit|button|image|reset|file)$/i,
            Ut = /^(?:input|select|textarea|keygen)/i;
        jQuery.param = function (e, t) {
            var n, r = [], i = function (e, t) {
                var n = be(t) ? t() : t;
                r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
            };
            if (Array.isArray(e) || e.jquery && !jQuery.isPlainObject(e)) jQuery.each(e, function () {
                i(this.name, this.value)
            }); else for (n in e) ne(n, e[n], t, i);
            return r.join("&")
        }, jQuery.fn.extend({
            serialize: function () {
                return jQuery.param(this.serializeArray())
            }, serializeArray: function () {
                return this.map(function () {
                    var e = jQuery.prop(this, "elements");
                    return e ? jQuery.makeArray(e) : this
                }).filter(function () {
                    var e = this.type;
                    return this.name && !jQuery(this).is(":disabled") && Ut.test(this.nodeName) && !Bt.test(e) && (this.checked || !$e.test(e))
                }).map(function (e, t) {
                    var n = jQuery(this).val();
                    return null == n ? null : Array.isArray(n) ? jQuery.map(n, function (e) {
                        return {name: t.name, value: e.replace(Pt, "\r\n")}
                    }) : {name: t.name, value: n.replace(Pt, "\r\n")}
                }).get()
            }
        });
        var Ft = /%20/g, Ht = /#.*$/, jt = /([?&])_=[^&]*/, Gt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            Xt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Vt = /^(?:GET|HEAD)$/, Kt = /^\/\//,
            qt = {}, Wt = {}, zt = "*/".concat("*"), Qt = ue.createElement("a");
        Qt.href = Mt.href, jQuery.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: Mt.href,
                type: "GET",
                isLocal: Xt.test(Mt.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": zt,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
                responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
                converters: {"* text": String, "text html": !0, "text json": JSON.parse, "text xml": jQuery.parseXML},
                flatOptions: {url: !0, context: !0}
            },
            ajaxSetup: function (e, t) {
                return t ? oe(oe(e, jQuery.ajaxSettings), t) : oe(jQuery.ajaxSettings, e)
            },
            ajaxPrefilter: re(qt),
            ajaxTransport: re(Wt),
            ajax: function (e, n) {
                function r(e, n, r, s) {
                    var u, p, f, A, b, w = n;
                    l || (l = !0, c && t.clearTimeout(c), i = void 0, a = s || "", T.readyState = e > 0 ? 4 : 0, u = e >= 200 && e < 300 || 304 === e, r && (A = ae(h, T, r)), A = se(h, A, T, u), u ? (h.ifModified && (b = T.getResponseHeader("Last-Modified"), b && (jQuery.lastModified[o] = b), b = T.getResponseHeader("etag"), b && (jQuery.etag[o] = b)), 204 === e || "HEAD" === h.type ? w = "nocontent" : 304 === e ? w = "notmodified" : (w = A.state, p = A.data, f = A.error, u = !f)) : (f = w, !e && w || (w = "error", e < 0 && (e = 0))), T.status = e, T.statusText = (n || w) + "", u ? y.resolveWith(g, [p, w, T]) : y.rejectWith(g, [T, w, f]), T.statusCode(x), x = void 0, d && m.trigger(u ? "ajaxSuccess" : "ajaxError", [T, h, u ? p : f]), v.fireWith(g, [T, w]), d && (m.trigger("ajaxComplete", [T, h]), --jQuery.active || jQuery.event.trigger("ajaxStop")))
                }

                "object" == typeof e && (n = e, e = void 0), n = n || {};
                var i, o, a, s, c, u, l, d, p, f, h = jQuery.ajaxSetup({}, n), g = h.context || h,
                    m = h.context && (g.nodeType || g.jquery) ? jQuery(g) : jQuery.event, y = jQuery.Deferred(),
                    v = jQuery.Callbacks("once memory"), x = h.statusCode || {}, A = {}, b = {}, w = "canceled", T = {
                        readyState: 0, getResponseHeader: function (e) {
                            var t;
                            if (l) {
                                if (!s) for (s = {}; t = Gt.exec(a);) s[t[1].toLowerCase()] = t[2];
                                t = s[e.toLowerCase()]
                            }
                            return null == t ? null : t
                        }, getAllResponseHeaders: function () {
                            return l ? a : null
                        }, setRequestHeader: function (e, t) {
                            return null == l && (e = b[e.toLowerCase()] = b[e.toLowerCase()] || e, A[e] = t), this
                        }, overrideMimeType: function (e) {
                            return null == l && (h.mimeType = e), this
                        }, statusCode: function (e) {
                            var t;
                            if (e) if (l) T.always(e[T.status]); else for (t in e) x[t] = [x[t], e[t]];
                            return this
                        }, abort: function (e) {
                            var t = e || w;
                            return i && i.abort(t), r(0, t), this
                        }
                    };
                if (y.promise(T), h.url = ((e || h.url || Mt.href) + "").replace(Kt, Mt.protocol + "//"), h.type = n.method || n.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(Pe) || [""], null == h.crossDomain) {
                    u = ue.createElement("a");
                    try {
                        u.href = h.url, u.href = u.href, h.crossDomain = Qt.protocol + "//" + Qt.host != u.protocol + "//" + u.host
                    } catch (e) {
                        h.crossDomain = !0
                    }
                }
                if (h.data && h.processData && "string" != typeof h.data && (h.data = jQuery.param(h.data, h.traditional)), ie(qt, h, n, T), l) return T;
                d = jQuery.event && h.global, d && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Vt.test(h.type), o = h.url.replace(Ht, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(Ft, "+")) : (f = h.url.slice(o.length), h.data && (h.processData || "string" == typeof h.data) && (o += (Dt.test(o) ? "&" : "?") + h.data, delete h.data), h.cache === !1 && (o = o.replace(jt, "$1"), f = (Dt.test(o) ? "&" : "?") + "_=" + Nt++ + f), h.url = o + f), h.ifModified && (jQuery.lastModified[o] && T.setRequestHeader("If-Modified-Since", jQuery.lastModified[o]), jQuery.etag[o] && T.setRequestHeader("If-None-Match", jQuery.etag[o])), (h.data && h.hasContent && h.contentType !== !1 || n.contentType) && T.setRequestHeader("Content-Type", h.contentType), T.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + zt + "; q=0.01" : "") : h.accepts["*"]);
                for (p in h.headers) T.setRequestHeader(p, h.headers[p]);
                if (h.beforeSend && (h.beforeSend.call(g, T, h) === !1 || l)) return T.abort();
                if (w = "abort", v.add(h.complete), T.done(h.success), T.fail(h.error), i = ie(Wt, h, n, T)) {
                    if (T.readyState = 1, d && m.trigger("ajaxSend", [T, h]), l) return T;
                    h.async && h.timeout > 0 && (c = t.setTimeout(function () {
                        T.abort("timeout")
                    }, h.timeout));
                    try {
                        l = !1, i.send(A, r)
                    } catch (e) {
                        if (l) throw e;
                        r(-1, e)
                    }
                } else r(-1, "No Transport");
                return T
            },
            getJSON: function (e, t, n) {
                return jQuery.get(e, t, n, "json")
            },
            getScript: function (e, t) {
                return jQuery.get(e, void 0, t, "script")
            }
        }), jQuery.each(["get", "post"], function (e, t) {
            jQuery[t] = function (e, n, r, i) {
                return be(n) && (i = i || r,
                    r = n, n = void 0), jQuery.ajax(jQuery.extend({
                    url: e,
                    type: t,
                    dataType: i,
                    data: n,
                    success: r
                }, jQuery.isPlainObject(e) && e))
            }
        }), jQuery._evalUrl = function (e) {
            return jQuery.ajax({url: e, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, throws: !0})
        }, jQuery.fn.extend({
            wrapAll: function (e) {
                var t;
                return this[0] && (be(e) && (e = e.call(this[0])), t = jQuery(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                    for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                    return e
                }).append(this)), this
            }, wrapInner: function (e) {
                return be(e) ? this.each(function (t) {
                    jQuery(this).wrapInner(e.call(this, t))
                }) : this.each(function () {
                    var t = jQuery(this), n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            }, wrap: function (e) {
                var t = be(e);
                return this.each(function (n) {
                    jQuery(this).wrapAll(t ? e.call(this, n) : e)
                })
            }, unwrap: function (e) {
                return this.parent(e).not("body").each(function () {
                    jQuery(this).replaceWith(this.childNodes)
                }), this
            }
        }), jQuery.expr.pseudos.hidden = function (e) {
            return !jQuery.expr.pseudos.visible(e)
        }, jQuery.expr.pseudos.visible = function (e) {
            return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
        }, jQuery.ajaxSettings.xhr = function () {
            try {
                return new t.XMLHttpRequest
            } catch (e) {
            }
        };
        var Yt = {0: 200, 1223: 204}, Jt = jQuery.ajaxSettings.xhr();
        Ae.cors = !!Jt && "withCredentials" in Jt, Ae.ajax = Jt = !!Jt, jQuery.ajaxTransport(function (e) {
            var n, r;
            if (Ae.cors || Jt && !e.crossDomain) return {
                send: function (i, o) {
                    var a, s = e.xhr();
                    if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (a in e.xhrFields) s[a] = e.xhrFields[a];
                    e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    for (a in i) s.setRequestHeader(a, i[a]);
                    n = function (e) {
                        return function () {
                            n && (n = r = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(Yt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {binary: s.response} : {text: s.responseText}, s.getAllResponseHeaders()))
                        }
                    }, s.onload = n(), r = s.onerror = s.ontimeout = n("error"), void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function () {
                        4 === s.readyState && t.setTimeout(function () {
                            n && r()
                        })
                    }, n = n("abort");
                    try {
                        s.send(e.hasContent && e.data || null)
                    } catch (e) {
                        if (n) throw e
                    }
                }, abort: function () {
                    n && n()
                }
            }
        }), jQuery.ajaxPrefilter(function (e) {
            e.crossDomain && (e.contents.script = !1)
        }), jQuery.ajaxSetup({
            accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
            contents: {script: /\b(?:java|ecma)script\b/},
            converters: {
                "text script": function (e) {
                    return jQuery.globalEval(e), e
                }
            }
        }), jQuery.ajaxPrefilter("script", function (e) {
            void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
        }), jQuery.ajaxTransport("script", function (e) {
            if (e.crossDomain) {
                var t, n;
                return {
                    send: function (r, i) {
                        t = jQuery("<script>").prop({
                            charset: e.scriptCharset,
                            src: e.url
                        }).on("load error", n = function (e) {
                            t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
                        }), ue.head.appendChild(t[0])
                    }, abort: function () {
                        n && n()
                    }
                }
            }
        });
        var Zt = [], $t = /(=)\?(?=&|$)|\?\?/;
        jQuery.ajaxSetup({
            jsonp: "callback", jsonpCallback: function () {
                var e = Zt.pop() || jQuery.expando + "_" + Nt++;
                return this[e] = !0, e
            }
        }), jQuery.ajaxPrefilter("json jsonp", function (e, n, r) {
            var i, o, a,
                s = e.jsonp !== !1 && ($t.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && $t.test(e.data) && "data");
            if (s || "jsonp" === e.dataTypes[0]) return i = e.jsonpCallback = be(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace($t, "$1" + i) : e.jsonp !== !1 && (e.url += (Dt.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function () {
                return a || jQuery.error(i + " was not called"), a[0]
            }, e.dataTypes[0] = "json", o = t[i], t[i] = function () {
                a = arguments
            }, r.always(function () {
                void 0 === o ? jQuery(t).removeProp(i) : t[i] = o, e[i] && (e.jsonpCallback = n.jsonpCallback, Zt.push(i)), a && be(o) && o(a[0]), a = o = void 0
            }), "script"
        }), Ae.createHTMLDocument = function () {
            var e = ue.implementation.createHTMLDocument("").body;
            return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes.length
        }(), jQuery.parseHTML = function (e, t, n) {
            if ("string" != typeof e) return [];
            "boolean" == typeof t && (n = t, t = !1);
            var r, i, o;
            return t || (Ae.createHTMLDocument ? (t = ue.implementation.createHTMLDocument(""), r = t.createElement("base"), r.href = ue.location.href, t.head.appendChild(r)) : t = ue), i = Le.exec(e), o = !n && [], i ? [t.createElement(i[1])] : (i = C([e], t, o), o && o.length && jQuery(o).remove(), jQuery.merge([], i.childNodes))
        }, jQuery.fn.load = function (e, t, n) {
            var r, i, o, a = this, s = e.indexOf(" ");
            return s > -1 && (r = $(e.slice(s)), e = e.slice(0, s)), be(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), a.length > 0 && jQuery.ajax({
                url: e,
                type: i || "GET",
                dataType: "html",
                data: t
            }).done(function (e) {
                o = arguments, a.html(r ? jQuery("<div>").append(jQuery.parseHTML(e)).find(r) : e)
            }).always(n && function (e, t) {
                a.each(function () {
                    n.apply(this, o || [e.responseText, t, e])
                })
            }), this
        }, jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
            jQuery.fn[t] = function (e) {
                return this.on(t, e)
            }
        }), jQuery.expr.pseudos.animated = function (e) {
            return jQuery.grep(jQuery.timers, function (t) {
                return e === t.elem
            }).length
        }, jQuery.offset = {
            setOffset: function (e, t, n) {
                var r, i, o, a, s, c, u, l = jQuery.css(e, "position"), d = jQuery(e), p = {};
                "static" === l && (e.style.position = "relative"), s = d.offset(), o = jQuery.css(e, "top"), c = jQuery.css(e, "left"), u = ("absolute" === l || "fixed" === l) && (o + c).indexOf("auto") > -1, u ? (r = d.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(c) || 0), be(t) && (t = t.call(e, n, jQuery.extend({}, s))), null != t.top && (p.top = t.top - s.top + a), null != t.left && (p.left = t.left - s.left + i), "using" in t ? t.using.call(e, p) : d.css(p)
            }
        }, jQuery.fn.extend({
            offset: function (e) {
                if (arguments.length) return void 0 === e ? this : this.each(function (t) {
                    jQuery.offset.setOffset(this, e, t)
                });
                var t, n, r = this[0];
                if (r) return r.getClientRects().length ? (t = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
                    top: t.top + n.pageYOffset,
                    left: t.left + n.pageXOffset
                }) : {top: 0, left: 0}
            }, position: function () {
                if (this[0]) {
                    var e, t, n, r = this[0], i = {top: 0, left: 0};
                    if ("fixed" === jQuery.css(r, "position")) t = r.getBoundingClientRect(); else {
                        for (t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === jQuery.css(e, "position");) e = e.parentNode;
                        e && e !== r && 1 === e.nodeType && (i = jQuery(e).offset(), i.top += jQuery.css(e, "borderTopWidth", !0), i.left += jQuery.css(e, "borderLeftWidth", !0))
                    }
                    return {
                        top: t.top - i.top - jQuery.css(r, "marginTop", !0),
                        left: t.left - i.left - jQuery.css(r, "marginLeft", !0)
                    }
                }
            }, offsetParent: function () {
                return this.map(function () {
                    for (var e = this.offsetParent; e && "static" === jQuery.css(e, "position");) e = e.offsetParent;
                    return e || it
                })
            }
        }), jQuery.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
            var n = "pageYOffset" === t;
            jQuery.fn[e] = function (r) {
                return Fe(this, function (e, r, i) {
                    var o;
                    return we(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), void 0 === i ? o ? o[t] : e[r] : void (o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i)
                }, e, r, arguments.length)
            }
        }), jQuery.each(["top", "left"], function (e, t) {
            jQuery.cssHooks[t] = F(Ae.pixelPosition, function (e, n) {
                if (n) return n = U(e, t), pt.test(n) ? jQuery(e).position()[t] + "px" : n
            })
        }), jQuery.each({Height: "height", Width: "width"}, function (e, t) {
            jQuery.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, r) {
                jQuery.fn[r] = function (i, o) {
                    var a = arguments.length && (n || "boolean" != typeof i),
                        s = n || (i === !0 || o === !0 ? "margin" : "border");
                    return Fe(this, function (t, n, i) {
                        var o;
                        return we(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? jQuery.css(t, n, s) : jQuery.style(t, n, i, s)
                    }, t, a ? i : void 0, a)
                }
            })
        }), jQuery.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, t) {
            jQuery.fn[t] = function (e, n) {
                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
            }
        }), jQuery.fn.extend({
            hover: function (e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }
        }), jQuery.fn.extend({
            bind: function (e, t, n) {
                return this.on(e, null, t, n)
            }, unbind: function (e, t) {
                return this.off(e, null, t)
            }, delegate: function (e, t, n, r) {
                return this.on(t, e, n, r)
            }, undelegate: function (e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            }
        }), jQuery.proxy = function (e, t) {
            var n, r, i;
            if ("string" == typeof t && (n = e[t], t = e, e = n), be(e)) return r = de.call(arguments, 2), i = function () {
                return e.apply(t || this, r.concat(de.call(arguments)))
            }, i.guid = e.guid = e.guid || jQuery.guid++, i
        }, jQuery.holdReady = function (e) {
            e ? jQuery.readyWait++ : jQuery.ready(!0)
        }, jQuery.isArray = Array.isArray, jQuery.parseJSON = JSON.parse, jQuery.nodeName = c, jQuery.isFunction = be, jQuery.isWindow = we, jQuery.camelCase = y, jQuery.type = a, jQuery.now = Date.now, jQuery.isNumeric = function (e) {
            var t = jQuery.type(e);
            return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
        }, n = [], r = function () {
            return jQuery
        }.apply(exports, n), !(void 0 !== r && (e.exports = r));
        var en = t.jQuery, tn = t.$;
        return jQuery.noConflict = function (e) {
            return t.$ === jQuery && (t.$ = tn), e && t.jQuery === jQuery && (t.jQuery = en), jQuery
        }, i || (t.jQuery = t.$ = jQuery), jQuery
    })
}]);