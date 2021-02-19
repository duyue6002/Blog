# Go 基础

## 数据类型

Go 不支持隐式类型转换。

```go
type MyInt int64
func TestType(t \*testing.T) {
  var a int32 = 1
  var b int64
  b = int64(a)
  var c MyInt
  b = int64(c)
  t.Log(a, b)
}
```

Go 的指针不支持运算。

```go
func TestPointer(t *testing.T) {
	a := 1
	aPtr := &a
	// aPtr = aPtr + 1
	t.Log(a, aPtr)
	t.Logf("%T %T", a, aPtr)
}
```

Go 的字符串会被初始化为空字符串，而不是 nil。

```go
func TestString(t *testing.T) {
	var s string
	t.Log("*" + s + "*")
	t.Log(len(s))
}
```

## 数组与切片

数组的声明与遍历。

```go
var a [3]int
a[0] = 1
b := [3]int{1, 2, 3} // 声明同时初始化
c := [2][2]int{{1, 2}, {3, 4}} // 多维数组初始化

func TestArrayTraverse(t *testing.T) {
	arr := [...]int{1, 3, 4, 5}
	for i := 0; i < len(arr); i++ {
		t.Log(arr[i])
	}
	for idx, e := range arr {
		t.Log(idx, e)
	}
	for _, e := range arr {
		t.Log(e)
	}
}
```

数组的截断操作：`a[开始索引（包含）:结束索引（不包含）]`，索引不能为负数或超过数组长度。

```go
func TestArraySection(t *testing.T) {
	arr := [...]int{1,2,3,4,5}
	arrSec := arr[:4]
	t.Log(arrSec)
}
```

切片的声明和内部结构。

```go
func TestSliceInit(t *testing.T) {
	var s0 []int	// slice 可变长度，所以不会声明长度
	t.Log(len(s0), cap(s0))
	s0 = append(s0, 1)
	t.Log(len(s0), cap(s0))

	s1 := []int{1, 2, 3, 4}
	t.Log(len(s1), cap(s1))

	s2 := make([]int, 3, 5)
	t.Log(len(s2), cap(s2))
	t.Log(s2[0], s2[1], s2[2])
	s2 = append(s2, 1)
	t.Log(len(s2), cap(s2))
	t.Log(s2[0], s2[1], s2[2], s2[3])
}
```

切片的 capacity 共享存储结构。

```go
func TestSliceShareMemory(t *testing.T) {
	year := []string{"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"}
	q2 := year[3:6]
	t.Log(q2, len(q2), cap(q2))
	summer := year[5:8]
	t.Log(summer, len(summer), cap(summer))
	summer[0] = "unknown"
	t.Log(summer, q2, year)
}
```

切片是不可比较的。

```go
func TestSliceCompare(t *testing.T) {
	a := []int{1,2,3,4}
	b := []int{1,2,3,4}
	if a == b {	// 会报错
		t.Log("equal")
	}
}
```

## Map

Map 的声明。

```go
func TestMapInit(t *testing.T) {
	m1 := map[int]int{1: 1, 2: 4, 3: 9}
	t.Log(m1[2])
	t.Logf("len m1=%d", len(m1))
	m2 := map[int]int{}
	m2[4] = 16
	t.Logf("len m2=%d", len(m2))
	m3 := make(map[int]int, 10) // 此处10为capacity
	t.Logf("len m3=%d", len(m3))
}
```

Map 的元素访问，不存在的 key 其值会被初始化为 0，而非 nil。

```go
func TestAccessNotExistingKey(t *testing.T) {
	m1 := map[int]int{}
	t.Log(m1[1])
	m1[2] = 0
	t.Log(m1[2])
	//m1[3] = 0
	if _, key := m1[3]; key {
		t.Logf("key 3 value is %d", m1[3])
	} else {
		t.Log("key 3 is not existing")
	}
}
```

Map 的遍历。

```go
func TestMapTraverse(t *testing.T) {
	m1 := map[int]int{1: 1, 2: 4, 3: 9}
	for k, v := range m1 {
		t.Log(k, v)
	}
}
```

Map 的 value 可以是函数。

```go
func TestMapWithFunValue(t *testing.T) {
	m := map[int]func(op int) int{}
	m[1] = func(op int) int { return op }
	m[2] = func(op int) int { return op * op }
	m[3] = func(op int) int { return op * op * op }
	t.Log(m[1](2), m[2](2), m[3](2))
}
```

使用 Map 构造 Set。

```go
func TestMapForSet(t *testing.T) {
	mySet := map[int]bool{}
	mySet[1] = true
	mySet[3] = true
	delete(mySet, 1)
}
```

## 字符串

字符串常用库为：strings, strconv。

Unicode 和 UTF-8 在 Go 中的体现。

```go
func TestString(t *testing.T) {
	var s string
	t.Log(s) // 初始化为 ""

	s = "可"
	t.Log(len(s))
	c := []rune(s)
	t.Log(len(c))
	t.Logf("可 unicode %x", c[0])
	t.Logf("可 UTF8 %x", s)
	s = "\xe5\x8f\xaf"
	t.Log(s)
}

func TestStringToRune(t *testing.T) {
	s := "可口可乐"
	for _, c := range s {
		t.Logf("%[1]c %[1]x", c)	// [1] 指第一个参数
	}
}
```

## 函数

defer 关键字可以延迟函数的执行。