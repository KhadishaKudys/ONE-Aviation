import React from "react";
import {Card, Col, Row, Container, Nav} from "react-bootstrap"
import "../../assets/styles/blog/blog.css"
import like from "../../assets/static/icons/home/like.svg"
import liked from "../../assets/static/icons/home/liked.svg"
import share from "../../assets/static/icons/home/share.svg"
import save from "../../assets/static/icons/home/save.svg"
import blog_2 from "../../assets/static/backgrounds/home/blog_2.png"
import blog_1 from "../../assets/static/backgrounds/home/blog_1.png"
import Loading from "../../components/reused/Loading"
import {Link} from "react-router-dom"

class Blog extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            token: localStorage.getItem('access_token'),
            blogs: [
                {
                    title: "How traveling affects your life",
                    image: "blog_1.png",
                    date: "Aug 21"
                },
                {
                    title: "How traveling affects your future",
                    image: "blog_2.png",
                    date: "Sept 23"
                },
                {
                    title: "How traveling affects your past",
                    image: "blog_3.png",
                    date: "Sept 24"
                },
                {
                    title: "How life affects your traveling",
                    image: "blog_4.png",
                    date: "Sept 28"
                }
            ],
            all_blogs: [],
            liked: false
        }
    }

    componentDidMount() {
        this.allBlogs();
        const timer = setTimeout(() => {
            this.setState({
                isLoading: false
            })
          }, 2000);
          return() => clearTimeout(timer)
    }

    async allBlogs() {
        await fetch('https://one-aviation.herokuapp.com/api/v1/blog', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ this.state.token
            }
        }).then(async(res) => {
            const data = await res.json();
            // var dates = this.changeDate(data.blogs);
            // var posts = [];
            // for (var p in data.blogs){
            //     posts.push(
            //         {
            //             'content': data.blogs[p].content,
            //             'created_at': dates[p].created,
            //             'id': data.blogs[p].id,
            //             'is_active': data.blogs[p].is_active,
            //             'title': data.blogs[p].title,
            //             'updated_at': dates[p].updated
            //         }
            //     );
            // }
            // console.log(posts)
            this.setState({
                all_blogs:data.blogs
            });
            this.changeDate();
            console.log(this.state.all_posts)
        })
            .catch(err => this.setState({all_blogs: []}));
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

    async changeDate() {
        // var dates = [];
        for (var post in this.state.all_blogs){
            var created = new Date(this.state.all_blogs[post].created_at).toISOString().split('T')[0];
            var updated = new Date(this.state.all_blogs[post].updated_at).toISOString().split('T')[0];
            // dates.push({
            //     'created': created, 
            //     'updated': updated
            // });
            this.state.all_blogs[post].created_at = created;
            this.state.all_blogs[post].updated_at = updated;
        }
        console.log(this.state.all_blogs)
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
            <div className="blog">
            {this.state.isLoading ? <Loading />
            :
            <div className="blog-page">
                <Container>
                    <h1>Blog</h1>

                    <div>
                            <Col className="post-col" >
                            <Card>
                                <Link to={`/post/${this.state.all_blogs[0].id}`}>
                                    <Row>
                                        <Col md={6}>
                                            <img src={blog_2} width="100%" alt="blog2"></img>
                                        </Col>
                                        <Col md={6}>
                                            <p>{this.state.all_blogs[0].created_at}</p>
                                            <h2 id="large-post">{this.state.all_blogs[0].title}</h2>
                                            <p className="post-content">{this.state.all_blogs[0].content}</p>
                                        </Col>
                                    </Row>
                                </Link>
                            </Card>
                            </Col>
                    </div>
                <div id="all-blogs">
                        {this.state.all_blogs.map(pos => 
                            <Card className="blog_prev">
                                <Link to={`/post/${pos.id}`}>
                                    <img src={blog_2} width="100%" alt="blog2" className="blog-img"></img>
                                </Link>
                                <p class="date-post">{pos.created_at}</p>
                                <Link>
                                    <h2>{pos.title}</h2>
                                </Link>
                            </Card>
                        )}
                        </div>
                </Container>
            </div>
            }
            </div>
        );
    }
}

export default (Blog)