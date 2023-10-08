import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
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
        path: "/create-invoice",
        element: <div className="App d-flex flex-column align-items-center justify-content-center w-100">
          <Container>
            <InvoiceForm />
          </Container>
        </div>,
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
