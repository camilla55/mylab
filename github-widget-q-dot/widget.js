document.addEventListener('DOMContentLoaded', function() {

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


    function resource(url) {
        var deferred = Q.defer();
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.onload = function() {
            deferred.resolve(JSON.parse(request.responseText));
        }
        request.send();
        return deferred.promise;
    }

    function templateString() {
        //template String
        var tpl = '  <div class="gh-top">';
        tpl += '       <div class="gh-top-photo"><img src="{{=it.user.avatar_url}}" width="90" alt=""></div>';
        tpl += '       <div class="gh-top-text">';
        tpl += '           <div class="gh-name">{{=it.user.name}}</div><div class="gh-location">{{=it.user.location}}</div>';
        tpl += '       </div>';
        tpl += '   </div>';
        tpl += '   <table class="gh-count"><tr>';
        tpl += '       <td><span>{{=it.user.followers}}</span>Followers</td>';
        tpl += '       <td><span>{{=it.user.following}}</span>Following</td>';
        tpl += '       <td><span>{{=it.user.public_repos}}</span>Repositories</td>';
        tpl += '   </tr></table>';
        tpl += '   <div class="gh-h2">Top repositories</div>';


        tpl += ' <table class="gh-tb">';
        tpl += '    {{~it.rep.list :v:index}}';
        tpl += '    <tr>';
        tpl += '    <td width="50%"><a href="{{=v.html_url}}">{{=v.name}}</a></div></td>';
        tpl += '    <td width="25%">{{=v.stargazers_count}}</td>';
        tpl += '    <td width="25%">★{{=v.stargazers_count}}</td>';
        tpl += '    </tr>';
        tpl += '    {{~}}';
        tpl += ' </table>';

        tpl += '<div class="gh-foot">';
        tpl += '<a class="gh-link" target="new" href="https://github.com/{{!it.rep.username}}">Follow</a>';
        tpl += '<span>Last active: {{=it.rep.latestDate}}</span>';
        tpl += '</div>';

        return tpl;
    }


    var widgets = document.querySelectorAll('.github-widget') || [];

    if (widgets.length) {

        addClass();

        for (var i = 0; i < widgets.length; i++) {

            var username = widgets[i].dataset.username;
            var userUrl = 'https://api.github.com/users/' + username;
            var reposUrl = userUrl + '/repos';


            (function(node) {

                Q.all([resource(userUrl), resource(reposUrl)])
                    .then(function(res) {

                        var repData = collatingDate(res[1]);
                        repData.username = username;

                        var html = doT.template(templateString())({
                            user: res[0],
                            rep: repData
                        });

                        node.innerHTML = html;
                    });

            }(widgets[i]));
        };
    }
});