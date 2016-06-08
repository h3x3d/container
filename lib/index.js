"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _weakMap = require("babel-runtime/core-js/weak-map");

var _weakMap2 = _interopRequireDefault(_weakMap);

exports.Container = Container;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Container() {
  const _this = {};

  const services = {};

  const instances = new _weakMap2.default();

  function get(name) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    const key = [name, ...args];

    if (!instances[key]) {
      if (!services[name]) {
        throw new Error(`UndefinedService ${ name }`);
      }

      const inst = services[name].apply(null, args);

      if (inst instanceof _promise2.default) {
        instances[key] = inst;
      } else {
        instances[key] = new _promise2.default(res => res(inst));
      }
    }

    return instances[key];
  }

  function set(name, factory) {
    services[name] = factory.bind(null, _this);
  }

  function fac(name) {
    return services[name];
  }

  _this.get = get;
  _this.set = set;
  _this.fac = fac;

  return _this;
}

exports.default = Container();