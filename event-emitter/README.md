# EventEmitter

- 注册一个事件，on(e, listener) 
```js
var events = new EventEmitter();

events.on('change', function(){
    console.log('change on');
});
```

- 注册一次 once(e, listener)
```js
events.once('change', function(){
    console.log('change on');
});
```

- 触发事件 emit(e)
```js
events.emit('change');
```

- 取消注册 off(e, listener)
```js
events.off('change', func);
```

- 销毁指定类型所有注册 destory(e)
```js
events.off('events');
```