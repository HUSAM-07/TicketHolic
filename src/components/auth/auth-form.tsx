"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { auth } from "@/lib/firebase"
import { 
  signInWithPopup,
  GoogleAuthProvider,
  type AuthError
} from "firebase/auth"
import { useToast } from "@/hooks/use-toast"

export default function AuthForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      toast({
        title: "Success",
        description: "Successfully signed in with Google",
      })
      router.push('/user-tickets')
    } catch (error) {
      const authError = error as AuthError
      toast({
        title: "Error",
        description: authError.message || "Failed to sign in with Google",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome to TicketHolic
        </h1>
        <p className="text-sm text-muted-foreground">
          Sign in with your Google account to continue
        </p>
      </div>

      <Button 
        variant="outline" 
        type="button" 
        disabled={isLoading}
        onClick={handleGoogleLogin}
        className="w-full"
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        Sign in with Google
      </Button>
    </div>
  )
} 