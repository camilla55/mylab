import {
    resource
} from './resource.js';

import {
    topTemplateString,
    itemTemplateString,
    footTemplateString,
    cssString
} from './template.js';


const doc = document;

//username
const username = doc.querySelector(".github-widget").dataset.username;

//init
html('.github-widget', '<div class="gh-wrap1"></div><table class="gh-tb"></table><div class="gh-foot"></div>');
css(cssString);


// ready
doc.addEventListener('DOMContentLoaded', start);

function start() {

    //user
    resource({
        url: `https://api.github.com/users/${username}`,
        render: function(res) {
            html('.gh-wrap1', topTemplateString(res));
        }
    });

    resource({
        url: `https://api.github.com/users/${username}/repos`,
        filter: function(res) {

            let now = new Date();
            let latestDate = res.sort((a, b) => {
                return new Date(b.updated_at) - new Date(a.updated_at);
            }).slice(0, 1)[0].updated_at;

            let difference = now - new Date(latestDate);
            difference = Math.floor(difference / (1000 * 3600 * 24));
            latestDate = difference ? difference + ' day(s) ago' : 'Today';

            return {
                list: res.sort((a, b) => {
                    return b.stargazers_count - a.stargazers_count;
                }).slice(0, 3),
                latestDate: latestDate
            }
        },

        render: function(res) {

            //items
            let itemString = res.list.map((v) => {
                return itemTemplateString(v);
            }).join('');
            html('.gh-tb', itemString);

            //footer
            html('.gh-foot', footTemplateString(res));
        }
    });

};

function html(parentSelector, html) {
    doc.querySelector(parentSelector).innerHTML = html;
}

function css(str) {
    let body = doc.querySelector('body');
    let childNode = doc.createElement('style');
    childNode.innerHTML = str;
    body.appendChild(childNode);
}