import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "~/components/ui/sonner";
import { Outlet } from "react-router-dom";

import SignInPage from "~/pages/SignInPage";
import SignUpPage from "~/pages/SignUpPage";
import TaskApp from "~/pages/TaskApp";

import ProtectedRoute from "~/components/auth/ProtectedRoute";
import DefaultLayout from "~/layouts/DefaultLayout";

function App() {
  return (
    <div className="App">
      <Toaster />
      <BrowserRouter basename="/">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route
              element={
                <DefaultLayout>
                  <Outlet />
                </DefaultLayout>
              }
            >
              <Route path="/" element={<TaskApp />} />
              <Route path="/friends" element={<TaskApp />} />
              <Route path="/group" element={<TaskApp />} />
              <Route path="/statis" element={<TaskApp />} />
              <Route path="/setting" element={<TaskApp />} />
            </Route>
          </Route>

          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
