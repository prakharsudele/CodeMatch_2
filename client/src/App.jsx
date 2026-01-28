import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import AuthSuccess from "./pages/AuthSuccess";
import SwipePage from "./pages/SwipePage";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes className="min-h-screen bg-zinc-900 text-white">
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

        <Route
          path="/matches"
          element={
            <RequireAuth>
              <Matches />
            </RequireAuth>
          }
        />

        <Route path="/profile/:userId" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
