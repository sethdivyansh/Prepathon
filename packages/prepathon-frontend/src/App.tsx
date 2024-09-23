import ClientExample from "./client-example"
import { SessionProvider } from "@hono/auth-js/react"

import Navbar from "@/components/layout/navbar"

export default function App() {

  return (
    <SessionProvider>
      <div className="flex flex-col justify-between w-full h-full min-h-screen">
        <Navbar />
        <main className="flex-auto w-full max-w-3xl px-4 py-4 mx-auto sm:px-6 md:py-6">
          <ClientExample />
        </main>
      </div>
    </SessionProvider>
  )
}
