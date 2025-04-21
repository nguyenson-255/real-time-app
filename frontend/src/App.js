import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import JoinChat from "./pages/JoinChat";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    // <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Route (Requires Auth) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/join" element={<JoinChat />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    // </AuthProvider>
  );
}

export default App;
