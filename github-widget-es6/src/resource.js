export function resource(opt = {}) {
    let request = new XMLHttpRequest();
    request.open('GET', opt.url, true);
    request.onload = function() {
        if (request.status === 200) {
            let data = JSON.parse(request.responseText);

            //filter
            if (opt.filter) {
                data = opt.filter(data);
            }

            //render
            opt.render(data);
        }
    };
    request.send();
};