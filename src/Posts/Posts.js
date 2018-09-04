import React, { Component } from 'react'
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom'

import POSTS_QUERY from './Posts.graphql'

export default class Posts extends Component {
  render() {
    return (
      <div>
        <Link className="button" to={'/post/new'}>New Post</Link>
        <ol className="posts-listing">
          <Query query={POSTS_QUERY}>
          {({loading, data, fetchMore}) => {
            if (loading) return 'Loading...';
            const { posts } = data;
            return (
              <React.Fragment>
                {posts.map( post => (
                  <li key={post.id}>
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </li>
                ))}
                <li>
                  <button onClick={() => fetchMore({
                    variables: {
                      skip: posts.length
                    },
                    updateQuery: (prev, {fetchMoreResult}) => {
                      if (!fetchMoreResult) return prev;
                      return Object.assign({}, prev, {
                        posts: [...prev.posts, ...fetchMoreResult.posts]
                      });
                    }
                  })} >Load more</button>
                </li>
              </React.Fragment>
            )
          }}
          </Query>
        </ol>
      </div>
    )
  }
}


