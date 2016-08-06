# github-widget
这是一个github小挂件，采用Node来实现。


# 安装启动
```
npm install

npm start
```


# 主要用到的技术

#### https
```js
var options = {
        host: 'api.github.com',
        port: 443,
        path: 'path',
        method: 'GET',
        headers: {
            "Connection": "close",
            "Content-Type": "text/html",
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36"
        }
    };

https.request(options, (res) => {
    var data = "";
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on("end", function() {
        console.log(data);
    });
}).on('error', (e) => {
}).end();
```


#### Express
Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，它提供一系列强大的特性，帮助你创建各种 Web 和移动设备应用。


```js
app.set('views', './views');
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    //dosomething
});
```

#### Ejs
EJS是一个JavaScript模板库，用来从JSON数据中生成HTML字符串。

```js
<% if (user) { %>
  <h2><%= user.name %></h2>
<% } %>
```


### Q.js
A library for promises (CommonJS/Promises/A,B,D)

```js
function request(path) {
    return Q.Promise(function(resolve, reject, notify) {
        resolve('data');
    });
}

```

```js
Q.all(arr)
    .then(function(d) {
        //dosomething
    });
```


# 其他实现方案
- [ES3版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget) 
- [jQuery版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-jquery) 
- [Q.js+dot.js版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-q-dot)
- [ES6版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-es6)
- [React版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-react)
- [Vue版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-vue)
- [Node版本 - 点击查看](https://github.com/kyo4311/mylab/tree/master/github-widget-node)

# 相关链接
- [Express](https://github.com/expressjs/express)
- [ejs](https://github.com/expressjs/express)
- [Q.js](https://github.com/kriskowal/q)
- [node-https](http://nodejs.cn/doc/node/https.html)