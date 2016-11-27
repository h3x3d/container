export type Factory = (cont: Container, ...args: Array<any>) => any

export default class Container {
  static inst: Container;

  protected services: Map<string, Factory> = new Map();
  protected instances: Map<string, Promise<any>> = new Map();

  protected instanciate(name: string, args: Array<any>) {
    if (!this.services.has(name)) {
      throw new Error(`UndefinedService ${name}`);
    }
    return Promise.resolve(this.services.get(name)(this, ...args));
  }

  get(name: string, ...args: Array<any>) {
    if (args.length > 0) {
      return this.instanciate(name, args);
    }
    if (this.instances.has(name)) {
      return this.instances.get(name);
    }
    const inst = this.instanciate(name, args);
    this.instances.set(name, inst);
    return inst;
  }

  set(name: string, fac: Factory) {
    this.services.set(name, fac);
    return fac;
  }

  fac(name: string) {
    return this.services.get(name);
  }

  static instance() {
    if (!this.inst) {
      this.inst = new this();
    }
    return this.inst;
  }
}
