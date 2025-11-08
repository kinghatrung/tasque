import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "~/components/ui/sonner";

import SignInPage from "~/pages/SignInPage";
import SignUpPage from "~/pages/SignUpPage";
import TaskApp from "~/pages/TaskApp";

import ProtectedRoute from "~/components/auth/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Toaster />
      <BrowserRouter basename="/">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<TaskApp />} />
          </Route>

          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
