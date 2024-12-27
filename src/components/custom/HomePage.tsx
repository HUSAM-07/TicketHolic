"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Ticket, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const features = [
  {
    title: "Secure Transactions",
    description: "End-to-end encrypted ticket transfers with fraud protection",
    icon: Shield,
  },
  {
    title: "Easy Reselling",
    description: "List and transfer tickets with just a few clicks",
    icon: Ticket,
  },
  {
    title: "Verified Users",
    description: "Trust & safety through user verification system",
    icon: Users,
  },
]

const developers = [
  {
    name: "Mohammed Husamuddin",
    id: "2021A7PS0150U",
    avatar: "/users/avatar.png"
  },
  {
    name: "Yashwanth Karuparthi",
    id: "2021A7PS0136U",
    avatar: "/users/avatar.png"
  },
  {
    name: "Mohammed Zubair Ahmed",
    id: "2021A7PS0211U",
    avatar: "/users/avatar.png"
  }
]

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Hero Section */}
      <section className="w-full max-w-5xl px-4 pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Your Trusted Ticket
            <span className="block text-primary">Marketplace</span>
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Buy, sell, and resell tickets securely. Join thousands of verified users in the most trusted ticket marketplace.
          </p>
          <div className="flex flex-col gap-4 min-[400px]:flex-row">
            <Button asChild size="lg">
              <Link href="/events">
                Browse Events <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/sell">Sell Tickets</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-muted/50">
        <div className="container px-4 py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <feature.icon className="h-12 w-12 mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by Users Section */}
      <section className="w-full bg-muted/50">
        <div className="container px-4 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">
                Trusted by Thousands
              </h2>
              <p className="text-muted-foreground max-w-[600px]">
                Join our growing community of event enthusiasts who trust TicketHolic for their ticket transactions.
              </p>
              <div className="flex gap-4 items-center pt-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Avatar key={i} className="border-2 border-background">
                      <AvatarImage src={`/users/avatar.png`} alt={`User ${i}`} />
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Over 10,000+ verified users
                </p>
              </div>
            </div>
            <div className="relative w-full max-w-[400px] aspect-square flex justify-center items-center">
              <Avatar className="w-64 h-64">
                <AvatarImage 
                  src="/users/avatar.png" 
                  alt="Featured User"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Developers Section */}
      <section className="w-full bg-gradient-to-b from-muted/50 to-background">
        <div className="container px-4 py-16">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter">
              Meet the Developers
            </h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              The team behind Ticketholic, Cloud 9
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            {developers.map((dev, index) => (
              <div 
                key={dev.id} 
                className="flex flex-col items-center space-y-4 p-6 rounded-xl border bg-card text-card-foreground shadow transition-all hover:shadow-lg"
              >
                <Avatar className="w-24 h-24">
                  <AvatarImage src={dev.avatar} alt={dev.name} />
                  <AvatarFallback>{dev.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-center space-y-1.5">
                  <h3 className="font-semibold text-lg">{dev.name}</h3>
                  <p className="text-sm text-muted-foreground">{dev.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
