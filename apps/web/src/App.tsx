import React, { useState } from "react"
import { LoginForm } from "./components/LoginFrom"
import { RegisterForm } from "./components/RegisterForm"

export default function App() {
  const [view, setView] = useState<"login" | "register">("login")

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="z-10 w-full flex flex-col items-center gap-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <span>🚀 SaaS Starter Platform</span>
          </div>
        </div>
        {view === "login" ? (
          <LoginForm onSwitchToRegister={() => setView("register")} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setView("login")} />
        )}
      </div>
    </div>
  )
}
