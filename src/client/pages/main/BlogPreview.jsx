import React from "react";
import {Card, Row, Container} from "react-bootstrap"
import {Link} from "react-router-dom"
import blog_2 from "../../assets/static/backgrounds/home/blog_2.png"
import "../../assets/styles/home/blog-preview.css"

class BlogPreview extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            all_blogs: [],
            posts: [
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
            ]
        }
    }

    componentDidMount(){
        this.allBlogs();
    }

    async allBlogs() {
        await fetch('https://one-aviation.herokuapp.com/api/v1/blog', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(async(res) => {
            const data = await res.json(); 
            this.setState({
                all_blogs:data.blogs.slice(0, 4)
            });
            this.changeDate();
            console.log(this.state.all_posts)
        })
            .catch(err => this.setState({all_blogs: []}));
    }

    async changeDate() {
        // var dates = [];
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
            <div className="blog-preview">
                <Container>
                    <h3 data-aos="fade-up"
     data-aos-anchor-placement="top-bottom" data-aos-easing="ease-in-sine" data-aos-offset="200">Latest News</h3>
                    <h1 data-aos="fade-up"
     data-aos-anchor-placement="top-bottom" data-aos-easing="ease-in-sine" data-aos-offset="200" data-aos-delay="100">Blog</h1>
                    <Row>
                    <div id="all-blogs" data-aos="fade-left"
     data-aos-anchor-placement="top-bottom" data-aos-easing="ease-in-sine" data-aos-offset="200" data-aos-delay="100">
                        {this.state.all_blogs.map(pos => 
                            <Card className="blog_prev">
                                <Link to={`/post/${pos.id}`}>
                                    <img src={blog_2} width="100%" alt="blog2" className="blog-img"></img>
                                </Link>
                                {/* <p class="date-post">{pos.created_at}</p> */}
                                <Link>
                                    <h2>{pos.title}</h2>
                                </Link>
                            </Card>
                        )}
                        <a href="/blog">see all →
                            </a>
                        </div>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default (BlogPreview)