import React, { Component } from 'react'
import PostForm from './PostForm';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

export default class NewPost extends Component {
  state = {
    title: '',
    body: ''
  }

  handeInput = e => {
    const formData = {};
    formData[e.target.name] = e.target.value;
    this.setState({ ...formData });
  }

  render() {
    const { title, body} = this.state;
    return (
      <div>
        <h1>New Post</h1>
        <Mutation
          mutation={NEW_POST}
          variables={{
            title,
            body
          }}
        >
        {createPost => (
          <form onSubmit={(e) => {
            e.preventDefault();
            createPost().then(() => {
              this.setState({
                title: '',
                body: ''
              });
            }).catch(e => console.log(e));
            }}
          >
            <input name='title' type='text' onChange={this.handeInput} value={title} placeholder='title' />
            <textarea name='body' type='text' onChange={this.handeInput} value={body} placeholder='body' />
            <button>Submit</button>
          </form>
        )}
        {/* <PostForm/> */}
        </Mutation>
      </div>
    )
  }
}

const NEW_POST = gql`
  mutation createPost($title: String!, $body: String!) {
    createPost(data: {
      status: PUBLISHED
      title: $title
      body: $body
    }) {
      title
      body
      id
    }
  }
`;