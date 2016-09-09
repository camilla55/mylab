$.fn.waterfall = function(options) {
    return this.each(function() {
        var box = $(this);
        var item = box.find(options.selector); //块选择器
        var itemWidth = item.eq(0).outerWidth(1); //计算出每块的宽度
        var columns = Math.floor(box.width() / itemWidth); //计算出列数
        var cacheTop = [];

        item.each(function(i, v) {
            var block = $(this);
            var outerHeight = block.outerHeight(1);
            var nextIndex = i
            var top = 0;

            if (i < columns) {
                cacheTop[i] = outerHeight;
            } else {
                nextIndex = cacheTop.indexOf(Math.min.apply(null, cacheTop));
                top = cacheTop[nextIndex];
                cacheTop[nextIndex] += outerHeight;
            }

            block.css({
                left: nextIndex * itemWidth,
                top: top
            });
        });
    });
};