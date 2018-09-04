import React from 'react';
import ReactDOM from 'react-dom';
import { InMemoryCache  } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const defaultState = {
  isEditMode: false,
}

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: window.localStorage
}).then(() => {
  const client = new ApolloClient({
    cache,
    uri: 'https://api-euwest.graphcms.com/v1/cjll177mn0hmo016bvgbgb0sp/master',
    clientState: {
      defaults: defaultState,
      resolvers: {}
    }
  });

  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  , document.getElementById('root'));
  registerServiceWorker();
})


