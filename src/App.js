import React,{Suspense} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useGithub } from "./context";

const MainApplication = React.lazy(() => import("./component/MainScreen/MainScreen"));
const GithubAuth = React.lazy(() => import("./component/GitHubLogin/GithubAuth"));
const EditPage = React.lazy(() => import("./component/Edit Page/EditScreen"));

function App() {
  const { githubId } = useGithub(); 

  return (
    <>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              {githubId ? <MainApplication /> : <Navigate to="/login" />}
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <GithubAuth />
            </Suspense>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <EditPage />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  </>
  );
}

export default App;
