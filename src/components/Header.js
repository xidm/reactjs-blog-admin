import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react'

import JSON_menu from '../json/menu.json';

const HeaderComponent = props => {
    const [searchString, setSearchString] = useState("");
    const [WordShow, setWordShow] = useState(false);

    const ChekLength = event => {
        if (event.length > 0) {
            setWordShow(true);
        }
        else {
            setWordShow(false);
        }
    }
  
    const handleChange = event => {
        setSearchString(event.target.value);
        ChekLength(event.target.value)
    }

    let libraries = props.post_Reducer.post;
    let searchStringAA = searchString.trim().toLowerCase();
    if (searchString.length > 0) {
        libraries = libraries.filter((el) => el.title.toLowerCase().match(searchStringAA))
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
                <div className="SearchField">
                    <input type="text" value={searchString} onChange={handleChange} placeholder="Search by titles" />
                    {WordShow ?
                        <ul className="Search__list">
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

export default HeaderComponent

