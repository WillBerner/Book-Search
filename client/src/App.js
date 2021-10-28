import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// Import Apollo client dependencies
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

// Set up the Apollo Client
const apolloClient = new ApolloClient({

  // For each request, send user's JWT token
  request: operation => {

    // Attempt to get the token of the user to authenticate them
    const token = localStorage.getItem('id_token');

    // Set the context of the user with their retreived JWT for backend
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },

  uri: '/graphql'
});


function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
