import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react'

function wordCut(text, limit)
{
    text = text.trim();
    if( text.length <= limit) return text;
    text = text.slice( 0, limit);
    const lastSpace = text.lastIndexOf(" ");
    return text + "...";
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.round(rand);
}

const ShowGithub = props => {
    return (
        <div className="main">
            <img class="main__avatar" style={{content:`url(${props.git.avatar_url})`}} />
            <div class="main__name">
                <h1>{props.git.name}</h1>
            </div>
            <div class="main__login">
                {props.git.login}
            </div>
            <div class="main__location">
                {`Location: ${props.git.location}`}
            </div> 
            <div class="main__url">              
                <a href={`${props.git.html_url}`}>
                    {props.git.html_url}
                </a>
            </div>              
        </div>
    );
}

const ShowPosts = props => {
    return (
        <li className="post__item">
            <div className="post__image" style={{backgroundImage:`url(${props.item.image})`}}/>
            <div className="post__info">
                <div className="post__detail">
                    {props.opened ?
                        <Link to={`/Home`}>
                            <Button size={"large"} content='Go Back'/>
                        </Link> 
                        :
                        <Link to={`/Home/` + `${props.item.id}`}>
                            <Button size={"large"} content='Read'/>
                        </Link>
                    }
                    <Button size={"large"}><Icon name='eye'/>{props.item.watched}</Button>
                    <Button size={"large"}>{props.item.date}</Button>
                </div>
                <h2 className="post__title">{props.item.title}</h2>
                {props.opened ?
                    <p className="post__description">{props.item.description}</p>
                    :
                    <p className="post__description">{wordCut(props.item.description, 790)}</p>
                }
            </div>
        </li>
    );
}

class ShowPostsAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.item.id,
            watched: this.props.item.watched,
            date: new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString() + " - Edited",
            title: this.props.item.title,
            description: this.props.item.description,
            image: this.props.item.image,
        }
    
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.EditPost = this.EditPost.bind(this);
        this.ClosePost = this.ClosePost.bind(this);
    }

    handleChangeImage(event) {
        this.setState({image: event.target.value});
        this.setState({date: "Edited - " + new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString()}); //update TIME
    }

    handleChangeTitle(event) {
        this.setState({title: event.target.value});
        this.setState({date: "Edited - " + new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString()}); //update TIME
    }

    handleChangeDescription(event) {
        this.setState({description: event.target.value})
        this.setState({date: "Edited - " + new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString()}); //update TIME
    }

    handleSubmit(event) {  
        event.preventDefault();  
        this.props.EditPost(this.state, this.props.id)
    }

    ClosePost() {
        this.props.DeletePost(this.props.id)       
    }

    EditPost() {
        this.setState({
            id: this.props.item.id,
            watched: this.props.item.watched,
            date: this.props.item.date,
            title: this.props.item.title,
            description: this.props.item.description,
            image: this.props.item.image,
        })      
    }

    render() {        
        let ImageUrlStyle = {backgroundImage:`url(${this.props.item.image})`}

        return (
            <li className="post__item">
                <div className="post__image" style={ImageUrlStyle}/>
                <div className="post__info">
                    <div className="post__detail">                   
                        {this.props.opened ?                        
                            <Link to={`/Admin`}>
                                <Button size={"large"} content='Go Back'/>
                            </Link>                                        
                            :
                            <Link to={`/Admin/` + `${this.props.item.id}`}>
                                <Button color={"red"}size={"large"} content='Edit' onClick={this.EditPost}/>
                            </Link>
                        }                     
                        <Button size={"large"} color={"red"} onClick={this.ClosePost}>
                            {"Delete"}
                        </Button>
                        <Button size={"large"}> <Icon name='eye'/>
                            {this.props.item.watched}
                        </Button>
                        <Button size={"large"}>
                            {this.props.item.date}
                        </Button>                  
                    </div>

                    {this.props.opened ?                        
                        <>
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    <textarea 
                                        style={{height: 25+"px"}}
                                        value={this.state.image}
                                        onChange={this.handleChangeImage} 
                                    />
                                    <textarea 
                                        style={{height: 25+"px"}}
                                        value={this.state.title}
                                        onChange={this.handleChangeTitle} 
                                    />
                                    <textarea 
                                        style={{height: 400+"px"}}
                                        value={this.state.description}
                                        onChange={this.handleChangeDescription} 
                                    />
                                </label>
                                <input type="submit" value="Accept changes"/>
                            </form>
                        </>                                        
                        :
                        <>  
                            <h2 className="post__title">{this.props.item.title}</h2>
                            <p className="post__description">{wordCut(this.props.item.description, 790)}</p>
                            <p>id: {this.props.id}</p>
                        </>  
                    }
                </div>
            </li>
        );
    }   
}

class CreatePosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: randomInteger(100, 1000).toString(),
            watched: randomInteger(1, 100).toString(),
            title: "title",
            date: new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString(),
            description: "description",
            image: "https://unsplash.it/250/250?random&i=10"
        };
    
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeTitle(event) {
        this.setState({title: event.target.value});
    }
    handleChangeDescription(event) {
        this.setState({description: event.target.value});
    }
    handleChangeImage(event) {
        this.setState({image: event.target.value});
    }

    handleSubmit(event) {
        this.setState({
            id: randomInteger(100, 1000).toString(),
            watched: randomInteger(1, 100).toString(),
            date: new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString(),
        });
        this.props.AddPosts([this.state])
        event.preventDefault();
    }

    render(){ 
        return (
            <li className="post__item">
                <div className="post__image" style={{backgroundImage:`url( ${this.state.image} )`}}/>
                <div className="post__info">
                    <form style={{display: "contents"}}onSubmit={this.handleSubmit}>
                        <textarea style={{height: 25+"px"}} value={this.state.image} onChange={this.handleChangeImage}/>                 
                        <textarea style={{height: 25+"px"}} value={this.state.title} onChange={this.handleChangeTitle}/> 
                        <textarea  value={this.state.description} onChange={this.handleChangeDescription}/> 
                        <input style={{clear : "both"}}type="submit" value="Create new post"/>     
                    </form>                                                     
                </div>  
            </li>
        );
    } 
}

export default class MainComponent extends React.Component {
    render() {
        let opened = false;
        let posts = this.props.post_Reducer.post;
        let github_info = this.props.github_Reducer.github

        // direct to Home
        if (this.props.location.pathname == `/`)
            return <Redirect from={this.props.location.pathname} to={`/Home`}/>


        // direct to Author
        if (this.props.location.pathname == `/Author` && github_info != null)
            return <ShowGithub git={github_info}/>                      

        // direct to Posts
        return (
            <div className={"main"}>
                {this.props.location.pathname == `/Admin` && <CreatePosts {...this.props}/>} 

                {posts.map( (item, index) => {

                    if (this.props.location.pathname == `/Admin`)
                    {
                        opened = false;  
                        return <ShowPostsAdmin key={index} {...this.props} item={item} opened={opened} id={index}/>                                                                              
                    }

                    if (this.props.location.pathname == `/Admin/` + `${item.id}`)
                    {
                        opened = true;  
                        return <ShowPostsAdmin key={index} {...this.props} item={item} opened={opened} id={index}/>                      
                    }

                    if (this.props.location.pathname == `/Home`)
                    {
                        opened = false;  
                        return <ShowPosts key={index} {...this.props} item={item} opened={opened} id={index}/>                       
                    }

                    if (this.props.location.pathname == `/Home/` + `${item.id}`)
                    {
                        opened = true;  
                        return <ShowPosts key={index} {...this.props} item={item} opened={opened} id={index}/>                         
                    }             
                })}
            </div>               
        )       
    }
}