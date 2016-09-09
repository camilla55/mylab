$.fn.scrollbar = function() {
    return this.each(function() {
        var box = $(this);
        var children = box.children();
        var boxHeight = box.height();
        var childHeight = children.height();
        var boxDiff = childHeight - boxHeight;
        var scale = boxHeight / childHeight;
        var track = null; //拖动条
        var trackStep = 0; //滚动条步长
        var trackDiff = 0; // 滚动条留白高度

        var step = 120; //每个滚动距离
        var styles = {
            top: 0,
            width: '10px',
            borderRadius: '10px',
        };

        //拖动记录
        var top = 0; //记录拖动条，顶部距离
        var isMouseDown;
        var startY;
        var cahceTop = 0;

        //减短变量名
        var mousemove = 'mousemove.sb';
        var mouseup = 'mouseup.sb';

        if (boxHeight < childHeight) {
            children.css('top', 0).next().remove();
            track = $('<div style="position:relative;background:#bbb;cursor:pointer">').css(styles);
            $('<div style="position:absolute;right:0;background:#eee;height:100%">').css(styles).append(track).appendTo(box);

            reckonTrack(); //设置滚动条样式
            mousewheelEvt(); //绑定滚轮事件
            mousedragEvt(); //绑定鼠标拖动
        }

        function reckonTrack() {
            var height = boxHeight * scale;
            trackDiff = boxHeight - height;
            trackStep = trackDiff / boxDiff * step;
            track.height(height);
        }

        function mousewheelEvt() {
            box.unbind('mousewheel.sb')
                .bind('mousewheel.sb', function(e) {
                    top += (e.wheelDelta / 120 || e.detail / 3) * -trackStep;
                    scroll();
                });
        }

        function mousedragEvt() {
            track.bind('mousedown', function(e) {
                isMouseDown = true;
                startY = e.pageY;
                cahceTop = top;
            });

            $(document)
                .unbind(mousemove)
                .bind(mousemove, function(e) {
                    if (isMouseDown) {
                        top = cahceTop + e.pageY - startY;
                        scroll();
                    }
                    return false;
                })
                .unbind(mouseup)
                .bind(mouseup, function(e) {
                    isMouseDown = false;
                });
        }

        function scroll() {
            top = Math.max(top, 0);
            top = Math.min(top, trackDiff);
            track.css('top', top);
            children.css('top', -top / trackDiff * boxDiff);
        }
    });
};