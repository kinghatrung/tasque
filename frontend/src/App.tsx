import { BrowserRouter, Routes, Route } from "react-router";
import SignInPage from "~/pages/SignInPage";
import SignUpPage from "~/pages/SignUpPage";
import TaskApp from "~/pages/TaskApp";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<TaskApp />} />

        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
