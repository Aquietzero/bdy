let storage = window.localStorage;

class Cache {
    constructor(storage) {
        this.storage = storage;
    }

    get(key) {
        return this.storage.getItem(key);
    }

    set(key, val) {
        return this.storage.setItem(key, val);
    }

    del(key) {
        return this.storage.removeItem(key);
    }
}

module.exports = new Cache(storage);
