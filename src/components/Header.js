import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react'

import JSON_menu from '../json/menu.json';

export default class HeaderComponent extends Component {
  constructor(props) {
  	super(props);
    this.state = {
    	searchString: "",
      WordShow: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  ChekLength(event) {
    if (event.length > 0) {
      this.setState({WordShow: true});
    }
    else {
      this.setState({WordShow: false});
    }
  }
  
  handleChange(event) {
  	this.setState({searchString: event.target.value});
    this.ChekLength(event.target.value)
  }

  render() {
    let libraries = this.props.post_Reducer.post,
    searchString = this.state.searchString.trim().toLowerCase();
    if (searchString.length > 0) {
      libraries = libraries.filter((el) => el.title.toLowerCase().match(searchString))
    }

    return (
      <div className="header">
        <div className="header__menu-left">
          {JSON_menu.map( (item,index) => {
            return (
              <NavLink to={`/${item.title}`} key={index}>                     
                <Button size={"large"} content={item.title} />                                   
              </NavLink>
            )              
          })}
        </div>

        <div className="header__menu-right">
          <NavLink to={`/Admin`}>
            <Button size={"large"} content={"Admin"} />
          </NavLink>
          <div class="SearchField">
            <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Search by titles" />
            {this.state.WordShow ?
              <ul class="Search__list">
                {libraries.map( (item) => 
                  <Link to={`/Home/` + `${item.id}`}> 
                    <li>{item.title}</li> 
                  </Link>
                )}
              </ul> 
              :
              <div/>
            }
          </div>
        </div>
      </div>
    )
  }
}

