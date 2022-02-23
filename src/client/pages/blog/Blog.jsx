import React from "react";
import {Card, Col, Row, Container, Nav} from "react-bootstrap"
import "../../assets/styles/blog/blog.css"
import like from "../../assets/static/icons/home/like.svg"
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
            ]
        }
    }

    componentDidMount() {
        const timer = setTimeout(() => {
            this.setState({
                isLoading: false
            })
          }, 2000);
          return() => clearTimeout(timer)
    }

    render(){
        return(
            <div className="blog">
            {this.state.isLoading ? <Loading />
            :
            <div className="blog-page">
                <Container>
                    <h1>Blog</h1>

                    <Nav id="blog-nav" variant="pills" defaultActiveKey="featured">
                        <Nav.Item>
                            <Nav.Link eventKey="featured">Featured</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-1">Trending</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="disabled">
                            Newest
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Row id="content">
                    <h3>Trending</h3>
                        {this.state.blogs.map(pos => 
                            <Col className="post-col" >
                                <Link to="/post">
                            <Card className="blog_prev">
                                <img src={blog_2} width="100%" alt="blog2"></img>
                                <h2>{pos.title}</h2>
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
                                        <p>{pos.date}</p>
                                    </Col>
                                </Row>
                            </Card>
                            </Link>
                            </Col>
                        )}
                        <Col id="see-all-col">
                        <h5>see all →
                            </h5>
                        </Col>
                    </Row>
                    <Row id="content">
                    <h3>Newest</h3>
                        {this.state.blogs.map(pos => 
                            <Col className="post-col" >
                            <Card className="blog_prev">
                                <img src={blog_1} width="100%" alt="blog1"></img>
                                <h2>{pos.title}</h2>
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
                                        <p>{pos.date}</p>
                                    </Col>
                                </Row>
                            </Card>
                            </Col>
                        )}
                        <Col id="see-all-col">
                        <h5>see all →
                            </h5>
                        </Col>
                    </Row>
                </Container>
            </div>
            }
            </div>
        );
    }
}

export default (Blog)