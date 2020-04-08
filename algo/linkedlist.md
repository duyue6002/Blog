# 链表

## 反转链表

[LeetCode](https://leetcode.com/problems/reverse-linked-list/)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  let prev = null;
  while (head) {
    let cur = head;
    head = cur.next;
    cur.next = prev;
    prev = cur;
  }
  return prev;
};
```

## 两两交换链表中的节点

[LeetCode](https://leetcode.com/problems/swap-nodes-in-pairs/)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
  if (!head || !head.next) return head;
  let node = new ListNode();
  node.next = head;
  let cur = node;
  while (cur.next && cur.next.next) {
    let first = cur.next;
    let second = cur.next.next;
    first.next = second.next;
    cur.next = second;
    cur.next.next = first;
    cur = cur.next.next;
  }
  return node.next;
};
```

## 环形链表

[LeetCode](https://leetcode.com/problems/linked-list-cycle/)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
  if (!head || !head.next) return false;
  let slow = head.next;
  let fast = head.next.next;
  while (slow !== fast) {
    if (!fast || !fast.next) return false;
    slow = slow.next;
    fast = fast.next.next;
  }
  return true;
};
```

## 环形链表 II

[LeetCode](https://leetcode.com/problems/linked-list-cycle-ii/)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
  if (!head || !head.next) return null;
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      fast = head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return fast;
    }
  }
  return null;
};
```

## 链表的中间结点

[LeetCode](https://leetcode.com/problems/middle-of-the-linked-list/)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
  let slow = head,
      fast = head;
  while (fast) {
    if (!fast.next) return slow;
    if (!fast.next.next) return slow.next;
    slow = slow.next;
    fast = fast.next.next;
  }
  return null;
};
```

## K 个一组翻转链表

[LeetCode](https://leetcode.com/problems/reverse-nodes-in-k-group/)

## 合并两个有序链表

[LeetCode](https://leetcode-cn.com/problems/merge-two-sorted-lists/)
