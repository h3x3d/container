export function Container() {
  const _this = {};

  const services = {};

  const instances = new WeakMap();

  function get(name, ...args) {
    const key = [name, ...args];

    if (!instances[key]) {
      if (!services[name]) {
        throw new Error(`UndefinedService ${name}`);
      }

      const inst = services[name].apply(null, args);

      if (inst instanceof Promise) {
        inst.then(res => instances[key] = res);
      }

      instances[key] = inst;
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

export default Container();

