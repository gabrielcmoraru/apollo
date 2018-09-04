import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Post from './Posts/Post';
import Posts from './Posts/Posts';
import NewPost from './Posts/NewPost';

const defaultState = {
  isEditMode: false,

}

const client = new ApolloClient({
  uri: 'https://api-euwest.graphcms.com/v1/cjll177mn0hmo016bvgbgb0sp/master',
  clientState: {
    defaults: defaultState,
    resolvers: {}
  }
});


// client
//   .query({
//     query: testQuery
//   })
//   .then(res => console.log(res));

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <header className="App-header">
              <Link to={'/'}>
                <h1 className="App-title">GraphQL Apollo</h1>
              </Link>
            </header>
            <main>
              <Switch>
                <Route exact path="/" component={Posts}/>
                <Route exact path="/post/new" component={NewPost}/>
                <Route path="/post/:id" component={Post}/>
              </Switch>
            </main>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
