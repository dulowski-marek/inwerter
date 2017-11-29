export var Metadata;
(function (Metadata) {
    Metadata.$key = Symbol.for('inwerter.metadata');
    function get(target, key = Metadata.$key) {
        return Reflect.getMetadata(key, target);
    }
    Metadata.get = get;
    function set(target, value) {
        Reflect.defineMetadata(Metadata.$key, value, target);
    }
    Metadata.set = set;
})(Metadata || (Metadata = {}));
