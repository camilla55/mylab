# github-widget
这是一个github小挂件，引入了doT.js模板，还有Q.js可以让两个请求同步。

![Github Widget Image](https://raw.githubusercontent.com/kyo4311/mylab/gh-pages/images/widget/github-widget-q-dot.jpg)

## 使用方法
```html
<div class="github-widget" data-username="kyo4311"></div>

<div class="github-widget" data-username="olado"></div>

<div class="github-widget" data-username="kriskowal"></div>
```


## 主要学习应用要点：

### 将ajax封成promise
```js
function resource(url) {
    var deferred = Q.defer();
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onload = function() {
        deferred.resolve(JSON.parse(request.responseText));
    }
    request.send();
    return deferred.promise;
}
```

### 将多个ajax的请求结果一次性返回
```js
Q.all([resource(userUrl), resource(reposUrl)])
    .then(function(res) {
    });
```


### dot.js模板应用
```js
doT.template('templateString')(data);
```

### 模板each
```js 
tpl += ' <table class="gh-tb">';
tpl += '    {{~it.rep.list :v:index}}';
tpl += '    <tr>';
tpl += '    <td width="50%"><a href="{{=v.html_url}}">{{=v.name}}</a></div></td>';
tpl += '    <td width="25%">{{=v.stargazers_count}}</td>';
tpl += '    <td width="25%">★{{=v.stargazers_count}}</td>';
tpl += '    </tr>';
tpl += '    {{~}}';
tpl += ' </table>';
```

# 其他实现方案
- [ES3版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget) 
- [jQuery版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-jquery) 
- [Q.js+dot.js版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-q-dot)
- [ES6版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-es6)
- [React版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-react)
- [Vue版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-vue)
- [Node版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-node)


## 相关链接
- [The fastest + concise javascript template engine](http://olado.github.io/doT/)
- [A promise library for JavaScript](https://github.com/kriskowal/q)


