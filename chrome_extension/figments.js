// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../node_modules/vex-js/dist/css/vex.css":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/vex-js/dist/css/vex-theme-plain.css":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"assets/figments.css":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/jsx-render/lib/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSVG = isSVG;
exports.objectToStyleString = objectToStyleString;
exports.createFragmentFrom = createFragmentFrom;

function isSVG(element) {
  var patt = new RegExp('^' + element + '$', 'i');
  var SVGTags = ['path', 'svg', 'use', 'g'];
  return SVGTags.some(function (tag) {
    return patt.test(tag);
  });
}

function objectToStyleString(styles) {
  return Object.keys(styles).map(function (prop) {
    return "".concat(prop, ": ").concat(styles[prop]);
  }).join(';');
}

function createFragmentFrom(children) {
  // fragments will help later to append multiple children to the initial node
  var fragment = document.createDocumentFragment();

  function processDOMNodes(child) {
    if (child instanceof HTMLElement || child instanceof SVGElement || child instanceof Comment || child instanceof DocumentFragment) {
      fragment.appendChild(child);
    } else if (typeof child === 'string' || typeof child === 'number') {
      var textnode = document.createTextNode(child);
      fragment.appendChild(textnode);
    } else if (child instanceof Array) {
      child.forEach(processDOMNodes);
    } else if (child === false || child === null) {// expression evaluated as false e.g. {false && <Elem />}
      // expression evaluated as false e.g. {null && <Elem />}
    } else {
      // later other things could not be HTMLElement nor strings
      if ("development") {
        console.log(child, 'is not appendable');
      }
    }
  }

  children.forEach(processDOMNodes);
  return fragment;
}
},{}],"../node_modules/jsx-render/lib/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.portalCreator = exports.Fragment = exports.default = void 0;

var _utils = require("./utils");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function dom(tag, attrs) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  // Custom Components will be functions
  if (typeof tag === 'function') {
    tag.defaultProps = tag.defaultProps || {};
    var result = tag(Object.assign({}, tag.defaultProps, attrs, {
      children: children
    }));

    switch (result) {
      case 'FRAGMENT':
        return (0, _utils.createFragmentFrom)(children);
      // Portals are useful to render modals
      // allow render on a different element than the parent of the chain
      // and leave a comment instead

      case 'PORTAL':
        tag.target.appendChild((0, _utils.createFragmentFrom)(children));
        return document.createComment("Portal Used");

      default:
        return result;
    }
  } // regular html components will be strings to create the elements
  // this is handled by the babel plugins


  if (typeof tag === 'string') {
    var element = (0, _utils.isSVG)(tag) ? document.createElementNS('http://www.w3.org/2000/svg', tag) : document.createElement(tag); // one or multiple will be evaluated to append as string or HTMLElement

    var fragment = (0, _utils.createFragmentFrom)(children);
    element.appendChild(fragment);

    for (var prop in attrs) {
      if (prop === 'style') {
        element.style.cssText = (0, _utils.objectToStyleString)(attrs[prop]);
      } else if (prop === 'ref' && typeof attrs.ref === 'function') {
        attrs.ref(element, attrs);
      } else if (prop === 'className') {
        element.setAttribute('class', attrs[prop]);
      } else if (prop === 'xlinkHref') {
        element.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', attrs[prop]);
      } else if (prop === 'dangerouslySetInnerHTML') {
        element.innerHTML = attrs[prop].__html;
      } else if (attrs.hasOwnProperty(prop)) {
        element.setAttribute(prop, attrs[prop]);
      }
    }

    return element;
  }

  console.error("jsx-render does not handle ".concat(_typeof(tag)));
}

var _default = dom;
exports.default = _default;

var Fragment = function Fragment() {
  return 'FRAGMENT';
};

exports.Fragment = Fragment;

var portalCreator = function portalCreator(node) {
  function Portal() {
    return 'PORTAL';
  }

  Portal.target = document.body;

  if (node && node.nodeType === Node.ELEMENT_NODE) {
    Portal.target = node;
  }

  return Portal;
};

exports.portalCreator = portalCreator;
},{"./utils":"../node_modules/jsx-render/lib/utils.js"}],"core/utilities.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var doubleClickEvent = exports.doubleClickEvent = new MouseEvent("dblclick", {
  view: window,
  button: 0,
  bubbles: true,
  cancelable: true
});
},{}],"core/layer.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = require('./utilities');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Layer = function () {
  function Layer(domNode) {
    _classCallCheck(this, Layer);

    this.domNode = domNode;
  }

  _createClass(Layer, [{
    key: 'name',
    get: function get() {
      return this.domNode.innerText;
    },
    set: function set(newName) {
      var domNode = this.domNode;


      var span = domNode.querySelector('span[class*="object_row--rowText"');
      span.dispatchEvent(_utilities.doubleClickEvent);

      var input = domNode.querySelector('input[class*="object_row--input"');
      input.value = newName;
      input.focus();
      input.blur();
    }
  }]);

  return Layer;
}();

