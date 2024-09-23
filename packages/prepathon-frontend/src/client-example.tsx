import { useSession } from "@hono/auth-js/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import CustomLink from "@/components/ui/custom-link"
import type { Session } from "@auth/core/types"

function SessionData({ session }: { session: Session | null }) {
  if (session?.user) {
    return (
      <div className="w-full space-y-2 overflow-auto">
        <h2 className="text-xl font-bold">Current Session Data</h2>
        {Object.keys(session.user).length > 3 ? (
          <p>
            In this example, the whole session object is passed to the page,
            including the raw user object. Our recommendation is to{" "}
            <em>only pass the necessary fields</em> to the page, as the raw user
            object may contain sensitive information.
          </p>
        ) : (
          <p>
            In this example, only some fields in the user object is passed to
            the page to avoid exposing sensitive information.
          </p>
        )}
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    )
  }

  return (
    <p>
      No session data, please <em>Sign In</em> first.
    </p>
  )
}


const UpdateForm = () => {
  const { data: session, update } = useSession()
  const [name, setName] = useState(session?.user?.name ?? "")

  if (!session?.user) return null
  return (
    <>
      <h2 className="text-xl font-bold">Updating the session</h2>
      <form
        onSubmit={async () => {
          if (session) {
            const newSession = await update({
              ...session,
              user: { ...session.user, name },
            })
            console.log({ newSession })
          }
        }}
        className="flex items-center w-full max-w-sm space-x-2"
      >
        <Input
          type="text"
          placeholder={session.user.name ?? ""}
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
        <Button type="submit">Update</Button>
      </form>
    </>
  )
}

export default function ClientExample() {
  const { data: session, status } = useSession()
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">Client Side Rendering Usage</h1>
      <p>
        This page fetches session data client side using the{" "}
        <CustomLink href="https://nextjs.authjs.dev/react#usesession">
          <code>useSession</code>
        </CustomLink>{" "}
        React Hook.
      </p>
      
      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <SessionData session={session} />
      )}
      <UpdateForm />
    </div>
  )
}
