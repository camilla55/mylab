(function() {
    var escapeMap = {};
    var unescapeMap = {};

    var escapeKeys = ['&', '<', '>', '"', "'", '`'];
    var unescapeKeys = ['&amp;', '&lt;', '&gt;', '&quot;', '&#x27;', '&#x60;'];

    for (var i = 0; i < 6; i++) {
        escapeMap[escapeKeys[i]] = unescapeKeys[i];
        escapeMap[unescapeKeys[i]] = escapeKeys[i];
    };

    var createEscaper = function(map, keys) {
        var escaper = function(match) {
            return map[match];
        };

        var source = '(?:' + keys.join('|') + ')';
        var replaceRegexp = RegExp(source, 'g');
        return function(string) {
            return ('' + string).replace(replaceRegexp, escaper);
        };
    };

    $.extend({
        escape: createEscaper(escapeMap, escapeKeys),
        unescape: createEscaper(unescapeMap, unescapeKeys),
        template: function(text) {

            var escapes = {
                "'": "'",
                '\\': '\\',
                '\r': 'r',
                '\n': 'n',
                '\u2028': 'u2028',
                '\u2029': 'u2029'
            };

            var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

            var escapeChar = function(match) {
                return '\\' + escapes[match];
            };

            var settings = {
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: /<%=([\s\S]+?)%>/g,
                escape: /<%-([\s\S]+?)%>/g
            };

            // Combine delimiters into one regular expression via alternation.
            var matcher = /<%-([\s\S]+?)%>|<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g

            // Compile the template source, escaping string literals appropriately.
            var index = 0;
            var source = "__p+='";
            text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
                source += text.slice(index, offset).replace(escaper, escapeChar);
                index = offset + match.length;

                if (escape) {
                    source += "'+\n((__t=(" + escape + "))==null?'':$.escape(__t))+\n'";
                } else if (interpolate) {
                    source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
                } else if (evaluate) {
                    source += "';\n" + evaluate + "\n__p+='";
                }

            });

            source += "';\n";

            source = 'with(obj||{}){\n' + source + '}\n';

            source = "var __t,__p='',__j=Array.prototype.join;\n" + source + 'return __p;\n';

            try {
                var render = new Function('obj', source);
            } catch (e) {
                throw e;
            }

            return function(data) {
                return render.call(this, data);
            };
        }
    });


}());