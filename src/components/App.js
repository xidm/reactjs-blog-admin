import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import {AddPosts, EditPost, DeletePost} from '../redux/actions/post';
import {AddGithub} from '../redux/actions/github';
import { connect } from "react-redux";

import HeaderComponent from './Header';
import MainComponent from './Main';

import JSON_news from '../json/news.json';

class App extends React.Component  { 
    async componentWillMount() {
        //add posts from json
        this.props.AddPosts(JSON_news);
 
        //add github info
        let github_info = await fetch("https://api.github.com/users/xidm")    
        let result = await github_info.json();
        this.props.AddGithub(result);       
    }
    render() {
        return (
            <BrowserRouter>
                <div className="wraper">
                    <HeaderComponent {...this.props}/>
                    <Switch>
                        <MainComponent {...this.props} />
                    </Switch>                
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});
  
export default connect(mapStateToProps, { AddPosts, EditPost, DeletePost, AddGithub })(App);