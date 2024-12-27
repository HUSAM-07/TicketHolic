import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "About - TicketHolic",
  description: "Learn more about TicketHolic and how it works.",
}

export default function AboutPage() {
  const features = [
    {
      title: "Secure Transactions",
      description: "All ticket transactions are encrypted and protected against fraud."
    },
    {
      title: "Verified Sellers",
      description: "Every seller on our platform goes through a strict verification process."
    },
    {
      title: "Instant Delivery",
      description: "Receive your tickets instantly after purchase via email."
    },
    {
      title: "Money-Back Guarantee",
      description: "Full refund if an event is cancelled or rescheduled."
    }
  ]

  return (
    <div className="container max-w-4xl mx-auto space-y-12 py-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          About TicketHolic
        </h1>
        <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
          Your trusted platform for buying and selling event tickets securely.
        </p>
      </div>

      {/* Mission Statement */}
      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
          <CardDescription>
            We&apos;re on a mission to make ticket buying and selling safe, simple, and accessible to everyone.
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-gray dark:prose-invert">
          <p>
            TicketHolic was founded with a simple goal: to create a trustworthy platform where event enthusiasts can buy and sell tickets without worry. We understand the frustration of fake tickets and scalping, which is why we&apos;ve built a secure marketplace that puts users first.
          </p>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </div>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Contact Section */}
      <Card>
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
          <CardDescription>
            Have questions? Our support team is here to help 24/7.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Email us at: support@ticketholic.com
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
