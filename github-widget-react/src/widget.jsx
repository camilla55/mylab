import React from 'react'
import {render} from 'react-dom';


import User from './user.jsx';
import List from './list.jsx';
import styles from './style.css';



export default class GithubWedgit extends React.Component {
    render() {
        return (
            <div className="gh-widget">
                <User name={this.props.name}></User>
                <List name={this.props.name}></List>
            </div>
        )
    }
}