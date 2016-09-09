// Uses CommonJS, AMD or browser globals to create a jQuery plugin.

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function(root, jQuery) {
            if (jQuery === undefined) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {

    function Chain(fn) {
        this.fn = fn;
        this.successor = null;
    }

    Chain.prototype.next = function(successor) {
        return this.successor = successor;
    };

    Chain.prototype.fire = function() {
        var ret = this.fn.apply(this, arguments);
        if (ret === 'next') {
            return this.successor && this.successor.fire.apply(this.successor, arguments);
        }
        return ret;
    };



    $.fn.scrollbar = function() {

        return this.each(function(options) {
            var box = $(this);
            var children = box.children();

            var parameter = $.extend({}, options, {
                box: box,
                boxHeight: box.height(),
                children: children,
                childrenHeight: children.height(),
                boxDiffer: children.height() - box.height(), //内容和盒子差
                scale: box.height() / children.height(), //比例
                trackStep: 0, //滚动条步长
                trackSpace: 0, //滚动条留白高度
                moveTop: 0, //滚动条距离顶部
                step: 100, //每次滚轮滚动间距
            });

            //创建html
            var createBar = new Chain(function() {
                return createScrollbar(parameter);
            });

            //设置滚动条样式
            var serBar = new Chain(function() {
                return reckonTrack(parameter);
            });

            //绑定滚轮事件
            var bindMousewheel = new Chain(function() {
                return mousewheelEvt(parameter);
            });

            //绑定鼠标拖动
            var bindMousedrag = new Chain(function() {
                return mousedragEvt(parameter);
            });

            //设置执行次序
            createBar.next(serBar).next(bindMousewheel).next(bindMousedrag);

            //触发事件
            createBar.fire();

        });



        function createScrollbar(param) {
            if (param.boxHeight < param.childrenHeight) {

                param.track = $('<div class="uScrollbarTrack"></div>').css({
                    position: 'relative',
                    top: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '10px',
                    background: '#bebebe',
                    cursor: 'pointer'
                });

                param.bar = $('<div class="uScrollbar"></div>').css({
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    width: '10px',
                    height: '100%',
                    borderRadius: '10px',
                    background: '#eee'
                });


                param.bar.append(param.track).appendTo(param.box);
                return 'next';
            }
        }

        function reckonTrack(params) {
            var height = params.boxHeight * params.scale;

            params.trackSpace = params.boxHeight - height;
            params.trackStep = params.trackSpace / params.boxDiffer * params.step;
            params.track.height(height);
            return 'next';
        }

        function mousewheelEvt(params) {
            params.box.bind('mousewheel', function(e) {
                var wheelDelta = e.wheelDelta || -e.detail;
                params.moveTop += wheelDelta > 0 ? -params.trackStep : params.trackStep;
                scroll(params);
            });
            return 'next';
        }


        function mousedragEvt(params) {

            var isMouseDown = false;
            var startY;
            var cahceTop = 0;

            params.track.bind('mousedown', function(e) {
                isMouseDown = true;
                startY = e.pageY;
                cahceTop = params.moveTop;
            });

            $(document).bind("mousemove", function(e) {
                if (isMouseDown) {
                    params.moveTop = cahceTop + e.pageY - startY;
                    scroll(params);
                }
                return false;
            }).bind('mouseup', function(e) {
                isMouseDown = false;
            });

            return 'next';
        }


        function scroll(params) {
            params.moveTop = Math.max(params.moveTop, 0);
            params.moveTop = Math.min(params.moveTop, params.trackSpace);

            params.track.css('top', params.moveTop);
            params.children.css('top', -params.moveTop / params.trackSpace * params.boxDiffer);
        }

    };
}));