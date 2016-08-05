const https = require('https');
const Q = require('q');

exports.widget = function(arr, callback) {

    var newArr = [];

    arr.forEach(function(item) {
        newArr.push('/users/' + item);
        newArr.push('/users/' + item + '/repos');
    });

    var reqAarr = newArr.map(function(item) {
        return request(item);
    });


    Q.all(reqAarr)
        .then(function(d) {
            var resArr = [];

            for (var i = 0; i < d.length; i = i + 2) {
                resArr.push({
                    user: JSON.parse(d[i]),
                    rep: collatingDate(JSON.parse(d[i + 1]))
                });
            }
            callback.call(null, resArr);
        });


    function collatingDate(res) {

        var now = new Date();
        var latestDate = res.sort(function(a, b) {
            return new Date(b.updated_at) - new Date(a.updated_at);
        }).slice(0, 1)[0].updated_at;

        var difference = now - new Date(latestDate);
        difference = Math.floor(difference / (1000 * 3600 * 24));
        latestDate = difference ? difference + ' day(s) ago' : 'Today';

        return {
            list: res.sort(function(a, b) {
                return b.stargazers_count - a.stargazers_count;
            }).slice(0, 3),
            latestDate: latestDate
        }
    }


    // request
    function request(path) {

        return Q.Promise(function(resolve, reject, notify) {
            var options = {
                host: 'api.github.com',
                port: 443,
                path: path,
                method: 'GET',
                headers: {
                    "Connection": "close",
                    "Content-Type": "text/html",
                    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36"
                }
            };

            https.request(options, (res) => {
                var data = "";
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on("end", function() {
                    resolve(data);
                });
            }).on('error', (e) => {
                console.error(e);
            }).end();
        });
    }

};