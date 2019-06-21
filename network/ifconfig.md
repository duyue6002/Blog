# ifconfig 结果中隐藏的秘密

windows 下用 ipconfig, Linux 下用 ifconfig / ip addr, 可以得到本机的网络信息。

```bash
root@test:~# ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether fa:16:3e:c7:79:75 brd ff:ff:ff:ff:ff:ff
    inet 10.100.122.2/24 brd 10.100.122.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::f816:3eff:fec7:7975/64 scope link
       valid_lft forever preferred_lft forever
```

## lo & eth0

lo 代表主机对内，全称 loopback，本机通信，其 scope （第三行）是 host，也可以表示是本机对内。

eth0 代表主机对外，全称 ether，对外通信，也就是外部对其访问时的信息。

## 网络设备的状态标识

<LOOPBACK, UP, LOWER_UP> 和 <BROADCAST, MULTICAST, UP, LOWER_UP> 是 **net_device flags**。UP 表示网卡处于启动的状态；BROADCAST 表示这个网卡有广播地址，可以发送广播包；MULTICAST 表示网卡可以发送多播包；LOWER_UP 表示 L1 是启动的，网络正常。

mtu 指最大传输单元，以太网下默认是 1500 字节，即报文（MAC 头，IP 头，TCP 头，HTTP 头及内容）的总长度，如果超过就会分片传输。

qdiso pfifo-fast 表示排队规则，按 pfifo-fast（有优先级的先进先出）的规则将数据包加入队列，排队传输。

## MAC 地址与 IP 地址

### MAC 地址

link/ether 后面的就是主机的 MAC 地址，16 进制。MAC 地址有点像身份证，出厂配置，唯一，但是光有 MAC 地址无法找到主机，范围太大，需要 IP 辅助，IP 像具体收货地址，可以定位到这个人。

不过，在同一局域网下，是可以只有 MAC 地址就通信，相当于你已经在该局域网下大吼身份证是 XXX 的在哪？这时对应 MAC 地址的服务器就会回应，是我。

### IP 地址

inet 和 inet6 后就是主机的 IPv4 和 IPv6 地址。32 位 的 IP 地址不够用，所以上了 IPv6，128 位。

使用无类型域间选路 CIDR 将 IP 地址一分为二，分为网络号和主机号管理。

```bash
10.100.122.2/24
```

这表示前 24 位为网络号，后 8 位是主机号。在此网络下，这些 IP 地址需要注意：

- 第一个 IP 地址，主机号为 1，即 10.100.122.1。
- 广播地址，将主机号每位设为 1，即 10.100.122.255，发送数据到该地址，该网络下所有的机器都能收到。
- 子网掩码，网络号每位设为 1，主机号为 0，即 255.255.255.0。

使用子网掩码和某个 IP 地址做 AND 操作可以得到这个 IP 地址的网络号。

> 1 AND X = X
>
> 0 AND X = 0

### 公有 IP 与私有 IP

![私有IP](https://static001.geekbang.org/resource/image/90/93/901778433f2d6e27b916e9e53c232d93.jpg)

红框内的 IP 就是私有 IP 地址段，一般公司、学校都使用私有 IP，IT 人员自己分配，它们会重合。就相当于每个小区都有 1 栋 2 栋，数字会重复，但是仅在内部使用。到公网下，就需要使用公有 IP 地址，需要买，相当于所在小区的地址，房地产商需要买地。

最常用的私有 IP 地址是 192.168.0.x，前面是网络号，连 Wi-Fi 时路由器的 IP 一般用 192.168.0.1 就可以访问。
