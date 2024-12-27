import { Metadata } from "next"
import Image from "next/image"
import { Ticket } from "lucide-react"
import AuthForm from "@/components/auth/auth-form"

export const metadata: Metadata = {
  title: "Authentication - TicketHolic",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  return (
    <div className="container relative min-h-[calc(100vh-160px)] flex-col items-center justify-center grid lg:max-w-6xl lg:grid-cols-2 lg:gap-8 mx-auto py-8">
      <div className="relative hidden h-full min-h-[600px] flex-col bg-muted p-10 text-white lg:flex dark:border-r rounded-xl overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/authentication/event.jpg"
            alt="Event Background"
            fill
            className="object-cover brightness-[0.4] hover:scale-105 transition-transform duration-500"
            priority
            quality={100}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="relative z-20 flex items-center text-lg font-medium gap-2">
          <Ticket className="h-8 w-8" />
          TicketHolic
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &quot;This platform has revolutionized how I buy and sell event tickets. 
              The security features give me peace of mind every time.&quot;
            </p>
            <footer className="text-sm">Shahab Mohammed</footer>
          </blockquote>
        </div>
      </div>
      <div className="w-full max-w-[350px] mx-auto lg:max-w-none lg:p-8">
        <div className="flex w-full flex-col justify-center space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <AuthForm />
        </div>
      </div>
    </div>
  )
} 