# $.template

由于jQuery里面没有模板引荐，于是把underscorejs里面的_.template挖了出来。


## 使用示例

```html
<div id="wrap"></div>

<script type="text/html" id="tpl">
    <% list.forEach(function(v){ %>
        <p><b><%-v.Name %></b> - <%-v.ReleaseYear%></p>
    <% }) %>
</script>
```


```js
<script type="text/javascript">
var movies = [
  { Name: "The Red Violin", ReleaseYear: 1998 },
  { Name: "Eyes Wide Shut", ReleaseYear: 1875 },
  { Name: "The Inheritance", ReleaseYear: "1976" }
];

var str = $.template($('#tpl').html())({list : movies});
$('#wrap').html(str);
</script>
```

## 参考

- http://underscorejs.org/#template

- http://underscorejs.org/#escape

- http://underscorejs.org/#unescape


