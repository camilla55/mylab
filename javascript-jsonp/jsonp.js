(function(win, doc) {

    win.jsonp = function(url) {


        //arguments的最后一个参数被认为是回调方法
        var callback = [].slice.call(arguments, -1)[0];

        //arguments第二个参数，如果是object，则认为是请求参数
        var data = typeof arguments[1] === 'object' ? arguments[1] : {};

        var head = doc.getElementsByTagName('head')[0];

        var script = doc.createElement('script');

        //回调方法的方法名
        var funcName = 'jsonp_' + new Date().valueOf();

        //在window上创建一个全局的方法
        win[funcName] = function(res) {

            //执行回调方法
            callback.call(this, res);

            //删除在window上创建一个全局的方法
            win[funcName] = null;

            //移除script标答
            head.removeChild(script);
        };


        //设置script的src地址,插入的js为一个自动执行的方法，只要保证在window上有对应的function就行了。
        script.src = parseUrl(url, data, funcName);



        //head追加script
        head.appendChild(script);
    };

    /**
     * [parseUrl description]
     * @param  {String} url      [初始请求地址]
     * @param  {Object} data     [初始参数，为Object]
     * @param  {String} funcName [回调的方法名]
     * @return {String}          [返回请求地址]
     */
    function parseUrl(url, data, funcName) {

        //给data扩展对象，像这样子：{callbck: 'jsonp_1469876873350'}
        data.callback = funcName;

        //把data解成url地址
        for (var key in data) {
            url += '&' + key + '=' + data[key];
        }

        //如果地址中还没有“?”， 那么把第一个&变成?
        return url.indexOf('?') < 0 ? url.replace(/&/, '?') : url;
    }

}(window, document));