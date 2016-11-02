"use strict";

exports.__esModule = true;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

exports.Container = Container;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Container() {
  const _this = {};

  const services = {};

  const instances = new _map2.default();

  function instanciate(name, args) {
    if (!services[name]) {
      throw new Error(`UndefinedService ${ name }`);
    }

    return _promise2.default.resolve(services[name].apply(null, args));
  }

  function get(name, ...args) {
    const inst = instanciate(name, args);
    if (args.length === 0) {
      instances.set(name, inst);
    }
    return inst;
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