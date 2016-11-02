export function Container() {
  const _this = {};

  const services = {};

  const instances = new Map();

  function instanciate(name, args) {
    if (!services[name]) {
      throw new Error(`UndefinedService ${name}`);
    }

    return Promise.resolve(services[name].apply(null, args));
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

export default Container();

