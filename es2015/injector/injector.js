import { Metadata } from "../metadata/index";
export class Injector {
    constructor() {
        this.registry = new Set();
        this.resolved = new Map();
    }
    register(token) {
        this.registry.add(token);
    }
    provide(token) {
        return this.resolved.get(token);
    }
    resolve(target) {
        let paramtypes = Metadata.get(target, 'design:paramtypes');
        return new target(paramtypes.map(provider => {
            // If provider has already been resolved
            if (this.resolved.has(provider)) {
                return this.resolved.get(provider);
            }
            let resolved = this.resolve(provider);
            this.resolved.set(provider, resolved);
            this.registry.delete(provider);
            return resolved;
        }));
    }
}
