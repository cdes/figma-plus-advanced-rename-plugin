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
})({"../node_modules/jsx-render/lib/utils.js":[function(require,module,exports) {
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
},{"./utils":"../node_modules/jsx-render/lib/utils.js"}],"core/layer.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
      span.dispatchEvent(doubleClickEvent);

      var input = domNode.querySelector('input[class*="object_row--input"');
      input.value = newName;
      input.focus();
      input.blur();
    }
  }]);

  return Layer;
}();

exports.default = Layer;
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Factory = function () {
  function Factory(figments) {
    _classCallCheck(this, Factory);

    this.figments = figments;
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
},{"jsx-render":"../node_modules/jsx-render/lib/dom.js","./core/layer":"core/layer.js"}],"figments/example.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var example = {
  name: "Example",
  state: {
    counter: 0
  },
  setup: function setup(factory) {
    this.factory = factory;
  },
  main: function main() {
    var selectedLayers = this.factory.getSelectedLayers();
    console.log("🔌 Selected layers", selectedLayers.length);
  }
};

exports.default = example;
},{}],"figments/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _example = require('./example');

Object.defineProperty(exports, 'example', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_example).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./example":"figments/example.js"}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
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
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"assets/figments.css":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
'use strict';

var _factory = require('./factory');

var _factory2 = _interopRequireDefault(_factory);

var _figments = require('./figments');

var figments = _interopRequireWildcard(_figments);

require('./assets/figments.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var factory = new _factory2.default(figments);

factory.run();
},{"./factory":"factory.js","./figments":"figments/index.js","./assets/figments.css":"assets/figments.css"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '62369' + '/');
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