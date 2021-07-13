export interface Factory<T> {
    create(...deps: any[]): T;
}
