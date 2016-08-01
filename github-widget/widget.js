// ready
document.addEventListener('DOMContentLoaded', start);

function start() {

    html('.github-widget', '<div class="gh-wrap1"></div><table class="gh-tb"></table><div class="gh-foot"></div>');
    addClass();
    var username = document.querySelector(".github-widget").dataset.username;

    //user
    resource({
        url: "https://api.github.com/users/" + username,
        filter: function(res) {
            return res;
        },
        template: function() {
            var str = '';
            str += '  <div class="gh-top">';
            str += '       <div class="gh-top-photo"><img src="#{avatar_url}" width="90" alt=""></div>';
            str += '       <div class="gh-top-text">';
            str += '           <div class="gh-name">#{name}</div><div class="gh-location">#{location}</div>';
            str += '       </div>';
            str += '   </div>';
            str += '   <table class="gh-count"><tr>';
            str += '       <td><span>#{followers}</span>Followers</td>';
            str += '       <td><span>#{following}</span>Following</td>';
            str += '       <td><span>#{public_repos}</span>Repositories</td>';
            str += '   </tr></table>';
            str += '   <div class="gh-h2">Top repositories</div>';

            return str;
        },
        render: function(templateString, res) {
            var htmlString = template(templateString, res);
            html('.gh-wrap1', htmlString);
        }
    });

    // Top repositories
    resource({
        url: "https://api.github.com/users/" + username + "/repos",
        filter: function(res) {

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
        },
        template: function() {
            var str1 = '';
            str1 += '<tr>';
            str1 += '<td width="50%"><a href="#{html_url}">#{name}</a></div></td>';
            str1 += '<td width="25%">JavaScript</td>';
            str1 += '<td width="25%">★#{stargazers_count}</td>';
            str1 += '</tr>';

            var str2 = ''
            str2 += '    <a class="gh-link" target="new" href="https://github.com/' + username + '">Follow</a>';
            str2 += '    <span>Last active: #{latestDate}</span>';

            return [str1, str2];
        },
        render: function(templateString, res) {

            //items
            var htmlString = res.list.map(function(v) {
                return template(templateString[0], v);
            }).join('');

            html('.gh-tb', htmlString);

            //footer
            var footerString = template(templateString[1], res);
            html('.gh-foot', footerString);
        }
    });

}

function resource(opt) {
    var request = new XMLHttpRequest();
    request.open('GET', opt.url, true);
    request.onload = function() {
        if (request.status === 200) {
            var data = JSON.parse(request.responseText);

            //template
            var template = opt.template();

            //filter
            data = opt.filter(data);

            //render
            opt.render(template, data);
        }
    };
    request.send();
};

function html(parentSelector, html) {
    document.querySelector(parentSelector).innerHTML = html;
}

function addClass() {

    var str = '';
    str += '@import url(https://fonts.googleapis.com/css?family=Noto+Sans:400,700);';
    str += '.github-widget{border:1px solid #DDD;color:#333;max-width:350px; padding: 10px; color:#333; font-family:Noto Sans,sans-serif}';
    str += '.github-widget a {color:#4078C0;text-decoration:none}';
    str += '.gh-top{height:100px;padding:10px}';
    str += '.gh-top img{border:1px solid #eee;border-radius:50%}';
    str += '.gh-top-photo{width:20%;float:left}';
    str += '.gh-top-text{width:60%;float:right;text-align:center}';
    str += '.gh-name{font-size:1.5em;line-height:1.5em;padding:10px 0 0 0}';
    str += '.gh-count{width: 100%; text-align: center; border-bottom: 1px solid #eee; padding: 0 0 20px 0}';
    str += '.gh-count span{display: block}';
    str += '.gh-h2{font-weight:400;color:#666;text-align:center;padding:15px}';
    str += '.gh-names{width:50%}';
    str += '.gh-language{width:25%}';
    str += '.gh-stars{width:25%;text-align:center}';
    str += '.gh-foot{padding:10px}';
    str += '.gh-link{display:inline-block;background:#ddd;width:100px;height:28px;text-align:center;line-height:28px}';
    str += '.gh-foot span{float:right;line-height:28px;padding:0 20px 0 0}';
    str += '.gh-tb {width: 100%}';
    str += '.gh-tb td{padding: 10px}';

    var body = document.querySelector('body');
    var childNode = document.createElement('style');
    childNode.innerHTML = str;
    body.appendChild(childNode);
}

function template(template, data) {
    return template.replace(/#\{([\s\S]+?)\}/g, function(a, b) {
        return data[b];
    });
}