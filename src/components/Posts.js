import React, { Component } from 'react'
import './Blog.css'
import Post from './Post';
import NewPost from './NewPost';

class Posts extends Component {

  onPostClick = (id) =>{
    console.log(id)
    this.props.history.push('/posts/'+id)
  }

  render() {
    console.log(this.props);
    const allPosts = this.props.list.map(postObj => {
      return <Post key={postObj.id} {...postObj} onPostClick={this.onPostClick} />
    })
    return (
      <div className='container'>
        <h2>All Posts</h2>
        <NewPost />
        {allPosts}
      </div>
    )
  }
}

export default Posts