import React from 'react';

export default class User extends React.Component {

    constructor (props) {
        super(props)
        this.state = { data: [] }
    }

    componentDidMount () {

        fetch(`https://api.github.com/users/${this.props.name}`)
            .then(response => response.json())
            .then(data => this.setState({ data: data }))
            .catch(err => console.error(this.props.url, err.toString()))

    }

    render() {
        return(
            <div className="gh-wrap1">
                <div className="gh-top">
                    <div className="gh-top-photo"><img src={this.state.data.avatar_url} width="90" alt="" /></div>
                    <div className="gh-top-text">
                        <div className="gh-name">{this.state.data.name}</div>
                        <div className="gh-location">{this.state.data.location}</div>
                    </div>
                </div>
                <table className="gh-count">
                    <tbody>
                        <tr>
                            <td><span>{this.state.data.followers}</span>Followers</td>
                            <td><span>{this.state.data.following}</span>Following</td>
                            <td><span>{this.state.data.public_repos}</span>Repositories</td>
                        </tr>
                    </tbody>
                </table>
                <div className="gh-h2">Top repositories</div>
            </div>
        )

    }
}