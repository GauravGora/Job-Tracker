// import { useEffect, useState } from "react";

// function Dashboard() {
//   const [jobs, setJobs] = useState([]);
//   const [company, setCompany] = useState("");
//   const [role, setRole] = useState("");
//   const [status, setStatus] = useState("Applied");
//   const [notes, setNotes] = useState("");
//   const [editingJobId, setEditingJobId] = useState(null);
//   const [editStatus, setEditStatus] = useState("Applied");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const handleAddJob = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");

//       const response = await fetch("http://localhost:5000/api/jobs", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           company,
//           role,
//           status,
//           notes,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         alert(data.message);
//         return;
//       }

//       alert("Job application added successfully!");

//       setJobs((previousJobs) => [data.job, ...previousJobs]);

//       setCompany("");
//       setRole("");
//       setStatus("Applied");
//       setNotes("");
//     } catch (error) {
//       console.error("Error adding job:", error);
//       alert("Unable to connect to server");
//     }
//   };
//   const handleEditJob = async (jobId) => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           status: editStatus,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         alert(data.message);
//         return;
//       }

//       alert("Job application updated successfully!");

//       setJobs((previousJobs) =>
//         previousJobs.map((job) => (job._id === jobId ? data.job : job)),
//       );

//       setEditingJobId(null);
//     } catch (error) {
//       console.error("Error updating job:", error);
//       alert("Unable to connect to server");
//     }
//   };

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const response = await fetch("http://localhost:5000/api/jobs", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();
//         console.log("Jobs received:", data);

//         if (!response.ok) {
//           console.error(data.message);
//           return;
//         }

//         setJobs(data);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//       }
//     };

//     fetchJobs();
//   }, []);
//   const handleDeleteJob = async (jobId) => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         alert(data.message);
//         return;
//       }

//       alert("Job application deleted successfully!");

//       setJobs((previousJobs) =>
//         previousJobs.filter((job) => job._id !== jobId),
//       );
//     } catch (error) {
//       console.error("Error deleting job:", error);
//       alert("Unable to connect to server");
//     }
//   };

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <button
//         onClick={() => {
//           localStorage.removeItem("token");
//           window.location.reload();
//         }}
//       >
//         Logout
//       </button>

//       <p>Welcome to JobTrack!</p>

//       <h3>Add Job Application</h3>

//       <form onSubmit={handleAddJob}>
//         <div>
//           <label>Company</label>
//           <br />
//           <input
//             type="text"
//             value={company}
//             onChange={(e) => setCompany(e.target.value)}
//             placeholder="Enter company name"
//             required
//           />
//         </div>

//         <br />

//         <div>
//           <label>Job Role</label>
//           <br />
//           <input
//             type="text"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             placeholder="Enter job role"
//             required
//           />
//         </div>

//         <br />

//         <div>
//           <label>Status</label>
//           <br />

//           <select value={status} onChange={(e) => setStatus(e.target.value)}>
//             <option value="Applied">Applied</option>
//             <option value="Interview">Interview</option>
//             <option value="Selected">Selected</option>
//             <option value="Rejected">Rejected</option>
//           </select>
//         </div>

//         <br />

//         <div>
//           <label>Notes</label>
//           <br />

//           <textarea
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//             placeholder="Add notes"
//           />
//         </div>

//         <br />

//         <button type="submit">Add Application</button>
//       </form>
//       <div
//         style={{
//           display: "flex",
//           gap: "15px",
//           flexWrap: "wrap",
//           marginBottom: "30px",
//         }}
//       >
//         <div
//           style={{
//             border: "1px solid #ddd",
//             borderRadius: "10px",
//             padding: "15px",
//             minWidth: "120px",
//           }}
//         >
//           <h3>Total</h3>
//           <p>{jobs.length}</p>
//         </div>

//         <div
//           style={{
//             border: "1px solid #ddd",
//             borderRadius: "10px",
//             padding: "15px",
//             minWidth: "120px",
//           }}
//         >
//           <h3>Applied</h3>
//           <p>{jobs.filter((job) => job.status === "Applied").length}</p>
//         </div>

//         <div
//           style={{
//             border: "1px solid #ddd",
//             borderRadius: "10px",
//             padding: "15px",
//             minWidth: "120px",
//           }}
//         >
//           <h3>Interview</h3>
//           <p>{jobs.filter((job) => job.status === "Interview").length}</p>
//         </div>

//         <div
//           style={{
//             border: "1px solid #ddd",
//             borderRadius: "10px",
//             padding: "15px",
//             minWidth: "120px",
//           }}
//         >
//           <h3>Selected</h3>
//           <p>{jobs.filter((job) => job.status === "Selected").length}</p>
//         </div>

//         <div
//           style={{
//             border: "1px solid #ddd",
//             borderRadius: "10px",
//             padding: "15px",
//             minWidth: "120px",
//           }}
//         >
//           <h3>Rejected</h3>
//           <p>{jobs.filter((job) => job.status === "Rejected").length}</p>
//         </div>
//       </div>
//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search by company or role..."
//           style={{
//             padding: "10px",
//             width: "300px",
//             maxWidth: "100%",
//             borderRadius: "6px",
//             border: "1px solid #ccc",
//           }}
//         />
//       </div>
//       <h3>Your Applications</h3>

//       {jobs.length === 0 ? (
//         <p>No applications to display yet.</p>
//       ) : (
//         <div>
//           {jobs
//             .filter((job) => {
//               const search = searchTerm.toLowerCase();

//               return (
//                 job.company.toLowerCase().includes(search) ||
//                 job.role.toLowerCase().includes(search)
//               );
//             })
//             .map((job) => (
//               <div
//                 key={job._id}
//                 style={{
//                   border: "1px solid #ddd",
//                   borderRadius: "10px",
//                   padding: "15px",
//                   marginBottom: "15px",
//                   maxWidth: "500px",
//                 }}
//               >
//                 <h4>{job.company}</h4>

//                 <p>
//                   <strong>Role:</strong> {job.role}
//                 </p>

//                 {editingJobId === job._id ? (
//                   <div>
//                     <strong>Status:</strong>

//                     <select
//                       value={editStatus}
//                       onChange={(e) => setEditStatus(e.target.value)}
//                     >
//                       <option value="Applied">Applied</option>
//                       <option value="Interview">Interview</option>
//                       <option value="Selected">Selected</option>
//                       <option value="Rejected">Rejected</option>
//                     </select>

//                     <button onClick={() => handleEditJob(job._id)}>Save</button>

//                     <button onClick={() => setEditingJobId(null)}>
//                       Cancel
//                     </button>
//                   </div>
//                 ) : (
//                   <p>
//                     <strong>Status:</strong>{" "}
//                     <span
//                       style={{
//                         padding: "5px 10px",
//                         borderRadius: "15px",
//                         border: "1px solid #ccc",
//                         fontSize: "14px",
//                       }}
//                     >
//                       {job.status}
//                     </span>
//                   </p>
//                 )}

//                 <p>
//                   <strong>Notes:</strong> {job.notes || "No notes"}
//                 </p>
//                 <button
//                   onClick={() => {
//                     setEditingJobId(job._id);
//                     setEditStatus(job.status);
//                   }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => {
//                     const confirmed = window.confirm(
//                       "Are you sure you want to delete this application?",
//                     );

//                     if (confirmed) {
//                       handleDeleteJob(job._id);
//                     }
//                   }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  const [editingJobId, setEditingJobId] = useState(null);
  const [editStatus, setEditStatus] = useState("Applied");

  const [searchTerm, setSearchTerm] = useState("");

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.error(data.message);
          return;
        }

        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Add job
  const handleAddJob = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          company,
          role,
          status,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setJobs((previousJobs) => [data.job, ...previousJobs]);

      setCompany("");
      setRole("");
      setStatus("Applied");
      setNotes("");

      alert("Application added successfully!");
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Unable to connect to server");
    }
  };

  // Delete job
  const handleDeleteJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setJobs((previousJobs) =>
        previousJobs.filter((job) => job._id !== jobId),
      );

      alert("Application deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Unable to connect to server");
    }
  };

  // Update job
  const handleEditJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: editStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setJobs((previousJobs) =>
        previousJobs.map((job) => (job._id === jobId ? data.job : job)),
      );

      setEditingJobId(null);

      alert("Application updated successfully!");
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Unable to connect to server");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // Search
  const filteredJobs = jobs.filter((job) => {
    const search = searchTerm.toLowerCase();

    return (
      job.company.toLowerCase().includes(search) ||
      job.role.toLowerCase().includes(search)
    );
  });

  // Statistics
  const totalJobs = jobs.length;

  const appliedJobs = jobs.filter((job) => job.status === "Applied").length;

  const interviewJobs = jobs.filter((job) => job.status === "Interview").length;

  const selectedJobs = jobs.filter((job) => job.status === "Selected").length;

  const rejectedJobs = jobs.filter((job) => job.status === "Rejected").length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar */}
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-indigo-600">JobTrack</h1>
            <p className="text-xs text-slate-500">Job Application Tracker</p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Hero */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Your Job Dashboard
          </h2>

          <p className="mt-2 text-slate-500">
            Track your applications and stay organized during your job search.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Applications</p>
            <p className="mt-2 text-3xl font-bold">{totalJobs}</p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Applied</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {appliedJobs}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Interviews</p>
            <p className="mt-2 text-3xl font-bold text-yellow-600">
              {interviewJobs}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Selected</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {selectedJobs}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Rejected</p>
            <p className="mt-2 text-3xl font-bold text-red-600">
              {rejectedJobs}
            </p>
          </div>
        </div>

        {/* Add Application */}
        <div className="mb-10 rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Add Job Application</h3>

          <p className="mt-1 text-sm text-slate-500">
            Add a new company and track your application status.
          </p>

          <form
            onSubmit={handleAddJob}
            className="mt-6 grid gap-5 md:grid-cols-2"
          >
            <div>
              <label className="mb-2 block text-sm font-medium">Company</label>

              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Accenture"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Job Role</label>

              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Software Engineer"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Status</label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Notes</label>

              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Technical interview scheduled"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-indigo-700"
              >
                + Add Application
              </button>
            </div>
          </form>
        </div>

        {/* Applications */}
        <div>
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-semibold">Your Applications</h3>

              <p className="text-sm text-slate-500">
                {filteredJobs.length} application
                {filteredJobs.length !== 1 ? "s" : ""}
              </p>
            </div>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search company or role..."
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-72"
            />
          </div>

          {loading ? (
            <div className="rounded-2xl border bg-white p-12 text-center">
              <p className="text-slate-500">Loading applications...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="rounded-2xl border border-dashed bg-white p-12 text-center">
              <div className="text-4xl">📋</div>

              <h4 className="mt-4 text-lg font-semibold">
                No applications found
              </h4>

              <p className="mt-2 text-sm text-slate-500">
                Add your first job application above.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-semibold">{job.company}</h4>

                      <p className="mt-1 text-slate-500">{job.role}</p>
                    </div>

                    {!(editingJobId === job._id) && (
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          job.status === "Applied"
                            ? "bg-blue-100 text-blue-700"
                            : job.status === "Interview"
                              ? "bg-yellow-100 text-yellow-700"
                              : job.status === "Selected"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                      >
                        {job.status}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 rounded-lg bg-slate-50 p-4">
                    <p className="text-sm text-slate-600">
                      <span className="font-medium text-slate-800">Notes:</span>{" "}
                      {job.notes || "No notes added"}
                    </p>
                  </div>

                  {/* Edit section */}

                  {editingJobId === job._id ? (
                    <div className="mt-5">
                      <label className="mb-2 block text-sm font-medium">
                        Update Status
                      </label>

                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
                      >
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                      </select>

                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={() => handleEditJob(job._id)}
                          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                        >
                          Save
                        </button>

                        <button
                          onClick={() => setEditingJobId(null)}
                          className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-slate-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-5 flex gap-3">
                      <button
                        onClick={() => {
                          setEditingJobId(job._id);
                          setEditStatus(job.status);
                        }}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          const confirmed = window.confirm(
                            "Are you sure you want to delete this application?",
                          );

                          if (confirmed) {
                            handleDeleteJob(job._id);
                          }
                        }}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-6 text-center text-sm text-slate-500">
        JobTrack • Built with MERN Stack
      </footer>
    </div>
  );
}

export default Dashboard;
