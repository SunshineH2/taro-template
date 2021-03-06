'use strict';
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function() {
          return this;
        }),
      g
    );
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, '__esModule', { value: true });
var isFunction = require('lodash.isfunction');
var isPromise = require('is-promise');
var react_1 = require('@tarojs/taro');
var compose_1 = require('./util/compose');
var Store = /** @class */ (function() {
  /**
   * Constuctor of Store
   * @param {string} namespace - unique name of store
   * @param {object} model - object of state and actions used to init store
   * @param {array} middlewares - middlewares queue of store
   */
  function Store(namespace, model, middlewares) {
    var _this = this;
    /** Store state and actions user defined */
    this.model = {};
    /** Queue of setState method from useState hook */
    this.queue = [];
    /** Middleware queue of store */
    this.middlewares = [];
    /** Flag of whether disable loading effect globally */
    this.disableLoading = false;
    /**
     * Get state from model
     * @return {object} state
     */
    this.getState = function() {
      var model = _this.model;
      var state = {};
      Object.keys(model).forEach(function(key) {
        var value = model[key];
        if (!isFunction(value)) {
          state[key] = value;
        }
      });
      return state;
    };
    this.namespace = namespace;
    this.middlewares = middlewares;
    Object.keys(model).forEach(function(key) {
      var value = model[key];
      _this.model[key] = isFunction(value) ? _this.createAction(value, key) : value;
    });
  }
  /**
   * Create action which will trigger state update after mutation
   * @param {function} func - original method user defined
   * @param {string} actionName - name of action function
   * @return {function} action function
   */
  Store.prototype.createAction = function(func, actionName) {
    var _this = this;
    var actionWrapper = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return __awaiter(_this, void 0, void 0, function() {
        var disableLoading, result, isAsync, enableLoading, afterExec, value, e_1;
        var _this = this;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              wrapper.loading = true;
              wrapper.error = null;
              disableLoading =
                wrapper.disableLoading !== undefined ? wrapper.disableLoading : this.disableLoading;
              result = func.apply(this.model, args);
              isAsync = isPromise(result);
              enableLoading = isAsync && !disableLoading;
              if (enableLoading) {
                this.setState();
              }
              afterExec = function() {
                wrapper.loading = false;
                _this.setState();
              };
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, , 4]);
              return [4 /*yield*/, result];
            case 2:
              value = _a.sent();
              afterExec();
              return [2 /*return*/, value];
            case 3:
              e_1 = _a.sent();
              wrapper.error = e_1;
              afterExec();
              throw e_1;
            case 4:
              return [2 /*return*/];
          }
        });
      });
    };
    var actionMiddleware = function(ctx, next) {
      return __awaiter(_this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, actionWrapper.apply(void 0, ctx.action.arguments)];
            case 1:
              return [2 /*return*/, _a.sent()];
          }
        });
      });
    };
    var ctx = {
      action: {
        name: actionName,
        arguments: [],
      },
      store: {
        namespace: this.namespace,
        getState: this.getState,
      },
    };
    var wrapper = compose_1.default(this.middlewares.concat(actionMiddleware), ctx);
    return wrapper;
  };
  /**
   * Trigger setState method in queue
   */
  Store.prototype.setState = function() {
    var state = this.getState();
    this.queue.forEach(function(setState) {
      return setState(state);
    });
  };
  /**
   * Hook used to register setState and expose model
   * @return {object} model of store
   */
  Store.prototype.useStore = function() {
    var _this = this;
    var state = this.getState();
    // 不同环境下需要做兼容 WEAPP WEB RN SWAN ALIPAY TT
    // WEAPP 不需要更改
    switch (react_1.getEnv()) {
      case 'WEB':
        react_1 = require('@tarojs/taro-h5');
        break;
      //   case 'RN':
      //     react_1 = require('@tarojs/taro-rn');
      //     break;
      case 'SWAN':
        react_1 = require('@tarojs/taro-swan');
        break;
      case 'ALIPAY':
        react_1 = require('@tarojs/taro-alipay');
        break;
      case 'TT':
        react_1 = require('@tarojs/taro-tt');
        break;
    }
    var _a = react_1.useState(state),
      setState = _a[1];
    react_1.useEffect(function() {
      _this.queue.push(setState);
      return function() {
        var index = _this.queue.indexOf(setState);
        _this.queue.splice(index, 1);
      };
    }, []);
    return __assign({}, this.model);
  };
  return Store;
})();
exports.default = Store;
//# sourceMappingURL=store.js.map
