import React, { Component } from 'react';
import './App.css';
import Posts from './components/Posts';
import JPH from './components/JPH';
import GithubAPI from './components/GithubAPI';
import Axios from 'axios'
import {Route, Switch, Redirect} from 'react-router-dom'
import FullPost from './components/FullPost';

class App extends Component {
  state = {
    posts: [],
    input: '',
    userList: []
  }

  getPostHandler = (totalPosts) => {
    Axios.all([
      Axios.get('https://jsonplaceholder.typicode.com/posts'),
      Axios.get('https://jsonplaceholder.typicode.com/users')
    ])
    .then(Axios.spread((listOfPosts, usersList) => {
      console.log(listOfPosts, usersList);
    }))
    Axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        console.log(response.data);
        setTimeout(() => {
          this.setState({
            posts: response.data.slice(0,totalPosts)
          })
        }, 4000)
      })
  }

  componentDidMount = () => {
    JPH.get('/posts')
      .then(response => {
        console.log(response);
        const filtered = response.data.slice(0,6);
        setTimeout(()=>this.setState({posts: filtered}), 5000);
      })
  }

  changeText = (e) => {
    this.setState({
      input: e.target.value
    })

    GithubAPI.get('/search/users?q='+e.target.value+'&per_page=10')
      .then(res => {
        console.log(res)
        this.setState({
          error: null,
          userList: res.data.items,
          totalUsers: res.data.total_count
        })
      })
      .catch(err => {
        console.log(err.response);
        this.setState({
          error: err.response.data.message
        })
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React Blog</h1>
        </header>
        <div>{this.state.error}</div>
        <input type='text' onChange={this.changeText} value={this.state.input} />
        <h4>Total Users: {this.state.totalUsers}</h4>
        <ul>
          {
            this.state.userList.map((user,i) => <li key={i}>{user.login}</li>)
          }
        </ul>
        <button type='button' onClick={()=>this.getPostHandler(15)}>Get Posts</button>
        {
          this.state.posts.map(p => <h3 key={p.id}>{p.title}</h3>)
        }
        {
          this.state.posts.length ?
          // <Posts list={this.state.posts} /> : <h2 style={{textAlign:'center'}}>Loading</h2>
            <Route path='/' exact render={(props) => <Posts list={this.state.posts} {...props} />} />
            : <Route path='/' exact render= {() => <h2 style={{textAlign:'center'}}>Loading</h2>} />
        }
        <Switch>
          <Route path='/posts/:id' component={FullPost} />
          <Redirect from='/posts' to='/' />
        </Switch>
      </div>
    );
  }
}

export default App;
