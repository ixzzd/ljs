import("./styles/main.scss");
import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContainer } from "react-hot-loader";
import { isProduction } from "./utils/constants";
import App from "./components/App";
import AppState from "./stores/AppState";

const renderApp = Component => {
  render(
    <AppContainer>
      <Router>
        <Provider store={new AppState()}>
          <App />
        </Provider>
      </Router>
    </AppContainer>,
    document.getElementById("root")
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept(() => renderApp(App));
}
