import React from "react";
import {Card, Col, Row} from "react-bootstrap";
import "../../assets/styles/profile/liked-posts.css"
import Loading from "../../components/reused/Loading"
import empty from '../../assets/static/backgrounds/profile/no-likes.png'
import {Link} from "react-router-dom";
import blog_2 from "../../assets/static/backgrounds/home/blog_2.png"
import ticket_plane from "../../assets/static/flights/ticket-plane.svg"
import { portsGetterAction } from "../../store/portsGetter";

class LikedPosts extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            isLoading: true,
            access_token: sessionStorage.getItem("access_token"),
            order_history: [],
            liked_posts: []
        }
    }

    componentDidMount() {
        const timer = setTimeout(() => {
            this.getLikedPosts()
            this.setState({
                isLoading: false
            })
          }, 1500);
          return() => clearTimeout(timer)
    }

    async getLikedPosts() {
        await fetch('https://one-aviation.herokuapp.com/api/v1/blog/liked-blogs', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+this.state.access_token
            }
        }).then(async(res) => {
            const data = await res.json();
            this.setState({
                liked_posts:data.blogs
            });
            this.changeDate();
            console.log(this.state.liked_posts)
        })
            .catch(err => this.setState({liked_blogs: []}));
    }

    async changeDate() {
        // var dates = [];
        for (var post in this.state.liked_posts){
            var created = new Date(this.state.liked_posts[post].created_at).toISOString().split('T')[0];
            var updated = new Date(this.state.liked_posts[post].updated_at).toISOString().split('T')[0];
            // dates.push({
            //     'created': created, 
            //     'updated': updated
            // });
            this.state.liked_posts[post].created_at = created;
            this.state.liked_posts[post].updated_at = updated;
        }
        console.log(this.state.liked_posts)
        // this.setState(prevState => ({
        //     all_posts: {
        //         ...prevState.all_posts,
        //         created_at: created,
        //         updated_at: updated
        //     }
        // }))
    }


    render(){
        return(
            this.state.isLoading ? <Loading/> :
            <div id='all-blogs'>
                            <h1>Liked Posts</h1>
                            {this.state.liked_posts.length == 0 ?
                                <div className="nothing">
                                    <div id="empty">
                                        <img src={empty} alt="empty-cart" width="30%"/>
                                    </div>
                                    <h3>You don't have any liked posts!</h3>
                                    <Link to='/blog'>
                                        <button>Explore blog posts</button>
                                    </Link>
                                </div>
                            :
                            <div id="all-blogs">
                        {this.state.liked_posts.map(pos => 
                            <Card className="blog_prev_1">
                                <Row id="row-post">
                                    <Col md={3}>
                                    <Link to={`/post/${pos.id}`}>
                                        <img src={blog_2} width="100%" alt="blog2" className="blog-img"></img>
                                    </Link>
                                    </Col>
                                    <Col md={6}>
                                    {/* <p class="date-post">{pos.created_at}</p> */}
                                    <Link>
                                        <h2 id="post-title">{pos.title}</h2>
                                    </Link>
                                    <p className="post-content">{pos.content}</p>
                                    </Col>
                                    <Col md={3}></Col>
                                </Row>
                            </Card>
                        )}
                        </div>
                                }
            </div>
        );
    }
}

export default (LikedPosts);