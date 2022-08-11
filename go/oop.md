# 面向对象编程

## 创建对象

```go
type Employee struct {
	Id   string
	Name string
	Age  int
}
```

```go
func TestCreateObj(t *testing.T) {
	e := Employee{"0", "A", 20}
	e1 := Employee{Name: "B", Age: 30}
	e2 := new(Employee) // 返回指针，相当于 e2 := &Employ{}
	e2.Id = "2"         // 通过指针访问 field 可以直接用 .
	e2.Name = "C"
	e2.Age = 10
	t.Log("e ", e)
	t.Log("e1 ", e1)
	t.Log("e2 ", e2)	// e2  &{2 C 10}
	t.Log("e1.Id ", e1.Id)
	t.Logf("e is %T", e)   // e is encapsulation.Employee
	t.Logf("e2 is %T", e2) // e2 is *encapsulation.Employee
}
```

## 定义行为

有两种方式，写法区别很小，但通常使用第二种。

第一种会对实例进行值复制，第二种不会。所以使用第二种定义方式，可以避免内存拷贝。

```go
func (e Employee) String() string {
	fmt.Printf("Address is %x\n", unsafe.Pointer(&e.Name))
	return fmt.Sprintf("ID:%s-Name:%s-Age:%d", e.Id, e.Name, e.Age)
}

func (e *Employee) String() string {
	fmt.Printf("Address is %x\n", unsafe.Pointer(&e.Name))
	return fmt.Sprintf("ID:%s-Name:%s-Age:%d", e.Id, e.Name, e.Age)
}

func TestStructOperations(t *testing.T) {
	e := Employee{"0", "A", 20}
	t.Logf("Address is %x\n", unsafe.Pointer(&e.Name))
	t.Log(e.String())
}
```

## 定义接口

Go 的接口定义没有显式的 implement，而是采用 duck type 的形式。

```go
// 定义接口
type Programmer interface {
	WriteHelloWorld( ) string
}
// 接口实现
type GoProgrammer struct {

}
func (g *GoProgrammer) WriteHelloWorld( ) string {
	return "fmt.Println(\"Hello World\")"
}
func TestClient(t *testing.T) {
	var p Programmer
	p = new(GoProgrammer)
	t.Log(p.WriteHelloWorld())
}
```

## 复用

Go 使用复用的思想，而非继承。

```go
type Pet struct {
}

func (p *Pet) Speak()  {
	fmt.Println("...")
}

func (p *Pet) SpeakTo(host string)  {
	p.Speak()
	fmt.Println(" ", host)
}

type Dog struct {
	//p *Pet
	Pet
}

func (d *Dog) Speak()  {
	//d.p.Speak()
	fmt.Println("Woof")
}

func (d *Dog) SpeakTo(host string)  {
	//d.p.SpeakTo(host)
	d.Speak()
	fmt.Println(" ", host)
}

func TestDog(t *testing.T) {
	dog := new(Dog)
	dog.SpeakTo("Coco")
}
```

## 多态

```go
type Code string

type Programmer interface {
	WriteHelloWorld() Code
}

type GoProgrammer struct {
}

func (p *GoProgrammer) WriteHelloWorld() Code {
	return "fmt.Println(\"Hello World\")"
}

type JavaProgrammer struct {
}

func (p *JavaProgrammer) WriteHelloWorld() Code {
	return "System.out.Println(\"Hello World\")"
}

func writeFirstProgram(p Programmer)  {
	fmt.Printf("%T %v\n", p, p.WriteHelloWorld())
}

func TestFn(t *testing.T) {
	goProg := new(GoProgrammer)
	javaProg := new(JavaProgrammer)
	writeFirstProgram(goProg)
	writeFirstProgram(javaProg)
}
```

Go 存在空接口，它可以表示任何类型。通过断言可以将空接口转换为制定类型。

```go
v, ok := p.(int)	// ok=true 时，v 就是 p 转换成 int 类型后的值
```

```go
func DoSomething(p interface{}) {
	switch v:=p.(type) {
	case int:
		fmt.Println("Integer", v)
	case string:
		fmt.Println("String", v)
	default:
		fmt.Println("Unknown Type")
	}
}

func TestEmptyInterfaceAssertion(t *testing.T) {
	DoSomething(10)
	DoSomething("10")
	DoSomething(true)
}
```

## Go 接口的最佳实践

- 多使用小的接口定义，一个接口只包含一个方法
  ```go
	type Reader interface{}
	type Writer interface{}
  ```
- 较大的接口定义，可以由多个小接口组合而成
  ```go
	type ReaderWriter interface{
		Reader
		Writer
	}
  ```
- 只依赖于必要功能的最小接口
