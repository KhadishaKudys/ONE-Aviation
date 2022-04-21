import React from "react";
import {Card, Col, Row, Container} from "react-bootstrap"
import "../../assets/styles/blog/blog.css"
import Loading from "../../components/reused/Loading"
import {Link} from "react-router-dom"

class Blog extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            token: sessionStorage.getItem('access_token'),
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
        var fetch_header = {}
        if (this.state.token === null) {
            fetch_header = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        } else {
            fetch_header = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            }
        }
        await fetch('https://one-aviation.herokuapp.com/api/v1/blog', {
            method: 'GET',
            headers: fetch_header
        }).then(async(res) => {
            const data = await res.json();
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
        for (var post in this.state.all_blogs){
            var created = new Date(this.state.all_blogs[post].created_at).toISOString().split('T')[0];
            var updated = new Date(this.state.all_blogs[post].updated_at).toISOString().split('T')[0];
            this.state.all_blogs[post].created_at = created;
            this.state.all_blogs[post].updated_at = updated;
        }
        console.log(this.state.all_blogs)
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
                                <Link to={`/post/${this.state.all_blogs[0]?.id}`}>
                                    <Row>
                                        <Col md={6}>
                                            <img src={this.state.all_blogs[0]?.image} width="100%" alt="blog2"></img>
                                        </Col>
                                        <Col md={6}>
                                            <p>{this.state.all_blogs[0]?.created_at}</p>
                                            <h2 id="large-post">{this.state.all_blogs[0]?.title}</h2>
                                            <p className="post-content">{this.state.all_blogs[0]?.content}</p>
                                        </Col>
                                    </Row>
                                </Link>
                            </Card>
                            </Col>
                    </div>
                <div id="all-blogs">
                        {this.state.all_blogs?.map(pos => 
                            <Card className="blog_prev">
                                <Link to={`/post/${pos.id}`}>
                                    <img src={pos.image} width="100%" alt={pos.id} className="blog-img"></img>
                                </Link>
                                <p className="date-post">{pos.created_at}</p>
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