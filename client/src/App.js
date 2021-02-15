import React, { lazy, Suspense } from "react";

import Header from "./components/header/header.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import Spinner from "./components/spinner/spinner.component";

import "./App.scss";

const CodingPage = lazy(() => import("./pages/coding/coding.component"));

const App = () => (
  <div>
    <Header />
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <CodingPage />
      </Suspense>
    </ErrorBoundary>
  </div>
);

export default App;
