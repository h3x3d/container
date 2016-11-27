export declare type Factory = (cont: Container, ...args: Array<any>) => any;
export default class Container {
    static inst: Container;
    protected services: Map<string, Factory>;
    protected instances: Map<string, Promise<any>>;
    protected instanciate(name: string, args: Array<any>): Promise<any>;
    get(name: string, ...args: Array<any>): Promise<any>;
    set(name: string, fac: Factory): Factory;
    fac(name: string): Factory;
    static instance(): Container;
}
