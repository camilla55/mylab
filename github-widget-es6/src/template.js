let topTemplateString = function(data) {
  return `
      <div class="gh-top">
           <div class="gh-top-photo"><img src="${data.avatar_url}" width="90" alt=""></div>
           <div class="gh-top-text">
               <div class="gh-name">${data.name}</div><div class="gh-location">${data.location}</div>
           </div>
       </div>
       <table class="gh-count"><tr>
           <td><span>${data.followers}</span>Followers</td>
           <td><span>${data.following}</span>Following</td>
           <td><span>${data.public_repos}</span>Repositories</td>
       </tr></table>
       <div class="gh-h2">Top repositories</div>`
};

let itemTemplateString = function(data) {
  return `
      <tr>
      <td width="50%"><a href="${data.html_url}">${data.name}</a></div></td>
      <td width="25%">${data.language}</td>
      <td width="25%">★${data.stargazers_count}</td>
      </tr>`;

};

let footTemplateString = function(data) {
  return `
      <a class="gh-link" target="new" href="https://github.com/' + username + '">Follow</a>
      <span>Last active: ${data.latestDate}</span>`;
};


let cssString = `
      @import url(https://fonts.googleapis.com/css?family=Noto+Sans:400,700);
      .github-widget{border:1px solid #DDD;color:#333;max-width:350px; padding: 10px; color:#333; font-family:Noto Sans,sans-serif}
      .github-widget a {color:#4078C0;text-decoration:none}
      .gh-top{height:100px;padding:10px}
      .gh-top img{border:1px solid #eee;border-radius:50%}
      .gh-top-photo{width:20%;float:left}
      .gh-top-text{width:60%;float:right;text-align:center}
      .gh-name{font-size:1.5em;line-height:1.5em;padding:10px 0 0 0}
      .gh-count{width: 100%; text-align: center; border-bottom: 1px solid #eee; padding: 0 0 20px 0}
      .gh-count span{display: block}
      .gh-h2{font-weight:400;color:#666;text-align:center;padding:15px}
      .gh-names{width:50%}
      .gh-language{width:25%}
      .gh-stars{width:25%;text-align:center}
      .gh-foot{padding:10px}
      .gh-link{display:inline-block;background:#ddd;width:100px;height:28px;text-align:center;line-height:28px}
      .gh-foot span{float:right;line-height:28px;padding:0 20px 0 0}
      .gh-tb {width: 100%}
      .gh-tb td{padding: 10px}`;

export {
  topTemplateString,
  itemTemplateString,
  footTemplateString,
  cssString
};