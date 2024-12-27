"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, orderBy } from "firebase/firestore"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Calendar, Clock, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

type Ticket = {
  id: string
  eventId: string
  eventTitle: string
  eventDate: string
  eventTime: string
  eventLocation: string
  eventImageUrl: string
  eventPrice: string
  purchaseDate: {
    seconds: number
    nanoseconds: number
  }
  status: string
  ticketNumber: string
}

export default function UserTicketsPage() {
  const { user } = useAuth()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchTickets() {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        const ticketsRef = collection(db, "tickets")
        const q = query(
          ticketsRef,
          where("userId", "==", user.uid),
          orderBy("purchaseDate", "desc")
        )
        
        const querySnapshot = await getDocs(q)
        const ticketData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Ticket[]

        setTickets(ticketData)
      } catch (error) {
        console.error("Error fetching tickets:", error)
        toast({
          title: "Error",
          description: "Failed to fetch tickets. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [user, toast])

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">My Tickets</h1>
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">My Tickets</h1>
        <p className="text-muted-foreground">Please sign in to view your tickets.</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Tickets</h1>
      
      {tickets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No tickets purchased yet.</p>
          <Button asChild>
            <Link href="/events">Browse Events</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <Card key={ticket.id} className="flex flex-col">
              <CardHeader className="p-0">
                <div className="aspect-video relative bg-muted">
                  <Image
                    src={ticket.eventImageUrl}
                    alt={ticket.eventTitle}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{ticket.eventTitle}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {ticket.eventDate}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {ticket.eventTime}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    {ticket.eventLocation}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs">Ticket #{ticket.ticketNumber}</p>
                    <p className="text-xs">Price: {ticket.eventPrice}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full" variant="outline">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
