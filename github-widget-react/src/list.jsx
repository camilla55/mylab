import React from 'react';

export default class List extends React.Component {

    constructor (props) {
        super(props)
        this.state = { data: {list: []} }
    }

    componentDidMount () {

        fetch(`https://api.github.com/users/${this.props.name}/repos`)
            .then(response => response.json())
            .then(data => this.setState({ data: this.dataConvert(data) }))
            .catch(err => console.error(this.props.url, err.toString()))

    }

    dataConvert (res) {

        let now = new Date();
        let latestDate = res.sort((a, b) => {
            return new Date(b.updated_at) - new Date(a.updated_at);
        }).slice(0, 1)[0].updated_at;

        let difference = now - new Date(latestDate);
        difference = Math.floor(difference / (1000 * 3600 * 24));
        latestDate = difference ? difference + ' day(s) ago' : 'Today';

        let data =  {
            list: res.sort((a, b) => {
                return b.stargazers_count - a.stargazers_count;
            }).slice(0, 3),
            latestDate: latestDate
        }
        return data;

    }

    render() {
        return(
            <div>
                <table className="gh-tb">
                    <tbody>
                        {
                            this.state.data.list.map(function (v, key) {
                                return <tr  key={key}>
                                    <td width="50%"><a href={v.html_url}>{v.name}</a></td>
                                    <td width="25%">{v.language}</td>
                                    <td width="25%">★{v.stargazers_count}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <div className="gh-foot">
                  <a className="gh-link" target="new" href="https://github.com/">Follow</a>
                  <span>{this.state.data.latestDate}</span>
                </div>
            </div>
        )

    }
}