//! Copyright (c) Microsoft Corporation. All rights reserved.
var __extends = this && this.__extends || function(e, t) {
    function r() {
        this.constructor = e
    }
    for (var i in t)
        t.hasOwnProperty(i) && (e[i] = t[i]);
    r.prototype = t.prototype;
    e.prototype = new r
}
;
!function(e) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define([], e);
    else {
        var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this;
        t.OneDrive = e()
    }
}(function() {
    var e;
    return function t(e, r, i) {
        function n(a, s) {
            if (!r[a]) {
                if (!e[a]) {
                    var u = "function" == typeof require && require;
                    if (!s && u)
                        return u(a, !0);
                    if (o)
                        return o(a, !0);
                    var l = new Error("Cannot find module '" + a + "'");
                    throw l.code = "MODULE_NOT_FOUND",
                    l
                }
                var d = r[a] = {
                    exports: {}
                };
                e[a][0].call(d.exports, function(t) {
                    var r = e[a][1][t];
                    return n(r ? r : t)
                }, d, d.exports, t, e, r, i)
            }
            return r[a].exports
        }
        for (var o = "function" == typeof require && require, a = 0; a < i.length; a++)
            n(i[a]);
        return n
    }({
        1: [function(e, t, r) {
            !function(e, t) {
                "use strict";
                var r = function() {
                    function e() {}
                    e.SDK_VERSION_NUMBER = "7.2";
                    e.SDK_VERSION = "js-v" + e.SDK_VERSION_NUMBER;
                    e.TYPE_BOOLEAN = "boolean";
                    e.TYPE_FUNCTION = "function";
                    e.TYPE_OBJECT = "object";
                    e.TYPE_STRING = "string";
                    e.TYPE_NUMBER = "number";
                    e.VROOM_URL = "https://api.onedrive.com/v1.0/";
                    e.VROOM_ENDPOINT_HINT = "api.onedrive.com";
                    e.GRAPH_URL = "https://graph.microsoft.com/v1.0/";
                    e.NONCE_LENGTH = 5;
                    e.CUSTOMER_TID = "9188040d-6c67-4c5b-b112-36a304b66dad";
                    e.DEFAULT_QUERY_ITEM_PARAMETER = "select=id";
                    return e
                }();
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t["default"] = r
            }(e, r)
        }
        , {}],
        2: [function(e, t, r) {
            t.exports = function(e, t, r, i) {
                "use strict";
                var n = function() {
                    function e() {}
                    e.open = function(e) {
                        r["default"].open(e)
                    }
                    ;
                    e.save = function(e) {
                        r["default"].save(e)
                    }
                    ;
                    return e
                }();
                i.onAuth();
                return n
            }(e, r, e("./OneDriveApp"), e("./controllers/Oauth"))
        }
        , {
            "./OneDriveApp": 3,
            "./controllers/Oauth": 7
        }],
        3: [function(e, t, r) {
            !function(e, t, r, i, n, o, a, s) {
                "use strict";
                var u = function() {
                    function e() {}
                    e.open = function(t) {
                        if (e.isReady()) {
                            t || r.throwError(new o["default"](i["default"].unknown,"missing picker options")).exposeToPublic();
                            n["default"].logMessage("open started");
                            var s = new a["default"](t);
                            s.launchPicker().then(function() {
                                e.reset()
                            })
                        }
                    }
                    ;
                    e.save = function(t) {
                        if (e.isReady()) {
                            t || r.throwError(new o["default"](i["default"].unknown,"missing saver options"));
                            n["default"].logMessage("save started");
                            var a = new s["default"](t);
                            a.launchSaver().then(function() {
                                e.reset()
                            })
                        }
                    }
                    ;
                    e.reset = function() {
                        e.checked = !1
                    }
                    ;
                    e.isReady = function() {
                        if (e.checked)
                            return !1;
                        e.checked = !0;
                        return !0
                    }
                    ;
                    e.checked = !1;
                    return e
                }();
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t["default"] = u
            }(e, r, e("./utilities/ErrorHandler"), e("./models/ErrorType"), e("./utilities/Logging"), e("./models/OneDriveSdkError"), e("./controllers/Picker"), e("./controllers/Saver"))
        }
        , {
            "./controllers/Picker": 8,
            "./controllers/Saver": 10,
            "./models/ErrorType": 13,
            "./models/OneDriveSdkError": 16,
            "./utilities/ErrorHandler": 26,
            "./utilities/Logging": 27
        }],
        4: [function(e, t, r) {
            !function(e, t, r, i, n, o, a, s, u, l, d) {
                "use strict";
                function c(e, t, r) {
                    var o = b(e, t.apiEndpointUrl);
                    r && (o = u.appendToPath(o, "?" + r));
                    var a = new l["default"]({
                        url: o,
                        clientId: t.clientId,
                        method: l["default"].HTTP_GET,
                        apiEndpoint: t.apiEndpoint,
                        headers: {
                            Authorization: "bearer " + t.accessToken
                        }
                    });
                    n["default"].logMessage("performing GET on item with id: " + e.id);
                    return new d.Promise(function(e, t) {
                        a.start(function(t, r) {
                            var i = JSON.parse(t.responseText);
                            e(i)
                        }, function(e, r, n) {
                            t({
                                errorCode: i["default"][i["default"].webRequestFailure],
                                message: "HTTP error status: " + r
                            })
                        })
                    }
                    )
                }
                function p(e, t, r) {
                    for (var i = [], o = {
                        webUrl: null,
                        value: []
                    }, a = 0, s = e.value; a < s.length; a++) {
                        var u = s[a];
                        i.push(c(u, t, r))
                    }
                    return d.Promise.all(i).then(function(e) {
                        o.value = e;
                        return o
                    }, function(e) {
                        n["default"].logError("Received ajax error.", e);
                        return e
                    })
                }
                function f(e, t, r) {
                    var o = u.appendToPath(b(e, t.apiEndpointUrl), s.format("{0}.createLink", t.apiActionNamingSpace))
                      , a = new l["default"]({
                        url: o,
                        clientId: t.clientId,
                        method: l["default"].HTTP_POST,
                        apiEndpoint: t.apiEndpoint,
                        headers: {
                            Authorization: "bearer " + t.accessToken
                        },
                        json: JSON.stringify(r)
                    });
                    return new d.Promise(function(t, r) {
                        a.start(function(r, i, a) {
                            n["default"].logMessage(s.format("POST createLink succeeded via path {0}", o));
                            e.permissions = [JSON.parse(r.responseText)];
                            t(e)
                        }, function(e, t, a) {
                            n["default"].logMessage(s.format("POST createLink failed via path {0}", o));
                            r({
                                errorCode: i["default"][i["default"].webRequestFailure],
                                message: t
                            })
                        })
                    }
                    )
                }
                function h(e, t, r) {
                    for (var i = [], o = {
                        webUrl: null,
                        value: []
                    }, a = 0, s = e.value; a < s.length; a++) {
                        var u = s[a];
                        i.push(f(u, t, r))
                    }
                    return d.Promise.all(i).then(function(e) {
                        o.value = e;
                        return o
                    }, function(e) {
                        n["default"].logError("Received sharing error.", e);
                        return e
                    })
                }
                function v(e, t, r, o, c) {
                    var p = null;
                    return new d.Promise(function(d, f) {
                        window.File && r instanceof window.File ? p = new FileReader : f(new a["default"](i["default"].unsupportedFeature,"FileReader is not supported in this browser"));
                        p.onerror = function(e) {
                            n["default"].logError("failed to read or upload the file", e);
                            f(new a["default"](i["default"].fileReaderFailure,"failed to read or upload the file, see console log for details"))
                        }
                        ;
                        p.onload = function(r) {
                            var n = u.appendToPath(b(e, o.apiEndpointUrl), "children('" + t.name + "')/content")
                              , p = {};
                            p["@name.conflictBehavior"] = t["@name.conflictBehavior"];
                            var h = {};
                            h.Authorization = "bearer " + o.accessToken;
                            h["Content-Type"] = "multipart/form-data";
                            var v = new l["default"]({
                                url: u.appendQueryStrings(n, p),
                                clientId: o.clientId,
                                headers: h,
                                apiEndpoint: o.apiEndpoint
                            })
                              , m = r.target.result;
                            v.upload(m, function(e, t) {
                                d({
                                    webUrl: null,
                                    value: [JSON.parse(e.responseText)]
                                })
                            }, function(e, t, r) {
                                f(new a["default"](i["default"].webRequestFailure,s.format("file uploading failed by form uplaod with HTTP status: {0}", t)))
                            }, function(e, t) {
                                c(t.progressPercentage)
                            })
                        }
                        ;
                        p.readAsArrayBuffer(r)
                    }
                    )
                }
                function m(e, t, n, o) {
                    if (o.apiEndpoint === r["default"].filesV2 || o.apiEndpoint === r["default"].graph_odb)
                        return new d.Promise(function(e, t) {
                            t(new a["default"](i["default"].unsupportedFeature,"URL upload not supported for OneDrive business"))
                        }
                        );
                    var s = u.appendToPath(b(e, o.apiEndpointUrl), "children")
                      , p = {};
                    p.Prefer = "respond-async";
                    p.Authorization = "bearer " + o.accessToken;
                    t[_(o.apiEndpoint)] = n;
                    t.file = {};
                    var f = new l["default"]({
                        url: s,
                        clientId: o.clientId,
                        method: l["default"].HTTP_POST,
                        headers: p,
                        json: JSON.stringify(t),
                        apiEndpoint: o.apiEndpoint
                    });
                    return u.isPathDataUrl(n) ? y(f) : u.isPathFullUrl(n) ? E(f).then(function(e) {
                        return w(e).then(function(e) {
                            var t = {
                                id: e
                            };
                            return c(t, o).then(function(e) {
                                var t = {
                                    webUrl: null,
                                    value: [e]
                                };
                                return d.Promise.resolve(t)
                            })
                        })
                    }) : void 0
                }
                function g(e) {
                    var t = u.appendQueryString(u.appendToPath(e.apiEndpointUrl, "me"), "$select", "mySite")
                      , r = {};
                    r.Authorization = "bearer " + e.accessToken;
                    r.Accept = "application/json";
                    var n = new l["default"]({
                        url: t,
                        clientId: e.clientId,
                        method: l["default"].HTTP_GET,
                        headers: r,
                        apiEndpoint: e.apiEndpoint
                    });
                    return new d.Promise(function(e, t) {
                        n.start(function(r, n) {
                            var u = o.deserializeJSON(r.responseText);
                            u.mySite ? e(u.mySite) : t(new a["default"](i["default"].badResponse,s.format("Cannot find the personal tenant url, response text: {0}", r.responseText)))
                        }, function(e, r, n) {
                            t(new a["default"](i["default"].webRequestFailure,s.format("graph/me request failed, status code: '{0}', response text: '{1}'", l["default"].statusCodeToString(r), e.responseText)))
                        })
                    }
                    )
                }
                function y(e) {
                    return new d.Promise(function(t, r) {
                        e.start(function(e, n) {
                            if (200 === n || 201 === n) {
                                var u = {
                                    webUrl: null,
                                    value: [o.deserializeJSON(e.responseText)]
                                };
                                t(u)
                            } else
                                r(new a["default"](i["default"].webRequestFailure,s.format("file uploading failed by data uri with HTTP status: {0}", n)))
                        }, function(e, t, n) {
                            r(new a["default"](i["default"].webRequestFailure,s.format("file uploading failed with HTTP status: {0}", t)))
                        })
                    }
                    )
                }
                function E(e) {
                    return new d.Promise(function(t, r) {
                        e.start(function(e, n) {
                            if (202 === n) {
                                var o = e.getResponseHeader("Location");
                                o || r({
                                    errorCode: i["default"].badResponse,
                                    message: "missing 'Location' header on response"
                                });
                                t(o)
                            } else
                                r(new a["default"](i["default"].webRequestFailure,s.format("create upload by url job failed with HTTP status: {0}", n)))
                        }, function(e, t, n) {
                            r(new a["default"](i["default"].webRequestFailure,s.format("create upload by url job failed with HTTP status: {0}", t)))
                        })
                    }
                    )
                }
                function _(e) {
                    return e === r["default"].graph_odb || e === r["default"].graph_odc ? "@microsoft.graph.sourceUrl" : "@content.sourceUrl"
                }
                function w(e) {
                    return new d.Promise(function(t, r) {
                        !function n(o, s) {
                            if (!o--) {
                                s *= 2;
                                o = k
                            }
                            T(e).then(function(e) {
                                e.resourceId ? t(e.resourceId) : s <= O ? setTimeout(n(o, s), s) : r(new a["default"](i["default"].webRequestFailure,"polling the uploading job takes too much time"))
                            })
                        }(k, P)
                    }
                    )
                }
                function T(e) {
                    var t = new l["default"]({
                        url: e,
                        method: l["default"].HTTP_GET
                    });
                    return new d.Promise(function(e, r) {
                        t.start(function(t, n) {
                            switch (n) {
                            case 202:
                            case 200:
                                var u = o.deserializeJSON(t.responseText);
                                e(u);
                                break;
                            default:
                                r(new a["default"](i["default"].webRequestFailure,s.format("polling upload job failed with HTTP status: {0}", n)))
                            }
                        }, function(e, t, n) {
                            r(new a["default"](i["default"].webRequestFailure,s.format("polling upload job failed with HTTP status: {0}", t)))
                        })
                    }
                    )
                }
                function b(e, t) {
                    var r;
                    r = e.parentReference && e.parentReference.driveId ? u.appendToPath("drives", e.parentReference.driveId) : "drive";
                    r = u.appendToPath(r, e.id === U ? "root" : "items/" + e.id);
                    return u.appendToPath(t, r)
                }
                var P = 100
                  , k = 5
                  , O = 18e5
                  , U = "root";
                t.getItem = c;
                t.getItems = p;
                t.shareItem = f;
                t.shareItems = h;
                t.saveItemByFormUpload = v;
                t.saveItemByUriUpload = m;
                t.getUserTenantUrl = g
            }(e, r, e("../models/ApiEndpoint"), e("../models/ErrorType"), e("../utilities/Logging"), e("../utilities/ObjectUtilities"), e("../models/OneDriveSdkError"), e("../utilities/StringUtilities"), e("../utilities/UrlUtilities"), e("../utilities/XHR"), e("es6-promise"))
        }
        , {
            "../models/ApiEndpoint": 11,
            "../models/ErrorType": 13,
            "../models/OneDriveSdkError": 16,
            "../utilities/Logging": 27,
            "../utilities/ObjectUtilities": 28,
            "../utilities/StringUtilities": 30,
            "../utilities/UrlUtilities": 32,
            "../utilities/XHR": 33,
            "es6-promise": 34
        }],
        5: [function(e, t, r) {
            !function(e, t, r, i, n, o, a, s, u, l, d, c, p, f, h, v, m) {
                "use strict";
                var g = function() {
                    function e(e) {
                        this.invokerOptions = e;
                        this.popup = new f["default"]
                    }
                    e.prototype.launchInvoker = function() {
                        var e = this
                          , t = this.invokerOptions;
                        return this.launch()["catch"](function(e) {
                            u["default"].logError("Failed due to unknown error: ", e);
                            t.error(e)
                        }).then(function() {
                            e.cleanPopupAndIFrame()
                        })
                    }
                    ;
                    e.prototype.launch = function(e) {
                        var t = this;
                        return this.buildOauthPromise(e).then(function(e) {
                            return e && "cancel" === e.type ? e : t.buildPickerUI(e)
                        }).then(function(e) {
                            var r = t.invokerOptions
                              , i = e.type;
                            i || a.throwError(new c["default"](s["default"].badResponse,v.format("received bad response from picker UX: {0}", JSON.stringify(e)))).exposeToPublic();
                            if ("switch" === e.type)
                                return t.launch(!0);
                            if ("success" === e.type) {
                                for (var u = [], l = !1, d = 0, p = e.items; d < p.length; d++) {
                                    var f = p[d];
                                    f.driveItem && !l && (l = !0);
                                    u.push(f)
                                }
                                var m = {
                                    webUrl: null,
                                    value: u
                                }
                                  , g = void 0;
                                if (!r.needAPICall() || l && "rps" === r.accessToken.toLowerCase())
                                    g = h.Promise.resolve(m);
                                else {
                                    t.apiRequestConfig = t.buildApiConfig();
                                    g = t.makeApiRequest(m)
                                }
                                return g.then(function(e) {
                                    t.oauthResponse && (e.accessToken = t.oauthResponse.accessToken);
                                    t.apiRequestConfig ? e.apiEndpoint = t.apiRequestConfig.apiEndpointUrl : t.loginHint && t.loginHint.endpointHint === o["default"].aad && (e.apiEndpoint = n["default"].GRAPH_URL);
                                    r.success(e);
                                    return e
                                })
                            }
                            if ("cancel" === e.type) {
                                r.cancel();
                                return h.Promise.resolve({
                                    webUrl: null,
                                    value: null
                                })
                            }
                        })
                    }
                    ;
                    e.prototype.buildOauthPromise = function(e) {
                        var t;
                        t = e || this.invokerOptions.needOauth() ? d.auth(d.buildOauthConfig(this.invokerOptions, e), this.popup) : h.Promise.resolve(null);
                        return t
                    }
                    ;
                    e.prototype.buildPickerUI = function(e) {
                        var t, n = this;
                        if (e) {
                            this.oauthResponse = e;
                            t = l.updateLoginHint(this.invokerOptions.clientId, this.oauthResponse.idToken, this.invokerOptions)
                        } else {
                            this.invokerOptions.endpointHint !== o["default"].msa && this.invokerOptions.endpointHint !== o["default"].tenant && a.throwError(new c["default"](s["default"].optionsError,"must specify the endpointHint in advanced options as 'api.onedrive.com' for customer picker or the url for business picker/tenant")).exposeToPublic();
                            var u = this.invokerOptions.endpointHint === o["default"].msa;
                            t = {
                                loginHint: null,
                                timeStamp: null,
                                apiEndpoint: u ? r["default"].msa : r["default"].filesV2,
                                endpointHint: u ? o["default"].msa : o["default"].tenant,
                                isConsumerAccount: u
                            }
                        }
                        this.loginHint = t;
                        var d;
                        d = t.apiEndpoint === r["default"].graph_odb ? i.getUserTenantUrl(this.buildApiConfig()) : h.Promise.resolve(void 0);
                        return d.then(function(e) {
                            n.pickerUX = p.generatePickerUX(t.apiEndpoint, t.endpointHint === o["default"].tenant ? n.invokerOptions.siteUrl : e);
                            var r = n.buildPickerUXConfig(n.invokerOptions);
                            n.invokerOptions.navEntryLocation && (r.entryLocation = n.invokerOptions.navEntryLocation);
                            n.invokerOptions.navSourceTypes && (r.sourceTypes = n.invokerOptions.navSourceTypes);
                            n.invokerOptions.linkType && (r.linkType = n.invokerOptions.linkType);
                            r.trapFocus = n.invokerOptions.trapFocus;
                            return n.pickerUX.invokePickerUX(r, n.popup)
                        })
                    }
                    ;
                    e.prototype.getApiRequestConfig = function() {
                        return this.apiRequestConfig
                    }
                    ;
                    e.prototype.buildApiConfig = function() {
                        this.loginHint || a.throwError(new c["default"](s["default"].internalError,"missing loginHint when trying to build API request")).exposeToPublic();
                        this.oauthResponse || this.invokerOptions.accessToken || a.throwError(new c["default"](s["default"].internalError,"missing access token when trying to build API request")).exposeToPublic();
                        var e = null
                          , t = null;
                        switch (this.loginHint.apiEndpoint) {
                        case r["default"].graph_odb:
                        case r["default"].graph_odc:
                            e = n["default"].GRAPH_URL;
                            t = "microsoft.graph";
                            break;
                        case r["default"].msa:
                            e = n["default"].VROOM_URL;
                            t = "action";
                            break;
                        case r["default"].filesV2:
                            e = m.appendToPath(this.invokerOptions.siteUrl, "_api/v2.0/");
                            t = "action";
                            break;
                        default:
                            a.throwError(new c["default"](s["default"].internalError,"apiEndpoint in loginHint is not correct"))
                        }
                        var i = {
                            accessToken: this.oauthResponse ? this.oauthResponse.accessToken : this.invokerOptions.accessToken,
                            apiEndpoint: this.loginHint.apiEndpoint,
                            apiEndpointUrl: e,
                            apiActionNamingSpace: t,
                            clientId: this.invokerOptions.clientId
                        };
                        return i
                    }
                    ;
                    e.prototype.cleanPopupAndIFrame = function() {
                        this.popup && this.popup.close();
                        this.pickerUX && this.pickerUX.removeIFrame()
                    }
                    ;
                    return e
                }();
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t["default"] = g
            }(e, r, e("../models/ApiEndpoint"), e("./ApiRequest"), e("../Constants"), e("../models/DomainHint"), e("../utilities/ErrorHandler"), e("../models/ErrorType"), e("../utilities/Logging"), e("./LoginCache"), e("./Oauth"), e("../models/OneDriveSdkError"), e("./PickerUX"), e("../utilities/Popup"), e("es6-promise"), e("../utilities/StringUtilities"), e("../utilities/UrlUtilities"))
        }
        , {
            "../Constants": 1,
            "../models/ApiEndpoint": 11,
            "../models/DomainHint": 12,
            "../models/ErrorType": 13,
            "../models/OneDriveSdkError": 16,
            "../utilities/ErrorHandler": 26,
            "../utilities/Logging": 27,
            "../utilities/Popup": 29,
            "../utilities/StringUtilities": 30,
            "../utilities/UrlUtilities": 32,
            "./ApiRequest": 4,
            "./LoginCache": 6,
            "./Oauth": 7,
            "./PickerUX": 9,
            "es6-promise": 34
        }],
        6: [function(e, t, r) {
            !function(e, t, r, i, n, o, a, s, u, l) {
                "use strict";
                function d(e) {
                    e || a.throwError(new u["default"](s["default"].optionsError,"invoker option is not defined!"));
                    var t = i.getCacheItem(g) || {}
                      , r = t[y + e.clientId];
                    return r ? e.endpointHint !== r.endpointHint ? null : e.loginHint && e.loginHint !== r.loginHint ? null : r : null
                }
                function c() {
                    var e = i.getCacheItem(g);
                    return (new Date).getTime() - e.timeStamp > h
                }
                function p(e, t, a) {
                    var s, u, l, d;
                    switch (a.endpointHint) {
                    case o["default"].aad:
                        var c = this.parseIdToken(t);
                        s = c.preferredUserName;
                        if (c.tid === n["default"].CUSTOMER_TID) {
                            l = r["default"].graph_odc;
                            d = !0
                        } else {
                            l = r["default"].graph_odb;
                            d = !1
                        }
                        u = o["default"].aad;
                        break;
                    case o["default"].msa:
                        l = r["default"].msa;
                        u = o["default"].msa;
                        s = a.loginHint;
                        d = !0;
                        break;
                    case o["default"].tenant:
                        l = r["default"].filesV2;
                        u = o["default"].tenant;
                        s = a.loginHint;
                        d = !1
                    }
                    var p = {
                        apiEndpoint: l,
                        loginHint: s,
                        endpointHint: u,
                        timeStamp: (new Date).getTime(),
                        isConsumerAccount: d
                    }
                      , f = i.getCacheItem(g) || {};
                    f[y + e] = p;
                    i.setCacheItem(g, f);
                    return p
                }
                function f(e) {
                    e || a.throwError(new u["default"](s["default"].badResponse,"id_token is missing in oauth response"));
                    var t = e.split(".")[1]
                      , r = t.replace("-", "+").replace("_", "/")
                      , i = l.deserializeJSON(atob(r));
                    i[v] || a.throwError(new u["default"](s["default"].badResponse,"tid is missing in id_token response"));
                    i[m] || a.throwError(new u["default"](s["default"].badResponse,"preferred_username is missing in id_token response"));
                    return {
                        tid: i[v],
                        preferredUserName: i[m]
                    }
                }
                var h = 36e5
                  , v = "tid"
                  , m = "preferred_username"
                  , g = "odsdkLoginHint"
                  , y = "od7-";
                t.getLoginHint = d;
                t.loginHintExpired = c;
                t.updateLoginHint = p;
                t.parseIdToken = f
            }(e, r, e("../models/ApiEndpoint"), e("../utilities/Cache"), e("../Constants"), e("../models/DomainHint"), e("../utilities/ErrorHandler"), e("../models/ErrorType"), e("../models/OneDriveSdkError"), e("../utilities/ObjectUtilities"))
        }
        , {
            "../Constants": 1,
            "../models/ApiEndpoint": 11,
            "../models/DomainHint": 12,
            "../models/ErrorType": 13,
            "../models/OneDriveSdkError": 16,
            "../utilities/Cache": 22,
            "../utilities/ErrorHandler": 26,
            "../utilities/ObjectUtilities": 28
        }],
        7: [function(e, t, r) {
            !function(e, t, r, i, n, o, a, s, u, l, d, c) {
                "use strict";
                function p() {
                    n.onDocumentReady(function() {
                        var e = c.readCurrentUrlParameters()
                          , t = !!(e[U] || (e[P] || e[b]) && e[C]);
                        t && window.opener && f(e, new r["default"](window.opener))
                    })
                }
                function f(e, t) {
                    n.displayOverlay();
                    e[U] ? g(JSON.parse(e[U])) : e[P] ? m(h(e), t) : e[b] && m(v(e), t)
                }
                function h(e) {
                    var t = new l["default"](a["default"].badResponse,e[k]);
                    return {
                        type: "error",
                        error: t,
                        state: e[C]
                    }
                }
                function v(e) {
                    return {
                        type: "success",
                        accessToken: e[b],
                        idToken: e[O],
                        state: e[C]
                    }
                }
                function m(e, t) {
                    if (e.state) {
                        var r = e.state.split("_");
                        2 !== r.length && o.throwError(new l["default"](a["default"].badResponse,"received bad state parameter from Oauth endpoint, state received: " + e.state)).exposeToPublic();
                        var i = r[0];
                        t ? t.send(R + JSON.stringify(e), i) : o.throwError(new l["default"](a["default"].popupOpen,"opener is not defined")).exposeToPublic()
                    } else
                        o.throwError(new l["default"](a["default"].badResponse,"missing state parameter from Oauth redirect")).exposeToPublic()
                }
                function g(e) {
                    var t;
                    switch (e.endpoint) {
                    case u["default"].AAD:
                        t = y(e);
                        break;
                    case u["default"].AADv2:
                        t = E(e);
                        break;
                    case u["default"].MSA:
                        t = _(e);
                        break;
                    default:
                        o.throwError(new l["default"](a["default"].badResponse,"received bad oauth endpoint, endpoint value is: " + e.endpoint))
                    }
                    if (e.switchAccount)
                        t = c.appendQueryString(t, "prompt", "select_account");
                    else if (e.loginHint) {
                        t = c.appendQueryString(t, "login_hint", e.loginHint);
                        t = c.appendQueryString(t, "domain_hint", e.isConsumerAccount ? "consumers" : "organizations")
                    }
                    c.redirect(t)
                }
                function y(e) {
                    return c.appendQueryStrings(S, {
                        redirect_uri: e.redirectUri,
                        client_id: e.clientId,
                        response_type: "token",
                        state: e.state,
                        resource: e.origin
                    })
                }
                function E(e) {
                    var t = "profile openid https://graph.microsoft.com/User.Read " + e.scopes.map(function(e) {
                        return "https://graph.microsoft.com/" + e
                    }).join(" ")
                      , r = c.appendQueryStrings(A, {
                        redirect_uri: e.redirectUri,
                        client_id: e.clientId,
                        scope: t,
                        response_mode: "fragment",
                        state: e.state,
                        nonce: c.generateNonce()
                    });
                    r += "&response_type=id_token+token";
                    return r
                }
                function _(e) {
                    for (var t = !1, r = 0, i = e.scopes; r < i.length; r++) {
                        var n = i[r];
                        t = t || n.toLowerCase().indexOf("readwrite") > 1
                    }
                    return c.appendQueryStrings(I, {
                        redirect_uri: e.redirectUri,
                        client_id: e.clientId,
                        response_type: "token",
                        state: e.state,
                        scope: "onedrive." + (t ? "readwrite" : "readonly")
                    })
                }
                function w(e, t) {
                    var r = document.location.origin + "_" + c.generateNonce();
                    e.state = r;
                    return new d.Promise(function(i, o) {
                        var s = n.onMessage(function(e) {
                            if (e.data && 0 === e.data.indexOf(R)) {
                                var u = JSON.parse(e.data.substring(R.length));
                                if (u.state === r && e.source === t.getPopupWindow()) {
                                    n.removeMessageListener(s);
                                    if ("error" === u.type || u.error) {
                                        var d = a["default"][u.error.errorCode];
                                        o(new l["default"](d,u.error.message))
                                    } else
                                        i(u)
                                } else
                                    o(new l["default"](a["default"].popupOpen,"Another popup is already opened."))
                            }
                        });
                        return t.openPopup(c.appendQueryString(e.redirectUri, U, JSON.stringify(e))).then(function() {
                            i({
                                type: "cancel",
                                state: r
                            })
                        })
                    }
                    )
                }
                function T(e, t) {
                    var r;
                    switch (e.endpointHint) {
                    case i["default"].aad:
                        r = u["default"].AADv2;
                        break;
                    case i["default"].msa:
                        r = u["default"].MSA;
                        break;
                    case i["default"].tenant:
                        r = u["default"].AAD
                    }
                    var n = e.scopes.map(function(t) {
                        return t + (t.indexOf("Files.") > -1 && e.needSharePointPermission ? ".All" : "")
                    })
                      , o = {
                        clientId: e.clientId,
                        endpoint: r,
                        scopes: n,
                        origin: window.location.origin,
                        redirectUri: e.redirectUri,
                        switchAccount: t
                    }
                      , a = s.getLoginHint(e);
                    if (e.loginHint) {
                        o.loginHint = e.loginHint;
                        o.isConsumerAccount = e.isConsumerAccount
                    } else if (a) {
                        o.loginHint = a.loginHint;
                        o.isConsumerAccount = a.isConsumerAccount
                    }
                    return o
                }
                var b = "access_token"
                  , P = "error"
                  , k = "error_description"
                  , O = "id_token"
                  , U = "oauth"
                  , C = "state"
                  , S = "https://login.microsoftonline.com/common/oauth2/authorize"
                  , A = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize"
                  , I = "https://login.live.com/oauth20_authorize.srf"
                  , R = "[OneDriveSDK-OauthResponse]";
                t.onAuth = p;
                t.handleOauth = f;
                t.auth = w;
                t.buildOauthConfig = T
            }(e, r, e("../utilities/Channel"), e("../models/DomainHint"), e("../utilities/DomUtilities"), e("../utilities/ErrorHandler"), e("../models/ErrorType"), e("./LoginCache"), e("../models/OauthEndpoint"), e("../models/OneDriveSdkError"), e("es6-promise"), e("../utilities/UrlUtilities"))
        }
        , {
            "../models/DomainHint": 12,
            "../models/ErrorType": 13,
            "../models/OauthEndpoint": 15,
            "../models/OneDriveSdkError": 16,
            "../utilities/Channel": 24,
            "../utilities/DomUtilities": 25,
            "../utilities/ErrorHandler": 26,
            "../utilities/UrlUtilities": 32,
            "./LoginCache": 6,
            "es6-promise": 34
        }],
        8: [function(e, t, r) {
            !function(e, t, r, i, n, o, a, s, u, l, d) {
                "use strict";
                var c = function(e) {
                    function t(t) {
                        var r = a.shallowClone(t)
                          , i = new s["default"](r);
                        e.call(this, i)
                    }
                    __extends(t, e);
                    t.prototype.launchPicker = function() {
                        return e.prototype.launchInvoker.call(this)
                    }
                    ;
                    t.prototype.buildPickerUXConfig = function(e) {
                        var r = {
                            applicationId: e.clientId,
                            accessLevel: t.ACCESS_LEVEL,
                            filter: e.filter,
                            id: d.generateNonce(),
                            navEnabled: e.navEnabled,
                            origin: window.location.origin,
                            parentDiv: e.parentDiv,
                            redirectUri: e.redirectUri,
                            selectionMode: e.multiSelect ? "multiple" : "single",
                            viewType: t.VIEW_TYPE
                        };
                        return r
                    }
                    ;
                    t.prototype.makeApiRequest = function(e) {
                        if (this.invokerOptions.action === u["default"].share)
                            return this.shareItems(e);
                        var t = this.invokerOptions.action === u["default"].download;
                        return this.queryItems(e, t)
                    }
                    ;
                    t.prototype.queryItems = function(e, t) {
                        var r = this.invokerOptions.queryParameters || n["default"].DEFAULT_QUERY_ITEM_PARAMETER;
                        t && (r = l.format("{0}{1}{2}", r, r.indexOf("select") === -1 ? "&select=" : ",", "name,size,@content.downloadUrl"));
                        return i.getItems(e, this.getApiRequestConfig(), r)
                    }
                    ;
                    t.prototype.shareItems = function(e) {
                        var t = this
                          , r = this.invokerOptions
                          , n = r.createLinkParameters || this.getDefaultSharingConfig();
                        return i.getItems(e, this.getApiRequestConfig()).then(function(e) {
                            return i.shareItems(e, t.getApiRequestConfig(), n)
                        })
                    }
                    ;
                    t.prototype.getDefaultSharingConfig = function() {
                        var e = {
                            type: "view"
                        };
                        if (this.getApiRequestConfig().apiEndpoint === r["default"].graph_odc || this.getApiRequestConfig().apiEndpoint === r["default"].msa)
                            return e;
                        e.scope = "organization";
                        return e
                    }
                    ;
                    t.ACCESS_LEVEL = "read";
                    t.VIEW_TYPE = "files";
                    return t
                }(o["default"]);
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t["default"] = c
            }(e, r, e("../models/ApiEndpoint"), e("./ApiRequest"), e("../Constants"), e("./Invoker"), e("../utilities/ObjectUtilities"), e("../models/PickerOptions"), e("../models/PickerActionType"), e("../utilities/StringUtilities"), e("../utilities/UrlUtilities"))
        }
        , {
            "../Constants": 1,
            "../models/ApiEndpoint": 11,
            "../models/PickerActionType": 17,
            "../models/PickerOptions": 18,
            "../utilities/ObjectUtilities": 28,
            "../utilities/StringUtilities": 30,
            "../utilities/UrlUtilities": 32,
            "./ApiRequest": 4,
            "./Invoker": 5
        }],
        9: [function(e, t, r) {
            !function(e, t, r, i, n, o, a, s, u, l, d, c) {
                "use strict";
                function p(e, t) {
                    return new g(e,t)
                }
                var f = "https://onedrive.live.com/"
                  , h = "[OneDrive-FromPicker]"
                  , v = "[OneDrive-ToPicker]"
                  , m = "initialize";
                t.generatePickerUX = p;
                var g = function() {
                    function e(e, t) {
                        if (e === r["default"].graph_odc || e === r["default"].msa)
                            this.url = l.appendQueryStrings(f, {
                                v: "2"
                            });
                        else if (e === r["default"].graph_odb || e === r["default"].filesV2) {
                            t || o.throwError(new u["default"](a["default"].optionsError,"the site url must be specified")).exposeToPublic();
                            l.validateUrlProtocol(t, ["HTTPS"]);
                            e === r["default"].graph_odb && (t = l.appendToPath(t, "_layouts/onedrive.aspx"));
                            this.url = l.appendQueryString(t, "p", "2")
                        }
                    }
                    e.prototype.invokePickerUX = function(e, t) {
                        var r = this
                          , o = !1
                          , a = new d.Promise(function(a, u) {
                            var d = n.onMessage(function(s) {
                                var u = r.url.split("/")
                                  , l = new i["default"](r.iframe ? r.iframe.contentWindow : t.getPopupWindow());
                                if (s.origin === u[0] + "//" + u[2]) {
                                    var c = "" + (s.data || "");
                                    if (0 === c.indexOf(h) && s.source === l.getReceiver()) {
                                        var p = JSON.parse(c.substring(h.length))
                                          , f = p.pickerId
                                          , g = p.conversationId
                                          , y = p.type;
                                        if (f === e.id)
                                            if (y === m)
                                                l.send(v + JSON.stringify({
                                                    pickerId: f,
                                                    conversationId: g,
                                                    type: "activate"
                                                }), s.origin);
                                            else {
                                                o = !0;
                                                a(p);
                                                n.removeMessageListener(d)
                                            }
                                    }
                                }
                            })
                              , p = {
                                aid: e.applicationId,
                                a: e.accessLevel,
                                id: e.id,
                                l: e.linkType,
                                ln: e.navEnabled,
                                s: e.selectionMode,
                                f: e.filter,
                                v: e.viewType,
                                ru: e.redirectUri,
                                o: e.origin,
                                sdk: c["default"].SDK_VERSION_NUMBER,
                                e: e.entryLocation,
                                st: e.sourceTypes,
                                sn: !e.parentDiv,
                                ss: !e.parentDiv,
                                tf: e.trapFocus
                            }
                              , f = l.appendQueryString(r.url, "picker", JSON.stringify(p));
                            s["default"].logMessage("invoke picker with url: " + f);
                            if (!e.parentDiv)
                                return t.openPopup(f).then(function() {
                                    a({
                                        type: "cancel"
                                    })
                                });
                            t.close();
                            var g = document.createElement("iframe");
                            g.id = "odpicker" + (new Date).getTime();
                            g.style.position = "relative";
                            g.style.width = "100%";
                            g.style.height = "100%";
                            g.src = f;
                            e.parentDiv.appendChild(g);
                            r.iframe = g
                        }
                        );
                        return a
                    }
                    ;
                    e.prototype.removeIFrame = function() {
                        if (this.iframe) {
                            this.iframe.parentNode.removeChild(this.iframe);
                            this.iframe = null
                        }
                    }
                    ;
                    return e
                }();
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t["default"] = g
            }(e, r, e("../models/ApiEndpoint"), e("../utilities/Channel"), e("../utilities/DomUtilities"), e("../utilities/ErrorHandler"), e("../models/ErrorType"), e("../utilities/Logging"), e("../models/OneDriveSdkError"), e("../utilities/UrlUtilities"), e("es6-promise"), e("../Constants"))
        }
        , {
            "../Constants": 1,
            "../models/ApiEndpoint": 11,
            "../models/ErrorType": 13,
            "../models/OneDriveSdkError": 16,
            "../utilities/Channel": 24,
            "../utilities/DomUtilities": 25,
            "../utilities/ErrorHandler": 26,
            "../utilities/Logging": 27,
            "../utilities/UrlUtilities": 32,
            "es6-promise": 34
        }],
        10: [function(e, t, r) {
            !function(e, t, r, i, n, o, a, s, u, l) {
                "use strict";
                var d = "readwrite"
                  , c = "folders"
                  , p = "single"
                  , f = function(e) {
                    function t(t) {
                        var r = o.shallowClone(t)
                          , i = new s["default"](r);
                        e.call(this, i)
                    }
                    __extends(t, e);
                    t.prototype.launchSaver = function() {
                        return e.prototype.launchInvoker.call(this)
                    }
                    ;
                    t.prototype.buildPickerUXConfig = function(e) {
                        return {
                            applicationId: e.clientId,
                            accessLevel: d,
                            id: l.generateNonce(),
                            navEnabled: e.navEnabled,
                            filter: e.filter,
                            origin: window.location.origin,
                            parentDiv: e.parentDiv,
                            redirectUri: e.redirectUri,
                            selectionMode: p,
                            viewType: c
                        }
                    }
                    ;
                    t.prototype.makeApiRequest = function(e) {
                        var t = this.invokerOptions;
                        if (this.invokerOptions.action === a["default"].query) {
                            var n = this.invokerOptions.queryParameters || i["default"].DEFAULT_QUERY_ITEM_PARAMETER;
                            return r.getItems(e, this.apiRequestConfig, n)
                        }
                        if (t.uploadType === u["default"].dataUrl || t.uploadType === u["default"].url) {
                            var o = {
                                name: t.fileName
                            };
                            return r.saveItemByUriUpload(e.value[0], o, t.sourceUri, this.apiRequestConfig)
                        }
                        if (t.uploadType === u["default"].form) {
                            var o = {
                                name: t.fileName,
                                "@name.conflictBehavior": t.nameConflictBehavior
                            };
                            return r.saveItemByFormUpload(e.value[0], o, t.fileInput, this.apiRequestConfig, t.progress)
                        }
                    }
                    ;
                    return t
                }(n["default"]);
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t["default"] = f
            }(e, r, e("./ApiRequest"), e("../Constants"), e("./Invoker"), e("../utilities/ObjectUtilities"), e("../models/SaverActionType"), e("../models/SaverOptions"), e("../models/UploadType"), e("../utilities/UrlUtilities"))
        }
        , {
            "../Constants": 1,
            "../models/SaverActionType": 19,
            "../models/SaverOptions": 20,
            "../models/UploadType": 21,
            "../utilities/ObjectUtilities": 28,
            "../utilities/UrlUtilities": 32,
            "./ApiRequest": 4,
            "./Invoker": 5
        }],
        11: [function(e, t, r) {
            !function(e, t) {
                "use strict";
                var r;
                !function(e) {
                    e[e.filesV2 = 0] = "filesV2";
                    e[e.graph_odc = 1] = "graph_odc";
                    e[e.graph_odb = 2] = "graph_odb";
                    e[e.msa = 3] = "msa"
                }(r || (r = {}));
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t["default"] = r
            }(e, r)
        }
        , {}],
        12: [function(e, t, r) {
            !function(e, t) {
                "use strict";
                var r;
                !function(e) {
                    e[e.aad = 0] = "aad";
                    e[e.msa = 1] = "msa";
                    e[e.tenant = 2] = "tenant"
                }(r || (r = {}));
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t["default"] = r
            }(e, r)
        }
        , {}],
        13: [function(e, t, r) {
            !function(e, t) {
                "use strict";
                var r;
                !function(e) {
                    e[e.badResponse = 0] = "badResponse";
                    e[e.fileReaderFailure = 1] = "fileReaderFailure";
                    e[e.popupOpen = 2] = "popupOpen";
                    e[e.unknown = 3] = "unknown";
                    e[e.unsupportedFeature = 4] = "unsupportedFeature";
                    e[e.webRequestFailure = 5] = "webRequestFailure";
                    e[e.internalError = 6] = "internalError";
                    e[e.optionsError = 7] = "optionsError";
                    e[e.typeError = 8] = "typeError";
                    e[e.popupClosed = 9] = "popupClosed"
                }(r || (r = {}));
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t["default"] = r
            }(e, r)
        }
        , {}],
        14: [function(e, t, r) {
            !function(e, t, r, i, n, o, a, s, u, l, d, c) {
                "use strict";
                var p = new RegExp("^[a-fA-F\\d]{8}-([a-fA-F\\d]{4}-){3}[a-fA-F\\d]{12}$")
                  , f = function() {
                    function e(t) {
                        this.navEnabled = !0;
                        this.needSharePointPermission = !0;
                        this.clientId = d.validateType(t.clientId, i["default"].TYPE_STRING);
                        var o = d.validateCallback(t.cancel, !0);
                        this.cancel = function() {
                            s["default"].logMessage("user cancelled operation");
                            o && r.invokeAppCallback(o, !0)
                        }
                        ;
                        var a = d.validateCallback(t.error, !0);
                        this.error = function(e) {
                            if (!a)
                                throw e;
                            r.invokeAppCallback(a, !0, e)
                        }
                        ;
                        this.parseAdvancedOptions(t);
                        this.redirectUri = this.redirectUri || c.trimUrlQuery(window.location.href);
                        this.endpointHint = this.endpointHint || n["default"].aad;
                        e.checkClientId(this.clientId)
                    }
                    e.checkClientId = function(e) {
                        e ? p.test(e) ? s["default"].logMessage("parsed client id: " + e) : o.throwError(new u["default"](a["default"].unknown,l.format("invalid format for client id '{0}' - AAD: 32 characters (HEX) GUID", e))) : o.throwError(new u["default"](a["default"].unknown,"client id is missing in options"))
                    }
                    ;
                    e.prototype.needOauth = function() {
                        return this.needAPICall() && !this.accessToken || this.endpointHint === n["default"].aad
                    }
                    ;
                    e.prototype.parseAdvancedOptions = function(e) {
                        if (e.advanced) {
                            if (e.advanced.redirectUri) {
                                c.validateRedirectUrlHost(e.advanced.redirectUri);
                                this.redirectUri = e.advanced.redirectUri
                            }
                            if (e.advanced.queryParameters) {
                                var t = c.readUrlParameters("?" + e.advanced.queryParameters);
                                for (var r in t)
                                    "select" !== r.toLowerCase() && "expand" !== r.toLowerCase() && o.throwError(new u["default"](a["default"].optionsError,l.format("unexpected query key: {0} is found in advanced.queryParameters", r)));
                                var s = t.select
                                  , p = t.expand;
                                s && p ? this.queryParameters = l.format("expand={0}&select={1}", p, s) : p ? this.queryParameters = l.format("expand={0}", p) : s && "select=" + s.split(",").sort().join(",") !== i["default"].DEFAULT_QUERY_ITEM_PARAMETER && (this.queryParameters = l.format("select={0}", s))
                            }
                            if (e.advanced.endpointHint) {
                                if (e.advanced.endpointHint.toLowerCase() === i["default"].VROOM_ENDPOINT_HINT) {
                                    this.endpointHint = n["default"].msa;
                                    "undefined" == typeof e.advanced.isConsumerAccount && (this.isConsumerAccount = !0)
                                } else {
                                    var f = d.validateType(e.advanced.endpointHint, "string", !1);
                                    c.validateUrlProtocol(f);
                                    this.endpointHint = n["default"].tenant;
                                    "undefined" == typeof e.advanced.isConsumerAccount && (this.isConsumerAccount = !1);
                                    this.siteUrl = f
                                }
                                e.advanced.accessToken && (this.accessToken = e.advanced.accessToken)
                            }
                            if (e.advanced.iframeParentDiv) {
                                e.advanced.iframeParentDiv.nodeName && "div" === e.advanced.iframeParentDiv.nodeName.toLowerCase() || o.throwError(new u["default"](a["default"].optionsError,"the iframe's parent div element is not a DOM object")).exposeToPublic();
                                this.parentDiv = e.advanced.iframeParentDiv
                            }
                            e.advanced.scopes && ("string" == typeof e.advanced.scopes ? this.scopes = [e.advanced.scopes] : e.advanced.scopes instanceof Array && (this.scopes = e.advanced.scopes));
                            this.linkType = e.advanced.linkType;
                            this.parseNavigationOptions(e.advanced.navigation);
                            this.loginHint = e.advanced.loginHint;
                            this.trapFocus = e.advanced.trapFocus;
                            "boolean" == typeof e.advanced.isConsumerAccount && (this.isConsumerAccount = e.advanced.isConsumerAccount);
                            this.filter = e.advanced.filter
                        }
                    }
                    ;
                    e.prototype.parseNavigationOptions = function(e) {
                        if (e) {
                            var t = e.entryLocation;
                            if (t) {
                                if (t.sharePoint) {
                                    var r = t.sharePoint
                                      , i = r.sitePath
                                      , n = r.listPath;
                                    i && c.validateUrlProtocol(i, ["HTTPS"]);
                                    n && c.validateUrlProtocol(n, ["HTTPS"])
                                }
                                this.navEntryLocation = t
                            }
                            var o = e.sourceTypes instanceof Array ? e.sourceTypes : e.sourceTypes ? [e.sourceTypes] : null;
                            if (o) {
                                this.needSharePointPermission = !(1 === o.length && "onedrive" === o[0].toLowerCase());
                                this.navSourceTypes = o
                            }
                            this.navEnabled = !e.disable
                        }
                    }
                    ;
                    return e
                }();
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t["default"] = f
            }(e, r, e("../utilities/CallbackInvoker"), e("../Constants"), e("./DomainHint"), e("../utilities/ErrorHandler"), e("./ErrorType"), e("../utilities/Logging"), e("./OneDriveSdkError"), e("../utilities/StringUtilities"), e("../utilities/TypeValidators"), e("../utilities/UrlUtilities"))
        }
        , {
            "../Constants": 1,
            "../utilities/CallbackInvoker": 23,
            "../utilities/ErrorHandler": 26,
            "../utilities/Logging": 27,
            "../utilities/StringUtilities": 30,
            "../utilities/TypeValidators": 31,
            "../utilities/UrlUtilities": 32,
            "./DomainHint": 12,
            "./ErrorType": 13,
            "./OneDriveSdkError": 16
        }],
        15: [function(e, t, r) {
            !function(e, t) {
                "use strict";
                var r;
                !function(e) {
                    e[e.AAD = 0] = "AAD";
                    e[e.AADv2 = 1] = "AADv2";
                    e[e.MSA = 2] = "MSA"
                }(r || (r = {}));
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t["default"] = r
            }(e, r)
        }
        , {}],
        16: [function(e, t, r) {
            !function(e, t, r, i) {
                "use strict";
                var n = function(e) {
                    function t(t, i) {
                        e.call(this, i);
                        this.errorCode = r["default"][t];
                        this.message = i
                    }
                    __extends(t, e);
                    t.prototype.toString = function() {
                        return i.format("[OneDriveSDK Error] errorType: {0}, message: {1}", this.errorCode, this.message)
                    }
                    ;
                    return t
                }(Error);
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t["default"] = n
            }(e, r, e("../models/ErrorType"), e("../utilities/StringUtilities"))
        }
        , {
            "../models/ErrorType": 13,
            "../utilities/StringUtilities": 30
        }],
        17: [function(e, t, r) {
            !function(e, t) {
                "use strict";
                var r;
                !function(e) {
                    e[e.download = 0] = "download";
                    e[e.query = 1] = "query";
                    e[e.share = 2] = "share"
                }(r || (r = {}));
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t["default"] = r
            }(e, r)
        }
        , {}],
        18: [function(e, t, r) {
            !function(e, t, r, i, n, o, a, s) {
                "use strict";
                var u = function(e) {
                    function t(t) {
                        e.call(this, t);
                        var n = s.validateCallback(t.success, !1);
                        this.success = function(e) {
                            o["default"].logMessage("picker operation succeeded");
                            r.invokeAppCallback(n, !0, e)
                        }
                        ;
                        this.multiSelect = s.validateType(t.multiSelect, i["default"].TYPE_BOOLEAN, !0, !1);
                        var u = s.validateType(t.action, i["default"].TYPE_STRING, !0, a["default"][a["default"].query]);
                        this.action = a["default"][u];
                        t.advanced && (this.createLinkParameters = t.advanced.createLinkParameters);
                        this.scopes || (this.scopes = [this.action === a["default"].share ? "Files.ReadWrite" : "Files.Read"])
                    }
                    __extends(t, e);
                    t.prototype.needAPICall = function() {
                        return !!this.queryParameters || this.action !== a["default"].query
                    }
                    ;
                    return t
                }(n["default"]);
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t["default"] = u
            }(e, r, e("../utilities/CallbackInvoker"), e("../Constants"), e("./InvokerOptions"), e("../utilities/Logging"), e("./PickerActionType"), e("../utilities/TypeValidators"))
        }
        , {
            "../Constants": 1,
            "../utilities/CallbackInvoker": 23,
            "../utilities/Logging": 27,
            "../utilities/TypeValidators": 31,
            "./InvokerOptions": 14,
            "./PickerActionType": 17
        }],
        19: [function(e, t, r) {
            !function(e, t) {
                "use strict";
                var r;
                !function(e) {
                    e[e.save = 0] = "save";
                    e[e.query = 1] = "query"
                }(r || (r = {}));
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t["default"] = r
            }(e, r)
        }
        , {}],
        20: [function(e, t, r) {
            !function(e, t, r, i, n, o, a, s, u, l, d, c, p, f, h) {
                "use strict";
                var v = function(e) {
                    function t(t) {
                        e.call(this, t);
                        var n = p.validateCallback(t.success, !1);
                        this.success = function(e) {
                            u["default"].logMessage("saver operation succeeded");
                            r.invokeAppCallback(n, !0, e)
                        }
                        ;
                        var o = p.validateCallback(t.progress, !0);
                        this.progress = function(e) {
                            u["default"].logMessage(c.format("upload progress: {0}%", e));
                            o && r.invokeAppCallback(o, !1, e)
                        }
                        ;
                        var a = p.validateType(t.action, i["default"].TYPE_STRING, !0, d["default"][d["default"].query]);
                        this.action = d["default"][a];
                        this.action === d["default"].save && this._setFileInfo(t);
                        this.nameConflictBehavior = p.validateType(t.nameConflictBehavior, i["default"].TYPE_STRING, !0, "rename");
                        this.scopes || (this.scopes = ["Files.ReadWrite"])
                    }
                    __extends(t, e);
                    t.prototype.needAPICall = function() {
                        return !!this.queryParameters || this.action === d["default"].save
                    }
                    ;
                    t.prototype._setFileInfo = function(e) {
                        e.sourceInputElementId && e.sourceUri && o.throwError(new l["default"](a["default"].optionsError,"sourceUri and sourceInputElementId are provided, only one is required."));
                        this.sourceInputElementId = e.sourceInputElementId;
                        this.sourceUri = e.sourceUri;
                        var t = p.validateType(e.fileName, i["default"].TYPE_STRING, !0, null);
                        if (this.sourceUri) {
                            if (h.isPathFullUrl(this.sourceUri)) {
                                this.uploadType = f["default"].url;
                                this.fileName = t || h.getFileNameFromUrl(this.sourceUri);
                                this.fileName || o.throwError(new l["default"](a["default"].optionsError,"must supply a file name or a URL that ends with a file name"))
                            } else if (h.isPathDataUrl(this.sourceUri)) {
                                this.uploadType = f["default"].dataUrl;
                                this.fileName = t;
                                this.fileName || o.throwError(new l["default"](a["default"].optionsError,"must supply a file name for data URL uploads"))
                            }
                        } else if (this.sourceInputElementId) {
                            this.uploadType = f["default"].form;
                            this.fileInput = n.getFileInput(this.sourceInputElementId);
                            this.fileName = t || this.fileInput.name
                        } else
                            o.throwError(new l["default"](a["default"].optionsError,"please specified one type of resource to save"))
                    }
                    ;
                    return t
                }(s["default"]);
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t["default"] = v
            }(e, r, e("../utilities/CallbackInvoker"), e("../Constants"), e("../utilities/DomUtilities"), e("../utilities/ErrorHandler"), e("./ErrorType"), e("./InvokerOptions"), e("../utilities/Logging"), e("./OneDriveSdkError"), e("./SaverActionType"), e("../utilities/StringUtilities"), e("../utilities/TypeValidators"), e("./UploadType"), e("../utilities/UrlUtilities"))
        }
        , {
            "../Constants": 1,
            "../utilities/CallbackInvoker": 23,
            "../utilities/DomUtilities": 25,
            "../utilities/ErrorHandler": 26,
            "../utilities/Logging": 27,
            "../utilities/StringUtilities": 30,
            "../utilities/TypeValidators": 31,
            "../utilities/UrlUtilities": 32,
            "./ErrorType": 13,
            "./InvokerOptions": 14,
            "./OneDriveSdkError": 16,
            "./SaverActionType": 19,
            "./UploadType": 21
        }],
        21: [function(e, t, r) {
            !function(e, t) {
                "use strict";
                var r;
                !function(e) {
                    e[e.dataUrl = 0] = "dataUrl";
                    e[e.form = 1] = "form";
                    e[e.url = 2] = "url"
                }(r || (r = {}));
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t["default"] = r
            }(e, r)
        }
        , {}],
        22: [function(e, t, r) {
            !function(e, t, r, i, n) {
                "use strict";
                function o(e) {
                    var t = u();
                    return t[e]
                }
                function a(e, t) {
                    var r = u();
                    r[e] = t;
                    l(r)
                }
                function s(e) {
                    var t = u()
                      , r = t[e];
                    delete t[e];
                    l(t);
                    return r
                }
                function u() {
                    if (Storage) {
                        var e = localStorage.getItem(d)
                          , t = JSON.parse(e || "{}");
                        return t
                    }
                    i.throwError(new n["default"](r["default"].unsupportedFeature,"cache based on Storage is not supported in this browser"))
                }
                function l(e) {
                    Storage ? localStorage.setItem(d, JSON.stringify(e)) : i.throwError(new n["default"](r["default"].unsupportedFeature,"cache based on Storage is not supported in this browser"))
                }
                var d = "odpickerv7cache";
                t.getCacheItem = o;
                t.setCacheItem = a;
                t.removeCacheItem = s
            }(e, r, e("../models/ErrorType"), e("./ErrorHandler"), e("../models/OneDriveSdkError"))
        }
        , {
            "../models/ErrorType": 13,
            "../models/OneDriveSdkError": 16,
            "./ErrorHandler": 26
        }],
        23: [function(e, t, r) {
            !function(e, t, r) {
                "use strict";
                function i(e, t) {
                    for (var i = [], n = 2; n < arguments.length; n++)
                        i[n - 2] = arguments[n];
                    typeof e === r["default"].TYPE_FUNCTION && e.apply(null, i)
                }
                function n(e) {
                    for (var t = [], r = 1; r < arguments.length; r++)
                        t[r - 1] = arguments[r];
                    window.setTimeout(function() {
                        e.apply(null, t)
                    }, 0)
                }
                t.invokeAppCallback = i;
                t.invokeCallbackAsynchronous = n
            }(e, r, e("../Constants"))
        }
        , {
            "../Constants": 1
        }],
        24: [function(e, t, r) {
            !function(e, t) {
                "use strict";
                var r = function() {
                    function e(e) {
                        this.receiver = e
                    }
                    e.prototype.send = function(e, t) {
                        this.receiver && this.receiver.postMessage(e, t)
                    }
                    ;
                    e.prototype.getReceiver = function() {
                        return this.receiver
                    }
                    ;
                    return e
                }();
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t["default"] = r
            }(e, r)
        }
        , {}],
        25: [function(e, t, r) {
            !function(e, t, r, i, n, o) {
                "use strict";
                function a(e) {
                    return document.getElementById(e)
                }
                function s(e) {
                    "interactive" === document.readyState || "complete" === document.readyState ? e() : document.addEventListener("DOMContentLoaded", e, !1)
                }
                function u(e) {
                    var t = o.generateNonce() + "_" + (new Date).getMilliseconds();
                    window.addEventListener("message", e);
                    h[t] = e;
                    return t
                }
                function l(e) {
                    var t = h[e];
                    t && window.removeEventListener("message", t)
                }
                function d(e) {
                    var t = a(e);
                    if (t instanceof HTMLInputElement) {
                        "file" !== t.type && r.throwError(new n["default"](i["default"].optionsError,"input elemenet must be of type 'file'"));
                        if (!t.value) {
                            r.throwError(new n["default"](i["default"].optionsError,"please a file to upload"));
                            return null
                        }
                        var o = t.files;
                        o && window.FileReader || r.throwError(new n["default"](i["default"].unsupportedFeature,"browser does not support Files API"));
                        1 !== o.length && r.throwError(new n["default"](i["default"].unsupportedFeature,"can not upload more than one file at a time"));
                        var s = o[0];
                        s || r.throwError(new n["default"](i["default"].optionsError,"missing file input"));
                        if (s.size > p) {
                            r.throwError(new n["default"](i["default"].optionsError,"the user has selected a file larger than " + f));
                            return null
                        }
                        return s
                    }
                    r.throwError(new n["default"](i["default"].unknown,"element was not an instance of an HTMLInputElement"))
                }
                function c() {
                    var e = document.createElement("div")
                      , t = ["position: fixed", "width: 100%", "height: 100%", "top: 0px", "left: 0px", "background-color: white", "opacity: 1", "z-index: 10000", "min-width: 40px", "min-height: 40px"];
                    e.id = "od-overlay";
                    e.style.cssText = t.join(";");
                    var r = document.createElement("img")
                      , i = ["position: absolute", "margin: auto", "top: 0", "left: 0", "right: 0", "bottom: 0"];
                    r.id = "od-spinner";
                    r.src = "https://p.sfx.ms/common/spinner_grey_40_transparent.gif";
                    r.style.cssText = i.join(";");
                    e.appendChild(r);
                    var n = document.createElement("style");
                    n.type = "text/css";
                    n.innerHTML = "body { visibility: hidden !important; }";
                    document.head.appendChild(n);
                    s(function() {
                        var t = document.body;
                        null !== t ? t.insertBefore(e, t.firstChild) : document.createElement("body").appendChild(e);
                        document.head.removeChild(n)
                    })
                }
                var p = 104857600
                  , f = "100 MB"
                  , h = {};
                t.getElementById = a;
                t.onDocumentReady = s;
                t.onMessage = u;
                t.removeMessageListener = l;
                t.getFileInput = d;
                t.displayOverlay = c
            }(e, r, e("./ErrorHandler"), e("../models/ErrorType"), e("../models/OneDriveSdkError"), e("./UrlUtilities"))
        }
        , {
            "../models/ErrorType": 13,
            "../models/OneDriveSdkError": 16,
            "./ErrorHandler": 26,
            "./UrlUtilities": 32
        }],
        26: [function(e, t, r) {
            !function(e, t, r) {
                "use strict";
                function i(e) {
                    o.push(e)
                }
                function n(e) {
                    if (e.errorCode !== r["default"][r["default"].unknown]) {
                        for (var t = 0, i = o; t < i.length; t++) {
                            var n = i[t];
                            n(e)
                        }
                        return {
                            exposeToPublic: function() {
                                throw e
                            }
                        }
                    }
                    throw e
                }
                var o = [];
                t.registerErrorObserver = i;
                t.throwError = n
            }(e, r, e("../models/ErrorType"))
        }
        , {
            "../models/ErrorType": 13
        }],
        27: [function(e, t, r) {
            !function(e, t) {
                "use strict";
                var r = "onedrive_enable_logging"
                  , i = "[OneDriveSDK] "
                  , n = function() {
                    function e() {}
                    e.logError = function(t) {
                        for (var r = [], i = 1; i < arguments.length; i++)
                            r[i - 1] = arguments[i];
                        e._log(t, !0, r)
                    }
                    ;
                    e.logMessage = function(t) {
                        e._log(t, !1)
                    }
                    ;
                    e._log = function(t, n) {
                        for (var o = [], a = 2; a < arguments.length; a++)
                            o[a - 2] = arguments[a];
                        (n || e.loggingEnabled || window[r]) && console.log(i + t, o)
                    }
                    ;
                    e.loggingEnabled = !1;
                    return e
                }();
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t["default"] = n
            }(e, r)
        }
        , {}],
        28: [function(e, t, r) {
            !function(e, t, r, i) {
                "use strict";
                function n(e) {
                    if (typeof e !== r["default"].TYPE_OBJECT || !e)
                        return null;
                    var t = {};
                    for (var i in e)
                        e.hasOwnProperty(i) && (t[i] = e[i]);
                    return t
                }
                function o(e) {
                    var t = null;
                    try {
                        t = JSON.parse(e)
                    } catch (n) {
                        i["default"].logError("deserialization error" + n)
                    }
                    typeof t === r["default"].TYPE_OBJECT && null !== t || (t = {});
                    return t
                }
                function a(e) {
                    return JSON.stringify(e)
                }
                t.shallowClone = n;
                t.deserializeJSON = o;
                t.serializeJSON = a
            }(e, r, e("../Constants"), e("./Logging"))
        }
        , {
            "../Constants": 1,
            "./Logging": 27
        }],
        29: [function(e, t, r) {
            !function(e, t, r, i, n, o, a) {
                "use strict";
                var s = 1024
                  , u = 650;
                t.POPUP_PINGER_INTERVAL = 500;
                var l = function() {
                    function e() {}
                    e.getCurrentPopup = function() {
                        return e._currentPopup || new e
                    }
                    ;
                    e.setCurrentPopup = function(t) {
                        e._currentPopup = t
                    }
                    ;
                    e.createPopupFeatures = function() {
                        var e = window.screenX + Math.max(window.outerWidth - s, 0) / 2
                          , t = window.screenY + Math.max(window.outerHeight - u, 0) / 2
                          , r = ["width=" + s, "height=" + u, "top=" + t, "left=" + e, "status=no", "resizable=yes", "toolbar=no", "menubar=no", "scrollbars=yes"];
                        return r.join(",")
                    }
                    ;
                    e.prototype.close = function() {
                        if (e.getCurrentPopup().isPopupOpen()) {
                            e.getCurrentPopup()._popup.close();
                            e.setCurrentPopup(null)
                        }
                    }
                    ;
                    e.prototype.openPopup = function(s) {
                        var u = this;
                        a.validateUrlProtocol(s);
                        if (e.getCurrentPopup().isPopupOpen()) {
                            n["default"].logMessage("leaving current url: " + this._url);
                            this._url = s;
                            var location = e.getCurrentPopup().getPopupWindow().location;
                            if (typeof location == string) {
                                e.getCurrentPopup().getPopupWindow().location = s;
                            } else {
                                e.getCurrentPopup().getPopupWindow().location.href = s;
                            }
                        } else {
                            this._url = s;
                            this._popup = window.open(s, "_blank", e.createPopupFeatures());
                            this._popup ? this._popup.focus() : r.throwError(new o["default"](i["default"].popupOpen,"popup window is disconnected")).exposeToPublic();
                            e.setCurrentPopup(this)
                        }
                        return new Promise(function(e, r) {
                            var i = setInterval(function() {
                                if (!u.isPopupOpen()) {
                                    window.clearInterval(i);
                                    e()
                                }
                            }, t.POPUP_PINGER_INTERVAL)
                        }
                        )
                    }
                    ;
                    e.prototype.getPopupWindow = function() {
                        return this._popup
                    }
                    ;
                    e.prototype.getCurrentUrl = function() {
                        return this._url
                    }
                    ;
                    e.prototype.isPopupOpen = function() {
                        return !!this._popup && !this._popup.closed
                    }
                    ;
                    return e
                }();
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t["default"] = l
            }(e, r, e("./ErrorHandler"), e("../models/ErrorType"), e("./Logging"), e("../models/OneDriveSdkError"), e("../utilities/UrlUtilities"))
        }
        , {
            "../models/ErrorType": 13,
            "../models/OneDriveSdkError": 16,
            "../utilities/UrlUtilities": 32,
            "./ErrorHandler": 26,
            "./Logging": 27
        }],
        30: [function(e, t, r) {
            !function(e, t) {
                "use strict";
                function r(e) {
                    for (var t = [], r = 1; r < arguments.length; r++)
                        t[r - 1] = arguments[r];
                    var o = function(e) {
                        var r = t[e.replace(i, "")];
                        null === r && (r = "");
                        return r
                    };
                    return e.replace(n, o)
                }
                var i = /[\{\}]/g
                  , n = /\{\d+\}/g;
                t.format = r
            }(e, r)
        }
        , {}],
        31: [function(e, t, r) {
            !function(e, t, r, i, n, o, a, s, u) {
                "use strict";
                function l(e, t, r, l, d) {
                    void 0 === r && (r = !1);
                    if (void 0 === e) {
                        if (r) {
                            if (void 0 !== l) {
                                o["default"].logMessage("applying default value: " + l);
                                return l
                            }
                        } else
                            i.throwError(new s["default"](n["default"].typeError,"object was missing and not optional"));
                        return null
                    }
                    var p = typeof e;
                    if (p !== t) {
                        i.throwError(new s["default"](n["default"].typeError,u.format("expected object type: '{0}', actual object type: '{1}'", t, p)));
                        return null
                    }
                    if (!c(e, d)) {
                        i.throwError(new s["default"](n["default"].typeError,u.format("object does not match any valid values {0}", a.serializeJSON(d))));
                        return null
                    }
                    return e
                }
                function d(e, t) {
                    void 0 === t && (t = !1);
                    if (void 0 === e) {
                        t || i.throwError(new s["default"](n["default"].typeError,"function was missing and not optional"));
                        return null
                    }
                    var o = typeof e;
                    o !== r["default"].TYPE_FUNCTION && i.throwError(new s["default"](n["default"].typeError,u.format("expected function type: function | string, actual type: {0}", o)));
                    return e
                }
                function c(e, t) {
                    if (!Array.isArray(t))
                        return !0;
                    for (var r in t)
                        if (e === t[r])
                            return !0;
                    return !1
                }
                t.validateType = l;
                t.validateCallback = d
            }(e, r, e("../Constants"), e("./ErrorHandler"), e("../models/ErrorType"), e("./Logging"), e("./ObjectUtilities"), e("../models/OneDriveSdkError"), e("./StringUtilities"))
        }
        , {
            "../Constants": 1,
            "../models/ErrorType": 13,
            "../models/OneDriveSdkError": 16,
            "./ErrorHandler": 26,
            "./Logging": 27,
            "./ObjectUtilities": 28,
            "./StringUtilities": 30
        }],
        32: [function(e, t, r) {
            !function(e, t, r, i, n, o, a) {
                "use strict";
                function s(e, t) {
                    return e + ("/" !== e.charAt(e.length - 1) ? "/" : "") + t
                }
                function u(e, t, r) {
                    return l(e, (i = {},
                    i[t] = r,
                    i));
                    var i
                }
                function l(e, t, r) {
                    if (!t || 0 === Object.keys(t).length)
                        return e;
                    r ? e += "#" : e.indexOf("?") === -1 ? e += "?" : "&" !== e.charAt(e.length - 1) && (e += "&");
                    var i = "";
                    for (var n in t)
                        i += (i.length ? "&" : "") + a.format("{0}={1}", encodeURIComponent(n), encodeURIComponent(t[n]));
                    return e + i
                }
                function d() {
                    return c(window.location.href)
                }
                function c(e) {
                    var t = {}
                      , r = e.indexOf("?") + 1
                      , i = e.indexOf("#") + 1;
                    if (r > 0) {
                        var n = i > r ? i - 1 : e.length;
                        w(e.substring(r, n), t)
                    }
                    i > 0 && w(e.substring(i), t);
                    return t
                }
                function p(e) {
                    E(e);
                    window.location.replace(e)
                }
                function f(e) {
                    var t = ["?", "#"];
                    for (var r in t) {
                        var i = e.indexOf(t[r]);
                        i > 0 && (e = e.substring(0, i))
                    }
                    return e
                }
                function h(e) {
                    var t = f(e);
                    return t.substr(t.lastIndexOf("/") + 1)
                }
                function v(e) {
                    return s(e.replace(/^((\w+:)?\/\/[^\/]+\/?).*$/, "$1"), "")
                }
                function m(e) {
                    return 0 === e.indexOf("https://") || 0 === e.indexOf("http://")
                }
                function g(e) {
                    return 0 === e.indexOf("data:")
                }
                function y() {
                    for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", t = "", i = 0; i < r["default"].NONCE_LENGTH; i++)
                        t += e.charAt(Math.floor(Math.random() * e.length));
                    return t
                }
                function E(e, t) {
                    t = t ? t : [T, b];
                    for (var r = 0, s = t; r < s.length; r++) {
                        var u = s[r];
                        if (0 === e.toUpperCase().indexOf(u))
                            return
                    }
                    i.throwError(new o["default"](n["default"].optionsError,a.format("uri {0} does not match protocol(s): " + t, e))).exposeToPublic()
                }
                function _(e) {
                    E(e);
                    if (e.indexOf("://") > -1) {
                        var t = e.split("/")[2];
                        t !== window.location.host && i.throwError(new o["default"](n["default"].optionsError,"redirect uri is not in the same domain as picker sdk")).exposeToPublic()
                    } else
                        i.throwError(new o["default"](n["default"].optionsError,"redirect uri is not an absolute url")).exposeToPublic()
                }
                function w(e, t) {
                    for (var r = e.split("&"), i = 0; i < r.length; i++) {
                        var n = r[i].split("=");
                        2 === n.length && (t[decodeURIComponent(n[0])] = decodeURIComponent(n[1]))
                    }
                }
                var T = "HTTP"
                  , b = "HTTPS";
                t.appendToPath = s;
                t.appendQueryString = u;
                t.appendQueryStrings = l;
                t.readCurrentUrlParameters = d;
                t.readUrlParameters = c;
                t.redirect = p;
                t.trimUrlQuery = f;
                t.getFileNameFromUrl = h;
                t.getOrigin = v;
                t.isPathFullUrl = m;
                t.isPathDataUrl = g;
                t.generateNonce = y;
                t.validateUrlProtocol = E;
                t.validateRedirectUrlHost = _
            }(e, r, e("../Constants"), e("./ErrorHandler"), e("../models/ErrorType"), e("../models/OneDriveSdkError"), e("./StringUtilities"))
        }
        , {
            "../Constants": 1,
            "../models/ErrorType": 13,
            "../models/OneDriveSdkError": 16,
            "./ErrorHandler": 26,
            "./StringUtilities": 30
        }],
        33: [function(e, t, r) {
            !function(e, t, r, i, n, o, a, s, u) {
                "use strict";
                var l = 3e4
                  , d = -1
                  , c = -2
                  , p = -3
                  , f = new RegExp("^([a-fA-F0-9]){16}$")
                  , h = function() {
                    function e(e) {
                        this._url = e.url;
                        this._json = e.json;
                        this._headers = e.headers || {};
                        this._method = e.method;
                        this._clientId = e.clientId;
                        this._apiEndpoint = e.apiEndpoint || r["default"].msa;
                        n.registerErrorObserver(this._abortRequest)
                    }
                    e.statusCodeToString = function(e) {
                        switch (e) {
                        case -1:
                            return "EXCEPTION";
                        case -2:
                            return "TIMEOUT";
                        case -3:
                            return "REQUEST ABORTED";
                        default:
                            return e.toString()
                        }
                    }
                    ;
                    e.prototype.start = function(t, r) {
                        var i = this;
                        try {
                            this._successCallback = t;
                            this._failureCallback = r;
                            this._request = new XMLHttpRequest;
                            this._request.ontimeout = this._onTimeout;
                            this._request.onload = function() {
                                var e = i._request.status;
                                e < 400 && e > 0 ? i._callSuccessCallback(e) : i._callFailureCallback(e)
                            }
                            ;
                            this._method || (this._method = this._json ? e.HTTP_POST : e.HTTP_GET);
                            this._request.open(this._method, this._url, !0);
                            this._request.timeout = l;
                            this._setHeaders();
                            a["default"].logMessage("starting request to: " + this._url);
                            this._request.send(this._json)
                        } catch (n) {
                            this._callFailureCallback(d, n)
                        }
                    }
                    ;
                    e.prototype.upload = function(t, r, i, n) {
                        var o = this;
                        try {
                            this._successCallback = r;
                            this._progressCallback = n;
                            this._failureCallback = i;
                            this._request = new XMLHttpRequest;
                            this._request.ontimeout = this._onTimeout;
                            this._method = e.HTTP_PUT;
                            this._request.open(this._method, this._url, !0);
                            this._setHeaders();
                            this._request.onload = function(e) {
                                o._completed = !0;
                                var t = o._request.status;
                                200 === t || 201 === t || 202 === t ? o._callSuccessCallback(t) : o._callFailureCallback(t, e)
                            }
                            ;
                            this._request.onerror = function(e) {
                                o._completed = !0;
                                o._callFailureCallback(o._request.status, e)
                            }
                            ;
                            this._request.upload.onprogress = function(e) {
                                if (e.lengthComputable) {
                                    var t = {
                                        bytesTransferred: e.loaded,
                                        totalBytes: e.total,
                                        progressPercentage: 0 === e.total ? 0 : e.loaded / e.total * 100
                                    };
                                    o._callProgressCallback(t)
                                }
                            }
                            ;
                            a["default"].logMessage("starting upload to: " + this._url);
                            this._request.send(t)
                        } catch (s) {
                            this._callFailureCallback(d, s)
                        }
                    }
                    ;
                    e.prototype._callSuccessCallback = function(t) {
                        a["default"].logMessage("calling xhr success callback, status: " + e.statusCodeToString(t));
                        this._successCallback(this._request, t, this._url)
                    }
                    ;
                    e.prototype._callFailureCallback = function(t, r) {
                        a["default"].logError("calling xhr failure callback, status: " + e.statusCodeToString(t), this._request, r);
                        this._failureCallback(this._request, t, t === c)
                    }
                    ;
                    e.prototype._callProgressCallback = function(e) {
                        a["default"].logMessage("calling xhr upload progress callback");
                        this._progressCallback(this._request, e)
                    }
                    ;
                    e.prototype._abortRequest = function() {
                        if (this && !this._completed) {
                            this._completed = !0;
                            if (this._request)
                                try {
                                    this._request.abort()
                                } catch (e) {}
                            this._callFailureCallback(p)
                        }
                    }
                    ;
                    e.prototype._onTimeout = function() {
                        if (!this._completed) {
                            this._completed = !0;
                            this._callFailureCallback(c)
                        }
                    }
                    ;
                    e.prototype._setHeaders = function() {
                        for (var t in this._headers)
                            this._request.setRequestHeader(t, this._headers[t]);
                        if (this._clientId) {
                            var a = this._clientId;
                            f.test(this._clientId) && (a = "0x" + this._clientId);
                            this._request.setRequestHeader("Application", "0x" + a)
                        }
                        var l = u.format("{0}={1}", "SDK-Version", i["default"].SDK_VERSION);
                        switch (this._apiEndpoint) {
                        case r["default"].graph_odb:
                        case r["default"].filesV2:
                            this._request.setRequestHeader("X-ClientService-ClientTag", l);
                            break;
                        case r["default"].graph_odc:
                        case r["default"].msa:
                            this._request.setRequestHeader("X-RequestStats", l);
                            break;
                        default:
                            n.throwError(new s["default"](o["default"].internalError,"invalid API endpoint: " + this._apiEndpoint))
                        }
                        this._method === e.HTTP_POST && this._request.setRequestHeader("Content-Type", this._json ? "application/json" : "text/plain")
                    }
                    ;
                    e.HTTP_GET = "GET";
                    e.HTTP_POST = "POST";
                    e.HTTP_PUT = "PUT";
                    return e
                }();
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t["default"] = h
            }(e, r, e("../models/ApiEndpoint"), e("../Constants"), e("./ErrorHandler"), e("../models/ErrorType"), e("./Logging"), e("../models/OneDriveSdkError"), e("./StringUtilities"))
        }
        , {
            "../Constants": 1,
            "../models/ApiEndpoint": 11,
            "../models/ErrorType": 13,
            "../models/OneDriveSdkError": 16,
            "./ErrorHandler": 26,
            "./Logging": 27,
            "./StringUtilities": 30
        }],
        34: [function(t, r, i) {
            /*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   3.3.1
 */
            !function(t, n) {
                "object" == typeof i && "undefined" != typeof r ? r.exports = n() : "function" == typeof e && e.amd ? e(n) : t.ES6Promise = n()
            }(this, function() {
                "use strict";
                function e(e) {
                    return "function" == typeof e || "object" == typeof e && null !== e
                }
                function r(e) {
                    return "function" == typeof e
                }
                function i(e) {
                    X = e
                }
                function n(e) {
                    G = e
                }
                function o() {
                    return function() {
                        return process.nextTick(d)
                    }
                }
                function a() {
                    return function() {
                        z(d)
                    }
                }
                function s() {
                    var e = 0
                      , t = new K(d)
                      , r = document.createTextNode("");
                    t.observe(r, {
                        characterData: !0
                    });
                    return function() {
                        r.data = e = ++e % 2
                    }
                }
                function u() {
                    var e = new MessageChannel;
                    e.port1.onmessage = d;
                    return function() {
                        return e.port2.postMessage(0)
                    }
                }
                function l() {
                    var e = setTimeout;
                    return function() {
                        return e(d, 1)
                    }
                }
                function d() {
                    for (var e = 0; e < Y; e += 2) {
                        var t = ee[e]
                          , r = ee[e + 1];
                        t(r);
                        ee[e] = void 0;
                        ee[e + 1] = void 0
                    }
                    Y = 0
                }
                function c() {
                    try {
                        var e = t
                          , r = e("vertx");
                        z = r.runOnLoop || r.runOnContext;
                        return a()
                    } catch (i) {
                        return l()
                    }
                }
                function p(e, t) {
                    var r = arguments
                      , i = this
                      , n = new this.constructor(h);
                    void 0 === n[re] && H(n);
                    var o = i._state;
                    o ? !function() {
                        var e = r[o - 1];
                        G(function() {
                            return A(o, n, e, i._result)
                        })
                    }() : O(i, n, e, t);
                    return n
                }
                function f(e) {
                    var t = this;
                    if (e && "object" == typeof e && e.constructor === t)
                        return e;
                    var r = new t(h);
                    T(r, e);
                    return r
                }
                function h() {}
                function v() {
                    return new TypeError("You cannot resolve a promise with itself")
                }
                function m() {
                    return new TypeError("A promises callback cannot return that same promise.")
                }
                function g(e) {
                    try {
                        return e.then
                    } catch (t) {
                        ae.error = t;
                        return ae
                    }
                }
                function y(e, t, r, i) {
                    try {
                        e.call(t, r, i)
                    } catch (n) {
                        return n
                    }
                }
                function E(e, t, r) {
                    G(function(e) {
                        var i = !1
                          , n = y(r, t, function(r) {
                            if (!i) {
                                i = !0;
                                t !== r ? T(e, r) : P(e, r)
                            }
                        }, function(t) {
                            if (!i) {
                                i = !0;
                                k(e, t)
                            }
                        }, "Settle: " + (e._label || " unknown promise"));
                        if (!i && n) {
                            i = !0;
                            k(e, n)
                        }
                    }, e)
                }
                function _(e, t) {
                    t._state === ne ? P(e, t._result) : t._state === oe ? k(e, t._result) : O(t, void 0, function(t) {
                        return T(e, t)
                    }, function(t) {
                        return k(e, t)
                    })
                }
                function w(e, t, i) {
                    t.constructor === e.constructor && i === p && t.constructor.resolve === f ? _(e, t) : i === ae ? k(e, ae.error) : void 0 === i ? P(e, t) : r(i) ? E(e, t, i) : P(e, t)
                }
                function T(t, r) {
                    t === r ? k(t, v()) : e(r) ? w(t, r, g(r)) : P(t, r)
                }
                function b(e) {
                    e._onerror && e._onerror(e._result);
                    U(e)
                }
                function P(e, t) {
                    if (e._state === ie) {
                        e._result = t;
                        e._state = ne;
                        0 !== e._subscribers.length && G(U, e)
                    }
                }
                function k(e, t) {
                    if (e._state === ie) {
                        e._state = oe;
                        e._result = t;
                        G(b, e)
                    }
                }
                function O(e, t, r, i) {
                    var n = e._subscribers
                      , o = n.length;
                    e._onerror = null;
                    n[o] = t;
                    n[o + ne] = r;
                    n[o + oe] = i;
                    0 === o && e._state && G(U, e)
                }
                function U(e) {
                    var t = e._subscribers
                      , r = e._state;
                    if (0 !== t.length) {
                        for (var i = void 0, n = void 0, o = e._result, a = 0; a < t.length; a += 3) {
                            i = t[a];
                            n = t[a + r];
                            i ? A(r, i, n, o) : n(o)
                        }
                        e._subscribers.length = 0
                    }
                }
                function C() {
                    this.error = null
                }
                function S(e, t) {
                    try {
                        return e(t)
                    } catch (r) {
                        se.error = r;
                        return se
                    }
                }
                function A(e, t, i, n) {
                    var o = r(i)
                      , a = void 0
                      , s = void 0
                      , u = void 0
                      , l = void 0;
                    if (o) {
                        a = S(i, n);
                        if (a === se) {
                            l = !0;
                            s = a.error;
                            a = null
                        } else
                            u = !0;
                        if (t === a) {
                            k(t, m());
                            return
                        }
                    } else {
                        a = n;
                        u = !0
                    }
                    t._state !== ie || (o && u ? T(t, a) : l ? k(t, s) : e === ne ? P(t, a) : e === oe && k(t, a))
                }
                function I(e, t) {
                    try {
                        t(function(t) {
                            T(e, t)
                        }, function(t) {
                            k(e, t)
                        })
                    } catch (r) {
                        k(e, r)
                    }
                }
                function R() {
                    return ue++
                }
                function H(e) {
                    e[re] = ue++;
                    e._state = void 0;
                    e._result = void 0;
                    e._subscribers = []
                }
                function D(e, t) {
                    this._instanceConstructor = e;
                    this.promise = new e(h);
                    this.promise[re] || H(this.promise);
                    if (B(t)) {
                        this._input = t;
                        this.length = t.length;
                        this._remaining = t.length;
                        this._result = new Array(this.length);
                        if (0 === this.length)
                            P(this.promise, this._result);
                        else {
                            this.length = this.length || 0;
                            this._enumerate();
                            0 === this._remaining && P(this.promise, this._result)
                        }
                    } else
                        k(this.promise, q())
                }
                function q() {
                    return new Error("Array Methods must be provided an Array")
                }
                function M(e) {
                    return new D(this,e).promise
                }
                function N(e) {
                    var t = this;
                    return new t(B(e) ? function(r, i) {
                        for (var n = e.length, o = 0; o < n; o++)
                            t.resolve(e[o]).then(r, i)
                    }
                    : function(e, t) {
                        return t(new TypeError("You must pass an array to race."))
                    }
                    )
                }
                function L(e) {
                    var t = this
                      , r = new t(h);
                    k(r, e);
                    return r
                }
                function x() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                }
                function F() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                }
                function j(e) {
                    this[re] = R();
                    this._result = this._state = void 0;
                    this._subscribers = [];
                    if (h !== e) {
                        "function" != typeof e && x();
                        this instanceof j ? I(this, e) : F()
                    }
                }
                function V() {
                    var e = void 0;
                    if ("undefined" != typeof global)
                        e = global;
                    else if ("undefined" != typeof self)
                        e = self;
                    else
                        try {
                            e = Function("return this")()
                        } catch (t) {
                            throw new Error("polyfill failed because global object is unavailable in this environment")
                        }
                    var r = e.Promise;
                    if (r) {
                        var i = null;
                        try {
                            i = Object.prototype.toString.call(r.resolve())
                        } catch (t) {}
                        if ("[object Promise]" === i && !r.cast)
                            return
                    }
                    e.Promise = j
                }
                var J = void 0;
                J = Array.isArray ? Array.isArray : function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                }
                ;
                var B = J
                  , Y = 0
                  , z = void 0
                  , X = void 0
                  , G = function(e, t) {
                    ee[Y] = e;
                    ee[Y + 1] = t;
                    Y += 2;
                    2 === Y && (X ? X(d) : te())
                }
                  , Q = "undefined" != typeof window ? window : void 0
                  , W = Q || {}
                  , K = W.MutationObserver || W.WebKitMutationObserver
                  , $ = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process)
                  , Z = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel
                  , ee = new Array(1e3)
                  , te = void 0;
                te = $ ? o() : K ? s() : Z ? u() : void 0 === Q && "function" == typeof t ? c() : l();
                var re = Math.random().toString(36).substring(16)
                  , ie = void 0
                  , ne = 1
                  , oe = 2
                  , ae = new C
                  , se = new C
                  , ue = 0;
                D.prototype._enumerate = function() {
                    for (var e = this.length, t = this._input, r = 0; this._state === ie && r < e; r++)
                        this._eachEntry(t[r], r)
                }
                ;
                D.prototype._eachEntry = function(e, t) {
                    var r = this._instanceConstructor
                      , i = r.resolve;
                    if (i === f) {
                        var n = g(e);
                        if (n === p && e._state !== ie)
                            this._settledAt(e._state, t, e._result);
                        else if ("function" != typeof n) {
                            this._remaining--;
                            this._result[t] = e
                        } else if (r === j) {
                            var o = new r(h);
                            w(o, e, n);
                            this._willSettleAt(o, t)
                        } else
                            this._willSettleAt(new r(function(t) {
                                return t(e)
                            }
                            ), t)
                    } else
                        this._willSettleAt(i(e), t)
                }
                ;
                D.prototype._settledAt = function(e, t, r) {
                    var i = this.promise;
                    if (i._state === ie) {
                        this._remaining--;
                        e === oe ? k(i, r) : this._result[t] = r
                    }
                    0 === this._remaining && P(i, this._result)
                }
                ;
                D.prototype._willSettleAt = function(e, t) {
                    var r = this;
                    O(e, void 0, function(e) {
                        return r._settledAt(ne, t, e)
                    }, function(e) {
                        return r._settledAt(oe, t, e)
                    })
                }
                ;
                j.all = M;
                j.race = N;
                j.resolve = f;
                j.reject = L;
                j._setScheduler = i;
                j._setAsap = n;
                j._asap = G;
                j.prototype = {
                    constructor: j,
                    then: p,
                    "catch": function(e) {
                        return this.then(null, e)
                    }
                };
                V();
                j.polyfill = V;
                j.Promise = j;
                return j
            })
        }
        , {}]
    }, {}, [2])(2)
});
