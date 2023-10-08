import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import InvoiceForm from './components/InvoiceForm';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import InvoiceList from './components/InvoiceList';
import { Provider } from 'react-redux';
import { store } from './store/store';

class App extends Component {
  render() {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <InvoiceList />
      },
      {
        path: "/invoice-form/:id?",
        element: <InvoiceForm />
      },
    ]);

    return (
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
  }
}

export default App;
