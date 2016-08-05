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
            console.log(d[1]);

            var resArr = [];

            for (var i = 0; i < d.length; i++) {
                resArr.push({
                    user: d[i],
                    rep: d[i + 1]
                });
            }

        });

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

    // function requestList(list) {
    //     return Q.Promise(function(resolve, reject, notify) {


    //         var options = {
    //             host: 'api.github.com',
    //             port: 443,
    //             path: '/users/kyo4311',
    //             method: 'GET',
    //             headers: {
    //                 "Connection": "close",
    //                 "Content-Type": "text/html",
    //                 "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36"
    //             }
    //         };

    //         https.request(options, (res) => {
    //             var data = "";
    //             res.on('data', (chunk) => {
    //                 data += chunk;
    //             });

    //             res.on("end", function() {
    //                 process.stdout.write(data);
    //             });

    //         }).on('error', (e) => {
    //             console.error(e);
    //         }).end();


    //     });
    // }

};