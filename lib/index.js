"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = Container;
function Container() {
  const _this = {};

  const services = new Map();

  const instances = new Map();

  function instanciate(name, args) {
    if (services.has(name)) {
      return Promise.resolve(services.get(name)(...args));
    }
    throw new Error(`UndefinedService ${ name }`);
  }

  function get(name, ...args) {
    if (args.length > 0) {
      return instanciate(name, args);
    }
    if (instances.has(name)) {
      return instances.get(name);
    }

    const inst = instanciate(name, args);
    instances.set(name, inst);
    return inst;
  }

  function set(name, factory) {
    services.set(name, factory.bind(null, _this));
  }

  function fac(name) {
    return services.get(name);
  }

  _this.get = get;
  _this.set = set;
  _this.fac = fac;

  return _this;
}

exports.default = Container();