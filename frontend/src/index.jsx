import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';
import './styles/index.css';
import './utils/fontAwesomeUtil';
import App from './App';
import ConfirmationDialogBox from 'components/ConfirmationDialogBox';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';

toast.configure({
  autoClose: 5000,
  draggable: false
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider defaultLocale='en' locale='en'>
        <Router
          getUserConfirmation={(message, callback) => {
            const modal = document.createElement('div');
            document.body.appendChild(modal);

            const withCleanup = (answer) => {
              ReactDOM.unmountComponentAtNode(modal);
              document.body.removeChild(modal);
              callback(answer);
            };

            ReactDOM.render(
              <ConfirmationDialogBox
                message={message}
                onCancel={() => withCleanup(false)}
                onConfirm={() => withCleanup(true)}
              />,
              modal
            );
          }}
        >
          <App />
        </Router>
      </IntlProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
