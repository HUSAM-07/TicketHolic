"use client"

import * as React from "react"
import { Calendar, Clock, MapPin, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"
import { db } from "@/lib/firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"

// Define categories type for better type safety
type EventCategory = "all" | "music" | "sports" | "theater" | "conference" | "food" | "entertainment"

// Mock data for events
const events = [
  {
    id: 1,
    title: "Summer Music Festival 2024",
    description: "Experience an unforgettable 3-day music festival featuring top artists from around the world. Enjoy multiple stages, food vendors, and amazing performances.",
    date: "July 15-17, 2024",
    time: "12:00 PM - 11:00 PM",
    location: "Central Park, New York",
    category: "music" as EventCategory,
    price: "From $199",
    imageUrl: "/events/conference.jpg",
    availableTickets: 156,
    tags: ["Live Music", "Festival", "Outdoor"],
    artists: ["Taylor Swift", "Ed Sheeran", "The Weeknd"]
  },
  {
    id: 2,
    title: "Tech Conference 2024",
    description: "Join industry leaders and innovators at the annual technology conference. Network with professionals, attend workshops, and discover the latest tech trends.",
    date: "September 5-6, 2024",
    time: "9:00 AM - 6:00 PM",
    location: "Convention Center, San Francisco",
    category: "conference" as EventCategory,
    price: "From $299",
    imageUrl: "/events/conference.jpg",
    availableTickets: 89,
    tags: ["Technology", "Networking", "Innovation"],
    speakers: ["Elon Musk", "Satya Nadella", "Mark Zuckerberg"]
  },
  {
    id: 3,
    title: "Broadway Show - Hamilton",
    description: "Don't miss the Tony Award-winning musical that has captivated audiences worldwide. Experience the revolutionary story of Alexander Hamilton.",
    date: "Every Tue-Sun",
    time: "7:30 PM",
    location: "Broadway Theater, NYC",
    category: "theater" as EventCategory,
    price: "From $149",
    imageUrl: "/events/conference.jpg",
    availableTickets: 42,
    tags: ["Musical", "Broadway", "Theater"],
    cast: ["Lin-Manuel Miranda", "Leslie Odom Jr."]
  },
  {
    id: 4,
    title: "NBA Finals 2024",
    description: "Witness basketball history in the making as the top teams battle for the championship. Experience the intensity and excitement of live NBA action.",
    date: "June 20, 2024",
    time: "8:00 PM",
    location: "Madison Square Garden, NYC",
    category: "sports" as EventCategory,
    price: "From $399",
    imageUrl: "/events/conference.jpg",
    availableTickets: 28,
    tags: ["Basketball", "NBA", "Championship"],
    teams: ["Lakers vs. Celtics"]
  },
  {
    id: 5,
    title: "Food & Wine Festival",
    description: "Indulge in a culinary journey featuring world-renowned chefs, wine tastings, cooking demonstrations, and gourmet food sampling.",
    date: "August 12-14, 2024",
    time: "11:00 AM - 9:00 PM",
    location: "Napa Valley, California",
    category: "food" as EventCategory,
    price: "From $129",
    imageUrl: "/events/conference.jpg",
    availableTickets: 175,
    tags: ["Food", "Wine", "Culinary"],
    chefs: ["Gordon Ramsay", "Wolfgang Puck"]
  },
  {
    id: 6,
    title: "Comic Con 2024",
    description: "The ultimate pop culture convention featuring celebrity panels, cosplay contests, exclusive merchandise, and sneak peeks at upcoming releases.",
    date: "October 8-10, 2024",
    time: "10:00 AM - 7:00 PM",
    location: "Javits Center, NYC",
    category: "entertainment" as EventCategory,
    price: "From $89",
    imageUrl: "/events/conference.jpg",
    availableTickets: 234,
    tags: ["Comics", "Gaming", "Pop Culture"],
    guests: ["Marvel", "DC", "Netflix"]
  }
]

export default function EventsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [selectedCategory, setSelectedCategory] = React.useState<EventCategory>("all")
  const [searchQuery, setSearchQuery] = React.useState("")

  // Filter events based on category and search query
  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handlePurchaseTicket = async (event: Event) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to purchase tickets",
        variant: "destructive",
      })
      return
    }

    try {
      // Create ticket data with all required fields
      const ticketData = {
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.time,
        eventLocation: event.location,
        eventImageUrl: event.imageUrl,
        eventPrice: event.price,
        purchaseDate: serverTimestamp(),
        userId: user.uid,
        userEmail: user.email,
        status: "active",
        ticketNumber: Math.random().toString(36).substr(2, 9).toUpperCase(),
      }

      // Add to Firestore with error handling
      const docRef = await addDoc(collection(db, "tickets"), ticketData)
      
      if (!docRef.id) {
        throw new Error("Failed to create ticket document")
      }

      toast({
        title: "Success!",
        description: "Ticket purchased successfully. Check My Tickets to view it.",
      })
    } catch (error) {
      console.error("Purchase error:", error)
      toast({
        title: "Purchase Failed",
        description: "Could not complete the purchase. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select 
            defaultValue="all" 
            onValueChange={(value) => setSelectedCategory(value as EventCategory)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="theater">Theater</SelectItem>
              <SelectItem value="conference">Conference</SelectItem>
              <SelectItem value="food">Food & Drink</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="flex flex-col overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
                  {event.availableTickets} tickets left
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {event.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {event.category}
                </p>
                <p className="text-sm font-medium">{event.price}</p>
              </div>
              <CardTitle className="mt-2 mb-1">{event.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {event.description}
              </CardDescription>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {event.date}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  {event.location}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => handlePurchaseTicket(event)}
                disabled={!user}
              >
                {user ? "Purchase Ticket" : "Sign in to Purchase"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Show message when no events match the filters */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No events found matching your criteria.</p>
        </div>
      )}

      {/* Load More Button */}
      <div className="flex justify-center">
        <Button variant="outline" size="lg">
          Load More Events
        </Button>
      </div>
    </div>
  )
}