exports.default = Layer;
},{"./utilities":"core/utilities.js"}],"../node_modules/vex-js/dist/js/vex.js":[function(require,module,exports) {
var define;
var global = arguments[3];
(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }g.vex = f();
  }
})(function () {
  var define, module, exports;return function () {
    function e(t, n, r) {
      function s(o, u) {
        if (!n[o]) {
          if (!t[o]) {
            var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
          }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
            var n = t[o][1][e];return s(n ? n : e);
          }, l, l.exports, e, t, n, r);
        }return n[o].exports;
      }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) s(r[o]);return s;
    }return e;
  }()({ 1: [function (require, module, exports) {
      /*
       * classList.js: Cross-browser full element.classList implementation.
       * 1.1.20170427
       *
       * By Eli Grey, http://eligrey.com
       * License: Dedicated to the public domain.
       *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
       */

      /*global self, document, DOMException */

      /*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

      if ("document" in window.self) {

        // Full polyfill for browsers with no classList support
        // Including IE < Edge missing SVGElement.classList
        if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {

          (function (view) {

            "use strict";

            if (!('Element' in view)) return;

            var classListProp = "classList",
                protoProp = "prototype",
                elemCtrProto = view.Element[protoProp],
                objCtr = Object,
                strTrim = String[protoProp].trim || function () {
              return this.replace(/^\s+|\s+$/g, "");
            },
                arrIndexOf = Array[protoProp].indexOf || function (item) {
              var i = 0,
                  len = this.length;
              for (; i < len; i++) {
                if (i in this && this[i] === item) {
                  return i;
                }
              }
              return -1;
            }
            // Vendors: please allow content code to instantiate DOMExceptions
            ,
                DOMEx = function (type, message) {
              this.name = type;
              this.code = DOMException[type];
              this.message = message;
            },
                checkTokenAndGetIndex = function (classList, token) {
              if (token === "") {
                throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
              }
              if (/\s/.test(token)) {
                throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
              }
              return arrIndexOf.call(classList, token);
            },
                ClassList = function (elem) {
              var trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
                  classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
                  i = 0,
                  len = classes.length;
              for (; i < len; i++) {
                this.push(classes[i]);
              }
              this._updateClassName = function () {
                elem.setAttribute("class", this.toString());
              };
            },
                classListProto = ClassList[protoProp] = [],
                classListGetter = function () {
              return new ClassList(this);
            };
            // Most DOMException implementations don't allow calling DOMException's toString()
            // on non-DOMExceptions. Error's toString() is sufficient here.
            DOMEx[protoProp] = Error[protoProp];
            classListProto.item = function (i) {
              return this[i] || null;
            };
            classListProto.contains = function (token) {
              token += "";
              return checkTokenAndGetIndex(this, token) !== -1;
            };
            classListProto.add = function () {
              var tokens = arguments,
                  i = 0,
                  l = tokens.length,
                  token,
                  updated = false;
              do {
                token = tokens[i] + "";
                if (checkTokenAndGetIndex(this, token) === -1) {
                  this.push(token);
                  updated = true;
                }
              } while (++i < l);

              if (updated) {
                this._updateClassName();
              }
            };
            classListProto.remove = function () {
              var tokens = arguments,
                  i = 0,
                  l = tokens.length,
                  token,
                  updated = false,
                  index;
              do {
                token = tokens[i] + "";
                index = checkTokenAndGetIndex(this, token);
                while (index !== -1) {
                  this.splice(index, 1);
                  updated = true;
                  index = checkTokenAndGetIndex(this, token);
                }
              } while (++i < l);

              if (updated) {
                this._updateClassName();
              }
            };
            classListProto.toggle = function (token, force) {
              token += "";

              var result = this.contains(token),
                  method = result ? force !== true && "remove" : force !== false && "add";

              if (method) {
                this[method](token);
              }

              if (force === true || force === false) {
                return force;
              } else {
                return !result;
              }
            };
            classListProto.toString = function () {
              return this.join(" ");
            };

            if (objCtr.defineProperty) {
              var classListPropDesc = {
                get: classListGetter,
                enumerable: true,
                configurable: true
              };
              try {
                objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
              } catch (ex) {
                // IE 8 doesn't support enumerable:true
                // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
                // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
                if (ex.number === undefined || ex.number === -0x7FF5EC54) {
                  classListPropDesc.enumerable = false;
                  objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                }
              }
            } else if (objCtr[protoProp].__defineGetter__) {
              elemCtrProto.__defineGetter__(classListProp, classListGetter);
            }
          })(window.self);
        }

        // There is full or partial native classList support, so just check if we need
        // to normalize the add/remove and toggle APIs.

        (function () {
          "use strict";

          var testElement = document.createElement("_");

          testElement.classList.add("c1", "c2");

          // Polyfill for IE 10/11 and Firefox <26, where classList.add and
          // classList.remove exist but support only one argument at a time.
          if (!testElement.classList.contains("c2")) {
            var createMethod = function (method) {
              var original = DOMTokenList.prototype[method];

              DOMTokenList.prototype[method] = function (token) {
                var i,
                    len = arguments.length;

                for (i = 0; i < len; i++) {
                  token = arguments[i];
                  original.call(this, token);
                }
              };
            };
            createMethod('add');
            createMethod('remove');
          }

          testElement.classList.toggle("c3", false);

          // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
          // support the second argument.
          if (testElement.classList.contains("c3")) {
            var _toggle = DOMTokenList.prototype.toggle;

            DOMTokenList.prototype.toggle = function (token, force) {
              if (1 in arguments && !this.contains(token) === !force) {
                return force;
              } else {
                return _toggle.call(this, token);
              }
            };
          }

          testElement = null;
        })();
      }
    }, {}], 2: [function (require, module, exports) {

      /**
       * Expose `parse`.
       */

      module.exports = parse;

      /**
       * Tests for browser support.
       */

      var innerHTMLBug = false;
      var bugTestDiv;
      if (typeof document !== 'undefined') {
        bugTestDiv = document.createElement('div');
        // Setup
        bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
        // Make sure that link elements get serialized correctly by innerHTML
        // This requires a wrapper element in IE
        innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
        bugTestDiv = undefined;
      }

      /**
       * Wrap map from jquery.
       */

      var map = {
        legend: [1, '<fieldset>', '</fieldset>'],
        tr: [2, '<table><tbody>', '</tbody></table>'],
        col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
        // for script/link/style tags to work in IE6-8, you have to wrap
        // in a div with a non-whitespace character in front, ha!
        _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
      };

      map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

      map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

      map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

      map.polyline = map.ellipse = map.polygon = map.circle = map.text = map.line = map.path = map.rect = map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">', '</svg>'];

      /**
       * Parse `html` and return a DOM Node instance, which could be a TextNode,
       * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
       * instance, depending on the contents of the `html` string.
       *
       * @param {String} html - HTML string to "domify"
       * @param {Document} doc - The `document` instance to create the Node for
       * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
       * @api private
       */

      function parse(html, doc) {
        if ('string' != typeof html) throw new TypeError('String expected');

        // default to the global `document` object
        if (!doc) doc = document;

        // tag name
        var m = /<([\w:]+)/.exec(html);
        if (!m) return doc.createTextNode(html);

        html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

        var tag = m[1];

        // body support
        if (tag == 'body') {
          var el = doc.createElement('html');
          el.innerHTML = html;
          return el.removeChild(el.lastChild);
        }

        // wrap map
        var wrap = map[tag] || map._default;
        var depth = wrap[0];
        var prefix = wrap[1];
        var suffix = wrap[2];
        var el = doc.createElement('div');
        el.innerHTML = prefix + html + suffix;
        while (depth--) el = el.lastChild;

        // one element
        if (el.firstChild == el.lastChild) {
          return el.removeChild(el.firstChild);
        }

        // several elements
        var fragment = doc.createDocumentFragment();
        while (el.firstChild) {
          fragment.appendChild(el.removeChild(el.firstChild));
        }

        return fragment;
      }
    }, {}], 3: [function (require, module, exports) {
      /**
       * Code refactored from Mozilla Developer Network:
       * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
       */

      'use strict';

      function assign(target, firstSource) {
        if (target === undefined || target === null) {
          throw new TypeError('Cannot convert first argument to object');
        }

        var to = Object(target);
        for (var i = 1; i < arguments.length; i++) {
          var nextSource = arguments[i];
          if (nextSource === undefined || nextSource === null) {
            continue;
          }

          var keysArray = Object.keys(Object(nextSource));
          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
        return to;
      }

      function polyfill() {
        if (!Object.assign) {
          Object.defineProperty(Object, 'assign', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: assign
          });
        }
      }

      module.exports = {
        assign: assign,
        polyfill: polyfill
      };
    }, {}], 4: [function (require, module, exports) {
      // classList polyfill for old browsers
      require('classlist-polyfill');
      // Object.assign polyfill
      require('es6-object-assign').polyfill();

      // String to DOM function
      var domify = require('domify');

      // Use the DOM's HTML parsing to escape any dangerous strings
      var escapeHtml = function escapeHtml(str) {
        if (typeof str !== 'undefined') {
          var div = document.createElement('div');
          div.appendChild(document.createTextNode(str));
          return div.innerHTML;
        } else {
          return '';
        }
      };

      // Utility function to add space-delimited class strings to a DOM element's classList
      var addClasses = function addClasses(el, classStr) {
        if (typeof classStr !== 'string' || classStr.length === 0) {
          return;
        }
        var classes = classStr.split(' ');
        for (var i = 0; i < classes.length; i++) {
          var className = classes[i];
          if (className.length) {
            el.classList.add(className);
          }
        }
      };

      // Detect CSS Animation End Support
      // https://github.com/limonte/sweetalert2/blob/99bd539f85e15ac170f69d35001d12e092ef0054/src/utils/dom.js#L194
      var animationEndEvent = function detectAnimationEndEvent() {
        var el = document.createElement('div');
        var eventNames = {
          'animation': 'animationend',
          'WebkitAnimation': 'webkitAnimationEnd',
          'MozAnimation': 'animationend',
          'OAnimation': 'oanimationend',
          'msAnimation': 'MSAnimationEnd'
        };
        for (var i in eventNames) {
          if (el.style[i] !== undefined) {
            return eventNames[i];
          }
        }
        return false;
      }();

      // vex base CSS classes
      var baseClassNames = {
        vex: 'vex',
        content: 'vex-content',
        overlay: 'vex-overlay',
        close: 'vex-close',
        closing: 'vex-closing',
        open: 'vex-open'

        // Private lookup table of all open vex objects, keyed by id
      };var vexes = {};
      var globalId = 1;

      // Private boolean to assist the escapeButtonCloses option
      var isEscapeActive = false;

      // vex itself is an object that exposes a simple API to open and close vex objects in various ways
      var vex = {
        open: function open(opts) {
          // Check for usage of deprecated options, and log a warning
          var warnDeprecated = function warnDeprecated(prop) {
            console.warn('The "' + prop + '" property is deprecated in vex 3. Use CSS classes and the appropriate "ClassName" options, instead.');
            console.warn('See http://github.hubspot.com/vex/api/advanced/#options');
          };
          if (opts.css) {
            warnDeprecated('css');
          }
          if (opts.overlayCSS) {
            warnDeprecated('overlayCSS');
          }
          if (opts.contentCSS) {
            warnDeprecated('contentCSS');
          }
          if (opts.closeCSS) {
            warnDeprecated('closeCSS');
          }

          // The dialog instance
          var vexInstance = {};

          // Set id
          vexInstance.id = globalId++;

          // Store internally
          vexes[vexInstance.id] = vexInstance;

          // Set state
          vexInstance.isOpen = true;

          // Close function on the vex instance
          // This is how all API functions should close individual vexes
          vexInstance.close = function instanceClose() {
            // Check state
            if (!this.isOpen) {
              return true;
            }

            var options = this.options;

            // escapeButtonCloses is checked first
            if (isEscapeActive && !options.escapeButtonCloses) {
              return false;
            }

            // Allow the user to validate any info or abort the close with the beforeClose callback
            var shouldClose = function shouldClose() {
              // Call before close callback
              if (options.beforeClose) {
                return options.beforeClose.call(this);
              }
              // Otherwise indicate that it's ok to continue with close
              return true;
            }.bind(this)();

            // If beforeClose() fails, abort the close
            if (shouldClose === false) {
              return false;
            }

            // Update state
            this.isOpen = false;

            // Detect if the content el has any CSS animations defined
            var style = window.getComputedStyle(this.contentEl);
            function hasAnimationPre(prefix) {
              return style.getPropertyValue(prefix + 'animation-name') !== 'none' && style.getPropertyValue(prefix + 'animation-duration') !== '0s';
            }
            var hasAnimation = hasAnimationPre('') || hasAnimationPre('-webkit-') || hasAnimationPre('-moz-') || hasAnimationPre('-o-');

            // Define the function that will actually close the instance
            var close = function close() {
              if (!this.rootEl.parentNode) {
                return;
              }
              // Run once
              this.rootEl.removeEventListener(animationEndEvent, close);
              this.overlayEl.removeEventListener(animationEndEvent, close);
              // Remove from lookup table (prevent memory leaks)
              delete vexes[this.id];
              // Remove the dialog from the DOM
              this.rootEl.parentNode.removeChild(this.rootEl);
              // Remove the overlay from the DOM
              this.bodyEl.removeChild(this.overlayEl);
              // Call after close callback
              if (options.afterClose) {
                options.afterClose.call(this);
              }
              // Remove styling from the body, if no more vexes are open
              if (Object.keys(vexes).length === 0) {
                document.body.classList.remove(baseClassNames.open);
              }
            }.bind(this);

            // Close the vex
            if (animationEndEvent && hasAnimation) {
              // Setup the end event listener, to remove the el from the DOM
              this.rootEl.addEventListener(animationEndEvent, close);
              this.overlayEl.addEventListener(animationEndEvent, close);
              // Add the closing class to the dialog, showing the close animation
              this.rootEl.classList.add(baseClassNames.closing);
              this.overlayEl.classList.add(baseClassNames.closing);
            } else {
              close();
            }

            return true;
          };

          // Allow strings as content
          if (typeof opts === 'string') {
            opts = {
              content: opts
            };
          }

          // `content` is unsafe internally, so translate
          // safe default: HTML-escape the content before passing it through
          if (opts.unsafeContent && !opts.content) {
            opts.content = opts.unsafeContent;
          } else if (opts.content) {
            opts.content = escapeHtml(opts.content);
          }

          // Store options on instance for future reference
          var options = vexInstance.options = Object.assign({}, vex.defaultOptions, opts);

          // Get Body Element
          var bodyEl = vexInstance.bodyEl = document.getElementsByTagName('body')[0];

          // vex root
          var rootEl = vexInstance.rootEl = document.createElement('div');
          rootEl.classList.add(baseClassNames.vex);
          addClasses(rootEl, options.className);

          // Overlay
          var overlayEl = vexInstance.overlayEl = document.createElement('div');
          overlayEl.classList.add(baseClassNames.overlay);
          addClasses(overlayEl, options.overlayClassName);
          if (options.overlayClosesOnClick) {
            rootEl.addEventListener('click', function overlayClickListener(e) {
              if (e.target === rootEl) {
                vexInstance.close();
              }
            });
          }
          bodyEl.appendChild(overlayEl);

          // Content
          var contentEl = vexInstance.contentEl = document.createElement('div');
          contentEl.classList.add(baseClassNames.content);
          addClasses(contentEl, options.contentClassName);
          contentEl.appendChild(options.content instanceof window.Node ? options.content : domify(options.content));
          rootEl.appendChild(contentEl);

          // Close button
          if (options.showCloseButton) {
            var closeEl = vexInstance.closeEl = document.createElement('div');
            closeEl.classList.add(baseClassNames.close);
            addClasses(closeEl, options.closeClassName);
            closeEl.addEventListener('click', vexInstance.close.bind(vexInstance));
            contentEl.appendChild(closeEl);
          }

          // Add to DOM
          document.querySelector(options.appendLocation).appendChild(rootEl);

          // Call after open callback
          if (options.afterOpen) {
            options.afterOpen.call(vexInstance);
          }

          // Apply styling to the body
          document.body.classList.add(baseClassNames.open);

          // Return the created vex instance
          return vexInstance;
        },

        // A top-level vex.close function to close dialogs by reference or id
        close: function close(vexOrId) {
          var id;
          if (vexOrId.id) {
            id = vexOrId.id;
          } else if (typeof vexOrId === 'string') {
            id = vexOrId;
          } else {
            throw new TypeError('close requires a vex object or id string');
          }
          if (!vexes[id]) {
            return false;
          }
          return vexes[id].close();
        },

        // Close the most recently created/opened vex
        closeTop: function closeTop() {
          var ids = Object.keys(vexes);
          if (!ids.length) {
            return false;
          }
          return vexes[ids[ids.length - 1]].close();
        },

        // Close every vex!
        closeAll: function closeAll() {
          for (var id in vexes) {
            this.close(id);
          }
          return true;
        },

        // A getter for the internal lookup table
        getAll: function getAll() {
          return vexes;
        },

        // A getter for the internal lookup table
        getById: function getById(id) {
          return vexes[id];
        }

        // Close top vex on escape
      };window.addEventListener('keyup', function vexKeyupListener(e) {
        if (e.keyCode === 27) {
          isEscapeActive = true;
          vex.closeTop();
          isEscapeActive = false;
        }
      });

      // Close all vexes on history pop state (useful in single page apps)
      window.addEventListener('popstate', function () {
        if (vex.defaultOptions.closeAllOnPopState) {
          vex.closeAll();
        }
      });

      vex.defaultOptions = {
        content: '',
        showCloseButton: true,
        escapeButtonCloses: true,
        overlayClosesOnClick: true,
        appendLocation: 'body',
        className: '',
        overlayClassName: '',
        contentClassName: '',
        closeClassName: '',
        closeAllOnPopState: true

        // TODO Loading symbols?

        // Include escapeHtml function on the library object
      };Object.defineProperty(vex, '_escapeHtml', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: escapeHtml
      });

      // Plugin system!
      vex.registerPlugin = function registerPlugin(pluginFn, name) {
        var plugin = pluginFn(vex);
        var pluginName = name || plugin.name;
        if (vex[pluginName]) {
          throw new Error('Plugin ' + name + ' is already registered.');
        }
        vex[pluginName] = plugin;
      };

      module.exports = vex;
    }, { "classlist-polyfill": 1, "domify": 2, "es6-object-assign": 3 }] }, {}, [4])(4);
});
},{}],"../node_modules/js-simple-toast/dist/simpleToast.js":[function(require,module,exports) {
var define;
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.simpleToast=e():t.simpleToast=e()}(window,function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="./dist/",n(n.s=0)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={create:function(){var t=document,e=t.createDocumentFragment(),n=t.createElement("div"),o=this.zIndex||1e3;n.innerHTML='\n            <div class="toast-container"\n                style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: '+o+'; background-color: rgba(0,0,0,0.5); display: none">\n                <div class="toast-content-container"\n                    style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); -webkit-transform: translate(-50%, -50%);"\n                >\n                    <div id="toastContent" class="toast-content" style="padding: 4px 10px; -webkit-transition: -webkit-transform 500ms ease-out, opacity 500ms ease-out; transition: transform 500ms ease-out, opacity 500ms ease-out; background-color: #000; border-radius: 4px; color: #fff;"\n                    ></div>\n                </div>\n            </div>\n        ',this.toast=n.children[0],e.appendChild(this.toast),t.body.appendChild(e)},setZIndex:function(t){this.zIndex=t,this.toast&&(this.toast.style.zIndex=t)},show:function(t,e){var n=this;this.toast||this.create();var o=this.toast,i=o.ownerDocument,s=i.getElementById("toastContent");s.innerHTML="",s.appendChild(i.createTextNode(t)),this.playShowAnim(s),o.style.display="block",setTimeout(function(){return n.hide()},e||2e3)},playShowAnim:function(t){t.style.transform="translateY(-40px)",t.style.webkitTransform="translateY(-40px)",t.style.opacity=0,setTimeout(function(){t.style.transform="translateY(0px)",t.style.webkitTransform="translateY(0px)",t.style.opacity=1})},hide:function(){var t=this,e=this.toast.ownerDocument.getElementById("toastContent");this.playHideAnim(e);var n=function(){console.log("in after anim"),t.toast.style.display="none"};e.style.transition?this.addOnceEvent(e,"transitionend",n):e.style.webkitTransition?this.addOnceEvent(e,"webkitTransitionEnd",n):n()},addOnceEvent:function(t,e,n){var o=this,i=arguments;t.addEventListener(e,function s(){t.removeEventListener(e,s),n.apply(o,i)})},playHideAnim:function(t){t.style.transform="translateY(10px)",t.style.webkitTransform="translateY(10px)",t.style.opacity=0}};e.default=o}])});
},{}],"../node_modules/vex-dialog/dist/vex.dialog.js":[function(require,module,exports) {
var define;
var global = arguments[3];
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.vexDialog = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

function deepcopy(value) {
  if (!(!!value && typeof value == 'object')) {
    return value;
  }
  if (Object.prototype.toString.call(value) == '[object Date]') {
    return new Date(value.getTime());
  }
  if (Array.isArray(value)) {
    return value.map(deepcopy);
  }
  var result = {};
  Object.keys(value).forEach(
    function(key) { result[key] = deepcopy(value[key]); });
  return result;
}

module.exports = deepcopy;

},{}],2:[function(require,module,exports){

/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Tests for browser support.
 */

var innerHTMLBug = false;
var bugTestDiv;
if (typeof document !== 'undefined') {
  bugTestDiv = document.createElement('div');
  // Setup
  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
  // Make sure that link elements get serialized correctly by innerHTML
  // This requires a wrapper element in IE
  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
  bugTestDiv = undefined;
}

/**
 * Wrap map from jquery.
 */

var map = {
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  // for script/link/style tags to work in IE6-8, you have to wrap
  // in a div with a non-whitespace character in front, ha!
  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
};

map.td =
map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

map.option =
map.optgroup = [1, '<select multiple="multiple">', '</select>'];

map.thead =
map.tbody =
map.colgroup =
map.caption =
map.tfoot = [1, '<table>', '</table>'];

map.polyline =
map.ellipse =
map.polygon =
map.circle =
map.text =
map.line =
map.path =
map.rect =
map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

/**
 * Parse `html` and return a DOM Node instance, which could be a TextNode,
 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
 * instance, depending on the contents of the `html` string.
 *
 * @param {String} html - HTML string to "domify"
 * @param {Document} doc - The `document` instance to create the Node for
 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
 * @api private
 */

function parse(html, doc) {
  if ('string' != typeof html) throw new TypeError('String expected');

  // default to the global `document` object
  if (!doc) doc = document;

  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) return doc.createTextNode(html);

  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = doc.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = map[tag] || map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = doc.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) el = el.lastChild;

  // one element
  if (el.firstChild == el.lastChild) {
    return el.removeChild(el.firstChild);
  }

  // several elements
  var fragment = doc.createDocumentFragment();
  while (el.firstChild) {
    fragment.appendChild(el.removeChild(el.firstChild));
  }

  return fragment;
}

},{}],3:[function(require,module,exports){
// get successful control from form and assemble into object
// http://www.w3.org/TR/html401/interact/forms.html#h-17.13.2

// types which indicate a submit action and are not successful controls
// these will be ignored
var k_r_submitter = /^(?:submit|button|image|reset|file)$/i;

// node names which could be successful controls
var k_r_success_contrls = /^(?:input|select|textarea|keygen)/i;

// Matches bracket notation.
var brackets = /(\[[^\[\]]*\])/g;

// serializes form fields
// @param form MUST be an HTMLForm element
// @param options is an optional argument to configure the serialization. Default output
// with no options specified is a url encoded string
//    - hash: [true | false] Configure the output type. If true, the output will
//    be a js object.
//    - serializer: [function] Optional serializer function to override the default one.
//    The function takes 3 arguments (result, key, value) and should return new result
//    hash and url encoded str serializers are provided with this module
//    - disabled: [true | false]. If true serialize disabled fields.
//    - empty: [true | false]. If true serialize empty fields
function serialize(form, options) {
    if (typeof options != 'object') {
        options = { hash: !!options };
    }
    else if (options.hash === undefined) {
        options.hash = true;
    }

    var result = (options.hash) ? {} : '';
    var serializer = options.serializer || ((options.hash) ? hash_serializer : str_serialize);

    var elements = form && form.elements ? form.elements : [];

    //Object store each radio and set if it's empty or not
    var radio_store = Object.create(null);

    for (var i=0 ; i<elements.length ; ++i) {
        var element = elements[i];

        // ingore disabled fields
        if ((!options.disabled && element.disabled) || !element.name) {
            continue;
        }
        // ignore anyhting that is not considered a success field
        if (!k_r_success_contrls.test(element.nodeName) ||
            k_r_submitter.test(element.type)) {
            continue;
        }

        var key = element.name;
        var val = element.value;

        // we can't just use element.value for checkboxes cause some browsers lie to us
        // they say "on" for value when the box isn't checked
        if ((element.type === 'checkbox' || element.type === 'radio') && !element.checked) {
            val = undefined;
        }

        // If we want empty elements
        if (options.empty) {
            // for checkbox
            if (element.type === 'checkbox' && !element.checked) {
                val = '';
            }

            // for radio
            if (element.type === 'radio') {
                if (!radio_store[element.name] && !element.checked) {
                    radio_store[element.name] = false;
                }
                else if (element.checked) {
                    radio_store[element.name] = true;
                }
            }

            // if options empty is true, continue only if its radio
            if (!val && element.type == 'radio') {
                continue;
            }
        }
        else {
            // value-less fields are ignored unless options.empty is true
            if (!val) {
                continue;
            }
        }

        // multi select boxes
        if (element.type === 'select-multiple') {
            val = [];

            var selectOptions = element.options;
            var isSelectedOptions = false;
            for (var j=0 ; j<selectOptions.length ; ++j) {
                var option = selectOptions[j];
                var allowedEmpty = options.empty && !option.value;
                var hasValue = (option.value || allowedEmpty);
                if (option.selected && hasValue) {
                    isSelectedOptions = true;

                    // If using a hash serializer be sure to add the
                    // correct notation for an array in the multi-select
                    // context. Here the name attribute on the select element
                    // might be missing the trailing bracket pair. Both names
                    // "foo" and "foo[]" should be arrays.
                    if (options.hash && key.slice(key.length - 2) !== '[]') {
                        result = serializer(result, key + '[]', option.value);
                    }
                    else {
                        result = serializer(result, key, option.value);
                    }
                }
            }

            // Serialize if no selected options and options.empty is true
            if (!isSelectedOptions && options.empty) {
                result = serializer(result, key, '');
            }

            continue;
        }

        result = serializer(result, key, val);
    }

    // Check for all empty radio buttons and serialize them with key=""
    if (options.empty) {
        for (var key in radio_store) {
            if (!radio_store[key]) {
                result = serializer(result, key, '');
            }
        }
    }

    return result;
}

function parse_keys(string) {
    var keys = [];
    var prefix = /^([^\[\]]*)/;
    var children = new RegExp(brackets);
    var match = prefix.exec(string);

    if (match[1]) {
        keys.push(match[1]);
    }

    while ((match = children.exec(string)) !== null) {
        keys.push(match[1]);
    }

    return keys;
}

function hash_assign(result, keys, value) {
    if (keys.length === 0) {
        result = value;
        return result;
    }

    var key = keys.shift();
    var between = key.match(/^\[(.+?)\]$/);

    if (key === '[]') {
        result = result || [];

        if (Array.isArray(result)) {
            result.push(hash_assign(null, keys, value));
        }
        else {
            // This might be the result of bad name attributes like "[][foo]",
            // in this case the original `result` object will already be
            // assigned to an object literal. Rather than coerce the object to
            // an array, or cause an exception the attribute "_values" is
            // assigned as an array.
            result._values = result._values || [];
            result._values.push(hash_assign(null, keys, value));
        }

        return result;
    }

    // Key is an attribute name and can be assigned directly.
    if (!between) {
        result[key] = hash_assign(result[key], keys, value);
    }
    else {
        var string = between[1];
        // +var converts the variable into a number
        // better than parseInt because it doesn't truncate away trailing
        // letters and actually fails if whole thing is not a number
        var index = +string;

        // If the characters between the brackets is not a number it is an
        // attribute name and can be assigned directly.
        if (isNaN(index)) {
            result = result || {};
            result[string] = hash_assign(result[string], keys, value);
        }
        else {
            result = result || [];
            result[index] = hash_assign(result[index], keys, value);
        }
    }

    return result;
}

// Object/hash encoding serializer.
function hash_serializer(result, key, value) {
    var matches = key.match(brackets);

    // Has brackets? Use the recursive assignment function to walk the keys,
    // construct any missing objects in the result tree and make the assignment
    // at the end of the chain.
    if (matches) {
        var keys = parse_keys(key);
        hash_assign(result, keys, value);
    }
    else {
        // Non bracket notation can make assignments directly.
        var existing = result[key];

        // If the value has been assigned already (for instance when a radio and
        // a checkbox have the same name attribute) convert the previous value
        // into an array before pushing into it.
        //
        // NOTE: If this requirement were removed all hash creation and
        // assignment could go through `hash_assign`.
        if (existing) {
            if (!Array.isArray(existing)) {
                result[key] = [ existing ];
            }

            result[key].push(value);
        }
        else {
            result[key] = value;
        }
    }

    return result;
}

// urlform encoding serializer
function str_serialize(result, key, value) {
    // encode newlines as \r\n cause the html spec says so
    value = value.replace(/(\r)?\n/g, '\r\n');
    value = encodeURIComponent(value);

    // spaces should be '+' rather than '%20'.
    value = value.replace(/%20/g, '+');
    return result + (result ? '&' : '') + encodeURIComponent(key) + '=' + value;
}

module.exports = serialize;

},{}],4:[function(require,module,exports){
var domify = require('domify')
var serialize = require('form-serialize')
var cloneDeep = require('deep-clone-simple')

// Build DOM elements for the structure of the dialog
var buildDialogForm = function buildDialogForm (options) {
  var form = document.createElement('form')
  form.classList.add('vex-dialog-form')

  var message = document.createElement('div')
  message.classList.add('vex-dialog-message')
  message.appendChild(options.message instanceof window.Node ? options.message : domify(options.message))

  var input = document.createElement('div')
  input.classList.add('vex-dialog-input')
  input.appendChild(options.input instanceof window.Node ? options.input : domify(options.input))

  form.appendChild(message)
  form.appendChild(input)

  return form
}

// Take an array of buttons (see the default buttons below) and turn them into DOM elements
var buttonsToDOM = function buttonsToDOM (buttons) {
  var domButtons = document.createElement('div')
  domButtons.classList.add('vex-dialog-buttons')

  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i]
    var domButton = document.createElement('button')
    domButton.type = button.type
    domButton.textContent = button.text
    domButton.className = button.className
    domButton.classList.add('vex-dialog-button')
    if (i === 0) {
      domButton.classList.add('vex-first')
    } else if (i === buttons.length - 1) {
      domButton.classList.add('vex-last')
    }
    // Attach click listener to button with closure
    (function (button) {
      domButton.addEventListener('click', function (e) {
        if (button.click) {
          button.click.call(this, e)
        }
      }.bind(this))
    }.bind(this)(button))

    domButtons.appendChild(domButton)
  }

  return domButtons
}

