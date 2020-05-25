class LRUCache {
  constructor(size) {
    this.cache = {}; // value, _tick
    this.size = size;
    this._tick = 0;
  }

  // "Checks if the cache contains a value associated with `k`"
  has(k) {
    return Object.keys(this.cache).indexOf(k) > -1;
  }

  // Retrieve the value associated with `k` if it exists,
  // else undefined.
  lookup(k) {
    return this.cache[k].value;
  }

  // Is meant to be called if the cache is determined to contain a value
  // associated with `k`
  hit(k) {
    this._update(k, this.cache[k].value);
  }

  // Is meant to be called if the cache is determined to NOT contain a
  // value associated with `k`
  miss(k, v) {
    if (this._isFull()) {
      this._removeLRU();
    }
    this._update(k, v);
  }

  // Removes an entry associated with `k` from the cache
  evict(k) {
    delete this.cache[k];
    this._tick ++
  }

  _removeLRU() {
    let key;
    let _tick = Number.MAX_VALUE;
    for (let k in this.cache) {
      if (this.cache[k]._tick < _tick) {
        key = k;
        _tick = this.cache[k]._tick;
      }
    }
    delete this.cache[key];
  }

  _isFull() {
    return Object.keys(this.cache).length === this.size;
  }

  _update(k, v) {
    this._tick ++;
    this.cache[k] = {
      value: v,
      _tick: this._tick
    };
  }
}


exports.LRUCache = LRUCache
