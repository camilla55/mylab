var GithubWidgetComponent = require('./components/widget.js');

// 注册
Vue.component('githubwidget', GithubWidgetComponent);

// 创建根实例
new Vue({
    el: '#example'
});