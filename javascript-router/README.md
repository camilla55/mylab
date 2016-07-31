# javascript router

## 实现原理
当浏览器地址的hash改变之后，location.hash的改变可以通过window.onhashchange获取；如果低版本浏览器没有的话，我们使用setInterval去实现。


## 使用示例
```js

router

    //定义默认状态显示情况
    .def(function(){
        router.go('/home/');   
    })

    //添加对应需要跳转的路由
    .add('/home/', function(){
        div.innerHTML = 'welcome home page'; 
    })
    .add('/list/', function(o){
        div.innerHTML = 'welcome list page';
    })
    .add('/detail/', function(o){
        console.log(o);
        div.innerHTML = 'welcome detail page, name:' + o.name;
    })

    //执行操作
    .init();
```


## 许可
MIT License.