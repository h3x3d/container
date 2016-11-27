"use strict";
class Container {
    constructor() {
        this.services = new Map();
        this.instances = new Map();
    }
    instanciate(name, args) {
        if (!this.services.has(name)) {
            throw new Error(`UndefinedService ${name}`);
        }
        return Promise.resolve(this.services.get(name)(this, ...args));
    }
    get(name, ...args) {
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
    set(name, fac) {
        this.services.set(name, fac);
        return fac;
    }
    fac(name) {
        return this.services.get(name);
    }
    static instance() {
        if (!this.inst) {
            this.inst = new this();
        }
        return this.inst;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Container;
