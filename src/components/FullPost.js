import React, { Component } from 'react'
import JPH from './JPH';
import GithubAPI from './GithubAPI';

class FullPost extends Component {
  
  state = {
    title: '',
    body: '',
    users: [],
    newPostStatus: ''
  }

  componentDidMount = ()=>{
    JPH.get('/posts/'+this.props.match.params.id)
      .then(response => {
        console.log(response);
        this.setState({
          title: response.data.title,
          body: response.data.body
        })
      })
    GithubAPI.get('/users')
      .then(res => {
        console.log(res.data);
        this.setState({users: res.data.slice(0,10)})
      })
  }

  addPost = () => {
    JPH.post('/posts', {
      title: 'New Post',
      body: 'some content'
    }).then(res => {
      this.setState({
        title: res.data.title,
        body: res.data.body,
        newPostStatus: 'New Post Added'
      })
    }).catch(err => {
      console.log(err);
      this.setState({
        newPostStatus: 'Failed to add Post'
      })
    })
  }
  render() {

    return (
      <div>
        <div>{this.state.newPostStatus}</div>
        <h1>{this.state.title}</h1>
        <hr/>
        <p>{this.state.body}</p>
        <button type='click' onClick={this.addPost}>Add Posts</button>
        <div>
          {
            this.state.users.map(u => <h3>{u.login}</h3>)
          }
        </div>
        <button type='click' onClick={() => this.props.history.goBack()}>Back to Posts</button>
      </div>
    )
  }
}

export default FullPost