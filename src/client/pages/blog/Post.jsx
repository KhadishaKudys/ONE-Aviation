import React from "react";
import {Container, Form, Modal} from "react-bootstrap"
import "../../assets/styles/blog/post.css"
import blog_2 from "../../assets/static/backgrounds/home/blog_3.jpg"
import Loading from "../../components/reused/Loading"

class Post extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            post_info: {},
            liked: null,
            token: sessionStorage.getItem('access_token'),
            show_login: false,
            password: '',
            email: ''
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

    async clickLike(id, e) {
        e.preventDefault();
        if(this.state.post_info.liked === false){
            this.state.post_info.liked = true
        this.setState({
            post_info: this.state.post_info
        })
        this.likeThePost(id);
    }else{
        this.state.post_info.liked = false
        this.setState({
            post_info: this.state.post_info
        })
        this.unlikeThePost(id);
    }
    }

    async checkLoggedIn(id, e) {
        e.preventDefault();
        if (this.state.token === null) {
            this.setState({
                show_login: true
            })
        }
        else {
            this.clickLike(id, e);
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
        window.history.back();
    }

    forceUpdateHandler(){
        this.forceUpdate();
      };


    async getPost(id) {
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
        console.log(id);
        await fetch(`https://one-aviation.herokuapp.com/api/v1/blog/${id}`, {
            method: 'GET',
            headers: fetch_header
        }).then(async(res) => {
            const data = await res.json();
            this.setState({
                post_info:data
            });
            console.log(data)
        })
            .catch(err => this.setState({posts: []}));
    }

    handleClose = () => {
        this.setState({
            show_login: false
        })
    }

    async signIn() {
        const user = {
            password: this.state.password, 
            email: this.state.email
        }
        await fetch('https://one-aviation.herokuapp.com/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        }).then(async(res) => {
            const data = await res.json();
            console.log(data);
            if( res.ok ) {
                sessionStorage.setItem("access_token", data.access_token);
                sessionStorage.setItem("refresh_token", data.refresh_token);
                sessionStorage.setItem("isLoggedIn", true);
                this.setState({
                    show_login:false
                })
            } 
        })
            .catch(err => 
                console.log(err),
                
            )
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
                    <div className="heart-btn" onClick={(e) => this.checkLoggedIn(this.state.post_info.id, e)}>
                        <div className={`content ${this.state.post_info.liked ? "heart-active":""}`}>
                            <span className={`heart ${this.state.post_info.liked ? "heart-active":""}`}></span>
                            <span className={`like ${this.state.post_info.liked ? "heart-active":""}`}>Like</span>
                        </div>
                    </div>
                </div>
                <Container>
                <p>{this.state.post_info.content}</p>
            </Container>
                
            </div>
            }
            <Modal show={this.state.show_login} onHide={this.handleClose} id="auth-modal">
                <Modal.Header closeButton>
                <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                                                        
                <Modal.Body id="auth-modal-body">
                <Form className="login-form">
                <Form.Group className="mb-3" controlId="formBasicEmail" onChange={e => this.setState({email: e.target.value})}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email"/>
                </Form.Group>
            
                <Form.Group className="mb-3" controlId="formBasicPassword" onChange={e => this.setState({password: e.target.value})}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                </Form.Group>
                <button variant="primary" type="submit" className="enter-btn" onClick={() => this.signIn()}>
                Sign in
                </button>
                </Form>
            </Modal.Body>
            </Modal>
            </div>
        );
    }
}

export default (Post)