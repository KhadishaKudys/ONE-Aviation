import React from "react";
import {Card, Col, Row, Container} from "react-bootstrap"
import "../../assets/styles/home/blog-preview.css"
import like from "../../assets/static/icons/home/like.svg"
import share from "../../assets/static/icons/home/share.svg"
import save from "../../assets/static/icons/home/save.svg"
import blog_1 from "../../assets/static/backgrounds/home/blog_1.png"

class BlogPreview extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
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

    render(){
        return(
            <div className="blog-preview">
                <Container>
                    <h3 data-aos="fade-up"
     data-aos-anchor-placement="top-bottom" data-aos-easing="ease-in-sine" data-aos-offset="200">Latest News</h3>
                    <h1 data-aos="fade-up"
     data-aos-anchor-placement="top-bottom" data-aos-easing="ease-in-sine" data-aos-offset="200" data-aos-delay="100">Blog</h1>
                    <Row>
                        {this.state.posts.map(post => 
                            <Col className="post-col" data-aos="fade-right" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-delay="200">
                            <Card className="blog_prev">
                                <img src={blog_1} width="100%"></img>
                                <h2>{post.title}</h2>
                                <Row>
                                    <Col md={2}>
                                        <img src={like} alt="like"></img>
                                    </Col>
                                    <Col md={2}>
                                        <img src={share} alt="share"></img>
                                    </Col>
                                    <Col md={2}>
                                        <img src={save} alt="save"></img>
                                    </Col>
                                    <Col md={6} id="col-date">
                                        <p>{post.date}</p>
                                    </Col>
                                </Row>
                            </Card>
                            </Col>
                        )}
                        <Col id="see-all-col" data-aos="fade-left" data-aos-offset="300" data-aos-easing="ease-in-sine" data-aos-delay="200">
                        <a href="/blog">see all →
                            </a>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default (BlogPreview)