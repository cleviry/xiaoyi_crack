!function (e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var i = t[r] = {i: r, l: !1, exports: {}};
        return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }

    n.m = e, n.c = t, n.d = function (e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: r})
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var i in e) n.d(r, i, function (t) {
            return e[t]
        }.bind(null, i));
        return r
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 2)
}([function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.INTERPRETER_API = t.DISTILLER_WHITE_LIST = t.TRS_TOKEN = t.PUBLIC_SENTRY_URL = t.SUB_TYPE_l = t.DEFAULT_SUB_TYPE = t.SUB_TYPE_TGT = t.SUB_TYPE_ORG = t.SUB_TYPE_BIL = t.LANG_L = t.DEFAULT_LANG = t.JA = t.EN = t.ZH = void 0;
    const r = ["zh", "en", "ja-JP"], i = ["bilingual", "original", "target"];
    t.INTERPRETER_API = "https://api.interpreter.caiyunai.com/", t.DISTILLER_WHITE_LIST = ["popsci.com", "sciencealert.com", "livescience.com", "sciencedaily.com", "aeon.co", "thoughtco.com", "pixiv", "verywellmind.com", "wired.com", "buzzfeed.com", "brightside.me", "boredpanda.com", "iflscience.com", "archiveofourown.org"], t.TRS_TOKEN = "lqkr1tfixq1wa9kmj9po", t.PUBLIC_SENTRY_URL = "http://c49231b0334e4624b8941767b8f6bfa4@sentry.in.caiyunapp.com/22", t.SUB_TYPE_l = i, t.DEFAULT_SUB_TYPE = "bilingual", t.SUB_TYPE_TGT = "target", t.SUB_TYPE_ORG = "original", t.SUB_TYPE_BIL = "bilingual", t.LANG_L = r, t.DEFAULT_LANG = "en", t.JA = "ja-JP", t.EN = "en", t.ZH = "zh"
}, , function (e, t, n) {
    "use strict";
    var r, i, o = n(0);
    n(3);
    var a = n(5), s = !1, c = !1, u = o.DEFAULT_LANG, l = o.DEFAULT_SUB_TYPE;

    function f(e) {
        chrome.tabs.sendMessage(E, {type: "show_msg", msg_str: e})
    }

    function h(e, t, n) {
        if (i.readyState == WebSocket.OPEN) {
            for (let t = 0; t < e.length; t++) i.send(e[t]);
            e.length = 0
        } else i.readyState == WebSocket.CONNECTING ? f(chrome.i18n.getMessage("WsIsConnecting")) : (f(chrome.i18n.getMessage("WsIsNotOpened")), y())
    }

    a.config(o.PUBLIC_SENTRY_URL, {release: "1.1.0", environment: "prod", sampleRate: 1}).install();
    var p = null, d = function (e) {
        let t = JSON.parse(e);
        1 == t.to_close && null == p && (f(p = t.msg), f(chrome.i18n.getMessage("closeRecorder")), chrome.tabs.sendMessage(E, {type: "stopSubtitle"}), ga("send", "event", R, "closeSubByWS", p)), t && 0 == t.rc && t.target ? chrome.tabs.sendMessage(E, {
            type: "subtitleMsg",
            subtitle: t
        }) : chrome.tabs.sendMessage(E, {type: "subtitleMsg", subtitle: null})
    }, m = !1, g = "chrome_ext", v = "";

    function y() {
        var e = 6;
        u == o.JA && (e = 12), (i = new WebSocket("ws://api.interpreter.caiyunai.com/v1/audio", ["subprotocols", `lang#${u}`, "if_interim_results#true", `trans_interval#${e}`, `token#${v}`, `app#${g}`])).onopen = function () {
            f(chrome.i18n.getMessage("wsIsOpened")), k = E, m || (r && (r.start(), f(chrome.i18n.getMessage("recording"))), m = !0)
        }, chrome.runtime.lastError, i.onmessage = function (e) {
            d(e.data)
        }, i.onerror = function (e) {
            f(chrome.i18n.getMessage("wsError")), D(2500), b(function () {
                f(chrome.i18n.getMessage("closeRecorder")), chrome.tabs.sendMessage(E, {type: "stopSubtitle"}), ga("send", "event", R, "closeSubByWS", "ws.onerror")
            })
        }
    }

    function b(e) {
        e = e || NOOP, r ? r.close(e) : e(), m = !1, i && (i.CLOSED || i.close())
    }

    var w = "", E = -1, k = -11, S = [], x = "cyxy-", R = `${x}video`;

    function T(e, t, n) {
        if ("showSubByVideoBtn" == e.type) chrome.tabs.query({active: !0, currentWindow: !0}, function (e) {
            if (!e[0]) return;
            let t = e[0].url;
            var n;
            t.match(L) || (w = t, E = e[0].id, n = {
                audio: !0,
                video: !1,
                audioConstraints: {mandatory: {chromeMediaSource: "tab"}}
            }, chrome.tabCapture.capture(n, e => {
                if (e) {
                    O(E);
                    let t = e.getTracks();
                    for (let e = 0; e < t.length; e++) t[e].stop()
                } else {
                    let e = chrome.runtime.lastError.message;
                    e.includes("permission") ? (alert(chrome.i18n.getMessage("requestReloadAndReload")), chrome.tabs.sendMessage(E, {type: "closeVideoBtn"})) : O(E)
                }
            }))
        }); else if ("closeSubByVideoBtn" == e.type) chrome.tabs.sendMessage(E, {type: "closeSubtitle"}), ga("send", "event", R, e.type, u); else if ("recopen" == e.type) b(function () {
            u = e.lang, (r = Recorder({
                bitRate: 16,
                sampleRate: 16e3,
                type: "wav",
                bufferSize: 4096,
                onProcess: h
            })).open_tab_audio_stream(function () {
                f(chrome.i18n.getMessage("openRecorder")), y()
            }, function (e) {
                f(chrome.i18n.getMessage("openRecorderError") + e)
            }), n({type: "accept"})
        }), ga("send", "event", R, e.type, e.lang); else if ("recclose" == e.type) b(function () {
            f(chrome.i18n.getMessage("closeRecorder")), n({type: "reset"})
        }), ga("send", "event", R, e.type, e.lang); else if ("switchTrack" == e.type) ga("send", "event", R, e.typ, e.newTrack); else if ("clickCyxyBtn" == e.type) W() ? ga("send", "event", `${x}${e.btnName}`, "click", "isLoggedIn") : ga("send", "event", `${x}${e.btnName}`, "click", "isUnlogin"); else if ("useDictAPI" == e.type || "useTranslatorAPI" == e.type) M ? ga("send", "event", `${x}${e.type}`, `${e.direction}`, "isLoggedIn") : ga("send", "event", `${x}${e.type}`, `${e.direction}`, "isUnlogin"); else if ("audio" == e.type) M ? ga("send", "event", `${x}${e.type}`, "read", "isLoggedIn") : ga("send", "event", `${x}${e.type}`, "read", "isUnlogin"); else if ("showSWTview" == e.type) {
            let t = N(e.direction);
            ga("send", "pageview", `${e.type}?utm_source=${t}&utm_medium=website`)
        } else "optionsPageview" == e.type && ga("send", "pageview", "options")
    }

    function O(e) {
        !function (e, t) {
            if (e = e || (() => {
            }), t = t || (() => {
            }), W()) return void e();
            fetch("https://biz.caiyunapp.com/test_cookies", {
                method: "GET",
                headers: {"content-type": "application/json"}
            }).then(e => e.text()).then(n => {
                let r = JSON.parse(n);
                if (r.cookies && r.cookies.cy_user) {
                    let t = JSON.parse(decodeURIComponent(r.cookies.cy_user));
                    if (t.is_login) return M = t._id, v = t.token, I = M, void e()
                }
                chrome.tabs.sendMessage(E, {
                    type: "alert",
                    content: chrome.i18n.getMessage("VideoTransReqLogin"),
                    time: 5
                }), t()
            })
        }(function () {
            !function (e, t, n) {
                E = e, chrome.tabs.sendMessage(E, {
                    type: "showSubtitle",
                    lang: t,
                    showLangMenu: n
                }), S = S.filter(e => e !== E);
                for (let e = 0; e < S.length; e++) {
                    let t = S[e];
                    chrome.tabs.get(t, function () {
                        if (chrome.runtime.lastError) {
                            let e = chrome.runtime.lastError.message;
                            a.captureException(e)
                        } else q(t)
                    })
                }
                S = [E]
            }(e, u, !0), ga("send", "event", "video", `transByVideoBtn:${u}`), ga("send", "pageview", "subtitle")
        }, function () {
            ga("send", "event", "video", "requestLogin")
        })
    }

    var M = "";

    function _(e, t, n) {
        if ("fetchUrl" == e.contentScriptQuery) {
            const t = {};
            if (t.method = e.method || "GET", t.headers = {"content-type": "application/json"}, e.data && (t.body = JSON.stringify(e.data)), e.headers) {
                var r = t.headers;
                for (var i in e.headers) r[i] = e.headers[i];
                t.headers = r
            }
            return fetch(e.url, t).then(e => e.text()).then(e => {
                n({status: "ok", data: e});
                let t = JSON.parse(e);
                if (t.cookies && "" == M && t.cookies.cy_user) {
                    let e = JSON.parse(decodeURIComponent(t.cookies.cy_user));
                    e.is_login && (M = e._id, v = e.token, I = M)
                }
            }).catch(e => {
                n({status: "error", error: e}), a.captureException(e)
            }), !0
        }
    }

    function j(e, t, n) {
        e.error && a.captureException(e.error)
    }

    const L = "^(chrome://).+", A = "^(file:///).+(mp3|mp4|avi|flv|wmv|mov|html)$";

    function U(e, t) {
        return new Promise((n, r) => {
            chrome.tabs.executeScript(e, t, e => {
                if (chrome.runtime.lastError) {
                    let e = chrome.runtime.lastError.message;
                    r(e)
                } else n(e)
            })
        })
    }

    async function C(e) {
        try {
            await U(e, {file: "jquery.js"}), await async function (e) {
                let t = w.split("//");
                t = t.length >= 2 ? t[1].split("/")[0] : "";
                for (const n of o.DISTILLER_WHITE_LIST) if (t.includes(n)) {
                    chrome.tabs.executeScript(e, {file: "ddl.js", runAt: "document_end"}, ([e]) => {
                        $(e)
                    });
                    break
                }
            }(e), await U(e, {code: `var optionLang = "${u}", optionSubType = "${l}"`}), await U(e, {file: "sub.js"}), chrome.tabs.sendMessage(e, {type: "turnOnVideoBtn"})
        } catch (t) {
            chrome.tabs.sendMessage(e, {type: "alert", content: t, time: 5}), a.captureException(t)
        }
    }

    function P(e, t) {
        chrome.tabs.query({active: !0, currentWindow: !0}, function (n) {
            if (!n[0]) return;
            let r = n[0].url, i = N(r);
            w.match(A) && r == w && chrome.extension.isAllowedFileSchemeAccess(function (e) {
                if (!e) return alert(chrome.i18n.getMessage("RequireAllowAccessFile")), void chrome.tabs.create({url: "chrome://extensions/?id=" + chrome.runtime.id})
            }), chrome.runtime.onMessage.hasListener(_) || chrome.runtime.onMessage.addListener(_), chrome.runtime.onMessage.hasListener(T) || chrome.runtime.onMessage.addListener(T), chrome.runtime.onMessage.hasListener(j) || chrome.runtime.onMessage.addListener(j), s && (chrome.tabs.executeScript(e, {
                file: "trs.js",
                runAt: t
            }), chrome.tabs.executeScript(e, {
                file: "vbt.js",
                runAt: t
            }), ga("send", "pageview", `web_trs?utm_source=${i}&utm_medium=website`), M ? ga("send", "event", `${x}web`, "open", "isLoggedIn") : ga("send", "event", `${x}web`, "open", "isUnlogin"), setTimeout(function () {
                chrome.tabs.sendMessage(e, {type: "checkInserted", script: "sub"}, function (n) {
                    chrome.runtime.lastError || !n ? (C(e), chrome.tabs.executeScript(e, {
                        file: "tbn.js",
                        runAt: t
                    })) : chrome.tabs.sendMessage(e, {type: "turnOnVideoBtn"})
                })
            }, 500), s = !1), c && (chrome.tabs.executeScript(e, {
                file: "swt.js",
                runAt: t
            }), chrome.tabs.insertCSS(e, {
                file: "css/swt.css",
                runAt: t
            }), c = !1), chrome.tabs.insertCSS(e, {file: "css/btn.css", runAt: t})
        })
    }

    function N(e) {
        let t;
        try {
            t = new URL(e).hostname.replace("www.", "")
        } catch (e) {
            t = ""
        }
        return "" == t && (t = "others"), t
    }

    async function B(e) {
        await F(), chrome.tabs.query({active: !0, currentWindow: !0}, function (e) {
            if (!e[0]) return;
            let t = e[0].url;
            t.match(L) || (w = t, P(E = e[0].id, "document_start"))
        })
    }

    chrome.webNavigation.onHistoryStateUpdated.addListener(function (e) {
        0 === e.frameId && -1 != E && "" != w && chrome.tabs.get(e.tabId, function (e) {
            w.match("^(http(s)?://)?((w){3}.)?youtu(be|.be)?(.com)?/.+") && e.id == E && e.url != w && (w = e.url, chrome.tabs.update(E, {url: w}))
        })
    }), chrome.browserAction.onClicked.addListener(function (e) {
        main(e)
    }), chrome.contextMenus.create({
        title: chrome.i18n.getMessage("launchApp"),
        contexts: ["all"],
        onclick: function () {
            chrome.tabs.query({active: !0, currentWindow: !0}, function (e) {
                let t = e[0];
                main(t)
            })
        }
    }), window.main = function (e) {
        !function (e, t) {
            let n = ["https://*/*", "http://*/*"];
            e.match(A) ? chrome.extension.isAllowedFileSchemeAccess(function (e) {
                if (!e) return alert(chrome.i18n.getMessage("RequireAllowAccessFile")), void chrome.tabs.create({url: "chrome://extensions/?id=" + chrome.runtime.id});
                n.push("file://*/*"), t(n)
            }) : t(n)
        }(e.url, function (t) {
            chrome.permissions.contains({permissions: ["cookies"], origins: ["https://caiyunapp.com/"]}, function (e) {
                e || alert(chrome.i18n.getMessage("getCookiesPermissionFailed"))
            }), s = !0, chrome.cookies.onChanged.addListener(async function (e) {
                if (!e || !1 in e) return;
                let t = e.cookie;
                if (".caiyunapp.com" != t.domain || "cy_user" != t.name) return;
                let [n, r, i] = await F();
                n && i && (m && (b(function () {
                    f(chrome.i18n.getMessage("closeRecorder"))
                }), chrome.tabs.sendMessage(E, {type: "closeSubtitle"})), -1 != E && chrome.tabs.update(E, {url: w}, function (e, t) {
                    D(500), P(E, "document_end")
                }))
            }), B(e)
        }), chrome.storage.sync.get({version: ""}, function (e) {
            var t = chrome.runtime.getManifest();
            e.version != t.version && setTimeout(function () {
            }, 1e3)
        })
    }, chrome.webNavigation.onBeforeNavigate.addListener(function (e) {
        e.id == E && m && b(() => {
        })
    }), chrome.tabs.onRemoved.addListener(function (e, t) {
        e == k && i && (i.onclose = function () {
        }, i.close())
    }), chrome.webNavigation.onDOMContentLoaded.addListener(function (e) {
        1 != (0 != e.frameId) && chrome.storage.sync.get({
            isAutoTranslate: !1,
            isAutoSWT: !0,
            transDirect: 1,
            subType: 0,
            favoriteColor: "red",
            likesColor: !0
        }, function (t) {
            if (s = !1, c = !1, u = o.LANG_L[t.transDirect], l = o.SUB_TYPE_l[t.subType], !0 === t.isAutoTranslate && (t.isAutoTranslate ? (chrome.browserAction.setBadgeText({text: "auto"}), chrome.browserAction.setBadgeBackgroundColor({color: "#5ebb8d"})) : chrome.browserAction.setBadgeText({text: ""}), chrome.tabs.detectLanguage(e.id, function (t) {
                (t.includes("en") || t.includes("ja")) && (s = !0), B(e)
            })), !0 === t.isAutoSWT) return c = !0, void B(e)
        })
    });
    let I = "";

    function F() {
        return new Promise(function (e, t) {
            let n = !1;
            if (!chrome.cookies) return;
            let r = "";
            if (chrome.cookies.get({url: "https://caiyunapp.com", name: "cy_user"}, function (t) {
                let i = "", o = !1;
                if (n = !0, t && t.value) {
                    let e = decodeURIComponent(t.value);
                    if (e = e.replace('}"', "}").replace('"{', "{")) {
                        let t = JSON.parse(e);
                        i = t._id, r = t.token
                    }
                }
                if (I != i && (o = !0, M = i, v = r), I = i, chrome.runtime.lastError) {
                    let e = chrome.runtime.lastError.message;
                    a.captureException(e)
                }
                e([n, i, o])
            }), chrome.runtime.lastError) {
                let e = chrome.runtime.lastError.message;
                a.captureException(e), t(e)
            }
        })
    }

    function W() {
        return !(!M && !v)
    }

    function D(e) {
        for (var t = (new Date).getTime(); (new Date).getTime() < t + e;) ;
    }

    function q(e) {
        if (chrome.runtime.onMessage.hasListener(T)) {
            try {
                chrome.tabs.sendMessage(e, {action: "close"}), chrome.tabs.sendMessage(e, {type: "closeSubtitle"})
            } catch (e) {
                a.captureException(e)
            }
            b(function () {
            })
        }
    }

    function $(e) {
        let t = o.INTERPRETER_API + "v1/page/cache/update", n = {
            headers: {"content-type": "application/json", token: v},
            method: "POST",
            body: JSON.stringify({url: w, result: e, user_id: M})
        };
        try {
            fetch(t, n).then(e => {
            })
        } catch (e) {
            a.captureException(e)
        }
    }

    var z, H, J, G, Y, V;
    z = window, H = document, J = "script", G = "ga", z.GoogleAnalyticsObject = G, z.ga = z.ga || function () {
        (z.ga.q = z.ga.q || []).push(arguments)
    }, z.ga.l = 1 * new Date, Y = H.createElement(J), V = H.getElementsByTagName(J)[0], Y.async = 1, Y.src = "https://www.google-analytics.com/analytics.js", V.parentNode.insertBefore(Y, V), window.ga_debug = {trace: !0}, ga("create", "UA-83184075-2", {cookieDomain: "none"}), ga("set", "checkProtocolTask", function () {
    })
}, function (e, t, n) {
    "use strict";
    var r = n(4);
    !function (e) {
        e.RecorderLM = "2018-09-19 10:50";
        var t = function () {
        }, n = {
            extend: function (e, t) {
                for (var n in e || (e = {}), t || (t = {}), t) e[n] = t[n];
                return e
            }
        };

        function i(e) {
            return new o(e)
        }

        function o(e) {
            this.set = n.extend({type: "wav", bitRate: 16, sampleRate: 16e3, bufferSize: 8192, onProcess: t}, e)
        }

        i.IsOpen = function () {
            var e = i.Stream;
            if (e) {
                var t = e.getTracks();
                if (t.length > 0) return "live" == t[0].readyState
            }
            return !1
        }, o.prototype = {
            open: function (n, r) {
                if (n = n || t, r = r || t, i.IsOpen()) n(); else {
                    var o = e.AudioContext;
                    if (o || (o = e.webkitAudioContext), o) {
                        var a = navigator.mediaDevices || {};
                        if (a.getUserMedia || (a = navigator).getUserMedia || (a.getUserMedia = a.webkitGetUserMedia || a.mozGetUserMedia || a.msGetUserMedia), a.getUserMedia) {
                            i.Ctx = i.Ctx || new o;
                            var s = function (e) {
                                i.Stream = e, n()
                            }, c = function (e) {
                                var t = e.code || e.name || "";
                                r(/Permission/i.test(t) ? "用户拒绝了录音权限" : "无法录音：" + t)
                            }, u = a.getUserMedia({audio: !0}, s, c);
                            u && u.then && u.then(s).catch(c)
                        } else r("此浏览器不支持录音")
                    } else r("此浏览器不支持录音")
                }
            }, open_tab_audio_stream: function (n, r) {
                if (n = n || t, r = r || t, i.IsOpen()) n(); else {
                    var o = e.AudioContext;
                    o || (o = e.webkitAudioContext), o ? (i.Ctx = i.Ctx || new o, chrome.tabs.query({
                        active: !0,
                        currentWindow: !0
                    }, function (e) {
                        var t = {audio: !0, video: !1, audioConstraints: {mandatory: {chromeMediaSource: "tab"}}};
                        chrome.tabCapture.capture(t, e => {
                            e && (i.Stream = e, n())
                        })
                    })) : r("此浏览器不支持录音")
                }
            }, close: function (e) {
                e = e || t;
                this._stop();
                var n = i.Stream;
                if (n) for (var r = n.getTracks(), o = 0; o < r.length; o++) r[o].stop();
                i.Stream = 0, e()
            }, start: function () {
                var e = this, t = e.set, n = e.buffer = [];
                if (e.recSize = 0, e._stop(), e.state = 0, !i.IsOpen()) return;
                const o = i.Stream;
                var a, s = i.Ctx, c = e.media = s.createMediaStreamSource(i.Stream),
                    u = e.process = (s.createScriptProcessor || s.createJavaScriptNode).call(s, t.bufferSize, 1, 1);
                u.onaudioprocess = function (o) {
                    if (1 == e.state) {
                        var s, c = o.inputBuffer.getChannelData(0);
                        if (i.Ctx.sampleRate == e.set.sampleRate) s = c; else {
                            var u = new r.Resampler(i.Ctx.sampleRate, e.set.sampleRate, 1, c);
                            s = u.resampler(c.length) > 0 ? u.outputBuffer : c
                        }
                        for (var l = new Int16Array(s.length), f = 0, h = 0; h < s.length; h++) {
                            var p = Math.max(-1, Math.min(1, s[h]));
                            p = p < 0 ? 32768 * p : 32767 * p, l[h] = p, f += Math.abs(p)
                        }
                        n.push(l), e.recSize += l.length, f /= l.length;
                        var d = 0;
                        f > 0 && (d = Math.round(Math.max(0, 100 * (20 * Math.log10(f / 32767) + 34) / 34)));
                        var m = Math.round(e.recSize / e.set.sampleRate * 1e3);
                        clearTimeout(a), a = setTimeout(function () {
                            t.onProcess(n, d, m)
                        })
                    }
                }, c.connect(u), u.connect(s.destination), e.state = 1;
                let l = new Audio;
                l.srcObject = o, l.play()
            }, _stop: function () {
                this.state && (this.state = 0, this.media.disconnect(), this.process.disconnect())
            }, pause: function (e) {
                this.state && (this.state = e || 2)
            }, resume: function () {
                this.pause(1)
            }, stop: function (e, n) {
                e = e || t, n = n || t;
                var r = this, i = r.set;
                if (r.state) {
                    r._stop();
                    var o = r.recSize;
                    if (o) {
                        for (var a = new Int16Array(o), s = 0, c = 0; c < r.buffer.length; c++) {
                            var u = r.buffer[c];
                            a.set(u, s), s += u.length
                        }
                        var l = Math.round(o / i.sampleRate * 1e3);
                        setTimeout(function () {
                            Date.now();
                            r[i.type](a, function (t) {
                                e(t, l)
                            })
                        })
                    } else n("未采集到录音")
                } else n("未开始录音")
            }, wav: function (e, t) {
                var n = this.set, r = this.recSize, i = n.sampleRate, o = n.sampleRate, a = 8 == n.bitRate ? 8 : 16,
                    s = Math.round(o / i);
                if (s > 1) {
                    r = Math.floor(r / s);
                    for (var c = new Int16Array(r), u = 0, l = 0; u < r;) c[u] = e[l], l += s, u++;
                    e = c
                } else i = o;
                var f = r * (a / 8), h = new ArrayBuffer(44 + f), p = new DataView(h), d = 0, m = function (e) {
                    for (var t = 0; t < e.length; t++, d++) p.setUint8(d, e.charCodeAt(t))
                }, g = function (e) {
                    p.setUint16(d, e, !0), d += 2
                }, v = function (e) {
                    p.setUint32(d, e, !0), d += 4
                };
                if (m("RIFF"), v(36 + f), m("WAVE"), m("fmt "), v(16), g(1), g(1), v(i), v(i * (a / 8)), g(a / 8), g(a), m("data"), v(f), 8 == a) for (u = 0; u < r; u++, d++) {
                    var y = e[u];
                    y = parseInt(255 / (65535 / (y + 32768))), p.setInt8(d, y, !0)
                } else for (u = 0; u < r; u++, d += 2) p.setInt16(d, e[u], !0);
                t(new Blob([p], {type: "audio/wav"}))
            }
        }, e.Recorder = i
    }(window)
}, function (e, t, n) {
    "use strict";

    function r(e, t, n, r) {
        if (this.fromSampleRate = +e, this.toSampleRate = +t, this.channels = 0 | n, "object" != typeof r) throw new Error("inputBuffer is not an object.");
        if (!(r instanceof Array || r instanceof Float32Array || r instanceof Float64Array)) throw new Error("inputBuffer is not an array or a float32 or a float64 array.");
        this.inputBuffer = r, this.initialize()
    }

    Object.defineProperty(t, "__esModule", {value: !0}), t.Resampler = r, r.prototype.initialize = function () {
        if (!(this.fromSampleRate > 0 && this.toSampleRate > 0 && this.channels > 0)) throw new Error("Invalid settings specified for the resampler.");
        this.fromSampleRate == this.toSampleRate ? (this.resampler = this.bypassResampler, this.ratioWeight = 1, this.outputBuffer = this.inputBuffer) : (this.ratioWeight = this.fromSampleRate / this.toSampleRate, this.fromSampleRate < this.toSampleRate ? (this.compileLinearInterpolationFunction(), this.lastWeight = 1) : (this.compileMultiTapFunction(), this.tailExists = !1, this.lastWeight = 0), this.initializeBuffers())
    }, r.prototype.compileLinearInterpolationFunction = function () {
        for (var e = "var outputOffset = 0;    if (bufferLength > 0) {        var buffer = this.inputBuffer;        var weight = this.lastWeight;        var firstWeight = 0;        var secondWeight = 0;        var sourceOffset = 0;        var outputOffset = 0;        var outputBuffer = this.outputBuffer;        for (; weight < 1; weight += " + this.ratioWeight + ") {            secondWeight = weight % 1;            firstWeight = 1 - secondWeight;", t = 0; t < this.channels; ++t) e += "outputBuffer[outputOffset++] = (this.lastOutput[" + t + "] * firstWeight) + (buffer[" + t + "] * secondWeight);";
        e += "}        weight -= 1;        for (bufferLength -= " + this.channels + ", sourceOffset = Math.floor(weight) * " + this.channels + "; sourceOffset < bufferLength;) {            secondWeight = weight % 1;            firstWeight = 1 - secondWeight;";
        for (t = 0; t < this.channels; ++t) e += "outputBuffer[outputOffset++] = (buffer[sourceOffset" + (t > 0 ? " + " + t : "") + "] * firstWeight) + (buffer[sourceOffset + " + (this.channels + t) + "] * secondWeight);";
        e += "weight += " + this.ratioWeight + ";            sourceOffset = Math.floor(weight) * " + this.channels + ";        }";
        for (t = 0; t < this.channels; ++t) e += "this.lastOutput[" + t + "] = buffer[sourceOffset++];";
        e += "this.lastWeight = weight % 1;    }    return outputOffset;", this.resampler = Function("bufferLength", e)
    }, r.prototype.compileMultiTapFunction = function () {
        for (var e = "var outputOffset = 0;    if (bufferLength > 0) {        var buffer = this.inputBuffer;        var weight = 0;", t = 0; t < this.channels; ++t) e += "var output" + t + " = 0;";
        for (e += "var actualPosition = 0;        var amountToNext = 0;        var alreadyProcessedTail = !this.tailExists;        this.tailExists = false;        var outputBuffer = this.outputBuffer;        var currentPosition = 0;        do {            if (alreadyProcessedTail) {                weight = " + this.ratioWeight + ";", t = 0; t < this.channels; ++t) e += "output" + t + " = 0;";
        for (e += "}            else {                weight = this.lastWeight;", t = 0; t < this.channels; ++t) e += "output" + t + " = this.lastOutput[" + t + "];";
        for (e += "alreadyProcessedTail = true;            }            while (weight > 0 && actualPosition < bufferLength) {                amountToNext = 1 + actualPosition - currentPosition;                if (weight >= amountToNext) {", t = 0; t < this.channels; ++t) e += "output" + t + " += buffer[actualPosition++] * amountToNext;";
        for (e += "currentPosition = actualPosition;                    weight -= amountToNext;                }                else {", t = 0; t < this.channels; ++t) e += "output" + t + " += buffer[actualPosition" + (t > 0 ? " + " + t : "") + "] * weight;";
        for (e += "currentPosition += weight;                    weight = 0;                    break;                }            }            if (weight <= 0) {", t = 0; t < this.channels; ++t) e += "outputBuffer[outputOffset++] = output" + t + " / " + this.ratioWeight + ";";
        for (e += "}            else {                this.lastWeight = weight;", t = 0; t < this.channels; ++t) e += "this.lastOutput[" + t + "] = output" + t + ";";
        e += "this.tailExists = true;                break;            }        } while (actualPosition < bufferLength);    }    return outputOffset;", this.resampler = Function("bufferLength", e)
    }, r.prototype.bypassResampler = function (e) {
        return e
    }, r.prototype.initializeBuffers = function () {
        var e = Math.ceil(this.inputBuffer.length * this.toSampleRate / this.fromSampleRate / this.channels * 1.0000004768371582) * this.channels + this.channels;
        try {
            this.outputBuffer = new Float32Array(e), this.lastOutput = new Float32Array(this.channels)
        } catch (e) {
            this.outputBuffer = [], this.lastOutput = []
        }
    }
}, function (e, t, n) {
    (function (t) {
        var n;
        e.exports = function e(t, r, i) {
            function o(s, c) {
                if (!r[s]) {
                    if (!t[s]) {
                        var u = "function" == typeof n && n;
                        if (!c && u) return n(s, !0);
                        if (a) return a(s, !0);
                        var l = new Error("Cannot find module '" + s + "'");
                        throw l.code = "MODULE_NOT_FOUND", l
                    }
                    var f = r[s] = {exports: {}};
                    t[s][0].call(f.exports, function (e) {
                        var n = t[s][1][e];
                        return o(n || e)
                    }, f, f.exports, e, t, r, i)
                }
                return r[s].exports
            }

            for (var a = "function" == typeof n && n, s = 0; s < i.length; s++) o(i[s]);
            return o
        }({
            1: [function (e, t, n) {
                function r(e) {
                    this.name = "RavenConfigError", this.message = e
                }

                r.prototype = new Error, r.prototype.constructor = r, t.exports = r
            }, {}], 2: [function (e, t, n) {
                var r = e(5);
                t.exports = {
                    wrapMethod: function (e, t, n) {
                        var i = e[t], o = e;
                        if (t in e) {
                            var a = "warn" === t ? "warning" : t;
                            e[t] = function () {
                                var e = [].slice.call(arguments), s = r.safeJoin(e, " "),
                                    c = {level: a, logger: "console", extra: {arguments: e}};
                                "assert" === t ? !1 === e[0] && (s = "Assertion failed: " + (r.safeJoin(e.slice(1), " ") || "console.assert"), c.extra.arguments = e.slice(1), n && n(s, c)) : n && n(s, c), i && Function.prototype.apply.call(i, o, e)
                            }
                        }
                    }
                }
            }, {5: 5}], 3: [function (e, n, r) {
                (function (t) {
                    function r() {
                        return +new Date
                    }

                    function i(e, t) {
                        return y(t) ? function (n) {
                            return t(n, e)
                        } : t
                    }

                    function o() {
                        for (var e in this.a = !("object" != typeof JSON || !JSON.stringify), this.b = !v(z), this.c = !v(H), this.d = null, this.e = null, this.f = null, this.g = null, this.h = null, this.i = null, this.j = {}, this.k = {
                            release: $.SENTRY_RELEASE && $.SENTRY_RELEASE.id,
                            logger: "javascript",
                            ignoreErrors: [],
                            ignoreUrls: [],
                            whitelistUrls: [],
                            includePaths: [],
                            headers: null,
                            collectWindowErrors: !0,
                            captureUnhandledRejections: !0,
                            maxMessageLength: 0,
                            maxUrlLength: 250,
                            stackTraceLimit: 50,
                            autoBreadcrumbs: !0,
                            instrument: !0,
                            sampleRate: 1,
                            sanitizeKeys: []
                        }, this.l = {
                            method: "POST",
                            keepalive: !0,
                            referrerPolicy: N() ? "origin" : ""
                        }, this.m = 0, this.n = !1, this.o = Error.stackTraceLimit, this.p = $.console || {}, this.q = {}, this.r = [], this.s = r(), this.t = [], this.u = [], this.v = null, this.w = $.location, this.x = this.w && this.w.href, this.y(), this.p) this.q[e] = this.p[e]
                    }

                    var a = e(6), s = e(7), c = e(8), u = e(1), l = e(5), f = l.isErrorEvent, h = l.isDOMError,
                        p = l.isDOMException, d = l.isError, m = l.isObject, g = l.isPlainObject, v = l.isUndefined,
                        y = l.isFunction, b = l.isString, w = l.isArray, E = l.isEmptyObject, k = l.each,
                        S = l.objectMerge, x = l.truncate, R = l.objectFrozen, T = l.hasKey, O = l.joinRegExp,
                        M = l.urlencode, _ = l.uuid4, j = l.htmlTreeAsString, L = l.isSameException,
                        A = l.isSameStacktrace, U = l.parseUrl, C = l.fill, P = l.supportsFetch,
                        N = l.supportsReferrerPolicy, B = l.serializeKeysForMessage, I = l.serializeException,
                        F = l.sanitize, W = e(2).wrapMethod, D = "source protocol user pass host port path".split(" "),
                        q = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/,
                        $ = "undefined" != typeof window ? window : void 0 !== t ? t : "undefined" != typeof self ? self : {},
                        z = $.document, H = $.navigator;
                    o.prototype = {
                        VERSION: "3.26.4", debug: !1, TraceKit: a, config: function (e, t) {
                            var n = this;
                            if (n.g) return this.z("error", "Error: Raven has already been configured"), n;
                            if (!e) return n;
                            var r = n.k;
                            t && k(t, function (e, t) {
                                "tags" === e || "extra" === e || "user" === e ? n.j[e] = t : r[e] = t
                            }), n.setDSN(e), r.ignoreErrors.push(/^Script error\.?$/), r.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/), r.ignoreErrors = O(r.ignoreErrors), r.ignoreUrls = !!r.ignoreUrls.length && O(r.ignoreUrls), r.whitelistUrls = !!r.whitelistUrls.length && O(r.whitelistUrls), r.includePaths = O(r.includePaths), r.maxBreadcrumbs = Math.max(0, Math.min(r.maxBreadcrumbs || 100, 100));
                            var i = {xhr: !0, console: !0, dom: !0, location: !0, sentry: !0}, o = r.autoBreadcrumbs;
                            "[object Object]" === {}.toString.call(o) ? o = S(i, o) : !1 !== o && (o = i), r.autoBreadcrumbs = o;
                            var s = {tryCatch: !0}, c = r.instrument;
                            return "[object Object]" === {}.toString.call(c) ? c = S(s, c) : !1 !== c && (c = s), r.instrument = c, a.collectWindowErrors = !!r.collectWindowErrors, n
                        }, install: function () {
                            var e = this;
                            return e.isSetup() && !e.n && (a.report.subscribe(function () {
                                e.A.apply(e, arguments)
                            }), e.k.captureUnhandledRejections && e.B(), e.C(), e.k.instrument && e.k.instrument.tryCatch && e.D(), e.k.autoBreadcrumbs && e.E(), e.F(), e.n = !0), Error.stackTraceLimit = e.k.stackTraceLimit, this
                        }, setDSN: function (e) {
                            var t = this, n = t.G(e), r = n.path.lastIndexOf("/"), i = n.path.substr(1, r);
                            t.H = e, t.h = n.user, t.I = n.pass && n.pass.substr(1), t.i = n.path.substr(r + 1), t.g = t.J(n), t.K = t.g + "/" + i + "api/" + t.i + "/store/", this.y()
                        }, context: function (e, t, n) {
                            return y(e) && (n = t || [], t = e, e = {}), this.wrap(e, t).apply(this, n)
                        }, wrap: function (e, t, n) {
                            function r() {
                                var r = [], o = arguments.length, a = !e || e && !1 !== e.deep;
                                for (n && y(n) && n.apply(this, arguments); o--;) r[o] = a ? i.wrap(e, arguments[o]) : arguments[o];
                                try {
                                    return t.apply(this, r)
                                } catch (t) {
                                    throw i.L(), i.captureException(t, e), t
                                }
                            }

                            var i = this;
                            if (v(t) && !y(e)) return e;
                            if (y(e) && (t = e, e = void 0), !y(t)) return t;
                            try {
                                if (t.M) return t;
                                if (t.N) return t.N
                            } catch (e) {
                                return t
                            }
                            for (var o in t) T(t, o) && (r[o] = t[o]);
                            return r.prototype = t.prototype, t.N = r, r.M = !0, r.O = t, r
                        }, uninstall: function () {
                            return a.report.uninstall(), this.P(), this.Q(), this.R(), this.S(), Error.stackTraceLimit = this.o, this.n = !1, this
                        }, T: function (e) {
                            this.z("debug", "Raven caught unhandled promise rejection:", e), this.captureException(e.reason, {
                                mechanism: {
                                    type: "onunhandledrejection",
                                    handled: !1
                                }
                            })
                        }, B: function () {
                            return this.T = this.T.bind(this), $.addEventListener && $.addEventListener("unhandledrejection", this.T), this
                        }, P: function () {
                            return $.removeEventListener && $.removeEventListener("unhandledrejection", this.T), this
                        }, captureException: function (e, t) {
                            if (t = S({trimHeadFrames: 0}, t || {}), f(e) && e.error) e = e.error; else {
                                if (h(e) || p(e)) {
                                    var n = e.name || (h(e) ? "DOMError" : "DOMException"),
                                        r = e.message ? n + ": " + e.message : n;
                                    return this.captureMessage(r, S(t, {
                                        stacktrace: !0,
                                        trimHeadFrames: t.trimHeadFrames + 1
                                    }))
                                }
                                if (d(e)) e = e; else {
                                    if (!g(e)) return this.captureMessage(e, S(t, {
                                        stacktrace: !0,
                                        trimHeadFrames: t.trimHeadFrames + 1
                                    }));
                                    t = this.U(t, e), e = new Error(t.message)
                                }
                            }
                            this.d = e;
                            try {
                                var i = a.computeStackTrace(e);
                                this.V(i, t)
                            } catch (t) {
                                if (e !== t) throw t
                            }
                            return this
                        }, U: function (e, t) {
                            var n = Object.keys(t).sort(), r = S(e, {
                                message: "Non-Error exception captured with keys: " + B(n),
                                fingerprint: [c(n)],
                                extra: e.extra || {}
                            });
                            return r.extra.W = I(t), r
                        }, captureMessage: function (e, t) {
                            if (!this.k.ignoreErrors.test || !this.k.ignoreErrors.test(e)) {
                                var n, r = S({message: e += ""}, t = t || {});
                                try {
                                    throw new Error(e)
                                } catch (e) {
                                    n = e
                                }
                                n.name = null;
                                var i = a.computeStackTrace(n), o = w(i.stack) && i.stack[1];
                                o && "Raven.captureException" === o.func && (o = i.stack[2]);
                                var s = o && o.url || "";
                                if ((!this.k.ignoreUrls.test || !this.k.ignoreUrls.test(s)) && (!this.k.whitelistUrls.test || this.k.whitelistUrls.test(s))) {
                                    if (this.k.stacktrace || t.stacktrace || "" === r.message) {
                                        r.fingerprint = null == r.fingerprint ? e : r.fingerprint, (t = S({trimHeadFrames: 0}, t)).trimHeadFrames += 1;
                                        var c = this.X(i, t);
                                        r.stacktrace = {frames: c.reverse()}
                                    }
                                    return r.fingerprint && (r.fingerprint = w(r.fingerprint) ? r.fingerprint : [r.fingerprint]), this.Y(r), this
                                }
                            }
                        }, captureBreadcrumb: function (e) {
                            var t = S({timestamp: r() / 1e3}, e);
                            if (y(this.k.breadcrumbCallback)) {
                                var n = this.k.breadcrumbCallback(t);
                                if (m(n) && !E(n)) t = n; else if (!1 === n) return this
                            }
                            return this.u.push(t), this.u.length > this.k.maxBreadcrumbs && this.u.shift(), this
                        }, addPlugin: function (e) {
                            var t = [].slice.call(arguments, 1);
                            return this.r.push([e, t]), this.n && this.F(), this
                        }, setUserContext: function (e) {
                            return this.j.user = e, this
                        }, setExtraContext: function (e) {
                            return this.Z("extra", e), this
                        }, setTagsContext: function (e) {
                            return this.Z("tags", e), this
                        }, clearContext: function () {
                            return this.j = {}, this
                        }, getContext: function () {
                            return JSON.parse(s(this.j))
                        }, setEnvironment: function (e) {
                            return this.k.environment = e, this
                        }, setRelease: function (e) {
                            return this.k.release = e, this
                        }, setDataCallback: function (e) {
                            var t = this.k.dataCallback;
                            return this.k.dataCallback = i(t, e), this
                        }, setBreadcrumbCallback: function (e) {
                            var t = this.k.breadcrumbCallback;
                            return this.k.breadcrumbCallback = i(t, e), this
                        }, setShouldSendCallback: function (e) {
                            var t = this.k.shouldSendCallback;
                            return this.k.shouldSendCallback = i(t, e), this
                        }, setTransport: function (e) {
                            return this.k.transport = e, this
                        }, lastException: function () {
                            return this.d
                        }, lastEventId: function () {
                            return this.f
                        }, isSetup: function () {
                            return !(!this.a || !this.g && (this.ravenNotConfiguredError || (this.ravenNotConfiguredError = !0, this.z("error", "Error: Raven has not been configured.")), 1))
                        }, afterLoad: function () {
                            var e = $.RavenConfig;
                            e && this.config(e.dsn, e.config).install()
                        }, showReportDialog: function (e) {
                            if (z) {
                                if (!(e = Object.assign({
                                    eventId: this.lastEventId(),
                                    dsn: this.H,
                                    user: this.j.user || {}
                                }, e)).eventId) throw new u("Missing eventId");
                                if (!e.dsn) throw new u("Missing DSN");
                                var t = encodeURIComponent, n = [];
                                for (var r in e) if ("user" === r) {
                                    var i = e.user;
                                    i.name && n.push("name=" + t(i.name)), i.email && n.push("email=" + t(i.email))
                                } else n.push(t(r) + "=" + t(e[r]));
                                var o = this.J(this.G(e.dsn)), a = z.createElement("script");
                                a.async = !0, a.src = o + "/api/embed/error-page/?" + n.join("&"), (z.head || z.body).appendChild(a)
                            }
                        }, L: function () {
                            var e = this;
                            this.m += 1, setTimeout(function () {
                                e.m -= 1
                            })
                        }, $: function (e, t) {
                            var n, r;
                            if (this.b) {
                                for (r in t = t || {}, e = "raven" + e.substr(0, 1).toUpperCase() + e.substr(1), z.createEvent ? (n = z.createEvent("HTMLEvents")).initEvent(e, !0, !0) : (n = z.createEventObject()).eventType = e, t) T(t, r) && (n[r] = t[r]);
                                if (z.createEvent) z.dispatchEvent(n); else try {
                                    z.fireEvent("on" + n.eventType.toLowerCase(), n)
                                } catch (e) {
                                }
                            }
                        }, _: function (e) {
                            var t = this;
                            return function (n) {
                                if (t.aa = null, t.v !== n) {
                                    var r;
                                    t.v = n;
                                    try {
                                        r = j(n.target)
                                    } catch (e) {
                                        r = "<unknown>"
                                    }
                                    t.captureBreadcrumb({category: "ui." + e, message: r})
                                }
                            }
                        }, ba: function () {
                            var e = this;
                            return function (t) {
                                var n;
                                try {
                                    n = t.target
                                } catch (e) {
                                    return
                                }
                                var r = n && n.tagName;
                                if (r && ("INPUT" === r || "TEXTAREA" === r || n.isContentEditable)) {
                                    var i = e.aa;
                                    i || e._("input")(t), clearTimeout(i), e.aa = setTimeout(function () {
                                        e.aa = null
                                    }, 1e3)
                                }
                            }
                        }, ca: function (e, t) {
                            var n = U(this.w.href), r = U(t), i = U(e);
                            this.x = t, n.protocol === r.protocol && n.host === r.host && (t = r.relative), n.protocol === i.protocol && n.host === i.host && (e = i.relative), this.captureBreadcrumb({
                                category: "navigation",
                                data: {to: t, from: e}
                            })
                        }, C: function () {
                            var e = this;
                            e.da = Function.prototype.toString, Function.prototype.toString = function () {
                                return "function" == typeof this && this.M ? e.da.apply(this.O, arguments) : e.da.apply(this, arguments)
                            }
                        }, Q: function () {
                            this.da && (Function.prototype.toString = this.da)
                        }, D: function () {
                            function e(e) {
                                return function (t, r) {
                                    for (var i = new Array(arguments.length), o = 0; o < i.length; ++o) i[o] = arguments[o];
                                    var a = i[0];
                                    return y(a) && (i[0] = n.wrap({
                                        mechanism: {
                                            type: "instrument",
                                            data: {function: e.name || "<anonymous>"}
                                        }
                                    }, a)), e.apply ? e.apply(this, i) : e(i[0], i[1])
                                }
                            }

                            function t(e) {
                                var t = $[e] && $[e].prototype;
                                t && t.hasOwnProperty && t.hasOwnProperty("addEventListener") && (C(t, "addEventListener", function (t) {
                                    return function (r, o, a, s) {
                                        try {
                                            o && o.handleEvent && (o.handleEvent = n.wrap({
                                                mechanism: {
                                                    type: "instrument",
                                                    data: {
                                                        target: e,
                                                        function: "handleEvent",
                                                        handler: o && o.name || "<anonymous>"
                                                    }
                                                }
                                            }, o.handleEvent))
                                        } catch (e) {
                                        }
                                        var c, u, l;
                                        return i && i.dom && ("EventTarget" === e || "Node" === e) && (u = n._("click"), l = n.ba(), c = function (e) {
                                            if (e) {
                                                var t;
                                                try {
                                                    t = e.type
                                                } catch (e) {
                                                    return
                                                }
                                                return "click" === t ? u(e) : "keypress" === t ? l(e) : void 0
                                            }
                                        }), t.call(this, r, n.wrap({
                                            mechanism: {
                                                type: "instrument",
                                                data: {
                                                    target: e,
                                                    function: "addEventListener",
                                                    handler: o && o.name || "<anonymous>"
                                                }
                                            }
                                        }, o, c), a, s)
                                    }
                                }, r), C(t, "removeEventListener", function (e) {
                                    return function (t, n, r, i) {
                                        try {
                                            n = n && (n.N ? n.N : n)
                                        } catch (e) {
                                        }
                                        return e.call(this, t, n, r, i)
                                    }
                                }, r))
                            }

                            var n = this, r = n.t, i = this.k.autoBreadcrumbs;
                            C($, "setTimeout", e, r), C($, "setInterval", e, r), $.requestAnimationFrame && C($, "requestAnimationFrame", function (e) {
                                return function (t) {
                                    return e(n.wrap({
                                        mechanism: {
                                            type: "instrument",
                                            data: {
                                                function: "requestAnimationFrame",
                                                handler: e && e.name || "<anonymous>"
                                            }
                                        }
                                    }, t))
                                }
                            }, r);
                            for (var o = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], a = 0; a < o.length; a++) t(o[a])
                        }, E: function () {
                            function e(e, n) {
                                e in n && y(n[e]) && C(n, e, function (n) {
                                    return t.wrap({
                                        mechanism: {
                                            type: "instrument",
                                            data: {function: e, handler: n && n.name || "<anonymous>"}
                                        }
                                    }, n)
                                })
                            }

                            var t = this, n = this.k.autoBreadcrumbs, r = t.t;
                            if (n.xhr && "XMLHttpRequest" in $) {
                                var i = $.XMLHttpRequest && $.XMLHttpRequest.prototype;
                                C(i, "open", function (e) {
                                    return function (n, r) {
                                        return b(r) && -1 === r.indexOf(t.h) && (this.ea = {
                                            method: n,
                                            url: r,
                                            status_code: null
                                        }), e.apply(this, arguments)
                                    }
                                }, r), C(i, "send", function (n) {
                                    return function () {
                                        function r() {
                                            if (i.ea && 4 === i.readyState) {
                                                try {
                                                    i.ea.status_code = i.status
                                                } catch (e) {
                                                }
                                                t.captureBreadcrumb({type: "http", category: "xhr", data: i.ea})
                                            }
                                        }

                                        for (var i = this, o = ["onload", "onerror", "onprogress"], a = 0; a < o.length; a++) e(o[a], i);
                                        return "onreadystatechange" in i && y(i.onreadystatechange) ? C(i, "onreadystatechange", function (e) {
                                            return t.wrap({
                                                mechanism: {
                                                    type: "instrument",
                                                    data: {
                                                        function: "onreadystatechange",
                                                        handler: e && e.name || "<anonymous>"
                                                    }
                                                }
                                            }, e, r)
                                        }) : i.onreadystatechange = r, n.apply(this, arguments)
                                    }
                                }, r)
                            }
                            n.xhr && P() && C($, "fetch", function (e) {
                                return function () {
                                    for (var n = new Array(arguments.length), r = 0; r < n.length; ++r) n[r] = arguments[r];
                                    var i, o = n[0], a = "GET";
                                    if ("string" == typeof o ? i = o : "Request" in $ && o instanceof $.Request ? (i = o.url, o.method && (a = o.method)) : i = "" + o, -1 !== i.indexOf(t.h)) return e.apply(this, n);
                                    n[1] && n[1].method && (a = n[1].method);
                                    var s = {method: a, url: i, status_code: null};
                                    return e.apply(this, n).then(function (e) {
                                        return s.status_code = e.status, t.captureBreadcrumb({
                                            type: "http",
                                            category: "fetch",
                                            data: s
                                        }), e
                                    }).catch(function (e) {
                                        throw t.captureBreadcrumb({
                                            type: "http",
                                            category: "fetch",
                                            data: s,
                                            level: "error"
                                        }), e
                                    })
                                }
                            }, r), n.dom && this.b && (z.addEventListener ? (z.addEventListener("click", t._("click"), !1), z.addEventListener("keypress", t.ba(), !1)) : z.attachEvent && (z.attachEvent("onclick", t._("click")), z.attachEvent("onkeypress", t.ba())));
                            var o = $.chrome, a = o && o.app && o.app.runtime,
                                s = !a && $.history && $.history.pushState && $.history.replaceState;
                            if (n.location && s) {
                                var c = $.onpopstate;
                                $.onpopstate = function () {
                                    var e = t.w.href;
                                    if (t.ca(t.x, e), c) return c.apply(this, arguments)
                                };
                                var u = function (e) {
                                    return function () {
                                        var n = arguments.length > 2 ? arguments[2] : void 0;
                                        return n && t.ca(t.x, n + ""), e.apply(this, arguments)
                                    }
                                };
                                C($.history, "pushState", u, r), C($.history, "replaceState", u, r)
                            }
                            if (n.console && "console" in $ && console.log) {
                                var l = function (e, n) {
                                    t.captureBreadcrumb({message: e, level: n.level, category: "console"})
                                };
                                k(["debug", "info", "warn", "error", "log"], function (e, t) {
                                    W(console, t, l)
                                })
                            }
                        }, R: function () {
                            for (var e; this.t.length;) {
                                var t = (e = this.t.shift())[0], n = e[1], r = e[2];
                                t[n] = r
                            }
                        }, S: function () {
                            for (var e in this.q) this.p[e] = this.q[e]
                        }, F: function () {
                            var e = this;
                            k(this.r, function (t, n) {
                                var r = n[0], i = n[1];
                                r.apply(e, [e].concat(i))
                            })
                        }, G: function (e) {
                            var t = q.exec(e), n = {}, r = 7;
                            try {
                                for (; r--;) n[D[r]] = t[r] || ""
                            } catch (t) {
                                throw new u("Invalid DSN: " + e)
                            }
                            if (n.pass && !this.k.allowSecretKey) throw new u("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");
                            return n
                        }, J: function (e) {
                            var t = "//" + e.host + (e.port ? ":" + e.port : "");
                            return e.protocol && (t = e.protocol + ":" + t), t
                        }, A: function (e, t) {
                            (t = t || {}).mechanism = t.mechanism || {
                                type: "onerror",
                                handled: !1
                            }, this.m || this.V(e, t)
                        }, V: function (e, t) {
                            var n = this.X(e, t);
                            this.$("handle", {
                                stackInfo: e,
                                options: t
                            }), this.fa(e.name, e.message, e.url, e.lineno, n, t)
                        }, X: function (e, t) {
                            var n = this, r = [];
                            if (e.stack && e.stack.length && (k(e.stack, function (t, i) {
                                var o = n.ga(i, e.url);
                                o && r.push(o)
                            }), t && t.trimHeadFrames)) for (var i = 0; i < t.trimHeadFrames && i < r.length; i++) r[i].in_app = !1;
                            return r = r.slice(0, this.k.stackTraceLimit)
                        }, ga: function (e, t) {
                            var n = {filename: e.url, lineno: e.line, colno: e.column, function: e.func || "?"};
                            return e.url || (n.filename = t), n.in_app = !(this.k.includePaths.test && !this.k.includePaths.test(n.filename) || /(Raven|TraceKit)\./.test(n.function) || /raven\.(min\.)?js$/.test(n.filename)), n
                        }, fa: function (e, t, n, r, i, o) {
                            var a, s = (e ? e + ": " : "") + (t || "");
                            if ((!this.k.ignoreErrors.test || !this.k.ignoreErrors.test(t) && !this.k.ignoreErrors.test(s)) && (i && i.length ? (n = i[0].filename || n, i.reverse(), a = {frames: i}) : n && (a = {
                                frames: [{
                                    filename: n,
                                    lineno: r,
                                    in_app: !0
                                }]
                            }), (!this.k.ignoreUrls.test || !this.k.ignoreUrls.test(n)) && (!this.k.whitelistUrls.test || this.k.whitelistUrls.test(n)))) {
                                var c = S({
                                    exception: {values: [{type: e, value: t, stacktrace: a}]},
                                    transaction: n
                                }, o), u = c.exception.values[0];
                                null == u.type && "" === u.value && (u.value = "Unrecoverable error caught"), !c.exception.mechanism && c.mechanism && (c.exception.mechanism = c.mechanism, delete c.mechanism), c.exception.mechanism = S({
                                    type: "generic",
                                    handled: !0
                                }, c.exception.mechanism || {}), this.Y(c)
                            }
                        }, ha: function (e) {
                            var t = this.k.maxMessageLength;
                            if (e.message && (e.message = x(e.message, t)), e.exception) {
                                var n = e.exception.values[0];
                                n.value = x(n.value, t)
                            }
                            var r = e.request;
                            return r && (r.url && (r.url = x(r.url, this.k.maxUrlLength)), r.Referer && (r.Referer = x(r.Referer, this.k.maxUrlLength))), e.breadcrumbs && e.breadcrumbs.values && this.ia(e.breadcrumbs), e
                        }, ia: function (e) {
                            for (var t, n, r, i = ["to", "from", "url"], o = 0; o < e.values.length; ++o) if ((n = e.values[o]).hasOwnProperty("data") && m(n.data) && !R(n.data)) {
                                r = S({}, n.data);
                                for (var a = 0; a < i.length; ++a) t = i[a], r.hasOwnProperty(t) && r[t] && (r[t] = x(r[t], this.k.maxUrlLength));
                                e.values[o].data = r
                            }
                        }, ja: function () {
                            if (this.c || this.b) {
                                var e = {};
                                return this.c && H.userAgent && (e.headers = {"User-Agent": H.userAgent}), $.location && $.location.href && (e.url = $.location.href), this.b && z.referrer && (e.headers || (e.headers = {}), e.headers.Referer = z.referrer), e
                            }
                        }, y: function () {
                            this.ka = 0, this.la = null
                        }, ma: function () {
                            return this.ka && r() - this.la < this.ka
                        }, na: function (e) {
                            var t = this.e;
                            return !(!t || e.message !== t.message || e.transaction !== t.transaction) && (e.stacktrace || t.stacktrace ? A(e.stacktrace, t.stacktrace) : !e.exception && !t.exception || L(e.exception, t.exception))
                        }, oa: function (e) {
                            if (!this.ma()) {
                                var t = e.status;
                                if (400 === t || 401 === t || 429 === t) {
                                    var n;
                                    try {
                                        n = P() ? e.headers.get("Retry-After") : e.getResponseHeader("Retry-After"), n = 1e3 * parseInt(n, 10)
                                    } catch (e) {
                                    }
                                    this.ka = n || 2 * this.ka || 1e3, this.la = r()
                                }
                            }
                        }, Y: function (e) {
                            var t = this.k, n = {project: this.i, logger: t.logger, platform: "javascript"},
                                i = this.ja();
                            if (i && (n.request = i), e.trimHeadFrames && delete e.trimHeadFrames, (e = S(n, e)).tags = S(S({}, this.j.tags), e.tags), e.extra = S(S({}, this.j.extra), e.extra), e.extra["session:duration"] = r() - this.s, this.u && this.u.length > 0 && (e.breadcrumbs = {values: [].slice.call(this.u, 0)}), this.j.user && (e.user = this.j.user), t.environment && (e.environment = t.environment), t.release && (e.release = t.release), t.serverName && (e.server_name = t.serverName), e = this.pa(e), Object.keys(e).forEach(function (t) {
                                (null == e[t] || "" === e[t] || E(e[t])) && delete e[t]
                            }), y(t.dataCallback) && (e = t.dataCallback(e) || e), e && !E(e) && (!y(t.shouldSendCallback) || t.shouldSendCallback(e))) return this.ma() ? void this.z("warn", "Raven dropped error due to backoff: ", e) : void ("number" == typeof t.sampleRate ? Math.random() < t.sampleRate && this.qa(e) : this.qa(e))
                        }, pa: function (e) {
                            return F(e, this.k.sanitizeKeys)
                        }, ra: function () {
                            return _()
                        }, qa: function (e, t) {
                            var n = this, r = this.k;
                            if (this.isSetup()) {
                                if (e = this.ha(e), !this.k.allowDuplicates && this.na(e)) return void this.z("warn", "Raven dropped repeat event: ", e);
                                this.f = e.event_id || (e.event_id = this.ra()), this.e = e, this.z("debug", "Raven about to send:", e);
                                var i = {
                                    sentry_version: "7",
                                    sentry_client: "raven-js/" + this.VERSION,
                                    sentry_key: this.h
                                };
                                this.I && (i.sentry_secret = this.I);
                                var o = e.exception && e.exception.values[0];
                                this.k.autoBreadcrumbs && this.k.autoBreadcrumbs.sentry && this.captureBreadcrumb({
                                    category: "sentry",
                                    message: o ? (o.type ? o.type + ": " : "") + o.value : e.message,
                                    event_id: e.event_id,
                                    level: e.level || "error"
                                });
                                var a = this.K;
                                (r.transport || this._makeRequest).call(this, {
                                    url: a,
                                    auth: i,
                                    data: e,
                                    options: r,
                                    onSuccess: function () {
                                        n.y(), n.$("success", {data: e, src: a}), t && t()
                                    },
                                    onError: function (r) {
                                        n.z("error", "Raven transport failed to send: ", r), r.request && n.oa(r.request), n.$("failure", {
                                            data: e,
                                            src: a
                                        }), r = r || new Error("Raven send failed (no additional details provided)"), t && t(r)
                                    }
                                })
                            }
                        }, _makeRequest: function (e) {
                            var t = e.url + "?" + M(e.auth), n = null, r = {};
                            if (e.options.headers && (n = this.sa(e.options.headers)), e.options.fetchParameters && (r = this.sa(e.options.fetchParameters)), P()) {
                                r.body = s(e.data);
                                var i = S({}, this.l), o = S(i, r);
                                return n && (o.headers = n), $.fetch(t, o).then(function (t) {
                                    if (t.ok) e.onSuccess && e.onSuccess(); else {
                                        var n = new Error("Sentry error code: " + t.status);
                                        n.request = t, e.onError && e.onError(n)
                                    }
                                }).catch(function () {
                                    e.onError && e.onError(new Error("Sentry error code: network unavailable"))
                                })
                            }
                            var a = $.XMLHttpRequest && new $.XMLHttpRequest;
                            if (a) {
                                var c = "withCredentials" in a || "undefined" != typeof XDomainRequest;
                                c && ("withCredentials" in a ? a.onreadystatechange = function () {
                                    if (4 === a.readyState) if (200 === a.status) e.onSuccess && e.onSuccess(); else if (e.onError) {
                                        var t = new Error("Sentry error code: " + a.status);
                                        t.request = a, e.onError(t)
                                    }
                                } : (a = new XDomainRequest, t = t.replace(/^https?:/, ""), e.onSuccess && (a.onload = e.onSuccess), e.onError && (a.onerror = function () {
                                    var t = new Error("Sentry error code: XDomainRequest");
                                    t.request = a, e.onError(t)
                                })), a.open("POST", t), n && k(n, function (e, t) {
                                    a.setRequestHeader(e, t)
                                }), a.send(s(e.data)))
                            }
                        }, sa: function (e) {
                            var t = {};
                            for (var n in e) if (e.hasOwnProperty(n)) {
                                var r = e[n];
                                t[n] = "function" == typeof r ? r() : r
                            }
                            return t
                        }, z: function (e) {
                            this.q[e] && (this.debug || this.k.debug) && Function.prototype.apply.call(this.q[e], this.p, [].slice.call(arguments, 1))
                        }, Z: function (e, t) {
                            v(t) ? delete this.j[e] : this.j[e] = S(this.j[e] || {}, t)
                        }
                    }, o.prototype.setUser = o.prototype.setUserContext, o.prototype.setReleaseContext = o.prototype.setRelease, n.exports = o
                }).call(this, void 0 !== t ? t : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {1: 1, 2: 2, 5: 5, 6: 6, 7: 7, 8: 8}], 4: [function (e, n, r) {
                (function (t) {
                    var r = e(3),
                        i = "undefined" != typeof window ? window : void 0 !== t ? t : "undefined" != typeof self ? self : {},
                        o = i.Raven, a = new r;
                    a.noConflict = function () {
                        return i.Raven = o, a
                    }, a.afterLoad(), n.exports = a, n.exports.Client = r
                }).call(this, void 0 !== t ? t : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {3: 3}], 5: [function (e, n, r) {
                (function (t) {
                    function r(e) {
                        return void 0 === e
                    }

                    function i(e) {
                        return "[object Object]" === Object.prototype.toString.call(e)
                    }

                    function o(e) {
                        return "[object String]" === Object.prototype.toString.call(e)
                    }

                    function a(e) {
                        return "[object Array]" === Object.prototype.toString.call(e)
                    }

                    function s() {
                        if (!("fetch" in y)) return !1;
                        try {
                            return new Headers, new Request(""), new Response, !0
                        } catch (e) {
                            return !1
                        }
                    }

                    function c(e, t) {
                        var n, i;
                        if (r(e.length)) for (n in e) l(e, n) && t.call(null, n, e[n]); else if (i = e.length) for (n = 0; n < i; n++) t.call(null, n, e[n])
                    }

                    function u(e, t) {
                        if ("number" != typeof t) throw new Error("2nd argument to `truncate` function should be a number");
                        return "string" != typeof e || 0 === t ? e : e.length <= t ? e : e.substr(0, t) + "…"
                    }

                    function l(e, t) {
                        return Object.prototype.hasOwnProperty.call(e, t)
                    }

                    function f(e) {
                        for (var t, n = [], r = 0, i = e.length; r < i; r++) o(t = e[r]) ? n.push(t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : t && t.source && n.push(t.source);
                        return new RegExp(n.join("|"), "i")
                    }

                    function h(e) {
                        var t, n, r, i, a, s = [];
                        if (!e || !e.tagName) return "";
                        if (s.push(e.tagName.toLowerCase()), e.id && s.push("#" + e.id), (t = e.className) && o(t)) for (n = t.split(/\s+/), a = 0; a < n.length; a++) s.push("." + n[a]);
                        var c = ["type", "name", "title", "alt"];
                        for (a = 0; a < c.length; a++) r = c[a], (i = e.getAttribute(r)) && s.push("[" + r + '="' + i + '"]');
                        return s.join("")
                    }

                    function p(e, t) {
                        return !!(!!e ^ !!t)
                    }

                    function d(e, t) {
                        if (p(e, t)) return !1;
                        var n = e.frames, r = t.frames;
                        if (void 0 === n || void 0 === r) return !1;
                        if (n.length !== r.length) return !1;
                        for (var i, o, a = 0; a < n.length; a++) if (i = n[a], o = r[a], i.filename !== o.filename || i.lineno !== o.lineno || i.colno !== o.colno || i.function !== o.function) return !1;
                        return !0
                    }

                    function m(e) {
                        return function (e) {
                            return ~-encodeURI(e).split(/%..|./).length
                        }(JSON.stringify(e))
                    }

                    function g(e) {
                        if ("string" == typeof e) return u(e, 40);
                        if ("number" == typeof e || "boolean" == typeof e || void 0 === e) return e;
                        var t = Object.prototype.toString.call(e);
                        return "[object Object]" === t ? "[Object]" : "[object Array]" === t ? "[Array]" : "[object Function]" === t ? e.name ? "[Function: " + e.name + "]" : "[Function]" : e
                    }

                    var v = e(7),
                        y = "undefined" != typeof window ? window : void 0 !== t ? t : "undefined" != typeof self ? self : {},
                        b = 3, w = 51200, E = 40;
                    n.exports = {
                        isObject: function (e) {
                            return "object" == typeof e && null !== e
                        }, isError: function (e) {
                            switch (Object.prototype.toString.call(e)) {
                                case"[object Error]":
                                case"[object Exception]":
                                case"[object DOMException]":
                                    return !0;
                                default:
                                    return e instanceof Error
                            }
                        }, isErrorEvent: function (e) {
                            return "[object ErrorEvent]" === Object.prototype.toString.call(e)
                        }, isDOMError: function (e) {
                            return "[object DOMError]" === Object.prototype.toString.call(e)
                        }, isDOMException: function (e) {
                            return "[object DOMException]" === Object.prototype.toString.call(e)
                        }, isUndefined: r, isFunction: function (e) {
                            return "function" == typeof e
                        }, isPlainObject: i, isString: o, isArray: a, isEmptyObject: function (e) {
                            if (!i(e)) return !1;
                            for (var t in e) if (e.hasOwnProperty(t)) return !1;
                            return !0
                        }, supportsErrorEvent: function () {
                            try {
                                return new ErrorEvent(""), !0
                            } catch (e) {
                                return !1
                            }
                        }, supportsDOMError: function () {
                            try {
                                return new DOMError(""), !0
                            } catch (e) {
                                return !1
                            }
                        }, supportsDOMException: function () {
                            try {
                                return new DOMException(""), !0
                            } catch (e) {
                                return !1
                            }
                        }, supportsFetch: s, supportsReferrerPolicy: function () {
                            if (!s()) return !1;
                            try {
                                return new Request("pickleRick", {referrerPolicy: "origin"}), !0
                            } catch (e) {
                                return !1
                            }
                        }, supportsPromiseRejectionEvent: function () {
                            return "function" == typeof PromiseRejectionEvent
                        }, wrappedCallback: function (e) {
                            return function (t, n) {
                                var r = e(t) || t;
                                return n && n(r) || r
                            }
                        }, each: c, objectMerge: function (e, t) {
                            return t ? (c(t, function (t, n) {
                                e[t] = n
                            }), e) : e
                        }, truncate: u, objectFrozen: function (e) {
                            return !!Object.isFrozen && Object.isFrozen(e)
                        }, hasKey: l, joinRegExp: f, urlencode: function (e) {
                            var t = [];
                            return c(e, function (e, n) {
                                t.push(encodeURIComponent(e) + "=" + encodeURIComponent(n))
                            }), t.join("&")
                        }, uuid4: function () {
                            var e = y.crypto || y.msCrypto;
                            if (!r(e) && e.getRandomValues) {
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
                        }, htmlTreeAsString: function (e) {
                            for (var t, n = [], r = 0, i = 0, o = " > ".length; e && r++ < 5 && !("html" === (t = h(e)) || r > 1 && i + n.length * o + t.length >= 80);) n.push(t), i += t.length, e = e.parentNode;
                            return n.reverse().join(" > ")
                        }, htmlElementAsString: h, isSameException: function (e, t) {
                            return !p(e, t) && (e = e.values[0], t = t.values[0], e.type === t.type && e.value === t.value && !function (e, t) {
                                return r(e) && r(t)
                            }(e.stacktrace, t.stacktrace) && d(e.stacktrace, t.stacktrace))
                        }, isSameStacktrace: d, parseUrl: function (e) {
                            if ("string" != typeof e) return {};
                            var t = e.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/),
                                n = t[6] || "", r = t[8] || "";
                            return {protocol: t[2], host: t[4], path: t[5], relative: t[5] + n + r}
                        }, fill: function (e, t, n, r) {
                            if (null != e) {
                                var i = e[t];
                                e[t] = n(i), e[t].M = !0, e[t].O = i, r && r.push([e, t, i])
                            }
                        }, safeJoin: function (e, t) {
                            if (!a(e)) return "";
                            for (var n = [], r = 0; r < e.length; r++) try {
                                n.push(String(e[r]))
                            } catch (e) {
                                n.push("[value cannot be serialized]")
                            }
                            return n.join(t)
                        }, serializeException: function e(t, n, r) {
                            if (!i(t)) return t;
                            r = "number" != typeof (n = "number" != typeof n ? b : n) ? w : r;
                            var o = function e(t, n) {
                                return 0 === n ? g(t) : i(t) ? Object.keys(t).reduce(function (r, i) {
                                    return r[i] = e(t[i], n - 1), r
                                }, {}) : Array.isArray(t) ? t.map(function (t) {
                                    return e(t, n - 1)
                                }) : g(t)
                            }(t, n);
                            return m(v(o)) > r ? e(t, n - 1) : o
                        }, serializeKeysForMessage: function (e, t) {
                            if ("number" == typeof e || "string" == typeof e) return e.toString();
                            if (!Array.isArray(e)) return "";
                            if (0 === (e = e.filter(function (e) {
                                return "string" == typeof e
                            })).length) return "[object has no keys]";
                            if (t = "number" != typeof t ? E : t, e[0].length >= t) return e[0];
                            for (var n = e.length; n > 0; n--) {
                                var r = e.slice(0, n).join(", ");
                                if (!(r.length > t)) return n === e.length ? r : r + "…"
                            }
                            return ""
                        }, sanitize: function (e, t) {
                            if (!a(t) || a(t) && 0 === t.length) return e;
                            var n, r = f(t), o = "********";
                            try {
                                n = JSON.parse(v(e))
                            } catch (t) {
                                return e
                            }
                            return function e(t) {
                                return a(t) ? t.map(function (t) {
                                    return e(t)
                                }) : i(t) ? Object.keys(t).reduce(function (n, i) {
                                    return n[i] = r.test(i) ? o : e(t[i]), n
                                }, {}) : t
                            }(n)
                        }
                    }
                }).call(this, void 0 !== t ? t : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {7: 7}], 6: [function (e, n, r) {
                (function (t) {
                    function r() {
                        return "undefined" == typeof document || null == document.location ? "" : document.location.href
                    }

                    var i = e(5), o = {collectWindowErrors: !0, debug: !1},
                        a = "undefined" != typeof window ? window : void 0 !== t ? t : "undefined" != typeof self ? self : {},
                        s = [].slice, c = "?",
                        u = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
                    o.report = function () {
                        function e(e, t) {
                            var n = null;
                            if (!t || o.collectWindowErrors) {
                                for (var r in p) if (p.hasOwnProperty(r)) try {
                                    p[r].apply(null, [e].concat(s.call(arguments, 2)))
                                } catch (e) {
                                    n = e
                                }
                                if (n) throw n
                            }
                        }

                        function t(t, a, s, l, h) {
                            var p = i.isErrorEvent(h) ? h.error : h, d = i.isErrorEvent(t) ? t.message : t;
                            if (g) o.computeStackTrace.augmentStackTraceWithInitialElement(g, a, s, d), n(); else if (p && i.isError(p)) e(o.computeStackTrace(p), !0); else {
                                var m = {url: a, line: s, column: l}, v = void 0;
                                if ("[object String]" === {}.toString.call(d)) {
                                    var y = d.match(u);
                                    y && (v = y[1], d = y[2])
                                }
                                m.func = c, e({name: v, message: d, url: r(), stack: [m]}, !0)
                            }
                            return !!f && f.apply(this, arguments)
                        }

                        function n() {
                            var t = g, n = d;
                            d = null, g = null, m = null, e.apply(null, [t, !1].concat(n))
                        }

                        function l(e, t) {
                            var r = s.call(arguments, 1);
                            if (g) {
                                if (m === e) return;
                                n()
                            }
                            var i = o.computeStackTrace(e);
                            if (g = i, m = e, d = r, setTimeout(function () {
                                m === e && n()
                            }, i.incomplete ? 2e3 : 0), !1 !== t) throw e
                        }

                        var f, h, p = [], d = null, m = null, g = null;
                        return l.subscribe = function (e) {
                            h || (f = a.onerror, a.onerror = t, h = !0), p.push(e)
                        }, l.unsubscribe = function (e) {
                            for (var t = p.length - 1; t >= 0; --t) p[t] === e && p.splice(t, 1)
                        }, l.uninstall = function () {
                            h && (a.onerror = f, h = !1, f = void 0), p = []
                        }, l
                    }(), o.computeStackTrace = function () {
                        function e(e) {
                            if (void 0 !== e.stack && e.stack) {
                                for (var t, n, i, o = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, a = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx(?:-web)|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, s = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, u = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, l = /\((\S*)(?::(\d+))(?::(\d+))\)/, f = e.stack.split("\n"), h = [], p = (/^(.*) is undefined$/.exec(e.message), 0), d = f.length; p < d; ++p) {
                                    if (n = o.exec(f[p])) {
                                        var m = n[2] && 0 === n[2].indexOf("native"),
                                            g = n[2] && 0 === n[2].indexOf("eval");
                                        g && (t = l.exec(n[2])) && (n[2] = t[1], n[3] = t[2], n[4] = t[3]), i = {
                                            url: m ? null : n[2],
                                            func: n[1] || c,
                                            args: m ? [n[2]] : [],
                                            line: n[3] ? +n[3] : null,
                                            column: n[4] ? +n[4] : null
                                        }
                                    } else if (n = a.exec(f[p])) i = {
                                        url: n[2],
                                        func: n[1] || c,
                                        args: [],
                                        line: +n[3],
                                        column: n[4] ? +n[4] : null
                                    }; else {
                                        if (!(n = s.exec(f[p]))) continue;
                                        var g = n[3] && n[3].indexOf(" > eval") > -1;
                                        g && (t = u.exec(n[3])) ? (n[3] = t[1], n[4] = t[2], n[5] = null) : 0 !== p || n[5] || void 0 === e.columnNumber || (h[0].column = e.columnNumber + 1), i = {
                                            url: n[3],
                                            func: n[1] || c,
                                            args: n[2] ? n[2].split(",") : [],
                                            line: n[4] ? +n[4] : null,
                                            column: n[5] ? +n[5] : null
                                        }
                                    }
                                    if (!i.func && i.line && (i.func = c), i.url && "blob:" === i.url.substr(0, 5)) {
                                        var v = new XMLHttpRequest;
                                        if (v.open("GET", i.url, !1), v.send(null), 200 === v.status) {
                                            var y = v.responseText || "",
                                                b = (y = y.slice(-300)).match(/\/\/# sourceMappingURL=(.*)$/);
                                            if (b) {
                                                var w = b[1];
                                                "~" === w.charAt(0) && (w = ("undefined" == typeof document || null == document.location ? "" : document.location.origin ? document.location.origin : document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port : "")) + w.slice(1)), i.url = w.slice(0, -4)
                                            }
                                        }
                                    }
                                    h.push(i)
                                }
                                return h.length ? {name: e.name, message: e.message, url: r(), stack: h} : null
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
                            for (var s, u, l = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, f = [], h = {}, p = !1, d = n.caller; d && !p; d = d.caller) if (d !== i && d !== o.report) {
                                if (u = {
                                    url: null,
                                    func: c,
                                    line: null,
                                    column: null
                                }, d.name ? u.func = d.name : (s = l.exec(d.toString())) && (u.func = s[1]), void 0 === u.func) try {
                                    u.func = s.input.substring(0, s.input.indexOf("{"))
                                } catch (e) {
                                }
                                h["" + d] ? p = !0 : h["" + d] = !0, f.push(u)
                            }
                            a && f.splice(0, a);
                            var m = {name: e.name, message: e.message, url: r(), stack: f};
                            return t(m, e.sourceURL || e.fileName, e.line || e.lineNumber, e.message || e.description), m
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
                    }(), n.exports = o
                }).call(this, void 0 !== t ? t : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {5: 5}], 7: [function (e, t, n) {
                function r(e, t) {
                    for (var n = 0; n < e.length; ++n) if (e[n] === t) return n;
                    return -1
                }

                function i(e, t) {
                    var n = [], i = [];
                    return null == t && (t = function (e, t) {
                        return n[0] === t ? "[Circular ~]" : "[Circular ~." + i.slice(0, r(n, t)).join(".") + "]"
                    }), function (o, a) {
                        if (n.length > 0) {
                            var s = r(n, this);
                            ~s ? n.splice(s + 1) : n.push(this), ~s ? i.splice(s, 1 / 0, o) : i.push(o), ~r(n, a) && (a = t.call(this, o, a))
                        } else n.push(a);
                        return null == e ? a instanceof Error ? function (e) {
                            var t = {stack: e.stack, message: e.message, name: e.name};
                            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                            return t
                        }(a) : a : e.call(this, o, a)
                    }
                }

                (t.exports = function (e, t, n, r) {
                    return JSON.stringify(e, i(t, r), n)
                }).getSerialize = i
            }, {}], 8: [function (e, t, n) {
                function r(e, t) {
                    var n = (65535 & e) + (65535 & t), r = (e >> 16) + (t >> 16) + (n >> 16);
                    return r << 16 | 65535 & n
                }

                function i(e, t, n, i, o, a) {
                    return r(function (e, t) {
                        return e << t | e >>> 32 - t
                    }(r(r(t, e), r(i, a)), o), n)
                }

                function o(e, t, n, r, o, a, s) {
                    return i(t & n | ~t & r, e, t, o, a, s)
                }

                function a(e, t, n, r, o, a, s) {
                    return i(t & r | n & ~r, e, t, o, a, s)
                }

                function s(e, t, n, r, o, a, s) {
                    return i(t ^ n ^ r, e, t, o, a, s)
                }

                function c(e, t, n, r, o, a, s) {
                    return i(n ^ (t | ~r), e, t, o, a, s)
                }

                function u(e, t) {
                    e[t >> 5] |= 128 << t % 32, e[14 + (t + 64 >>> 9 << 4)] = t;
                    var n, i, u, l, f, h = 1732584193, p = -271733879, d = -1732584194, m = 271733878;
                    for (n = 0; n < e.length; n += 16) i = h, u = p, l = d, f = m, h = o(h, p, d, m, e[n], 7, -680876936), m = o(m, h, p, d, e[n + 1], 12, -389564586), d = o(d, m, h, p, e[n + 2], 17, 606105819), p = o(p, d, m, h, e[n + 3], 22, -1044525330), h = o(h, p, d, m, e[n + 4], 7, -176418897), m = o(m, h, p, d, e[n + 5], 12, 1200080426), d = o(d, m, h, p, e[n + 6], 17, -1473231341), p = o(p, d, m, h, e[n + 7], 22, -45705983), h = o(h, p, d, m, e[n + 8], 7, 1770035416), m = o(m, h, p, d, e[n + 9], 12, -1958414417), d = o(d, m, h, p, e[n + 10], 17, -42063), p = o(p, d, m, h, e[n + 11], 22, -1990404162), h = o(h, p, d, m, e[n + 12], 7, 1804603682), m = o(m, h, p, d, e[n + 13], 12, -40341101), d = o(d, m, h, p, e[n + 14], 17, -1502002290), p = o(p, d, m, h, e[n + 15], 22, 1236535329), h = a(h, p, d, m, e[n + 1], 5, -165796510), m = a(m, h, p, d, e[n + 6], 9, -1069501632), d = a(d, m, h, p, e[n + 11], 14, 643717713), p = a(p, d, m, h, e[n], 20, -373897302), h = a(h, p, d, m, e[n + 5], 5, -701558691), m = a(m, h, p, d, e[n + 10], 9, 38016083), d = a(d, m, h, p, e[n + 15], 14, -660478335), p = a(p, d, m, h, e[n + 4], 20, -405537848), h = a(h, p, d, m, e[n + 9], 5, 568446438), m = a(m, h, p, d, e[n + 14], 9, -1019803690), d = a(d, m, h, p, e[n + 3], 14, -187363961), p = a(p, d, m, h, e[n + 8], 20, 1163531501), h = a(h, p, d, m, e[n + 13], 5, -1444681467), m = a(m, h, p, d, e[n + 2], 9, -51403784), d = a(d, m, h, p, e[n + 7], 14, 1735328473), p = a(p, d, m, h, e[n + 12], 20, -1926607734), h = s(h, p, d, m, e[n + 5], 4, -378558), m = s(m, h, p, d, e[n + 8], 11, -2022574463), d = s(d, m, h, p, e[n + 11], 16, 1839030562), p = s(p, d, m, h, e[n + 14], 23, -35309556), h = s(h, p, d, m, e[n + 1], 4, -1530992060), m = s(m, h, p, d, e[n + 4], 11, 1272893353), d = s(d, m, h, p, e[n + 7], 16, -155497632), p = s(p, d, m, h, e[n + 10], 23, -1094730640), h = s(h, p, d, m, e[n + 13], 4, 681279174), m = s(m, h, p, d, e[n], 11, -358537222), d = s(d, m, h, p, e[n + 3], 16, -722521979), p = s(p, d, m, h, e[n + 6], 23, 76029189), h = s(h, p, d, m, e[n + 9], 4, -640364487), m = s(m, h, p, d, e[n + 12], 11, -421815835), d = s(d, m, h, p, e[n + 15], 16, 530742520), p = s(p, d, m, h, e[n + 2], 23, -995338651), h = c(h, p, d, m, e[n], 6, -198630844), m = c(m, h, p, d, e[n + 7], 10, 1126891415), d = c(d, m, h, p, e[n + 14], 15, -1416354905), p = c(p, d, m, h, e[n + 5], 21, -57434055), h = c(h, p, d, m, e[n + 12], 6, 1700485571), m = c(m, h, p, d, e[n + 3], 10, -1894986606), d = c(d, m, h, p, e[n + 10], 15, -1051523), p = c(p, d, m, h, e[n + 1], 21, -2054922799), h = c(h, p, d, m, e[n + 8], 6, 1873313359), m = c(m, h, p, d, e[n + 15], 10, -30611744), d = c(d, m, h, p, e[n + 6], 15, -1560198380), p = c(p, d, m, h, e[n + 13], 21, 1309151649), h = c(h, p, d, m, e[n + 4], 6, -145523070), m = c(m, h, p, d, e[n + 11], 10, -1120210379), d = c(d, m, h, p, e[n + 2], 15, 718787259), p = c(p, d, m, h, e[n + 9], 21, -343485551), h = r(h, i), p = r(p, u), d = r(d, l), m = r(m, f);
                    return [h, p, d, m]
                }

                function l(e) {
                    var t, n = "", r = 32 * e.length;
                    for (t = 0; t < r; t += 8) n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
                    return n
                }

                function f(e) {
                    var t, n = [];
                    for (n[(e.length >> 2) - 1] = void 0, t = 0; t < n.length; t += 1) n[t] = 0;
                    var r = 8 * e.length;
                    for (t = 0; t < r; t += 8) n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
                    return n
                }

                function h(e) {
                    var t, n, r = "0123456789abcdef", i = "";
                    for (n = 0; n < e.length; n += 1) t = e.charCodeAt(n), i += r.charAt(t >>> 4 & 15) + r.charAt(15 & t);
                    return i
                }

                function p(e) {
                    return unescape(encodeURIComponent(e))
                }

                function d(e) {
                    return function (e) {
                        return l(u(f(e), 8 * e.length))
                    }(p(e))
                }

                function m(e, t) {
                    return function (e, t) {
                        var n, r, i = f(e), o = [], a = [];
                        for (o[15] = a[15] = void 0, i.length > 16 && (i = u(i, 8 * e.length)), n = 0; n < 16; n += 1) o[n] = 909522486 ^ i[n], a[n] = 1549556828 ^ i[n];
                        return r = u(o.concat(f(t)), 512 + 8 * t.length), l(u(a.concat(r), 640))
                    }(p(e), p(t))
                }

                t.exports = function (e, t, n) {
                    return t ? n ? m(t, e) : function (e, t) {
                        return h(m(e, t))
                    }(t, e) : n ? d(e) : function (e) {
                        return h(d(e))
                    }(e)
                }
            }, {}]
        }, {}, [4])(4)
    }).call(this, n(6))
}, function (e, t) {
    var n;
    n = function () {
        return this
    }();
    try {
        n = n || new Function("return this")()
    } catch (e) {
        "object" == typeof window && (n = window)
    }
    e.exports = n
}]);