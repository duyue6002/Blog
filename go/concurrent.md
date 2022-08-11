# 并发编程

## Goroutine

使用 `go foo()` 或 `go func(){}()` 可以创建新的协程调用函数。不同的协程是异步调用的，可以用 `WaitGroup` 等待它们结束。

```go
func main() {
  var wg sync.WaitGroup
  for i := 0; i < 5; i++ {
    wg.Add(1)
    go func() {
      // do something
      wg.Done()
    }()
  }
  wg.Wait()
}
```

## CSP 机制

通过 Channel 进行通讯。

```go
// ok 为 bool，用于判断 channel 是否关闭
// channel 关闭时，是广播机制
v, ok :=<- ch
```