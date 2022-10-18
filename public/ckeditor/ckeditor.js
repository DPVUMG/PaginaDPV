﻿/*
Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license/
*/
(function () {
    if (!window.CKEDITOR || !window.CKEDITOR.dom) {
        window.CKEDITOR || (window.CKEDITOR = function () {
            var a = /(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i, h = {
                timestamp: "M8SC", version: "4.20.0 (Full)", revision: "cb4a59c665", rnd: Math.floor(900 * Math.random()) + 100, _: { pending: [], basePathSrcPattern: a }, status: "unloaded", basePath: function () {
                    var b = window.CKEDITOR_BASEPATH || ""; if (!b) for (var f = document.getElementsByTagName("script"), k = 0; k < f.length; k++) { var l = f[k].src.match(a); if (l) { b = l[1]; break } } -1 == b.indexOf(":/") &&
                        "//" != b.slice(0, 2) && (b = 0 === b.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + b : location.href.match(/^[^\?]*\/(?:)/)[0] + b); if (!b) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.'; return b
                }(), getUrl: function (a) { -1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a); return a = this.appendTimestamp(a) }, appendTimestamp: function (a) {
                    if (!this.timestamp || "/" === a.charAt(a.length - 1) || /[&?]t=/.test(a)) return a;
                    var b = 0 <= a.indexOf("?") ? "\x26" : "?"; return a + b + "t\x3d" + this.timestamp
                }, domReady: function () {
                    function a() { try { document.addEventListener ? (document.removeEventListener("DOMContentLoaded", a, !1), window.removeEventListener("load", a, !1), b()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), window.detachEvent("onload", a), b()) } catch (l) { } } function b() { for (var a; a = f.shift();)a() } var f = []; return function (b) {
                        function g() {
                            try { document.documentElement.doScroll("left") } catch (c) {
                                setTimeout(g,
                                    1); return
                            } a()
                        } f.push(b); "complete" === document.readyState && setTimeout(a, 1); if (1 == f.length) if (document.addEventListener) document.addEventListener("DOMContentLoaded", a, !1), window.addEventListener("load", a, !1); else if (document.attachEvent) { document.attachEvent("onreadystatechange", a); window.attachEvent("onload", a); b = !1; try { b = !window.frameElement } catch (e) { } document.documentElement.doScroll && b && g() }
                    }
                }()
            }, f = window.CKEDITOR_GETURL; if (f) { var b = h.getUrl; h.getUrl = function (a) { return f.call(h, a) || b.call(h, a) } } return h
        }());
        (function () {
            var a = {}; CKEDITOR.event || (CKEDITOR.event = function () { }, CKEDITOR.event.implementOn = function (a) { var f = CKEDITOR.event.prototype, b; for (b in f) null == a[b] && (a[b] = f[b]) }, CKEDITOR.event.prototype = function () {
                function h(a) { var m = f(this); return m[a] || (m[a] = new b(a)) } var f = function (a) { a = a.getPrivate && a.getPrivate() || a._ || (a._ = {}); return a.events || (a.events = {}) }, b = function (a) { this.name = a; this.listeners = [] }; b.prototype = {
                    getListenerIndex: function (a) {
                        for (var b = 0, f = this.listeners; b < f.length; b++)if (f[b].fn ==
                            a) return b; return -1
                    }
                }; return {
                    define: function (a, b) { var f = h.call(this, a); CKEDITOR.tools.extend(f, b, !0) }, on: function (b, f, k, l, g) {
                        function e(n, g, e, r) { n = { name: b, sender: this, editor: n, data: g, listenerData: l, stop: e, cancel: r, removeListener: c }; return !1 === f.call(k, n) ? a : n.data } function c() { n.removeListener(b, f) } var n = this, r = h.call(this, b); if (0 > r.getListenerIndex(f)) {
                            r = r.listeners; k || (k = this); isNaN(g) && (g = 10); e.fn = f; e.priority = g; for (var x = r.length - 1; 0 <= x; x--)if (r[x].priority <= g) return r.splice(x + 1, 0, e), { removeListener: c };
                            r.unshift(e)
                        } return { removeListener: c }
                    }, once: function () { var a = Array.prototype.slice.call(arguments), b = a[1]; a[1] = function (a) { a.removeListener(); return b.apply(this, arguments) }; return this.on.apply(this, a) }, capture: function () { CKEDITOR.event.useCapture = 1; var a = this.on.apply(this, arguments); CKEDITOR.event.useCapture = 0; return a }, fire: function () {
                        var b = 0, m = function () { b = 1 }, k = 0, l = function () { k = 1 }; return function (g, e, c) {
                            var n = f(this)[g]; g = b; var r = k; b = k = 0; if (n) {
                                var h = n.listeners; if (h.length) for (var h = h.slice(0),
                                    u, p = 0; p < h.length; p++) { if (n.errorProof) try { u = h[p].call(this, c, e, m, l) } catch (t) { } else u = h[p].call(this, c, e, m, l); u === a ? k = 1 : "undefined" != typeof u && (e = u); if (b || k) break }
                            } e = k ? !1 : "undefined" == typeof e ? !0 : e; b = g; k = r; return e
                        }
                    }(), fireOnce: function (a, b, k) { b = this.fire(a, b, k); delete f(this)[a]; return b }, removeListener: function (a, b) { var k = f(this)[a]; if (k) { var l = k.getListenerIndex(b); 0 <= l && k.listeners.splice(l, 1) } }, removeAllListeners: function () { var a = f(this), b; for (b in a) delete a[b] }, hasListeners: function (a) {
                        return (a =
                            f(this)[a]) && 0 < a.listeners.length
                    }
                }
            }())
        })(); CKEDITOR.editor || (CKEDITOR.editor = function () { CKEDITOR._.pending.push([this, arguments]); CKEDITOR.event.call(this) }, CKEDITOR.editor.prototype.fire = function (a, h) { a in { instanceReady: 1, loaded: 1 } && (this[a] = !0); return CKEDITOR.event.prototype.fire.call(this, a, h, this) }, CKEDITOR.editor.prototype.fireOnce = function (a, h) { a in { instanceReady: 1, loaded: 1 } && (this[a] = !0); return CKEDITOR.event.prototype.fireOnce.call(this, a, h, this) }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype));
        CKEDITOR.env || (CKEDITOR.env = function () {
            var a = navigator.userAgent.toLowerCase(), h = a.match(/edge[ \/](\d+.?\d*)/), f = -1 < a.indexOf("trident/"), f = !(!h && !f), f = {
                ie: f, edge: !!h, webkit: !f && -1 < a.indexOf(" applewebkit/"), air: -1 < a.indexOf(" adobeair/"), mac: -1 < a.indexOf("macintosh"), quirks: "BackCompat" == document.compatMode && (!document.documentMode || 10 > document.documentMode), mobile: -1 < a.indexOf("mobile"), iOS: /(ipad|iphone|ipod)/.test(a), isCustomDomain: function () {
                    if (!this.ie) return !1; var a = document.domain, b = window.location.hostname;
                    return a != b && a != "[" + b + "]"
                }, secure: "https:" == location.protocol
            }; f.gecko = "Gecko" == navigator.product && !f.webkit && !f.ie; f.webkit && (-1 < a.indexOf("chrome") ? f.chrome = !0 : f.safari = !0); var b = 0; f.ie && (b = h ? parseFloat(h[1]) : f.quirks || !document.documentMode ? parseFloat(a.match(/msie (\d+)/)[1]) : document.documentMode, f.ie9Compat = 9 == b, f.ie8Compat = 8 == b, f.ie7Compat = 7 == b, f.ie6Compat = 7 > b || f.quirks); f.gecko && (h = a.match(/rv:([\d\.]+)/)) && (h = h[1].split("."), b = 1E4 * h[0] + 100 * (h[1] || 0) + 1 * (h[2] || 0)); f.air && (b = parseFloat(a.match(/ adobeair\/(\d+)/)[1]));
            f.webkit && (b = parseFloat(a.match(/ applewebkit\/(\d+)/)[1])); f.version = b; f.isCompatible = !(f.ie && 7 > b) && !(f.gecko && 4E4 > b) && !(f.webkit && 534 > b); f.hidpi = 2 <= window.devicePixelRatio; f.needsBrFiller = f.gecko || f.webkit || f.ie && 10 < b; f.needsNbspFiller = f.ie && 11 > b; f.cssClass = "cke_browser_" + (f.ie ? "ie" : f.gecko ? "gecko" : f.webkit ? "webkit" : "unknown"); f.quirks && (f.cssClass += " cke_browser_quirks"); f.ie && (f.cssClass += " cke_browser_ie" + (f.quirks ? "6 cke_browser_iequirks" : f.version)); f.air && (f.cssClass += " cke_browser_air");
            f.iOS && (f.cssClass += " cke_browser_ios"); f.hidpi && (f.cssClass += " cke_hidpi"); return f
        }()); "unloaded" == CKEDITOR.status && function () {
            CKEDITOR.event.implementOn(CKEDITOR); CKEDITOR.loadFullCore = function () { if ("basic_ready" != CKEDITOR.status) CKEDITOR.loadFullCore._load = 1; else { delete CKEDITOR.loadFullCore; var a = document.createElement("script"); a.type = "text/javascript"; a.src = CKEDITOR.basePath + "ckeditor.js"; document.getElementsByTagName("head")[0].appendChild(a) } }; CKEDITOR.loadFullCoreTimeout = 0; CKEDITOR.add =
                function (a) { (this._.pending || (this._.pending = [])).push(a) }; (function () { CKEDITOR.domReady(function () { var a = CKEDITOR.loadFullCore, h = CKEDITOR.loadFullCoreTimeout; a && (CKEDITOR.status = "basic_ready", a && a._load ? a() : h && setTimeout(function () { CKEDITOR.loadFullCore && CKEDITOR.loadFullCore() }, 1E3 * h)) }) })(); CKEDITOR.status = "basic_loaded"
        }(); "use strict"; CKEDITOR.VERBOSITY_WARN = 1; CKEDITOR.VERBOSITY_ERROR = 2; CKEDITOR.verbosity = CKEDITOR.VERBOSITY_WARN | CKEDITOR.VERBOSITY_ERROR; CKEDITOR.warn = function (a, h) {
            CKEDITOR.verbosity &
                CKEDITOR.VERBOSITY_WARN && CKEDITOR.fire("log", { type: "warn", errorCode: a, additionalData: h })
        }; CKEDITOR.error = function (a, h) { CKEDITOR.verbosity & CKEDITOR.VERBOSITY_ERROR && CKEDITOR.fire("log", { type: "error", errorCode: a, additionalData: h }) }; CKEDITOR.on("log", function (a) {
            if (window.console && window.console.log) {
                var h = console[a.data.type] ? a.data.type : "log", f = a.data.errorCode; if (a = a.data.additionalData) console[h]("[CKEDITOR] Error code: " + f + ".", a); else console[h]("[CKEDITOR] Error code: " + f + "."); console[h]("[CKEDITOR] For more information about this error go to https://ckeditor.com/docs/ckeditor4/latest/guide/dev_errors.html#" +
                    f)
            }
        }, null, null, 999); CKEDITOR.dom = {}; (function () {
            function a(c, a, b) { this._minInterval = c; this._context = b; this._lastOutput = this._scheduledTimer = 0; this._output = CKEDITOR.tools.bind(a, b || {}); var g = this; this.input = function () { function c() { g._lastOutput = (new Date).getTime(); g._scheduledTimer = 0; g._call() } if (!g._scheduledTimer || !1 !== g._reschedule()) { var a = (new Date).getTime() - g._lastOutput; a < g._minInterval ? g._scheduledTimer = setTimeout(c, g._minInterval - a) : c() } } } function h(c, b, g) {
                a.call(this, c, b, g); this._args =
                    []; var e = this; this.input = CKEDITOR.tools.override(this.input, function (c) { return function () { e._args = Array.prototype.slice.call(arguments); c.call(this) } })
            } var f = [], b = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.ie ? "-ms-" : "", d = /&/g, m = />/g, k = /</g, l = /"/g, g = /&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g, e = { lt: "\x3c", gt: "\x3e", amp: "\x26", quot: '"', nbsp: " ", shy: "­" }, c = function (c, a) { return "#" == a[0] ? String.fromCharCode(parseInt(a.slice(1), 10)) : e[a] }; CKEDITOR.on("reset", function () { f = [] }); CKEDITOR.tools =
            {
                arrayCompare: function (c, a) { if (!c && !a) return !0; if (!c || !a || c.length != a.length) return !1; for (var b = 0; b < c.length; b++)if (c[b] != a[b]) return !1; return !0 }, getIndex: function (c, a) { for (var b = 0; b < c.length; ++b)if (a(c[b])) return b; return -1 }, clone: function (c) {
                    var a; if (c && c instanceof Array) { a = []; for (var b = 0; b < c.length; b++)a[b] = CKEDITOR.tools.clone(c[b]); return a } if (null === c || "object" != typeof c || c instanceof String || c instanceof Number || c instanceof Boolean || c instanceof Date || c instanceof RegExp || c.nodeType || c.window ===
                        c) return c; a = new c.constructor; for (b in c) a[b] = CKEDITOR.tools.clone(c[b]); return a
                }, capitalize: function (c, a) { return c.charAt(0).toUpperCase() + (a ? c.slice(1) : c.slice(1).toLowerCase()) }, extend: function (c) { var a = arguments.length, b, g; "boolean" == typeof (b = arguments[a - 1]) ? a-- : "boolean" == typeof (b = arguments[a - 2]) && (g = arguments[a - 1], a -= 2); for (var e = 1; e < a; e++) { var d = arguments[e] || {}; CKEDITOR.tools.array.forEach(CKEDITOR.tools.object.keys(d), function (a) { if (!0 === b || null == c[a]) if (!g || a in g) c[a] = d[a] }) } return c },
                prototypedCopy: function (c) { var a = function () { }; a.prototype = c; return new a }, copy: function (c) { var a = {}, b; for (b in c) a[b] = c[b]; return a }, isArray: function (c) { return "[object Array]" == Object.prototype.toString.call(c) }, isEmpty: function (c) { for (var a in c) if (c.hasOwnProperty(a)) return !1; return !0 }, cssVendorPrefix: function (c, a, g) { if (g) return b + c + ":" + a + ";" + c + ":" + a; g = {}; g[c] = a; g[b + c] = a; return g }, cssStyleToDomStyle: function () {
                    var c = document.createElement("div").style, a = "undefined" != typeof c.cssFloat ? "cssFloat" :
                        "undefined" != typeof c.styleFloat ? "styleFloat" : "float"; return function (c) { return "float" == c ? a : c.replace(/-./g, function (c) { return c.substr(1).toUpperCase() }) }
                }(), buildStyleHtml: function (c) { c = [].concat(c); for (var a, b = [], g = 0; g < c.length; g++)if (a = c[g]) /@import|[{}]/.test(a) ? b.push("\x3cstyle\x3e" + a + "\x3c/style\x3e") : (a = CKEDITOR.appendTimestamp(a), b.push('\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' + a + '"\x3e')); return b.join("") }, htmlEncode: function (c) {
                    return void 0 === c || null === c ? "" : String(c).replace(d,
                        "\x26amp;").replace(m, "\x26gt;").replace(k, "\x26lt;")
                }, htmlDecode: function (a) { return a.replace(g, c) }, htmlEncodeAttr: function (c) { return CKEDITOR.tools.htmlEncode(c).replace(l, "\x26quot;") }, htmlDecodeAttr: function (c) { return CKEDITOR.tools.htmlDecode(c) }, transformPlainTextToHtml: function (c, a) {
                    var b = a == CKEDITOR.ENTER_BR, g = this.htmlEncode(c.replace(/\r\n/g, "\n")), g = g.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;"), e = a == CKEDITOR.ENTER_P ? "p" : "div"; if (!b) {
                        var d = /\n{2}/g; if (d.test(g)) var l = "\x3c" + e + "\x3e", f =
                            "\x3c/" + e + "\x3e", g = l + g.replace(d, function () { return f + l }) + f
                    } g = g.replace(/\n/g, "\x3cbr\x3e"); b || (g = g.replace(new RegExp("\x3cbr\x3e(?\x3d\x3c/" + e + "\x3e)"), function (c) { return CKEDITOR.tools.repeat(c, 2) })); g = g.replace(/^ | $/g, "\x26nbsp;"); return g = g.replace(/(>|\s) /g, function (c, a) { return a + "\x26nbsp;" }).replace(/ (?=<)/g, "\x26nbsp;")
                }, getNextNumber: function () { var c = 0; return function () { return ++c } }(), getNextId: function () { return "cke_" + this.getNextNumber() }, getUniqueId: function () {
                    for (var c = "e", a = 0; 8 > a; a++)c +=
                        Math.floor(65536 * (1 + Math.random())).toString(16).substring(1); return c
                }, override: function (c, a) { var b = a(c); b.prototype = c.prototype; return b }, setTimeout: function (c, a, b, g, e) { e || (e = window); b || (b = e); return e.setTimeout(function () { g ? c.apply(b, [].concat(g)) : c.apply(b) }, a || 0) }, debounce: function (c, a) { var b; return function () { var g = this, e = arguments; clearTimeout(b); b = setTimeout(function () { b = null; c.apply(g, e) }, a) } }, throttle: function (c, a, b) { return new this.buffers.throttle(c, a, b) }, trim: function () {
                    var c = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
                    return function (a) { return a.replace(c, "") }
                }(), ltrim: function () { var c = /^[ \t\n\r]+/g; return function (a) { return a.replace(c, "") } }(), rtrim: function () { var c = /[ \t\n\r]+$/g; return function (a) { return a.replace(c, "") } }(), indexOf: function (c, a) { if ("function" == typeof a) for (var b = 0, g = c.length; b < g; b++) { if (a(c[b])) return b } else { if (c.indexOf) return c.indexOf(a); b = 0; for (g = c.length; b < g; b++)if (c[b] === a) return b } return -1 }, search: function (c, a) { var b = CKEDITOR.tools.indexOf(c, a); return 0 <= b ? c[b] : null }, bind: function (c,
                    a) { var b = Array.prototype.slice.call(arguments, 2); return function () { return c.apply(a, b.concat(Array.prototype.slice.call(arguments))) } }, createClass: function (c) {
                        var a = c.$, b = c.base, g = c.privates || c._, e = c.proto; c = c.statics; !a && (a = function () { b && this.base.apply(this, arguments) }); if (g) var d = a, a = function () { var c = this._ || (this._ = {}), a; for (a in g) { var b = g[a]; c[a] = "function" == typeof b ? CKEDITOR.tools.bind(b, this) : b } d.apply(this, arguments) }; b && (a.prototype = this.prototypedCopy(b.prototype), a.prototype.constructor =
                            a, a.base = b, a.baseProto = b.prototype, a.prototype.base = function q() { this.base = b.prototype.base; b.apply(this, arguments); this.base = q }); e && this.extend(a.prototype, e, !0); c && this.extend(a, c, !0); return a
                    }, addFunction: function (c, a) { return f.push(function () { return c.apply(a || this, arguments) }) - 1 }, removeFunction: function (c) { f[c] = null }, callFunction: function (c) { var a = f[c]; return a && a.apply(window, Array.prototype.slice.call(arguments, 1)) }, cssLength: function () {
                        var c = /^-?\d+\.?\d*px$/, a; return function (b) {
                            a = CKEDITOR.tools.trim(b +
                                "") + "px"; return c.test(a) ? a : b || ""
                        }
                    }(), convertToPx: function () { var c, a; return function (b) { if (!c || c.isDetached()) c = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"\x3e\x3c/div\x3e', CKEDITOR.document), CKEDITOR.document.getBody().append(c); if (!/%$/.test(b)) { var g = 0 > parseFloat(b); g && (b = b.replace("-", "")); c.setStyle("width", b); a = c.getClientRect(); b = Math.round(a.width); return g ? -b : b } return b } }(), repeat: function (c, a) {
                        return Array(a +
                            1).join(c)
                    }, tryThese: function () { for (var c, a = 0, b = arguments.length; a < b; a++) { var g = arguments[a]; try { c = g(); break } catch (e) { } } return c }, genKey: function () { return Array.prototype.slice.call(arguments).join("-") }, defer: function (c) { return function () { var a = arguments, b = this; window.setTimeout(function () { c.apply(b, a) }, 0) } }, normalizeCssText: function (c, a) { var b = [], g, e = CKEDITOR.tools.parseCssText(c, !0, a); for (g in e) b.push(g + ":" + e[g]); b.sort(); return b.length ? b.join(";") + ";" : "" }, convertRgbToHex: function (c) {
                        return c.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi,
                            function (c, a, b, g) { c = [a, b, g]; for (a = 0; 3 > a; a++)c[a] = ("0" + parseInt(c[a], 10).toString(16)).slice(-2); return "#" + c.join("") })
                    }, normalizeHex: function (c) { return c.replace(/#(([0-9a-f]{3}){1,2})($|;|\s+)/gi, function (c, a, b, g) { c = a.toLowerCase(); 3 == c.length && (c = c.split(""), c = [c[0], c[0], c[1], c[1], c[2], c[2]].join("")); return "#" + c + g }) }, _isValidColorFormat: function (c) { if (!c) return !1; c = c.replace(/\s+/g, ""); return /^[a-z0-9()#%,./]+$/i.test(c) }, parseCssText: function (c, a, b) {
                        var g = {}; b && (c = (new CKEDITOR.dom.element("span")).setAttribute("style",
                            c).getAttribute("style") || ""); c && (c = CKEDITOR.tools.normalizeHex(CKEDITOR.tools.convertRgbToHex(c))); if (!c || ";" == c) return g; c.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (c, b, e) { a && (b = b.toLowerCase(), "font-family" == b && (e = e.replace(/\s*,\s*/g, ",")), e = CKEDITOR.tools.trim(e)); g[b] = e }); return g
                    }, writeCssText: function (c, a) { var b, g = []; for (b in c) g.push(b + ":" + c[b]); a && g.sort(); return g.join("; ") }, objectCompare: function (c, a, b) {
                        var g; if (!c && !a) return !0; if (!c || !a) return !1;
                        for (g in c) if (c[g] != a[g]) return !1; if (!b) for (g in a) if (c[g] != a[g]) return !1; return !0
                    }, objectKeys: function (c) { return CKEDITOR.tools.object.keys(c) }, convertArrayToObject: function (c, a) { var b = {}; 1 == arguments.length && (a = !0); for (var g = 0, e = c.length; g < e; ++g)b[c[g]] = a; return b }, getStyledSpans: function (c, a) { var b = CKEDITOR.env.ie && 8 == CKEDITOR.env.version ? c.toUpperCase() : c, b = a.find("span[style*\x3d" + b + "]").toArray(); return CKEDITOR.tools.array.filter(b, function (a) { return !!a.getStyle(c) }) }, fixDomain: function () {
                        for (var c; ;)try {
                            c =
                                window.parent.document.domain; break
                        } catch (a) { c = c ? c.replace(/.+?(?:\.|$)/, "") : document.domain; if (!c) break; document.domain = c } return !!c
                    }, eventsBuffer: function (c, a, b) { return new this.buffers.event(c, a, b) }, enableHtml5Elements: function (c, a) { for (var b = "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video".split(" "), g = b.length, e; g--;)e = c.createElement(b[g]), a && c.appendChild(e) }, checkIfAnyArrayItemMatches: function (c,
                        a) { for (var b = 0, g = c.length; b < g; ++b)if (c[b].match(a)) return !0; return !1 }, checkIfAnyObjectPropertyMatches: function (c, a) { for (var b in c) if (b.match(a)) return !0; return !1 }, keystrokeToString: function (c, a) { var b = this.keystrokeToArray(c, a); b.display = b.display.join("+"); b.aria = b.aria.join("+"); return b }, keystrokeToArray: function (c, a) {
                            var b = a & 16711680, g = a & 65535, e = CKEDITOR.env.mac, d = [], l = []; b & CKEDITOR.CTRL && (d.push(e ? "⌘" : c[17]), l.push(e ? c[224] : c[17])); b & CKEDITOR.ALT && (d.push(e ? "⌥" : c[18]), l.push(c[18])); b & CKEDITOR.SHIFT &&
                                (d.push(e ? "⇧" : c[16]), l.push(c[16])); g && (c[g] ? (d.push(c[g]), l.push(c[g])) : (d.push(String.fromCharCode(g)), l.push(String.fromCharCode(g)))); return { display: d, aria: l }
                        }, transparentImageData: "data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw\x3d\x3d", getCookie: function (c) {
                            c = c.toLowerCase(); for (var a = document.cookie.split(";"), b, g, e = 0; e < a.length; e++)if (b = a[e].split("\x3d"), g = decodeURIComponent(CKEDITOR.tools.trim(b[0]).toLowerCase()), g === c) return decodeURIComponent(1 < b.length ?
                                b[1] : ""); return null
                        }, setCookie: function (c, a) { document.cookie = encodeURIComponent(c) + "\x3d" + encodeURIComponent(a) + ";path\x3d/" }, getCsrfToken: function () {
                            var c = CKEDITOR.tools.getCookie("ckCsrfToken"); if (!c || 40 != c.length) {
                                var c = [], a = ""; if (window.crypto && window.crypto.getRandomValues) c = new Uint8Array(40), window.crypto.getRandomValues(c); else for (var b = 0; 40 > b; b++)c.push(Math.floor(256 * Math.random())); for (b = 0; b < c.length; b++)var g = "abcdefghijklmnopqrstuvwxyz0123456789".charAt(c[b] % 36), a = a + (.5 < Math.random() ?
                                    g.toUpperCase() : g); c = a; CKEDITOR.tools.setCookie("ckCsrfToken", c)
                            } return c
                        }, escapeCss: function (c) { if (c) if (window.CSS && CSS.escape) c = CSS.escape(c); else { c = String(c); for (var a = c.length, b = -1, g, e = "", d = c.charCodeAt(0); ++b < a;)g = c.charCodeAt(b), e = 0 == g ? e + "�" : 127 == g || 1 <= g && 31 >= g || 0 == b && 48 <= g && 57 >= g || 1 == b && 48 <= g && 57 >= g && 45 == d ? e + ("\\" + g.toString(16) + " ") : 0 == b && 1 == a && 45 == g ? e + ("\\" + c.charAt(b)) : 128 <= g || 45 == g || 95 == g || 48 <= g && 57 >= g || 65 <= g && 90 >= g || 97 <= g && 122 >= g ? e + c.charAt(b) : e + ("\\" + c.charAt(b)); c = e } else c = ""; return c },
                getMouseButton: function (c) { return (c = c && c.data ? c.data.$ : c) ? CKEDITOR.tools.normalizeMouseButton(c.button) : !1 }, normalizeMouseButton: function (c, a) { if (!CKEDITOR.env.ie || 9 <= CKEDITOR.env.version && !CKEDITOR.env.ie6Compat) return c; for (var b = [[CKEDITOR.MOUSE_BUTTON_LEFT, 1], [CKEDITOR.MOUSE_BUTTON_MIDDLE, 4], [CKEDITOR.MOUSE_BUTTON_RIGHT, 2]], g = 0; g < b.length; g++) { var e = b[g]; if (e[0] === c && a) return e[1]; if (!a && e[1] === c) return e[0] } }, convertHexStringToBytes: function (c) {
                    var a = [], b = c.length / 2, g; for (g = 0; g < b; g++)a.push(parseInt(c.substr(2 *
                        g, 2), 16)); return a
                }, convertBytesToBase64: function (c) { var a = "", b = c.length, g; for (g = 0; g < b; g += 3) { var e = c.slice(g, g + 3), d = e.length, l = [], f; if (3 > d) for (f = d; 3 > f; f++)e[f] = 0; l[0] = (e[0] & 252) >> 2; l[1] = (e[0] & 3) << 4 | e[1] >> 4; l[2] = (e[1] & 15) << 2 | (e[2] & 192) >> 6; l[3] = e[2] & 63; for (f = 0; 4 > f; f++)a = f <= d ? a + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(l[f]) : a + "\x3d" } return a }, style: {
                    parse: {
                        _borderStyle: "none hidden dotted dashed solid double groove ridge inset outset".split(" "), _widthRegExp: /^(thin|medium|thick|[\+-]?\d+(\.\d+)?[a-z%]+|[\+-]?0+(\.0+)?|\.\d+[a-z%]+)$/,
                        _rgbaRegExp: /rgba?\(\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*(?:,\s*[0-9.]+\s*)?\)/gi, _hslaRegExp: /hsla?\(\s*[0-9.]+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[0-9.]+\s*)?\)/gi, background: function (c) { var a = {}, b = this._findColor(c); b.length && (a.color = b[0], CKEDITOR.tools.array.forEach(b, function (a) { c = c.replace(a, "") })); if (c = CKEDITOR.tools.trim(c)) a.unprocessed = c; return a }, margin: function (c) {
                            return CKEDITOR.tools.style.parse.sideShorthand(c, function (c) {
                                return c.match(/(?:\-?[\.\d]+(?:%|\w*)|auto|inherit|initial|unset|revert)/g) ||
                                    ["0px"]
                            })
                        }, sideShorthand: function (c, a) { function b(c) { g.top = e[c[0]]; g.right = e[c[1]]; g.bottom = e[c[2]]; g.left = e[c[3]] } var g = {}, e = a ? a(c) : c.split(/\s+/); switch (e.length) { case 1: b([0, 0, 0, 0]); break; case 2: b([0, 1, 0, 1]); break; case 3: b([0, 1, 2, 1]); break; case 4: b([0, 1, 2, 3]) }return g }, border: function (c) { return CKEDITOR.tools.style.border.fromCssRule(c) }, _findColor: function (c) {
                            var a = [], b = CKEDITOR.tools.array, a = a.concat(c.match(this._rgbaRegExp) || []), a = a.concat(c.match(this._hslaRegExp) || []); return a = a.concat(b.filter(c.split(/\s+/),
                                function (c) { return c.match(/^\#[a-f0-9]{3}(?:[a-f0-9]{3})?$/gi) ? !0 : c.toLowerCase() in CKEDITOR.tools.style.parse._colors }))
                        }
                    }
                }, array: {
                    filter: function (c, a, b) { var g = []; this.forEach(c, function (e, d) { a.call(b, e, d, c) && g.push(e) }); return g }, find: function (c, a, b) { for (var g = c.length, e = 0; e < g;) { if (a.call(b, c[e], e, c)) return c[e]; e++ } }, forEach: function (c, a, b) { var g = c.length, e; for (e = 0; e < g; e++)a.call(b, c[e], e, c) }, map: function (c, a, b) { for (var g = [], e = 0; e < c.length; e++)g.push(a.call(b, c[e], e, c)); return g }, reduce: function (c,
                        a, b, g) { for (var e = 0; e < c.length; e++)b = a.call(g, b, c[e], e, c); return b }, every: function (c, a, b) { if (!c.length) return !0; a = this.filter(c, a, b); return c.length === a.length }, some: function (c, a, b) { for (var g = 0; g < c.length; g++)if (a.call(b, c[g], g, c)) return !0; return !1 }, zip: function (c, a) { return CKEDITOR.tools.array.map(c, function (c, b) { return [c, a[b]] }) }, unique: function (c) { return this.filter(c, function (a, b) { return b === CKEDITOR.tools.array.indexOf(c, a) }) }
                }, object: {
                    DONT_ENUMS: "toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "),
                    entries: function (c) { return CKEDITOR.tools.array.map(CKEDITOR.tools.object.keys(c), function (a) { return [a, c[a]] }) }, values: function (c) { return CKEDITOR.tools.array.map(CKEDITOR.tools.object.keys(c), function (a) { return c[a] }) }, keys: function (c) {
                        var a = Object.prototype.hasOwnProperty, b = [], g = CKEDITOR.tools.object.DONT_ENUMS; if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (!c || "object" !== typeof c)) { a = []; if ("string" === typeof c) for (b = 0; b < c.length; b++)a.push(String(b)); return a } for (var e in c) b.push(e); if (CKEDITOR.env.ie &&
                            9 > CKEDITOR.env.version) for (e = 0; e < g.length; e++)a.call(c, g[e]) && b.push(g[e]); return b
                    }, findKey: function (c, a) { if ("object" !== typeof c) return null; for (var b in c) if (c[b] === a) return b; return null }, merge: function (c, a) { var b = CKEDITOR.tools, g = b.clone(c), e = b.clone(a); b.array.forEach(b.object.keys(e), function (c) { g[c] = "object" === typeof e[c] && "object" === typeof g[c] ? b.object.merge(g[c], e[c]) : e[c] }); return g }
                }, getAbsoluteRectPosition: function (c, a) {
                    function b(c) {
                        if (c) {
                            var a = c.getClientRect(); g.top += a.top; g.left +=
                                a.left; "x" in g && "y" in g && (g.x += a.x, g.y += a.y); b(c.getWindow().getFrame())
                        }
                    } var g = CKEDITOR.tools.copy(a); b(c.getFrame()); var e = CKEDITOR.document.getWindow().getScrollPosition(); g.top += e.y; g.left += e.x; "x" in g && "y" in g && (g.y += e.y, g.x += e.x); g.right = g.left + g.width; g.bottom = g.top + g.height; return g
                }
            }; a.prototype = {
                reset: function () { this._lastOutput = 0; this._clearTimer() }, _reschedule: function () { return !1 }, _call: function () { this._output() }, _clearTimer: function () {
                    this._scheduledTimer && clearTimeout(this._scheduledTimer);
                    this._scheduledTimer = 0
                }
            }; h.prototype = CKEDITOR.tools.prototypedCopy(a.prototype); h.prototype._reschedule = function () { this._scheduledTimer && this._clearTimer() }; h.prototype._call = function () { this._output.apply(this._context, this._args) }; CKEDITOR.tools.buffers = {}; CKEDITOR.tools.buffers.event = a; CKEDITOR.tools.buffers.throttle = h; CKEDITOR.tools.style.border = CKEDITOR.tools.createClass({
                $: function (c) { c = c || {}; this.width = c.width; this.style = c.style; this.color = c.color; this._.normalize() }, _: {
                    normalizeMap: {
                        color: [[/windowtext/g,
                            "black"]]
                    }, normalize: function () { for (var c in this._.normalizeMap) { var a = this[c]; a && (this[c] = CKEDITOR.tools.array.reduce(this._.normalizeMap[c], function (c, a) { return c.replace(a[0], a[1]) }, a)) } }
                }, proto: { toString: function () { return CKEDITOR.tools.array.filter([this.width, this.style, this.color], function (c) { return !!c }).join(" ") } }, statics: {
                    fromCssRule: function (c) {
                        var a = {}, b = c.split(/\s+/g); c = CKEDITOR.tools.style.parse._findColor(c); c.length && (a.color = c[0]); CKEDITOR.tools.array.forEach(b, function (c) {
                            a.style ||
                                -1 === CKEDITOR.tools.indexOf(CKEDITOR.tools.style.parse._borderStyle, c) ? !a.width && CKEDITOR.tools.style.parse._widthRegExp.test(c) && (a.width = c) : a.style = c
                        }); return new CKEDITOR.tools.style.border(a)
                    }, splitCssValues: function (c, a) {
                        a = a || {}; var b = CKEDITOR.tools.array.reduce(["width", "style", "color"], function (b, g) { var e = c["border-" + g] || a[g]; b[g] = e ? CKEDITOR.tools.style.parse.sideShorthand(e) : null; return b }, {}); return CKEDITOR.tools.array.reduce(["top", "right", "bottom", "left"], function (a, g) {
                            var e = {}, d; for (d in b) {
                                var l =
                                    c["border-" + g + "-" + d]; e[d] = l ? l : b[d] && b[d][g]
                            } a["border-" + g] = new CKEDITOR.tools.style.border(e); return a
                        }, {})
                    }
                }
            }); CKEDITOR.tools.array.indexOf = CKEDITOR.tools.indexOf; CKEDITOR.tools.array.isArray = CKEDITOR.tools.isArray; CKEDITOR.MOUSE_BUTTON_LEFT = 0; CKEDITOR.MOUSE_BUTTON_MIDDLE = 1; CKEDITOR.MOUSE_BUTTON_RIGHT = 2
        })(); CKEDITOR.dtd = function () {
            var a = CKEDITOR.tools.extend, h = function (a, c) { for (var b = CKEDITOR.tools.clone(a), g = 1; g < arguments.length; g++) { c = arguments[g]; for (var d in c) delete b[d] } return b }, f = {}, b = {},
                d = { address: 1, article: 1, aside: 1, blockquote: 1, details: 1, div: 1, dl: 1, fieldset: 1, figure: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, hr: 1, main: 1, menu: 1, nav: 1, ol: 1, p: 1, pre: 1, section: 1, table: 1, ul: 1 }, m = { command: 1, link: 1, meta: 1, noscript: 1, script: 1, style: 1 }, k = {}, l = { "#": 1 }, g = { center: 1, dir: 1, noframes: 1 }; a(f, {
                    a: 1, abbr: 1, area: 1, audio: 1, b: 1, bdi: 1, bdo: 1, br: 1, button: 1, canvas: 1, cite: 1, code: 1, command: 1, datalist: 1, del: 1, dfn: 1, em: 1, embed: 1, i: 1, iframe: 1, img: 1, input: 1, ins: 1, kbd: 1, keygen: 1, label: 1, map: 1,
                    mark: 1, meter: 1, noscript: 1, object: 1, output: 1, progress: 1, q: 1, ruby: 1, s: 1, samp: 1, script: 1, select: 1, small: 1, span: 1, strong: 1, sub: 1, sup: 1, textarea: 1, time: 1, u: 1, "var": 1, video: 1, wbr: 1
                }, l, { acronym: 1, applet: 1, basefont: 1, big: 1, font: 1, isindex: 1, strike: 1, style: 1, tt: 1 }); a(b, d, f, g); h = {
                    a: h(f, { a: 1, button: 1 }), abbr: f, address: b, area: k, article: b, aside: b, audio: a({ source: 1, track: 1 }, b), b: f, base: k, bdi: f, bdo: f, blockquote: b, body: b, br: k, button: h(f, { a: 1, button: 1 }), canvas: f, caption: b, cite: f, code: f, col: k, colgroup: { col: 1 }, command: k,
                    datalist: a({ option: 1 }, f), dd: b, del: f, details: a({ summary: 1 }, b), dfn: f, div: b, dl: { dt: 1, dd: 1 }, dt: b, em: f, embed: k, fieldset: a({ legend: 1 }, b), figcaption: b, figure: a({ figcaption: 1 }, b), footer: b, form: b, h1: f, h2: f, h3: f, h4: f, h5: f, h6: f, head: a({ title: 1, base: 1 }, m), header: b, hgroup: { h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, hr: k, html: a({ head: 1, body: 1 }, b, m), i: f, iframe: l, img: k, input: k, ins: f, kbd: f, keygen: k, label: f, legend: f, li: b, link: k, main: b, map: b, mark: f, menu: a({ li: 1 }, b), meta: k, meter: h(f, { meter: 1 }), nav: b, noscript: a({ link: 1, meta: 1, style: 1 },
                        f), object: a({ param: 1 }, f), ol: { li: 1 }, optgroup: { option: 1 }, option: l, output: f, p: f, param: k, pre: f, progress: h(f, { progress: 1 }), q: f, rp: f, rt: f, ruby: a({ rp: 1, rt: 1 }, f), s: f, samp: f, script: l, section: b, select: { optgroup: 1, option: 1 }, small: f, source: k, span: f, strong: f, style: l, sub: f, summary: a({ h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, f), sup: f, table: { caption: 1, colgroup: 1, thead: 1, tfoot: 1, tbody: 1, tr: 1 }, tbody: { tr: 1 }, td: b, textarea: l, tfoot: { tr: 1 }, th: b, thead: { tr: 1 }, time: h(f, { time: 1 }), title: l, tr: { th: 1, td: 1 }, track: k, u: f, ul: { li: 1 }, "var": f,
                    video: a({ source: 1, track: 1 }, b), wbr: k, acronym: f, applet: a({ param: 1 }, b), basefont: k, big: f, center: b, dialog: k, dir: { li: 1 }, font: f, isindex: k, noframes: b, strike: f, tt: f
                }; a(h, {
                    $block: a({ audio: 1, dd: 1, dt: 1, figcaption: 1, li: 1, video: 1 }, d, g), $blockLimit: { article: 1, aside: 1, audio: 1, body: 1, caption: 1, details: 1, dir: 1, div: 1, dl: 1, fieldset: 1, figcaption: 1, figure: 1, footer: 1, form: 1, header: 1, hgroup: 1, main: 1, menu: 1, nav: 1, ol: 1, section: 1, table: 1, td: 1, th: 1, tr: 1, ul: 1, video: 1 }, $cdata: { script: 1, style: 1 }, $editable: {
                        address: 1, article: 1,
                        aside: 1, blockquote: 1, body: 1, details: 1, div: 1, fieldset: 1, figcaption: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, main: 1, nav: 1, p: 1, pre: 1, section: 1
                    }, $empty: { area: 1, base: 1, basefont: 1, br: 1, col: 1, command: 1, dialog: 1, embed: 1, hr: 1, img: 1, input: 1, isindex: 1, keygen: 1, link: 1, meta: 1, param: 1, source: 1, track: 1, wbr: 1 }, $inline: f, $list: { dl: 1, ol: 1, ul: 1 }, $listItem: { dd: 1, dt: 1, li: 1 }, $nonBodyContent: a({ body: 1, head: 1, html: 1 }, h.head), $nonEditable: {
                        applet: 1, audio: 1, button: 1, embed: 1, iframe: 1, map: 1, object: 1,
                        option: 1, param: 1, script: 1, textarea: 1, video: 1
                    }, $object: { applet: 1, audio: 1, button: 1, hr: 1, iframe: 1, img: 1, input: 1, object: 1, select: 1, table: 1, textarea: 1, video: 1 }, $removeEmpty: { abbr: 1, acronym: 1, b: 1, bdi: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, mark: 1, meter: 1, output: 1, q: 1, ruby: 1, s: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, time: 1, tt: 1, u: 1, "var": 1 }, $tabIndex: { a: 1, area: 1, button: 1, input: 1, object: 1, select: 1, textarea: 1 }, $tableContent: {
                        caption: 1, col: 1, colgroup: 1, tbody: 1,
                        td: 1, tfoot: 1, th: 1, thead: 1, tr: 1
                    }, $transparent: { a: 1, audio: 1, canvas: 1, del: 1, ins: 1, map: 1, noscript: 1, object: 1, video: 1 }, $intermediate: { caption: 1, colgroup: 1, dd: 1, dt: 1, figcaption: 1, legend: 1, li: 1, optgroup: 1, option: 1, rp: 1, rt: 1, summary: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 }
                }); return h
        }(); CKEDITOR.dom.event = function (a) { this.$ = a }; CKEDITOR.dom.event.prototype = {
            getKey: function () { return this.$.keyCode || this.$.which }, getKeystroke: function () {
                var a = this.getKey(); if (this.$.ctrlKey || this.$.metaKey) a += CKEDITOR.CTRL;
                this.$.shiftKey && (a += CKEDITOR.SHIFT); this.$.altKey && (a += CKEDITOR.ALT); return a
            }, preventDefault: function (a) { var h = this.$; h.preventDefault ? h.preventDefault() : h.returnValue = !1; a && this.stopPropagation() }, stopPropagation: function () { var a = this.$; a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0 }, getTarget: function () { var a = this.$.target || this.$.srcElement; return a ? new CKEDITOR.dom.node(a) : null }, getPhase: function () { return this.$.eventPhase || 2 }, getPageOffset: function () {
                var a = this.getTarget().getDocument().$;
                return { x: this.$.pageX || this.$.clientX + (a.documentElement.scrollLeft || a.body.scrollLeft), y: this.$.pageY || this.$.clientY + (a.documentElement.scrollTop || a.body.scrollTop) }
            }
        }; CKEDITOR.CTRL = 1114112; CKEDITOR.SHIFT = 2228224; CKEDITOR.ALT = 4456448; CKEDITOR.EVENT_PHASE_CAPTURING = 1; CKEDITOR.EVENT_PHASE_AT_TARGET = 2; CKEDITOR.EVENT_PHASE_BUBBLING = 3; CKEDITOR.HISTORY_NATIVE = 1; CKEDITOR.HISTORY_HASH = 2; CKEDITOR.HISTORY_OFF = 0; CKEDITOR.dom.domObject = function (a) { a && (this.$ = a) }; CKEDITOR.dom.domObject.prototype = function () {
            var a =
                function (a, f) { return function (b) { "undefined" != typeof CKEDITOR && a.fire(f, new CKEDITOR.dom.event(b)) } }; return {
                    getPrivate: function () { var a; (a = this.getCustomData("_")) || this.setCustomData("_", a = {}); return a }, on: function (h) {
                        var f = this.getCustomData("_cke_nativeListeners"); f || (f = {}, this.setCustomData("_cke_nativeListeners", f)); f[h] || (f = f[h] = a(this, h), this.$.addEventListener ? this.$.addEventListener(h, f, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" + h, f)); return CKEDITOR.event.prototype.on.apply(this,
                            arguments)
                    }, removeListener: function (a) { CKEDITOR.event.prototype.removeListener.apply(this, arguments); if (!this.hasListeners(a)) { var f = this.getCustomData("_cke_nativeListeners"), b = f && f[a]; b && (this.$.removeEventListener ? this.$.removeEventListener(a, b, !1) : this.$.detachEvent && this.$.detachEvent("on" + a, b), delete f[a]) } }, removeAllListeners: function () {
                        try {
                            var a = this.getCustomData("_cke_nativeListeners"), f; for (f in a) {
                                var b = a[f]; this.$.detachEvent ? this.$.detachEvent("on" + f, b) : this.$.removeEventListener && this.$.removeEventListener(f,
                                    b, !1); delete a[f]
                            }
                        } catch (d) { if (!CKEDITOR.env.edge || -2146828218 !== d.number) throw d; } CKEDITOR.event.prototype.removeAllListeners.call(this)
                    }
                }
        }(); (function (a) {
            var h = {}; CKEDITOR.on("reset", function () { h = {} }); a.equals = function (a) { try { return a && a.$ === this.$ } catch (b) { return !1 } }; a.setCustomData = function (a, b) { var d = this.getUniqueId(); (h[d] || (h[d] = {}))[a] = b; return this }; a.getCustomData = function (a) { var b = this.$["data-cke-expando"]; return (b = b && h[b]) && a in b ? b[a] : null }; a.removeCustomData = function (a) {
                var b = this.$["data-cke-expando"],
                    b = b && h[b], d, m; b && (d = b[a], m = a in b, delete b[a]); return m ? d : null
            }; a.clearCustomData = function () { this.removeAllListeners(); var a = this.getUniqueId(); a && delete h[a] }; a.getUniqueId = function () { return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber()) }; CKEDITOR.event.implementOn(a)
        })(CKEDITOR.dom.domObject.prototype); CKEDITOR.dom.node = function (a) {
            return a ? new CKEDITOR.dom[a.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : a.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : a.nodeType ==
                CKEDITOR.NODE_TEXT ? "text" : a.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : a.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](a) : this
        }; CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject; CKEDITOR.NODE_ELEMENT = 1; CKEDITOR.NODE_DOCUMENT = 9; CKEDITOR.NODE_TEXT = 3; CKEDITOR.NODE_COMMENT = 8; CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11; CKEDITOR.POSITION_IDENTICAL = 0; CKEDITOR.POSITION_DISCONNECTED = 1; CKEDITOR.POSITION_FOLLOWING = 2; CKEDITOR.POSITION_PRECEDING = 4; CKEDITOR.POSITION_IS_CONTAINED = 8; CKEDITOR.POSITION_CONTAINS =
            16; CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
                appendTo: function (a, h) { a.append(this, h); return a }, clone: function (a, h) {
                    function f(b) { b["data-cke-expando"] && (b["data-cke-expando"] = !1); if (b.nodeType == CKEDITOR.NODE_ELEMENT || b.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) if (h || b.nodeType != CKEDITOR.NODE_ELEMENT || b.removeAttribute("id", !1), a) { b = b.childNodes; for (var d = 0; d < b.length; d++)f(b[d]) } } function b(d) {
                        if (d.type == CKEDITOR.NODE_ELEMENT || d.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                            if (d.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                                var f =
                                    d.getName(); ":" == f[0] && d.renameNode(f.substring(1))
                            } if (a) for (f = 0; f < d.getChildCount(); f++)b(d.getChild(f))
                        }
                    } var d = this.$.cloneNode(a); f(d); d = new CKEDITOR.dom.node(d); CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (this.type == CKEDITOR.NODE_ELEMENT || this.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) && b(d); return d
                }, hasPrevious: function () { return !!this.$.previousSibling }, hasNext: function () { return !!this.$.nextSibling }, insertAfter: function (a) { a.$.parentNode.insertBefore(this.$, a.$.nextSibling); return a }, insertBefore: function (a) {
                    a.$.parentNode.insertBefore(this.$,
                        a.$); return a
                }, insertBeforeMe: function (a) { this.$.parentNode.insertBefore(a.$, this.$); return a }, getAddress: function (a) { for (var h = [], f = this.getDocument().$.documentElement, b = this; b && b != f;) { var d = b.getParent(); d && h.unshift(this.getIndex.call(b, a)); b = d } return h }, getDocument: function () { return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument) }, getIndex: function (a) {
                    function h(a, b) {
                        var d = b ? a.getNext() : a.getPrevious(); return d && d.type == CKEDITOR.NODE_TEXT ? d.isEmpty() ? h(d, b) : d :
                            null
                    } var f = this, b = -1, d; if (!this.getParent() || a && f.type == CKEDITOR.NODE_TEXT && f.isEmpty() && !h(f) && !h(f, !0)) return -1; do if (!a || f.equals(this) || f.type != CKEDITOR.NODE_TEXT || !d && !f.isEmpty()) b++, d = f.type == CKEDITOR.NODE_TEXT; while (f = f.getPrevious()); return b
                }, getNextSourceNode: function (a, h, f) {
                    if (f && !f.call) { var b = f; f = function (a) { return !a.equals(b) } } a = !a && this.getFirst && this.getFirst(); var d; if (!a) { if (this.type == CKEDITOR.NODE_ELEMENT && f && !1 === f(this, !0)) return null; a = this.getNext() } for (; !a && (d = (d || this).getParent());) {
                        if (f &&
                            !1 === f(d, !0)) return null; a = d.getNext()
                    } return !a || f && !1 === f(a) ? null : h && h != a.type ? a.getNextSourceNode(!1, h, f) : a
                }, getPreviousSourceNode: function (a, h, f) {
                    if (f && !f.call) { var b = f; f = function (a) { return !a.equals(b) } } a = !a && this.getLast && this.getLast(); var d; if (!a) { if (this.type == CKEDITOR.NODE_ELEMENT && f && !1 === f(this, !0)) return null; a = this.getPrevious() } for (; !a && (d = (d || this).getParent());) { if (f && !1 === f(d, !0)) return null; a = d.getPrevious() } return !a || f && !1 === f(a) ? null : h && a.type != h ? a.getPreviousSourceNode(!1, h, f) :
                        a
                }, getPrevious: function (a) { var h = this.$, f; do f = (h = h.previousSibling) && 10 != h.nodeType && new CKEDITOR.dom.node(h); while (f && a && !a(f)); return f }, getNext: function (a) { var h = this.$, f; do f = (h = h.nextSibling) && new CKEDITOR.dom.node(h); while (f && a && !a(f)); return f }, getParent: function (a) { var h = this.$.parentNode; return h && (h.nodeType == CKEDITOR.NODE_ELEMENT || a && h.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(h) : null }, getParents: function (a) {
                    var h = this, f = []; do f[a ? "push" : "unshift"](h); while (h = h.getParent());
                    return f
                }, getCommonAncestor: function (a) { if (a.equals(this)) return this; if (a.contains && a.contains(this)) return a; var h = this.contains ? this : this.getParent(); do if (h.contains(a)) return h; while (h = h.getParent()); return null }, getPosition: function (a) {
                    var h = this.$, f = a.$; if (h.compareDocumentPosition) return h.compareDocumentPosition(f); if (h == f) return CKEDITOR.POSITION_IDENTICAL; if (this.type == CKEDITOR.NODE_ELEMENT && a.type == CKEDITOR.NODE_ELEMENT) {
                        if (h.contains) {
                            if (h.contains(f)) return CKEDITOR.POSITION_CONTAINS +
                                CKEDITOR.POSITION_PRECEDING; if (f.contains(h)) return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
                        } if ("sourceIndex" in h) return 0 > h.sourceIndex || 0 > f.sourceIndex ? CKEDITOR.POSITION_DISCONNECTED : h.sourceIndex < f.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING
                    } h = this.getAddress(); a = a.getAddress(); for (var f = Math.min(h.length, a.length), b = 0; b < f; b++)if (h[b] != a[b]) return h[b] < a[b] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING; return h.length < a.length ? CKEDITOR.POSITION_CONTAINS +
                        CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
                }, getAscendant: function (a, h) { var f = this.$, b, d; h || (f = f.parentNode); "function" == typeof a ? (d = !0, b = a) : (d = !1, b = function (b) { b = "string" == typeof b.nodeName ? b.nodeName.toLowerCase() : ""; return "string" == typeof a ? b == a : b in a }); for (; f;) { if (b(d ? new CKEDITOR.dom.node(f) : f)) return new CKEDITOR.dom.node(f); try { f = f.parentNode } catch (m) { f = null } } return null }, hasAscendant: function (a, h) {
                    var f = this.$; h || (f = f.parentNode); for (; f;) {
                        if (f.nodeName &&
                            f.nodeName.toLowerCase() == a) return !0; f = f.parentNode
                    } return !1
                }, move: function (a, h) { a.append(this.remove(), h) }, remove: function (a) { var h = this.$, f = h.parentNode; if (f) { if (a) for (; a = h.firstChild;)f.insertBefore(h.removeChild(a), h); f.removeChild(h) } return this }, replace: function (a) { this.insertBefore(a); a.remove() }, trim: function () { this.ltrim(); this.rtrim() }, ltrim: function () {
                    for (var a; this.getFirst && (a = this.getFirst());) {
                        if (a.type == CKEDITOR.NODE_TEXT) {
                            var h = CKEDITOR.tools.ltrim(a.getText()), f = a.getLength(); if (h) h.length <
                                f && (a.split(f - h.length), this.$.removeChild(this.$.firstChild)); else { a.remove(); continue }
                        } break
                    }
                }, rtrim: function () { for (var a; this.getLast && (a = this.getLast());) { if (a.type == CKEDITOR.NODE_TEXT) { var h = CKEDITOR.tools.rtrim(a.getText()), f = a.getLength(); if (h) h.length < f && (a.split(h.length), this.$.lastChild.parentNode.removeChild(this.$.lastChild)); else { a.remove(); continue } } break } CKEDITOR.env.needsBrFiller && (a = this.$.lastChild) && 1 == a.type && "br" == a.nodeName.toLowerCase() && a.parentNode.removeChild(a) }, isReadOnly: function (a) {
                    var h =
                        this; this.type != CKEDITOR.NODE_ELEMENT && (h = this.getParent()); CKEDITOR.env.edge && h && h.is("textarea", "input") && (a = !0); if (!a && h && "undefined" != typeof h.$.isContentEditable) return !(h.$.isContentEditable || h.data("cke-editable")); for (; h;) { if (h.data("cke-editable")) return !1; if (h.hasAttribute("contenteditable")) return "false" == h.getAttribute("contenteditable"); h = h.getParent() } return !0
                }
            }); CKEDITOR.dom.window = function (a) { CKEDITOR.dom.domObject.call(this, a) }; CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject;
        CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
            focus: function () { this.$.focus() }, getViewPaneSize: function () { var a = this.$.document, h = "CSS1Compat" == a.compatMode; return { width: (h ? a.documentElement.clientWidth : a.body.clientWidth) || 0, height: (h ? a.documentElement.clientHeight : a.body.clientHeight) || 0 } }, getScrollPosition: function () {
                var a = this.$; if ("pageXOffset" in a) return { x: a.pageXOffset || 0, y: a.pageYOffset || 0 }; a = a.document; return {
                    x: a.documentElement.scrollLeft || a.body.scrollLeft || 0, y: a.documentElement.scrollTop ||
                        a.body.scrollTop || 0
                }
            }, getFrame: function () { var a = this.$.frameElement; return a ? new CKEDITOR.dom.element.get(a) : null }
        }); CKEDITOR.dom.document = function (a) { CKEDITOR.dom.domObject.call(this, a) }; CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject; CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
            type: CKEDITOR.NODE_DOCUMENT, appendStyleSheet: function (a) {
                a = CKEDITOR.appendTimestamp(a); if (this.$.createStyleSheet) this.$.createStyleSheet(a); else {
                    var h = new CKEDITOR.dom.element("link"); h.setAttributes({
                        rel: "stylesheet",
                        type: "text/css", href: a
                    }); this.getHead().append(h)
                }
            }, appendStyleText: function (a) { if (this.$.createStyleSheet) { var h = this.$.createStyleSheet(""); h.cssText = a } else { var f = new CKEDITOR.dom.element("style", this); f.append(new CKEDITOR.dom.text(a, this)); this.getHead().append(f) } return h || f.$.sheet }, createElement: function (a, h) { var f = new CKEDITOR.dom.element(a, this); h && (h.attributes && f.setAttributes(h.attributes), h.styles && f.setStyles(h.styles)); return f }, createText: function (a) {
                return new CKEDITOR.dom.text(a,
                    this)
            }, focus: function () { this.getWindow().focus() }, getActive: function () { var a; try { a = this.$.activeElement } catch (h) { return null } return new CKEDITOR.dom.element(a) }, getById: function (a) { return (a = this.$.getElementById(a)) ? new CKEDITOR.dom.element(a) : null }, getByAddress: function (a, h) {
                for (var f = this.$.documentElement, b = 0; f && b < a.length; b++) {
                    var d = a[b]; if (h) for (var m = -1, k = 0; k < f.childNodes.length; k++) {
                        var l = f.childNodes[k]; if (!0 !== h || 3 != l.nodeType || !l.previousSibling || 3 != l.previousSibling.nodeType) if (m++, m ==
                            d) { f = l; break }
                    } else f = f.childNodes[d]
                } return f ? new CKEDITOR.dom.node(f) : null
            }, getElementsByTag: function (a, h) { CKEDITOR.env.ie && 8 >= document.documentMode || !h || (a = h + ":" + a); return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(a)) }, getHead: function () { var a = this.$.getElementsByTagName("head")[0]; return a = a ? new CKEDITOR.dom.element(a) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), !0) }, getBody: function () { return new CKEDITOR.dom.element(this.$.body) }, getDocumentElement: function () { return new CKEDITOR.dom.element(this.$.documentElement) },
            getWindow: function () { return new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView) }, write: function (a) { this.$.open("text/html", "replace"); CKEDITOR.env.ie && (a = a.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$\x26\n\x3cscript data-cke-temp\x3d"1"\x3e(' + CKEDITOR.tools.fixDomain + ")();\x3c/script\x3e")); this.$.write(a); this.$.close() }, find: function (a) { return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(a)) }, findOne: function (a) { return (a = this.$.querySelector(a)) ? new CKEDITOR.dom.element(a) : null },
            _getHtml5ShivFrag: function () { var a = this.getCustomData("html5ShivFrag"); a || (a = this.$.createDocumentFragment(), CKEDITOR.tools.enableHtml5Elements(a, !0), this.setCustomData("html5ShivFrag", a)); return a }
        }); CKEDITOR.dom.nodeList = function (a) { this.$ = a }; CKEDITOR.dom.nodeList.prototype = { count: function () { return this.$.length }, getItem: function (a) { return 0 > a || a >= this.$.length ? null : (a = this.$[a]) ? new CKEDITOR.dom.node(a) : null }, toArray: function () { return CKEDITOR.tools.array.map(this.$, function (a) { return new CKEDITOR.dom.node(a) }) } };
        CKEDITOR.dom.element = function (a, h) { "string" == typeof a && (a = (h ? h.$ : document).createElement(a)); CKEDITOR.dom.domObject.call(this, a) }; CKEDITOR.dom.element.get = function (a) { return (a = "string" == typeof a ? document.getElementById(a) || document.getElementsByName(a)[0] : a) && (a.$ ? a : new CKEDITOR.dom.element(a)) }; CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node; CKEDITOR.dom.element.createFromHtml = function (a, h) { var f = new CKEDITOR.dom.element("div", h); f.setHtml(a); return f.getFirst().remove() }; CKEDITOR.dom.element.setMarker =
            function (a, h, f, b) { var d = h.getCustomData("list_marker_id") || h.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"), m = h.getCustomData("list_marker_names") || h.setCustomData("list_marker_names", {}).getCustomData("list_marker_names"); a[d] = h; m[f] = 1; return h.setCustomData(f, b) }; CKEDITOR.dom.element.clearAllMarkers = function (a) { for (var h in a) CKEDITOR.dom.element.clearMarkers(a, a[h], 1) }; CKEDITOR.dom.element.clearMarkers = function (a, h, f) {
                var b = h.getCustomData("list_marker_names"),
                    d = h.getCustomData("list_marker_id"), m; for (m in b) h.removeCustomData(m); h.removeCustomData("list_marker_names"); f && (h.removeCustomData("list_marker_id"), delete a[d])
            }; (function () {
                function a(a, b) { return -1 < (" " + a + " ").replace(m, " ").indexOf(" " + b + " ") } function h(a) { var b = !0; a.$.id || (a.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber(), b = !1); return function () { b || a.removeAttribute("id") } } function f(a, b) { var e = CKEDITOR.tools.escapeCss(a.$.id); return "#" + e + " " + b.split(/,\s*/).join(", #" + e + " ") } function b(a) {
                    for (var b =
                        0, e = 0, c = k[a].length; e < c; e++)b += parseFloat(this.getComputedStyle(k[a][e]) || 0, 10) || 0; return b
                } var d = document.createElement("_").classList, d = "undefined" !== typeof d && null !== String(d.add).match(/\[Native code\]/gi), m = /[\n\t\r]/g; CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
                    type: CKEDITOR.NODE_ELEMENT, addClass: d ? function (a) { this.$.classList.add(a); return this } : function (b) { var g = this.$.className; g && (a(g, b) || (g += " " + b)); this.$.className = g || b; return this }, removeClass: d ? function (a) {
                        var b = this.$; b.classList.remove(a);
                        b.className || b.removeAttribute("class"); return this
                    } : function (b) { var g = this.getAttribute("class"); g && a(g, b) && ((g = g.replace(new RegExp("(?:^|\\s+)" + b + "(?\x3d\\s|$)"), "").replace(/^\s+/, "")) ? this.setAttribute("class", g) : this.removeAttribute("class")); return this }, hasClass: function (b) { return a(this.$.className, b) }, append: function (a, b) { "string" == typeof a && (a = this.getDocument().createElement(a)); b ? this.$.insertBefore(a.$, this.$.firstChild) : this.$.appendChild(a.$); return a }, appendHtml: function (a) {
                        if (this.$.childNodes.length) {
                            var b =
                                new CKEDITOR.dom.element("div", this.getDocument()); b.setHtml(a); b.moveChildren(this)
                        } else this.setHtml(a)
                    }, appendText: function (a) { null != this.$.text && CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? this.$.text += a : this.append(new CKEDITOR.dom.text(a)) }, appendBogus: function (a) {
                        if (a || CKEDITOR.env.needsBrFiller) {
                            for (a = this.getLast(); a && a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(a.getText());)a = a.getPrevious(); a && a.is && a.is("br") || (a = this.getDocument().createElement("br"), CKEDITOR.env.gecko && a.setAttribute("type",
                                "_moz"), this.append(a))
                        }
                    }, breakParent: function (a, b) { var e = new CKEDITOR.dom.range(this.getDocument()); e.setStartAfter(this); e.setEndAfter(a); var c = e.extractContents(!1, b || !1), d; e.insertNode(this.remove()); if (CKEDITOR.env.ie && !CKEDITOR.env.edge) { for (e = new CKEDITOR.dom.element("div"); d = c.getFirst();)d.$.style.backgroundColor && (d.$.style.backgroundColor = d.$.style.backgroundColor), e.append(d); e.insertAfter(this); e.remove(!0) } else c.insertAfterNode(this) }, contains: document.compareDocumentPosition ? function (a) {
                        return !!(this.$.compareDocumentPosition(a.$) &
                            16)
                    } : function (a) { var b = this.$; return a.type != CKEDITOR.NODE_ELEMENT ? b.contains(a.getParent().$) : b != a.$ && b.contains(a.$) }, focus: function () { function a() { try { this.$.focus() } catch (b) { } } return function (b) { b ? CKEDITOR.tools.setTimeout(a, 100, this) : a.call(this) } }(), getHtml: function () { var a = this.$.innerHTML; return CKEDITOR.env.ie ? a.replace(/<\?[^>]*>/g, "") : a }, getOuterHtml: function () {
                        if (this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/, ""); var a = this.$.ownerDocument.createElement("div"); a.appendChild(this.$.cloneNode(!0));
                        return a.innerHTML
                    }, getClientRect: function (a) { var b = CKEDITOR.tools.extend({}, this.$.getBoundingClientRect()); !b.width && (b.width = b.right - b.left); !b.height && (b.height = b.bottom - b.top); return a ? CKEDITOR.tools.getAbsoluteRectPosition(this.getWindow(), b) : b }, setHtml: CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? function (a) {
                        try { var b = this.$; if (this.getParent()) return b.innerHTML = a; var e = this.getDocument()._getHtml5ShivFrag(); e.appendChild(b); b.innerHTML = a; e.removeChild(b); return a } catch (c) {
                            this.$.innerHTML = "";
                            b = new CKEDITOR.dom.element("body", this.getDocument()); b.$.innerHTML = a; for (b = b.getChildren(); b.count();)this.append(b.getItem(0)); return a
                        }
                    } : function (a) { return this.$.innerHTML = a }, setText: function () { var a = document.createElement("p"); a.innerHTML = "x"; a = a.textContent; return function (b) { this.$[a ? "textContent" : "innerText"] = b } }(), getAttribute: function () {
                        var a = function (a) { return this.$.getAttribute(a, 2) }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (a) {
                            switch (a) {
                                case "class": a =
                                    "className"; break; case "http-equiv": a = "httpEquiv"; break; case "name": return this.$.name; case "tabindex": return a = this.$.getAttribute(a, 2), 0 !== a && 0 === this.$.tabIndex && (a = null), a; case "checked": return a = this.$.attributes.getNamedItem(a), (a.specified ? a.nodeValue : this.$.checked) ? "checked" : null; case "hspace": case "value": return this.$[a]; case "style": return this.$.style.cssText; case "contenteditable": case "contentEditable": return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") :
                                        null
                            }return this.$.getAttribute(a, 2)
                        } : a
                    }(), getAttributes: function (a) { var b = {}, e = this.$.attributes, c; a = CKEDITOR.tools.isArray(a) ? a : []; for (c = 0; c < e.length; c++)-1 === CKEDITOR.tools.indexOf(a, e[c].name) && (b[e[c].name] = e[c].value); return b }, getChildren: function () { return new CKEDITOR.dom.nodeList(this.$.childNodes) }, getClientSize: function () { return { width: this.$.clientWidth, height: this.$.clientHeight } }, getComputedStyle: document.defaultView && document.defaultView.getComputedStyle ? function (a) {
                        var b = this.getWindow().$.getComputedStyle(this.$,
                            null); return b ? b.getPropertyValue(a) : ""
                    } : function (a) { return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)] }, getDtd: function () { var a = CKEDITOR.dtd[this.getName()]; this.getDtd = function () { return a }; return a }, getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag, getTabIndex: function () { var a = this.$.tabIndex; return 0 !== a || CKEDITOR.dtd.$tabIndex[this.getName()] || 0 === parseInt(this.getAttribute("tabindex"), 10) ? a : -1 }, getText: function () { return this.$.textContent || this.$.innerText || "" },
                    getWindow: function () { return this.getDocument().getWindow() }, getId: function () { return this.$.id || null }, getNameAtt: function () { return this.$.name || null }, getName: function () { var a = this.$.nodeName.toLowerCase(); if (CKEDITOR.env.ie && 8 >= document.documentMode) { var b = this.$.scopeName; "HTML" != b && (a = b.toLowerCase() + ":" + a) } this.getName = function () { return a }; return this.getName() }, getValue: function () { return this.$.value }, getFirst: function (a) {
                        var b = this.$.firstChild; (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getNext(a));
                        return b
                    }, getLast: function (a) { var b = this.$.lastChild; (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getPrevious(a)); return b }, getStyle: function (a) { return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] }, is: function () { var a = this.getName(); if ("object" == typeof arguments[0]) return !!arguments[0][a]; for (var b = 0; b < arguments.length; b++)if (arguments[b] == a) return !0; return !1 }, isEditable: function (a) {
                        var b = this.getName(); return this.isReadOnly() || "none" == this.getComputedStyle("display") || "hidden" == this.getComputedStyle("visibility") ||
                            CKEDITOR.dtd.$nonEditable[b] || CKEDITOR.dtd.$empty[b] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount() ? !1 : !1 !== a ? (a = CKEDITOR.dtd[b] || CKEDITOR.dtd.span, !(!a || !a["#"])) : !0
                    }, isIdentical: function (a) {
                        var b = this.clone(0, 1); a = a.clone(0, 1); b.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]); a.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]); if (b.$.isEqualNode) return b.$.style.cssText =
                            CKEDITOR.tools.normalizeCssText(b.$.style.cssText), a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText), b.$.isEqualNode(a.$); b = b.getOuterHtml(); a = a.getOuterHtml(); if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version && this.is("a")) { var e = this.getParent(); e.type == CKEDITOR.NODE_ELEMENT && (e = e.clone(), e.setHtml(b), b = e.getHtml(), e.setHtml(a), a = e.getHtml()) } return b == a
                    }, isVisible: function () {
                        var a = (this.$.offsetHeight || this.$.offsetWidth) && "hidden" != this.getComputedStyle("visibility"), b, e; a && CKEDITOR.env.webkit &&
                            (b = this.getWindow(), !b.equals(CKEDITOR.document.getWindow()) && (e = b.$.frameElement) && (a = (new CKEDITOR.dom.element(e)).isVisible())); return !!a
                    }, isEmptyInlineRemoveable: function () { if (!CKEDITOR.dtd.$removeEmpty[this.getName()]) return !1; for (var a = this.getChildren(), b = 0, e = a.count(); b < e; b++) { var c = a.getItem(b); if (c.type != CKEDITOR.NODE_ELEMENT || !c.data("cke-bookmark")) if (c.type == CKEDITOR.NODE_ELEMENT && !c.isEmptyInlineRemoveable() || c.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(c.getText())) return !1 } return !0 },
                    hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function () { for (var a = this.$.attributes, b = 0; b < a.length; b++) { var e = a[b]; switch (e.nodeName) { case "class": if (this.getAttribute("class")) return !0; case "data-cke-expando": continue; default: if (e.specified) return !0 } } return !1 } : function () { var a = this.$.attributes, b = a.length, e = { "data-cke-expando": 1, _moz_dirty: 1 }; return 0 < b && (2 < b || !e[a[0].nodeName] || 2 == b && !e[a[1].nodeName]) }, hasAttribute: function () {
                        function a(b) {
                            var e = this.$.attributes.getNamedItem(b);
                            if ("input" == this.getName()) switch (b) { case "class": return 0 < this.$.className.length; case "checked": return !!this.$.checked; case "value": return b = this.getAttribute("type"), "checkbox" == b || "radio" == b ? "on" != this.$.value : !!this.$.value }return e ? e.specified : !1
                        } return CKEDITOR.env.ie ? 8 > CKEDITOR.env.version ? function (b) { return "name" == b ? !!this.$.name : a.call(this, b) } : a : function (a) { return !!this.$.attributes.getNamedItem(a) }
                    }(), hide: function () { this.setStyle("display", "none") }, moveChildren: function (a, b) {
                        var e = this.$;
                        a = a.$; if (e != a) { var c; if (b) for (; c = e.lastChild;)a.insertBefore(e.removeChild(c), a.firstChild); else for (; c = e.firstChild;)a.appendChild(e.removeChild(c)) }
                    }, mergeSiblings: function () {
                        function a(b, e, c) {
                            if (e && e.type == CKEDITOR.NODE_ELEMENT) {
                                for (var d = []; e.data("cke-bookmark") || e.isEmptyInlineRemoveable();)if (d.push(e), e = c ? e.getNext() : e.getPrevious(), !e || e.type != CKEDITOR.NODE_ELEMENT) return; if (b.isIdentical(e)) {
                                    for (var f = c ? b.getLast() : b.getFirst(); d.length;)d.shift().move(b, !c); e.moveChildren(b, !c); e.remove();
                                    f && f.type == CKEDITOR.NODE_ELEMENT && f.mergeSiblings()
                                }
                            }
                        } return function (b) { if (!1 === b || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) a(this, this.getNext(), !0), a(this, this.getPrevious()) }
                    }(), show: function () { this.setStyles({ display: "", visibility: "" }) }, setAttribute: function () {
                        var a = function (a, b) { this.$.setAttribute(a, b); return this }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (b, e) {
                            "class" == b ? this.$.className = e : "style" == b ? this.$.style.cssText = e : "tabindex" == b ?
                                this.$.tabIndex = e : "checked" == b ? this.$.checked = e : "contenteditable" == b ? a.call(this, "contentEditable", e) : a.apply(this, arguments); return this
                        } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function (b, e) { if ("src" == b && e.match(/^http:\/\//)) try { a.apply(this, arguments) } catch (c) { } else a.apply(this, arguments); return this } : a
                    }(), setAttributes: function (a) { for (var b in a) this.setAttribute(b, a[b]); return this }, setValue: function (a) { this.$.value = a; return this }, removeAttribute: function () {
                        var a = function (a) { this.$.removeAttribute(a) };
                        return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (a) { "class" == a ? a = "className" : "tabindex" == a ? a = "tabIndex" : "contenteditable" == a && (a = "contentEditable"); this.$.removeAttribute(a) } : a
                    }(), removeAttributes: function (a) { if (CKEDITOR.tools.isArray(a)) for (var b = 0; b < a.length; b++)this.removeAttribute(a[b]); else for (b in a = a || this.getAttributes(), a) a.hasOwnProperty(b) && this.removeAttribute(b) }, removeStyle: function (a) {
                        var b = this.$.style; if (b.removeProperty || "border" != a && "margin" != a && "padding" !=
                            a) b.removeProperty ? b.removeProperty(a) : b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a)), this.$.style.cssText || this.removeAttribute("style"); else { var e = ["top", "left", "right", "bottom"], c; "border" == a && (c = ["color", "style", "width"]); for (var b = [], d = 0; d < e.length; d++)if (c) for (var f = 0; f < c.length; f++)b.push([a, e[d], c[f]].join("-")); else b.push([a, e[d]].join("-")); for (a = 0; a < b.length; a++)this.removeStyle(b[a]) }
                    }, setStyle: function (a, b) { this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] = b; return this }, setStyles: function (a) {
                        for (var b in a) this.setStyle(b,
                            a[b]); return this
                    }, setOpacity: function (a) { CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? (a = Math.round(100 * a), this.setStyle("filter", 100 <= a ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity\x3d" + a + ")")) : this.setStyle("opacity", a) }, unselectable: function () { this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "none")); if (CKEDITOR.env.ie) { this.setAttribute("unselectable", "on"); for (var a, b = this.getElementsByTag("*"), e = 0, c = b.count(); e < c; e++)a = b.getItem(e), a.setAttribute("unselectable", "on") } }, getPositionedAncestor: function () {
                        for (var a =
                            this; "html" != a.getName();) { if ("static" != a.getComputedStyle("position")) return a; a = a.getParent() } return null
                    }, getDocumentPosition: function (a) {
                        var b = 0, e = 0, c = this.getDocument(), d = c.getBody(), f = "BackCompat" == c.$.compatMode; if (document.documentElement.getBoundingClientRect && (CKEDITOR.env.ie ? 8 !== CKEDITOR.env.version : 1)) {
                            var k = this.$.getBoundingClientRect(), m = c.$.documentElement, h = m.clientTop || d.$.clientTop || 0, t = m.clientLeft || d.$.clientLeft || 0, A = !0; CKEDITOR.env.ie && (A = c.getDocumentElement().contains(this),
                                c = c.getBody().contains(this), A = f && c || !f && A); A && (CKEDITOR.env.webkit || CKEDITOR.env.ie && 12 <= CKEDITOR.env.version ? (b = d.$.scrollLeft || m.scrollLeft, e = d.$.scrollTop || m.scrollTop) : (e = f ? d.$ : m, b = e.scrollLeft, e = e.scrollTop), b = k.left + b - t, e = k.top + e - h)
                        } else for (h = this, t = null; h && "body" != h.getName() && "html" != h.getName();) {
                            b += h.$.offsetLeft - h.$.scrollLeft; e += h.$.offsetTop - h.$.scrollTop; h.equals(this) || (b += h.$.clientLeft || 0, e += h.$.clientTop || 0); for (; t && !t.equals(h);)b -= t.$.scrollLeft, e -= t.$.scrollTop, t = t.getParent();
                            t = h; h = (k = h.$.offsetParent) ? new CKEDITOR.dom.element(k) : null
                        } a && (k = this.getWindow(), h = a.getWindow(), !k.equals(h) && k.$.frameElement && (a = (new CKEDITOR.dom.element(k.$.frameElement)).getDocumentPosition(a), b += a.x, e += a.y)); document.documentElement.getBoundingClientRect || !CKEDITOR.env.gecko || f || (b += this.$.clientLeft ? 1 : 0, e += this.$.clientTop ? 1 : 0); return { x: b, y: e }
                    }, scrollIntoView: function (a) {
                        var b = this.getParent(); if (b) {
                            do if ((b.$.clientWidth && b.$.clientWidth < b.$.scrollWidth || b.$.clientHeight && b.$.clientHeight <
                                b.$.scrollHeight) && !b.is("body") && this.scrollIntoParent(b, a, 1), b.is("html")) { var e = b.getWindow(); try { var c = e.$.frameElement; c && (b = new CKEDITOR.dom.element(c)) } catch (d) { } } while (b = b.getParent())
                        }
                    }, scrollIntoParent: function (a, b, e) {
                        var c, d, f, k; function m(b, c) { /body|html/.test(a.getName()) ? a.getWindow().$.scrollBy(b, c) : (a.$.scrollLeft += b, a.$.scrollTop += c) } function h(a, b) {
                            var c = { x: 0, y: 0 }; if (!a.is(A ? "body" : "html")) { var g = a.$.getBoundingClientRect(); c.x = g.left; c.y = g.top } g = a.getWindow(); g.equals(b) || (g = h(CKEDITOR.dom.element.get(g.$.frameElement),
                                b), c.x += g.x, c.y += g.y); return c
                        } function t(a, c) { return parseInt(a.getComputedStyle("margin-" + c) || 0, 10) || 0 } !a && (a = this.getWindow()); f = a.getDocument(); var A = "BackCompat" == f.$.compatMode; a instanceof CKEDITOR.dom.window && (a = A ? f.getBody() : f.getDocumentElement()); CKEDITOR.env.webkit && (f = this.getEditor(!1)) && (f._.previousScrollTop = null); f = a.getWindow(); d = h(this, f); var q = h(a, f), B = this.$.offsetHeight; c = this.$.offsetWidth; var z = a.$.clientHeight, y = a.$.clientWidth; f = d.x - t(this, "left") - q.x || 0; k = d.y - t(this, "top") -
                            q.y || 0; c = d.x + c + t(this, "right") - (q.x + y) || 0; d = d.y + B + t(this, "bottom") - (q.y + z) || 0; (0 > k || 0 < d) && m(0, !0 === b ? k : !1 === b ? d : 0 > k ? k : d); e && (0 > f || 0 < c) && m(0 > f ? f : c, 0)
                    }, setState: function (a, b, e) {
                        b = b || "cke"; switch (a) {
                            case CKEDITOR.TRISTATE_ON: this.addClass(b + "_on"); this.removeClass(b + "_off"); this.removeClass(b + "_disabled"); e && this.setAttribute("aria-pressed", !0); e && this.removeAttribute("aria-disabled"); break; case CKEDITOR.TRISTATE_DISABLED: this.addClass(b + "_disabled"); this.removeClass(b + "_off"); this.removeClass(b + "_on");
                                e && this.setAttribute("aria-disabled", !0); e && this.removeAttribute("aria-pressed"); break; default: this.addClass(b + "_off"), this.removeClass(b + "_on"), this.removeClass(b + "_disabled"), e && this.removeAttribute("aria-pressed"), e && this.removeAttribute("aria-disabled")
                        }
                    }, getFrameDocument: function () { var a = this.$; try { a.contentWindow.document } catch (b) { a.src = a.src } return a && new CKEDITOR.dom.document(a.contentWindow.document) }, copyAttributes: function (a, b) {
                        var e = this.$.attributes; b = b || {}; for (var c = 0; c < e.length; c++) {
                            var d =
                                e[c], f = d.nodeName.toLowerCase(), k; if (!(f in b)) if ("checked" == f && (k = this.getAttribute(f))) a.setAttribute(f, k); else if (!CKEDITOR.env.ie || this.hasAttribute(f)) k = this.getAttribute(f), null === k && (k = d.nodeValue), a.setAttribute(f, k)
                        } "" !== this.$.style.cssText && (a.$.style.cssText = this.$.style.cssText)
                    }, renameNode: function (a) {
                        if (this.getName() != a) {
                            var b = this.getDocument(); a = new CKEDITOR.dom.element(a, b); this.copyAttributes(a); this.moveChildren(a); this.getParent(!0) && this.$.parentNode.replaceChild(a.$, this.$);
                            a.$["data-cke-expando"] = this.$["data-cke-expando"]; this.$ = a.$; delete this.getName
                        }
                    }, getChild: function () { function a(b, e) { var c = b.childNodes; if (0 <= e && e < c.length) return c[e] } return function (b) { var e = this.$; if (b.slice) for (b = b.slice(); 0 < b.length && e;)e = a(e, b.shift()); else e = a(e, b); return e ? new CKEDITOR.dom.node(e) : null } }(), getChildCount: function () { return this.$.childNodes.length }, disableContextMenu: function () {
                        function a(b) { return b.type == CKEDITOR.NODE_ELEMENT && b.hasClass("cke_enable_context_menu") } this.on("contextmenu",
                            function (b) { b.data.getTarget().getAscendant(a, !0) || b.data.preventDefault() })
                    }, getDirection: function (a) { return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir || "ltr" : this.getStyle("direction") || this.getAttribute("dir") }, data: function (a, b) { a = "data-" + a; if (void 0 === b) return this.getAttribute(a); !1 === b ? this.removeAttribute(a) : this.setAttribute(a, b); return null }, getEditor: function (a) {
                        var b = CKEDITOR.instances, e, c, d; a =
                            a || void 0 === a; for (e in b) if (c = b[e], c.element.equals(this) && c.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || !a && (d = c.editable()) && (d.equals(this) || d.contains(this))) return c; return null
                    }, find: function (a) { var b = h(this); a = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(f(this, a))); b(); return a }, findOne: function (a) { var b = h(this); a = this.$.querySelector(f(this, a)); b(); return a ? new CKEDITOR.dom.element(a) : null }, forEach: function (a, b, e) {
                        if (!(e || b && this.type != b)) var c = a(this); if (!1 !== c) {
                            e = this.getChildren();
                            for (var d = 0; d < e.count(); d++)c = e.getItem(d), c.type == CKEDITOR.NODE_ELEMENT ? c.forEach(a, b) : b && c.type != b || a(c)
                        }
                    }, fireEventHandler: function (a, b) { var e = "on" + a, c = this.$; if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version) { var d = c.ownerDocument.createEventObject(), f; for (f in b) d[f] = b[f]; c.fireEvent(e, d) } else c[c[a] ? a : e](b) }, isDetached: function () {
                        var a = this.getDocument(), b = a.getDocumentElement(); return b.equals(this) || b.contains(this) ? !CKEDITOR.env.ie || 8 < CKEDITOR.env.version && !CKEDITOR.env.quirks ? !a.$.defaultView :
                            !1 : !0
                    }
                }); var k = { width: ["border-left-width", "border-right-width", "padding-left", "padding-right"], height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"] }; CKEDITOR.dom.element.prototype.setSize = function (a, g, e) { "number" == typeof g && (!e || CKEDITOR.env.ie && CKEDITOR.env.quirks || (g -= b.call(this, a)), this.setStyle(a, g + "px")) }; CKEDITOR.dom.element.prototype.getSize = function (a, g) {
                    var e = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(a)], this.$["client" + CKEDITOR.tools.capitalize(a)]) ||
                        0; g && (e -= b.call(this, a)); return e
                }
            })(); CKEDITOR.dom.documentFragment = function (a) { a = a || CKEDITOR.document; this.$ = a.type == CKEDITOR.NODE_DOCUMENT ? a.$.createDocumentFragment() : a }; CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, {
                type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, insertAfterNode: function (a) { a = a.$; a.parentNode.insertBefore(this.$, a.nextSibling) }, getHtml: function () {
                    var a = new CKEDITOR.dom.element("div"); this.clone(1, 1).appendTo(a); return a.getHtml().replace(/\s*data-cke-expando=".*?"/g,
                        "")
                }
            }, !0, { append: 1, appendBogus: 1, clone: 1, getFirst: 1, getHtml: 1, getLast: 1, getParent: 1, getNext: 1, getPrevious: 1, appendTo: 1, moveChildren: 1, insertBefore: 1, insertAfterNode: 1, replace: 1, trim: 1, type: 1, ltrim: 1, rtrim: 1, getDocument: 1, getChildCount: 1, getChild: 1, getChildren: 1 }); CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.document.prototype, !0, { find: 1, findOne: 1 }); (function () {
                function a(a, b) {
                    var c = this.range; if (this._.end) return null; if (!this._.start) {
                        this._.start = 1; if (c.collapsed) return this.end(),
                            null; c.optimize()
                    } var e, g = c.startContainer; e = c.endContainer; var d = c.startOffset, f = c.endOffset, k, n = this.guard, m = this.type, h = a ? "getPreviousSourceNode" : "getNextSourceNode"; if (!a && !this._.guardLTR) { var l = e.type == CKEDITOR.NODE_ELEMENT ? e : e.getParent(), F = e.type == CKEDITOR.NODE_ELEMENT ? e.getChild(f) : e.getNext(); this._.guardLTR = function (a, b) { return (!b || !l.equals(a)) && (!F || !a.equals(F)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root)) } } if (a && !this._.guardRTL) {
                        var D = g.type == CKEDITOR.NODE_ELEMENT ? g : g.getParent(),
                            G = g.type == CKEDITOR.NODE_ELEMENT ? d ? g.getChild(d - 1) : null : g.getPrevious(); this._.guardRTL = function (a, b) { return (!b || !D.equals(a)) && (!G || !a.equals(G)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root)) }
                    } var H = a ? this._.guardRTL : this._.guardLTR; k = n ? function (a, b) { return !1 === H(a, b) ? !1 : n(a, b) } : H; this.current ? e = this.current[h](!1, m, k) : (a ? e.type == CKEDITOR.NODE_ELEMENT && (e = 0 < f ? e.getChild(f - 1) : !1 === k(e, !0) ? null : e.getPreviousSourceNode(!0, m, k)) : (e = g, e.type == CKEDITOR.NODE_ELEMENT && ((e = e.getChild(d)) || (e = !1 ===
                        k(g, !0) ? null : g.getNextSourceNode(!0, m, k)))), e && !1 === k(e) && (e = null)); for (; e && !this._.end;) { this.current = e; if (!this.evaluator || !1 !== this.evaluator(e)) { if (!b) return e } else if (b && this.evaluator) return !1; e = e[h](!1, m, k) } this.end(); return this.current = null
                } function h(b) { for (var c, e = null; c = a.call(this, b);)e = c; return e } CKEDITOR.dom.walker = CKEDITOR.tools.createClass({
                    $: function (a) { this.range = a; this._ = {} }, proto: {
                        end: function () { this._.end = 1 }, next: function () { return a.call(this) }, previous: function () {
                            return a.call(this,
                                1)
                        }, checkForward: function () { return !1 !== a.call(this, 0, 1) }, checkBackward: function () { return !1 !== a.call(this, 1, 1) }, lastForward: function () { return h.call(this) }, lastBackward: function () { return h.call(this, 1) }, reset: function () { delete this.current; this._ = {} }
                    }
                }); var f = { block: 1, "list-item": 1, table: 1, "table-row-group": 1, "table-header-group": 1, "table-footer-group": 1, "table-row": 1, "table-column-group": 1, "table-column": 1, "table-cell": 1, "table-caption": 1 }, b = { absolute: 1, fixed: 1 }; CKEDITOR.dom.element.prototype.isBlockBoundary =
                    function (a) { return "none" != this.getComputedStyle("float") || this.getComputedStyle("position") in b || !f[this.getComputedStyle("display")] ? !!(this.is(CKEDITOR.dtd.$block) || a && this.is(a)) : !0 }; CKEDITOR.dom.walker.blockBoundary = function (a) { return function (b) { return !(b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary(a)) } }; CKEDITOR.dom.walker.listItemBoundary = function () { return this.blockBoundary({ br: 1 }) }; CKEDITOR.dom.walker.bookmark = function (a, b) {
                        function c(a) { return a && a.getName && "span" == a.getName() && a.data("cke-bookmark") }
                        return function (e) { var g, d; g = e && e.type != CKEDITOR.NODE_ELEMENT && (d = e.getParent()) && c(d); g = a ? g : g || c(e); return !!(b ^ g) }
                    }; CKEDITOR.dom.walker.whitespaces = function (a) { return function (b) { var c; b && b.type == CKEDITOR.NODE_TEXT && (c = !CKEDITOR.tools.trim(b.getText()) || CKEDITOR.env.webkit && b.getText() == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE); return !!(a ^ c) } }; CKEDITOR.dom.walker.invisible = function (a) {
                        var b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.env.webkit ? 1 : 0; return function (e) {
                            b(e) ? e = 1 : (e.type == CKEDITOR.NODE_TEXT &&
                                (e = e.getParent()), e = e.$.offsetWidth <= c); return !!(a ^ e)
                        }
                    }; CKEDITOR.dom.walker.nodeType = function (a, b) { return function (c) { return !!(b ^ c.type == a) } }; CKEDITOR.dom.walker.bogus = function (a) { function b(a) { return !m(a) && !k(a) } return function (c) { var e = CKEDITOR.env.needsBrFiller ? c.is && c.is("br") : c.getText && d.test(c.getText()); e && (e = c.getParent(), c = c.getNext(b), e = e.isBlockBoundary() && (!c || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary())); return !!(a ^ e) } }; CKEDITOR.dom.walker.temp = function (a) {
                        return function (b) {
                            b.type !=
                                CKEDITOR.NODE_ELEMENT && (b = b.getParent()); b = b && b.hasAttribute("data-cke-temp"); return !!(a ^ b)
                        }
                    }; var d = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, m = CKEDITOR.dom.walker.whitespaces(), k = CKEDITOR.dom.walker.bookmark(), l = CKEDITOR.dom.walker.temp(), g = function (a) { return k(a) || m(a) || a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$inline) && !a.is(CKEDITOR.dtd.$empty) }; CKEDITOR.dom.walker.ignored = function (a) { return function (b) { b = m(b) || k(b) || l(b); return !!(a ^ b) } }; var e = CKEDITOR.dom.walker.ignored(); CKEDITOR.dom.walker.empty =
                        function (a) { return function (b) { for (var c = 0, g = b.getChildCount(); c < g; ++c)if (!e(b.getChild(c))) return !!a; return !a } }; var c = CKEDITOR.dom.walker.empty(), n = CKEDITOR.dom.walker.validEmptyBlockContainers = CKEDITOR.tools.extend(function (a) { var b = {}, c; for (c in a) CKEDITOR.dtd[c]["#"] && (b[c] = 1); return b }(CKEDITOR.dtd.$block), { caption: 1, td: 1, th: 1 }); CKEDITOR.dom.walker.editable = function (a) {
                            return function (b) {
                                b = e(b) ? !1 : b.type == CKEDITOR.NODE_TEXT || b.type == CKEDITOR.NODE_ELEMENT && (b.is(CKEDITOR.dtd.$inline) || b.is("hr") ||
                                    "false" == b.getAttribute("contenteditable") || !CKEDITOR.env.needsBrFiller && b.is(n) && c(b)) ? !0 : !1; return !!(a ^ b)
                            }
                        }; CKEDITOR.dom.element.prototype.getBogus = function () { var a = this; do a = a.getPreviousSourceNode(); while (g(a)); return a && (CKEDITOR.env.needsBrFiller ? a.is && a.is("br") : a.getText && d.test(a.getText())) ? a : !1 }
            })(); "use strict"; CKEDITOR.dom.range = function (a) {
                this.endOffset = this.endContainer = this.startOffset = this.startContainer = null; this.collapsed = !0; var h = a instanceof CKEDITOR.dom.document; this.document =
                    h ? a : a.getDocument(); this.root = h ? a.getBody() : a
            }; (function () {
                function a(a) { a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset } function h(a, b, e, g, d) {
                    function f(a, b, c, e) { var g = c ? a.getPrevious() : a.getNext(); if (e && h) return g; z || e ? b.append(a.clone(!0, d), c) : (a.remove(), l && b.append(a, c)); return g } function k() { var a, b, c, e = Math.min(I.length, E.length); for (a = 0; a < e; a++)if (b = I[a], c = E[a], !b.equals(c)) return a; return a - 1 } function m() {
                        var b = P - 1, e = H && L &&
                            !y.equals(v); b < M - 1 || b < O - 1 || e ? (e ? a.moveToPosition(v, CKEDITOR.POSITION_BEFORE_START) : O == b + 1 && G ? a.moveToPosition(E[b], CKEDITOR.POSITION_BEFORE_END) : a.moveToPosition(E[b + 1], CKEDITOR.POSITION_BEFORE_START), g && (b = I[b + 1]) && b.type == CKEDITOR.NODE_ELEMENT && (e = CKEDITOR.dom.element.createFromHtml('\x3cspan data-cke-bookmark\x3d"1" style\x3d"display:none"\x3e\x26nbsp;\x3c/span\x3e', a.document), e.insertAfter(b), b.mergeSiblings(!1), a.moveToBookmark({ startNode: e }))) : a.collapse(!0)
                    } a.optimizeBookmark(); var h = 0 ===
                        b, l = 1 == b, z = 2 == b; b = z || l; var y = a.startContainer, v = a.endContainer, C = a.startOffset, F = a.endOffset, D, G, H, L, K, S; if (z && v.type == CKEDITOR.NODE_TEXT && (y.equals(v) || y.type === CKEDITOR.NODE_ELEMENT && y.getFirst().equals(v))) e.append(a.document.createText(v.substring(C, F))); else {
                            v.type == CKEDITOR.NODE_TEXT ? z ? S = !0 : v = v.split(F) : 0 < v.getChildCount() ? F >= v.getChildCount() ? (v = v.getChild(F - 1), G = !0) : v = v.getChild(F) : L = G = !0; y.type == CKEDITOR.NODE_TEXT ? z ? K = !0 : y.split(C) : 0 < y.getChildCount() ? 0 === C ? (y = y.getChild(C), D = !0) : y = y.getChild(C -
                                1) : H = D = !0; for (var I = y.getParents(), E = v.getParents(), P = k(), M = I.length - 1, O = E.length - 1, N = e, X, T, Y, da = -1, U = P; U <= M; U++) { T = I[U]; Y = T.getNext(); for (U != M || T.equals(E[U]) && M < O ? b && (X = N.append(T.clone(0, d))) : D ? f(T, N, !1, H) : K && N.append(a.document.createText(T.substring(C))); Y;) { if (Y.equals(E[U])) { da = U; break } Y = f(Y, N) } N = X } N = e; for (U = P; U <= O; U++)if (e = E[U], Y = e.getPrevious(), e.equals(I[U])) b && (N = N.getChild(0)); else {
                                    U != O || e.equals(I[U]) && O < M ? b && (X = N.append(e.clone(0, d))) : G ? f(e, N, !1, L) : S && N.append(a.document.createText(e.substring(0,
                                        F))); if (U > da) for (; Y;)Y = f(Y, N, !0); N = X
                                } z || m()
                        }
                } function f() { var a = !1, b = CKEDITOR.dom.walker.whitespaces(), e = CKEDITOR.dom.walker.bookmark(!0), g = CKEDITOR.dom.walker.bogus(); return function (d) { return e(d) || b(d) ? !0 : g(d) && !a ? a = !0 : d.type == CKEDITOR.NODE_TEXT && (d.hasAscendant("pre") || CKEDITOR.tools.trim(d.getText()).length) || d.type == CKEDITOR.NODE_ELEMENT && !d.is(m) ? !1 : !0 } } function b(a) {
                    var b = CKEDITOR.dom.walker.whitespaces(), e = CKEDITOR.dom.walker.bookmark(1); return function (g) {
                        return e(g) || b(g) ? !0 : !a && k(g) ||
                            g.type == CKEDITOR.NODE_ELEMENT && g.is(CKEDITOR.dtd.$removeEmpty)
                    }
                } function d(a) { return function () { var b; return this[a ? "getPreviousNode" : "getNextNode"](function (a) { !b && e(a) && (b = a); return g(a) && !(k(a) && a.equals(b)) }) } } var m = { abbr: 1, acronym: 1, b: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, q: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, tt: 1, u: 1, "var": 1 }, k = CKEDITOR.dom.walker.bogus(), l = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, g = CKEDITOR.dom.walker.editable(), e = CKEDITOR.dom.walker.ignored(!0);
                CKEDITOR.dom.range.prototype = {
                    clone: function () { var a = new CKEDITOR.dom.range(this.root); a._setStartContainer(this.startContainer); a.startOffset = this.startOffset; a._setEndContainer(this.endContainer); a.endOffset = this.endOffset; a.collapsed = this.collapsed; return a }, collapse: function (a) { a ? (this._setEndContainer(this.startContainer), this.endOffset = this.startOffset) : (this._setStartContainer(this.endContainer), this.startOffset = this.endOffset); this.collapsed = !0 }, cloneContents: function (a) {
                        var b = new CKEDITOR.dom.documentFragment(this.document);
                        this.collapsed || h(this, 2, b, !1, "undefined" == typeof a ? !0 : a); return b
                    }, deleteContents: function (a) { this.collapsed || h(this, 0, null, a) }, extractContents: function (a, b) { var e = new CKEDITOR.dom.documentFragment(this.document); this.collapsed || h(this, 1, e, a, "undefined" == typeof b ? !0 : b); return e }, equals: function (a) { return this.startOffset === a.startOffset && this.endOffset === a.endOffset && this.startContainer.equals(a.startContainer) && this.endContainer.equals(a.endContainer) }, createBookmark: function (a) {
                        function b(a) {
                            return a.getAscendant(function (a) {
                                var b;
                                if (b = a.data && a.data("cke-temp")) b = -1 === CKEDITOR.tools.array.indexOf(["cke_copybin", "cke_pastebin"], a.getAttribute("id")); return b
                            }, !0)
                        } var e = this.startContainer, g = this.endContainer, d = this.collapsed, f, k, m, h; f = this.document.createElement("span"); f.data("cke-bookmark", 1); f.setStyle("display", "none"); f.setHtml("\x26nbsp;"); a && (m = "cke_bm_" + CKEDITOR.tools.getNextNumber(), f.setAttribute("id", m + (d ? "C" : "S"))); d || (k = f.clone(), k.setHtml("\x26nbsp;"), a && k.setAttribute("id", m + "E"), h = this.clone(), b(g) && (g = b(g),
                            h.moveToPosition(g, CKEDITOR.POSITION_AFTER_END)), h.collapse(), h.insertNode(k)); h = this.clone(); b(e) && (g = b(e), h.moveToPosition(g, CKEDITOR.POSITION_BEFORE_START)); h.collapse(!0); h.insertNode(f); k ? (this.setStartAfter(f), this.setEndBefore(k)) : this.moveToPosition(f, CKEDITOR.POSITION_AFTER_END); return { startNode: a ? m + (d ? "C" : "S") : f, endNode: a ? m + "E" : k, serializable: a, collapsed: d }
                    }, createBookmark2: function () {
                        function a(b) {
                            var c = b.container, g = b.offset, d; d = c; var f = g; d = d.type != CKEDITOR.NODE_ELEMENT || 0 === f || f == d.getChildCount() ?
                                0 : d.getChild(f - 1).type == CKEDITOR.NODE_TEXT && d.getChild(f).type == CKEDITOR.NODE_TEXT; d && (c = c.getChild(g - 1), g = c.getLength()); if (c.type == CKEDITOR.NODE_ELEMENT && 0 < g) { a: { for (d = c; g--;)if (f = d.getChild(g).getIndex(!0), 0 <= f) { g = f; break a } g = -1 } g += 1 } if (c.type == CKEDITOR.NODE_TEXT) {
                                    d = c; for (f = 0; (d = d.getPrevious()) && d.type == CKEDITOR.NODE_TEXT;)f += d.getText().replace(CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE, "").length; d = f; c.isEmpty() ? (f = c.getPrevious(e), d ? (g = d, c = f ? f.getNext() : c.getParent().getFirst()) : (c = c.getParent(),
                                        g = f ? f.getIndex(!0) + 1 : 0)) : g += d
                                } b.container = c; b.offset = g
                        } function b(a, c) { var e = c.getCustomData("cke-fillingChar"); if (e) { var g = a.container; e.equals(g) && (a.offset -= CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE.length, 0 >= a.offset && (a.offset = g.getIndex(), a.container = g.getParent())) } } var e = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT, !0); return function (e) {
                            var g = this.collapsed, d = { container: this.startContainer, offset: this.startOffset }, f = { container: this.endContainer, offset: this.endOffset }; e && (a(d), b(d, this.root),
                                g || (a(f), b(f, this.root))); return { start: d.container.getAddress(e), end: g ? null : f.container.getAddress(e), startOffset: d.offset, endOffset: f.offset, normalized: e, collapsed: g, is2: !0 }
                        }
                    }(), moveToBookmark: function (a) {
                        if (a.is2) { var b = this.document.getByAddress(a.start, a.normalized), e = a.startOffset, g = a.end && this.document.getByAddress(a.end, a.normalized); a = a.endOffset; this.setStart(b, e); g ? this.setEnd(g, a) : this.collapse(!0) } else b = (e = a.serializable) ? this.document.getById(a.startNode) : a.startNode, a = e ? this.document.getById(a.endNode) :
                            a.endNode, this.setStartBefore(b), b.remove(), a ? (this.setEndBefore(a), a.remove()) : this.collapse(!0)
                    }, getBoundaryNodes: function () {
                        var a = this.startContainer, b = this.endContainer, e = this.startOffset, g = this.endOffset, d; if (a.type == CKEDITOR.NODE_ELEMENT) if (d = a.getChildCount(), d > e) a = a.getChild(e); else if (1 > d) a = a.getPreviousSourceNode(); else { for (a = a.$; a.lastChild;)a = a.lastChild; a = new CKEDITOR.dom.node(a); a = a.getNextSourceNode() || a } if (b.type == CKEDITOR.NODE_ELEMENT) if (d = b.getChildCount(), d > g) b = b.getChild(g).getPreviousSourceNode(!0);
                        else if (1 > d) b = b.getPreviousSourceNode(); else { for (b = b.$; b.lastChild;)b = b.lastChild; b = new CKEDITOR.dom.node(b) } a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b); return { startNode: a, endNode: b }
                    }, getCommonAncestor: function (a, b) { var e = this.startContainer, g = this.endContainer, e = e.equals(g) ? a && e.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? e.getChild(this.startOffset) : e : e.getCommonAncestor(g); return b && !e.is ? e.getParent() : e }, optimize: function () {
                        var a = this.startContainer, b = this.startOffset;
                        a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setStartAfter(a) : this.setStartBefore(a)); a = this.endContainer; b = this.endOffset; a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a))
                    }, optimizeBookmark: function () { var a = this.startContainer, b = this.endContainer; a.is && a.is("span") && a.data("cke-bookmark") && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START); b && b.is && b.is("span") && b.data("cke-bookmark") && this.setEndAt(b, CKEDITOR.POSITION_AFTER_END) }, trim: function (a,
                        b) {
                        var e = this.startContainer, g = this.startOffset, d = this.collapsed; if ((!a || d) && e && e.type == CKEDITOR.NODE_TEXT) { if (g) if (g >= e.getLength()) g = e.getIndex() + 1, e = e.getParent(); else { var f = e.split(g), g = e.getIndex() + 1, e = e.getParent(); this.startContainer.equals(this.endContainer) ? this.setEnd(f, this.endOffset - this.startOffset) : e.equals(this.endContainer) && (this.endOffset += 1) } else g = e.getIndex(), e = e.getParent(); this.setStart(e, g); if (d) { this.collapse(!0); return } } e = this.endContainer; g = this.endOffset; b || d || !e || e.type !=
                            CKEDITOR.NODE_TEXT || (g ? (g >= e.getLength() || e.split(g), g = e.getIndex() + 1) : g = e.getIndex(), e = e.getParent(), this.setEnd(e, g))
                    }, enlarge: function (a, b) {
                        function e(a) { return a && a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") ? null : a } function g(a, b, c) {
                            var e = new CKEDITOR.dom.range(c); e.setStart(a, b); e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END); c = new CKEDITOR.dom.walker(e); for (c.guard = function (a) { return !(a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary()) }; e = c.next();) {
                                if (e.type != CKEDITOR.NODE_TEXT) return !1;
                                f = e != a ? e.getText() : e.substring(b); if (d.test(f)) return !1
                            } return !0
                        } var d = new RegExp(/[^\s\ufeff]/), f, k; switch (a) {
                            case CKEDITOR.ENLARGE_INLINE: var m = 1; case CKEDITOR.ENLARGE_ELEMENT: if (this.collapsed) break; var h = this.getCommonAncestor(); k = this.root; var l, z, y, v, C, F = !1, D; D = this.startContainer; var G = this.startOffset; D.type == CKEDITOR.NODE_TEXT ? (G && (D = !CKEDITOR.tools.trim(D.substring(0, G)).length && D, F = !!D), D && ((v = D.getPrevious()) || (y = D.getParent()))) : (G && (v = D.getChild(G - 1) || D.getLast()), v || (y = D)); for (y = e(y); y ||
                                v;) {
                                if (y && !v) { !C && y.equals(h) && (C = !0); if (m ? y.isBlockBoundary() : !k.contains(y)) break; F && "inline" == y.getComputedStyle("display") || (F = !1, C ? l = y : this.setStartBefore(y)); v = y.getPrevious() } for (; v;)if (D = !1, v.type == CKEDITOR.NODE_COMMENT) v = v.getPrevious(); else {
                                    if (v.type == CKEDITOR.NODE_TEXT) f = v.getText(), d.test(f) && (v = null), D = /[\s\ufeff]$/.test(f); else if ((v.$.offsetWidth > (CKEDITOR.env.webkit ? 1 : 0) || b && v.is("br")) && !v.data("cke-bookmark")) if (F && CKEDITOR.dtd.$removeEmpty[v.getName()]) {
                                        f = v.getText(); if (d.test(f)) v =
                                            null; else for (var G = v.$.getElementsByTagName("*"), H = 0, L; L = G[H++];)if (!CKEDITOR.dtd.$removeEmpty[L.nodeName.toLowerCase()]) { v = null; break } v && (D = !!f.length)
                                    } else v = null; D && (F ? C ? l = y : y && this.setStartBefore(y) : F = !0); if (v) { D = v.getPrevious(); if (!y && !D) { y = v; v = null; break } v = D } else y = null
                                } y && (y = e(y.getParent()))
                            } D = this.endContainer; G = this.endOffset; y = v = null; C = F = !1; D.type == CKEDITOR.NODE_TEXT ? CKEDITOR.tools.trim(D.substring(G)).length ? F = !0 : (F = !D.getLength(), G == D.getLength() ? (v = D.getNext()) || (y = D.getParent()) : g(D,
                                G, k) && (y = D.getParent())) : (v = D.getChild(G)) || (y = D); for (; y || v;) {
                                    if (y && !v) { !C && y.equals(h) && (C = !0); if (m ? y.isBlockBoundary() : !k.contains(y)) break; F && "inline" == y.getComputedStyle("display") || (F = !1, C ? z = y : y && this.setEndAfter(y)); v = y.getNext() } for (; v;) {
                                        D = !1; if (v.type == CKEDITOR.NODE_TEXT) f = v.getText(), g(v, 0, k) || (v = null), D = /^[\s\ufeff]/.test(f); else if (v.type == CKEDITOR.NODE_ELEMENT) {
                                            if ((0 < v.$.offsetWidth || b && v.is("br")) && !v.data("cke-bookmark")) if (F && CKEDITOR.dtd.$removeEmpty[v.getName()]) {
                                                f = v.getText(); if (d.test(f)) v =
                                                    null; else for (G = v.$.getElementsByTagName("*"), H = 0; L = G[H++];)if (!CKEDITOR.dtd.$removeEmpty[L.nodeName.toLowerCase()]) { v = null; break } v && (D = !!f.length)
                                            } else v = null
                                        } else D = 1; D && F && (C ? z = y : this.setEndAfter(y)); if (v) { D = v.getNext(); if (!y && !D) { y = v; v = null; break } v = D } else y = null
                                    } y && (y = e(y.getParent()))
                                } l && z && (h = l.contains(z) ? z : l, this.setStartBefore(h), this.setEndAfter(h)); break; case CKEDITOR.ENLARGE_BLOCK_CONTENTS: case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS: y = new CKEDITOR.dom.range(this.root); k = this.root; y.setStartAt(k,
                                    CKEDITOR.POSITION_AFTER_START); y.setEnd(this.startContainer, this.startOffset); y = new CKEDITOR.dom.walker(y); var K, S, I = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? { br: 1 } : null), E = null, P = function (a) { if (a.type == CKEDITOR.NODE_ELEMENT && "false" == a.getAttribute("contenteditable")) if (E) { if (E.equals(a)) { E = null; return } } else E = a; else if (E) return; var b = I(a); b || (K = a); return b }, m = function (a) { var b = P(a); !b && a.is && a.is("br") && (S = a); return b }; y.guard = P; y = y.lastBackward(); K = K || k; this.setStartAt(K,
                                        !K.is("br") && (!y && this.checkStartOfBlock() || y && K.contains(y)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END); if (a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) { y = this.clone(); y = new CKEDITOR.dom.walker(y); var M = CKEDITOR.dom.walker.whitespaces(), O = CKEDITOR.dom.walker.bookmark(); y.evaluator = function (a) { return !M(a) && !O(a) }; if ((y = y.previous()) && y.type == CKEDITOR.NODE_ELEMENT && y.is("br")) break } y = this.clone(); y.collapse(); y.setEndAt(k, CKEDITOR.POSITION_BEFORE_END); y = new CKEDITOR.dom.walker(y); y.guard =
                                            a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? m : P; K = E = S = null; y = y.lastForward(); K = K || k; this.setEndAt(K, !y && this.checkEndOfBlock() || y && K.contains(y) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START); S && this.setEndAfter(S)
                        }
                    }, shrink: function (a, b, e) {
                        var g = "boolean" === typeof e ? e : e && "boolean" === typeof e.shrinkOnBlockBoundary ? e.shrinkOnBlockBoundary : !0, d = e && e.skipBogus; if (!this.collapsed) {
                            a = a || CKEDITOR.SHRINK_TEXT; var f = this.clone(), k = this.startContainer, m = this.endContainer, h = this.startOffset, l = this.endOffset,
                                z = e = 1; k && k.type == CKEDITOR.NODE_TEXT && (h ? h >= k.getLength() ? f.setStartAfter(k) : (f.setStartBefore(k), e = 0) : f.setStartBefore(k)); m && m.type == CKEDITOR.NODE_TEXT && (l ? l >= m.getLength() ? f.setEndAfter(m) : (f.setEndAfter(m), z = 0) : f.setEndBefore(m)); var f = new CKEDITOR.dom.walker(f), y = CKEDITOR.dom.walker.bookmark(), v = CKEDITOR.dom.walker.bogus(); f.evaluator = function (b) { return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT) }; var C; f.guard = function (b, e) {
                                    if (d && v(b) || y(b)) return !0; if (a == CKEDITOR.SHRINK_ELEMENT &&
                                        b.type == CKEDITOR.NODE_TEXT || e && b.equals(C) || !1 === g && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary() || b.type == CKEDITOR.NODE_ELEMENT && b.hasAttribute("contenteditable")) return !1; e || b.type != CKEDITOR.NODE_ELEMENT || (C = b); return !0
                                }; e && (k = f[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(k, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START); z && (f.reset(), (f = f[a == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(f, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END));
                            return !(!e && !z)
                        }
                    }, insertNode: function (a) { this.optimizeBookmark(); this.trim(!1, !0); var b = this.startContainer, e = b.getChild(this.startOffset); e ? a.insertBefore(e) : b.append(a); a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++; this.setStartBefore(a) }, moveToPosition: function (a, b) { this.setStartAt(a, b); this.collapse(!0) }, moveToRange: function (a) { this.setStart(a.startContainer, a.startOffset); this.setEnd(a.endContainer, a.endOffset) }, selectNodeContents: function (a) {
                        this.setStart(a, 0); this.setEnd(a,
                            a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount())
                    }, setStart: function (b, e) { b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (e = b.getIndex(), b = b.getParent()); this._setStartContainer(b); this.startOffset = e; this.endContainer || (this._setEndContainer(b), this.endOffset = e); a(this) }, setEnd: function (b, e) {
                        b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (e = b.getIndex() + 1, b = b.getParent()); this._setEndContainer(b); this.endOffset = e; this.startContainer || (this._setStartContainer(b),
                            this.startOffset = e); a(this)
                    }, setStartAfter: function (a) { this.setStart(a.getParent(), a.getIndex() + 1) }, setStartBefore: function (a) { this.setStart(a.getParent(), a.getIndex()) }, setEndAfter: function (a) { this.setEnd(a.getParent(), a.getIndex() + 1) }, setEndBefore: function (a) { this.setEnd(a.getParent(), a.getIndex()) }, setStartAt: function (b, e) {
                        switch (e) {
                            case CKEDITOR.POSITION_AFTER_START: this.setStart(b, 0); break; case CKEDITOR.POSITION_BEFORE_END: b.type == CKEDITOR.NODE_TEXT ? this.setStart(b, b.getLength()) : this.setStart(b,
                                b.getChildCount()); break; case CKEDITOR.POSITION_BEFORE_START: this.setStartBefore(b); break; case CKEDITOR.POSITION_AFTER_END: this.setStartAfter(b)
                        }a(this)
                    }, setEndAt: function (b, e) { switch (e) { case CKEDITOR.POSITION_AFTER_START: this.setEnd(b, 0); break; case CKEDITOR.POSITION_BEFORE_END: b.type == CKEDITOR.NODE_TEXT ? this.setEnd(b, b.getLength()) : this.setEnd(b, b.getChildCount()); break; case CKEDITOR.POSITION_BEFORE_START: this.setEndBefore(b); break; case CKEDITOR.POSITION_AFTER_END: this.setEndAfter(b) }a(this) }, fixBlock: function (a,
                        b) { var e = this.createBookmark(), g = this.document.createElement(b); this.collapse(a); this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS); this.extractContents().appendTo(g); g.trim(); this.insertNode(g); var d = g.getBogus(); d && d.remove(); g.appendBogus(); this.moveToBookmark(e); return g }, splitBlock: function (a, b) {
                            var e = new CKEDITOR.dom.elementPath(this.startContainer, this.root), g = new CKEDITOR.dom.elementPath(this.endContainer, this.root), d = e.block, f = g.block, k = null; if (!e.blockLimit.equals(g.blockLimit)) return null; "br" !=
                                a && (d || (d = this.fixBlock(!0, a), f = (new CKEDITOR.dom.elementPath(this.endContainer, this.root)).block), f || (f = this.fixBlock(!1, a))); e = d && this.checkStartOfBlock(); g = f && this.checkEndOfBlock(); this.deleteContents(); d && d.equals(f) && (g ? (k = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(f, CKEDITOR.POSITION_AFTER_END), f = null) : e ? (k = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(d, CKEDITOR.POSITION_BEFORE_START), d = null) : (f = this.splitElement(d, b ||
                                    !1), d.is("ul", "ol") || d.appendBogus())); return { previousBlock: d, nextBlock: f, wasStartOfBlock: e, wasEndOfBlock: g, elementPath: k }
                        }, splitElement: function (a, b) { if (!this.collapsed) return null; this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END); var e = this.extractContents(!1, b || !1), g = a.clone(!1, b || !1); e.appendTo(g); g.insertAfter(a); this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END); return g }, removeEmptyBlocksAtEnd: function () {
                            function a(c) {
                                return function (a) {
                                    return b(a) || e(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable() ||
                                        c.is("table") && a.is("caption") ? !1 : !0
                                }
                            } var b = CKEDITOR.dom.walker.whitespaces(), e = CKEDITOR.dom.walker.bookmark(!1); return function (b) { for (var e = this.createBookmark(), g = this[b ? "endPath" : "startPath"](), d = g.block || g.blockLimit, f; d && !d.equals(g.root) && !d.getFirst(a(d));)f = d.getParent(), this[b ? "setEndAt" : "setStartAt"](d, CKEDITOR.POSITION_AFTER_END), d.remove(1), d = f; this.moveToBookmark(e) }
                        }(), startPath: function () { return new CKEDITOR.dom.elementPath(this.startContainer, this.root) }, endPath: function () {
                            return new CKEDITOR.dom.elementPath(this.endContainer,
                                this.root)
                        }, checkBoundaryOfElement: function (a, e) { var g = e == CKEDITOR.START, d = this.clone(); d.collapse(g); d[g ? "setStartAt" : "setEndAt"](a, g ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END); d = new CKEDITOR.dom.walker(d); d.evaluator = b(g); return d[g ? "checkBackward" : "checkForward"]() }, checkStartOfBlock: function (a) {
                            var b = this.startContainer, e = this.startOffset; CKEDITOR.env.ie && e && b.type == CKEDITOR.NODE_TEXT && (b = CKEDITOR.tools.ltrim(b.substring(0, e)), l.test(b) && this.trim(0, 1)); a || this.trim(); a = new CKEDITOR.dom.elementPath(this.startContainer,
                                this.root); b = this.clone(); b.collapse(!0); b.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START); a = new CKEDITOR.dom.walker(b); a.evaluator = f(); return a.checkBackward()
                        }, checkEndOfBlock: function (a) {
                            var b = this.endContainer, e = this.endOffset; CKEDITOR.env.ie && b.type == CKEDITOR.NODE_TEXT && (b = CKEDITOR.tools.rtrim(b.substring(e)), l.test(b) && this.trim(1, 0)); a || this.trim(); a = new CKEDITOR.dom.elementPath(this.endContainer, this.root); b = this.clone(); b.collapse(!1); b.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END);
                            a = new CKEDITOR.dom.walker(b); a.evaluator = f(); return a.checkForward()
                        }, getPreviousNode: function (a, b, e) { var g = this.clone(); g.collapse(1); g.setStartAt(e || this.root, CKEDITOR.POSITION_AFTER_START); e = new CKEDITOR.dom.walker(g); e.evaluator = a; e.guard = b; return e.previous() }, getNextNode: function (a, b, e) { var g = this.clone(); g.collapse(); g.setEndAt(e || this.root, CKEDITOR.POSITION_BEFORE_END); e = new CKEDITOR.dom.walker(g); e.evaluator = a; e.guard = b; return e.next() }, checkReadOnly: function () {
                            function a(b, c) {
                                for (; b;) {
                                    if (b.type ==
                                        CKEDITOR.NODE_ELEMENT) { if ("false" == b.getAttribute("contentEditable") && !b.data("cke-editable")) return 0; if (b.is("html") || "true" == b.getAttribute("contentEditable") && (b.contains(c) || b.equals(c))) break } b = b.getParent()
                                } return 1
                            } return function () { var b = this.startContainer, e = this.endContainer; return !(a(b, e) && a(e, b)) }
                        }(), moveToElementEditablePosition: function (a, b) {
                            if (a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable(!1)) return this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START),
                                !0; for (var g = 0; a;) {
                                    if (a.type == CKEDITOR.NODE_TEXT) { b && this.endContainer && this.checkEndOfBlock() && l.test(a.getText()) ? this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START); g = 1; break } if (a.type == CKEDITOR.NODE_ELEMENT) if (a.isEditable()) this.moveToPosition(a, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START), g = 1; else if (b && a.is("br") && this.endContainer && this.checkEndOfBlock()) this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START);
                                    else if ("false" == a.getAttribute("contenteditable") && a.is(CKEDITOR.dtd.$block)) return this.setStartBefore(a), this.setEndAfter(a), !0; var d = a, f = g, k = void 0; d.type == CKEDITOR.NODE_ELEMENT && d.isEditable(!1) && (k = d[b ? "getLast" : "getFirst"](e)); f || k || (k = d[b ? "getPrevious" : "getNext"](e)); a = k
                                } return !!g
                        }, moveToClosestEditablePosition: function (a, b) {
                            var e, g = 0, d, f, k = [CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START]; a ? (e = new CKEDITOR.dom.range(this.root), e.moveToPosition(a, k[b ? 0 : 1])) : e = this.clone(); if (a &&
                                !a.is(CKEDITOR.dtd.$block)) g = 1; else if (d = e[b ? "getNextEditableNode" : "getPreviousEditableNode"]()) g = 1, (f = d.type == CKEDITOR.NODE_ELEMENT) && d.is(CKEDITOR.dtd.$block) && "false" == d.getAttribute("contenteditable") ? (e.setStartAt(d, CKEDITOR.POSITION_BEFORE_START), e.setEndAt(d, CKEDITOR.POSITION_AFTER_END)) : !CKEDITOR.env.needsBrFiller && f && d.is(CKEDITOR.dom.walker.validEmptyBlockContainers) ? (e.setEnd(d, 0), e.collapse()) : e.moveToPosition(d, k[b ? 1 : 0]); g && this.moveToRange(e); return !!g
                        }, moveToElementEditStart: function (a) { return this.moveToElementEditablePosition(a) },
                    moveToElementEditEnd: function (a) { return this.moveToElementEditablePosition(a, !0) }, getEnclosedNode: function () { var a = this.clone(); a.optimize(); if (a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT) return null; var a = new CKEDITOR.dom.walker(a), b = CKEDITOR.dom.walker.bookmark(!1, !0), e = CKEDITOR.dom.walker.whitespaces(!0); a.evaluator = function (a) { return e(a) && b(a) }; var g = a.next(); a.reset(); return g && g.equals(a.previous()) ? g : null }, getTouchedStartNode: function () {
                        var a = this.startContainer;
                        return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a
                    }, getTouchedEndNode: function () { var a = this.endContainer; return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a }, getNextEditableNode: d(), getPreviousEditableNode: d(1), _getTableElement: function (a) {
                        a = a || { td: 1, th: 1, tr: 1, tbody: 1, thead: 1, tfoot: 1, table: 1 }; var b = this.getTouchedStartNode(), e = this.getTouchedEndNode(), g = b.getAscendant("table", !0), e = e.getAscendant("table", !0); return g && !this.root.contains(g) ?
                            null : this.getEnclosedNode() ? this.getEnclosedNode().getAscendant(a, !0) : g && e && (g.equals(e) || g.contains(e) || e.contains(g)) ? b.getAscendant(a, !0) : null
                    }, scrollIntoView: function () {
                        var a = new CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", this.document), b, e, g, d = this.clone(); d.optimize(); (g = d.startContainer.type == CKEDITOR.NODE_TEXT) ? (e = d.startContainer.getText(), b = d.startContainer.split(d.startOffset), a.insertAfter(d.startContainer)) : d.insertNode(a); a.scrollIntoView(); g && (d.startContainer.setText(e),
                            b.remove()); a.remove()
                    }, getClientRects: function () {
                        function a(b, c) {
                            var e = CKEDITOR.tools.array.map(b, function (a) { return a }), g = new CKEDITOR.dom.range(c.root), d, f, k; c.startContainer instanceof CKEDITOR.dom.element && (f = 0 === c.startOffset && c.startContainer.hasAttribute("data-widget")); c.endContainer instanceof CKEDITOR.dom.element && (k = (k = c.endOffset === (c.endContainer.getChildCount ? c.endContainer.getChildCount() : c.endContainer.length)) && c.endContainer.hasAttribute("data-widget")); f && g.setStart(c.startContainer.getParent(),
                                c.startContainer.getIndex()); k && g.setEnd(c.endContainer.getParent(), c.endContainer.getIndex() + 1); if (f || k) c = g; g = c.cloneContents().find("[data-cke-widget-id]").toArray(); if (g = CKEDITOR.tools.array.map(g, function (a) { var b = c.root.editor; a = a.getAttribute("data-cke-widget-id"); return b.widgets.instances[a].element })) return g = CKEDITOR.tools.array.map(g, function (a) {
                                    var b; b = a.getParent().hasClass("cke_widget_wrapper") ? a.getParent() : a; d = this.root.getDocument().$.createRange(); d.setStart(b.getParent().$, b.getIndex());
                                    d.setEnd(b.getParent().$, b.getIndex() + 1); b = d.getClientRects(); b.widgetRect = a.getClientRect(); return b
                                }, c), CKEDITOR.tools.array.forEach(g, function (a) { function b(g) { CKEDITOR.tools.array.forEach(e, function (b, d) { var f = CKEDITOR.tools.objectCompare(a[g], b); f || (f = CKEDITOR.tools.objectCompare(a.widgetRect, b)); f && (Array.prototype.splice.call(e, d, a.length - g, a.widgetRect), c = !0) }); c || (g < e.length - 1 ? b(g + 1) : e.push(a.widgetRect)) } var c; b(0) }), e
                        } function b(a, c, e) {
                            var d; c.collapsed ? e.startContainer instanceof CKEDITOR.dom.element ?
                                (a = e.checkStartOfBlock(), d = new CKEDITOR.dom.text("​"), a ? e.startContainer.append(d, !0) : 0 === e.startOffset ? d.insertBefore(e.startContainer.getFirst()) : (e = e.startContainer.getChildren().getItem(e.startOffset - 1), d.insertAfter(e)), c.setStart(d.$, 0), c.setEnd(d.$, 0), a = c.getClientRects(), d.remove()) : e.startContainer instanceof CKEDITOR.dom.text && ("" === e.startContainer.getText() ? (e.startContainer.setText("​"), a = c.getClientRects(), e.startContainer.setText("")) : a = [g(e.createBookmark())]) : a = [g(e.createBookmark())];
                            return a
                        } function e(a, b, c) { a = CKEDITOR.tools.extend({}, a); b && (a = CKEDITOR.tools.getAbsoluteRectPosition(c.document.getWindow(), a)); !a.width && (a.width = a.right - a.left); !a.height && (a.height = a.bottom - a.top); return a } function g(a) {
                            var b = a.startNode; a = a.endNode; var c; b.setText("​"); b.removeStyle("display"); a ? (a.setText("​"), a.removeStyle("display"), c = [b.getClientRect(), a.getClientRect()], a.remove()) : c = [b.getClientRect(), b.getClientRect()]; b.remove(); return {
                                right: Math.max(c[0].right, c[1].right), bottom: Math.max(c[0].bottom,
                                    c[1].bottom), left: Math.min(c[0].left, c[1].left), top: Math.min(c[0].top, c[1].top), width: Math.abs(c[0].left - c[1].left), height: Math.max(c[0].bottom, c[1].bottom) - Math.min(c[0].top, c[1].top)
                            }
                        } return void 0 !== document.getSelection ? function (g) {
                            var d = this.root.getDocument().$.createRange(), f; d.setStart(this.startContainer.$, this.startOffset); d.setEnd(this.endContainer.$, this.endOffset); f = d.getClientRects(); f = a(f, this); f.length || (f = b(f, d, this)); return CKEDITOR.tools.array.map(f, function (a) { return e(a, g, this) },
                                this)
                        } : function (a) { return [e(g(this.createBookmark()), a, this)] }
                    }(), _setStartContainer: function (a) { this.startContainer = a }, _setEndContainer: function (a) { this.endContainer = a }, _find: function (a, b) {
                        var e = this.getCommonAncestor(), g = this.getBoundaryNodes(), d = [], f, k, m, h; if (e && e.find) for (k = e.find(a), f = 0; f < k.count(); f++)if (e = k.getItem(f), b || !e.isReadOnly()) m = e.getPosition(g.startNode) & CKEDITOR.POSITION_FOLLOWING || g.startNode.equals(e), h = e.getPosition(g.endNode) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IS_CONTAINED ||
                            g.endNode.equals(e), m && h && d.push(e); return d
                    }
                }; CKEDITOR.dom.range.mergeRanges = function (a) {
                    return CKEDITOR.tools.array.reduce(a, function (a, b) {
                        var c = a[a.length - 1], e = !1; b = b.clone(); b.enlarge(CKEDITOR.ENLARGE_ELEMENT); if (c) { var g = new CKEDITOR.dom.range(b.root), e = new CKEDITOR.dom.walker(g), d = CKEDITOR.dom.walker.whitespaces(); g.setStart(c.endContainer, c.endOffset); g.setEnd(b.startContainer, b.startOffset); for (g = e.next(); d(g) || b.endContainer.equals(g);)g = e.next(); e = !g } e ? c.setEnd(b.endContainer, b.endOffset) :
                            a.push(b); return a
                    }, [])
                }
            })(); CKEDITOR.POSITION_AFTER_START = 1; CKEDITOR.POSITION_BEFORE_END = 2; CKEDITOR.POSITION_BEFORE_START = 3; CKEDITOR.POSITION_AFTER_END = 4; CKEDITOR.ENLARGE_ELEMENT = 1; CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2; CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3; CKEDITOR.ENLARGE_INLINE = 4; CKEDITOR.START = 1; CKEDITOR.END = 2; CKEDITOR.SHRINK_ELEMENT = 1; CKEDITOR.SHRINK_TEXT = 2; "use strict"; (function () {
                function a(a) {
                    1 > arguments.length || (this.range = a, this.forceBrBreak = 0, this.enlargeBr = 1, this.enforceRealBlocks = 0, this._ ||
                        (this._ = {}))
                } function h(a) { var b = []; a.forEach(function (a) { if ("true" == a.getAttribute("contenteditable")) return b.push(a), !1 }, CKEDITOR.NODE_ELEMENT, !0); return b } function f(a, b, g, d) {
                    a: { null == d && (d = h(g)); for (var k; k = d.shift();)if (k.getDtd().p) { d = { element: k, remaining: d }; break a } d = null } if (!d) return 0; if ((k = CKEDITOR.filter.instances[d.element.data("cke-filter")]) && !k.check(b)) return f(a, b, g, d.remaining); b = new CKEDITOR.dom.range(d.element); b.selectNodeContents(d.element); b = b.createIterator(); b.enlargeBr =
                        a.enlargeBr; b.enforceRealBlocks = a.enforceRealBlocks; b.activeFilter = b.filter = k; a._.nestedEditable = { element: d.element, container: g, remaining: d.remaining, iterator: b }; return 1
                } function b(a, b, g) { if (!b) return !1; a = a.clone(); a.collapse(!g); return a.checkBoundaryOfElement(b, g ? CKEDITOR.START : CKEDITOR.END) } var d = /^[\r\n\t ]+$/, m = CKEDITOR.dom.walker.bookmark(!1, !0), k = CKEDITOR.dom.walker.whitespaces(!0), l = function (a) { return m(a) && k(a) }, g = { dd: 1, dt: 1, li: 1 }; a.prototype = {
                    getNextParagraph: function (a) {
                        var c, k, h, x, u;
                        a = a || "p"; if (this._.nestedEditable) { if (c = this._.nestedEditable.iterator.getNextParagraph(a)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, c; this.activeFilter = this.filter; if (f(this, a, this._.nestedEditable.container, this._.nestedEditable.remaining)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, this._.nestedEditable.iterator.getNextParagraph(a); this._.nestedEditable = null } if (!this.range.root.getDtd()[a]) return null; if (!this._.started) {
                            var p = this.range.clone();
                            k = p.startPath(); var t = p.endPath(), A = !p.collapsed && b(p, k.block), q = !p.collapsed && b(p, t.block, 1); p.shrink(CKEDITOR.SHRINK_ELEMENT, !0); A && p.setStartAt(k.block, CKEDITOR.POSITION_BEFORE_END); q && p.setEndAt(t.block, CKEDITOR.POSITION_AFTER_START); k = p.endContainer.hasAscendant("pre", !0) || p.startContainer.hasAscendant("pre", !0); p.enlarge(this.forceBrBreak && !k || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS); p.collapsed || (k = new CKEDITOR.dom.walker(p.clone()), t = CKEDITOR.dom.walker.bookmark(!0,
                                !0), k.evaluator = t, this._.nextNode = k.next(), k = new CKEDITOR.dom.walker(p.clone()), k.evaluator = t, k = k.previous(), this._.lastNode = k.getNextSourceNode(!0, null, p.root), this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary() && (t = this.range.clone(), t.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END), t.checkEndOfBlock() && (t = new CKEDITOR.dom.elementPath(t.endContainer, t.root), this._.lastNode = (t.block ||
                                    t.blockLimit).getNextSourceNode(!0))), this._.lastNode && p.root.contains(this._.lastNode) || (this._.lastNode = this._.docEndMarker = p.document.createText(""), this._.lastNode.insertAfter(k)), p = null); this._.started = 1; k = p
                        } t = this._.nextNode; p = this._.lastNode; for (this._.nextNode = null; t;) {
                            var A = 0, q = t.hasAscendant("pre"), B = t.type != CKEDITOR.NODE_ELEMENT, z = 0; if (B) t.type == CKEDITOR.NODE_TEXT && d.test(t.getText()) && (B = 0); else {
                                var y = t.getName(); if (CKEDITOR.dtd.$block[y] && "false" == t.getAttribute("contenteditable")) {
                                    c =
                                        t; f(this, a, c); break
                                } else if (t.isBlockBoundary(this.forceBrBreak && !q && { br: 1 })) { if ("br" == y) B = 1; else if (!k && !t.getChildCount() && "hr" != y) { c = t; h = t.equals(p); break } k && (k.setEndAt(t, CKEDITOR.POSITION_BEFORE_START), "br" != y && (this._.nextNode = t)); A = 1 } else { if (t.getFirst()) { k || (k = this.range.clone(), k.setStartAt(t, CKEDITOR.POSITION_BEFORE_START)); t = t.getFirst(); continue } B = 1 }
                            } B && !k && (k = this.range.clone(), k.setStartAt(t, CKEDITOR.POSITION_BEFORE_START)); h = (!A || B) && t.equals(p); if (k && !A) for (; !t.getNext(l) && !h;) {
                                y =
                                    t.getParent(); if (y.isBlockBoundary(this.forceBrBreak && !q && { br: 1 })) { A = 1; B = 0; h || y.equals(p); k.setEndAt(y, CKEDITOR.POSITION_BEFORE_END); break } t = y; B = 1; h = t.equals(p); z = 1
                            } B && k.setEndAt(t, CKEDITOR.POSITION_AFTER_END); t = this._getNextSourceNode(t, z, p); if ((h = !t) || A && k) break
                        } if (!c) {
                            if (!k) return this._.docEndMarker && this._.docEndMarker.remove(), this._.nextNode = null; c = new CKEDITOR.dom.elementPath(k.startContainer, k.root); t = c.blockLimit; A = { div: 1, th: 1, td: 1 }; c = c.block; !c && t && !this.enforceRealBlocks && A[t.getName()] &&
                                k.checkStartOfBlock() && k.checkEndOfBlock() && !t.equals(k.root) ? c = t : !c || this.enforceRealBlocks && c.is(g) ? (c = this.range.document.createElement(a), k.extractContents().appendTo(c), c.trim(), k.insertNode(c), x = u = !0) : "li" != c.getName() ? k.checkStartOfBlock() && k.checkEndOfBlock() || (c = c.clone(!1), k.extractContents().appendTo(c), c.trim(), u = k.splitBlock(), x = !u.wasStartOfBlock, u = !u.wasEndOfBlock, k.insertNode(c)) : h || (this._.nextNode = c.equals(p) ? null : this._getNextSourceNode(k.getBoundaryNodes().endNode, 1, p))
                        } x && (x =
                            c.getPrevious()) && x.type == CKEDITOR.NODE_ELEMENT && ("br" == x.getName() ? x.remove() : x.getLast() && "br" == x.getLast().$.nodeName.toLowerCase() && x.getLast().remove()); u && (x = c.getLast()) && x.type == CKEDITOR.NODE_ELEMENT && "br" == x.getName() && (!CKEDITOR.env.needsBrFiller || x.getPrevious(m) || x.getNext(m)) && x.remove(); this._.nextNode || (this._.nextNode = h || c.equals(p) || !p ? null : this._getNextSourceNode(c, 1, p)); return c
                    }, _getNextSourceNode: function (a, b, g) {
                        function d(a) { return !(a.equals(g) || a.equals(f)) } var f = this.range.root;
                        for (a = a.getNextSourceNode(b, null, d); !m(a);)a = a.getNextSourceNode(b, null, d); return a
                    }
                }; CKEDITOR.dom.range.prototype.createIterator = function () { return new a(this) }
            })(); CKEDITOR.command = function (a, h) {
                this.uiItems = []; this.exec = function (b) { if (this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed()) return !1; this.editorFocus && a.focus(); return !1 === this.fire("exec") ? !0 : !1 !== h.exec.call(this, a, b) }; this.refresh = function (a, d) {
                    if (!this.readOnly && a.readOnly) return !0; if (this.context && !d.isContextFor(this.context) ||
                        !this.checkAllowed(!0)) return this.disable(), !0; this.startDisabled || this.enable(); this.modes && !this.modes[a.mode] && this.disable(); return !1 === this.fire("refresh", { editor: a, path: d }) ? !0 : h.refresh && !1 !== h.refresh.apply(this, arguments)
                }; var f; this.checkAllowed = function (b) { return b || "boolean" != typeof f ? f = a.activeFilter.checkFeature(this) : f }; CKEDITOR.tools.extend(this, h, { modes: { wysiwyg: 1 }, editorFocus: 1, contextSensitive: !!h.context, state: CKEDITOR.TRISTATE_DISABLED }); CKEDITOR.event.call(this)
            }; CKEDITOR.command.prototype =
            {
                enable: function () { this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(this.preserveState && "undefined" != typeof this.previousState ? this.previousState : CKEDITOR.TRISTATE_OFF) }, disable: function () { this.setState(CKEDITOR.TRISTATE_DISABLED) }, setState: function (a) { if (this.state == a || a != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed()) return !1; this.previousState = this.state; this.state = a; this.fire("state"); return !0 }, toggleState: function () {
                    this.state == CKEDITOR.TRISTATE_OFF ? this.setState(CKEDITOR.TRISTATE_ON) :
                        this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF)
                }
            }; CKEDITOR.event.implementOn(CKEDITOR.command.prototype); CKEDITOR.ENTER_P = 1; CKEDITOR.ENTER_BR = 2; CKEDITOR.ENTER_DIV = 3; CKEDITOR.config = {
                customConfig: "config.js", autoUpdateElement: !0, language: "", defaultLanguage: "en", contentsLangDirection: "", enterMode: CKEDITOR.ENTER_P, forceEnterMode: !1, shiftEnterMode: CKEDITOR.ENTER_BR, docType: "\x3c!DOCTYPE html\x3e", bodyId: "", bodyClass: "", fullPage: !1, height: 200, contentsCss: CKEDITOR.getUrl("contents.css"),
                extraPlugins: "", removePlugins: "", protectedSource: [], tabIndex: 0, useComputedState: !0, width: "", baseFloatZIndex: 1E4, blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85]
            }; (function () {
                function a(a, b, c, e, g) {
                    var d, f; a = []; for (d in b) {
                        f = b[d]; f = "boolean" == typeof f ? {} : "function" == typeof f ? { match: f } : H(f); "$" != d.charAt(0) && (f.elements = d); c && (f.featureName = c.toLowerCase()); var h = f; h.elements = k(h.elements, /\s+/) || null; h.propertiesOnly = h.propertiesOnly || !0 === h.elements; var m = /\s*,\s*/, l = void 0; for (l in S) {
                            h[l] =
                                k(h[l], m) || null; var n = h, t = I[l], r = k(h[I[l]], m), O = h[l], q = [], J = !0, M = void 0; r ? J = !1 : r = {}; for (M in O) "!" == M.charAt(0) && (M = M.slice(1), q.push(M), r[M] = !0, J = !1); for (; M = q.pop();)O[M] = O["!" + M], delete O["!" + M]; n[t] = (J ? !1 : r) || null
                        } h.match = h.match || null; e.push(f); a.push(f)
                    } b = g.elements; g = g.generic; var v; c = 0; for (e = a.length; c < e; ++c) {
                        d = H(a[c]); f = !0 === d.classes || !0 === d.styles || !0 === d.attributes; h = d; l = t = m = void 0; for (m in S) h[m] = A(h[m]); n = !0; for (l in I) {
                            m = I[l]; t = h[m]; r = []; O = void 0; for (O in t) -1 < O.indexOf("*") ? r.push(new RegExp("^" +
                                O.replace(/\*/g, ".*") + "$")) : r.push(O); t = r; t.length && (h[m] = t, n = !1)
                        } h.nothingRequired = n; h.noProperties = !(h.attributes || h.classes || h.styles); if (!0 === d.elements || null === d.elements) g[f ? "unshift" : "push"](d); else for (v in h = d.elements, delete d.elements, h) if (b[v]) b[v][f ? "unshift" : "push"](d); else b[v] = [d]
                    }
                } function h(a, b, c, e) {
                    if (!a.match || a.match(b)) if (e || l(a, b)) if (a.propertiesOnly || (c.valid = !0), c.allAttributes || (c.allAttributes = f(a.attributes, b.attributes, c.validAttributes)), c.allStyles || (c.allStyles = f(a.styles,
                        b.styles, c.validStyles)), !c.allClasses) { a = a.classes; b = b.classes; e = c.validClasses; if (a) if (!0 === a) a = !0; else { for (var g = 0, d = b.length, k; g < d; ++g)k = b[g], e[k] || (e[k] = a(k)); a = !1 } else a = !1; c.allClasses = a }
                } function f(a, b, c) { if (!a) return !1; if (!0 === a) return !0; for (var e in b) c[e] || (c[e] = a(e)); return !1 } function b(a, b, c) {
                    if (!a.match || a.match(b)) {
                        if (a.noProperties) return !1; c.hadInvalidAttribute = d(a.attributes, b.attributes) || c.hadInvalidAttribute; c.hadInvalidStyle = d(a.styles, b.styles) || c.hadInvalidStyle; a = a.classes;
                        b = b.classes; if (a) { for (var e = !1, g = !0 === a, f = b.length; f--;)if (g || a(b[f])) b.splice(f, 1), e = !0; a = e } else a = !1; c.hadInvalidClass = a || c.hadInvalidClass
                    }
                } function d(a, b) { if (!a) return !1; var c = !1, e = !0 === a, g; for (g in b) if (e || a(g)) delete b[g], c = !0; return c } function m(a, b, c) { if (a.disabled || a.customConfig && !c || !b) return !1; a._.cachedChecks = {}; return !0 } function k(a, b) {
                    if (!a) return !1; if (!0 === a) return a; if ("string" == typeof a) return a = L(a), "*" == a ? !0 : CKEDITOR.tools.convertArrayToObject(a.split(b)); if (CKEDITOR.tools.isArray(a)) return a.length ?
                        CKEDITOR.tools.convertArrayToObject(a) : !1; var c = {}, e = 0, g; for (g in a) c[g] = a[g], e++; return e ? c : !1
                } function l(a, b) { if (a.nothingRequired) return !0; var c, e, d, f; if (d = a.requiredClasses) for (f = b.classes, c = 0; c < d.length; ++c)if (e = d[c], "string" == typeof e) { if (-1 == CKEDITOR.tools.indexOf(f, e)) return !1 } else if (!CKEDITOR.tools.checkIfAnyArrayItemMatches(f, e)) return !1; return g(b.styles, a.requiredStyles) && g(b.attributes, a.requiredAttributes) } function g(a, b) {
                    if (!b) return !0; for (var c = 0, e; c < b.length; ++c)if (e = b[c], "string" ==
                        typeof e) { if (!(e in a)) return !1 } else if (!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(a, e)) return !1; return !0
                } function e(a) { if (!a) return {}; a = a.split(/\s*,\s*/).sort(); for (var b = {}; a.length;)b[a.shift()] = "cke-test"; return b } function c(a) { var b, c, e, g, d = {}, f = 1; for (a = L(a); b = a.match(E);)(c = b[2]) ? (e = n(c, "styles"), g = n(c, "attrs"), c = n(c, "classes")) : e = g = c = null, d["$" + f++] = { elements: b[1], classes: c, styles: e, attributes: g }, a = a.slice(b[0].length); return d } function n(a, b) { var c = a.match(P[b]); return c ? L(c[1]) : null }
                function r(a) { var b = a.styleBackup = a.attributes.style, c = a.classBackup = a.attributes["class"]; a.styles || (a.styles = CKEDITOR.tools.parseCssText(b || "", 1)); a.classes || (a.classes = c ? c.split(/\s+/) : []) } function x(a, c, e, g) {
                    var d = 0, f; g.toHtml && (c.name = c.name.replace(M, "$1")); if (g.doCallbacks && a.elementCallbacks) { a: { f = a.elementCallbacks; for (var k = 0, m = f.length, l; k < m; ++k)if (l = f[k](c)) { f = l; break a } f = void 0 } if (f) return f } if (g.doTransform && (f = a._.transformations[c.name])) { r(c); for (k = 0; k < f.length; ++k)y(a, c, f[k]); p(c) } if (g.doFilter) {
                        a: {
                            k =
                                c.name; m = a._; a = m.allowedRules.elements[k]; f = m.allowedRules.generic; k = m.disallowedRules.elements[k]; m = m.disallowedRules.generic; l = g.skipRequired; var n = { valid: !1, validAttributes: {}, validClasses: {}, validStyles: {}, allAttributes: !1, allClasses: !1, allStyles: !1, hadInvalidAttribute: !1, hadInvalidClass: !1, hadInvalidStyle: !1 }, q, A; if (a || f) {
                                    r(c); if (k) for (q = 0, A = k.length; q < A; ++q)if (!1 === b(k[q], c, n)) { a = null; break a } if (m) for (q = 0, A = m.length; q < A; ++q)b(m[q], c, n); if (a) for (q = 0, A = a.length; q < A; ++q)h(a[q], c, n, l); if (f) for (q =
                                        0, A = f.length; q < A; ++q)h(f[q], c, n, l); a = n
                                } else a = null
                        } if (!a || !a.valid) return e.push(c), 1; A = a.validAttributes; var v = a.validStyles; f = a.validClasses; var k = c.attributes, H = c.styles, m = c.classes; l = c.classBackup; var F = c.styleBackup, J, L, G = [], n = [], x = /^data-cke-/; q = !1; delete k.style; delete k["class"]; delete c.classBackup; delete c.styleBackup; if (!a.allAttributes) for (J in k) A[J] || (x.test(J) ? J == (L = J.replace(/^data-cke-saved-/, "")) || A[L] || (delete k[J], q = !0) : (delete k[J], q = !0)); if (!a.allStyles || a.hadInvalidStyle) {
                            for (J in H) a.allStyles ||
                                v[J] ? G.push(J + ":" + H[J]) : q = !0; G.length && (k.style = G.sort().join("; "))
                        } else F && (k.style = F); if (!a.allClasses || a.hadInvalidClass) { for (J = 0; J < m.length; ++J)(a.allClasses || f[m[J]]) && n.push(m[J]); n.length && (k["class"] = n.sort().join(" ")); l && n.length < l.split(/\s+/).length && (q = !0) } else l && (k["class"] = l); q && (d = 1); if (!g.skipFinalValidation && !t(c)) return e.push(c), 1
                    } g.toHtml && (c.name = c.name.replace(O, "cke:$1")); return d
                } function u(a) {
                    var b = [], c; for (c in a) -1 < c.indexOf("*") && b.push(c.replace(/\*/g, ".*")); return b.length ?
                        new RegExp("^(?:" + b.join("|") + ")$") : null
                } function p(a) { var b = a.attributes, c; delete b.style; delete b["class"]; if (c = CKEDITOR.tools.writeCssText(a.styles, !0)) b.style = c; a.classes.length && (b["class"] = a.classes.sort().join(" ")) } function t(a) { switch (a.name) { case "a": if (!(a.children.length || a.attributes.name || a.attributes.id)) return !1; break; case "img": if (!a.attributes.src) return !1 }return !0 } function A(a) { if (!a) return !1; if (!0 === a) return !0; var b = u(a); return function (c) { return c in a || b && c.match(b) } } function q() { return new CKEDITOR.htmlParser.element("br") }
                function B(a) { return a.type == CKEDITOR.NODE_ELEMENT && ("br" == a.name || G.$block[a.name]) } function z(a, b, c) {
                    var e = a.name; if (G.$empty[e] || !a.children.length) "hr" == e && "br" == b ? a.replaceWith(q()) : (a.parent && c.push({ check: "it", el: a.parent }), a.remove()); else if (G.$block[e] || "tr" == e) if ("br" == b) a.previous && !B(a.previous) && (b = q(), b.insertBefore(a)), a.next && !B(a.next) && (b = q(), b.insertAfter(a)), a.replaceWithChildren(); else {
                        var e = a.children, g; b: {
                            g = G[b]; for (var d = 0, f = e.length, k; d < f; ++d)if (k = e[d], k.type == CKEDITOR.NODE_ELEMENT &&
                                !g[k.name]) { g = !1; break b } g = !0
                        } if (g) a.name = b, a.attributes = {}, c.push({ check: "parent-down", el: a }); else {
                            g = a.parent; for (var d = g.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || "body" == g.name, h, m, f = e.length; 0 < f;)k = e[--f], d && (k.type == CKEDITOR.NODE_TEXT || k.type == CKEDITOR.NODE_ELEMENT && G.$inline[k.name]) ? (h || (h = new CKEDITOR.htmlParser.element(b), h.insertAfter(a), c.push({ check: "parent-down", el: h })), h.add(k, 0)) : (h = null, m = G[g.name] || G.span, k.insertAfter(a), g.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || k.type != CKEDITOR.NODE_ELEMENT ||
                                m[k.name] || c.push({ check: "el-up", el: k })); a.remove()
                        }
                    } else e in { style: 1, script: 1 } ? a.remove() : (a.parent && c.push({ check: "it", el: a.parent }), a.replaceWithChildren())
                } function y(a, b, c) { var e, g; for (e = 0; e < c.length; ++e)if (g = c[e], !(g.check && !a.check(g.check, !1) || g.left && !g.left(b))) { g.right(b, N); break } } function v(a, b) {
                    var c = b.getDefinition(), e = c.attributes, g = c.styles, d, f, k, h; if (a.name != c.element) return !1; for (d in e) if ("class" == d) for (c = e[d].split(/\s+/), k = a.classes.join("|"); h = c.pop();) { if (-1 == k.indexOf(h)) return !1 } else if (a.attributes[d] !=
                        e[d]) return !1; for (f in g) if (a.styles[f] != g[f]) return !1; return !0
                } function C(a, b) { var c, e; "string" == typeof a ? c = a : a instanceof CKEDITOR.style ? e = a : (c = a[0], e = a[1]); return [{ element: c, left: e, right: function (a, c) { c.transform(a, b) } }] } function F(a) { return function (b) { return v(b, a) } } function D(a) { return function (b, c) { c[a](b) } } var G = CKEDITOR.dtd, H = CKEDITOR.tools.copy, L = CKEDITOR.tools.trim, K = ["", "p", "br", "div"]; CKEDITOR.FILTER_SKIP_TREE = 2; CKEDITOR.filter = function (a, b) {
                    this.allowedContent = []; this.disallowedContent =
                        []; this.elementCallbacks = null; this.disabled = !1; this.editor = null; this.id = CKEDITOR.tools.getNextNumber(); this._ = { allowedRules: { elements: {}, generic: [] }, disallowedRules: { elements: {}, generic: [] }, transformations: {}, cachedTests: {}, cachedChecks: {} }; CKEDITOR.filter.instances[this.id] = this; var c = this.editor = a instanceof CKEDITOR.editor ? a : null; if (c && !b) {
                            this.customConfig = !0; var e = c.config.allowedContent; !0 === e ? this.disabled = !0 : (e || (this.customConfig = !1), this.allow(e, "config", 1), this.allow(c.config.extraAllowedContent,
                                "extra", 1), this.allow(K[c.enterMode] + " " + K[c.shiftEnterMode], "default", 1), this.disallow(c.config.disallowedContent))
                        } else this.customConfig = !1, this.allow(b || a, "default", 1)
                }; CKEDITOR.filter.instances = {}; CKEDITOR.filter.prototype = {
                    allow: function (b, e, g) {
                        if (!m(this, b, g)) return !1; var d, f; if ("string" == typeof b) b = c(b); else if (b instanceof CKEDITOR.style) {
                            if (b.toAllowedContentRules) return this.allow(b.toAllowedContentRules(this.editor), e, g); d = b.getDefinition(); b = {}; g = d.attributes; b[d.element] = d = {
                                styles: d.styles,
                                requiredStyles: d.styles && CKEDITOR.tools.object.keys(d.styles)
                            }; g && (g = H(g), d.classes = g["class"] ? g["class"].split(/\s+/) : null, d.requiredClasses = d.classes, delete g["class"], d.attributes = g, d.requiredAttributes = g && CKEDITOR.tools.object.keys(g))
                        } else if (CKEDITOR.tools.isArray(b)) { for (d = 0; d < b.length; ++d)f = this.allow(b[d], e, g); return f } a(this, b, e, this.allowedContent, this._.allowedRules); return !0
                    }, applyTo: function (a, b, c, e) {
                        if (this.disabled) return !1; var g = this, d = [], f = this.editor && this.editor.config.protectedSource,
                            k, h = !1, m = { doFilter: !c, doTransform: !0, doCallbacks: !0, toHtml: b }; a.forEach(function (a) {
                                if (a.type == CKEDITOR.NODE_ELEMENT) { if ("off" == a.attributes["data-cke-filter"]) return !1; if (!b || "span" != a.name || !~CKEDITOR.tools.object.keys(a.attributes).join("|").indexOf("data-cke-")) if (k = x(g, a, d, m), k & 1) h = !0; else if (k & 2) return !1 } else if (a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) {
                                    var c; a: {
                                        var e = decodeURIComponent(a.value.replace(/^\{cke_protected\}/, "")); c = []; var l, n, t; if (f) for (n = 0; n <
                                            f.length; ++n)if ((t = e.match(f[n])) && t[0].length == e.length) { c = !0; break a } e = CKEDITOR.htmlParser.fragment.fromHtml(e); 1 == e.children.length && (l = e.children[0]).type == CKEDITOR.NODE_ELEMENT && x(g, l, c, m); c = !c.length
                                    } c || d.push(a)
                                }
                            }, null, !0); d.length && (h = !0); var l; a = []; e = K[e || (this.editor ? this.editor.enterMode : CKEDITOR.ENTER_P)]; for (var n; c = d.pop();)c.type == CKEDITOR.NODE_ELEMENT ? z(c, e, a) : c.remove(); for (; l = a.pop();)if (c = l.el, c.parent) switch (n = G[c.parent.name] || G.span, l.check) {
                                case "it": G.$removeEmpty[c.name] &&
                                    !c.children.length ? z(c, e, a) : t(c) || z(c, e, a); break; case "el-up": c.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || n[c.name] || z(c, e, a); break; case "parent-down": c.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || n[c.name] || z(c.parent, e, a)
                            }return h
                    }, checkFeature: function (a) { if (this.disabled || !a) return !0; a.toFeature && (a = a.toFeature(this.editor)); return !a.requiredContent || this.check(a.requiredContent) }, disable: function () { this.disabled = !0 }, disallow: function (b) {
                        if (!m(this, b, !0)) return !1; "string" == typeof b && (b =
                            c(b)); a(this, b, null, this.disallowedContent, this._.disallowedRules); return !0
                    }, addContentForms: function (a) { if (!this.disabled && a) { var b, c, e = [], g; for (b = 0; b < a.length && !g; ++b)c = a[b], ("string" == typeof c || c instanceof CKEDITOR.style) && this.check(c) && (g = c); if (g) { for (b = 0; b < a.length; ++b)e.push(C(a[b], g)); this.addTransformations(e) } } }, addElementCallback: function (a) { this.elementCallbacks || (this.elementCallbacks = []); this.elementCallbacks.push(a) }, addFeature: function (a) {
                        if (this.disabled || !a) return !0; a.toFeature &&
                            (a = a.toFeature(this.editor)); this.allow(a.allowedContent, a.name); this.addTransformations(a.contentTransformations); this.addContentForms(a.contentForms); return a.requiredContent && (this.customConfig || this.disallowedContent.length) ? this.check(a.requiredContent) : !0
                    }, addTransformations: function (a) {
                        var b, c; if (!this.disabled && a) {
                            var e = this._.transformations, g; for (g = 0; g < a.length; ++g) {
                                b = a[g]; var d = void 0, f = void 0, k = void 0, h = void 0, m = void 0, l = void 0; c = []; for (f = 0; f < b.length; ++f)k = b[f], "string" == typeof k ? (k =
                                    k.split(/\s*:\s*/), h = k[0], m = null, l = k[1]) : (h = k.check, m = k.left, l = k.right), d || (d = k, d = d.element ? d.element : h ? h.match(/^([a-z0-9]+)/i)[0] : d.left.getDefinition().element), m instanceof CKEDITOR.style && (m = F(m)), c.push({ check: h == d ? null : h, left: m, right: "string" == typeof l ? D(l) : l }); b = d; e[b] || (e[b] = []); e[b].push(c)
                            }
                        }
                    }, check: function (a, b, g) {
                        if (this.disabled) return !0; if (CKEDITOR.tools.isArray(a)) { for (var d = a.length; d--;)if (this.check(a[d], b, g)) return !0; return !1 } var f, k; if ("string" == typeof a) {
                            k = a + "\x3c" + (!1 === b ? "0" :
                                "1") + (g ? "1" : "0") + "\x3e"; if (k in this._.cachedChecks) return this._.cachedChecks[k]; f = c(a).$1; var h = f.styles, d = f.classes; f.name = f.elements; f.classes = d = d ? d.split(/\s*,\s*/) : []; f.styles = e(h); f.attributes = e(f.attributes); f.children = []; d.length && (f.attributes["class"] = d.join(" ")); h && (f.attributes.style = CKEDITOR.tools.writeCssText(f.styles))
                        } else f = a.getDefinition(), h = f.styles, d = f.attributes || {}, h && !CKEDITOR.tools.isEmpty(h) ? (h = H(h), d.style = CKEDITOR.tools.writeCssText(h, !0)) : h = {}, f = {
                            name: f.element, attributes: d,
                            classes: d["class"] ? d["class"].split(/\s+/) : [], styles: h, children: []
                        }; var h = CKEDITOR.tools.clone(f), m = [], l; if (!1 !== b && (l = this._.transformations[f.name])) { for (d = 0; d < l.length; ++d)y(this, f, l[d]); p(f) } x(this, h, m, { doFilter: !0, doTransform: !1 !== b, skipRequired: !g, skipFinalValidation: !g }); 0 < m.length ? g = !1 : ((b = f.attributes["class"]) && (f.attributes["class"] = f.attributes["class"].split(" ").sort().join(" ")), g = CKEDITOR.tools.objectCompare(f.attributes, h.attributes, !0), b && (f.attributes["class"] = b)); "string" == typeof a &&
                            (this._.cachedChecks[k] = g); return g
                    }, getAllowedEnterMode: function () { var a = ["p", "div", "br"], b = { p: CKEDITOR.ENTER_P, div: CKEDITOR.ENTER_DIV, br: CKEDITOR.ENTER_BR }; return function (c, e) { var g = a.slice(), d; if (this.check(K[c])) return c; for (e || (g = g.reverse()); d = g.pop();)if (this.check(d)) return b[d]; return CKEDITOR.ENTER_BR } }(), clone: function () {
                        var a = new CKEDITOR.filter, b = CKEDITOR.tools.clone; a.allowedContent = b(this.allowedContent); a._.allowedRules = b(this._.allowedRules); a.disallowedContent = b(this.disallowedContent);
                        a._.disallowedRules = b(this._.disallowedRules); a._.transformations = b(this._.transformations); a.disabled = this.disabled; a.editor = this.editor; return a
                    }, destroy: function () { delete CKEDITOR.filter.instances[this.id]; delete this._; delete this.allowedContent; delete this.disallowedContent }
                }; var S = { styles: 1, attributes: 1, classes: 1 }, I = { styles: "requiredStyles", attributes: "requiredAttributes", classes: "requiredClasses" }, E = /^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,
                    P = { styles: /{([^}]+)}/, attrs: /\[([^\]]+)\]/, classes: /\(([^\)]+)\)/ }, M = /^cke:(object|embed|param)$/, O = /^(object|embed|param)$/, N; N = CKEDITOR.filter.transformationsTools = {
                        sizeToStyle: function (a) { this.lengthToStyle(a, "width"); this.lengthToStyle(a, "height") }, sizeToAttribute: function (a) { this.lengthToAttribute(a, "width"); this.lengthToAttribute(a, "height") }, lengthToStyle: function (a, b, c) { c = c || b; if (!(c in a.styles)) { var e = a.attributes[b]; e && (/^\d+$/.test(e) && (e += "px"), a.styles[c] = e) } delete a.attributes[b] },
                        lengthToAttribute: function (a, b, c) { c = c || b; if (!(c in a.attributes)) { var e = a.styles[b], g = e && e.match(/^(\d+)(?:\.\d*)?px$/); g ? a.attributes[c] = g[1] : "cke-test" == e && (a.attributes[c] = "cke-test") } delete a.styles[b] }, alignmentToStyle: function (a) { if (!("float" in a.styles)) { var b = a.attributes.align; if ("left" == b || "right" == b) a.styles["float"] = b } delete a.attributes.align }, alignmentToAttribute: function (a) { if (!("align" in a.attributes)) { var b = a.styles["float"]; if ("left" == b || "right" == b) a.attributes.align = b } delete a.styles["float"] },
                        splitBorderShorthand: function (a) { if (a.styles.border) { var b = CKEDITOR.tools.style.parse.border(a.styles.border); b.color && (a.styles["border-color"] = b.color); b.style && (a.styles["border-style"] = b.style); b.width && (a.styles["border-width"] = b.width); delete a.styles.border } }, listTypeToStyle: function (a) {
                            if (a.attributes.type) switch (a.attributes.type) {
                                case "a": a.styles["list-style-type"] = "lower-alpha"; break; case "A": a.styles["list-style-type"] = "upper-alpha"; break; case "i": a.styles["list-style-type"] = "lower-roman";
                                    break; case "I": a.styles["list-style-type"] = "upper-roman"; break; case "1": a.styles["list-style-type"] = "decimal"; break; default: a.styles["list-style-type"] = a.attributes.type
                            }
                        }, splitMarginShorthand: function (a) {
                            function b(e) { a.styles["margin-top"] = c[e[0]]; a.styles["margin-right"] = c[e[1]]; a.styles["margin-bottom"] = c[e[2]]; a.styles["margin-left"] = c[e[3]] } if (a.styles.margin) {
                                var c = a.styles.margin.match(/(auto|0|(?:\-?[\.\d]+(?:\w+|%)))/g) || ["0px"]; switch (c.length) {
                                    case 1: b([0, 0, 0, 0]); break; case 2: b([0, 1, 0,
                                        1]); break; case 3: b([0, 1, 2, 1]); break; case 4: b([0, 1, 2, 3])
                                }delete a.styles.margin
                            }
                        }, matchesStyle: v, transform: function (a, b) { if ("string" == typeof b) a.name = b; else { var c = b.getDefinition(), e = c.styles, g = c.attributes, d, f, k, h; a.name = c.element; for (d in g) if ("class" == d) for (c = a.classes.join("|"), k = g[d].split(/\s+/); h = k.pop();)-1 == c.indexOf(h) && a.classes.push(h); else a.attributes[d] = g[d]; for (f in e) a.styles[f] = e[f] } }
                    }
            })(); (function () {
                CKEDITOR.focusManager = function (a) {
                    if (a.focusManager) return a.focusManager; this.hasFocus =
                        !1; this.currentActive = null; this._ = { editor: a }; return this
                }; CKEDITOR.focusManager._ = { blurDelay: 200 }; CKEDITOR.focusManager.prototype = {
                    focus: function (a) { this._.timer && clearTimeout(this._.timer); a && (this.currentActive = a); this.hasFocus || this._.locked || ((a = CKEDITOR.currentInstance) && a.focusManager.blur(1), this.hasFocus = !0, (a = this._.editor.container) && a.addClass("cke_focus"), this._.editor.fire("focus")) }, lock: function () { this._.locked = 1 }, unlock: function () { delete this._.locked }, blur: function (a) {
                        function h() {
                            if (this.hasFocus) {
                                this.hasFocus =
                                    !1; var a = this._.editor.container; a && a.removeClass("cke_focus"); this._.editor.fire("blur")
                            }
                        } if (!this._.locked) { this._.timer && clearTimeout(this._.timer); var f = CKEDITOR.focusManager._.blurDelay; a || !f ? h.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function () { delete this._.timer; h.call(this) }, f, this) }
                    }, add: function (a, h) {
                        var f = a.getCustomData("focusmanager"); if (!f || f != this) {
                            f && f.remove(a); var f = "focus", b = "blur"; h && (CKEDITOR.env.ie ? (f = "focusin", b = "focusout") : CKEDITOR.event.useCapture = 1); var d = {
                                blur: function () {
                                    a.equals(this.currentActive) &&
                                        this.blur()
                                }, focus: function () { this.focus(a) }
                            }; a.on(f, d.focus, this); a.on(b, d.blur, this); h && (CKEDITOR.event.useCapture = 0); a.setCustomData("focusmanager", this); a.setCustomData("focusmanager_handlers", d)
                        }
                    }, remove: function (a) { a.removeCustomData("focusmanager"); var h = a.removeCustomData("focusmanager_handlers"); a.removeListener("blur", h.blur); a.removeListener("focus", h.focus) }
                }
            })(); CKEDITOR.keystrokeHandler = function (a) {
                if (a.keystrokeHandler) return a.keystrokeHandler; this.keystrokes = {}; this.blockedKeystrokes =
                    {}; this._ = { editor: a }; return this
            }; (function () { var a, h = function (b) { b = b.data; var d = b.getKeystroke(), f = this.keystrokes[d], k = this._.editor; a = !1 === k.fire("key", { keyCode: d, domEvent: b }); a || (f && (a = !1 !== k.execCommand(f, { from: "keystrokeHandler" })), a || (a = !!this.blockedKeystrokes[d])); a && b.preventDefault(!0); return !a }, f = function (b) { a && (a = !1, b.data.preventDefault(!0)) }; CKEDITOR.keystrokeHandler.prototype = { attach: function (a) { a.on("keydown", h, this); if (CKEDITOR.env.gecko && CKEDITOR.env.mac) a.on("keypress", f, this) } } })();
        (function () {
            CKEDITOR.lang = {
                languages: { af: 1, ar: 1, az: 1, bg: 1, bn: 1, bs: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, "en-au": 1, "en-ca": 1, "en-gb": 1, en: 1, eo: 1, es: 1, "es-mx": 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, "fr-ca": 1, fr: 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, is: 1, it: 1, ja: 1, ka: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, ms: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, "pt-br": 1, pt: 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, "sr-latn": 1, sr: 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, "zh-cn": 1, zh: 1 }, rtl: { ar: 1, fa: 1, he: 1, ku: 1, ug: 1 }, load: function (a, h, f) {
                    a && CKEDITOR.lang.languages[a] ||
                        (a = this.detect(h, a)); var b = this; h = function () { b[a].dir = b.rtl[a] ? "rtl" : "ltr"; f(a, b[a]) }; this[a] ? h() : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + a + ".js"), h, this)
                }, detect: function (a, h) { var f = this.languages; h = h || navigator.userLanguage || navigator.language || a; var b = h.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/), d = b[1], b = b[2]; f[d + "-" + b] ? d = d + "-" + b : f[d] || (d = null); CKEDITOR.lang.detect = d ? function () { return d } : function (a) { return a }; return d || a }
            }
        })(); CKEDITOR.scriptLoader = function () {
            var a = {}, h = {}; return {
                load: function (f,
                    b, d, m) {
                    var k = "string" == typeof f; k && (f = [f]); d || (d = CKEDITOR); var l = f.length, g = l, e = [], c = [], n = function (a) { b && (k ? b.call(d, a) : b.call(d, e, c)) }; if (0 === g) n(!0); else {
                        var r = function (a, b) { (b ? e : c).push(a); 0 >= --g && (m && CKEDITOR.document.getDocumentElement().removeStyle("cursor"), n(b)) }, x = function (b, c) { a[b] = 1; var e = h[b]; delete h[b]; for (var g = 0; g < e.length; g++)e[g](b, c) }, u = function (c) {
                            if (a[c]) r(c, !0); else {
                                var e = h[c] || (h[c] = []); e.push(r); if (!(1 < e.length)) {
                                    var g = new CKEDITOR.dom.element("script"); g.setAttributes({
                                        type: "text/javascript",
                                        src: c
                                    }); b && (CKEDITOR.env.ie && (8 >= CKEDITOR.env.version || CKEDITOR.env.ie9Compat) ? g.$.onreadystatechange = function () { if ("loaded" == g.$.readyState || "complete" == g.$.readyState) g.$.onreadystatechange = null, x(c, !0) } : (g.$.onload = function () { setTimeout(function () { g.$.onload = null; g.$.onerror = null; x(c, !0) }, 0) }, g.$.onerror = function () { g.$.onload = null; g.$.onerror = null; x(c, !1) })); g.appendTo(CKEDITOR.document.getHead())
                                }
                            }
                        }; m && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait"); for (var p = 0; p < l; p++)u(f[p])
                    }
                },
                queue: function () { function a() { var d; (d = b[0]) && this.load(d.scriptUrl, d.callback, CKEDITOR, 0) } var b = []; return function (d, h) { var k = this; b.push({ scriptUrl: d, callback: function () { h && h.apply(this, arguments); b.shift(); a.call(k) } }); 1 == b.length && a.call(this) } }()
            }
        }(); CKEDITOR.resourceManager = function (a, h) { this.basePath = a; this.fileName = h; this.registered = {}; this.loaded = {}; this.externals = {}; this._ = { waitingList: {} } }; CKEDITOR.resourceManager.prototype = {
            add: function (a, h) {
                if (this.registered[a]) throw Error('[CKEDITOR.resourceManager.add] The resource name "' +
                    a + '" is already registered.'); var f = this.registered[a] = h || {}; f.name = a; f.path = this.getPath(a); CKEDITOR.fire(a + CKEDITOR.tools.capitalize(this.fileName) + "Ready", f); return this.get(a)
            }, get: function (a) { return this.registered[a] || null }, getPath: function (a) { var h = this.externals[a]; return CKEDITOR.getUrl(h && h.dir || this.basePath + a + "/") }, getFilePath: function (a) { var h = this.externals[a]; return CKEDITOR.getUrl(this.getPath(a) + (h ? h.file : this.fileName + ".js")) }, addExternal: function (a, h, f) {
                f || (h = h.replace(/[^\/]+$/,
                    function (a) { f = a; return "" })); f = f || this.fileName + ".js"; a = a.split(","); for (var b = 0; b < a.length; b++)this.externals[a[b]] = { dir: h, file: f }
            }, load: function (a, h, f) {
                CKEDITOR.tools.isArray(a) || (a = a ? [a] : []); for (var b = this.loaded, d = this.registered, m = [], k = {}, l = {}, g = 0; g < a.length; g++) { var e = a[g]; if (e) if (b[e] || d[e]) l[e] = this.get(e); else { var c = this.getFilePath(e); m.push(c); c in k || (k[c] = []); k[c].push(e) } } CKEDITOR.scriptLoader.load(m, function (a, c) {
                    if (c.length) throw Error('[CKEDITOR.resourceManager.load] Resource name "' +
                        k[c[0]].join(",") + '" was not found at "' + c[0] + '".'); for (var e = 0; e < a.length; e++)for (var g = k[a[e]], d = 0; d < g.length; d++) { var m = g[d]; l[m] = this.get(m); b[m] = 1 } h.call(f, l)
                }, this)
            }
        }; CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin"); CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function (a) {
            var h = {}; return function (f, b, d) {
                var m = {}, k = function (f) {
                    a.call(this, f, function (a) {
                        CKEDITOR.tools.extend(m, a); var e = [], c; for (c in a) {
                            var f = a[c], l = f && f.requires; if (!h[c]) {
                                if (f.icons) for (var x =
                                    f.icons.split(","), u = x.length; u--;)CKEDITOR.skin.addIcon(x[u], f.path + "icons/" + (CKEDITOR.env.hidpi && f.hidpi ? "hidpi/" : "") + x[u] + ".png"); f.isSupportedEnvironment = f.isSupportedEnvironment || function () { return !0 }; h[c] = 1
                            } if (l) for (l.split && (l = l.split(",")), f = 0; f < l.length; f++)m[l[f]] || e.push(l[f])
                        } if (e.length) k.call(this, e); else { for (c in m) f = m[c], f.onLoad && !f.onLoad._called && (!1 === f.onLoad() && delete m[c], f.onLoad._called = 1); b && b.call(d || window, m) }
                    }, this)
                }; k.call(this, f)
            }
        }); CKEDITOR.plugins.setLang = function (a,
            h, f) { var b = this.get(a); a = b.langEntries || (b.langEntries = {}); b = b.lang || (b.lang = []); b.split && (b = b.split(",")); -1 == CKEDITOR.tools.indexOf(b, h) && b.push(h); a[h] = f }; CKEDITOR.ui = function (a) { if (a.ui) return a.ui; this.items = {}; this.instances = {}; this.editor = a; this._ = { handlers: {} }; return this }; CKEDITOR.ui.prototype = {
                add: function (a, h, f) { f.name = a.toLowerCase(); var b = this.items[a] = { type: h, command: f.command || null, args: Array.prototype.slice.call(arguments, 2) }; CKEDITOR.tools.extend(b, f) }, get: function (a) { return this.instances[a] },
                create: function (a) { var h = this.items[a], f = h && this._.handlers[h.type], b = h && h.command && this.editor.getCommand(h.command), f = f && f.create.apply(this, h.args); this.instances[a] = f; b && b.uiItems.push(f); f && !f.type && (f.type = h.type); return f }, addHandler: function (a, h) { this._.handlers[a] = h }, space: function (a) { return CKEDITOR.document.getById(this.spaceId(a)) }, spaceId: function (a) { return this.editor.id + "_" + a }
            }; CKEDITOR.event.implementOn(CKEDITOR.ui); (function () {
                function a(a, c, e) {
                    CKEDITOR.event.call(this); a = a && CKEDITOR.tools.clone(a);
                    if (void 0 !== c) {
                        if (!(c instanceof CKEDITOR.dom.element)) throw Error("Expect element of type CKEDITOR.dom.element."); if (!e) throw Error("One of the element modes must be specified."); if (CKEDITOR.env.ie && CKEDITOR.env.quirks && e == CKEDITOR.ELEMENT_MODE_INLINE) throw Error("Inline element mode is not supported on IE quirks."); if (!f(c, e)) throw Error('The specified element mode is not supported on element: "' + c.getName() + '".'); this.element = c; this.elementMode = e; this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO &&
                            (c.getId() || c.getNameAtt())
                    } else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE; this._ = {}; this.commands = {}; this.templates = {}; this.name = this.name || h(); this.id = CKEDITOR.tools.getNextId(); this.status = "unloaded"; this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config); this.ui = new CKEDITOR.ui(this); this.focusManager = new CKEDITOR.focusManager(this); this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this); this.on("readOnly", b); this.on("selectionChange", function (a) { m(this, a.data.path) }); this.on("activeFilterChange",
                        function () { m(this, this.elementPath(), !0) }); this.on("mode", b); CKEDITOR.dom.selection.setupEditorOptimization(this); this.on("instanceReady", function () { if (this.config.startupFocus) { if ("end" === this.config.startupFocus) { var a = this.createRange(); a.selectNodeContents(this.editable()); a.shrink(CKEDITOR.SHRINK_ELEMENT, !0); a.collapse(); this.getSelection().selectRanges([a]) } this.focus() } }); CKEDITOR.fire("instanceCreated", null, this); CKEDITOR.add(this); CKEDITOR.tools.setTimeout(function () {
                            this.isDestroyed() ||
                                this.isDetached() || l(this, a)
                        }, 0, this)
                } function h() { do var a = "editor" + ++u; while (CKEDITOR.instances[a]); return a } function f(a, b) { return b == CKEDITOR.ELEMENT_MODE_INLINE ? a.is(CKEDITOR.dtd.$editable) || a.is("textarea") : b == CKEDITOR.ELEMENT_MODE_REPLACE ? !a.is(CKEDITOR.dtd.$nonBodyContent) : 1 } function b() { var a = this.commands, b; for (b in a) d(this, a[b]) } function d(a, b) { b[b.startDisabled ? "disable" : a.readOnly && !b.readOnly ? "disable" : b.modes[a.mode] ? "enable" : "disable"]() } function m(a, b, c) {
                    if (b) {
                        var e, g, d = a.commands;
                        for (g in d) e = d[g], (c || e.contextSensitive) && e.refresh(a, b)
                    }
                } function k(a) { var b = a.config.customConfig; if (!b) return !1; var b = CKEDITOR.getUrl(b), c = p[b] || (p[b] = {}); c.fn ? (c.fn.call(a, a.config), CKEDITOR.getUrl(a.config.customConfig) != b && k(a) || a.fireOnce("customConfigLoaded")) : CKEDITOR.scriptLoader.queue(b, function () { c.fn = c.fn || CKEDITOR.editorConfig || function () { }; k(a) }); return !0 } function l(a, b) {
                    a.on("customConfigLoaded", function () {
                        if (b) {
                            if (b.on) for (var c in b.on) a.on(c, b.on[c]); CKEDITOR.tools.extend(a.config,
                                b, !0); delete a.config.on
                        } c = a.config; a.readOnly = c.readOnly ? !0 : a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.is("textarea") ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : a.element.isReadOnly() : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : !1; a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? !(a.element.is("textarea") || CKEDITOR.dtd[a.element.getName()].p) : !1; a.tabIndex = c.tabIndex || a.element &&
                            a.element.getAttribute("tabindex") || 0; a.activeEnterMode = a.enterMode = a.blockless ? CKEDITOR.ENTER_BR : c.enterMode; a.activeShiftEnterMode = a.shiftEnterMode = a.blockless ? CKEDITOR.ENTER_BR : c.shiftEnterMode; c.skin && (CKEDITOR.skinName = c.skin); a.fireOnce("configLoaded"); a.dataProcessor = new CKEDITOR.htmlDataProcessor(a); a.filter = a.activeFilter = new CKEDITOR.filter(a); g(a)
                    }); b && null != b.customConfig && (a.config.customConfig = b.customConfig); k(a) || a.fireOnce("customConfigLoaded")
                } function g(a) {
                    CKEDITOR.skin.loadPart("editor",
                        function () { e(a) })
                } function e(a) {
                    CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function (b, e) {
                        var g = a.config.title, d = a.config.applicationTitle; a.langCode = b; a.lang = CKEDITOR.tools.prototypedCopy(e); a.title = "string" == typeof g || !1 === g ? g : [a.lang.editor, a.name].join(", "); a.applicationTitle = "string" == typeof d || !1 === d ? d : [a.lang.application, a.name].join(", "); a.config.contentsLangDirection || (a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) :
                            a.lang.dir); a.fire("langLoaded"); c(a)
                    })
                } function c(a) { a.getStylesSet(function (b) { a.once("loaded", function () { a.fire("stylesSet", { styles: b }) }, null, null, 1); n(a) }) } function n(a) {
                    function b(a) { if (!a) return ""; CKEDITOR.tools.isArray(a) && (a = a.join(",")); return a.replace(/\s/g, "") } var c = a.config, e = b(c.plugins), g = b(c.extraPlugins), d = b(c.removePlugins); if (g) var f = new RegExp("(?:^|,)(?:" + g.replace(/,/g, "|") + ")(?\x3d,|$)", "g"), e = e.replace(f, ""), e = e + ("," + g); if (d) var k = new RegExp("(?:^|,)(?:" + d.replace(/,/g, "|") +
                        ")(?\x3d,|$)", "g"), e = e.replace(k, ""); CKEDITOR.env.air && (e += ",adobeair"); CKEDITOR.plugins.load(e.split(","), function (b) {
                            var e = [], g = [], d = []; a.plugins = CKEDITOR.tools.extend({}, a.plugins, b); for (var f in b) {
                                var h = b[f], m = h.lang, l = null, n = h.requires, r; CKEDITOR.tools.isArray(n) && (n = n.join(",")); if (n && (r = n.match(k))) for (; n = r.pop();)CKEDITOR.error("editor-plugin-required", { plugin: n.replace(",", ""), requiredBy: f }); m && !a.lang[f] && (m.split && (m = m.split(",")), 0 <= CKEDITOR.tools.indexOf(m, a.langCode) ? l = a.langCode : (l =
                                    a.langCode.replace(/-.*/, ""), l = l != a.langCode && 0 <= CKEDITOR.tools.indexOf(m, l) ? l : 0 <= CKEDITOR.tools.indexOf(m, "en") ? "en" : m[0]), h.langEntries && h.langEntries[l] ? (a.lang[f] = h.langEntries[l], l = null) : d.push(CKEDITOR.getUrl(h.path + "lang/" + l + ".js"))); g.push(l); e.push(h)
                            } CKEDITOR.scriptLoader.load(d, function () {
                                if (!a.isDestroyed() && !a.isDetached()) {
                                    for (var b = ["beforeInit", "init", "afterInit"], d = 0; d < b.length; d++)for (var f = 0; f < e.length; f++) {
                                        var k = e[f]; 0 === d && g[f] && k.lang && k.langEntries && (a.lang[k.name] = k.langEntries[g[f]]);
                                        if (k[b[d]]) k[b[d]](a)
                                    } a.fireOnce("pluginsLoaded"); c.keystrokes && a.setKeystroke(a.config.keystrokes); for (f = 0; f < a.config.blockedKeystrokes.length; f++)a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[f]] = 1; a.status = "loaded"; a.fireOnce("loaded"); CKEDITOR.fire("instanceLoaded", null, a)
                                }
                            })
                        })
                } function r() {
                    var a = this.element; if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) {
                        var b = this.getData(); this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b)); a.is("textarea") ? a.setValue(b) :
                            a.setHtml(b); return !0
                    } return !1
                } function x(a, b) {
                    function c(a) { var b = a.startContainer, e = a.endContainer, g = b.is && b.is("tr"), d = b.is && b.is("td"); a = d && b.equals(e) && a.endOffset === b.getChildCount(); b = d && 1 === b.getChildCount() && "img" === b.getChildren().getItem(0).getName(); return g || a && !b ? !0 : !1 } function e(a) { var b = a.startContainer; return b.is("tr") ? a.cloneContents() : b.clone(!0) } for (var g = new CKEDITOR.dom.documentFragment, d, f, k, h = 0; h < a.length; h++) {
                        var m = a[h], l = m.startContainer.getAscendant("tr", !0); c(m) ? (d || (d =
                            l.getAscendant("table").clone(), d.append(l.getAscendant({ thead: 1, tbody: 1, tfoot: 1 }).clone()), g.append(d), d = d.findOne("thead, tbody, tfoot")), f && f.equals(l) || (f = l, k = l.clone(), d.append(k)), k.append(e(m))) : g.append(m.cloneContents())
                    } return d ? g : b.getHtmlFromRange(a[0])
                } a.prototype = CKEDITOR.editor.prototype; CKEDITOR.editor = a; var u = 0, p = {}; CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                    plugins: {
                        detectConflict: function (a, b) {
                            for (var c = 0; c < b.length; c++) {
                                var e = b[c]; if (this[e]) return CKEDITOR.warn("editor-plugin-conflict",
                                    { plugin: a, replacedWith: e }), !0
                            } return !1
                        }
                    }, addCommand: function (a, b) { b.name = a.toLowerCase(); var c = b instanceof CKEDITOR.command ? b : new CKEDITOR.command(this, b); this.mode && d(this, c); return this.commands[a] = c }, _attachToForm: function () {
                        function a(b) { c.updateElement(); c._.required && !e.getValue() && !1 === c.fire("required") && b.data.preventDefault() } function b(a) { return !!(a && a.call && a.apply) } var c = this, e = c.element, g = new CKEDITOR.dom.element(e.$.form); e.is("textarea") && g && (g.on("submit", a), b(g.$.submit) && (g.$.submit =
                            CKEDITOR.tools.override(g.$.submit, function (b) { return function () { a(); b.apply ? b.apply(this) : b() } })), c.on("destroy", function () { g.removeListener("submit", a) }))
                    }, destroy: function (a) {
                        var b = CKEDITOR.filter.instances, c = this; this.fire("beforeDestroy"); !a && r.call(this); this.editable(null); this.filter && delete this.filter; CKEDITOR.tools.array.forEach(CKEDITOR.tools.object.keys(b), function (a) { a = b[a]; c === a.editor && a.destroy() }); delete this.activeFilter; this.status = "destroyed"; this.fire("destroy"); this.removeAllListeners();
                        CKEDITOR.remove(this); CKEDITOR.fire("instanceDestroyed", null, this)
                    }, elementPath: function (a) { if (!a) { a = this.getSelection(); if (!a) return null; a = a.getStartElement() } return a ? new CKEDITOR.dom.elementPath(a, this.editable()) : null }, createRange: function () { var a = this.editable(); return a ? new CKEDITOR.dom.range(a) : null }, execCommand: function (a, b) {
                        var c = this.getCommand(a), e = { name: a, commandData: b || {}, command: c }; return c && c.state != CKEDITOR.TRISTATE_DISABLED && !1 !== this.fire("beforeCommandExec", e) && (e.returnValue =
                            c.exec(e.commandData), !c.async && !1 !== this.fire("afterCommandExec", e)) ? e.returnValue : !1
                    }, getCommand: function (a) { return this.commands[a] }, getData: function (a) { !a && this.fire("beforeGetData"); var b = this._.data; "string" != typeof b && (b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() : b.getHtml() : ""); b = { dataValue: b }; !a && this.fire("getData", b); return b.dataValue }, getSnapshot: function () {
                        var a = this.fire("getSnapshot"); "string" != typeof a && (a = (a = this.element) && this.elementMode ==
                            CKEDITOR.ELEMENT_MODE_REPLACE ? a.is("textarea") ? a.getValue() : a.getHtml() : ""); return a
                    }, loadSnapshot: function (a) { this.fire("loadSnapshot", a) }, setData: function (a, b, c) { var e = !0, g = b; b && "object" == typeof b && (c = b.internal, g = b.callback, e = !b.noSnapshot); !c && e && this.fire("saveSnapshot"); if (g || !c) this.once("dataReady", function (a) { !c && e && this.fire("saveSnapshot"); g && g.call(a.editor) }); a = { dataValue: a }; !c && this.fire("setData", a); this._.data = a.dataValue; !c && this.fire("afterSetData", a) }, setReadOnly: function (a) {
                        a =
                            null == a || a; this.readOnly != a && (this.readOnly = a, this.keystrokeHandler.blockedKeystrokes[8] = +a, this.editable().setReadOnly(a), this.fire("readOnly"))
                    }, insertHtml: function (a, b, c) { this.fire("insertHtml", { dataValue: a, mode: b, range: c }) }, insertText: function (a) { this.fire("insertText", a) }, insertElement: function (a) { this.fire("insertElement", a) }, getSelectedHtml: function (a) { var b = this.editable(), c = this.getSelection(), c = c && c.getRanges(); if (!b || !c || 0 === c.length) return null; b = x(c, b); return a ? b.getHtml() : b }, extractSelectedHtml: function (a,
                        b) { var c = this.editable(), e = this.getSelection().getRanges(), g = new CKEDITOR.dom.documentFragment, d; if (!c || 0 === e.length) return null; for (d = 0; d < e.length; d++)g.append(c.extractHtmlFromRange(e[d], b)); b || this.getSelection().selectRanges([e[0]]); return a ? g.getHtml() : g }, focus: function () { this.fire("beforeFocus") }, checkDirty: function () { return "ready" == this.status && this._.previousValue !== this.getSnapshot() }, resetDirty: function () { this._.previousValue = this.getSnapshot() }, updateElement: function () { return r.call(this) },
                    setKeystroke: function () { for (var a = this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [[].slice.call(arguments, 0)], c, e, g = b.length; g--;)c = b[g], e = 0, CKEDITOR.tools.isArray(c) && (e = c[1], c = c[0]), e ? a[c] = e : delete a[c] }, getCommandKeystroke: function (a, b) {
                        var c = "string" === typeof a ? this.getCommand(a) : a, e = []; if (c) { var g = CKEDITOR.tools.object.findKey(this.commands, c), d = this.keystrokeHandler.keystrokes; if (c.fakeKeystroke) e.push(c.fakeKeystroke); else for (var f in d) d[f] === g && e.push(f) } return b ?
                            e : e[0] || null
                    }, addFeature: function (a) { return this.filter.addFeature(a) }, setActiveFilter: function (a) { a || (a = this.filter); this.activeFilter !== a && (this.activeFilter = a, this.fire("activeFilterChange"), a === this.filter ? this.setActiveEnterMode(null, null) : this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode), a.getAllowedEnterMode(this.shiftEnterMode, !0))) }, setActiveEnterMode: function (a, b) {
                        a = a ? this.blockless ? CKEDITOR.ENTER_BR : a : this.enterMode; b = b ? this.blockless ? CKEDITOR.ENTER_BR : b : this.shiftEnterMode;
                        if (this.activeEnterMode != a || this.activeShiftEnterMode != b) this.activeEnterMode = a, this.activeShiftEnterMode = b, this.fire("activeEnterModeChange")
                    }, showNotification: function (a) { alert(a) }, isDetached: function () { return !!this.container && this.container.isDetached() }, isDestroyed: function () { return "destroyed" === this.status }
                }); CKEDITOR.editor._getEditorElement = function (a) {
                    if (!CKEDITOR.env.isCompatible) return null; var b = CKEDITOR.dom.element.get(a); return b ? b.getEditor() ? (CKEDITOR.error("editor-element-conflict",
                        { editorName: b.getEditor().name }), null) : b : (CKEDITOR.error("editor-incorrect-element", { element: a }), null)
                }; CKEDITOR.editor.initializeDelayedEditorCreation = function (a, b, c) {
                    if (b.delayIfDetached_callback) return CKEDITOR.warn("editor-delayed-creation", { method: "callback" }), b.delayIfDetached_callback(function () { CKEDITOR[c](a, b); CKEDITOR.warn("editor-delayed-creation-success", { method: "callback" }) }), null; var e = void 0 === b.delayIfDetached_interval ? CKEDITOR.config.delayIfDetached_interval : b.delayIfDetached_interval;
                    CKEDITOR.warn("editor-delayed-creation", { method: "interval - " + e + " ms" }); var g = setInterval(function () { a.isDetached() || (clearInterval(g), CKEDITOR[c](a, b), CKEDITOR.warn("editor-delayed-creation-success", { method: "interval - " + e + " ms" })) }, e); return function () { clearInterval(g) }
                }; CKEDITOR.editor.shouldDelayEditorCreation = function (a, b) { CKEDITOR.editor.mergeDelayedCreationConfigs(b); return b && b.delayIfDetached && a.isDetached() }; CKEDITOR.editor.mergeDelayedCreationConfigs = function (a) {
                    a && (a.delayIfDetached = "boolean" ===
                        typeof a.delayIfDetached ? a.delayIfDetached : CKEDITOR.config.delayIfDetached, a.delayIfDetached_interval = isNaN(a.delayIfDetached_interval) ? CKEDITOR.config.delayIfDetached_interval : a.delayIfDetached_interval, a.delayIfDetached_callback = a.delayIfDetached_callback || CKEDITOR.config.delayIfDetached_callback)
                }
            })(); CKEDITOR.ELEMENT_MODE_NONE = 0; CKEDITOR.ELEMENT_MODE_REPLACE = 1; CKEDITOR.ELEMENT_MODE_APPENDTO = 2; CKEDITOR.ELEMENT_MODE_INLINE = 3; CKEDITOR.config.delayIfDetached = !1; CKEDITOR.config.delayIfDetached_callback =
                void 0; CKEDITOR.config.delayIfDetached_interval = 50; CKEDITOR.htmlParser = function () { this._ = { htmlPartsRegex: /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--!?>)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g } }; (function () {
                    var a = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g, h = { checked: 1, compact: 1, declare: 1, defer: 1, disabled: 1, ismap: 1, multiple: 1, nohref: 1, noresize: 1, noshade: 1, nowrap: 1, readonly: 1, selected: 1 }; CKEDITOR.htmlParser.prototype =
                    {
                        onTagOpen: function () { }, onTagClose: function () { }, onText: function () { }, onCDATA: function () { }, onComment: function () { }, parse: function (f) {
                            for (var b, d, m = 0, k; b = this._.htmlPartsRegex.exec(f);) {
                                d = b.index; if (d > m) if (m = f.substring(m, d), k) k.push(m); else this.onText(m); m = this._.htmlPartsRegex.lastIndex; if (d = b[1]) if (d = d.toLowerCase(), k && CKEDITOR.dtd.$cdata[d] && (this.onCDATA(k.join("")), k = null), !k) { this.onTagClose(d); continue } if (k) k.push(b[0]); else if (d = b[3]) {
                                    if (d = d.toLowerCase(), !/="/.test(d)) {
                                        var l = {}, g, e = b[4]; b =
                                            !!b[5]; if (e) for (; g = a.exec(e);) { var c = g[1].toLowerCase(); g = g[2] || g[3] || g[4] || ""; l[c] = !g && h[c] ? c : CKEDITOR.tools.htmlDecodeAttr(g) } this.onTagOpen(d, l, b); !k && CKEDITOR.dtd.$cdata[d] && (k = [])
                                    }
                                } else if (d = b[2]) this.onComment(d)
                            } if (f.length > m) this.onText(f.substring(m, f.length))
                        }
                    }
                })(); CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
                    $: function () { this._ = { output: [] } }, proto: {
                        openTag: function (a) { this._.output.push("\x3c", a) }, openTagClose: function (a, h) { h ? this._.output.push(" /\x3e") : this._.output.push("\x3e") },
                        attribute: function (a, h) { "string" == typeof h && (h = CKEDITOR.tools.htmlEncodeAttr(h)); this._.output.push(" ", a, '\x3d"', h, '"') }, closeTag: function (a) { this._.output.push("\x3c/", a, "\x3e") }, text: function (a) { this._.output.push(a) }, comment: function (a) { this._.output.push("\x3c!--", a, "--\x3e") }, write: function (a) { this._.output.push(a) }, reset: function () { this._.output = []; this._.indent = !1 }, getHtml: function (a) { var h = this._.output.join(""); a && this.reset(); return h }
                    }
                }); "use strict"; (function () {
                    CKEDITOR.htmlParser.node =
                        function () { }; CKEDITOR.htmlParser.node.prototype = {
                            remove: function () { var a = this.parent.children, h = CKEDITOR.tools.indexOf(a, this), f = this.previous, b = this.next; f && (f.next = b); b && (b.previous = f); a.splice(h, 1); this.parent = null }, replaceWith: function (a) { var h = this.parent.children, f = CKEDITOR.tools.indexOf(h, this), b = a.previous = this.previous, d = a.next = this.next; b && (b.next = a); d && (d.previous = a); h[f] = a; a.parent = this.parent; this.parent = null }, insertAfter: function (a) {
                                var h = a.parent.children, f = CKEDITOR.tools.indexOf(h,
                                    a), b = a.next; h.splice(f + 1, 0, this); this.next = a.next; this.previous = a; a.next = this; b && (b.previous = this); this.parent = a.parent
                            }, insertBefore: function (a) { var h = a.parent.children, f = CKEDITOR.tools.indexOf(h, a); h.splice(f, 0, this); this.next = a; (this.previous = a.previous) && (a.previous.next = this); a.previous = this; this.parent = a.parent }, getAscendant: function (a) {
                                var h = "function" == typeof a ? a : "string" == typeof a ? function (b) { return b.name == a } : function (b) { return b.name in a }, f = this.parent; for (; f && f.type == CKEDITOR.NODE_ELEMENT;) {
                                    if (h(f)) return f;
                                    f = f.parent
                                } return null
                            }, wrapWith: function (a) { this.replaceWith(a); a.add(this); return a }, getIndex: function () { return CKEDITOR.tools.indexOf(this.parent.children, this) }, getFilterContext: function (a) { return a || {} }
                        }
                })(); "use strict"; CKEDITOR.htmlParser.comment = function (a) { this.value = a; this._ = { isBlockLike: !1 } }; CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
                    type: CKEDITOR.NODE_COMMENT, filter: function (a, h) {
                        var f = this.value; if (!(f = a.onComment(h, f, this))) return this.remove(),
                            !1; if ("string" != typeof f) return this.replaceWith(f), !1; this.value = f; return !0
                    }, writeHtml: function (a, h) { h && this.filter(h); a.comment(this.value) }
                }); "use strict"; (function () { CKEDITOR.htmlParser.text = function (a) { this.value = a; this._ = { isBlockLike: !1 } }; CKEDITOR.htmlParser.text.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_TEXT, filter: function (a, h) { if (!(this.value = a.onText(h, this.value, this))) return this.remove(), !1 }, writeHtml: function (a, h) { h && this.filter(h); a.text(this.value) } }) })();
        "use strict"; (function () { CKEDITOR.htmlParser.cdata = function (a) { this.value = a }; CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_TEXT, filter: function (a) { var h = this.getAscendant("style"); if (h && h.getAscendant({ math: 1, svg: 1 })) { var h = CKEDITOR.htmlParser.fragment.fromHtml(this.value), f = new CKEDITOR.htmlParser.basicWriter; a.applyTo(h); h.writeHtml(f); this.value = f.getHtml() } }, writeHtml: function (a) { a.write(this.value) } }) })(); "use strict"; CKEDITOR.htmlParser.fragment =
            function () { this.children = []; this.parent = null; this._ = { isBlockLike: !0, hasInlineStarted: !1 } }; (function () {
                function a(a) { return a.attributes["data-cke-survive"] ? !1 : "a" == a.name && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name] } var h = CKEDITOR.tools.extend({ table: 1, ul: 1, ol: 1, dl: 1 }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl), f = { ol: 1, ul: 1 }, b = CKEDITOR.tools.extend({}, { html: 1 }, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, { style: 1, script: 1 }), d = {
                    ul: "li", ol: "li", dl: "dd", table: "tbody",
                    tbody: "tr", thead: "tr", tfoot: "tr", tr: "td"
                }; CKEDITOR.htmlParser.fragment.fromHtml = function (m, k, l) {
                    function g(a) { var b; if (0 < t.length) for (var c = 0; c < t.length; c++) { var g = t[c], d = g.name, f = CKEDITOR.dtd[d], k = q.name && CKEDITOR.dtd[q.name]; k && !k[d] || a && f && !f[a] && CKEDITOR.dtd[a] ? d == q.name && (n(q, q.parent, 1), c--) : (b || (e(), b = 1), g = g.clone(), g.parent = q, q = g, t.splice(c, 1), c--) } } function e() { for (; A.length;)n(A.shift(), q) } function c(a) {
                        if (a._.isBlockLike && "pre" != a.name && "textarea" != a.name) {
                            var b = a.children.length, c = a.children[b -
                                1], e; c && c.type == CKEDITOR.NODE_TEXT && ((e = CKEDITOR.tools.rtrim(c.value)) ? c.value = e : a.children.length = b - 1)
                        }
                    } function n(b, e, g) { e = e || q || p; var d = q; void 0 === b.previous && (r(e, b) && (q = e, u.onTagOpen(l, {}), b.returnPoint = e = q), c(b), a(b) && !b.children.length || e.add(b), "pre" == b.name && (z = !1), "textarea" == b.name && (B = !1)); b.returnPoint ? (q = b.returnPoint, delete b.returnPoint) : q = g ? e : d } function r(a, b) {
                        if ((a == p || "body" == a.name) && l && (!a.name || CKEDITOR.dtd[a.name][l])) {
                            var c, e; return (c = b.attributes && (e = b.attributes["data-cke-real-element-type"]) ?
                                e : b.name) && c in CKEDITOR.dtd.$inline && !(c in CKEDITOR.dtd.head) && !b.isOrphan || b.type == CKEDITOR.NODE_TEXT
                        }
                    } function x(a, b) { return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ? a == b || "dt" == a && "dd" == b || "dd" == a && "dt" == b : !1 } var u = new CKEDITOR.htmlParser, p = k instanceof CKEDITOR.htmlParser.element ? k : "string" == typeof k ? new CKEDITOR.htmlParser.element(k) : new CKEDITOR.htmlParser.fragment, t = [], A = [], q = p, B = "textarea" == p.name, z = "pre" == p.name; u.onTagOpen = function (c, d, k, m) {
                        d = new CKEDITOR.htmlParser.element(c,
                            d); d.isUnknown && k && (d.isEmpty = !0); d.isOptionalClose = m; if (a(d)) t.push(d); else {
                                if ("pre" == c) z = !0; else { if ("br" == c && z) { q.add(new CKEDITOR.htmlParser.text("\n")); return } "textarea" == c && (B = !0) } if ("br" == c) A.push(d); else {
                                    for (; !(m = (k = q.name) ? CKEDITOR.dtd[k] || (q._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : b, d.isUnknown || q.isUnknown || m[c]);)if (q.isOptionalClose) u.onTagClose(k); else if (c in f && k in f) k = q.children, (k = k[k.length - 1]) && "li" == k.name || n(k = new CKEDITOR.htmlParser.element("li"), q), !d.returnPoint &&
                                        (d.returnPoint = q), q = k; else if (c in CKEDITOR.dtd.$listItem && !x(c, k)) u.onTagOpen("li" == c ? "ul" : "dl", {}, 0, 1); else if (k in h && !x(c, k)) !d.returnPoint && (d.returnPoint = q), q = q.parent; else if (k in CKEDITOR.dtd.$inline && t.unshift(q), q.parent) n(q, q.parent, 1); else { d.isOrphan = 1; break } g(c); e(); d.parent = q; d.isEmpty ? n(d) : q = d
                                }
                            }
                    }; u.onTagClose = function (a) {
                        for (var b = t.length - 1; 0 <= b; b--)if (a == t[b].name) { t.splice(b, 1); return } for (var c = [], g = [], d = q; d != p && d.name != a;)d._.isBlockLike || g.unshift(d), c.push(d), d = d.returnPoint ||
                            d.parent; if (d != p) { for (b = 0; b < c.length; b++) { var f = c[b]; n(f, f.parent) } q = d; d._.isBlockLike ? e() : (b = CKEDITOR.config.shiftLineBreaks, !0 !== b && A.length && ("function" !== typeof b ? e() : (b = b(A[A.length - 1]), !0 !== b && (e(), b instanceof CKEDITOR.htmlParser.text && q.add(b), b instanceof CKEDITOR.htmlParser.element && n(b, q))))); n(d, d.parent); d == q && (q = q.parent); t = t.concat(g) } "body" == a && (l = !1)
                    }; u.onText = function (a) {
                        if (!(q._.hasInlineStarted && !A.length || z || B) && (a = CKEDITOR.tools.ltrim(a), 0 === a.length)) return; var c = q.name, f = c ?
                            CKEDITOR.dtd[c] || (q._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : b; if (!B && !f["#"] && c in h) u.onTagOpen(d[c] || ""), u.onText(a); else { e(); g(); z || B || (a = a.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " ")); a = new CKEDITOR.htmlParser.text(a); if (r(q, a)) this.onTagOpen(l, {}, 0, 1); q.add(a) }
                    }; u.onCDATA = function (a) { q.add(new CKEDITOR.htmlParser.cdata(a)) }; u.onComment = function (a) { e(); g(); q.add(new CKEDITOR.htmlParser.comment(a)) }; u.parse(m); for (e(); q != p;)n(q, q.parent, 1); c(p); return p
                }; CKEDITOR.htmlParser.fragment.prototype =
                {
                    type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, add: function (a, b) { isNaN(b) && (b = this.children.length); var d = 0 < b ? this.children[b - 1] : null; if (d) { if (a._.isBlockLike && d.type == CKEDITOR.NODE_TEXT && (d.value = CKEDITOR.tools.rtrim(d.value), 0 === d.value.length)) { this.children.pop(); this.add(a); return } d.next = a } a.previous = d; a.parent = this; this.children.splice(b, 0, a); this._.hasInlineStarted || (this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike) }, filter: function (a, b) {
                        b = this.getFilterContext(b);
                        a.onRoot(b, this); this.filterChildren(a, !1, b)
                    }, filterChildren: function (a, b, d) { if (this.childrenFilteredBy != a.id) { d = this.getFilterContext(d); if (b && !this.parent) a.onRoot(d, this); this.childrenFilteredBy = a.id; for (b = 0; b < this.children.length; b++)!1 === this.children[b].filter(a, d) && b-- } }, writeHtml: function (a, b) { b && this.filter(b); this.writeChildrenHtml(a) }, writeChildrenHtml: function (a, b, d) {
                        var g = this.getFilterContext(); if (d && !this.parent && b) b.onRoot(g, this); b && this.filterChildren(b, !1, g); b = 0; d = this.children;
                        for (g = d.length; b < g; b++)d[b].writeHtml(a)
                    }, forEach: function (a, b, d) { if (!(d || b && this.type != b)) var g = a(this); if (!1 !== g) { d = this.children; for (var e = 0; e < d.length; e++)g = d[e], g.type == CKEDITOR.NODE_ELEMENT ? g.forEach(a, b) : b && g.type != b || a(g) } }, getFilterContext: function (a) { return a || {} }
                }; CKEDITOR.config.shiftLineBreaks = !0
            })(); "use strict"; (function () {
                function a() { this.rules = [] } function h(f, b, d, h) { var k, l; for (k in b) (l = f[k]) || (l = f[k] = new a), l.add(b[k], d, h) } CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
                    $: function (f) {
                        this.id =
                            CKEDITOR.tools.getNextNumber(); this.elementNameRules = new a; this.attributeNameRules = new a; this.elementsRules = {}; this.attributesRules = {}; this.textRules = new a; this.commentRules = new a; this.rootRules = new a; f && this.addRules(f, 10)
                    }, proto: {
                        addRules: function (a, b) {
                            var d; "number" == typeof b ? d = b : b && "priority" in b && (d = b.priority); "number" != typeof d && (d = 10); "object" != typeof b && (b = {}); a.elementNames && this.elementNameRules.addMany(a.elementNames, d, b); a.attributeNames && this.attributeNameRules.addMany(a.attributeNames,
                                d, b); a.elements && h(this.elementsRules, a.elements, d, b); a.attributes && h(this.attributesRules, a.attributes, d, b); a.text && this.textRules.add(a.text, d, b); a.comment && this.commentRules.add(a.comment, d, b); a.root && this.rootRules.add(a.root, d, b)
                        }, applyTo: function (a) { a.filter(this) }, onElementName: function (a, b) { return this.elementNameRules.execOnName(a, b) }, onAttributeName: function (a, b) { return this.attributeNameRules.execOnName(a, b) }, onText: function (a, b, d) { return this.textRules.exec(a, b, d) }, onComment: function (a,
                            b, d) { return this.commentRules.exec(a, b, d) }, onRoot: function (a, b) { return this.rootRules.exec(a, b) }, onElement: function (a, b) { for (var d = [this.elementsRules["^"], this.elementsRules[b.name], this.elementsRules.$], h, k = 0; 3 > k; k++)if (h = d[k]) { h = h.exec(a, b, this); if (!1 === h) return null; if (h && h != b) return this.onNode(a, h); if (b.parent && !b.name) break } return b }, onNode: function (a, b) {
                                var d = b.type; return d == CKEDITOR.NODE_ELEMENT ? this.onElement(a, b) : d == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(a, b.value,
                                    b)) : d == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(a, b.value, b)) : null
                            }, onAttribute: function (a, b, d, h) { return (d = this.attributesRules[d]) ? d.exec(a, h, b, this) : h }
                    }
                }); CKEDITOR.htmlParser.filterRulesGroup = a; a.prototype = {
                    add: function (a, b, d) { this.rules.splice(this.findIndex(b), 0, { value: a, priority: b, options: d }) }, addMany: function (a, b, d) { for (var h = [this.findIndex(b), 0], k = 0, l = a.length; k < l; k++)h.push({ value: a[k], priority: b, options: d }); this.rules.splice.apply(this.rules, h) }, findIndex: function (a) {
                        for (var b =
                            this.rules, d = b.length - 1; 0 <= d && a < b[d].priority;)d--; return d + 1
                    }, exec: function (a, b) { var d = b instanceof CKEDITOR.htmlParser.node || b instanceof CKEDITOR.htmlParser.fragment, h = Array.prototype.slice.call(arguments, 1), k = this.rules, l = k.length, g, e, c, n; for (n = 0; n < l; n++)if (d && (g = b.type, e = b.name), c = k[n], !(a.nonEditable && !c.options.applyToAll || a.nestedEditable && c.options.excludeNestedEditable)) { c = c.value.apply(null, h); if (!1 === c || d && c && (c.name != e || c.type != g)) return c; null != c && (h[0] = b = c) } return b }, execOnName: function (a,
                        b) { for (var d = 0, h = this.rules, k = h.length, l; b && d < k; d++)l = h[d], a.nonEditable && !l.options.applyToAll || a.nestedEditable && l.options.excludeNestedEditable || (b = b.replace(l.value[0], l.value[1])); return b }
                }
            })(); (function () {
                function a(a, c) {
                    function e(a) { return a || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", { "data-cke-bogus": 1 }) } function g(a, c) {
                        return function (g) {
                            if (g.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                                var d = [], k = f(g), l, r; if (k) for (h(k, 1) && d.push(k); k;)m(k) &&
                                    (l = b(k)) && h(l) && ((r = b(l)) && !m(r) ? d.push(l) : (e(n).insertAfter(l), l.remove())), k = k.previous; for (k = 0; k < d.length; k++)d[k].remove(); if (d = !a || !1 !== ("function" == typeof c ? c(g) : c)) n || CKEDITOR.env.needsBrFiller || g.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT ? n || CKEDITOR.env.needsBrFiller || !(7 < document.documentMode || g.name in CKEDITOR.dtd.tr || g.name in CKEDITOR.dtd.$listItem) ? (d = f(g), d = !d || "form" == g.name && "input" == d.name) : d = !1 : d = !1; d && g.add(e(a))
                            }
                        }
                    } function h(a, b) {
                        if ((!n || CKEDITOR.env.needsBrFiller) && a.type == CKEDITOR.NODE_ELEMENT &&
                            "br" == a.name && !a.attributes["data-cke-eol"]) return !0; var c; return a.type == CKEDITOR.NODE_TEXT && (c = a.value.match(A)) && (c.index && ((new CKEDITOR.htmlParser.text(a.value.substring(0, c.index))).insertBefore(a), a.value = c[0]), !CKEDITOR.env.needsBrFiller && n && (!b || a.parent.name in r) || !n && ((c = a.previous) && "br" == c.name || !c || m(c))) ? !0 : !1
                    } var l = { elements: {} }, n = "html" == c, r = CKEDITOR.tools.extend({}, y), M; for (M in r) "#" in B[M] || delete r[M]; for (M in r) l.elements[M] = g(n, a.config.fillEmptyBlocks); l.root = g(n, !1); l.elements.br =
                        function (a) { return function (c) { if (c.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) { var g = c.attributes; if ("data-cke-bogus" in g || "data-cke-eol" in g) delete g["data-cke-bogus"]; else { for (g = c.next; g && d(g);)g = g.next; var f = b(c); !g && m(c.parent) ? k(c.parent, e(a)) : m(g) && f && !m(f) && e(a).insertBefore(g) } } } }(n); return l
                } function h(a, b) { return a != CKEDITOR.ENTER_BR && !1 !== b ? a == CKEDITOR.ENTER_DIV ? "div" : "p" : !1 } function f(a) { for (a = a.children[a.children.length - 1]; a && d(a);)a = a.previous; return a } function b(a) {
                    for (a = a.previous; a &&
                        d(a);)a = a.previous; return a
                } function d(a) { return a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"] } function m(a) { return a && (a.type == CKEDITOR.NODE_ELEMENT && a.name in y || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) } function k(a, b) { var c = a.children[a.children.length - 1]; a.children.push(b); b.parent = a; c && (c.next = b, b.previous = c) } function l(a) {
                    a = a.attributes; "false" != a.contenteditable && (a["data-cke-editable"] = a.contenteditable ? "true" : 1);
                    a.contenteditable = "false"
                } function g(a) { a = a.attributes; switch (a["data-cke-editable"]) { case "true": a.contenteditable = "true"; break; case "1": delete a.contenteditable } } function e(a, b) { return a.replace(G, function (a, c, e) { return "\x3c" + c + e.replace(H, function (a, c) { return L.test(c) && -1 == e.indexOf("data-cke-saved-" + c) ? " data-cke-saved-" + a + " data-cke-" + b + "-" + a : a }) + "\x3e" }) } function c(a, b) {
                    return a.replace(b, function (a, b, c) {
                        0 === a.indexOf("\x3ctextarea") && (a = b + x(c).replace(/</g, "\x26lt;").replace(/>/g, "\x26gt;") +
                            "\x3c/textarea\x3e"); return "\x3ccke:encoded\x3e" + encodeURIComponent(a) + "\x3c/cke:encoded\x3e"
                    })
                } function n(a) { return a.replace(I, function (a, b) { return decodeURIComponent(b) }) } function r(a) { return a.replace(/\x3c!--(?!{cke_protected})[\s\S]+?--\x3e/g, function (a) { return "\x3c!--" + q + "{C}" + encodeURIComponent(a).replace(/--/g, "%2D%2D") + "--\x3e" }) } function x(a) { return a.replace(/\x3c!--\{cke_protected\}\{C\}([\s\S]+?)--\x3e/g, function (a, b) { return decodeURIComponent(b) }) } function u(a, b) {
                    var c = b._.dataStore;
                    return a.replace(/\x3c!--\{cke_protected\}([\s\S]+?)--\x3e/g, function (a, b) { return decodeURIComponent(b) }).replace(/\{cke_protected_(\d+)\}/g, function (a, b) { return c && c[b] || "" })
                } function p(a, b, c) {
                    var e = [], g = b.config.protectedSource, d = b._.dataStore || (b._.dataStore = { id: 1 }), f = new RegExp("\x3c\\!--\\{cke_temp_" + c + "(comment)?\\}(\\d*?)--\x3e", "g"), g = [/<script[\s\S]*?(<\/script>|$)/gi, /<noscript[\s\S]*?<\/noscript>/gi, /<meta[\s\S]*?\/?>/gi].concat(g); a = a.replace(/\x3c!--[\s\S]*?--\x3e/g, function (a) {
                        return "\x3c!--{cke_temp_" +
                            c + "comment}" + (e.push(a) - 1) + "--\x3e"
                    }); for (var k = 0; k < g.length; k++)a = a.replace(g[k], function (a) { a = a.replace(f, function (a, b, c) { return e[c] }); return f.test(a) ? a : "\x3c!--{cke_temp_" + c + "}" + (e.push(a) - 1) + "--\x3e" }); a = a.replace(f, function (a, b, c) { return "\x3c!--" + q + (b ? "{C}" : "") + encodeURIComponent(e[c]).replace(/--/g, "%2D%2D") + "--\x3e" }); a = a.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g, function (a) {
                        return a.replace(/\x3c!--\{cke_protected\}([^>]*)--\x3e/g, function (a,
                            b) { d[d.id] = decodeURIComponent(b); return "{cke_protected_" + d.id++ + "}" })
                    }); return a = a.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g, function (a, c, e, g) { return "\x3c" + c + e + "\x3e" + u(x(g), b) + "\x3c/" + c + "\x3e" })
                } var t; CKEDITOR.htmlDataProcessor = function (b) {
                    var g, d, f = this; this.editor = b; this.dataFilter = g = new CKEDITOR.htmlParser.filter; this.htmlFilter = d = new CKEDITOR.htmlParser.filter; this.writer = new CKEDITOR.htmlParser.basicWriter; g.addRules(v); g.addRules(C, { applyToAll: !0 }); g.addRules(a(b, "data"),
                        { applyToAll: !0 }); d.addRules(F); d.addRules(D, { applyToAll: !0 }); d.addRules(a(b, "html"), { applyToAll: !0 }); b.on("toHtml", function (a) {
                            var g; var d = window.crypto || window.msCrypto; g = d ? d.getRandomValues(new Uint32Array(1))[0] : Math.floor(9E9 * Math.random() + 1E9); a = a.data; var d = a.dataValue, d = t(d), d = p(d, b, g), d = c(d, S), d = e(d, g), d = c(d, K), d = d.replace(E, "$1cke:$2"), d = d.replace(M, "\x3ccke:$1$2\x3e\x3c/cke:$1\x3e"), d = d.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"), d = d.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi, "$1data-cke-" +
                                g + "-$2"), f = a.context || b.editable().getName(), k; CKEDITOR.env.ie && 9 > CKEDITOR.env.version && "pre" == f && (f = "div", d = "\x3cpre\x3e" + d + "\x3c/pre\x3e", k = 1); f = b.document.createElement(f); f.setHtml("a" + d); d = f.getHtml().substr(1); d = d.replace(new RegExp("data-cke-" + g + "-", "ig"), ""); k && (d = d.replace(/^<pre>|<\/pre>$/gi, "")); d = d.replace(P, "$1$2"); d = n(d); d = x(d); g = !1 === a.fixForBody ? !1 : h(a.enterMode, b.config.autoParagraph); d = CKEDITOR.htmlParser.fragment.fromHtml(d, a.context, g); g && (k = d, !k.children.length && CKEDITOR.dtd[k.name][g] &&
                                    (g = new CKEDITOR.htmlParser.element(g), k.add(g))); a.dataValue = d
                        }, null, null, 5); b.on("toHtml", function (a) { a.data.filter.applyTo(a.data.dataValue, !0, a.data.dontFilter, a.data.enterMode) && b.fire("dataFiltered") }, null, null, 6); b.on("toHtml", function (a) { a.data.dataValue.filterChildren(f.dataFilter, !0) }, null, null, 10); b.on("toHtml", function (a) { a = a.data; var b = a.dataValue, c = new CKEDITOR.htmlParser.basicWriter; b.writeChildrenHtml(c); b = c.getHtml(!0); a.dataValue = r(b) }, null, null, 15); b.on("toDataFormat", function (a) {
                            var c =
                                a.data.dataValue; a.data.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/^<br *\/?>/i, "")); a.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(c, a.data.context, h(a.data.enterMode, b.config.autoParagraph))
                        }, null, null, 5); b.on("toDataFormat", function (a) { a.data.dataValue.filterChildren(f.htmlFilter, !0) }, null, null, 10); b.on("toDataFormat", function (a) { a.data.filter.applyTo(a.data.dataValue, !1, !0) }, null, null, 11); b.on("toDataFormat", function (a) {
                            var c = a.data.dataValue, e = f.writer; e.reset(); c.writeChildrenHtml(e);
                            c = e.getHtml(!0); c = x(c); c = u(c, b); a.data.dataValue = c
                        }, null, null, 15)
                }; CKEDITOR.htmlDataProcessor.prototype = {
                    toHtml: function (a, b, c, e) { var d = this.editor, g, f, k, h; b && "object" == typeof b ? (g = b.context, c = b.fixForBody, e = b.dontFilter, f = b.filter, k = b.enterMode, h = b.protectedWhitespaces) : g = b; g || null === g || (g = d.editable().getName()); return d.fire("toHtml", { dataValue: a, context: g, fixForBody: c, dontFilter: e, filter: f || d.filter, enterMode: k || d.enterMode, protectedWhitespaces: h }).dataValue }, toDataFormat: function (a, b) {
                        var c,
                            e, g; b && (c = b.context, e = b.filter, g = b.enterMode); c || null === c || (c = this.editor.editable().getName()); return this.editor.fire("toDataFormat", { dataValue: a, filter: e || this.editor.filter, context: c, enterMode: g || this.editor.enterMode }).dataValue
                    }, protectSource: function (a) { return p(a, this.editor) }, unprotectSource: function (a) { return u(a, this.editor) }, unprotectRealComments: function (a) { return x(a) }
                }; var A = /(?:&nbsp;|\xa0)$/, q = "{cke_protected}", B = CKEDITOR.dtd, z = "caption colgroup col thead tfoot tbody".split(" "),
                    y = CKEDITOR.tools.extend({}, B.$blockLimit, B.$block), v = { elements: { input: l, textarea: l } }, C = { attributeNames: [[/^on/, "data-cke-pa-on"], [/^srcdoc/, "data-cke-pa-srcdoc"], [/^data-cke-expando$/, ""]], elements: { iframe: function (a) { if (a.attributes && a.attributes.src) { var b = a.attributes.src.toLowerCase().replace(/[^a-z]/gi, ""); if (0 === b.indexOf("javascript") || 0 === b.indexOf("data")) a.attributes["data-cke-pa-src"] = a.attributes.src, delete a.attributes.src } } } }, F = {
                        elements: {
                            embed: function (a) {
                                var b = a.parent; if (b && "object" ==
                                    b.name) { var c = b.attributes.width, b = b.attributes.height; c && (a.attributes.width = c); b && (a.attributes.height = b) }
                            }, a: function (a) { var b = a.attributes; if (!(a.children.length || b.name || b.id || a.attributes["data-cke-saved-name"])) return !1 }
                        }
                    }, D = {
                        elementNames: [[/^cke:/, ""], [/^\?xml:namespace$/, ""]], attributeNames: [[/^data-cke-(saved|pa)-/, ""], [/^data-cke-.*/, ""], ["hidefocus", ""]], elements: {
                            $: function (a) {
                                var b = a.attributes; if (b) {
                                    if (b["data-cke-temp"]) return !1; for (var c = ["name", "href", "src"], e, g = 0; g < c.length; g++)e =
                                        "data-cke-saved-" + c[g], e in b && delete b[c[g]]
                                } return a
                            }, table: function (a) { a.children.slice(0).sort(function (a, b) { var c, e; a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type && (c = CKEDITOR.tools.indexOf(z, a.name), e = CKEDITOR.tools.indexOf(z, b.name)); -1 < c && -1 < e && c != e || (c = a.parent ? a.getIndex() : -1, e = b.parent ? b.getIndex() : -1); return c > e ? 1 : -1 }) }, param: function (a) { a.children = []; a.isEmpty = !0; return a }, span: function (a) { "Apple-style-span" == a.attributes["class"] && delete a.name }, html: function (a) {
                                delete a.attributes.contenteditable;
                                delete a.attributes["class"]
                            }, body: function (a) { delete a.attributes.spellcheck; delete a.attributes.contenteditable }, style: function (a) { var b = a.children[0]; b && b.value && (b.value = CKEDITOR.tools.trim(b.value)); a.attributes.type || (a.attributes.type = "text/css") }, title: function (a) { var b = a.children[0]; !b && k(a, b = new CKEDITOR.htmlParser.text); b.value = a.attributes["data-cke-title"] || "" }, input: g, textarea: g
                        }, attributes: { "class": function (a) { return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || !1 } }
                    };
                CKEDITOR.env.ie && (D.attributes.style = function (a) { return a.replace(/(^|;)([^\:]+)/g, function (a) { return a.toLowerCase() }) }); var G = /<(a|area|img|input|source)\b([^>]*)>/gi, H = /([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi, L = /^(href|src|name)$/i, K = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi, S = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi, I = /<cke:encoded>([^<]*)<\/cke:encoded>/gi, E = /(<\/?)((?:object|embed|param|html|body|head|title)([\s][^>]*)?>)/gi,
                    P = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi, M = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi; t = function () {
                        function a(b, c) { for (var e = 0; e < b.length; e++) { var g = b[e]; g.lastIndex = 0; if (g.test(c)) return !0 } return !1 } function b(a) { return CKEDITOR.tools.array.reduce(a.split(""), function (a, b) { var e = b.toLowerCase(), g = b.toUpperCase(), d = c(e); e !== g && (d += "|" + c(g)); return a + ("(" + d + ")") }, "") } function c(a) {
                            var b; b = a.charCodeAt(0); var e = b.toString(16); b = {
                                htmlCode: "\x26#" + b + ";?", hex: "\x26#x0*" + e + ";?", entity: {
                                    "\x3c": "\x26lt;",
                                    "\x3e": "\x26gt;", ":": "\x26colon;"
                                }[a]
                            }; for (var g in b) b[g] && (a += "|" + b[g]); return a
                        } var e = [new RegExp("(" + b("\x3ccke:encoded\x3e") + "(.*?)" + b("\x3c/cke:encoded\x3e") + ")|(" + b("\x3c") + b("/") + "?" + b("cke:encoded\x3e") + ")", "gi"), new RegExp("((" + b("{cke_protected") + ")(_[0-9]*)?" + b("}") + ")", "gi"), /<!(?:\s*-\s*){2,3}!?\s*>/g]; return function (b) { for (; a(e, b);)for (var c = e, g = 0; g < c.length; g++)b = b.replace(c[g], ""); return b }
                    }()
            })(); "use strict"; CKEDITOR.htmlParser.element = function (a, h) {
                this.name = a; this.attributes =
                    h || {}; this.children = []; var f = a || "", b = f.match(/^cke:(.*)/); b && (f = b[1]); f = !!(CKEDITOR.dtd.$nonBodyContent[f] || CKEDITOR.dtd.$block[f] || CKEDITOR.dtd.$listItem[f] || CKEDITOR.dtd.$tableContent[f] || CKEDITOR.dtd.$nonEditable[f] || "br" == f); this.isEmpty = !!CKEDITOR.dtd.$empty[a]; this.isUnknown = !CKEDITOR.dtd[a]; this._ = { isBlockLike: f, hasInlineStarted: this.isEmpty || !f }
            }; CKEDITOR.htmlParser.cssStyle = function (a) {
                var h = {}; ((a instanceof CKEDITOR.htmlParser.element ? a.attributes.style : a) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g,
                    function (a, b, d) { "font-family" == b && (d = d.replace(/["']/g, "")); h[b.toLowerCase()] = d }); return { rules: h, populate: function (a) { var b = this.toString(); b && (a instanceof CKEDITOR.dom.element ? a.setAttribute("style", b) : a instanceof CKEDITOR.htmlParser.element ? a.attributes.style = b : a.style = b) }, toString: function () { var a = [], b; for (b in h) h[b] && a.push(b, ":", h[b], ";"); return a.join("") } }
            }; (function () {
                function a(a) { return function (d) { return d.type == CKEDITOR.NODE_ELEMENT && ("string" == typeof a ? d.name == a : d.name in a) } } var h =
                    function (a, d) { a = a[0]; d = d[0]; return a < d ? -1 : a > d ? 1 : 0 }, f = CKEDITOR.htmlParser.fragment.prototype; CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
                        type: CKEDITOR.NODE_ELEMENT, add: f.add, clone: function () { return new CKEDITOR.htmlParser.element(this.name, this.attributes) }, filter: function (a, d) {
                            var f = this, k, h; d = f.getFilterContext(d); if (!f.parent) a.onRoot(d, f); for (; ;) {
                                k = f.name; if (!(h = a.onElementName(d, k))) return this.remove(), !1; f.name = h; if (!(f = a.onElement(d, f))) return this.remove(),
                                    !1; if (f !== this) return this.replaceWith(f), !1; if (f.name == k) break; if (f.type != CKEDITOR.NODE_ELEMENT) return this.replaceWith(f), !1; if (!f.name) return this.replaceWithChildren(), !1
                            } k = f.attributes; var g, e; for (g in k) { for (h = k[g]; ;)if (e = a.onAttributeName(d, g)) if (e != g) delete k[g], g = e; else break; else { delete k[g]; break } e && (!1 === (h = a.onAttribute(d, f, e, h)) ? delete k[e] : k[e] = h) } f.isEmpty || this.filterChildren(a, !1, d); return !0
                        }, filterChildren: f.filterChildren, writeHtml: function (a, d) {
                            d && this.filter(d); var f = this.name,
                                k = [], l = this.attributes, g, e; a.openTag(f, l); for (g in l) k.push([g, l[g]]); a.sortAttributes && k.sort(h); g = 0; for (e = k.length; g < e; g++)l = k[g], a.attribute(l[0], l[1]); a.openTagClose(f, this.isEmpty); this.writeChildrenHtml(a); this.isEmpty || a.closeTag(f)
                        }, writeChildrenHtml: f.writeChildrenHtml, replaceWithChildren: function () { for (var a = this.children, d = a.length; d;)a[--d].insertAfter(this); this.remove() }, forEach: f.forEach, getFirst: function (b) {
                            if (!b) return this.children.length ? this.children[0] : null; "function" != typeof b &&
                                (b = a(b)); for (var d = 0, f = this.children.length; d < f; ++d)if (b(this.children[d])) return this.children[d]; return null
                        }, getHtml: function () { var a = new CKEDITOR.htmlParser.basicWriter; this.writeChildrenHtml(a); return a.getHtml() }, setHtml: function (a) { a = this.children = CKEDITOR.htmlParser.fragment.fromHtml(a).children; for (var d = 0, f = a.length; d < f; ++d)a[d].parent = this }, getOuterHtml: function () { var a = new CKEDITOR.htmlParser.basicWriter; this.writeHtml(a); return a.getHtml() }, split: function (a) {
                            for (var d = this.children.splice(a,
                                this.children.length - a), f = this.clone(), k = 0; k < d.length; ++k)d[k].parent = f; f.children = d; d[0] && (d[0].previous = null); 0 < a && (this.children[a - 1].next = null); this.parent.add(f, this.getIndex() + 1); return f
                        }, find: function (a, d) { void 0 === d && (d = !1); var f = [], k; for (k = 0; k < this.children.length; k++) { var h = this.children[k]; "function" == typeof a && a(h) ? f.push(h) : "string" == typeof a && h.name === a && f.push(h); d && h.find && (f = f.concat(h.find(a, d))) } return f }, findOne: function (a, d) {
                            var f = null, k = CKEDITOR.tools.array.find(this.children,
                                function (k) { var g = "function" === typeof a ? a(k) : k.name === a; if (g || !d) return g; k.children && k.findOne && (f = k.findOne(a, !0)); return !!f }); return f || k || null
                        }, addClass: function (a) { if (!this.hasClass(a)) { var d = this.attributes["class"] || ""; this.attributes["class"] = d + (d ? " " : "") + a } }, removeClass: function (a) { var d = this.attributes["class"]; d && ((d = CKEDITOR.tools.trim(d.replace(new RegExp("(?:\\s+|^)" + a + "(?:\\s+|$)"), " "))) ? this.attributes["class"] = d : delete this.attributes["class"]) }, hasClass: function (a) {
                            var d = this.attributes["class"];
                            return d ? (new RegExp("(?:^|\\s)" + a + "(?\x3d\\s|$)")).test(d) : !1
                        }, getFilterContext: function (a) { var d = []; a || (a = { nonEditable: !1, nestedEditable: !1 }); a.nonEditable || "false" != this.attributes.contenteditable ? a.nonEditable && !a.nestedEditable && "true" == this.attributes.contenteditable && d.push("nestedEditable", !0) : d.push("nonEditable", !0); if (d.length) { a = CKEDITOR.tools.copy(a); for (var f = 0; f < d.length; f += 2)a[d[f]] = d[f + 1] } return a }
                    }, !0)
            })(); (function () {
                var a = /{([^}]+)}/g; CKEDITOR.template = function (a) {
                    this.source =
                        "function" === typeof a ? a : String(a)
                }; CKEDITOR.template.prototype.output = function (h, f) { var b = ("function" === typeof this.source ? this.source(h) : this.source).replace(a, function (a, b) { return void 0 !== h[b] ? h[b] : a }); return f ? f.push(b) : b }
            })(); delete CKEDITOR.loadFullCore; CKEDITOR.instances = {}; CKEDITOR.document = new CKEDITOR.dom.document(document); CKEDITOR.add = function (a) {
                function h() { CKEDITOR.currentInstance == a && (CKEDITOR.currentInstance = null, CKEDITOR.fire("currentInstance")) } CKEDITOR.instances[a.name] = a; a.on("focus",
                    function () { CKEDITOR.currentInstance != a && (CKEDITOR.currentInstance = a, CKEDITOR.fire("currentInstance")) }); a.on("blur", h); a.on("destroy", h); CKEDITOR.fire("instance", null, a)
            }; CKEDITOR.remove = function (a) { delete CKEDITOR.instances[a.name] }; (function () { var a = {}; CKEDITOR.addTemplate = function (h, f) { var b = a[h]; if (b) return b; b = { name: h, source: f }; CKEDITOR.fire("template", b); return a[h] = new CKEDITOR.template(b.source) }; CKEDITOR.getTemplate = function (h) { return a[h] } })(); (function () {
                var a = []; CKEDITOR.addCss = function (h) { a.push(h) };
                CKEDITOR.getCss = function () { return a.join("\n") }
            })(); CKEDITOR.on("instanceDestroyed", function () { CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset") }); CKEDITOR.TRISTATE_ON = 1; CKEDITOR.TRISTATE_OFF = 2; CKEDITOR.TRISTATE_DISABLED = 0; (function () {
                CKEDITOR.inline = function (a, h) {
                    a = CKEDITOR.editor._getEditorElement(a); if (!a) return null; if (CKEDITOR.editor.shouldDelayEditorCreation(a, h)) return CKEDITOR.editor.initializeDelayedEditorCreation(a, h, "inline"); var f = a.is("textarea") ? a : null, b = f ? f.getValue() :
                        a.getHtml(), d = new CKEDITOR.editor(h, a, CKEDITOR.ELEMENT_MODE_INLINE); f ? (d.setData(b, null, !0), a = CKEDITOR.dom.element.createFromHtml('\x3cdiv contenteditable\x3d"' + !!d.readOnly + '" class\x3d"cke_textarea_inline"\x3e' + f.getValue() + "\x3c/div\x3e", CKEDITOR.document), a.insertAfter(f), f.hide(), f.$.form && d._attachToForm()) : (h && "undefined" !== typeof h.readOnly && !h.readOnly && a.setAttribute("contenteditable", "true"), d.setData(b, null, !0)); d.on("loaded", function () {
                            d.fire("uiReady"); d.editable(a); d.container = a; d.ui.contentsElement =
                                a; d.setData(d.getData(1)); d.resetDirty(); d.fire("contentDom"); d.mode = "wysiwyg"; d.fire("mode"); d.status = "ready"; d.fireOnce("instanceReady"); CKEDITOR.fire("instanceReady", null, d)
                        }, null, null, 1E4); d.on("destroy", function () { var a = d.container; f && a && (a.clearCustomData(), a.remove()); f && f.show(); d.element.clearCustomData(); delete d.element }); return d
                }; CKEDITOR.inlineAll = function () {
                    var a, h, f; for (f in CKEDITOR.dtd.$editable) for (var b = CKEDITOR.document.getElementsByTag(f), d = 0, m = b.count(); d < m; d++)a = b.getItem(d),
                        "true" != a.getAttribute("contenteditable") || a.getEditor() || (h = { element: a, config: {} }, !1 !== CKEDITOR.fire("inline", h) && CKEDITOR.inline(a, h.config))
                }; CKEDITOR.domReady(function () { !CKEDITOR.disableAutoInline && CKEDITOR.inlineAll() })
            })(); CKEDITOR.replaceClass = "ckeditor"; (function () {
                function a(a, d, m, k) {
                    a = CKEDITOR.editor._getEditorElement(a); if (!a) return null; if (CKEDITOR.editor.shouldDelayEditorCreation(a, d)) return CKEDITOR.editor.initializeDelayedEditorCreation(a, d, "replace"); var l = new CKEDITOR.editor(d, a,
                        k); k == CKEDITOR.ELEMENT_MODE_REPLACE && (a.setStyle("visibility", "hidden"), l._.required = a.hasAttribute("required"), a.removeAttribute("required")); m && l.setData(m, null, !0); l.on("loaded", function () { l.isDestroyed() || l.isDetached() || (f(l), k == CKEDITOR.ELEMENT_MODE_REPLACE && l.config.autoUpdateElement && a.$.form && l._attachToForm(), l.setMode(l.config.startupMode, function () { l.resetDirty(); l.status = "ready"; l.fireOnce("instanceReady"); CKEDITOR.fire("instanceReady", null, l) })) }); l.on("destroy", h); return l
                } function h() {
                    var a =
                        this.container, d = this.element; a && (a.clearCustomData(), a.remove()); d && (d.clearCustomData(), this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (d.show(), this._.required && d.setAttribute("required", "required")), delete this.element)
                } function f(a) {
                    var d = a.name, f = a.element, k = a.elementMode, h = a.fire("uiSpace", { space: "top", html: "" }).html, g = a.fire("uiSpace", { space: "bottom", html: "" }).html, e = new CKEDITOR.template('\x3c{outerEl} id\x3d"cke_{name}" class\x3d"{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' +
                        CKEDITOR.env.cssClass + '"  dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"application"' + (a.applicationTitle ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : "") + "\x3e" + (a.applicationTitle ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : "") + '\x3c{outerEl} class\x3d"cke_inner cke_reset" role\x3d"presentation"\x3e{topHtml}\x3c{outerEl} id\x3d"{contentId}" class\x3d"cke_contents cke_reset" role\x3d"presentation"\x3e\x3c/{outerEl}\x3e{bottomHtml}\x3c/{outerEl}\x3e\x3c/{outerEl}\x3e'),
                        d = CKEDITOR.dom.element.createFromHtml(e.output({ id: a.id, name: d, langDir: a.lang.dir, langCode: a.langCode, voiceLabel: a.applicationTitle, topHtml: h ? '\x3cspan id\x3d"' + a.ui.spaceId("top") + '" class\x3d"cke_top cke_reset_all" role\x3d"presentation" style\x3d"height:auto"\x3e' + h + "\x3c/span\x3e" : "", contentId: a.ui.spaceId("contents"), bottomHtml: g ? '\x3cspan id\x3d"' + a.ui.spaceId("bottom") + '" class\x3d"cke_bottom cke_reset_all" role\x3d"presentation"\x3e' + g + "\x3c/span\x3e" : "", outerEl: CKEDITOR.env.ie ? "span" : "div" }));
                    k == CKEDITOR.ELEMENT_MODE_REPLACE ? (f.hide(), d.insertAfter(f)) : f.append(d); a.container = d; a.ui.contentsElement = a.ui.space("contents"); h && a.ui.space("top").unselectable(); g && a.ui.space("bottom").unselectable(); f = a.config.width; k = a.config.height; f && d.setStyle("width", CKEDITOR.tools.cssLength(f)); k && a.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(k)); d.disableContextMenu(); CKEDITOR.env.webkit && d.on("focus", function () { a.focus() }); a.fireOnce("uiReady")
                } CKEDITOR.replace = function (b, d) {
                    return a(b,
                        d, null, CKEDITOR.ELEMENT_MODE_REPLACE)
                }; CKEDITOR.appendTo = function (b, d, f) { return a(b, d, f, CKEDITOR.ELEMENT_MODE_APPENDTO) }; CKEDITOR.replaceAll = function () { for (var a = document.getElementsByTagName("textarea"), d = 0; d < a.length; d++) { var f = null, k = a[d]; if (k.name || k.id) { if ("string" == typeof arguments[0]) { if (!(new RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)")).test(k.className)) continue } else if ("function" == typeof arguments[0] && (f = {}, !1 === arguments[0](k, f))) continue; this.replace(k, f) } } }; CKEDITOR.editor.prototype.addMode =
                    function (a, d) { (this._.modes || (this._.modes = {}))[a] = d }; CKEDITOR.editor.prototype.setMode = function (a, d) {
                        var f = this, k = this._.modes; if (a != f.mode && k && k[a]) {
                            f.fire("beforeSetMode", a); if (f.mode) { var h = f.checkDirty(), k = f._.previousModeData, g, e = 0; f.fire("beforeModeUnload"); f.editable(0); f._.previousMode = f.mode; f._.previousModeData = g = f.getData(1); "source" == f.mode && k == g && (f.fire("lockSnapshot", { forceUpdate: !0 }), e = 1); f.ui.space("contents").setHtml(""); f.mode = "" } else f._.previousModeData = f.getData(1); this._.modes[a](function () {
                                f.mode =
                                    a; void 0 !== h && !h && f.resetDirty(); e ? f.fire("unlockSnapshot") : "wysiwyg" == a && f.fire("saveSnapshot"); setTimeout(function () { f.isDestroyed() || f.isDetached() || (f.fire("mode"), d && d.call(f)) }, 0)
                            })
                        }
                    }; CKEDITOR.editor.prototype.resize = function (a, d, f, k) {
                        var h = this.container, g = this.ui.space("contents"), e = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement; k = k ? this.container.getFirst(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner") }) : h; if (a || 0 === a) a = CKEDITOR.tools.convertToPx(CKEDITOR.tools.cssLength(a));
                        k.setSize("width", a, !0); e && (e.style.width = "1%"); d = CKEDITOR.tools.convertToPx(CKEDITOR.tools.cssLength(d)); var c = (k.$.offsetHeight || 0) - (g.$.clientHeight || 0), h = Math.max(d - (f ? 0 : c), 0); d = f ? d + c : d; g.setStyle("height", CKEDITOR.tools.cssLength(h)); e && (e.style.width = "100%"); this.fire("resize", { outerHeight: d, contentsHeight: h, outerWidth: a || k.getSize("width") })
                    }; CKEDITOR.editor.prototype.getResizable = function (a) { return a ? this.ui.space("contents") : this.container }; CKEDITOR.domReady(function () {
                        CKEDITOR.replaceClass &&
                            CKEDITOR.replaceAll(CKEDITOR.replaceClass)
                    })
            })(); CKEDITOR.config.startupMode = "wysiwyg"; (function () {
                function a(a) {
                    var c = a.editor, e = a.data.path, d = e.blockLimit, f = a.data.selection, k = f.getRanges()[0], m; if (CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller) if (f = h(f, e)) f.appendBogus(), m = CKEDITOR.env.ie && !CKEDITOR.env.edge || CKEDITOR.env.edge && c._.previousActive; g(c, e.block, d) && k.collapsed && !k.getCommonAncestor().isReadOnly() && (e = k.clone(), e.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), d = new CKEDITOR.dom.walker(e),
                        d.guard = function (a) { return !b(a) || a.type == CKEDITOR.NODE_COMMENT || a.isReadOnly() }, !d.checkForward() || e.checkStartOfBlock() && e.checkEndOfBlock()) && (c = k.fixBlock(!0, c.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p"), CKEDITOR.env.needsBrFiller || (c = c.getFirst(b)) && c.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(c.getText()).match(/^(?:&nbsp;|\xa0)$/) && c.remove(), m = 1, a.cancel()); m && k.select()
                } function h(a, c) {
                    if (a.isFake) return 0; var e = c.block || c.blockLimit, g = e && e.getLast(b); if (!(!e || !e.isBlockBoundary() ||
                        g && g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary() || e.is("pre") || e.getBogus())) return e
                } function f(a) { var b = a.data.getTarget(); b.is("input") && (b = b.getAttribute("type"), "submit" != b && "reset" != b || a.data.preventDefault()) } function b(a) { return x(a) && u(a) } function d(a, b) { return function (c) { var e = c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget; (e = e && e.nodeType == CKEDITOR.NODE_ELEMENT ? new CKEDITOR.dom.element(e) : null) && (b.equals(e) || b.contains(e)) || a.call(this, c) } } function m(a) {
                    return !!a.getRanges()[0].startPath().contains({
                        table: 1,
                        ul: 1, ol: 1, dl: 1
                    })
                } function k(a) { function c(a) { var g = { table: 1, ul: 1, ol: 1, dl: 1 }; return function (c, d) { d && c.type == CKEDITOR.NODE_ELEMENT && c.is(g) && (e = c); if (!(d || !b(c) || a && t(c))) return !1 } } var e, g = a.getRanges()[0], d = a.root; return m(a) && (a = g.clone(), a.collapse(1), a.setStartAt(d, CKEDITOR.POSITION_AFTER_START), d = new CKEDITOR.dom.walker(a), d.guard = c(), d.checkBackward(), e) ? (a = g.clone(), a.collapse(), a.setEndAt(e, CKEDITOR.POSITION_AFTER_END), d = new CKEDITOR.dom.walker(a), d.guard = c(!0), e = !1, d.checkForward(), e) : null }
                function l(a) { return a.block.getParent().getChildCount() } function g(a, b, c) { return !1 !== a.config.autoParagraph && a.activeEnterMode != CKEDITOR.ENTER_BR && (a.editable().equals(c) && !b || b && "true" == b.getAttribute("contenteditable")) } function e(a) { return a.activeEnterMode != CKEDITOR.ENTER_BR && !1 !== a.config.autoParagraph ? a.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : !1 } function c(a) { a && a.isEmptyInlineRemoveable() && a.remove() } function n(a) {
                    var b = a.editor; b.getSelection().scrollIntoView(); setTimeout(function () { b.fire("saveSnapshot") },
                        0)
                } function r(a, b, c) { var e = a.getCommonAncestor(b); for (b = a = c ? b : a; (a = a.getParent()) && !e.equals(a) && 1 == a.getChildCount();)b = a; b.remove() } var x, u, p, t, A, q, B, z, y, v, C = { ul: 1, ol: 1, dl: 1 }; CKEDITOR.editable = CKEDITOR.tools.createClass({
                    base: CKEDITOR.dom.element, $: function (a, b) { this.base(b.$ || b); this.editor = a; this.status = "unloaded"; this.hasFocus = !1; this.setup() }, proto: {
                        focus: function () {
                            var a; if (CKEDITOR.env.webkit && !this.hasFocus && (a = this.editor._.previousActive || this.getDocument().getActive(), this.contains(a))) {
                                a.focus();
                                return
                            } CKEDITOR.env.edge && 14 < CKEDITOR.env.version && !this.hasFocus && this.getDocument().equals(CKEDITOR.document) && (this.editor._.previousScrollTop = this.$.scrollTop); try { if (!CKEDITOR.env.ie || CKEDITOR.env.edge && 14 < CKEDITOR.env.version || !this.getDocument().equals(CKEDITOR.document)) if (CKEDITOR.env.chrome) { var b = this.$.scrollTop; this.$.focus(); this.$.scrollTop = b } else this.$.focus(); else this.$.setActive() } catch (c) { if (!CKEDITOR.env.ie) throw c; } CKEDITOR.env.safari && !this.isInline() && (a = CKEDITOR.document.getActive(),
                                a.equals(this.getWindow().getFrame()) || this.getWindow().focus())
                        }, on: function (a, b) { var c = Array.prototype.slice.call(arguments, 0); CKEDITOR.env.ie && /^focus|blur$/.exec(a) && (a = "focus" == a ? "focusin" : "focusout", b = d(b, this), c[0] = a, c[1] = b); return CKEDITOR.dom.element.prototype.on.apply(this, c) }, attachListener: function (a) { !this._.listeners && (this._.listeners = []); var b = Array.prototype.slice.call(arguments, 1), b = a.on.apply(a, b); this._.listeners.push(b); return b }, clearListeners: function () {
                            var a = this._.listeners;
                            try { for (; a.length;)a.pop().removeListener() } catch (b) { }
                        }, restoreAttrs: function () { var a = this._.attrChanges, b, c; for (c in a) a.hasOwnProperty(c) && (b = a[c], null !== b ? this.setAttribute(c, b) : this.removeAttribute(c)) }, attachClass: function (a) { var b = this.getCustomData("classes"); this.hasClass(a) || (!b && (b = []), b.push(a), this.setCustomData("classes", b), this.addClass(a)) }, changeAttr: function (a, b) {
                            var c = this.getAttribute(a); b !== c && (!this._.attrChanges && (this._.attrChanges = {}), a in this._.attrChanges || (this._.attrChanges[a] =
                                c), this.setAttribute(a, b))
                        }, insertText: function (a) { this.editor.focus(); this.insertHtml(this.transformPlainTextToHtml(a), "text") }, transformPlainTextToHtml: function (a) { var b = this.editor.getSelection().getStartElement().hasAscendant("pre", !0) ? CKEDITOR.ENTER_BR : this.editor.activeEnterMode; return CKEDITOR.tools.transformPlainTextToHtml(a, b) }, insertHtml: function (a, b, c) {
                            var e = this.editor; e.focus(); e.fire("saveSnapshot"); c || (c = e.getSelection().getRanges()[0]); q(this, b || "html", a, c); c.select(); n(this); this.editor.fire("afterInsertHtml",
                                {})
                        }, insertHtmlIntoRange: function (a, b, c) { q(this, c || "html", a, b); this.editor.fire("afterInsertHtml", { intoRange: b }) }, insertElement: function (a, c) {
                            var e = this.editor; e.focus(); e.fire("saveSnapshot"); var g = e.activeEnterMode, e = e.getSelection(), d = a.getName(), d = CKEDITOR.dtd.$block[d]; c || (c = e.getRanges()[0]); this.insertElementIntoRange(a, c) && (c.moveToPosition(a, CKEDITOR.POSITION_AFTER_END), d && ((d = a.getNext(function (a) { return b(a) && !t(a) })) && d.type == CKEDITOR.NODE_ELEMENT && d.is(CKEDITOR.dtd.$block) ? d.getDtd()["#"] ?
                                c.moveToElementEditStart(d) : c.moveToElementEditEnd(a) : d || g == CKEDITOR.ENTER_BR || (d = c.fixBlock(!0, g == CKEDITOR.ENTER_DIV ? "div" : "p"), c.moveToElementEditStart(d)))); e.selectRanges([c]); n(this)
                        }, insertElementIntoSelection: function (a) { this.insertElement(a) }, insertElementIntoRange: function (a, b) {
                            var e = this.editor, g = e.config.enterMode, d = a.getName(), f = CKEDITOR.dtd.$block[d]; if (b.checkReadOnly()) return !1; b.deleteContents(1); b.startContainer.type == CKEDITOR.NODE_ELEMENT && (b.startContainer.is({
                                tr: 1, table: 1, tbody: 1,
                                thead: 1, tfoot: 1
                            }) ? B(b) : b.startContainer.is(CKEDITOR.dtd.$list) && z(b)); var k, h; if (f) for (; (k = b.getCommonAncestor(0, 1)) && (h = CKEDITOR.dtd[k.getName()]) && (!h || !h[d]);)if (k.getName() in CKEDITOR.dtd.span) { var f = b.splitElement(k), m = b.createBookmark(); c(k); c(f); b.moveToBookmark(m) } else b.checkStartOfBlock() && b.checkEndOfBlock() ? (b.setStartBefore(k), b.collapse(!0), k.remove()) : b.splitBlock(g == CKEDITOR.ENTER_DIV ? "div" : "p", e.editable()); b.insertNode(a); return !0
                        }, setData: function (a, b) {
                            b || (a = this.editor.dataProcessor.toHtml(a));
                            this.setHtml(a); this.fixInitialSelection(); "unloaded" == this.status && (this.status = "ready"); this.editor.fire("dataReady")
                        }, getData: function (a) { var b = this.getHtml(); a || (b = this.editor.dataProcessor.toDataFormat(b)); return b }, setReadOnly: function (a) { this.setAttribute("contenteditable", String(!a)); this.setAttribute("aria-readonly", String(a)) }, detach: function () {
                            this.status = "detached"; this.editor.setData(this.editor.getData(), { internal: !0 }); this.clearListeners(); try { this._.cleanCustomData() } catch (a) {
                                if (!CKEDITOR.env.ie ||
                                    -2146828218 !== a.number) throw a;
                            } this.editor.fire("contentDomUnload"); delete this.editor.document; delete this.editor.window; delete this.editor
                        }, isInline: function () { return this.getDocument().equals(CKEDITOR.document) }, fixInitialSelection: function () {
                            function a() {
                                var b = c.getDocument().$, e = b.getSelection(), g; a: if (e.anchorNode && e.anchorNode == c.$) g = !0; else { if (CKEDITOR.env.webkit && (g = c.getDocument().getActive()) && g.equals(c) && !e.anchorNode) { g = !0; break a } g = void 0 } g && (g = new CKEDITOR.dom.range(c), g.moveToElementEditStart(c),
                                    b = b.createRange(), b.setStart(g.startContainer.$, g.startOffset), b.collapse(!0), e.removeAllRanges(), e.addRange(b))
                            } function b() { var a = c.getDocument().$, e = a.selection, g = c.getDocument().getActive(); "None" == e.type && g.equals(c) && (e = new CKEDITOR.dom.range(c), a = a.body.createTextRange(), e.moveToElementEditStart(c), e = e.startContainer, e.type != CKEDITOR.NODE_ELEMENT && (e = e.getParent()), a.moveToElementText(e.$), a.collapse(!0), a.select()) } var c = this; if (CKEDITOR.env.ie && (9 > CKEDITOR.env.version || CKEDITOR.env.quirks)) this.hasFocus &&
                                (this.focus(), b()); else if (this.hasFocus) this.focus(), a(); else this.once("focus", function () { a() }, null, null, -999)
                        }, getHtmlFromRange: function (a) { if (a.collapsed) return new CKEDITOR.dom.documentFragment(a.document); a = { doc: this.getDocument(), range: a.clone() }; y.eol.detect(a, this); y.bogus.exclude(a); y.cell.shrink(a); a.fragment = a.range.cloneContents(); y.tree.rebuild(a, this); y.eol.fix(a, this); return new CKEDITOR.dom.documentFragment(a.fragment.$) }, extractHtmlFromRange: function (a, b) {
                            var c = v, e = { range: a, doc: a.document },
                                g = this.getHtmlFromRange(a); if (a.collapsed) return a.optimize(), g; a.enlarge(CKEDITOR.ENLARGE_INLINE, 1); c.table.detectPurge(e); e.bookmark = a.createBookmark(); delete e.range; var d = this.editor.createRange(); d.moveToPosition(e.bookmark.startNode, CKEDITOR.POSITION_BEFORE_START); e.targetBookmark = d.createBookmark(); c.list.detectMerge(e, this); c.table.detectRanges(e, this); c.block.detectMerge(e, this); e.tableContentsRanges ? (c.table.deleteRanges(e), a.moveToBookmark(e.bookmark), e.range = a) : (a.moveToBookmark(e.bookmark),
                                    e.range = a, a.extractContents(c.detectExtractMerge(e))); a.moveToBookmark(e.targetBookmark); a.optimize(); c.fixUneditableRangePosition(a); c.list.merge(e, this); c.table.purge(e, this); c.block.merge(e, this); if (b) { c = a.startPath(); if (e = a.checkStartOfBlock() && a.checkEndOfBlock() && c.block && !a.root.equals(c.block)) { a: { var e = c.block.getElementsByTag("span"), d = 0, f; if (e) for (; f = e.getItem(d++);)if (!u(f)) { e = !0; break a } e = !1 } e = !e } e && (a.moveToPosition(c.block, CKEDITOR.POSITION_BEFORE_START), c.block.remove()) } else c.autoParagraph(this.editor,
                                        a), p(a.startContainer) && a.startContainer.appendBogus(); a.startContainer.mergeSiblings(); return g
                        }, setup: function () {
                            var a = this.editor; this.attachListener(a, "beforeGetData", function () { var b = this.getData(); this.is("textarea") || !1 !== a.config.ignoreEmptyParagraph && (b = b.replace(A, function (a, b) { return b })); a.setData(b, null, 1) }, this); this.attachListener(a, "getSnapshot", function (a) { a.data = this.getData(1) }, this); this.attachListener(a, "afterSetData", function () { this.setData(a.getData(1)) }, this); this.attachListener(a,
                                "loadSnapshot", function (a) { this.setData(a.data, 1) }, this); this.attachListener(a, "beforeFocus", function () { var b = a.getSelection(); (b = b && b.getNative()) && "Control" == b.type || this.focus() }, this); this.attachListener(a, "insertHtml", function (a) { this.insertHtml(a.data.dataValue, a.data.mode, a.data.range) }, this); this.attachListener(a, "insertElement", function (a) { this.insertElement(a.data) }, this); this.attachListener(a, "insertText", function (a) { this.insertText(a.data) }, this); this.setReadOnly(a.readOnly); this.attachClass("cke_editable");
                            a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? this.attachClass("cke_editable_inline") : a.elementMode != CKEDITOR.ELEMENT_MODE_REPLACE && a.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || this.attachClass("cke_editable_themed"); this.attachClass("cke_contents_" + a.config.contentsLangDirection); a.keystrokeHandler.blockedKeystrokes[8] = +a.readOnly; a.keystrokeHandler.attach(this); this.on("blur", function () { this.hasFocus = !1 }, null, null, -1); this.on("focus", function () { this.hasFocus = !0 }, null, null, -1); if (CKEDITOR.env.webkit) this.on("scroll",
                                function () { a._.previousScrollTop = a.editable().$.scrollTop }, null, null, -1); if (CKEDITOR.env.edge && 14 < CKEDITOR.env.version) { var c = function () { var b = a.editable(); null != a._.previousScrollTop && b.getDocument().equals(CKEDITOR.document) && (b.$.scrollTop = a._.previousScrollTop, a._.previousScrollTop = null, this.removeListener("scroll", c)) }; this.on("scroll", c) } a.focusManager.add(this); this.equals(CKEDITOR.document.getActive()) && (this.hasFocus = !0, a.once("contentDom", function () { a.focusManager.focus(this) }, this)); this.isInline() &&
                                    this.changeAttr("tabindex", a.tabIndex); if (!this.is("textarea")) {
                                        a.document = this.getDocument(); a.window = this.getWindow(); var e = a.document; this.changeAttr("spellcheck", !a.config.disableNativeSpellChecker); var g = a.config.contentsLangDirection; this.getDirection(1) != g && this.changeAttr("dir", g); var d = CKEDITOR.getCss(); if (d) {
                                            var g = e.getHead(), h = g.getCustomData("stylesheet"); h ? d != h.getText() && (CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? h.$.styleSheet.cssText = d : h.setText(d)) : (d = e.appendStyleText(d), d = new CKEDITOR.dom.element(d.ownerNode ||
                                                d.owningElement), g.setCustomData("stylesheet", d), d.data("cke-temp", 1))
                                        } g = e.getCustomData("stylesheet_ref") || 0; e.setCustomData("stylesheet_ref", g + 1); this.setCustomData("cke_includeReadonly", !a.config.disableReadonlyStyling); this.attachListener(this, "click", function (a) { a = a.data; var b = (new CKEDITOR.dom.elementPath(a.getTarget(), this)).contains("a"); b && 2 != a.$.button && b.isReadOnly() && a.preventDefault() }); var n = { 8: 1, 46: 1 }; this.attachListener(a, "key", function (b) {
                                            if (a.readOnly) return !0; var c = b.data.domEvent.getKey(),
                                                e, g = a.getSelection(); if (0 !== g.getRanges().length) {
                                                    if (c in n) {
                                                        var d; b = g.getRanges()[0]; var f = b.startPath(), h, r, t, c = 8 == c, q = !1; if (CKEDITOR.env.ie && 11 > CKEDITOR.env.version && g.getSelectedElement()) d = g.getSelectedElement(); else if (m(g)) {
                                                            var v = new CKEDITOR.dom.walker(b), L = b.collapsed ? b.startContainer : v.next(), q = !1, H; if (b.checkStartOfBlock()) { H = b.startPath().block || b.startPath().blockLimit; var u = H.getName(); H = -1 !== CKEDITOR.tools.array.indexOf(["dd", "dt", "li"], u) && null === H.getPrevious() } else H = !1; if (H) {
                                                                for (; L &&
                                                                    !q;)q = L.$.nodeName.toLowerCase(), q = !!C[q], L = v.next(); v = l(b.startPath()); L = l(b.endPath()); q = q || v !== L
                                                            } else q = void 0; q || (d = k(g))
                                                        } d || q ? (a.fire("saveSnapshot"), q ? ((e = b.startContainer.getAscendant(C, !0)) ? (b.setStart(e, 0), b.enlarge(CKEDITOR.ENLARGE_ELEMENT), d = b) : d = null, d.deleteContents()) : (b.moveToPosition(d, CKEDITOR.POSITION_BEFORE_START), d.remove()), b.select(), a.fire("saveSnapshot"), e = 1) : b.collapsed && ((h = f.block) && (t = h[c ? "getPrevious" : "getNext"](x)) && t.type == CKEDITOR.NODE_ELEMENT && t.is("table") && b[c ? "checkStartOfBlock" :
                                                            "checkEndOfBlock"]() ? (a.fire("saveSnapshot"), b[c ? "checkEndOfBlock" : "checkStartOfBlock"]() && h.remove(), b["moveToElementEdit" + (c ? "End" : "Start")](t), b.select(), a.fire("saveSnapshot"), e = 1) : f.blockLimit && f.blockLimit.is("td") && (r = f.blockLimit.getAscendant("table")) && b.checkBoundaryOfElement(r, c ? CKEDITOR.START : CKEDITOR.END) && (t = r[c ? "getPrevious" : "getNext"](x)) ? (a.fire("saveSnapshot"), b["moveToElementEdit" + (c ? "End" : "Start")](t), b.checkStartOfBlock() && b.checkEndOfBlock() ? t.remove() : b.select(), a.fire("saveSnapshot"),
                                                                e = 1) : (r = f.contains(["td", "th", "caption"])) && b.checkBoundaryOfElement(r, c ? CKEDITOR.START : CKEDITOR.END) && (e = 1))
                                                    } return !e
                                                }
                                        }); a.blockless && CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller && this.attachListener(this, "keyup", function (c) { c.data.getKeystroke() in n && !this.getFirst(b) && (this.appendBogus(), c = a.createRange(), c.moveToPosition(this, CKEDITOR.POSITION_AFTER_START), c.select()) }); this.attachListener(this, "dblclick", function (b) { if (a.readOnly) return !1; b = { element: b.data.getTarget() }; a.fire("doubleclick", b) });
                                        CKEDITOR.env.ie && this.attachListener(this, "click", f); CKEDITOR.env.ie && !CKEDITOR.env.edge || this.attachListener(this, "mousedown", function (b) { var c = b.data.getTarget(); c.is("img", "hr", "input", "textarea", "select") && !c.isReadOnly() && (a.getSelection().selectElement(c), c.is("input", "textarea", "select") && b.data.preventDefault()) }); CKEDITOR.env.edge && this.attachListener(this, "mouseup", function (b) { (b = b.data.getTarget()) && b.is("img") && !b.isReadOnly() && a.getSelection().selectElement(b) }); CKEDITOR.env.gecko && this.attachListener(this,
                                            "mouseup", function (b) { if (2 == b.data.$.button && (b = b.data.getTarget(), !b.getAscendant("table") && !b.getOuterHtml().replace(A, ""))) { var c = a.createRange(); c.moveToElementEditStart(b); c.select(!0) } }); CKEDITOR.env.webkit && (this.attachListener(this, "click", function (a) { a.data.getTarget().is("input", "select") && a.data.preventDefault() }), this.attachListener(this, "mouseup", function (a) { a.data.getTarget().is("input", "textarea") && a.data.preventDefault() })); CKEDITOR.env.webkit && this.attachListener(a, "key", function (b) {
                                                if (a.readOnly) return !0;
                                                var c = b.data.domEvent.getKey(); if (c in n && (b = a.getSelection(), 0 !== b.getRanges().length)) {
                                                    var c = 8 == c, e = b.getRanges()[0]; b = e.startPath(); if (e.collapsed) a: {
                                                        var g = b.block; if (g && e[c ? "checkStartOfBlock" : "checkEndOfBlock"](!0) && e.moveToClosestEditablePosition(g, !c) && e.collapsed) {
                                                            if (e.startContainer.type == CKEDITOR.NODE_ELEMENT) { var d = e.startContainer.getChild(e.startOffset - (c ? 1 : 0)); if (d && d.type == CKEDITOR.NODE_ELEMENT && d.is("hr")) { a.fire("saveSnapshot"); d.remove(); b = !0; break a } } e = e.startPath().block; if (!e ||
                                                                e && e.contains(g)) b = void 0; else { a.fire("saveSnapshot"); var f; (f = (c ? e : g).getBogus()) && f.remove(); f = a.getSelection(); d = f.createBookmarks(); (c ? g : e).moveChildren(c ? e : g, !1); b.lastElement.mergeSiblings(); r(g, e, !c); f.selectBookmarks(d); b = !0 }
                                                        } else b = !1
                                                    } else c = e, f = b.block, e = c.endPath().block, f && e && !f.equals(e) ? (a.fire("saveSnapshot"), (g = f.getBogus()) && g.remove(), c.enlarge(CKEDITOR.ENLARGE_INLINE), c.deleteContents(), e.getParent() && (e.moveChildren(f, !1), b.lastElement.mergeSiblings(), r(f, e, !0)), c = a.getSelection().getRanges()[0],
                                                        c.collapse(1), c.optimize(), "" === c.startContainer.getHtml() && c.startContainer.appendBogus(), c.select(), b = !0) : b = !1; if (!b) return; a.getSelection().scrollIntoView(); a.fire("saveSnapshot"); return !1
                                                }
                                            }, this, null, 100)
                                    }
                        }, getUniqueId: function () { var a; try { this._.expandoNumber = a = CKEDITOR.dom.domObject.prototype.getUniqueId.call(this) } catch (b) { a = this._ && this._.expandoNumber } return a }
                    }, _: {
                        cleanCustomData: function () {
                            this.removeClass("cke_editable"); this.restoreAttrs(); for (var a = this.removeCustomData("classes"); a &&
                                a.length;)this.removeClass(a.pop()); if (!this.is("textarea")) { var a = this.getDocument(), b = a.getHead(); if (b.getCustomData("stylesheet")) { var c = a.getCustomData("stylesheet_ref"); --c ? a.setCustomData("stylesheet_ref", c) : (a.removeCustomData("stylesheet_ref"), b.removeCustomData("stylesheet").remove()) } }
                        }
                    }
                }); CKEDITOR.editor.prototype.editable = function (a) {
                    var b = this._.editable; if (b && a) return 0; if (!arguments.length) return b; a ? b = a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), b =
                        null); return this._.editable = b
                }; CKEDITOR.on("instanceLoaded", function (b) {
                    var c = b.editor; c.on("insertElement", function (a) { a = a.data; a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") || a.is("textarea")) && ("false" != a.getAttribute("contentEditable") && a.data("cke-editable", a.hasAttribute("contenteditable") ? "true" : "1"), a.setAttribute("contentEditable", !1)) }); c.on("selectionChange", function (b) {
                        if (!c.readOnly) {
                            var e = c.getSelection(); e && !e.isLocked && (e = c.checkDirty(), c.fire("lockSnapshot"), a(b), c.fire("unlockSnapshot"),
                                !e && c.resetDirty())
                        }
                    })
                }); CKEDITOR.on("instanceCreated", function (a) {
                    var b = a.editor; b.on("mode", function () {
                        var a = b.editable(); if (a && a.isInline()) {
                            var c = b.title; a.changeAttr("role", "textbox"); a.changeAttr("aria-multiline", "true"); c && a.changeAttr("aria-label", c); c && a.changeAttr("title", c); var e = b.fire("ariaEditorHelpLabel", {}).label; if (e && (c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents"))) {
                                var g = CKEDITOR.tools.getNextId(), e = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' +
                                    g + '" class\x3d"cke_voice_label"\x3e' + e + "\x3c/span\x3e"); c.append(e); a.changeAttr("aria-describedby", g)
                            }
                        }
                    })
                }); CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}"); x = CKEDITOR.dom.walker.whitespaces(!0); u = CKEDITOR.dom.walker.bookmark(!1, !0); p = CKEDITOR.dom.walker.empty(); t = CKEDITOR.dom.walker.bogus(); A = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi; q =
                    function () {
                        function a(b) { return b.type == CKEDITOR.NODE_ELEMENT } function d(b, c) {
                            var e, g, f, k, h = [], m = c.range.startContainer; e = c.range.startPath(); for (var m = n[m.getName()], l = 0, r = b.getChildren(), M = r.count(), t = -1, q = -1, x = 0, v = e.contains(n.$list); l < M; ++l)e = r.getItem(l), a(e) ? (f = e.getName(), v && f in CKEDITOR.dtd.$list ? h = h.concat(d(e, c)) : (k = !!m[f], "br" != f || !e.data("cke-eol") || l && l != M - 1 || (x = (g = l ? h[l - 1].node : r.getItem(l + 1)) && (!a(g) || !g.is("br")), g = g && a(g) && n.$block[g.getName()]), -1 != t || k || (t = l), k || (q = l), h.push({
                                isElement: 1,
                                isLineBreak: x, isBlock: e.isBlockBoundary(), hasBlockSibling: g, node: e, name: f, allowed: k
                            }), g = x = 0)) : h.push({ isElement: 0, node: e, allowed: 1 }); -1 < t && (h[t].firstNotAllowed = 1); -1 < q && (h[q].lastNotAllowed = 1); return h
                        } function f(b, c) { var e = [], g = b.getChildren(), d = g.count(), k, h = 0, m = n[c], l = !b.is(n.$inline) || b.is("br"); for (l && e.push(" "); h < d; h++)k = g.getItem(h), a(k) && !k.is(m) ? e = e.concat(f(k, c)) : e.push(k); l && e.push(" "); return e } function k(b) { return a(b.startContainer) && b.startContainer.getChild(b.startOffset - 1) } function h(b) {
                            return b &&
                                a(b) && (b.is(n.$removeEmpty) || b.is("a") && !b.isBlockBoundary())
                        } function m(b, c, e, g) { var d = b.clone(), f, k; d.setEndAt(c, CKEDITOR.POSITION_BEFORE_END); (f = (new CKEDITOR.dom.walker(d)).next()) && a(f) && r[f.getName()] && (k = f.getPrevious()) && a(k) && !k.getParent().equals(b.startContainer) && e.contains(k) && g.contains(f) && f.isIdentical(k) && (f.moveChildren(k), f.remove(), m(b, c, e, g)) } function l(b, c) {
                            function e(b, c) { if (c.isBlock && c.isElement && !c.node.is("br") && a(b) && b.is("br")) return b.remove(), 1 } var g = c.endContainer.getChild(c.endOffset),
                                d = c.endContainer.getChild(c.endOffset - 1); g && e(g, b[b.length - 1]); d && e(d, b[0]) && (c.setEnd(c.endContainer, c.endOffset - 1), c.collapse())
                        } var n = CKEDITOR.dtd, r = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, ul: 1, ol: 1, li: 1, pre: 1, dl: 1, blockquote: 1 }, t = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, M = CKEDITOR.tools.extend({}, n.$inline); delete M.br; return function (r, q, x, v) {
                            var u = r.editor, p = !1, z; "unfiltered_html" == q && (q = "html", p = !0); if (!v.checkReadOnly()) {
                                var y = (new CKEDITOR.dom.elementPath(v.startContainer, v.root)).blockLimit ||
                                    v.root; q = { type: q, dontFilter: p, editable: r, editor: u, range: v, blockLimit: y, mergeCandidates: [], zombies: [] }; var p = q.range, y = q.mergeCandidates, B = "html" === q.type, E, C, w, Z, aa; "text" == q.type && p.shrink(CKEDITOR.SHRINK_ELEMENT, !0, !1) && (C = CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", p.document), p.insertNode(C), p.setStartAfter(C)); w = new CKEDITOR.dom.elementPath(p.startContainer); q.endPath = Z = new CKEDITOR.dom.elementPath(p.endContainer); if (!p.collapsed) {
                                        E = Z.block || Z.blockLimit; var ca = p.getCommonAncestor();
                                        E && !E.equals(ca) && !E.contains(ca) && p.checkEndOfBlock() && q.zombies.push(E); p.deleteContents()
                                    } for (; (aa = k(p)) && a(aa) && aa.isBlockBoundary() && w.contains(aa);)p.moveToPosition(aa, CKEDITOR.POSITION_BEFORE_END); m(p, q.blockLimit, w, Z); C && (p.setEndBefore(C), p.collapse(), C.remove()); C = p.startPath(); if (E = C.contains(h, !1, 1)) z = p.splitElement(E), q.inlineStylesRoot = E, q.inlineStylesPeak = C.lastElement; C = p.createBookmark(); B && (c(E), c(z)); (E = C.startNode.getPrevious(b)) && a(E) && h(E) && y.push(E); (E = C.startNode.getNext(b)) &&
                                        a(E) && h(E) && y.push(E); for (E = C.startNode; (E = E.getParent()) && h(E);)y.push(E); p.moveToBookmark(C); z = r.getHtml(); z = "" === z || z.match(A); u.enterMode === CKEDITOR.ENTER_DIV && z && ((u = r.getFirst()) && u.remove(), v.setStartAt(r, CKEDITOR.POSITION_AFTER_START), v.collapse(!0)); if (r = x) {
                                            r = q.range; if ("text" == q.type && q.inlineStylesRoot) { v = q.inlineStylesPeak; u = v.getDocument().createText("{cke-peak}"); for (z = q.inlineStylesRoot.getParent(); !v.equals(z);)u = u.appendTo(v.clone()), v = v.getParent(); x = u.getOuterHtml().split("{cke-peak}").join(x) } v =
                                                q.blockLimit.getName(); if (/^\s+|\s+$/.test(x) && "span" in CKEDITOR.dtd[v]) { var V = '\x3cspan data-cke-marker\x3d"1"\x3e\x26nbsp;\x3c/span\x3e'; x = V + x + V } x = q.editor.dataProcessor.toHtml(x, { context: null, fixForBody: !1, protectedWhitespaces: !!V, dontFilter: q.dontFilter, filter: q.editor.activeFilter, enterMode: q.editor.activeEnterMode }); v = r.document.createElement("body"); v.setHtml(x); V && (v.getFirst().remove(), v.getLast().remove()); if ((V = r.startPath().block) && (1 != V.getChildCount() || !V.getBogus())) a: {
                                                    var Q; if (1 ==
                                                        v.getChildCount() && a(Q = v.getFirst()) && Q.is(t) && !Q.hasAttribute("contenteditable")) { V = Q.getElementsByTag("*"); r = 0; for (z = V.count(); r < z; r++)if (u = V.getItem(r), !u.is(M)) break a; Q.moveChildren(Q.getParent(1)); Q.remove() }
                                                } q.dataWrapper = v; r = x
                                        } if (r) {
                                            Q = q.range; r = Q.document; v = q.blockLimit; z = 0; var J, V = [], ea, R; x = C = 0; var ba, u = Q.startContainer; aa = q.endPath.elements[0]; var W, p = aa.getPosition(u), y = !!aa.getCommonAncestor(u) && p != CKEDITOR.POSITION_IDENTICAL && !(p & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED),
                                                u = d(q.dataWrapper, q); for (q.editor.enterMode !== CKEDITOR.ENTER_BR && l(u, Q); z < u.length; z++) {
                                                    p = u[z]; if (B = p.isLineBreak) B = Q, E = v, Z = w = void 0, p.hasBlockSibling ? B = 1 : (w = B.startContainer.getAscendant(n.$block, 1)) && w.is({ div: 1, p: 1 }) ? (Z = w.getPosition(E), Z == CKEDITOR.POSITION_IDENTICAL || Z == CKEDITOR.POSITION_CONTAINS ? B = 0 : (E = B.splitElement(w), B.moveToPosition(E, CKEDITOR.POSITION_AFTER_START), B = 1)) : B = 0; if (B) x = 0 < z; else {
                                                        B = Q.startPath(); !p.isBlock && g(q.editor, B.block, B.blockLimit) && (R = e(q.editor)) && (R = r.createElement(R),
                                                            R.appendBogus(), Q.insertNode(R), CKEDITOR.env.needsBrFiller && (J = R.getBogus()) && J.remove(), Q.moveToPosition(R, CKEDITOR.POSITION_BEFORE_END)); if ((B = Q.startPath().block) && !B.equals(ea)) { if (J = B.getBogus()) J.remove(), V.push(B); ea = B } p.firstNotAllowed && (C = 1); if (C && p.isElement) {
                                                                B = Q.startContainer; for (E = null; B && !n[B.getName()][p.name];) { if (B.equals(v)) { B = null; break } E = B; B = B.getParent() } if (B) E && (ba = Q.splitElement(E), q.zombies.push(ba), q.zombies.push(E)); else {
                                                                    E = v.getName(); W = !z; B = z == u.length - 1; E = f(p.node, E); w =
                                                                        []; Z = E.length; for (var ca = 0, la = void 0, ma = 0, na = -1; ca < Z; ca++)la = E[ca], " " == la ? (ma || W && !ca || (w.push(new CKEDITOR.dom.text(" ")), na = w.length), ma = 1) : (w.push(la), ma = 0); B && na == w.length && w.pop(); W = w
                                                                }
                                                            } if (W) { for (; B = W.pop();)Q.insertNode(B); W = 0 } else Q.insertNode(p.node); p.lastNotAllowed && z < u.length - 1 && ((ba = y ? aa : ba) && Q.setEndAt(ba, CKEDITOR.POSITION_AFTER_START), C = 0); Q.collapse()
                                                    }
                                                } 1 != u.length ? J = !1 : (J = u[0], J = J.isElement && "false" == J.node.getAttribute("contenteditable")); J && (x = !0, B = u[0].node, Q.setStartAt(B, CKEDITOR.POSITION_BEFORE_START),
                                                    Q.setEndAt(B, CKEDITOR.POSITION_AFTER_END)); q.dontMoveCaret = x; q.bogusNeededBlocks = V
                                        } J = q.range; var ga; W = q.bogusNeededBlocks; for (ea = J.createBookmark(); R = q.zombies.pop();)R.getParent() && (ba = J.clone(), ba.moveToElementEditStart(R), ba.removeEmptyBlocksAtEnd()); if (W) for (; R = W.pop();)CKEDITOR.env.needsBrFiller ? R.appendBogus() : R.append(J.document.createText(" ")); for (; R = q.mergeCandidates.pop();)R.mergeSiblings(); CKEDITOR.env.webkit && J.startPath() && (R = J.startPath(), R.block ? R.block.$.normalize() : R.blockLimit &&
                                            R.blockLimit.$.normalize()); J.moveToBookmark(ea); if (!q.dontMoveCaret) { for (R = k(J); R && a(R) && !R.is(n.$empty);) { if (R.isBlockBoundary()) J.moveToPosition(R, CKEDITOR.POSITION_BEFORE_END); else { if (h(R) && R.getHtml().match(/(\s|&nbsp;)$/g)) { ga = null; break } ga = J.clone(); ga.moveToPosition(R, CKEDITOR.POSITION_BEFORE_END) } R = R.getLast(b) } ga && J.moveToRange(ga) }
                            }
                        }
                    }(); B = function () {
                        function a(b) {
                            b = new CKEDITOR.dom.walker(b); b.guard = function (a, b) { if (b) return !1; if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$tableContent) };
                            b.evaluator = function (a) { return a.type == CKEDITOR.NODE_ELEMENT }; return b
                        } function b(a, c, e) { c = a.getDocument().createElement(c); a.append(c, e); return c } function c(a) { var b = a.count(), e; for (b; 0 < b--;)e = a.getItem(b), CKEDITOR.tools.trim(e.getHtml()) || (e.appendBogus(), CKEDITOR.env.ie && 9 > CKEDITOR.env.version && e.getChildCount() && e.getFirst().remove()) } return function (e) {
                            var g = e.startContainer, d = g.getAscendant("table", 1), f = !1; c(d.getElementsByTag("td")); c(d.getElementsByTag("th")); d = e.clone(); d.setStart(g, 0); d =
                                a(d).lastBackward(); d || (d = e.clone(), d.setEndAt(g, CKEDITOR.POSITION_BEFORE_END), d = a(d).lastForward(), f = !0); d || (d = g); d.is("table") ? (e.setStartAt(d, CKEDITOR.POSITION_BEFORE_START), e.collapse(!0), d.remove()) : (d.is({ tbody: 1, thead: 1, tfoot: 1 }) && (d = b(d, "tr", f)), d.is("tr") && (d = b(d, d.getParent().is("thead") ? "th" : "td", f)), (g = d.getBogus()) && g.remove(), e.moveToPosition(d, f ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END))
                        }
                    }(); z = function () {
                        function a(b) {
                            b = new CKEDITOR.dom.walker(b); b.guard = function (a,
                                b) { if (b) return !1; if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$list) || a.is(CKEDITOR.dtd.$listItem) }; b.evaluator = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$listItem) }; return b
                        } return function (b) {
                            var c = b.startContainer, e = !1, g; g = b.clone(); g.setStart(c, 0); g = a(g).lastBackward(); g || (g = b.clone(), g.setEndAt(c, CKEDITOR.POSITION_BEFORE_END), g = a(g).lastForward(), e = !0); g || (g = c); g.is(CKEDITOR.dtd.$list) ? (b.setStartAt(g, CKEDITOR.POSITION_BEFORE_START), b.collapse(!0), g.remove()) :
                                ((c = g.getBogus()) && c.remove(), b.moveToPosition(g, e ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END), b.select())
                        }
                    }(); y = {
                        eol: {
                            detect: function (a, b) {
                                var c = a.range, e = c.clone(), g = c.clone(), d = new CKEDITOR.dom.elementPath(c.startContainer, b), f = new CKEDITOR.dom.elementPath(c.endContainer, b); e.collapse(1); g.collapse(); d.block && e.checkBoundaryOfElement(d.block, CKEDITOR.END) && (c.setStartAfter(d.block), a.prependEolBr = 1); f.block && g.checkBoundaryOfElement(f.block, CKEDITOR.START) && (c.setEndBefore(f.block),
                                    a.appendEolBr = 1)
                            }, fix: function (a, b) { var c = b.getDocument(), e; a.appendEolBr && (e = this.createEolBr(c), a.fragment.append(e)); !a.prependEolBr || e && !e.getPrevious() || a.fragment.append(this.createEolBr(c), 1) }, createEolBr: function (a) { return a.createElement("br", { attributes: { "data-cke-eol": 1 } }) }
                        }, bogus: { exclude: function (a) { var b = a.range.getBoundaryNodes(), c = b.startNode, b = b.endNode; !b || !t(b) || c && c.equals(b) || a.range.setEndBefore(b) } }, tree: {
                            rebuild: function (a, b) {
                                var c = a.range, e = c.getCommonAncestor(), g = new CKEDITOR.dom.elementPath(e,
                                    b), d = new CKEDITOR.dom.elementPath(c.startContainer, b), c = new CKEDITOR.dom.elementPath(c.endContainer, b), f; e.type == CKEDITOR.NODE_TEXT && (e = e.getParent()); if (g.blockLimit.is({ tr: 1, table: 1 })) { var k = g.contains("table").getParent(); f = function (a) { return !a.equals(k) } } else if (g.block && g.block.is(CKEDITOR.dtd.$listItem) && (d = d.contains(CKEDITOR.dtd.$list), c = c.contains(CKEDITOR.dtd.$list), !d.equals(c))) { var h = g.contains(CKEDITOR.dtd.$list).getParent(); f = function (a) { return !a.equals(h) } } f || (f = function (a) {
                                        return !a.equals(g.block) &&
                                            !a.equals(g.blockLimit)
                                    }); this.rebuildFragment(a, b, e, f)
                            }, rebuildFragment: function (a, b, c, e) { for (var g; c && !c.equals(b) && e(c);)g = c.clone(0, 1), a.fragment.appendTo(g), a.fragment = g, c = c.getParent() }
                        }, cell: { shrink: function (a) { a = a.range; var b = a.startContainer, c = a.endContainer, e = a.startOffset, g = a.endOffset; b.type == CKEDITOR.NODE_ELEMENT && b.equals(c) && b.is("tr") && ++e == g && a.shrink(CKEDITOR.SHRINK_TEXT) } }
                    }; v = function () {
                        function a(b, c) { var e = b.getParent(); if (e.is(CKEDITOR.dtd.$inline)) b[c ? "insertBefore" : "insertAfter"](e) }
                        function b(c, e, g) { a(e); a(g, 1); for (var d; d = g.getNext();)d.insertAfter(e), e = d; p(c) && c.remove() } function c(a, b) { var e = new CKEDITOR.dom.range(a); e.setStartAfter(b.startNode); e.setEndBefore(b.endNode); return e } return {
                            list: {
                                detectMerge: function (a, b) {
                                    var e = c(b, a.bookmark), g = e.startPath(), d = e.endPath(), f = g.contains(CKEDITOR.dtd.$list), k = d.contains(CKEDITOR.dtd.$list); a.mergeList = f && k && f.getParent().equals(k.getParent()) && !f.equals(k); a.mergeListItems = g.block && d.block && g.block.is(CKEDITOR.dtd.$listItem) &&
                                        d.block.is(CKEDITOR.dtd.$listItem); if (a.mergeList || a.mergeListItems) e = e.clone(), e.setStartBefore(a.bookmark.startNode), e.setEndAfter(a.bookmark.endNode), a.mergeListBookmark = e.createBookmark()
                                }, merge: function (a, c) {
                                    if (a.mergeListBookmark) {
                                        var e = a.mergeListBookmark.startNode, g = a.mergeListBookmark.endNode, d = new CKEDITOR.dom.elementPath(e, c), f = new CKEDITOR.dom.elementPath(g, c); if (a.mergeList) { var k = d.contains(CKEDITOR.dtd.$list), h = f.contains(CKEDITOR.dtd.$list); k.equals(h) || (h.moveChildren(k), h.remove()) } a.mergeListItems &&
                                            (d = d.contains(CKEDITOR.dtd.$listItem), f = f.contains(CKEDITOR.dtd.$listItem), d.equals(f) || b(f, e, g)); e.remove(); g.remove()
                                    }
                                }
                            }, block: {
                                detectMerge: function (a, b) { if (!a.tableContentsRanges && !a.mergeListBookmark) { var c = new CKEDITOR.dom.range(b); c.setStartBefore(a.bookmark.startNode); c.setEndAfter(a.bookmark.endNode); a.mergeBlockBookmark = c.createBookmark() } }, merge: function (a, c) {
                                    if (a.mergeBlockBookmark && !a.purgeTableBookmark) {
                                        var e = a.mergeBlockBookmark.startNode, g = a.mergeBlockBookmark.endNode, d = new CKEDITOR.dom.elementPath(e,
                                            c), f = new CKEDITOR.dom.elementPath(g, c), d = d.block, f = f.block; d && f && !d.equals(f) && b(f, e, g); e.remove(); g.remove()
                                    }
                                }
                            }, table: function () {
                                function a(c) {
                                    var g = [], d, f = new CKEDITOR.dom.walker(c), k = c.startPath().contains(e), h = c.endPath().contains(e), m = {}; f.guard = function (a, f) {
                                        if (a.type == CKEDITOR.NODE_ELEMENT) { var l = "visited_" + (f ? "out" : "in"); if (a.getCustomData(l)) return; CKEDITOR.dom.element.setMarker(m, a, l, 1) } if (f && k && a.equals(k)) d = c.clone(), d.setEndAt(k, CKEDITOR.POSITION_BEFORE_END), g.push(d); else if (!f && h &&
                                            a.equals(h)) d = c.clone(), d.setStartAt(h, CKEDITOR.POSITION_AFTER_START), g.push(d); else { if (l = !f) l = a.type == CKEDITOR.NODE_ELEMENT && a.is(e) && (!k || b(a, k)) && (!h || b(a, h)); if (!l && (l = f)) if (a.is(e)) var l = k && k.getAscendant("table", !0), n = h && h.getAscendant("table", !0), r = a.getAscendant("table", !0), l = l && l.contains(r) || n && n.contains(r); else l = void 0; l && (d = c.clone(), d.selectNodeContents(a), g.push(d)) }
                                    }; f.lastForward(); CKEDITOR.dom.element.clearAllMarkers(m); return g
                                } function b(a, c) {
                                    var e = CKEDITOR.POSITION_CONTAINS +
                                        CKEDITOR.POSITION_IS_CONTAINED, g = a.getPosition(c); return g === CKEDITOR.POSITION_IDENTICAL ? !1 : 0 === (g & e)
                                } var e = { td: 1, th: 1, caption: 1 }; return {
                                    detectPurge: function (a) {
                                        var b = a.range, c = b.clone(); c.enlarge(CKEDITOR.ENLARGE_ELEMENT); var c = new CKEDITOR.dom.walker(c), g = 0; c.evaluator = function (a) { a.type == CKEDITOR.NODE_ELEMENT && a.is(e) && ++g }; c.checkForward(); if (1 < g) {
                                            var c = b.startPath().contains("table"), d = b.endPath().contains("table"); c && d && b.checkBoundaryOfElement(c, CKEDITOR.START) && b.checkBoundaryOfElement(d,
                                                CKEDITOR.END) && (b = a.range.clone(), b.setStartBefore(c), b.setEndAfter(d), a.purgeTableBookmark = b.createBookmark())
                                        }
                                    }, detectRanges: function (g, d) {
                                        var f = c(d, g.bookmark), k = f.clone(), h, m, l = f.getCommonAncestor(); l.is(CKEDITOR.dtd.$tableContent) && !l.is(e) && (l = l.getAscendant("table", !0)); m = l; l = new CKEDITOR.dom.elementPath(f.startContainer, m); m = new CKEDITOR.dom.elementPath(f.endContainer, m); l = l.contains("table"); m = m.contains("table"); if (l || m) l && m && b(l, m) ? (g.tableSurroundingRange = k, k.setStartAt(l, CKEDITOR.POSITION_AFTER_END),
                                            k.setEndAt(m, CKEDITOR.POSITION_BEFORE_START), k = f.clone(), k.setEndAt(l, CKEDITOR.POSITION_AFTER_END), h = f.clone(), h.setStartAt(m, CKEDITOR.POSITION_BEFORE_START), h = a(k).concat(a(h))) : l ? m || (g.tableSurroundingRange = k, k.setStartAt(l, CKEDITOR.POSITION_AFTER_END), f.setEndAt(l, CKEDITOR.POSITION_AFTER_END)) : (g.tableSurroundingRange = k, k.setEndAt(m, CKEDITOR.POSITION_BEFORE_START), f.setStartAt(m, CKEDITOR.POSITION_AFTER_START)), g.tableContentsRanges = h ? h : a(f)
                                    }, deleteRanges: function (a) {
                                        for (var b; b = a.tableContentsRanges.pop();)b.extractContents(),
                                            p(b.startContainer) && b.startContainer.appendBogus(); a.tableSurroundingRange && a.tableSurroundingRange.extractContents()
                                    }, purge: function (a) { if (a.purgeTableBookmark) { var b = a.doc, c = a.range.clone(), b = b.createElement("p"); b.insertBefore(a.purgeTableBookmark.startNode); c.moveToBookmark(a.purgeTableBookmark); c.deleteContents(); a.range.moveToPosition(b, CKEDITOR.POSITION_AFTER_START) } }
                                }
                            }(), detectExtractMerge: function (a) { return !(a.range.startPath().contains(CKEDITOR.dtd.$listItem) && a.range.endPath().contains(CKEDITOR.dtd.$listItem)) },
                            fixUneditableRangePosition: function (a) { a.startContainer.getDtd()["#"] || a.moveToClosestEditablePosition(null, !0) }, autoParagraph: function (a, b) { var c = b.startPath(), d; g(a, c.block, c.blockLimit) && (d = e(a)) && (d = b.document.createElement(d), d.appendBogus(), b.insertNode(d), b.moveToPosition(d, CKEDITOR.POSITION_AFTER_START)) }
                        }
                    }()
            })(); (function () {
                function a(a) { return CKEDITOR.plugins.widget && CKEDITOR.plugins.widget.isDomWidget(a) } function h(b, c) {
                    if (0 === b.length || a(b[0].getEnclosedNode())) return !1; var e, g; if ((e =
                        !c && 1 === b.length) && !(e = b[0].collapsed)) { var d = b[0]; e = d.startContainer.getAscendant({ td: 1, th: 1 }, !0); var f = d.endContainer.getAscendant({ td: 1, th: 1 }, !0); g = CKEDITOR.tools.trim; e && e.equals(f) && !e.findOne("td, th, tr, tbody, table") ? (d = d.cloneContents(), e = d.getFirst() ? g(d.getFirst().getText()) !== g(e.getText()) : !0) : e = !1 } if (e) return !1; for (g = 0; g < b.length; g++)if (e = b[g]._getTableElement(), !e) return !1; return !0
                } function f(a) {
                    function b(a) {
                        a = a.find("td, th"); var c = [], e; for (e = 0; e < a.count(); e++)c.push(a.getItem(e));
                        return c
                    } var c = [], e, g; for (g = 0; g < a.length; g++)e = a[g]._getTableElement(), e.is && e.is({ td: 1, th: 1 }) ? c.push(e) : c = c.concat(b(e)); return c
                } function b(a) { a = f(a); var b = "", c = [], e, g; for (g = 0; g < a.length; g++)e && !e.equals(a[g].getAscendant("tr")) ? (b += c.join("\t") + "\n", e = a[g].getAscendant("tr"), c = []) : 0 === g && (e = a[g].getAscendant("tr")), c.push(a[g].getText()); return b += c.join("\t") } function d(a) {
                    var c = this.root.editor, e = c.getSelection(1); this.reset(); z = !0; e.root.once("selectionchange", function (a) { a.cancel() }, null, null,
                        0); e.selectRanges([a[0]]); e = this._.cache; e.ranges = new CKEDITOR.dom.rangeList(a); e.type = CKEDITOR.SELECTION_TEXT; e.selectedElement = a[0]._getTableElement(); e.selectedText = b(a); e.nativeSel = null; this.isFake = 1; this.rev = A++; c._.fakeSelection = this; z = !1; this.root.fire("selectionchange")
                } function m() {
                    var b = this._.fakeSelection, c; if (b) {
                        c = this.getSelection(1); var e; if (!(e = !c) && (e = !c.isHidden())) {
                            e = b; var g = c.getRanges(), d = e.getRanges(), f = g.length && g[0]._getTableElement() && g[0]._getTableElement().getAscendant("table",
                                !0), k = d.length && d[0]._getTableElement() && d[0]._getTableElement().getAscendant("table", !0), m = 1 === g.length && g[0]._getTableElement() && g[0]._getTableElement().is("table"), l = 1 === d.length && d[0]._getTableElement() && d[0]._getTableElement().is("table"); if (a(e.getSelectedElement())) e = !1; else { var n = 1 === g.length && g[0].collapsed, d = h(g, !!CKEDITOR.env.webkit) && h(d); f = f && k ? f.equals(k) || k.contains(f) : !1; f && (n || d) ? (m && !l && e.selectRanges(g), e = !0) : e = !1 } e = !e
                        } e && (b.reset(), b = 0)
                    } if (!b && (b = c || this.getSelection(1), !b || b.getType() ==
                        CKEDITOR.SELECTION_NONE)) return; this.fire("selectionCheck", b); c = this.elementPath(); c.compare(this._.selectionPreviousPath) || (e = this._.selectionPreviousPath && this._.selectionPreviousPath.blockLimit.equals(c.blockLimit), !CKEDITOR.env.webkit && !CKEDITOR.env.gecko || e || (this._.previousActive = this.document.getActive()), this._.selectionPreviousPath = c, this.fire("selectionChange", { selection: b, path: c }))
                } function k() { v = !0; y || (l.call(this), y = CKEDITOR.tools.setTimeout(l, 200, this)) } function l() {
                    y = null; v && (CKEDITOR.tools.setTimeout(m,
                        0, this), v = !1)
                } function g(a) { return C(a) || a.type == CKEDITOR.NODE_ELEMENT && !a.is(CKEDITOR.dtd.$empty) ? !0 : !1 } function e(a) { function b(c, e) { return c && c.type != CKEDITOR.NODE_TEXT ? a.clone()["moveToElementEdit" + (e ? "End" : "Start")](c) : !1 } if (!(a.root instanceof CKEDITOR.editable)) return !1; var c = a.startContainer, e = a.getPreviousNode(g, null, c), d = a.getNextNode(g, null, c); return b(e) || b(d, 1) || !(e || d || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary() && c.getBogus()) ? !0 : !1 } function c(a) {
                    n(a, !1); var b = a.getDocument().createText(q);
                    a.setCustomData("cke-fillingChar", b); return b
                } function n(a, b) {
                    var c = a && a.removeCustomData("cke-fillingChar"); if (c) {
                        if (!1 !== b) { var e = a.getDocument().getSelection().getNative(), g = e && "None" != e.type && e.getRangeAt(0), d = q.length; if (c.getLength() > d && g && g.intersectsNode(c.$)) { var f = [{ node: e.anchorNode, offset: e.anchorOffset }, { node: e.focusNode, offset: e.focusOffset }]; e.anchorNode == c.$ && e.anchorOffset > d && (f[0].offset -= d); e.focusNode == c.$ && e.focusOffset > d && (f[1].offset -= d) } } c.setText(r(c.getText(), 1)); f && (c = a.getDocument().$,
                            e = c.getSelection(), c = c.createRange(), c.setStart(f[0].node, f[0].offset), c.collapse(!0), e.removeAllRanges(), e.addRange(c), e.extend(f[1].node, f[1].offset))
                    }
                } function r(a, b) { return b ? a.replace(B, function (a, b) { return b ? " " : "" }) : a.replace(q, "") } function x(a, b) {
                    var c = b && CKEDITOR.tools.htmlEncode(b) || "\x26nbsp;", c = CKEDITOR.dom.element.createFromHtml('\x3cdiv data-cke-hidden-sel\x3d"1" data-cke-temp\x3d"1" style\x3d"' + (CKEDITOR.env.ie && 14 > CKEDITOR.env.version ? "display:none" : "position:fixed;top:0;left:-1000px;width:0;height:0;overflow:hidden;") +
                        '"\x3e' + c + "\x3c/div\x3e", a.document); a.fire("lockSnapshot"); a.editable().append(c); var e = a.getSelection(1), g = a.createRange(), d = e.root.on("selectionchange", function (a) { a.cancel() }, null, null, 0); g.setStartAt(c, CKEDITOR.POSITION_AFTER_START); g.setEndAt(c, CKEDITOR.POSITION_BEFORE_END); e.selectRanges([g]); d.removeListener(); a.fire("unlockSnapshot"); a._.hiddenSelectionContainer = c
                } function u(b) {
                    var c = { 37: 1, 39: 1, 8: 1, 46: 1 }; return function (e) {
                        var g = e.data.getKeystroke(); if (c[g]) {
                            var d = b.getSelection(), f = d.getRanges()[0];
                            d.isCollapsed() && (f = f[38 > g ? "getPreviousEditableNode" : "getNextEditableNode"]()) && f.type == CKEDITOR.NODE_ELEMENT && "false" == f.getAttribute("contenteditable") && (d = d.getStartElement(), !d.isBlockBoundary() || "" !== (void 0 === d.$.textContent ? d.$.innerText : d.$.textContent) || a(d.getFirst()) || 8 !== g && 46 !== g || (d.remove(), b.fire("saveSnapshot")), b.getSelection().fake(f), e.data.preventDefault(), e.cancel())
                        }
                    }
                } function p(a) {
                    for (var b = 0; b < a.length; b++) {
                        var c = a[b]; c.getCommonAncestor().isReadOnly() && a.splice(b, 1); if (!c.collapsed) {
                            if (c.startContainer.isReadOnly()) for (var e =
                                c.startContainer, g; e && !((g = e.type == CKEDITOR.NODE_ELEMENT) && e.is("body") || !e.isReadOnly());)g && "false" == e.getAttribute("contentEditable") && c.setStartAfter(e), e = e.getParent(); e = c.startContainer; g = c.endContainer; var d = c.startOffset, f = c.endOffset, k = c.clone(); e && e.type == CKEDITOR.NODE_TEXT && (d >= e.getLength() ? k.setStartAfter(e) : k.setStartBefore(e)); g && g.type == CKEDITOR.NODE_TEXT && (f ? k.setEndAfter(g) : k.setEndBefore(g)); e = new CKEDITOR.dom.walker(k); e.evaluator = function (e) {
                                    if (e.type == CKEDITOR.NODE_ELEMENT &&
                                        e.isReadOnly()) { var g = c.clone(); c.setEndBefore(e); c.collapsed && a.splice(b--, 1); e.getPosition(k.endContainer) & CKEDITOR.POSITION_CONTAINS || (g.setStartAfter(e), g.collapsed || a.splice(b + 1, 0, g)); return !0 } return !1
                                }; e.next()
                        }
                    } return a
                } var t = "function" != typeof window.getSelection, A = 1, q = CKEDITOR.tools.repeat("​", 7), B = new RegExp(q + "( )?", "g"), z, y, v, C = CKEDITOR.dom.walker.invisible(1), F = function () {
                    function a(b) {
                        return function (a) {
                            var c = a.editor.createRange(); c.moveToClosestEditablePosition(a.selected, b) && a.editor.getSelection().selectRanges([c]);
                            return !1
                        }
                    } function b(a) { return function (b) { var c = b.editor, e = c.createRange(), g; if (!c.readOnly) return (g = e.moveToClosestEditablePosition(b.selected, a)) || (g = e.moveToClosestEditablePosition(b.selected, !a)), g && c.getSelection().selectRanges([e]), c.fire("saveSnapshot"), b.selected.remove(), g || (e.moveToElementEditablePosition(c.editable()), c.getSelection().selectRanges([e])), c.fire("saveSnapshot"), !1 } } var c = a(), e = a(1); return { 37: c, 38: c, 39: e, 40: e, 8: b(), 46: b(1) }
                }(); CKEDITOR.on("instanceCreated", function (a) {
                    function b() {
                        var a =
                            c.getSelection(); a && a.removeAllRanges()
                    } var c = a.editor; c.on("contentDom", function () {
                        function a() { x = new CKEDITOR.dom.selection(c.getSelection()); x.lock() } function b() { f.removeListener("mouseup", b); r.removeListener("mouseup", b); var a = CKEDITOR.document.$.selection, c = a.createRange(); "None" != a.type && c.parentElement() && c.parentElement().ownerDocument == d.$ && c.select() } function e(a) {
                            var b, c; b = (b = this.document.getActive()) ? "input" === b.getName() || "textarea" === b.getName() : !1; b || (b = this.getSelection(1), (c = g(b)) &&
                                !c.equals(h) && (b.selectElement(c), a.data.preventDefault()))
                        } function g(a) { a = a.getRanges()[0]; return a ? (a = a.startContainer.getAscendant(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") }, !0)) && "false" === a.getAttribute("contenteditable") ? a : null : null } var d = c.document, f = CKEDITOR.document, h = c.editable(), l = d.getBody(), r = d.getDocumentElement(), q = h.isInline(), v, x; CKEDITOR.env.gecko && h.attachListener(h, "focus", function (a) {
                            a.removeListener(); 0 !== v && (a = c.getSelection().getNative()) &&
                                a.isCollapsed && a.anchorNode == h.$ && (a = c.createRange(), a.moveToElementEditStart(h), a.select())
                        }, null, null, -2); h.attachListener(h, CKEDITOR.env.webkit || CKEDITOR.env.gecko ? "focusin" : "focus", function () { if (v && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) { v = c._.previousActive && c._.previousActive.equals(d.getActive()); var a = null != c._.previousScrollTop && c._.previousScrollTop != h.$.scrollTop; CKEDITOR.env.webkit && v && a && (h.$.scrollTop = c._.previousScrollTop) } c.unlockSelection(v); v = 0 }, null, null, -1); h.attachListener(h,
                            "mousedown", function () { v = 0 }); if (CKEDITOR.env.ie || CKEDITOR.env.gecko || q) t ? h.attachListener(h, "beforedeactivate", a, null, null, -1) : h.attachListener(c, "selectionCheck", a, null, null, -1), h.attachListener(h, CKEDITOR.env.webkit || CKEDITOR.env.gecko ? "focusout" : "blur", function () { var a = x && (x.isFake || 2 > x.getRanges().length); CKEDITOR.env.gecko && !q && a || (c.lockSelection(x), v = 1) }, null, null, -1), h.attachListener(h, "mousedown", function () { v = 0 }); if (CKEDITOR.env.ie && !q) {
                                var p; h.attachListener(h, "mousedown", function (a) {
                                    2 ==
                                        a.data.$.button && ((a = c.document.getSelection()) && a.getType() != CKEDITOR.SELECTION_NONE || (p = c.window.getScrollPosition()))
                                }); h.attachListener(h, "mouseup", function (a) { 2 == a.data.$.button && p && (c.document.$.documentElement.scrollLeft = p.x, c.document.$.documentElement.scrollTop = p.y); p = null }); if ("BackCompat" != d.$.compatMode) {
                                    if (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) {
                                        var z, y; r.on("mousedown", function (a) {
                                            function b(a) {
                                                a = a.data.$; if (z) {
                                                    var c = l.$.createTextRange(); try { c.moveToPoint(a.clientX, a.clientY) } catch (e) { } z.setEndPoint(0 >
                                                        y.compareEndPoints("StartToStart", c) ? "EndToEnd" : "StartToStart", c); z.select()
                                                }
                                            } function c() { r.removeListener("mousemove", b); f.removeListener("mouseup", c); r.removeListener("mouseup", c); z.select() } a = a.data; if (a.getTarget().is("html") && a.$.y < r.$.clientHeight && a.$.x < r.$.clientWidth) { z = l.$.createTextRange(); try { z.moveToPoint(a.$.clientX, a.$.clientY) } catch (e) { } y = z.duplicate(); r.on("mousemove", b); f.on("mouseup", c); r.on("mouseup", c) }
                                        })
                                    } if (7 < CKEDITOR.env.version && 11 > CKEDITOR.env.version) r.on("mousedown", function (a) {
                                        a.data.getTarget().is("html") &&
                                            (f.on("mouseup", b), r.on("mouseup", b))
                                    })
                                }
                            } h.attachListener(h, "selectionchange", m, c); h.attachListener(h, "keyup", k, c); h.attachListener(h, "touchstart", k, c); h.attachListener(h, "touchend", k, c); CKEDITOR.env.ie && h.attachListener(h, "keydown", e, c); h.attachListener(h, CKEDITOR.env.webkit || CKEDITOR.env.gecko ? "focusin" : "focus", function () { c.forceNextSelectionCheck(); c.selectionChange(1) }); if (q && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) {
                                var A; h.attachListener(h, "mousedown", function () { A = 1 }); h.attachListener(d.getDocumentElement(),
                                    "mouseup", function () { A && k.call(c); A = 0 })
                            } else h.attachListener(CKEDITOR.env.ie ? h : d.getDocumentElement(), "mouseup", k, c); CKEDITOR.env.webkit && h.attachListener(d, "keydown", function (a) { switch (a.data.getKey()) { case 13: case 33: case 34: case 35: case 36: case 37: case 39: case 8: case 45: case 46: h.hasFocus && n(h) } }, null, null, -1); h.attachListener(h, "keydown", u(c), null, null, -1)
                    }); c.on("setData", function () { c.unlockSelection(); CKEDITOR.env.webkit && b() }); c.on("contentDomUnload", function () { c.unlockSelection() }); if (CKEDITOR.env.ie9Compat) c.on("beforeDestroy",
                        b, null, null, 9); c.on("dataReady", function () { delete c._.fakeSelection; delete c._.hiddenSelectionContainer; c.selectionChange(1) }); c.on("loadSnapshot", function () { var a = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT), b = c.editable().getLast(a); b && b.hasAttribute("data-cke-hidden-sel") && (b.remove(), CKEDITOR.env.gecko && (a = c.editable().getFirst(a)) && a.is("br") && a.getAttribute("_moz_editor_bogus_node") && a.remove()) }, null, null, 100); c.on("key", function (a) {
                            if ("wysiwyg" == c.mode) {
                                var b = c.getSelection(); if (b.isFake) {
                                    var e =
                                        F[a.data.keyCode]; if (e) return e({ editor: c, selected: b.getSelectedElement(), selection: b, keyEvent: a })
                                }
                            }
                        })
                }); if (CKEDITOR.env.webkit) CKEDITOR.on("instanceReady", function (a) {
                    var b = a.editor; b.on("selectionChange", function () { var a = b.editable(), c = a.getCustomData("cke-fillingChar"); c && (c.getCustomData("ready") ? (n(a), a.editor.fire("selectionCheck")) : c.setCustomData("ready", 1)) }, null, null, -1); b.on("beforeSetMode", function () { n(b.editable()) }, null, null, -1); b.on("getSnapshot", function (a) { a.data && (a.data = r(a.data)) },
                        b, null, 20); b.on("toDataFormat", function (a) { a.data.dataValue = r(a.data.dataValue) }, null, null, 0)
                }); CKEDITOR.editor.prototype.selectionChange = function (a) { (a ? m : k).call(this) }; CKEDITOR.editor.prototype.getSelection = function (a) { return !this._.savedSelection && !this._.fakeSelection || a ? (a = this.editable()) && "wysiwyg" == this.mode && "recreating" !== this.status ? new CKEDITOR.dom.selection(a) : null : this._.savedSelection || this._.fakeSelection }; CKEDITOR.editor.prototype.getSelectedRanges = function (a) {
                    var b = this.getSelection();
                    return b && b.getRanges(a) || []
                }; CKEDITOR.editor.prototype.lockSelection = function (a) { a = a || this.getSelection(1); return a.getType() != CKEDITOR.SELECTION_NONE ? (!a.isLocked && a.lock(), this._.savedSelection = a, !0) : !1 }; CKEDITOR.editor.prototype.unlockSelection = function (a) { var b = this._.savedSelection; return b ? (b.unlock(a), delete this._.savedSelection, !0) : !1 }; CKEDITOR.editor.prototype.forceNextSelectionCheck = function () { delete this._.selectionPreviousPath }; CKEDITOR.dom.document.prototype.getSelection = function () { return new CKEDITOR.dom.selection(this) };
                CKEDITOR.dom.range.prototype.select = function () { var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root); a.selectRanges([this]); return a }; CKEDITOR.SELECTION_NONE = 1; CKEDITOR.SELECTION_TEXT = 2; CKEDITOR.SELECTION_ELEMENT = 3; CKEDITOR.dom.selection = function (a) {
                    if (a instanceof CKEDITOR.dom.selection) { var b = a; a = a.root } var c = a instanceof CKEDITOR.dom.element; this.rev = b ? b.rev : A++; this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument(); this.root =
                        c ? a : this.document.getBody(); this.isLocked = 0; this._ = { cache: {} }; if (b) return CKEDITOR.tools.extend(this._.cache, b._.cache), this.isFake = b.isFake, this.isLocked = b.isLocked, this; a = this.getNative(); var e, g; if (a) if (a.getRangeAt) e = (g = a.rangeCount && a.getRangeAt(0)) && new CKEDITOR.dom.node(g.commonAncestorContainer); else { try { g = a.createRange() } catch (d) { } e = g && CKEDITOR.dom.element.get(g.item && g.item(0) || g.parentElement()) } if (!e || e.type != CKEDITOR.NODE_ELEMENT && e.type != CKEDITOR.NODE_TEXT || !this.root.equals(e) && !this.root.contains(e)) this._.cache.type =
                            CKEDITOR.SELECTION_NONE, this._.cache.startElement = null, this._.cache.selectedElement = null, this._.cache.selectedText = "", this._.cache.ranges = new CKEDITOR.dom.rangeList; return this
                }; var D = { img: 1, hr: 1, li: 1, table: 1, tr: 1, td: 1, th: 1, embed: 1, object: 1, ol: 1, ul: 1, a: 1, input: 1, form: 1, select: 1, textarea: 1, button: 1, fieldset: 1, thead: 1, tfoot: 1 }; CKEDITOR.tools.extend(CKEDITOR.dom.selection, { _removeFillingCharSequenceString: r, _createFillingCharSequenceNode: c, FILLING_CHAR_SEQUENCE: q }); CKEDITOR.dom.selection.prototype = {
                    getNative: function () {
                        return void 0 !==
                            this._.cache.nativeSel ? this._.cache.nativeSel : this._.cache.nativeSel = t ? this.document.$.selection : this.document.getWindow().$.getSelection()
                    }, getType: t ? function () { var a = this._.cache; if (a.type) return a.type; var b = CKEDITOR.SELECTION_NONE; try { var c = this.getNative(), e = c.type; "Text" == e && (b = CKEDITOR.SELECTION_TEXT); "Control" == e && (b = CKEDITOR.SELECTION_ELEMENT); c.createRange().parentElement() && (b = CKEDITOR.SELECTION_TEXT) } catch (g) { } return a.type = b } : function () {
                        var a = this._.cache; if (a.type) return a.type; var b =
                            CKEDITOR.SELECTION_TEXT, c = this.getNative(); if (!c || !c.rangeCount) b = CKEDITOR.SELECTION_NONE; else if (1 == c.rangeCount) { var c = c.getRangeAt(0), e = c.startContainer; e == c.endContainer && 1 == e.nodeType && 1 == c.endOffset - c.startOffset && D[e.childNodes[c.startOffset].nodeName.toLowerCase()] && (b = CKEDITOR.SELECTION_ELEMENT) } return a.type = b
                    }, getRanges: function () {
                        var a = t ? function () {
                            function a(b) { return (new CKEDITOR.dom.node(b)).getIndex() } var b = function (b, c) {
                                b = b.duplicate(); b.collapse(c); var e = b.parentElement(); if (!e.hasChildNodes()) return {
                                    container: e,
                                    offset: 0
                                }; for (var g = e.children, d, f, k = b.duplicate(), h = 0, m = g.length - 1, l = -1, n, r; h <= m;)if (l = Math.floor((h + m) / 2), d = g[l], k.moveToElementText(d), n = k.compareEndPoints("StartToStart", b), 0 < n) m = l - 1; else if (0 > n) h = l + 1; else return { container: e, offset: a(d) }; if (-1 == l || l == g.length - 1 && 0 > n) {
                                    k.moveToElementText(e); k.setEndPoint("StartToStart", b); k = k.text.replace(/(\r\n|\r)/g, "\n").length; g = e.childNodes; if (!k) return d = g[g.length - 1], d.nodeType != CKEDITOR.NODE_TEXT ? { container: e, offset: g.length } : { container: d, offset: d.nodeValue.length };
                                    for (e = g.length; 0 < k && 0 < e;)f = g[--e], f.nodeType == CKEDITOR.NODE_TEXT && (r = f, k -= f.nodeValue.length); return { container: r, offset: -k }
                                } k.collapse(0 < n ? !0 : !1); k.setEndPoint(0 < n ? "StartToStart" : "EndToStart", b); k = k.text.replace(/(\r\n|\r)/g, "\n").length; if (!k) return { container: e, offset: a(d) + (0 < n ? 0 : 1) }; for (; 0 < k;)try { f = d[0 < n ? "previousSibling" : "nextSibling"], f.nodeType == CKEDITOR.NODE_TEXT && (k -= f.nodeValue.length, r = f), d = f } catch (q) { return { container: e, offset: a(d) } } return { container: r, offset: 0 < n ? -k : r.nodeValue.length + k }
                            };
                            return function () {
                                var a = this.getNative(), c = a && a.createRange(), e = this.getType(); if (!a) return []; if (e == CKEDITOR.SELECTION_TEXT) return a = new CKEDITOR.dom.range(this.root), e = b(c, !0), a.setStart(new CKEDITOR.dom.node(e.container), e.offset), e = b(c), a.setEnd(new CKEDITOR.dom.node(e.container), e.offset), a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() && a.collapse(), [a]; if (e == CKEDITOR.SELECTION_ELEMENT) {
                                    for (var e = [], g = 0; g < c.length; g++) {
                                        for (var d =
                                            c.item(g), f = d.parentNode, k = 0, a = new CKEDITOR.dom.range(this.root); k < f.childNodes.length && f.childNodes[k] != d; k++); a.setStart(new CKEDITOR.dom.node(f), k); a.setEnd(new CKEDITOR.dom.node(f), k + 1); e.push(a)
                                    } return e
                                } return []
                            }
                        }() : function () { var a = [], b, c = this.getNative(); if (!c) return a; for (var e = 0; e < c.rangeCount; e++) { var g = c.getRangeAt(e); b = new CKEDITOR.dom.range(this.root); b.setStart(new CKEDITOR.dom.node(g.startContainer), g.startOffset); b.setEnd(new CKEDITOR.dom.node(g.endContainer), g.endOffset); a.push(b) } return a };
                        return function (b) { var c = this._.cache, e = c.ranges; e || (c.ranges = e = new CKEDITOR.dom.rangeList(a.call(this))); return b ? p(new CKEDITOR.dom.rangeList(e.slice())) : e }
                    }(), getStartElement: function () {
                        var a = this._.cache; if (void 0 !== a.startElement) return a.startElement; var b; switch (this.getType()) {
                            case CKEDITOR.SELECTION_ELEMENT: return this.getSelectedElement(); case CKEDITOR.SELECTION_TEXT: var c = this.getRanges()[0]; if (c) {
                                if (c.collapsed) b = c.startContainer, b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent()); else {
                                    for (c.optimize(); b =
                                        c.startContainer, c.startOffset == (b.getChildCount ? b.getChildCount() : b.getLength()) && !b.isBlockBoundary();)c.setStartAfter(b); b = c.startContainer; if (b.type != CKEDITOR.NODE_ELEMENT) return b.getParent(); if ((b = b.getChild(c.startOffset)) && b.type == CKEDITOR.NODE_ELEMENT) for (c = b.getFirst(); c && c.type == CKEDITOR.NODE_ELEMENT;)b = c, c = c.getFirst(); else b = c.startContainer
                                } b = b.$
                            }
                        }return a.startElement = b ? new CKEDITOR.dom.element(b) : null
                    }, getSelectedElement: function () {
                        var a = this._.cache; if (void 0 !== a.selectedElement) return a.selectedElement;
                        var b = this, c = CKEDITOR.tools.tryThese(function () { return b.getNative().createRange().item(0) }, function () { for (var a = b.getRanges()[0].clone(), c, e, g = 2; g && !((c = a.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT && D[c.getName()] && (e = c)); g--)a.shrink(CKEDITOR.SHRINK_ELEMENT); return e && e.$ }); return a.selectedElement = c ? new CKEDITOR.dom.element(c) : null
                    }, getSelectedText: function () {
                        var a = this._.cache; if (void 0 !== a.selectedText) return a.selectedText; var b = this.getNative(), b = t ? "Control" == b.type ? "" : b.createRange().text :
                            b.toString(); return a.selectedText = b
                    }, lock: function () { this.getRanges(); this.getStartElement(); this.getSelectedElement(); this.getSelectedText(); this._.cache.nativeSel = null; this.isLocked = 1 }, unlock: function (a) {
                        if (this.isLocked) {
                            if (a) var b = this.getSelectedElement(), c = this.getRanges(), e = this.isFake; this.isLocked = 0; this.reset(); a && (a = b || c[0] && c[0].getCommonAncestor()) && a.getAscendant("body", 1) && ((a = this.root.editor) && a.plugins.tableselection && a.plugins.tableselection.isSupportedEnvironment(a) && h(c) ? d.call(this,
                                c) : e ? this.fake(b) : b && 2 > c.length ? this.selectElement(b) : this.selectRanges(c))
                        }
                    }, reset: function () { this._.cache = {}; this.isFake = 0; var a = this.root.editor; if (a && a._.fakeSelection) if (this.rev == a._.fakeSelection.rev) { delete a._.fakeSelection; var b = a._.hiddenSelectionContainer; if (b) { var c = a.checkDirty(); a.fire("lockSnapshot"); b.remove(); a.fire("unlockSnapshot"); !c && a.resetDirty() } delete a._.hiddenSelectionContainer } else CKEDITOR.warn("selection-fake-reset"); this.rev = A++ }, selectElement: function (a) {
                        var b = new CKEDITOR.dom.range(this.root);
                        b.setStartBefore(a); b.setEndAfter(a); this.selectRanges([b])
                    }, selectRanges: function (a) {
                        var b = this.root.editor, g = b && b._.hiddenSelectionContainer; this.reset(); if (g) for (var g = this.root, f, k = 0; k < a.length; ++k)f = a[k], f.endContainer.equals(g) && (f.endOffset = Math.min(f.endOffset, g.getChildCount())); if (a.length) if (this.isLocked) { var m = CKEDITOR.document.getActive(); this.unlock(); this.selectRanges(a); this.lock(); m && !m.equals(this.root) && m.focus() } else {
                            var l; a: {
                                var r, q; if (1 == a.length && !(q = a[0]).collapsed && (l = q.getEnclosedNode()) &&
                                    l.type == CKEDITOR.NODE_ELEMENT && (q = q.clone(), q.shrink(CKEDITOR.SHRINK_ELEMENT, !0), (r = q.getEnclosedNode()) && r.type == CKEDITOR.NODE_ELEMENT && (l = r), "false" == l.getAttribute("contenteditable"))) break a; l = void 0
                            } if (l) this.fake(l); else if (b && b.plugins.tableselection && b.plugins.tableselection.isSupportedEnvironment(b) && h(a) && !z && !a[0]._getTableElement({ table: 1 }).hasAttribute("data-cke-tableselection-ignored")) d.call(this, a); else {
                                if (t) {
                                    r = CKEDITOR.dom.walker.whitespaces(!0); l = /\ufeff|\u00a0/; q = {
                                        table: 1, tbody: 1,
                                        tr: 1
                                    }; 1 < a.length && (b = a[a.length - 1], a[0].setEnd(b.endContainer, b.endOffset)); b = a[0]; a = b.collapsed; var v, x, p; if ((g = b.getEnclosedNode()) && g.type == CKEDITOR.NODE_ELEMENT && g.getName() in D && (!g.is("a") || !g.getText())) try { p = g.$.createControlRange(); p.addElement(g.$); p.select(); return } catch (u) { } if (b.startContainer.type == CKEDITOR.NODE_ELEMENT && b.startContainer.getName() in q || b.endContainer.type == CKEDITOR.NODE_ELEMENT && b.endContainer.getName() in q) b.shrink(CKEDITOR.NODE_ELEMENT, !0), a = b.collapsed; p = b.createBookmark();
                                    q = p.startNode; a || (m = p.endNode); p = b.document.$.body.createTextRange(); p.moveToElementText(q.$); p.moveStart("character", 1); m ? (l = b.document.$.body.createTextRange(), l.moveToElementText(m.$), p.setEndPoint("EndToEnd", l), p.moveEnd("character", -1)) : (v = q.getNext(r), x = q.hasAscendant("pre"), v = !(v && v.getText && v.getText().match(l)) && (x || !q.hasPrevious() || q.getPrevious().is && q.getPrevious().is("br")), x = b.document.createElement("span"), x.setHtml("\x26#65279;"), x.insertBefore(q), v && b.document.createText("﻿").insertBefore(q));
                                    b.setStartBefore(q); q.remove(); a ? (v ? (p.moveStart("character", -1), p.select(), b.document.$.selection.clear()) : p.select(), b.moveToPosition(x, CKEDITOR.POSITION_BEFORE_START), x.remove()) : (b.setEndBefore(m), m.remove(), p.select())
                                } else {
                                    m = this.getNative(); if (!m) return; this.removeAllRanges(); for (p = 0; p < a.length; p++) {
                                        if (p < a.length - 1 && (v = a[p], x = a[p + 1], l = v.clone(), l.setStart(v.endContainer, v.endOffset), l.setEnd(x.startContainer, x.startOffset), !l.collapsed && (l.shrink(CKEDITOR.NODE_ELEMENT, !0), b = l.getCommonAncestor(),
                                            l = l.getEnclosedNode(), b.isReadOnly() || l && l.isReadOnly()))) { x.setStart(v.startContainer, v.startOffset); a.splice(p--, 1); continue } b = a[p]; x = this.document.$.createRange(); b.collapsed && CKEDITOR.env.webkit && e(b) && (l = c(this.root), b.insertNode(l), (v = l.getNext()) && !l.getPrevious() && v.type == CKEDITOR.NODE_ELEMENT && "br" == v.getName() ? (n(this.root), b.moveToPosition(v, CKEDITOR.POSITION_BEFORE_START)) : b.moveToPosition(l, CKEDITOR.POSITION_AFTER_END)); x.setStart(b.startContainer.$, b.startOffset); try {
                                                x.setEnd(b.endContainer.$,
                                                    b.endOffset)
                                            } catch (y) { if (0 <= y.toString().indexOf("NS_ERROR_ILLEGAL_VALUE")) b.collapse(1), x.setEnd(b.endContainer.$, b.endOffset); else throw y; } m.addRange(x)
                                    }
                                } this.reset(); this.root.fire("selectionchange")
                            }
                        }
                    }, fake: function (a, b) {
                        var c = this.root.editor; void 0 === b && a.hasAttribute("aria-label") && (b = a.getAttribute("aria-label")); this.reset(); x(c, b); var e = this._.cache, g = new CKEDITOR.dom.range(this.root); g.setStartBefore(a); g.setEndAfter(a); e.ranges = new CKEDITOR.dom.rangeList(g); e.selectedElement = e.startElement =
                            a; e.type = CKEDITOR.SELECTION_ELEMENT; e.selectedText = e.nativeSel = null; this.isFake = 1; this.rev = A++; c._.fakeSelection = this; this.root.fire("selectionchange")
                    }, isHidden: function () { var a = this.getCommonAncestor(); a && a.type == CKEDITOR.NODE_TEXT && (a = a.getParent()); return !(!a || !a.data("cke-hidden-sel")) }, isInTable: function (a) { return h(this.getRanges(), a) }, isCollapsed: function () { var a = this.getRanges(); return 1 === a.length && a[0].collapsed }, createBookmarks: function (a) {
                        a = this.getRanges().createBookmarks(a); this.isFake &&
                            (a.isFake = 1); return a
                    }, createBookmarks2: function (a) { a = this.getRanges().createBookmarks2(a); this.isFake && (a.isFake = 1); return a }, selectBookmarks: function (a) { for (var b = [], c, e = 0; e < a.length; e++) { var g = new CKEDITOR.dom.range(this.root); g.moveToBookmark(a[e]); b.push(g) } a.isFake && (c = h(b) ? b[0]._getTableElement() : b[0].getEnclosedNode(), c && c.type == CKEDITOR.NODE_ELEMENT || (CKEDITOR.warn("selection-not-fake"), a.isFake = 0)); a.isFake && !h(b) ? this.fake(c) : this.selectRanges(b); return this }, getCommonAncestor: function () {
                        var a =
                            this.getRanges(); return a.length ? a[0].startContainer.getCommonAncestor(a[a.length - 1].endContainer) : null
                    }, scrollIntoView: function () { this.getType() != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView() }, removeAllRanges: function () { if (this.getType() != CKEDITOR.SELECTION_NONE) { var a = this.getNative(); try { a && a[t ? "empty" : "removeAllRanges"]() } catch (b) { } this.reset() } }
                }
            })(); "use strict"; CKEDITOR.STYLE_BLOCK = 1; CKEDITOR.STYLE_INLINE = 2; CKEDITOR.STYLE_OBJECT = 3; (function () {
                function a(a, b) {
                    for (var c, e; (a =
                        a.getParent()) && !a.equals(b);)if (a.getAttribute("data-nostyle")) c = a; else if (!e) { var g = a.getAttribute("contentEditable"); "false" == g ? c = a : "true" == g && (e = 1) } return c
                } function h(a, b, c, e) { return (a.getPosition(b) | e) == e && (!c.childRule || c.childRule(a)) } function f(b) {
                    var c = b.document; if (b.collapsed) c = A(this, c), b.insertNode(c), b.moveToPosition(c, CKEDITOR.POSITION_BEFORE_END); else {
                        var e = this.element, g = this._.definition, k, l = g.ignoreReadonly, m = l || g.includeReadonly; null == m && (m = b.root.getCustomData("cke_includeReadonly"));
                        var n = CKEDITOR.dtd[e]; n || (k = !0, n = CKEDITOR.dtd.span); b.enlarge(CKEDITOR.ENLARGE_INLINE, 1); b.trim(); var r = b.createBookmark(), q = r.startNode, v = r.endNode, x = q, t; if (!l) { var p = b.getCommonAncestor(), l = a(q, p), p = a(v, p); l && (x = l.getNextSourceNode(!0)); p && (v = p) } for (x.getPosition(v) == CKEDITOR.POSITION_FOLLOWING && (x = 0); x;) {
                            l = !1; if (x.equals(v)) x = null, l = !0; else {
                                var z = x.type == CKEDITOR.NODE_ELEMENT ? x.getName() : null, p = z && "false" == x.getAttribute("contentEditable"), y = z && -1 !== CKEDITOR.tools.array.indexOf(CKEDITOR.style.unstylableElements,
                                    z), y = z && (x.getAttribute("data-nostyle") || y); if (z && x.data("cke-bookmark") || x.type === CKEDITOR.NODE_COMMENT) { x = x.getNextSourceNode(!0); continue } if (p && m && CKEDITOR.dtd.$block[z]) for (var B = x, C = d(B), D = void 0, F = C.length, J = 0, B = F && new CKEDITOR.dom.range(B.getDocument()); J < F; ++J) { var D = C[J], ea = CKEDITOR.filter.instances[D.data("cke-filter")]; if (ea ? ea.check(this) : 1) B.selectNodeContents(D), f.call(this, B) } C = z ? !n[z] || y ? 0 : p && !m ? 0 : h(x, v, g, w) : 1; if (C) if (D = x.getParent(), C = g, F = e, J = k, !D || !(D.getDtd() || CKEDITOR.dtd.span)[F] &&
                                        !J || C.parentRule && !C.parentRule(D)) l = !0; else { if (t || z && CKEDITOR.dtd.$removeEmpty[z] && (x.getPosition(v) | w) != w || (t = b.clone(), t.setStartBefore(x)), z = x.type, z == CKEDITOR.NODE_TEXT || p || z == CKEDITOR.NODE_ELEMENT && !x.getChildCount()) { for (var z = x, R; (l = !z.getNext(L)) && (R = z.getParent(), n[R.getName()]) && h(R, q, g, I);)z = R; t.setEndAfter(z) } } else l = !0; x = x.getNextSourceNode(y || p)
                            } if (l && t && !t.collapsed) {
                                for (var l = A(this, c), p = l.hasAttributes(), y = t.getCommonAncestor(), z = {}, C = {}, D = {}, F = {}, ba, W, H; l && y;) {
                                    if (y.getName() == e) {
                                        for (ba in g.attributes) !F[ba] &&
                                            (H = y.getAttribute(W)) && (l.getAttribute(ba) == H ? C[ba] = 1 : F[ba] = 1); for (W in g.styles) !D[W] && (H = y.getStyle(W)) && (l.getStyle(W) == H ? z[W] = 1 : D[W] = 1)
                                    } y = y.getParent()
                                } for (ba in C) l.removeAttribute(ba); for (W in z) l.removeStyle(W); p && !l.hasAttributes() && (l = null); l ? (t.extractContents().appendTo(l), t.insertNode(l), u.call(this, l), l.mergeSiblings(), CKEDITOR.env.ie || l.$.normalize()) : (l = new CKEDITOR.dom.element("span"), t.extractContents().appendTo(l), t.insertNode(l), u.call(this, l), l.remove(!0)); t = null
                            }
                        } b.moveToBookmark(r);
                        b.shrink(CKEDITOR.SHRINK_TEXT); b.shrink(CKEDITOR.NODE_ELEMENT, !0)
                    }
                } function b(a) {
                    function b() { for (var a = new CKEDITOR.dom.elementPath(e.getParent()), c = new CKEDITOR.dom.elementPath(m.getParent()), g = null, d = null, f = 0; f < a.elements.length; f++) { var k = a.elements[f]; if (k == a.block || k == a.blockLimit) break; n.checkElementRemovable(k, !0) && (g = k) } for (f = 0; f < c.elements.length; f++) { k = c.elements[f]; if (k == c.block || k == c.blockLimit) break; n.checkElementRemovable(k, !0) && (d = k) } d && m.breakParent(d); g && e.breakParent(g) } a.enlarge(CKEDITOR.ENLARGE_INLINE,
                        1); var c = a.createBookmark(), e = c.startNode, g = this._.definition.alwaysRemoveElement; if (a.collapsed) {
                            for (var d = new CKEDITOR.dom.elementPath(e.getParent(), a.root), f, k = 0, h; k < d.elements.length && (h = d.elements[k]) && h != d.block && h != d.blockLimit; k++)if (this.checkElementRemovable(h)) { var l; !g && a.collapsed && (a.checkBoundaryOfElement(h, CKEDITOR.END) || (l = a.checkBoundaryOfElement(h, CKEDITOR.START))) ? (f = h, f.match = l ? "start" : "end") : (h.mergeSiblings(), h.is(this.element) ? x.call(this, h) : p(h, z(this)[h.getName()])) } if (f) {
                                g =
                                    e; for (k = 0; ; k++) { h = d.elements[k]; if (h.equals(f)) break; else if (h.match) continue; else h = h.clone(); h.append(g); g = h } g["start" == f.match ? "insertBefore" : "insertAfter"](f)
                            }
                        } else { var m = c.endNode, n = this; b(); for (d = e; !d.equals(m);)f = d.getNextSourceNode(), d.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(d) && (d.getName() == this.element ? x.call(this, d) : p(d, z(this)[d.getName()]), f.type == CKEDITOR.NODE_ELEMENT && f.contains(e) && (b(), f = e.getNext())), d = f } a.moveToBookmark(c); a.shrink(CKEDITOR.NODE_ELEMENT, !0)
                } function d(a) {
                    var b =
                        []; a.forEach(function (a) { if ("true" == a.getAttribute("contenteditable")) return b.push(a), !1 }, CKEDITOR.NODE_ELEMENT, !0); return b
                } function m(a) { var b = a.getEnclosedNode() || a.getCommonAncestor(!1, !0); (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) && !a.isReadOnly() && q(a, this) } function k(a) {
                    var b = a.getCommonAncestor(!0, !0); if (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) {
                        var b = this._.definition, c = b.attributes; if (c) for (var e in c) a.removeAttribute(e, c[e]); if (b.styles) for (var g in b.styles) b.styles.hasOwnProperty(g) &&
                            a.removeStyle(g)
                    }
                } function l(a) { var b = a.createBookmark(!0), c = a.createIterator(); c.enforceRealBlocks = !0; this._.enterMode && (c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR); for (var g, d = a.document, f; g = c.getNextParagraph();)!g.isReadOnly() && (c.activeFilter ? c.activeFilter.check(this) : 1) && (f = A(this, d, g), e(g, f)); a.moveToBookmark(b) } function g(a) {
                    var b = a.createBookmark(1), c = a.createIterator(); c.enforceRealBlocks = !0; c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR; for (var g, d; g = c.getNextParagraph();)this.checkElementRemovable(g) &&
                        (g.is("pre") ? ((d = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div")) && g.copyAttributes(d), e(g, d)) : x.call(this, g)); a.moveToBookmark(b)
                } function e(a, b) {
                    var e = !b; e && (b = a.getDocument().createElement("div"), a.copyAttributes(b)); var g = b && b.is("pre"), d = a.is("pre"), f = !g && d; if (g && !d) {
                        d = b; (f = a.getBogus()) && f.remove(); f = a.getHtml(); f = n(f, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, ""); f = f.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1"); f = f.replace(/([ \t\n\r]+|&nbsp;)/g,
                            " "); f = f.replace(/<br\b[^>]*>/gi, "\n"); if (CKEDITOR.env.ie) { var k = a.getDocument().createElement("div"); k.append(d); d.$.outerHTML = "\x3cpre\x3e" + f + "\x3c/pre\x3e"; d.copyAttributes(k.getFirst()); d = k.getFirst().remove() } else d.setHtml(f); b = d
                    } else f ? b = r(e ? [a.getHtml()] : c(a), b) : a.moveChildren(b); b.replace(a); if (g) {
                        var e = b, h; (h = e.getPrevious(K)) && h.type == CKEDITOR.NODE_ELEMENT && h.is("pre") && (g = n(h.getHtml(), /\n$/, "") + "\n\n" + n(e.getHtml(), /^\n/, ""), CKEDITOR.env.ie ? e.$.outerHTML = "\x3cpre\x3e" + g + "\x3c/pre\x3e" :
                            e.setHtml(g), h.remove())
                    } else e && t(b)
                } function c(a) { var b = []; n(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function (a, b, c) { return b + "\x3c/pre\x3e" + c + "\x3cpre\x3e" }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function (a, c) { b.push(c) }); return b } function n(a, b, c) { var e = "", g = ""; a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function (a, b, c) { b && (e = b); c && (g = c); return "" }); return e + a.replace(b, c) + g } function r(a, b) {
                    var c;
                    1 < a.length && (c = new CKEDITOR.dom.documentFragment(b.getDocument())); for (var e = 0; e < a.length; e++) {
                        var g = a[e], g = g.replace(/(\r\n|\r)/g, "\n"), g = n(g, /^[ \t]*\n/, ""), g = n(g, /\n$/, ""), g = n(g, /^[ \t]+|[ \t]+$/g, function (a, b) { return 1 == a.length ? "\x26nbsp;" : b ? " " + CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) : CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " " }), g = g.replace(/\n/g, "\x3cbr\x3e"), g = g.replace(/[ \t]{2,}/g, function (a) { return CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " " }); if (c) {
                            var d = b.clone(); d.setHtml(g);
                            c.append(d)
                        } else b.setHtml(g)
                    } return c || b
                } function x(a, b) {
                    var c = this._.definition, e = c.attributes, c = c.styles, g = z(this)[a.getName()], d = CKEDITOR.tools.isEmpty(e) && CKEDITOR.tools.isEmpty(c), f; for (f in e) if ("class" != f && !this._.definition.fullMatch || a.getAttribute(f) == y(f, e[f])) b && "data-" == f.slice(0, 5) || (d = a.hasAttribute(f), a.removeAttribute(f)); for (var k in c) this._.definition.fullMatch && a.getStyle(k) != y(k, c[k], !0) || (d = d || !!a.getStyle(k), a.removeStyle(k)); p(a, g, F[a.getName()]); d && (this._.definition.alwaysRemoveElement ?
                        t(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? t(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
                } function u(a) { for (var b = z(this), c = a.getElementsByTag(this.element), e, g = c.count(); 0 <= --g;)e = c.getItem(g), e.isReadOnly() || x.call(this, e, !0); for (var d in b) if (d != this.element) for (c = a.getElementsByTag(d), g = c.count() - 1; 0 <= g; g--)e = c.getItem(g), e.isReadOnly() || p(e, b[d]) } function p(a, b, c) {
                    if (b = b && b.attributes) for (var e = 0; e < b.length; e++) {
                        var g = b[e][0],
                            d; if (d = a.getAttribute(g)) { var f = b[e][1]; (null === f || f.test && f.test(d) || "string" == typeof f && d == f) && a.removeAttribute(g) }
                    } c || t(a)
                } function t(a, b) {
                    if (!a.hasAttributes() || b) if (CKEDITOR.dtd.$block[a.getName()]) { var c = a.getPrevious(K), e = a.getNext(K); !c || c.type != CKEDITOR.NODE_TEXT && c.isBlockBoundary({ br: 1 }) || a.append("br", 1); !e || e.type != CKEDITOR.NODE_TEXT && e.isBlockBoundary({ br: 1 }) || a.append("br"); a.remove(!0) } else c = a.getFirst(), e = a.getLast(), a.remove(!0), c && (c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings(),
                        e && !c.equals(e) && e.type == CKEDITOR.NODE_ELEMENT && e.mergeSiblings())
                } function A(a, b, c) { var e; e = a.element; "*" == e && (e = "span"); e = new CKEDITOR.dom.element(e, b); c && c.copyAttributes(e); e = q(e, a); b.getCustomData("doc_processing_style") && e.hasAttribute("id") ? e.removeAttribute("id") : b.setCustomData("doc_processing_style", 1); return e } function q(a, b) {
                    var c = b._.definition, e = c.attributes, c = CKEDITOR.style.getStyleText(c); if (e) for (var g in e) a.setAttribute(g, e[g]); c && a.setAttribute("style", c); a.getDocument().removeCustomData("doc_processing_style");
                    return a
                } function B(a, b) { for (var c in a) a[c] = a[c].replace(H, function (a, c) { return b[c] }) } function z(a) { if (a._.overrides) return a._.overrides; var b = a._.overrides = {}, c = a._.definition.overrides; if (c) { CKEDITOR.tools.isArray(c) || (c = [c]); for (var e = 0; e < c.length; e++) { var g = c[e], d, f; "string" == typeof g ? d = g.toLowerCase() : (d = g.element ? g.element.toLowerCase() : a.element, f = g.attributes); g = b[d] || (b[d] = {}); if (f) { var g = g.attributes = g.attributes || [], k; for (k in f) g.push([k.toLowerCase(), f[k]]) } } } return b } function y(a,
                    b, c) { var e = new CKEDITOR.dom.element("span"); e[c ? "setStyle" : "setAttribute"](a, b); return e[c ? "getStyle" : "getAttribute"](a) } function v(a, b) { function c(a, b) { return "font-family" == b.toLowerCase() ? a.replace(/["']/g, "") : a } "string" == typeof a && (a = CKEDITOR.tools.parseCssText(a)); "string" == typeof b && (b = CKEDITOR.tools.parseCssText(b, !0)); for (var e in a) if (!(e in b) || c(b[e], e) != c(a[e], e) && "inherit" != a[e] && "inherit" != b[e]) return !1; return !0 } function C(a, b, c) {
                        var e = a.getRanges(); b = b ? this.removeFromRange : this.applyToRange;
                        for (var g, d = e.createIterator(); g = d.getNextRange();)b.call(this, g, c); a.selectRanges(e)
                    } var F = { address: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, p: 1, pre: 1, section: 1, header: 1, footer: 1, nav: 1, article: 1, aside: 1, figure: 1, dialog: 1, hgroup: 1, time: 1, meter: 1, menu: 1, command: 1, keygen: 1, output: 1, progress: 1, details: 1, datagrid: 1, datalist: 1 }, D = { a: 1, blockquote: 1, embed: 1, hr: 1, img: 1, li: 1, object: 1, ol: 1, table: 1, td: 1, tr: 1, th: 1, ul: 1, dl: 1, dt: 1, dd: 1, form: 1, audio: 1, video: 1 }, G = /\s*(?:;\s*|$)/, H = /#\((.+?)\)/g, L = CKEDITOR.dom.walker.bookmark(0,
                        1), K = CKEDITOR.dom.walker.whitespaces(1); CKEDITOR.style = function (a, b) {
                            if ("string" == typeof a.type) return new CKEDITOR.style.customHandlers[a.type](a); var c = a.attributes; c && c.style && (a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style)), delete c.style); b && (a = CKEDITOR.tools.clone(a), B(a.attributes, b), B(a.styles, b)); c = this.element = a.element ? "string" == typeof a.element ? a.element.toLowerCase() : a.element : "*"; this.type = a.type || (F[c] ? CKEDITOR.STYLE_BLOCK : D[c] ? CKEDITOR.STYLE_OBJECT :
                                CKEDITOR.STYLE_INLINE); "object" == typeof this.element && (this.type = CKEDITOR.STYLE_OBJECT); this._ = { definition: a }
                        }; CKEDITOR.style.prototype = {
                            apply: function (a) { if (a instanceof CKEDITOR.dom.document) return C.call(this, a.getSelection()); if (this.checkApplicable(a.elementPath(), a)) { var b = this._.enterMode; b || (this._.enterMode = a.activeEnterMode); C.call(this, a.getSelection(), 0, a); this._.enterMode = b } }, remove: function (a) {
                                if (a instanceof CKEDITOR.dom.document) return C.call(this, a.getSelection(), 1); if (this.checkApplicable(a.elementPath(),
                                    a)) { var b = this._.enterMode; b || (this._.enterMode = a.activeEnterMode); C.call(this, a.getSelection(), 1, a); this._.enterMode = b }
                            }, applyToRange: function (a) { this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? f : this.type == CKEDITOR.STYLE_BLOCK ? l : this.type == CKEDITOR.STYLE_OBJECT ? m : null; return this.applyToRange(a) }, removeFromRange: function (a) { this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? b : this.type == CKEDITOR.STYLE_BLOCK ? g : this.type == CKEDITOR.STYLE_OBJECT ? k : null; return this.removeFromRange(a) }, applyToObject: function (a) {
                                q(a,
                                    this)
                            }, checkActive: function (a, b) { switch (this.type) { case CKEDITOR.STYLE_BLOCK: return this.checkElementRemovable(a.block || a.blockLimit, !0, b); case CKEDITOR.STYLE_OBJECT: case CKEDITOR.STYLE_INLINE: for (var c = a.elements, e = 0, g; e < c.length; e++)if (g = c[e], this.type != CKEDITOR.STYLE_INLINE || g != a.block && g != a.blockLimit) { if (this.type == CKEDITOR.STYLE_OBJECT) { var d = g.getName(); if (!("string" == typeof this.element ? d == this.element : d in this.element)) continue } if (this.checkElementRemovable(g, !0, b)) return !0 } }return !1 }, checkApplicable: function (a,
                                b, c) { b && b instanceof CKEDITOR.filter && (c = b); if (c && !c.check(this)) return !1; switch (this.type) { case CKEDITOR.STYLE_OBJECT: return !!a.contains(this.element); case CKEDITOR.STYLE_BLOCK: return !!a.blockLimit.getDtd()[this.element] }return !0 }, checkElementMatch: function (a, b) {
                                    var c = this._.definition; if (!a || !c.ignoreReadonly && a.isReadOnly()) return !1; var e = a.getName(); if ("string" == typeof this.element ? e == this.element : e in this.element) {
                                        if (!b && !a.hasAttributes()) return !0; if (e = c._AC) c = e; else {
                                            var e = {}, g = 0, d = c.attributes;
                                            if (d) for (var f in d) g++, e[f] = d[f]; if (f = CKEDITOR.style.getStyleText(c)) e.style || g++, e.style = f; e._length = g; c = c._AC = e
                                        } if (c._length) { for (var k in c) if ("_length" != k) if (e = a.getAttribute(k) || "", "style" == k ? v(c[k], e) : c[k] == e) { if (!b) return !0 } else if (b) return !1; if (b) return !0 } else return !0
                                    } return !1
                                }, checkElementRemovable: function (a, b, c) {
                                    if (this.checkElementMatch(a, b, c)) return !0; if (b = z(this)[a.getName()]) {
                                        var e; if (!(b = b.attributes)) return !0; for (c = 0; c < b.length; c++)if (e = b[c][0], e = a.getAttribute(e)) {
                                            var g = b[c][1];
                                            if (null === g) return !0; if ("string" == typeof g) { if (e == g) return !0 } else if (g.test(e)) return !0
                                        }
                                    } return !1
                                }, buildPreview: function (a) { var b = this._.definition, c = [], e = b.element; "bdo" == e && (e = "span"); var c = ["\x3c", e], g = b.attributes; if (g) for (var d in g) c.push(" ", d, '\x3d"', g[d], '"'); (g = CKEDITOR.style.getStyleText(b)) && c.push(' style\x3d"', g, '"'); c.push("\x3e", a || b.name, "\x3c/", e, "\x3e"); return c.join("") }, getDefinition: function () { return this._.definition }
                        }; CKEDITOR.style.getStyleText = function (a) {
                            var b = a._ST; if (b) return b;
                            var b = a.styles, c = a.attributes && a.attributes.style || "", e = ""; c.length && (c = c.replace(G, ";")); for (var g in b) { var d = b[g], f = (g + ":" + d).replace(G, ";"); "inherit" == d ? e += f : c += f } c.length && (c = CKEDITOR.tools.normalizeCssText(c, !0)); return a._ST = c + e
                        }; CKEDITOR.style.customHandlers = {}; CKEDITOR.style.unstylableElements = []; CKEDITOR.style.addCustomHandler = function (a) {
                            var b = function (a) { this._ = { definition: a }; this.setup && this.setup(a) }; b.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype),
                                { assignedTo: CKEDITOR.STYLE_OBJECT }, a, !0); return this.customHandlers[a.type] = b
                        }; var w = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED, I = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED
            })(); CKEDITOR.styleCommand = function (a, h) { this.requiredContent = this.allowedContent = this.style = a; CKEDITOR.tools.extend(this, h, !0) }; CKEDITOR.styleCommand.prototype.exec = function (a) {
                a.focus(); this.state == CKEDITOR.TRISTATE_OFF ? a.applyStyle(this.style) :
                    this.state == CKEDITOR.TRISTATE_ON && a.removeStyle(this.style)
            }; CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet"); CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet); CKEDITOR.loadStylesSet = function (a, h, f) { CKEDITOR.stylesSet.addExternal(a, h, ""); CKEDITOR.stylesSet.load(a, f) }; CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                attachStyleStateChange: function (a, h) {
                    var f = this._.styleStateChangeCallbacks; f || (f = this._.styleStateChangeCallbacks = [], this.on("selectionChange",
                        function (a) { for (var d = 0; d < f.length; d++) { var h = f[d], k = h.style.checkActive(a.data.path, this) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF; h.fn.call(this, k) } })); f.push({ style: a, fn: h })
                }, applyStyle: function (a) { a.apply(this) }, removeStyle: function (a) { a.remove(this) }, getStylesSet: function (a) {
                    if (this._.stylesDefinitions) a(this._.stylesDefinitions); else {
                        var h = this, f = h.config.stylesCombo_stylesSet || h.config.stylesSet; if (!1 === f) a(null); else if (f instanceof Array) h._.stylesDefinitions = f, a(f); else {
                            f || (f = "default");
                            var f = f.split(":"), b = f[0]; CKEDITOR.stylesSet.addExternal(b, f[1] ? f.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), ""); CKEDITOR.stylesSet.load(b, function (d) { h._.stylesDefinitions = d[b]; a(h._.stylesDefinitions) })
                        }
                    }
                }
            }); (function () {
                if (window.Promise) CKEDITOR.tools.promise = Promise; else {
                    var a = CKEDITOR.getUrl("vendor/promise.js"); if ("function" === typeof window.define && window.define.amd && "function" === typeof window.require) return window.require([a], function (a) { CKEDITOR.tools.promise = a }); CKEDITOR.scriptLoader.load(a,
                        function (h) { if (!h) return CKEDITOR.error("no-vendor-lib", { path: a }); if ("undefined" !== typeof window.ES6Promise) return CKEDITOR.tools.promise = ES6Promise })
                }
            })(); (function () {
                function a(a, d, m) { a.once("selectionCheck", function (a) { if (!h) { var b = a.data.getRanges()[0]; m.equals(b) ? a.cancel() : d.equals(b) && (f = !0) } }, null, null, -1) } var h = !0, f = !1; CKEDITOR.dom.selection.setupEditorOptimization = function (a) {
                    a.on("selectionCheck", function (a) { a.data && !f && a.data.optimizeInElementEnds(); f = !1 }); a.on("contentDom", function () {
                        var d =
                            a.editable(); d && (d.attachListener(d, "keydown", function (a) { this._.shiftPressed = a.data.$.shiftKey }, this), d.attachListener(d, "keyup", function (a) { this._.shiftPressed = a.data.$.shiftKey }, this))
                    })
                }; CKEDITOR.dom.selection.prototype.optimizeInElementEnds = function () {
                    var b = this.getRanges()[0], d = this.root.editor, f; if (this.root.editor._.shiftPressed || this.isFake || b.isCollapsed || b.startContainer.equals(b.endContainer) || (b.endContainer.is ? b.endContainer.is("li") : b.endContainer.getParent().is && b.endContainer.getParent().is("li"))) f =
                        !1; else if (0 === b.endOffset) f = !0; else { f = b.startContainer.type === CKEDITOR.NODE_TEXT; var k = b.endContainer.type === CKEDITOR.NODE_TEXT, l = f ? b.startContainer.getLength() : b.startContainer.getChildCount(); f = b.startOffset === l || f ^ k } f && (f = b.clone(), b.shrink(CKEDITOR.SHRINK_TEXT, !1, { skipBogus: !CKEDITOR.env.webkit }), h = !1, a(d, b, f), b.select(), h = !0)
                }
            })(); (function () {
                function a(a, b) {
                    if (f(a)) a = Math.round(b * (parseFloat(a) / 100)); else if ("string" === typeof a && a.match(/^\d+$/gm) || "string" === typeof a && a.match(/^\d+(?:deg)?$/gm)) a =
                        parseInt(a, 10); return a
                } function h(a, b) { f(a) ? a = b * (parseFloat(a) / 100) : "string" === typeof a && a.match(/^\d?\.\d+/gm) && (a = parseFloat(a)); return a } function f(a) { return "string" === typeof a && a.match(/^((\d*\.\d+)|(\d+))%{1}$/gm) } function b(a, b, d) { return !isNaN(a) && a >= b && a <= d } function d(a) { a = a.toString(16); return 1 == a.length ? "0" + a : a } CKEDITOR.tools.color = CKEDITOR.tools.createClass({
                    $: function (a, b) { this._.initialColorCode = a; this._.defaultValue = b; this._.parseInput(a) }, proto: {
                        getHex: function () {
                            if (!this._.isValidColor) return this._.defaultValue;
                            var a = this._.blendAlphaColor(this._.red, this._.green, this._.blue, this._.alpha); return this._.formatHexString(a[0], a[1], a[2])
                        }, getHexWithAlpha: function () { if (!this._.isValidColor) return this._.defaultValue; var a = Math.round(this._.alpha * CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE); return this._.formatHexString(this._.red, this._.green, this._.blue, a) }, getRgb: function () {
                            if (!this._.isValidColor) return this._.defaultValue; var a = this._.blendAlphaColor(this._.red, this._.green, this._.blue, this._.alpha); return this._.formatRgbString("rgb",
                                a[0], a[1], a[2])
                        }, getRgba: function () { return this._.isValidColor ? this._.formatRgbString("rgba", this._.red, this._.green, this._.blue, this._.alpha) : this._.defaultValue }, getHsl: function () {
                            var a = 0 === this._.alpha || 1 === this._.alpha; if (!this._.isValidColor) return this._.defaultValue; this._.type === CKEDITOR.tools.color.TYPE_HSL && a ? a = [this._.hue, this._.saturation, this._.lightness] : (a = this._.blendAlphaColor(this._.red, this._.green, this._.blue, this._.alpha), a = this._.rgbToHsl(a[0], a[1], a[2])); return this._.formatHslString("hsl",
                                a[0], a[1], a[2])
                        }, getHsla: function () { var a; if (!this._.isValidColor) return this._.defaultValue; a = this._.type === CKEDITOR.tools.color.TYPE_HSL ? [this._.hue, this._.saturation, this._.lightness] : this._.rgbToHsl(this._.red, this._.green, this._.blue); return this._.formatHslString("hsla", a[0], a[1], a[2], this._.alpha) }, getInitialValue: function () { return this._.initialColorCode }
                    }, _: {
                        initialColorCode: "", isValidColor: !0, type: 0, hue: 0, saturation: 0, lightness: 0, red: 0, green: 0, blue: 0, alpha: 1, blendAlphaColor: function (a, b,
                            d, g) { return CKEDITOR.tools.array.map([a, b, d], function (a) { return Math.round(CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE - g * (CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE - a)) }) }, formatHexString: function (a, b, f, g) { a = "#" + d(a) + d(b) + d(f); void 0 !== g && (a += d(g)); return a.toUpperCase() }, formatRgbString: function (a, b, d, g, e) { b = [b, d, g]; void 0 !== e && b.push(e); return a + "(" + b.join(",") + ")" }, formatHslString: function (a, b, d, g, e) { return a + "(" + b + "," + d + "%," + g + "%" + (void 0 !== e ? "," + e : "") + ")" }, parseInput: function (a) {
                                if ("string" !==
                                    typeof a) this._.isValidColor = !1; else { a = CKEDITOR.tools.trim(a); var b = this._.matchStringToNamedColor(a); b && (a = b); var b = this._.extractColorChannelsFromHex(a), d = this._.extractColorChannelsFromRgba(a); a = this._.extractColorChannelsFromHsla(a); (a = b || d || a) ? (this._.type = a.type, this._.red = a.red, this._.green = a.green, this._.blue = a.blue, this._.alpha = a.alpha, a.type === CKEDITOR.tools.color.TYPE_HSL && (this._.hue = a.hue, this._.saturation = a.saturation, this._.lightness = a.lightness)) : this._.isValidColor = !1 }
                            }, matchStringToNamedColor: function (a) {
                                return CKEDITOR.tools.color.namedColors[a.toLowerCase()] ||
                                    null
                            }, extractColorChannelsFromHex: function (a) {
                                -1 === a.indexOf("#") && (a = "#" + a); a.match(CKEDITOR.tools.color.hex3CharsRegExp) && (a = this._.hex3ToHex6(a)); a.match(CKEDITOR.tools.color.hex4CharsRegExp) && (a = this._.hex4ToHex8(a)); if (!a.match(CKEDITOR.tools.color.hex6CharsRegExp) && !a.match(CKEDITOR.tools.color.hex8CharsRegExp)) return null; a = a.split(""); var b = 1; a[7] && a[8] && (b = parseInt(a[7] + a[8], 16), b /= CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE, b = Number(b.toFixed(1))); return {
                                    type: CKEDITOR.tools.color.TYPE_RGB,
                                    red: parseInt(a[1] + a[2], 16), green: parseInt(a[3] + a[4], 16), blue: parseInt(a[5] + a[6], 16), alpha: b
                                }
                            }, extractColorChannelsFromRgba: function (b) {
                                var d = this._.extractColorChannelsByPattern(b, CKEDITOR.tools.color.rgbRegExp); if (!d || 3 > d.length || 4 < d.length) return null; var f = 4 === d.length; b = a(d[0], CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE); var g = a(d[1], CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE), e = a(d[2], CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE), c = 1; f && (c = h(d[3], CKEDITOR.tools.color.MAX_ALPHA_CHANNEL_VALUE)); d =
                                    { type: CKEDITOR.tools.color.TYPE_RGB, red: b, green: g, blue: e, alpha: c }; return this._.areColorChannelsValid(b, g, e, c) ? d : null
                            }, extractColorChannelsFromHsla: function (b) {
                                var d = this._.extractColorChannelsByPattern(b, CKEDITOR.tools.color.hslRegExp); if (!d || 3 > d.length || 4 < d.length) return null; var f = 4 === d.length, g = a(d[0], CKEDITOR.tools.color.MAX_HUE_CHANNEL_VALUE), e = h(d[1], CKEDITOR.tools.color.MAX_SATURATION_LIGHTNESS_CHANNEL_VALUE), c = h(d[2], CKEDITOR.tools.color.MAX_SATURATION_LIGHTNESS_CHANNEL_VALUE), n = 1; b = this._.hslToRgb(g,
                                    e, c); f && (n = h(d[3], CKEDITOR.tools.color.MAX_ALPHA_CHANNEL_VALUE)); b.push(n); d = { type: CKEDITOR.tools.color.TYPE_HSL, red: b[0], green: b[1], blue: b[2], alpha: b[3], hue: g, saturation: Math.round(100 * e), lightness: Math.round(100 * c) }; return this._.areColorChannelsValid(b[0], b[1], b[2], b[3]) ? d : null
                            }, hex3ToHex6: function (a) { a = a.split(""); return "#" + a[1] + a[1] + a[2] + a[2] + a[3] + a[3] }, hex4ToHex8: function (a) { return this._.hex3ToHex6(a.substr(0, 4)) + CKEDITOR.tools.repeat(a[4], 2) }, extractColorChannelsByPattern: function (a, b) {
                                var d =
                                    a.match(b); if (!d) return null; var g = -1 === d[1].indexOf(",") ? /\s/ : ",", g = d[1].split(g), g = CKEDITOR.tools.array.reduce(g, function (a, b) { var g = CKEDITOR.tools.trim(b); return 0 === g.length ? a : a.concat([g]) }, []); d[2] && (d = CKEDITOR.tools.trim(d[2].replace(/[\/,]/, "")), g.push(d)); return g
                            }, areColorChannelsValid: function (a, d, f, g) { return b(a, 0, CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE) && b(d, 0, CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE) && b(f, 0, CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE) && b(g, 0, CKEDITOR.tools.color.MAX_ALPHA_CHANNEL_VALUE) },
                        hslToRgb: function (a, b, d) { var g = function (e) { var c = (e + a / 30) % 12; e = b * Math.min(d, 1 - d); c = Math.min(c - 3, 9 - c, 1); c = Math.max(-1, c); return Math.round((d - e * c) * CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE) }; return [g(0), g(8), g(4)] }, rgbToHsl: function (a, b, d) {
                            a /= CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE; b /= CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE; var g = d / CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE, e = Math.max(a, b, g), c = Math.min(a, b, g); d = e - c; var f = 0; switch (e) {
                                case a: f = (b - g) / d % 6; break; case b: f = (g - a) / d + 2; break; case g: f =
                                    (a - b) / d + 4
                            }a = 0 === d ? 0 : 60 * f; b = (e + c) / 2; e = 0; 1 !== b && 0 !== b && (e = d / (1 - Math.abs(2 * b - 1))); a = Math.round(a); e = Math.round(100 * e); b = Math.round(100 * b); return [a, e, b]
                        }
                    }, statics: {
                        TYPE_RGB: 1, TYPE_HSL: 2, MAX_RGB_CHANNEL_VALUE: 255, MAX_ALPHA_CHANNEL_VALUE: 1, MAX_HUE_CHANNEL_VALUE: 360, MAX_SATURATION_LIGHTNESS_CHANNEL_VALUE: 1, hex3CharsRegExp: /#([0-9a-f]{3}$)/gim, hex4CharsRegExp: /#([0-9a-f]{4}$)/gim, hex6CharsRegExp: /#([0-9a-f]{6}$)/gim, hex8CharsRegExp: /#([0-9a-f]{8}$)/gim, rgbRegExp: /rgba?\(([.,\d\s%]*)(\s*\/\s*[\d.%]+)?\s*\)/i,
                        hslRegExp: /hsla?\((\s*(?:[.\d]+(?:deg)?)(?:\s*,?\s*[.\d]+%){2})((?:(?:\s*\/\s*)|(?:\s*,\s*))[\d.]+%?)?\s*\)/i, namedColors: {
                            aliceblue: "#F0F8FF", antiquewhite: "#FAEBD7", aqua: "#00FFFF", aquamarine: "#7FFFD4", azure: "#F0FFFF", beige: "#F5F5DC", bisque: "#FFE4C4", black: "#000000", blanchedalmond: "#FFEBCD", blue: "#0000FF", blueviolet: "#8A2BE2", brown: "#A52A2A", burlywood: "#DEB887", cadetblue: "#5F9EA0", chartreuse: "#7FFF00", chocolate: "#D2691E", coral: "#FF7F50", cornflowerblue: "#6495ED", cornsilk: "#FFF8DC", crimson: "#DC143C",
                            cyan: "#00FFFF", darkblue: "#00008B", darkcyan: "#008B8B", darkgoldenrod: "#B8860B", darkgray: "#A9A9A9", darkgreen: "#006400", darkgrey: "#A9A9A9", darkkhaki: "#BDB76B", darkmagenta: "#8B008B", darkolivegreen: "#556B2F", darkorange: "#FF8C00", darkorchid: "#9932CC", darkred: "#8B0000", darksalmon: "#E9967A", darkseagreen: "#8FBC8F", darkslateblue: "#483D8B", darkslategray: "#2F4F4F", darkslategrey: "#2F4F4F", darkturquoise: "#00CED1", darkviolet: "#9400D3", deeppink: "#FF1493", deepskyblue: "#00BFFF", dimgray: "#696969", dimgrey: "#696969", dodgerblue: "#1E90FF",
                            firebrick: "#B22222", floralwhite: "#FFFAF0", forestgreen: "#228B22", fuchsia: "#FF00FF", gainsboro: "#DCDCDC", ghostwhite: "#F8F8FF", gold: "#FFD700", goldenrod: "#DAA520", gray: "#808080", green: "#008000", greenyellow: "#ADFF2F", grey: "#808080", honeydew: "#F0FFF0", hotpink: "#FF69B4", indianred: "#CD5C5C", indigo: "#4B0082", ivory: "#FFFFF0", khaki: "#F0E68C", lavender: "#E6E6FA", lavenderblush: "#FFF0F5", lawngreen: "#7CFC00", lemonchiffon: "#FFFACD", lightblue: "#ADD8E6", lightcoral: "#F08080", lightcyan: "#E0FFFF", lightgoldenrodyellow: "#FAFAD2",
                            lightgray: "#D3D3D3", lightgreen: "#90EE90", lightgrey: "#D3D3D3", lightpink: "#FFB6C1", lightsalmon: "#FFA07A", lightseagreen: "#20B2AA", lightskyblue: "#87CEFA", lightslategray: "#778899", lightslategrey: "#778899", lightsteelblue: "#B0C4DE", lightyellow: "#FFFFE0", lime: "#00FF00", limegreen: "#32CD32", linen: "#FAF0E6", magenta: "#FF00FF", maroon: "#800000", mediumaquamarine: "#66CDAA", mediumblue: "#0000CD", mediumorchid: "#BA55D3", mediumpurple: "#9370DB", mediumseagreen: "#3CB371", mediumslateblue: "#7B68EE", mediumspringgreen: "#00FA9A",
                            mediumturquoise: "#48D1CC", mediumvioletred: "#C71585", midnightblue: "#191970", mintcream: "#F5FFFA", mistyrose: "#FFE4E1", moccasin: "#FFE4B5", navajowhite: "#FFDEAD", navy: "#000080", oldlace: "#FDF5E6", olive: "#808000", olivedrab: "#6B8E23", orange: "#FFA500", orangered: "#FF4500", orchid: "#DA70D6", palegoldenrod: "#EEE8AA", palegreen: "#98FB98", paleturquoise: "#AFEEEE", palevioletred: "#DB7093", papayawhip: "#FFEFD5", peachpuff: "#FFDAB9", peru: "#CD853F", pink: "#FFC0CB", plum: "#DDA0DD", powderblue: "#B0E0E6", purple: "#800080", rebeccapurple: "#663399",
                            red: "#FF0000", rosybrown: "#BC8F8F", royalblue: "#4169E1", saddlebrown: "#8B4513", salmon: "#FA8072", sandybrown: "#F4A460", seagreen: "#2E8B57", seashell: "#FFF5EE", sienna: "#A0522D", silver: "#C0C0C0", skyblue: "#87CEEB", slateblue: "#6A5ACD", slategray: "#708090", slategrey: "#708090", snow: "#FFFAFA", springgreen: "#00FF7F", steelblue: "#4682B4", tan: "#D2B48C", teal: "#008080", thistle: "#D8BFD8", tomato: "#FF6347", turquoise: "#40E0D0", violet: "#EE82EE", windowtext: "windowtext", wheat: "#F5DEB3", white: "#FFFFFF", whitesmoke: "#F5F5F5", yellow: "#FFFF00",
                            yellowgreen: "#9ACD32"
                        }
                    }
                }); CKEDITOR.tools.style.parse._colors = CKEDITOR.tools.color.namedColors
            })(); CKEDITOR.dom.comment = function (a, h) { "string" == typeof a && (a = (h ? h.$ : document).createComment(a)); CKEDITOR.dom.domObject.call(this, a) }; CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node; CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, { type: CKEDITOR.NODE_COMMENT, getOuterHtml: function () { return "\x3c!--" + this.$.nodeValue + "--\x3e" } }); "use strict"; (function () {
                var a = {}, h = {}, f; for (f in CKEDITOR.dtd.$blockLimit) f in
                    CKEDITOR.dtd.$list || (a[f] = 1); for (f in CKEDITOR.dtd.$block) f in CKEDITOR.dtd.$blockLimit || f in CKEDITOR.dtd.$empty || (h[f] = 1); CKEDITOR.dom.elementPath = function (b, d) {
                        var f = null, k = null, l = [], g = b, e; d = d || b.getDocument().getBody(); g || (g = d); do if (g.type == CKEDITOR.NODE_ELEMENT) {
                            l.push(g); if (!this.lastElement && (this.lastElement = g, g.is(CKEDITOR.dtd.$object) || "false" == g.getAttribute("contenteditable"))) continue; if (g.equals(d)) break; if (!k && (e = g.getName(), "true" == g.getAttribute("contenteditable") ? k = g : !f && h[e] &&
                                (f = g), a[e])) { if (e = !f && "div" == e) { a: { e = g.getChildren(); for (var c = 0, n = e.count(); c < n; c++) { var r = e.getItem(c); if (r.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[r.getName()]) { e = !0; break a } } e = !1 } e = !e } e ? f = g : k = g }
                        } while (g = g.getParent()); k || (k = d); this.block = f; this.blockLimit = k; this.root = d; this.elements = l
                    }
            })(); CKEDITOR.dom.elementPath.prototype = {
                compare: function (a) { var h = this.elements; a = a && a.elements; if (!a || h.length != a.length) return !1; for (var f = 0; f < h.length; f++)if (!h[f].equals(a[f])) return !1; return !0 }, contains: function (a,
                    h, f) { var b = 0, d; "string" == typeof a && (d = function (b) { return b.getName() == a }); a instanceof CKEDITOR.dom.element ? d = function (b) { return b.equals(a) } : CKEDITOR.tools.isArray(a) ? d = function (b) { return -1 < CKEDITOR.tools.indexOf(a, b.getName()) } : "function" == typeof a ? d = a : "object" == typeof a && (d = function (b) { return b.getName() in a }); var m = this.elements, k = m.length; h && (f ? b += 1 : --k); f && (m = Array.prototype.slice.call(m, 0), m.reverse()); for (; b < k; b++)if (d(m[b])) return m[b]; return null }, isContextFor: function (a) {
                        var h; return a in
                            CKEDITOR.dtd.$block ? (h = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit, !!h.getDtd()[a]) : !0
                    }, direction: function () { return (this.block || this.blockLimit || this.root).getDirection(1) }
            }; CKEDITOR.dom.text = function (a, h) { "string" == typeof a && (a = (h ? h.$ : document).createTextNode(a)); this.$ = a }; CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node; CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
                type: CKEDITOR.NODE_TEXT, getLength: function () { return this.$.nodeValue.length },
                getText: function () { return this.$.nodeValue }, setText: function (a) { this.$.nodeValue = a }, isEmpty: function (a) { var h = this.getText(); a && (h = CKEDITOR.tools.trim(h)); return !h || h === CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE }, split: function (a) { var h = this.$.parentNode, f = h.childNodes.length, b = this.getLength(), d = this.getDocument(), m = new CKEDITOR.dom.text(this.$.splitText(a), d); h.childNodes.length == f && (a >= b ? (m = d.createText(""), m.insertAfter(this)) : (a = d.createText(""), a.insertAfter(m), a.remove())); return m }, substring: function (a,
                    h) { return "number" != typeof h ? this.$.nodeValue.substr(a) : this.$.nodeValue.substring(a, h) }
            }); (function () {
                function a(a, b, d) {
                    var h = a.serializable, k = b[d ? "endContainer" : "startContainer"], l = d ? "endOffset" : "startOffset", g = h ? b.document.getById(a.startNode) : a.startNode; a = h ? b.document.getById(a.endNode) : a.endNode; k.equals(g.getPrevious()) ? (b.startOffset = b.startOffset - k.getLength() - a.getPrevious().getLength(), k = a.getNext()) : k.equals(a.getPrevious()) && (b.startOffset -= k.getLength(), k = a.getNext()); k.equals(g.getParent()) &&
                        b[l]++; k.equals(a.getParent()) && b[l]++; b[d ? "endContainer" : "startContainer"] = k; return b
                } CKEDITOR.dom.rangeList = function (a) { if (a instanceof CKEDITOR.dom.rangeList) return a; a ? a instanceof CKEDITOR.dom.range && (a = [a]) : a = []; return CKEDITOR.tools.extend(a, h) }; var h = {
                    createIterator: function () {
                        var a = this, b = CKEDITOR.dom.walker.bookmark(), d = [], h; return {
                            getNextRange: function (k) {
                                h = void 0 === h ? 0 : h + 1; var l = a[h]; if (l && 1 < a.length) {
                                    if (!h) for (var g = a.length - 1; 0 <= g; g--)d.unshift(a[g].createBookmark(!0)); if (k) for (var e =
                                        0; a[h + e + 1];) { var c = l.document; k = 0; g = c.getById(d[e].endNode); for (c = c.getById(d[e + 1].startNode); ;) { g = g.getNextSourceNode(!1); if (c.equals(g)) k = 1; else if (b(g) || g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary()) continue; break } if (!k) break; e++ } for (l.moveToBookmark(d.shift()); e--;)g = a[++h], g.moveToBookmark(d.shift()), l.setEnd(g.endContainer, g.endOffset)
                                } return l
                            }
                        }
                    }, createBookmarks: function (f) {
                        for (var b = [], d, h = 0; h < this.length; h++) {
                            b.push(d = this[h].createBookmark(f, !0)); for (var k = h + 1; k < this.length; k++)this[k] =
                                a(d, this[k]), this[k] = a(d, this[k], !0)
                        } return b
                    }, createBookmarks2: function (a) { for (var b = [], d = 0; d < this.length; d++)b.push(this[d].createBookmark2(a)); return b }, moveToBookmarks: function (a) { for (var b = 0; b < this.length; b++)this[b].moveToBookmark(a[b]) }
                }
            })(); (function () {
                function a() { return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/") } function h(b) {
                    var c = CKEDITOR.skin["ua_" + b], g = CKEDITOR.env; if (c) for (var c = c.split(",").sort(function (a, b) { return a > b ? -1 : 1 }), d =
                        0, f; d < c.length; d++)if (f = c[d], g.ie && (f.replace(/^ie/, "") == g.version || g.quirks && "iequirks" == f) && (f = "ie"), g[f]) { b += "_" + c[d]; break } return CKEDITOR.getUrl(a() + b + ".css")
                } function f(a, b) { m[a] || (CKEDITOR.document.appendStyleSheet(h(a)), m[a] = 1); b && b() } function b(a) { var b = a.getById(k); b || (b = a.getHead().append("style"), b.setAttribute("id", k), b.setAttribute("type", "text/css")); return b } function d(a, b, g) {
                    var d, f, k; if (CKEDITOR.env.webkit) for (b = b.split("}").slice(0, -1), f = 0; f < b.length; f++)b[f] = b[f].split("{"); for (var h =
                        0; h < a.length; h++)if (CKEDITOR.env.webkit) for (f = 0; f < b.length; f++) { k = b[f][1]; for (d = 0; d < g.length; d++)k = k.replace(g[d][0], g[d][1]); a[h].$.sheet.addRule(b[f][0], k) } else { k = b; for (d = 0; d < g.length; d++)k = k.replace(g[d][0], g[d][1]); CKEDITOR.env.ie && 11 > CKEDITOR.env.version ? a[h].$.styleSheet.cssText += k : a[h].$.innerHTML += k }
                } var m = {}; CKEDITOR.skin = {
                    path: a, loadPart: function (b, c) { CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a() + "skin.js"), function () { f(b, c) }) : f(b, c) },
                    getPath: function (a) { return CKEDITOR.getUrl(h(a)) }, icons: {}, addIcon: function (a, b, g, d) { a = a.toLowerCase(); this.icons[a] || (this.icons[a] = { path: b, offset: g || 0, bgsize: d || "16px" }) }, getIconStyle: function (a, b, g, d, f) { var k; a && (a = a.toLowerCase(), b && (k = this.icons[a + "-rtl"]), k || (k = this.icons[a])); a = g || k && k.path || ""; d = d || k && k.offset; f = f || k && k.bgsize || "16px"; a && (a = a.replace(/'/g, "\\'")); return a && "background-image:url('" + CKEDITOR.getUrl(a) + "');background-position:0 " + d + "px;background-size:" + f + ";" }
                }; CKEDITOR.tools.extend(CKEDITOR.editor.prototype,
                    { getUiColor: function () { return this.uiColor }, setUiColor: function (a) { var c = b(CKEDITOR.document); return (this.setUiColor = function (a) { this.uiColor = a; var b = CKEDITOR.skin.chameleon, e = "", f = ""; "function" == typeof b && (e = b(this, "editor"), f = b(this, "panel")); a = [[g, a]]; d([c], e, a); d(l, f, a) }).call(this, a) } }); var k = "cke_ui_color", l = [], g = /\$color/g; CKEDITOR.on("instanceLoaded", function (a) {
                        if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
                            var c = a.editor; a = function (a) {
                                a = (a.data[0] || a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument();
                                if (!a.getById("cke_ui_color")) { var e = b(a); l.push(e); c.on("destroy", function () { l = CKEDITOR.tools.array.filter(l, function (a) { return e !== a }) }); (a = c.getUiColor()) && d([e], CKEDITOR.skin.chameleon(c, "panel"), [[g, a]]) }
                            }; c.on("panelShow", a); c.on("menuShow", a); c.config.uiColor && c.setUiColor(c.config.uiColor)
                        }
                    })
            })(); (function () {
                var a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"\x3e\x3c/div\x3e', CKEDITOR.document);
                a.appendTo(CKEDITOR.document.getHead()); try { var h = a.getComputedStyle("border-top-color"), f = a.getComputedStyle("border-right-color"); CKEDITOR.env.hc = !(!h || h != f) } catch (b) { CKEDITOR.env.hc = !1 } a.remove(); CKEDITOR.env.hc && (CKEDITOR.env.cssClass += " cke_hc"); CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}"); CKEDITOR.status = "loaded"; CKEDITOR.fireOnce("loaded"); if (a = CKEDITOR._.pending) for (delete CKEDITOR._.pending, h = 0; h < a.length; h++)CKEDITOR.editor.prototype.constructor.apply(a[h][0], a[h][1]), CKEDITOR.add(a[h][0])
            })();
        CKEDITOR.skin.name = "moono-lisa"; CKEDITOR.skin.ua_editor = "ie,iequirks,ie8,gecko"; CKEDITOR.skin.ua_dialog = "ie,iequirks,ie8"; CKEDITOR.skin.chameleon = function () {
            var a = function () { return function (a, b) { for (var d = a.match(/[^#]./g), h = 0; 3 > h; h++) { var k = h, l; l = parseInt(d[h], 16); l = ("0" + (0 > b ? 0 | l * (1 + b) : 0 | l + (255 - l) * b).toString(16)).slice(-2); d[k] = l } return "#" + d.join("") } }(), h = {
                editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_bottom [background-color:{defaultBackground};border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [background-color:{defaultBackground};outline-color:{defaultBorder};] {id} .cke_dialog_tab [background-color:{dialogTab};border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [background-color:{lightBackground};] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} a.cke_button_off:hover,{id} a.cke_button_off:focus,{id} a.cke_button_off:active [background-color:{darkBackground};border-color:{toolbarElementsBorder};] {id} .cke_button_on [background-color:{ckeButtonOn};border-color:{toolbarElementsBorder};] {id} .cke_toolbar_separator,{id} .cke_toolgroup a.cke_button:last-child:after,{id} .cke_toolgroup a.cke_button.cke_button_disabled:hover:last-child:after [background-color: {toolbarElementsBorder};border-color: {toolbarElementsBorder};] {id} a.cke_combo_button:hover,{id} a.cke_combo_button:focus,{id} .cke_combo_on a.cke_combo_button [border-color:{toolbarElementsBorder};background-color:{darkBackground};] {id} .cke_combo:after [border-color:{toolbarElementsBorder};] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover,{id} a.cke_path_item:focus,{id} a.cke_path_item:active [background-color:{darkBackground};] {id}.cke_panel [border-color:{defaultBorder};] "),
                panel: new CKEDITOR.template(".cke_panel_grouptitle [background-color:{lightBackground};border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover,.cke_menubutton:focus,.cke_menubutton:active [background-color:{menubuttonHover};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menubutton_disabled:hover .cke_menubutton_icon,.cke_menubutton_disabled:focus .cke_menubutton_icon,.cke_menubutton_disabled:active .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")
            };
            return function (f, b) { var d = a(f.uiColor, .4), d = { id: "." + f.id, defaultBorder: a(d, -.2), toolbarElementsBorder: a(d, -.25), defaultBackground: d, lightBackground: a(d, .8), darkBackground: a(d, -.15), ckeButtonOn: a(d, .4), ckeResizer: a(d, -.4), ckeColorauto: a(d, .8), dialogBody: a(d, .7), dialogTab: a(d, .65), dialogTabSelected: "#FFF", dialogTabSelectedBorder: "#FFF", elementsPathColor: a(d, -.6), menubuttonHover: a(d, .1), menubuttonIcon: a(d, .5), menubuttonIconHover: a(d, .3) }; return h[b].output(d).replace(/\[/g, "{").replace(/\]/g, "}") }
        }();
        CKEDITOR.plugins.add("dialogui", {
            onLoad: function () {
                var a = function (a) { this._ || (this._ = {}); this._["default"] = this._.initValue = a["default"] || ""; this._.required = a.required || !1; for (var b = [this._], c = 1; c < arguments.length; c++)b.push(arguments[c]); b.push(!0); CKEDITOR.tools.extend.apply(CKEDITOR.tools, b); return this._ }, h = { build: function (a, b, c) { return new CKEDITOR.ui.dialog.textInput(a, b, c) } }, f = { build: function (a, b, c) { return new CKEDITOR.ui.dialog[b.type](a, b, c) } }, b = {
                    isChanged: function () {
                        return this.getValue() !=
                            this.getInitValue()
                    }, reset: function (a) { this.setValue(this.getInitValue(), a) }, setInitValue: function () { this._.initValue = this.getValue() }, resetInitValue: function () { this._.initValue = this._["default"] }, getInitValue: function () { return this._.initValue }
                }, d = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                    onChange: function (a, b) {
                        this._.domOnChangeRegistered || (a.on("load", function () {
                            this.getInputElement().on("change", function () { a.parts.dialog.isVisible() && this.fire("change", { value: this.getValue() }) },
                                this)
                        }, this), this._.domOnChangeRegistered = !0); this.on("change", b)
                    }
                }, !0), m = /^on([A-Z]\w+)/, k = function (a) { for (var b in a) (m.test(b) || "title" == b || "type" == b) && delete a[b]; return a }, l = function (a) { a = a.data.getKeystroke(); a == CKEDITOR.SHIFT + CKEDITOR.ALT + 36 ? this.setDirectionMarker("ltr") : a == CKEDITOR.SHIFT + CKEDITOR.ALT + 35 && this.setDirectionMarker("rtl") }; CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
                    labeledElement: function (b, e, c, d) {
                        if (!(4 > arguments.length)) {
                            var f = a.call(this, e); f.labelId = CKEDITOR.tools.getNextId() +
                                "_label"; this._.children = []; var k = { role: e.role || "presentation" }; e.includeLabel && (k["aria-labelledby"] = f.labelId); CKEDITOR.ui.dialog.uiElement.call(this, b, e, c, "div", null, k, function () {
                                    var a = [], c = e.required ? " cke_required" : ""; "horizontal" != e.labelLayout ? a.push('\x3clabel class\x3d"cke_dialog_ui_labeled_label' + c + '" ', ' id\x3d"' + f.labelId + '"', f.inputId ? ' for\x3d"' + f.inputId + '"' : "", (e.labelStyle ? ' style\x3d"' + e.labelStyle + '"' : "") + "\x3e", e.required ? e.label + '\x3cspan class\x3d"cke_dialog_ui_labeled_required" aria-hidden\x3d"true"\x3e*\x3c/span\x3e' :
                                        e.label, "\x3c/label\x3e", '\x3cdiv class\x3d"cke_dialog_ui_labeled_content"', e.controlStyle ? ' style\x3d"' + e.controlStyle + '"' : "", ' role\x3d"presentation"\x3e', d.call(this, b, e), "\x3c/div\x3e") : (c = {
                                            type: "hbox", widths: e.widths, padding: 0, children: [{ type: "html", html: '\x3clabel class\x3d"cke_dialog_ui_labeled_label' + c + '" id\x3d"' + f.labelId + '" for\x3d"' + f.inputId + '"' + (e.labelStyle ? ' style\x3d"' + e.labelStyle + '"' : "") + "\x3e" + CKEDITOR.tools.htmlEncode(e.label) + "\x3c/label\x3e" }, {
                                                type: "html", html: '\x3cspan class\x3d"cke_dialog_ui_labeled_content"' +
                                                    (e.controlStyle ? ' style\x3d"' + e.controlStyle + '"' : "") + "\x3e" + d.call(this, b, e) + "\x3c/span\x3e"
                                            }]
                                        }, CKEDITOR.dialog._.uiElementBuilders.hbox.build(b, c, a)); return a.join("")
                                })
                        }
                    }, textInput: function (b, e, c) {
                        if (!(3 > arguments.length)) {
                            a.call(this, e); var d = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput", f = { "class": "cke_dialog_ui_input_" + e.type, id: d, type: e.type }; e.validate && (this.validate = e.validate); e.maxLength && (f.maxlength = e.maxLength); e.size && (f.size = e.size); e.inputStyle && (f.style = e.inputStyle); var k =
                                this, h = !1; b.on("load", function () { k.getInputElement().on("keydown", function (a) { 13 == a.data.getKeystroke() && (h = !0) }); k.getInputElement().on("keyup", function (a) { 13 == a.data.getKeystroke() && h && (b.getButton("ok") && setTimeout(function () { b.getButton("ok").click() }, 0), h = !1); k.bidi && l.call(k, a) }, null, null, 1E3) }); CKEDITOR.ui.dialog.labeledElement.call(this, b, e, c, function () {
                                    var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_', e.type, '" role\x3d"presentation"']; e.width && a.push('style\x3d"width:' + e.width + '" '); a.push("\x3e\x3cinput ");
                                    f["aria-labelledby"] = this._.labelId; this._.required && (f["aria-required"] = this._.required); for (var b in f) a.push(b + '\x3d"' + f[b] + '" '); a.push(" /\x3e\x3c/div\x3e"); return a.join("")
                                })
                        }
                    }, textarea: function (b, e, c) {
                        if (!(3 > arguments.length)) {
                            a.call(this, e); var d = this, f = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea", k = {}; e.validate && (this.validate = e.validate); k.rows = e.rows || 5; k.cols = e.cols || 20; k["class"] = "cke_dialog_ui_input_textarea " + (e["class"] || ""); "undefined" != typeof e.inputStyle && (k.style = e.inputStyle);
                            e.dir && (k.dir = e.dir); if (d.bidi) b.on("load", function () { d.getInputElement().on("keyup", l) }, d); CKEDITOR.ui.dialog.labeledElement.call(this, b, e, c, function () {
                                k["aria-labelledby"] = this._.labelId; this._.required && (k["aria-required"] = this._.required); var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_textarea" role\x3d"presentation"\x3e\x3ctextarea id\x3d"', f, '" '], b; for (b in k) a.push(b + '\x3d"' + CKEDITOR.tools.htmlEncode(k[b]) + '" '); a.push("\x3e", CKEDITOR.tools.htmlEncode(d._["default"]), "\x3c/textarea\x3e\x3c/div\x3e");
                                return a.join("")
                            })
                        }
                    }, checkbox: function (b, e, c) {
                        if (!(3 > arguments.length)) {
                            var d = a.call(this, e, { "default": !!e["default"] }); e.validate && (this.validate = e.validate); CKEDITOR.ui.dialog.uiElement.call(this, b, e, c, "span", null, null, function () {
                                var a = CKEDITOR.tools.extend({}, e, { id: e.id ? e.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox" }, !0), c = [], f = CKEDITOR.tools.getNextId() + "_label", h = { "class": "cke_dialog_ui_checkbox_input", type: "checkbox", "aria-labelledby": f }; k(a); e["default"] && (h.checked = "checked"); "undefined" !=
                                    typeof a.inputStyle && (a.style = a.inputStyle); d.checkbox = new CKEDITOR.ui.dialog.uiElement(b, a, c, "input", null, h); c.push(' \x3clabel id\x3d"', f, '" for\x3d"', h.id, '"' + (e.labelStyle ? ' style\x3d"' + e.labelStyle + '"' : "") + "\x3e", CKEDITOR.tools.htmlEncode(e.label), "\x3c/label\x3e"); return c.join("")
                            })
                        }
                    }, radio: function (b, e, c) {
                        if (!(3 > arguments.length)) {
                            a.call(this, e); this._["default"] || (this._["default"] = this._.initValue = e.items[0][1]); e.validate && (this.validate = e.validate); var d = [], f = this; e.role = "radiogroup";
                            e.includeLabel = !0; CKEDITOR.ui.dialog.labeledElement.call(this, b, e, c, function () {
                                for (var a = [], c = [], h = (e.id ? e.id : CKEDITOR.tools.getNextId()) + "_radio", l = 0; l < e.items.length; l++) {
                                    var m = e.items[l], q = void 0 !== m[2] ? m[2] : m[0], B = void 0 !== m[1] ? m[1] : m[0], z = CKEDITOR.tools.getNextId() + "_radio_input", y = z + "_label", z = CKEDITOR.tools.extend({}, e, { id: z, title: null, type: null }, !0), q = CKEDITOR.tools.extend({}, z, { title: q }, !0), v = { type: "radio", "class": "cke_dialog_ui_radio_input", name: h, value: B, "aria-labelledby": y }, C = []; f._["default"] ==
                                        B && (v.checked = "checked"); k(z); k(q); "undefined" != typeof z.inputStyle && (z.style = z.inputStyle); z.keyboardFocusable = !0; d.push(new CKEDITOR.ui.dialog.uiElement(b, z, C, "input", null, v)); C.push(" "); new CKEDITOR.ui.dialog.uiElement(b, q, C, "label", null, { id: y, "for": v.id }, m[0]); a.push(C.join(""))
                                } new CKEDITOR.ui.dialog.hbox(b, d, a, c); return c.join("")
                            }); this._.children = d
                        }
                    }, button: function (b, e, c) {
                        if (arguments.length) {
                            "function" == typeof e && (e = e(b.getParentEditor())); a.call(this, e, { disabled: e.disabled || !1 }); CKEDITOR.event.implementOn(this);
                            var d = this; b.on("load", function () { var a = this.getElement(); (function () { a.on("click", function (a) { d.click(); a.data.preventDefault() }); a.on("keydown", function (a) { a.data.getKeystroke() in { 32: 1 } && (d.click(), a.data.preventDefault()) }) })(); a.unselectable() }, this); var f = CKEDITOR.tools.extend({}, e); delete f.style; var k = CKEDITOR.tools.getNextId() + "_label"; CKEDITOR.ui.dialog.uiElement.call(this, b, f, c, "a", null, {
                                style: e.style, href: "javascript:void(0)", title: e.label, hidefocus: "true", "class": e["class"], role: "button",
                                "aria-labelledby": k
                            }, '\x3cspan id\x3d"' + k + '" class\x3d"cke_dialog_ui_button"\x3e' + CKEDITOR.tools.htmlEncode(e.label) + "\x3c/span\x3e")
                        }
                    }, select: function (b, e, c) {
                        if (!(3 > arguments.length)) {
                            var d = a.call(this, e); e.validate && (this.validate = e.validate); d.inputId = CKEDITOR.tools.getNextId() + "_select"; CKEDITOR.ui.dialog.labeledElement.call(this, b, e, c, function () {
                                var a = CKEDITOR.tools.extend({}, e, { id: e.id ? e.id + "_select" : CKEDITOR.tools.getNextId() + "_select" }, !0), c = [], f = [], h = {
                                    id: d.inputId, "class": "cke_dialog_ui_input_select",
                                    "aria-labelledby": this._.labelId
                                }; c.push('\x3cdiv class\x3d"cke_dialog_ui_input_', e.type, '" role\x3d"presentation"'); e.width && c.push('style\x3d"width:' + e.width + '" '); c.push("\x3e"); void 0 !== e.size && (h.size = e.size); void 0 !== e.multiple && (h.multiple = e.multiple); k(a); for (var l = 0, m; l < e.items.length && (m = e.items[l]); l++)f.push('\x3coption value\x3d"', CKEDITOR.tools.htmlEncode(void 0 !== m[1] ? m[1] : m[0]).replace(/"/g, "\x26quot;"), '" /\x3e ', CKEDITOR.tools.htmlEncode(m[0])); "undefined" != typeof a.inputStyle &&
                                    (a.style = a.inputStyle); d.select = new CKEDITOR.ui.dialog.uiElement(b, a, c, "select", null, h, f.join("")); c.push("\x3c/div\x3e"); return c.join("")
                            })
                        }
                    }, file: function (b, e, c) {
                        if (!(3 > arguments.length)) {
                            void 0 === e["default"] && (e["default"] = ""); var d = CKEDITOR.tools.extend(a.call(this, e), { definition: e, buttons: [] }); e.validate && (this.validate = e.validate); b.on("load", function () { CKEDITOR.document.getById(d.frameId).getParent().addClass("cke_dialog_ui_input_file") }); CKEDITOR.ui.dialog.labeledElement.call(this, b, e, c,
                                function () { d.frameId = CKEDITOR.tools.getNextId() + "_fileInput"; var a = ['\x3ciframe frameborder\x3d"0" allowtransparency\x3d"0" class\x3d"cke_dialog_ui_input_file" role\x3d"presentation" id\x3d"', d.frameId, '" title\x3d"', e.label, '" src\x3d"javascript:void(']; a.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0"); a.push(')"\x3e\x3c/iframe\x3e'); return a.join("") })
                        }
                    }, fileButton: function (b, e, c) {
                        var d = this; if (!(3 > arguments.length)) {
                            a.call(this,
                                e); e.validate && (this.validate = e.validate); var f = CKEDITOR.tools.extend({}, e), k = f.onClick; f.className = (f.className ? f.className + " " : "") + "cke_dialog_ui_button"; f.onClick = function (a) { var c = e["for"]; a = k ? k.call(this, a) : !1; !1 !== a && ("xhr" !== a && b.getContentElement(c[0], c[1]).submit(), this.disable()) }; b.on("load", function () { b.getContentElement(e["for"][0], e["for"][1])._.buttons.push(d) }); CKEDITOR.ui.dialog.button.call(this, b, f, c)
                        }
                    }, html: function () {
                        var a = /^\s*<[\w:]+\s+([^>]*)?>/, b = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,
                            c = /\/$/; return function (d, f, k) {
                                if (!(3 > arguments.length)) {
                                    var h = [], l = f.html; "\x3c" != l.charAt(0) && (l = "\x3cspan\x3e" + l + "\x3c/span\x3e"); var m = f.focus; if (m) { var A = this.focus; this.focus = function () { ("function" == typeof m ? m : A).call(this); this.fire("focus") }; f.isFocusable && (this.isFocusable = this.isFocusable); this.keyboardFocusable = !0 } CKEDITOR.ui.dialog.uiElement.call(this, d, f, h, "span", null, null, ""); h = h.join("").match(a); l = l.match(b) || ["", "", ""]; c.test(l[1]) && (l[1] = l[1].slice(0, -1), l[2] = "/" + l[2]); k.push([l[1],
                                        " ", h[1] || "", l[2]].join(""))
                                }
                            }
                    }(), fieldset: function (a, b, c, d, f) { var k = f.label; this._ = { children: b }; CKEDITOR.ui.dialog.uiElement.call(this, a, f, d, "fieldset", null, null, function () { var a = []; k && a.push("\x3clegend" + (f.labelStyle ? ' style\x3d"' + f.labelStyle + '"' : "") + "\x3e" + k + "\x3c/legend\x3e"); for (var b = 0; b < c.length; b++)a.push(c[b]); return a.join("") }) }
                }, !0); CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement; CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,
                    { setLabel: function (a) { var b = CKEDITOR.document.getById(this._.labelId); 1 > b.getChildCount() ? (new CKEDITOR.dom.text(a, CKEDITOR.document)).appendTo(b) : b.getChild(0).$.nodeValue = a; return this }, getLabel: function () { var a = CKEDITOR.document.getById(this._.labelId); return !a || 1 > a.getChildCount() ? "" : a.getChild(0).getText() }, eventProcessors: d }, !0); CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                        click: function () { return this._.disabled ? !1 : this.fire("click", { dialog: this._.dialog }) },
                        enable: function () { this._.disabled = !1; var a = this.getElement(); a && a.removeClass("cke_disabled") }, disable: function () { this._.disabled = !0; this.getElement().addClass("cke_disabled") }, isVisible: function () { return this.getElement().getFirst().isVisible() }, isEnabled: function () { return !this._.disabled }, eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, { onClick: function (a, b) { this.on("click", function () { b.apply(this, arguments) }) } }, !0), accessKeyUp: function () { this.click() },
                        accessKeyDown: function () { this.focus() }, keyboardFocusable: !0
                    }, !0); CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                        getInputElement: function () { return CKEDITOR.document.getById(this._.inputId) }, focus: function () { var a = this.selectParentTab(); setTimeout(function () { var b = a.getInputElement(); b && b.$.focus() }, 0) }, select: function () { var a = this.selectParentTab(); setTimeout(function () { var b = a.getInputElement(); b && (b.$.focus(), b.$.select()) }, 0) }, accessKeyUp: function () { this.select() },
                        setValue: function (a) { if (this.bidi) { var b = a && a.charAt(0); (b = "‪" == b ? "ltr" : "‫" == b ? "rtl" : null) && (a = a.slice(1)); this.setDirectionMarker(b) } a || (a = ""); return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments) }, getValue: function () { var a = CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this); if (this.bidi && a) { var b = this.getDirectionMarker(); b && (a = ("ltr" == b ? "‪" : "‫") + a) } return a }, setDirectionMarker: function (a) {
                            var b = this.getInputElement(); a ? b.setAttributes({ dir: a, "data-cke-dir-marker": a }) :
                                this.getDirectionMarker() && b.removeAttributes(["dir", "data-cke-dir-marker"])
                        }, getDirectionMarker: function () { return this.getInputElement().data("cke-dir-marker") }, keyboardFocusable: !0
                    }, b, !0); CKEDITOR.ui.dialog.textarea.prototype = new CKEDITOR.ui.dialog.textInput; CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                        getInputElement: function () { return this._.select.getElement() }, add: function (a, b, c) {
                            var d = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document),
                                f = this.getInputElement().$; d.$.text = a; d.$.value = void 0 === b || null === b ? a : b; void 0 === c || null === c ? CKEDITOR.env.ie ? f.add(d.$) : f.add(d.$, null) : f.add(d.$, c); return this
                        }, remove: function (a) { this.getInputElement().$.remove(a); return this }, clear: function () { for (var a = this.getInputElement().$; 0 < a.length;)a.remove(0); return this }, keyboardFocusable: !0
                    }, b, !0); CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                        getInputElement: function () { return this._.checkbox.getElement() },
                        setValue: function (a, b) { this.getInputElement().$.checked = a; !b && this.fire("change", { value: a }); return this }, getValue: function () { return this.getInputElement().$.checked }, accessKeyUp: function () { this.setValue(!this.getValue()) }, eventProcessors: {
                            onChange: function (a, b) {
                                if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return d.onChange.apply(this, arguments); a.on("load", function () {
                                    var a = this._.checkbox.getElement(); a.on("propertychange", function (b) { b = b.data.$; "checked" == b.propertyName && this.fire("change", { value: a.$.checked }) },
                                        this)
                                }, this); this.on("change", b); return null
                            }
                        }, keyboardFocusable: !0
                    }, b, !0); CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                        setValue: function (a, b) { for (var c = this._.children, d, f = 0; f < c.length && (d = c[f]); f++)d.getElement().$.checked = d.getValue() == a; !b && this.fire("change", { value: a }); return this }, getValue: function () { for (var a = this._.children, b = 0; b < a.length; b++)if (a[b].getElement().$.checked) return a[b].getValue(); return null }, accessKeyUp: function () {
                            var a = this._.children,
                                b; for (b = 0; b < a.length; b++)if (a[b].getElement().$.checked) { a[b].getElement().focus(); return } a[0].getElement().focus()
                        }, eventProcessors: {
                            onChange: function (a, b) {
                                if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return d.onChange.apply(this, arguments); a.on("load", function () { for (var a = this._.children, b = this, e = 0; e < a.length; e++)a[e].getElement().on("propertychange", function (a) { a = a.data.$; "checked" == a.propertyName && this.$.checked && b.fire("change", { value: this.getAttribute("value") }) }) }, this); this.on("change", b);
                                return null
                            }
                        }
                    }, b, !0); CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, b, {
                        getInputElement: function () { var a = CKEDITOR.document.getById(this._.frameId).getFrameDocument(); return 0 < a.$.forms.length ? new CKEDITOR.dom.element(a.$.forms[0].elements[0]) : this.getElement() }, submit: function () { this.getInputElement().getParent().$.submit(); return this }, getAction: function () { return this.getInputElement().getParent().$.action }, registerEvents: function (a) {
                            var b = /^on([A-Z]\w+)/,
                                c, d = function (a, b, c, e) { a.on("formLoaded", function () { a.getInputElement().on(c, e, a) }) }, f; for (f in a) if (c = f.match(b)) this.eventProcessors[f] ? this.eventProcessors[f].call(this, this._.dialog, a[f]) : d(this, this._.dialog, c[1].toLowerCase(), a[f]); return this
                        }, reset: function () {
                            function a() {
                                c.$.open(); var g = ""; d.size && (g = d.size - (CKEDITOR.env.ie ? 7 : 0)); var q = b.frameId + "_input"; c.$.write(['\x3chtml dir\x3d"' + l + '" lang\x3d"' + m + '"\x3e\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e\x3cbody style\x3d"margin: 0; overflow: hidden; background: transparent;"\x3e',
                                '\x3cform enctype\x3d"multipart/form-data" method\x3d"POST" dir\x3d"' + l + '" lang\x3d"' + m + '" action\x3d"', CKEDITOR.tools.htmlEncode(d.action), '"\x3e\x3clabel id\x3d"', b.labelId, '" for\x3d"', q, '" style\x3d"display:none"\x3e', CKEDITOR.tools.htmlEncode(d.label), '\x3c/label\x3e\x3cinput style\x3d"width:100%" id\x3d"', q, '" aria-labelledby\x3d"', b.labelId, '" type\x3d"file" name\x3d"', CKEDITOR.tools.htmlEncode(d.id || "cke_upload"), '" size\x3d"', CKEDITOR.tools.htmlEncode(0 < g ? g : ""), '" /\x3e\x3c/form\x3e\x3c/body\x3e\x3c/html\x3e\x3cscript\x3e',
                                CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + k + ");", "window.onbeforeunload \x3d function() {window.parent.CKEDITOR.tools.callFunction(" + h + ")}", "\x3c/script\x3e"].join("")); c.$.close(); for (g = 0; g < f.length; g++)f[g].enable()
                            } var b = this._, c = CKEDITOR.document.getById(b.frameId).getFrameDocument(), d = b.definition, f = b.buttons, k = this.formLoadedNumber, h = this.formUnloadNumber, l = b.dialog._.editor.lang.dir, m = b.dialog._.editor.langCode; k || (k = this.formLoadedNumber =
                                CKEDITOR.tools.addFunction(function () { this.fire("formLoaded") }, this), h = this.formUnloadNumber = CKEDITOR.tools.addFunction(function () { this.getInputElement().clearCustomData() }, this), this.getDialog()._.editor.on("destroy", function () { CKEDITOR.tools.removeFunction(k); CKEDITOR.tools.removeFunction(h) })); CKEDITOR.env.gecko ? setTimeout(a, 500) : a()
                        }, getValue: function () { return this.getInputElement().$.value || "" }, setInitValue: function () { this._.initValue = "" }, eventProcessors: {
                            onChange: function (a, b) {
                                this._.domOnChangeRegistered ||
                                    (this.on("formLoaded", function () { this.getInputElement().on("change", function () { this.fire("change", { value: this.getValue() }) }, this) }, this), this._.domOnChangeRegistered = !0); this.on("change", b)
                            }
                        }, keyboardFocusable: !0
                    }, !0); CKEDITOR.ui.dialog.fileButton.prototype = new CKEDITOR.ui.dialog.button; CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype); CKEDITOR.dialog.addUIElement("text", h); CKEDITOR.dialog.addUIElement("password", h); CKEDITOR.dialog.addUIElement("tel", h);
                CKEDITOR.dialog.addUIElement("textarea", f); CKEDITOR.dialog.addUIElement("checkbox", f); CKEDITOR.dialog.addUIElement("radio", f); CKEDITOR.dialog.addUIElement("button", f); CKEDITOR.dialog.addUIElement("select", f); CKEDITOR.dialog.addUIElement("file", f); CKEDITOR.dialog.addUIElement("fileButton", f); CKEDITOR.dialog.addUIElement("html", f); CKEDITOR.dialog.addUIElement("fieldset", {
                    build: function (a, b, c) {
                        for (var d = b.children, f, k = [], h = [], l = 0; l < d.length && (f = d[l]); l++) {
                            var m = []; k.push(m); h.push(CKEDITOR.dialog._.uiElementBuilders[f.type].build(a,
                                f, m))
                        } return new CKEDITOR.ui.dialog[b.type](a, h, k, c, b)
                    }
                })
            }
        }); CKEDITOR.DIALOG_RESIZE_NONE = 0; CKEDITOR.DIALOG_RESIZE_WIDTH = 1; CKEDITOR.DIALOG_RESIZE_HEIGHT = 2; CKEDITOR.DIALOG_RESIZE_BOTH = 3; CKEDITOR.DIALOG_STATE_IDLE = 1; CKEDITOR.DIALOG_STATE_BUSY = 2; (function () {
            function a(a) { a._.tabBarMode = !0; a._.tabs[a._.currentTabId][0].focus(); a._.currentFocusIndex = -1 } function h() {
                for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--)if (this._.tabs[this._.tabIdList[c %
                    a]][0].$.offsetHeight) return this._.tabIdList[c % a]; return null
            } function f() { for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; c < b + a; c++)if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a]; return null } function b(a, b) {
                for (var c = a.$.getElementsByTagName("input"), e = 0, d = c.length; e < d; e++) {
                    var g = new CKEDITOR.dom.element(c[e]); "text" == g.getAttribute("type").toLowerCase() && (b ? (g.setAttribute("value", g.getCustomData("fake_value") ||
                        ""), g.removeCustomData("fake_value")) : (g.setCustomData("fake_value", g.getAttribute("value")), g.setAttribute("value", "")))
                }
            } function d(a, b) { var c = this.getInputElement(); c && (a ? c.removeAttribute("aria-invalid") : c.setAttribute("aria-invalid", !0)); a || (this.select ? this.select() : this.focus()); b && alert(b); this.fire("validated", { valid: a, msg: b }) } function m() { var a = this.getInputElement(); a && a.removeAttribute("aria-invalid") } function k(a) {
                var b = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog",
                    L).output({ id: CKEDITOR.tools.getNextNumber(), editorId: a.id, langDir: a.lang.dir, langCode: a.langCode, editorDialogClass: "cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog", closeTitle: a.lang.common.close, hidpi: CKEDITOR.env.hidpi ? "cke_hidpi" : "" })), c = b.getChild([0, 0, 0, 0, 0]), e = c.getChild(0), d = c.getChild(1); a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(c); !CKEDITOR.env.ie || CKEDITOR.env.quirks || CKEDITOR.env.edge || (a = "javascript:void(function(){" + encodeURIComponent("document.open();(" +
                        CKEDITOR.tools.fixDomain + ")();document.close();") + "}())", CKEDITOR.dom.element.createFromHtml('\x3ciframe frameBorder\x3d"0" class\x3d"cke_iframe_shim" src\x3d"' + a + '" tabIndex\x3d"-1"\x3e\x3c/iframe\x3e').appendTo(c.getParent())); e.unselectable(); d.unselectable(); return { element: b, parts: { dialog: b.getChild(0), title: e, close: d, tabs: c.getChild(2), contents: c.getChild([3, 0, 0, 0]), footer: c.getChild([3, 0, 1, 0]) } }
            } function l(a, b, c) {
                this.element = b; this.focusIndex = c; this.tabIndex = 0; this.isFocusable = function () {
                    return !b.getAttribute("disabled") &&
                        b.isVisible()
                }; this.focus = function () { a._.currentFocusIndex = this.focusIndex; this.element.focus() }; b.on("keydown", function (a) { a.data.getKeystroke() in { 32: 1, 13: 1 } && this.fire("click") }); b.on("focus", function () { this.fire("mouseover") }); b.on("blur", function () { this.fire("mouseout") })
            } function g(a) { function b() { a.layout() } var c = CKEDITOR.document.getWindow(); c.on("resize", b); a.on("hide", function () { c.removeListener("resize", b) }) } function e(a, b) {
                this.dialog = a; for (var e = b.contents, d = 0, g; g = e[d]; d++)e[d] = g && new c(a,
                    g); CKEDITOR.tools.extend(this, b)
            } function c(a, b) { this._ = { dialog: a }; CKEDITOR.tools.extend(this, b) } function n(a) {
                function b(c) { var h = a.getSize(), l = a.parts.dialog.getParent().getClientSize(), m = c.data.$.screenX, n = c.data.$.screenY, r = m - e.x, q = n - e.y; e = { x: m, y: n }; d.x += r; d.y += q; m = d.x + k[3] < f ? -k[3] : d.x - k[1] > l.width - h.width - f ? l.width - h.width + ("rtl" == g.lang.dir ? 0 : k[1]) : d.x; h = d.y + k[0] < f ? -k[0] : d.y - k[2] > l.height - h.height - f ? l.height - h.height + k[2] : d.y; m = Math.floor(m); h = Math.floor(h); a.move(m, h, 1); c.data.preventDefault() }
                function c() { CKEDITOR.document.removeListener("mousemove", b); CKEDITOR.document.removeListener("mouseup", c); if (CKEDITOR.env.ie6Compat) { var a = D.getChild(0).getFrameDocument(); a.removeListener("mousemove", b); a.removeListener("mouseup", c) } } var e = null, d = null, g = a.getParentEditor(), f = g.config.dialog_magnetDistance, k = CKEDITOR.skin.margins || [0, 0, 0, 0]; "undefined" == typeof f && (f = 20); a.parts.title.on("mousedown", function (g) {
                    if (!a._.moved) {
                        var f = a._.element; f.getFirst().setStyle("position", "absolute"); f.removeStyle("display");
                        a._.moved = !0; a.layout()
                    } e = { x: g.data.$.screenX, y: g.data.$.screenY }; CKEDITOR.document.on("mousemove", b); CKEDITOR.document.on("mouseup", c); d = a.getPosition(); CKEDITOR.env.ie6Compat && (f = D.getChild(0).getFrameDocument(), f.on("mousemove", b), f.on("mouseup", c)); g.data.preventDefault()
                }, a)
            } function r(a) {
                function b(c) {
                    var n = "rtl" == g.lang.dir, r = m.width, q = m.height, v = r + (c.data.$.screenX - l.x) * (n ? -1 : 1) * (a._.moved ? 1 : 2), J = q + (c.data.$.screenY - l.y) * (a._.moved ? 1 : 2), t = a._.element.getFirst(), t = n && parseInt(t.getComputedStyle("right"),
                        10), z = a.getPosition(); z.x = z.x || 0; z.y = z.y || 0; z.y + J > h.height && (J = h.height - z.y); (n ? t : z.x) + v > h.width && (v = h.width - (n ? t : z.x)); J = Math.floor(J); v = Math.floor(v); if (d == CKEDITOR.DIALOG_RESIZE_WIDTH || d == CKEDITOR.DIALOG_RESIZE_BOTH) r = Math.max(e.minWidth || 0, v - f); if (d == CKEDITOR.DIALOG_RESIZE_HEIGHT || d == CKEDITOR.DIALOG_RESIZE_BOTH) q = Math.max(e.minHeight || 0, J - k); a.resize(r, q); a._.moved && x(a, a._.position.x, a._.position.y); a._.moved || a.layout(); c.data.preventDefault()
                } function c() {
                    CKEDITOR.document.removeListener("mouseup",
                        c); CKEDITOR.document.removeListener("mousemove", b); n && (n.remove(), n = null); if (CKEDITOR.env.ie6Compat) { var a = D.getChild(0).getFrameDocument(); a.removeListener("mouseup", c); a.removeListener("mousemove", b) }
                } var e = a.definition, d = e.resizable; if (d != CKEDITOR.DIALOG_RESIZE_NONE) {
                    var g = a.getParentEditor(), f, k, h, l, m, n, r = CKEDITOR.tools.addFunction(function (e) {
                        function d(a) { return a.isVisible() } m = a.getSize(); var g = a.parts.contents, r = g.$.getElementsByTagName("iframe").length, q = !(CKEDITOR.env.gecko || CKEDITOR.env.ie &&
                            CKEDITOR.env.quirks); r && (n = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_dialog_resize_cover" style\x3d"height: 100%; position: absolute; width: 100%; left:0; top:0;"\x3e\x3c/div\x3e'), g.append(n)); k = m.height - a.parts.contents.getFirst(d).getSize("height", q); f = m.width - a.parts.contents.getFirst(d).getSize("width", 1); l = { x: e.screenX, y: e.screenY }; h = CKEDITOR.document.getWindow().getViewPaneSize(); CKEDITOR.document.on("mousemove", b); CKEDITOR.document.on("mouseup", c); CKEDITOR.env.ie6Compat &&
                                (g = D.getChild(0).getFrameDocument(), g.on("mousemove", b), g.on("mouseup", c)); e.preventDefault && e.preventDefault()
                    }); a.on("load", function () {
                        var b = ""; d == CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" : d == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical"); b = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_resizer' + b + " cke_resizer_" + g.lang.dir + '" title\x3d"' + CKEDITOR.tools.htmlEncode(g.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + r + ', event )"\x3e' + ("ltr" ==
                            g.lang.dir ? "◢" : "◣") + "\x3c/div\x3e"); a.parts.footer.append(b, 1)
                    }); g.on("destroy", function () { CKEDITOR.tools.removeFunction(r) })
                }
            } function x(a, b, c) { var e = a.parts.dialog.getParent().getClientSize(), d = a.getSize(), g = a._.viewportRatio, f = Math.max(e.width - d.width, 0), e = Math.max(e.height - d.height, 0); g.width = f ? b / f : g.width; g.height = e ? c / e : g.height; a._.viewportRatio = g } function u(a) { a.data.preventDefault(1) } function p(a) {
                var b = a.config, c = CKEDITOR.skinName || a.config.skin, e = b.dialog_backgroundCoverColor || ("moono-lisa" ==
                    c ? "black" : "white"), c = b.dialog_backgroundCoverOpacity, d = b.baseFloatZIndex, b = CKEDITOR.tools.genKey(e, c, d), g = E[b]; CKEDITOR.document.getBody().addClass("cke_dialog_open"); g ? g.show() : (d = ['\x3cdiv tabIndex\x3d"-1" style\x3d"position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", d, "; top: 0px; left: 0px; ", "; width: 100%; height: 100%;", CKEDITOR.env.ie6Compat ? "" : "background-color: " + e, '" class\x3d"cke_dialog_background_cover"\x3e'], CKEDITOR.env.ie6Compat && (e = "\x3chtml\x3e\x3cbody style\x3d\\'background-color:" +
                        e + ";\\'\x3e\x3c/body\x3e\x3c/html\x3e", d.push('\x3ciframe hidefocus\x3d"true" frameborder\x3d"0" id\x3d"cke_dialog_background_iframe" src\x3d"javascript:'), d.push("void((function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.write( '" + e + "' );document.close();") + "})())"), d.push('" style\x3d"position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity\x3d0)"\x3e\x3c/iframe\x3e')), d.push("\x3c/div\x3e"), g = CKEDITOR.dom.element.createFromHtml(d.join("")),
                        g.setOpacity(void 0 !== c ? c : .5), g.on("keydown", u), g.on("keypress", u), g.on("keyup", u), g.appendTo(CKEDITOR.document.getBody()), E[b] = g); a.focusManager.add(g); D = g; CKEDITOR.env.mac && CKEDITOR.env.webkit || g.focus()
            } function t(a) { CKEDITOR.document.getBody().removeClass("cke_dialog_open"); D && (a.focusManager.remove(D), D.hide()) } function A(a) {
                var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, e = a.data.$.shiftKey, d = String.fromCharCode(a.data.$.keyCode); (b = P[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (e ? "SHIFT+" : "") +
                    d]) && b.length && (b = b[b.length - 1], b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key), a.data.preventDefault())
            } function q(a) { var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, e = a.data.$.shiftKey, d = String.fromCharCode(a.data.$.keyCode); (b = P[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (e ? "SHIFT+" : "") + d]) && b.length && (b = b[b.length - 1], b.keyup && (b.keyup.call(b.uiElement, b.dialog, b.key), a.data.preventDefault())) } function B(a, b, c, e, d) {
                (P[c] || (P[c] = [])).push({
                    uiElement: a, dialog: b, key: c, keyup: d || a.accessKeyUp, keydown: e ||
                        a.accessKeyDown
                })
            } function z(a) { for (var b in P) { for (var c = P[b], e = c.length - 1; 0 <= e; e--)c[e].dialog != a && c[e].uiElement != a || c.splice(e, 1); 0 === c.length && delete P[b] } } function y(a, b) { a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b]) } function v() { } var C = CKEDITOR.tools.cssLength, F, D, G = !1, H = !CKEDITOR.env.ie || CKEDITOR.env.edge, L = '\x3cdiv class\x3d"cke_reset_all cke_dialog_container {editorId} {editorDialogClass} {hidpi}" dir\x3d"{langDir}" style\x3d"' + (H ? "display:flex" : "") + '" lang\x3d"{langCode}" role\x3d"dialog" aria-labelledby\x3d"cke_dialog_title_{id}"\x3e\x3ctable class\x3d"cke_dialog ' +
                CKEDITOR.env.cssClass + ' cke_{langDir}" style\x3d"' + (H ? "margin:auto" : "position:absolute") + '" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd role\x3d"presentation"\x3e\x3cdiv class\x3d"cke_dialog_body" role\x3d"presentation"\x3e\x3cdiv id\x3d"cke_dialog_title_{id}" class\x3d"cke_dialog_title" role\x3d"presentation"\x3e\x3c/div\x3e\x3ca id\x3d"cke_dialog_close_button_{id}" class\x3d"cke_dialog_close_button" href\x3d"javascript:void(0)" title\x3d"{closeTitle}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e\x3cdiv id\x3d"cke_dialog_tabs_{id}" class\x3d"cke_dialog_tabs" role\x3d"tablist"\x3e\x3c/div\x3e\x3ctable class\x3d"cke_dialog_contents" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_contents_{id}" class\x3d"cke_dialog_contents_body" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_footer_{id}" class\x3d"cke_dialog_footer" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e';
            CKEDITOR.dialog = function (b, c) {
                function g() { var a = C._.focusList; a.sort(function (a, b) { return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex }); for (var b = a.length, c = 0; c < b; c++)a[c].focusIndex = c } function l(a) {
                    var b = C._.focusList; a = a || 0; if (!(1 > b.length)) {
                        var c = C._.currentFocusIndex; C._.tabBarMode && 0 > a && (c = 0); try { b[c].getInputElement().$.blur() } catch (e) { } var d = c, g = 1 < C._.pageCount; do {
                            d += a; if (g && !C._.tabBarMode && (d == b.length || -1 == d)) {
                                C._.tabBarMode = !0; C._.tabs[C._.currentTabId][0].focus();
                                C._.currentFocusIndex = -1; return
                            } d = (d + b.length) % b.length; if (d == c) break
                        } while (a && !b[d].isFocusable()); b[d].focus(); "text" == b[d].type && b[d].select()
                    }
                } function q(c) {
                    if (C == CKEDITOR.dialog._.currentTop) {
                        var e = c.data.getKeystroke(), d = "rtl" == b.lang.dir, g = [37, 38, 39, 40]; A = B = 0; if (9 == e || e == CKEDITOR.SHIFT + 9) l(e == CKEDITOR.SHIFT + 9 ? -1 : 1), A = 1; else if (e == CKEDITOR.ALT + 121 && !C._.tabBarMode && 1 < C.getPageCount()) a(C), A = 1; else if (-1 != CKEDITOR.tools.indexOf(g, e) && C._.tabBarMode) e = -1 != CKEDITOR.tools.indexOf([d ? 39 : 37, 38], e) ?
                            h.call(C) : f.call(C), C.selectPage(e), C._.tabs[e][0].focus(), A = 1; else if (13 != e && 32 != e || !C._.tabBarMode) if (13 == e) e = c.data.getTarget(), e.is("a", "button", "select", "textarea") || e.is("input") && "button" == e.$.type || ((e = this.getButton("ok")) && CKEDITOR.tools.setTimeout(e.click, 0, e), A = 1), B = 1; else if (27 == e) (e = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(e.click, 0, e) : !1 !== this.fire("cancel", { hide: !0 }).hide && this.hide(), B = 1; else return; else this.selectPage(this._.currentTabId), this._.tabBarMode = !1, this._.currentFocusIndex =
                                -1, l(1), A = 1; v(c)
                    }
                } function v(a) { A ? a.data.preventDefault(1) : B && a.data.stopPropagation() } var t = CKEDITOR.dialog._.dialogDefinitions[c], z = CKEDITOR.tools.clone(F), x = b.config.dialog_buttonsOrder || "OS", y = b.lang.dir, p = {}, A, B; ("OS" == x && CKEDITOR.env.mac || "rtl" == x && "ltr" == y || "ltr" == x && "rtl" == y) && z.buttons.reverse(); t = CKEDITOR.tools.extend(t(b), z); t = CKEDITOR.tools.clone(t); t = new e(this, t); z = k(b); this._ = {
                    editor: b, element: z.element, name: c, model: null, contentSize: { width: 0, height: 0 }, size: { width: 0, height: 0 }, contents: {},
                    buttons: {}, accessKeyMap: {}, viewportRatio: { width: .5, height: .5 }, tabs: {}, tabIdList: [], currentTabId: null, currentTabIndex: null, pageCount: 0, lastTab: null, tabBarMode: !1, focusList: [], currentFocusIndex: 0, hasFocus: !1
                }; this.parts = z.parts; CKEDITOR.tools.setTimeout(function () { b.fire("ariaWidget", this.parts.contents) }, 0, this); z = { top: 0, visibility: "hidden" }; CKEDITOR.env.ie6Compat && (z.position = "absolute"); z["rtl" == y ? "right" : "left"] = 0; this.parts.dialog.setStyles(z); CKEDITOR.event.call(this); this.definition = t = CKEDITOR.fire("dialogDefinition",
                    { name: c, definition: t, dialog: this }, b).definition; if (!("removeDialogTabs" in b._) && b.config.removeDialogTabs) { z = b.config.removeDialogTabs.split(";"); for (y = 0; y < z.length; y++)if (x = z[y].split(":"), 2 == x.length) { var u = x[0]; p[u] || (p[u] = []); p[u].push(x[1]) } b._.removeDialogTabs = p } if (b._.removeDialogTabs && (p = b._.removeDialogTabs[c])) for (y = 0; y < p.length; y++)t.removeContents(p[y]); if (t.onLoad) this.on("load", t.onLoad); if (t.onShow) this.on("show", t.onShow); if (t.onHide) this.on("hide", t.onHide); if (t.onOk) this.on("ok",
                        function (a) { b.fire("saveSnapshot"); setTimeout(function () { b.fire("saveSnapshot") }, 0); !1 === t.onOk.call(this, a) && (a.data.hide = !1) }); this.state = CKEDITOR.DIALOG_STATE_IDLE; if (t.onCancel) this.on("cancel", function (a) { !1 === t.onCancel.call(this, a) && (a.data.hide = !1) }); var C = this, D = function (a) { var b = C._.contents, c = !1, e; for (e in b) for (var d in b[e]) if (c = a.call(this, b[e][d])) return }; this.on("ok", function (a) {
                            D(function (b) {
                                if (b.validate) {
                                    var c = b.validate(this), e = "string" == typeof c || !1 === c; e && (a.data.hide = !1, a.stop());
                                    d.call(b, !e, "string" == typeof c ? c : void 0); return e
                                }
                            })
                        }, this, null, 0); this.on("cancel", function (a) { D(function (c) { if (c.isChanged()) return b.config.dialog_noConfirmCancel || confirm(b.lang.common.confirmCancel) || (a.data.hide = !1), !0 }) }, this, null, 0); this.parts.close.on("click", function (a) { !1 !== this.fire("cancel", { hide: !0 }).hide && this.hide(); a.data.preventDefault() }, this); this.changeFocus = l; var H = this._.element; b.focusManager.add(H, 1); this.on("show", function () {
                            H.on("keydown", q, this); if (CKEDITOR.env.gecko) H.on("keypress",
                                v, this)
                        }); this.on("hide", function () { H.removeListener("keydown", q); CKEDITOR.env.gecko && H.removeListener("keypress", v); D(function (a) { m.apply(a) }) }); this.on("iframeAdded", function (a) { (new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown", q, this, null, 0) }); this.on("show", function () {
                            g(); var a = 1 < C._.pageCount; b.config.dialog_startupFocusTab && a ? (C._.tabBarMode = !0, C._.tabs[C._.currentTabId][0].focus(), C._.currentFocusIndex = -1) : this._.hasFocus || (this._.currentFocusIndex = a ? -1 : this._.focusList.length -
                                1, t.onFocus ? (a = t.onFocus.call(this)) && a.focus() : l(1))
                        }, this, null, 4294967295); if (CKEDITOR.env.ie6Compat) this.on("load", function () { var a = this.getElement(), b = a.getFirst(); b.remove(); b.appendTo(a) }, this); n(this); r(this); (new CKEDITOR.dom.text(t.title, CKEDITOR.document)).appendTo(this.parts.title); for (y = 0; y < t.contents.length; y++)(p = t.contents[y]) && this.addPage(p); this.parts.tabs.on("click", function (b) {
                            var c = b.data.getTarget(); c.hasClass("cke_dialog_tab") && (c = c.$.id, this.selectPage(c.substring(4, c.lastIndexOf("_"))),
                                a(this), b.data.preventDefault())
                        }, this); y = []; p = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, { type: "hbox", className: "cke_dialog_footer_buttons", widths: [], children: t.buttons }, y).getChild(); this.parts.footer.setHtml(y.join("")); for (y = 0; y < p.length; y++)this._.buttons[p[y].id] = p[y]
            }; CKEDITOR.dialog.prototype = {
                destroy: function () { this.hide(); this._.element.remove() }, resize: function (a, b) {
                    if (!this._.contentSize || this._.contentSize.width != a || this._.contentSize.height != b) {
                        CKEDITOR.dialog.fire("resize",
                            { dialog: this, width: a, height: b }, this._.editor); this.fire("resize", { width: a, height: b }, this._.editor); this.parts.contents.setStyles({ width: a + "px", height: b + "px" }); if ("rtl" == this._.editor.lang.dir && this._.position) { var c = this.parts.dialog.getParent().getClientSize().width; this._.position.x = c - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10) } this._.contentSize = { width: a, height: b }
                    }
                }, getSize: function () {
                    var a = this._.element.getFirst(); return {
                        width: a.$.offsetWidth || 0, height: a.$.offsetHeight ||
                            0
                    }
                }, move: function (a, b, c) {
                    var e = this._.element.getFirst(), d = "rtl" == this._.editor.lang.dir; CKEDITOR.env.ie && e.setStyle("zoom", "100%"); var g = this.parts.dialog.getParent().getClientSize(), f = this.getSize(), k = this._.viewportRatio, h = Math.max(g.width - f.width, 0), g = Math.max(g.height - f.height, 0); this._.position && this._.position.x == a && this._.position.y == b ? (a = Math.floor(h * k.width), b = Math.floor(g * k.height)) : x(this, a, b); this._.position = { x: a, y: b }; d && (a = h - a); b = { top: (0 < b ? b : 0) + "px" }; b[d ? "right" : "left"] = (0 < a ? a : 0) + "px";
                    e.setStyles(b); c && (this._.moved = 1)
                }, getPosition: function () { return CKEDITOR.tools.extend({}, this._.position) }, show: function () {
                    var a = this._.element, b = this.definition, c = CKEDITOR.document.getBody(), e = this._.editor.config.baseFloatZIndex; a.getParent() && a.getParent().equals(c) ? a.setStyle("display", H ? "flex" : "block") : a.appendTo(c); this.resize(this._.contentSize && this._.contentSize.width || b.width || b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight); this.reset(); null === this._.currentTabId &&
                        this.selectPage(this.definition.contents[0].id); null === CKEDITOR.dialog._.currentZIndex && (CKEDITOR.dialog._.currentZIndex = e); this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex += 10); this.getElement().setStyle("z-index", CKEDITOR.dialog._.currentZIndex); null === CKEDITOR.dialog._.currentTop ? (CKEDITOR.dialog._.currentTop = this, this._.parentDialog = null, p(this._.editor)) : CKEDITOR.dialog._.currentTop !== this && (this._.parentDialog = CKEDITOR.dialog._.currentTop, c = this._.parentDialog.getElement().getFirst(),
                            c.$.style.zIndex -= Math.floor(e / 2), this._.parentDialog.getElement().setStyle("z-index", c.$.style.zIndex), CKEDITOR.dialog._.currentTop = this); a.on("keydown", A); a.on("keyup", q); this._.hasFocus = !1; for (var d in b.contents) if (b.contents[d]) {
                                var a = b.contents[d], e = this._.tabs[a.id], c = a.requiredContent, f = 0; if (e) {
                                    for (var k in this._.contents[a.id]) {
                                        var h = this._.contents[a.id][k]; "hbox" != h.type && "vbox" != h.type && h.getInputElement() && (h.requiredContent && !this._.editor.activeFilter.check(h.requiredContent) ? h.disable() :
                                            (h.enable(), f++))
                                    } !f || c && !this._.editor.activeFilter.check(c) ? e[0].addClass("cke_dialog_tab_disabled") : e[0].removeClass("cke_dialog_tab_disabled")
                                }
                            } CKEDITOR.tools.setTimeout(function () { this.layout(); g(this); this.parts.dialog.setStyle("visibility", ""); this.fireOnce("load", {}); CKEDITOR.ui.fire("ready", this); this.fire("show", {}); this._.editor.fire("dialogShow", this); this._.parentDialog || this._.editor.focusManager.lock(); this.foreach(function (a) { a.setInitValue && a.setInitValue() }) }, 100, this)
                }, layout: function () {
                    var a =
                        this.parts.dialog; if (this._.moved || !H) { var b = this.getSize(), c = CKEDITOR.document.getWindow().getViewPaneSize(), e; this._.moved && this._.position ? (e = this._.position.x, b = this._.position.y) : (e = (c.width - b.width) / 2, b = (c.height - b.height) / 2); CKEDITOR.env.ie6Compat || (a.setStyle("position", "absolute"), a.removeStyle("margin")); e = Math.floor(e); b = Math.floor(b); this.move(e, b) }
                }, foreach: function (a) { for (var b in this._.contents) for (var c in this._.contents[b]) a.call(this, this._.contents[b][c]); return this }, reset: function () {
                    var a =
                        function (a) { a.reset && a.reset(1) }; return function () { this.foreach(a); return this }
                }(), setupContent: function () { var a = arguments; this.foreach(function (b) { b.setup && b.setup.apply(b, a) }) }, commitContent: function () { var a = arguments; this.foreach(function (b) { CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur(); b.commit && b.commit.apply(b, a) }) }, hide: function () {
                    if (this.parts.dialog.isVisible()) {
                        this.fire("hide", {}); this._.editor.fire("dialogHide", this); this.selectPage(this._.tabIdList[0]);
                        var a = this._.element; a.setStyle("display", "none"); this.parts.dialog.setStyle("visibility", "hidden"); for (z(this); CKEDITOR.dialog._.currentTop != this;)CKEDITOR.dialog._.currentTop.hide(); if (this._.parentDialog) { var b = this._.parentDialog.getElement().getFirst(); this._.parentDialog.getElement().removeStyle("z-index"); b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2)) } else t(this._.editor); if (CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex -=
                            10; else { CKEDITOR.dialog._.currentZIndex = null; a.removeListener("keydown", A); a.removeListener("keyup", q); var c = this._.editor; c.focus(); setTimeout(function () { c.focusManager.unlock(); CKEDITOR.env.iOS && c.window.focus() }, 0) } delete this._.parentDialog; this.foreach(function (a) { a.resetInitValue && a.resetInitValue() }); this.setState(CKEDITOR.DIALOG_STATE_IDLE)
                    }
                }, addPage: function (a) {
                    if (!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
                        for (var b = [], c = a.label ? ' title\x3d"' + CKEDITOR.tools.htmlEncode(a.label) +
                            '"' : "", e = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, { type: "vbox", className: "cke_dialog_page_contents", children: a.elements, expand: !!a.expand, padding: a.padding, style: a.style || "width: 100%;" }, b), d = this._.contents[a.id] = {}, g = e.getChild(), f = 0; e = g.shift();)e.notAllowed || "hbox" == e.type || "vbox" == e.type || f++, d[e.id] = e, "function" == typeof e.getChild && g.push.apply(g, e.getChild()); f || (a.hidden = !0); b = CKEDITOR.dom.element.createFromHtml(b.join("")); b.setAttribute("role", "tabpanel"); b.setStyle("min-height",
                                "100%"); e = CKEDITOR.env; d = "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber(); c = CKEDITOR.dom.element.createFromHtml(['\x3ca class\x3d"cke_dialog_tab"', 0 < this._.pageCount ? " cke_last" : "cke_first", c, a.hidden ? ' style\x3d"display:none"' : "", ' id\x3d"', d, '"', e.gecko && !e.hc ? "" : ' href\x3d"javascript:void(0)"', ' tabIndex\x3d"-1" hidefocus\x3d"true" role\x3d"tab"\x3e', a.label, "\x3c/a\x3e"].join("")); b.setAttribute("aria-labelledby", d); this._.tabs[a.id] = [c, b]; this._.tabIdList.push(a.id); !a.hidden && this._.pageCount++;
                        this._.lastTab = c; this.updateStyle(); b.setAttribute("name", a.id); b.appendTo(this.parts.contents); c.unselectable(); this.parts.tabs.append(c); a.accessKey && (B(this, this, "CTRL+" + a.accessKey, v, y), this._.accessKeyMap["CTRL+" + a.accessKey] = a.id)
                    }
                }, selectPage: function (a) {
                    if (this._.currentTabId != a && !this._.tabs[a][0].hasClass("cke_dialog_tab_disabled") && !1 !== this.fire("selectPage", { page: a, currentPage: this._.currentTabId })) {
                        for (var c in this._.tabs) {
                            var e = this._.tabs[c][0], d = this._.tabs[c][1]; c != a && (e.removeClass("cke_dialog_tab_selected"),
                                e.removeAttribute("aria-selected"), d.hide()); d.setAttribute("aria-hidden", c != a)
                        } var g = this._.tabs[a]; g[0].addClass("cke_dialog_tab_selected"); g[0].setAttribute("aria-selected", !0); CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat ? (b(g[1]), g[1].show(), setTimeout(function () { b(g[1], 1) }, 0)) : g[1].show(); this._.currentTabId = a; this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a)
                    }
                }, updateStyle: function () { this.parts.dialog[(1 === this._.pageCount ? "add" : "remove") + "Class"]("cke_single_page") }, hidePage: function (a) {
                    var b =
                        this._.tabs[a] && this._.tabs[a][0]; b && 1 != this._.pageCount && b.isVisible() && (a == this._.currentTabId && this.selectPage(h.call(this)), b.hide(), this._.pageCount--, this.updateStyle())
                }, showPage: function (a) { if (a = this._.tabs[a] && this._.tabs[a][0]) a.show(), this._.pageCount++, this.updateStyle() }, getElement: function () { return this._.element }, getName: function () { return this._.name }, getContentElement: function (a, b) { var c = this._.contents[a]; return c && c[b] }, getValueOf: function (a, b) { return this.getContentElement(a, b).getValue() },
                setValueOf: function (a, b, c) { return this.getContentElement(a, b).setValue(c) }, getButton: function (a) { return this._.buttons[a] }, click: function (a) { return this._.buttons[a].click() }, disableButton: function (a) { return this._.buttons[a].disable() }, enableButton: function (a) { return this._.buttons[a].enable() }, getPageCount: function () { return this._.pageCount }, getParentEditor: function () { return this._.editor }, getSelectedElement: function () { return this.getParentEditor().getSelection().getSelectedElement() }, addFocusable: function (a,
                    b) { if ("undefined" == typeof b) b = this._.focusList.length, this._.focusList.push(new l(this, a, b)); else { this._.focusList.splice(b, 0, new l(this, a, b)); for (var c = b + 1; c < this._.focusList.length; c++)this._.focusList[c].focusIndex++ } }, setState: function (a) {
                        if (this.state != a) {
                            this.state = a; if (a == CKEDITOR.DIALOG_STATE_BUSY) {
                                if (!this.parts.spinner) {
                                    var b = this.getParentEditor().lang.dir, c = { attributes: { "class": "cke_dialog_spinner" }, styles: { "float": "rtl" == b ? "right" : "left" } }; c.styles["margin-" + ("rtl" == b ? "left" : "right")] =
                                        "8px"; this.parts.spinner = CKEDITOR.document.createElement("div", c); this.parts.spinner.setHtml("\x26#8987;"); this.parts.spinner.appendTo(this.parts.title, 1)
                                } this.parts.spinner.show(); this.getButton("ok") && this.getButton("ok").disable()
                            } else a == CKEDITOR.DIALOG_STATE_IDLE && (this.parts.spinner && this.parts.spinner.hide(), this.getButton("ok") && this.getButton("ok").enable()); this.fire("state", a)
                        }
                    }, getModel: function (a) { return this._.model ? this._.model : this.definition.getModel ? this.definition.getModel(a) : null },
                setModel: function (a) { this._.model = a }, getMode: function (a) { if (this.definition.getMode) return this.definition.getMode(a); a = this.getModel(a); return !a || a instanceof CKEDITOR.dom.element && !a.getParent() ? CKEDITOR.dialog.CREATION_MODE : CKEDITOR.dialog.EDITING_MODE }
            }; CKEDITOR.tools.extend(CKEDITOR.dialog, {
                CREATION_MODE: 0, EDITING_MODE: 1, add: function (a, b) { this._.dialogDefinitions[a] && "function" != typeof b || (this._.dialogDefinitions[a] = b) }, exists: function (a) { return !!this._.dialogDefinitions[a] }, getCurrent: function () { return CKEDITOR.dialog._.currentTop },
                isTabEnabled: function (a, b, c) { a = a.config.removeDialogTabs; return !(a && a.match(new RegExp("(?:^|;)" + b + ":" + c + "(?:$|;)", "i"))) }, okButton: function () { var a = function (a, b) { b = b || {}; return CKEDITOR.tools.extend({ id: "ok", type: "button", label: a.lang.common.ok, "class": "cke_dialog_ui_button_ok", onClick: function (a) { a = a.data.dialog; !1 !== a.fire("ok", { hide: !0 }).hide && a.hide() } }, b, !0) }; a.type = "button"; a.override = function (b) { return CKEDITOR.tools.extend(function (c) { return a(c, b) }, { type: "button" }, !0) }; return a }(), cancelButton: function () {
                    var a =
                        function (a, b) { b = b || {}; return CKEDITOR.tools.extend({ id: "cancel", type: "button", label: a.lang.common.cancel, "class": "cke_dialog_ui_button_cancel", onClick: function (a) { a = a.data.dialog; !1 !== a.fire("cancel", { hide: !0 }).hide && a.hide() } }, b, !0) }; a.type = "button"; a.override = function (b) { return CKEDITOR.tools.extend(function (c) { return a(c, b) }, { type: "button" }, !0) }; return a
                }(), addUIElement: function (a, b) { this._.uiElementBuilders[a] = b }
            }); CKEDITOR.dialog._ = { uiElementBuilders: {}, dialogDefinitions: {}, currentTop: null, currentZIndex: null };
            CKEDITOR.event.implementOn(CKEDITOR.dialog); CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype); F = { resizable: CKEDITOR.DIALOG_RESIZE_BOTH, minWidth: 600, minHeight: 400, buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton] }; var K = function (a, b, c) { for (var e = 0, d; d = a[e]; e++)if (d.id == b || c && d[c] && (d = K(d[c], b, c))) return d; return null }, w = function (a, b, c, e, d) { if (c) { for (var g = 0, f; f = a[g]; g++) { if (f.id == c) return a.splice(g, 0, b), b; if (e && f[e] && (f = w(f[e], b, c, e, !0))) return f } if (d) return null } a.push(b); return b },
                I = function (a, b, c) { for (var e = 0, d; d = a[e]; e++) { if (d.id == b) return a.splice(e, 1); if (c && d[c] && (d = I(d[c], b, c))) return d } return null }; e.prototype = { getContents: function (a) { return K(this.contents, a) }, getButton: function (a) { return K(this.buttons, a) }, addContents: function (a, b) { return w(this.contents, a, b) }, addButton: function (a, b) { return w(this.buttons, a, b) }, removeContents: function (a) { I(this.contents, a) }, removeButton: function (a) { I(this.buttons, a) } }; c.prototype = {
                    get: function (a) { return K(this.elements, a, "children") },
                    add: function (a, b) { return w(this.elements, a, b, "children") }, remove: function (a) { I(this.elements, a, "children") }
                }; var E = {}, P = {}; (function () {
                    CKEDITOR.ui.dialog = {
                        uiElement: function (a, b, c, e, d, g, f) {
                            if (!(4 > arguments.length)) {
                                var k = (e.call ? e(b) : e) || "div", h = ["\x3c", k, " "], l = (d && d.call ? d(b) : d) || {}, m = (g && g.call ? g(b) : g) || {}, n = (f && f.call ? f.call(this, a, b) : f) || "", r = this.domId = m.id || CKEDITOR.tools.getNextId() + "_uiElement"; b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent) && (l.display = "none", this.notAllowed =
                                    !0); m.id = r; var q = {}; b.type && (q["cke_dialog_ui_" + b.type] = 1); b.className && (q[b.className] = 1); b.disabled && (q.cke_disabled = 1); for (var v = m["class"] && m["class"].split ? m["class"].split(" ") : [], r = 0; r < v.length; r++)v[r] && (q[v[r]] = 1); v = []; for (r in q) v.push(r); m["class"] = v.join(" "); b.title && (m.title = b.title); q = (b.style || "").split(";"); b.align && (v = b.align, l["margin-left"] = "left" == v ? 0 : "auto", l["margin-right"] = "right" == v ? 0 : "auto"); for (r in l) q.push(r + ":" + l[r]); b.hidden && q.push("display:none"); for (r = q.length - 1; 0 <=
                                        r; r--)"" === q[r] && q.splice(r, 1); 0 < q.length && (m.style = (m.style ? m.style + "; " : "") + q.join("; ")); for (r in m) h.push(r + '\x3d"' + CKEDITOR.tools.htmlEncode(m[r]) + '" '); h.push("\x3e", n, "\x3c/", k, "\x3e"); c.push(h.join("")); (this._ || (this._ = {})).dialog = a; "boolean" == typeof b.isChanged && (this.isChanged = function () { return b.isChanged }); "function" == typeof b.isChanged && (this.isChanged = b.isChanged); "function" == typeof b.setValue && (this.setValue = CKEDITOR.tools.override(this.setValue, function (a) {
                                            return function (c) {
                                                a.call(this,
                                                    b.setValue.call(this, c))
                                            }
                                        })); "function" == typeof b.getValue && (this.getValue = CKEDITOR.tools.override(this.getValue, function (a) { return function () { return b.getValue.call(this, a.call(this)) } })); CKEDITOR.event.implementOn(this); this.registerEvents(b); this.accessKeyUp && this.accessKeyDown && b.accessKey && B(this, a, "CTRL+" + b.accessKey); var t = this; a.on("load", function () {
                                            var b = t.getInputElement(); if (b) {
                                                var c = t.type in { checkbox: 1, ratio: 1 } && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? "cke_dialog_ui_focused" : ""; b.on("focus",
                                                    function () { a._.tabBarMode = !1; a._.hasFocus = !0; t.fire("focus"); c && this.addClass(c) }); b.on("blur", function () { t.fire("blur"); c && this.removeClass(c) })
                                            }
                                        }); CKEDITOR.tools.extend(this, b); this.keyboardFocusable && (this.tabIndex = b.tabIndex || 0, this.focusIndex = a._.focusList.push(this) - 1, this.on("focus", function () { a._.currentFocusIndex = t.focusIndex }))
                            }
                        }, hbox: function (a, b, c, e, d) {
                            if (!(4 > arguments.length)) {
                                this._ || (this._ = {}); var g = this._.children = b, f = d && d.widths || null, k = d && d.height || null, h, l = { role: "presentation" };
                                d && d.align && (l.align = d.align); CKEDITOR.ui.dialog.uiElement.call(this, a, d || { type: "hbox" }, e, "table", {}, l, function () {
                                    var a = ['\x3ctbody\x3e\x3ctr class\x3d"cke_dialog_ui_hbox"\x3e']; for (h = 0; h < c.length; h++) {
                                        var b = "cke_dialog_ui_hbox_child", e = []; 0 === h && (b = "cke_dialog_ui_hbox_first"); h == c.length - 1 && (b = "cke_dialog_ui_hbox_last"); a.push('\x3ctd class\x3d"', b, '" role\x3d"presentation" '); f ? f[h] && e.push("width:" + C(f[h])) : e.push("width:" + Math.floor(100 / c.length) + "%"); k && e.push("height:" + C(k)); d && void 0 !== d.padding &&
                                            e.push("padding:" + C(d.padding)); CKEDITOR.env.ie && CKEDITOR.env.quirks && g[h].align && e.push("text-align:" + g[h].align); 0 < e.length && a.push('style\x3d"' + e.join("; ") + '" '); a.push("\x3e", c[h], "\x3c/td\x3e")
                                    } a.push("\x3c/tr\x3e\x3c/tbody\x3e"); return a.join("")
                                })
                            }
                        }, vbox: function (a, b, c, e, d) {
                            if (!(3 > arguments.length)) {
                                this._ || (this._ = {}); var g = this._.children = b, f = d && d.width || null, k = d && d.heights || null; CKEDITOR.ui.dialog.uiElement.call(this, a, d || { type: "vbox" }, e, "div", null, { role: "presentation" }, function () {
                                    var b =
                                        ['\x3ctable role\x3d"presentation" cellspacing\x3d"0" border\x3d"0" ']; b.push('style\x3d"'); d && d.expand && b.push("height:100%;"); b.push("width:" + C(f || "100%"), ";"); CKEDITOR.env.webkit && b.push("float:none;"); b.push('"'); b.push('align\x3d"', CKEDITOR.tools.htmlEncode(d && d.align || ("ltr" == a.getParentEditor().lang.dir ? "left" : "right")), '" '); b.push("\x3e\x3ctbody\x3e"); for (var e = 0; e < c.length; e++) {
                                            var h = []; b.push('\x3ctr\x3e\x3ctd role\x3d"presentation" '); f && h.push("width:" + C(f || "100%")); k ? h.push("height:" +
                                                C(k[e])) : d && d.expand && h.push("height:" + Math.floor(100 / c.length) + "%"); d && void 0 !== d.padding && h.push("padding:" + C(d.padding)); CKEDITOR.env.ie && CKEDITOR.env.quirks && g[e].align && h.push("text-align:" + g[e].align); 0 < h.length && b.push('style\x3d"', h.join("; "), '" '); b.push(' class\x3d"cke_dialog_ui_vbox_child"\x3e', c[e], "\x3c/td\x3e\x3c/tr\x3e")
                                        } b.push("\x3c/tbody\x3e\x3c/table\x3e"); return b.join("")
                                })
                            }
                        }
                    }
                })(); CKEDITOR.ui.dialog.uiElement.prototype = {
                    getElement: function () { return CKEDITOR.document.getById(this.domId) },
                    getInputElement: function () { return this.getElement() }, getDialog: function () { return this._.dialog }, setValue: function (a, b) { this.getInputElement().setValue(a); !b && this.fire("change", { value: a }); return this }, getValue: function () { return this.getInputElement().getValue() }, isChanged: function () { return !1 }, selectParentTab: function () {
                        for (var a = this.getInputElement(); (a = a.getParent()) && -1 == a.$.className.search("cke_dialog_page_contents");); if (!a) return this; a = a.getAttribute("name"); this._.dialog._.currentTabId !=
                            a && this._.dialog.selectPage(a); return this
                    }, focus: function () { this.selectParentTab().getInputElement().focus(); return this }, registerEvents: function (a) { var b = /^on([A-Z]\w+)/, c, e = function (a, b, c, e) { b.on("load", function () { a.getInputElement().on(c, e, a) }) }, d; for (d in a) if (c = d.match(b)) this.eventProcessors[d] ? this.eventProcessors[d].call(this, this._.dialog, a[d]) : e(this, this._.dialog, c[1].toLowerCase(), a[d]); return this }, eventProcessors: {
                        onLoad: function (a, b) { a.on("load", b, this) }, onShow: function (a, b) {
                            a.on("show",
                                b, this)
                        }, onHide: function (a, b) { a.on("hide", b, this) }
                    }, accessKeyDown: function () { this.focus() }, accessKeyUp: function () { }, disable: function () { var a = this.getElement(); this.getInputElement().setAttribute("disabled", "true"); a.addClass("cke_disabled") }, enable: function () { var a = this.getElement(); this.getInputElement().removeAttribute("disabled"); a.removeClass("cke_disabled") }, isEnabled: function () { return !this.getElement().hasClass("cke_disabled") }, isVisible: function () { return this.getInputElement().isVisible() },
                    isFocusable: function () { return this.isEnabled() && this.isVisible() ? !0 : !1 }
                }; CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, { getChild: function (a) { if (1 > arguments.length) return this._.children.concat(); a.splice || (a = [a]); return 2 > a.length ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null } }, !0); CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox; (function () {
                    var a = {
                        build: function (a,
                            b, c) { for (var e = b.children, d, g = [], f = [], k = 0; k < e.length && (d = e[k]); k++) { var h = []; g.push(h); f.push(CKEDITOR.dialog._.uiElementBuilders[d.type].build(a, d, h)) } return new CKEDITOR.ui.dialog[b.type](a, f, g, c, b) }
                    }; CKEDITOR.dialog.addUIElement("hbox", a); CKEDITOR.dialog.addUIElement("vbox", a)
                })(); CKEDITOR.dialogCommand = function (a, b) { this.dialogName = a; CKEDITOR.tools.extend(this, b, !0) }; CKEDITOR.dialogCommand.prototype = {
                    exec: function (a) { var b = this.tabId; a.openDialog(this.dialogName, function (a) { b && a.selectPage(b) }) },
                    canUndo: !1, editorFocus: 1
                }; (function () {
                    var a = /^\d*$/, b = /^\d*(?:\.\d+)?$/, c = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/, e = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i, d = /^(--|-?([a-zA-Z_]|\\))(\\|[a-zA-Z0-9-_])*\s*?:\s*?[^:;]+$/; CKEDITOR.VALIDATE_OR = 1; CKEDITOR.VALIDATE_AND = 2; CKEDITOR.dialog.validate = {
                        functions: function () {
                            var a = arguments; return function (b) {
                                this && this.getValue && (b = this.getValue()); var c, e = CKEDITOR.VALIDATE_AND, d = [], g; for (g = 0; g < a.length; g++)if ("function" == typeof a[g]) d.push(a[g]);
                                else break; g < a.length && "string" == typeof a[g] && (c = a[g], g++); g < a.length && "number" == typeof a[g] && (e = a[g]); g = e == CKEDITOR.VALIDATE_AND; for (var f = 0; f < d.length; f++) { var k = !0 === d[f](b); g = e == CKEDITOR.VALIDATE_AND ? g && k : g || k } return g ? !0 : c
                            }
                        }, regex: function (a, b) { return this.functions(function (b) { return a.test(b) }, b) }, notEmpty: function (a) {
                            return this.functions(function (a) {
                                return 0 < a.replace(RegExp("^[\\u0020\\u00a0\\u1680\\u202f\\u205f\\u3000\\u2000-\\u200a\\s]+|[\\u0020\\u00a0\\u1680\\u202f\\u205f\\u3000\\u2000-\\u200a\\s]+$",
                                    "g"), "").length
                            }, a)
                        }, integer: function (b) { return this.regex(a, b) }, number: function (a) { return this.regex(b, a) }, cssLength: function (a) { return this.functions(function (a) { return e.test(CKEDITOR.tools.trim(a)) }, a) }, htmlLength: function (a) { return this.functions(function (a) { return c.test(CKEDITOR.tools.trim(a)) }, a) }, inlineStyle: function (a) {
                            return this.functions(function (a) { a = CKEDITOR.tools.trim(a).split(";"); "" === a[a.length - 1] && a.pop(); return CKEDITOR.tools.array.every(a, function (a) { return d.test(CKEDITOR.tools.trim(a)) }) },
                                a)
                        }, equals: function (a, b) { return this.functions(function (b) { return b == a }, b) }, notEqual: function (a, b) { return this.functions(function (b) { return b != a }, b) }
                    }; CKEDITOR.on("instanceDestroyed", function (a) { if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) { for (var b; b = CKEDITOR.dialog._.currentTop;)b.hide(); for (var c in E) E[c].remove(); E = {} } a = a.editor._.storedDialogs; for (var e in a) a[e].destroy() })
                })(); CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                    openDialog: function (a, b, c) {
                        var e = null, d = CKEDITOR.dialog._.dialogDefinitions[a];
                        null === CKEDITOR.dialog._.currentTop && p(this); if ("function" == typeof d) d = this._.storedDialogs || (this._.storedDialogs = {}), e = d[a] || (d[a] = new CKEDITOR.dialog(this, a)), e.setModel(c), b && b.call(e, e), e.show(); else {
                            if ("failed" == d) throw t(this), Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.'); "string" == typeof d && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d), function () {
                                "function" != typeof CKEDITOR.dialog._.dialogDefinitions[a] && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed");
                                this.openDialog(a, b, c)
                            }, this, 0, 1)
                        } CKEDITOR.skin.loadPart("dialog"); if (e) e.once("hide", function () { e.setModel(null) }, null, null, 999); return e
                    }
                }); CKEDITOR.plugins.add("dialog", { requires: "dialogui", init: function (a) { G || (CKEDITOR.document.appendStyleSheet(this.path + "styles/dialog.css"), G = !0); a.on("doubleclick", function (b) { b.data.dialog && a.openDialog(b.data.dialog) }, null, null, 999) } })
        })(); (function () {
            CKEDITOR.plugins.add("a11yhelp", {
                requires: "dialog", availableLangs: {
                    af: 1, ar: 1, az: 1, bg: 1, ca: 1, cs: 1, cy: 1, da: 1,
                    de: 1, "de-ch": 1, el: 1, en: 1, "en-au": 1, "en-gb": 1, eo: 1, es: 1, "es-mx": 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, fr: 1, "fr-ca": 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, it: 1, ja: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, pt: 1, "pt-br": 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, sr: 1, "sr-latn": 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, zh: 1, "zh-cn": 1
                }, init: function (a) {
                    var h = this; a.addCommand("a11yHelp", {
                        exec: function () {
                            var f = a.langCode, f = h.availableLangs[f] ? f : h.availableLangs[f.replace(/-.*/, "")] ? f.replace(/-.*/, "") : "en"; CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(h.path +
                                "dialogs/lang/" + f + ".js"), function () { a.lang.a11yhelp = h.langEntries[f]; a.openDialog("a11yHelp") })
                        }, modes: { wysiwyg: 1, source: 1 }, readOnly: 1, canUndo: !1
                    }); a.setKeystroke(CKEDITOR.ALT + 48, "a11yHelp"); CKEDITOR.dialog.add("a11yHelp", this.path + "dialogs/a11yhelp.js"); a.on("ariaEditorHelpLabel", function (f) { f.data.label = a.lang.common.editorHelp })
                }
            })
        })(); CKEDITOR.plugins.add("about", {
            requires: "dialog", init: function (a) {
                var h = a.addCommand("about", new CKEDITOR.dialogCommand("about")); h.modes = { wysiwyg: 1, source: 1 }; h.canUndo =
                    !1; h.readOnly = 1; a.ui.addButton && a.ui.addButton("About", { label: a.lang.about.dlgTitle, command: "about", toolbar: "about" }); CKEDITOR.dialog.add("about", this.path + "dialogs/about.js")
            }
        }); CKEDITOR.plugins.add("basicstyles", {
            init: function (a) {
                var h = 0, f = function (d, f, g, e) {
                    if (e) {
                        e = new CKEDITOR.style(e); var c = b[g]; c.unshift(e); a.attachStyleStateChange(e, function (b) { !a.readOnly && a.getCommand(g).setState(b) }); a.addCommand(g, new CKEDITOR.styleCommand(e, { contentForms: c })); a.ui.addButton && a.ui.addButton(d, {
                            isToggle: !0,
                            label: f, command: g, toolbar: "basicstyles," + (h += 10)
                        })
                    }
                }, b = { bold: ["strong", "b", ["span", function (a) { a = a.styles["font-weight"]; return "bold" == a || 700 <= +a }]], italic: ["em", "i", ["span", function (a) { return "italic" == a.styles["font-style"] }]], underline: ["u", ["span", function (a) { return "underline" == a.styles["text-decoration"] }]], strike: ["s", "strike", ["span", function (a) { return "line-through" == a.styles["text-decoration"] }]], subscript: ["sub"], superscript: ["sup"] }, d = a.config, m = a.lang.basicstyles; f("Bold", m.bold, "bold",
                    d.coreStyles_bold); f("Italic", m.italic, "italic", d.coreStyles_italic); f("Underline", m.underline, "underline", d.coreStyles_underline); f("Strike", m.strike, "strike", d.coreStyles_strike); f("Subscript", m.subscript, "subscript", d.coreStyles_subscript); f("Superscript", m.superscript, "superscript", d.coreStyles_superscript); a.setKeystroke([[CKEDITOR.CTRL + 66, "bold"], [CKEDITOR.CTRL + 73, "italic"], [CKEDITOR.CTRL + 85, "underline"]])
            }, afterInit: function (a) {
                if (a.config.coreStyles_toggleSubSup) {
                    var h = a.getCommand("subscript"),
                        f = a.getCommand("superscript"); if (h && f) a.on("afterCommandExec", function (b) { b = b.data.name; if ("subscript" === b || "superscript" === b) { var d = "subscript" === b ? f : h; ("subscript" === b ? h : f).state === CKEDITOR.TRISTATE_ON && d.state === CKEDITOR.TRISTATE_ON && (d.exec(a), a.fire("updateSnapshot")) } })
                }
            }
        }); CKEDITOR.config.coreStyles_bold = { element: "strong", overrides: "b" }; CKEDITOR.config.coreStyles_italic = { element: "em", overrides: "i" }; CKEDITOR.config.coreStyles_underline = { element: "u" }; CKEDITOR.config.coreStyles_strike = {
            element: "s",
            overrides: "strike"
        }; CKEDITOR.config.coreStyles_subscript = { element: "sub" }; CKEDITOR.config.coreStyles_superscript = { element: "sup" }; CKEDITOR.config.coreStyles_toggleSubSup = !1; (function () {
            function a(a, b, e, d) {
                if (!a.isReadOnly() && !a.equals(e.editable())) {
                    CKEDITOR.dom.element.setMarker(d, a, "bidi_processed", 1); d = a; for (var g = e.editable(); (d = d.getParent()) && !d.equals(g);)if (d.getCustomData("bidi_processed")) { a.removeStyle("direction"); a.removeAttribute("dir"); return } d = e.config.useComputedState; (d ? a.getComputedStyle("direction") :
                        a.getStyle("direction") || a.hasAttribute("dir")) != b && (a.removeStyle("direction"), d ? (a.removeAttribute("dir"), b != a.getComputedStyle("direction") && a.setAttribute("dir", b)) : a.setAttribute("dir", b), e.forceNextSelectionCheck())
                }
            } function h(a, b, e) {
                var d = a.getCommonAncestor(!1, !0); a = a.clone(); a.enlarge(e == CKEDITOR.ENTER_BR ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS); if (a.checkBoundaryOfElement(d, CKEDITOR.START) && a.checkBoundaryOfElement(d, CKEDITOR.END)) {
                    for (var g; d && d.type == CKEDITOR.NODE_ELEMENT &&
                        (g = d.getParent()) && 1 == g.getChildCount() && !(d.getName() in b);)d = g; return d.type == CKEDITOR.NODE_ELEMENT && d.getName() in b && d
                }
            } function f(b) {
                return {
                    context: "p", allowedContent: { "h1 h2 h3 h4 h5 h6 table ul ol blockquote div tr p div li td": { propertiesOnly: !0, attributes: "dir" } }, requiredContent: "p[dir]", refresh: function (a, b) {
                        var c = a.config.useComputedState, e; if (!c) { e = b.lastElement; for (var d = a.editable(); e && !(e.getName() in k || e.equals(d));) { var g = e.getParent(); if (!g) break; e = g } } e = e || b.block || b.blockLimit; e.equals(a.editable()) &&
                            (d = a.getSelection().getRanges()[0].getEnclosedNode()) && d.type == CKEDITOR.NODE_ELEMENT && (e = d); e && (c = c ? e.getComputedStyle("direction") : e.getStyle("direction") || e.getAttribute("dir"), a.getCommand("bidirtl").setState("rtl" == c ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF), a.getCommand("bidiltr").setState("ltr" == c ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)); c = (b.block || b.blockLimit || a.editable()).getDirection(1); c != (a._.selDir || a.lang.dir) && (a._.selDir = c, a.fire("contentDirChanged", c))
                    }, exec: function (e) {
                        var g =
                            e.getSelection(), f = e.config.enterMode, k = g.getRanges(); if (k && k.length) {
                                for (var l = {}, t = g.createBookmarks(), k = k.createIterator(), A, q = 0; A = k.getNextRange(1);) {
                                    var B = A.getEnclosedNode(); B && (!B || B.type == CKEDITOR.NODE_ELEMENT && B.getName() in m) || (B = h(A, d, f)); B && a(B, b, e, l); var z = new CKEDITOR.dom.walker(A), y = t[q].startNode, v = t[q++].endNode; z.evaluator = function (a) {
                                        var b = f == CKEDITOR.ENTER_P ? "p" : "div", c; if (c = (a ? a.type == CKEDITOR.NODE_ELEMENT : !1) && a.getName() in d) {
                                            if (b = a.is(b)) b = (b = a.getParent()) ? b.type == CKEDITOR.NODE_ELEMENT :
                                                !1; c = !(b && a.getParent().is("blockquote"))
                                        } return !!(c && a.getPosition(y) & CKEDITOR.POSITION_FOLLOWING && (a.getPosition(v) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_CONTAINS) == CKEDITOR.POSITION_PRECEDING)
                                    }; for (; B = z.next();)a(B, b, e, l); A = A.createIterator(); for (A.enlargeBr = f != CKEDITOR.ENTER_BR; B = A.getNextParagraph(f == CKEDITOR.ENTER_P ? "p" : "div");)a(B, b, e, l)
                                } CKEDITOR.dom.element.clearAllMarkers(l); e.forceNextSelectionCheck(); g.selectBookmarks(t); e.focus()
                            }
                    }
                }
            } function b(a) {
                var b = a == l.setAttribute, e = a == l.removeAttribute,
                    d = /\bdirection\s*:\s*(.*?)\s*(:?$|;)/; return function (g, f) { if (!this.isReadOnly()) { var k; if (k = g == (b || e ? "dir" : "direction") || "style" == g && (e || d.test(f))) { a: { k = this; for (var h = k.getDocument().getBody().getParent(); k;) { if (k.equals(h)) { k = !1; break a } k = k.getParent() } k = !0 } k = !k } if (k && (k = this.getDirection(1), h = a.apply(this, arguments), k != this.getDirection(1))) return this.getDocument().fire("dirChanged", this), h } return a.apply(this, arguments) }
            } var d = { table: 1, ul: 1, ol: 1, blockquote: 1, div: 1 }, m = {}, k = {}; CKEDITOR.tools.extend(m,
                d, { tr: 1, p: 1, div: 1, li: 1 }); CKEDITOR.tools.extend(k, m, { td: 1 }); CKEDITOR.plugins.add("bidi", {
                    init: function (a) {
                        function b(e, d, g, f, k) { a.addCommand(g, new CKEDITOR.command(a, f)); a.ui.addButton && a.ui.addButton(e, { isToggle: !0, label: d, command: g, toolbar: "bidi," + k }) } if (!a.blockless) {
                            var e = a.lang.bidi; b("BidiLtr", e.ltr, "bidiltr", f("ltr"), 10); b("BidiRtl", e.rtl, "bidirtl", f("rtl"), 20); a.on("contentDom", function () { a.document.on("dirChanged", function (b) { a.fire("dirChanged", { node: b.data, dir: b.data.getDirection(1) }) }) });
                            a.on("contentDirChanged", function (b) { b = (a.lang.dir != b.data ? "add" : "remove") + "Class"; var e = a.ui.space(a.config.toolbarLocation); if (e) e[b]("cke_mixed_dir_content") })
                        }
                    }
                }); for (var l = CKEDITOR.dom.element.prototype, g = ["setStyle", "removeStyle", "setAttribute", "removeAttribute"], e = 0; e < g.length; e++)l[g[e]] = CKEDITOR.tools.override(l[g[e]], b)
        })(); (function () {
            var a = {
                exec: function (a) {
                    var f = a.getCommand("blockquote").state, b = a.getSelection(), d = b && b.getRanges()[0]; if (d) {
                        var m = b.createBookmarks(); if (CKEDITOR.env.ie) {
                            var k =
                                m[0].startNode, l = m[0].endNode, g; if (k && "blockquote" == k.getParent().getName()) for (g = k; g = g.getNext();)if (g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary()) { k.move(g, !0); break } if (l && "blockquote" == l.getParent().getName()) for (g = l; g = g.getPrevious();)if (g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary()) { l.move(g); break }
                        } var e = d.createIterator(); e.enlargeBr = a.config.enterMode != CKEDITOR.ENTER_BR; if (f == CKEDITOR.TRISTATE_OFF) {
                            for (k = []; f = e.getNextParagraph();)k.push(f); 1 > k.length && (f = a.document.createElement(a.config.enterMode ==
                                CKEDITOR.ENTER_P ? "p" : "div"), l = m.shift(), d.insertNode(f), f.append(new CKEDITOR.dom.text("﻿", a.document)), d.moveToBookmark(l), d.selectNodeContents(f), d.collapse(!0), l = d.createBookmark(), k.push(f), m.unshift(l)); g = k[0].getParent(); d = []; for (l = 0; l < k.length; l++)f = k[l], g = g.getCommonAncestor(f.getParent()); for (f = { table: 1, tbody: 1, tr: 1, ol: 1, ul: 1 }; f[g.getName()];)g = g.getParent(); for (l = null; 0 < k.length;) { for (f = k.shift(); !f.getParent().equals(g);)f = f.getParent(); f.equals(l) || d.push(f); l = f } for (; 0 < d.length;)if (f =
                                    d.shift(), "blockquote" == f.getName()) { for (l = new CKEDITOR.dom.documentFragment(a.document); f.getFirst();)l.append(f.getFirst().remove()), k.push(l.getLast()); l.replace(f) } else k.push(f); d = a.document.createElement("blockquote"); for (d.insertBefore(k[0]); 0 < k.length;)f = k.shift(), d.append(f)
                        } else if (f == CKEDITOR.TRISTATE_ON) {
                            l = []; for (g = {}; f = e.getNextParagraph();) {
                                for (k = d = null; f.getParent();) { if ("blockquote" == f.getParent().getName()) { d = f.getParent(); k = f; break } f = f.getParent() } d && k && !k.getCustomData("blockquote_moveout") &&
                                    (l.push(k), CKEDITOR.dom.element.setMarker(g, k, "blockquote_moveout", !0))
                            } CKEDITOR.dom.element.clearAllMarkers(g); f = []; k = []; for (g = {}; 0 < l.length;)e = l.shift(), d = e.getParent(), e.getPrevious() ? e.getNext() ? (e.breakParent(e.getParent()), k.push(e.getNext())) : e.remove().insertAfter(d) : e.remove().insertBefore(d), d.getCustomData("blockquote_processed") || (k.push(d), CKEDITOR.dom.element.setMarker(g, d, "blockquote_processed", !0)), f.push(e); CKEDITOR.dom.element.clearAllMarkers(g); for (l = k.length - 1; 0 <= l; l--) {
                                d = k[l];
                                a: { g = d; for (var e = 0, c = g.getChildCount(), n = void 0; e < c && (n = g.getChild(e)); e++)if (n.type == CKEDITOR.NODE_ELEMENT && n.isBlockBoundary()) { g = !1; break a } g = !0 } g && d.remove()
                            } if (a.config.enterMode == CKEDITOR.ENTER_BR) for (d = !0; f.length;)if (e = f.shift(), "div" == e.getName()) {
                                l = new CKEDITOR.dom.documentFragment(a.document); !d || !e.getPrevious() || e.getPrevious().type == CKEDITOR.NODE_ELEMENT && e.getPrevious().isBlockBoundary() || l.append(a.document.createElement("br")); for (d = e.getNext() && !(e.getNext().type == CKEDITOR.NODE_ELEMENT &&
                                    e.getNext().isBlockBoundary()); e.getFirst();)e.getFirst().remove().appendTo(l); d && l.append(a.document.createElement("br")); l.replace(e); d = !1
                            }
                        } b.selectBookmarks(m); a.focus()
                    }
                }, refresh: function (a, f) { this.setState(a.elementPath(f.block || f.blockLimit).contains("blockquote", 1) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) }, context: "blockquote", allowedContent: "blockquote", requiredContent: "blockquote"
            }; CKEDITOR.plugins.add("blockquote", {
                init: function (h) {
                    h.blockless || (h.addCommand("blockquote", a), h.ui.addButton &&
                        h.ui.addButton("Blockquote", { isToggle: !0, label: h.lang.blockquote.toolbar, command: "blockquote", toolbar: "blocks,10" }))
                }
            })
        })(); "use strict"; (function () {
            function a(a, b) { CKEDITOR.tools.extend(this, b, { editor: a, id: "cke-" + CKEDITOR.tools.getUniqueId(), area: a._.notificationArea }); b.type || (this.type = "info"); this.element = this._createElement(); a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(this.element) } function h(a) {
                var b = this; this.editor = a; this.notifications = []; this.element = this._createElement();
                this._uiBuffer = CKEDITOR.tools.eventsBuffer(10, this._layout, this); this._changeBuffer = CKEDITOR.tools.eventsBuffer(500, this._layout, this); a.on("destroy", function () { b._removeListeners(); b.element.remove() })
            } CKEDITOR.plugins.add("notification", {
                init: function (a) {
                    function b(a) {
                        var b = new CKEDITOR.dom.element("div"); b.setStyles({ position: "fixed", "margin-left": "-9999px" }); b.setAttributes({ "aria-live": "assertive", "aria-atomic": "true" }); b.setText(a); CKEDITOR.document.getBody().append(b); setTimeout(function () { b.remove() },
                            100)
                    } a._.notificationArea = new h(a); a.showNotification = function (b, h, k) { var l, g; "progress" == h ? l = k : g = k; b = new CKEDITOR.plugins.notification(a, { message: b, type: h, progress: l, duration: g }); b.show(); return b }; a.on("key", function (d) { if (27 == d.data.keyCode) { var h = a._.notificationArea.notifications; h.length && (b(a.lang.notification.closed), h[h.length - 1].hide(), d.cancel()) } })
                }
            }); a.prototype = {
                show: function () { !1 !== this.editor.fire("notificationShow", { notification: this }) && (this.area.add(this), this._hideAfterTimeout()) },
                update: function (a) {
                    var b = !0; !1 === this.editor.fire("notificationUpdate", { notification: this, options: a }) && (b = !1); var d = this.element, h = d.findOne(".cke_notification_message"), k = d.findOne(".cke_notification_progress"), l = a.type; d.removeAttribute("role"); a.progress && "progress" != this.type && (l = "progress"); l && (d.removeClass(this._getClass()), d.removeAttribute("aria-label"), this.type = l, d.addClass(this._getClass()), d.setAttribute("aria-label", this.type), "progress" != this.type || k ? "progress" != this.type && k && k.remove() :
                        (k = this._createProgressElement(), k.insertBefore(h))); void 0 !== a.message && (this.message = a.message, h.setHtml(this.message)); void 0 !== a.progress && (this.progress = a.progress, k && k.setStyle("width", this._getPercentageProgress())); b && a.important && (d.setAttribute("role", "alert"), this.isVisible() || this.area.add(this)); this.duration = a.duration; this._hideAfterTimeout()
                }, hide: function () { !1 !== this.editor.fire("notificationHide", { notification: this }) && this.area.remove(this) }, isVisible: function () {
                    return 0 <= CKEDITOR.tools.indexOf(this.area.notifications,
                        this)
                }, _createElement: function () {
                    var a = this, b, d, h = this.editor.lang.common.close; b = new CKEDITOR.dom.element("div"); b.addClass("cke_notification"); b.addClass(this._getClass()); b.setAttributes({ id: this.id, role: "alert", "aria-label": this.type }); "progress" == this.type && b.append(this._createProgressElement()); d = new CKEDITOR.dom.element("p"); d.addClass("cke_notification_message"); d.setHtml(this.message); b.append(d); d = CKEDITOR.dom.element.createFromHtml('\x3ca class\x3d"cke_notification_close" href\x3d"javascript:void(0)" title\x3d"' +
                        h + '" role\x3d"button" tabindex\x3d"-1"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e'); b.append(d); d.on("click", function () { a.editor.focus(); a.hide() }); return b
                }, _getClass: function () { return "progress" == this.type ? "cke_notification_info" : "cke_notification_" + this.type }, _createProgressElement: function () { var a = new CKEDITOR.dom.element("span"); a.addClass("cke_notification_progress"); a.setStyle("width", this._getPercentageProgress()); return a }, _getPercentageProgress: function () {
                    return Math.round(100 *
                        (this.progress || 0)) + "%"
                }, _hideAfterTimeout: function () { var a = this, b; this._hideTimeoutId && clearTimeout(this._hideTimeoutId); if ("number" == typeof this.duration) b = this.duration; else if ("info" == this.type || "success" == this.type) b = "number" == typeof this.editor.config.notification_duration ? this.editor.config.notification_duration : 5E3; b && (a._hideTimeoutId = setTimeout(function () { a.hide() }, b)) }
            }; h.prototype = {
                add: function (a) {
                    this.notifications.push(a); this.element.append(a.element); 1 == this.element.getChildCount() &&
                        (CKEDITOR.document.getBody().append(this.element), this._attachListeners()); this._layout()
                }, remove: function (a) { var b = CKEDITOR.tools.indexOf(this.notifications, a); 0 > b || (this.notifications.splice(b, 1), a.element.remove(), this.element.getChildCount() || (this._removeListeners(), this.element.remove())) }, _createElement: function () {
                    var a = this.editor, b = a.config, d = new CKEDITOR.dom.element("div"); d.addClass("cke_notifications_area"); d.setAttribute("id", "cke_notifications_area_" + a.name); d.setStyle("z-index", b.baseFloatZIndex -
                        2); return d
                }, _attachListeners: function () { var a = CKEDITOR.document.getWindow(), b = this.editor; a.on("scroll", this._uiBuffer.input); a.on("resize", this._uiBuffer.input); b.on("change", this._changeBuffer.input); b.on("floatingSpaceLayout", this._layout, this, null, 20); b.on("blur", this._layout, this, null, 20) }, _removeListeners: function () {
                    var a = CKEDITOR.document.getWindow(), b = this.editor; a.removeListener("scroll", this._uiBuffer.input); a.removeListener("resize", this._uiBuffer.input); b.removeListener("change", this._changeBuffer.input);
                    b.removeListener("floatingSpaceLayout", this._layout); b.removeListener("blur", this._layout)
                }, _layout: function () {
                    function a() { b.setStyle("left", A(q + h.width - n - r)) } var b = this.element, d = this.editor, h = d.ui.contentsElement.getClientRect(), k = d.ui.contentsElement.getDocumentPosition(), l, g, e = b.getClientRect(), c, n = this._notificationWidth, r = this._notificationMargin; c = CKEDITOR.document.getWindow(); var x = c.getScrollPosition(), u = c.getViewPaneSize(), p = CKEDITOR.document.getBody(), t = p.getDocumentPosition(), A = CKEDITOR.tools.cssLength;
                    n && r || (c = this.element.getChild(0), n = this._notificationWidth = c.getClientRect().width, r = this._notificationMargin = parseInt(c.getComputedStyle("margin-left"), 10) + parseInt(c.getComputedStyle("margin-right"), 10)); d.toolbar && (l = d.ui.space(d.config.toolbarLocation), g = l.getClientRect()); l && l.isVisible() && g.bottom > h.top && g.bottom < h.bottom - e.height ? b.setStyles({ position: "fixed", top: A(g.bottom) }) : 0 < h.top ? b.setStyles({ position: "absolute", top: A(k.y) }) : k.y + h.height - e.height > x.y ? b.setStyles({ position: "fixed", top: 0 }) :
                        b.setStyles({ position: "absolute", top: A(k.y + h.height - e.height) }); var q = "fixed" == b.getStyle("position") ? h.left : "static" != p.getComputedStyle("position") ? k.x - t.x : k.x; h.width < n + r ? k.x + n + r > x.x + u.width ? a() : b.setStyle("left", A(q)) : k.x + n + r > x.x + u.width ? b.setStyle("left", A(q)) : k.x + h.width / 2 + n / 2 + r > x.x + u.width ? b.setStyle("left", A(q - k.x + x.x + u.width - n - r)) : 0 > h.left + h.width - n - r ? a() : 0 > h.left + h.width / 2 - n / 2 ? b.setStyle("left", A(q - k.x + x.x)) : b.setStyle("left", A(q + h.width / 2 - n / 2 - r / 2))
                }
            }; CKEDITOR.plugins.notification = a
        })();
        (function () {
            var a = '\x3ca id\x3d"{id}" class\x3d"cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' title\x3d"{title}" tabindex\x3d"-1" hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasArrow}" aria-disabled\x3d"{ariaDisabled}"{hasArrowAriaHtml}{toggleAriaHtml}'; CKEDITOR.env.gecko && CKEDITOR.env.mac && (a += ' onkeypress\x3d"return false;"');
            CKEDITOR.env.gecko && (a += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); var h = ""; CKEDITOR.env.ie && (h = 'return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26'); var a = a + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" onclick\x3d"' + h + 'CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{style}"') +
                '\x3e\x26nbsp;\x3c/span\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_button_label cke_button__{name}_label" aria-hidden\x3d"false"\x3e{label}\x3c/span\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_button_label" aria-hidden\x3d"false"\x3e{ariaShortcutSpace}{ariaShortcut}\x3c/span\x3e{arrowHtml}\x3c/a\x3e', f = CKEDITOR.addTemplate("buttonArrow", '\x3cspan class\x3d"cke_button_arrow"\x3e' + (CKEDITOR.env.hc ? "\x26#9660;" : "") + "\x3c/span\x3e"), b = CKEDITOR.addTemplate("button", a); CKEDITOR.plugins.add("button",
                    { beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler) } }); CKEDITOR.UI_BUTTON = "button"; CKEDITOR.ui.button = function (a) { CKEDITOR.tools.extend(this, a, { isToggle: a.isToggle || !1, title: a.label, click: a.click || function (b) { b.execCommand(a.command) } }); this._ = {} }; CKEDITOR.ui.button.handler = { create: function (a) { return new CKEDITOR.ui.button(a) } }; CKEDITOR.ui.button.prototype = {
                        render: function (a, h) {
                            function k() {
                                var b = a.mode; b && (b = this.modes[b] ? void 0 !== l[b] ? l[b] : CKEDITOR.TRISTATE_OFF :
                                    CKEDITOR.TRISTATE_DISABLED, b = a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : b, this.setState(b), this.refresh && this.refresh())
                            } var l = null, g = CKEDITOR.env, e = this._.id = CKEDITOR.tools.getNextId(), c = "", n = this.command, r, x, u; this._.editor = a; var p = { id: e, button: this, editor: a, focus: function () { CKEDITOR.document.getById(e).focus() }, execute: function () { this.button.click(a) }, attach: function (a) { this.button.attach(a) } }, t = CKEDITOR.tools.addFunction(function (a) {
                                if (p.onkey) return a = new CKEDITOR.dom.event(a), !1 !==
                                    p.onkey(p, a.getKeystroke())
                            }), A = CKEDITOR.tools.addFunction(function (a) { var b; p.onfocus && (b = !1 !== p.onfocus(p, new CKEDITOR.dom.event(a))); return b }), q = 0; p.clickFn = r = CKEDITOR.tools.addFunction(function () { q && (a.unlockSelection(1), q = 0); p.execute(); g.iOS && a.focus() }); this.modes ? (l = {}, a.on("beforeModeUnload", function () { a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED && (l[a.mode] = this._.state) }, this), a.on("activeFilterChange", k, this), a.on("mode", k, this), !this.readOnly && a.on("readOnly", k, this)) : n && (n = a.getCommand(n)) &&
                                (n.on("state", function () { this.setState(n.state) }, this), c += n.state == CKEDITOR.TRISTATE_ON ? "on" : n.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off"); var B; if (this.directional) a.on("contentDirChanged", function (b) { var c = CKEDITOR.document.getById(this._.id), e = c.getFirst(); b = b.data; b != a.lang.dir ? c.addClass("cke_" + b) : c.removeClass("cke_ltr").removeClass("cke_rtl"); e.setAttribute("style", CKEDITOR.skin.getIconStyle(B, "rtl" == b, this.icon, this.iconOffset)) }, this); n ? (x = a.getCommandKeystroke(n)) && (u = CKEDITOR.tools.keystrokeToString(a.lang.common.keyboard,
                                    x)) : c += "off"; x = this.name || this.command; var z = null, y = this.icon; B = x; this.icon && !/\./.test(this.icon) ? (B = this.icon, y = null) : (this.icon && (z = this.icon), CKEDITOR.env.hidpi && this.iconHiDpi && (z = this.iconHiDpi)); z ? (CKEDITOR.skin.addIcon(z, z), y = null) : z = B; c = {
                                        id: e, name: x, iconName: B, label: this.label, cls: (this.hasArrow ? "cke_button_expandable " : "") + (this.className || ""), state: c, ariaDisabled: "disabled" == c ? "true" : "false", title: this.title + (u ? " (" + u.display + ")" : ""), ariaShortcutSpace: u ? "\x26nbsp;" : "", ariaShortcut: u ? a.lang.common.keyboardShortcut +
                                            " " + u.aria : "", titleJs: g.gecko && !g.hc ? "" : (this.title || "").replace("'", ""), hasArrow: "string" === typeof this.hasArrow && this.hasArrow || (this.hasArrow ? "true" : "false"), keydownFn: t, focusFn: A, clickFn: r, style: CKEDITOR.skin.getIconStyle(z, "rtl" == a.lang.dir, y, this.iconOffset), arrowHtml: this.hasArrow ? f.output() : "", hasArrowAriaHtml: this.hasArrow ? ' aria-expanded\x3d"false"' : "", toggleAriaHtml: this.isToggle ? 'aria-pressed\x3d"false"' : ""
                                    }; b.output(c, h); if (this.onRender) this.onRender(); return p
                        }, setState: function (a) {
                            if (this._.state ==
                                a) return !1; this._.state = a; var b = CKEDITOR.document.getById(this._.id); return b ? (b.setState(a, "cke_button"), b.setAttribute("aria-disabled", a == CKEDITOR.TRISTATE_DISABLED), this.isToggle && !this.hasArrow && b.setAttribute("aria-pressed", a === CKEDITOR.TRISTATE_ON), !0) : !1
                        }, getState: function () { return this._.state }, toFeature: function (a) { if (this._.feature) return this._.feature; var b = this; this.allowedContent || this.requiredContent || !this.command || (b = a.getCommand(this.command) || b); return this._.feature = b }
                    }; CKEDITOR.ui.prototype.addButton =
                        function (a, b) { this.add(a, CKEDITOR.UI_BUTTON, b) }
        })(); (function () {
            function a(a) {
                function b() { for (var c = f(), e = CKEDITOR.tools.clone(a.config.toolbarGroups) || h(a), g = 0; g < e.length; g++) { var m = e[g]; if ("/" != m) { "string" == typeof m && (m = e[g] = { name: m }); var p, t = m.groups; if (t) for (var A = 0; A < t.length; A++)p = t[A], (p = c[p]) && l(m, p); (p = c[m.name]) && l(m, p) } } return e } function f() {
                    var b = {}, c, e, g; for (c in a.ui.items) e = a.ui.items[c], g = e.toolbar || "others", g = g.split(","), e = g[0], g = parseInt(g[1] || -1, 10), b[e] || (b[e] = []), b[e].push({
                        name: c,
                        order: g
                    }); for (e in b) b[e] = b[e].sort(function (a, b) { return a.order == b.order ? 0 : 0 > b.order ? -1 : 0 > a.order ? 1 : a.order < b.order ? -1 : 1 }); return b
                } function l(b, c) { if (c.length) { b.items ? b.items.push(a.ui.create("-")) : b.items = []; for (var g; g = c.shift();)g = "string" == typeof g ? g : g.name, e && -1 != CKEDITOR.tools.indexOf(e, g) || (g = a.ui.create(g)) && a.addFeature(g) && b.items.push(g) } } function g(a) {
                    var b = [], c, e, d; for (c = 0; c < a.length; ++c)e = a[c], d = {}, "/" == e ? b.push(e) : CKEDITOR.tools.isArray(e) ? (l(d, CKEDITOR.tools.clone(e)), b.push(d)) :
                        e.items && (l(d, CKEDITOR.tools.clone(e.items)), d.name = e.name, b.push(d)); return b
                } var e = function (a) { return a && "string" === typeof a ? a.split(",") : a }(a.config.removeButtons), c = a.config.toolbar; "string" == typeof c && (c = a.config["toolbar_" + c]); return a.toolbar = c ? g(c) : b()
            } function h(a) {
                return a._.toolbarGroups || (a._.toolbarGroups = [{ name: "document", groups: ["mode", "document", "doctools"] }, { name: "clipboard", groups: ["clipboard", "undo"] }, { name: "editing", groups: ["find", "selection", "spellchecker"] }, { name: "forms" }, "/",
                { name: "basicstyles", groups: ["basicstyles", "cleanup"] }, { name: "paragraph", groups: ["list", "indent", "blocks", "align", "bidi"] }, { name: "links" }, { name: "insert" }, "/", { name: "styles" }, { name: "colors" }, { name: "tools" }, { name: "others" }, { name: "about" }])
            } var f = function () { this.toolbars = [] }; f.prototype.focus = function () { for (var a = 0, b; b = this.toolbars[a++];)for (var f = 0, h; h = b.items[f++];)if (h.focus) { h.focus(); return } }; var b = {
                modes: { wysiwyg: 1, source: 1 }, readOnly: 1, exec: function (a) {
                    a.toolbox && (CKEDITOR.env.ie || CKEDITOR.env.air ?
                        setTimeout(function () { a.toolbox.focus() }, 100) : a.toolbox.focus())
                }
            }; CKEDITOR.plugins.add("toolbar", {
                requires: "button", init: function (d) {
                    var h, k = function (a, b) {
                        var e, c = "rtl" == d.lang.dir, f = d.config.toolbarGroupCycling, r = c ? 37 : 39, c = c ? 39 : 37, f = void 0 === f || f; switch (b) {
                            case 9: case CKEDITOR.SHIFT + 9: for (; !e || !e.items.length;)if (e = 9 == b ? (e ? e.next : a.toolbar.next) || d.toolbox.toolbars[0] : (e ? e.previous : a.toolbar.previous) || d.toolbox.toolbars[d.toolbox.toolbars.length - 1], e.items.length) for (a = e.items[h ? e.items.length -
                                1 : 0]; a && !a.focus;)(a = h ? a.previous : a.next) || (e = 0); a && a.focus(); return !1; case r: e = a; do e = e.next, !e && f && (e = a.toolbar.items[0]); while (e && !e.focus); e ? e.focus() : k(a, 9); return !1; case 40: return a.button && a.button.hasArrow ? a.execute() : k(a, 40 == b ? r : c), !1; case c: case 38: e = a; do e = e.previous, !e && f && (e = a.toolbar.items[a.toolbar.items.length - 1]); while (e && !e.focus); e ? e.focus() : (h = 1, k(a, CKEDITOR.SHIFT + 9), h = 0); return !1; case 27: return d.focus(), !1; case 13: case 32: return a.execute(), !1; case CKEDITOR.ALT + 122: return d.execCommand("elementsPathFocus"),
                                    !1
                        }return !0
                    }; d.on("uiSpace", function (b) {
                        if (b.data.space == d.config.toolbarLocation) {
                            b.removeListener(); d.toolbox = new f; var g = CKEDITOR.tools.getNextId(), e = ['\x3cspan id\x3d"', g, '" class\x3d"cke_voice_label"\x3e', d.lang.toolbar.toolbars, "\x3c/span\x3e", '\x3cspan id\x3d"' + d.ui.spaceId("toolbox") + '" class\x3d"cke_toolbox" role\x3d"group" aria-labelledby\x3d"', g, '" onmousedown\x3d"return false;"\x3e'], g = !1 !== d.config.toolbarStartupExpanded, c, h; d.config.toolbarCanCollapse && d.elementMode != CKEDITOR.ELEMENT_MODE_INLINE &&
                                e.push('\x3cspan class\x3d"cke_toolbox_main"' + (g ? "\x3e" : ' style\x3d"display:none"\x3e')); for (var m = d.toolbox.toolbars, x = a(d), u = x.length, p = 0; p < u; p++) {
                                    var t, A = 0, q, B = x[p], z = "/" !== B && ("/" === x[p + 1] || p == u - 1), y; if (B) if (c && (e.push("\x3c/span\x3e"), h = c = 0), "/" === B) e.push('\x3cspan class\x3d"cke_toolbar_break"\x3e\x3c/span\x3e'); else {
                                        y = B.items || B; for (var v = 0; v < y.length; v++) {
                                            var C = y[v], F; if (C) {
                                                var D = function (a) {
                                                    a = a.render(d, e); G = A.items.push(a) - 1; 0 < G && (a.previous = A.items[G - 1], a.previous.next = a); a.toolbar = A; a.onkey =
                                                        k
                                                }; if (C.type == CKEDITOR.UI_SEPARATOR) h = c && C; else {
                                                    F = !1 !== C.canGroup; if (!A) {
                                                        t = CKEDITOR.tools.getNextId(); A = { id: t, items: [] }; q = B.name && (d.lang.toolbar.toolbarGroups[B.name] || B.name); e.push('\x3cspan id\x3d"', t, '" class\x3d"cke_toolbar' + (z ? ' cke_toolbar_last"' : '"'), q ? ' aria-labelledby\x3d"' + t + '_label"' : "", ' role\x3d"toolbar"\x3e'); q && e.push('\x3cspan id\x3d"', t, '_label" class\x3d"cke_voice_label"\x3e', q, "\x3c/span\x3e"); e.push('\x3cspan class\x3d"cke_toolbar_start"\x3e\x3c/span\x3e'); var G = m.push(A) - 1;
                                                        0 < G && (A.previous = m[G - 1], A.previous.next = A)
                                                    } F ? c || (e.push('\x3cspan class\x3d"cke_toolgroup" role\x3d"presentation"\x3e'), c = 1) : c && (e.push("\x3c/span\x3e"), c = 0); h && (D(h), h = 0); D(C)
                                                }
                                            }
                                        } c && (e.push("\x3c/span\x3e"), h = c = 0); A && e.push('\x3cspan class\x3d"cke_toolbar_end"\x3e\x3c/span\x3e\x3c/span\x3e')
                                    }
                                } d.config.toolbarCanCollapse && e.push("\x3c/span\x3e"); if (d.config.toolbarCanCollapse && d.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                                    var H = CKEDITOR.tools.addFunction(function () { d.execCommand("toolbarCollapse") });
                                    d.on("destroy", function () { CKEDITOR.tools.removeFunction(H) }); d.addCommand("toolbarCollapse", {
                                        readOnly: 1, exec: function (a) {
                                            var b = a.ui.space("toolbar_collapser"), c = b.getPrevious(), e = a.ui.space("contents"), d = c.getParent(), g = parseInt(e.$.style.height, 10), f = d.$.offsetHeight, k = b.hasClass("cke_toolbox_collapser_min"); k ? (c.show(), b.removeClass("cke_toolbox_collapser_min"), b.setAttribute("title", a.lang.toolbar.toolbarCollapse)) : (c.hide(), b.addClass("cke_toolbox_collapser_min"), b.setAttribute("title", a.lang.toolbar.toolbarExpand));
                                            b.getFirst().setText(k ? "▲" : "◀"); e.setStyle("height", g - (d.$.offsetHeight - f) + "px"); a.fire("resize", { outerHeight: a.container.$.offsetHeight, contentsHeight: e.$.offsetHeight, outerWidth: a.container.$.offsetWidth })
                                        }, modes: { wysiwyg: 1, source: 1 }
                                    }); d.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse"); e.push('\x3ca title\x3d"' + (g ? d.lang.toolbar.toolbarCollapse : d.lang.toolbar.toolbarExpand) + '" id\x3d"' + d.ui.spaceId("toolbar_collapser") + '" tabIndex\x3d"-1" class\x3d"cke_toolbox_collapser');
                                    g || e.push(" cke_toolbox_collapser_min"); e.push('" onclick\x3d"CKEDITOR.tools.callFunction(' + H + ')"\x3e', '\x3cspan class\x3d"cke_arrow"\x3e\x26#9650;\x3c/span\x3e', "\x3c/a\x3e")
                                } e.push("\x3c/span\x3e"); b.data.html += e.join("")
                        }
                    }); d.on("destroy", function () { if (this.toolbox) { var a, b = 0, e, c, d; for (a = this.toolbox.toolbars; b < a.length; b++)for (c = a[b].items, e = 0; e < c.length; e++)d = c[e], d.clickFn && CKEDITOR.tools.removeFunction(d.clickFn), d.keyDownFn && CKEDITOR.tools.removeFunction(d.keyDownFn) } }); d.on("uiReady", function () {
                        var a =
                            d.ui.space("toolbox"); a && d.focusManager.add(a, 1)
                    }); d.addCommand("toolbarFocus", b); d.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus"); d.ui.add("-", CKEDITOR.UI_SEPARATOR, {}); d.ui.addHandler(CKEDITOR.UI_SEPARATOR, { create: function () { return { render: function (a, b) { b.push('\x3cspan class\x3d"cke_toolbar_separator" role\x3d"separator"\x3e\x3c/span\x3e'); return {} } } } })
                }
            }); CKEDITOR.ui.prototype.addToolbarGroup = function (a, b, f) {
                var l = h(this.editor), g = 0 === b, e = { name: a }; if (f) {
                    if (f = CKEDITOR.tools.search(l, function (a) {
                        return a.name ==
                            f
                    })) { !f.groups && (f.groups = []); if (b && (b = CKEDITOR.tools.indexOf(f.groups, b), 0 <= b)) { f.groups.splice(b + 1, 0, a); return } g ? f.groups.splice(0, 0, a) : f.groups.push(a); return } b = null
                } b && (b = CKEDITOR.tools.indexOf(l, function (a) { return a.name == b })); g ? l.splice(0, 0, a) : "number" == typeof b ? l.splice(b + 1, 0, e) : l.push(a)
            }
        })(); CKEDITOR.UI_SEPARATOR = "separator"; CKEDITOR.config.toolbarLocation = "top"; "use strict"; (function () {
            function a(a, b, e) {
                b.type || (b.type = "auto"); if (e && !1 === a.fire("beforePaste", b) || !b.dataValue && b.dataTransfer.isEmpty()) return !1;
                b.dataValue || (b.dataValue = ""); if (CKEDITOR.env.gecko && "drop" == b.method && a.toolbox) a.once("afterPaste", function () { a.toolbox.focus(); a.focus() }); return a.fire("paste", b)
            } function h(b) {
                function e() {
                    var a = b.editable(); if (CKEDITOR.plugins.clipboard.isCustomCopyCutSupported) { var d = function (a) { b.getSelection().isCollapsed() || (b.readOnly && "cut" == a.name || F.initPasteDataTransfer(a, b), a.data.preventDefault()) }; a.on("copy", d); a.on("cut", d); a.on("cut", function () { b.readOnly || b.extractSelectedHtml() }, null, null, 999) } a.on(F.mainPasteEvent,
                        function (a) { "beforepaste" == F.mainPasteEvent && D || y(a) }); "beforepaste" == F.mainPasteEvent && (a.on("paste", function (a) { G || (f(), a.data.preventDefault(), y(a), h("paste")) }), a.on("contextmenu", k, null, null, 0), a.on("beforepaste", function (a) { !a.data || a.data.$.ctrlKey || a.data.$.shiftKey || k() }, null, null, 0)); a.on("beforecut", function () { !D && l(b) }); var g; a.attachListener(CKEDITOR.env.ie ? a : b.document.getDocumentElement(), "mouseup", function () { g = setTimeout(v, 0) }); b.on("destroy", function () { clearTimeout(g) }); a.on("keyup",
                            v)
                } function d(a) { return { type: a, canUndo: "cut" == a, startDisabled: !0, fakeKeystroke: "cut" == a ? CKEDITOR.CTRL + 88 : CKEDITOR.CTRL + 67, exec: function () { "cut" == this.type && l(); var a; var e = this.type; if (CKEDITOR.env.ie) a = h(e); else try { a = b.document.$.execCommand(e, !1, null) } catch (d) { a = !1 } a || b.showNotification(b.lang.clipboard[this.type + "Error"]); return a } } } function g() {
                    return {
                        canUndo: !1, async: !0, fakeKeystroke: CKEDITOR.CTRL + 86, exec: function (b, c) {
                            function e(c, f) {
                                f = "undefined" !== typeof f ? f : !0; c ? (c.method = "paste", c.dataTransfer ||
                                    (c.dataTransfer = F.initPasteDataTransfer()), a(b, c, f)) : g && !b._.forcePasteDialog && b.showNotification(h, "info", b.config.clipboard_notificationDuration); b._.forcePasteDialog = !1; b.fire("afterCommandExec", { name: "paste", command: d, returnValue: !!c })
                            } c = "undefined" !== typeof c && null !== c ? c : {}; var d = this, g = "undefined" !== typeof c.notification ? c.notification : !0, f = c.type, k = CKEDITOR.tools.keystrokeToString(b.lang.common.keyboard, b.getCommandKeystroke(this)), h = "string" === typeof g ? g : b.lang.clipboard.pasteNotification.replace(/%1/,
                                '\x3ckbd aria-label\x3d"' + k.aria + '"\x3e' + k.display + "\x3c/kbd\x3e"), k = "string" === typeof c ? c : c.dataValue; f && !0 !== b.config.forcePasteAsPlainText && "allow-word" !== b.config.forcePasteAsPlainText ? b._.nextPasteType = f : delete b._.nextPasteType; "string" === typeof k ? e({ dataValue: k }) : b.getClipboardData(e)
                        }
                    }
                } function f() { G = 1; setTimeout(function () { G = 0 }, 100) } function k() { D = 1; setTimeout(function () { D = 0 }, 10) } function h(a) {
                    var e = b.document, d = e.getBody(), g = !1, f = function () { g = !0 }; d.on(a, f); 7 < CKEDITOR.env.version ? e.$.execCommand(a) :
                        e.$.selection.createRange().execCommand(a); d.removeListener(a, f); return g
                } function l() { if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) { var a = b.getSelection(), e, d, g; a.getType() == CKEDITOR.SELECTION_ELEMENT && (e = a.getSelectedElement()) && (d = a.getRanges()[0], g = b.document.createText(""), g.insertBefore(e), d.setStartBefore(g), d.setEndAfter(e), a.selectRanges([d]), setTimeout(function () { e.getParent() && (g.remove(), a.selectElement(e)) }, 0)) } } function m(a, e) {
                    var d = b.document, g = b.editable(), f = function (a) { a.cancel() }, k;
                    if (!d.getById("cke_pastebin")) {
                        var h = b.getSelection(), l = h.createBookmarks(); CKEDITOR.env.ie && h.root.fire("selectionchange"); var n = new CKEDITOR.dom.element(!CKEDITOR.env.webkit && !g.is("body") || CKEDITOR.env.ie ? "div" : "body", d); n.setAttributes({ id: "cke_pastebin", "data-cke-temp": "1" }); var r = 0, d = d.getWindow(); CKEDITOR.env.webkit ? (g.append(n), n.addClass("cke_editable"), g.is("body") || (r = "static" != g.getComputedStyle("position") ? g : CKEDITOR.dom.element.get(g.$.offsetParent), r = r.getDocumentPosition().y)) : g.getAscendant(CKEDITOR.env.ie ?
                            "body" : "html", 1).append(n); n.setStyles({ position: "absolute", top: d.getScrollPosition().y - r + 10 + "px", width: "1px", height: Math.max(1, d.getViewPaneSize().height - 20) + "px", overflow: "hidden", margin: 0, padding: 0 }); CKEDITOR.env.safari && n.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "text")); (r = n.getParent().isReadOnly()) ? (n.setOpacity(0), n.setAttribute("contenteditable", !0)) : n.setStyle("ltr" == b.config.contentsLangDirection ? "left" : "right", "-10000px"); b.on("selectionChange", f, null, null, 0); if (CKEDITOR.env.webkit ||
                                CKEDITOR.env.gecko) k = g.once("blur", f, null, null, -100); r && n.focus(); r = new CKEDITOR.dom.range(n); r.selectNodeContents(n); var q = r.select(); CKEDITOR.env.ie && (k = g.once("blur", function () { b.lockSelection(q) })); var v = CKEDITOR.document.getWindow().getScrollPosition().y; setTimeout(function () {
                                    CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = v); k && k.removeListener(); CKEDITOR.env.ie && g.focus(); h.selectBookmarks(l); n.remove(); var a; CKEDITOR.env.webkit && (a = n.getFirst()) && a.is && a.hasClass("Apple-style-span") &&
                                        (n = a); b.removeListener("selectionChange", f); e(n.getHtml())
                                }, 0)
                    }
                } function B() { if ("paste" == F.mainPasteEvent) return b.fire("beforePaste", { type: "auto", method: "paste" }), !1; b.focus(); f(); var a = b.focusManager; a.lock(); if (b.editable().fire(F.mainPasteEvent) && !h("paste")) return a.unlock(), !1; a.unlock(); return !0 } function z(a) {
                    if ("wysiwyg" == b.mode) switch (a.data.keyCode) {
                        case CKEDITOR.CTRL + 86: case CKEDITOR.SHIFT + 45: a = b.editable(); f(); "paste" == F.mainPasteEvent && a.fire("beforepaste"); break; case CKEDITOR.CTRL + 88: case CKEDITOR.SHIFT +
                            46: b.fire("saveSnapshot"), setTimeout(function () { b.fire("saveSnapshot") }, 50)
                    }
                } function y(e) { var d = { type: "auto", method: "paste", dataTransfer: F.initPasteDataTransfer(e) }; d.dataTransfer.cacheData(); var g = !1 !== b.fire("beforePaste", d); g && F.canClipboardApiBeTrusted(d.dataTransfer, b) ? (e.data.preventDefault(), setTimeout(function () { a(b, d) }, 0)) : m(e, function (e) { d.dataValue = e.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig, ""); g && a(b, d) }) } function v() {
                    if ("wysiwyg" == b.mode) {
                        var a = C("paste"); b.getCommand("cut").setState(C("cut"));
                        b.getCommand("copy").setState(C("copy")); b.getCommand("paste").setState(a); b.fire("pasteState", a)
                    }
                } function C(a) { var e = b.getSelection(), e = e && e.getRanges()[0]; if ((b.readOnly || e && e.checkReadOnly()) && a in { paste: 1, cut: 1 }) return CKEDITOR.TRISTATE_DISABLED; if ("paste" == a) return CKEDITOR.TRISTATE_OFF; a = b.getSelection(); e = a.getRanges(); return a.getType() == CKEDITOR.SELECTION_NONE || 1 == e.length && e[0].collapsed ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF } var F = CKEDITOR.plugins.clipboard, D = 0, G = 0; (function () {
                    b.on("key",
                        z); b.on("contentDom", e); b.on("selectionChange", v); if (b.contextMenu) { b.contextMenu.addListener(function () { return { cut: C("cut"), copy: C("copy"), paste: C("paste") } }); var a = null; b.on("menuShow", function () { a && (a.removeListener(), a = null); var e = b.contextMenu.findItemByCommandName("paste"); e && e.element && (a = e.element.on("touchend", function () { b._.forcePasteDialog = !0 })) }) } if (b.ui.addButton) b.once("instanceReady", function () {
                            b._.pasteButtons && CKEDITOR.tools.array.forEach(b._.pasteButtons, function (a) {
                                if (a = b.ui.get(a)) if (a =
                                    CKEDITOR.document.getById(a._.id)) a.on("touchend", function () { b._.forcePasteDialog = !0 })
                            })
                        })
                })(); (function () { function a(e, d, g, f, k) { var h = b.lang.clipboard[d]; b.addCommand(d, g); b.ui.addButton && b.ui.addButton(e, { label: h, command: d, toolbar: "clipboard," + f }); b.addMenuItems && b.addMenuItem(d, { label: h, command: d, group: "clipboard", order: k }) } a("Cut", "cut", d("cut"), 10, 1); a("Copy", "copy", d("copy"), 20, 4); a("Paste", "paste", g(), 30, 8); b._.pasteButtons || (b._.pasteButtons = []); b._.pasteButtons.push("Paste") })(); b.getClipboardData =
                    function (a, e) {
                        function d(a) { a.removeListener(); a.cancel(); e(a.data) } function g(a) { a.removeListener(); a.cancel(); e({ type: k, dataValue: a.data.dataValue, dataTransfer: a.data.dataTransfer, method: "paste" }) } var f = !1, k = "auto"; e || (e = a, a = null); b.on("beforePaste", function (a) { a.removeListener(); f = !0; k = a.data.type }, null, null, 1E3); b.on("paste", d, null, null, 0); !1 === B() && (b.removeListener("paste", d), b._.forcePasteDialog && f && b.fire("pasteDialog") ? (b.on("pasteDialogCommit", g), b.on("dialogHide", function (a) {
                            a.removeListener();
                            a.data.removeListener("pasteDialogCommit", g); a.data._.committed || e(null)
                        })) : e(null))
                    }
            } function f(a) { if (CKEDITOR.env.webkit) { if (!a.match(/^[^<]*$/g) && !a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return "html" } else if (CKEDITOR.env.ie) { if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi) && !a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return "html" } else if (CKEDITOR.env.gecko) { if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi)) return "html" } else return "html"; return "htmlifiedtext" } function b(a, b) {
                function e(a) {
                    return CKEDITOR.tools.repeat("\x3c/p\x3e\x3cp\x3e",
                        ~~(a / 2)) + (1 == a % 2 ? "\x3cbr\x3e" : "")
                } b = b.replace(/(?!\u3000)\s+/g, " ").replace(/> +</g, "\x3e\x3c").replace(/<br ?\/>/gi, "\x3cbr\x3e"); b = b.replace(/<\/?[A-Z]+>/g, function (a) { return a.toLowerCase() }); if (b.match(/^[^<]$/)) return b; CKEDITOR.env.webkit && -1 < b.indexOf("\x3cdiv\x3e") && (b = b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "\x3cbr\x3e").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "\x3cdiv\x3e\x3c/div\x3e"), b.match(/<div>(<br>|)<\/div>/) && (b = "\x3cp\x3e" + b.replace(/(<div>(<br>|)<\/div>)+/g,
                    function (a) { return e(a.split("\x3c/div\x3e\x3cdiv\x3e").length + 1) }) + "\x3c/p\x3e"), b = b.replace(/<\/div><div>/g, "\x3cbr\x3e"), b = b.replace(/<\/?div>/g, "")); CKEDITOR.env.gecko && a.enterMode != CKEDITOR.ENTER_BR && (CKEDITOR.env.gecko && (b = b.replace(/^<br><br>$/, "\x3cbr\x3e")), -1 < b.indexOf("\x3cbr\x3e\x3cbr\x3e") && (b = "\x3cp\x3e" + b.replace(/(<br>){2,}/g, function (a) { return e(a.length / 4) }) + "\x3c/p\x3e")); return k(a, b)
            } function d(a) {
                function b() {
                    var a = {}, c; for (c in CKEDITOR.dtd) "$" != c.charAt(0) && "div" != c && "span" !=
                        c && (a[c] = 1); return a
                } var e = {}; return { get: function (d) { return "plain-text" == d ? e.plainText || (e.plainText = new CKEDITOR.filter(a, "br")) : "semantic-content" == d ? ((d = e.semanticContent) || (d = new CKEDITOR.filter(a, {}), d.allow({ $1: { elements: b(), attributes: !0, styles: !1, classes: !1 } }), d = e.semanticContent = d), d) : d ? new CKEDITOR.filter(a, d) : null } }
            } function m(a, b, e) { b = CKEDITOR.htmlParser.fragment.fromHtml(b); var d = new CKEDITOR.htmlParser.basicWriter; e.applyTo(b, !0, !1, a.activeEnterMode); b.writeHtml(d); return d.getHtml() }
            function k(a, b) { a.enterMode == CKEDITOR.ENTER_BR ? b = b.replace(/(<\/p><p>)+/g, function (a) { return CKEDITOR.tools.repeat("\x3cbr\x3e", a.length / 7 * 2) }).replace(/<\/?p>/g, "") : a.enterMode == CKEDITOR.ENTER_DIV && (b = b.replace(/<(\/)?p>/g, "\x3c$1div\x3e")); return b } function l(a) { a.data.preventDefault(); a.data.$.dataTransfer.dropEffect = "none" } function g(b) {
                var e = CKEDITOR.plugins.clipboard; b.on("contentDom", function () {
                    function d(e, g, f) {
                        g.select(); a(b, { dataTransfer: f, method: "drop" }, 1); f.sourceEditor.fire("saveSnapshot");
                        f.sourceEditor.editable().extractHtmlFromRange(e); f.sourceEditor.getSelection().selectRanges([e]); f.sourceEditor.fire("saveSnapshot")
                    } function g(d, f) { d.select(); a(b, { dataTransfer: f, method: "drop" }, 1); e.resetDragDataTransfer() } function f(a, e, d) { var g = { $: a.data.$, target: a.data.getTarget() }; e && (g.dragRange = e); d && (g.dropRange = d); !1 === b.fire(a.name, g) && a.data.preventDefault() } function k(a) { a.type != CKEDITOR.NODE_ELEMENT && (a = a.getParent()); return a.getChildCount() } var h = b.editable(), l = CKEDITOR.plugins.clipboard.getDropTarget(b),
                        m = b.ui.space("top"), B = b.ui.space("bottom"); e.preventDefaultDropOnElement(m); e.preventDefaultDropOnElement(B); h.attachListener(l, "dragstart", f); h.attachListener(b, "dragstart", e.resetDragDataTransfer, e, null, 1); h.attachListener(b, "dragstart", function (a) { e.initDragDataTransfer(a, b) }, null, null, 2); h.attachListener(b, "dragstart", function () {
                            var a = e.dragRange = b.getSelection().getRanges()[0]; CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (e.dragStartContainerChildCount = a ? k(a.startContainer) : null, e.dragEndContainerChildCount =
                                a ? k(a.endContainer) : null)
                        }, null, null, 100); h.attachListener(l, "dragend", f); h.attachListener(b, "dragend", e.initDragDataTransfer, e, null, 1); h.attachListener(b, "dragend", e.resetDragDataTransfer, e, null, 100); h.attachListener(l, "dragover", function (a) { if (CKEDITOR.env.edge) a.data.preventDefault(); else { var b = a.data.getTarget(); b && b.is && b.is("html") ? a.data.preventDefault() : CKEDITOR.env.ie && CKEDITOR.plugins.clipboard.isFileApiSupported && a.data.$.dataTransfer.types.contains("Files") && a.data.preventDefault() } });
                    h.attachListener(l, "drop", function (a) { if (!a.data.$.defaultPrevented && (a.data.preventDefault(), !b.readOnly)) { var d = a.data.getTarget(); if (!d.isReadOnly() || d.type == CKEDITOR.NODE_ELEMENT && d.is("html")) { var d = e.getRangeAtDropPosition(a, b), g = e.dragRange; d && f(a, g, d) } } }, null, null, 9999); h.attachListener(b, "drop", e.initDragDataTransfer, e, null, 1); h.attachListener(b, "drop", function (a) {
                        if (a = a.data) {
                            var f = a.dropRange, k = a.dragRange, h = a.dataTransfer; h.getTransferType(b) == CKEDITOR.DATA_TRANSFER_INTERNAL ? setTimeout(function () {
                                e.internalDrop(k,
                                    f, h, b)
                            }, 0) : h.getTransferType(b) == CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? d(k, f, h) : g(f, h)
                        }
                    }, null, null, 9999)
                })
            } var e; CKEDITOR.plugins.add("clipboard", {
                requires: "dialog,notification,toolbar", _supportedFileMatchers: [], init: function (a) {
                    function e(a) { return -1 !== CKEDITOR.tools.indexOf(["image/png", "image/jpeg", "image/gif"], a.type) } function k(b) { return CKEDITOR.tools.array.some(a.plugins.clipboard._supportedFileMatchers, function (a) { return a(b) }) } function l(b) {
                        b.length && (b = CKEDITOR.tools.array.unique(b), b = CKEDITOR.tools.array.filter(b,
                            function (a) { return !!CKEDITOR.tools.trim(a) }), b = u(b.join(", ")), a.showNotification(b, "info", a.config.clipboard_notificationDuration))
                    } function u(b) { return b ? a.lang.clipboard.fileFormatNotSupportedNotification.replace(/\${formats\}/g, "\x3cem\x3e" + b + "\x3c/em\x3e") : a.lang.clipboard.fileWithoutFormatNotSupportedNotification } function p(a, b) { return CKEDITOR.env.ie && a.data.fileTransferCancel || !(CKEDITOR.env.ie || b && B !== b.id) ? !1 : b.isFileTransfer() && 1 === b.getFilesCount() } var t, A = d(a); a.config.forcePasteAsPlainText ?
                        t = "plain-text" : a.config.pasteFilter ? t = a.config.pasteFilter : !CKEDITOR.env.webkit || "pasteFilter" in a.config || (t = "semantic-content"); a.pasteFilter = A.get(t); h(a); g(a); CKEDITOR.dialog.add("paste", CKEDITOR.getUrl(this.path + "dialogs/paste.js")); var q = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported || CKEDITOR.plugins.clipboard.isFileApiSupported, B; CKEDITOR.plugins.clipboard.addFileMatcher(a, e); a.on("paste", function (a) {
                            if (q) {
                                var b = a.data; a = b.dataTransfer; if (!b.dataValue) {
                                    for (var b = [], c = 0; c < a.getFilesCount(); c++) {
                                        var e =
                                            a.getFile(c); k(e) || b.push(e.type)
                                    } l(b)
                                }
                            }
                        }, null, null, 1); a.on("paste", function (b) {
                            if (q && a.config.clipboard_handleImages) {
                                var d = b.data, g = d.dataTransfer; if (!d.dataValue && p(b, g) && (g = g.getFile(0), e(g))) {
                                    var f = new FileReader; f.addEventListener("load", function () { b.data.dataValue = '\x3cimg src\x3d"' + f.result + '" /\x3e'; a.fire("paste", b.data) }, !1); f.addEventListener("abort", function () { CKEDITOR.env.ie && (b.data.fileTransferCancel = !0); a.fire("paste", b.data) }, !1); f.addEventListener("error", function () {
                                        CKEDITOR.env.ie &&
                                            (b.data.fileTransferCancel = !0); a.fire("paste", b.data)
                                    }, !1); f.readAsDataURL(g); B = d.dataTransfer.id; b.stop()
                                }
                            }
                        }, null, null, 1); a.on("paste", function (b) { b.data.dataTransfer || (b.data.dataTransfer = new CKEDITOR.plugins.clipboard.dataTransfer); if (!b.data.dataValue) { var e = b.data.dataTransfer, d = e.getData("text/html"); if (d) b.data.dataValue = d, b.data.type = "html"; else if (d = e.getData("text/plain")) b.data.dataValue = a.editable().transformPlainTextToHtml(d), b.data.type = "text" } }, null, null, 1); a.on("paste", function (a) {
                            var b =
                                a.data.dataValue, c = CKEDITOR.dtd.$block; -1 < b.indexOf("Apple-") && (b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " "), "html" != a.data.type && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function (a, b) { return b.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;") })), -1 < b.indexOf('\x3cbr class\x3d"Apple-interchange-newline"\x3e') && (a.data.startsWithEOL = 1, a.data.preSniffing = "html", b = b.replace(/<br class="Apple-interchange-newline">/, "")), b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi,
                                    "$1")); if (b.match(/^<[^<]+cke_(editable|contents)/i)) { var e, d, g = new CKEDITOR.dom.element("div"); for (g.setHtml(b); 1 == g.getChildCount() && (e = g.getFirst()) && e.type == CKEDITOR.NODE_ELEMENT && (e.hasClass("cke_editable") || e.hasClass("cke_contents"));)g = d = e; d && (b = d.getHtml().replace(/<br>$/i, "")) } CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function (b, e) { return e.toLowerCase() in c ? (a.data.preSniffing = "html", "\x3c" + e) : b }) : CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/, function (b, e) {
                                        return e in
                                            c ? (a.data.endsWithEOL = 1, "\x3c/" + e + "\x3e") : b
                                    }) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1")); a.data.dataValue = b
                        }, null, null, 3); a.on("paste", function (e) {
                            e = e.data; var d = a._.nextPasteType || e.type, g = e.dataValue, k, h = a.config.clipboard_defaultContentType || "html", l = e.dataTransfer.getTransferType(a) == CKEDITOR.DATA_TRANSFER_EXTERNAL, n = !0 === a.config.forcePasteAsPlainText; k = "html" == d || "html" == e.preSniffing ? "html" : f(g); delete a._.nextPasteType; "htmlifiedtext" == k && (g = b(a.config, g)); if ("text" == d && "html" == k) g =
                                m(a, g, A.get("plain-text")); else if (l && a.pasteFilter && !e.dontFilter || n) g = m(a, g, a.pasteFilter); e.startsWithEOL && (g = '\x3cbr data-cke-eol\x3d"1"\x3e' + g); e.endsWithEOL && (g += '\x3cbr data-cke-eol\x3d"1"\x3e'); "auto" == d && (d = "html" == k || "html" == h ? "html" : "text"); e.type = d; e.dataValue = g; delete e.preSniffing; delete e.startsWithEOL; delete e.endsWithEOL
                        }, null, null, 6); a.on("paste", function (b) { b = b.data; b.dataValue && (a.insertHtml(b.dataValue, b.type, b.range), setTimeout(function () { a.fire("afterPaste") }, 0)) }, null, null,
                            1E3); a.on("pasteDialog", function (b) { setTimeout(function () { a.openDialog("paste", b.data) }, 0) })
                }
            }); CKEDITOR.plugins.clipboard = {
                addFileMatcher: function (a, b) { a.plugins.clipboard._supportedFileMatchers.push(b) }, isCustomCopyCutSupported: CKEDITOR.env.ie && 16 > CKEDITOR.env.version || CKEDITOR.env.iOS && 605 > CKEDITOR.env.version ? !1 : !0, isCustomDataTypesSupported: !CKEDITOR.env.ie || 16 <= CKEDITOR.env.version, isFileApiSupported: !CKEDITOR.env.ie || 9 < CKEDITOR.env.version, mainPasteEvent: CKEDITOR.env.ie && !CKEDITOR.env.edge ?
                    "beforepaste" : "paste", addPasteButton: function (a, b, e) { a.ui.addButton && (a.ui.addButton(b, e), a._.pasteButtons || (a._.pasteButtons = []), a._.pasteButtons.push(b)) }, canClipboardApiBeTrusted: function (a, b) {
                        return a.getTransferType(b) != CKEDITOR.DATA_TRANSFER_EXTERNAL || CKEDITOR.env.chrome && !a.isEmpty() || CKEDITOR.env.gecko && (a.getData("text/html") || a.getFilesCount()) || CKEDITOR.env.safari && 603 <= CKEDITOR.env.version && !CKEDITOR.env.iOS || CKEDITOR.env.iOS && 605 <= CKEDITOR.env.version || CKEDITOR.env.edge && 16 <= CKEDITOR.env.version ?
                            !0 : !1
                    }, getDropTarget: function (a) { var b = a.editable(); return CKEDITOR.env.ie && 9 > CKEDITOR.env.version || b.isInline() ? b : a.document }, fixSplitNodesAfterDrop: function (a, b, e, d) {
                        function g(a, c, e) {
                            var d = a; d.type == CKEDITOR.NODE_TEXT && (d = a.getParent()); if (d.equals(c) && e != c.getChildCount()) return a = b.startContainer.getChild(b.startOffset - 1), c = b.startContainer.getChild(b.startOffset), a && a.type == CKEDITOR.NODE_TEXT && c && c.type == CKEDITOR.NODE_TEXT && (e = a.getLength(), a.setText(a.getText() + c.getText()), c.remove(), b.setStart(a,
                                e), b.collapse(!0)), !0
                        } var f = b.startContainer; "number" == typeof d && "number" == typeof e && f.type == CKEDITOR.NODE_ELEMENT && (g(a.startContainer, f, e) || g(a.endContainer, f, d))
                    }, isDropRangeAffectedByDragRange: function (a, b) { var e = b.startContainer, d = b.endOffset; return a.endContainer.equals(e) && a.endOffset <= d || a.startContainer.getParent().equals(e) && a.startContainer.getIndex() < d || a.endContainer.getParent().equals(e) && a.endContainer.getIndex() < d ? !0 : !1 }, internalDrop: function (b, e, d, g) {
                        var f = CKEDITOR.plugins.clipboard,
                            k = g.editable(), h, l; g.fire("saveSnapshot"); g.fire("lockSnapshot", { dontUpdate: 1 }); CKEDITOR.env.ie && 10 > CKEDITOR.env.version && this.fixSplitNodesAfterDrop(b, e, f.dragStartContainerChildCount, f.dragEndContainerChildCount); (l = this.isDropRangeAffectedByDragRange(b, e)) || (h = b.createBookmark(!1)); f = e.clone().createBookmark(!1); l && (h = b.createBookmark(!1)); b = h.startNode; e = h.endNode; l = f.startNode; e && b.getPosition(l) & CKEDITOR.POSITION_PRECEDING && e.getPosition(l) & CKEDITOR.POSITION_FOLLOWING && l.insertBefore(b); b = g.createRange();
                        b.moveToBookmark(h); k.extractHtmlFromRange(b, 1); e = g.createRange(); f.startNode.getCommonAncestor(k) || (f = g.getSelection().createBookmarks()[0]); e.moveToBookmark(f); a(g, { dataTransfer: d, method: "drop", range: e }, 1); g.fire("unlockSnapshot")
                    }, getRangeAtDropPosition: function (a, b) {
                        var e = a.data.$, d = e.clientX, g = e.clientY, f = b.getSelection(!0).getRanges()[0], k = b.createRange(); if (a.data.testRange) return a.data.testRange; if (document.caretRangeFromPoint && b.document.$.caretRangeFromPoint(d, g)) e = b.document.$.caretRangeFromPoint(d,
                            g), k.setStart(CKEDITOR.dom.node(e.startContainer), e.startOffset), k.collapse(!0); else if (e.rangeParent) k.setStart(CKEDITOR.dom.node(e.rangeParent), e.rangeOffset), k.collapse(!0); else {
                                if (CKEDITOR.env.ie && 8 < CKEDITOR.env.version && f && b.editable().hasFocus) return f; if (document.body.createTextRange) {
                                    b.focus(); e = b.document.getBody().$.createTextRange(); try {
                                        for (var h = !1, l = 0; 20 > l && !h; l++) { if (!h) try { e.moveToPoint(d, g - l), h = !0 } catch (m) { } if (!h) try { e.moveToPoint(d, g + l), h = !0 } catch (z) { } } if (h) {
                                            var y = "cke-temp-" + (new Date).getTime();
                                            e.pasteHTML('\x3cspan id\x3d"' + y + '"\x3e​\x3c/span\x3e'); var v = b.document.getById(y); k.moveToPosition(v, CKEDITOR.POSITION_BEFORE_START); v.remove()
                                        } else { var C = b.document.$.elementFromPoint(d, g), F = new CKEDITOR.dom.element(C), D; if (F.equals(b.editable()) || "html" == F.getName()) return f && f.startContainer && !f.startContainer.equals(b.editable()) ? f : null; D = F.getClientRect(); d < D.left ? k.setStartAt(F, CKEDITOR.POSITION_AFTER_START) : k.setStartAt(F, CKEDITOR.POSITION_BEFORE_END); k.collapse(!0) }
                                    } catch (G) { return null }
                                } else return null
                            } return k
                    },
                initDragDataTransfer: function (a, b) { var e = a.data.$ ? a.data.$.dataTransfer : null, d = new this.dataTransfer(e, b); "dragstart" === a.name && d.storeId(); e ? this.dragData && d.id == this.dragData.id ? d = this.dragData : this.dragData = d : this.dragData ? d = this.dragData : this.dragData = d; a.data.dataTransfer = d }, resetDragDataTransfer: function () { this.dragData = null }, initPasteDataTransfer: function (a, b) {
                    if (this.isCustomCopyCutSupported) {
                        if (a && a.data && a.data.$) {
                            var e = a.data.$.clipboardData, d = new this.dataTransfer(e, b); "copy" !== a.name &&
                                "cut" !== a.name || d.storeId(); this.copyCutData && d.id == this.copyCutData.id ? (d = this.copyCutData, d.$ = e) : this.copyCutData = d; return d
                        } return new this.dataTransfer(null, b)
                    } return new this.dataTransfer(CKEDITOR.env.edge && a && a.data.$ && a.data.$.clipboardData || null, b)
                }, preventDefaultDropOnElement: function (a) { a && a.on("dragover", l) }
            }; e = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? "cke/id" : "Text"; CKEDITOR.plugins.clipboard.dataTransfer = function (a, b) {
                a && (this.$ = a); this._ = {
                    metaRegExp: /^<meta.*?>/i, fragmentRegExp: /\s*\x3c!--StartFragment--\x3e|\x3c!--EndFragment--\x3e\s*/g,
                    types: [], data: {}, files: [], nativeHtmlCache: "", normalizeType: function (a) { a = a.toLowerCase(); return "text" == a || "text/plain" == a ? "Text" : "url" == a ? "URL" : "files" === a ? "Files" : a }
                }; this._.fallbackDataTransfer = new CKEDITOR.plugins.clipboard.fallbackDataTransfer(this); this.id = this.getData(e); this.id || (this.id = "Text" == e ? "" : "cke-" + CKEDITOR.tools.getUniqueId()); b && (this.sourceEditor = b, this.setData("text/html", b.getSelectedHtml(1)), "Text" == e || this.getData("text/plain") || this.setData("text/plain", b.getSelection().getSelectedText()))
            };
            CKEDITOR.DATA_TRANSFER_INTERNAL = 1; CKEDITOR.DATA_TRANSFER_CROSS_EDITORS = 2; CKEDITOR.DATA_TRANSFER_EXTERNAL = 3; CKEDITOR.plugins.clipboard.dataTransfer.prototype = {
                getData: function (a, b) {
                    a = this._.normalizeType(a); var e = "text/html" == a && b ? this._.nativeHtmlCache : this._.data[a]; if (void 0 === e || null === e || "" === e) { if (this._.fallbackDataTransfer.isRequired()) e = this._.fallbackDataTransfer.getData(a, b); else try { e = this.$.getData(a) || "" } catch (d) { e = "" } "text/html" != a || b || (e = this._stripHtml(e)) } "Text" == a && CKEDITOR.env.gecko &&
                        this.getFilesCount() && "file://" == e.substring(0, 7) && (e = ""); if ("string" === typeof e) var g = e.indexOf("\x3c/html\x3e"), e = -1 !== g ? e.substring(0, g + 7) : e; return e
                }, setData: function (a, b) {
                    a = this._.normalizeType(a); "text/html" == a ? (this._.data[a] = this._stripHtml(b), this._.nativeHtmlCache = b) : this._.data[a] = b; if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported || "URL" == a || "Text" == a) if ("Text" == e && "Text" == a && (this.id = b), this._.fallbackDataTransfer.isRequired()) this._.fallbackDataTransfer.setData(a, b); else try {
                        this.$.setData(a,
                            b)
                    } catch (d) { }
                }, storeId: function () { "Text" !== e && this.setData(e, this.id) }, getTransferType: function (a) { return this.sourceEditor ? this.sourceEditor == a ? CKEDITOR.DATA_TRANSFER_INTERNAL : CKEDITOR.DATA_TRANSFER_CROSS_EDITORS : CKEDITOR.DATA_TRANSFER_EXTERNAL }, cacheData: function () {
                    function a(c) { c = b._.normalizeType(c); var e = b.getData(c); "text/html" == c && (b._.nativeHtmlCache = b.getData(c, !0), e = b._stripHtml(e)); e && (b._.data[c] = e); b._.types.push(c) } if (this.$) {
                        var b = this, e, d, g; if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
                            if (this.$.types) for (e =
                                0; e < this.$.types.length; e++)a(this.$.types[e])
                        } else a("Text"), a("URL"); d = this._getImageFromClipboard(); if ((g = this.$ && this.$.files || null) || d) { this._.files = []; if (g && g.length) for (e = 0; e < g.length; e++)this._.files.push(g[e]); 0 === this._.files.length && d && this._.files.push(d) }
                    }
                }, getFilesCount: function () { if (this._.files.length) return this._.files.length; var a = this.$ && this.$.files || null; return a && a.length ? a.length : this._getImageFromClipboard() ? 1 : 0 }, getFile: function (a) {
                    if (this._.files.length) return this._.files[a];
                    var b = this.$ && this.$.files || null; return b && b.length ? b[a] : 0 === a ? this._getImageFromClipboard() : void 0
                }, isFileTransfer: function () { var a = this.getTypes(), a = CKEDITOR.tools.array.filter(a, function (a) { return "application/x-moz-file" !== a }); return 1 === a.length && "files" === a[0].toLowerCase() }, isEmpty: function () {
                    var a = {}, b; if (this.getFilesCount()) return !1; CKEDITOR.tools.array.forEach(CKEDITOR.tools.object.keys(this._.data), function (b) { a[b] = 1 }); if (this.$) if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
                        if (this.$.types) for (var d =
                            0; d < this.$.types.length; d++)a[this.$.types[d]] = 1
                    } else a.Text = 1, a.URL = 1; "Text" != e && (a[e] = 0); for (b in a) if (a[b] && "" !== this.getData(b)) return !1; return !0
                }, getTypes: function () { return 0 < this._.types.length ? this._.types : this.$ && this.$.types ? [].slice.call(this.$.types) : [] }, _getImageFromClipboard: function () { var a; try { if (this.$ && this.$.items && this.$.items[0] && (a = this.$.items[0].getAsFile()) && a.type) return a } catch (b) { } }, _stripHtml: function (a) {
                    function b(a) {
                        var e = new CKEDITOR.htmlParser, c, d; e.onTagOpen = function (a) {
                            "body" ===
                                a && (c = e._.htmlPartsRegex.lastIndex)
                        }; e.onTagClose = function (a) { "body" === a && (d = e._.htmlPartsRegex.lastIndex) }; e.parse(a); return "number" !== typeof c || "number" !== typeof d ? a : a.substring(c, d).replace(/<\/body\s*>$/gi, "")
                    } a && a.length && (a = b(a), a = a.replace(this._.metaRegExp, ""), a = a.replace(this._.fragmentRegExp, "")); return a
                }
            }; CKEDITOR.plugins.clipboard.fallbackDataTransfer = function (a) { this._dataTransfer = a; this._customDataFallbackType = "text/html" }; CKEDITOR.plugins.clipboard.fallbackDataTransfer._isCustomMimeTypeSupported =
                null; CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes = []; CKEDITOR.plugins.clipboard.fallbackDataTransfer.prototype = {
                    isRequired: function () {
                        var a = CKEDITOR.plugins.clipboard.fallbackDataTransfer, b = this._dataTransfer.$; if (null === a._isCustomMimeTypeSupported) if (b) { a._isCustomMimeTypeSupported = !1; if (CKEDITOR.env.edge && 17 <= CKEDITOR.env.version) return !0; try { b.setData("cke/mimetypetest", "cke test value"), a._isCustomMimeTypeSupported = "cke test value" === b.getData("cke/mimetypetest"), b.clearData("cke/mimetypetest") } catch (e) { } } else return !1;
                        return !a._isCustomMimeTypeSupported
                    }, getData: function (a, b) { var e = this._getData(this._customDataFallbackType, !0); if (b) return e; var e = this._extractDataComment(e), d = null, d = a === this._customDataFallbackType ? e.content : e.data && e.data[a] ? e.data[a] : this._getData(a, !0); return null !== d ? d : "" }, setData: function (a, b) {
                        var e = a === this._customDataFallbackType; e && (b = this._applyDataComment(b, this._getFallbackTypeData())); var d = b, g = this._dataTransfer.$; try { g.setData(a, d), e && (this._dataTransfer._.nativeHtmlCache = d) } catch (f) {
                            if (this._isUnsupportedMimeTypeError(f)) {
                                e =
                                    CKEDITOR.plugins.clipboard.fallbackDataTransfer; -1 === CKEDITOR.tools.indexOf(e._customTypes, a) && e._customTypes.push(a); var e = this._getFallbackTypeContent(), k = this._getFallbackTypeData(); k[a] = d; try { d = this._applyDataComment(e, k), g.setData(this._customDataFallbackType, d), this._dataTransfer._.nativeHtmlCache = d } catch (h) { d = "" }
                            }
                        } return d
                    }, _getData: function (a, b) { var e = this._dataTransfer._.data; if (!b && e[a]) return e[a]; try { return this._dataTransfer.$.getData(a) } catch (d) { return null } }, _getFallbackTypeContent: function () {
                        var a =
                            this._dataTransfer._.data[this._customDataFallbackType]; a || (a = this._extractDataComment(this._getData(this._customDataFallbackType, !0)).content); return a
                    }, _getFallbackTypeData: function () { var a = CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes, b = this._extractDataComment(this._getData(this._customDataFallbackType, !0)).data || {}, e = this._dataTransfer._.data; CKEDITOR.tools.array.forEach(a, function (a) { void 0 !== e[a] ? b[a] = e[a] : void 0 !== b[a] && (b[a] = b[a]) }, this); return b }, _isUnsupportedMimeTypeError: function (a) {
                        return a.message &&
                            -1 !== a.message.search(/element not found/gi)
                    }, _extractDataComment: function (a) { var b = { data: null, content: a || "" }; if (a && 16 < a.length) { var e; (e = /\x3c!--cke-data:(.*?)--\x3e/g.exec(a)) && e[1] && (b.data = JSON.parse(decodeURIComponent(e[1])), b.content = a.replace(e[0], "")) } return b }, _applyDataComment: function (a, b) { var e = ""; b && CKEDITOR.tools.object.keys(b).length && (e = "\x3c!--cke-data:" + encodeURIComponent(JSON.stringify(b)) + "--\x3e"); return e + (a && a.length ? a : "") }
                }
        })(); CKEDITOR.config.clipboard_notificationDuration =
            1E4; CKEDITOR.config.clipboard_handleImages = !0; CKEDITOR.plugins.add("panelbutton", {
                requires: "button", onLoad: function () {
                    function a(a) { var f = this._; f.state != CKEDITOR.TRISTATE_DISABLED && (this.createPanel(a), f.on ? f.panel.hide() : f.panel.showBlock(this._.id, this.document.getById(this._.id), 4)) } CKEDITOR.ui.panelButton = CKEDITOR.tools.createClass({
                        base: CKEDITOR.ui.button, $: function (h) {
                            var f = h.panel || {}; delete h.panel; this.base(h); this.document = f.parent && f.parent.getDocument() || CKEDITOR.document; f.block = { attributes: f.attributes };
                            f.toolbarRelated = !0; this.hasArrow = "listbox"; this.click = a; this._ = { panelDefinition: f }
                        }, statics: { handler: { create: function (a) { return new CKEDITOR.ui.panelButton(a) } } }, proto: {
                            createPanel: function (a) {
                                var f = this._; if (!f.panel) {
                                    var b = this._.panelDefinition, d = this._.panelDefinition.block, m = b.parent || CKEDITOR.document.getBody(), k = CKEDITOR.document.getById(this._.id), l = this._.panel = new CKEDITOR.ui.floatPanel(a, m, b), b = l.addBlock(f.id, d), g = this, e = a.getCommand(this.command); l.onShow = function () {
                                        g.className && this.element.addClass(g.className +
                                            "_panel"); g.setState(CKEDITOR.TRISTATE_ON); k.setAttribute("aria-expanded", "true"); f.on = 1; g.editorFocus && a.focus(); if (g.onOpen) g.onOpen()
                                    }; l.onHide = function (b) { g.className && this.element.getFirst().removeClass(g.className + "_panel"); !g.modes && e ? g.setStateFromCommand(e) : g.setState(g.modes && g.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); f.on = 0; k.setAttribute("aria-expanded", "false"); if (!b && g.onClose) g.onClose() }; l.onEscape = function () { l.hide(1); g.document.getById(f.id).focus() }; if (this.onBlock) this.onBlock(l,
                                        b); b.onHide = function () { f.on = 0; !g.modes && g.command ? g.setStateFromCommand(e) : g.setState(CKEDITOR.TRISTATE_OFF) }
                                }
                            }, setStateFromCommand: function (a) { this.setState(a.state) }
                        }
                    })
                }, beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_PANELBUTTON, CKEDITOR.ui.panelButton.handler) }
            }); CKEDITOR.UI_PANELBUTTON = "panelbutton"; (function () {
                CKEDITOR.plugins.add("panel", { beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler) } }); CKEDITOR.UI_PANEL = "panel"; CKEDITOR.ui.panel = function (a, d) {
                    d && CKEDITOR.tools.extend(this,
                        d); CKEDITOR.tools.extend(this, { className: "", css: [] }); this.id = CKEDITOR.tools.getNextId(); this.document = a; this.isFramed = this.forceIFrame || this.css.length; this._ = { blocks: {} }
                }; CKEDITOR.ui.panel.handler = { create: function (a) { return new CKEDITOR.ui.panel(a) } }; var a = CKEDITOR.addTemplate("panel", '\x3cdiv lang\x3d"{langCode}" id\x3d"{id}" dir\x3d{dir} class\x3d"cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style\x3d"z-index:{z-index}" role\x3d"presentation"\x3e{frame}\x3c/div\x3e'), h = CKEDITOR.addTemplate("panel-frame",
                    '\x3ciframe id\x3d"{id}" class\x3d"cke_panel_frame" role\x3d"presentation" frameborder\x3d"0" src\x3d"{src}"\x3e\x3c/iframe\x3e'), f = CKEDITOR.addTemplate("panel-frame-inner", '\x3c!DOCTYPE html\x3e\x3chtml class\x3d"cke_panel_container {env}" dir\x3d"{dir}" lang\x3d"{langCode}"\x3e\x3chead\x3e{css}\x3c/head\x3e\x3cbody class\x3d"cke_{dir}" style\x3d"margin:0;padding:0" onload\x3d"{onload}"\x3e\x3c/body\x3e\x3c/html\x3e'); CKEDITOR.ui.panel.prototype = {
                        render: function (b, d) {
                            var m = {
                                editorId: b.id, id: this.id,
                                langCode: b.langCode, dir: b.lang.dir, cls: this.className, frame: "", env: CKEDITOR.env.cssClass, "z-index": b.config.baseFloatZIndex + 1
                            }; this.getHolderElement = function () {
                                var a = this._.holder; if (!a) {
                                    if (this.isFramed) {
                                        var a = this.document.getById(this.id + "_frame"), b = a.getParent(), a = a.getFrameDocument(); CKEDITOR.env.iOS && b.setStyles({ overflow: "scroll", "-webkit-overflow-scrolling": "touch" }); b = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function () { this.isLoaded = !0; if (this.onLoad) this.onLoad() }, this)); a.write(f.output(CKEDITOR.tools.extend({
                                            css: CKEDITOR.tools.buildStyleHtml(this.css),
                                            onload: "window.parent.CKEDITOR.tools.callFunction(" + b + ");"
                                        }, m))); a.getWindow().$.CKEDITOR = CKEDITOR; a.on("keydown", function (a) { var b = a.data.getKeystroke(), d = this.document.getById(this.id).getAttribute("dir"); if ("input" !== a.data.getTarget().getName() || 37 !== b && 39 !== b) this._.onKeyDown && !1 === this._.onKeyDown(b) ? "input" === a.data.getTarget().getName() && 32 === b || a.data.preventDefault() : (27 == b || b == ("rtl" == d ? 39 : 37)) && this.onEscape && !1 === this.onEscape(b) && a.data.preventDefault() }, this); a = a.getBody(); a.unselectable();
                                        CKEDITOR.env.air && CKEDITOR.tools.callFunction(b)
                                    } else a = this.document.getById(this.id); this._.holder = a
                                } return a
                            }; if (this.isFramed) { var k = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie && !CKEDITOR.env.edge ? "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())" : ""; m.frame = h.output({ id: this.id + "_frame", src: k }) } k = a.output(m); d && d.push(k); return k
                        }, addBlock: function (a, d) {
                            d = this._.blocks[a] = d instanceof CKEDITOR.ui.panel.block ?
                                d : new CKEDITOR.ui.panel.block(this.getHolderElement(), d); this._.currentBlock || this.showBlock(a); return d
                        }, getBlock: function (a) { return this._.blocks[a] }, showBlock: function (a) { a = this._.blocks[a]; var d = this._.currentBlock, f = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame"); d && d.hide(); this._.currentBlock = a; CKEDITOR.fire("ariaWidget", f); a._.focusIndex = -1; this._.onKeyDown = a.onKeyDown && CKEDITOR.tools.bind(a.onKeyDown, a); a.show(); return a }, destroy: function () {
                            this.element &&
                                this.element.remove()
                        }
                    }; CKEDITOR.ui.panel.block = CKEDITOR.tools.createClass({
                        $: function (a, d) { this.element = a.append(a.getDocument().createElement("div", { attributes: { tabindex: -1, "class": "cke_panel_block" }, styles: { display: "none" } })); d && CKEDITOR.tools.extend(this, d); this.element.setAttributes({ role: this.attributes.role || "presentation", "aria-label": this.attributes["aria-label"], title: this.attributes.title || this.attributes["aria-label"] }); this.keys = {}; this._.focusIndex = -1; this.element.disableContextMenu() },
                        _: {
                            markItem: function (a) { -1 != a && (a = this._.getItems().getItem(this._.focusIndex = a), CKEDITOR.env.webkit && a.getDocument().getWindow().focus(), a.focus(), this.onMark && this.onMark(a)) }, markFirstDisplayed: function (a) {
                                for (var d = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && "none" == a.getStyle("display") }, f = this._.getItems(), k, h, g = f.count() - 1; 0 <= g; g--)if (k = f.getItem(g), k.getAscendant(d) || (h = k, this._.focusIndex = g), "true" == k.getAttribute("aria-selected")) { h = k; this._.focusIndex = g; break } h && (a && a(), CKEDITOR.env.webkit &&
                                    h.getDocument().getWindow().focus(), h.focus(), this.onMark && this.onMark(h))
                            }, getItems: function () { return this.element.find("a,input") }
                        }, proto: {
                            show: function () { this.element.setStyle("display", "") }, hide: function () { this.onHide && !0 === this.onHide.call(this) || this.element.setStyle("display", "none") }, onKeyDown: function (a, d) {
                                var f = this.keys[a]; switch (f) {
                                    case "next": for (var k = this._.focusIndex, f = this._.getItems(), h; h = f.getItem(++k);)if (h.getAttribute("_cke_focus") && h.$.offsetWidth) {
                                        this._.focusIndex = k; h.focus(!0);
                                        break
                                    } return h || d ? !1 : (this._.focusIndex = -1, this.onKeyDown(a, 1)); case "prev": k = this._.focusIndex; for (f = this._.getItems(); 0 < k && (h = f.getItem(--k));) { if (h.getAttribute("_cke_focus") && h.$.offsetWidth) { this._.focusIndex = k; h.focus(!0); break } h = null } return h || d ? !1 : (this._.focusIndex = f.count(), this.onKeyDown(a, 1)); case "click": case "mouseup": return k = this._.focusIndex, (h = 0 <= k && this._.getItems().getItem(k)) && h.fireEventHandler(f, { button: CKEDITOR.tools.normalizeMouseButton(CKEDITOR.MOUSE_BUTTON_LEFT, !0) }), !1
                                }return !0
                            }
                        }
                    })
            })();
        CKEDITOR.plugins.add("floatpanel", { requires: "panel" }); (function () {
            function a(a, b, d, m, k) { k = CKEDITOR.tools.genKey(b.getUniqueId(), d.getUniqueId(), a.lang.dir, a.uiColor || "", m.css || "", k || ""); var l = h[k]; l || (l = h[k] = new CKEDITOR.ui.panel(b, m), l.element = d.append(CKEDITOR.dom.element.createFromHtml(l.render(a), b)), l.element.setStyles({ display: "none", position: "absolute" })); return l } var h = {}; CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
                $: function (f, b, d, h) {
                    function k() { c.hide() } d.forceIFrame = 1; d.toolbarRelated &&
                        f.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (b = CKEDITOR.document.getById("cke_" + f.name)); var l = b.getDocument(); h = a(f, l, b, d, h || 0); var g = h.element, e = g.getFirst(), c = this; g.disableContextMenu(); this.element = g; this._ = { editor: f, panel: h, parentElement: b, definition: d, document: l, iframe: e, children: [], dir: f.lang.dir, showBlockParams: null, markFirst: void 0 !== d.markFirst ? d.markFirst : !0 }; f.on("mode", k); f.on("resize", k); l.getWindow().on("resize", function () { this.reposition() }, this)
                }, proto: {
                    addBlock: function (a, b) {
                        return this._.panel.addBlock(a,
                            b)
                    }, addListBlock: function (a, b) { return this._.panel.addListBlock(a, b) }, getBlock: function (a) { return this._.panel.getBlock(a) }, showBlock: function (a, b, d, h, k, l) {
                        var g = this._.panel, e = g.showBlock(a); this._.showBlockParams = [].slice.call(arguments); this.allowBlur(!1); var c = this._.editor.editable(); this._.returnFocus = c.hasFocus ? c : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement); this._.hideTimeout = 0; var n = this.element, c = this._.iframe, c = CKEDITOR.env.ie && !CKEDITOR.env.edge ? c : new CKEDITOR.dom.window(c.$.contentWindow),
                            r = n.getDocument(), x = this._.parentElement.getPositionedAncestor(), u = b.getDocumentPosition(r), r = x ? x.getDocumentPosition(r) : { x: 0, y: 0 }, p = "rtl" == this._.dir, t = u.x + (h || 0) - r.x, A = u.y + (k || 0) - r.y; !p || 1 != d && 4 != d ? p || 2 != d && 3 != d || (t += b.$.offsetWidth - 1) : t += b.$.offsetWidth; if (3 == d || 4 == d) A += b.$.offsetHeight - 1; this._.panel._.offsetParentId = b.getId(); n.setStyles({ top: A + "px", left: 0, display: "" }); n.setOpacity(0); n.getFirst().removeStyle("width"); this._.editor.focusManager.add(c); this._.blurSet || (CKEDITOR.event.useCapture =
                                !0, c.on("blur", function (a) { function b() { delete this._.returnFocus; this.hide() } this.allowBlur() && a.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET && this.visible && !this._.activeChild && (CKEDITOR.env.iOS ? this._.hideTimeout || (this._.hideTimeout = CKEDITOR.tools.setTimeout(b, 0, this)) : b.call(this)) }, this), c.on("focus", function () { this._.focused = !0; this.hideChild(); this.allowBlur(!0) }, this), CKEDITOR.env.iOS && (c.on("touchstart", function () { clearTimeout(this._.hideTimeout) }, this), c.on("touchend", function () {
                                    this._.hideTimeout =
                                        0; this.focus()
                                }, this)), CKEDITOR.event.useCapture = !1, this._.blurSet = 1); g.onEscape = CKEDITOR.tools.bind(function (a) { if (this.onEscape && !1 === this.onEscape(a)) return !1 }, this); CKEDITOR.tools.setTimeout(function () {
                                    var a = CKEDITOR.tools.bind(function () {
                                        var a = n; a.removeStyle("width"); if (e.autoSize) {
                                            var b = e.element.getDocument(), b = (CKEDITOR.env.webkit || CKEDITOR.env.edge ? e.element : b.getBody()).$.scrollWidth; CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetWidth || 0) - (a.$.clientWidth || 0) + 3); a.setStyle("width",
                                                b + 10 + "px"); b = e.element.$.scrollHeight; CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetHeight || 0) - (a.$.clientHeight || 0) + 3); a.setStyle("height", b + "px"); g._.currentBlock.element.setStyle("display", "none").removeStyle("display")
                                        } else a.removeStyle("height"); p && (t -= n.$.offsetWidth); n.setStyle("left", t + "px"); var b = g.element.getWindow(), a = n.$.getBoundingClientRect(), b = b.getViewPaneSize(), c = a.width || a.right - a.left, d = a.height || a.bottom - a.top, f = p ? a.right : b.width - a.left, k = p ? b.width - a.right : a.left;
                                        p ? f < c && (t = k > c ? t + c : b.width > c ? t - a.left : t - a.right + b.width) : f < c && (t = k > c ? t - c : b.width > c ? t - a.right + b.width : t - a.left); c = a.top; b.height - a.top < d && (A = c > d ? A - d : b.height > d ? A - a.bottom + b.height : A - a.top); CKEDITOR.env.ie && !CKEDITOR.env.edge && ((b = a = n.$.offsetParent && new CKEDITOR.dom.element(n.$.offsetParent)) && "html" == b.getName() && (b = b.getDocument().getBody()), b && "rtl" == b.getComputedStyle("direction") && (t = CKEDITOR.env.ie8Compat ? t - 2 * n.getDocument().getDocumentElement().$.scrollLeft : t - (a.$.scrollWidth - a.$.clientWidth)));
                                        var a = n.getFirst(), h; (h = a.getCustomData("activePanel")) && h.onHide && h.onHide.call(this, 1); a.setCustomData("activePanel", this); n.setStyles({ top: A + "px", left: t + "px" }); n.setOpacity(1); l && l()
                                    }, this); g.isLoaded ? a() : g.onLoad = a; CKEDITOR.tools.setTimeout(function () {
                                        var a = CKEDITOR.env.webkit && CKEDITOR.document.getWindow().getScrollPosition().y; this.focus(); e.element.focus(); CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = a); this.allowBlur(!0); this._.markFirst && (CKEDITOR.env.ie ? CKEDITOR.tools.setTimeout(function () {
                                            e.markFirstDisplayed ?
                                                e.markFirstDisplayed() : e._.markFirstDisplayed()
                                        }, 0) : e.markFirstDisplayed ? e.markFirstDisplayed() : e._.markFirstDisplayed()); this._.editor.fire("panelShow", this)
                                    }, 0, this)
                                }, CKEDITOR.env.air ? 200 : 0, this); this.visible = 1; this.onShow && this.onShow.call(this)
                    }, reposition: function () { var a = this._.showBlockParams; this.visible && this._.showBlockParams && (this.hide(), this.showBlock.apply(this, a)) }, focus: function () {
                        if (CKEDITOR.env.webkit) { var a = CKEDITOR.document.getActive(); a && !a.equals(this._.iframe) && a.$.blur() } (this._.lastFocused ||
                            this._.iframe.getFrameDocument().getWindow()).focus()
                    }, blur: function () { var a = this._.iframe.getFrameDocument().getActive(); a && a.is("a") && (this._.lastFocused = a) }, hide: function (a) {
                        if (this.visible && (!this.onHide || !0 !== this.onHide.call(this))) {
                            this.hideChild(); CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur(); this.element.setStyle("display", "none"); this.visible = 0; this.element.getFirst().removeCustomData("activePanel"); if (a = a && this._.returnFocus) CKEDITOR.env.webkit && a.type && a.getWindow().$.focus(),
                                a.focus(); delete this._.lastFocused; this._.showBlockParams = null; this._.editor.fire("panelHide", this)
                        }
                    }, allowBlur: function (a) { var b = this._.panel; void 0 !== a && (b.allowBlur = a); return b.allowBlur }, showAsChild: function (a, b, d, h, k, l) {
                        if (this._.activeChild != a || a._.panel._.offsetParentId != d.getId()) this.hideChild(), a.onHide = CKEDITOR.tools.bind(function () { CKEDITOR.tools.setTimeout(function () { this._.focused || this.hide() }, 0, this) }, this), this._.activeChild = a, this._.focused = !1, a.showBlock(b, d, h, k, l), this.blur(),
                            (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function () { a.element.getChild(0).$.style.cssText += "" }, 100)
                    }, hideChild: function (a) { var b = this._.activeChild; b && (delete b.onHide, delete this._.activeChild, b.hide(), a && this.focus()) }
                }
            }); CKEDITOR.on("instanceDestroyed", function () { var a = CKEDITOR.tools.isEmpty(CKEDITOR.instances), b; for (b in h) { var d = h[b]; a ? d.destroy() : d.element.hide() } a && (h = {}) })
        })(); (function () {
            var a, h, f; CKEDITOR.plugins.add("colorbutton", {
                requires: "panelbutton,floatpanel", init: function (b) {
                    function d(c) {
                        function d() {
                            var a =
                                b.config["colorButton_" + t + "Style"]; a.childRule = "back" == t ? function (a) { return k(a) } : function (a) { return !(a.is("a") || a.getElementsByTag("a").count()) || k(a) }; return a
                        } function n(a, e, c) { var g = {}; a && (g.color = a); e && (g.colorName = e); e = !CKEDITOR.tools.isEmpty(g) && new CKEDITOR.style(d(), g); b.execCommand(B, { newStyle: e }); if (a && c) for (c.addColor(a.substr(1).toUpperCase()), a = G.element.find("[role\x3doption]").toArray(), c = 0; c < a.length; c++)a[c].setAttributes({ "aria-posinset": c + 1, "aria-setsize": a.length }) } var p = c.name,
                            t = c.type, A = c.title, q = c.order, B = c.commandName; c = c.contentTransformations || {}; var z = new CKEDITOR.style(g["colorButton_" + t + "Style"]), y = CKEDITOR.tools.getNextId() + "_colorBox", v = { type: t }, C = new CKEDITOR.style(g["colorButton_" + t + "Style"], { color: "inherit" }), F = function () { return CKEDITOR.tools.addFunction(function (a, e, c) { b.focus(); b.fire("saveSnapshot"); "?" == a ? b.getColorFromDialog(function (a) { a && n(a, e, D) }, null, v) : n(a && "#" + a, e, D); c && (c.setAttribute("cke_colorlast", !0), b.once("selectionChange", function () { c.removeAttribute("cke_colorlast") })) }) }(),
                                D = f.getRowLimit(b) ? new f(b, "back" == t ? "background-color" : "color", F) : void 0, G; b.addCommand(B, { contextSensitive: !0, exec: function (a, b) { if (!a.readOnly) { var e = b.newStyle; a.removeStyle(C); a.focus(); e && a.applyStyle(e); a.fire("saveSnapshot") } }, refresh: function (a, b) { C.checkApplicable(b, a, a.activeFilter) ? C.checkActive(b, a) ? this.setState(CKEDITOR.TRISTATE_ON) : this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED) } }); b.ui.add(p, CKEDITOR.UI_PANELBUTTON, {
                                    label: A, title: A, command: B, editorFocus: 0,
                                    toolbar: "colors," + q, allowedContent: z, requiredContent: z, contentTransformations: c, panel: { css: CKEDITOR.skin.getPath("editor"), attributes: { role: "listbox", "aria-label": e.panelTitle } }, select: function (b) { var e = g.colorButton_colors.split(","); b = CKEDITOR.tools.array.find(e, b); b = a.normalizeColor(b); l(G, b); G._.markFirstDisplayed() }, onBlock: function (a, e) {
                                        G = e; e.autoSize = !0; e.element.addClass("cke_colorblock"); e.element.setHtml(h(y, F, D ? D.getLength() : 0)); e.element.getDocument().getBody().setStyle("overflow", "hidden");
                                        e.element.getAscendant({ html: 1 }).setStyle("overflow", "hidden"); CKEDITOR.ui.fire("ready", this); var c = e.keys, d = "rtl" == b.lang.dir; c[d ? 37 : 39] = "next"; c[40] = "next"; c[9] = "next"; c[d ? 39 : 37] = "prev"; c[38] = "prev"; c[CKEDITOR.SHIFT + 9] = "prev"; c[32] = "click"; D && D.setContainer(e.element.findOne(".cke_colorhistory"))
                                    }, onOpen: function () {
                                        var e = b.getSelection(), c = e && e.getStartElement(), d = b.elementPath(c), f = "back" == t ? "background-color" : "color"; if (d) {
                                            c = d.block || d.blockLimit || b.document.getBody(); do d = c && c.getComputedStyle(f) ||
                                                "transparent"; while ("back" == t && "transparent" == d && c && (c = c.getParent())); d && "transparent" != d || (d = "#ffffff"); g.colorButton_enableAutomatic && G.element.findOne("#" + y).setStyle("background-color", d); if (c = e && e.getRanges()[0]) {
                                                    for (var e = new CKEDITOR.dom.walker(c), k = c.collapsed ? c.startContainer : e.next(), c = ""; k;) { k.type !== CKEDITOR.NODE_ELEMENT && (k = k.getParent()); k = a.normalizeColor(k.getComputedStyle(f)); c = c || k; if (c !== k) { c = ""; break } k = e.next() } "transparent" == c && (c = ""); "fore" == t && (v.automaticTextColor = "#" + a.normalizeColor(d));
                                                    v.selectionColor = c ? "#" + c : ""; l(G, c)
                                                } return d
                                        }
                                    }
                                })
                    } function h(c, d, k) {
                        var l = [], m = g.colorButton_colors.split(","), n = b.plugins.colordialog && g.colorButton_enableMore; k = m.length + k + (n ? 1 : 0); var q = 1; g.colorButton_enableAutomatic && (k += 1, q += 1, l.push('\x3ca class\x3d"cke_colorauto" _cke_focus\x3d1 hidefocus\x3dtrue', ' title\x3d"', e.auto, '"', ' draggable\x3d"false"', ' ondragstart\x3d"return false;"', ' onclick\x3d"CKEDITOR.tools.callFunction(', d, ',null);return false;"', " href\x3d\"javascript:void('", e.auto, "')\"",
                            ' role\x3d"option" aria-posinset\x3d"1" aria-setsize\x3d"', k, '"\x3e', '\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e', "\x3ctr\x3e", '\x3ctd colspan\x3d"', b.config.colorButton_colorsPerRow, '" align\x3d"center"\x3e', '\x3cspan class\x3d"cke_colorbox" id\x3d"', c, '"\x3e\x3c/span\x3e', e.auto, "\x3c/td\x3e", "\x3c/tr\x3e", "\x3c/table\x3e", "\x3c/a\x3e")); l.push('\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e\x3ctbody\x3e'); for (c =
                                0; c < m.length; c++) { 0 === c % b.config.colorButton_colorsPerRow && l.push("\x3c/tr\x3e\x3ctr\x3e"); var B = m[c].split("/"), z = B[0], B = new a(b, { color: B[1] || z, label: B[1] ? z : void 0 }, d); B.setPositionIndex(q + c, k); l.push(B.getHtml()) } f.getRowLimit(b) && f.renderContainer(l, b); n && l.push("\x3c/tr\x3e", "\x3ctr\x3e", '\x3ctd colspan\x3d"', b.config.colorButton_colorsPerRow, '" align\x3d"center"\x3e', '\x3ca class\x3d"cke_colormore" _cke_focus\x3d1 hidefocus\x3dtrue', ' title\x3d"', e.more, '"', ' draggable\x3d"false"', ' ondragstart\x3d"return false;"',
                                    ' onclick\x3d"CKEDITOR.tools.callFunction(', d, ",'?');return false;\"", " href\x3d\"javascript:void('", e.more, "')\"", ' role\x3d"option" aria-posinset\x3d"', k, '" aria-setsize\x3d"', k, '"\x3e', e.more, "\x3c/a\x3e", "\x3c/td\x3e"); l.push("\x3c/tr\x3e\x3c/tbody\x3e\x3c/table\x3e"); return l.join("")
                    } function k(a) { return "false" == a.getAttribute("contentEditable") || a.getAttribute("data-nostyle") } function l(b, e) {
                        var c = b._.getItems(), d = b.element.findOne("[aria-selected]"), g = b.element.findOne("[cke_colorlast]");
                        d && d.removeAttribute("aria-selected"); if (g) g.setAttribute("aria-selected", !0); else for (d = 0; d < c.count(); d++)if (g = c.getItem(d), e && e == a.normalizeColor(g.getAttribute("data-value"))) { g.setAttribute("aria-selected", !0); break }
                    } var g = b.config, e = b.lang.colorbutton; if (!CKEDITOR.env.hc) {
                        d({
                            name: "TextColor", type: "fore", commandName: "textColor", title: e.textColorTitle, order: 10, contentTransformations: [[{
                                element: "font", check: "span{color}", left: function (a) { return !!a.attributes.color }, right: function (a) {
                                    a.name = "span";
                                    a.attributes.color && (a.styles.color = a.attributes.color); delete a.attributes.color
                                }
                            }]]
                        }); var c, n = b.config.colorButton_normalizeBackground; if (void 0 === n || n) c = [[{
                            element: "span", left: function (a) { var b = CKEDITOR.tools; if ("span" != a.name || !a.styles || !a.styles.background) return !1; a = b.style.parse.background(a.styles.background); return a.color && 1 === b.object.keys(a).length }, right: function (a) {
                                var e = (new CKEDITOR.style(b.config.colorButton_backStyle, { color: a.styles.background })).getDefinition(); a.name = e.element;
                                a.styles = e.styles; a.attributes = e.attributes || {}; return a
                            }
                        }]]; d({ name: "BGColor", type: "back", commandName: "bgColor", title: e.bgColorTitle, order: 20, contentTransformations: c })
                    }
                }
            }); a = CKEDITOR.tools.createClass({
                $: function (b, d, f) { this.$ = new CKEDITOR.dom.element("td"); this.color = CKEDITOR.tools._isValidColorFormat(d.color) ? d.color : ""; this.clickFn = f; this.label = d.label || a.colorNames(b)[this.color] || this.color; this.setHtml() }, statics: {
                    colorNames: function (a) { return a.lang.colorbutton.colors }, normalizeColor: function (a) {
                        var d =
                            /^(rgb|hsl)a\(/g.test(a), f = /^rgba\((\s*0\s*,?){4}\)$/g.test(a); return d && !f ? (a = new CKEDITOR.tools.color(a), CKEDITOR.tools.normalizeHex(a.getHex() || "").replace(/#/g, "")) : CKEDITOR.tools.normalizeHex("#" + CKEDITOR.tools.convertRgbToHex(a || "")).replace(/#/g, "")
                    }
                }, proto: {
                    getElement: function () { return this.$ }, getHtml: function () { return this.getElement().getOuterHtml() }, setHtml: function () {
                        this.getElement().setHtml('\x3ca class\x3d"cke_colorbox" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"' + this.label + '" draggable\x3d"false" ondragstart\x3d"return false;" onclick\x3d"CKEDITOR.tools.callFunction(' +
                            this.clickFn + ",'" + this.color + "','" + this.label + "', this); return false;\" href\x3d\"javascript:void('" + this.color + '\')" data-value\x3d"' + this.color + '" role\x3d"option"\x3e\x3cspan class\x3d"cke_colorbox" style\x3d"background-color:#' + this.color + '"\x3e\x3c/span\x3e\x3c/a\x3e')
                    }, setPositionIndex: function (a, d) { this.getElement().getChild(0).setAttributes({ "aria-posinset": a, "aria-setsize": d }) }
                }
            }); h = CKEDITOR.tools.createClass({
                $: function () {
                    this.$ = new CKEDITOR.dom.element("tr"); this.$.addClass("cke_colorhistory_row");
                    this.boxes = []
                }, proto: { getElement: function () { return this.$ }, removeLastColor: function () { this.getElement().getLast().remove(); return this.boxes.pop() }, addNewColor: function (a) { this.boxes.unshift(a); this.getElement().append(a.getElement(), !0) }, extractColorBox: function (a) { var d = CKEDITOR.tools.getIndex(this.boxes, function (d) { return d.color === a }); if (0 > d) return null; this.boxes[d].getElement().remove(); return this.boxes.splice(d, 1)[0] } }
            }); f = CKEDITOR.tools.createClass({
                $: function (a, d, f) {
                    this.editor = a; this.cssProperty =
                        d; this.clickFn = f; this.rows = []; this._.addNewRow(); if (this.editor.config.colorButton_renderContentColors) this.editor.once("instanceReady", function () { this.renderContentColors() }, this)
                }, statics: {
                    renderContainer: function (a, d) { a.push('\x3c/tbody\x3e\x3ctbody class\x3d"cke_colorhistory" style\x3d"display:none;"\x3e', "\x3ctr\x3e", '\x3ctd colspan\x3d"', d.config.colorButton_colorsPerRow, '" align\x3d"center"\x3e', "\x3cspan\x3e\x3chr\x3e\x3c/span\x3e", "\x3c/td\x3e", "\x3c/tr\x3e", "\x3c/tbody\x3e\x3ctbody\x3e") },
                    getRowLimit: function (a) { return a.config.colorButton_historyRowLimit }, getCapacity: function (a) { return f.getRowLimit(a) * a.config.colorButton_colorsPerRow }, colorList: CKEDITOR.tools.style.parse._colors
                }, _: {
                    countColors: function () { var a = CKEDITOR.tools.getStyledSpans(this.cssProperty, this.editor.editable()); return CKEDITOR.tools.array.reduce(a, function (a, b) { var k = this._.getHexCode(b, this.cssProperty, f.colorList); a[k] = a[k] || 0; a[k] += 1; return a }, {}, this) }, getHexCode: function (b, d, f) {
                        var k = b.getStyle(d); return k in
                            f ? f[k].substr(1) : a.normalizeColor(b.getComputedStyle(d)).toUpperCase()
                    }, sortByOccurrencesAscending: function (a, d) { var f = [], k; for (k in a) { var h = {}; h[d] = k; h.frequency = a[k]; f.push(h) } f.sort(function (a, b) { return b.frequency - a.frequency }); this._.trimToCapacity(f); return f.reverse() }, trimToCapacity: function (a) { a.splice(f.getCapacity(this.editor)) }, addColors: function (a) { CKEDITOR.tools.array.forEach(a, function (a) { this.addColor(a.colorCode) }, this) }, extractColorBox: function (a) {
                        for (var d = 0; d < this.rows.length; d++) {
                            var f =
                                this.rows[d].extractColorBox(a); if (f) return f
                        } return null
                    }, moveToBeginning: function (a) { this.rows[0].addNewColor(a) }, createAtBeginning: function (b) { this._.moveToBeginning(new a(this.editor, { color: b }, this.clickFn)) }, addNewRow: function () { this.rows.push(new h); this.container && this.container.append(this.rows[this.rows.length - 1].getElement()) }, alignRows: function () {
                        for (var a = 0; a < f.getRowLimit(this.editor) && !(this.rows[a].boxes.length <= this.editor.config.colorButton_colorsPerRow); a++)this.rows[a + 1] ? this._.moveLastBoxToNextRow(a) :
                            a < f.getRowLimit(this.editor) - 1 ? (this._.addNewRow(), this._.moveLastBoxToNextRow(a)) : this.rows[a].removeLastColor()
                    }, moveLastBoxToNextRow: function (a) { this.rows[a + 1].addNewColor(this.rows[a].removeLastColor()) }, refreshPositions: function () { var a = this._.countPanelElements(), d = this._.calculateFirstPosition(a); CKEDITOR.tools.array.forEach(this.rows, function (f) { CKEDITOR.tools.array.forEach(f.boxes, function (f) { f.setPositionIndex(d, a); d += 1 }) }) }, countPanelElements: function () {
                        var a = this.editor.config.colorButton_colors.split(",").length +
                            this.getLength(); this.editor.plugins.colordialog && this.editor.config.colorButton_enableMore && (a += 1); this.editor.config.colorButton_enableAutomatic && (a += 1); return a
                    }, calculateFirstPosition: function (a) { return this.editor.plugins.colordialog && this.editor.config.colorButton_enableMore ? a - this.getLength() : a - this.getLength() + 1 }, attachRows: function () { CKEDITOR.tools.array.forEach(this.rows, function (a) { this.container.append(a.getElement()) }, this) }
                }, proto: {
                    setContainer: function (a) {
                        this.container = a; this._.attachRows();
                        this.getLength() && this.show()
                    }, show: function () { this.container && this.container.show() }, renderContentColors: function () { var a = this._.countColors(); CKEDITOR.tools.isEmpty(a) || (a = this._.sortByOccurrencesAscending(a, "colorCode"), this._.addColors(a), this._.refreshPositions()) }, addColor: function (a) { var d = this._.extractColorBox(a); this.container && !this.container.isVisible() && this.show(); d ? this._.moveToBeginning(d) : this._.createAtBeginning(a); this._.alignRows() }, getLength: function () {
                        return CKEDITOR.tools.array.reduce(this.rows,
                            function (a, d) { return a + d.boxes.length }, 0)
                    }
                }
            })
        })(); CKEDITOR.config.colorButton_enableMore = !0; CKEDITOR.config.colorButton_colors = "1ABC9C,2ECC71,3498DB,9B59B6,4E5F70,F1C40F,16A085,27AE60,2980B9,8E44AD,2C3E50,F39C12,E67E22,E74C3C,ECF0F1,95A5A6,DDD,FFF,D35400,C0392B,BDC3C7,7F8C8D,999,000"; CKEDITOR.config.colorButton_foreStyle = { element: "span", styles: { color: "#(color)" }, overrides: [{ element: "font", attributes: { color: null } }] }; CKEDITOR.config.colorButton_backStyle = { element: "span", styles: { "background-color": "#(color)" } };
        CKEDITOR.config.colorButton_enableAutomatic = !0; CKEDITOR.config.colorButton_colorsPerRow = 6; CKEDITOR.config.colorButton_historyRowLimit = 1; CKEDITOR.config.colorButton_renderContentColors = !0; CKEDITOR.plugins.colordialog = {
            requires: "dialog", init: function (a) {
                var h = new CKEDITOR.dialogCommand("colordialog"); h.editorFocus = !1; a.addCommand("colordialog", h); CKEDITOR.dialog.add("colordialog", this.path + "dialogs/colordialog.js"); a.getColorFromDialog = function (f, b, d) {
                    var h, k, l, g; h = function (a) {
                        l(this); (a = "ok" == a.name ?
                            this.getValueOf("picker", "selectedColor") : null) && !CKEDITOR.tools._isValidColorFormat(a) && (a = null); /^[0-9a-f]{3}([0-9a-f]{3})?$/i.test(a) && (a = "#" + a); f.call(b, a)
                    }; k = function (a) { d && (a.data = d) }; l = function (a) { a.removeListener("ok", h); a.removeListener("cancel", h); a.removeListener("show", k) }; g = function (a) { a.on("ok", h); a.on("cancel", h); a.on("show", k, null, null, 5) }; a.execCommand("colordialog"); if (a._.storedDialogs && a._.storedDialogs.colordialog) g(a._.storedDialogs.colordialog); else CKEDITOR.on("dialogDefinition",
                        function (a) { if ("colordialog" == a.data.name) { var b = a.data.definition; a.removeListener(); b.onLoad = CKEDITOR.tools.override(b.onLoad, function (a) { return function () { g(this); b.onLoad = a; "function" == typeof a && a.call(this) } }) } })
                }
            }
        }; CKEDITOR.plugins.add("colordialog", CKEDITOR.plugins.colordialog); (function () {
            function a(a, b, d, e) { var c = new CKEDITOR.dom.walker(a); if (a = a.startContainer.getAscendant(b, !0) || a.endContainer.getAscendant(b, !0)) if (d(a), e) return; for (; a = c.next();)if (a = a.getAscendant(b, !0)) if (d(a), e) break }
            function h(a, d) { var g = { ul: "ol", ol: "ul" }; return -1 !== b(d, function (b) { return b.element === a || b.element === g[a] }) } function f(a) { this.styles = null; this.sticky = !1; this.editor = a; this.filter = new CKEDITOR.filter(a, a.config.copyFormatting_allowRules); !0 === a.config.copyFormatting_allowRules && (this.filter.disabled = !0); a.config.copyFormatting_disallowRules && this.filter.disallow(a.config.copyFormatting_disallowRules) } var b = CKEDITOR.tools.indexOf, d = CKEDITOR.tools.getMouseButton, m = !1; CKEDITOR.plugins.add("copyformatting",
                {
                    lang: "ar,az,bg,cs,da,de,de-ch,el,en,en-au,eo,es-mx,et,eu,fa,fr,gl,hr,hu,it,ja,ko,ku,lv,nb,nl,oc,pl,pt,pt-br,ro,ru,sk,sq,sr,sr-latn,sv,tr,uk,vi,zh,zh-cn", icons: "copyformatting", hidpi: !0, init: function (a) {
                        var f = CKEDITOR.plugins.copyformatting; f._addScreenReaderContainer(); m || (CKEDITOR.document.appendStyleSheet(this.path + "styles/copyformatting.css"), m = !0); a.addContentsCss && a.addContentsCss(this.path + "styles/copyformatting.css"); a.copyFormatting = new f.state(a); a.addCommand("copyFormatting", f.commands.copyFormatting);
                        a.addCommand("applyFormatting", f.commands.applyFormatting); a.ui.addButton("CopyFormatting", { isToggle: !0, label: a.lang.copyformatting.label, command: "copyFormatting", toolbar: "cleanup,0" }); a.on("contentDom", function () {
                            var b = a.getCommand("copyFormatting"), e = a.editable(), c = e.isInline() ? e : a.document, f = a.ui.get("CopyFormatting"); e.attachListener(c, "mouseup", function (e) { d(e) === CKEDITOR.MOUSE_BUTTON_LEFT && b.state === CKEDITOR.TRISTATE_ON && a.execCommand("applyFormatting") }); e.attachListener(CKEDITOR.document,
                                "mouseup", function (c) { d(c) !== CKEDITOR.MOUSE_BUTTON_LEFT || b.state !== CKEDITOR.TRISTATE_ON || e.contains(c.data.getTarget()) || a.execCommand("copyFormatting") }); f && (c = CKEDITOR.document.getById(f._.id), e.attachListener(c, "dblclick", function () { a.execCommand("copyFormatting", { sticky: !0 }) }), e.attachListener(c, "mouseup", function (a) { a.data.stopPropagation() }))
                        }); a.config.copyFormatting_keystrokeCopy && a.setKeystroke(a.config.copyFormatting_keystrokeCopy, "copyFormatting"); a.on("key", function (b) {
                            var e = a.getCommand("copyFormatting");
                            b = b.data.domEvent; b.getKeystroke && 27 === b.getKeystroke() && e.state === CKEDITOR.TRISTATE_ON && a.execCommand("copyFormatting")
                        }); a.copyFormatting.on("extractFormatting", function (b) { var e = b.data.element; if (e.contains(a.editable()) || e.equals(a.editable())) return b.cancel(); e = f._convertElementToStyleDef(e); if (!a.copyFormatting.filter.check(new CKEDITOR.style(e), !0, !0)) return b.cancel(); b.data.styleDef = e }); a.copyFormatting.on("applyFormatting", function (d) {
                            if (!d.data.preventFormatStripping) {
                                var e = d.data.range,
                                    c = f._extractStylesFromRange(a, e), m = f._determineContext(e), r, x; if (a.copyFormatting._isContextAllowed(m)) for (x = 0; x < c.length; x++)m = c[x], r = e.createBookmark(), -1 === b(f.preservedElements, m.element) ? CKEDITOR.env.webkit && !CKEDITOR.env.chrome ? c[x].removeFromRange(d.data.range, d.editor) : c[x].remove(d.editor) : h(m.element, d.data.styles) && f._removeStylesFromElementInRange(e, m.element), e.moveToBookmark(r)
                            }
                        }); a.copyFormatting.on("applyFormatting", function (b) {
                            var e = CKEDITOR.plugins.copyformatting, c = e._determineContext(b.data.range);
                            "list" === c && a.copyFormatting._isContextAllowed("list") ? e._applyStylesToListContext(b.editor, b.data.range, b.data.styles) : "table" === c && a.copyFormatting._isContextAllowed("table") ? e._applyStylesToTableContext(b.editor, b.data.range, b.data.styles) : a.copyFormatting._isContextAllowed("text") && e._applyStylesToTextContext(b.editor, b.data.range, b.data.styles)
                        }, null, null, 999)
                    }
                }); f.prototype._isContextAllowed = function (a) { var d = this.editor.config.copyFormatting_allowedContexts; return !0 === d || -1 !== b(d, a) }; CKEDITOR.event.implementOn(f.prototype);
            CKEDITOR.plugins.copyformatting = {
                state: f, inlineBoundary: "h1 h2 h3 h4 h5 h6 p div".split(" "), excludedAttributes: ["id", "style", "href", "data-cke-saved-href", "dir"], elementsForInlineTransform: ["li"], excludedElementsFromInlineTransform: ["table", "thead", "tbody", "ul", "ol"], excludedAttributesFromInlineTransform: ["value", "type"], preservedElements: "ul ol li td th tr thead tbody table".split(" "), breakOnElements: ["ul", "ol", "table"], _initialKeystrokePasteCommand: null, commands: {
                    copyFormatting: {
                        exec: function (a,
                            b) {
                            var d = CKEDITOR.plugins.copyformatting, e = a.copyFormatting, c = b ? "keystrokeHandler" == b.from : !1, f = b ? b.sticky || c : !1, h = d._getCursorContainer(a), m = CKEDITOR.document.getDocumentElement(); if (this.state === CKEDITOR.TRISTATE_ON) return e.styles = null, e.sticky = !1, h.removeClass("cke_copyformatting_active"), m.removeClass("cke_copyformatting_disabled"), m.removeClass("cke_copyformatting_tableresize_cursor"), d._putScreenReaderMessage(a, "canceled"), d._detachPasteKeystrokeHandler(a), this.setState(CKEDITOR.TRISTATE_OFF);
                            e.styles = d._extractStylesFromElement(a, a.elementPath().lastElement); this.setState(CKEDITOR.TRISTATE_ON); c || (h.addClass("cke_copyformatting_active"), m.addClass("cke_copyformatting_tableresize_cursor"), a.config.copyFormatting_outerCursor && m.addClass("cke_copyformatting_disabled")); e.sticky = f; d._putScreenReaderMessage(a, "copied"); d._attachPasteKeystrokeHandler(a)
                        }
                    }, applyFormatting: {
                        editorFocus: CKEDITOR.env.ie && !CKEDITOR.env.edge ? !1 : !0, exec: function (a, b) {
                            var d = a.getCommand("copyFormatting"), e = b ? "keystrokeHandler" ==
                                b.from : !1, c = CKEDITOR.plugins.copyformatting, f = a.copyFormatting, h = c._getCursorContainer(a), m = CKEDITOR.document.getDocumentElement(); if (e && !f.styles) return c._putScreenReaderMessage(a, "failed"), c._detachPasteKeystrokeHandler(a), !1; e = c._applyFormat(a, f.styles); f.sticky || (f.styles = null, h.removeClass("cke_copyformatting_active"), m.removeClass("cke_copyformatting_disabled"), m.removeClass("cke_copyformatting_tableresize_cursor"), d.setState(CKEDITOR.TRISTATE_OFF), c._detachPasteKeystrokeHandler(a)); c._putScreenReaderMessage(a,
                                    e ? "applied" : "canceled")
                        }
                    }
                }, _getCursorContainer: function (a) { return a.elementMode === CKEDITOR.ELEMENT_MODE_INLINE ? a.editable() : a.editable().getParent() }, _convertElementToStyleDef: function (a) { var b = CKEDITOR.tools, d = a.getAttributes(CKEDITOR.plugins.copyformatting.excludedAttributes), b = b.parseCssText(a.getAttribute("style"), !0, !0); return { element: a.getName(), type: CKEDITOR.STYLE_INLINE, attributes: d, styles: b } }, _extractStylesFromElement: function (a, d) {
                    var g = {}, e = []; do if (d.type === CKEDITOR.NODE_ELEMENT && !d.hasAttribute("data-cke-bookmark") &&
                        (g.element = d, a.copyFormatting.fire("extractFormatting", g, a) && g.styleDef && e.push(new CKEDITOR.style(g.styleDef)), d.getName && -1 !== b(CKEDITOR.plugins.copyformatting.breakOnElements, d.getName()))) break; while ((d = d.getParent()) && d.type === CKEDITOR.NODE_ELEMENT); return e
                }, _extractStylesFromRange: function (a, b) { for (var d = [], e = new CKEDITOR.dom.walker(b), c; c = e.next();)d = d.concat(CKEDITOR.plugins.copyformatting._extractStylesFromElement(a, c)); return d }, _removeStylesFromElementInRange: function (a, d) {
                    for (var g = -1 !==
                        b(["ol", "ul", "table"], d), e = new CKEDITOR.dom.walker(a), c; c = e.next();)if (c = c.getAscendant(d, !0)) if (c.removeAttributes(c.getAttributes()), g) break
                }, _getSelectedWordOffset: function (a) {
                    function d(a, b) { return a[b ? "getPrevious" : "getNext"](function (a) { return a.type !== CKEDITOR.NODE_COMMENT }) } function g(a) { return a.type == CKEDITOR.NODE_ELEMENT ? (a = a.getHtml().replace(/<span.*?>&nbsp;<\/span>/g, ""), a.replace(/<.*?>/g, "")) : a.getText() } function e(a, c) {
                        var f = a, h = /\s/g, k = "p br ol ul li td th div caption body".split(" "),
                            m = !1, n = !1, r, p; do { for (r = d(f, c); !r && f.getParent();) { f = f.getParent(); if (-1 !== b(k, f.getName())) { n = m = !0; break } r = d(f, c) } if (r && r.getName && -1 !== b(k, r.getName())) { m = !0; break } f = r } while (f && f.getStyle && ("none" == f.getStyle("display") || !f.getText())); for (f || (f = a); f.type !== CKEDITOR.NODE_TEXT;)f = !m || c || n ? f.getChild(0) : f.getChild(f.getChildCount() - 1); for (k = g(f); null != (n = h.exec(k)) && (p = n.index, c);); if ("number" !== typeof p && !m) return e(f, c); if (m) c ? p = 0 : (h = /([\.\b]*$)/, p = (n = h.exec(k)) ? n.index : k.length); else if (c && (p +=
                                1, p > k.length)) return e(f); return { node: f, offset: p }
                    } var c = /\b\w+\b/ig, f, h, m, u, p; m = u = p = a.startContainer; for (f = g(m); null != (h = c.exec(f));)if (h.index + h[0].length >= a.startOffset) return a = h.index, c = h.index + h[0].length, 0 === h.index && (h = e(m, !0), u = h.node, a = h.offset), c >= f.length && (f = e(m), p = f.node, c = f.offset), { startNode: u, startOffset: a, endNode: p, endOffset: c }; return null
                }, _filterStyles: function (a) {
                    var b = CKEDITOR.tools.isEmpty, d = [], e, c; for (c = 0; c < a.length; c++)e = a[c]._.definition, -1 !== CKEDITOR.tools.indexOf(CKEDITOR.plugins.copyformatting.inlineBoundary,
                        e.element) && (e.element = a[c].element = "span"), "span" === e.element && b(e.attributes) && b(e.styles) || d.push(a[c]); return d
                }, _determineContext: function (a) { function b(d) { var e = new CKEDITOR.dom.walker(a), c; if (a.startContainer.getAscendant(d, !0) || a.endContainer.getAscendant(d, !0)) return !0; for (; c = e.next();)if (c.getAscendant(d, !0)) return !0 } return b({ ul: 1, ol: 1 }) ? "list" : b("table") ? "table" : "text" }, _applyStylesToTextContext: function (a, d, g) {
                    var e = CKEDITOR.plugins.copyformatting, c = e.excludedAttributesFromInlineTransform,
                        f, h; CKEDITOR.env.webkit && !CKEDITOR.env.chrome && a.getSelection().selectRanges([d]); for (f = 0; f < g.length; f++)if (d = g[f], -1 === b(e.excludedElementsFromInlineTransform, d.element)) { if (-1 !== b(e.elementsForInlineTransform, d.element)) for (d.element = d._.definition.element = "span", h = 0; h < c.length; h++)d._.definition.attributes[c[h]] && delete d._.definition.attributes[c[h]]; d.apply(a) }
                }, _applyStylesToListContext: function (b, d, g) {
                    var e, c, f; for (f = 0; f < g.length; f++)e = g[f], c = d.createBookmark(), "ol" === e.element || "ul" === e.element ?
                        a(d, { ul: 1, ol: 1 }, function (a) { var b = e; a.getName() !== b.element && a.renameNode(b.element); b.applyToObject(a) }, !0) : "li" === e.element ? a(d, "li", function (a) { e.applyToObject(a) }) : CKEDITOR.plugins.copyformatting._applyStylesToTextContext(b, d, [e]), d.moveToBookmark(c)
                }, _applyStylesToTableContext: function (d, f, g) {
                    function e(a, b) { a.getName() !== b.element && (b = b.getDefinition(), b.element = a.getName(), b = new CKEDITOR.style(b)); b.applyToObject(a) } var c, h, m; for (m = 0; m < g.length; m++)c = g[m], h = f.createBookmark(), -1 !== b(["table",
                        "tr"], c.element) ? a(f, c.element, function (a) { c.applyToObject(a) }) : -1 !== b(["td", "th"], c.element) ? a(f, { td: 1, th: 1 }, function (a) { e(a, c) }) : -1 !== b(["thead", "tbody"], c.element) ? a(f, { thead: 1, tbody: 1 }, function (a) { e(a, c) }) : CKEDITOR.plugins.copyformatting._applyStylesToTextContext(d, f, [c]), f.moveToBookmark(h)
                }, _applyFormat: function (a, b) {
                    var d = a.getSelection().getRanges()[0], e = CKEDITOR.plugins.copyformatting, c, f; if (!d) return !1; if (d.collapsed) {
                        f = a.getSelection().createBookmarks(); if (!(c = e._getSelectedWordOffset(d))) return;
                        d = a.createRange(); d.setStart(c.startNode, c.startOffset); d.setEnd(c.endNode, c.endOffset); d.select()
                    } b = e._filterStyles(b); if (!a.copyFormatting.fire("applyFormatting", { styles: b, range: d, preventFormatStripping: !1 }, a)) return !1; f && a.getSelection().selectBookmarks(f); return !0
                }, _putScreenReaderMessage: function (a, b) { var d = this._getScreenReaderContainer(); d && d.setText(a.lang.copyformatting.notification[b]) }, _addScreenReaderContainer: function () {
                    if (this._getScreenReaderContainer()) return this._getScreenReaderContainer();
                    if (!CKEDITOR.env.ie6Compat && !CKEDITOR.env.ie7Compat) return CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_screen_reader_only cke_copyformatting_notification"\x3e\x3cdiv aria-live\x3d"polite"\x3e\x3c/div\x3e\x3c/div\x3e')).getChild(0)
                }, _getScreenReaderContainer: function () { if (!CKEDITOR.env.ie6Compat && !CKEDITOR.env.ie7Compat) return CKEDITOR.document.getBody().findOne(".cke_copyformatting_notification div[aria-live]") }, _attachPasteKeystrokeHandler: function (a) {
                    var b =
                        a.config.copyFormatting_keystrokePaste; b && (this._initialKeystrokePasteCommand = a.keystrokeHandler.keystrokes[b], a.setKeystroke(b, "applyFormatting"))
                }, _detachPasteKeystrokeHandler: function (a) { var b = a.config.copyFormatting_keystrokePaste; b && a.setKeystroke(b, this._initialKeystrokePasteCommand || !1) }
            }; CKEDITOR.config.copyFormatting_outerCursor = !0; CKEDITOR.config.copyFormatting_allowRules = "b s u i em strong span p div td th ol ul li(*)[*]{*}"; CKEDITOR.config.copyFormatting_disallowRules = "*[data-cke-widget*,data-widget*,data-cke-realelement](cke_widget*)";
            CKEDITOR.config.copyFormatting_allowedContexts = !0; CKEDITOR.config.copyFormatting_keystrokeCopy = CKEDITOR.CTRL + CKEDITOR.SHIFT + 67; CKEDITOR.config.copyFormatting_keystrokePaste = CKEDITOR.CTRL + CKEDITOR.SHIFT + 86
        })(); CKEDITOR.plugins.add("menu", {
            requires: "floatpanel", beforeInit: function (a) {
                for (var h = a.config.menu_groups.split(","), f = a._.menuGroups = {}, b = a._.menuItems = {}, d = 0; d < h.length; d++)f[h[d]] = d + 1; a.addMenuGroup = function (a, b) { f[a] = b || 100 }; a.addMenuItem = function (a, d) {
                    f[d.group] && (b[a] = new CKEDITOR.menuItem(this,
                        a, d))
                }; a.addMenuItems = function (a) { for (var b in a) this.addMenuItem(b, a[b]) }; a.getMenuItem = function (a) { return b[a] }; a.removeMenuItem = function (a) { delete b[a] }
            }
        }); (function () {
            function a(a) { a.sort(function (a, b) { return a.group < b.group ? -1 : a.group > b.group ? 1 : a.order < b.order ? -1 : a.order > b.order ? 1 : 0 }) } var h = '\x3cspan class\x3d"cke_menuitem"\x3e\x3ca id\x3d"{id}" class\x3d"cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href\x3d"{href}" title\x3d"{title}" tabindex\x3d"-1" _cke_focus\x3d1 hidefocus\x3d"true" role\x3d"{role}" aria-label\x3d"{attrLabel}" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasPopup}" aria-disabled\x3d"{disabled}" {ariaChecked} draggable\x3d"false"',
                f = ""; CKEDITOR.env.gecko && CKEDITOR.env.mac && (h += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (h += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;" ondragstart\x3d"return false;"'); CKEDITOR.env.ie && (f = 'return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26'); var h = h + (' onmouseover\x3d"CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout\x3d"CKEDITOR.tools.callFunction({moveOutFn},{index});" onclick\x3d"' + f + 'CKEDITOR.tools.callFunction({clickFn},{index}); return false;"\x3e') +
                    '\x3cspan class\x3d"cke_menubutton_inner"\x3e\x3cspan class\x3d"cke_menubutton_icon"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{iconStyle}"\x3e\x3c/span\x3e\x3c/span\x3e\x3cspan class\x3d"cke_menubutton_label"\x3e{label}\x3c/span\x3e{shortcutHtml}{arrowHtml}\x3c/span\x3e\x3c/a\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_voice_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e\x3c/span\x3e', b = CKEDITOR.addTemplate("menuItem", h), d = CKEDITOR.addTemplate("menuArrow",
                        '\x3cspan class\x3d"cke_menuarrow"\x3e\x3cspan\x3e{label}\x3c/span\x3e\x3c/span\x3e'), m = CKEDITOR.addTemplate("menuShortcut", '\x3cspan class\x3d"cke_menubutton_label cke_menubutton_shortcut"\x3e{shortcut}\x3c/span\x3e'); CKEDITOR.menu = CKEDITOR.tools.createClass({
                            $: function (a, b) {
                                b = this._.definition = b || {}; this.id = CKEDITOR.tools.getNextId(); this.editor = a; this.items = []; this._.listeners = []; this._.level = b.level || 1; var d = CKEDITOR.tools.extend({}, b.panel, {
                                    css: [CKEDITOR.skin.getPath("editor")], level: this._.level -
                                        1, block: {}
                                }), e = d.block.attributes = d.attributes || {}; !e.role && (e.role = "menu"); this._.panelDefinition = d
                            }, _: {
                                onShow: function () { var a = this.editor.getSelection(), b = a && a.getStartElement(), d = this.editor.elementPath(), e = this._.listeners; this.removeAll(); for (var c = 0; c < e.length; c++) { var f = e[c](b, a, d); if (f) for (var h in f) { var m = this.editor.getMenuItem(h); !m || m.command && !this.editor.getCommand(m.command).state || (m.state = f[h], this.add(m)) } } }, onClick: function (a) {
                                    this.hide(); if (a.onClick) a.onClick(); else a.command &&
                                        this.editor.execCommand(a.command)
                                }, onEscape: function (a) { var b = this.parent; b ? b._.panel.hideChild(1) : 27 == a && this.hide(1); return !1 }, onHide: function () { this.onHide && this.onHide() }, showSubMenu: function (a) {
                                    var b = this._.subMenu, d = this.items[a]; if (d = d.getItems && d.getItems()) {
                                        b ? b.removeAll() : (b = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, { level: this._.level + 1 }, !0)), b.parent = this, b._.onClick = CKEDITOR.tools.bind(this._.onClick, this)); for (var e in d) {
                                            var c = this.editor.getMenuItem(e);
                                            c && (c.state = d[e], b.add(c))
                                        } var f = this._.panel.getBlock(this.id).element.getDocument().getById(this.id + String(a)); setTimeout(function () { b.show(f, 2) }, 0)
                                    } else this._.panel.hideChild(1)
                                }
                            }, proto: {
                                add: function (a) { a.order || (a.order = this.items.length); this.items.push(a) }, removeAll: function () { this.items = [] }, show: function (b, d, g, e) {
                                    if (!this.parent && (this._.onShow(), !this.items.length)) return; d = d || ("rtl" == this.editor.lang.dir ? 2 : 1); var c = this.items, f = this.editor, h = this._.panel, m = this._.element; if (!h) {
                                        h = this._.panel =
                                            new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level); h.onEscape = CKEDITOR.tools.bind(function (a) { if (!1 === this._.onEscape(a)) return !1 }, this); h.onShow = function () { h._.panel.getHolderElement().getParent().addClass("cke").addClass("cke_reset_all") }; h.onHide = CKEDITOR.tools.bind(function () { this._.onHide && this._.onHide() }, this); m = h.addBlock(this.id, this._.panelDefinition.block); m.autoSize = !0; var u = m.keys; u[40] = "next"; u[9] = "next"; u[38] = "prev"; u[CKEDITOR.SHIFT +
                                                9] = "prev"; u["rtl" == f.lang.dir ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click"; u[32] = CKEDITOR.env.ie ? "mouseup" : "click"; CKEDITOR.env.ie && (u[13] = "mouseup"); m = this._.element = m.element; u = m.getDocument(); u.getBody().setStyle("overflow", "hidden"); u.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden"); this._.itemOverFn = CKEDITOR.tools.addFunction(function (a) { clearTimeout(this._.showSubTimeout); this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, f.config.menu_subMenuDelay || 400, this, [a]) },
                                                    this); this._.itemOutFn = CKEDITOR.tools.addFunction(function () { clearTimeout(this._.showSubTimeout) }, this); this._.itemClickFn = CKEDITOR.tools.addFunction(function (a) { var b = this.items[a]; if (b.state == CKEDITOR.TRISTATE_DISABLED) this.hide(1); else if (b.getItems) this._.showSubMenu(a); else this._.onClick(b) }, this)
                                    } a(c); for (var u = f.elementPath(), u = ['\x3cdiv class\x3d"cke_menu' + (u && u.direction() != f.lang.dir ? " cke_mixed_dir_content" : "") + '" role\x3d"presentation"\x3e'], p = c.length, t = p && c[0].group, A = 0; A < p; A++) {
                                        var q =
                                            c[A]; t != q.group && (u.push('\x3cdiv class\x3d"cke_menuseparator" role\x3d"separator"\x3e\x3c/div\x3e'), t = q.group); q.render(this, A, u)
                                    } u.push("\x3c/div\x3e"); m.setHtml(u.join("")); CKEDITOR.ui.fire("ready", this); this.parent ? this.parent._.panel.showAsChild(h, this.id, b, d, g, e) : h.showBlock(this.id, b, d, g, e); f.fire("menuShow", [h])
                                }, addListener: function (a) { this._.listeners.push(a) }, hide: function (a) { this._.onHide && this._.onHide(); this._.panel && this._.panel.hide(a) }, findItemByCommandName: function (a) {
                                    var b = CKEDITOR.tools.array.filter(this.items,
                                        function (b) { return a === b.command }); return b.length ? (b = b[0], { item: b, element: this._.element.findOne("." + b.className) }) : null
                                }
                            }
                        }); CKEDITOR.menuItem = CKEDITOR.tools.createClass({
                            $: function (a, b, d) { CKEDITOR.tools.extend(this, d, { order: 0, className: "cke_menubutton__" + b }); this.group = a._.menuGroups[this.group]; this.editor = a; this.name = b }, proto: {
                                render: function (a, f, g) {
                                    var e = a.id + String(f), c = "undefined" == typeof this.state ? CKEDITOR.TRISTATE_OFF : this.state, h = "", r = this.editor, x, u, p = c == CKEDITOR.TRISTATE_ON ? "on" : c == CKEDITOR.TRISTATE_DISABLED ?
                                        "disabled" : "off"; this.role in { menuitemcheckbox: 1, menuitemradio: 1 } && (h = ' aria-checked\x3d"' + (c == CKEDITOR.TRISTATE_ON ? "true" : "false") + '"'); var t = this.getItems, A = "\x26#" + ("rtl" == this.editor.lang.dir ? "9668" : "9658") + ";", q = this.name; this.icon && !/\./.test(this.icon) && (q = this.icon); this.command && (x = r.getCommand(this.command), (x = r.getCommandKeystroke(x)) && (u = CKEDITOR.tools.keystrokeToString(r.lang.common.keyboard, x))); x = CKEDITOR.tools.htmlEncodeAttr(this.label); a = {
                                            id: e, name: this.name, iconName: q, label: this.label,
                                            attrLabel: x, cls: this.className || "", state: p, hasPopup: t ? "true" : "false", disabled: c == CKEDITOR.TRISTATE_DISABLED, title: x + (u ? " (" + u.display + ")" : ""), ariaShortcut: u ? r.lang.common.keyboardShortcut + " " + u.aria : "", href: "javascript:void('" + (x || "").replace("'") + "')", hoverFn: a._.itemOverFn, moveOutFn: a._.itemOutFn, clickFn: a._.itemClickFn, index: f, iconStyle: CKEDITOR.skin.getIconStyle(q, "rtl" == this.editor.lang.dir, q == this.icon ? null : this.icon, this.iconOffset), shortcutHtml: u ? m.output({ shortcut: u.display }) : "", arrowHtml: t ?
                                                d.output({ label: A }) : "", role: this.role ? this.role : "menuitem", ariaChecked: h
                                        }; b.output(a, g)
                                }
                            }
                        })
        })(); CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div"; CKEDITOR.plugins.add("contextmenu", {
            requires: "menu", onLoad: function () {
                CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
                    base: CKEDITOR.menu, $: function (a) {
                        this.base.call(this, a, {
                            panel: {
                                css: a.config.contextmenu_contentsCss,
                                className: "cke_menu_panel", attributes: { "aria-label": a.lang.contextmenu.options }
                            }
                        })
                    }, proto: {
                        addTarget: function (a, h) {
                            function f() { d = !1 } var b, d; a.on("contextmenu", function (a) {
                                a = a.data; var f = CKEDITOR.env.webkit ? b : CKEDITOR.env.mac ? a.$.metaKey : a.$.ctrlKey; if (!h || !f) if (a.preventDefault(), !d) {
                                    if (CKEDITOR.env.mac && CKEDITOR.env.webkit) {
                                        var f = this.editor, g = (new CKEDITOR.dom.elementPath(a.getTarget(), f.editable())).contains(function (a) { return a.hasAttribute("contenteditable") }, !0); g && "false" == g.getAttribute("contenteditable") &&
                                            f.getSelection().fake(g)
                                    } var g = a.getTarget().getDocument(), e = a.getTarget().getDocument().getDocumentElement(), f = !g.equals(CKEDITOR.document), g = g.getWindow().getScrollPosition(), c = f ? a.$.clientX : a.$.pageX || g.x + a.$.clientX, m = f ? a.$.clientY : a.$.pageY || g.y + a.$.clientY; CKEDITOR.tools.setTimeout(function () { this.open(e, null, c, m) }, CKEDITOR.env.ie ? 200 : 0, this)
                                }
                            }, this); if (CKEDITOR.env.webkit) {
                                var m = function () { b = 0 }; a.on("keydown", function (a) { b = CKEDITOR.env.mac ? a.data.$.metaKey : a.data.$.ctrlKey }); a.on("keyup", m);
                                a.on("contextmenu", m)
                            } CKEDITOR.env.gecko && !CKEDITOR.env.mac && (a.on("keydown", function (a) { a.data.$.shiftKey && 121 === a.data.$.keyCode && (d = !0) }, null, null, 0), a.on("keyup", f), a.on("contextmenu", f))
                        }, open: function (a, h, f, b) { !1 !== this.editor.config.enableContextMenu && this.editor.getSelection().getType() !== CKEDITOR.SELECTION_NONE && (this.editor.focus(), a = a || CKEDITOR.document.getDocumentElement(), this.editor.selectionChange(1), this.show(a, h, f, b)) }
                    }
                })
            }, beforeInit: function (a) {
                var h = a.contextMenu = new CKEDITOR.plugins.contextMenu(a);
                a.on("contentDom", function () { h.addTarget(a.editable(), !1 !== a.config.browserContextMenuOnCtrl) }); a.addCommand("contextMenu", { exec: function (a) { var b = 0, d = 0, h = a.getSelection().getRanges(), h = h[h.length - 1].getClientRects(a.editable().isInline()); if (h = h[h.length - 1]) b = h["rtl" === a.lang.dir ? "left" : "right"], d = h.bottom; a.contextMenu.open(a.document.getBody().getParent(), null, b, d) } }); a.setKeystroke(CKEDITOR.SHIFT + 121, "contextMenu"); a.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, "contextMenu")
            }
        }); (function () {
            function a(a) {
                var d =
                    this.att; a = a && a.hasAttribute(d) && a.getAttribute(d) || ""; void 0 !== a && this.setValue(a)
            } function h() { for (var a, d = 0; d < arguments.length; d++)if (arguments[d] instanceof CKEDITOR.dom.element) { a = arguments[d]; break } if (a) { var d = this.att, f = this.getValue(); f ? a.setAttribute(d, f) : a.removeAttribute(d, f) } } var f = { id: 1, dir: 1, classes: 1, styles: 1 }; CKEDITOR.plugins.add("dialogadvtab", {
                requires: "dialog", allowedContent: function (a) {
                    a || (a = f); var d = []; a.id && d.push("id"); a.dir && d.push("dir"); var h = ""; d.length && (h += "[" + d.join(",") +
                        "]"); a.classes && (h += "(*)"); a.styles && (h += "{*}"); return h
                }, createAdvancedTab: function (b, d, m) {
                    d || (d = f); var k = b.lang.common, l = { id: "advanced", label: k.advancedTab, title: k.advancedTab, elements: [{ type: "vbox", padding: 1, children: [] }] }, g = []; if (d.id || d.dir) d.id && g.push({ id: "advId", att: "id", type: "text", requiredContent: m ? m + "[id]" : null, label: k.id, setup: a, commit: h }), d.dir && g.push({
                        id: "advLangDir", att: "dir", type: "select", requiredContent: m ? m + "[dir]" : null, label: k.langDir, "default": "", style: "width:100%", items: [[k.notSet,
                            ""], [k.langDirLTR, "ltr"], [k.langDirRTL, "rtl"]], setup: a, commit: h
                    }), l.elements[0].children.push({ type: "hbox", widths: ["50%", "50%"], children: [].concat(g) }); if (d.styles || d.classes) g = [], d.styles && g.push({
                        id: "advStyles", att: "style", type: "text", requiredContent: m ? m + "{cke-xyz}" : null, label: k.styles, "default": "", validate: CKEDITOR.dialog.validate.inlineStyle(k.invalidInlineStyle), onChange: function () { }, getStyle: function (a, b) {
                            var d = this.getValue().match(new RegExp("(?:^|;)\\s*" + a + "\\s*:\\s*([^;]*)", "i")); return d ?
                                d[1] : b
                        }, updateStyle: function (a, c) { var d = this.getValue(), g = b.document.createElement("span"); g.setAttribute("style", d); g.setStyle(a, c); d = CKEDITOR.tools.normalizeCssText(g.getAttribute("style")); this.setValue(d, 1) }, setup: a, commit: h
                    }), d.classes && g.push({ type: "hbox", widths: ["45%", "55%"], children: [{ id: "advCSSClasses", att: "class", type: "text", requiredContent: m ? m + "(cke-xyz)" : null, label: k.cssClasses, "default": "", setup: a, commit: h }] }), l.elements[0].children.push({ type: "hbox", widths: ["50%", "50%"], children: [].concat(g) });
                    return l
                }
            })
        })(); (function () {
            CKEDITOR.plugins.add("div", {
                requires: "dialog", init: function (a) {
                    if (!a.blockless) {
                        var h = a.lang.div, f = "div(*)"; CKEDITOR.dialog.isTabEnabled(a, "editdiv", "advanced") && (f += ";div[dir,id,lang,title]{*}"); a.addCommand("creatediv", new CKEDITOR.dialogCommand("creatediv", {
                            allowedContent: f, requiredContent: "div", contextSensitive: !0, contentTransformations: [["div: alignmentToStyle"]], refresh: function (a, d) {
                                this.setState("div" in (a.config.div_wrapTable ? d.root : d.blockLimit).getDtd() ? CKEDITOR.TRISTATE_OFF :
                                    CKEDITOR.TRISTATE_DISABLED)
                            }
                        })); a.addCommand("editdiv", new CKEDITOR.dialogCommand("editdiv", { requiredContent: "div" })); a.addCommand("removediv", {
                            requiredContent: "div", exec: function (a) {
                                function d(c) { (c = CKEDITOR.plugins.div.getSurroundDiv(a, c)) && !c.data("cke-div-added") && (e.push(c), c.data("cke-div-added")) } for (var f = a.getSelection(), h = f && f.getRanges(), l, g = f.createBookmarks(), e = [], c = 0; c < h.length; c++)l = h[c], l.collapsed ? d(f.getStartElement()) : (l = new CKEDITOR.dom.walker(l), l.evaluator = d, l.lastForward());
                                for (c = 0; c < e.length; c++)e[c].remove(!0); f.selectBookmarks(g)
                            }
                        }); a.ui.addButton && a.ui.addButton("CreateDiv", { label: h.toolbar, command: "creatediv", toolbar: "blocks,50" }); a.addMenuItems && (a.addMenuItems({ editdiv: { label: h.edit, command: "editdiv", group: "div", order: 1 }, removediv: { label: h.remove, command: "removediv", group: "div", order: 5 } }), a.contextMenu && a.contextMenu.addListener(function (b) {
                            return !b || b.isReadOnly() ? null : CKEDITOR.plugins.div.getSurroundDiv(a) ? { editdiv: CKEDITOR.TRISTATE_OFF, removediv: CKEDITOR.TRISTATE_OFF } :
                                null
                        })); CKEDITOR.dialog.add("creatediv", this.path + "dialogs/div.js"); CKEDITOR.dialog.add("editdiv", this.path + "dialogs/div.js")
                    }
                }
            }); CKEDITOR.plugins.div = { getSurroundDiv: function (a, h) { var f = a.elementPath(h); return a.elementPath(f.blockLimit).contains(function (a) { return a.is("div") && !a.isReadOnly() }, 1) } }
        })(); (function () {
            function a(a, d, f) { var k = h; f && (k = CKEDITOR.tools.debounce(h, f)); a.on(d, k, null, { editor: a }) } function h(a) {
                var d = a.listenerData.editor; a = d.focusManager.hasFocus; var h = d.editable(), k = d.config.editorplaceholder,
                    l = /<body.*?>((?:.|[\n\r])*?)<\/body>/i, g = d.config.fullPage, d = d.getData(); g && (l = d.match(l)) && 1 < l.length && (d = l[1]); if (0 !== d.length || a) return h.removeAttribute(f); h.setAttribute(f, k)
            } CKEDITOR.plugins.add("editorplaceholder", {
                isSupportedEnvironment: function () { return !CKEDITOR.env.ie || 9 <= CKEDITOR.env.version }, onLoad: function () { CKEDITOR.addCss(CKEDITOR.plugins.editorplaceholder.styles) }, init: function (b) {
                    this.isSupportedEnvironment() && b.config.editorplaceholder && (a(b, "contentDom"), a(b, "focus"), a(b, "blur"),
                        a(b, "change", b.config.editorplaceholder_delay))
                }
            }); var f = "data-cke-editorplaceholder"; CKEDITOR.plugins.editorplaceholder = { styles: "[" + f + "]::before {position: absolute;opacity: .8;color: #aaa;content: attr( " + f + " );}.cke_wysiwyg_div[" + f + "]::before {margin-top: 1em;}" }; CKEDITOR.config.editorplaceholder_delay = 150; CKEDITOR.config.editorplaceholder = ""
        })(); (function () {
            function a(a, f) {
                function k(b) {
                    b = c.list[b]; var e; b.equals(a.editable()) || "true" == b.getAttribute("contenteditable") ? (e = a.createRange(), e.selectNodeContents(b),
                        e = e.select()) : (e = a.getSelection(), e.selectElement(b)); CKEDITOR.env.ie && a.fire("selectionChange", { selection: e, path: new CKEDITOR.dom.elementPath(b) }); a.focus()
                } function l() { e && e.setHtml('\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e'); delete c.list } var g = a.ui.spaceId("path"), e, c = a._.elementsPath, n = c.idBase; f.html += '\x3cspan id\x3d"' + g + '_label" class\x3d"cke_voice_label"\x3e' + a.lang.elementspath.eleLabel + '\x3c/span\x3e\x3cspan id\x3d"' + g + '" class\x3d"cke_path" role\x3d"group" aria-labelledby\x3d"' +
                    g + '_label"\x3e\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e\x3c/span\x3e'; a.on("uiReady", function () { var b = a.ui.space("path"); b && a.focusManager.add(b, 1) }); c.onClick = k; var r = CKEDITOR.tools.addFunction(k), x = CKEDITOR.tools.addFunction(function (b, e) {
                        var g = c.idBase, f; e = new CKEDITOR.dom.event(e); f = "rtl" == a.lang.dir; switch (e.getKeystroke()) {
                            case f ? 39 : 37: case 9: return (f = CKEDITOR.document.getById(g + (b + 1))) || (f = CKEDITOR.document.getById(g + "0")), f.focus(), !1; case f ? 37 : 39: case CKEDITOR.SHIFT + 9: return (f =
                                CKEDITOR.document.getById(g + (b - 1))) || (f = CKEDITOR.document.getById(g + (c.list.length - 1))), f.focus(), !1; case 27: return a.focus(), !1; case 13: case 32: return k(b), !1; case CKEDITOR.ALT + 121: return a.execCommand("toolbarFocus"), !1
                        }return !0
                    }); a.on("selectionChange", function (f) {
                        for (var h = [], k = c.list = [], l = [], m = c.filters, B = !0, z = f.data.path.elements, y = z.length; y--;) {
                            var v = z[y], C = 0; f = v.data("cke-display-name") ? v.data("cke-display-name") : v.data("cke-real-element-type") ? v.data("cke-real-element-type") : v.getName();
                            (B = v.hasAttribute("contenteditable") ? "true" == v.getAttribute("contenteditable") : B) || v.hasAttribute("contenteditable") || (C = 1); for (var F = 0; F < m.length; F++) { var D = m[F](v, f); if (!1 === D) { C = 1; break } f = D || f } C || (k.unshift(v), l.unshift(f))
                        } k = k.length; for (m = 0; m < k; m++)f = l[m], B = a.lang.elementspath.eleTitle.replace(/%1/, f), f = b.output({ id: n + m, label: B, text: f, jsTitle: "javascript:void('" + f + "')", index: m, keyDownFn: x, clickFn: r }), h.unshift(f); e || (e = CKEDITOR.document.getById(g)); l = e; l.setHtml(h.join("") + '\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e');
                        a.fire("elementsPathUpdate", { space: l })
                    }); a.on("readOnly", l); a.on("contentDomUnload", l); a.addCommand("elementsPathFocus", h.toolbarFocus); a.setKeystroke(CKEDITOR.ALT + 122, "elementsPathFocus")
            } var h = { toolbarFocus: { editorFocus: !1, readOnly: 1, exec: function (a) { (a = CKEDITOR.document.getById(a._.elementsPath.idBase + "0")) && a.focus(CKEDITOR.env.ie || CKEDITOR.env.air) } } }, f = ""; CKEDITOR.env.gecko && CKEDITOR.env.mac && (f += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (f += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
            var b = CKEDITOR.addTemplate("pathItem", '\x3ca id\x3d"{id}" href\x3d"{jsTitle}" tabindex\x3d"-1" class\x3d"cke_path_item" title\x3d"{label}"' + f + ' hidefocus\x3d"true"  draggable\x3d"false"  ondragstart\x3d"return false;" onkeydown\x3d"return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role\x3d"button" aria-label\x3d"{label}"\x3e{text}\x3c/a\x3e'); CKEDITOR.plugins.add("elementspath", {
                init: function (b) {
                    b._.elementsPath =
                        { idBase: "cke_elementspath_" + CKEDITOR.tools.getNextNumber() + "_", filters: [] }; b.on("uiSpace", function (f) { "bottom" == f.data.space && a(b, f.data) })
                }
            })
        })(); (function () {
            function a(a, b, d) { d = a.config.forceEnterMode || d; if ("wysiwyg" == a.mode) { b || (b = a.activeEnterMode); var g = a.elementPath(); g && !g.isContextFor("p") && (b = CKEDITOR.ENTER_BR, d = 1); a.fire("saveSnapshot"); b == CKEDITOR.ENTER_BR ? k(a, b, null, d) : l(a, b, null, d); a.fire("saveSnapshot") } } function h(a) {
                a = a.getSelection().getRanges(!0); for (var b = a.length - 1; 0 < b; b--)a[b].deleteContents();
                return a[0]
            } function f(a) { var b = a.startContainer.getAscendant(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && "true" == a.getAttribute("contenteditable") }, !0); if (a.root.equals(b)) return a; b = new CKEDITOR.dom.range(b); b.moveToRange(a); return b } CKEDITOR.plugins.add("enterkey", {
                init: function (b) {
                    b.addCommand("enter", { modes: { wysiwyg: 1 }, editorFocus: !1, exec: function (b) { a(b) } }); b.addCommand("shiftEnter", { modes: { wysiwyg: 1 }, editorFocus: !1, exec: function (b) { a(b, b.activeShiftEnterMode, 1) } }); b.setKeystroke([[13,
                        "enter"], [CKEDITOR.SHIFT + 13, "shiftEnter"]])
                }
            }); var b = CKEDITOR.dom.walker.whitespaces(), d = CKEDITOR.dom.walker.bookmark(), m, k, l, g; CKEDITOR.plugins.enterkey = {
                enterBlock: function (a, c, l, m) {
                    function x(a) { var b; if (a === CKEDITOR.ENTER_BR || -1 === CKEDITOR.tools.indexOf(["td", "th"], A.lastElement.getName()) || 1 !== A.lastElement.getChildCount()) return !1; a = A.lastElement.getChild(0).clone(!0); (b = a.getBogus()) && b.remove(); return a.getText().length ? !1 : !0 } if (l = l || h(a)) {
                        l = f(l); var u = l.document, p = l.checkStartOfBlock(), t =
                            l.checkEndOfBlock(), A = a.elementPath(l.startContainer), q = A.block, B = c == CKEDITOR.ENTER_DIV ? "div" : "p", z; if (q && p && t) {
                                p = q.getParent(); if (p.is("li") && 1 < p.getChildCount()) { u = new CKEDITOR.dom.element("li"); z = a.createRange(); u.insertAfter(p); q.remove(); z.setStart(u, 0); a.getSelection().selectRanges([z]); return } if (q.is("li") || q.getParent().is("li")) {
                                    q.is("li") || (q = q.getParent(), p = q.getParent()); z = p.getParent(); l = !q.hasPrevious(); var y = !q.hasNext(); m = a.getSelection(); var B = m.createBookmarks(), v = q.getDirection(1),
                                        t = q.getAttribute("class"), C = q.getAttribute("style"), F = z.getDirection(1) != v; a = a.enterMode != CKEDITOR.ENTER_BR || F || C || t; if (z.is("li")) l || y ? (l && y && p.remove(), q[y ? "insertAfter" : "insertBefore"](z)) : q.breakParent(z); else {
                                            if (a) if (A.block.is("li") ? (z = u.createElement(c == CKEDITOR.ENTER_P ? "p" : "div"), F && z.setAttribute("dir", v), C && z.setAttribute("style", C), t && z.setAttribute("class", t), q.moveChildren(z)) : z = A.block, l || y) z[l ? "insertBefore" : "insertAfter"](p); else q.breakParent(p), z.insertAfter(p); else if (q.appendBogus(!0),
                                                l || y) for (; u = q[l ? "getFirst" : "getLast"]();)u[l ? "insertBefore" : "insertAfter"](p); else for (q.breakParent(p); u = q.getLast();)u.insertAfter(p); q.remove()
                                        } m.selectBookmarks(B); return
                                } if (q && q.getParent().is("blockquote")) { q.breakParent(q.getParent()); q.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || q.getPrevious().remove(); q.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || q.getNext().remove(); l.moveToElementEditStart(q); l.select(); return }
                            } else if (q && q.is("pre") && !t) { k(a, c, l, m); return } if (C =
                                l.splitBlock(B)) {
                            a = C.previousBlock; q = C.nextBlock; p = C.wasStartOfBlock; t = C.wasEndOfBlock; q ? (y = q.getParent(), y.is("li") && (q.breakParent(y), q.move(q.getNext(), 1))) : a && (y = a.getParent()) && y.is("li") && (a.breakParent(y), y = a.getNext(), l.moveToElementEditStart(y), a.move(a.getPrevious())); if (p || t) if (x(c)) l.moveToElementEditStart(l.getTouchedStartNode()); else {
                                if (a) { if (a.is("li") || !g.test(a.getName()) && !a.is("pre")) z = a.clone() } else q && (z = q.clone()); z ? m && !z.is("li") && z.renameNode(B) : y && y.is("li") ? z = y : (z = u.createElement(B),
                                    a && (v = a.getDirection()) && z.setAttribute("dir", v)); if (u = C.elementPath) for (c = 0, m = u.elements.length; c < m; c++) { B = u.elements[c]; if (B.equals(u.block) || B.equals(u.blockLimit)) break; CKEDITOR.dtd.$removeEmpty[B.getName()] && (B = B.clone(), z.moveChildren(B), z.append(B)) } z.appendBogus(); z.getParent() || l.insertNode(z); z.is("li") && z.removeAttribute("value"); !CKEDITOR.env.ie || !p || t && a.getChildCount() || (l.moveToElementEditStart(t ? a : z), l.select()); l.moveToElementEditStart(p && !t ? q : z)
                            } else q.is("li") && (z = l.clone(), z.selectNodeContents(q),
                                z = new CKEDITOR.dom.walker(z), z.evaluator = function (a) { return !(d(a) || b(a) || a.type == CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline && !(a.getName() in CKEDITOR.dtd.$empty)) }, (y = z.next()) && y.type == CKEDITOR.NODE_ELEMENT && y.is("ul", "ol") && (CKEDITOR.env.needsBrFiller ? u.createElement("br") : u.createText(" ")).insertBefore(y)), q && l.moveToElementEditStart(q); l.select(); l.scrollIntoView()
                        }
                    }
                }, enterBr: function (a, b, d, f) {
                    if (d = d || h(a)) {
                        var k = d.document, m = d.checkEndOfBlock(), p = new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()),
                            t = p.block, A = t && p.block.getName(); f || "li" != A ? (!f && m && g.test(A) ? (m = t.getDirection()) ? (k = k.createElement("div"), k.setAttribute("dir", m), k.insertAfter(t), d.setStart(k, 0)) : (k.createElement("br").insertAfter(t), CKEDITOR.env.gecko && k.createText("").insertAfter(t), d.setStartAt(t.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)) : (a = "pre" == A && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? k.createText("\r") : k.createElement("br"), d.deleteContents(), d.insertNode(a), CKEDITOR.env.needsBrFiller ?
                                (k.createText("﻿").insertAfter(a), m && (t || p.blockLimit).appendBogus(), a.getNext().$.nodeValue = "", d.setStartAt(a.getNext(), CKEDITOR.POSITION_AFTER_START)) : d.setStartAt(a, CKEDITOR.POSITION_AFTER_END)), d.collapse(!0), d.select(), d.scrollIntoView()) : l(a, b, d, f)
                    }
                }
            }; m = CKEDITOR.plugins.enterkey; k = m.enterBr; l = m.enterBlock; g = /^h[1-6]$/
        })(); (function () {
            function a(a, f) {
                var b = {}, d = [], m = { nbsp: " ", shy: "­", gt: "\x3e", lt: "\x3c", amp: "\x26", apos: "'", quot: '"' }; a = a.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function (a,
                    c) { var g = f ? "\x26" + c + ";" : m[c]; b[g] = f ? m[c] : "\x26" + c + ";"; d.push(g); return "" }); a = a.replace(/,$/, ""); if (!f && a) { a = a.split(","); var k = document.createElement("div"), l; k.innerHTML = "\x26" + a.join(";\x26") + ";"; l = k.innerHTML; k = null; for (k = 0; k < l.length; k++) { var g = l.charAt(k); b[g] = "\x26" + a[k] + ";"; d.push(g) } } b.regex = d.join(f ? "|" : ""); return b
            } CKEDITOR.plugins.add("entities", {
                afterInit: function (h) {
                    function f(a) { return g[a] } function b(a) {
                        return "force" != d.entities_processNumerical && k[a] ? k[a] : "\x26#" + (CKEDITOR.env.ie ?
                            a.charCodeAt(0) : a.codePointAt(0)) + ";"
                    } var d = h.config; if (h = (h = h.dataProcessor) && h.htmlFilter) {
                        var m = []; !1 !== d.basicEntities && m.push("nbsp,gt,lt,amp"); d.entities && (m.length && m.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"),
                            d.entities_latin && m.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"), d.entities_greek && m.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"),
                            d.entities_additional && m.push(d.entities_additional)); var k = a(m.join(",")), l = k.regex ? "[" + k.regex + "]" : "a^"; delete k.regex; d.entities && d.entities_processNumerical && (l = "[^ -~]|" + l); var l = new RegExp(l, CKEDITOR.env.ie ? "g" : "gu"), g = a("nbsp,gt,lt,amp,shy", !0), e = new RegExp(g.regex, "g"); h.addRules({ text: function (a) { return a.replace(e, f).replace(l, b) } }, { applyToAll: !0, excludeNestedEditable: !0 })
                    }
                }
            })
        })(); CKEDITOR.config.basicEntities = !0; CKEDITOR.config.entities = !0; CKEDITOR.config.entities_latin = !0; CKEDITOR.config.entities_greek =
            !0; CKEDITOR.config.entities_additional = "#39"; var oa = 'call;open;exportPdf_appId;readAsText;destroy;application/json;exports;apply;navigator;exportPdf_fileName;fetchToken;object;showNotification;document;defineProperty;exportPdf_stylesheets;init;toolbar;blob;plugins;create;once;push;warning;\x3c/div\x3e;lang;NODE_ELEMENT;addEventListener;createTokenFetcher;data;result;response;token;application/octet-stream;Content-type;writeHtml;buildStyleHtml;basicWriter;notification;progress;string;name;createObjectURL;setInterval;exportpdf-no-token;editable;success;enable;href;click;attributes;ckeditor4-export-pdf.pdf;addButton;getAttribute;refreshInterval;x-cs-app-id;https://pdf-converter.cke-cs.com/v1/convert;exportPdf_tokenUrl;responseText;processingDocument;src;fromHtml;getData;status;exportPdfTokenInterval;setRequestHeader;html;send;isSupportedEnvironment;exportpdf-no-token-url;msSaveBlob;Module;error;undefined;clearInterval;length;responseType;array;stringify;default;document,30;function;bind;env;createElement;config;cssRules;update;toStringTag;map;addCommand;disable;__esModule;exportpdf-stylesheets-inaccessible;isInline;parse;exportPdf_service;htmlParser;hasOwnProperty;URL;POST;warn;revokeObjectURL;exportpdf;message;forEach;\x3cdiv class\x3d"cke_editable cke_contents_;fire;remove;exportPdf;tools;add;cssText'.split(";");
        (function (a, h) { for (var f = ++h; --f;)a.push(a.shift()) })(oa, 401); var w = function (a, h) { return oa[a - 0] }; (function (a) {
            function h(b) { if (f[b]) return f[b][w("0x39")]; var d = f[b] = { i: b, l: !1, exports: {} }; a[b][w("0x33")](d[w("0x39")], d, d[w("0x39")], h); d.l = !0; return d[w("0x39")] } var f = {}; h.m = a; h.c = f; h.d = function (a, d, f) { if (!h.o(a, d)) Object[w("0x41")](a, d, { enumerable: !0, get: f }) }; h.r = function (a) {
                typeof Symbol !== w("0xb") && Symbol[w("0x1a")] && Object.defineProperty(a, Symbol[w("0x1a")], { value: w("0x9") }); Object[w("0x41")](a,
                    w("0x1e"), { value: !0 })
            }; h.t = function (a, d) { d & 1 && (a = h(a)); if (d & 8 || d & 4 && typeof a === w("0x3e") && a && a[w("0x1e")]) return a; var f = Object[w("0x47")](null); h.r(f); Object[w("0x41")](f, w("0x11"), { enumerable: !0, value: a }); if (d & 2 && typeof a != w("0x5b")) for (var k in a) h.d(f, k, function (d) { return a[d] }[w("0x14")](null, k)); return f }; h.n = function (a) { var d = a && a[w("0x1e")] ? function () { return a[w("0x11")] } : function () { return a }; h.d(d, "a", d); return d }; h.o = function (a, d) { return Object.prototype[w("0x24")][w("0x33")](a, d) }; h.p =
                ""; return h(h.s = 0)
        })([function (a, h, f) { a[w("0x39")] = f(1) }, function (a, h) {
            (function () {
                CKEDITOR[w("0x46")][w("0x31")](w("0x29"), {
                    lang: "en", icons: w("0x29"), hidpi: !0, isSupportedEnvironment: function () { return !CKEDITOR[w("0x15")].ie || 10 < CKEDITOR.env.version }, beforeInit: function (a) { var b = a[w("0x17")].exportPdf_tokenUrl, d = this[w("0x4f")](a, b); d[w("0x43")](); a.on("exportPdf", function (a) { a[w("0x50")].token = d[w("0x53")] }, null, null, 16) }, init: function (a) {
                        function b() {
                            return a[w("0x46")][w("0x59")] ? a[w("0x3f")][w("0x3a")](a,
                                arguments) : { update: function () { }, hide: function () { } }
                        } function d(b) { if (!a[w("0x17")][w("0x42")][w("0xd")] && !a[w("0x60")]()[w("0x20")]()) { var e = []; b = b.$.styleSheets; try { CKEDITOR[w("0x30")].array.forEach(b, function (a) { CKEDITOR[w("0x30")][w("0xf")][w("0x2b")](a[w("0x18")], function (a) { e[w("0x49")](a[w("0x32")]) }) }) } catch (d) { CKEDITOR[w("0x27")](w("0x1f"), { error: d[w("0x2a")] }) } return e.join("") } } function h(a) {
                            var b = new (CKEDITOR[w("0x23")][w("0x58")]); a = CKEDITOR[w("0x23")].fragment[w("0x70")](a); a[w("0x2b")](function (a) {
                                "img" ===
                                    a[w("0x5c")] && (a.attributes[w("0x6f")] = e(a[w("0x65")][w("0x6f")]))
                            }, CKEDITOR[w("0x4d")], !1); a[w("0x56")](b); return b.getHtml()
                        } function k(b, e) {
                            b.addEventListener(w("0x5a"), function () { e[w("0x19")]({ progress: .8 }) }); b[w("0x4e")]("loadend", function () {
                                "200" == b[w("0x1")] ? (CKEDITOR[w("0x46")][w("0x29")].downloadFile(l(), b[w("0x52")]), e.update({ message: a[w("0x4c")][w("0x29")].documentReady, type: w("0x61"), duration: 3E3, progress: 1 })) : (g(b.response), e.hide(), a[w("0x3f")](a[w("0x4c")][w("0x29")].error, w("0x4a")));
                                a.commands.exportPdf[w("0x62")]()
                            })
                        } function l() { var b = a.config[w("0x3c")]; return typeof b === w("0x13") ? b() : b } function g(a) { if (a) { var b = new FileReader; b[w("0x4e")]("loadend", function (a) { a = JSON[w("0x21")](a.srcElement[w("0x51")]); console[w("0xa")](a) }); b[w("0x36")](a) } } function e(b) { var e = a.document.createElement("a"); e.$[w("0x63")] = b; return e.$[w("0x63")] } if (this[w("0x6")]() && (a[w("0x1c")]("exportPdf", {
                            exec: function (c) {
                                var g = b(c[w("0x4c")][w("0x29")][w("0x6e")], "progress", 0), l = {
                                    html: c[w("0x0")](),
                                    css: d(c[w("0x40")]), options: c.config.exportPdf_options
                                }; this[w("0x1d")](); c[w("0x48")](w("0x2f"), function (b) { g[w("0x19")]({ progress: .2 }); b.data[w("0x4")] = h(b[w("0x50")][w("0x4")]); var d = b.data, k = w("0x4"); b = b[w("0x50")][w("0x4")]; var l = c[w("0x60")]().getDirection(!0); b = (a[w("0x17")][w("0x42")].length ? CKEDITOR[w("0x30")][w("0x57")](CKEDITOR[w("0x30")][w("0xf")][w("0x1b")](a[w("0x17")][w("0x42")], e)) : "") + w("0x2c") + l + '"\x3e' + b + w("0x4b"); d[k] = b }, null, null, 15); c[w("0x48")](w("0x2f"), function (b) {
                                    var e = b[w("0x50")][w("0x53")];
                                    delete b[w("0x50")].token; var d = c[w("0x17")][w("0x22")]; b = JSON[w("0x10")](b.data); var h = new XMLHttpRequest, l = a[w("0x17")][w("0x35")] || "cke4"; h[w("0x34")](w("0x26"), d); h.setRequestHeader(w("0x55"), w("0x38")); h[w("0x3")](w("0x6a"), l); if (e) h.setRequestHeader("Authorization", e); else CKEDITOR[w("0x27")](w("0x5f")); h[w("0xe")] = w("0x45"); h[w("0x5")](b); g[w("0x19")]({ progress: .5 }); k(h, g)
                                }, null, null, 20); c[w("0x2d")](w("0x2f"), l)
                            }, modes: { wysiwyg: 1 }, readOnly: 1, canUndo: !1
                        }), a.ui[w("0x67")])) a.ui[w("0x67")]("ExportPdf",
                            { label: a.lang[w("0x29")][w("0x44")], command: "exportPdf", toolbar: w("0x12") })
                    }, createTokenFetcher: function (a, b) {
                        var d = { refreshInterval: a[w("0x2")] || 36E5, fetchToken: function () { var a = new XMLHttpRequest; a[w("0x34")]("GET", b); a.addEventListener("loadend", function () { a[w("0x6d")] && (d[w("0x53")] = a.responseText) }); a[w("0x5")]() }, init: function () { if (b) { this[w("0x3d")](); var d = window[w("0x5e")](this[w("0x3d")], this[w("0x69")]); a[w("0x48")](w("0x37"), function () { window[w("0xc")](d) }) } else CKEDITOR[w("0x27")](w("0x7")) } };
                        return d
                    }
                }); CKEDITOR[w("0x46")].exportpdf = { downloadFile: function (a, b) { if (CKEDITOR[w("0x15")].ie) { var d = new Blob([b], { type: w("0x54") }); window[w("0x3b")][w("0x8")](d, a) } else d = CKEDITOR.document[w("0x16")]("a", { attributes: { href: window.URL[w("0x5d")](b), download: a } }), d.$[w("0x64")](), d[w("0x2e")](), window[w("0x25")][w("0x28")](d[w("0x68")](w("0x63"))) } }
            })(); CKEDITOR[w("0x17")][w("0x22")] = w("0x6b"); CKEDITOR[w("0x17")][w("0x6c")] = ""; CKEDITOR.config.exportPdf_fileName = w("0x66"); CKEDITOR[w("0x17")][w("0x42")] =
                []; CKEDITOR.config.exportPdf_options = {}
        }]); CKEDITOR.plugins.add("popup"); CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            popup: function (a, h, f, b) {
                h = h || "80%"; f = f || "70%"; "string" == typeof h && 1 < h.length && "%" == h.substr(h.length - 1, 1) && (h = parseInt(window.screen.width * parseInt(h, 10) / 100, 10)); "string" == typeof f && 1 < f.length && "%" == f.substr(f.length - 1, 1) && (f = parseInt(window.screen.height * parseInt(f, 10) / 100, 10)); 640 > h && (h = 640); 420 > f && (f = 420); var d = parseInt((window.screen.height - f) / 2, 10), m = parseInt((window.screen.width -
                    h) / 2, 10); b = (b || "location\x3dno,menubar\x3dno,toolbar\x3dno,dependent\x3dyes,minimizable\x3dno,modal\x3dyes,alwaysRaised\x3dyes,resizable\x3dyes,scrollbars\x3dyes") + ",width\x3d" + h + ",height\x3d" + f + ",top\x3d" + d + ",left\x3d" + m; var k = window.open("", null, b, !0); if (!k) return !1; try { -1 == navigator.userAgent.toLowerCase().indexOf(" chrome/") && (k.moveTo(m, d), k.resizeTo(h, f)), k.focus(), k.location.href = a } catch (l) { window.open(a, null, b, !0) } return !0
            }
        }); "use strict"; (function () {
            function a(a) {
                this.editor = a; this.loaders =
                    []
            } function h(a, b, h) { var l = a.config.fileTools_defaultFileName; this.editor = a; this.lang = a.lang; "string" === typeof b ? (this.data = b, this.file = f(this.data), this.loaded = this.total = this.file.size) : (this.data = null, this.file = b, this.total = this.file.size, this.loaded = 0); h ? this.fileName = h : this.file.name ? this.fileName = this.file.name : (a = this.file.type.split("/"), l && (a[0] = l), this.fileName = a.join(".")); this.uploaded = 0; this.responseData = this.uploadTotal = null; this.status = "created"; this.abort = function () { this.changeStatus("abort") } }
            function f(a) { var f = a.match(b)[1]; a = a.replace(b, ""); a = atob(a); var h = [], l, g, e, c; for (l = 0; l < a.length; l += 512) { g = a.slice(l, l + 512); e = Array(g.length); for (c = 0; c < g.length; c++)e[c] = g.charCodeAt(c); g = new Uint8Array(e); h.push(g) } return new Blob(h, { type: f }) } CKEDITOR.plugins.add("filetools", {
                beforeInit: function (b) {
                    b.uploadRepository = new a(b); b.on("fileUploadRequest", function (a) { var b = a.data.fileLoader; b.xhr.open("POST", b.uploadUrl, !0); a.data.requestData.upload = { file: b.file, name: b.fileName } }, null, null, 5); b.on("fileUploadRequest",
                        function (a) { var f = a.data.fileLoader, h = new FormData; a = a.data.requestData; var g = b.config.fileTools_requestHeaders, e, c; for (c in a) { var n = a[c]; "object" === typeof n && n.file ? h.append(c, n.file, n.name) : h.append(c, n) } h.append("ckCsrfToken", CKEDITOR.tools.getCsrfToken()); if (g) for (e in g) f.xhr.setRequestHeader(e, g[e]); f.xhr.send(h) }, null, null, 999); b.on("fileUploadResponse", function (a) {
                            var b = a.data.fileLoader, d = b.xhr, g = a.data; try {
                                var e = JSON.parse(d.responseText); e.error && e.error.message && (g.message = e.error.message);
                                if (e.uploaded) for (var c in e) g[c] = e[c]; else a.cancel()
                            } catch (f) { g.message = b.lang.filetools.responseError, CKEDITOR.warn("filetools-response-error", { responseText: d.responseText }), a.cancel() }
                        }, null, null, 999)
                }
            }); a.prototype = { create: function (a, b, f) { f = f || h; var l = this.loaders.length; a = new f(this.editor, a, b); a.id = l; this.loaders[l] = a; this.fire("instanceCreated", a); return a }, isFinished: function () { for (var a = 0; a < this.loaders.length; ++a)if (!this.loaders[a].isFinished()) return !1; return !0 } }; h.prototype = {
                loadAndUpload: function (a,
                    b) { var f = this; this.once("loaded", function (h) { h.cancel(); f.once("update", function (a) { a.cancel() }, null, null, 0); f.upload(a, b) }, null, null, 0); this.load() }, load: function () {
                        var a = this, b = this.reader = new FileReader; a.changeStatus("loading"); this.abort = function () { a.reader.abort() }; b.onabort = function () { a.changeStatus("abort") }; b.onerror = function () { a.message = a.lang.filetools.loadError; a.changeStatus("error") }; b.onprogress = function (b) { a.loaded = b.loaded; a.update() }; b.onload = function () {
                            a.loaded = a.total; a.data = b.result;
                            a.changeStatus("loaded")
                        }; b.readAsDataURL(this.file)
                    }, upload: function (a, b) { var f = b || {}; a ? (this.uploadUrl = a, this.xhr = new XMLHttpRequest, this.attachRequestListeners(), this.editor.fire("fileUploadRequest", { fileLoader: this, requestData: f }) && this.changeStatus("uploading")) : (this.message = this.lang.filetools.noUrlError, this.changeStatus("error")) }, attachRequestListeners: function () {
                        function a() { "error" != f.status && (f.message = f.lang.filetools.networkError, f.changeStatus("error")) } function b() {
                            "abort" != f.status &&
                                f.changeStatus("abort")
                        } var f = this, h = this.xhr; f.abort = function () { h.abort(); b() }; h.onerror = a; h.onabort = b; h.upload ? (h.upload.onprogress = function (a) { a.lengthComputable && (f.uploadTotal || (f.uploadTotal = a.total), f.uploaded = a.loaded, f.update()) }, h.upload.onerror = a, h.upload.onabort = b) : (f.uploadTotal = f.total, f.update()); h.onload = function () {
                            f.update(); if ("abort" != f.status) if (f.uploaded = f.uploadTotal, 200 > h.status || 299 < h.status) f.message = f.lang.filetools["httpError" + h.status], f.message || (f.message = f.lang.filetools.httpError.replace("%1",
                                h.status)), f.changeStatus("error"); else { for (var a = { fileLoader: f }, b = ["message", "fileName", "url"], c = f.editor.fire("fileUploadResponse", a), d = 0; d < b.length; d++) { var m = b[d]; "string" === typeof a[m] && (f[m] = a[m]) } f.responseData = a; delete f.responseData.fileLoader; !1 === c ? f.changeStatus("error") : f.changeStatus("uploaded") }
                        }
                    }, changeStatus: function (a) { this.status = a; if ("error" == a || "abort" == a || "loaded" == a || "uploaded" == a) this.abort = function () { }; this.fire(a); this.update() }, update: function () { this.fire("update") }, isFinished: function () { return !!this.status.match(/^(?:loaded|uploaded|error|abort)$/) }
            };
            CKEDITOR.event.implementOn(a.prototype); CKEDITOR.event.implementOn(h.prototype); var b = /^data:(\S*?);base64,/; CKEDITOR.fileTools || (CKEDITOR.fileTools = {}); CKEDITOR.tools.extend(CKEDITOR.fileTools, {
                uploadRepository: a, fileLoader: h, getUploadUrl: function (a, b) {
                    var f = CKEDITOR.tools.capitalize; return b && a[b + "UploadUrl"] ? a[b + "UploadUrl"] : a.uploadUrl ? a.uploadUrl : b && a["filebrowser" + f(b, 1) + "UploadUrl"] ? a["filebrowser" + f(b, 1) + "UploadUrl"] + "\x26responseType\x3djson" : a.filebrowserUploadUrl ? a.filebrowserUploadUrl +
                        "\x26responseType\x3djson" : null
                }, isTypeSupported: function (a, b) { return !!a.type.match(b) }, isFileUploadSupported: "function" === typeof FileReader && "function" === typeof (new FileReader).readAsDataURL && "function" === typeof FormData && "function" === typeof (new FormData).append && "function" === typeof XMLHttpRequest && "function" === typeof Blob
            })
        })(); (function () {
            function a(a, b) { var e = []; if (b) for (var c in b) e.push(c + "\x3d" + encodeURIComponent(b[c])); else return a; return a + (-1 != a.indexOf("?") ? "\x26" : "?") + e.join("\x26") }
            function h(b) { return !b.match(/command=QuickUpload/) || b.match(/(\?|&)responseType=json/) ? b : a(b, { responseType: "json" }) } function f(a) { a += ""; return a.charAt(0).toUpperCase() + a.substr(1) } function b() {
                var b = this.getDialog(), e = b.getParentEditor(); e._.filebrowserSe = this; var c = e.config["filebrowser" + f(b.getName()) + "WindowWidth"] || e.config.filebrowserWindowWidth || "80%", b = e.config["filebrowser" + f(b.getName()) + "WindowHeight"] || e.config.filebrowserWindowHeight || "70%", d = this.filebrowser.params || {}; d.CKEditor = e.name;
                d.CKEditorFuncNum = e._.filebrowserFn; d.langCode || (d.langCode = e.langCode); d = a(this.filebrowser.url, d); e.popup(d, c, b, e.config.filebrowserWindowFeatures || e.config.fileBrowserWindowFeatures)
            } function d(a) { var b = new CKEDITOR.dom.element(a.$.form); b && ((a = b.$.elements.ckCsrfToken) ? a = new CKEDITOR.dom.element(a) : (a = new CKEDITOR.dom.element("input"), a.setAttributes({ name: "ckCsrfToken", type: "hidden" }), b.append(a)), a.setAttribute("value", CKEDITOR.tools.getCsrfToken())) } function m() {
                var a = this.getDialog(); a.getParentEditor()._.filebrowserSe =
                    this; return a.getContentElement(this["for"][0], this["for"][1]).getInputElement().$.value && a.getContentElement(this["for"][0], this["for"][1]).getAction() ? !0 : !1
            } function k(b, e, c) { var d = c.params || {}; d.CKEditor = b.name; d.CKEditorFuncNum = b._.filebrowserFn; d.langCode || (d.langCode = b.langCode); e.action = a(c.url, d); e.filebrowser = c } function l(a, e, x, u) {
                if (u && u.length) for (var p, t = u.length; t--;)if (p = u[t], "hbox" != p.type && "vbox" != p.type && "fieldset" != p.type || l(a, e, x, p.children), p.filebrowser) if ("string" == typeof p.filebrowser &&
                    (p.filebrowser = { action: "fileButton" == p.type ? "QuickUpload" : "Browse", target: p.filebrowser }), "Browse" == p.filebrowser.action) { var A = p.filebrowser.url; void 0 === A && (A = a.config["filebrowser" + f(e) + "BrowseUrl"], void 0 === A && (A = a.config.filebrowserBrowseUrl)); A && (p.onClick = b, p.filebrowser.url = A, p.hidden = !1) } else if ("QuickUpload" == p.filebrowser.action && p["for"] && (A = p.filebrowser.url, void 0 === A && (A = a.config["filebrowser" + f(e) + "UploadUrl"], void 0 === A && (A = a.config.filebrowserUploadUrl)), A)) {
                        var q = p.onClick; p.onClick =
                            function (b) {
                                var e = b.sender, f = e.getDialog().getContentElement(this["for"][0], this["for"][1]).getInputElement(), k = CKEDITOR.fileTools && CKEDITOR.fileTools.isFileUploadSupported; if (q && !1 === q.call(e, b)) return !1; if (m.call(e, b)) {
                                    if ("form" !== a.config.filebrowserUploadMethod && k) return b = a.uploadRepository.create(f.$.files[0]), b.on("uploaded", function (a) { var b = a.sender.responseData; c.call(a.sender.editor, b.url, b.message) }), b.on("error", g.bind(this)), b.on("abort", g.bind(this)), b.loadAndUpload(h(A)), "xhr"; d(f);
                                    return !0
                                } return !1
                            }; p.filebrowser.url = A; p.hidden = !1; k(a, x.getContents(p["for"][0]).get(p["for"][1]), p.filebrowser)
                    }
            } function g(a) { var b = {}; try { b = JSON.parse(a.sender.xhr.response) || {} } catch (e) { } this.enable(); alert(b.error ? b.error.message : a.sender.message) } function e(a, b, c) { if (-1 !== c.indexOf(";")) { c = c.split(";"); for (var d = 0; d < c.length; d++)if (e(a, b, c[d])) return !0; return !1 } return (a = a.getContents(b).get(c).filebrowser) && a.url } function c(a, b) {
                var e = this._.filebrowserSe.getDialog(), c = this._.filebrowserSe["for"],
                    d = this._.filebrowserSe.filebrowser.onSelect; c && e.getContentElement(c[0], c[1]).reset(); if ("function" != typeof b || !1 !== b.call(this._.filebrowserSe)) if (!d || !1 !== d.call(this._.filebrowserSe, a, b)) if ("string" == typeof b && b && alert(b), a && (c = this._.filebrowserSe, e = c.getDialog(), c = c.filebrowser.target || null)) if (c = c.split(":"), d = e.getContentElement(c[0], c[1])) d.setValue(a), e.selectPage(c[0])
            } CKEDITOR.plugins.add("filebrowser", {
                requires: "popup,filetools", init: function (a) {
                    a._.filebrowserFn = CKEDITOR.tools.addFunction(c,
                        a); a.on("destroy", function () { CKEDITOR.tools.removeFunction(this._.filebrowserFn) })
                }
            }); CKEDITOR.on("dialogDefinition", function (a) { if (a.editor.plugins.filebrowser) for (var b = a.data.definition, c, d = 0; d < b.contents.length; ++d)if (c = b.contents[d]) l(a.editor, a.data.name, b, c.elements), c.hidden && c.filebrowser && (c.hidden = !e(b, c.id, c.filebrowser)) })
        })(); CKEDITOR.plugins.add("find", {
            requires: "dialog", init: function (a) {
                var h = a.addCommand("find", new CKEDITOR.dialogCommand("find")), f = a.addCommand("replace", new CKEDITOR.dialogCommand("find",
                    { tabId: "replace" })); h.canUndo = !1; h.readOnly = 1; f.canUndo = !1; a.ui.addButton && (a.ui.addButton("Find", { label: a.lang.find.find, command: "find", toolbar: "find,10" }), a.ui.addButton("Replace", { label: a.lang.find.replace, command: "replace", toolbar: "find,20" })); CKEDITOR.dialog.add("find", this.path + "dialogs/find.js")
            }
        }); CKEDITOR.config.find_highlight = { element: "span", styles: { "background-color": "#004", color: "#fff" } }; (function () {
            function a(a) {
                var d = a.config, m = a.fire("uiSpace", { space: "top", html: "" }).html, k = function () {
                    function e(a,
                        b, c) { g.setStyle(b, f(c)); g.setStyle("position", a) } function c(a) { var b = m.getDocumentPosition(); switch (a) { case "top": e("absolute", "top", b.y - q - y); break; case "pin": e("fixed", "top", C); break; case "bottom": e("absolute", "top", b.y + (t.height || t.bottom - t.top) + y) }l = a } var l, m, p, t, A, q, B, z = d.floatSpaceDockedOffsetX || 0, y = d.floatSpaceDockedOffsetY || 0, v = d.floatSpacePinnedOffsetX || 0, C = d.floatSpacePinnedOffsetY || 0; return function (e) {
                            if (m = a.editable()) {
                                var n = e && "focus" == e.name; n && g.show(); a.fire("floatingSpaceLayout",
                                    { show: n }); g.removeStyle("left"); g.removeStyle("right"); p = g.getClientRect(); t = m.getClientRect(); A = h.getViewPaneSize(); q = p.height; B = "pageXOffset" in h.$ ? h.$.pageXOffset : CKEDITOR.document.$.documentElement.scrollLeft; l ? (q + y <= t.top ? c("top") : q + y > A.height - t.bottom ? c("pin") : c("bottom"), e = A.width / 2, e = d.floatSpacePreferRight ? "right" : 0 < t.left && t.right < A.width && t.width > p.width ? "rtl" == d.contentsLangDirection ? "right" : "left" : e - t.left > t.right - e ? "left" : "right", p.width > A.width ? (e = "left", n = 0) : (n = "left" == e ? 0 < t.left ?
                                        t.left : 0 : t.right < A.width ? A.width - t.right : 0, n + p.width > A.width && (e = "left" == e ? "right" : "left", n = 0)), g.setStyle(e, f(("pin" == l ? v : z) + n + ("pin" == l ? 0 : "left" == e ? B : -B)))) : (l = "pin", c("pin"), k(e))
                            }
                        }
                }(); if (m) {
                    var l = new CKEDITOR.template('\x3cdiv id\x3d"cke_{name}" class\x3d"cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir\x3d"{langDir}" title\x3d"' + (CKEDITOR.env.gecko ? " " : "") + '" lang\x3d"{langCode}" role\x3d"application" style\x3d"{style}"' + (a.applicationTitle ?
                        ' aria-labelledby\x3d"cke_{name}_arialbl"' : " ") + "\x3e" + (a.applicationTitle ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : " ") + '\x3cdiv class\x3d"cke_inner"\x3e\x3cdiv id\x3d"{topId}" class\x3d"cke_top" role\x3d"presentation"\x3e{content}\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'), g = CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(l.output({
                            content: m, id: a.id, langDir: a.lang.dir, langCode: a.langCode, name: a.name, style: "display:none;z-index:" +
                                (d.baseFloatZIndex - 1), topId: a.ui.spaceId("top"), voiceLabel: a.applicationTitle
                        }))), e = CKEDITOR.tools.eventsBuffer(500, k), c = CKEDITOR.tools.eventsBuffer(100, k); g.unselectable(); g.on("mousedown", function (a) { a = a.data; a.getTarget().hasAscendant("a", 1) || a.preventDefault() }); a.on("focus", function (d) { k(d); a.on("change", e.input); h.on("scroll", c.input); h.on("resize", c.input) }); a.on("blur", function () { g.hide(); a.removeListener("change", e.input); h.removeListener("scroll", c.input); h.removeListener("resize", c.input) });
                    a.on("destroy", function () { h.removeListener("scroll", c.input); h.removeListener("resize", c.input); g.clearCustomData(); g.remove() }); a.focusManager.hasFocus && g.show(); a.focusManager.add(g, 1)
                }
            } var h = CKEDITOR.document.getWindow(), f = CKEDITOR.tools.cssLength; CKEDITOR.plugins.add("floatingspace", { init: function (b) { b.on("loaded", function () { a(this) }, null, null, 20) } })
        })(); CKEDITOR.plugins.add("listblock", {
            requires: "panel", onLoad: function () {
                var a = CKEDITOR.addTemplate("panel-list", '\x3cul role\x3d"presentation" class\x3d"cke_panel_list"\x3e{items}\x3c/ul\x3e'),
                    h = CKEDITOR.addTemplate("panel-list-item", '\x3cli id\x3d"{id}" class\x3d"cke_panel_listItem" role\x3dpresentation\x3e\x3ca id\x3d"{id}_option" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"{title}" draggable\x3d"false" ondragstart\x3d"return false;" href\x3d"javascript:void(\'{val}\')"  onclick\x3d"{onclick}CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role\x3d"option"\x3e{text}\x3c/a\x3e\x3c/li\x3e'), f = CKEDITOR.addTemplate("panel-list-group", '\x3ch1 id\x3d"{id}" draggable\x3d"false" ondragstart\x3d"return false;" class\x3d"cke_panel_grouptitle" role\x3d"presentation" \x3e{label}\x3c/h1\x3e'),
                    b = /\'/g; CKEDITOR.ui.panel.prototype.addListBlock = function (a, b) { return this.addBlock(a, new CKEDITOR.ui.listBlock(this.getHolderElement(), b)) }; CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
                        base: CKEDITOR.ui.panel.block, $: function (a, b) {
                            b = b || {}; var f = b.attributes || (b.attributes = {}); (this.multiSelect = !!b.multiSelect) && (f["aria-multiselectable"] = !0); !f.role && (f.role = "listbox"); this.base.apply(this, arguments); this.element.setAttribute("role", f.role); f = this.keys; f[40] = "next"; f[9] = "next"; f[38] = "prev"; f[CKEDITOR.SHIFT +
                                9] = "prev"; f[32] = CKEDITOR.env.ie ? "mouseup" : "click"; CKEDITOR.env.ie && (f[13] = "mouseup"); this._.pendingHtml = []; this._.pendingList = []; this._.items = {}; this._.groups = {}
                        }, _: { close: function () { if (this._.started) { var b = a.output({ items: this._.pendingList.join("") }); this._.pendingList = []; this._.pendingHtml.push(b); delete this._.started } }, getClick: function () { this._.click || (this._.click = CKEDITOR.tools.addFunction(function (a) { var b = this.toggle(a); if (this.onClick) this.onClick(a, b) }, this)); return this._.click } }, proto: {
                            add: function (a,
                                f, k) { var l = CKEDITOR.tools.getNextId(); this._.started || (this._.started = 1, this._.size = this._.size || 0); this._.items[a] = l; var g; g = CKEDITOR.tools.htmlEncodeAttr(a).replace(b, "\\'"); a = { id: l, val: g, onclick: CKEDITOR.env.ie ? 'return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26' : "", clickFn: this._.getClick(), title: CKEDITOR.tools.htmlEncodeAttr(k || a), text: f || a }; this._.pendingList.push(h.output(a)) }, startGroup: function (a) {
                                    this._.close(); var b = CKEDITOR.tools.getNextId();
                                    this._.groups[a] = b; this._.pendingHtml.push(f.output({ id: b, label: a }))
                                }, commit: function () { this._.close(); this.element.appendHtml(this._.pendingHtml.join("")); delete this._.size; this._.pendingHtml = [] }, toggle: function (a) { var b = this.isMarked(a); b ? this.unmark(a) : this.mark(a); return !b }, hideGroup: function (a) { var b = (a = this.element.getDocument().getById(this._.groups[a])) && a.getNext(); a && (a.setStyle("display", "none"), b && "ul" == b.getName() && b.setStyle("display", "none")) }, hideItem: function (a) {
                                    this.element.getDocument().getById(this._.items[a]).setStyle("display",
                                        "none")
                                }, showAll: function () { var a = this._.items, b = this._.groups, f = this.element.getDocument(), h; for (h in a) f.getById(a[h]).setStyle("display", ""); for (var g in b) a = f.getById(b[g]), h = a.getNext(), a.setStyle("display", ""), h && "ul" == h.getName() && h.setStyle("display", "") }, mark: function (a) { this.multiSelect || this.unmarkAll(); a = this._.items[a]; var b = this.element.getDocument().getById(a); b.addClass("cke_selected"); this.element.getDocument().getById(a + "_option").setAttribute("aria-selected", !0); this.onMark && this.onMark(b) },
                            markFirstDisplayed: function () { var a = this; this._.markFirstDisplayed(function () { a.multiSelect || a.unmarkAll() }) }, unmark: function (a) { var b = this.element.getDocument(); a = this._.items[a]; var f = b.getById(a); f.removeClass("cke_selected"); b.getById(a + "_option").removeAttribute("aria-selected"); this.onUnmark && this.onUnmark(f) }, unmarkAll: function () {
                                var a = this._.items, b = this.element.getDocument(), f; for (f in a) { var h = a[f]; b.getById(h).removeClass("cke_selected"); b.getById(h + "_option").removeAttribute("aria-selected") } this.onUnmark &&
                                    this.onUnmark()
                            }, isMarked: function (a) { return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected") }, focus: function (a) { this._.focusIndex = -1; var b = this.element.getElementsByTag("a"), f, h = -1; if (a) for (f = this.element.getDocument().getById(this._.items[a]).getFirst(); a = b.getItem(++h);) { if (a.equals(f)) { this._.focusIndex = h; break } } else this.element.focus(); f && setTimeout(function () { f.focus() }, 0) }
                        }
                    })
            }
        }); CKEDITOR.plugins.add("richcombo", {
            requires: "floatpanel,listblock,button", beforeInit: function (a) {
                a.ui.addHandler(CKEDITOR.UI_RICHCOMBO,
                    CKEDITOR.ui.richCombo.handler)
            }
        }); (function () {
            var a = '\x3cspan id\x3d"{id}" class\x3d"cke_combo cke_combo__{name} {cls}" role\x3d"presentation"\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_combo_label"\x3e{label}\x3c/span\x3e\x3ca class\x3d"cke_combo_button" title\x3d"{title}" tabindex\x3d"-1"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-haspopup\x3d"listbox"', h = ""; CKEDITOR.env.gecko &&
                CKEDITOR.env.mac && (a += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (a += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); CKEDITOR.env.ie && (h = 'return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26'); var a = a + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" onclick\x3d"' + h + 'CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan id\x3d"{id}_text" class\x3d"cke_combo_text cke_combo_inlinelabel"\x3e{label}\x3c/span\x3e\x3cspan class\x3d"cke_combo_open"\x3e\x3cspan class\x3d"cke_combo_arrow"\x3e' +
                    (CKEDITOR.env.hc ? "\x26#9660;" : CKEDITOR.env.air ? "\x26nbsp;" : "") + "\x3c/span\x3e\x3c/span\x3e\x3c/a\x3e\x3c/span\x3e"), f = CKEDITOR.addTemplate("combo", a); CKEDITOR.UI_RICHCOMBO = "richcombo"; CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
                        $: function (a) {
                            CKEDITOR.tools.extend(this, a, { canGroup: !1, title: a.label, modes: { wysiwyg: 1 }, editorFocus: 1 }); a = this.panel || {}; delete this.panel; this.id = CKEDITOR.tools.getNextNumber(); this.document = a.parent && a.parent.getDocument() || CKEDITOR.document; a.className = "cke_combopanel";
                            a.block = { multiSelect: a.multiSelect, attributes: a.attributes }; a.toolbarRelated = !0; this._ = { panelDefinition: a, items: {}, listeners: [] }
                        }, proto: {
                            renderHtml: function (a) { var d = []; this.render(a, d); return d.join("") }, render: function (a, d) {
                                function h() { if (this.getState() != CKEDITOR.TRISTATE_ON) { var e = this.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED; a.readOnly && !this.readOnly && (e = CKEDITOR.TRISTATE_DISABLED); this.setState(e); this.setValue(""); e != CKEDITOR.TRISTATE_DISABLED && this.refresh && this.refresh() } }
                                var k = CKEDITOR.env, l, g, e = "cke_" + this.id, c = CKEDITOR.tools.addFunction(function (e) { g && (a.unlockSelection(1), g = 0); l.execute(e) }, this), n = this; l = { id: e, combo: this, focus: function () { CKEDITOR.document.getById(e).getChild(1).focus() }, execute: function (e) { var c = n._; if (c.state != CKEDITOR.TRISTATE_DISABLED) if (n.createPanel(a), c.on) c.panel.hide(); else { n.commit(); var d = n.getValue(); d ? c.list.mark(d) : c.list.unmarkAll(); c.panel.showBlock(n.id, new CKEDITOR.dom.element(e), 4) } }, clickFn: c }; this._.listeners.push(a.on("activeFilterChange",
                                    h, this)); this._.listeners.push(a.on("mode", h, this)); this._.listeners.push(a.on("selectionChange", h, this)); !this.readOnly && this._.listeners.push(a.on("readOnly", h, this)); var r = CKEDITOR.tools.addFunction(function (a, b) { a = new CKEDITOR.dom.event(a); var e = a.getKeystroke(); switch (e) { case 13: case 32: case 40: CKEDITOR.tools.callFunction(c, b); break; default: l.onkey(l, e) }a.preventDefault() }), x = CKEDITOR.tools.addFunction(function () { l.onfocus && l.onfocus() }); g = 0; l.keyDownFn = r; k = {
                                        id: e, name: this.name || this.command,
                                        label: this.label, title: this.title, cls: this.className || "", titleJs: k.gecko && !k.hc ? "" : (this.title || "").replace("'", ""), keydownFn: r, focusFn: x, clickFn: c
                                    }; f.output(k, d); if (this.onRender) this.onRender(); return l
                            }, createPanel: function (a) {
                                if (!this._.panel) {
                                    var d = this._.panelDefinition, f = this._.panelDefinition.block, h = d.parent || CKEDITOR.document.getBody(), l = "cke_combopanel__" + this.name, g = new CKEDITOR.ui.floatPanel(a, h, d), d = g.addListBlock(this.id, f), e = this; g.onShow = function () {
                                        this.element.addClass(l); e.setState(CKEDITOR.TRISTATE_ON);
                                        e._.on = 1; e.editorFocus && !a.focusManager.hasFocus && a.focus(); if (e.onOpen) e.onOpen()
                                    }; g.onHide = function (c) { this.element.removeClass(l); e.setState(e.modes && e.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); e._.on = 0; if (!c && e.onClose) e.onClose() }; g.onEscape = function () { g.hide(1) }; d.onClick = function (a, b) { e.onClick && e.onClick.call(e, a, b); g.hide() }; this._.panel = g; this._.list = d; g.getBlock(this.id).onHide = function () { e._.on = 0; e.setState(CKEDITOR.TRISTATE_OFF) }; this.init && this.init()
                                }
                            }, setValue: function (a,
                                d) { this._.value = a; var f = this.document.getById("cke_" + this.id + "_text"); f && (a || d ? f.removeClass("cke_combo_inlinelabel") : (d = this.label, f.addClass("cke_combo_inlinelabel")), f.setText("undefined" != typeof d ? d : a)); var f = "undefined" != typeof d ? d : a, h = this.label, f = f === h ? f : f + ", " + h; (h = this.document.getById("cke_" + this.id + "_label")) && h.setText(f) }, getValue: function () { return this._.value || "" }, unmarkAll: function () { this._.list.unmarkAll() }, mark: function (a) { this._.list.mark(a) }, hideItem: function (a) { this._.list.hideItem(a) },
                            hideGroup: function (a) { this._.list.hideGroup(a) }, showAll: function () { this._.list.showAll() }, add: function (a, d, f) { this._.items[a] = f || a; this._.list.add(a, d, f) }, startGroup: function (a) { this._.list.startGroup(a) }, commit: function () { this._.committed || (this._.list.commit(), this._.committed = 1, CKEDITOR.ui.fire("ready", this)); this._.committed = 1 }, setState: function (a) {
                                if (this._.state != a) {
                                    var d = this.document.getById("cke_" + this.id), f = d.getElementsByTag("a").getItem(0); d.setState(a, "cke_combo"); a == CKEDITOR.TRISTATE_DISABLED ?
                                        d.setAttribute("aria-disabled", !0) : d.removeAttribute("aria-disabled"); f && f.setAttribute("aria-expanded", a == CKEDITOR.TRISTATE_ON); this._.state = a
                                }
                            }, getState: function () { return this._.state }, enable: function () { this._.state == CKEDITOR.TRISTATE_DISABLED && this.setState(this._.lastState) }, disable: function () { this._.state != CKEDITOR.TRISTATE_DISABLED && (this._.lastState = this._.state, this.setState(CKEDITOR.TRISTATE_DISABLED)) }, destroy: function () {
                                CKEDITOR.tools.array.forEach(this._.listeners, function (a) { a.removeListener() });
                                this._.listeners = []
                            }, select: function (a) { if (!CKEDITOR.tools.isEmpty(this._.items)) for (var d in this._.items) if (a({ value: d, text: this._.items[d] })) { this.setValue(d); break } }
                        }, statics: { handler: { create: function (a) { return new CKEDITOR.ui.richCombo(a) } } }
                    }); CKEDITOR.ui.prototype.addRichCombo = function (a, d) { this.add(a, CKEDITOR.UI_RICHCOMBO, d) }
        })(); (function () {
            function a(a, b) {
                var l = a.config, g = b.lang, e = new CKEDITOR.style(b.styleDefinition), c = new d({ entries: b.entries, styleVariable: b.styleVariable, styleDefinition: b.styleDefinition }),
                    n; a.addCommand(b.commandName, { exec: function (a, b) { var e = b.newStyle, c = b.oldStyle, d = a.getSelection().getRanges()[0], g = void 0 === e; if (c || e) c && d.collapsed && f({ editor: a, range: d, style: c }), g ? a.removeStyle(c) : (c && !h(c, e) && a.removeStyle(c), a.applyStyle(e)) }, refresh: function (a, b) { e.checkApplicable(b, a, a.activeFilter) || this.setState(CKEDITOR.TRISTATE_DISABLED) } }); n = a.getCommand(b.commandName); a.ui.addRichCombo(b.comboName, {
                        label: g.label, title: g.panelTitle, command: b.commandName, toolbar: "styles," + b.order, defaultValue: "cke-default",
                        allowedContent: e, requiredContent: e, contentTransformations: "span" === b.styleDefinition.element ? [[{
                            element: "font", check: "span", left: function (a) { return !!a.attributes.size || !!a.attributes.align || !!a.attributes.face }, right: function (a) {
                                var b = " x-small small medium large x-large xx-large 48px".split(" "); a.name = "span"; a.attributes.size && (a.styles["font-size"] = b[a.attributes.size], delete a.attributes.size); a.attributes.align && (a.styles["text-align"] = a.attributes.align, delete a.attributes.align); a.attributes.face &&
                                    (a.styles["font-family"] = a.attributes.face, delete a.attributes.face)
                            }
                        }]] : null, panel: { css: [CKEDITOR.skin.getPath("editor")].concat(l.contentsCss), multiSelect: !1, attributes: { "aria-label": g.panelTitle } }, init: function () { var b = "(" + a.lang.common.optionDefault + ")"; this.startGroup(g.panelTitle); this.add(this.defaultValue, b, b); c.addToCombo(this) }, onClick: function (e) { var d = this.getValue(); a.focus(); a.fire("saveSnapshot"); a.execCommand(b.commandName, { newStyle: c.getStyle(e), oldStyle: c.getStyle(d) }); a.fire("saveSnapshot") },
                        onRender: function () { a.on("selectionChange", function (e) { var d = this.getValue(); (e = c.getMatchingValue(a, e.data.path)) ? e != d && this.setValue(e) : this.setValue("", b.defaultLabel) }, this); n.on("state", function () { this.setState(n.state) }, this) }, refresh: function () { this.setState(n.state) }
                    })
            } function h(a, b) {
                if (!(a instanceof CKEDITOR.style && b instanceof CKEDITOR.style)) return !1; var d = function (a, b) { var d = a.getDefinition().attributes, g = b.getDefinition().attributes; return CKEDITOR.tools.objectCompare(d, g) }(a, b), g =
                    function (a, b) { return CKEDITOR.style.getStyleText(a.getDefinition()) === CKEDITOR.style.getStyleText(b.getDefinition()) }(a, b); return d && g
            } function f(a) {
                var d = a.editor, f = a.range, g = a.style, e, c, h; e = d.elementPath(); if (a = e.contains(function (a) { return g.checkElementRemovable(a) })) {
                    c = f.checkBoundaryOfElement(a, CKEDITOR.START); h = f.checkBoundaryOfElement(a, CKEDITOR.END); if (c && h) { for (c = f.createBookmark(); e = a.getFirst();)e.insertBefore(a); a.remove(); f.moveToBookmark(c) } else c || h ? f.moveToPosition(a, c ? CKEDITOR.POSITION_BEFORE_START :
                        CKEDITOR.POSITION_AFTER_END) : (f.splitElement(a), f.moveToPosition(a, CKEDITOR.POSITION_AFTER_END)), b(f, e.elements.slice(), a); d.getSelection().selectRanges([f])
                }
            } function b(a, d, f) { var g = d.pop(); if (g) { if (f) return b(a, d, g.equals(f) ? null : f); f = g.clone(); a.insertNode(f); a.moveToPosition(f, CKEDITOR.POSITION_AFTER_START); b(a, d) } } var d = CKEDITOR.tools.createClass({
                $: function (a) {
                    var b = a.entries.split(";"); this._.data = {}; this._.names = []; for (var d = 0; d < b.length; d++) {
                        var g = b[d], e, c; g ? (g = g.split("/"), e = g[0], g = g[1],
                            c = {}, c[a.styleVariable] = g || e, this._.data[e] = new CKEDITOR.style(a.styleDefinition, c), this._.data[e]._.definition.name = e, this._.names.push(e)) : (b.splice(d, 1), d--)
                    }
                }, proto: { getStyle: function (a) { return this._.data[a] }, addToCombo: function (a) { for (var b = 0; b < this._.names.length; b++) { var d = this._.names[b]; a.add(d, this.getStyle(d).buildPreview(), d) } }, getMatchingValue: function (a, b) { for (var d = b.elements, g = 0, e; g < d.length; g++)if (e = d[g], e = this._.findMatchingStyleName(a, e)) return e; return null } }, _: {
                    findMatchingStyleName: function (a,
                        b) { return CKEDITOR.tools.array.find(this._.names, function (d) { return this.getStyle(d).checkElementMatch(b, !0, a) }, this) }
                }
            }); CKEDITOR.plugins.add("font", {
                requires: "richcombo", init: function (b) {
                    var d = b.config; a(b, { comboName: "Font", commandName: "font", styleVariable: "family", lang: b.lang.font, entries: d.font_names, defaultLabel: d.font_defaultLabel, styleDefinition: d.font_style, order: 30 }); a(b, {
                        comboName: "FontSize", commandName: "fontSize", styleVariable: "size", lang: b.lang.font.fontSize, entries: d.fontSize_sizes, defaultLabel: d.fontSize_defaultLabel,
                        styleDefinition: d.fontSize_style, order: 40
                    })
                }
            })
        })(); CKEDITOR.config.font_names = "Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif"; CKEDITOR.config.font_defaultLabel = ""; CKEDITOR.config.font_style =
            { element: "span", styles: { "font-family": "#(family)" }, overrides: [{ element: "font", attributes: { face: null } }] }; CKEDITOR.config.fontSize_sizes = "8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px"; CKEDITOR.config.fontSize_defaultLabel = ""; CKEDITOR.config.fontSize_style = { element: "span", styles: { "font-size": "#(size)" }, overrides: [{ element: "font", attributes: { size: null } }] }; CKEDITOR.plugins.add("format", {
                requires: "richcombo", init: function (a) {
                    if (!a.blockless) {
                        for (var h =
                            a.config, f = a.lang.format, b = h.format_tags.split(";"), d = {}, m = 0, k = [], l = 0; l < b.length; l++) { var g = b[l], e = new CKEDITOR.style(h["format_" + g]); if (!a.filter.customConfig || a.filter.check(e)) m++, d[g] = e, d[g]._.enterMode = a.config.enterMode, k.push(e) } 0 !== m && a.ui.addRichCombo("Format", {
                                label: f.label, title: f.panelTitle, toolbar: "styles,20", allowedContent: k, panel: { css: [CKEDITOR.skin.getPath("editor")].concat(h.contentsCss), multiSelect: !1, attributes: { "aria-label": f.panelTitle } }, init: function () {
                                    this.startGroup(f.panelTitle);
                                    for (var a in d) { var b = f["tag_" + a]; this.add(a, d[a].buildPreview(b), b) }
                                }, onClick: function (b) { a.focus(); a.fire("saveSnapshot"); b = d[b]; var e = a.elementPath(); a.fire("stylesRemove", { type: CKEDITOR.STYLE_BLOCK }); b.checkActive(e, a) || a.applyStyle(b); setTimeout(function () { a.fire("saveSnapshot") }, 0) }, onRender: function () {
                                    a.on("selectionChange", function (b) { var e = this.getValue(); b = b.data.path; this.refresh(); for (var g in d) if (d[g].checkActive(b, a)) { g != e && this.setValue(g, a.lang.format["tag_" + g]); return } this.setValue("") },
                                        this)
                                }, onOpen: function () { this.showAll(); for (var b in d) a.activeFilter.check(d[b]) || this.hideItem(b) }, refresh: function () { var b = a.elementPath(); if (b) { if (b.isContextFor("p")) for (var e in d) if (a.activeFilter.check(d[e])) return; this.setState(CKEDITOR.TRISTATE_DISABLED) } }
                            })
                    }
                }
            }); CKEDITOR.config.format_tags = "p;h1;h2;h3;h4;h5;h6;pre;address;div"; CKEDITOR.config.format_p = { element: "p" }; CKEDITOR.config.format_div = { element: "div" }; CKEDITOR.config.format_pre = { element: "pre" }; CKEDITOR.config.format_address = { element: "address" };
        CKEDITOR.config.format_h1 = { element: "h1" }; CKEDITOR.config.format_h2 = { element: "h2" }; CKEDITOR.config.format_h3 = { element: "h3" }; CKEDITOR.config.format_h4 = { element: "h4" }; CKEDITOR.config.format_h5 = { element: "h5" }; CKEDITOR.config.format_h6 = { element: "h6" }; (function () {
            function a(a, b) { var d = m.exec(a), e = m.exec(b); if (d) { if (!d[2] && "px" == e[2]) return e[1]; if ("px" == d[2] && !e[2]) return e[1] + "px" } return b } function h(d) {
                return {
                    elements: {
                        $: function (h) {
                            var g = h.attributes, g = g && g["data-cke-realelement"], e = f(d, decodeURIComponent(g));
                            if ((g = (g = g && new CKEDITOR.htmlParser.fragment.fromHtml(e)) && g.children[0]) && h.attributes["data-cke-resizable"]) { var c = (new b(h)).rules; h = g.attributes; e = c.width; c = c.height; e && (h.width = a(h.width, e)); c && (h.height = a(h.height, c)) } return g
                        }
                    }
                }
            } function f(a, b) {
                var d = [], e = /^cke:/i, c = new CKEDITOR.htmlParser.filter({ elements: { "^": function (a) { e.test(a.name) && (a.name = a.name.replace(e, ""), d.push(a)) }, iframe: function (a) { a.children = [] } } }), f = a.activeFilter, h = new CKEDITOR.htmlParser.basicWriter, m = CKEDITOR.htmlParser.fragment.fromHtml(b);
                c.applyTo(m); f.applyTo(m); CKEDITOR.tools.array.forEach(d, function (a) { a.name = "cke:" + a.name }); m.writeHtml(h); return h.getHtml()
            } var b = CKEDITOR.htmlParser.cssStyle, d = CKEDITOR.tools.cssLength, m = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i; CKEDITOR.plugins.add("fakeobjects", { init: function (a) { a.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}", "fakeobjects") }, afterInit: function (a) { var b = a.dataProcessor; (b = b && b.htmlFilter) && b.addRules(h(a), { applyToAll: !0 }) } }); CKEDITOR.editor.prototype.createFakeElement =
                function (a, f, g, e) {
                    var c = this.lang.fakeobjects, c = c[g] || c.unknown; f = { "class": f, "data-cke-realelement": encodeURIComponent(a.getOuterHtml()), "data-cke-real-node-type": a.type, alt: c, title: c, align: a.getAttribute("align") || "" }; CKEDITOR.env.hc || (f.src = CKEDITOR.tools.transparentImageData); g && (f["data-cke-real-element-type"] = g); e && (f["data-cke-resizable"] = e, g = new b, e = a.getAttribute("width"), a = a.getAttribute("height"), e && (g.rules.width = d(e)), a && (g.rules.height = d(a)), g.populate(f)); return this.document.createElement("img",
                        { attributes: f })
                }; CKEDITOR.editor.prototype.createFakeParserElement = function (a, f, g, e) {
                    var c = this.lang.fakeobjects, c = c[g] || c.unknown, h; h = new CKEDITOR.htmlParser.basicWriter; a.writeHtml(h); h = h.getHtml(); f = { "class": f, "data-cke-realelement": encodeURIComponent(h), "data-cke-real-node-type": a.type, alt: c, title: c, align: a.attributes.align || "" }; CKEDITOR.env.hc || (f.src = CKEDITOR.tools.transparentImageData); g && (f["data-cke-real-element-type"] = g); e && (f["data-cke-resizable"] = e, e = a.attributes, a = new b, g = e.width, e = e.height,
                        void 0 !== g && (a.rules.width = d(g)), void 0 !== e && (a.rules.height = d(e)), a.populate(f)); return new CKEDITOR.htmlParser.element("img", f)
                }; CKEDITOR.editor.prototype.restoreRealElement = function (b) {
                    if (b.data("cke-real-node-type") != CKEDITOR.NODE_ELEMENT) return null; var d = decodeURIComponent(b.data("cke-realelement")), d = f(this, d), d = CKEDITOR.dom.element.createFromHtml(d, this.document); if (b.data("cke-resizable")) {
                        var g = b.getStyle("width"); b = b.getStyle("height"); g && d.setAttribute("width", a(d.getAttribute("width"),
                            g)); b && d.setAttribute("height", a(d.getAttribute("height"), b))
                    } return d
                }
        })(); CKEDITOR.plugins.add("forms", {
            requires: "dialog,fakeobjects", onLoad: function () {
                CKEDITOR.addCss(".cke_editable form{border: 1px dotted #FF0000;padding: 2px;}\n"); CKEDITOR.addCss("img.cke_hidden{background-image: url(" + CKEDITOR.getUrl(this.path + "images/hiddenfield.gif") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 16px !important;height: 16px !important;}"); CKEDITOR.style.unstylableElements.push("select",
                    "option")
            }, init: function (a) {
                var h = a.lang, f = 0, b = { email: 1, password: 1, search: 1, tel: 1, text: 1, url: 1 }, d = { checkbox: "input[type,name,checked,required]", radio: "input[type,name,checked,required]", textfield: "input[type,name,value,size,maxlength,required]", textarea: "textarea[cols,rows,name,required]", select: "select[name,size,multiple,required]; option[value,selected]", button: "input[type,name,value]", form: "form[action,name,id,enctype,target,method]", hiddenfield: "input[type,name,value]", imagebutton: "input[type,alt,src]{width,height,border,border-width,border-style,margin,float}" },
                    m = { checkbox: "input", radio: "input", textfield: "input", textarea: "textarea", select: "select", button: "input", form: "form", hiddenfield: "input", imagebutton: "input" }, k = function (b, c, g) { var k = { allowedContent: d[c], requiredContent: m[c] }; "form" == c && (k.context = "form"); a.addCommand(c, new CKEDITOR.dialogCommand(c, k)); a.ui.addButton && a.ui.addButton(b, { label: h.common[b.charAt(0).toLowerCase() + b.slice(1)], command: c, toolbar: "forms," + (f += 10) }); CKEDITOR.dialog.add(c, g) }, l = this.path + "dialogs/"; !a.blockless && k("Form", "form",
                        l + "form.js"); k("Checkbox", "checkbox", l + "checkbox.js"); k("Radio", "radio", l + "radio.js"); k("TextField", "textfield", l + "textfield.js"); k("Textarea", "textarea", l + "textarea.js"); k("Select", "select", l + "select.js"); k("Button", "button", l + "button.js"); var g = a.plugins.image; g && !a.plugins.image2 && k("ImageButton", "imagebutton", CKEDITOR.plugins.getPath("image") + "dialogs/image.js"); k("HiddenField", "hiddenfield", l + "hiddenfield.js"); a.addMenuItems && (k = {
                            checkbox: {
                                label: h.forms.checkboxAndRadio.checkboxTitle, command: "checkbox",
                                group: "checkbox"
                            }, radio: { label: h.forms.checkboxAndRadio.radioTitle, command: "radio", group: "radio" }, textfield: { label: h.forms.textfield.title, command: "textfield", group: "textfield" }, hiddenfield: { label: h.forms.hidden.title, command: "hiddenfield", group: "hiddenfield" }, button: { label: h.forms.button.title, command: "button", group: "button" }, select: { label: h.forms.select.title, command: "select", group: "select" }, textarea: { label: h.forms.textarea.title, command: "textarea", group: "textarea" }
                        }, g && (k.imagebutton = {
                            label: h.image.titleButton,
                            command: "imagebutton", group: "imagebutton"
                        }), !a.blockless && (k.form = { label: h.forms.form.menu, command: "form", group: "form" }), a.addMenuItems(k)); a.contextMenu && (!a.blockless && a.contextMenu.addListener(function (a, b, d) { if ((a = d.contains("form", 1)) && !a.isReadOnly()) return { form: CKEDITOR.TRISTATE_OFF } }), a.contextMenu.addListener(function (a) {
                            if (a && !a.isReadOnly()) {
                                var c = a.getName(); if ("select" == c) return { select: CKEDITOR.TRISTATE_OFF }; if ("textarea" == c) return { textarea: CKEDITOR.TRISTATE_OFF }; if ("input" == c) {
                                    var d =
                                        a.getAttribute("type") || "text"; switch (d) { case "button": case "submit": case "reset": return { button: CKEDITOR.TRISTATE_OFF }; case "checkbox": return { checkbox: CKEDITOR.TRISTATE_OFF }; case "radio": return { radio: CKEDITOR.TRISTATE_OFF }; case "image": return g ? { imagebutton: CKEDITOR.TRISTATE_OFF } : null }if (b[d]) return { textfield: CKEDITOR.TRISTATE_OFF }
                                } if ("img" == c && "hiddenfield" == a.data("cke-real-element-type")) return { hiddenfield: CKEDITOR.TRISTATE_OFF }
                            }
                        })); a.on("doubleclick", function (e) {
                            var c = e.data.element; if (!a.blockless &&
                                c.is("form")) e.data.dialog = "form"; else if (c.is("select")) e.data.dialog = "select"; else if (c.is("textarea")) e.data.dialog = "textarea"; else if (c.is("img") && "hiddenfield" == c.data("cke-real-element-type")) e.data.dialog = "hiddenfield"; else if (c.is("input")) {
                                    c = c.getAttribute("type") || "text"; switch (c) { case "button": case "submit": case "reset": e.data.dialog = "button"; break; case "checkbox": e.data.dialog = "checkbox"; break; case "radio": e.data.dialog = "radio"; break; case "image": e.data.dialog = "imagebutton" }b[c] && (e.data.dialog =
                                        "textfield")
                                }
                        })
            }, afterInit: function (a) { var h = a.dataProcessor, f = h && h.htmlFilter, h = h && h.dataFilter; CKEDITOR.env.ie && f && f.addRules({ elements: { input: function (a) { a = a.attributes; var d = a.type; d || (a.type = "text"); "checkbox" != d && "radio" != d || "on" != a.value || delete a.value } } }, { applyToAll: !0 }); h && h.addRules({ elements: { input: function (b) { if ("hidden" == b.attributes.type) return a.createFakeParserElement(b, "cke_hidden", "hiddenfield") } } }, { applyToAll: !0 }) }
        }); CKEDITOR.plugins.forms = { _setupRequiredAttribute: function (a) { this.setValue(a.hasAttribute("required")) } };
        (function () { var a = { canUndo: !1, exec: function (a) { var f = a.document.createElement("hr"); a.insertElement(f) }, allowedContent: "hr", requiredContent: "hr" }; CKEDITOR.plugins.add("horizontalrule", { init: function (h) { h.blockless || (h.addCommand("horizontalrule", a), h.ui.addButton && h.ui.addButton("HorizontalRule", { label: h.lang.horizontalrule.toolbar, command: "horizontalrule", toolbar: "insert,40" })) } }) })(); CKEDITOR.plugins.add("htmlwriter", {
            init: function (a) {
                var h = new CKEDITOR.htmlWriter; h.forceSimpleAmpersand = a.config.forceSimpleAmpersand;
                h.indentationChars = "string" === typeof a.config.dataIndentationChars ? a.config.dataIndentationChars : "\t"; a.dataProcessor.writer = h
            }
        }); CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({
            base: CKEDITOR.htmlParser.basicWriter, $: function () {
                this.base(); this.indentationChars = "\t"; this.selfClosingEnd = " /\x3e"; this.lineBreakChars = "\n"; this.sortAttributes = 1; this._.indent = 0; this._.indentation = ""; this._.inPre = 0; this._.rules = {}; var a = CKEDITOR.dtd, h; for (h in CKEDITOR.tools.extend({}, a.$nonBodyContent, a.$block, a.$listItem,
                    a.$tableContent)) this.setRules(h, { indent: !a[h]["#"], breakBeforeOpen: 1, breakBeforeClose: !a[h]["#"], breakAfterClose: 1, needsSpace: h in a.$block && !(h in { li: 1, dt: 1, dd: 1 }) }); this.setRules("br", { breakAfterOpen: 1 }); this.setRules("title", { indent: 0, breakAfterOpen: 0 }); this.setRules("style", { indent: 0, breakBeforeClose: 1 }); this.setRules("pre", { breakAfterOpen: 1, indent: 0 })
            }, proto: {
                openTag: function (a) {
                    var h = this._.rules[a]; this._.afterCloser && h && h.needsSpace && this._.needsSpace && this._.output.push("\n"); this._.indent ?
                        this.indentation() : h && h.breakBeforeOpen && (this.lineBreak(), this.indentation()); this._.output.push("\x3c", a); this._.afterCloser = 0
                }, openTagClose: function (a, h) { var f = this._.rules[a]; h ? (this._.output.push(this.selfClosingEnd), f && f.breakAfterClose && (this._.needsSpace = f.needsSpace)) : (this._.output.push("\x3e"), f && f.indent && (this._.indentation += this.indentationChars)); f && f.breakAfterOpen && this.lineBreak(); "pre" == a && (this._.inPre = 1) }, attribute: function (a, h) {
                    "string" == typeof h && (h = CKEDITOR.tools.htmlEncodeAttr(h),
                        this.forceSimpleAmpersand && (h = h.replace(/&amp;/g, "\x26"))); this._.output.push(" ", a, '\x3d"', h, '"')
                }, closeTag: function (a) { var h = this._.rules[a]; h && h.indent && (this._.indentation = this._.indentation.substr(this.indentationChars.length)); this._.indent ? this.indentation() : h && h.breakBeforeClose && (this.lineBreak(), this.indentation()); this._.output.push("\x3c/", a, "\x3e"); "pre" == a && (this._.inPre = 0); h && h.breakAfterClose && (this.lineBreak(), this._.needsSpace = h.needsSpace); this._.afterCloser = 1 }, text: function (a) {
                    this._.indent &&
                        (this.indentation(), !this._.inPre && (a = CKEDITOR.tools.ltrim(a))); this._.output.push(a)
                }, comment: function (a) { this._.indent && this.indentation(); this._.output.push("\x3c!--", a, "--\x3e") }, lineBreak: function () { !this._.inPre && 0 < this._.output.length && this._.output.push(this.lineBreakChars); this._.indent = 1 }, indentation: function () { !this._.inPre && this._.indentation && this._.output.push(this._.indentation); this._.indent = 0 }, reset: function () {
                    this._.output = []; this._.indent = 0; this._.indentation = ""; this._.afterCloser =
                        0; this._.inPre = 0; this._.needsSpace = 0
                }, setRules: function (a, h) { var f = this._.rules[a]; f ? CKEDITOR.tools.extend(f, h, !0) : this._.rules[a] = h }
            }
        }); (function () {
            CKEDITOR.plugins.add("iframe", {
                requires: "dialog,fakeobjects", onLoad: function () { CKEDITOR.addCss("img.cke_iframe{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}") }, init: function (a) {
                    var h = a.lang.iframe, f = "iframe[align,longdesc,tabindex,frameborder,height,name,scrolling,src,title,width]";
                    a.plugins.dialogadvtab && (f += ";iframe" + a.plugins.dialogadvtab.allowedContent({ id: 1, classes: 1, styles: 1 })); CKEDITOR.dialog.add("iframe", this.path + "dialogs/iframe.js"); a.addCommand("iframe", new CKEDITOR.dialogCommand("iframe", { allowedContent: f, requiredContent: "iframe" })); a.ui.addButton && a.ui.addButton("Iframe", { label: h.toolbar, command: "iframe", toolbar: "insert,80" }); a.on("doubleclick", function (a) { var d = a.data.element; d.is("img") && "iframe" == d.data("cke-real-element-type") && (a.data.dialog = "iframe") }); a.addMenuItems &&
                        a.addMenuItems({ iframe: { label: h.title, command: "iframe", group: "image" } }); a.contextMenu && a.contextMenu.addListener(function (a) { if (a && a.is("img") && "iframe" == a.data("cke-real-element-type")) return { iframe: CKEDITOR.TRISTATE_OFF } })
                }, afterInit: function (a) { var h = a.dataProcessor; (h = h && h.dataFilter) && h.addRules({ elements: { iframe: function (f) { return a.createFakeParserElement(f, "cke_iframe", "iframe", !0) } } }) }
            })
        })(); (function () {
            function a(a, b) {
                b || (b = a.getSelection().getSelectedElement()); if (b && b.is("img") && !b.data("cke-realelement") &&
                    !b.isReadOnly()) return b
            } function h(a) { var b = a.getStyle("float"); if ("inherit" == b || "none" == b) b = 0; b || (b = a.getAttribute("align")); return b } CKEDITOR.plugins.add("image", {
                requires: "dialog", init: function (f) {
                    if (!f.plugins.detectConflict("image", ["easyimage", "image2"])) {
                        CKEDITOR.dialog.add("image", this.path + "dialogs/image.js"); var b = "img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}"; CKEDITOR.dialog.isTabEnabled(f, "image", "advanced") && (b =
                            "img[alt,dir,id,lang,longdesc,!src,title]{*}(*)"); f.addCommand("image", new CKEDITOR.dialogCommand("image", { allowedContent: b, requiredContent: "img[alt,src]", contentTransformations: [["img{width}: sizeToStyle", "img[width]: sizeToAttribute"], ["img{float}: alignmentToStyle", "img[align]: alignmentToAttribute"]] })); f.ui.addButton && f.ui.addButton("Image", { label: f.lang.common.image, command: "image", toolbar: "insert,10" }); f.on("doubleclick", function (a) {
                                var b = a.data.element; !b.is("img") || b.data("cke-realelement") ||
                                    b.isReadOnly() || (a.data.dialog = "image")
                            }); f.addMenuItems && f.addMenuItems({ image: { label: f.lang.image.menu, command: "image", group: "image" } }); f.contextMenu && f.contextMenu.addListener(function (b) { if (a(f, b)) return { image: CKEDITOR.TRISTATE_OFF } })
                    }
                }, afterInit: function (f) {
                    function b(b) {
                        var m = f.getCommand("justify" + b); if (m) {
                            if ("left" == b || "right" == b) m.on("exec", function (k) { var l = a(f), g; l && (g = h(l), g == b ? (l.removeStyle("float"), b == h(l) && l.removeAttribute("align")) : l.setStyle("float", b), k.cancel()) }); m.on("refresh",
                                function (k) { var l = a(f); l && (l = h(l), this.setState(l == b ? CKEDITOR.TRISTATE_ON : "right" == b || "left" == b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED), k.cancel()) })
                        }
                    } f.plugins.image2 || (b("left"), b("right"), b("center"), b("block"))
                }
            })
        })(); CKEDITOR.config.image_removeLinkByEmptyURL = !0; (function () {
            function a(a, d) {
                var m, k; d.on("refresh", function (a) { var b = [h], e; for (e in a.data.states) b.push(a.data.states[e]); this.setState(CKEDITOR.tools.search(b, f) ? f : h) }, d, null, 100); d.on("exec", function (d) {
                    m = a.getSelection();
                    k = m.createBookmarks(1); d.data || (d.data = {}); d.data.done = !1
                }, d, null, 0); d.on("exec", function () { a.forceNextSelectionCheck(); m.selectBookmarks(k) }, d, null, 100)
            } var h = CKEDITOR.TRISTATE_DISABLED, f = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add("indent", {
                init: function (b) {
                    var d = CKEDITOR.plugins.indent.genericDefinition; a(b, b.addCommand("indent", new d(!0))); a(b, b.addCommand("outdent", new d)); b.ui.addButton && (b.ui.addButton("Indent", { label: b.lang.indent.indent, command: "indent", directional: !0, toolbar: "indent,20" }),
                        b.ui.addButton("Outdent", { label: b.lang.indent.outdent, command: "outdent", directional: !0, toolbar: "indent,10" })); b.on("dirChanged", function (a) {
                            var d = b.createRange(), f = a.data.node; d.setStartBefore(f); d.setEndAfter(f); for (var g = new CKEDITOR.dom.walker(d), e; e = g.next();)if (e.type == CKEDITOR.NODE_ELEMENT) if (!e.equals(f) && e.getDirection()) d.setStartAfter(e), g = new CKEDITOR.dom.walker(d); else {
                                var c = b.config.indentClasses; if (c) for (var h = "ltr" == a.data.dir ? ["_rtl", ""] : ["", "_rtl"], r = 0; r < c.length; r++)e.hasClass(c[r] +
                                    h[0]) && (e.removeClass(c[r] + h[0]), e.addClass(c[r] + h[1])); c = e.getStyle("margin-right"); h = e.getStyle("margin-left"); c ? e.setStyle("margin-left", c) : e.removeStyle("margin-left"); h ? e.setStyle("margin-right", h) : e.removeStyle("margin-right")
                            }
                        })
                }
            }); CKEDITOR.plugins.indent = {
                genericDefinition: function (a) { this.isIndent = !!a; this.startDisabled = !this.isIndent }, specificDefinition: function (a, d, f) {
                    this.name = d; this.editor = a; this.jobs = {}; this.enterBr = a.config.enterMode == CKEDITOR.ENTER_BR; this.isIndent = !!f; this.relatedGlobal =
                        f ? "indent" : "outdent"; this.indentKey = f ? 9 : CKEDITOR.SHIFT + 9; this.database = {}
                }, registerCommands: function (a, d) {
                    a.on("pluginsLoaded", function () {
                        for (var a in d) (function (a, b) {
                            var d = a.getCommand(b.relatedGlobal), e; for (e in b.jobs) d.on("exec", function (c) { c.data.done || (a.fire("lockSnapshot"), b.execJob(a, e) && (c.data.done = !0), a.fire("unlockSnapshot"), CKEDITOR.dom.element.clearAllMarkers(b.database)) }, this, null, e), d.on("refresh", function (c) {
                                c.data.states || (c.data.states = {}); c.data.states[b.name + "@" + e] = b.refreshJob(a,
                                    e, c.data.path)
                            }, this, null, e); a.addFeature(b)
                        })(this, d[a])
                    })
                }
            }; CKEDITOR.plugins.indent.genericDefinition.prototype = { context: "p", exec: function () { } }; CKEDITOR.plugins.indent.specificDefinition.prototype = { execJob: function (a, d) { var f = this.jobs[d]; if (f.state != h) return f.exec.call(this, a) }, refreshJob: function (a, d, f) { d = this.jobs[d]; a.activeFilter.checkFeature(this) ? d.state = d.refresh.call(this, a, f) : d.state = h; return d.state }, getContext: function (a) { return a.contains(this.context) } }
        })(); (function () {
            function a(a,
                b, d) {
                if (!a.getCustomData("indent_processed")) {
                    var e = this.editor, c = this.isIndent; if (b) { e = a.$.className.match(this.classNameRegex); d = 0; e && (e = e[1], d = CKEDITOR.tools.indexOf(b, e) + 1); if (0 > (d += c ? 1 : -1)) return; d = Math.min(d, b.length); d = Math.max(d, 0); a.$.className = CKEDITOR.tools.ltrim(a.$.className.replace(this.classNameRegex, "")); 0 < d && a.addClass(b[d - 1]) } else {
                        b = h(a, d); d = parseInt(a.getStyle(b), 10); var f = e.config.indentOffset || 40; isNaN(d) && (d = 0); d += (c ? 1 : -1) * f; if (0 > d) return; d = Math.max(d, 0); d = Math.ceil(d / f) * f; a.setStyle(b,
                            d ? d + (e.config.indentUnit || "px") : ""); "" === a.getAttribute("style") && a.removeAttribute("style")
                    } CKEDITOR.dom.element.setMarker(this.database, a, "indent_processed", 1)
                }
            } function h(a, b) { return "ltr" == (b || a.getComputedStyle("direction")) ? "margin-left" : "margin-right" } var f = CKEDITOR.dtd.$listItem, b = CKEDITOR.dtd.$list, d = CKEDITOR.TRISTATE_DISABLED, m = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add("indentblock", {
                requires: "indent", init: function (k) {
                    function l() {
                        g.specificDefinition.apply(this, arguments); this.allowedContent =
                            { "div h1 h2 h3 h4 h5 h6 ol p pre ul": { propertiesOnly: !0, styles: e ? null : "margin-left,margin-right", classes: e || null } }; this.contentTransformations = [["div: splitMarginShorthand"], ["h1: splitMarginShorthand"], ["h2: splitMarginShorthand"], ["h3: splitMarginShorthand"], ["h4: splitMarginShorthand"], ["h5: splitMarginShorthand"], ["h6: splitMarginShorthand"], ["ol: splitMarginShorthand"], ["p: splitMarginShorthand"], ["pre: splitMarginShorthand"], ["ul: splitMarginShorthand"]]; this.enterBr && (this.allowedContent.div =
                                !0); this.requiredContent = (this.enterBr ? "div" : "p") + (e ? "(" + e.join(",") + ")" : "{margin-left}"); this.jobs = {
                                    20: {
                                        refresh: function (a, b) { var g = b.block || b.blockLimit; if (!g.is(f)) var k = g.getAscendant(f), g = k && b.contains(k) || g; g.is(f) && (g = g.getParent()); if (this.enterBr || this.getContext(b)) { if (e) { var k = e, g = g.$.className.match(this.classNameRegex), l = this.isIndent, k = g ? l ? g[1] != k.slice(-1) : !0 : l; return k ? m : d } return this.isIndent ? m : g ? CKEDITOR[0 >= (parseInt(g.getStyle(h(g)), 10) || 0) ? "TRISTATE_DISABLED" : "TRISTATE_OFF"] : d } return d },
                                        exec: function (c) { var d = c.getSelection(), d = d && d.getRanges()[0], g; if (g = c.elementPath().contains(b)) a.call(this, g, e); else for (d = d.createIterator(), c = c.config.enterMode, d.enforceRealBlocks = !0, d.enlargeBr = c != CKEDITOR.ENTER_BR; g = d.getNextParagraph(c == CKEDITOR.ENTER_P ? "p" : "div");)g.isReadOnly() || a.call(this, g, e); return !0 }
                                    }
                                }
                    } var g = CKEDITOR.plugins.indent, e = k.config.indentClasses; g.registerCommands(k, { indentblock: new l(k, "indentblock", !0), outdentblock: new l(k, "outdentblock") }); CKEDITOR.tools.extend(l.prototype,
                        g.specificDefinition.prototype, { context: { div: 1, dl: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, ul: 1, ol: 1, p: 1, pre: 1, table: 1 }, classNameRegex: e ? new RegExp("(?:^|\\s+)(" + e.join("|") + ")(?\x3d$|\\s)") : null })
                }
            })
        })(); (function () {
            function a(a) {
                function b(g) {
                    for (var h = k.startContainer, m = k.endContainer; h && !h.getParent().equals(g);)h = h.getParent(); for (; m && !m.getParent().equals(g);)m = m.getParent(); if (!h || !m) return !1; for (var p = [], z = !1; !z;)h.equals(m) && (z = !0), p.push(h), h = h.getNext(); if (1 > p.length) return !1; h = g.getParents(!0);
                    for (m = 0; m < h.length; m++)if (h[m].getName && d[h[m].getName()]) { g = h[m]; break } for (var h = e.isIndent ? 1 : -1, m = p[0], p = p[p.length - 1], z = CKEDITOR.plugins.list.listToArray(g, c), y = z[p.getCustomData("listarray_index")].indent, m = m.getCustomData("listarray_index"); m <= p.getCustomData("listarray_index"); m++)if (z[m].indent += h, 0 < h) { for (var v = z[m].parent, C = m - 1; 0 <= C; C--)if (z[C].indent === h) { v = z[C].parent; break } z[m].parent = new CKEDITOR.dom.element(v.getName(), v.getDocument()) } for (m = p.getCustomData("listarray_index") + 1; m < z.length &&
                        z[m].indent > y; m++)z[m].indent += h; h = CKEDITOR.plugins.list.arrayToList(z, c, null, a.config.enterMode, g.getDirection()); if (!e.isIndent) { var F; if ((F = g.getParent()) && F.is("li")) for (var p = h.listNode.getChildren(), D = [], u, m = p.count() - 1; 0 <= m; m--)(u = p.getItem(m)) && u.is && u.is("li") && D.push(u) } h && h.listNode.replace(g); if (D && D.length) for (m = 0; m < D.length; m++) { for (u = g = D[m]; (u = u.getNext()) && u.is && u.getName() in d;)CKEDITOR.env.needsNbspFiller && !g.getFirst(f) && g.append(k.document.createText(" ")), g.append(u); g.insertAfter(F) } h &&
                            a.fire("contentDomInvalidated"); return !0
                } for (var e = this, c = this.database, d = this.context, k, m = a.getSelection(), m = (m && m.getRanges()).createIterator(); k = m.getNextRange();) {
                    for (var u = k.getCommonAncestor(); u && (u.type != CKEDITOR.NODE_ELEMENT || !d[u.getName()]);) { if (a.editable().equals(u)) { u = !1; break } u = u.getParent() } u || (u = k.startPath().contains(d)) && k.setEndAt(u, CKEDITOR.POSITION_BEFORE_END); if (!u) {
                        var p = k.getEnclosedNode(); p && p.type == CKEDITOR.NODE_ELEMENT && p.getName() in d && (k.setStartAt(p, CKEDITOR.POSITION_AFTER_START),
                            k.setEndAt(p, CKEDITOR.POSITION_BEFORE_END), u = p)
                    } u && k.startContainer.type == CKEDITOR.NODE_ELEMENT && k.startContainer.getName() in d && (p = new CKEDITOR.dom.walker(k), p.evaluator = h, k.startContainer = p.next()); u && k.endContainer.type == CKEDITOR.NODE_ELEMENT && k.endContainer.getName() in d && (p = new CKEDITOR.dom.walker(k), p.evaluator = h, k.endContainer = p.previous()); if (u) return b(u)
                } return 0
            } function h(a) { return a.type == CKEDITOR.NODE_ELEMENT && a.is("li") } function f(a) { return b(a) && d(a) } var b = CKEDITOR.dom.walker.whitespaces(!0),
                d = CKEDITOR.dom.walker.bookmark(!1, !0), m = CKEDITOR.TRISTATE_DISABLED, k = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add("indentlist", {
                    requires: "indent", init: function (b) {
                        function d(b) {
                            e.specificDefinition.apply(this, arguments); this.requiredContent = ["ul", "ol"]; b.on("key", function (a) { var e = b.elementPath(); if ("wysiwyg" == b.mode && a.data.keyCode == this.indentKey && e) { var d = this.getContext(e); !d || this.isIndent && CKEDITOR.plugins.indentList.firstItemInPath(this.context, e, d) || (b.execCommand(this.relatedGlobal), a.cancel()) } },
                                this); this.jobs[this.isIndent ? 10 : 30] = { refresh: this.isIndent ? function (a, b) { var e = this.getContext(b), c = CKEDITOR.plugins.indentList.firstItemInPath(this.context, b, e); return e && this.isIndent && !c ? k : m } : function (a, b) { return !this.getContext(b) || this.isIndent ? m : k }, exec: CKEDITOR.tools.bind(a, this) }
                        } var e = CKEDITOR.plugins.indent; e.registerCommands(b, { indentlist: new d(b, "indentlist", !0), outdentlist: new d(b, "outdentlist") }); CKEDITOR.tools.extend(d.prototype, e.specificDefinition.prototype, { context: { ol: 1, ul: 1 } })
                    }
                });
            CKEDITOR.plugins.indentList = {}; CKEDITOR.plugins.indentList.firstItemInPath = function (a, b, e) { var c = b.contains(h); e || (e = b.contains(a)); return e && c && c.equals(e.getFirst(h)) }
        })(); (function () {
            function a(a, d) {
                var f; if (d) f = a.getComputedStyle("text-align"); else { for (; !a.hasAttribute || !a.hasAttribute("align") && !a.getStyle("text-align");) { f = a.getParent(); if (!f) break; a = f } f = a.getStyle("text-align") || a.getAttribute("align") || "" } f && (f = f.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i, "")); !f && d && (f = "rtl" == a.getComputedStyle("direction") ?
                    "right" : "left"); return f
            } function h(a, d, f) {
                this.editor = a; this.name = d; this.value = f; this.context = "p"; d = a.config.justifyClasses; var h = a.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div"; if (d) { switch (f) { case "left": this.cssClassName = d[0]; break; case "center": this.cssClassName = d[1]; break; case "right": this.cssClassName = d[2]; break; case "justify": this.cssClassName = d[3] }this.cssClassRegex = new RegExp("(?:^|\\s+)(?:" + d.join("|") + ")(?\x3d$|\\s)"); this.requiredContent = h + "(" + this.cssClassName + ")" } else this.requiredContent =
                    h + "{text-align}"; this.allowedContent = { "caption div h1 h2 h3 h4 h5 h6 p pre td th li": { propertiesOnly: !0, styles: this.cssClassName ? null : "text-align", classes: this.cssClassName || null } }; a.config.enterMode == CKEDITOR.ENTER_BR && (this.allowedContent.div = !0)
            } function f(a) {
                var d = a.editor, f = d.createRange(); f.setStartBefore(a.data.node); f.setEndAfter(a.data.node); for (var h = new CKEDITOR.dom.walker(f), l; l = h.next();)if (l.type == CKEDITOR.NODE_ELEMENT) if (!l.equals(a.data.node) && l.getDirection()) f.setStartAfter(l), h =
                    new CKEDITOR.dom.walker(f); else { var g = d.config.justifyClasses; g && (l.hasClass(g[0]) ? (l.removeClass(g[0]), l.addClass(g[2])) : l.hasClass(g[2]) && (l.removeClass(g[2]), l.addClass(g[0]))); g = l.getStyle("text-align"); "left" == g ? l.setStyle("text-align", "right") : "right" == g && l.setStyle("text-align", "left") }
            } h.prototype = {
                exec: function (b) {
                    var d = b.getSelection(), f = b.config.enterMode; if (d) {
                        for (var h = d.createBookmarks(), l = d.getRanges(), g = this.cssClassName, e, c, n = b.config.useComputedState, r = l.length - 1; 0 <= r; r--)for (e =
                            l[r].createIterator(), e.enlargeBr = f != CKEDITOR.ENTER_BR; c = e.getNextParagraph(f == CKEDITOR.ENTER_P ? "p" : "div");)if (!c.isReadOnly()) {
                                var x = c.getName(), u; u = b.activeFilter.check(x + "{text-align}"); if ((x = b.activeFilter.check(x + "(" + g + ")")) || u) {
                                    c.removeAttribute("align"); c.removeStyle("text-align"); var p = g && (c.$.className = CKEDITOR.tools.ltrim(c.$.className.replace(this.cssClassRegex, ""))), t = this.state == CKEDITOR.TRISTATE_OFF && (!n || a(c, !0) != this.value); g && x ? t ? c.addClass(g) : p || c.removeAttribute("class") : t && u &&
                                        c.setStyle("text-align", this.value)
                                }
                            } b.focus(); b.forceNextSelectionCheck(); d.selectBookmarks(h)
                    }
                }, refresh: function (b, d) { var f = d.block || d.blockLimit, h = f.getName(), l = f.equals(b.editable()), h = this.cssClassName ? b.activeFilter.check(h + "(" + this.cssClassName + ")") : b.activeFilter.check(h + "{text-align}"); l && !CKEDITOR.dtd.$list[d.lastElement.getName()] ? this.setState(CKEDITOR.TRISTATE_OFF) : !l && h ? this.setState(a(f, this.editor.config.useComputedState) == this.value ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED) }
            };
            CKEDITOR.plugins.add("justify", {
                init: function (a) {
                    if (!a.blockless) {
                        var d = new h(a, "justifyleft", "left"), m = new h(a, "justifycenter", "center"), k = new h(a, "justifyright", "right"), l = new h(a, "justifyblock", "justify"); a.addCommand("justifyleft", d); a.addCommand("justifycenter", m); a.addCommand("justifyright", k); a.addCommand("justifyblock", l); a.ui.addButton && (a.ui.addButton("JustifyLeft", { isToggle: !0, label: a.lang.common.alignLeft, command: "justifyleft", toolbar: "align,10" }), a.ui.addButton("JustifyCenter", {
                            isToggle: !0,
                            label: a.lang.common.center, command: "justifycenter", toolbar: "align,20"
                        }), a.ui.addButton("JustifyRight", { isToggle: !0, label: a.lang.common.alignRight, command: "justifyright", toolbar: "align,30" }), a.ui.addButton("JustifyBlock", { isToggle: !0, label: a.lang.common.justify, command: "justifyblock", toolbar: "align,40" })); a.on("dirChanged", f)
                    }
                }
            })
        })(); CKEDITOR.plugins.add("menubutton", {
            requires: "button,menu", onLoad: function () {
                var a = function (a) {
                    var f = this._, b = CKEDITOR.document.getById(f.id), d = f.menu; f.state !== CKEDITOR.TRISTATE_DISABLED &&
                        (f.on && d ? d.hide() : (f.previousState = f.state, d || (d = f.menu = new CKEDITOR.menu(a, { panel: { className: "cke_menu_panel", attributes: { "aria-label": a.lang.common.options } } }), d.onHide = CKEDITOR.tools.bind(function () { var d = this.command ? a.getCommand(this.command).modes : this.modes; this.setState(!d || d[a.mode] ? f.previousState : CKEDITOR.TRISTATE_DISABLED); f.on = 0; b.setAttribute("aria-expanded", "false") }, this), this.onMenu && d.addListener(this.onMenu)), this.setState(CKEDITOR.TRISTATE_ON), f.on = 1, b.setAttribute("aria-expanded",
                            "true"), setTimeout(function () { d.show(CKEDITOR.document.getById(f.id), 4) }, 0)))
                }; CKEDITOR.ui.menuButton = CKEDITOR.tools.createClass({ base: CKEDITOR.ui.button, $: function (h) { delete h.panel; this.base(h); this.hasArrow = "menu"; this.click = a }, statics: { handler: { create: function (a) { return new CKEDITOR.ui.menuButton(a) } } } })
            }, beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_MENUBUTTON, CKEDITOR.ui.menuButton.handler) }
        }); CKEDITOR.UI_MENUBUTTON = "menubutton"; "use strict"; (function () {
            CKEDITOR.plugins.add("language",
                {
                    requires: "menubutton", init: function (a) {
                        var h = a.config.language_list || ["ar:Arabic:rtl", "fr:French", "es:Spanish"], f = this, b = a.lang.language, d = {}, m, k, l, g; a.addCommand("language", { allowedContent: "span[!lang,dir]", requiredContent: "span[lang]", contextSensitive: !0, exec: function (a, b) { var g = d["language_" + b]; if (g) a[g.style.checkActive(a.elementPath(), a) ? "removeStyle" : "applyStyle"](g.style) }, refresh: function (a) { this.setState(f.getCurrentLangElement(a) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) } }); for (g = 0; g <
                            h.length; g++)m = h[g].split(":"), k = m[0], l = "language_" + k, d[l] = { label: m[1], langId: k, group: "language", order: g, ltr: "rtl" != ("" + m[2]).toLowerCase(), onClick: function () { a.execCommand("language", this.langId) }, role: "menuitemcheckbox" }, d[l].style = new CKEDITOR.style({ element: "span", attributes: { lang: k, dir: d[l].ltr ? "ltr" : "rtl" } }); d.language_remove = {
                                label: b.remove, group: "language_remove", state: CKEDITOR.TRISTATE_DISABLED, order: d.length, onClick: function () {
                                    var b = f.getCurrentLangElement(a); b && a.execCommand("language",
                                        b.getAttribute("lang"))
                                }
                            }; a.addMenuGroup("language", 1); a.addMenuGroup("language_remove"); a.addMenuItems(d); a.ui.add("Language", CKEDITOR.UI_MENUBUTTON, {
                                label: b.button, allowedContent: "span[!lang,dir]", requiredContent: "span[lang]", toolbar: "bidi,30", command: "language", contentTransformations: [[{
                                    element: "span", left: function (a) { return a.attributes.lang && (!a.attributes.dir || "" === a.attributes.dir) }, right: function (a) {
                                        var b = CKEDITOR.tools.object.keys(CKEDITOR.lang.rtl), b = -1 !== CKEDITOR.tools.array.indexOf(b,
                                            a.attributes.lang) ? "rtl" : "ltr"; a.attributes.dir = b
                                    }
                                }]], onMenu: function () { var b = {}, c = f.getCurrentLangElement(a), g; for (g in d) b[g] = CKEDITOR.TRISTATE_OFF; b.language_remove = c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED; c && (b["language_" + c.getAttribute("lang")] = CKEDITOR.TRISTATE_ON); return b }
                            }); a.addRemoveFormatFilter && a.addRemoveFormatFilter(function (a) { return !(a.is("span") && a.getAttribute("dir") && a.getAttribute("lang")) })
                    }, getCurrentLangElement: function (a) {
                        var h = a.elementPath(); a = h && h.elements; var f;
                        if (h) for (var b = 0; b < a.length; b++)h = a[b], !f && "span" == h.getName() && h.hasAttribute("lang") && (f = h); return f
                    }
                })
        })(); "use strict"; (function () {
            function a(a) { return a.replace(/'/g, "\\$\x26") } function h(a) { for (var b = a.length, e = [], c, d = 0; d < b; d++)c = a.charCodeAt(d), e.push(c); return "String.fromCharCode(" + e.join(",") + ")" } function f(b, e) {
                for (var c = b.plugins.link, d = c.compiledProtectionFunction.params, c = [c.compiledProtectionFunction.name, "("], g, f, h = 0; h < d.length; h++)g = d[h].toLowerCase(), f = e[g], 0 < h && c.push(","), c.push("'",
                    f ? a(encodeURIComponent(e[g])) : "", "'"); c.push(")"); return c.join("")
            } function b(a) { a = a.config.emailProtection || ""; var b; a && "encode" != a && (b = {}, a.replace(/^([^(]+)\(([^)]+)\)$/, function (a, e, c) { b.name = e; b.params = []; c.replace(/[^,\s]+/g, function (a) { b.params.push(a) }) })); return b } CKEDITOR.plugins.add("link", {
                requires: "dialog,fakeobjects", onLoad: function () {
                    function a(b) { return e.replace(/%1/g, "rtl" == b ? "right" : "left").replace(/%2/g, "cke_contents_" + b) } var b = "background:url(" + CKEDITOR.getUrl(this.path + "images" +
                        (CKEDITOR.env.hidpi ? "/hidpi" : "") + "/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;background-size:16px;", e = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" + b + "padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{" + b + "width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}"; CKEDITOR.addCss(a("ltr") + a("rtl"))
                }, init: function (a) {
                    var e = "a[!href]"; CKEDITOR.dialog.isTabEnabled(a, "link", "advanced") && (e = e.replace("]", ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type,download]{*}(*)"));
                    CKEDITOR.dialog.isTabEnabled(a, "link", "target") && (e = e.replace("]", ",target,onclick]")); a.addCommand("link", new CKEDITOR.dialogCommand("link", { allowedContent: e, requiredContent: "a[href]" })); a.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", { allowedContent: "a[!name,id]", requiredContent: "a[name]" })); a.addCommand("unlink", new CKEDITOR.unlinkCommand); a.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand); a.setKeystroke(CKEDITOR.CTRL + 76, "link"); a.setKeystroke(CKEDITOR.CTRL + 75, "link"); a.ui.addButton &&
                        (a.ui.addButton("Link", { label: a.lang.link.toolbar, command: "link", toolbar: "links,10" }), a.ui.addButton("Unlink", { label: a.lang.link.unlink, command: "unlink", toolbar: "links,20" }), a.ui.addButton("Anchor", { label: a.lang.link.anchor.toolbar, command: "anchor", toolbar: "links,30" })); CKEDITOR.dialog.add("link", this.path + "dialogs/link.js"); CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js"); a.on("doubleclick", function (b) {
                            var e = b.data.element.getAscendant({ a: 1, img: 1 }, !0); e && !e.isReadOnly() && (e.is("a") ? (b.data.dialog =
                                !e.getAttribute("name") || e.getAttribute("href") && e.getChildCount() ? "link" : "anchor", b.data.link = e) : CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, e) && (b.data.dialog = "anchor"))
                        }, null, null, 0); a.on("doubleclick", function (b) { b.data.dialog in { link: 1, anchor: 1 } && b.data.link && a.getSelection().selectElement(b.data.link) }, null, null, 20); a.addMenuItems && a.addMenuItems({
                            anchor: { label: a.lang.link.anchor.menu, command: "anchor", group: "anchor", order: 1 }, removeAnchor: {
                                label: a.lang.link.anchor.remove, command: "removeAnchor",
                                group: "anchor", order: 5
                            }, link: { label: a.lang.link.menu, command: "link", group: "link", order: 1 }, unlink: { label: a.lang.link.unlink, command: "unlink", group: "link", order: 5 }
                        }); a.contextMenu && a.contextMenu.addListener(function (b) {
                            if (!b || b.isReadOnly()) return null; b = CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, b); if (!b && !(b = CKEDITOR.plugins.link.getSelectedLink(a))) return null; var e = {}; b.getAttribute("href") && b.getChildCount() && (e = { link: CKEDITOR.TRISTATE_OFF, unlink: CKEDITOR.TRISTATE_OFF }); b && b.hasAttribute("name") &&
                                (e.anchor = e.removeAnchor = CKEDITOR.TRISTATE_OFF); return e
                        }); this.compiledProtectionFunction = b(a)
                }, afterInit: function (a) { a.dataProcessor.dataFilter.addRules({ elements: { a: function (b) { return b.attributes.name ? b.children.length ? null : a.createFakeParserElement(b, "cke_anchor", "anchor") : null } } }); var b = a._.elementsPath && a._.elementsPath.filters; b && b.push(function (b, e) { if ("a" == e && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, b) || b.getAttribute("name") && (!b.getAttribute("href") || !b.getChildCount()))) return "anchor" }) }
            });
            var d = /^javascript:/, m = /^(?:mailto)(?:(?!\?(subject|body)=).)+/i, k = /subject=([^;?:@&=$,\/]*)/i, l = /body=([^;?:@&=$,\/]*)/i, g = /^#(.*)$/, e = /^((?:http|https|ftp|news):\/\/)?(.*)$/, c = /^(_(?:self|top|parent|blank))$/, n = /^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/, r = /^javascript:([^(]+)\(([^)]+)\)$/, x = /\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/, u = /(?:^|,)([^=]+)=(\d+|yes|no)/gi, p = /^tel:(.*)$/, t = {
                id: "advId",
                dir: "advLangDir", accessKey: "advAccessKey", name: "advName", lang: "advLangCode", tabindex: "advTabIndex", title: "advTitle", type: "advContentType", "class": "advCSSClasses", charset: "advCharset", style: "advStyles", rel: "advRel"
            }; CKEDITOR.plugins.link = {
                getSelectedLink: function (a, b) {
                    var e = a.getSelection(), c = e.getSelectedElement(), d = e.getRanges(), g = [], f; if (!b && c && c.is("a")) return c; for (c = 0; c < d.length; c++)if (f = e.getRanges()[c], f.shrink(CKEDITOR.SHRINK_ELEMENT, !0, { skipBogus: !0 }), (f = a.elementPath(f.getCommonAncestor()).contains("a",
                        1)) && b) g.push(f); else if (f) return f; return b ? g : null
                }, getEditorAnchors: function (a) { for (var b = a.editable(), e = b.isInline() && !a.plugins.divarea ? a.document : b, b = e.getElementsByTag("a"), e = e.getElementsByTag("img"), c = [], d = 0, g; g = b.getItem(d++);)(g.data("cke-saved-name") || g.hasAttribute("name")) && c.push({ name: g.data("cke-saved-name") || g.getAttribute("name"), id: g.getAttribute("id") }); for (d = 0; g = e.getItem(d++);)(g = this.tryRestoreFakeAnchor(a, g)) && c.push({ name: g.getAttribute("name"), id: g.getAttribute("id") }); return c },
                fakeAnchor: !0, tryRestoreFakeAnchor: function (a, b) { if (b && b.data("cke-real-element-type") && "anchor" == b.data("cke-real-element-type")) { var e = a.restoreRealElement(b); if (e.data("cke-saved-name")) return e } }, parseLinkAttributes: function (a, b) {
                    var f = b && (b.data("cke-saved-href") || b.getAttribute("href")) || "", h = a.plugins.link.compiledProtectionFunction, y = a.config.emailProtection, v = {}, C; f.match(d) && ("encode" == y ? f = f.replace(n, function (a, b, e) {
                        e = e || ""; return "mailto:" + String.fromCharCode.apply(String, b.split(",")) +
                            e.replace(/\\'/g, "'")
                    }) : y && f.replace(r, function (a, b, e) { if (b == h.name) { v.type = "email"; a = v.email = {}; b = /(^')|('$)/g; e = e.match(/[^,\s]+/g); for (var c = e.length, d, g, f = 0; f < c; f++)d = decodeURIComponent, g = e[f].replace(b, "").replace(/\\'/g, "'"), g = d(g), d = h.params[f].toLowerCase(), a[d] = g; a.address = [a.name, a.domain].join("@") } })); if (!v.type) if (y = f.match(g)) v.type = "anchor", v.anchor = {}, v.anchor.name = v.anchor.id = y[1]; else if (y = f.match(p)) v.type = "tel", v.tel = y[1]; else if (y = f.match(m)) {
                        C = f.match(k); var f = f.match(l), F = v.email =
                            {}; v.type = "email"; F.address = y[0].replace("mailto:", ""); C && (F.subject = decodeURIComponent(C[1])); f && (F.body = decodeURIComponent(f[1]))
                    } else f && (C = f.match(e)) && (v.type = "url", v.url = {}, v.url.protocol = C[1], v.url.url = C[2]); if (b) {
                        if (f = b.getAttribute("target")) v.target = { type: f.match(c) ? f : "frame", name: f }; else if (f = (f = b.data("cke-pa-onclick") || b.getAttribute("onclick")) && f.match(x)) for (v.target = { type: "popup", name: f[1] }; y = u.exec(f[2]);)"yes" != y[2] && "1" != y[2] || y[1] in { height: 1, width: 1, top: 1, left: 1 } ? isFinite(y[2]) &&
                            (v.target[y[1]] = y[2]) : v.target[y[1]] = !0; null !== b.getAttribute("download") && (v.download = !0); var f = {}, D; for (D in t) (y = b.getAttribute(D)) && (f[t[D]] = y); if (D = b.data("cke-saved-name") || f.advName) f.advName = D; CKEDITOR.tools.isEmpty(f) || (v.advanced = f)
                    } return v
                }, getLinkAttributes: function (b, e) {
                    var c = b.config.emailProtection || "", d = {}; switch (e.type) {
                        case "url": var c = e.url && void 0 !== e.url.protocol ? e.url.protocol : "http://", g = e.url && CKEDITOR.tools.trim(e.url.url) || ""; d["data-cke-saved-href"] = 0 === g.indexOf("/") ?
                            g : c + g; break; case "anchor": c = e.anchor && e.anchor.id; d["data-cke-saved-href"] = "#" + (e.anchor && e.anchor.name || c || ""); break; case "email": var k = e.email, g = k.address; switch (c) {
                                case "": case "encode": var l = encodeURIComponent(k.subject || ""), m = encodeURIComponent(k.body || ""), k = []; l && k.push("subject\x3d" + l); m && k.push("body\x3d" + m); k = k.length ? "?" + k.join("\x26") : ""; "encode" == c ? (c = ["javascript:void(location.href\x3d'mailto:'+", h(g)], k && c.push("+'", a(k), "'"), c.push(")")) : c = ["mailto:", g, k]; break; default: c = g.split("@",
                                    2), k.name = c[0], k.domain = c[1], c = ["javascript:", f(b, k)]
                            }d["data-cke-saved-href"] = c.join(""); break; case "tel": d["data-cke-saved-href"] = "tel:" + e.tel
                    }if (e.target) if ("popup" == e.target.type) {
                        for (var c = ["window.open(this.href, '", e.target.name || "", "', '"], n = "resizable status location toolbar menubar fullscreen scrollbars dependent".split(" "), g = n.length, l = function (a) { e.target[a] && n.push(a + "\x3d" + e.target[a]) }, k = 0; k < g; k++)n[k] += e.target[n[k]] ? "\x3dyes" : "\x3dno"; l("width"); l("left"); l("height"); l("top"); c.push(n.join(","),
                            "'); return false;"); d["data-cke-pa-onclick"] = c.join("")
                    } else "notSet" != e.target.type && e.target.name && (d.target = e.target.name); e.download && (d.download = ""); if (e.advanced) { for (var p in t) (c = e.advanced[t[p]]) && (d[p] = c); d.name && (d["data-cke-saved-name"] = d.name) } d["data-cke-saved-href"] && (d.href = d["data-cke-saved-href"]); p = { target: 1, onclick: 1, "data-cke-pa-onclick": 1, "data-cke-saved-name": 1, download: 1 }; e.advanced && CKEDITOR.tools.extend(p, t); for (var r in d) delete p[r]; return { set: d, removed: CKEDITOR.tools.object.keys(p) }
                },
                showDisplayTextForElement: function (a, b) { var e = { img: 1, table: 1, tbody: 1, thead: 1, tfoot: 1, input: 1, select: 1, textarea: 1 }, c = b.getSelection(); return b.widgets && b.widgets.focused || c && 1 < c.getRanges().length ? !1 : !a || !a.getName || !a.is(e) }
            }; CKEDITOR.unlinkCommand = function () { }; CKEDITOR.unlinkCommand.prototype = {
                exec: function (a) {
                    if (CKEDITOR.env.ie) {
                        var b = a.getSelection().getRanges()[0], e = b.getPreviousEditableNode() && b.getPreviousEditableNode().getAscendant("a", !0) || b.getNextEditableNode() && b.getNextEditableNode().getAscendant("a",
                            !0), c; b.collapsed && e && (c = b.createBookmark(), b.selectNodeContents(e), b.select())
                    } e = new CKEDITOR.style({ element: "a", type: CKEDITOR.STYLE_INLINE, alwaysRemoveElement: 1 }); a.removeStyle(e); c && (b.moveToBookmark(c), b.select())
                }, refresh: function (a, b) { var e = b.lastElement && b.lastElement.getAscendant("a", !0); e && "a" == e.getName() && e.getAttribute("href") && e.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED) }, contextSensitive: 1, startDisabled: 1, requiredContent: "a[href]",
                editorFocus: 1
            }; CKEDITOR.removeAnchorCommand = function () { }; CKEDITOR.removeAnchorCommand.prototype = { exec: function (a) { var b = a.getSelection(), e = b.createBookmarks(), c; if (b && (c = b.getSelectedElement()) && (c.getChildCount() ? c.is("a") : CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, c))) c.remove(1); else if (c = CKEDITOR.plugins.link.getSelectedLink(a)) c.hasAttribute("href") ? (c.removeAttributes({ name: 1, "data-cke-saved-name": 1 }), c.removeClass("cke_anchor")) : c.remove(1); b.selectBookmarks(e) }, requiredContent: "a[name]" };
            CKEDITOR.tools.extend(CKEDITOR.config, { linkShowAdvancedTab: !0, linkShowTargetTab: !0, linkDefaultProtocol: "http://" })
        })(); (function () {
            function a(a, b, e, c) {
                for (var d = CKEDITOR.plugins.list.listToArray(b.root, e), g = [], f = 0; f < b.contents.length; f++) { var h = b.contents[f]; (h = h.getAscendant("li", !0)) && !h.getCustomData("list_item_processed") && (g.push(h), CKEDITOR.dom.element.setMarker(e, h, "list_item_processed", !0)) } for (var h = b.root.getDocument(), k, l, f = 0; f < g.length; f++) {
                    var m = g[f].getCustomData("listarray_index");
                    k = d[m].parent; k.is(this.type) || (l = h.createElement(this.type), k.copyAttributes(l, { start: 1, type: 1 }), l.removeStyle("list-style-type"), d[m].parent = l)
                } e = CKEDITOR.plugins.list.arrayToList(d, e, null, a.config.enterMode); for (var n, d = e.listNode.getChildCount(), f = 0; f < d && (n = e.listNode.getChild(f)); f++)n.getName() == this.type && c.push(n); e.listNode.replace(b.root); a.fire("contentDomInvalidated")
            } function h(a, b, e) {
                var c = b.contents, d = b.root.getDocument(), g = []; if (1 == c.length && c[0].equals(b.root)) {
                    var f = d.createElement("div");
                    c[0].moveChildren && c[0].moveChildren(f); c[0].append(f); c[0] = f
                } b = b.contents[0].getParent(); for (f = 0; f < c.length; f++)b = b.getCommonAncestor(c[f].getParent()); a = a.config.useComputedState; for (var h, k, f = 0; f < c.length; f++)for (var l = c[f], m; m = l.getParent();) { if (m.equals(b)) { g.push(l); !k && l.getDirection() && (k = 1); l = l.getDirection(a); null !== h && (h = h && h != l ? null : l); break } l = m } if (!(1 > g.length)) {
                    c = g[g.length - 1].getNext(); f = d.createElement(this.type); for (e.push(f); g.length;)e = g.shift(), a = d.createElement("li"), l = e, l.is("pre") ||
                        u.test(l.getName()) || "false" == l.getAttribute("contenteditable") ? e.appendTo(a) : (e.copyAttributes(a), h && e.getDirection() && (a.removeStyle("direction"), a.removeAttribute("dir")), e.moveChildren(a), e.remove()), a.appendTo(f); h && k && f.setAttribute("dir", h); c ? f.insertBefore(c) : f.appendTo(b)
                }
            } function f(a, b, e) {
                function c(e) {
                    if (!(!(l = k[e ? "getFirst" : "getLast"]()) || l.is && l.isBlockBoundary() || !(m = b.root[e ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(!0))) || m.is && m.isBlockBoundary({ br: 1 }))) a.document.createElement("br")[e ?
                        "insertBefore" : "insertAfter"](l)
                } for (var d = CKEDITOR.plugins.list.listToArray(b.root, e), g = [], f = 0; f < b.contents.length; f++) { var h = b.contents[f]; (h = h.getAscendant("li", !0)) && !h.getCustomData("list_item_processed") && (g.push(h), CKEDITOR.dom.element.setMarker(e, h, "list_item_processed", !0)) } h = null; for (f = 0; f < g.length; f++)h = g[f].getCustomData("listarray_index"), d[h].indent = -1; for (f = h + 1; f < d.length; f++)if (d[f].indent > d[f - 1].indent + 1) {
                    g = d[f - 1].indent + 1 - d[f].indent; for (h = d[f].indent; d[f] && d[f].indent >= h;)d[f].indent +=
                        g, f++; f--
                } var k = CKEDITOR.plugins.list.arrayToList(d, e, null, a.config.enterMode, b.root.getAttribute("dir")).listNode, l, m; c(!0); c(); k.replace(b.root); a.fire("contentDomInvalidated")
            } function b(a, b) { this.name = a; this.context = this.type = b; this.allowedContent = b + " li"; this.requiredContent = b } function d(a, b, e, c) { for (var d, g; d = a[c ? "getLast" : "getFirst"](p);)(g = d.getDirection(1)) !== b.getDirection(1) && d.setAttribute("dir", g), d.remove(), e ? d[c ? "insertBefore" : "insertAfter"](e) : b.append(d, c), e = d } function m(a) {
                function b(e) {
                    var c =
                        a[e ? "getPrevious" : "getNext"](r); c && c.type == CKEDITOR.NODE_ELEMENT && c.is(a.getName()) && (d(a, c, null, !e), a.remove(), a = c)
                } b(); b(1)
            } function k(a) { return a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in CKEDITOR.dtd.$block || a.getName() in CKEDITOR.dtd.$listItem) && CKEDITOR.dtd[a.getName()]["#"] } function l(a, b, e) {
                a.fire("saveSnapshot"); e.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS); var c = e.extractContents(); b.trim(!1, !0); var f = b.createBookmark(), h = new CKEDITOR.dom.elementPath(b.startContainer), k = h.block, h = h.lastElement.getAscendant("li",
                    1) || k, l = new CKEDITOR.dom.elementPath(e.startContainer), n = l.contains(CKEDITOR.dtd.$listItem), l = l.contains(CKEDITOR.dtd.$list); k ? (k = k.getBogus()) && k.remove() : l && (k = l.getPrevious(r)) && x(k) && k.remove(); (k = c.getLast()) && k.type == CKEDITOR.NODE_ELEMENT && k.is("br") && k.remove(); (k = b.startContainer.getChild(b.startOffset)) ? c.insertBefore(k) : b.startContainer.append(c); n && (c = g(n)) && (h.contains(n) ? (d(c, n.getParent(), n), c.remove()) : h.append(c)); for (; e.checkStartOfBlock() && e.checkEndOfBlock();) {
                        l = e.startPath(); c =
                            l.block; if (!c) break; c.is("li") && (h = c.getParent(), c.equals(h.getLast(r)) && c.equals(h.getFirst(r)) && (c = h)); e.moveToPosition(c, CKEDITOR.POSITION_BEFORE_START); c.remove()
                    } e = e.clone(); c = a.editable(); e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END); e = new CKEDITOR.dom.walker(e); e.evaluator = function (a) { return r(a) && !x(a) }; (e = e.next()) && e.type == CKEDITOR.NODE_ELEMENT && e.getName() in CKEDITOR.dtd.$list && m(e); b.moveToBookmark(f); b.select(); a.fire("saveSnapshot")
            } function g(a) {
                return (a = a.getLast(r)) && a.type == CKEDITOR.NODE_ELEMENT &&
                    a.getName() in e ? a : null
            } var e = { ol: 1, ul: 1 }, c = CKEDITOR.dom.walker.whitespaces(), n = CKEDITOR.dom.walker.bookmark(), r = function (a) { return !(c(a) || n(a)) }, x = CKEDITOR.dom.walker.bogus(); CKEDITOR.plugins.list = {
                listToArray: function (a, b, c, d, g) {
                    if (!e[a.getName()]) return []; d || (d = 0); c || (c = []); for (var f = 0, h = a.getChildCount(); f < h; f++) {
                        var k = a.getChild(f); k.type == CKEDITOR.NODE_ELEMENT && k.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(k, b, c, d + 1); if ("li" == k.$.nodeName.toLowerCase()) {
                            var l = {
                                parent: a,
                                indent: d, element: k, contents: []
                            }; g ? l.grandparent = g : (l.grandparent = a.getParent(), l.grandparent && "li" == l.grandparent.$.nodeName.toLowerCase() && (l.grandparent = l.grandparent.getParent())); b && CKEDITOR.dom.element.setMarker(b, k, "listarray_index", c.length); c.push(l); for (var m = 0, n = k.getChildCount(), p; m < n; m++)p = k.getChild(m), p.type == CKEDITOR.NODE_ELEMENT && e[p.getName()] ? CKEDITOR.plugins.list.listToArray(p, b, c, d + 1, l.grandparent) : l.contents.push(p)
                        }
                    } return c
                }, arrayToList: function (a, b, c, d, g) {
                    c || (c = 0); if (!a || a.length <
                        c + 1) return null; for (var f, h = a[c].parent.getDocument(), k = new CKEDITOR.dom.documentFragment(h), l = null, m = c, p = Math.max(a[c].indent, 0), u = null, x, w, S = d == CKEDITOR.ENTER_P ? "p" : "div"; ;) {
                            var I = a[m]; f = I.grandparent; x = I.element.getDirection(1); if (I.indent == p) { l && a[m].parent.getName() == l.getName() || (l = a[m].parent.clone(!1, 1), g && l.setAttribute("dir", g), k.append(l)); u = l.append(I.element.clone(0, 1)); x != l.getDirection(1) && u.setAttribute("dir", x); for (f = 0; f < I.contents.length; f++)u.append(I.contents[f].clone(1, 1)); m++ } else if (I.indent ==
                                Math.max(p, 0) + 1) I = a[m - 1].element.getDirection(1), m = CKEDITOR.plugins.list.arrayToList(a, null, m, d, I != x ? x : null), !u.getChildCount() && CKEDITOR.env.needsNbspFiller && 7 >= h.$.documentMode && u.append(h.createText(" ")), u.append(m.listNode), m = m.nextIndex; else if (-1 == I.indent && !c && f) {
                                    e[f.getName()] ? (u = I.element.clone(!1, !0), x != f.getDirection(1) && u.setAttribute("dir", x)) : u = new CKEDITOR.dom.documentFragment(h); var l = f.getDirection(1) != x, E = I.element, P = E.getAttribute("class"), M = E.getAttribute("style"), O = u.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT &&
                                        (d != CKEDITOR.ENTER_BR || l || M || P), N, X = I.contents.length, T; for (f = 0; f < X; f++)if (N = I.contents[f], n(N) && 1 < X) O ? T = N.clone(1, 1) : u.append(N.clone(1, 1)); else if (N.type == CKEDITOR.NODE_ELEMENT && N.isBlockBoundary()) { l && !N.getDirection() && N.setAttribute("dir", x); w = N; var Y = E.getAttribute("style"); Y && w.setAttribute("style", Y.replace(/([^;])$/, "$1;") + (w.getAttribute("style") || "")); P && N.addClass(P); w = null; T && (u.append(T), T = null); u.append(N.clone(1, 1)) } else O ? (w || (w = h.createElement(S), u.append(w), l && w.setAttribute("dir",
                                            x)), M && w.setAttribute("style", M), P && w.setAttribute("class", P), T && (w.append(T), T = null), w.append(N.clone(1, 1))) : u.append(N.clone(1, 1)); T && ((w || u).append(T), T = null); u.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && m != a.length - 1 && (CKEDITOR.env.needsBrFiller && (x = u.getLast()) && x.type == CKEDITOR.NODE_ELEMENT && x.is("br") && x.remove(), (x = u.getLast(r)) && x.type == CKEDITOR.NODE_ELEMENT && x.is(CKEDITOR.dtd.$block) || u.append(h.createElement("br"))); x = u.$.nodeName.toLowerCase(); "div" != x && "p" != x || u.appendBogus(); k.append(u);
                                    l = null; m++
                                } else return null; w = null; if (a.length <= m || Math.max(a[m].indent, 0) < p) break
                        } if (b) for (a = k.getFirst(); a;) { if (a.type == CKEDITOR.NODE_ELEMENT && (CKEDITOR.dom.element.clearMarkers(b, a), a.getName() in CKEDITOR.dtd.$listItem && (c = a, h = g = d = void 0, d = c.getDirection()))) { for (g = c.getParent(); g && !(h = g.getDirection());)g = g.getParent(); d == h && c.removeAttribute("dir") } a = a.getNextSourceNode() } return { listNode: k, nextIndex: m }
                }
            }; var u = /^h[1-6]$/, p = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT); b.prototype = {
                exec: function (b) {
                    function c(a) {
                        return e[a.root.getName()] &&
                            !d(a.root, [CKEDITOR.NODE_COMMENT])
                    } function d(a, b) { return CKEDITOR.tools.array.filter(a.getChildren().toArray(), function (a) { return -1 === CKEDITOR.tools.array.indexOf(b, a.type) }).length } function g(a) { var b = !0; if (0 === a.getChildCount()) return !1; a.forEach(function (a) { if (a.type !== CKEDITOR.NODE_COMMENT) return b = !1 }, null, !0); return b } this.refresh(b, b.elementPath()); var k = b.config, l = b.getSelection(), n = l && l.getRanges(); if (this.state == CKEDITOR.TRISTATE_OFF) {
                        var p = b.editable(); if (p.getFirst(r)) {
                            var u = 1 == n.length &&
                                n[0]; (k = u && u.getEnclosedNode()) && k.is && this.type == k.getName() && this.setState(CKEDITOR.TRISTATE_ON)
                        } else k.enterMode == CKEDITOR.ENTER_BR ? p.appendBogus() : n[0].fixBlock(1, k.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), l.selectRanges(n)
                    } for (var k = l.createBookmarks(!0), p = [], D = {}, n = n.createIterator(), x = 0; (u = n.getNextRange()) && ++x;) {
                        var w = u.getBoundaryNodes(), L = w.startNode, K = w.endNode; L.type == CKEDITOR.NODE_ELEMENT && "td" == L.getName() && u.setStartAt(w.startNode, CKEDITOR.POSITION_AFTER_START); K.type == CKEDITOR.NODE_ELEMENT &&
                            "td" == K.getName() && u.setEndAt(w.endNode, CKEDITOR.POSITION_BEFORE_END); u = u.createIterator(); for (u.forceBrBreak = this.state == CKEDITOR.TRISTATE_OFF; w = u.getNextParagraph();)if (!w.getCustomData("list_block") && !g(w)) {
                                CKEDITOR.dom.element.setMarker(D, w, "list_block", 1); for (var S = b.elementPath(w), L = S.elements, K = 0, S = S.blockLimit, I, E = L.length - 1; 0 <= E && (I = L[E]); E--)if (e[I.getName()] && S.contains(I)) {
                                    S.removeCustomData("list_group_object_" + x); (L = I.getCustomData("list_group_object")) ? L.contents.push(w) : (L = {
                                        root: I,
                                        contents: [w]
                                    }, p.push(L), CKEDITOR.dom.element.setMarker(D, I, "list_group_object", L)); K = 1; break
                                } K || (K = S, K.getCustomData("list_group_object_" + x) ? K.getCustomData("list_group_object_" + x).contents.push(w) : (L = { root: K, contents: [w] }, CKEDITOR.dom.element.setMarker(D, K, "list_group_object_" + x, L), p.push(L)))
                            }
                    } for (I = []; 0 < p.length;)L = p.shift(), this.state == CKEDITOR.TRISTATE_OFF ? c(L) || (e[L.root.getName()] ? a.call(this, b, L, D, I) : h.call(this, b, L, I)) : this.state == CKEDITOR.TRISTATE_ON && e[L.root.getName()] && !c(L) && f.call(this,
                        b, L, D); for (E = 0; E < I.length; E++)m(I[E]); CKEDITOR.dom.element.clearAllMarkers(D); l.selectBookmarks(k); b.focus()
                }, refresh: function (a, b) { var c = b.contains(e, 1), d = b.blockLimit || b.root; c && d.contains(c) ? this.setState(c.is(this.type) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF) }
            }; CKEDITOR.plugins.add("list", {
                requires: "indentlist", init: function (a) {
                    a.blockless || (a.addCommand("numberedlist", new b("numberedlist", "ol")), a.addCommand("bulletedlist", new b("bulletedlist", "ul")),
                        a.ui.addButton && (a.ui.addButton("NumberedList", { isToggle: !0, label: a.lang.list.numberedlist, command: "numberedlist", directional: !0, toolbar: "list,10" }), a.ui.addButton("BulletedList", { isToggle: !0, label: a.lang.list.bulletedlist, command: "bulletedlist", directional: !0, toolbar: "list,20" })), a.on("key", function (b) {
                            var c = b.data.domEvent.getKey(), d; if ("wysiwyg" == a.mode && c in { 8: 1, 46: 1 }) {
                                var f = a.getSelection().getRanges()[0], h = f && f.startPath(); if (f && f.collapsed) {
                                    var m = 8 == c, n = a.editable(), p = new CKEDITOR.dom.walker(f.clone());
                                    p.evaluator = function (a) { return r(a) && !x(a) }; p.guard = function (a, b) { return !(b && a.type == CKEDITOR.NODE_ELEMENT && a.is("table")) }; c = f.clone(); if (m) {
                                        var u; (u = h.contains(e)) && f.checkBoundaryOfElement(u, CKEDITOR.START) && (u = u.getParent()) && u.is("li") && (u = g(u)) ? (d = u, u = u.getPrevious(r), c.moveToPosition(u && x(u) ? u : d, CKEDITOR.POSITION_BEFORE_START)) : (p.range.setStartAt(n, CKEDITOR.POSITION_AFTER_START), p.range.setEnd(f.startContainer, f.startOffset), (u = p.previous()) && u.type == CKEDITOR.NODE_ELEMENT && (u.getName() in e ||
                                            u.is("li")) && (u.is("li") || (p.range.selectNodeContents(u), p.reset(), p.evaluator = k, u = p.previous()), d = u, c.moveToElementEditEnd(d), c.moveToPosition(c.endPath().block, CKEDITOR.POSITION_BEFORE_END))); if (d) l(a, c, f), b.cancel(); else { var w = h.contains(e); w && f.checkBoundaryOfElement(w, CKEDITOR.START) && (d = w.getFirst(r), f.checkBoundaryOfElement(d, CKEDITOR.START) && (u = w.getPrevious(r), g(d) ? u && (f.moveToElementEditEnd(u), f.select()) : a.execCommand("outdent"), b.cancel())) }
                                    } else if (d = h.contains("li")) {
                                        if (p.range.setEndAt(n,
                                            CKEDITOR.POSITION_BEFORE_END), m = (n = d.getLast(r)) && k(n) ? n : d, h = 0, (u = p.next()) && u.type == CKEDITOR.NODE_ELEMENT && u.getName() in e && u.equals(n) ? (h = 1, u = p.next()) : f.checkBoundaryOfElement(m, CKEDITOR.END) && (h = 2), h && u) {
                                            f = f.clone(); f.moveToElementEditStart(u); if (1 == h && (c.optimize(), !c.startContainer.equals(d))) { for (d = c.startContainer; d.is(CKEDITOR.dtd.$inline);)w = d, d = d.getParent(); w && c.moveToPosition(w, CKEDITOR.POSITION_AFTER_END) } 2 == h && (c.moveToPosition(c.endPath().block, CKEDITOR.POSITION_BEFORE_END), f.endPath().block &&
                                                f.moveToPosition(f.endPath().block, CKEDITOR.POSITION_AFTER_START)); l(a, c, f); b.cancel()
                                        }
                                    } else p.range.setEndAt(n, CKEDITOR.POSITION_BEFORE_END), (u = p.next()) && u.type == CKEDITOR.NODE_ELEMENT && u.is(e) && (u = u.getFirst(r), h.block && f.checkStartOfBlock() && f.checkEndOfBlock() ? (h.block.remove(), f.moveToElementEditStart(u), f.select()) : g(u) ? (f.moveToElementEditStart(u), f.select()) : (f = f.clone(), f.moveToElementEditStart(u), l(a, c, f)), b.cancel()); setTimeout(function () { a.selectionChange(1) })
                                }
                            }
                        }))
                }
            })
        })(); (function () {
            CKEDITOR.plugins.liststyle =
            {
                requires: "dialog,contextmenu", init: function (a) {
                    if (!a.blockless) {
                        var h; h = new CKEDITOR.dialogCommand("numberedListStyle", { requiredContent: "ol", allowedContent: "ol{list-style-type}[start]; li{list-style-type}[value]", contentTransformations: [["ol: listTypeToStyle"]] }); h = a.addCommand("numberedListStyle", h); a.addFeature(h); CKEDITOR.dialog.add("numberedListStyle", this.path + "dialogs/liststyle.js"); h = new CKEDITOR.dialogCommand("bulletedListStyle", {
                            requiredContent: "ul", allowedContent: "ul{list-style-type}",
                            contentTransformations: [["ul: listTypeToStyle"]]
                        }); h = a.addCommand("bulletedListStyle", h); a.addFeature(h); CKEDITOR.dialog.add("bulletedListStyle", this.path + "dialogs/liststyle.js"); a.addMenuGroup("list", 108); a.addMenuItems({ numberedlist: { label: a.lang.liststyle.numberedTitle, group: "list", command: "numberedListStyle" }, bulletedlist: { label: a.lang.liststyle.bulletedTitle, group: "list", command: "bulletedListStyle" } }); a.contextMenu.addListener(function (a) {
                            if (!a || a.isReadOnly()) return null; for (; a;) {
                                var b = a.getName();
                                if ("ol" == b) return { numberedlist: CKEDITOR.TRISTATE_OFF }; if ("ul" == b) return { bulletedlist: CKEDITOR.TRISTATE_OFF }; a = a.getParent()
                            } return null
                        })
                    }
                }
            }; CKEDITOR.plugins.add("liststyle", CKEDITOR.plugins.liststyle)
        })(); "use strict"; (function () {
            function a(a, b, e) { return n(b) && n(e) && e.equals(b.getNext(function (a) { return !(aa(a) || ca(a) || r(a)) })) } function h(a) { this.upper = a[0]; this.lower = a[1]; this.set.apply(this, a.slice(2)) } function f(a) {
                var b = a.element; if (b && n(b) && (b = b.getAscendant(a.triggers, !0)) && a.editable.contains(b)) {
                    var e =
                        k(b); if ("true" == e.getAttribute("contenteditable")) return b; if (e.is(a.triggers)) return e
                } return null
            } function b(a, b, e) { z(a, b); z(a, e); a = b.size.bottom; e = e.size.top; return a && e ? 0 | (a + e) / 2 : a || e } function d(a, b, e) { return b = b[e ? "getPrevious" : "getNext"](function (b) { return b && b.type == CKEDITOR.NODE_TEXT && !aa(b) || n(b) && !r(b) && !c(a, b) }) } function m(a, b, e) { return a > b && a < e } function k(a, b) {
                if (a.data("cke-editable")) return null; for (b || (a = a.getParent()); a && !a.data("cke-editable");) {
                    if (a.hasAttribute("contenteditable")) return a;
                    a = a.getParent()
                } return null
            } function l(a) {
                var b = a.doc, e = G('\x3cspan contenteditable\x3d"false" data-cke-magic-line\x3d"1" style\x3d"' + fa + "position:absolute;border-top:1px dashed " + a.boxColor + '"\x3e\x3c/span\x3e', b), c = CKEDITOR.getUrl(this.path + "images/" + (H.hidpi ? "hidpi/" : "") + "icon" + (a.rtl ? "-rtl" : "") + ".png"); w(e, {
                    attach: function () { this.wrap.getParent() || this.wrap.appendTo(a.editable, !0); return this }, lineChildren: [w(G('\x3cspan title\x3d"' + a.editor.lang.magicline.title + '" contenteditable\x3d"false"\x3e\x26#8629;\x3c/span\x3e',
                        b), { base: fa + "height:17px;width:17px;" + (a.rtl ? "left" : "right") + ":17px;background:url(" + c + ") center no-repeat " + a.boxColor + ";cursor:pointer;" + (H.hc ? "font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;" : "") + (H.hidpi ? "background-size: 9px 10px;" : ""), looks: ["top:-8px; border-radius: 2px;", "top:-17px; border-radius: 2px 2px 0px 0px;", "top:-1px; border-radius: 0px 0px 2px 2px;"] }), w(G(ka, b), {
                            base: ja + "left:0px;border-left-color:" + a.boxColor + ";", looks: ["border-width:8px 0 8px 8px;top:-8px",
                                "border-width:8px 0 0 8px;top:-8px", "border-width:0 0 8px 8px;top:0px"]
                        }), w(G(ka, b), { base: ja + "right:0px;border-right-color:" + a.boxColor + ";", looks: ["border-width:8px 8px 8px 0;top:-8px", "border-width:8px 8px 0 0;top:-8px", "border-width:0 8px 8px 0;top:0px"] })], detach: function () { this.wrap.getParent() && this.wrap.remove(); return this }, mouseNear: function () { z(a, this); var b = a.holdDistance, e = this.size; return e && m(a.mouse.y, e.top - b, e.bottom + b) && m(a.mouse.x, e.left - b, e.right + b) ? !0 : !1 }, place: function () {
                            var b =
                                a.view, e = a.editable, c = a.trigger, d = c.upper, f = c.lower, g = d || f, h = g.getParent(), k = {}; this.trigger = c; d && z(a, d, !0); f && z(a, f, !0); z(a, h, !0); a.inInlineMode && y(a, !0); h.equals(e) ? (k.left = b.scroll.x, k.right = -b.scroll.x, k.width = "") : (k.left = g.size.left - g.size.margin.left + b.scroll.x - (a.inInlineMode ? b.editable.left + b.editable.border.left : 0), k.width = g.size.outerWidth + g.size.margin.left + g.size.margin.right + b.scroll.x, k.right = ""); d && f ? k.top = d.size.margin.bottom === f.size.margin.top ? 0 | d.size.bottom + d.size.margin.bottom /
                                    2 : d.size.margin.bottom < f.size.margin.top ? d.size.bottom + d.size.margin.bottom : d.size.bottom + d.size.margin.bottom - f.size.margin.top : d ? f || (k.top = d.size.bottom + d.size.margin.bottom) : k.top = f.size.top - f.size.margin.top; c.is(O) || m(k.top, b.scroll.y - 15, b.scroll.y + 5) ? (k.top = a.inInlineMode ? 0 : b.scroll.y, this.look(O)) : c.is(N) || m(k.top, b.pane.bottom - 5, b.pane.bottom + 15) ? (k.top = a.inInlineMode ? b.editable.height + b.editable.padding.top + b.editable.padding.bottom : b.pane.bottom - 1, this.look(N)) : (a.inInlineMode && (k.top -=
                                        b.editable.top + b.editable.border.top), this.look(X)); a.inInlineMode && (k.top--, k.top += b.editable.scroll.top, k.left += b.editable.scroll.left); for (var l in k) k[l] = CKEDITOR.tools.cssLength(k[l]); this.setStyles(k)
                        }, look: function (a) { if (this.oldLook != a) { for (var b = this.lineChildren.length, e; b--;)(e = this.lineChildren[b]).setAttribute("style", e.base + e.looks[0 | a / 2]); this.oldLook = a } }, wrap: new D("span", a.doc)
                }); for (b = e.lineChildren.length; b--;)e.lineChildren[b].appendTo(e); e.look(X); e.appendTo(e.wrap); e.unselectable();
                e.lineChildren[0].on("mouseup", function (b) { e.detach(); g(a, function (b) { var e = a.line.trigger; b[e.is(I) ? "insertBefore" : "insertAfter"](e.is(I) ? e.lower : e.upper) }, !0); a.editor.focus(); H.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView(); b.data.preventDefault(!0) }); e.on("mousedown", function (a) { a.data.preventDefault(!0) }); a.line = e
            } function g(a, b, e) {
                var c = new CKEDITOR.dom.range(a.doc), d = a.editor, f; H.ie && a.enterMode == CKEDITOR.ENTER_BR ? f = a.doc.createText(T) : (f = (f = k(a.element, !0)) && f.data("cke-enter-mode") ||
                    a.enterMode, f = new D(S[f], a.doc), f.is("br") || a.doc.createText(T).appendTo(f)); e && d.fire("saveSnapshot"); b(f); c.moveToPosition(f, CKEDITOR.POSITION_AFTER_START); d.getSelection().selectRanges([c]); a.hotNode = f; e && d.fire("saveSnapshot")
            } function e(a, b) {
                return {
                    canUndo: !0, modes: { wysiwyg: 1 }, exec: function () {
                        function e(c) {
                            var d = H.ie && 9 > H.version ? " " : T, f = a.hotNode && a.hotNode.getText() == d && a.element.equals(a.hotNode) && a.lastCmdDirection === !!b; g(a, function (e) {
                                f && a.hotNode && a.hotNode.remove(); e[b ? "insertAfter" :
                                    "insertBefore"](c); e.setAttributes({ "data-cke-magicline-hot": 1, "data-cke-magicline-dir": !!b }); a.lastCmdDirection = !!b
                            }); H.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView(); a.line.detach()
                        } return function (c) {
                            c = c.getSelection().getStartElement(); var g; c = c.getAscendant(ha, 1); if (!p(a, c) && c && !c.equals(a.editable) && !c.contains(a.editable)) {
                                (g = k(c)) && "false" == g.getAttribute("contenteditable") && (c = g); a.element = c; g = d(a, c, !b); var h; n(g) && g.is(a.triggers) && g.is(U) && (!d(a, g, !b) || (h = d(a, g, !b)) && n(h) &&
                                    h.is(a.triggers)) ? e(g) : (h = f(a, c), n(h) && (d(a, h, !b) ? (c = d(a, h, !b)) && n(c) && c.is(a.triggers) && e(h) : e(h)))
                            }
                        }
                    }()
                }
            } function c(a, b) { if (!b || b.type != CKEDITOR.NODE_ELEMENT || !b.$) return !1; var e = a.line; return e.wrap.equals(b) || e.wrap.contains(b) } function n(a) { return a && a.type == CKEDITOR.NODE_ELEMENT && a.$ } function r(a) { if (!n(a)) return !1; var b; (b = x(a)) || (n(a) ? (b = { left: 1, right: 1, center: 1 }, b = !(!b[a.getComputedStyle("float")] && !b[a.getAttribute("align")])) : b = !1); return b } function x(a) { return !!{ absolute: 1, fixed: 1 }[a.getComputedStyle("position")] }
            function u(a, b) { return n(b) ? b.is(a.triggers) : null } function p(a, b) { if (!b) return !1; for (var e = b.getParents(1), c = e.length; c--;)for (var d = a.tabuList.length; d--;)if (e[c].hasAttribute(a.tabuList[d])) return !0; return !1 } function t(a, b, e) { b = b[e ? "getLast" : "getFirst"](function (b) { return a.isRelevant(b) && !b.is(da) }); if (!b) return !1; z(a, b); return e ? b.size.top > a.mouse.y : b.size.bottom < a.mouse.y } function A(a) {
                var b = a.editable, e = a.mouse, d = a.view, f = a.triggerOffset; y(a); var g = e.y > (a.inInlineMode ? d.editable.top + d.editable.height /
                    2 : Math.min(d.editable.height, d.pane.height) / 2), b = b[g ? "getLast" : "getFirst"](function (a) { return !(aa(a) || ca(a)) }); if (!b) return null; c(a, b) && (b = a.line.wrap[g ? "getPrevious" : "getNext"](function (a) { return !(aa(a) || ca(a)) })); if (!n(b) || r(b) || !u(a, b)) return null; z(a, b); return !g && 0 <= b.size.top && m(e.y, 0, b.size.top + f) ? (a = a.inInlineMode || 0 === d.scroll.y ? O : X, new h([null, b, I, M, a])) : g && b.size.bottom <= d.pane.height && m(e.y, b.size.bottom - f, d.pane.height) ? (a = a.inInlineMode || m(b.size.bottom, d.pane.height - f, d.pane.height) ?
                        N : X, new h([b, null, E, M, a])) : null
            } function q(a) {
                var b = a.mouse, e = a.view, c = a.triggerOffset, g = f(a); if (!g) return null; z(a, g); var c = Math.min(c, 0 | g.size.outerHeight / 2), k = [], l, p; if (m(b.y, g.size.top - 1, g.size.top + c)) p = !1; else if (m(b.y, g.size.bottom - c, g.size.bottom + 1)) p = !0; else return null; if (r(g) || t(a, g, p) || g.getParent().is(Y)) return null; var v = d(a, g, !p); if (v) { if (v && v.type == CKEDITOR.NODE_TEXT) return null; if (n(v)) { if (r(v) || !u(a, v) || v.getParent().is(Y)) return null; k = [v, g][p ? "reverse" : "concat"]().concat([P, M]) } } else g.equals(a.editable[p ?
                    "getLast" : "getFirst"](a.isRelevant)) ? (y(a), p && m(b.y, g.size.bottom - c, e.pane.height) && m(g.size.bottom, e.pane.height - c, e.pane.height) ? l = N : m(b.y, 0, g.size.top + c) && (l = O)) : l = X, k = [null, g][p ? "reverse" : "concat"]().concat([p ? E : I, M, l, g.equals(a.editable[p ? "getLast" : "getFirst"](a.isRelevant)) ? p ? N : O : X]); return 0 in k ? new h(k) : null
            } function B(a, b, e, c) {
                for (var d = b.getDocumentPosition(), f = {}, g = {}, h = {}, k = {}, l = Q.length; l--;)f[Q[l]] = parseInt(b.getComputedStyle.call(b, "border-" + Q[l] + "-width"), 10) || 0, h[Q[l]] = parseInt(b.getComputedStyle.call(b,
                    "padding-" + Q[l]), 10) || 0, g[Q[l]] = parseInt(b.getComputedStyle.call(b, "margin-" + Q[l]), 10) || 0; e && !c || v(a, c); k.top = d.y - (e ? 0 : a.view.scroll.y); k.left = d.x - (e ? 0 : a.view.scroll.x); k.outerWidth = b.$.offsetWidth; k.outerHeight = b.$.offsetHeight; k.height = k.outerHeight - (h.top + h.bottom + f.top + f.bottom); k.width = k.outerWidth - (h.left + h.right + f.left + f.right); k.bottom = k.top + k.outerHeight; k.right = k.left + k.outerWidth; a.inInlineMode && (k.scroll = { top: b.$.scrollTop, left: b.$.scrollLeft }); return w({ border: f, padding: h, margin: g, ignoreScroll: e },
                        k, !0)
            } function z(a, b, e) { if (!n(b)) return b.size = null; if (!b.size) b.size = {}; else if (b.size.ignoreScroll == e && b.size.date > new Date - ia) return null; return w(b.size, B(a, b, e), { date: +new Date }, !0) } function y(a, b) { a.view.editable = B(a, a.editable, b, !0) } function v(a, b) {
                a.view || (a.view = {}); var e = a.view; if (!(!b && e && e.date > new Date - ia)) {
                    var c = a.win, e = c.getScrollPosition(), c = c.getViewPaneSize(); w(a.view, {
                        scroll: {
                            x: e.x, y: e.y, width: a.doc.$.documentElement.scrollWidth - c.width, height: a.doc.$.documentElement.scrollHeight -
                                c.height
                        }, pane: { width: c.width, height: c.height, bottom: c.height + e.y }, date: +new Date
                    }, !0)
                }
            } function C(a, b, e, c) { for (var d = c, f = c, g = 0, k = !1, l = !1, m = a.view.pane.height, n = a.mouse; n.y + g < m && 0 < n.y - g;) { k || (k = b(d, c)); l || (l = b(f, c)); !k && 0 < n.y - g && (d = e(a, { x: n.x, y: n.y - g })); !l && n.y + g < m && (f = e(a, { x: n.x, y: n.y + g })); if (k && l) break; g += 2 } return new h([d, f, null, null]) } CKEDITOR.plugins.add("magicline", {
                init: function (a) {
                    var b = a.config, k = b.magicline_triggerOffset || 30, m = {
                        editor: a, enterMode: b.enterMode, triggerOffset: k, holdDistance: 0 |
                            k * (b.magicline_holdDistance || .5), boxColor: b.magicline_color || "#ff0000", rtl: "rtl" == b.contentsLangDirection, tabuList: ["data-cke-hidden-sel"].concat(b.magicline_tabuList || []), triggers: b.magicline_everywhere ? ha : { table: 1, hr: 1, div: 1, ul: 1, ol: 1, dl: 1, form: 1, blockquote: 1 }
                    }, t, u, C; m.isRelevant = function (a) { return n(a) && !c(m, a) && !r(a) }; a.on("contentDom", function () {
                        var k = a.editable(), n = a.document, r = a.window; w(m, { editable: k, inInlineMode: k.isInline(), doc: n, win: r, hotNode: null }, !0); m.boundary = m.inInlineMode ? m.editable :
                            m.doc.getDocumentElement(); k.is(K.$inline) || (m.inInlineMode && !x(k) && k.setStyles({ position: "relative", top: null, left: null }), l.call(this, m), v(m), k.attachListener(a, "beforeUndoImage", function () { m.line.detach() }), k.attachListener(a, "beforeGetData", function () { m.line.wrap.getParent() && (m.line.detach(), a.once("getData", function () { m.line.attach() }, null, null, 1E3)) }, null, null, 0), k.attachListener(m.inInlineMode ? n : n.getWindow().getFrame(), "mouseout", function (b) {
                                if ("wysiwyg" == a.mode) if (m.inInlineMode) {
                                    var e = b.data.$.clientX;
                                    b = b.data.$.clientY; v(m); y(m, !0); var c = m.view.editable, d = m.view.scroll; e > c.left - d.x && e < c.right - d.x && b > c.top - d.y && b < c.bottom - d.y || (clearTimeout(C), C = null, m.line.detach())
                                } else clearTimeout(C), C = null, m.line.detach()
                            }), k.attachListener(k, "keyup", function () { m.hiddenMode = 0 }), k.attachListener(k, "keydown", function (b) { if ("wysiwyg" == a.mode) switch (b.data.getKeystroke()) { case 2228240: case 16: m.hiddenMode = 1, m.line.detach() } }), k.attachListener(m.inInlineMode ? k : n, "mousemove", function (b) {
                                u = !0; if ("wysiwyg" == a.mode &&
                                    !a.readOnly && !C) { var e = { x: b.data.$.clientX, y: b.data.$.clientY }; C = setTimeout(function () { m.mouse = e; C = m.trigger = null; v(m); u && !m.hiddenMode && a.focusManager.hasFocus && !m.line.mouseNear() && (m.element = Z(m, !0)) && ((m.trigger = A(m) || q(m) || V(m)) && !p(m, m.trigger.upper || m.trigger.lower) ? m.line.attach().place() : (m.trigger = null, m.line.detach()), u = !1) }, 30) }
                            }), k.attachListener(r, "scroll", function () {
                                "wysiwyg" == a.mode && (m.line.detach(), H.webkit && (m.hiddenMode = 1, clearTimeout(t), t = setTimeout(function () {
                                    m.mouseDown || (m.hiddenMode =
                                        0)
                                }, 50)))
                            }), k.attachListener(L ? n : r, "mousedown", function () { "wysiwyg" == a.mode && (m.line.detach(), m.hiddenMode = 1, m.mouseDown = 1) }), k.attachListener(L ? n : r, "mouseup", function () { m.hiddenMode = 0; m.mouseDown = 0 }), a.addCommand("accessPreviousSpace", e(m)), a.addCommand("accessNextSpace", e(m, !0)), a.setKeystroke([[b.magicline_keystrokePrevious, "accessPreviousSpace"], [b.magicline_keystrokeNext, "accessNextSpace"]]), a.on("loadSnapshot", function () {
                                var b, e, c, d; for (d in { p: 1, br: 1, div: 1 }) for (b = a.document.getElementsByTag(d),
                                    c = b.count(); c--;)if ((e = b.getItem(c)).data("cke-magicline-hot")) { m.hotNode = e; m.lastCmdDirection = "true" === e.data("cke-magicline-dir") ? !0 : !1; return }
                            }), a._.magiclineBackdoor = { accessFocusSpace: g, boxTrigger: h, isLine: c, getAscendantTrigger: f, getNonEmptyNeighbour: d, getSize: B, that: m, triggerEdge: q, triggerEditable: A, triggerExpand: V })
                    }, this)
                }
            }); var w = CKEDITOR.tools.extend, D = CKEDITOR.dom.element, G = D.createFromHtml, H = CKEDITOR.env, L = CKEDITOR.env.ie && 9 > CKEDITOR.env.version, K = CKEDITOR.dtd, S = {}, I = 128, E = 64, P = 32, M = 16,
                O = 4, N = 2, X = 1, T = " ", Y = K.$listItem, da = K.$tableContent, U = w({}, K.$nonEditable, K.$empty), ha = K.$block, ia = 100, fa = "width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;", ja = fa + "border-color:transparent;display:block;border-style:solid;", ka = "\x3cspan\x3e" + T + "\x3c/span\x3e"; S[CKEDITOR.ENTER_BR] = "br"; S[CKEDITOR.ENTER_P] = "p"; S[CKEDITOR.ENTER_DIV] = "div"; h.prototype = {
                    set: function (a, b, e) { this.properties = a + b + (e || X); return this }, is: function (a) {
                        return (this.properties &
                            a) == a
                    }
                }; var Z = function () { function a(b, e) { var c = b.$.elementFromPoint(e.x, e.y); return c && c.nodeType ? new CKEDITOR.dom.element(c) : null } return function (b, e, d) { if (!b.mouse) return null; var f = b.doc, g = b.line.wrap; d = d || b.mouse; var h = a(f, d); e && c(b, h) && (g.hide(), h = a(f, d), g.show()); return !h || h.type != CKEDITOR.NODE_ELEMENT || !h.$ || H.ie && 9 > H.version && !b.boundary.equals(h) && !b.boundary.contains(h) ? null : h } }(), aa = CKEDITOR.dom.walker.whitespaces(), ca = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT), V = function () {
                    function e(c) {
                        var f =
                            c.element, g, h, k; if (!n(f) || f.contains(c.editable) || f.isReadOnly()) return null; k = C(c, function (a, b) { return !b.equals(a) }, function (a, b) { return Z(a, !0, b) }, f); g = k.upper; h = k.lower; if (a(c, g, h)) return k.set(P, 8); if (g && f.contains(g)) for (; !g.getParent().equals(f);)g = g.getParent(); else g = f.getFirst(function (a) { return d(c, a) }); if (h && f.contains(h)) for (; !h.getParent().equals(f);)h = h.getParent(); else h = f.getLast(function (a) { return d(c, a) }); if (!g || !h) return null; z(c, g); z(c, h); if (!m(c.mouse.y, g.size.top, h.size.bottom)) return null;
                        for (var f = Number.MAX_VALUE, l, J, p, v; h && !h.equals(g) && (J = g.getNext(c.isRelevant));)l = Math.abs(b(c, g, J) - c.mouse.y), l < f && (f = l, p = g, v = J), g = J, z(c, g); if (!p || !v || !m(c.mouse.y, p.size.top, v.size.bottom)) return null; k.upper = p; k.lower = v; return k.set(P, 8)
                    } function d(a, b) { return !(b && b.type == CKEDITOR.NODE_TEXT || ca(b) || r(b) || c(a, b) || b.type == CKEDITOR.NODE_ELEMENT && b.$ && b.is("br")) } return function (b) {
                        var c = e(b), d; if (d = c) {
                            d = c.upper; var f = c.lower; d = !d || !f || r(f) || r(d) || f.equals(d) || d.equals(f) || f.contains(d) || d.contains(f) ?
                                !1 : u(b, d) && u(b, f) && a(b, d, f) ? !0 : !1
                        } return d ? c : null
                    }
                }(), Q = ["top", "left", "right", "bottom"]
        })(); CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.CTRL + CKEDITOR.SHIFT + 51; CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.CTRL + CKEDITOR.SHIFT + 52; (function () {
            function a(a) { if (!a || a.type != CKEDITOR.NODE_ELEMENT || "form" != a.getName()) return []; for (var b = [], d = ["style", "className"], f = 0; f < d.length; f++) { var e = a.$.elements.namedItem(d[f]); e && (e = new CKEDITOR.dom.element(e), b.push([e, e.nextSibling]), e.remove()) } return b }
            function h(a, b) { if (a && a.type == CKEDITOR.NODE_ELEMENT && "form" == a.getName() && 0 < b.length) for (var d = b.length - 1; 0 <= d; d--) { var f = b[d][0], e = b[d][1]; e ? f.insertBefore(e) : f.appendTo(a) } } function f(b, d) { var f = a(b), g = {}, e = b.$; d || (g["class"] = e.className || "", e.className = ""); g.inline = e.style.cssText || ""; d || (e.style.cssText = "position: static; overflow: visible"); h(f); return g } function b(b, d) { var f = a(b), g = b.$; "class" in d && (g.className = d["class"]); "inline" in d && (g.style.cssText = d.inline); h(f) } function d(a) {
                if (!a.editable().isInline()) {
                    var b =
                        CKEDITOR.instances, d; for (d in b) { var f = b[d]; "wysiwyg" != f.mode || f.readOnly || (f = f.document.getBody(), f.setAttribute("contentEditable", !1), f.setAttribute("contentEditable", !0)) } a.editable().hasFocus && (a.toolbox.focus(), a.focus())
                }
            } CKEDITOR.plugins.add("maximize", {
                init: function (a) {
                    function h() { var b = e.getViewPaneSize(); a.resize(b.width, b.height, null, !0) } if (a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                        var l = a.lang, g = CKEDITOR.document, e = g.getWindow(), c, n, r, x = CKEDITOR.TRISTATE_OFF; a.addCommand("maximize",
                            {
                                modes: { wysiwyg: !CKEDITOR.env.iOS, source: !CKEDITOR.env.iOS }, readOnly: 1, editorFocus: !1, exec: function () {
                                    var l = a.container.getFirst(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner") }), p = a.ui.space("contents"); if ("wysiwyg" == a.mode) { var t = a.getSelection(); c = t && t.getRanges(); n = e.getScrollPosition() } else { var A = a.editable().$; c = !CKEDITOR.env.ie && [A.selectionStart, A.selectionEnd]; n = [A.scrollLeft, A.scrollTop] } if (this.state == CKEDITOR.TRISTATE_OFF) {
                                        e.on("resize", h); r = e.getScrollPosition();
                                        for (t = a.container; t = t.getParent();)t.setCustomData("maximize_saved_styles", f(t)), t.setStyle("z-index", a.config.baseFloatZIndex - 5); p.setCustomData("maximize_saved_styles", f(p, !0)); l.setCustomData("maximize_saved_styles", f(l, !0)); p = { overflow: CKEDITOR.env.webkit ? "" : "hidden", width: 0, height: 0 }; g.getDocumentElement().setStyles(p); !CKEDITOR.env.gecko && g.getDocumentElement().setStyle("position", "fixed"); CKEDITOR.env.gecko && CKEDITOR.env.quirks || g.getBody().setStyles(p); CKEDITOR.env.ie ? setTimeout(function () {
                                            e.$.scrollTo(0,
                                                0)
                                        }, 0) : e.$.scrollTo(0, 0); l.setStyle("position", CKEDITOR.env.gecko && CKEDITOR.env.quirks ? "fixed" : "absolute"); l.$.offsetLeft; l.setStyles({ "z-index": a.config.baseFloatZIndex - 5, left: "0px", top: "0px" }); l.addClass("cke_maximized"); h(); p = l.getDocumentPosition(); l.setStyles({ left: -1 * p.x + "px", top: -1 * p.y + "px" }); CKEDITOR.env.gecko && d(a)
                                    } else if (this.state == CKEDITOR.TRISTATE_ON) {
                                        e.removeListener("resize", h); for (var t = [p, l], q = 0; q < t.length; q++)b(t[q], t[q].getCustomData("maximize_saved_styles")), t[q].removeCustomData("maximize_saved_styles");
                                        for (t = a.container; t = t.getParent();)b(t, t.getCustomData("maximize_saved_styles")), t.removeCustomData("maximize_saved_styles"); CKEDITOR.env.ie ? setTimeout(function () { e.$.scrollTo(r.x, r.y) }, 0) : e.$.scrollTo(r.x, r.y); l.removeClass("cke_maximized"); CKEDITOR.env.webkit && (l.setStyle("display", "inline"), setTimeout(function () { l.setStyle("display", "block") }, 0)); a.fire("resize", { outerHeight: a.container.$.offsetHeight, contentsHeight: p.$.offsetHeight, outerWidth: a.container.$.offsetWidth })
                                    } this.toggleState(); "wysiwyg" ==
                                        a.mode ? c ? (CKEDITOR.env.gecko && d(a), a.getSelection().selectRanges(c), (A = a.getSelection().getStartElement()) && A.scrollIntoView(!0)) : e.$.scrollTo(n.x, n.y) : (c && (A.selectionStart = c[0], A.selectionEnd = c[1]), A.scrollLeft = n[0], A.scrollTop = n[1]); c = n = null; x = this.state; a.fire("maximize", this.state)
                                }, canUndo: !1
                            }); a.ui.addButton && a.ui.addButton("Maximize", { isToggle: !0, label: l.maximize.maximize, command: "maximize", toolbar: "tools,10" }); a.on("mode", function () {
                                var b = a.getCommand("maximize"); b.setState(b.state == CKEDITOR.TRISTATE_DISABLED ?
                                    CKEDITOR.TRISTATE_DISABLED : x)
                            }, null, null, 100); if (a.config.maximize_historyIntegration) e.on(a.config.maximize_historyIntegration === CKEDITOR.HISTORY_NATIVE ? "popstate" : "hashchange", function () { var b = a.getCommand("maximize"); b.state === CKEDITOR.TRISTATE_ON && b.exec() })
                    }
                }
            }); CKEDITOR.config.maximize_historyIntegration = CKEDITOR.HISTORY_NATIVE
        })(); CKEDITOR.plugins.add("newpage", {
            init: function (a) {
                a.addCommand("newpage", {
                    modes: { wysiwyg: 1, source: 1 }, exec: function (a) {
                        var f = this; a.setData(a.config.newpage_html || "",
                            function () { a.focus(); setTimeout(function () { a.fire("afterCommandExec", { name: "newpage", command: f }); a.selectionChange() }, 200) })
                    }, async: !0
                }); a.ui.addButton && a.ui.addButton("NewPage", { label: a.lang.newpage.toolbar, command: "newpage", toolbar: "document,20" })
            }
        }); "use strict"; (function () {
            function a(a) { return { "aria-label": a, "class": "cke_pagebreak", contenteditable: "false", "data-cke-display-name": "pagebreak", "data-cke-pagebreak": 1, style: "page-break-after: always", title: a } } CKEDITOR.plugins.add("pagebreak", {
                requires: "fakeobjects",
                onLoad: function () { var a = ("background:url(" + CKEDITOR.getUrl(this.path + "images/pagebreak.gif") + ") no-repeat center center;clear:both;width:100%;border-top:#999 1px dotted;border-bottom:#999 1px dotted;padding:0;height:7px;cursor:default;").replace(/;/g, " !important;"); CKEDITOR.addCss("div.cke_pagebreak{" + a + "}") }, init: function (a) {
                    a.blockless || (a.addCommand("pagebreak", CKEDITOR.plugins.pagebreakCmd), a.ui.addButton && a.ui.addButton("PageBreak", { label: a.lang.pagebreak.toolbar, command: "pagebreak", toolbar: "insert,70" }),
                        CKEDITOR.env.webkit && a.on("contentDom", function () { a.document.on("click", function (f) { f = f.data.getTarget(); f.is("div") && f.hasClass("cke_pagebreak") && a.getSelection().selectElement(f) }) }))
                }, afterInit: function (h) {
                    function f(b) { CKEDITOR.tools.extend(b.attributes, a(h.lang.pagebreak.alt), !0); b.children.length = 0 } var b = h.dataProcessor, d = b && b.dataFilter, b = b && b.htmlFilter, m = /page-break-after\s*:\s*always/i, k = /display\s*:\s*none/i; b && b.addRules({
                        attributes: {
                            "class": function (a, b) {
                                var e = a.replace("cke_pagebreak",
                                    ""); if (e != a) { var c = CKEDITOR.htmlParser.fragment.fromHtml('\x3cspan style\x3d"display: none;"\x3e\x26nbsp;\x3c/span\x3e').children[0]; b.children.length = 0; b.add(c); c = b.attributes; delete c["aria-label"]; delete c.contenteditable; delete c.title } return e
                            }
                        }
                    }, { applyToAll: !0, priority: 5 }); d && d.addRules({ elements: { div: function (a) { if (a.attributes["data-cke-pagebreak"]) f(a); else if (m.test(a.attributes.style)) { var b = a.children[0]; b && "span" == b.name && k.test(b.attributes.style) && f(a) } } } })
                }
            }); CKEDITOR.plugins.pagebreakCmd =
                { exec: function (a) { a.insertElement(CKEDITOR.plugins.pagebreak.createElement(a)) }, context: "div", allowedContent: { div: { styles: "!page-break-after" }, span: { match: function (a) { return (a = a.parent) && "div" == a.name && a.styles && a.styles["page-break-after"] }, styles: "display" } }, requiredContent: "div{page-break-after}" }; CKEDITOR.plugins.pagebreak = { createElement: function (h) { return h.document.createElement("div", { attributes: a(h.lang.pagebreak.alt) }) } }
        })(); (function () {
            CKEDITOR.plugins.add("xml", {}); CKEDITOR.xml = function (a) {
                var h =
                    null; if ("object" == typeof a) h = a; else if (a = (a || "").replace(/&nbsp;/g, " "), "ActiveXObject" in window) { try { h = new ActiveXObject("MSXML2.DOMDocument") } catch (f) { try { h = new ActiveXObject("Microsoft.XmlDom") } catch (b) { } } h && (h.async = !1, h.resolveExternals = !1, h.validateOnParse = !1, h.loadXML(a)) } else window.DOMParser && (h = (new DOMParser).parseFromString(a, "text/xml")); this.baseXml = h
            }; CKEDITOR.xml.prototype = {
                selectSingleNode: function (a, h) {
                    var f = this.baseXml; if (h || (h = f)) {
                        if ("selectSingleNode" in h) return h.selectSingleNode(a);
                        if (f.evaluate) return (f = f.evaluate(a, h, null, 9, null)) && f.singleNodeValue || null
                    } return null
                }, selectNodes: function (a, h) { var f = this.baseXml, b = []; if (h || (h = f)) { if ("selectNodes" in h) return h.selectNodes(a); if (f.evaluate && (f = f.evaluate(a, h, null, 5, null))) for (var d; d = f.iterateNext();)b.push(d) } return b }, getInnerXml: function (a, h) {
                    var f = this.selectSingleNode(a, h), b = []; if (f) for (f = f.firstChild; f;)f.xml ? b.push(f.xml) : window.XMLSerializer && b.push((new XMLSerializer).serializeToString(f)), f = f.nextSibling; return b.length ?
                        b.join("") : null
                }
            }
        })(); (function () {
            CKEDITOR.plugins.add("ajax", { requires: "xml" }); CKEDITOR.ajax = function () {
                function a() { if (!CKEDITOR.env.ie || "file:" != location.protocol) try { return new XMLHttpRequest } catch (a) { } try { return new ActiveXObject("Msxml2.XMLHTTP") } catch (b) { } try { return new ActiveXObject("Microsoft.XMLHTTP") } catch (f) { } return null } function h(a, b) {
                    if (4 != a.readyState || !(200 <= a.status && 300 > a.status || 304 == a.status || 0 === a.status || 1223 == a.status)) return null; switch (b) {
                        case "text": return a.responseText;
                        case "xml": var f = a.responseXML; return new CKEDITOR.xml(f && f.firstChild ? f : a.responseText); case "arraybuffer": return a.response; default: return null
                    }
                } function f(b, f, k) { var l = !!f, g = a(); if (!g) return null; l && "text" !== k && "xml" !== k && (g.responseType = k); g.open("GET", b, l); l && (g.onreadystatechange = function () { 4 == g.readyState && (f(h(g, k)), g = null) }); g.send(null); return l ? "" : h(g, k) } function b(b, f, k, l, g) {
                    var e = a(); if (!e) return null; e.open("POST", b, !0); e.onreadystatechange = function () {
                        4 == e.readyState && (l && l(h(e, g)),
                            e = null)
                    }; e.setRequestHeader("Content-type", k || "application/x-www-form-urlencoded; charset\x3dUTF-8"); e.send(f)
                } return { load: function (a, b, h) { return f(a, b, h || "text") }, post: function (a, f, h, l) { return b(a, f, h, l, "text") }, loadXml: function (a, b) { return f(a, b, "xml") }, loadText: function (a, b) { return f(a, b, "text") }, loadBinary: function (a, b) { return f(a, b, "arraybuffer") } }
            }()
        })(); (function () {
            function a(a, b) {
                return CKEDITOR.tools.array.filter(a, function (a) { return a.canHandle(b) }).sort(function (a, b) {
                    return a.priority ===
                        b.priority ? 0 : a.priority - b.priority
                })
            } function h(a, b) { var d = a.shift(); d && d.handle(b, function () { h(a, b) }) } function f(a) { var b = CKEDITOR.tools.array.reduce(a, function (a, b) { return CKEDITOR.tools.array.isArray(b.filters) ? a.concat(b.filters) : a }, []); return CKEDITOR.tools.array.filter(b, function (a, e) { return CKEDITOR.tools.array.indexOf(b, a) === e }) } function b(a, b) {
                var f = 0, e, c; if (!CKEDITOR.tools.array.isArray(a) || 0 === a.length) return !0; e = CKEDITOR.tools.array.filter(a, function (a) {
                    return -1 === CKEDITOR.tools.array.indexOf(d,
                        a)
                }); if (0 < e.length) for (c = 0; c < e.length; c++)(function (a) { CKEDITOR.scriptLoader.queue(a, function (c) { c && d.push(a); ++f === e.length && b() }) })(e[c]); return 0 === e.length
            } var d = [], m = CKEDITOR.tools.createClass({
                $: function () { this.handlers = [] }, proto: {
                    register: function (a) { "number" !== typeof a.priority && (a.priority = 10); this.handlers.push(a) }, addPasteListener: function (d) {
                        d.on("paste", function (l) {
                            var g = a(this.handlers, l), e; if (0 !== g.length) {
                                e = f(g); e = b(e, function () { return d.fire("paste", l.data) }); if (!e) return l.cancel();
                                h(g, l)
                            }
                        }, this, null, 3)
                    }
                }
            }); CKEDITOR.plugins.add("pastetools", { requires: ["clipboard", "ajax"], beforeInit: function (a) { a.pasteTools = new m; a.pasteTools.addPasteListener(a) } }); CKEDITOR.plugins.pastetools = {
                filters: {}, loadFilters: b, createFilter: function (a) {
                    var b = CKEDITOR.tools.array.isArray(a.rules) ? a.rules : [a.rules], d = a.additionalTransforms; return function (a, c) {
                        var f = new CKEDITOR.htmlParser.basicWriter, h = new CKEDITOR.htmlParser.filter, k; d && (a = d(a, c)); CKEDITOR.tools.array.forEach(b, function (b) {
                            h.addRules(b(a,
                                c, h))
                        }); k = CKEDITOR.htmlParser.fragment.fromHtml(a); h.applyTo(k); k.writeHtml(f); return f.getHtml()
                    }
                }, getClipboardData: function (a, b) { var d; return CKEDITOR.plugins.clipboard.isCustomDataTypesSupported || "text/html" === b ? (d = a.dataTransfer.getData(b, !0)) || "text/html" !== b ? d : a.dataValue : null }, getConfigValue: function (a, b) {
                    if (a && a.config) {
                        var d = CKEDITOR.tools, e = a.config, c = d.object.keys(e), f = ["pasteTools_" + b, "pasteFromWord_" + b, "pasteFromWord" + d.capitalize(b, !0)], f = d.array.find(f, function (a) {
                            return -1 !== d.array.indexOf(c,
                                a)
                        }); return e[f]
                    }
                }, getContentGeneratorName: function (a) { if ((a = /<meta\s+name=["']?generator["']?\s+content=["']?(\w+)/gi.exec(a)) && a.length) return a = a[1].toLowerCase(), 0 === a.indexOf("microsoft") ? "microsoft" : 0 === a.indexOf("libreoffice") ? "libreoffice" : "unknown" }
            }; CKEDITOR.pasteFilters = CKEDITOR.plugins.pastetools.filters
        })(); (function () {
            CKEDITOR.plugins.add("pastefromgdocs", {
                requires: "pastetools", init: function (a) {
                    var h = CKEDITOR.plugins.getPath("pastetools"), f = this.path; a.pasteTools.register({
                        filters: [CKEDITOR.getUrl(h +
                            "filter/common.js"), CKEDITOR.getUrl(f + "filter/default.js")], canHandle: function (a) { return /id=(\"|\')?docs\-internal\-guid\-/.test(a.data.dataValue) }, handle: function (b, d) { var f = b.data, h = CKEDITOR.plugins.pastetools.getClipboardData(f, "text/html"); f.dontFilter = !0; f.dataValue = CKEDITOR.pasteFilters.gdocs(h, a); !0 === a.config.forcePasteAsPlainText && (f.type = "text"); d() }
                    })
                }
            })
        })(); (function () {
            CKEDITOR.plugins.add("pastefromlibreoffice", {
                requires: "pastetools", isSupportedEnvironment: function () {
                    var a = CKEDITOR.env.ie &&
                        11 >= CKEDITOR.env.version; return !(CKEDITOR.env.webkit && !CKEDITOR.env.chrome) && !a
                }, init: function (a) {
                    if (this.isSupportedEnvironment()) {
                        var h = CKEDITOR.plugins.getPath("pastetools"), f = this.path; a.pasteTools.register({
                            priority: 100, filters: [CKEDITOR.getUrl(h + "filter/common.js"), CKEDITOR.getUrl(h + "filter/image.js"), CKEDITOR.getUrl(f + "filter/default.js")], canHandle: function (a) {
                                a = a.data; return (a = a.dataTransfer.getData("text/html", !0) || a.dataValue) ? "libreoffice" === CKEDITOR.plugins.pastetools.getContentGeneratorName(a) :
                                    !1
                            }, handle: function (b, d) { var f = b.data, h = f.dataValue || CKEDITOR.plugins.pastetools.getClipboardData(f, "text/html"); f.dontFilter = !0; h = CKEDITOR.pasteFilters.image(h, a, CKEDITOR.plugins.pastetools.getClipboardData(f, "text/rtf")); f.dataValue = CKEDITOR.pasteFilters.libreoffice(h, a); !0 === a.config.forcePasteAsPlainText && (f.type = "text"); d() }
                        })
                    }
                }
            })
        })(); (function () {
            CKEDITOR.plugins.add("pastefromword", {
                requires: "pastetools", init: function (a) {
                    var h = 0, f = CKEDITOR.plugins.getPath("pastetools"), b = this.path, d = void 0 ===
                        a.config.pasteFromWord_inlineImages ? !0 : a.config.pasteFromWord_inlineImages, f = [CKEDITOR.getUrl(f + "filter/common.js"), CKEDITOR.getUrl(f + "filter/image.js"), CKEDITOR.getUrl(b + "filter/default.js")]; a.addCommand("pastefromword", { canUndo: !1, async: !0, exec: function (a, b) { h = 1; a.execCommand("paste", { type: "html", notification: b && "undefined" !== typeof b.notification ? b.notification : !0 }) } }); CKEDITOR.plugins.clipboard.addPasteButton(a, "PasteFromWord", { label: a.lang.pastefromword.toolbar, command: "pastefromword", toolbar: "clipboard,50" });
                    a.pasteTools.register({
                        filters: a.config.pasteFromWordCleanupFile ? [a.config.pasteFromWordCleanupFile] : f, canHandle: function (a) { a = CKEDITOR.plugins.pastetools.getClipboardData(a.data, "text/html"); var b = CKEDITOR.plugins.pastetools.getContentGeneratorName(a), d = /(class="?Mso|style=["'][^"]*?\bmso\-|w:WordDocument|<o:\w+>|<\/font>)/, b = b ? "microsoft" === b : d.test(a); return a && (h || b) }, handle: function (b, f) {
                            var l = b.data, g = CKEDITOR.plugins.pastetools.getClipboardData(l, "text/html"), e = CKEDITOR.plugins.pastetools.getClipboardData(l,
                                "text/rtf"), g = { dataValue: g, dataTransfer: { "text/rtf": e } }; if (!1 !== a.fire("pasteFromWord", g) || h) {
                                    l.dontFilter = !0; if (h || !a.config.pasteFromWordPromptCleanup || confirm(a.lang.pastefromword.confirmCleanup)) g.dataValue = CKEDITOR.cleanWord(g.dataValue, a), CKEDITOR.plugins.clipboard.isCustomDataTypesSupported && d && CKEDITOR.pasteFilters.image && (g.dataValue = CKEDITOR.pasteFilters.image(g.dataValue, a, e)), a.fire("afterPasteFromWord", g), l.dataValue = g.dataValue, !0 === a.config.forcePasteAsPlainText ? l.type = "text" : CKEDITOR.plugins.clipboard.isCustomCopyCutSupported ||
                                        "allow-word" !== a.config.forcePasteAsPlainText || (l.type = "html"); h = 0; f()
                                }
                        }
                    })
                }
            })
        })(); (function () {
            var a = {
                canUndo: !1, async: !0, exec: function (a, f) {
                    var b = a.lang, d = CKEDITOR.tools.keystrokeToString(b.common.keyboard, a.getCommandKeystroke(CKEDITOR.env.ie ? a.commands.paste : this)), m = f && "undefined" !== typeof f.notification ? f.notification : !f || !f.from || "keystrokeHandler" === f.from && CKEDITOR.env.ie, b = m && "string" === typeof m ? m : b.pastetext.pasteNotification.replace(/%1/, '\x3ckbd aria-label\x3d"' + d.aria + '"\x3e' + d.display +
                        "\x3c/kbd\x3e"); a.execCommand("paste", { type: "text", notification: m ? b : !1 })
                }
            }; CKEDITOR.plugins.add("pastetext", {
                requires: "clipboard", init: function (h) {
                    var f = CKEDITOR.env.safari ? CKEDITOR.CTRL + CKEDITOR.ALT + CKEDITOR.SHIFT + 86 : CKEDITOR.CTRL + CKEDITOR.SHIFT + 86; h.addCommand("pastetext", a); h.setKeystroke(f, "pastetext"); CKEDITOR.plugins.clipboard.addPasteButton(h, "PasteText", { label: h.lang.pastetext.button, command: "pastetext", toolbar: "clipboard,40" }); if (h.config.forcePasteAsPlainText) h.on("beforePaste", function (a) {
                        "html" !=
                            a.data.type && (a.data.type = "text")
                    }); h.on("pasteState", function (a) { h.getCommand("pastetext").setState(a.data) })
                }
            })
        })(); (function () {
            function a(a, d) {
                var f = CKEDITOR.plugins.getPath("preview"), h = a.config, l = a.title, g = function () { var a = location.origin, b = location.pathname; if (!h.baseHref && !CKEDITOR.env.gecko) return ""; if (h.baseHref) return '\x3cbase href\x3d"{HREF}"\x3e'.replace("{HREF}", h.baseHref); b = b.split("/"); b.pop(); b = b.join("/"); return '\x3cbase href\x3d"{HREF}"\x3e'.replace("{HREF}", a + b + "/") }(); return h.fullPage ?
                    a.getData().replace(/<head>/, "$\x26" + g).replace(/[^>]*(?=<\/title>)/, "$\x26 \x26mdash; " + l) : h.docType + '\x3chtml dir\x3d"' + h.contentsLangDirection + '"\x3e\x3chead\x3e' + g + "\x3ctitle\x3e" + l + "\x3c/title\x3e" + CKEDITOR.tools.buildStyleHtml(h.contentsCss) + '\x3clink rel\x3d"stylesheet" media\x3d"screen" href\x3d"' + f + 'styles/screen.css"\x3e\x3c/head\x3e' + function () {
                        var e = "\x3cbody\x3e", c = a.document && a.document.getBody(); if (!c) return e; c.getAttribute("id") && (e = e.replace("\x3e", ' id\x3d"' + c.getAttribute("id") +
                            '"\x3e')); c.getAttribute("class") && (e = e.replace("\x3e", ' class\x3d"' + c.getAttribute("class") + '"\x3e')); return e
                    }() + a.getData() + (d ? "\x3cscript\x3e" + (CKEDITOR.env.ie ? "window.onload" : "document.onreadystatechange") + " \x3d function() { previewCallback(); } \x3c/script\x3e" : "") + "\x3c/body\x3e\x3c/html\x3e"
            } function h() { var a = window.screen; return { width: Math.round(.8 * a.width), height: Math.round(.7 * a.height), left: Math.round(.1 * a.width) } } function f() {
                var a = CKEDITOR.plugins.getPath("preview"); return CKEDITOR.env.gecko ?
                    CKEDITOR.getUrl(a + "preview.html") : ""
            } CKEDITOR.plugins.add("preview", { init: function (a) { a.addCommand("preview", { modes: { wysiwyg: 1 }, canUndo: !1, readOnly: 1, exec: function () { CKEDITOR.plugins.preview.createPreview(a) } }); a.ui.addButton && a.ui.addButton("Preview", { label: a.lang.preview.preview, command: "preview", toolbar: "document,40" }) } }); CKEDITOR.plugins.preview = {
                createPreview: function (b, d) {
                    var m = { dataValue: a(b, d) }, k = h(), l; l = CKEDITOR.env.ie || CKEDITOR.env.gecko ? "javascript:void( (function(){document.open();" + ("(" +
                        CKEDITOR.tools.fixDomain + ")();").replace(/\/\/.*?\n/g, "").replace(/parent\./g, "window.opener.") + "document.write( window.opener._cke_htmlToLoad );document.close();window.opener._cke_htmlToLoad \x3d null;})() )" : null; var g = f(), e, c; if (!1 === b.fire("contentPreview", m)) return !1; if (l || g) window._cke_htmlToLoad = m.dataValue; e = window.open(g, null, ["toolbar\x3dyes,location\x3dno,status\x3dyes,menubar\x3dyes,scrollbars\x3dyes,resizable\x3dyes", "width\x3d" + k.width, "height\x3d" + k.height, "left\x3d" + k.left].join());
                    c = new CKEDITOR.dom.window(e); l && e && (e.location = l); window._cke_htmlToLoad || (k = e.document, k.open(), k.write(m.dataValue), k.close()); d && (e.previewCallback = function () { "complete" === e.document.readyState && d(c) }, e.previewCallback()); return c
                }
            }
        })(); (function () {
            CKEDITOR.plugins.add("print", { requires: "preview", init: function (a) { a.addCommand("print", CKEDITOR.plugins.print); a.ui.addButton && a.ui.addButton("Print", { label: a.lang.print.toolbar, command: "print", toolbar: "document,50" }) } }); CKEDITOR.plugins.print = {
                exec: function (a) {
                    CKEDITOR.plugins.preview.createPreview(a,
                        function (a) { a = a.$; CKEDITOR.env.gecko ? a.print() : a.document.execCommand("Print"); a.close() })
                }, canUndo: !1, readOnly: 1, modes: { wysiwyg: 1 }
            }
        })(); CKEDITOR.plugins.add("removeformat", { init: function (a) { a.addCommand("removeFormat", CKEDITOR.plugins.removeformat.commands.removeformat); a.ui.addButton && a.ui.addButton("RemoveFormat", { label: a.lang.removeformat.toolbar, command: "removeFormat", toolbar: "cleanup,10" }) } }); CKEDITOR.plugins.removeformat = {
            commands: {
                removeformat: {
                    exec: function (a) {
                        for (var h = a._.removeFormatRegex ||
                            (a._.removeFormatRegex = new RegExp("^(?:" + a.config.removeFormatTags.replace(/,/g, "|") + ")$", "i")), f = a._.removeAttributes || (a._.removeAttributes = a.config.removeFormatAttributes.split(",")), b = CKEDITOR.plugins.removeformat.filter, d = a.getSelection().getRanges(), m = d.createIterator(), k = function (a) { return a.type == CKEDITOR.NODE_ELEMENT }, l; l = m.getNextRange();) {
                            l.enlarge(CKEDITOR.ENLARGE_INLINE); var g = l.createBookmark(), e = g.startNode, c = g.endNode, n = function (e) {
                                for (var c = a.elementPath(e), d = c.elements, f = 1, g; (g =
                                    d[f]) && !g.equals(c.block) && !g.equals(c.blockLimit); f++)h.test(g.getName()) && b(a, g) && e.breakParent(g)
                            }; n(e); if (c) for (n(c), e = e.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT); e && !e.equals(c);)if (e.isReadOnly()) { if (e.getPosition(c) & CKEDITOR.POSITION_CONTAINS) break; e = e.getNext(k) } else n = e.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT), "img" == e.getName() && e.data("cke-realelement") || !b(a, e) || (h.test(e.getName()) ? e.remove(1) : (e.removeAttributes(f), a.fire("removeFormatCleanup", e))), e = n; l.moveToBookmark(g)
                        } a.forceNextSelectionCheck();
                        a.getSelection().selectRanges(d)
                    }
                }
            }, filter: function (a, h) { for (var f = a._.removeFormatFilters || [], b = 0; b < f.length; b++)if (!1 === f[b](h)) return !1; return !0 }
        }; CKEDITOR.editor.prototype.addRemoveFormatFilter = function (a) { this._.removeFormatFilters || (this._.removeFormatFilters = []); this._.removeFormatFilters.push(a) }; CKEDITOR.config.removeFormatTags = "b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var"; CKEDITOR.config.removeFormatAttributes = "class,style,lang,width,height,align,hspace,valign";
        CKEDITOR.plugins.add("resize", {
            init: function (a) {
                function h(d) { var f = g.width, h = g.height, k = f + (d.data.$.screenX - l.x) * ("rtl" == m ? -1 : 1); d = h + (d.data.$.screenY - l.y); e && (f = Math.max(b.resize_minWidth, Math.min(k, b.resize_maxWidth))); c && (h = Math.max(b.resize_minHeight, Math.min(d, b.resize_maxHeight))); a.resize(e ? f : null, h) } function f() {
                    CKEDITOR.document.removeListener("mousemove", h); CKEDITOR.document.removeListener("mouseup", f); a.document && (a.document.removeListener("mousemove", h), a.document.removeListener("mouseup",
                        f))
                } var b = a.config, d = a.ui.spaceId("resizer"), m = a.element ? a.element.getDirection(1) : "ltr"; !b.resize_dir && (b.resize_dir = "vertical"); void 0 === b.resize_maxWidth && (b.resize_maxWidth = 3E3); void 0 === b.resize_maxHeight && (b.resize_maxHeight = 3E3); void 0 === b.resize_minWidth && (b.resize_minWidth = 750); void 0 === b.resize_minHeight && (b.resize_minHeight = 250); if (!1 !== b.resize_enabled) {
                    var k = null, l, g, e = ("both" == b.resize_dir || "horizontal" == b.resize_dir) && b.resize_minWidth != b.resize_maxWidth, c = ("both" == b.resize_dir || "vertical" ==
                        b.resize_dir) && b.resize_minHeight != b.resize_maxHeight, n = CKEDITOR.tools.addFunction(function (e) { k || (k = a.getResizable()); g = { width: k.$.offsetWidth || 0, height: k.$.offsetHeight || 0 }; l = { x: e.screenX, y: e.screenY }; b.resize_minWidth > g.width && (b.resize_minWidth = g.width); b.resize_minHeight > g.height && (b.resize_minHeight = g.height); CKEDITOR.document.on("mousemove", h); CKEDITOR.document.on("mouseup", f); a.document && (a.document.on("mousemove", h), a.document.on("mouseup", f)); e.preventDefault && e.preventDefault() }); a.on("destroy",
                            function () { CKEDITOR.tools.removeFunction(n) }); a.on("uiSpace", function (b) { if ("bottom" == b.data.space) { var f = ""; e && !c && (f = " cke_resizer_horizontal"); !e && c && (f = " cke_resizer_vertical"); var g = '\x3cspan id\x3d"' + d + '" class\x3d"cke_resizer' + f + " cke_resizer_" + m + '" title\x3d"' + CKEDITOR.tools.htmlEncode(a.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + n + ', event)"\x3e' + ("ltr" == m ? "◢" : "◣") + "\x3c/span\x3e"; "ltr" == m && "ltr" == f ? b.data.html += g : b.data.html = g + b.data.html } }, a, null, 100); a.on("maximize",
                                function (b) { a.ui.space("resizer")[b.data == CKEDITOR.TRISTATE_ON ? "hide" : "show"]() })
                }
            }
        }); (function () { var a = { readOnly: 1, modes: { wysiwyg: 1, source: 1 }, exec: function (a) { if (a.fire("save") && (a = a.element.$.form)) try { a.submit() } catch (f) { a.submit.click && a.submit.click() } } }; CKEDITOR.plugins.add("save", { init: function (h) { h.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (h.addCommand("save", a).startDisabled = !h.element.$.form, h.ui.addButton && h.ui.addButton("Save", { label: h.lang.save.toolbar, command: "save", toolbar: "document,10" })) } }) })();
        "use strict"; CKEDITOR.plugins.add("scayt", {
            requires: "menubutton,dialog", tabToOpen: null, dialogName: "scaytDialog", onLoad: function (a) {
                "moono-lisa" == (CKEDITOR.skinName || a.config.skin) && CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(this.path + "skins/" + CKEDITOR.skin.name + "/scayt.css")); CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(this.path + "dialogs/dialog.css")); var h = !1; CKEDITOR.on("instanceLoaded", function (a) {
                    if (!h && CKEDITOR.plugins.autocomplete) {
                        h = !0; var b = CKEDITOR.plugins.autocomplete.prototype.getModel;
                        CKEDITOR.plugins.autocomplete.prototype.getModel = function (a) { var f = this.editor; a = b.bind(this)(a); a.on("change-isActive", function (a) { a.data ? f.fire("autocompletePanelShow") : f.fire("autocompletePanelHide") }); return a }
                    }
                })
            }, init: function (a) {
                var h = this, f = CKEDITOR.plugins.scayt; this.bindEvents(a); this.parseConfig(a); this.addRule(a); CKEDITOR.dialog.add(this.dialogName, CKEDITOR.getUrl(this.path + "dialogs/options.js")); this.addMenuItems(a); var b = a.lang.scayt, d = CKEDITOR.env; a.ui.add("Scayt", CKEDITOR.UI_MENUBUTTON,
                    {
                        label: b.text_title, title: a.plugins.wsc ? a.lang.wsc.title : b.text_title, modes: { wysiwyg: !(d.ie && (8 > d.version || d.quirks)) }, toolbar: "spellchecker,20", refresh: function () { var b = a.ui.instances.Scayt.getState(); a.scayt && (b = f.state.scayt[a.name] ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF); a.fire("scaytButtonState", b) }, onRender: function () { var b = this; a.on("scaytButtonState", function (a) { void 0 !== typeof a.data && b.setState(a.data) }) }, onMenu: function () {
                            var b = a.scayt; a.getMenuItem("scaytToggle").label = a.lang.scayt[b &&
                                f.state.scayt[a.name] ? "btn_disable" : "btn_enable"]; var d = { scaytToggle: CKEDITOR.TRISTATE_OFF, scaytOptions: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytLangs: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytDict: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytAbout: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, WSC: a.plugins.wsc ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED }; a.config.scayt_uiTabs[0] || delete d.scaytOptions; a.config.scayt_uiTabs[1] || delete d.scaytLangs;
                            a.config.scayt_uiTabs[2] || delete d.scaytDict; b && !CKEDITOR.plugins.scayt.isNewUdSupported(b) && (delete d.scaytDict, a.config.scayt_uiTabs[2] = 0, CKEDITOR.plugins.scayt.alarmCompatibilityMessage()); return d
                        }
                    }); a.contextMenu && a.addMenuItems && (a.contextMenu.addListener(function (b, d) { var f = a.scayt, g, e; f && (e = f.getSelectionNode()) && (g = h.menuGenerator(a, e), f.showBanner("." + a.contextMenu._.definition.panel.className.split(" ").join(" ."))); return g }), a.contextMenu._.onHide = CKEDITOR.tools.override(a.contextMenu._.onHide,
                        function (b) { return function () { var d = a.scayt; d && d.hideBanner(); return b.apply(this) } }))
            }, addMenuItems: function (a) {
                var h = this, f = CKEDITOR.plugins.scayt; a.addMenuGroup("scaytButton"); for (var b = a.config.scayt_contextMenuItemsOrder.split("|"), d = 0; d < b.length; d++)b[d] = "scayt_" + b[d]; if ((b = ["grayt_description", "grayt_suggest", "grayt_control"].concat(b)) && b.length) for (d = 0; d < b.length; d++)a.addMenuGroup(b[d], d - 10); a.addCommand("scaytToggle", {
                    exec: function (a) {
                        var b = a.scayt; f.state.scayt[a.name] = !f.state.scayt[a.name];
                        !0 === f.state.scayt[a.name] ? b || f.createScayt(a) : b && f.destroy(a)
                    }
                }); a.addCommand("scaytAbout", { exec: function (a) { a.scayt.tabToOpen = "about"; f.openDialog(h.dialogName, a) } }); a.addCommand("scaytOptions", { exec: function (a) { a.scayt.tabToOpen = "options"; f.openDialog(h.dialogName, a) } }); a.addCommand("scaytLangs", { exec: function (a) { a.scayt.tabToOpen = "langs"; f.openDialog(h.dialogName, a) } }); a.addCommand("scaytDict", { exec: function (a) { a.scayt.tabToOpen = "dictionaries"; f.openDialog(h.dialogName, a) } }); b = {
                    scaytToggle: {
                        label: a.lang.scayt.btn_enable,
                        group: "scaytButton", command: "scaytToggle"
                    }, scaytAbout: { label: a.lang.scayt.btn_about, group: "scaytButton", command: "scaytAbout" }, scaytOptions: { label: a.lang.scayt.btn_options, group: "scaytButton", command: "scaytOptions" }, scaytLangs: { label: a.lang.scayt.btn_langs, group: "scaytButton", command: "scaytLangs" }, scaytDict: { label: a.lang.scayt.btn_dictionaries, group: "scaytButton", command: "scaytDict" }
                }; a.plugins.wsc && (b.WSC = {
                    label: a.lang.wsc.toolbar, group: "scaytButton", onClick: function () {
                        var b = CKEDITOR.plugins.scayt,
                            d = a.scayt, f = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.container.getText() : a.document.getBody().getText(); (f = f.replace(/\s/g, "")) ? (d && b.state.scayt[a.name] && d.setMarkupPaused && d.setMarkupPaused(!0), a.lockSelection(), a.execCommand("checkspell")) : alert("Nothing to check!")
                    }
                }); a.addMenuItems(b)
            }, bindEvents: function (a) {
                var h = CKEDITOR.plugins.scayt, f = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE, b = function () { h.destroy(a) }, d = function () { !h.state.scayt[a.name] || a.readOnly || a.scayt || h.createScayt(a) }, m = function () {
                    var b =
                        a.editable(); b.attachListener(b, "focus", function (b) { CKEDITOR.plugins.scayt && !a.scayt && setTimeout(d, 0); b = CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[a.name] && a.scayt; var e, c; if ((f || b) && a._.savedSelection) { b = a._.savedSelection.getSelectedElement(); b = !b && a._.savedSelection.getRanges(); for (var h = 0; h < b.length; h++)c = b[h], "string" === typeof c.startContainer.$.nodeValue && (e = c.startContainer.getText().length, (e < c.startOffset || e < c.endOffset) && a.unlockSelection(!1)) } }, this, null, -10)
                }, k = function () {
                    f ?
                        a.config.scayt_inlineModeImmediateMarkup ? d() : (a.on("blur", function () { setTimeout(b, 0) }), a.on("focus", d), a.focusManager.hasFocus && d()) : d(); m(); var h = a.editable(); h.attachListener(h, "mousedown", function (b) { b = b.data.getTarget(); var e = a.widgets && a.widgets.getByElement(b); e && (e.wrapper = b.getAscendant(function (a) { return a.hasAttribute("data-cke-widget-wrapper") }, !0)) }, this, null, -10)
                }; a.on("contentDom", k); a.on("beforeCommandExec", function (b) {
                    var d = a.scayt, e = !1, c = !1, f = !0; b.data.name in h.options.disablingCommandExec &&
                        "wysiwyg" == a.mode ? d && (h.destroy(a), a.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED)) : "bold" !== b.data.name && "italic" !== b.data.name && "underline" !== b.data.name && "strike" !== b.data.name && "subscript" !== b.data.name && "superscript" !== b.data.name && "enter" !== b.data.name && "cut" !== b.data.name && "language" !== b.data.name || !d || ("cut" === b.data.name && (f = !1, c = !0), "language" === b.data.name && (c = e = !0), a.fire("reloadMarkupScayt", { removeOptions: { removeInside: f, forceBookmark: c, language: e }, timeout: 0 }))
                }); a.on("beforeSetMode",
                    function (b) { if ("source" == b.data) { if (b = a.scayt) h.destroy(a), a.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED); a.document && a.document.getBody().removeAttribute("_jquid") } }); a.on("afterCommandExec", function (b) { "wysiwyg" != a.mode || "undo" != b.data.name && "redo" != b.data.name || setTimeout(function () { h.reloadMarkup(a.scayt) }, 250) }); a.on("readOnly", function (b) {
                        var d; b && (d = a.scayt, !0 === b.editor.readOnly ? d && d.fire("removeMarkupInDocument", {}) : d ? h.reloadMarkup(d) : "wysiwyg" == b.editor.mode && !0 === h.state.scayt[b.editor.name] &&
                            (h.createScayt(a), b.editor.fire("scaytButtonState", CKEDITOR.TRISTATE_ON)))
                    }); a.on("beforeDestroy", b); a.on("setData", function () { b(); (a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE || a.plugins.divarea) && k() }, this, null, 50); a.on("reloadMarkupScayt", function (b) {
                        var d = b.data && b.data.removeOptions, e = b.data && b.data.timeout, c = b.data && b.data.language, f = a.scayt; f && setTimeout(function () {
                            c && (d.selectionNode = a.plugins.language.getCurrentLangElement(a), d.selectionNode = d.selectionNode && d.selectionNode.$ || null); f.removeMarkupInSelectionNode(d);
                            h.reloadMarkup(f)
                        }, e || 0)
                    }); a.on("insertElement", function () { a.fire("reloadMarkupScayt", { removeOptions: { forceBookmark: !0 } }) }, this, null, 50); a.on("insertHtml", function () { a.scayt && a.scayt.setFocused && a.scayt.setFocused(!0); a.fire("reloadMarkupScayt") }, this, null, 50); a.on("insertText", function () { a.scayt && a.scayt.setFocused && a.scayt.setFocused(!0); a.fire("reloadMarkupScayt") }, this, null, 50); a.on("scaytDialogShown", function (b) { b.data.selectPage(a.scayt.tabToOpen) }); a.on("autocompletePanelShow", function (b) {
                        (b =
                            a.scayt) && b.setMarkupPaused && b.setMarkupPaused(!0)
                    }); a.on("autocompletePanelHide", function (b) { (b = a.scayt) && b.setMarkupPaused && b.setMarkupPaused(!1) })
            }, parseConfig: function (a) {
                var h = CKEDITOR.plugins.scayt; h.replaceOldOptionsNames(a.config); "boolean" !== typeof a.config.scayt_autoStartup && (a.config.scayt_autoStartup = !1); h.state.scayt[a.name] = a.config.scayt_autoStartup; "boolean" !== typeof a.config.grayt_autoStartup && (a.config.grayt_autoStartup = !1); "boolean" !== typeof a.config.scayt_inlineModeImmediateMarkup &&
                    (a.config.scayt_inlineModeImmediateMarkup = !1); h.state.grayt[a.name] = a.config.grayt_autoStartup; a.config.scayt_contextCommands || (a.config.scayt_contextCommands = "ignoreall|add"); a.config.scayt_contextMenuItemsOrder || (a.config.scayt_contextMenuItemsOrder = "suggest|moresuggest|control"); a.config.scayt_sLang || (a.config.scayt_sLang = "en_US"); if (void 0 === a.config.scayt_maxSuggestions || "number" != typeof a.config.scayt_maxSuggestions || 0 > a.config.scayt_maxSuggestions) a.config.scayt_maxSuggestions = 3; if (void 0 ===
                        a.config.scayt_minWordLength || "number" != typeof a.config.scayt_minWordLength || 1 > a.config.scayt_minWordLength) a.config.scayt_minWordLength = 3; if (void 0 === a.config.scayt_customDictionaryIds || "string" !== typeof a.config.scayt_customDictionaryIds) a.config.scayt_customDictionaryIds = ""; if (void 0 === a.config.scayt_userDictionaryName || "string" !== typeof a.config.scayt_userDictionaryName) a.config.scayt_userDictionaryName = null; if ("string" === typeof a.config.scayt_uiTabs && 3 === a.config.scayt_uiTabs.split(",").length) {
                            var f =
                                [], b = []; a.config.scayt_uiTabs = a.config.scayt_uiTabs.split(","); CKEDITOR.tools.search(a.config.scayt_uiTabs, function (a) { 1 === Number(a) || 0 === Number(a) ? (b.push(!0), f.push(Number(a))) : b.push(!1) }); null === CKEDITOR.tools.search(b, !1) ? a.config.scayt_uiTabs = f : a.config.scayt_uiTabs = [1, 1, 1]
                        } else a.config.scayt_uiTabs = [1, 1, 1]; "string" != typeof a.config.scayt_serviceProtocol && (a.config.scayt_serviceProtocol = null); "string" != typeof a.config.scayt_serviceHost && (a.config.scayt_serviceHost = null); "string" != typeof a.config.scayt_servicePort &&
                            (a.config.scayt_servicePort = null); "string" != typeof a.config.scayt_servicePath && (a.config.scayt_servicePath = null); a.config.scayt_moreSuggestions || (a.config.scayt_moreSuggestions = "on"); "string" !== typeof a.config.scayt_customerId && (a.config.scayt_customerId = "1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2"); "string" !== typeof a.config.scayt_customPunctuation && (a.config.scayt_customPunctuation = "-"); "string" !== typeof a.config.scayt_srcUrl && (a.config.scayt_srcUrl = "https://svc.webspellchecker.net/spellcheck31/wscbundle/wscbundle.js");
                "boolean" !== typeof CKEDITOR.config.scayt_handleCheckDirty && (CKEDITOR.config.scayt_handleCheckDirty = !0); "boolean" !== typeof CKEDITOR.config.scayt_handleUndoRedo && (CKEDITOR.config.scayt_handleUndoRedo = !0); CKEDITOR.config.scayt_handleUndoRedo = CKEDITOR.plugins.undo ? CKEDITOR.config.scayt_handleUndoRedo : !1; a.config.scayt_ignoreAllCapsWords && "boolean" !== typeof a.config.scayt_ignoreAllCapsWords && (a.config.scayt_ignoreAllCapsWords = !1); a.config.scayt_ignoreDomainNames && "boolean" !== typeof a.config.scayt_ignoreDomainNames &&
                    (a.config.scayt_ignoreDomainNames = !1); a.config.scayt_ignoreWordsWithMixedCases && "boolean" !== typeof a.config.scayt_ignoreWordsWithMixedCases && (a.config.scayt_ignoreWordsWithMixedCases = !1); a.config.scayt_ignoreWordsWithNumbers && "boolean" !== typeof a.config.scayt_ignoreWordsWithNumbers && (a.config.scayt_ignoreWordsWithNumbers = !1); if (a.config.scayt_disableOptionsStorage) {
                        var h = CKEDITOR.tools.isArray(a.config.scayt_disableOptionsStorage) ? a.config.scayt_disableOptionsStorage : "string" === typeof a.config.scayt_disableOptionsStorage ?
                            [a.config.scayt_disableOptionsStorage] : void 0, d = "all options lang ignore-all-caps-words ignore-domain-names ignore-words-with-mixed-cases ignore-words-with-numbers".split(" "), m = ["lang", "ignore-all-caps-words", "ignore-domain-names", "ignore-words-with-mixed-cases", "ignore-words-with-numbers"], k = CKEDITOR.tools.search, l = CKEDITOR.tools.indexOf; a.config.scayt_disableOptionsStorage = function (a) {
                                for (var b = [], c = 0; c < a.length; c++) {
                                    var f = a[c], h = !!k(a, "options"); if (!k(d, f) || h && k(m, function (a) { if ("lang" === a) return !1 })) return;
                                    k(m, f) && m.splice(l(m, f), 1); if ("all" === f || h && k(a, "lang")) return []; "options" === f && (m = ["lang"])
                                } return b = b.concat(m)
                            }(h)
                    }
            }, addRule: function (a) {
                var h = CKEDITOR.plugins.scayt, f = a.dataProcessor, b = f && f.htmlFilter, d = a._.elementsPath && a._.elementsPath.filters, f = f && f.dataFilter, m = a.addRemoveFormatFilter, k = function (b) { if (a.scayt && (b.hasAttribute(h.options.data_attribute_name) || b.hasAttribute(h.options.problem_grammar_data_attribute))) return !1 }, l = function (b) {
                    var e = !0; a.scayt && (b.hasAttribute(h.options.data_attribute_name) ||
                        b.hasAttribute(h.options.problem_grammar_data_attribute)) && (e = !1); return e
                }; d && d.push(k); f && f.addRules({ elements: { span: function (a) { var b = a.hasClass(h.options.misspelled_word_class) && a.attributes[h.options.data_attribute_name], c = a.hasClass(h.options.problem_grammar_class) && a.attributes[h.options.problem_grammar_data_attribute]; h && (b || c) && delete a.name; return a } } }); b && b.addRules({
                    elements: {
                        span: function (a) {
                            var b = a.hasClass(h.options.misspelled_word_class) && a.attributes[h.options.data_attribute_name],
                                c = a.hasClass(h.options.problem_grammar_class) && a.attributes[h.options.problem_grammar_data_attribute]; h && (b || c) && delete a.name; return a
                        }
                    }
                }); m && m.call(a, l)
            }, scaytMenuDefinition: function (a) {
                var h = this, f = CKEDITOR.plugins.scayt; a = a.scayt; return {
                    scayt: {
                        scayt_ignore: { label: a.getLocal("btn_ignore"), group: "scayt_control", order: 1, exec: function (a) { a.scayt.ignoreWord() } }, scayt_ignoreall: { label: a.getLocal("btn_ignoreAll"), group: "scayt_control", order: 2, exec: function (a) { a.scayt.ignoreAllWords() } }, scayt_add: {
                            label: a.getLocal("btn_addWord"),
                            group: "scayt_control", order: 3, exec: function (a) { var d = a.scayt; setTimeout(function () { d.addWordToUserDictionary() }, 10) }
                        }, scayt_option: { label: a.getLocal("btn_options"), group: "scayt_control", order: 4, exec: function (a) { a.scayt.tabToOpen = "options"; f.openDialog(h.dialogName, a) }, verification: function (a) { return 1 == a.config.scayt_uiTabs[0] ? !0 : !1 } }, scayt_language: {
                            label: a.getLocal("btn_langs"), group: "scayt_control", order: 5, exec: function (a) { a.scayt.tabToOpen = "langs"; f.openDialog(h.dialogName, a) }, verification: function (a) {
                                return 1 ==
                                    a.config.scayt_uiTabs[1] ? !0 : !1
                            }
                        }, scayt_dictionary: { label: a.getLocal("btn_dictionaries"), group: "scayt_control", order: 6, exec: function (a) { a.scayt.tabToOpen = "dictionaries"; f.openDialog(h.dialogName, a) }, verification: function (a) { return 1 == a.config.scayt_uiTabs[2] ? !0 : !1 } }, scayt_about: { label: a.getLocal("btn_about"), group: "scayt_control", order: 7, exec: function (a) { a.scayt.tabToOpen = "about"; f.openDialog(h.dialogName, a) } }
                    }, grayt: {
                        grayt_problemdescription: {
                            label: "Grammar problem description", group: "grayt_description",
                            order: 1, state: CKEDITOR.TRISTATE_DISABLED, exec: function (a) { }
                        }, grayt_ignore: { label: a.getLocal("btn_ignore"), group: "grayt_control", order: 2, exec: function (a) { a.scayt.ignorePhrase() } }, grayt_ignoreall: { label: a.getLocal("btn_ignoreAll"), group: "grayt_control", order: 3, exec: function (a) { a.scayt.ignoreAllPhrases() } }
                    }
                }
            }, buildSuggestionMenuItems: function (a, h, f) {
                var b = {}, d = {}, m = f ? "word" : "phrase", k = f ? "startGrammarCheck" : "startSpellCheck", l = a.scayt; if (0 < h.length && "no_any_suggestions" !== h[0]) if (f) for (f = 0; f < h.length; f++) {
                    var g =
                        "scayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[f].replace(" ", "_"); a.addCommand(g, this.createCommand(CKEDITOR.plugins.scayt.suggestions[f], m, k)); f < a.config.scayt_maxSuggestions ? (a.addMenuItem(g, { label: h[f], command: g, group: "scayt_suggest", order: f + 1 }), b[g] = CKEDITOR.TRISTATE_OFF) : (a.addMenuItem(g, { label: h[f], command: g, group: "scayt_moresuggest", order: f + 1 }), d[g] = CKEDITOR.TRISTATE_OFF, "on" === a.config.scayt_moreSuggestions && (a.addMenuItem("scayt_moresuggest", {
                            label: l.getLocal("btn_moreSuggestions"),
                            group: "scayt_moresuggest", order: 10, getItems: function () { return d }
                        }), b.scayt_moresuggest = CKEDITOR.TRISTATE_OFF))
                } else for (f = 0; f < h.length; f++)g = "grayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[f].replace(" ", "_"), a.addCommand(g, this.createCommand(CKEDITOR.plugins.scayt.suggestions[f], m, k)), a.addMenuItem(g, { label: h[f], command: g, group: "grayt_suggest", order: f + 1 }), b[g] = CKEDITOR.TRISTATE_OFF; else b.no_scayt_suggest = CKEDITOR.TRISTATE_DISABLED, a.addCommand("no_scayt_suggest", { exec: function () { } }), a.addMenuItem("no_scayt_suggest",
                    { label: l.getLocal("btn_noSuggestions") || "no_scayt_suggest", command: "no_scayt_suggest", group: "scayt_suggest", order: 0 }); return b
            }, menuGenerator: function (a, h) {
                var f = a.scayt, b = this.scaytMenuDefinition(a), d = {}, m = a.config.scayt_contextCommands.split("|"), k = h.getAttribute(f.getLangAttribute()) || f.getLang(), l, g, e, c; g = f.isScaytNode(h); e = f.isGraytNode(h); g ? (b = b.scayt, l = h.getAttribute(f.getScaytNodeAttributeName()), f.fire("getSuggestionsList", { lang: k, word: l }), d = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions,
                    g)) : e && (b = b.grayt, d = h.getAttribute(f.getGraytNodeAttributeName()), f.getGraytNodeRuleAttributeName ? (l = h.getAttribute(f.getGraytNodeRuleAttributeName()), f.getProblemDescriptionText(d, l, k)) : f.getProblemDescriptionText(d, k), c = f.getProblemDescriptionText(d, l, k), b.grayt_problemdescription && c && (c = c.replace(/([.!?])\s/g, "$1\x3cbr\x3e"), b.grayt_problemdescription.label = c), f.fire("getGrammarSuggestionsList", { lang: k, phrase: d, rule: l }), d = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions, g)); if (g &&
                        "off" == a.config.scayt_contextCommands) return d; for (var n in b) g && -1 == CKEDITOR.tools.indexOf(m, n.replace("scayt_", "")) && "all" != a.config.scayt_contextCommands || e && "grayt_problemdescription" !== n && -1 == CKEDITOR.tools.indexOf(m, n.replace("grayt_", "")) && "all" != a.config.scayt_contextCommands || (d[n] = "undefined" != typeof b[n].state ? b[n].state : CKEDITOR.TRISTATE_OFF, "function" !== typeof b[n].verification || b[n].verification(a) || delete d[n], a.addCommand(n, { exec: b[n].exec }), a.addMenuItem(n, {
                            label: a.lang.scayt[b[n].label] ||
                                b[n].label, command: n, group: b[n].group, order: b[n].order
                        })); return d
            }, createCommand: function (a, h, f) { return { exec: function (b) { b = b.scayt; var d = {}; d[h] = a; b.replaceSelectionNode(d); "startGrammarCheck" === f && b.removeMarkupInSelectionNode({ grammarOnly: !0 }); b.fire(f) } } }
        }); CKEDITOR.plugins.scayt = {
            charsToObserve: [{
                charName: "cke-fillingChar", charCode: function () {
                    var a = CKEDITOR.version, h = [4, 5, 6], f = String.fromCharCode(8203), b = Array(8).join(f), d, m; if (!a) return f; for (var a = a.split("."), k = 0; k < h.length; k++) {
                        d = h[k]; m =
                            Number(a[k]); if (m > d) return b; if (m < d) break
                    } return f
                }()
            }], state: { scayt: {}, grayt: {} }, warningCounter: 0, suggestions: [], options: { disablingCommandExec: { source: !0, newpage: !0, templates: !0 }, data_attribute_name: "data-scayt-word", misspelled_word_class: "scayt-misspell-word", problem_grammar_data_attribute: "data-grayt-phrase", problem_grammar_class: "gramm-problem" }, backCompatibilityMap: {
                scayt_service_protocol: "scayt_serviceProtocol", scayt_service_host: "scayt_serviceHost", scayt_service_port: "scayt_servicePort", scayt_service_path: "scayt_servicePath",
                scayt_customerid: "scayt_customerId"
            }, openDialog: function (a, h) { var f = h.scayt; f.isAllModulesReady && !1 === f.isAllModulesReady() || (h.lockSelection(), h.openDialog(a)) }, alarmCompatibilityMessage: function () {
                5 > this.warningCounter && (console.warn("You are using the latest version of SCAYT plugin for CKEditor with the old application version. In order to have access to the newest features, it is recommended to upgrade the application version to latest one as well. Contact us for more details at support@webspellchecker.net."),
                    this.warningCounter += 1)
            }, isNewUdSupported: function (a) { return a.getUserDictionary ? !0 : !1 }, reloadMarkup: function (a) { var h; a && (h = a.getScaytLangList(), a.reloadMarkup ? a.reloadMarkup() : (this.alarmCompatibilityMessage(), h && h.ltr && h.rtl && a.fire("startSpellCheck, startGrammarCheck"))) }, replaceOldOptionsNames: function (a) { for (var h in a) h in this.backCompatibilityMap && (a[this.backCompatibilityMap[h]] = a[h], delete a[h]) }, createScayt: function (a) {
                var h = this, f = CKEDITOR.plugins.scayt; this.loadScaytLibrary(a, function (a) {
                    function d(a) {
                        return new SCAYT.CKSCAYT(a,
                            function () { }, function () { })
                    } var m; a.window && (m = "BODY" == a.editable().$.nodeName ? a.window.getFrame() : a.editable()); if (m) {
                        m = {
                            lang: a.config.scayt_sLang, container: m.$, customDictionary: a.config.scayt_customDictionaryIds, userDictionaryName: a.config.scayt_userDictionaryName, localization: a.langCode, customer_id: a.config.scayt_customerId, customPunctuation: a.config.scayt_customPunctuation, debug: a.config.scayt_debug, data_attribute_name: h.options.data_attribute_name, misspelled_word_class: h.options.misspelled_word_class,
                            problem_grammar_data_attribute: h.options.problem_grammar_data_attribute, problem_grammar_class: h.options.problem_grammar_class, "options-to-restore": a.config.scayt_disableOptionsStorage, focused: a.editable().hasFocus, ignoreElementsRegex: a.config.scayt_elementsToIgnore, ignoreGraytElementsRegex: a.config.grayt_elementsToIgnore, minWordLength: a.config.scayt_minWordLength, graytAutoStartup: a.config.grayt_autoStartup, charsToObserve: f.charsToObserve
                        }; a.config.scayt_serviceProtocol && (m.service_protocol = a.config.scayt_serviceProtocol);
                        a.config.scayt_serviceHost && (m.service_host = a.config.scayt_serviceHost); a.config.scayt_servicePort && (m.service_port = a.config.scayt_servicePort); a.config.scayt_servicePath && (m.service_path = a.config.scayt_servicePath); "boolean" === typeof a.config.scayt_ignoreAllCapsWords && (m["ignore-all-caps-words"] = a.config.scayt_ignoreAllCapsWords); "boolean" === typeof a.config.scayt_ignoreDomainNames && (m["ignore-domain-names"] = a.config.scayt_ignoreDomainNames); "boolean" === typeof a.config.scayt_ignoreWordsWithMixedCases &&
                            (m["ignore-words-with-mixed-cases"] = a.config.scayt_ignoreWordsWithMixedCases); "boolean" === typeof a.config.scayt_ignoreWordsWithNumbers && (m["ignore-words-with-numbers"] = a.config.scayt_ignoreWordsWithNumbers); var k; try { k = d(m) } catch (l) { h.alarmCompatibilityMessage(), delete m.charsToObserve, k = d(m) } k.subscribe("suggestionListSend", function (a) {
                                for (var b = {}, c = [], d = 0; d < a.suggestionList.length; d++)b["word_" + a.suggestionList[d]] || (b["word_" + a.suggestionList[d]] = a.suggestionList[d], c.push(a.suggestionList[d]));
                                CKEDITOR.plugins.scayt.suggestions = c
                            }); k.subscribe("selectionIsChanged", function (d) { a.getSelection().isLocked && "restoreSelection" !== d.action && a.lockSelection(); "restoreSelection" === d.action && a.selectionChange(!0) }); k.subscribe("graytStateChanged", function (d) { f.state.grayt[a.name] = d.state }); k.addMarkupHandler && k.addMarkupHandler(function (d) { var e = a.editable(), c = e.getCustomData(d.charName); c && (c.$ = d.node, e.setCustomData(d.charName, c)) }); a.scayt = k; a.fire("scaytButtonState", a.readOnly ? CKEDITOR.TRISTATE_DISABLED :
                                CKEDITOR.TRISTATE_ON)
                    } else f.state.scayt[a.name] = !1
                })
            }, destroy: function (a) { a.scayt && a.scayt.destroy(); delete a.scayt; a.fire("scaytButtonState", CKEDITOR.TRISTATE_OFF) }, loadScaytLibrary: function (a, h) { var f, b = function () { CKEDITOR.fireOnce("scaytReady"); a.scayt || "function" === typeof h && h(a) }; "undefined" === typeof window.SCAYT || "function" !== typeof window.SCAYT.CKSCAYT ? (f = a.config.scayt_srcUrl, CKEDITOR.scriptLoader.load(f, function (a) { a && b() })) : window.SCAYT && "function" === typeof window.SCAYT.CKSCAYT && b() }
        };
        CKEDITOR.on("dialogDefinition", function (a) {
            var h = a.data.name; a = a.data.definition.dialog; "scaytDialog" !== h && "checkspell" !== h && (a.on("show", function (a) { a = a.sender && a.sender.getParentEditor(); var b = CKEDITOR.plugins.scayt, d = a.scayt; d && b.state.scayt[a.name] && d.setMarkupPaused && d.setMarkupPaused(!0) }), a.on("hide", function (a) { a = a.sender && a.sender.getParentEditor(); var b = CKEDITOR.plugins.scayt, d = a.scayt; d && b.state.scayt[a.name] && d.setMarkupPaused && d.setMarkupPaused(!1) })); if ("scaytDialog" === h) a.on("cancel",
                function (a) { return !1 }, this, null, -1); if ("checkspell" === h) a.on("cancel", function (a) { a = a.sender && a.sender.getParentEditor(); var b = CKEDITOR.plugins.scayt, d = a.scayt; d && b.state.scayt[a.name] && d.setMarkupPaused && d.setMarkupPaused(!1); a.unlockSelection() }, this, null, -2); if ("link" === h) a.on("ok", function (a) { var b = a.sender && a.sender.getParentEditor(); b && setTimeout(function () { b.fire("reloadMarkupScayt", { removeOptions: { removeInside: !0, forceBookmark: !0 }, timeout: 0 }) }, 0) }); if ("replace" === h) a.on("hide", function (a) {
                    a =
                        a.sender && a.sender.getParentEditor(); var b = CKEDITOR.plugins.scayt, d = a.scayt; a && setTimeout(function () { d && (d.fire("removeMarkupInDocument", {}), b.reloadMarkup(d)) }, 0)
                })
        }); CKEDITOR.on("scaytReady", function () {
            if (!0 === CKEDITOR.config.scayt_handleCheckDirty) {
                var a = CKEDITOR.editor.prototype; a.checkDirty = CKEDITOR.tools.override(a.checkDirty, function (a) {
                    return function () {
                        var b = null, d = this.scayt; if (CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt) {
                            if (b = "ready" == this.status) var h =
                                d.removeMarkupFromString(this.getSnapshot()), d = d.removeMarkupFromString(this._.previousValue), b = b && d !== h
                        } else b = a.call(this); return b
                    }
                }); a.resetDirty = CKEDITOR.tools.override(a.resetDirty, function (a) { return function () { var b = this.scayt; CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt ? this._.previousValue = b.removeMarkupFromString(this.getSnapshot()) : a.call(this) } })
            } if (!0 === CKEDITOR.config.scayt_handleUndoRedo) {
                var a = CKEDITOR.plugins.undo.Image.prototype, h = "function" ==
                    typeof a.equalsContent ? "equalsContent" : "equals"; a[h] = CKEDITOR.tools.override(a[h], function (a) { return function (b) { var d = b.editor.scayt, h = this.contents, k = b.contents, l = null; CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[b.editor.name] && b.editor.scayt && (this.contents = d.removeMarkupFromString(h) || "", b.contents = d.removeMarkupFromString(k) || ""); l = a.apply(this, arguments); this.contents = h; b.contents = k; return l } })
            }
        }); (function () {
            CKEDITOR.plugins.add("selectall", {
                init: function (a) {
                    a.addCommand("selectAll",
                        { modes: { wysiwyg: 1, source: 1 }, exec: function (a) { var f = a.editable(); if (f.is("textarea")) a = f.$, CKEDITOR.env.ie && a.createTextRange ? a.createTextRange().execCommand("SelectAll") : (a.selectionStart = 0, a.selectionEnd = a.value.length), a.focus(); else { if (f.is("body")) a.document.$.execCommand("SelectAll", !1, null); else { var b = a.createRange(); b.selectNodeContents(f); b.select() } a.forceNextSelectionCheck(); a.selectionChange() } }, canUndo: !1 }); a.ui.addButton && a.ui.addButton("SelectAll", {
                            label: a.lang.selectall.toolbar, command: "selectAll",
                            toolbar: "selection,10"
                        })
                }
            })
        })(); (function () {
            var a = { readOnly: 1, preserveState: !0, editorFocus: !1, exec: function (a) { this.toggleState(); this.refresh(a) }, refresh: function (a) { if (a.document) { var f = this.state != CKEDITOR.TRISTATE_ON || a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && !a.focusManager.hasFocus ? "removeClass" : "attachClass"; a.editable()[f]("cke_show_blocks") } } }; CKEDITOR.plugins.add("showblocks", {
                onLoad: function () {
                    var a = "p div pre address blockquote h1 h2 h3 h4 h5 h6".split(" "), f, b, d, m, k = CKEDITOR.getUrl(this.path),
                        l = !(CKEDITOR.env.ie && 9 > CKEDITOR.env.version), g = l ? ":not([contenteditable\x3dfalse]):not(.cke_show_blocks_off)" : "", e, c; for (f = b = d = m = ""; e = a.pop();)c = a.length ? "," : "", f += ".cke_show_blocks " + e + g + c, d += ".cke_show_blocks.cke_contents_ltr " + e + g + c, m += ".cke_show_blocks.cke_contents_rtl " + e + g + c, b += ".cke_show_blocks " + e + g + "{background-image:url(" + CKEDITOR.getUrl(k + "images/block_" + e + ".png") + ")}"; CKEDITOR.addCss((f + "{background-repeat:no-repeat;border:1px dotted gray;padding-top:8px}").concat(b, d + "{background-position:top left;padding-left:8px}",
                            m + "{background-position:top right;padding-right:8px}")); l || CKEDITOR.addCss(".cke_show_blocks [contenteditable\x3dfalse],.cke_show_blocks .cke_show_blocks_off{border:none;padding-top:0;background-image:none}.cke_show_blocks.cke_contents_rtl [contenteditable\x3dfalse],.cke_show_blocks.cke_contents_rtl .cke_show_blocks_off{padding-right:0}.cke_show_blocks.cke_contents_ltr [contenteditable\x3dfalse],.cke_show_blocks.cke_contents_ltr .cke_show_blocks_off{padding-left:0}")
                }, init: function (h) {
                    function f() { b.refresh(h) }
                    if (!h.blockless) { var b = h.addCommand("showblocks", a); b.canUndo = !1; h.config.startupOutlineBlocks && b.setState(CKEDITOR.TRISTATE_ON); h.ui.addButton && h.ui.addButton("ShowBlocks", { label: h.lang.showblocks.toolbar, command: "showblocks", toolbar: "tools,20" }); h.on("mode", function () { b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(h) }); h.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (h.on("focus", f), h.on("blur", f)); h.on("contentDom", function () { b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(h) }) }
                }
            })
        })(); (function () {
            var a =
                { preserveState: !0, editorFocus: !1, readOnly: 1, exec: function (a) { this.toggleState(); this.refresh(a) }, refresh: function (a) { if (a.document) { var f = this.state == CKEDITOR.TRISTATE_ON ? "attachClass" : "removeClass"; a.editable()[f]("cke_show_borders") } } }; CKEDITOR.plugins.add("showborders", {
                    modes: { wysiwyg: 1 }, onLoad: function () {
                        var a; a = (CKEDITOR.env.ie6Compat ? [".%1 table.%2,", ".%1 table.%2 td, .%1 table.%2 th", "{", "border : #d3d3d3 1px dotted", "}"] : ".%1 table.%2,;.%1 table.%2 \x3e tr \x3e td, .%1 table.%2 \x3e tr \x3e th,;.%1 table.%2 \x3e tbody \x3e tr \x3e td, .%1 table.%2 \x3e tbody \x3e tr \x3e th,;.%1 table.%2 \x3e thead \x3e tr \x3e td, .%1 table.%2 \x3e thead \x3e tr \x3e th,;.%1 table.%2 \x3e tfoot \x3e tr \x3e td, .%1 table.%2 \x3e tfoot \x3e tr \x3e th;{;border : #d3d3d3 1px dotted;}".split(";")).join("").replace(/%2/g,
                            "cke_show_border").replace(/%1/g, "cke_show_borders "); CKEDITOR.addCss(a)
                    }, init: function (h) {
                        var f = h.addCommand("showborders", a); f.canUndo = !1; !1 !== h.config.startupShowBorders && f.setState(CKEDITOR.TRISTATE_ON); h.on("mode", function () { f.state != CKEDITOR.TRISTATE_DISABLED && f.refresh(h) }, null, null, 100); h.on("contentDom", function () { f.state != CKEDITOR.TRISTATE_DISABLED && f.refresh(h) }); h.on("removeFormatCleanup", function (a) {
                            a = a.data; h.getCommand("showborders").state == CKEDITOR.TRISTATE_ON && a.is("table") && (!a.hasAttribute("border") ||
                                0 >= parseInt(a.getAttribute("border"), 10)) && a.addClass("cke_show_border")
                        })
                    }, afterInit: function (a) {
                        var f = a.dataProcessor; a = f && f.dataFilter; f = f && f.htmlFilter; a && a.addRules({ elements: { table: function (a) { a = a.attributes; var d = a["class"], f = parseInt(a.border, 10); f && !(0 >= f) || d && -1 != d.indexOf("cke_show_border") || (a["class"] = (d || "") + " cke_show_border") } } }); f && f.addRules({
                            elements: {
                                table: function (a) {
                                    a = a.attributes; var d = a["class"]; d && (a["class"] = d.replace("cke_show_border", "").replace(/\s{2}/, " ").replace(/^\s+|\s+$/,
                                        ""))
                                }
                            }
                        })
                    }
                }); CKEDITOR.on("dialogDefinition", function (a) {
                    var f = a.data.name; if ("table" == f || "tableProperties" == f) if (a = a.data.definition, f = a.getContents("info").get("txtBorder"), f.commit = CKEDITOR.tools.override(f.commit, function (a) { return function (d, f) { a.apply(this, arguments); var h = parseInt(this.getValue(), 10); f[!h || 0 >= h ? "addClass" : "removeClass"]("cke_show_border") } }), a = (a = a.getContents("advanced")) && a.get("advCSSClasses")) a.setup = CKEDITOR.tools.override(a.setup, function (a) {
                        return function () {
                            a.apply(this,
                                arguments); this.setValue(this.getValue().replace(/cke_show_border/, ""))
                        }
                    }), a.commit = CKEDITOR.tools.override(a.commit, function (a) { return function (d, f) { a.apply(this, arguments); parseInt(f.getAttribute("border"), 10) || f.addClass("cke_show_border") } })
                })
        })(); CKEDITOR.plugins.add("smiley", {
            requires: "dialog", init: function (a) {
                a.config.smiley_path = a.config.smiley_path || this.path + "images/"; a.addCommand("smiley", new CKEDITOR.dialogCommand("smiley", { allowedContent: "img[alt,height,!src,title,width]", requiredContent: "img" }));
                a.ui.addButton && a.ui.addButton("Smiley", { label: a.lang.smiley.toolbar, command: "smiley", toolbar: "insert,50" }); CKEDITOR.dialog.add("smiley", this.path + "dialogs/smiley.js")
            }
        }); CKEDITOR.config.smiley_images = "regular_smile.png sad_smile.png wink_smile.png teeth_smile.png confused_smile.png tongue_smile.png embarrassed_smile.png omg_smile.png whatchutalkingabout_smile.png angry_smile.png angel_smile.png shades_smile.png devil_smile.png cry_smile.png lightbulb.png thumbs_down.png thumbs_up.png heart.png broken_heart.png kiss.png envelope.png".split(" ");
        CKEDITOR.config.smiley_descriptions = "smiley;sad;wink;laugh;frown;cheeky;blush;surprise;indecision;angry;angel;cool;devil;crying;enlightened;no;yes;heart;broken heart;kiss;mail".split(";"); (function () {
            CKEDITOR.plugins.add("sourcearea", {
                init: function (h) {
                    function f() { var a = d && this.equals(CKEDITOR.document.getActive()); this.hide(); this.setStyle("height", this.getParent().$.clientHeight + "px"); this.setStyle("width", this.getParent().$.clientWidth + "px"); this.show(); a && this.focus() } if (h.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                        var b =
                            CKEDITOR.plugins.sourcearea; h.addMode("source", function (b) {
                                var d = h.ui.space("contents").getDocument().createElement("textarea"); d.setStyles(CKEDITOR.tools.extend({ width: CKEDITOR.env.ie7Compat ? "99%" : "100%", height: "100%", resize: "none", outline: "none", "text-align": "left" }, CKEDITOR.tools.cssVendorPrefix("tab-size", h.config.sourceAreaTabSize || 4))); d.setAttribute("dir", "ltr"); d.addClass("cke_source").addClass("cke_reset").addClass("cke_enable_context_menu"); h.ui.space("contents").append(d); d = h.editable(new a(h,
                                    d)); d.setData(h.getData(1)); CKEDITOR.env.ie && (d.attachListener(h, "resize", f, d), d.attachListener(CKEDITOR.document.getWindow(), "resize", f, d), CKEDITOR.tools.setTimeout(f, 0, d)); h.fire("ariaWidget", this); b()
                            }); h.addCommand("source", b.commands.source); h.ui.addButton && h.ui.addButton("Source", { isToggle: !0, label: h.lang.sourcearea.toolbar, command: "source", toolbar: "mode,10" }); h.on("mode", function () { h.getCommand("source").setState("source" == h.mode ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) }); var d = CKEDITOR.env.ie &&
                                9 == CKEDITOR.env.version
                    }
                }
            }); var a = CKEDITOR.tools.createClass({ base: CKEDITOR.editable, proto: { setData: function (a) { this.setValue(a); this.status = "ready"; this.editor.fire("dataReady") }, getData: function () { return this.getValue() }, insertHtml: function () { }, insertElement: function () { }, insertText: function () { }, setReadOnly: function (a) { this[(a ? "set" : "remove") + "Attribute"]("readOnly", "readonly") }, detach: function () { a.baseProto.detach.call(this); this.clearCustomData(); this.remove() } } })
        })(); CKEDITOR.plugins.sourcearea =
            { commands: { source: { modes: { wysiwyg: 1, source: 1 }, editorFocus: !1, readOnly: 1, exec: function (a) { "wysiwyg" == a.mode && a.fire("saveSnapshot"); a.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED); a.setMode("source" == a.mode ? "wysiwyg" : "source") }, canUndo: !1 } } }; CKEDITOR.plugins.add("specialchar", {
                availableLangs: {
                    af: 1, ar: 1, az: 1, bg: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, en: 1, "en-au": 1, "en-ca": 1, "en-gb": 1, eo: 1, es: 1, "es-mx": 1, et: 1, eu: 1, fa: 1, fi: 1, fr: 1, "fr-ca": 1, gl: 1, he: 1, hr: 1, hu: 1, id: 1, it: 1, ja: 1, km: 1, ko: 1, ku: 1,
                    lt: 1, lv: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, pt: 1, "pt-br": 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, sr: 1, "sr-latn": 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, zh: 1, "zh-cn": 1
                }, requires: "dialog", init: function (a) {
                    var h = this; CKEDITOR.dialog.add("specialchar", this.path + "dialogs/specialchar.js"); a.addCommand("specialchar", {
                        exec: function () {
                            var f = a.langCode, f = h.availableLangs[f] ? f : h.availableLangs[f.replace(/-.*/, "")] ? f.replace(/-.*/, "") : "en"; CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(h.path + "dialogs/lang/" + f + ".js"), function () {
                                CKEDITOR.tools.extend(a.lang.specialchar,
                                    h.langEntries[f]); a.openDialog("specialchar")
                            })
                        }, modes: { wysiwyg: 1 }, canUndo: !1
                    }); a.ui.addButton && a.ui.addButton("SpecialChar", { label: a.lang.specialchar.toolbar, command: "specialchar", toolbar: "insert,50" })
                }
            }); CKEDITOR.config.specialChars = "! \x26quot; # $ % \x26amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; \x26lt; \x3d \x26gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ \x26euro; \x26lsquo; \x26rsquo; \x26ldquo; \x26rdquo; \x26ndash; \x26mdash; \x26iexcl; \x26cent; \x26pound; \x26curren; \x26yen; \x26brvbar; \x26sect; \x26uml; \x26copy; \x26ordf; \x26laquo; \x26not; \x26reg; \x26macr; \x26deg; \x26sup2; \x26sup3; \x26acute; \x26micro; \x26para; \x26middot; \x26cedil; \x26sup1; \x26ordm; \x26raquo; \x26frac14; \x26frac12; \x26frac34; \x26iquest; \x26Agrave; \x26Aacute; \x26Acirc; \x26Atilde; \x26Auml; \x26Aring; \x26AElig; \x26Ccedil; \x26Egrave; \x26Eacute; \x26Ecirc; \x26Euml; \x26Igrave; \x26Iacute; \x26Icirc; \x26Iuml; \x26ETH; \x26Ntilde; \x26Ograve; \x26Oacute; \x26Ocirc; \x26Otilde; \x26Ouml; \x26times; \x26Oslash; \x26Ugrave; \x26Uacute; \x26Ucirc; \x26Uuml; \x26Yacute; \x26THORN; \x26szlig; \x26agrave; \x26aacute; \x26acirc; \x26atilde; \x26auml; \x26aring; \x26aelig; \x26ccedil; \x26egrave; \x26eacute; \x26ecirc; \x26euml; \x26igrave; \x26iacute; \x26icirc; \x26iuml; \x26eth; \x26ntilde; \x26ograve; \x26oacute; \x26ocirc; \x26otilde; \x26ouml; \x26divide; \x26oslash; \x26ugrave; \x26uacute; \x26ucirc; \x26uuml; \x26yacute; \x26thorn; \x26yuml; \x26OElig; \x26oelig; \x26#372; \x26#374 \x26#373 \x26#375; \x26sbquo; \x26#8219; \x26bdquo; \x26hellip; \x26trade; \x26#9658; \x26bull; \x26rarr; \x26rArr; \x26hArr; \x26diams; \x26asymp;".split(" ");
        (function () {
            CKEDITOR.plugins.add("stylescombo", {
                requires: "richcombo", init: function (a) {
                    var h = a.config, f = a.lang.stylescombo, b = {}, d = [], m = []; a.on("stylesSet", function (f) {
                        if (f = f.data.styles) {
                            for (var l, g, e, c = 0, n = f.length; c < n; c++)(l = f[c], a.blockless && l.element in CKEDITOR.dtd.$block || "string" == typeof l.type && !CKEDITOR.style.customHandlers[l.type] || (g = l.name, l = new CKEDITOR.style(l), a.filter.customConfig && !a.filter.check(l))) || (l._name = g, l._.enterMode = h.enterMode, l._.type = e = l.assignedTo || l.type, l._.weight =
                                c + 1E3 * (e == CKEDITOR.STYLE_OBJECT ? 1 : e == CKEDITOR.STYLE_BLOCK ? 2 : 3), b[g] = l, d.push(l), m.push(l)); d.sort(function (a, b) { return a._.weight - b._.weight })
                        }
                    }); a.on("stylesRemove", function (d) { d = d.data && d.data.type; var f = void 0 === d, g; for (g in b) { var e = b[g]; (f || e.type === d) && a.removeStyle(e) } }); a.ui.addRichCombo("Styles", {
                        label: f.label, title: f.panelTitle, toolbar: "styles,10", allowedContent: m, panel: { css: [CKEDITOR.skin.getPath("editor")].concat(h.contentsCss), multiSelect: !0, attributes: { "aria-label": f.panelTitle } }, init: function () {
                            var a,
                                b, g, e, c, h; c = 0; for (h = d.length; c < h; c++)a = d[c], b = a._name, e = a._.type, e != g && (this.startGroup(f["panelTitle" + String(e)]), g = e), this.add(b, a.type == CKEDITOR.STYLE_OBJECT ? b : a.buildPreview(), b); this.commit()
                        }, onClick: function (d) { a.focus(); a.fire("saveSnapshot"); d = b[d]; var f = a.elementPath(); if (d.group && d.removeStylesFromSameGroup(a)) a.applyStyle(d); else a[d.checkActive(f, a) ? "removeStyle" : "applyStyle"](d); a.fire("saveSnapshot") }, onRender: function () {
                            a.on("selectionChange", function (d) {
                                var f = this.getValue(); d = d.data.path.elements;
                                for (var g = 0, e = d.length, c; g < e; g++) { c = d[g]; for (var h in b) if (b[h].checkElementRemovable(c, !0, a)) { h != f && this.setValue(h); return } } this.setValue("")
                            }, this)
                        }, onOpen: function () {
                            var d = a.getSelection(), d = d.getSelectedElement() || d.getStartElement() || a.editable(), d = a.elementPath(d), h = [0, 0, 0, 0]; this.showAll(); this.unmarkAll(); for (var g in b) { var e = b[g], c = e._.type; e.checkApplicable(d, a, a.activeFilter) ? h[c]++ : this.hideItem(g); e.checkActive(d, a) && this.mark(g) } h[CKEDITOR.STYLE_BLOCK] || this.hideGroup(f["panelTitle" +
                                String(CKEDITOR.STYLE_BLOCK)]); h[CKEDITOR.STYLE_INLINE] || this.hideGroup(f["panelTitle" + String(CKEDITOR.STYLE_INLINE)]); h[CKEDITOR.STYLE_OBJECT] || this.hideGroup(f["panelTitle" + String(CKEDITOR.STYLE_OBJECT)])
                        }, refresh: function () { var d = a.elementPath(); if (d) { for (var f in b) if (b[f].checkApplicable(d, a, a.activeFilter)) return; this.setState(CKEDITOR.TRISTATE_DISABLED) } }, reset: function () { b = {}; d = [] }
                    })
                }
            })
        })(); (function () {
            function a(a) {
                return {
                    editorFocus: !1, canUndo: !1, modes: { wysiwyg: 1 }, exec: function (b) {
                        if (b.editable().hasFocus) {
                            var f =
                                b.getSelection(), h; if (h = (new CKEDITOR.dom.elementPath(f.getStartElement(), f.root)).contains({ td: 1, th: 1 }, 1)) {
                                    var f = b.createRange(), g = CKEDITOR.tools.tryThese(function () { var b = h.getParent().$.cells[h.$.cellIndex + (a ? -1 : 1)]; b.parentNode.parentNode; return b }, function () { var b = h.getParent(), b = b.getAscendant("table").$.rows[b.$.rowIndex + (a ? -1 : 1)]; return b.cells[a ? b.cells.length - 1 : 0] }); if (g || a) if (g) g = new CKEDITOR.dom.element(g), f.moveToElementEditStart(g), f.checkStartOfBlock() && f.checkEndOfBlock() || f.selectNodeContents(g);
                                    else return !0; else { for (var e = h.getAscendant("table").$, g = h.getParent().$.cells, e = new CKEDITOR.dom.element(e.insertRow(-1), b.document), c = 0, n = g.length; c < n; c++)e.append((new CKEDITOR.dom.element(g[c], b.document)).clone(!1, !1)).appendBogus(); f.moveToElementEditStart(e) } f.select(!0); return !0
                                }
                        } return !1
                    }
                }
            } var h = { editorFocus: !1, modes: { wysiwyg: 1, source: 1 } }, f = { exec: function (a) { a.container.focusNext(!0, a.tabIndex) } }, b = { exec: function (a) { a.container.focusPrevious(!0, a.tabIndex) } }; CKEDITOR.plugins.add("tab", {
                init: function (d) {
                    for (var m =
                        !1 !== d.config.enableTabKeyTools, k = d.config.tabSpaces || 0, l = ""; k--;)l += " "; if (l) d.on("key", function (a) { 9 == a.data.keyCode && (d.insertText(l), a.cancel()) }); if (m) d.on("key", function (a) { (9 == a.data.keyCode && d.execCommand("selectNextCell") || a.data.keyCode == CKEDITOR.SHIFT + 9 && d.execCommand("selectPreviousCell")) && a.cancel() }); d.addCommand("blur", CKEDITOR.tools.extend(f, h)); d.addCommand("blurBack", CKEDITOR.tools.extend(b, h)); d.addCommand("selectNextCell", a()); d.addCommand("selectPreviousCell", a(!0))
                }
            })
        })(); CKEDITOR.dom.element.prototype.focusNext =
            function (a, h) {
                var f = void 0 === h ? this.getTabIndex() : h, b, d, m, k, l, g; if (0 >= f) for (l = this.getNextSourceNode(a, CKEDITOR.NODE_ELEMENT); l;) { if (l.isVisible() && 0 === l.getTabIndex()) { m = l; break } l = l.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT) } else for (l = this.getDocument().getBody().getFirst(); l = l.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
                    if (!b) if (!d && l.equals(this)) { if (d = !0, a) { if (!(l = l.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break; b = 1 } } else d && !this.contains(l) && (b = 1); if (l.isVisible() && !(0 > (g = l.getTabIndex()))) {
                        if (b &&
                            g == f) { m = l; break } g > f && (!m || !k || g < k) ? (m = l, k = g) : m || 0 !== g || (m = l, k = g)
                    }
                } m && m.focus()
            }; CKEDITOR.dom.element.prototype.focusPrevious = function (a, h) {
                for (var f = void 0 === h ? this.getTabIndex() : h, b, d, m, k = 0, l, g = this.getDocument().getBody().getLast(); g = g.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
                    if (!b) if (!d && g.equals(this)) { if (d = !0, a) { if (!(g = g.getPreviousSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break; b = 1 } } else d && !this.contains(g) && (b = 1); if (g.isVisible() && !(0 > (l = g.getTabIndex()))) if (0 >= f) {
                        if (b && 0 === l) { m = g; break } l >
                            k && (m = g, k = l)
                    } else { if (b && l == f) { m = g; break } l < f && (!m || l > k) && (m = g, k = l) }
                } m && m.focus()
            }; CKEDITOR.plugins.add("table", {
                requires: "dialog", init: function (a) {
                    function h(a) { return CKEDITOR.tools.extend(a || {}, { contextSensitive: 1, refresh: function (a, b) { this.setState(b.contains("table", 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } }) } if (!a.blockless) {
                        var f = a.lang.table; a.addCommand("table", new CKEDITOR.dialogCommand("table", {
                            context: "table", allowedContent: "table{width,height,border-collapse}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];td{border*,background-color,vertical-align,width,height}[colspan,rowspan];" +
                                (a.plugins.dialogadvtab ? "table" + a.plugins.dialogadvtab.allowedContent() : ""), requiredContent: "table", contentTransformations: [["table{width}: sizeToStyle", "table[width]: sizeToAttribute"], ["td: splitBorderShorthand"], [{
                                    element: "table", right: function (a) {
                                        if (a.styles) {
                                            var d; if (a.styles.border) d = CKEDITOR.tools.style.parse.border(a.styles.border); else if (CKEDITOR.env.ie && 8 === CKEDITOR.env.version) {
                                                var f = a.styles; f["border-left"] && f["border-left"] === f["border-right"] && f["border-right"] === f["border-top"] &&
                                                    f["border-top"] === f["border-bottom"] && (d = CKEDITOR.tools.style.parse.border(f["border-top"]))
                                            } d && d.style && "solid" === d.style && d.width && 0 !== parseFloat(d.width) && (a.attributes.border = 1); "collapse" == a.styles["border-collapse"] && (a.attributes.cellspacing = 0)
                                        }
                                    }
                                }]]
                        })); a.addCommand("tableProperties", new CKEDITOR.dialogCommand("tableProperties", h())); a.addCommand("tableDelete", h({
                            exec: function (a) {
                                var d = a.elementPath().contains("table", 1); if (d) {
                                    var f = d.getParent(), h = a.editable(); 1 != f.getChildCount() || f.is("td",
                                        "th") || f.equals(h) || (d = f); a = a.createRange(); a.moveToPosition(d, CKEDITOR.POSITION_BEFORE_START); d.remove(); a.select()
                                }
                            }
                        })); a.ui.addButton && a.ui.addButton("Table", { label: f.toolbar, command: "table", toolbar: "insert,30" }); CKEDITOR.dialog.add("table", this.path + "dialogs/table.js"); CKEDITOR.dialog.add("tableProperties", this.path + "dialogs/table.js"); a.addMenuItems && a.addMenuItems({
                            table: { label: f.menu, command: "tableProperties", group: "table", order: 5 }, tabledelete: {
                                label: f.deleteTable, command: "tableDelete", group: "table",
                                order: 1
                            }
                        }); a.on("doubleclick", function (a) { a.data.element.is("table") && (a.data.dialog = "tableProperties") }); a.contextMenu && a.contextMenu.addListener(function () { return { tabledelete: CKEDITOR.TRISTATE_OFF, table: CKEDITOR.TRISTATE_OFF } })
                    }
                }
            }); (function () {
                function a(a, b) {
                    function e(a) { return b ? b.contains(a) && a.getAscendant("table", !0).equals(b) : !0 } function c(a) {
                        var b = /^(?:td|th)$/; 0 < d.length || a.type != CKEDITOR.NODE_ELEMENT || !b.test(a.getName()) || a.getCustomData("selected_cell") || (CKEDITOR.dom.element.setMarker(f,
                            a, "selected_cell", !0), d.push(a))
                    } var d = [], f = {}; if (!a) return d; for (var g = a.getRanges(), h = 0; h < g.length; h++) { var k = g[h]; if (k.collapsed) (k = k.getCommonAncestor().getAscendant({ td: 1, th: 1 }, !0)) && e(k) && d.push(k); else { var k = new CKEDITOR.dom.walker(k), l; for (k.guard = c; l = k.next();)l.type == CKEDITOR.NODE_ELEMENT && l.is(CKEDITOR.dtd.table) || (l = l.getAscendant({ td: 1, th: 1 }, !0)) && !l.getCustomData("selected_cell") && e(l) && (CKEDITOR.dom.element.setMarker(f, l, "selected_cell", !0), d.push(l)) } } CKEDITOR.dom.element.clearAllMarkers(f);
                    return d
                } function h(b, e) {
                    for (var c = u(b) ? b : a(b), d = c[0], f = d.getAscendant("table"), d = d.getDocument(), g = c[0].getParent(), h = g.$.rowIndex, c = c[c.length - 1], k = c.getParent().$.rowIndex + c.$.rowSpan - 1, c = new CKEDITOR.dom.element(f.$.rows[k]), h = e ? h : k, g = e ? g : c, c = CKEDITOR.tools.buildTableMap(f), f = c[h], h = e ? c[h - 1] : c[h + 1], c = c[0].length, d = d.createElement("tr"), k = 0; f[k] && k < c; k++) {
                        var l; 1 < f[k].rowSpan && h && f[k] == h[k] ? (l = f[k], l.rowSpan += 1) : (l = (new CKEDITOR.dom.element(f[k])).clone(), l.removeAttribute("rowSpan"), l.appendBogus(),
                            d.append(l), l = l.$); k += l.colSpan - 1
                    } e ? d.insertBefore(g) : d.insertAfter(g); return d
                } function f(b) {
                    if (b instanceof CKEDITOR.dom.selection) {
                        var e = b.getRanges(), c = a(b), d = c[0].getAscendant("table"), g = CKEDITOR.tools.buildTableMap(d), h = c[0].getParent().$.rowIndex, c = c[c.length - 1], k = c.getParent().$.rowIndex + c.$.rowSpan - 1, c = []; b.reset(); for (b = h; b <= k; b++) {
                            for (var l = g[b], m = new CKEDITOR.dom.element(d.$.rows[b]), n = 0; n < l.length; n++) {
                                var r = new CKEDITOR.dom.element(l[n]), u = r.getParent().$.rowIndex; 1 == r.$.rowSpan ? r.remove() :
                                    (--r.$.rowSpan, u == b && (u = g[b + 1], u[n - 1] ? r.insertAfter(new CKEDITOR.dom.element(u[n - 1])) : (new CKEDITOR.dom.element(d.$.rows[b + 1])).append(r, 1))); n += r.$.colSpan - 1
                            } c.push(m)
                        } g = d.$.rows; e[0].moveToPosition(d, CKEDITOR.POSITION_BEFORE_START); h = new CKEDITOR.dom.element(g[k + 1] || (0 < h ? g[h - 1] : null) || d.$.parentNode); for (b = c.length; 0 <= b; b--)f(c[b]); return d.$.parentNode ? h : (e[0].select(), null)
                    } b instanceof CKEDITOR.dom.element && (d = b.getAscendant("table"), 1 == d.$.rows.length ? d.remove() : b.remove()); return null
                } function b(a) {
                    for (var b =
                        a.getParent().$.cells, e = 0, c = 0; c < b.length; c++) { var d = b[c], e = e + d.colSpan; if (d == a.$) break } return e - 1
                } function d(a, e) { for (var c = e ? Infinity : 0, d = 0; d < a.length; d++) { var f = b(a[d]); if (e ? f < c : f > c) c = f } return c } function m(b, e) {
                    for (var c = u(b) ? b : a(b), f = c[0].getAscendant("table"), g = d(c, 1), c = d(c), h = e ? g : c, k = CKEDITOR.tools.buildTableMap(f), f = [], g = [], c = [], l = k.length, m = 0; m < l; m++) { var n = e ? k[m][h - 1] : k[m][h + 1]; f.push(k[m][h]); g.push(n) } for (m = 0; m < l; m++)f[m] && (1 < f[m].colSpan && g[m] == f[m] ? (k = f[m], k.colSpan += 1) : (h = new CKEDITOR.dom.element(f[m]),
                        k = h.clone(), k.removeAttribute("colSpan"), k.appendBogus(), k[e ? "insertBefore" : "insertAfter"].call(k, h), c.push(k), k = k.$), m += k.rowSpan - 1); return c
                } function k(b) {
                    function e(a) {
                        var b = a.getRanges(), c, d; if (1 !== b.length) return a; b = b[0]; if (b.collapsed || 0 !== b.endOffset) return a; c = b.endContainer; d = c.getName().toLowerCase(); if ("td" !== d && "th" !== d) return a; for ((d = c.getPrevious()) || (d = c.getParent().getPrevious().getLast()); d.type !== CKEDITOR.NODE_TEXT && "br" !== d.getName().toLowerCase();)if (d = d.getLast(), !d) return a;
                        b.setEndAt(d, CKEDITOR.POSITION_BEFORE_END); return b.select()
                    } CKEDITOR.env.webkit && !b.isFake && (b = e(b)); var c = b.getRanges(), d = a(b), f = d[0], g = d[d.length - 1], d = f.getAscendant("table"), h = CKEDITOR.tools.buildTableMap(d), k, l, m = []; b.reset(); var n = 0; for (b = h.length; n < b; n++)for (var r = 0, u = h[n].length; r < u; r++)void 0 === k && h[n][r] == f.$ && (k = r), h[n][r] == g.$ && (l = r); for (n = k; n <= l; n++)for (r = 0; r < h.length; r++)g = h[r], f = new CKEDITOR.dom.element(d.$.rows[r]), g = new CKEDITOR.dom.element(g[n]), g.$ && (1 == g.$.colSpan ? g.remove() : --g.$.colSpan,
                        r += g.$.rowSpan - 1, f.$.cells.length || m.push(f)); k = h[0].length - 1 > l ? new CKEDITOR.dom.element(h[0][l + 1]) : k && -1 !== h[0][k - 1].cellIndex ? new CKEDITOR.dom.element(h[0][k - 1]) : new CKEDITOR.dom.element(d.$.parentNode); m.length == b && (c[0].moveToPosition(d, CKEDITOR.POSITION_AFTER_END), c[0].select(), d.remove()); return k
                } function l(a, b) { var e = a.getStartElement().getAscendant({ td: 1, th: 1 }, !0); if (e) { var c = e.clone(); c.appendBogus(); b ? c.insertBefore(e) : c.insertAfter(e) } } function g(b) {
                    if (b instanceof CKEDITOR.dom.selection) {
                        var c =
                            b.getRanges(), d = a(b), f = d[0] && d[0].getAscendant("table"), h; a: { var k = 0; h = d.length - 1; for (var l = {}, m, n; m = d[k++];)CKEDITOR.dom.element.setMarker(l, m, "delete_cell", !0); for (k = 0; m = d[k++];)if ((n = m.getPrevious()) && !n.getCustomData("delete_cell") || (n = m.getNext()) && !n.getCustomData("delete_cell")) { CKEDITOR.dom.element.clearAllMarkers(l); h = n; break a } CKEDITOR.dom.element.clearAllMarkers(l); k = d[0].getParent(); (k = k.getPrevious()) ? h = k.getLast() : (k = d[h].getParent(), h = (k = k.getNext()) ? k.getChild(0) : null) } b.reset(); for (b =
                                d.length - 1; 0 <= b; b--)g(d[b]); h ? e(h, !0) : f && (c[0].moveToPosition(f, CKEDITOR.POSITION_BEFORE_START), c[0].select(), f.remove())
                    } else b instanceof CKEDITOR.dom.element && (c = b.getParent(), 1 == c.getChildCount() ? c.remove() : b.remove())
                } function e(a, b) { var e = a.getDocument(), c = CKEDITOR.document; CKEDITOR.env.ie && 10 == CKEDITOR.env.version && (c.focus(), e.focus()); e = new CKEDITOR.dom.range(e); e["moveToElementEdit" + (b ? "End" : "Start")](a) || (e.selectNodeContents(a), e.collapse(b ? !1 : !0)); e.select(!0) } function c(a, b, e) {
                    a = a[b];
                    if ("undefined" == typeof e) return a; for (b = 0; a && b < a.length; b++) { if (e.is && a[b] == e.$) return b; if (b == e) return new CKEDITOR.dom.element(a[b]) } return e.is ? -1 : null
                } function n(b, e, d) {
                    var f = a(b), g; if ((e ? 1 != f.length : 2 > f.length) || (g = b.getCommonAncestor()) && g.type == CKEDITOR.NODE_ELEMENT && g.is("table")) return !1; b = f[0]; g = b.getAscendant("table"); var h = CKEDITOR.tools.buildTableMap(g), k = h.length, l = h[0].length, m = b.getParent().$.rowIndex, n = c(h, m, b), r; if (e) {
                        var u; try {
                            var x = parseInt(b.getAttribute("rowspan"), 10) || 1; r = parseInt(b.getAttribute("colspan"),
                                10) || 1; u = h["up" == e ? m - x : "down" == e ? m + x : m]["left" == e ? n - r : "right" == e ? n + r : n]
                        } catch (w) { return !1 } if (!u || b.$ == u) return !1; f["up" == e || "left" == e ? "unshift" : "push"](new CKEDITOR.dom.element(u))
                    } e = b.getDocument(); var K = m, x = u = 0, S = !d && new CKEDITOR.dom.documentFragment(e), I = 0; for (e = 0; e < f.length; e++) {
                        r = f[e]; var E = r.getParent(), P = r.getFirst(), M = r.$.colSpan, O = r.$.rowSpan, E = E.$.rowIndex, N = c(h, E, r), I = I + M * O, x = Math.max(x, N - n + M); u = Math.max(u, E - m + O); d || (M = r, (O = M.getBogus()) && O.remove(), M.trim(), r.getChildren().count() && (E ==
                            K || !P || P.isBlockBoundary && P.isBlockBoundary({ br: 1 }) || (K = S.getLast(CKEDITOR.dom.walker.whitespaces(!0)), !K || K.is && K.is("br") || S.append("br")), r.moveChildren(S)), e ? r.remove() : r.setHtml("")); K = E
                    } if (d) return u * x == I; S.moveChildren(b); b.appendBogus(); x >= l ? b.removeAttribute("rowSpan") : b.$.rowSpan = u; u >= k ? b.removeAttribute("colSpan") : b.$.colSpan = x; d = new CKEDITOR.dom.nodeList(g.$.rows); f = d.count(); for (e = f - 1; 0 <= e; e--)g = d.getItem(e), g.$.cells.length || (g.remove(), f++); return b
                } function r(b, e) {
                    var d = a(b); if (1 <
                        d.length) return !1; if (e) return !0; var d = d[0], f = d.getParent(), g = f.getAscendant("table"), h = CKEDITOR.tools.buildTableMap(g), k = f.$.rowIndex, l = c(h, k, d), m = d.$.rowSpan, n; if (1 < m) { n = Math.ceil(m / 2); for (var m = Math.floor(m / 2), f = k + n, g = new CKEDITOR.dom.element(g.$.rows[f]), h = c(h, f), r, f = d.clone(), k = 0; k < h.length; k++)if (r = h[k], r.parentNode == g.$ && k > l) { f.insertBefore(new CKEDITOR.dom.element(r)); break } else r = null; r || g.append(f) } else for (m = n = 1, g = f.clone(), g.insertAfter(f), g.append(f = d.clone()), r = c(h, k), l = 0; l < r.length; l++)r[l].rowSpan++;
                    f.appendBogus(); d.$.rowSpan = n; f.$.rowSpan = m; 1 == n && d.removeAttribute("rowSpan"); 1 == m && f.removeAttribute("rowSpan"); return f
                } function x(b, e) {
                    var d = a(b); if (1 < d.length) return !1; if (e) return !0; var d = d[0], f = d.getParent(), g = f.getAscendant("table"), g = CKEDITOR.tools.buildTableMap(g), h = c(g, f.$.rowIndex, d), k = d.$.colSpan; if (1 < k) f = Math.ceil(k / 2), k = Math.floor(k / 2); else { for (var k = f = 1, l = [], m = 0; m < g.length; m++) { var n = g[m]; l.push(n[h]); 1 < n[h].rowSpan && (m += n[h].rowSpan - 1) } for (g = 0; g < l.length; g++)l[g].colSpan++ } g = d.clone();
                    g.insertAfter(d); g.appendBogus(); d.$.colSpan = f; g.$.colSpan = k; 1 == f && d.removeAttribute("colSpan"); 1 == k && g.removeAttribute("colSpan"); return g
                } var u = CKEDITOR.tools.isArray; CKEDITOR.plugins.tabletools = {
                    requires: "table,dialog,contextmenu", init: function (b) {
                        function c(a) { return CKEDITOR.tools.extend(a || {}, { contextSensitive: 1, refresh: function (a, b) { this.setState(b.contains({ td: 1, th: 1 }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } }) } function d(a, e) { var c = b.addCommand(a, e); b.addFeature(c) } var q = b.lang.table,
                            u = CKEDITOR.tools.style.parse, w = "td{width} td{height} td{border-color} td{background-color} td{white-space} td{vertical-align} td{text-align} td[colspan] td[rowspan] th".split(" "); d("cellProperties", new CKEDITOR.dialogCommand("cellProperties", c({
                                allowedContent: "td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]", requiredContent: w, contentTransformations: [[{
                                    element: "td", left: function (a) { return a.styles.background && u.background(a.styles.background).color },
                                    right: function (a) { a.styles["background-color"] = u.background(a.styles.background).color }
                                }, { element: "td", check: "td{vertical-align}", left: function (a) { return a.attributes && a.attributes.valign }, right: function (a) { a.styles["vertical-align"] = a.attributes.valign; delete a.attributes.valign } }], [{
                                    element: "tr", check: "td{height}", left: function (a) { return a.styles && a.styles.height }, right: function (a) {
                                        CKEDITOR.tools.array.forEach(a.children, function (b) { b.name in { td: 1, th: 1 } && (b.attributes["cke-row-height"] = a.styles.height) });
                                        delete a.styles.height
                                    }
                                }], [{ element: "td", check: "td{height}", left: function (a) { return (a = a.attributes) && a["cke-row-height"] }, right: function (a) { a.styles.height = a.attributes["cke-row-height"]; delete a.attributes["cke-row-height"] } }]]
                            }))); CKEDITOR.dialog.add("cellProperties", this.path + "dialogs/tableCell.js"); d("rowDelete", c({ requiredContent: "table", exec: function (a) { a = a.getSelection(); (a = f(a)) && e(a) } })); d("rowInsertBefore", c({ requiredContent: "table", exec: function (b) { b = b.getSelection(); b = a(b); h(b, !0) } }));
                        d("rowInsertAfter", c({ requiredContent: "table", exec: function (b) { b = b.getSelection(); b = a(b); h(b) } })); d("columnDelete", c({ requiredContent: "table", exec: function (a) { a = a.getSelection(); (a = k(a)) && e(a, !0) } })); d("columnInsertBefore", c({ requiredContent: "table", exec: function (b) { b = b.getSelection(); b = a(b); m(b, !0) } })); d("columnInsertAfter", c({ requiredContent: "table", exec: function (b) { b = b.getSelection(); b = a(b); m(b) } })); d("cellDelete", c({ requiredContent: "table", exec: function (a) { a = a.getSelection(); g(a) } })); d("cellMerge",
                            c({ allowedContent: "td[colspan,rowspan]", requiredContent: "td[colspan,rowspan]", exec: function (a, b) { b.cell = n(a.getSelection()); e(b.cell, !0) } })); d("cellMergeRight", c({ allowedContent: "td[colspan]", requiredContent: "td[colspan]", exec: function (a, b) { b.cell = n(a.getSelection(), "right"); e(b.cell, !0) } })); d("cellMergeDown", c({ allowedContent: "td[rowspan]", requiredContent: "td[rowspan]", exec: function (a, b) { b.cell = n(a.getSelection(), "down"); e(b.cell, !0) } })); d("cellVerticalSplit", c({
                                allowedContent: "td[rowspan]", requiredContent: "td[rowspan]",
                                exec: function (a) { e(x(a.getSelection())) }
                            })); d("cellHorizontalSplit", c({ allowedContent: "td[colspan]", requiredContent: "td[colspan]", exec: function (a) { e(r(a.getSelection())) } })); d("cellInsertBefore", c({ requiredContent: "table", exec: function (a) { a = a.getSelection(); l(a, !0) } })); d("cellInsertAfter", c({ requiredContent: "table", exec: function (a) { a = a.getSelection(); l(a) } })); b.addMenuItems && b.addMenuItems({
                                tablecell: {
                                    label: q.cell.menu, group: "tablecell", order: 1, getItems: function () {
                                        var e = b.getSelection(), c = a(e), e =
                                        {
                                            tablecell_insertBefore: CKEDITOR.TRISTATE_OFF, tablecell_insertAfter: CKEDITOR.TRISTATE_OFF, tablecell_delete: CKEDITOR.TRISTATE_OFF, tablecell_merge: n(e, null, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_merge_right: n(e, "right", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_merge_down: n(e, "down", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_split_vertical: x(e, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_split_horizontal: r(e, !0) ? CKEDITOR.TRISTATE_OFF :
                                                CKEDITOR.TRISTATE_DISABLED
                                        }; b.filter.check(w) && (e.tablecell_properties = 0 < c.length ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); return e
                                    }
                                }, tablecell_insertBefore: { label: q.cell.insertBefore, group: "tablecell", command: "cellInsertBefore", order: 5 }, tablecell_insertAfter: { label: q.cell.insertAfter, group: "tablecell", command: "cellInsertAfter", order: 10 }, tablecell_delete: { label: q.cell.deleteCell, group: "tablecell", command: "cellDelete", order: 15 }, tablecell_merge: {
                                    label: q.cell.merge, group: "tablecell", command: "cellMerge",
                                    order: 16
                                }, tablecell_merge_right: { label: q.cell.mergeRight, group: "tablecell", command: "cellMergeRight", order: 17 }, tablecell_merge_down: { label: q.cell.mergeDown, group: "tablecell", command: "cellMergeDown", order: 18 }, tablecell_split_horizontal: { label: q.cell.splitHorizontal, group: "tablecell", command: "cellHorizontalSplit", order: 19 }, tablecell_split_vertical: { label: q.cell.splitVertical, group: "tablecell", command: "cellVerticalSplit", order: 20 }, tablecell_properties: {
                                    label: q.cell.title, group: "tablecellproperties", command: "cellProperties",
                                    order: 21
                                }, tablerow: { label: q.row.menu, group: "tablerow", order: 1, getItems: function () { return { tablerow_insertBefore: CKEDITOR.TRISTATE_OFF, tablerow_insertAfter: CKEDITOR.TRISTATE_OFF, tablerow_delete: CKEDITOR.TRISTATE_OFF } } }, tablerow_insertBefore: { label: q.row.insertBefore, group: "tablerow", command: "rowInsertBefore", order: 5 }, tablerow_insertAfter: { label: q.row.insertAfter, group: "tablerow", command: "rowInsertAfter", order: 10 }, tablerow_delete: { label: q.row.deleteRow, group: "tablerow", command: "rowDelete", order: 15 },
                                tablecolumn: { label: q.column.menu, group: "tablecolumn", order: 1, getItems: function () { return { tablecolumn_insertBefore: CKEDITOR.TRISTATE_OFF, tablecolumn_insertAfter: CKEDITOR.TRISTATE_OFF, tablecolumn_delete: CKEDITOR.TRISTATE_OFF } } }, tablecolumn_insertBefore: { label: q.column.insertBefore, group: "tablecolumn", command: "columnInsertBefore", order: 5 }, tablecolumn_insertAfter: { label: q.column.insertAfter, group: "tablecolumn", command: "columnInsertAfter", order: 10 }, tablecolumn_delete: {
                                    label: q.column.deleteColumn, group: "tablecolumn",
                                    command: "columnDelete", order: 15
                                }
                            }); b.contextMenu && b.contextMenu.addListener(function (a, b, e) { return (a = e.contains({ td: 1, th: 1 }, 1)) && !a.isReadOnly() ? { tablecell: CKEDITOR.TRISTATE_OFF, tablerow: CKEDITOR.TRISTATE_OFF, tablecolumn: CKEDITOR.TRISTATE_OFF } : null })
                    }, getCellColIndex: b, insertRow: h, insertColumn: m, getSelectedCells: a
                }; CKEDITOR.plugins.add("tabletools", CKEDITOR.plugins.tabletools)
            })(); CKEDITOR.tools.buildTableMap = function (a, h, f, b, d) {
                a = a.$.rows; f = f || 0; b = "number" === typeof b ? b : a.length - 1; d = "number" === typeof d ?
                    d : -1; var m = -1, k = []; for (h = h || 0; h <= b; h++) { m++; !k[m] && (k[m] = []); for (var l = -1, g = f; g <= (-1 === d ? a[h].cells.length - 1 : d); g++) { var e = a[h].cells[g]; if (!e) break; for (l++; k[m][l];)l++; for (var c = isNaN(e.colSpan) ? 1 : e.colSpan, e = isNaN(e.rowSpan) ? 1 : e.rowSpan, n = 0; n < e && !(h + n > b); n++) { k[m + n] || (k[m + n] = []); for (var r = 0; r < c; r++)k[m + n][l + r] = a[h].cells[g] } l += c - 1; if (-1 !== d && l >= d) break } } return k
            }; CKEDITOR.config.tabletools_scopedHeaders = !1; (function () {
                function a(a) { return CKEDITOR.plugins.widget && CKEDITOR.plugins.widget.isDomWidget(a) }
                function h(a, b) {
                    var e = a.getAscendant("table"), c = b.getAscendant("table"), d = CKEDITOR.tools.buildTableMap(e), f = g(a), h = g(b), k = [], l = {}, m, n; e.contains(c) && (b = b.getAscendant({ td: 1, th: 1 }), h = g(b)); f > h && (e = f, f = h, h = e, e = a, a = b, b = e); for (e = 0; e < d[f].length; e++)if (a.$ === d[f][e]) { m = e; break } for (e = 0; e < d[h].length; e++)if (b.$ === d[h][e]) { n = e; break } m > n && (e = m, m = n, n = e); for (e = f; e <= h; e++)for (f = m; f <= n; f++)c = new CKEDITOR.dom.element(d[e][f]), c.$ && !c.getCustomData("selected_cell") && (k.push(c), CKEDITOR.dom.element.setMarker(l, c,
                        "selected_cell", !0)); CKEDITOR.dom.element.clearAllMarkers(l); return k
                } function f(a) { return (a = a.editable().findOne(".cke_table-faked-selection")) && a.getAscendant("table") } function b(a, b) {
                    var e = a.editable().find(".cke_table-faked-selection"), c = a.editable().findOne("[data-cke-table-faked-selection-table]"), d; a.fire("lockSnapshot"); a.editable().removeClass("cke_table-faked-selection-editor"); for (d = 0; d < e.count(); d++)e.getItem(d).removeClass("cke_table-faked-selection"); c && c.data("cke-table-faked-selection-table",
                        !1); a.fire("unlockSnapshot"); b && (p = { active: !1 }, a.getSelection().isInTable() && a.getSelection().reset())
                } function d(a, b) { var e = [], c, d; for (d = 0; d < b.length; d++)c = a.createRange(), c.setStartBefore(b[d]), c.setEndAfter(b[d]), e.push(c); a.getSelection().selectRanges(e) } function m(a) { var b = a.editable().find(".cke_table-faked-selection"); 1 > b.count() || (b = h(b.getItem(0), b.getItem(b.count() - 1)), d(a, b)) } function k(e, c, f) {
                    var g = w(e.getSelection(!0)); c = c.is("table") ? null : c; var k; (k = p.active && !p.first) && !(k = c) && (k = e.getSelection().getRanges(),
                        k = 1 < g.length || k[0] && !k[0].collapsed ? !0 : !1); if (k) p.first = c || g[0], p.dirty = c ? !1 : 1 !== g.length; else if (p.active && c && p.first.getAscendant("table").equals(c.getAscendant("table"))) { g = h(p.first, c); if (!p.dirty && 1 === g.length && !a(f.data.getTarget())) return b(e, "mouseup" === f.name); p.dirty = !0; p.last = c; d(e, g) }
                } function l(a) {
                    var e = (a = a.editor || a.sender.editor) && a.getSelection(), c = e && e.getRanges() || [], d = c && c[0].getEnclosedNode(), d = d && d.type == CKEDITOR.NODE_ELEMENT && d.is("img"), f; if (e && (b(a), e.isInTable() && e.isFake)) if (d) a.getSelection().reset();
                    else if (!c[0]._getTableElement({ table: 1 }).hasAttribute("data-cke-tableselection-ignored")) { 1 === c.length && c[0]._getTableElement() && c[0]._getTableElement().is("table") && (f = c[0]._getTableElement()); f = w(e, f); a.fire("lockSnapshot"); for (e = 0; e < f.length; e++)f[e].addClass("cke_table-faked-selection"); 0 < f.length && (a.editable().addClass("cke_table-faked-selection-editor"), f[0].getAscendant("table").data("cke-table-faked-selection-table", "")); a.fire("unlockSnapshot") }
                } function g(a) {
                    return a.getAscendant("tr",
                        !0).$.rowIndex
                } function e(c) {
                    function d(a, b) { return a && b ? a.equals(b) || a.contains(b) || b.contains(a) || a.getCommonAncestor(b).is(t) : !1 } function g(a) { return !a.getAscendant("table", !0) && a.getDocument().equals(l.document) } function h(a, b, e, c) {
                        if ("mousedown" === a.name && (CKEDITOR.tools.getMouseButton(a) === CKEDITOR.MOUSE_BUTTON_LEFT || !c)) return !0; if (b = a.name === (CKEDITOR.env.gecko ? "mousedown" : "mouseup") && !g(a.data.getTarget())) a = a.data.getTarget().getAscendant({ td: 1, th: 1 }, !0), b = !(a && a.hasClass("cke_table-faked-selection"));
                        return b
                    } if (c.data.getTarget().getName && ("mouseup" === c.name || !a(c.data.getTarget()))) {
                        var l = c.editor || c.listenerData.editor, n = l.getSelection(1), r = f(l), q = c.data.getTarget(), u = q && q.getAscendant({ td: 1, th: 1 }, !0), q = q && q.getAscendant("table", !0), t = { table: 1, thead: 1, tbody: 1, tfoot: 1, tr: 1, td: 1, th: 1 }; q && q.hasAttribute("data-cke-tableselection-ignored") || (h(c, n, r, q) && b(l, !0), !p.active && "mousedown" === c.name && CKEDITOR.tools.getMouseButton(c) === CKEDITOR.MOUSE_BUTTON_LEFT && q && (p = { active: !0 }, CKEDITOR.document.on("mouseup",
                            e, null, { editor: l })), (u || q) && k(l, u || q, c), "mouseup" === c.name && (CKEDITOR.tools.getMouseButton(c) === CKEDITOR.MOUSE_BUTTON_LEFT && (g(c.data.getTarget()) || d(r, q)) && m(l), p = { active: !1 }, CKEDITOR.document.removeListener("mouseup", e)))
                    }
                } function c(a) { var b = a.data.getTarget().getAscendant("table", !0); p.active = !1; b && b.hasAttribute("data-cke-tableselection-ignored") || (a = a.data.getTarget().getAscendant({ td: 1, th: 1 }, !0), !a || a.hasClass("cke_table-faked-selection")) } function n(a, b) {
                    function e(a) { a.cancel() } var c = a.getSelection(),
                        d = c.createBookmarks(), f = a.document, g = a.createRange(), h = f.getDocumentElement().$, k = CKEDITOR.env.ie && 9 > CKEDITOR.env.version, l = a.blockless || CKEDITOR.env.ie ? "span" : "div", m, n, p, r; f.getById("cke_table_copybin") || (m = f.createElement(l), n = f.createElement(l), n.setAttributes({ id: "cke_table_copybin", "data-cke-temp": "1" }), m.setStyles({ position: "absolute", width: "1px", height: "1px", overflow: "hidden" }), m.setStyle("ltr" == a.config.contentsLangDirection ? "left" : "right", "-5000px"), m.setHtml(a.getSelectedHtml(!0)), a.fire("lockSnapshot"),
                            n.append(m), a.editable().append(n), r = a.on("selectionChange", e, null, null, 0), k && (p = h.scrollTop), g.selectNodeContents(m), g.select(), k && (h.scrollTop = p), setTimeout(function () { n.remove(); c.selectBookmarks(d); r.removeListener(); a.fire("unlockSnapshot"); b && (a.extractSelectedHtml(), a.fire("saveSnapshot")) }, 100))
                } function r(a) { var b = a.editor || a.sender.editor, e = b.getSelection(); e.isInTable() && (e.getRanges()[0]._getTableElement({ table: 1 }).hasAttribute("data-cke-tableselection-ignored") || n(b, "cut" === a.name)) }
                function x(a) { this._reset(); a && this.setSelectedCells(a) } function u(a, b, e) { a.on("beforeCommandExec", function (e) { -1 !== CKEDITOR.tools.array.indexOf(b, e.data.name) && (e.data.selectedCells = w(a.getSelection())) }); a.on("afterCommandExec", function (c) { -1 !== CKEDITOR.tools.array.indexOf(b, c.data.name) && e(a, c.data) }, null, null, 9) } var p = { active: !1 }, t, w, q, B, z; x.prototype = {}; x.prototype._reset = function () { this.cells = { first: null, last: null, all: [] }; this.rows = { first: null, last: null } }; x.prototype.setSelectedCells = function (a) {
                    this._reset();
                    a = a.slice(0); this._arraySortByDOMOrder(a); this.cells.all = a; this.cells.first = a[0]; this.cells.last = a[a.length - 1]; this.rows.first = a[0].getAscendant("tr"); this.rows.last = this.cells.last.getAscendant("tr")
                }; x.prototype.getTableMap = function () {
                    var a = q(this.cells.first), b; a: { b = this.cells.last; var e = b.getAscendant("table"), c = g(b), e = CKEDITOR.tools.buildTableMap(e), d; for (d = 0; d < e[c].length; d++)if ((new CKEDITOR.dom.element(e[c][d])).equals(b)) { b = d; break a } b = void 0 } return CKEDITOR.tools.buildTableMap(this._getTable(),
                        g(this.rows.first), a, g(this.rows.last), b)
                }; x.prototype._getTable = function () { return this.rows.first.getAscendant("table") }; x.prototype.insertRow = function (a, b, e) { if ("undefined" === typeof a) a = 1; else if (0 >= a) return; for (var c = this.cells.first.$.cellIndex, d = this.cells.last.$.cellIndex, f = e ? [] : this.cells.all, g, h = 0; h < a; h++)g = B(e ? this.cells.all : f, b), g = CKEDITOR.tools.array.filter(g.find("td, th").toArray(), function (a) { return e ? !0 : a.$.cellIndex >= c && a.$.cellIndex <= d }), f = b ? g.concat(f) : f.concat(g); this.setSelectedCells(f) };
                x.prototype.insertColumn = function (a) { function b(a) { a = g(a); return a >= d && a <= f } if ("undefined" === typeof a) a = 1; else if (0 >= a) return; for (var e = this.cells, c = e.all, d = g(e.first), f = g(e.last), e = 0; e < a; e++)c = c.concat(CKEDITOR.tools.array.filter(z(c), b)); this.setSelectedCells(c) }; x.prototype.emptyCells = function (a) { a = a || this.cells.all; for (var b = 0; b < a.length; b++)a[b].setHtml("") }; x.prototype._arraySortByDOMOrder = function (a) { a.sort(function (a, b) { return a.getPosition(b) & CKEDITOR.POSITION_PRECEDING ? -1 : 1 }) }; var y = {
                    onPaste: function (a) {
                        function b(a) {
                            var e =
                                c.createRange(); e.selectNodeContents(a); e.select()
                        } function e(a) { return Math.max.apply(null, CKEDITOR.tools.array.map(a, function (a) { return a.length }, 0)) } var c = a.editor, f = c.getSelection(), g = w(f), k = f.isInTable(!0) && this.isBoundarySelection(f), l = this.findTableInPastedContent(c, a.data.dataValue), m, n; (function (a, b, e, c) {
                            a = a.getRanges(); var d = a.length && a[0]._getTableElement({ table: 1 }); if (!b.length || d && d.hasAttribute("data-cke-tableselection-ignored") || c && !e) return !1; if (b = !c) (b = a[0]) ? (b = b.clone(), b.enlarge(CKEDITOR.ENLARGE_ELEMENT),
                                b = (b = b.getEnclosedNode()) && b.is && b.is(CKEDITOR.dtd.$tableContent)) : b = void 0, b = !b; return b ? !1 : !0
                        })(f, g, l, k) && "drop" !== a.data.method && (g = g[0].getAscendant("table"), m = new x(w(f, g)), c.once("afterPaste", function () { var a; if (n) { a = new CKEDITOR.dom.element(n[0][0]); var b = n[n.length - 1]; a = h(a, new CKEDITOR.dom.element(b[b.length - 1])) } else a = m.cells.all; d(c, a) }), l ? (a.stop(), k ? (m.insertRow(1, 1 === k, !0), f.selectElement(m.rows.first)) : (m.emptyCells(), d(c, m.cells.all)), a = m.getTableMap(), n = CKEDITOR.tools.buildTableMap(l),
                            m.insertRow(n.length - a.length), m.insertColumn(e(n) - e(a)), a = m.getTableMap(), this.pasteTable(m, a, n), c.fire("saveSnapshot"), setTimeout(function () { c.fire("afterPaste") }, 0)) : (b(m.cells.first), c.once("afterPaste", function () { c.fire("lockSnapshot"); m.emptyCells(m.cells.all.slice(1)); d(c, m.cells.all); c.fire("unlockSnapshot") })))
                    }, isBoundarySelection: function (a) {
                        a = a.getRanges()[0]; var b = a.endContainer.getAscendant("tr", !0); if (b && a.collapsed) {
                            if (a.checkBoundaryOfElement(b, CKEDITOR.START)) return 1; if (a.checkBoundaryOfElement(b,
                                CKEDITOR.END)) return 2
                        } return 0
                    }, findTableInPastedContent: function (a, b) { var e = a.dataProcessor, c = new CKEDITOR.dom.element("body"); e || (e = new CKEDITOR.htmlDataProcessor(a)); c.setHtml(e.toHtml(b), { fixForBody: !1 }); return 1 < c.getChildCount() ? null : c.findOne("table") }, pasteTable: function (a, b, e) {
                        var c, d = q(a.cells.first), f = a._getTable(), g = {}, h, k, l, m; for (l = 0; l < e.length; l++)for (h = new CKEDITOR.dom.element(f.$.rows[a.rows.first.$.rowIndex + l]), m = 0; m < e[l].length; m++)if (k = new CKEDITOR.dom.element(e[l][m]), c = b[l] &&
                            b[l][m] ? new CKEDITOR.dom.element(b[l][m]) : null, k && !k.getCustomData("processed")) { if (c && c.getParent()) k.replace(c); else if (0 === m || e[l][m - 1]) (c = 0 !== m ? new CKEDITOR.dom.element(e[l][m - 1]) : null) && h.equals(c.getParent()) ? k.insertAfter(c) : 0 < d ? h.$.cells[d] ? k.insertAfter(new CKEDITOR.dom.element(h.$.cells[d])) : h.append(k) : h.append(k, !0); CKEDITOR.dom.element.setMarker(g, k, "processed", !0) } else k.getCustomData("processed") && c && c.remove(); CKEDITOR.dom.element.clearAllMarkers(g)
                    }
                }; CKEDITOR.plugins.tableselection =
                {
                    getCellsBetween: h, keyboardIntegration: function (a) {
                        function b(a) { var e = a.getEnclosedNode(); e && "function" === typeof e.is && e.is({ td: 1, th: 1 }) ? e.setText("") : a.deleteContents(); CKEDITOR.tools.array.forEach(a._find("td"), function (a) { a.appendBogus() }) } var e = a.editable(); e.attachListener(e, "keydown", function (a) {
                            function e(b, c) {
                                if (!c.length) return null; var f = a.createRange(), g = CKEDITOR.dom.range.mergeRanges(c); CKEDITOR.tools.array.forEach(g, function (a) { a.enlarge(CKEDITOR.ENLARGE_ELEMENT) }); var h = g[0].getBoundaryNodes(),
                                    k = h.startNode, h = h.endNode; if (k && k.is && k.is(d)) { for (var l = k.getAscendant("table", !0), m = k.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, l), n = !1, p = function (a) { return !k.contains(a) && a.is && a.is("td", "th") }; m && !p(m);)m = m.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, l); !m && h && h.is && !h.is("table") && h.getNext() && (m = h.getNext().findOne("td, th"), n = !0); if (m) f["moveToElementEdit" + (n ? "Start" : "End")](m); else f.setStartBefore(k.getAscendant("table", !0)), f.collapse(!0); g[0].deleteContents(); return [f] } if (k) return f.moveToElementEditablePosition(k),
                                        [f]
                            } var c = { 37: 1, 38: 1, 39: 1, 40: 1, 8: 1, 46: 1, 13: 1 }, d = CKEDITOR.tools.extend({ table: 1 }, CKEDITOR.dtd.$tableContent); delete d.td; delete d.th; return function (d) {
                                var f = d.data.getKey(), g = d.data.getKeystroke(), h, k = 37 === f || 38 == f, l, m, n; if (c[f] && !a.readOnly && (h = a.getSelection()) && h.isInTable() && h.isFake) {
                                    l = h.getRanges(); m = l[0]._getTableElement(); n = l[l.length - 1]._getTableElement(); if (13 !== f || a.plugins.enterkey) d.data.preventDefault(), d.cancel(); if (36 < f && 41 > f) l[0].moveToElementEditablePosition(k ? m : n, !k), h.selectRanges([l[0]]);
                                    else if (13 !== f || 13 === g || g === CKEDITOR.SHIFT + 13) { for (d = 0; d < l.length; d++)b(l[d]); (d = e(m, l)) ? l = d : l[0].moveToElementEditablePosition(m); h.selectRanges(l); 13 === f && a.plugins.enterkey ? (a.fire("lockSnapshot"), 13 === g ? a.execCommand("enter") : a.execCommand("shiftEnter"), a.fire("unlockSnapshot"), a.fire("saveSnapshot")) : 13 !== f && a.fire("saveSnapshot") }
                                }
                            }
                        }(a), null, null, -1); e.attachListener(e, "keypress", function (e) {
                            var c = a.getSelection(), d = e.data.$.charCode || 13 === e.data.getKey(), f; if (!a.readOnly && c && c.isInTable() &&
                                c.isFake && d && !(e.data.getKeystroke() & CKEDITOR.CTRL)) { e = c.getRanges(); d = e[0].getEnclosedNode().getAscendant({ td: 1, th: 1 }, !0); for (f = 0; f < e.length; f++)b(e[f]); d && (e[0].moveToElementEditablePosition(d), c.selectRanges([e[0]])) }
                        }, null, null, -1)
                    }
                }; CKEDITOR.plugins.add("tableselection", {
                    requires: "clipboard,tabletools", isSupportedEnvironment: function () { return !(CKEDITOR.env.ie && 11 > CKEDITOR.env.version) }, onLoad: function () {
                        t = CKEDITOR.plugins.tabletools; w = t.getSelectedCells; q = t.getCellColIndex; B = t.insertRow; z = t.insertColumn;
                        CKEDITOR.document.appendStyleSheet(this.path + "styles/tableselection.css")
                    }, init: function (a) {
                        this.isSupportedEnvironment() && (a.addContentsCss && a.addContentsCss(this.path + "styles/tableselection.css"), a.on("contentDom", function () {
                            var b = a.editable(), d = b.isInline() ? b : a.document, f = { editor: a }; b.attachListener(d, "mousedown", e, null, f); b.attachListener(d, "mousemove", e, null, f); b.attachListener(d, "mouseup", e, null, f); b.attachListener(b, "dragstart", c); b.attachListener(a, "selectionCheck", l); CKEDITOR.plugins.tableselection.keyboardIntegration(a);
                            CKEDITOR.plugins.clipboard && !CKEDITOR.plugins.clipboard.isCustomCopyCutSupported && (b.attachListener(b, "cut", r), b.attachListener(b, "copy", r))
                        }), a.on("paste", y.onPaste, y), u(a, "rowInsertBefore rowInsertAfter columnInsertBefore columnInsertAfter cellInsertBefore cellInsertAfter".split(" "), function (a, b) { d(a, b.selectedCells) }), u(a, ["cellMerge", "cellMergeRight", "cellMergeDown"], function (a, b) { d(a, [b.commandData.cell]) }), u(a, ["cellDelete"], function (a) { b(a, !0) }))
                    }
                })
            })(); (function () {
                CKEDITOR.plugins.add("templates",
                    { requires: "dialog,ajax", init: function (a) { CKEDITOR.dialog.add("templates", CKEDITOR.getUrl(this.path + "dialogs/templates.js")); a.addCommand("templates", new CKEDITOR.dialogCommand("templates")); a.ui.addButton && a.ui.addButton("Templates", { label: a.lang.templates.button, command: "templates", toolbar: "doctools,10" }) } }); var a = {}, h = {}; CKEDITOR.addTemplates = function (f, b) { a[f] = b }; CKEDITOR.getTemplates = function (f) { return a[f] }; CKEDITOR.loadTemplates = function (a, b) {
                        for (var d = [], m = 0, k = a.length; m < k; m++)h[a[m]] || (d.push(a[m]),
                            h[a[m]] = 1); d.length ? CKEDITOR.scriptLoader.load(d, b) : setTimeout(b, 0)
                    }
            })(); CKEDITOR.config.templates_files = [CKEDITOR.getUrl("plugins/templates/templates/default.js")]; CKEDITOR.config.templates_replaceContent = !0; "use strict"; (function () {
                function a(a, b) { return CKEDITOR.tools.array.reduce(b, function (a, b) { return b(a) }, a) } var h = [CKEDITOR.CTRL + 90, CKEDITOR.CTRL + 89, CKEDITOR.CTRL + CKEDITOR.SHIFT + 90], f = { 8: 1, 46: 1 }; CKEDITOR.plugins.add("undo", {
                    init: function (a) {
                        function e(a) {
                            d.enabled && !1 !== a.data.command.canUndo &&
                                d.save()
                        } function c() { d.enabled = a.readOnly ? !1 : "wysiwyg" == a.mode; d.onChange() } var d = a.undoManager = new b(a), f = d.editingHandler = new k(d), l = a.addCommand("undo", { exec: function () { d.undo() && (a.selectionChange(), this.fire("afterUndo")) }, startDisabled: !0, canUndo: !1 }), m = a.addCommand("redo", { exec: function () { d.redo() && (a.selectionChange(), this.fire("afterRedo")) }, startDisabled: !0, canUndo: !1 }); a.setKeystroke([[h[0], "undo"], [h[1], "redo"], [h[2], "redo"]]); d.onChange = function () {
                            l.setState(d.undoable() ? CKEDITOR.TRISTATE_OFF :
                                CKEDITOR.TRISTATE_DISABLED); m.setState(d.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                        }; a.on("beforeCommandExec", e); a.on("afterCommandExec", e); a.on("saveSnapshot", function (a) { d.save(a.data && a.data.contentOnly) }); a.on("contentDom", f.attachListeners, f); a.on("instanceReady", function () { a.fire("saveSnapshot") }); a.on("beforeModeUnload", function () { "wysiwyg" == a.mode && d.save(!0) }); a.on("mode", c); a.on("readOnly", c); a.ui.addButton && (a.ui.addButton("Undo", {
                            label: a.lang.undo.undo, command: "undo",
                            toolbar: "undo,10"
                        }), a.ui.addButton("Redo", { label: a.lang.undo.redo, command: "redo", toolbar: "undo,20" })); a.resetUndo = function () { d.reset(); a.fire("saveSnapshot") }; a.on("updateSnapshot", function () { d.currentImage && d.update() }); a.on("lockSnapshot", function (a) { a = a.data; d.lock(a && a.dontUpdate, a && a.forceUpdate) }); a.on("unlockSnapshot", d.unlock, d)
                    }
                }); CKEDITOR.plugins.undo = {}; var b = CKEDITOR.plugins.undo.UndoManager = function (a) {
                    this.strokesRecorded = [0, 0]; this.locked = null; this.previousKeyGroup = -1; this.limit = a.config.undoStackSize ||
                        20; this.strokesLimit = 25; this._filterRules = []; this.editor = a; this.reset(); CKEDITOR.env.ie && this.addFilterRule(function (a) { return a.replace(/\s+data-cke-expando=".*?"/g, "") })
                }; b.prototype = {
                    type: function (a, e) { var c = b.getKeyGroup(a), d = this.strokesRecorded[c] + 1; e = e || d >= this.strokesLimit; this.typing || (this.hasUndo = this.typing = !0, this.hasRedo = !1, this.onChange()); e ? (d = 0, this.editor.fire("saveSnapshot")) : this.editor.fire("change"); this.strokesRecorded[c] = d; this.previousKeyGroup = c }, keyGroupChanged: function (a) {
                        return b.getKeyGroup(a) !=
                            this.previousKeyGroup
                    }, reset: function () { this.snapshots = []; this.index = -1; this.currentImage = null; this.hasRedo = this.hasUndo = !1; this.locked = null; this.resetType() }, resetType: function () { this.strokesRecorded = [0, 0]; this.typing = !1; this.previousKeyGroup = -1 }, refreshState: function () { this.hasUndo = !!this.getNextImage(!0); this.hasRedo = !!this.getNextImage(!1); this.resetType(); this.onChange() }, save: function (a, b, c) {
                        var f = this.editor; if (this.locked || "ready" != f.status || "wysiwyg" != f.mode) return !1; var h = f.editable(); if (!h ||
                            "ready" != h.status) return !1; h = this.snapshots; b || (b = new d(f)); if (!1 === b.contents) return !1; if (this.currentImage) if (b.equalsContent(this.currentImage)) { if (a || b.equalsSelection(this.currentImage)) return !1 } else !1 !== c && f.fire("change"); h.splice(this.index + 1, h.length - this.index - 1); h.length == this.limit && h.shift(); this.index = h.push(b) - 1; this.currentImage = b; !1 !== c && this.refreshState(); return !0
                    }, restoreImage: function (a) {
                        var b = this.editor, c; a.bookmarks && (b.focus(), c = b.getSelection()); this.locked = { level: 999 }; this.editor.loadSnapshot(a.contents);
                        a.bookmarks ? c.selectBookmarks(a.bookmarks) : CKEDITOR.env.ie && (c = this.editor.document.getBody().$.createTextRange(), c.collapse(!0), c.select()); this.locked = null; this.index = a.index; this.currentImage = this.snapshots[this.index]; this.update(); this.refreshState(); b.fire("change")
                    }, getNextImage: function (a) {
                        var b = this.snapshots, c = this.currentImage, d; if (c) if (a) for (d = this.index - 1; 0 <= d; d--) { if (a = b[d], !c.equalsContent(a)) return a.index = d, a } else for (d = this.index + 1; d < b.length; d++)if (a = b[d], !c.equalsContent(a)) return a.index =
                            d, a; return null
                    }, redoable: function () { return this.enabled && this.hasRedo }, undoable: function () { return this.enabled && this.hasUndo }, undo: function () { if (this.undoable()) { this.save(!0); var a = this.getNextImage(!0); if (a) return this.restoreImage(a), !0 } return !1 }, redo: function () { if (this.redoable() && (this.save(!0), this.redoable())) { var a = this.getNextImage(!1); if (a) return this.restoreImage(a), !0 } return !1 }, update: function (a) {
                        if (!this.locked) {
                            a || (a = new d(this.editor)); for (var b = this.index, c = this.snapshots; 0 < b && this.currentImage.equalsContent(c[b -
                                1]);)--b; c.splice(b, this.index - b + 1, a); this.index = b; this.currentImage = a
                        }
                    }, updateSelection: function (a) { if (!this.snapshots.length) return !1; var b = this.snapshots, c = b[b.length - 1]; return c.equalsContent(a) && !c.equalsSelection(a) ? (this.currentImage = b[b.length - 1] = a, !0) : !1 }, lock: function (a, b) { if (this.locked) this.locked.level++; else if (a) this.locked = { level: 1 }; else { var c = null; if (b) c = !0; else { var f = new d(this.editor, !0); this.currentImage && this.currentImage.equalsContent(f) && (c = f) } this.locked = { update: c, level: 1 } } },
                    unlock: function () { if (this.locked && !--this.locked.level) { var a = this.locked.update; this.locked = null; if (!0 === a) this.update(); else if (a) { var b = new d(this.editor, !0); a.equalsContent(b) || this.update() } } }, addFilterRule: function (a) { this._filterRules.push(a) }
                }; b.navigationKeyCodes = { 37: 1, 38: 1, 39: 1, 40: 1, 36: 1, 35: 1, 33: 1, 34: 1 }; b.keyGroups = { PRINTABLE: 0, FUNCTIONAL: 1 }; b.isNavigationKey = function (a) { return !!b.navigationKeyCodes[a] }; b.getKeyGroup = function (a) { var e = b.keyGroups; return f[a] ? e.FUNCTIONAL : e.PRINTABLE }; b.getOppositeKeyGroup =
                    function (a) { var e = b.keyGroups; return a == e.FUNCTIONAL ? e.PRINTABLE : e.FUNCTIONAL }; b.ieFunctionalKeysBug = function (a) { return CKEDITOR.env.ie && b.getKeyGroup(a) == b.keyGroups.FUNCTIONAL }; var d = CKEDITOR.plugins.undo.Image = function (b, e) { this.editor = b; b.fire("beforeUndoImage"); var c = b.getSnapshot(); c && (this.contents = a(c, b.undoManager._filterRules)); e || (this.bookmarks = (c = c && b.getSelection()) && c.createBookmarks2(!0)); b.fire("afterUndoImage") }, m = /\b(?:href|src|name)="[^"]*?"/gi; d.prototype = {
                        equalsContent: function (a) {
                            var b =
                                this.contents; a = a.contents; CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) && (b = b.replace(m, ""), a = a.replace(m, "")); return b != a ? !1 : !0
                        }, equalsSelection: function (a) { var b = this.bookmarks; a = a.bookmarks; if (b || a) { if (!b || !a || b.length != a.length) return !1; for (var c = 0; c < b.length; c++) { var d = b[c], f = a[c]; if (d.startOffset != f.startOffset || d.endOffset != f.endOffset || !CKEDITOR.tools.arrayCompare(d.start, f.start) || !CKEDITOR.tools.arrayCompare(d.end, f.end)) return !1 } } return !0 }
                    }; var k = CKEDITOR.plugins.undo.NativeEditingHandler =
                        function (a) { this.undoManager = a; this.ignoreInputEvent = !1; this.keyEventsStack = new l; this.lastKeydownImage = null }; k.prototype = {
                            onKeydown: function (a) {
                                var e = a.data.getKey(); if (229 !== e) if (-1 < CKEDITOR.tools.indexOf(h, a.data.getKeystroke())) a.data.preventDefault(); else if (this.keyEventsStack.cleanUp(a), a = this.undoManager, this.keyEventsStack.getLast(e) || this.keyEventsStack.push(e), this.lastKeydownImage = new d(a.editor), b.isNavigationKey(e) || this.undoManager.keyGroupChanged(e)) if (a.strokesRecorded[0] || a.strokesRecorded[1]) a.save(!1,
                                    this.lastKeydownImage, !1), a.resetType()
                            }, onInput: function () { if (this.ignoreInputEvent) this.ignoreInputEvent = !1; else { var a = this.keyEventsStack.getLast(); a || (a = this.keyEventsStack.push(0)); this.keyEventsStack.increment(a.keyCode); this.keyEventsStack.getTotalInputs() >= this.undoManager.strokesLimit && (this.undoManager.type(a.keyCode, !0), this.keyEventsStack.resetInputs()) } }, onKeyup: function (a) {
                                var e = this.undoManager; a = a.data.getKey(); var c = this.keyEventsStack.getTotalInputs(); this.keyEventsStack.remove(a);
                                if (!(b.ieFunctionalKeysBug(a) && this.lastKeydownImage && this.lastKeydownImage.equalsContent(new d(e.editor, !0)))) if (0 < c) e.type(a); else if (b.isNavigationKey(a)) this.onNavigationKey(!0)
                            }, onNavigationKey: function (a) { var b = this.undoManager; !a && b.save(!0, null, !1) || b.updateSelection(new d(b.editor)); b.resetType() }, ignoreInputEventListener: function () { this.ignoreInputEvent = !0 }, activateInputEventListener: function () { this.ignoreInputEvent = !1 }, attachListeners: function () {
                                var a = this.undoManager.editor, e = a.editable(),
                                    c = this; e.attachListener(e, "keydown", function (a) { c.onKeydown(a); if (b.ieFunctionalKeysBug(a.data.getKey())) c.onInput() }, null, null, 999); e.attachListener(e, CKEDITOR.env.ie ? "keypress" : "input", c.onInput, c, null, 999); e.attachListener(e, "keyup", c.onKeyup, c, null, 999); e.attachListener(e, "paste", c.ignoreInputEventListener, c, null, 999); e.attachListener(e, "drop", c.ignoreInputEventListener, c, null, 999); a.on("afterPaste", c.activateInputEventListener, c, null, 999); e.attachListener(e.isInline() ? e : a.document.getDocumentElement(),
                                        "click", function () { c.onNavigationKey() }, null, null, 999); e.attachListener(this.undoManager.editor, "blur", function () { c.keyEventsStack.remove(9) }, null, null, 999)
                            }
                        }; var l = CKEDITOR.plugins.undo.KeyEventsStack = function () { this.stack = [] }; l.prototype = {
                            push: function (a) { a = this.stack.push({ keyCode: a, inputs: 0 }); return this.stack[a - 1] }, getLastIndex: function (a) { if ("number" != typeof a) return this.stack.length - 1; for (var b = this.stack.length; b--;)if (this.stack[b].keyCode == a) return b; return -1 }, getLast: function (a) {
                                a = this.getLastIndex(a);
                                return -1 != a ? this.stack[a] : null
                            }, increment: function (a) { this.getLast(a).inputs++ }, remove: function (a) { a = this.getLastIndex(a); -1 != a && this.stack.splice(a, 1) }, resetInputs: function (a) { if ("number" == typeof a) this.getLast(a).inputs = 0; else for (a = this.stack.length; a--;)this.stack[a].inputs = 0 }, getTotalInputs: function () { for (var a = this.stack.length, b = 0; a--;)b += this.stack[a].inputs; return b }, cleanUp: function (a) { a = a.data.$; a.ctrlKey || a.metaKey || this.remove(17); a.shiftKey || this.remove(16); a.altKey || this.remove(18) }
                        }
            })();
        "use strict"; (function () {
            function a(a, b) { CKEDITOR.tools.extend(this, { editor: a, editable: a.editable(), doc: a.document, win: a.window }, b, !0); this.inline = this.editable.isInline(); this.inline || (this.frame = this.win.getFrame()); this.target = this[this.inline ? "editable" : "doc"] } function h(a, b) { CKEDITOR.tools.extend(this, b, { editor: a }, !0) } function f(a, b) {
                var c = a.editable(); CKEDITOR.tools.extend(this, { editor: a, editable: c, inline: c.isInline(), doc: a.document, win: a.window, container: CKEDITOR.document.getBody(), winTop: CKEDITOR.document.getWindow() },
                    b, !0); this.hidden = {}; this.visible = {}; this.inline || (this.frame = this.win.getFrame()); this.queryViewport(); var f = CKEDITOR.tools.bind(this.queryViewport, this), h = CKEDITOR.tools.bind(this.hideVisible, this), k = CKEDITOR.tools.bind(this.removeAll, this); c.attachListener(this.winTop, "resize", f); c.attachListener(this.winTop, "scroll", f); c.attachListener(this.winTop, "resize", h); c.attachListener(this.win, "scroll", h); c.attachListener(this.inline ? c : this.frame, "mouseout", function (a) {
                        var b = a.data.$.clientX; a = a.data.$.clientY;
                        this.queryViewport(); (b <= this.rect.left || b >= this.rect.right || a <= this.rect.top || a >= this.rect.bottom) && this.hideVisible(); (0 >= b || b >= this.winTopPane.width || 0 >= a || a >= this.winTopPane.height) && this.hideVisible()
                    }, this); c.attachListener(a, "resize", f); c.attachListener(a, "mode", k); a.on("destroy", k); this.lineTpl = (new CKEDITOR.template('\x3cdiv data-cke-lineutils-line\x3d"1" class\x3d"cke_reset_all" style\x3d"{lineStyle}"\x3e\x3cspan style\x3d"{tipLeftStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3cspan style\x3d"{tipRightStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3c/div\x3e')).output({
                        lineStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},
                            m, this.lineStyle, !0)), tipLeftStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({}, d, { left: "0px", "border-left-color": "red", "border-width": "6px 0 6px 6px" }, this.tipCss, this.tipLeftStyle, !0)), tipRightStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({}, d, { right: "0px", "border-right-color": "red", "border-width": "6px 6px 6px 0" }, this.tipCss, this.tipRightStyle, !0))
                    })
            } function b(a) {
                var b; if (b = a && a.type == CKEDITOR.NODE_ELEMENT) b = !(k[a.getComputedStyle("float")] || k[a.getAttribute("align")]); return b &&
                    !l[a.getComputedStyle("position")]
            } CKEDITOR.plugins.add("lineutils"); CKEDITOR.LINEUTILS_BEFORE = 1; CKEDITOR.LINEUTILS_AFTER = 2; CKEDITOR.LINEUTILS_INSIDE = 4; a.prototype = {
                start: function (a) {
                    var b = this, c = this.editor, d = this.doc, f, h, k, l, m = CKEDITOR.tools.eventsBuffer(50, function () { c.readOnly || "wysiwyg" != c.mode || (b.relations = {}, (h = d.$.elementFromPoint(k, l)) && h.nodeType && (f = new CKEDITOR.dom.element(h), b.traverseSearch(f), isNaN(k + l) || b.pixelSearch(f, k, l), a && a(b.relations, k, l))) }); this.listener = this.editable.attachListener(this.target,
                        "mousemove", function (a) { k = a.data.$.clientX; l = a.data.$.clientY; m.input() }); this.editable.attachListener(this.inline ? this.editable : this.frame, "mouseout", function () { m.reset() })
                }, stop: function () { this.listener && this.listener.removeListener() }, getRange: function () {
                    var a = {}; a[CKEDITOR.LINEUTILS_BEFORE] = CKEDITOR.POSITION_BEFORE_START; a[CKEDITOR.LINEUTILS_AFTER] = CKEDITOR.POSITION_AFTER_END; a[CKEDITOR.LINEUTILS_INSIDE] = CKEDITOR.POSITION_AFTER_START; return function (b) {
                        var c = this.editor.createRange(); c.moveToPosition(this.relations[b.uid].element,
                            a[b.type]); return c
                    }
                }(), store: function () { function a(b, c, d) { var f = b.getUniqueId(); f in d ? d[f].type |= c : d[f] = { element: b, type: c } } return function (e, c) { var d; c & CKEDITOR.LINEUTILS_AFTER && b(d = e.getNext()) && d.isVisible() && (a(d, CKEDITOR.LINEUTILS_BEFORE, this.relations), c ^= CKEDITOR.LINEUTILS_AFTER); c & CKEDITOR.LINEUTILS_INSIDE && b(d = e.getFirst()) && d.isVisible() && (a(d, CKEDITOR.LINEUTILS_BEFORE, this.relations), c ^= CKEDITOR.LINEUTILS_INSIDE); a(e, c, this.relations) } }(), traverseSearch: function (a) {
                    var e, c, d; do if (d = a.$["data-cke-expando"],
                        !(d && d in this.relations)) { if (a.equals(this.editable)) break; if (b(a)) for (e in this.lookups) (c = this.lookups[e](a)) && this.store(a, c) } while ((!a || a.type != CKEDITOR.NODE_ELEMENT || "true" != a.getAttribute("contenteditable")) && (a = a.getParent()))
                }, pixelSearch: function () {
                    function a(c, d, f, g, h) { for (var k = 0, l; h(f);) { f += g; if (25 == ++k) break; if (l = this.doc.$.elementFromPoint(d, f)) if (l == c) k = 0; else if (e(c, l) && (k = 0, b(l = new CKEDITOR.dom.element(l)))) return l } } var e = CKEDITOR.env.ie || CKEDITOR.env.webkit ? function (a, b) { return a.contains(b) } :
                        function (a, b) { return !!(a.compareDocumentPosition(b) & 16) }; return function (c, e, d) { var f = this.win.getViewPaneSize().height, h = a.call(this, c.$, e, d, -1, function (a) { return 0 < a }); e = a.call(this, c.$, e, d, 1, function (a) { return a < f }); if (h) for (this.traverseSearch(h); !h.getParent().equals(c);)h = h.getParent(); if (e) for (this.traverseSearch(e); !e.getParent().equals(c);)e = e.getParent(); for (; h || e;) { h && (h = h.getNext(b)); if (!h || h.equals(e)) break; this.traverseSearch(h); e && (e = e.getPrevious(b)); if (!e || e.equals(h)) break; this.traverseSearch(e) } }
                }(),
                greedySearch: function () { this.relations = {}; for (var a = this.editable.getElementsByTag("*"), e = 0, c, d, f; c = a.getItem(e++);)if (!c.equals(this.editable) && c.type == CKEDITOR.NODE_ELEMENT && (c.hasAttribute("contenteditable") || !c.isReadOnly()) && b(c) && c.isVisible()) for (f in this.lookups) (d = this.lookups[f](c)) && this.store(c, d); return this.relations }
            }; h.prototype = {
                locate: function () {
                    function a(e, c) {
                        var d = e.element[c === CKEDITOR.LINEUTILS_BEFORE ? "getPrevious" : "getNext"](); return d && b(d) ? (e.siblingRect = d.getClientRect(),
                            c == CKEDITOR.LINEUTILS_BEFORE ? (e.siblingRect.bottom + e.elementRect.top) / 2 : (e.elementRect.bottom + e.siblingRect.top) / 2) : c == CKEDITOR.LINEUTILS_BEFORE ? e.elementRect.top : e.elementRect.bottom
                    } return function (b) {
                        var c; this.locations = {}; for (var d in b) c = b[d], c.elementRect = c.element.getClientRect(), c.type & CKEDITOR.LINEUTILS_BEFORE && this.store(d, CKEDITOR.LINEUTILS_BEFORE, a(c, CKEDITOR.LINEUTILS_BEFORE)), c.type & CKEDITOR.LINEUTILS_AFTER && this.store(d, CKEDITOR.LINEUTILS_AFTER, a(c, CKEDITOR.LINEUTILS_AFTER)), c.type &
                            CKEDITOR.LINEUTILS_INSIDE && this.store(d, CKEDITOR.LINEUTILS_INSIDE, (c.elementRect.top + c.elementRect.bottom) / 2); return this.locations
                    }
                }(), sort: function () { var a, b, c, d; return function (f, h) { a = this.locations; b = []; for (var k in a) for (var l in a[k]) if (c = Math.abs(f - a[k][l]), b.length) { for (d = 0; d < b.length; d++)if (c < b[d].dist) { b.splice(d, 0, { uid: +k, type: l, dist: c }); break } d == b.length && b.push({ uid: +k, type: l, dist: c }) } else b.push({ uid: +k, type: l, dist: c }); return "undefined" != typeof h ? b.slice(0, h) : b } }(), store: function (a,
                    b, c) { this.locations[a] || (this.locations[a] = {}); this.locations[a][b] = c }
            }; var d = { display: "block", width: "0px", height: "0px", "border-color": "transparent", "border-style": "solid", position: "absolute", top: "-6px" }, m = { height: "0px", "border-top": "1px dashed red", position: "absolute", "z-index": 9999 }; f.prototype = {
                removeAll: function () { for (var a in this.hidden) this.hidden[a].remove(), delete this.hidden[a]; for (a in this.visible) this.visible[a].remove(), delete this.visible[a] }, hideLine: function (a) {
                    var b = a.getUniqueId();
                    a.hide(); this.hidden[b] = a; delete this.visible[b]
                }, showLine: function (a) { var b = a.getUniqueId(); a.show(); this.visible[b] = a; delete this.hidden[b] }, hideVisible: function () { for (var a in this.visible) this.hideLine(this.visible[a]) }, placeLine: function (a, b) {
                    var c, d, f; if (c = this.getStyle(a.uid, a.type)) {
                        for (f in this.visible) if (this.visible[f].getCustomData("hash") !== this.hash) { d = this.visible[f]; break } if (!d) for (f in this.hidden) if (this.hidden[f].getCustomData("hash") !== this.hash) {
                            this.showLine(d = this.hidden[f]);
                            break
                        } d || this.showLine(d = this.addLine()); d.setCustomData("hash", this.hash); this.visible[d.getUniqueId()] = d; d.setStyles(c); b && b(d)
                    }
                }, getStyle: function (a, b) {
                    var c = this.relations[a], d = this.locations[a][b], f = {}; f.width = c.siblingRect ? Math.max(c.siblingRect.width, c.elementRect.width) : c.elementRect.width; f.top = this.inline ? d + this.winTopScroll.y - this.rect.relativeY : this.rect.top + this.winTopScroll.y + d; if (f.top - this.winTopScroll.y < this.rect.top || f.top - this.winTopScroll.y > this.rect.bottom) return !1; this.inline ?
                        f.left = c.elementRect.left - this.rect.relativeX : (0 < c.elementRect.left ? f.left = this.rect.left + c.elementRect.left : (f.width += c.elementRect.left, f.left = this.rect.left), 0 < (c = f.left + f.width - (this.rect.left + this.winPane.width)) && (f.width -= c)); f.left += this.winTopScroll.x; for (var h in f) f[h] = CKEDITOR.tools.cssLength(f[h]); return f
                }, addLine: function () { var a = CKEDITOR.dom.element.createFromHtml(this.lineTpl); a.appendTo(this.container); return a }, prepare: function (a, b) { this.relations = a; this.locations = b; this.hash = Math.random() },
                cleanup: function () { var a, b; for (b in this.visible) a = this.visible[b], a.getCustomData("hash") !== this.hash && this.hideLine(a) }, queryViewport: function () { this.winPane = this.win.getViewPaneSize(); this.winTopScroll = this.winTop.getScrollPosition(); this.winTopPane = this.winTop.getViewPaneSize(); this.rect = this.getClientRect(this.inline ? this.editable : this.frame) }, getClientRect: function (a) {
                    a = a.getClientRect(); var b = this.container.getDocumentPosition(), c = this.container.getComputedStyle("position"); a.relativeX = a.relativeY =
                        0; "static" != c && (a.relativeY = b.y, a.relativeX = b.x, a.top -= a.relativeY, a.bottom -= a.relativeY, a.left -= a.relativeX, a.right -= a.relativeX); return a
                }
            }; var k = { left: 1, right: 1, center: 1 }, l = { absolute: 1, fixed: 1 }; CKEDITOR.plugins.lineutils = { finder: a, locator: h, liner: f }
        })(); (function () {
            function a(a) { return a.getName && !a.hasAttribute("data-cke-temp") } CKEDITOR.plugins.add("widgetselection", {
                init: function (a) {
                    if (CKEDITOR.env.webkit) {
                        var f = CKEDITOR.plugins.widgetselection; a.on("contentDom", function (a) {
                            a = a.editor; var d =
                                a.editable(); d.attachListener(d, "keydown", function (a) { a.data.getKeystroke() == CKEDITOR.CTRL + 65 && CKEDITOR.tools.setTimeout(function () { f.addFillers(d) || f.removeFillers(d) }, 0) }, null, null, -1); a.on("selectionCheck", function (a) { f.removeFillers(a.editor.editable()) }); a.on("paste", function (a) { a.data.dataValue = f.cleanPasteData(a.data.dataValue) }); "selectall" in a.plugins && f.addSelectAllIntegration(a)
                        })
                    }
                }
            }); CKEDITOR.plugins.widgetselection = {
                startFiller: null, endFiller: null, fillerAttribute: "data-cke-filler-webkit",
                fillerContent: "\x26nbsp;", fillerTagName: "div", addFillers: function (h) { var f = h.editor; if (!this.isWholeContentSelected(h) && 0 < h.getChildCount()) { var b = h.getFirst(a), d = h.getLast(a); b && b.type == CKEDITOR.NODE_ELEMENT && !b.isEditable() && (this.startFiller = this.createFiller(), h.append(this.startFiller, 1)); d && d.type == CKEDITOR.NODE_ELEMENT && !d.isEditable() && (this.endFiller = this.createFiller(!0), h.append(this.endFiller, 0)); if (this.hasFiller(h)) return f = f.createRange(), f.selectNodeContents(h), f.select(), !0 } return !1 },
                removeFillers: function (a) { if (this.hasFiller(a) && !this.isWholeContentSelected(a)) { var f = a.findOne(this.fillerTagName + "[" + this.fillerAttribute + "\x3dstart]"), b = a.findOne(this.fillerTagName + "[" + this.fillerAttribute + "\x3dend]"); this.startFiller && f && this.startFiller.equals(f) ? this.removeFiller(this.startFiller, a) : this.startFiller = f; this.endFiller && b && this.endFiller.equals(b) ? this.removeFiller(this.endFiller, a) : this.endFiller = b } }, cleanPasteData: function (a) {
                    a && a.length && (a = a.replace(this.createFillerRegex(),
                        "").replace(this.createFillerRegex(!0), "")); return a
                }, isWholeContentSelected: function (a) { var f = a.editor.getSelection().getRanges()[0]; return !f || f && f.collapsed ? !1 : (f = f.clone(), f.enlarge(CKEDITOR.ENLARGE_ELEMENT), !!(f && a && f.startContainer && f.endContainer && 0 === f.startOffset && f.endOffset === a.getChildCount() && f.startContainer.equals(a) && f.endContainer.equals(a))) }, hasFiller: function (a) { return 0 < a.find(this.fillerTagName + "[" + this.fillerAttribute + "]").count() }, createFiller: function (a) {
                    var f = new CKEDITOR.dom.element(this.fillerTagName);
                    f.setHtml(this.fillerContent); f.setAttribute(this.fillerAttribute, a ? "end" : "start"); f.setAttribute("data-cke-temp", 1); f.setStyles({ display: "block", width: 0, height: 0, padding: 0, border: 0, margin: 0, position: "absolute", top: 0, left: "-9999px", opacity: 0, overflow: "hidden" }); return f
                }, removeFiller: function (a, f) {
                    if (a) {
                        var b = f.editor, d = f.editor.getSelection().getRanges()[0].startPath(), m = b.createRange(), k, l; d.contains(a) && (k = a.getHtml(), l = !0); d = "start" == a.getAttribute(this.fillerAttribute); a.remove(); k && 0 < k.length &&
                            k != this.fillerContent ? (f.insertHtmlIntoRange(k, b.getSelection().getRanges()[0]), m.setStartAt(f.getChild(f.getChildCount() - 1), CKEDITOR.POSITION_BEFORE_END), b.getSelection().selectRanges([m])) : l && (d ? m.setStartAt(f.getFirst().getNext(), CKEDITOR.POSITION_AFTER_START) : m.setEndAt(f.getLast().getPrevious(), CKEDITOR.POSITION_BEFORE_END), f.editor.getSelection().selectRanges([m]))
                    }
                }, createFillerRegex: function (a) {
                    var f = this.createFiller(a).getOuterHtml().replace(/style="[^"]*"/gi, 'style\x3d"[^"]*"').replace(/>[^<]*</gi,
                        "\x3e[^\x3c]*\x3c"); return new RegExp((a ? "" : "^") + f + (a ? "$" : ""))
                }, addSelectAllIntegration: function (a) { var f = this; a.editable().attachListener(a, "beforeCommandExec", function (b) { var d = a.editable(); "selectAll" == b.data.name && d && f.addFillers(d) }, null, null, 9999) }
            }
        })(); "use strict"; (function () {
            function a(a) {
                this.editor = a; this.registered = {}; this.instances = {}; this.selected = []; this.widgetHoldingFocusedEditable = this.focused = null; this._ = { nextId: 0, upcasts: [], upcastCallbacks: [], filters: {} }; D(this); F(this); this.on("checkWidgets",
                    k); this.editor.on("contentDomInvalidated", this.checkWidgets, this); C(this); z(this); y(this); B(this); v(this)
            } function h(a, b, c, d, e) {
                var f = a.editor; CKEDITOR.tools.extend(this, d, {
                    editor: f, id: b, inline: "span" == c.getParent().getName(), element: c, data: CKEDITOR.tools.extend({}, "function" == typeof d.defaults ? d.defaults() : d.defaults), dataReady: !1, inited: !1, ready: !1, edit: h.prototype.edit, focusedEditable: null, definition: d, repository: a, draggable: !1 !== d.draggable, _: {
                        downcastFn: d.downcast && "string" == typeof d.downcast ?
                            d.downcasts[d.downcast] : d.downcast
                    }
                }, !0); a.fire("instanceCreated", this); N(this, d); this.init && this.init(); this.inited = !0; (a = this.element.data("cke-widget-data")) && this.setData(JSON.parse(decodeURIComponent(a))); e && this.setData(e); this.data.classes || this.setData("classes", this.getClasses()); this.dataReady = !0; Z(this); this.fire("data", this.data); this.isInited() && f.editable().contains(this.wrapper) && (this.ready = !0, this.fire("ready"))
            } function f(a, b, c) {
                CKEDITOR.dom.element.call(this, b.$); this.editor = a;
                this._ = {}; b = this.filter = c.filter; CKEDITOR.dtd[this.getName()].p ? (this.enterMode = b ? b.getAllowedEnterMode(a.enterMode) : a.enterMode, this.shiftEnterMode = b ? b.getAllowedEnterMode(a.shiftEnterMode, !0) : a.shiftEnterMode) : this.enterMode = this.shiftEnterMode = CKEDITOR.ENTER_BR
            } function b(a, b) {
                a.addCommand(b.name, {
                    exec: function (a, c) {
                        function d() { a.widgets.finalizeCreation(h) } var e = a.widgets.focused; if (e && e.name == b.name) e.edit(); else if (b.insert) b.insert({ editor: a, commandData: c }); else if (b.template) {
                            var e = "function" ==
                                typeof b.defaults ? b.defaults() : b.defaults, e = CKEDITOR.dom.element.createFromHtml(b.template.output(e), a.document), f, g = a.widgets.wrapElement(e, b.name), h = new CKEDITOR.dom.documentFragment(g.getDocument()); h.append(g); (f = a.widgets.initOn(e, b, c && c.startupData)) ? (e = f.once("edit", function (b) {
                                    if (b.data.dialog) f.once("dialog", function (b) {
                                        b = b.data; var c, e; c = b.once("ok", d, null, null, 20); e = b.once("cancel", function (b) { b.data && !1 === b.data.hide || a.widgets.destroy(f, !0) }); b.once("hide", function () {
                                            c.removeListener();
                                            e.removeListener()
                                        })
                                    }); else d()
                                }, null, null, 999), f.edit(), e.removeListener()) : d()
                        }
                    }, allowedContent: b.allowedContent, requiredContent: b.requiredContent, contentForms: b.contentForms, contentTransformations: b.contentTransformations
                })
            } function d(a, b) {
                function c(a, d) { var e = b.upcast.split(","), f, g; for (g = 0; g < e.length; g++)if (f = e[g], f === a.name) return b.upcasts[f].call(this, a, d); return !1 } function d(b, c, e) {
                    var f = CKEDITOR.tools.getIndex(a._.upcasts, function (a) { return a[2] > e }); 0 > f && (f = a._.upcasts.length); a._.upcasts.splice(f,
                        0, [CKEDITOR.tools.bind(b, c), c.name, e])
                } var e = b.upcast, f = b.upcastPriority || 10; e && ("string" == typeof e ? d(c, b, f) : d(e, b, f))
            } function m(a, b) { a.focused = null; if (b.isInited()) { var c = b.editor.checkDirty(); a.fire("widgetBlurred", { widget: b }); b.setFocused(!1); !c && b.editor.resetDirty() } } function k(a) {
                a = a.data; if ("wysiwyg" == this.editor.mode) {
                    var b = this.editor.editable(), c = this.instances, d, e, f, g; if (b) {
                        for (d in c) c[d].isReady() && !b.contains(c[d].wrapper) && this.destroy(c[d], !0); if (a && a.initOnlyNew) c = this.initOnAll();
                        else { var k = b.find(".cke_widget_wrapper"), c = []; d = 0; for (e = k.count(); d < e; d++) { f = k.getItem(d); if (g = !this.getByElement(f, !0)) { a: { g = p; for (var l = f; l = l.getParent();)if (g(l)) { g = !0; break a } g = !1 } g = !g } g && b.contains(f) && (f.addClass("cke_widget_new"), c.push(this.initOn(f.getFirst(h.isDomWidgetElement)))) } } a && a.focusInited && 1 == c.length && c[0].focus()
                    }
                }
            } function l(a) {
                if ("undefined" != typeof a.attributes && a.attributes["data-widget"]) {
                    var b = g(a), c = e(a), d = !1; b && b.value && b.value.match(/^\s/g) && (b.parent.attributes["data-cke-white-space-first"] =
                        1, b.value = b.value.replace(/^\s/g, "\x26nbsp;"), d = !0); c && c.value && c.value.match(/\s$/g) && (c.parent.attributes["data-cke-white-space-last"] = 1, c.value = c.value.replace(/\s$/g, "\x26nbsp;"), d = !0); d && (a.attributes["data-cke-widget-white-space"] = 1)
                }
            } function g(a) { return a.find(function (a) { return 3 === a.type }, !0).shift() } function e(a) { return a.find(function (a) { return 3 === a.type }, !0).pop() } function c(a, b, c) {
                if (!c.allowedContent && !c.disallowedContent) return null; var d = this._.filters[a]; d || (this._.filters[a] = d =
                    {}); a = d[b]; a || (a = c.allowedContent ? new CKEDITOR.filter(c.allowedContent) : this.editor.filter.clone(), d[b] = a, c.disallowedContent && a.disallow(c.disallowedContent)); return a
            } function n(a) {
                var b = [], c = a._.upcasts, d = a._.upcastCallbacks; return {
                    toBeWrapped: b, iterator: function (a) {
                        var e, f, g, k, l; if ("data-cke-widget-wrapper" in a.attributes) return (a = a.getFirst(h.isParserWidgetElement)) && b.push([a]), !1; if ("data-widget" in a.attributes) return b.push([a]), !1; if (l = c.length) {
                            if (a.attributes["data-cke-widget-upcasted"]) return !1;
                            k = 0; for (e = d.length; k < e; ++k)if (!1 === d[k](a)) return; for (k = 0; k < l; ++k)if (e = c[k], g = {}, f = e[0](a, g)) return f instanceof CKEDITOR.htmlParser.element && (a = f), a.attributes["data-cke-widget-data"] = encodeURIComponent(JSON.stringify(g)), a.attributes["data-cke-widget-upcasted"] = 1, b.push([a, e[1]]), !1
                        }
                    }
                }
            } function r(a, b) { return { tabindex: -1, contenteditable: "false", "data-cke-widget-wrapper": 1, "data-cke-filter": "off", "class": "cke_widget_wrapper cke_widget_new cke_widget_" + (a ? "inline" : "block") + (b ? " cke_widget_" + b : "") } }
            function x(a, b, c) { if (a.type == CKEDITOR.NODE_ELEMENT) { var d = CKEDITOR.dtd[a.name]; if (d && !d[c.name]) { var d = a.split(b), e = a.parent; b = d.getIndex(); a.children.length || (--b, a.remove()); d.children.length || d.remove(); return x(e, b, c) } } a.add(c, b) } function u(a, b) { return "boolean" == typeof a.inline ? a.inline : !!CKEDITOR.dtd.$inline[b] } function p(a) { return a.hasAttribute("data-cke-temp") } function t(a, b, c, d) {
                var e = a.editor; e.fire("lockSnapshot"); c ? (d = c.data("cke-widget-editable"), d = b.editables[d], a.widgetHoldingFocusedEditable =
                    b, b.focusedEditable = d, c.addClass("cke_widget_editable_focused"), d.filter && e.setActiveFilter(d.filter), e.setActiveEnterMode(d.enterMode, d.shiftEnterMode)) : (d || b.focusedEditable.removeClass("cke_widget_editable_focused"), b.focusedEditable = null, a.widgetHoldingFocusedEditable = null, e.setActiveFilter(null), e.setActiveEnterMode(null, null)); e.fire("unlockSnapshot")
            } function w(a) { a.contextMenu && a.contextMenu.addListener(function (b) { if (b = a.widgets.getByElement(b, !0)) return b.fire("contextMenu", {}) }) } function q(a,
                b) { return CKEDITOR.tools.trim(b) } function B(a) {
                    var b = a.editor, c = CKEDITOR.plugins.lineutils; b.on("dragstart", function (c) { var d = c.data.target; h.isDomDragHandler(d) && (d = a.getByElement(d), c.data.dataTransfer.setData("cke/widget-id", d.id), b.focus(), d.focus()) }); b.on("drop", function (c) {
                        function d(a, b) { return a && b ? a.wrapper.equals(b.wrapper) || a.wrapper.contains(b.wrapper) : !1 } var e = c.data.dataTransfer, f = e.getData("cke/widget-id"), g = e.getTransferType(b), e = b.createRange(), h = function (a) {
                            a = a.getBoundaryNodes().startNode;
                            a.type !== CKEDITOR.NODE_ELEMENT && (a = a.getParent()); return b.widgets.getByElement(a)
                        }(c.data.dropRange); if ("" !== f && g === CKEDITOR.DATA_TRANSFER_CROSS_EDITORS) c.cancel(); else if (g == CKEDITOR.DATA_TRANSFER_INTERNAL) if ("" === f && 0 < b.widgets.selected.length) c.data.dataTransfer.setData("text/html", O(b)); else if (f = a.instances[f]) d(f, h) ? c.cancel() : (e.setStartBefore(f.wrapper), e.setEndAfter(f.wrapper), c.data.dragRange = e, delete CKEDITOR.plugins.clipboard.dragStartContainerChildCount, delete CKEDITOR.plugins.clipboard.dragEndContainerChildCount,
                            c.data.dataTransfer.setData("text/html", f.getClipboardHtml()), b.widgets.destroy(f, !0))
                    }); b.on("contentDom", function () {
                        var d = b.editable(); CKEDITOR.tools.extend(a, {
                            finder: new c.finder(b, {
                                lookups: {
                                    "default": function (b) {
                                        if (!b.is(CKEDITOR.dtd.$listItem) && b.is(CKEDITOR.dtd.$block) && !h.isDomNestedEditable(b) && !a._.draggedWidget.wrapper.contains(b)) {
                                            var c = h.getNestedEditable(d, b); if (c) {
                                                b = a._.draggedWidget; if (a.getByElement(c) == b) return; c = CKEDITOR.filter.instances[c.data("cke-filter")]; b = b.requiredContent;
                                                if (c && b && !c.check(b)) return
                                            } return CKEDITOR.LINEUTILS_BEFORE | CKEDITOR.LINEUTILS_AFTER
                                        }
                                    }
                                }
                            }), locator: new c.locator(b), liner: new c.liner(b, { lineStyle: { cursor: "move !important", "border-top-color": "#666" }, tipLeftStyle: { "border-left-color": "#666" }, tipRightStyle: { "border-right-color": "#666" } })
                        }, !0)
                    })
                } function z(a) {
                    var b = a.editor; b.on("contentDom", function () {
                        var c = b.editable(), d = c.isInline() ? c : b.document, e, f; c.attachListener(d, "mousedown", function (c) {
                            var d = c.data.getTarget(); e = d instanceof CKEDITOR.dom.element ?
                                a.getByElement(d) : null; f = 0; e && (e.inline && d.type == CKEDITOR.NODE_ELEMENT && d.hasAttribute("data-cke-widget-drag-handler") ? (f = 1, a.focused != e && b.getSelection().removeAllRanges()) : h.getNestedEditable(e.wrapper, d) ? e = null : (c.data.preventDefault(), CKEDITOR.env.ie || e.focus()))
                        }); c.attachListener(d, "mouseup", function () { f && e && e.wrapper && (f = 0, e.focus()) }); CKEDITOR.env.ie && c.attachListener(d, "mouseup", function () { setTimeout(function () { e && e.wrapper && c.contains(e.wrapper) && (e.focus(), e = null) }) })
                    }); b.on("doubleclick",
                        function (b) { var c = a.getByElement(b.data.element); if (c && !h.getNestedEditable(c.wrapper, b.data.element)) return c.fire("doubleclick", { element: b.data.element }) }, null, null, 1)
                } function y(a) {
                    a.editor.on("key", function (b) {
                        var c = a.focused, d = a.widgetHoldingFocusedEditable, e; c ? e = c.fire("key", { keyCode: b.data.keyCode }) : d && (c = b.data.keyCode, b = d.focusedEditable, c == CKEDITOR.CTRL + 65 ? (c = b.getBogus(), d = d.editor.createRange(), d.selectNodeContents(b), c && d.setEndAt(c, CKEDITOR.POSITION_BEFORE_START), d.select(), e = !1) : 8 ==
                            c || 46 == c ? (e = d.editor.getSelection().getRanges(), d = e[0], e = !(1 == e.length && d.collapsed && d.checkBoundaryOfElement(b, CKEDITOR[8 == c ? "START" : "END"]))) : e = void 0); return e
                    }, null, null, 1)
                } function v(a) { function b(d) { 1 > a.selected.length || I(c, "cut" === d.name) } var c = a.editor; c.on("contentDom", function () { var a = c.editable(); a.attachListener(a, "copy", b); a.attachListener(a, "cut", b) }) } function C(a) {
                    function b() {
                        var a = e.getSelection(); if (a && (a = a.getRanges()[0]) && !a.collapsed) {
                            var d = c(a.startContainer), f = c(a.endContainer);
                            !d && f ? (a.setEndBefore(f.wrapper), a.select()) : d && !f && (a.setStartAfter(d.wrapper), a.select())
                        }
                    } function c(a) { return a ? a.type == CKEDITOR.NODE_TEXT ? c(a.getParent()) : e.widgets.getByElement(a) : null } function d() { a.fire("checkSelection") } var e = a.editor; e.on("selectionCheck", d); e.on("contentDom", function () { e.editable().attachListener(e, "key", function () { setTimeout(d, 10) }) }); if (!CKEDITOR.env.ie) a.on("checkSelection", b); a.on("checkSelection", a.checkSelection, a); e.on("selectionChange", function (b) {
                        var c = (b = h.getNestedEditable(e.editable(),
                            b.data.selection.getStartElement())) && a.getByElement(b), d = a.widgetHoldingFocusedEditable; d ? d === c && d.focusedEditable.equals(b) || (t(a, d, null), c && b && t(a, c, b)) : c && b && t(a, c, b)
                    }); e.on("dataReady", function () { G(a).commit() }); e.on("blur", function () { var b; (b = a.focused) && m(a, b); (b = a.widgetHoldingFocusedEditable) && t(a, b, null) })
                } function F(a) {
                    var b = a.editor, c = {}; b.on("toDataFormat", function (b) {
                        var d = CKEDITOR.tools.getNextNumber(), f = []; b.data.downcastingSessionId = d; c[d] = f; b.data.dataValue.forEach(function (b) {
                            var c =
                                b.attributes, d; if ("data-cke-widget-white-space" in c) { d = g(b); var k = e(b); d.parent.attributes["data-cke-white-space-first"] && (d.value = d.value.replace(/^&nbsp;/g, " ")); k.parent.attributes["data-cke-white-space-last"] && (k.value = k.value.replace(/&nbsp;$/g, " ")) } if ("data-cke-widget-id" in c) { if (c = a.instances[c["data-cke-widget-id"]]) d = b.getFirst(h.isParserWidgetElement), f.push({ wrapper: b, element: d, widget: c, editables: {} }), "1" != d.attributes["data-cke-widget-keep-attr"] && delete d.attributes["data-widget"] } else if ("data-cke-widget-editable" in
                                    c) return 0 < f.length && (f[f.length - 1].editables[c["data-cke-widget-editable"]] = b), !1
                        }, CKEDITOR.NODE_ELEMENT, !0)
                    }, null, null, 8); b.on("toDataFormat", function (a) {
                        if (a.data.downcastingSessionId) for (var b = c[a.data.downcastingSessionId], d, e, f, g, h, k; d = b.shift();) {
                            e = d.widget; f = d.element; g = e._.downcastFn && e._.downcastFn.call(e, f); a.data.widgetsCopy && e.getClipboardHtml && (g = CKEDITOR.htmlParser.fragment.fromHtml(e.getClipboardHtml()), g = g.children[0]); for (k in d.editables) h = d.editables[k], delete h.attributes.contenteditable,
                                h.setHtml(e.editables[k].getData()); g || (g = f); d.wrapper.replaceWith(g)
                        }
                    }, null, null, 13); b.on("contentDomUnload", function () { a.destroyAll(!0) })
                } function D(a) {
                    var b = a.editor, c, d; b.on("toHtml", function (b) {
                        var d = n(a), e; for (b.data.dataValue.forEach(d.iterator, CKEDITOR.NODE_ELEMENT, !0); e = d.toBeWrapped.pop();) { var f = e[0], g = f.parent; g.type == CKEDITOR.NODE_ELEMENT && g.attributes["data-cke-widget-wrapper"] && g.replaceWith(f); a.wrapElement(e[0], e[1]) } c = b.data.protectedWhitespaces ? 3 == b.data.dataValue.children.length &&
                            h.isParserWidgetWrapper(b.data.dataValue.children[1]) : 1 == b.data.dataValue.children.length && h.isParserWidgetWrapper(b.data.dataValue.children[0])
                    }, null, null, 8); b.on("dataReady", function () { if (d) for (var c = b.editable().find(".cke_widget_wrapper"), e, f, g = 0, k = c.count(); g < k; ++g)e = c.getItem(g), f = e.getFirst(h.isDomWidgetElement), f.type == CKEDITOR.NODE_ELEMENT && f.data("widget") ? (f.replace(e), a.wrapElement(f)) : e.remove(); d = 0; a.destroyAll(!0); a.initOnAll() }); b.on("loadSnapshot", function (b) {
                        /data-cke-widget/.test(b.data) &&
                            (d = 1); a.destroyAll(!0)
                    }, null, null, 9); b.on("paste", function (a) { a = a.data; a.dataValue = a.dataValue.replace(ca, q); a.range && (a = h.getNestedEditable(b.editable(), a.range.startContainer)) && (a = CKEDITOR.filter.instances[a.data("cke-filter")]) && b.setActiveFilter(a) }); b.on("afterInsertHtml", function (d) { d.data.intoRange ? a.checkWidgets({ initOnlyNew: !0 }) : (b.fire("lockSnapshot"), a.checkWidgets({ initOnlyNew: !0, focusInited: c }), b.fire("unlockSnapshot")) })
                } function G(a) {
                    var b = a.selected, c = [], d = b.slice(0), e = null; return {
                        select: function (a) {
                            0 >
                                CKEDITOR.tools.indexOf(b, a) && c.push(a); a = CKEDITOR.tools.indexOf(d, a); 0 <= a && d.splice(a, 1); return this
                        }, focus: function (a) { e = a; return this }, commit: function () {
                            var f = a.focused !== e, g, h; a.editor.fire("lockSnapshot"); for (f && (g = a.focused) && m(a, g); g = d.pop();)b.splice(CKEDITOR.tools.indexOf(b, g), 1), g.isInited() && (h = g.editor.checkDirty(), g.setSelected(!1), !h && g.editor.resetDirty()); f && e && (h = a.editor.checkDirty(), a.focused = e, a.fire("widgetFocused", { widget: e }), e.setFocused(!0), !h && a.editor.resetDirty()); for (; g =
                                c.pop();)b.push(g), g.setSelected(!0); a.editor.fire("unlockSnapshot")
                        }
                    }
                } function H(a) { a && a.addFilterRule(function (a) { return a.replace(/\s*cke_widget_selected/g, "").replace(/\s*cke_widget_focused/g, "") }) } function L(a, b, c) { var d = 0; b = E(b); var e = a.data.classes || {}, f; if (b) { for (e = CKEDITOR.tools.clone(e); f = b.pop();)c ? e[f] || (d = e[f] = 1) : e[f] && (delete e[f], d = 1); d && a.setData("classes", e) } } function K(a) { a.cancel() } function S(a, b) {
                    var c = function (a) { return a == CKEDITOR.ENTER_BR ? "br" : a == CKEDITOR.ENTER_DIV ? "div" : "p" }(a.editor.config.enterMode),
                        d = new CKEDITOR.dom.element(c); "br" !== c && d.appendBogus(); "after" === b ? d.insertAfter(a.wrapper) : d.insertBefore(a.wrapper); (function (b) { var c = a.editor.createRange(); c.setStart(b, 0); a.editor.getSelection().selectRanges([c]) })(d)
                } function I(a, b) {
                    var c = a.widgets.focused, d, e, f; Q.hasCopyBin(a) || (e = new Q(a, {
                        beforeDestroy: function () { !b && c && c.focus(); f && a.getSelection().selectBookmarks(f); d && CKEDITOR.plugins.widgetselection.addFillers(a.editable()) }, afterDestroy: function () {
                            b && !a.readOnly && (c ? a.widgets.del(c) :
                                a.extractSelectedHtml(), a.fire("saveSnapshot"))
                        }
                    }), c || (d = CKEDITOR.env.webkit && CKEDITOR.plugins.widgetselection.isWholeContentSelected(a.editable()), f = a.getSelection().createBookmarks(!0)), e.handle(O(a)))
                } function E(a) { return (a = (a = a.getDefinition().attributes) && a["class"]) ? a.split(/\s+/) : null } function P() { var a = CKEDITOR.document.getActive(), b = this.editor, c = b.editable(); (c.isInline() ? c : b.document.getWindow().getFrame()).equals(a) && b.focusManager.focus(c) } function M() {
                    CKEDITOR.env.gecko && this.editor.unlockSelection();
                    CKEDITOR.env.webkit || (this.editor.forceNextSelectionCheck(), this.editor.selectionChange(1))
                } function O(a) { var b = a.getSelectedHtml(!0); if (a.widgets.focused) return a.widgets.focused.getClipboardHtml(); a.once("toDataFormat", function (a) { a.data.widgetsCopy = !0 }, null, null, -1); return a.dataProcessor.toDataFormat(b) } function N(a, b) {
                    var c = a.editor.config.widget_keystrokeInsertLineBefore, d = a.editor.config.widget_keystrokeInsertLineAfter; X(a); T(a); Y(a); da(a); ia(a); ja(a); ka(a); if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version) a.wrapper.on("dragstart",
                        function (b) { var c = b.data.getTarget(); h.getNestedEditable(a, c) || a.inline && h.isDomDragHandler(c) || b.data.preventDefault() }); a.wrapper.removeClass("cke_widget_new"); a.element.addClass("cke_widget_element"); a.on("key", function (b) {
                            b = b.data.keyCode; if (b == c) S(a, "before"), a.editor.fire("saveSnapshot"); else if (b == d) S(a, "after"), a.editor.fire("saveSnapshot"); else if (13 == b) a.edit(); else {
                                if (b == CKEDITOR.CTRL + 67 || b == CKEDITOR.CTRL + 88) { I(a.editor, b == CKEDITOR.CTRL + 88); return } if (b in V || CKEDITOR.CTRL & b || CKEDITOR.ALT &
                                    b) return
                            } return !1
                        }, null, null, 999); a.on("doubleclick", function (b) { a.edit() && b.cancel() }); if (b.data) a.on("data", b.data); if (b.edit) a.on("edit", b.edit)
                } function X(a) { (a.wrapper = a.element.getParent()).setAttribute("data-cke-widget-id", a.id) } function T(a, b) { a.partSelectors || (a.partSelectors = a.parts); if (a.parts) { var c = {}, d, e; for (e in a.partSelectors) b || !a.parts[e] || "string" == typeof a.parts[e] ? (d = a.wrapper.findOne(a.partSelectors[e]), c[e] = d) : c[e] = a.parts[e]; a.parts = c } } function Y(a) {
                    var b = a.editables, c, d;
                    a.editables = {}; if (a.editables) for (c in b) d = b[c], a.initEditable(c, "string" == typeof d ? { selector: d } : d)
                } function da(a) {
                    if (!0 === a.mask) U(a); else if (a.mask) {
                        var b = new CKEDITOR.tools.buffers.throttle(250, ha, a), c = CKEDITOR.env.gecko ? 300 : 0, d, e; a.on("focus", function () { b.input(); d = a.editor.on("change", b.input); e = a.on("blur", function () { d.removeListener(); e.removeListener() }) }); a.editor.on("instanceReady", function () { setTimeout(function () { b.input() }, c) }); a.editor.on("mode", function () {
                            setTimeout(function () { b.input() },
                                c)
                        }); if (CKEDITOR.env.gecko) { var f = a.element.find("img"); CKEDITOR.tools.array.forEach(f.toArray(), function (a) { a.on("load", function () { b.input() }) }) } for (var g in a.editables) a.editables[g].on("focus", function () { a.editor.on("change", b.input); e && e.removeListener() }), a.editables[g].on("blur", function () { a.editor.removeListener("change", b.input) }); b.input()
                    }
                } function U(a) {
                    var b = a.wrapper.findOne(".cke_widget_mask"); b || (b = new CKEDITOR.dom.element("img", a.editor.document), b.setAttributes({
                        src: CKEDITOR.tools.transparentImageData,
                        "class": "cke_reset cke_widget_mask"
                    }), a.wrapper.append(b)); a.mask = b
                } function ha() {
                    if (this.wrapper) {
                        this.maskPart = this.maskPart || this.mask; var a = this.parts[this.maskPart], b; if (a && "string" != typeof a) {
                            b = this.wrapper.findOne(".cke_widget_partial_mask"); b || (b = new CKEDITOR.dom.element("img", this.editor.document), b.setAttributes({ src: CKEDITOR.tools.transparentImageData, "class": "cke_reset cke_widget_partial_mask" }), this.wrapper.append(b)); this.mask = b; var c = b.$, d = a.$, e = !(c.offsetTop == d.offsetTop && c.offsetLeft ==
                                d.offsetLeft); if (c.offsetWidth != d.offsetWidth || c.offsetHeight != d.offsetHeight || e) c = a.getParent(), d = CKEDITOR.plugins.widget.isDomWidget(c), b.setStyles({ top: a.$.offsetTop + (d ? 0 : c.$.offsetTop) + "px", left: a.$.offsetLeft + (d ? 0 : c.$.offsetLeft) + "px", width: a.$.offsetWidth + "px", height: a.$.offsetHeight + "px" })
                        }
                    }
                } function ia(a) {
                    if (a.draggable) {
                        var b = a.editor, c = a.wrapper.getLast(h.isDomDragHandlerContainer), d; c ? d = c.findOne("img") : (c = new CKEDITOR.dom.element("span", b.document), c.setAttributes({
                            "class": "cke_reset cke_widget_drag_handler_container",
                            style: "background:rgba(220,220,220,0.5);background-image:url(" + b.plugins.widget.path + "images/handle.png);display:none;"
                        }), d = new CKEDITOR.dom.element("img", b.document), d.setAttributes({ "class": "cke_reset cke_widget_drag_handler", "data-cke-widget-drag-handler": "1", src: CKEDITOR.tools.transparentImageData, width: 15, title: b.lang.widget.move, height: 15, role: "presentation" }), a.inline && d.setAttribute("draggable", "true"), c.append(d), a.wrapper.append(c)); a.wrapper.on("dragover", function (a) { a.data.preventDefault() });
                        a.wrapper.on("mouseenter", a.updateDragHandlerPosition, a); setTimeout(function () { a.on("data", a.updateDragHandlerPosition, a) }, 50); if (!a.inline && (d.on("mousedown", fa, a), CKEDITOR.env.ie && 9 > CKEDITOR.env.version)) d.on("dragstart", function (a) { a.data.preventDefault(!0) }); a.dragHandlerContainer = c
                    }
                } function fa(a) {
                    function b() {
                        var c; for (p.reset(); c = h.pop();)c.removeListener(); var d = k; c = a.sender; var e = this.repository.finder, f = this.repository.liner, g = this.editor, l = this.editor.editable(); CKEDITOR.tools.isEmpty(f.visible) ||
                            (d = e.getRange(d[0]), this.focus(), g.fire("drop", { dropRange: d, target: d.startContainer })); l.removeClass("cke_widget_dragging"); f.hideVisible(); g.fire("dragend", { target: c })
                    } if (CKEDITOR.tools.getMouseButton(a) === CKEDITOR.MOUSE_BUTTON_LEFT) {
                        var c = this.repository.finder, d = this.repository.locator, e = this.repository.liner, f = this.editor, g = f.editable(), h = [], k = [], l, m; this.repository._.draggedWidget = this; var n = c.greedySearch(), p = CKEDITOR.tools.eventsBuffer(50, function () {
                            l = d.locate(n); k = d.sort(m, 1); k.length && (e.prepare(n,
                                l), e.placeLine(k[0]), e.cleanup())
                        }); g.addClass("cke_widget_dragging"); h.push(g.on("mousemove", function (a) { m = a.data.$.clientY; p.input() })); f.fire("dragstart", { target: a.sender }); h.push(f.document.once("mouseup", b, this)); g.isInline() || h.push(CKEDITOR.document.once("mouseup", b, this))
                    }
                } function ja(a) { var b = null; a.on("data", function () { var a = this.data.classes, c; if (b != a) { for (c in b) a && a[c] || this.removeClass(c); for (c in a) this.addClass(c); b = a } }) } function ka(a) {
                    a.on("data", function () {
                        if (a.wrapper) {
                            var b = this.getLabel ?
                                this.getLabel() : this.editor.lang.widget.label.replace(/%1/, this.pathName || this.element.getName()); a.wrapper.setAttribute("role", "region"); a.wrapper.setAttribute("aria-label", b)
                        }
                    }, null, null, 9999)
                } function Z(a) { a.element.data("cke-widget-data", encodeURIComponent(JSON.stringify(a.data))) } function aa() {
                    function a() { } function b(a, c, d) { return d && this.checkElement(a) ? (a = d.widgets.getByElement(a, !0)) && a.checkStyleActive(this) : !1 } function c(a) {
                        function b(a, c, d) {
                            for (var e = a.length, f = 0; f < e;) {
                                if (c.call(d, a[f],
                                    f, a)) return a[f]; f++
                            }
                        } function e(a) { function b(a, c) { var d = CKEDITOR.tools.object.keys(a), e = CKEDITOR.tools.object.keys(c); if (d.length !== e.length) return !1; for (var f in a) if (("object" !== typeof a[f] || "object" !== typeof c[f] || !b(a[f], c[f])) && a[f] !== c[f]) return !1; return !0 } return function (c) { return b(a.getDefinition(), c.getDefinition()) } } var f = a.widget, g; d[f] || (d[f] = {}); for (var h = 0, k = a.group.length; h < k; h++)g = a.group[h], d[f][g] || (d[f][g] = []), g = d[f][g], b(g, e(a)) || g.push(a)
                    } var d = {}; CKEDITOR.style.addCustomHandler({
                        type: "widget",
                        setup: function (a) { this.widget = a.widget; (this.group = "string" == typeof a.group ? [a.group] : a.group) && c(this) }, apply: function (a) { var b; a instanceof CKEDITOR.editor && this.checkApplicable(a.elementPath(), a) && (b = a.widgets.focused, this.group && this.removeStylesFromSameGroup(a), b.applyStyle(this)) }, remove: function (a) { a instanceof CKEDITOR.editor && this.checkApplicable(a.elementPath(), a) && a.widgets.focused.removeStyle(this) }, removeStylesFromSameGroup: function (a) {
                            var b = !1, c, e; if (!(a instanceof CKEDITOR.editor)) return !1;
                            e = a.elementPath(); if (this.checkApplicable(e, a)) for (var f = 0, g = this.group.length; f < g; f++) { c = d[this.widget][this.group[f]]; for (var h = 0; h < c.length; h++)c[h] !== this && c[h].checkActive(e, a) && (a.widgets.focused.removeStyle(c[h]), b = !0) } return b
                        }, checkActive: function (a, b) { return this.checkElementMatch(a.lastElement, 0, b) }, checkApplicable: function (a, b) { return b instanceof CKEDITOR.editor ? this.checkElement(a.lastElement) : !1 }, checkElementMatch: b, checkElementRemovable: b, checkElement: function (a) {
                            return h.isDomWidgetWrapper(a) ?
                                (a = a.getFirst(h.isDomWidgetElement)) && a.data("widget") == this.widget : !1
                        }, buildPreview: function (a) { return a || this._.definition.name }, toAllowedContentRules: function (a) { if (!a) return null; a = a.widgets.registered[this.widget]; var b, c = {}; if (!a) return null; if (a.styleableElements) { b = this.getClassesArray(); if (!b) return null; c[a.styleableElements] = { classes: b, propertiesOnly: !0 }; return c } return a.styleToAllowedContentRules ? a.styleToAllowedContentRules(this) : null }, getClassesArray: function () {
                            var a = this._.definition.attributes &&
                                this._.definition.attributes["class"]; return a ? CKEDITOR.tools.trim(a).split(/\s+/) : null
                        }, applyToRange: a, removeFromRange: a, applyToObject: a
                    })
                } CKEDITOR.plugins.add("widget", {
                    requires: "lineutils,clipboard,widgetselection", onLoad: function () {
                        void 0 !== CKEDITOR.document.$.querySelectorAll && (CKEDITOR.addCss('.cke_widget_wrapper{position:relative;outline:none}.cke_widget_inline{display:inline-block}.cke_widget_wrapper:hover\x3e.cke_widget_element{outline:2px solid #ffd25c;cursor:default}.cke_widget_wrapper:hover .cke_widget_editable{outline:2px solid #ffd25c}.cke_widget_wrapper.cke_widget_focused\x3e.cke_widget_element,.cke_widget_wrapper .cke_widget_editable.cke_widget_editable_focused{outline:2px solid #47a4f5}.cke_widget_editable{cursor:text}.cke_widget_drag_handler_container{position:absolute;width:15px;height:0;display:block;opacity:0.75;transition:height 0s 0.2s;line-height:0}.cke_widget_wrapper:hover\x3e.cke_widget_drag_handler_container{height:15px;transition:none}.cke_widget_drag_handler_container:hover{opacity:1}.cke_editable[contenteditable\x3d"false"] .cke_widget_drag_handler_container{display:none;}img.cke_widget_drag_handler{cursor:move;width:15px;height:15px;display:inline-block}.cke_widget_mask{position:absolute;top:0;left:0;width:100%;height:100%;display:block}.cke_widget_partial_mask{position:absolute;display:block}.cke_editable.cke_widget_dragging, .cke_editable.cke_widget_dragging *{cursor:move !important}'),
                            aa())
                    }, beforeInit: function (b) { void 0 !== CKEDITOR.document.$.querySelectorAll && (b.widgets = new a(b)) }, afterInit: function (a) { if (void 0 !== CKEDITOR.document.$.querySelectorAll) { var b = a.widgets.registered, c, d, e; for (d in b) c = b[d], (e = c.button) && a.ui.addButton && a.ui.addButton(CKEDITOR.tools.capitalize(c.name, !0), { label: e, command: c.name, toolbar: "insert,10" }); w(a); H(a.undoManager) } }
                }); a.prototype = {
                    MIN_SELECTION_CHECK_INTERVAL: 500, add: function (a, c) {
                        var e = this.editor; c = CKEDITOR.tools.prototypedCopy(c); c.name = a;
                        c._ = c._ || {}; e.fire("widgetDefinition", c); c.template && (c.template = new CKEDITOR.template(c.template)); b(e, c); d(this, c); this.registered[a] = c; if (c.dialog && e.plugins.dialog) var f = CKEDITOR.on("dialogDefinition", function (a) { a = a.data.definition; var b = a.dialog; a.getMode || b.getName() !== c.dialog || (a.getMode = function () { var a = b.getModel(e); return a && a instanceof CKEDITOR.plugins.widget && a.ready ? CKEDITOR.dialog.EDITING_MODE : CKEDITOR.dialog.CREATION_MODE }); f.removeListener() }); return c
                    }, addUpcastCallback: function (a) { this._.upcastCallbacks.push(a) },
                    checkSelection: function () { if (this.editor.getSelection()) { var a = this.editor.getSelection(), b = a.getSelectedElement(), c = G(this), d; if (b && (d = this.getByElement(b, !0))) return c.focus(d).select(d).commit(); a = a.getRanges()[0]; if (!a || a.collapsed) return c.commit(); a = new CKEDITOR.dom.walker(a); for (a.evaluator = h.isDomWidgetWrapper; b = a.next();)c.select(this.getByElement(b)); c.commit() } }, checkWidgets: function (a) { this.fire("checkWidgets", CKEDITOR.tools.copy(a || {})) }, del: function (a) {
                        if (this.focused === a) {
                            var b = a.editor,
                                c = b.createRange(), d; (d = c.moveToClosestEditablePosition(a.wrapper, !0)) || (d = c.moveToClosestEditablePosition(a.wrapper, !1)); d && b.getSelection().selectRanges([c])
                        } a.wrapper.remove(); this.destroy(a, !0)
                    }, destroy: function (a, b) { this.widgetHoldingFocusedEditable === a && t(this, a, null, b); a.destroy(b); delete this.instances[a.id]; this.fire("instanceDestroyed", a) }, destroyAll: function (a, b) {
                        var c, d, e = this.instances; if (b && !a) {
                            d = b.find(".cke_widget_wrapper"); for (var e = d.count(), f = 0; f < e; ++f)(c = this.getByElement(d.getItem(f),
                                !0)) && this.destroy(c)
                        } else for (d in e) c = e[d], this.destroy(c, a)
                    }, finalizeCreation: function (a) { (a = a.getFirst()) && h.isDomWidgetWrapper(a) && (this.editor.insertElement(a), a = this.getByElement(a), a.ready = !0, a.fire("ready"), a.focus()) }, getByElement: function () { function a(c) { return c.is(b) && c.data("cke-widget-id") } var b = { div: 1, span: 1 }; return function (b, c) { if (!b) return null; var d = a(b); if (!c && !d) { var e = this.editor.editable(); do b = b.getParent(); while (b && !b.equals(e) && !(d = a(b))) } return this.instances[d] || null } }(),
                    initOn: function (a, b, c) { b ? "string" == typeof b && (b = this.registered[b]) : b = this.registered[a.data("widget")]; if (!b) return null; var d = this.wrapElement(a, b.name); return d ? d.hasClass("cke_widget_new") ? (a = new h(this, this._.nextId++, a, b, c), a.isInited() ? this.instances[a.id] = a : null) : this.getByElement(a) : null }, initOnAll: function (a) { a = (a || this.editor.editable()).find(".cke_widget_new"); for (var b = [], c, d = a.count(); d--;)(c = this.initOn(a.getItem(d).getFirst(h.isDomWidgetElement))) && b.push(c); return b }, onWidget: function (a) {
                        var b =
                            Array.prototype.slice.call(arguments); b.shift(); for (var c in this.instances) { var d = this.instances[c]; d.name == a && d.on.apply(d, b) } this.on("instanceCreated", function (c) { c = c.data; c.name == a && c.on.apply(c, b) })
                    }, parseElementClasses: function (a) { if (!a) return null; a = CKEDITOR.tools.trim(a).split(/\s+/); for (var b, c = {}, d = 0; b = a.pop();)-1 == b.indexOf("cke_") && (c[b] = d = 1); return d ? c : null }, wrapElement: function (a, b) {
                        var c = null, d, e; if (a instanceof CKEDITOR.dom.element) {
                            b = b || a.data("widget"); d = this.registered[b]; if (!d) return null;
                            if ((c = a.getParent()) && c.type == CKEDITOR.NODE_ELEMENT && c.data("cke-widget-wrapper")) return c; a.hasAttribute("data-cke-widget-keep-attr") || a.data("cke-widget-keep-attr", a.data("widget") ? 1 : 0); a.data("widget", b); (e = u(d, a.getName())) && l(a); c = new CKEDITOR.dom.element(e ? "span" : "div", a.getDocument()); c.setAttributes(r(e, b)); c.data("cke-display-name", d.pathName ? d.pathName : a.getName()); a.getParent(!0) && c.replace(a); a.appendTo(c)
                        } else if (a instanceof CKEDITOR.htmlParser.element) {
                            b = b || a.attributes["data-widget"];
                            d = this.registered[b]; if (!d) return null; if ((c = a.parent) && c.type == CKEDITOR.NODE_ELEMENT && c.attributes["data-cke-widget-wrapper"]) return c; "data-cke-widget-keep-attr" in a.attributes || (a.attributes["data-cke-widget-keep-attr"] = a.attributes["data-widget"] ? 1 : 0); b && (a.attributes["data-widget"] = b); (e = u(d, a.name)) && l(a); c = new CKEDITOR.htmlParser.element(e ? "span" : "div", r(e, b)); c.attributes["data-cke-display-name"] = d.pathName ? d.pathName : a.name; d = a.parent; var f; d && (f = a.getIndex(), a.remove()); c.add(a); d && x(d,
                                f, c)
                        } return c
                    }, _tests_createEditableFilter: c
                }; CKEDITOR.event.implementOn(a.prototype); h.prototype = {
                    addClass: function (a) { this.element.addClass(a); this.wrapper.addClass(h.WRAPPER_CLASS_PREFIX + a) }, applyStyle: function (a) { L(this, a, 1) }, checkStyleActive: function (a) { a = E(a); var b; if (!a) return !1; for (; b = a.pop();)if (!this.hasClass(b)) return !1; return !0 }, destroy: function (a) {
                        this.fire("destroy"); if (this.editables) for (var b in this.editables) this.destroyEditable(b, a); a || ("0" == this.element.data("cke-widget-keep-attr") &&
                            this.element.removeAttribute("data-widget"), this.element.removeAttributes(["data-cke-widget-data", "data-cke-widget-keep-attr"]), this.element.removeClass("cke_widget_element"), this.element.replace(this.wrapper)); this.wrapper = null
                    }, destroyEditable: function (a, b) {
                        var c = this.editables[a], d = !0; c.removeListener("focus", M); c.removeListener("blur", P); this.editor.focusManager.remove(c); if (c.filter) {
                            for (var e in this.repository.instances) {
                                var f = this.repository.instances[e]; f.editables && (f = f.editables[a]) && f !==
                                    c && c.filter === f.filter && (d = !1)
                            } d && (c.filter.destroy(), (d = this.repository._.filters[this.name]) && delete d[a])
                        } b || (this.repository.destroyAll(!1, c), c.removeClass("cke_widget_editable"), c.removeClass("cke_widget_editable_focused"), c.removeAttributes(["contenteditable", "data-cke-widget-editable", "data-cke-enter-mode"])); delete this.editables[a]
                    }, edit: function () {
                        var a = { dialog: this.dialog }, b = this; if (!1 === this.fire("edit", a) || !a.dialog) return !1; this.editor.openDialog(a.dialog, function (a) {
                            var c, d; !1 !== b.fire("dialog",
                                a) && (c = a.on("show", function () { a.setupContent(b) }), d = a.on("ok", function () { var c, d = b.on("data", function (a) { c = 1; a.cancel() }, null, null, 0); b.editor.fire("saveSnapshot"); a.commitContent(b); d.removeListener(); c && (b.fire("data", b.data), b.editor.fire("saveSnapshot")) }), a.once("hide", function () { c.removeListener(); d.removeListener() }))
                        }, b); return !0
                    }, getClasses: function () { return this.repository.parseElementClasses(this.element.getAttribute("class")) }, getClipboardHtml: function () {
                        var a = this.editor.createRange();
                        a.setStartBefore(this.wrapper); a.setEndAfter(this.wrapper); return this.editor.editable().getHtmlFromRange(a).getHtml()
                    }, hasClass: function (a) { return this.element.hasClass(a) }, initEditable: function (a, b) {
                        var d = this._findOneNotNested(b.selector); return d && d.is(CKEDITOR.dtd.$editable) ? (d = new f(this.editor, d, { filter: c.call(this.repository, this.name, a, b) }), this.editables[a] = d, d.setAttributes({ contenteditable: "true", "data-cke-widget-editable": a, "data-cke-enter-mode": d.enterMode }), d.filter && d.data("cke-filter",
                            d.filter.id), d.addClass("cke_widget_editable"), d.removeClass("cke_widget_editable_focused"), b.pathName && d.data("cke-display-name", b.pathName), this.editor.focusManager.add(d), d.on("focus", M, this), CKEDITOR.env.ie && d.on("blur", P, this), d._.initialSetData = !0, d.setData(d.getHtml()), !0) : !1
                    }, _findOneNotNested: function (a) { a = this.wrapper.find(a); for (var b, c, d = 0; d < a.count(); d++)if (b = a.getItem(d), c = b.getAscendant(h.isDomWidgetWrapper), this.wrapper.equals(c)) return b; return null }, isInited: function () {
                        return !(!this.wrapper ||
                            !this.inited)
                    }, isReady: function () { return this.isInited() && this.ready }, focus: function () { var a = this.editor.getSelection(); if (a) { var b = this.editor.checkDirty(); a.fake(this.wrapper); !b && this.editor.resetDirty() } this.editor.focus() }, refreshMask: function () { da(this) }, refreshParts: function (a) { T(this, "undefined" !== typeof a ? a : !0) }, removeClass: function (a) { this.element.removeClass(a); this.wrapper.removeClass(h.WRAPPER_CLASS_PREFIX + a) }, removeStyle: function (a) { L(this, a, 0) }, setData: function (a, b) {
                        var c = this.data,
                            d = 0; if ("string" == typeof a) c[a] !== b && (c[a] = b, d = 1); else { var e = a; for (a in e) c[a] !== e[a] && (d = 1, c[a] = e[a]) } d && this.dataReady && (Z(this), this.fire("data", c)); return this
                    }, setFocused: function (a) { this.wrapper[a ? "addClass" : "removeClass"]("cke_widget_focused"); this.fire(a ? "focus" : "blur"); return this }, setSelected: function (a) { this.wrapper[a ? "addClass" : "removeClass"]("cke_widget_selected"); this.fire(a ? "select" : "deselect"); return this }, updateDragHandlerPosition: function () {
                        var a = this.editor, b = this.element.$, c = this._.dragHandlerOffset,
                            b = { x: b.offsetLeft, y: b.offsetTop - 15 }; c && b.x == c.x && b.y == c.y || (c = a.checkDirty(), a.fire("lockSnapshot"), this.dragHandlerContainer.setStyles({ top: b.y + "px", left: b.x + "px" }), this.dragHandlerContainer.removeStyle("display"), a.fire("unlockSnapshot"), !c && a.resetDirty(), this._.dragHandlerOffset = b)
                    }
                }; CKEDITOR.event.implementOn(h.prototype); h.getNestedEditable = function (a, b) { return !b || b.equals(a) ? null : h.isDomNestedEditable(b) ? b : h.getNestedEditable(a, b.getParent()) }; h.isDomDragHandler = function (a) {
                    return a.type ==
                        CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-drag-handler")
                }; h.isDomDragHandlerContainer = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_widget_drag_handler_container") }; h.isDomNestedEditable = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-editable") }; h.isDomWidgetElement = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-widget") }; h.isDomWidgetWrapper = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-wrapper") };
            h.isDomWidget = function (a) { return a ? this.isDomWidgetWrapper(a) || this.isDomWidgetElement(a) : !1 }; h.isParserWidgetElement = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && !!a.attributes["data-widget"] }; h.isParserWidgetWrapper = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && !!a.attributes["data-cke-widget-wrapper"] }; h.WRAPPER_CLASS_PREFIX = "cke_widget_wrapper_"; f.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.dom.element.prototype), {
                setData: function (a) {
                    this._.initialSetData ||
                        this.editor.widgets.destroyAll(!1, this); this._.initialSetData = !1; a = this.editor.dataProcessor.unprotectRealComments(a); a = this.editor.dataProcessor.unprotectSource(a); a = this.editor.dataProcessor.toHtml(a, { context: this.getName(), filter: this.filter, enterMode: this.enterMode }); this.setHtml(a); this.editor.widgets.initOnAll(this)
                }, getData: function () { return this.editor.dataProcessor.toDataFormat(this.getHtml(), { context: this.getName(), filter: this.filter, enterMode: this.enterMode }) }
            }); var ca = /^(?:<(?:div|span)(?: data-cke-temp="1")?(?: id="cke_copybin")?(?: data-cke-temp="1")?>)?(?:<(?:div|span)(?: style="[^"]+")?>)?<span [^>]*data-cke-copybin-start="1"[^>]*>.?<\/span>([\s\S]+)<span [^>]*data-cke-copybin-end="1"[^>]*>.?<\/span>(?:<\/(?:div|span)>)?(?:<\/(?:div|span)>)?$/i,
                V = { 37: 1, 38: 1, 39: 1, 40: 1, 8: 1, 46: 1 }; V[CKEDITOR.SHIFT + 121] = 1; var Q = CKEDITOR.tools.createClass({
                    $: function (a, b) { this._.createCopyBin(a, b); this._.createListeners(b) }, _: {
                        createCopyBin: function (a) {
                            var b = a.document, c = CKEDITOR.env.edge && 16 <= CKEDITOR.env.version, d = !a.blockless && !CKEDITOR.env.ie || c ? "div" : "span", c = b.createElement(d), b = b.createElement(d); b.setAttributes({ id: "cke_copybin", "data-cke-temp": "1" }); c.setStyles({ position: "absolute", width: "1px", height: "1px", overflow: "hidden" }); c.setStyle("ltr" == a.config.contentsLangDirection ?
                                "left" : "right", "-5000px"); this.editor = a; this.copyBin = c; this.container = b
                        }, createListeners: function (a) { a && (a.beforeDestroy && (this.beforeDestroy = a.beforeDestroy), a.afterDestroy && (this.afterDestroy = a.afterDestroy)) }
                    }, proto: {
                        handle: function (a) {
                            var b = this.copyBin, c = this.editor, d = this.container, e = CKEDITOR.env.ie && 9 > CKEDITOR.env.version, f = c.document.getDocumentElement().$, g = c.createRange(), h = this, k = CKEDITOR.env.mac && CKEDITOR.env.webkit, l = k ? 100 : 0, m = window.requestAnimationFrame && !k ? requestAnimationFrame : setTimeout,
                                n, p, q; b.setHtml('\x3cspan data-cke-copybin-start\x3d"1"\x3e​\x3c/span\x3e' + a + '\x3cspan data-cke-copybin-end\x3d"1"\x3e​\x3c/span\x3e'); c.fire("lockSnapshot"); d.append(b); c.editable().append(d); n = c.on("selectionChange", K, null, null, 0); p = c.widgets.on("checkSelection", K, null, null, 0); e && (q = f.scrollTop); g.selectNodeContents(b); g.select(); e && (f.scrollTop = q); return new CKEDITOR.tools.promise(function (a) {
                                    m(function () {
                                        h.beforeDestroy && h.beforeDestroy(); d.remove(); n.removeListener(); p.removeListener(); c.fire("unlockSnapshot");
                                        h.afterDestroy && h.afterDestroy(); a()
                                    }, l)
                                })
                        }
                    }, statics: { hasCopyBin: function (a) { return !!Q.getCopyBin(a) }, getCopyBin: function (a) { return a.document.getById("cke_copybin") } }
                }); CKEDITOR.plugins.widget = h; h.repository = a; h.nestedEditable = f
        })(); CKEDITOR.config.widget_keystrokeInsertLineBefore = CKEDITOR.SHIFT + CKEDITOR.ALT + 13; CKEDITOR.config.widget_keystrokeInsertLineAfter = CKEDITOR.SHIFT + 13; (function () {
            function a(a, b, d) {
                this.editor = a; this.notification = null; this._message = new CKEDITOR.template(b); this._singularMessage =
                    d ? new CKEDITOR.template(d) : null; this._tasks = []; this._doneTasks = this._doneWeights = this._totalWeights = 0
            } function h(a) { this._weight = a || 1; this._doneWeight = 0; this._isCanceled = !1 } CKEDITOR.plugins.add("notificationaggregator", { requires: "notification" }); a.prototype = {
                createTask: function (a) {
                    a = a || {}; var b = !this.notification, d; b && (this.notification = this._createNotification()); d = this._addTask(a); d.on("updated", this._onTaskUpdate, this); d.on("done", this._onTaskDone, this); d.on("canceled", function () { this._removeTask(d) },
                        this); this.update(); b && this.notification.show(); return d
                }, update: function () { this._updateNotification(); this.isFinished() && this.fire("finished") }, getPercentage: function () { return 0 === this.getTaskCount() ? 1 : this._doneWeights / this._totalWeights }, isFinished: function () { return this.getDoneTaskCount() === this.getTaskCount() }, getTaskCount: function () { return this._tasks.length }, getDoneTaskCount: function () { return this._doneTasks }, _updateNotification: function () {
                    this.notification.update({
                        message: this._getNotificationMessage(),
                        progress: this.getPercentage()
                    })
                }, _getNotificationMessage: function () { var a = this.getTaskCount(), b = { current: this.getDoneTaskCount(), max: a, percentage: Math.round(100 * this.getPercentage()) }; return (1 == a && this._singularMessage ? this._singularMessage : this._message).output(b) }, _createNotification: function () { return new CKEDITOR.plugins.notification(this.editor, { type: "progress" }) }, _addTask: function (a) { a = new h(a.weight); this._tasks.push(a); this._totalWeights += a._weight; return a }, _removeTask: function (a) {
                    var b = CKEDITOR.tools.indexOf(this._tasks,
                        a); -1 !== b && (a._doneWeight && (this._doneWeights -= a._doneWeight), this._totalWeights -= a._weight, this._tasks.splice(b, 1), this.update())
                }, _onTaskUpdate: function (a) { this._doneWeights += a.data; this.update() }, _onTaskDone: function () { this._doneTasks += 1; this.update() }
            }; CKEDITOR.event.implementOn(a.prototype); h.prototype = {
                done: function () { this.update(this._weight) }, update: function (a) {
                    if (!this.isDone() && !this.isCanceled()) {
                        a = Math.min(this._weight, a); var b = a - this._doneWeight; this._doneWeight = a; this.fire("updated",
                            b); this.isDone() && this.fire("done")
                    }
                }, cancel: function () { this.isDone() || this.isCanceled() || (this._isCanceled = !0, this.fire("canceled")) }, isDone: function () { return this._weight === this._doneWeight }, isCanceled: function () { return this._isCanceled }
            }; CKEDITOR.event.implementOn(h.prototype); CKEDITOR.plugins.notificationAggregator = a; CKEDITOR.plugins.notificationAggregator.task = h
        })(); "use strict"; (function () {
            CKEDITOR.plugins.add("uploadwidget", {
                requires: "widget,clipboard,filetools,notificationaggregator", init: function (a) { a.filter.allow("*[!data-widget,!data-cke-upload-id]") },
                isSupportedEnvironment: function () { return CKEDITOR.plugins.clipboard.isFileApiSupported }
            }); CKEDITOR.fileTools || (CKEDITOR.fileTools = {}); CKEDITOR.tools.extend(CKEDITOR.fileTools, {
                addUploadWidget: function (a, h, f) {
                    var b = CKEDITOR.fileTools, d = a.uploadRepository, m = f.supportedTypes ? 10 : 20; CKEDITOR.plugins.clipboard.addFileMatcher(a, function (a) { return f.supportedTypes ? b.isTypeSupported(a, f.supportedTypes) : !0 }); if (f.fileToElement) a.on("paste", function (f) {
                        f = f.data; var l = a.widgets.registered[h], g = f.dataTransfer,
                            e = g.getFilesCount(), c = l.loadMethod || "loadAndUpload", m, r; if (!f.dataValue && e) for (r = 0; r < e; r++)if (m = g.getFile(r), !l.supportedTypes || b.isTypeSupported(m, l.supportedTypes)) { var x = l.fileToElement(m); m = d.create(m, void 0, l.loaderType); x && (m[c](l.uploadUrl, l.additionalRequestParameters), CKEDITOR.fileTools.markElement(x, h, m.id), "loadAndUpload" != c && "upload" != c || l.skipNotifications || CKEDITOR.fileTools.bindNotifications(a, m), f.dataValue += x.getOuterHtml()) }
                    }, null, null, m); CKEDITOR.tools.extend(f, {
                        downcast: function () { return new CKEDITOR.htmlParser.text("") },
                        init: function () {
                            var b = this, f = this.wrapper.findOne("[data-cke-upload-id]").data("cke-upload-id"), g = d.loaders[f], e = CKEDITOR.tools.capitalize, c, h; g.on("update", function (d) {
                                if ("abort" === g.status && "function" === typeof b.onAbort) b.onAbort(g); if (b.wrapper && b.wrapper.getParent()) {
                                    a.fire("lockSnapshot"); d = "on" + e(g.status); if ("abort" === g.status || "function" !== typeof b[d] || !1 !== b[d](g)) h = "cke_upload_" + g.status, b.wrapper && h != c && (c && b.wrapper.removeClass(c), b.wrapper.addClass(h), c = h), "error" != g.status && "abort" !=
                                        g.status || a.widgets.del(b); a.fire("unlockSnapshot")
                                } else CKEDITOR.instances[a.name] && a.editable().find('[data-cke-upload-id\x3d"' + f + '"]').count() || g.abort(), d.removeListener()
                            }); g.update()
                        }, replaceWith: function (b, d) {
                            if ("" === b.trim()) a.widgets.del(this); else {
                                var f = this == a.widgets.focused, e = a.editable(), c = a.createRange(), h, m; f || (m = a.getSelection().createBookmarks()); c.setStartBefore(this.wrapper); c.setEndAfter(this.wrapper); f && (h = c.createBookmark()); e.insertHtmlIntoRange(b, c, d); a.widgets.checkWidgets({ initOnlyNew: !0 });
                                a.widgets.destroy(this, !0); f ? (c.moveToBookmark(h), c.select()) : a.getSelection().selectBookmarks(m)
                            }
                        }, _getLoader: function () { var a = this.wrapper.findOne("[data-cke-upload-id]"); return a ? this.editor.uploadRepository.loaders[a.data("cke-upload-id")] : null }
                    }); a.widgets.add(h, f)
                }, markElement: function (a, h, f) { a.setAttributes({ "data-cke-upload-id": f, "data-widget": h }) }, bindNotifications: function (a, h) {
                    function f() {
                        b = a._.uploadWidgetNotificaionAggregator; if (!b || b.isFinished()) b = a._.uploadWidgetNotificaionAggregator =
                            new CKEDITOR.plugins.notificationAggregator(a, a.lang.uploadwidget.uploadMany, a.lang.uploadwidget.uploadOne), b.once("finished", function () { var d = b.getTaskCount(); 0 === d ? b.notification.hide() : b.notification.update({ message: 1 == d ? a.lang.uploadwidget.doneOne : a.lang.uploadwidget.doneMany.replace("%1", d), type: "success", important: 1 }) })
                    } var b, d = null; h.on("update", function () { !d && h.uploadTotal && (f(), d = b.createTask({ weight: h.uploadTotal })); d && "uploading" == h.status && d.update(h.uploaded) }); h.on("uploaded", function () {
                        d &&
                            d.done()
                    }); h.on("error", function () { d && d.cancel(); a.showNotification(h.message, "warning") }); h.on("abort", function () { d && d.cancel(); CKEDITOR.instances[a.name] && a.showNotification(a.lang.uploadwidget.abort, "info") })
                }
            })
        })(); "use strict"; (function () {
            function a(a) { 9 >= a && (a = "0" + a); return String(a) } function h(b) { var d = new Date, d = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()]; f += 1; return "image-" + CKEDITOR.tools.array.map(d, a).join("") + "-" + f + "." + b } var f = 0; CKEDITOR.plugins.add("uploadimage",
                {
                    requires: "uploadwidget", onLoad: function () { CKEDITOR.addCss(".cke_upload_uploading img{opacity: 0.3}") }, isSupportedEnvironment: function () { return CKEDITOR.plugins.clipboard.isFileApiSupported }, init: function (a) {
                        if (this.isSupportedEnvironment()) {
                            var d = CKEDITOR.fileTools, f = d.getUploadUrl(a.config, "image"); f && (d.addUploadWidget(a, "uploadimage", {
                                supportedTypes: /image\/(jpeg|png|gif|bmp)/, uploadUrl: f, fileToElement: function () {
                                    var a = new CKEDITOR.dom.element("img"); a.setAttribute("src", "data:image/gif;base64,R0lGODlhDgAOAIAAAAAAAP///yH5BAAAAAAALAAAAAAOAA4AAAIMhI+py+0Po5y02qsKADs\x3d");
                                    return a
                                }, parts: { img: "img" }, onUploading: function (a) { this.parts.img.setAttribute("src", a.data) }, onUploaded: function (a) { var b = this.parts.img.$; this.replaceWith('\x3cimg src\x3d"' + a.url + '" width\x3d"' + (a.responseData.width || b.naturalWidth) + '" height\x3d"' + (a.responseData.height || b.naturalHeight) + '"\x3e') }
                            }), a.on("paste", function (k) {
                                if (k.data.dataValue.match(/<img[\s\S]+data:/i)) {
                                    k = k.data; var l = document.implementation.createHTMLDocument(""), l = new CKEDITOR.dom.element(l.body), g, e, c; l.data("cke-editable",
                                        1); l.appendHtml(k.dataValue); g = l.find("img"); for (c = 0; c < g.count(); c++) { e = g.getItem(c); var n = e.getAttribute("src"), r = n && "data:" == n.substring(0, 5), x = null === e.data("cke-realelement"); r && x && !e.data("cke-upload-id") && !e.isReadOnly(1) && (r = (r = n.match(/image\/([a-z]+?);/i)) && r[1] || "jpg", n = a.uploadRepository.create(n, h(r)), n.upload(f), d.markElement(e, "uploadimage", n.id), d.bindNotifications(a, n)) } k.dataValue = l.getHtml()
                                }
                            }))
                        }
                    }
                })
        })(); (function () {
            function a(a) {
                function b(a) {
                    var d = !1; c.attachListener(c, "keydown",
                        function () { var b = l.getBody().getElementsByTag(a); if (!d) { for (var c = 0; c < b.count(); c++)b.getItem(c).setCustomData("retain", !0); d = !0 } }, null, null, 1); c.attachListener(c, "keyup", function () { var b = l.getElementsByTag(a); d && (1 == b.count() && !b.getItem(0).getCustomData("retain") && CKEDITOR.tools.isEmpty(b.getItem(0).getAttributes()) && b.getItem(0).remove(1), d = !1) })
                } var f = this.editor; if (f && !f.isDetached()) {
                    var l = a.document, g = l.body, e = l.getElementById("cke_actscrpt"); e && e.parentNode.removeChild(e); (e = l.getElementById("cke_shimscrpt")) &&
                        e.parentNode.removeChild(e); (e = l.getElementById("cke_basetagscrpt")) && e.parentNode.removeChild(e); g.contentEditable = !0; CKEDITOR.env.ie && (g.hideFocus = !0, g.disabled = !0, g.removeAttribute("disabled")); delete this._.isLoadingData; this.$ = g; l = new CKEDITOR.dom.document(l); this.setup(); this.fixInitialSelection(); var c = this; CKEDITOR.env.ie && !CKEDITOR.env.edge && l.getDocumentElement().addClass(l.$.compatMode); CKEDITOR.env.ie && !CKEDITOR.env.edge && f.enterMode != CKEDITOR.ENTER_P ? b("p") : CKEDITOR.env.edge && 15 > CKEDITOR.env.version &&
                            f.enterMode != CKEDITOR.ENTER_DIV && b("div"); if (CKEDITOR.env.webkit || CKEDITOR.env.ie && 10 < CKEDITOR.env.version) l.getDocumentElement().on("mousedown", function (a) { a.data.getTarget().is("html") && setTimeout(function () { f.editable().focus() }) }); h(f); try { f.document.$.execCommand("2D-position", !1, !0) } catch (n) { } (CKEDITOR.env.gecko || CKEDITOR.env.ie && "CSS1Compat" == f.document.$.compatMode) && this.attachListener(this, "keydown", function (a) {
                                var b = a.data.getKeystroke(); if (33 == b || 34 == b) if (CKEDITOR.env.ie) setTimeout(function () { f.getSelection().scrollIntoView() },
                                    0); else if (f.window.$.innerHeight > this.$.offsetHeight) { var c = f.createRange(); c[33 == b ? "moveToElementEditStart" : "moveToElementEditEnd"](this); c.select(); a.data.preventDefault() }
                            }); CKEDITOR.env.ie && this.attachListener(l, "blur", function () { try { l.$.selection.empty() } catch (a) { } }); CKEDITOR.env.iOS && this.attachListener(l, "touchend", function () { a.focus() }); g = f.document.getElementsByTag("title").getItem(0); g.data("cke-title", g.getText()); CKEDITOR.env.ie && (f.document.$.title = this._.docTitle); CKEDITOR.tools.setTimeout(function () {
                                "unloaded" ==
                                    this.status && (this.status = "ready"); f.fire("contentDom"); this._.isPendingFocus && (f.focus(), this._.isPendingFocus = !1); setTimeout(function () { f.fire("dataReady") }, 0)
                            }, 0, this)
                }
            } function h(a) {
                function b() { var e; a.editable().attachListener(a, "selectionChange", function () { var b = a.getSelection().getSelectedElement(); b && (e && (e.detachEvent("onresizestart", f), e = null), b.$.attachEvent("onresizestart", f), e = b.$) }) } function f(a) { a.returnValue = !1 } if (CKEDITOR.env.gecko) try {
                    var h = a.document.$; h.execCommand("enableObjectResizing",
                        !1, !a.config.disableObjectResizing); h.execCommand("enableInlineTableEditing", !1, !a.config.disableNativeTableHandles)
                } catch (g) { } else CKEDITOR.env.ie && 11 > CKEDITOR.env.version && a.config.disableObjectResizing && b()
            } function f() {
                var a = []; if (8 <= CKEDITOR.document.$.documentMode) { a.push("html.CSS1Compat [contenteditable\x3dfalse]{min-height:0 !important}"); var b = [], f; for (f in CKEDITOR.dtd.$removeEmpty) b.push("html.CSS1Compat " + f + "[contenteditable\x3dfalse]"); a.push(b.join(",") + "{display:inline-block}") } else CKEDITOR.env.gecko &&
                    (a.push("html{height:100% !important}"), a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}")); a.push("html{cursor:text;*cursor:auto}"); a.push("img,input,textarea{cursor:default}"); return a.join("\n")
            } var b; CKEDITOR.plugins.add("wysiwygarea", {
                init: function (a) {
                    a.config.fullPage && a.addFeature({ allowedContent: "html head title; style [media,type]; body (*)[id]; meta link [*]", requiredContent: "body" }); a.addMode("wysiwyg", function (f) {
                        function h(c) {
                            c && c.removeListener();
                            if (!a.isDestroyed() && !a.isDetached() && (a.editable(new b(a, n.getFrameDocument().getBody())), a.setData(a.getData(1), f), w)) { if (t) a.on("mode", l, { iframe: n, editor: a, callback: f }); a.on("mode", function () { a.status = "ready" }); g() }
                        } function l(a) { a && a.removeListener(); n.on("load", function () { p && (p = !1, e()) }) } function g() {
                            q = new MutationObserver(function (b) {
                                for (var c = 0; c < b.length; c++) {
                                    var f = b[c]; if ("childList" === f.type && 0 !== f.addedNodes.length) for (var g = 0; g < f.addedNodes.length; g++) {
                                        var h = f.addedNodes[g]; h.contains &&
                                            h.contains(a.container.$) && (t ? p = !0 : e())
                                    }
                                }
                            }); q.observe(a.config.observableParent, { childList: !0, subtree: !0 })
                        } function e() { var c = a.getData(!1), e; a.editable().preserveIframe = !0; a.editable(null); e = new b(a, n.getFrameDocument().getBody()); a.editable(e); a.status = "recreating"; a.setData(c, { callback: f, internal: !1, noSnapshot: !1 }) } var c = "document.open();" + (CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "") + "document.close();", c = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie && !CKEDITOR.env.edge ? "javascript:void(function(){" +
                            encodeURIComponent(c) + "}())" : "", n = CKEDITOR.dom.element.createFromHtml('\x3ciframe src\x3d"' + c + '" frameBorder\x3d"0"\x3e\x3c/iframe\x3e'); n.setStyles({ width: "100%", height: "100%" }); n.addClass("cke_wysiwyg_frame").addClass("cke_reset"); c = a.ui.space("contents"); c.append(n); var r = CKEDITOR.env.ie && !CKEDITOR.env.edge || CKEDITOR.env.gecko; if (r) n.on("load", h); var x = a.title, u = a.fire("ariaEditorHelpLabel", {}).label, p = !1, t = CKEDITOR.env.ie && 11 === CKEDITOR.env.version, w = !!window.MutationObserver, q; x && (CKEDITOR.env.ie &&
                                u && (x += ", " + u), n.setAttribute("title", x)); if (u) { var x = CKEDITOR.tools.getNextId(), B = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + x + '" class\x3d"cke_voice_label"\x3e' + u + "\x3c/span\x3e"); c.append(B, 1); n.setAttribute("aria-describedby", x) } a.on("beforeModeUnload", function (a) { a.removeListener(); B && B.remove(); w && q.disconnect() }); a.on("destroy", function () { q && q.disconnect() }); n.setAttributes({ tabIndex: a.tabIndex, allowTransparency: "true" }); !r && h(); a.fire("ariaWidget", n)
                    })
                }
            }); CKEDITOR.editor.prototype.addContentsCss =
                function (a) { var b = this.config, f = b.contentsCss; CKEDITOR.tools.isArray(f) || (b.contentsCss = f ? [f] : []); b.contentsCss.push(a) }; b = CKEDITOR.tools.createClass({
                    $: function () { this.base.apply(this, arguments); this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function (b) { CKEDITOR.tools.setTimeout(a, 0, this, b) }, this); this._.docTitle = this.getWindow().getFrame().getAttribute("title") || " " }, base: CKEDITOR.editable, proto: {
                        preserveIframe: !1, setData: function (a, b) {
                            var h = this.editor; if (b) this.setHtml(a), this.fixInitialSelection(),
                                h.fire("dataReady"); else {
                                this._.isLoadingData = !0; h._.dataStore = { id: 1 }; var l = h.config, g = l.fullPage, e = l.docType, c = CKEDITOR.tools.buildStyleHtml(f()).replace(/<style>/, '\x3cstyle data-cke-temp\x3d"1"\x3e'); g || (c += CKEDITOR.tools.buildStyleHtml(h.config.contentsCss)); var n = l.baseHref ? '\x3cbase href\x3d"' + l.baseHref + '" data-cke-temp\x3d"1" /\x3e' : ""; g && (a = a.replace(/<!DOCTYPE[^>]*>/i, function (a) { h.docType = e = a; return "" }).replace(/<\?xml\s[^\?]*\?>/i, function (a) { h.xmlDeclaration = a; return "" })); a = h.dataProcessor.toHtml(a);
                                g ? (/<body[\s|>]/.test(a) || (a = "\x3cbody\x3e" + a), /<html[\s|>]/.test(a) || (a = "\x3chtml\x3e" + a + "\x3c/html\x3e"), /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$\x26\x3ctitle\x3e\x3c/title\x3e")) : a = a.replace(/<html[^>]*>/, "$\x26\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e"), n && (a = a.replace(/<head[^>]*?>/, "$\x26" + n)), a = a.replace(/<\/head\s*>/, c + "$\x26"), a = e + a) : a = l.docType + '\x3chtml dir\x3d"' + l.contentsLangDirection + '" lang\x3d"' + (l.contentsLanguage || h.langCode) + '"\x3e\x3chead\x3e\x3ctitle\x3e' +
                                    this._.docTitle + "\x3c/title\x3e" + n + c + "\x3c/head\x3e\x3cbody" + (l.bodyId ? ' id\x3d"' + l.bodyId + '"' : "") + (l.bodyClass ? ' class\x3d"' + l.bodyClass + '"' : "") + "\x3e" + a + "\x3c/body\x3e\x3c/html\x3e"; CKEDITOR.env.gecko && (a = a.replace(/<body/, '\x3cbody contenteditable\x3d"true" '), 2E4 > CKEDITOR.env.version && (a = a.replace(/<body[^>]*>/, "$\x26\x3c!-- cke-content-start --\x3e"))); a = a.replace(/<body/, '\x3cbody role\x3d"textbox" aria-multiline\x3d"true"'); h.title && (a = a.replace(/<body/, '\x3cbody aria-label\x3d"' + CKEDITOR.tools.htmlEncodeAttr(h.title) +
                                        '"')); CKEDITOR.env.gecko || (a = a.replace("\x3cbody", '\x3cbody tabindex\x3d"0" ')); l = '\x3cscript id\x3d"cke_actscrpt" type\x3d"text/javascript"' + (CKEDITOR.env.ie ? ' defer\x3d"defer" ' : "") + "\x3evar wasLoaded\x3d0;function onload(){if(!wasLoaded)window.parent.CKEDITOR \x26\x26 window.parent.CKEDITOR.tools.callFunction(" + this._.frameLoadedHandler + ",window);wasLoaded\x3d1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "\x3c/script\x3e"; CKEDITOR.env.ie && 9 >
                                            CKEDITOR.env.version && (l += '\x3cscript id\x3d"cke_shimscrpt"\x3ewindow.parent.CKEDITOR.tools.enableHtml5Elements(document)\x3c/script\x3e'); n && CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (l += '\x3cscript id\x3d"cke_basetagscrpt"\x3evar baseTag \x3d document.querySelector( "base" );baseTag.href \x3d baseTag.href;\x3c/script\x3e'); a = a.replace(/(?=\s*<\/(:?head)>)/, l); this.clearCustomData(); this.clearListeners(); h.fire("contentDomUnload"); var r = this.getDocument(); try { r.write(a) } catch (w) {
                                                setTimeout(function () { r.write(a) },
                                                    0)
                                            }
                            }
                        }, getData: function (a) {
                            if (a) return this.getHtml(); a = this.editor; var b = a.config, f = b.fullPage, h = f && a.docType, g = f && a.xmlDeclaration, e = this.getDocument(), e = f ? e.getDocumentElement().getOuterHtml() : e.getBody().getHtml(); CKEDITOR.env.gecko && b.enterMode != CKEDITOR.ENTER_BR && (e = e.replace(/<br>(?=\s*(:?$|<\/body>))/, "")); f && (e = e.replace(/<body(.*?)role="?textbox"?/i, "\x3cbody$1").replace(/<body(.*?)aria-multiline="?true"?/i, "\x3cbody$1").replace(/<body(.*?)tabindex="?0"?/i, "\x3cbody$1").replace(/<body(.*?)aria-label="(.+?)"/i,
                                "\x3cbody$1").replace(/<body(.*?)aria-readonly="?(?:true|false)"?/i, "\x3cbody$1")); e = a.dataProcessor.toDataFormat(e); g && (e = g + "\n" + e); h && (e = h + "\n" + e); return e
                        }, focus: function () { this._.isLoadingData ? this._.isPendingFocus = !0 : b.baseProto.focus.call(this) }, detach: function () {
                            if (!this.preserveIframe) {
                                var a = this.editor, f = a.document, a = a.container.findOne("iframe.cke_wysiwyg_frame"); b.baseProto.detach.call(this); this.clearCustomData(this._.expandoNumber); f.getDocumentElement().clearCustomData(); CKEDITOR.tools.removeFunction(this._.frameLoadedHandler);
                                a && (a.clearCustomData(), (f = a.removeCustomData("onResize")) && f.removeListener(), a.isDetached() || a.remove())
                            }
                        }
                    }
                })
        })(); CKEDITOR.config.disableObjectResizing = !1; CKEDITOR.config.disableNativeTableHandles = !0; CKEDITOR.config.disableNativeSpellChecker = !0; CKEDITOR.config.observableParent = CKEDITOR.document.$; CKEDITOR.config.plugins = "dialogui,dialog,a11yhelp,about,basicstyles,bidi,blockquote,notification,button,toolbar,clipboard,panelbutton,panel,floatpanel,colorbutton,colordialog,copyformatting,menu,contextmenu,dialogadvtab,div,editorplaceholder,elementspath,enterkey,entities,exportpdf,popup,filetools,filebrowser,find,floatingspace,listblock,richcombo,font,format,fakeobjects,forms,horizontalrule,htmlwriter,iframe,image,indent,indentblock,indentlist,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,xml,ajax,pastetools,pastefromgdocs,pastefromlibreoffice,pastefromword,pastetext,preview,print,removeformat,resize,save,scayt,selectall,showblocks,showborders,smiley,sourcearea,specialchar,stylescombo,tab,table,tabletools,tableselection,templates,undo,lineutils,widgetselection,widget,notificationaggregator,uploadwidget,uploadimage,wysiwygarea";
        CKEDITOR.config.skin = "moono-lisa"; (function () {
            var a = function (a, f) { var b = CKEDITOR.getUrl("plugins/" + f); a = a.split(","); for (var d = 0; d < a.length; d++)CKEDITOR.skin.icons[a[d]] = { path: b, offset: -a[++d], bgsize: a[++d] } }; CKEDITOR.env.hidpi ? a("about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,bidiltr,168,,bidirtl,192,,blockquote,216,,copy-rtl,240,,copy,264,,cut-rtl,288,,cut,312,,paste-rtl,336,,paste,360,,codesnippet,384,,bgcolor,408,,textcolor,432,,copyformatting,456,,creatediv,480,,docprops-rtl,504,,docprops,528,,easyimagealigncenter,552,,easyimagealignleft,576,,easyimagealignright,600,,easyimagealt,624,,easyimagefull,648,,easyimageside,672,,easyimageupload,696,,embed,720,,embedsemantic,744,,emojipanel,768,,exportpdf,792,,find-rtl,816,,find,840,,replace,864,,button,888,,checkbox,912,,form,936,,hiddenfield,960,,imagebutton,984,,radio,1008,,select-rtl,1032,,select,1056,,textarea-rtl,1080,,textarea,1104,,textfield-rtl,1128,,textfield,1152,,horizontalrule,1176,,iframe,1200,,image,1224,,indent-rtl,1248,,indent,1272,,outdent-rtl,1296,,outdent,1320,,justifyblock,1344,,justifycenter,1368,,justifyleft,1392,,justifyright,1416,,language,1440,,anchor-rtl,1464,,anchor,1488,,link,1512,,unlink,1536,,bulletedlist-rtl,1560,,bulletedlist,1584,,numberedlist-rtl,1608,,numberedlist,1632,,mathjax,1656,,maximize,1680,,newpage-rtl,1704,,newpage,1728,,pagebreak-rtl,1752,,pagebreak,1776,,pastefromword-rtl,1800,,pastefromword,1824,,pastetext-rtl,1848,,pastetext,1872,,placeholder,1896,,preview-rtl,1920,,preview,1944,,print,1968,,removeformat,1992,,save,2016,,scayt,2040,,selectall,2064,,showblocks-rtl,2088,,showblocks,2112,,smiley,2136,,source-rtl,2160,,source,2184,,sourcedialog-rtl,2208,,sourcedialog,2232,,specialchar,2256,,table,2280,,templates-rtl,2304,,templates,2328,,uicolor,2352,,redo-rtl,2376,,redo,2400,,undo-rtl,2424,,undo,2448,,simplebox,4944,auto",
                "icons_hidpi.png") : a("about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,bidiltr,168,auto,bidirtl,192,auto,blockquote,216,auto,copy-rtl,240,auto,copy,264,auto,cut-rtl,288,auto,cut,312,auto,paste-rtl,336,auto,paste,360,auto,codesnippet,384,auto,bgcolor,408,auto,textcolor,432,auto,copyformatting,456,auto,creatediv,480,auto,docprops-rtl,504,auto,docprops,528,auto,easyimagealigncenter,552,auto,easyimagealignleft,576,auto,easyimagealignright,600,auto,easyimagealt,624,auto,easyimagefull,648,auto,easyimageside,672,auto,easyimageupload,696,auto,embed,720,auto,embedsemantic,744,auto,emojipanel,768,auto,exportpdf,792,auto,find-rtl,816,auto,find,840,auto,replace,864,auto,button,888,auto,checkbox,912,auto,form,936,auto,hiddenfield,960,auto,imagebutton,984,auto,radio,1008,auto,select-rtl,1032,auto,select,1056,auto,textarea-rtl,1080,auto,textarea,1104,auto,textfield-rtl,1128,auto,textfield,1152,auto,horizontalrule,1176,auto,iframe,1200,auto,image,1224,auto,indent-rtl,1248,auto,indent,1272,auto,outdent-rtl,1296,auto,outdent,1320,auto,justifyblock,1344,auto,justifycenter,1368,auto,justifyleft,1392,auto,justifyright,1416,auto,language,1440,auto,anchor-rtl,1464,auto,anchor,1488,auto,link,1512,auto,unlink,1536,auto,bulletedlist-rtl,1560,auto,bulletedlist,1584,auto,numberedlist-rtl,1608,auto,numberedlist,1632,auto,mathjax,1656,auto,maximize,1680,auto,newpage-rtl,1704,auto,newpage,1728,auto,pagebreak-rtl,1752,auto,pagebreak,1776,auto,pastefromword-rtl,1800,auto,pastefromword,1824,auto,pastetext-rtl,1848,auto,pastetext,1872,auto,placeholder,1896,auto,preview-rtl,1920,auto,preview,1944,auto,print,1968,auto,removeformat,1992,auto,save,2016,auto,scayt,2040,auto,selectall,2064,auto,showblocks-rtl,2088,auto,showblocks,2112,auto,smiley,2136,auto,source-rtl,2160,auto,source,2184,auto,sourcedialog-rtl,2208,auto,sourcedialog,2232,auto,specialchar,2256,auto,table,2280,auto,templates-rtl,2304,auto,templates,2328,auto,uicolor,2352,auto,redo-rtl,2376,auto,redo,2400,auto,undo-rtl,2424,auto,undo,2448,auto,simplebox,2472,auto",
                    "icons.png")
        })()
    }
})();