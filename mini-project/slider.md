# 构建轮播组件

## 效果

<iframe height="459" style="width: 100%;" scrolling="no" title="Carousel" src="https://codepen.io/duyue6002/embed/WNQQGJB?height=459&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">
  See the Pen <a href='https://codepen.io/duyue6002/pen/WNQQGJB'>Carousel</a> by 6002
  (<a href='https://codepen.io/duyue6002'>@duyue6002</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 第一版

```js
class Slider {
  constructor(id, cycle = 3000) {
    this.container = document.getElementById(id);
    this.items = this.container.querySelectorAll(
      ".slider-list__item, .slider-list__item--selected"
    );
    this.cycle = cycle;

    // 下方四个圆点
    const controller = this.container.querySelector(".slide-list__control");
    if (controller) {
      const buttons = controller.querySelectorAll(
        ".slide-list__control-buttons, .slide-list__control-buttons--selected"
      );
      controller.addEventListener("mouseover", (evt) => {
        const idx = Array.from(buttons).indexOf(evt.target);
        if (idx >= 0) {
          this.slideTo(idx);
          this.stop();
        }
      });
      controller.addEventListener("mouseout", (evt) => {
        this.start();
      });
      // 触发自定义事件
      this.container.addEventListener("slide", (evt) => {
        const idx = evt.detail.index;
        const selected = controller.querySelector(
          ".slide-list__control-buttons--selected"
        );
        if (selected) selected.className = "slide-list__control-buttons";
        buttons[idx].className = "slide-list__control-buttons--selected";
      });
    }
    // 监听向左点击事件
    const previous = this.container.querySelector(".slide-list__previous");
    if (previous) {
      previous.addEventListener("click", (evt) => {
        this.stop();
        this.slidePrevious();
        this.start();
        evt.preventDefault();
      });
    }
    // 监听向右点击事件
    const next = this.container.querySelector(".slide-list__next");
    if (next) {
      next.addEventListener("click", (evt) => {
        this.stop();
        this.slideNext();
        this.start();
        evt.preventDefault();
      });
    }
  }
  getSelectedItem() {
    let selected = this.container.querySelector(".slider-list__item--selected");
    return selected;
  }
  getSelectedItemIndex() {
    return Array.from(this.items).indexOf(this.getSelectedItem());
  }
  slideTo(idx) {
    let selected = this.getSelectedItem();
    if (selected) {
      selected.className = "slider-list__item";
    }
    let item = this.items[idx];
    if (item) {
      item.className = "slider-list__item--selected";
    }
    // 注册自定义事件
    const detail = { index: idx };
    const event = new CustomEvent("slide", { bubbles: true, detail });
    this.container.dispatchEvent(event);
  }
  slideNext() {
    let currentIdx = this.getSelectedItemIndex();
    let nextIdx = (currentIdx + 1) % this.items.length;
    this.slideTo(nextIdx);
  }
  slidePrevious() {
    let currentIdx = this.getSelectedItemIndex();
    let previousIdx = (this.items.length + currentIdx - 1) % this.items.length;
    this.slideTo(previousIdx);
  }
  start() {
    this.stop();
    this._timer = setInterval(() => this.slideNext(), this.cycle);
  }
  stop() {
    clearInterval(this._timer);
  }
}
const slider = new Slider("my-slider");
slider.start();
```

## 第二版：依赖注入

```js
class Slider {
  constructor(id, cycle = 3000) {
    this.container = document.getElementById(id);
    this.items = this.container.querySelectorAll(
      ".slider-list__item, .slider-list__item--selected"
    );
    this.cycle = cycle;
  }
  registerPlugins(...plugins) {
    plugins.forEach((plugin) => plugin(this));
  }
  // ....
}
// 把三个控制slide的元素看成插件，抽离出组件中
function pluginController(slider) {
  const controller = slider.container.querySelector(".slide-list__control");
  // ...
}
function pluginPrevious(slider) {
  const previous = slider.container.querySelector(".slide-list__previous");
  // ...
}
function pluginNext(slider) {
  const next = slider.container.querySelector(".slide-list__next");
  // ...
}
const slider = new Slider("my-slider");
slider.registerPlugins(pluginController, pluginPrevious, pluginNext);
slider.start();
```

## 第三版：模块化

```js
class Slider {
  // 图片由外部传入
  constructor(id, opts = { images: [], cycle: 3000 }) {
    this.container = document.getElementById(id);
    this.options = opts;
    this.container.innerHTML = this.render();
    this.items = this.container.querySelectorAll(
      ".slider-list__item, .slider-list__item--selected"
    );
    this.cycle = opts.cycle || 3000;
    this.slideTo(0);
  }
  render() {
    const images = this.options.images;
    const content = images.map((image) =>
      `
      <li class="slider-list__item">
        <img src="${image}"/>
      </li>
    `.trim()
    );
    return `<ul>${content.join("")}</ul>`;
  }
  // ...
}
// 给插件也添加render
const pluginController = {
  render(images) {
    return `
      <div class="slide-list__control">
        ${images
          .map(
            (image, i) => `
            <span class="slide-list__control-buttons${
              i === 0 ? "--selected" : ""
            }"></span>
         `
          )
          .join("")}
      </div>
    `.trim();
  },
  action(slider) {
    // ...
  },
};
const pluginPrevious = {
  render() {
    return `<a class="slide-list__previous"></a>`;
  },
  action(slider) {
    // ...
  },
};

const pluginNext = {
  render() {
    return `<a class="slide-list__next"></a>`;
  },
  action(slider) {
    // ...
  },
};

const slider = new Slider("my-slider", {
  images: [
    "https://cdn.wallpapersafari.com/64/83/QSN87G.jpg",
    "https://cdn.wallpapersafari.com/65/67/Jiyj35.jpg",
    "https://cdn.wallpapersafari.com/53/37/XrlOD6.jpg",
    "https://cdn.wallpapersafari.com/10/32/mc9QUi.jpg",
    "https://cdn.wallpapersafari.com/70/29/DVyzXR.jpg",
  ],
  cycle: 3000,
});

slider.registerPlugins(pluginController, pluginPrevious, pluginNext);
slider.start();
```

## 第四版：组件模型抽象

```js
// 可以实现不同组件，并且可以为组件添加插件
class Component {
  constructor(id, opts = { name, data: [] }) {
    this.container = document.getElementById(id);
    this.options = opts;
    this.container.innerHTML = this.render(opts.data);
  }
  registerPlugins(...plugins) {
    plugins.forEach((plugin) => {
      const pluginContainer = document.createElement("div");
      pluginContainer.className = `.${name}__plugin`;
      pluginContainer.innerHTML = plugin.render(this.options.data);
      this.container.appendChild(pluginContainer);
      plugin.action(this);
    });
  }
  render(data) {
    /* abstract */
    return "";
  }
}

class Slider extends Component {
  constructor(id, opts = { name: "slider-list", data: [], cycle: 3000 }) {
    super(id, opts);
    // ...
  }
  render(data) {
    const content = data.map((image) =>
      `
      <li class="slider-list__item">
        <img src="${image}"/>
      </li>
    `.trim()
    );
    return `<ul>${content.join("")}</ul>`;
  }
  // ...
}
// ...
```