var plugin = function plugin (vex) {
  // Define the API first
  var dialog = {
    // Plugin name
    name: 'dialog',

    // Open
    open: function open (opts) {
      var options = Object.assign({}, cloneDeep(this.defaultOptions), opts)

      // `message` is unsafe internally, so translate
      // safe default: HTML-escape the message before passing it through
      if (options.unsafeMessage && !options.message) {
        options.message = options.unsafeMessage
      } else if (options.message) {
        options.message = vex._escapeHtml(options.message)
      }

      // Build the form from the options
      var form = options.unsafeContent = buildDialogForm(options)

      // Open the dialog
      var dialogInstance = vex.open(options)

      if (options.yesText !== '') {
        options.buttons[0].text = options.yesText
      }

      if (options.noText !== '') {
        options.buttons[1].text = options.noText
      }

      // Quick comment - these options and appending buttons and everything
      // would preferably be done _before_ opening the dialog. However, since
      // they rely on the context of the vex instance, we have to do them
      // after. A potential future fix would be to differentiate between
      // a "created" vex instance and an "opened" vex instance, so any actions
      // that rely on the specific context of the instance can do their stuff
      // before opening the dialog on the page.

      // Override the before close callback to also pass the value of the form
      var beforeClose = options.beforeClose && options.beforeClose.bind(dialogInstance)
      dialogInstance.options.beforeClose = function dialogBeforeClose () {
        // Only call the callback once - when the validation in beforeClose, if present, is true
        var shouldClose = beforeClose ? beforeClose() : true
        if (shouldClose) {
          options.callback(this.value || false)
        }
        // Return the result of beforeClose() to vex
        return shouldClose
      }.bind(dialogInstance)

      // Append buttons to form with correct context
      form.appendChild(buttonsToDOM.call(dialogInstance, options.buttons))

      // Attach form to instance
      dialogInstance.form = form

      // Add submit listener to form
      form.addEventListener('submit', options.onSubmit.bind(dialogInstance))

      // Optionally focus the first input in the form
      if (options.focusFirstInput) {
        var el = dialogInstance.contentEl.querySelector('button, input, select, textarea')
        if (el) {
          el.focus()
        }
      }

      // For chaining
      return dialogInstance
    },

    // Alert
    alert: function (options) {
      // Allow string as message
      if (typeof options === 'string') {
        options = {
          message: options
        }
      }
      options = Object.assign({}, cloneDeep(this.defaultOptions), cloneDeep(this.defaultAlertOptions), options)
      return this.open(options)
    },

    // Confirm
    confirm: function (options) {
      if (typeof options !== 'object' || typeof options.callback !== 'function') {
        throw new Error('dialog.confirm(options) requires options.callback.')
      }
      options = Object.assign({}, cloneDeep(this.defaultOptions), cloneDeep(this.defaultConfirmOptions), options)
      return this.open(options)
    },

    // Prompt
    prompt: function (options) {
      if (typeof options !== 'object' || typeof options.callback !== 'function') {
        throw new Error('dialog.prompt(options) requires options.callback.')
      }
      var defaults = Object.assign({}, cloneDeep(this.defaultOptions), cloneDeep(this.defaultPromptOptions))
      var dynamicDefaults = {
        unsafeMessage: '<label for="vex">' + vex._escapeHtml(options.label || defaults.label) + '</label>',
        input: '<input name="vex" type="text" class="vex-dialog-prompt-input" placeholder="' + vex._escapeHtml(options.placeholder || defaults.placeholder) + '" value="' + vex._escapeHtml(options.value || defaults.value) + '" />'
      }
      options = Object.assign(defaults, dynamicDefaults, options)
      // Pluck the value of the "vex" input field as the return value for prompt's callback
      // More closely mimics "window.prompt" in that a single string is returned
      var callback = options.callback
      options.callback = function promptCallback (value) {
        if (typeof value === 'object') {
          var keys = Object.keys(value)
          value = keys.length ? value[keys[0]] : ''
        }
        callback(value)
      }
      return this.open(options)
    }
  }

  // Now define any additional data that's not the direct dialog API
  dialog.buttons = {
    YES: {
      text: 'OK',
      type: 'submit',
      className: 'vex-dialog-button-primary',
      click: function yesClick () {
        this.value = true
      }
    },

    NO: {
      text: 'Cancel',
      type: 'button',
      className: 'vex-dialog-button-secondary',
      click: function noClick () {
        this.value = false
        this.close()
      }
    }
  }

  dialog.defaultOptions = {
    callback: function () {},
    afterOpen: function () {},
    message: '',
    input: '',
    yesText: '',
    noText: '',
    buttons: [
      dialog.buttons.YES,
      dialog.buttons.NO
    ],
    showCloseButton: false,
    onSubmit: function onDialogSubmit (e) {
      e.preventDefault()
      if (this.options.input) {
        this.value = serialize(this.form, { hash: true })
      }
      return this.close()
    },
    focusFirstInput: true
  }

  dialog.defaultAlertOptions = {
    buttons: [
      dialog.buttons.YES
    ]
  }

  dialog.defaultPromptOptions = {
    label: 'Prompt:',
    placeholder: '',
    value: ''
  }

  dialog.defaultConfirmOptions = {}

  return dialog
}

