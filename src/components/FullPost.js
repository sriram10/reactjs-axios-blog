import React, { Component } from 'react'
import Axios from 'axios';

class FullPost extends Component {
  
  state = {
    title: '',
    body: ''
  }

  componentDidMount = ()=>{
    Axios.get('https://jsonplaceholder.typicode.com/posts/'+this.props.match.params.id)
      .then(response => {
        console.log(response);
        this.setState({
          title: response.data.title,
          body: response.data.body
        })
      })
  }

  render() {

    return (
      <div>
        <h1>{this.state.title}</h1>
        <hr/>
        <p>{this.state.body}</p>
        <button type='click' onClick={() => this.props.history.goBack()}>Back to Posts</button>
      </div>
    )
  }
}

export default FullPost