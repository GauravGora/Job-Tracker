import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import { ToastProvider } from "./components/ui/Toast";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [showLogin, setShowLogin] = useState(true);

  return (
    <ToastProvider>
      {isLoggedIn ? (
        <Dashboard />
      ) : showLogin ? (
        <Login
          onLogin={() => setIsLoggedIn(true)}
          onSwitchToRegister={() => setShowLogin(false)}
        />
      ) : (
        <Register
          onSwitchToLogin={() => setShowLogin(true)}
        />
      )}
    </ToastProvider>
  );
}

export default App;