module.exports = plugin

},{"deep-clone-simple":1,"domify":2,"form-serialize":3}]},{},[4])(4)
});
},{}],"factory.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsxRender = require("jsx-render");

var _jsxRender2 = _interopRequireDefault(_jsxRender);

var _layer = require("./core/layer");

var _layer2 = _interopRequireDefault(_layer);

var _vexJs = require("vex-js");

var _vexJs2 = _interopRequireDefault(_vexJs);

var _jsSimpleToast = require("js-simple-toast");

var _jsSimpleToast2 = _interopRequireDefault(_jsSimpleToast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Factory = function () {
  function Factory(figments) {
    _classCallCheck(this, Factory);

    this.figments = figments;
    this.vex = _vexJs2.default;

    this.vex.registerPlugin(require("vex-dialog"));
    this.vex.defaultOptions.className = "vex-theme-plain";

    this.toast = _jsSimpleToast2.default;
  }

  _createClass(Factory, [{
    key: "run",
    value: function run() {
      var _this = this;

      console.log("🔌 Injecting Figments...");

      var pollingRun = setInterval(function () {
        var buttonGroup = document.querySelector(".toolbar_view--buttonGroup--2wM3n");
        if (buttonGroup) {
          _this.init();
          clearInterval(pollingRun);
        }
      }, 1000);
    }
  }, {
    key: "init",
    value: function init() {
      console.log("🔌 Initilizing...");
      var buttonGroup = document.querySelector(".toolbar_view--buttonGroup--2wM3n");

      var markup = (0, _jsxRender2.default)(
        "span",
        { className: "toolbar_view--actionButtonContainer--J2txY" },
        (0, _jsxRender2.default)(
          "span",
          { id: "figments-trigger", className: "toolbar_view--iconButton--Zxsnv enabledButton-3" },
          (0, _jsxRender2.default)("img", { className: "svg", src: "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0OTIuNjE2IDQ5Mi42MTYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ5Mi42MTYgNDkyLjYxNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00NjguMiwxMzUuNzQyYy0yMi43LTUwLjgtNjMuOS05MC45LTExNi0xMTMuMWMtODIuNy0zNS4yLTE3MC43LTI4LjQtMjQxLjYsMTguNUM0MS4zLDg2Ljk0MiwwLDE2My43NDIsMCwyNDYuNjQyICAgIGMwLDYyLjQsMjMuMywxMjEuOSw2NS43LDE2Ny41YzQyLjIsNDUuNCw5OS4zLDczLjEsMTYwLjksNzhjMC45LDAuMSwxLjgsMC4xLDIuNywwLjFjOC43LDAsMTcuMi0zLjMsMjMuNi05LjMgICAgYzcuMi02LjcsMTEuNC0xNi4xLDExLjQtMjZ2LTc1LjljMC0xLjEtMC4xLTIuMi0wLjMtMy4yYzAuMi0xLDAuMy0yLjEsMC4zLTMuMmMwLTkuOS04LjEtMTgtMTgtMThjLTQ1LjcsMC04Mi44LTM3LjEtODIuOC04Mi44ICAgIHYtNTQuNmgxNjUuNnY1NC42YzAsMjMtOS43LDQ1LjEtMjYuNSw2MC43Yy03LjMsNi44LTcuNywxOC4xLTEsMjUuNGM2LjgsNy4zLDE4LjEsNy43LDI1LjQsMWMyNC4yLTIyLjQsMzgtNTQuMiwzOC04Ny4xdi03Mi42ICAgIGMwLTkuOS04LjEtMTgtMTgtMThoLTM5LjJ2LTU5YzAtOS45LTguMS0xOC0xOC0xOGMtOS45LDAtMTgsOC4xLTE4LDE4djU5aC01MS4ydi01OWMwLTkuOS04LjEtMTgtMTgtMThjLTkuOSwwLTE4LDguMS0xOCwxOHY1OSAgICBoLTM5LjJjLTkuOSwwLTE4LDguMS0xOCwxOHY3Mi42YzAuMSw1OS41LDQzLjksMTA4LjgsMTAwLjksMTE3LjV2NjQuOWMtMTA3LjktOS4xLTE5Mi4zLTEwMS0xOTIuMy0yMDkuNSAgICBjMC03MC44LDM1LjMtMTM2LjQsOTQuNS0xNzUuNWM2MC42LTQwLjEsMTM2LjMtNDUuNywyMDcuNi0xNS40YzQzLjcsMTguNSw3OC4yLDUyLjIsOTcuMiw5NC43YzQwLjYsOTAuOSwyMS40LDE5MC4zLTQ5LDI1My4xICAgIGMtNy40LDYuNi04LjEsMTgtMS40LDI1LjRjNi42LDcuNCwxOCw4LjEsMjUuNCwxLjRjMzguNy0zNC42LDY1LjEtNzkuNCw3Ni40LTEyOS44QzQ5OC43LDI0Ni44NDIsNDkyLjQsMTg5Ljg0Miw0NjguMiwxMzUuNzQyeiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" })
        ),
        (0, _jsxRender2.default)(
          "div",
          { id: "figments-dropdown", "class": "pointing_dropdown--root--28JAG", style: { display: "none" } },
          (0, _jsxRender2.default)("div", { "class": "pointing_dropdown--arrow--Lu8iU" }),
          (0, _jsxRender2.default)("div", { id: "figments-menu", "class": "dropdown--dropdown--35dH4 pointing_dropdown--content--2os_K" }),
          (0, _jsxRender2.default)("div", { id: "figments-overlay" })
        )
      );

      this.figmentOptionTemplate = (0, _jsxRender2.default)(
        "a",
        { "class": "dropdown--option--20q-- dropdown--optionBase--2PiCW white_text--whiteText--1kui1", rel: "noopener" },
        (0, _jsxRender2.default)(
          "span",
          null,
          "action"
        )
      );

      buttonGroup.appendChild(markup);

      this.figmentsDropdown = document.getElementById("figments-dropdown");
      this.figmentsMenu = document.getElementById("figments-menu");
      this.figmentsTrigger = document.getElementById("figments-trigger");
      this.figmentsOverlay = document.getElementById("figments-overlay");

      this.figmentsTrigger.addEventListener("click", this.toggleDropdown.bind(this));
      this.figmentsOverlay.addEventListener("click", this.toggleDropdown.bind(this));

      this.setupPlugins();
    }
  }, {
    key: "addOption",
    value: function addOption(name, action) {
      var option = this.figmentsMenu.appendChild(this.figmentOptionTemplate);
      option.innerText = name;
      option.addEventListener("click", action);
      option.addEventListener("click", this.toggleDropdown.bind(this));
    }
  }, {
    key: "toggleDropdown",
    value: function toggleDropdown() {
      if (this.figmentsDropdown.style.display === "none") {
        console.log("🔌 Show menu");

        var triggerRect = this.figmentsTrigger.getBoundingClientRect();
        this.figmentsTrigger.classList.add("activeButton-3");

        this.figmentsDropdown.style.display = "block";
        this.figmentsDropdown.style.left = triggerRect.left + triggerRect.width / 2 - 6 + "px";

        var menuRect = this.figmentsMenu.getBoundingClientRect();
        this.figmentsMenu.style.left = triggerRect.left + triggerRect.width / 2 - menuRect.width / 2 + "px";
      } else {
        console.log("🔌 Hide menu");

        this.figmentsDropdown.style.display = "none";
        this.figmentsTrigger.classList.remove("activeButton-3");
      }
    }
  }, {
    key: "setupPlugins",
    value: function setupPlugins() {
      var _this2 = this;

      console.log("🔌 Setting up plugins...");
      var figments = this.figments;
      var keys = Object.keys(figments);

      if (keys.length === 1 && keys[0] === "default") {
        console.log("🔌 No figments found.");
      } else {
        keys.map(function (key, index) {
          var plugin = figments[key];

          plugin.setup(_this2);
          console.log("\uD83D\uDD0C Plugin added: " + plugin.name);

          _this2.addOption(plugin.name, plugin.main.bind(plugin));

          if (index === keys.length - 1) {
            console.log("🔌 All set!");
          }
        });
      }
    }
  }, {
    key: "getSelectedLayers",
    value: function getSelectedLayers() {
      var nodes = Array.from(document.querySelectorAll('div[class*="object_row--selected"]'));
      var layers = nodes.map(function (layer) {
        return new _layer2.default(layer);
      });
      return layers;
    }
  }]);

  return Factory;
}();

exports.default = Factory;
},{"jsx-render":"../node_modules/jsx-render/lib/dom.js","./core/layer":"core/layer.js","vex-js":"../node_modules/vex-js/dist/js/vex.js","js-simple-toast":"../node_modules/js-simple-toast/dist/simpleToast.js","vex-dialog":"../node_modules/vex-dialog/dist/vex.dialog.js"}],"figments/batch-rename.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var batchRename = {
  name: "Batch Rename",
  state: {},
  setup: function setup(factory) {
    this.factory = factory;
  },
  main: function main() {
    var factory = this.factory;
    var vex = factory.vex,
        toast = factory.toast;


    var selectedLayers = factory.getSelectedLayers();

    if (selectedLayers.length > 1) {

      vex.dialog.prompt({
        message: "Rename Selected Layers (" + selectedLayers.length + ")",
        placeholder: 'You can use text & keywords',
        callback: function callback(value) {
          if (value) {
            selectedLayers.map(function (layer, index) {
              layer.name = value;

              if (index === selectedLayers.length - 1) {
                toast.show("Renamed " + selectedLayers.length + " layers.");
              }
            });
          }
        }
      });
    } else {
      toast.show("You must select at least 2 layers.");
    }
  }
};

exports.default = batchRename;
},{}],"figments/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _batchRename = require('./batch-rename');

Object.defineProperty(exports, 'batchRename', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_batchRename).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./batch-rename":"figments/batch-rename.js"}],"index.js":[function(require,module,exports) {
'use strict';

require('vex-js/dist/css/vex.css');

require('vex-js/dist/css/vex-theme-plain.css');

require('./assets/figments.css');

var _factory = require('./factory');

var _factory2 = _interopRequireDefault(_factory);

var _figments = require('./figments');

var figments = _interopRequireWildcard(_figments);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var factory = new _factory2.default(figments);

factory.run();
},{"vex-js/dist/css/vex.css":"../node_modules/vex-js/dist/css/vex.css","vex-js/dist/css/vex-theme-plain.css":"../node_modules/vex-js/dist/css/vex-theme-plain.css","./assets/figments.css":"assets/figments.css","./factory":"factory.js","./figments":"figments/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '60023' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/figments.map