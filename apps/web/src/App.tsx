import { useState, useEffect } from "react"
import { CreateProjectSchema } from "@my-saas-project/shared"
import type { CreateProjectDto } from "@my-saas-project/shared"

function App() {
  const [projects, setProjects] = useState<CreateProjectDto[]>([])
  const [name, setName] = useState("")
  const [statusMessage, setStatusMessage] = useState("")

  // 1. Fetch projects on load (GET)
  useEffect(() => {
    fetch("http://localhost:3001/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(() => setStatusMessage("Could not connect to API"))
  }, [])

  // 2. Handle Form Submission (POST)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newProject = {
      name: name,
      status: "active",
      description: "New project from frontend",
    }

    // --- SHARED VALIDATION START ---
    const result = CreateProjectSchema.safeParse(newProject)

    if (!result.success) {
      // If the name is too short, Zod tells us here before we even hit the network
      setStatusMessage(`Frontend Error: ${result.error.issues[0].message}`)
      return
    }
    // --- SHARED VALIDATION END ---

    try {
      const response = await fetch("http://localhost:3001/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data), // result.data is now fully typed
      })

      if (response.ok) {
        const createdProject = await response.json()
        setProjects([...projects, createdProject]) // Update list locally
        setName("") // Clear input
        setStatusMessage("Success! Project created.")
      } else {
        setStatusMessage("Backend Error: Validation failed on server.")
      }
    } catch (err) {
      setStatusMessage("Server is offline.")
    }
  }

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Agency Command Center</h1>

      {/* CREATE FORM */}
      <section
        style={{
          marginBottom: "40px",
          padding: "20px",
          border: "1px solid #eee",
        }}
      >
        <h3>Create New Project</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Project Name (min 3 chars)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: "8px", marginRight: "10px" }}
          />
          <button type="submit" style={{ padding: "8px 16px" }}>
            Create
          </button>
        </form>
        <p style={{ color: statusMessage.includes("Error") ? "red" : "green" }}>
          {statusMessage}
        </p>
      </section>

      {/* LIST VIEW */}
      <section>
        <h3>Active Projects</h3>
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <ul>
            {projects.map((p, i) => (
              <li key={i} style={{ marginBottom: "10px" }}>
                <strong>{p.name}</strong> — {p.status}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default App
