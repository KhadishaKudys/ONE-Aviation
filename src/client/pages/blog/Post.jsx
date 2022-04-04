import React from "react";
import {Container, Card} from "react-bootstrap"
import "../../assets/styles/blog/post.css"
import blog_2 from "../../assets/static/backgrounds/home/blog_3.jpg"
import Loading from "../../components/reused/Loading"
import liked from "../../assets/static/icons/home/like.svg"
import like from "../../assets/static/icons/blogs/liked.svg"

class Post extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            post_info: {},
            liked: false,
            token: localStorage.getItem('access_token'),
        }
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);

    }

    componentDidMount() {
        this.getPost(this.props.match.params.id);
        const timer = setTimeout(() => {
            this.setState({
                isLoading: false
            })
          }, 2000);
          return() => clearTimeout(timer)
    }

    async clickLike(id) {
        if(this.state.liked == false){
        this.setState({
            liked: true
        })
        this.likeThePost(id);
    }else{
        this.setState({
            liked: false
        })
        this.unlikeThePost(id);
    }
    }

    async likeThePost(id) {
        console.log(id);
        await fetch(`https://one-aviation.herokuapp.com/api/v1/blog/like/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ this.state.token
            }
        }).then(async(res) => {
            const data = await res.json();
            let items = [...this.state.all_blogs];
            let item = {...items[1]};
            item.liked = true;
            items[1] = item;
            this.setState({items})
            console.log(data)
        })
            .catch(err => this.setState({posts: []}));
    }

    async unlikeThePost(id) {
        console.log(id);
        await fetch(`https://one-aviation.herokuapp.com/api/v1/blog/unlike/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ this.state.token
            }
        }).then(async(res) => {
            const data = await res.json();
            
            console.log(data)
        })
            .catch(err => this.setState({posts: []}));
    }

    goBack(){
        this.setState({map_show: false})
        this.forceUpdateHandler()
    }

    forceUpdateHandler(){
        this.forceUpdate();
      };


    async getPost(id) {
        console.log(id);
        await fetch(`https://one-aviation.herokuapp.com/api/v1/blog/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ this.state.token
            }
        }).then(async(res) => {
            const data = await res.json();
            this.setState({
                post_info:data
            });
            console.log(data)
        })
            .catch(err => this.setState({posts: []}));
    }

    render(){
        return(
            <div className="post">
            {this.state.isLoading ? <Loading />
            :
            <div className="post-page">
                <img src={blog_2} alt="blog_2" width="100%" height="500px"></img>
                <div id="btn-div">
                    <button className="back-btn" onClick={() => this.goBack()}>← Back</button>
                </div>
                <div className="cont">
                    <h1>{this.state.post_info.title}</h1>
                    <div className="heart-btn" onClick={() => this.clickLike(this.state.post_info.id)}>
                        <div className={`content ${this.state.liked ? "heart-active":""}`}>
                            <span className={`heart ${this.state.liked ? "heart-active":""}`}></span>
                            <span className={`like ${this.state.liked ? "heart-active":""}`}>Like</span>
                        </div>
                    </div>
                    {/* {
                        this.state.post_info.liked ?
                        <button id="like"><img alt="liked" src={liked} onClick={e => this.unlikeThePost(this.state.post_info.id)}></img></button>
                        :
                        <button id="like"><img alt="like" src={like} onClick={e => this.likeThePost(this.state.post_info.id)}></img></button>
                    } */}
                </div>
                <Container>
                <p>{this.state.post_info.content}</p>
            </Container>
                
            </div>
            }
            </div>
        );
    }
}

export default (Post)