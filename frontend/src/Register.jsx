// import { useState } from "react";

// function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         alert(data.message);
//         return;
//       }

//       alert("Registration successful!");

//       console.log("Registered user:", data.user);

//       setName("");
//       setEmail("");
//       setPassword("");
//     } catch (error) {
//       console.error("Registration error:", error);
//       alert("Unable to connect to server");
//     }
//   };

//   return (
//     <div>
//       <h2>Create JobTrack Account</h2>

//       <form onSubmit={handleRegister}>
//         <div>
//           <label>Name</label>
//           <br />
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter your name"
//           />
//         </div>

//         <br />

//         <div>
//           <label>Email</label>
//           <br />
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//           />
//         </div>

//         <br />

//         <div>
//           <label>Password</label>
//           <br />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//           />
//         </div>

//         <br />

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Register;

import { useState } from "react";

function Register({ onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Registration successful!");

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-indigo-600">JobTrack</h1>

          <p className="mt-2 text-slate-500">
            Start tracking your job search today.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold">Create your account</h2>

          <p className="mt-2 text-sm text-slate-500">
            Create an account to start managing applications.
          </p>

          <form onSubmit={handleRegister} className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">Name</label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Password</label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Create Account
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Login
            </button>
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          JobTrack • MERN Stack Project
        </p>
      </div>
    </div>
  );
}

export default Register;
