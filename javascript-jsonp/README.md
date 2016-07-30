# 如果你只需要一个简单的jsonp方法，那可以试试这个、

## API

```js
jsonp(url, [data], callback)
```

## 示例

```js
jsonp('https://api.github.com/users/kyo4311', function(res){
    console.log(res);
});
```

## 许可
MIT License.
