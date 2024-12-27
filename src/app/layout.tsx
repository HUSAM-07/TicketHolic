import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/custom/Footer";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Menu, User, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthProvider } from '@/context/auth-context'
import Link from 'next/link'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ticketholic",
  description: "A platform for buying and selling tickets for events!",
};

function DesktopMenu() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="flex space-x-4">
        <NavigationMenuItem>
          <NavigationMenuLink className="hover:text-[#fc4707] transition-colors text-sm" href="/">
            <Ticket className="h-4 w-4" />
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="hover:underline text-sm" href="/docs">About</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="hover:underline text-sm" href="/events">Events</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="hover:underline text-sm" href="/user-tickets">My Tickets</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="ml-auto">
          <Button 
            asChild 
            variant="outline" 
            size="sm"
            className="text-xs px-4 py-1 rounded-full"
          >
            <NavigationMenuLink href="/auth">
              Sign In
            </NavigationMenuLink>
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MobileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="md:hidden p-2">
        <Menu className="h-6 w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-2xl">
        <DropdownMenuItem>
          <Link href="/" className="w-full inline-flex items-center">
            Home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/docs" className="w-full">About</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/events" className="w-full">Events</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/user-tickets" className="w-full">My Tickets</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            asChild 
            variant="outline" 
            className="w-full justify-start rounded-full border-purple-200 bg-purple-50 hover:bg-purple-100 hover:text-purple-900 text-purple-700 my-1"
          >
            <Link href="/auth" className="inline-flex items-center justify-start w-full">
              Sign In
              <User className="ml-auto h-4 w-4" />
            </Link>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <header className="flex justify-between items-center p-4 md:px-8 border-b border-gray-200">
            <nav className="container mx-auto">
              <DesktopMenu />
              <MobileMenu />
            </nav>
          </header>
          <main className="container mx-auto min-h-[calc(100vh-160px)] py-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
