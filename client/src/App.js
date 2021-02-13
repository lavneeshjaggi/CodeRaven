import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/header/header.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import Spinner from "./components/spinner/spinner.component";

import "./App.scss";

const CodingPage = lazy(() => import("./pages/coding/coding.component"));

const App = () => (
  <div>
    <Header />
    <Switch>
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Route path="/" component={CodingPage} />
        </Suspense>
      </ErrorBoundary>
    </Switch>
  </div>
);

export default App;
