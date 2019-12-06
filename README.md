# vue-3k-demo-modao

## Description

vue 练手 demo, 仿墨刀官网的动效区块: [详情](https://free.modao.cc/app/design/pbk3nt4ww48v6y51).

全局暴露出了 `_output` 方法, 可以手动配置动画参数, 并且返回动画的样式信息:

```js
const cssText = window._output({
  // 动画名称
  name: 'swap',
  // 动画延迟时间(ms)
  delay: '1000',
  // 动画持续时间(ms)
  duration: '500',
  // 重复次数
  repeat: '5',
});

// "animation-delay: 0s;animation-direction: normal;animation-duration: 0s;animation-fill-mode: none;animation-iteration-count: 1;animation-name: none;animation-play-state: running;animation-timing-function: ease;-webkit-animation-delay: 0s;-webkit-animation-direction: normal;-webkit-animation-duration: 0s;-webkit-animation-fill-mode: none;-webkit-animation-iteration-count: 1;-webkit-animation-name: none;-webkit-animation-play-state: running;-webkit-animation-timing-function: ease;"
console.log(cssText);
```

## Run

### Install dependencies

```bash
yarn install
```

### Start serve

```bash
yarn run serve
```

**Enjoy!**