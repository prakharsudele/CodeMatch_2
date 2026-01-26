import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import AuthSuccess from "./pages/AuthSuccess";
import SwipePage from "./pages/SwipePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route path="/swipe" element={<SwipePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
