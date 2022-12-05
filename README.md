# uniapp集成小程序自定义组件

## 允许在uniapp组件级使用小程序原生平台组件

## 环境

uniapp + vite2

## 使用

```ts
plugins: [
    ...
     UniappCustomizeComponent({
      // uniapp组件url: { 自定义组件名: 自定义组件url }
      'components/Card/Card': { 'wx-pay-button': '/wxcomponent/WxPayButton/index' }
    })
  ],
```
## 说明

如有疑问, 辛苦提一下issue, 目前仅自测字节和微信小程序, 其余小程序平台未知
