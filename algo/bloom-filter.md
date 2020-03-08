# 布隆过滤器与 LRU Cache

## 布隆过滤器

与 HashTable 很像，但布隆过滤器用于检验一个元素是否在集合中，不会存储元素本身及其附带信息。

- 优点：空间时间效率高
- 有一定的误差，删除困难

通过 01 检验元素是否存在于集合中时，检测到 0 说明该元素一定**不在**集合中，检测到全 1 只能说明**可能**存在于集合中。

## LRU Cache

最少最近被使用的元素被淘汰。

### LRU 缓存机制

[LeetCode](https://leetcode.com/problems/lru-cache/#/)

```js
var DLinkNode = function() {
  this.key = 0;
  this.value = 0;
  this.previous = null;
  this.next = null;
};

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  this.capacity = capacity;
  this.size = 0;
  this.cache = {};
  this.head = new DLinkNode();
  this.tail = new DLinkNode();
  this.head.next = this.tail;
  this.tail.previous = this.head;
};

LRUCache.prototype.add = function(node) {
  node.next = this.head.next;
  node.previous = this.head;
  this.head.next.previous = node;
  this.head.next = node;
};

LRUCache.prototype.remove = function(node) {
  node.previous.next = node.next;
  node.next.previous = node.previous;
};

LRUCache.prototype.pop = function() {
  let prev = this.tail.previous;
  this.remove(prev);
  return prev;
};

LRUCache.prototype.moveToHead = function(node) {
  this.remove(node);
  this.add(node);
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  let node = this.cache[key];
  if (node) {
    this.moveToHead(node);
    return node.value;
  }
  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  let node = this.cache[key];
  if (!node) {
    node = new DLinkNode();
    node.key = key;
    node.value = value;
    // add to the last
    this.add(node);
    this.cache[key] = node;
    this.size++;
    if (this.size > this.capacity) {
      let last = this.pop();
      this.cache[last.key] = null;
      this.size--;
    }
  } else {
    // update value
    node.value = value;
    this.moveToHead(node);
  }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
```
