import React, { Component } from 'react';
import './App.css';
import Posts from './components/Posts';
import JPH from './components/JPH';
import {Route, Switch, Redirect} from 'react-router-dom'
import FullPost from './components/FullPost';

class App extends Component {
  state = {
    posts: []
  }

  componentDidMount = () => {
    JPH.get('/posts')
      .then(response => {
        console.log(response);
        const filtered = response.data.slice(0,6);
        setTimeout(()=>this.setState({posts: filtered}), 5000);
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React Blog</h1>
        </header>
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
