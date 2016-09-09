$.fn.scrollbar = function(options) {
    return this.each(function() {
        var box = $(this);
        var children = box.children();

        var parameter = $.extend({}, {
            box: box,
            children: children,
            boxHeight: box.height(),
            childrenHeight: children.height(),
            boxDiffer: children.height() - box.height(), //内容和盒子差
            scale: box.height() / children.height(), //比例
            trackStep: 0, //滚动条步长
            trackSpace: 0, //滚动条留白高度
            moveTop: 0, //滚动条距离顶部
            step: 100, //每次滚轮滚动间距
        }, options);

        createScrollbar(parameter, function() {
            reckonTrack(parameter); //设置滚动条样式
            mousewheelEvt(parameter); //绑定滚轮事件
            mousedragEvt(parameter); //绑定鼠标拖动
        });

    });

    function createScrollbar(param, cb) {
        param.children.css('top', 0).next().remove();

        if (param.boxHeight < param.childrenHeight) {

            var styles = {
                top: 0,
                width: '10px',
                borderRadius: '10px',
            };

            param.track = $('<div style="position:relative; background:#bebebe; cursor:pointer;">').css(styles);
            $('<div style="position:absolute; right:0;background:#eee; height:100%; ">').css(styles).append(param.track).appendTo(param.box);

            cb();
        }
    }

    function reckonTrack(params) {
        var height = params.boxHeight * params.scale;
        params.trackSpace = params.boxHeight - height;
        params.trackStep = params.trackSpace / params.boxDiffer * params.step;
        params.track.height(height);
    }

    function mousewheelEvt(params) {
        params.box
            .unbind('mousewheel.sb')
            .bind('mousewheel.sb', function(e) {
                console.log(1);
                var wheelDelta = e.wheelDelta || -e.detail;
                params.moveTop += wheelDelta > 0 ? -params.trackStep : params.trackStep;
                scroll(params);
            });
    }

    function mousedragEvt(params) {

        var isMouseDown = false;
        var startY;
        var cahceTop = 0;

        params.track
            .unbind('mousedown.sb')
            .bind('mousedown.sb', function(e) {
                isMouseDown = true;
                startY = e.pageY;
                cahceTop = params.moveTop;
            });

        $(document)
            .unbind('mousedown.sb')
            .bind("mousemove.sb", function(e) {
                if (isMouseDown) {
                    params.moveTop = cahceTop + e.pageY - startY;
                    scroll(params);
                }
                return false;
            })
            .unbind('mouseup.sb')
            .bind('mouseup.sb', function(e) {
                isMouseDown = false;
            });
    }

    function scroll(params) {
        params.moveTop = Math.max(params.moveTop, 0);
        params.moveTop = Math.min(params.moveTop, params.trackSpace);

        params.track.css('top', params.moveTop);
        params.children.css('top', -params.moveTop / params.trackSpace * params.boxDiffer);
    }
};