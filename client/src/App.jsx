import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import AuthSuccess from "./pages/AuthSuccess";
import SwipePage from "./pages/SwipePage";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/success" element={<AuthSuccess />} />

        {/* 🔒 Protected route */}
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        <Route
          path="/swipe"
          element={
            <RequireAuth>
              <SwipePage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
