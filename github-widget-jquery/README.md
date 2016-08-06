# github-widget
用jquery写的github小挂件。这个不能少，毕竟还是很多同学喜欢jQuery的。

# 主要用到的知识要点

- 使用jQuery.fn.extend新增插件
```js
$.fn.githubWidget = function() {
    
};
```

- 使get获取数据
```js
$.get("example.php", function() {
        alert( "success" );
    })
    .done(function() {
        alert( "second success" );
    })
    .fail(function() {
        alert( "error" );
    })
    .always(function() {
        alert( "finished" );
    });
```

# 使用方法
```html
<div class="github-widget" data-username="kyo4311"></div>
<script src="jquery.min.js"></script>
<script src="widget.js"></script>
```

```js
$('.github-widget').githubWidget();
```

# 其他实现方案
- [ES3版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget) 
- [jQuery版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-jquery) 
- [Q.js+dot.js版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-q-dot)
- [ES6版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-es6)
- [React版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-react)
- [Vue版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-vue)
- [Node版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-node)


# 相关资料
- [jquery](https://jquery.com/)
- [jQuery.get](http://api.jquery.com/jQuery.get/)
- [jQuery.fn.extend](http://api.jquery.com/jQuery.fn.extend/)