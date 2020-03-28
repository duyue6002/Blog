# 策略模式

解决问题：过多的 if-else 或者 switch 判断，造成代码冗余。

思路：查表法

```js
// bad
function superMary(action) {
  if (typeof action === "string") {
    if (action === "run") {
      console.log("run");
    } else if (action === "jump") {
      console.log("jump");
    } else if (action === "attack") {
      console.log("attack");
    }
  } else {
    if (action[0] === "run" && action[1] === "jump") {
      console.log("run");
      console.log("jump");
    }
    // more else
  }
}
// good
function superMary() {
  this.state = [];
  this.actions = {
    run: function() {},
    jump: function() {},
    attack: function() {}
  };
}
superMary.prototype.pushAction = function(action) {
  if (typeof action === "string") {
    this.state.push(action);
  } else {
    this.state = this.state.concat(action);
  }
};
superMary.prototype.run = function() {
  this.state.forEach(action => {
    this.actions[action]();
  });
};
let a = new superMary();
a.pushAction(["run", "jump"]);
a.run();
```
