import React,{useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react'

const wordCut = (text, limit) => {
    text = text.trim();
    if( text.length <= limit) return text;
    text = text.slice( 0, limit);
    return text + "...";
}

const randomInteger = (min, max) => {
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

const ShowPostsAdmin = props => {
    const [id, setId] = useState(props.item.id);
    const [watched, setWatched] = useState(props.item.watched);
    const [title, setTitle] = useState(props.item.title);
    const [date, setDate] = useState(new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString() + " - Edited");
    const [description, setDescription] = useState(props.item.description);
    const [image, setImage] = useState(props.item.image);

    const handleChangeImage = event => {
      setImage(event.target.value);
    }

    const handleChangeTitle = event => {
      setTitle(event.target.value);
    }

    const handleChangeDescription = event => {
      setDescription(event.target.value)
    }

    const handleSubmit = event => {  
        event.preventDefault(); 
        
        let ourState = {
            id: id,
            watched: watched,
            date: new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString() + " - Edited",
            title: title,
            description: description,
            image: image
        }
        props.EditPost(ourState, props.id)
    }

    const ClosePost = () => {
        props.DeletePost(props.id)       
    }

    const EditPost = () => {
        setId(props.item.id)
        setWatched(props.item.watched)
        setTitle(props.item.title)
        setDate(props.item.date)
        setDescription(props.item.description)
        setImage(props.item.image)    
    }
  
    const ImageUrlStyle = {backgroundImage:`url(${props.item.image})`}

    return (
        <li className="post__item">
            <div className="post__image" style={ImageUrlStyle}/>
            <div className="post__info">
                <div className="post__detail">                   
                    {props.opened ?                        
                        <Link to={`/Admin`}>
                            <Button size={"large"} content='Go Back'/>
                        </Link>                                        
                        :
                        <Link to={`/Admin/` + `${props.item.id}`}>
                            <Button color={"red"}size={"large"} content='Edit' onClick={EditPost}/>
                        </Link>
                    }                     
                    <Button size={"large"} color={"red"} onClick={ClosePost}>
                        {"Delete"}
                    </Button>
                    <Button size={"large"}> <Icon name='eye'/>
                        {props.item.watched}
                    </Button>
                    <Button size={"large"}>
                        {props.item.date}
                    </Button>                  
                </div>

                {props.opened ?                        
                    <>
                        <form onSubmit={handleSubmit}>
                            <label>
                                <textarea 
                                    style={{height: 25+"px"}}
                                    value={image}
                                    onChange={handleChangeImage} 
                                />
                                <textarea 
                                    style={{height: 25+"px"}}
                                    value={title}
                                    onChange={handleChangeTitle} 
                                />
                                <textarea 
                                    style={{height: 400+"px"}}
                                    value={description}
                                    onChange={handleChangeDescription} 
                                />
                            </label>
                            <input type="submit" value="Accept changes"/>
                        </form>
                    </>                                        
                    :
                    <>  
                        <h2 className="post__title">{props.item.title}</h2>
                        <p className="post__description">{wordCut(props.item.description, 790)}</p>
                        <p>id: {props.id}</p>
                    </>  
                }
            </div>
        </li>
    );
     
}

const CreatePost = props => {
    const [id, setId] = useState(randomInteger(100, 1000).toString());
    const [watched, setWatched] = useState(randomInteger(1, 100).toString());
    const [title, setTitle] = useState("title");
    const [date, setDate] = useState(new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString());
    const [description, setDescription] = useState("description");
    const [image, setImage] = useState("https://unsplash.it/250/250?random&i=10");

    const handleChangeTitle = event => {
        setTitle(event.target.value)
    }

    const handleChangeDescription = event => {
        setDescription(event.target.value)
    }

    const handleChangeImage = event => {
        setImage(event.target.value)
    }

    const handleSubmit = event => {
        setWatched(randomInteger(1, 100).toString())
        setDate(new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString())
        props.AddPosts([{
            id: id,
            watched: watched,
            title: title,
            date: date,
            description: description,
            image: image
        }])
        event.preventDefault();
    }
    
    return (
        <li className="post__item">
            <div className="post__image" style={{backgroundImage:`url( ${image} )`}}/>
            <div className="post__info">
                <form style={{display: "contents"}} onSubmit={handleSubmit}>
                    <textarea style={{height: 25+"px"}} value={image} onChange={handleChangeImage}/>                 
                    <textarea style={{height: 25+"px"}} value={title} onChange={handleChangeTitle}/> 
                    <textarea  value={description} onChange={handleChangeDescription}/> 
                    <input style={{clear : "both"}}type="submit" value="Create new post"/>     
                </form>                                                     
            </div>  
        </li>
    );    
}

const MainComponent = props => {
    let opened = false;
    let posts = props.post_Reducer.post;
    let github_info = props.github_Reducer.github

    // direct to Home
    if (props.location.pathname == `/`) 
    return <Redirect from={props.location.pathname} to={`/Home`}/>

    // direct to Author
    if (props.location.pathname == `/Author` && github_info != null) 
    return <ShowGithub git={github_info}/>                      

    // direct to Posts
    return (
        <div className={"main"}>
            {props.location.pathname == `/Admin` && <CreatePost {...props}/>} 

            {posts.map( (item, index) => {
                if (props.location.pathname == `/Admin`) {
                    opened = false;  
                    return <ShowPostsAdmin key={index} {...props} item={item} opened={opened} id={index}/>                                                                              
                }

                if (props.location.pathname == `/Admin/` + `${item.id}`) {
                    opened = true;  
                    return <ShowPostsAdmin key={index} {...props} item={item} opened={opened} id={index}/>                      
                }

                if (props.location.pathname == `/Home`) {
                    opened = false;  
                    return <ShowPosts key={index} {...props} item={item} opened={opened} id={index}/>                       
                }

                if (props.location.pathname == `/Home/` + `${item.id}`) {
                    opened = true;  
                    return <ShowPosts key={index} {...props} item={item} opened={opened} id={index}/>                         
                }             
            })}
        </div>               
    )       
    
}

export default MainComponent 