import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SharedPage from "./component/SharedPage/SharedPage";
import { useGithub } from "./context";
import { database } from "./firebaseConfig";
import { ThemeProvider } from "./ThemeContext";

const MainApplication = React.lazy(() =>
  import("./component/MainScreen/LandingScreen")
);
const GithubAuth = React.lazy(() =>
  import("./component/GitHubLogin/GithubAuth")
);
const EditPage = React.lazy(() => import("./component/Edit Page/EditScreen"));

function App() {
  const { githubId } = useGithub();

  return (
    <>
    <ThemeProvider>
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
              <Suspense fallback={<div style={{display:"flex",alignContent:"center",justifyContent:"center", marginTop:"auto",marginBottom:"auto"}}>Loading...</div>}>
                <EditPage />
              </Suspense>
            }
          />
          <Route
            path="/shared/:shareId"
            element={<SharedPage database={database} />}
          />
        </Routes>
      </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
