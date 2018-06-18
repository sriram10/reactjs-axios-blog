import React, { Component } from 'react'

class Post extends Component {
  render() {
    return (
      <article className='post' onClick={() => this.props.onPostClick(this.props.id)}>
        <h3>{this.props.title}</h3>
        <p>{this.props.body}</p>
      </article>
    )
  }
}

export default Post