import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
// import { ErrorBoundary } from 'react-error-boundary'
// import Fallback from './components/Fallback';
// const errorHandler = (error: any, errorInfo: any) => {
//   console.log(error, errorInfo)
// }
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
     {/* <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}> */}
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
