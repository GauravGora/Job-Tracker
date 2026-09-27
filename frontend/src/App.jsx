// import { useState } from "react";
// import Login from "./Login";
// import Register from "./Register";
// import Dashboard from "./Dashboard";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

//   return (
//     <div>
//       {/* <h1>JobTrack</h1>
//       <p>Job Application Tracker</p> */}

//       {!isLoggedIn ? (
//         <>
//           <Register />

//           <hr />

//           <Login onLogin={() => setIsLoggedIn(true)} />
//         </>
//       ) : (
//         <Dashboard />
//       )}
//     </div>
//   );
// }

// export default App;


import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [showLogin, setShowLogin] = useState(true);

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return showLogin ? (
    <Login
      onLogin={() => setIsLoggedIn(true)}
      onSwitchToRegister={() => setShowLogin(false)}
    />
  ) : (
    <Register
      onSwitchToLogin={() => setShowLogin(true)}
    />
  );
}

export default App;