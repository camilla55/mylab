# github-widget
这是一个github小挂件，学习使用ES6的写法写React。


## 使用方法
```jsx
import React from 'react'
import {render} from 'react-dom';
import GithubWedgit from './widget.jsx';

render(
    <GithubWedgit name="kyo4311"></GithubWedgit>,
    document.getElementById('example')
)
```