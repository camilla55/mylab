# github-widget
这是一个github小挂件，使用vue实现。

![Github Widget Image](https://raw.githubusercontent.com/kyo4311/mylab/gh-pages/images/widget/github-widget-vue.jpg)



# 相关知识

- 组件
```js
//创建一个组件
var MyComponent = Vue.extend({
  // 选项...
})

// 全局注册组件，tag 为 my-component
Vue.component('my-component', MyComponent)
```


-vue-resource
```js
new Vue({

    ready() {

      var resource = this.$resource('someItem{/id}');

      // GET someItem/1
      resource.get({id: 1}).then((response) => {
          this.$set('item', response.json())
      });

    }

})
```



# 其他实现方案
- [ES3版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget) 
- [jQuery版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-jquery) 
- [Q.js+dot.js版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-q-dot)
- [ES6版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-es6)
- [React版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-react)
- [Vue版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-vue)
- [Node版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-node)



# 参考链接

- [vue](https://github.com/vuejs/vue)
- [vue-cn](http://cn.vuejs.org/)
- [vue-resource](https://github.com/vuejs/vue-resource)
- [html-loader](https://github.com/webpack/html-loader)
- [css-loader](https://github.com/webpack/css-loader)
- [style-loader](https://github.com/webpack/style-loader)

- [vue组件](http://cn.vuejs.org/guide/components.html)