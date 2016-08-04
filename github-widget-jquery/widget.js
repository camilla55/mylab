$.fn.githubWidget = function() {

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

    $('<style>').html(str).prependTo('body');


    //template String
    var userTemplate = '  <div class="gh-top">';
    userTemplate += '       <div class="gh-top-photo"><img src="#{avatar_url}" width="90" alt=""></div>';
    userTemplate += '       <div class="gh-top-text">';
    userTemplate += '           <div class="gh-name">#{name}</div><div class="gh-location">#{location}</div>';
    userTemplate += '       </div>';
    userTemplate += '   </div>';
    userTemplate += '   <table class="gh-count"><tr>';
    userTemplate += '       <td><span>#{followers}</span>Followers</td>';
    userTemplate += '       <td><span>#{following}</span>Following</td>';
    userTemplate += '       <td><span>#{public_repos}</span>Repositories</td>';
    userTemplate += '   </tr></table>';
    userTemplate += '   <div class="gh-h2">Top repositories</div>';


    var itemTemplate = '<tr>';
    itemTemplate += '<td width="50%"><a href="#{html_url}">#{name}</a></div></td>';
    itemTemplate += '<td width="25%">JavaScript</td>';
    itemTemplate += '<td width="25%">★#{stargazers_count}</td>';
    itemTemplate += '</tr>';


    var footTemplate = '<a class="gh-link" target="new" href="https://github.com/#{username}">Follow</a>';
    footTemplate += '<span>Last active: #{latestDate}</span>';



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

    function template(template, data) {
        return template.replace(/#\{([\s\S]+?)\}/g, function(a, b) {
            return data[b];
        });
    }


    return this.each(function() {
        var my = $(this);
        var username = my.data('username');
        var userUrl = 'https://api.github.com/users/' + username;
        var reposUrl = userUrl + '/repos';

        my.html('<div class="gh-wrap1"></div><table class="gh-tb"></table><div class="gh-foot"></div>');

        $.get(userUrl).done(function(res) {
            my.find('.gh-wrap1').html(template(userTemplate, res));
        });

        $.get(reposUrl).done(function(res) {

            res = collatingDate(res);
            res.username = username;

            var listHtml = $.map(res.list, function(v) {
                return template(itemTemplate, v);
            }).join('');

            my.find('.gh-tb').html(listHtml);
            my.find('.gh-foot').html(template(footTemplate, res));
        });



    });

};