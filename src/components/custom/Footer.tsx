"use client"

import * as React from "react"
import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Footer = () => {
  return (
    <footer className="border-t border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left side - Copyright */}
          <div className="text-sm text-muted-foreground text-center md:text-left">
            © 2024 TicketHolic. All rights reserved.
          </div>

          {/* Right side - Social links and Legal dropdown */}
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/yourusername"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-75 transition-opacity"
            >
              <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-75 transition-opacity"
            >
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-75 transition-opacity"
            >
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              <span className="sr-only">LinkedIn</span>
            </Link>

            <div className="h-4 w-px bg-gray-200 mx-2" />

            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm text-muted-foreground hover:text-foreground">
                Legal
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/privacy" className="w-full">Privacy Policy</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/terms" className="w-full">Terms of Service</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
