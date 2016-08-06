var css = require("style!./widget.css");
var template = require("./widget.html");


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



module.exports = Vue.extend({
    data: function() {
        return {
            show: false,
            user: {},
            rep: {}
        }
    },
    props: ['username'],
    ready: function() {

        this.$http.get('https://api.github.com/users/' + this.username)
            .then(function(response) {
                this.user = response.data;
                this.show = true;
            });
        this.$http.get('https://api.github.com/users/' + this.username + '/repos')
            .then(function(response) {
                this.rep = collatingDate(response.data);
            });
    },
    template: template
});