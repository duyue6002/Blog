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
var reverseList = function (head) {
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
var swapPairs = function (head) {
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
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
  let slow = head, fast = head?.next;
  while (fast && fast.next) {
    if (slow === fast) return true;
    fast = fast.next.next;
    slow = slow.next;
  }
  return false;
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
var detectCycle = function (head) {
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
var middleNode = function (head) {
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

## 分隔链表

[LeetCode](https://leetcode.com/problems/partition-list/)

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
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  // 链表的题都可以采用这样的方法
  // 创建新链表头，创建该链表的指针，用指针移动为链表添加节点，最后返回链表头即可
  let lessList = new ListNode(),
    moreList = new ListNode();
  let less = lessList,
    more = moreList,
    node = head;
  while (node) {
    if (node.val < x) {
      less = less.next = node;
    } else {
      more = more.next = node;
    }
    node = node.next;
  }
  less.next = moreList.next;
  more.next = null;
  return lessList.next;
};
```

## K 个一组翻转链表

[LeetCode](https://leetcode.com/problems/reverse-nodes-in-k-group/)

## 合并两个有序链表

[LeetCode](https://leetcode.com/problems/merge-two-sorted-lists/)

```js
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  let head = new ListNode();
  let node = head;
  while (l1 && l2) {
    if (l1.val < l2.val) {
      node.next = l1;
      l1 = l1.next;
    } else {
      node.next = l2;
      l2 = l2.next;
    }
    node = node.next;
  }
  if (l1) {
    node.next = l1;
  }
  if (l2) {
    node.next = l2;
  }
  return head.next;
};
```

## 回文链表

[LeetCode](https://leetcode.com/problems/palindrome-linked-list/)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  slow = reverse(slow);
  fast = head;
  while (slow) {
    if (slow.val !== fast.val) {
      return false;
    }
    slow = slow.next;
    fast = fast.next;
  }
  return true;
};

var reverse = function (head) {
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

## 删除排序链表中的重复元素

[LeetCode](https://leetcode.com/problems/remove-duplicates-from-sorted-list/)

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
var deleteDuplicates = function (head) {
  let fakeHead = new ListNode();
  fakeHead.next = head;
  let cur = head,
    prev = fakeHead;
  while (cur) {
    while (cur.next && cur.val === cur.next.val) {
      cur = cur.next;
    }
    prev = prev.next = cur;
    cur = cur.next;
  }
  return fakeHead.next;
};
```

## 删除排序链表中的重复元素 II

[LeetCode](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/)

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
var deleteDuplicates = function (head) {
  // write code here
  let fakeHead = new ListNode();
  fakeHead.next = head;
  let pre = fakeHead;
  let cur = head;
  while (cur !== null) {
    while (cur.next !== null && cur.val === cur.next.val) {
      cur = cur.next;
    }
    if (pre.next === cur) {
      pre = pre.next;
    } else {
      pre.next = cur.next;
    }
    cur = cur.next;
  }
  return fakeHead.next;
};
```

## 删除链表的倒数第 N 个节点

[LeetCode](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)

```js
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  const dummy_head = new ListNode(0);
  dummy_head.next = head;
  let fast = dummy_head,
    slow = dummy_head;
  for (let i = 1; i <= n + 1; i++) {
    fast = fast.next;
  }
  while (fast) {
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;
  return dummy_head.next;
};
```
