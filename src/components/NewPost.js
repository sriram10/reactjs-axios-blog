import React, { Component } from 'react'
import JPH from './JPH';
import GithubAPI from './GithubAPI';

class NewPost extends Component {

  state = {
    title: '',
    body: '',
    status: '',
    user: null
  }

  submitHandler = (e) => {
    e.preventDefault();
    JPH.post('/posts', {...this.state})
      .then(res => {
        console.log(res.data);
        this.setState({
          status: 'SUCCESS'
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({
          status: 'FAIL'
        })
      })
  }

  changeTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  changeBody = (e) => {
    this.setState({
      body: e.target.value
    })
  }

  componentDidUpdate = () =>{
    console.log('Updated')
    if(this.state.status === 'SUCCESS') {
      GithubAPI.get('/users/sriram10').then(res => {
        console.log(res.data);
        this.setState({
          user: res.data,
          status: ''
        })
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <div>
          <label>Title</label>
          <input type="text" value={this.state.title} onChange={this.changeTitle} />
        </div>
        <div>
          <label>Content</label>
          <textarea rows='5' cols='10' value={this.state.body} onChange={this.changeBody} />
        </div>
        <div>
          <button type='submit'>Add POST</button>
        </div>
      </form>
    )
  }
}

export default NewPost