"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  DollarSign,
  CreditCard,
  User,
  Settings,
  Menu,
  X,
  Bell,
  LogOut,
  ChevronDown,
  Moon,
  Sun,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children?: { title: string; href: string }[]
}

const navigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/contractor",
    icon: LayoutDashboard,
  },
  {
    title: "My Jobs",
    href: "/contractor/jobs",
    icon: Briefcase,
    children: [
      { title: "Active Jobs", href: "/contractor/jobs?status=active" },
      { title: "Job History", href: "/contractor/jobs?status=completed" },
      { title: "Rotation Queue", href: "/contractor/jobs/queue" },
    ],
  },
  {
    title: "My Schedule",
    href: "/contractor/schedule",
    icon: Calendar,
    children: [
      { title: "Calendar View", href: "/contractor/schedule" },
      { title: "Availability", href: "/contractor/schedule/availability" },
    ],
  },
  {
    title: "My Earnings",
    href: "/contractor/earnings",
    icon: DollarSign,
    children: [
      { title: "Invoices", href: "/contractor/earnings/invoices" },
      { title: "Payments", href: "/contractor/earnings/payments" },
      { title: "Tax Summary", href: "/contractor/earnings/tax" },
    ],
  },
  {
    title: "Subscription",
    href: "/contractor/subscription",
    icon: CreditCard,
    children: [
      { title: "Current Plan", href: "/contractor/subscription" },
      { title: "Coverage Area", href: "/contractor/subscription/coverage" },
      { title: "Billing History", href: "/contractor/subscription/billing" },
    ],
  },
  {
    title: "Profile",
    href: "/contractor/profile",
    icon: User,
    children: [
      { title: "Business Info", href: "/contractor/profile" },
      { title: "Certifications", href: "/contractor/profile/certifications" },
      { title: "Service Areas", href: "/contractor/profile/areas" },
    ],
  },
  {
    title: "Settings",
    href: "/contractor/settings",
    icon: Settings,
  },
]

export default function ContractorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // Mock contractor data - replace with actual auth
  const contractor = {
    id: "contractor-1",
    firstName: "John",
    lastName: "Smith",
    businessName: "Smith Restoration Services",
    email: "john@smithrestoration.com.au",
    avatar: null,
  }

  useEffect(() => {
    // Check authentication and role
    // For now, this is a placeholder
    const checkAuth = async () => {
      // TODO: Implement actual auth check
      // const session = await getSession()
      // if (!session || session.user.role !== 'CONTRACTOR') {
      //   router.push('/auth/login')
      // }
    }
    checkAuth()
  }, [router])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
    // TODO: Implement actual theme switching
  }

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    )
  }

  const isActive = (href: string) => {
    if (href === "/contractor") {
      return pathname === href
    }
    return pathname?.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform border-r bg-card transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b px-6">
            <Link href="/contractor" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
                NR
              </div>
              <div>
                <h2 className="text-sm font-bold text-foreground">NRPG Platform</h2>
                <p className="text-xs text-muted-foreground">Contractor Portal</p>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <div key={item.title}>
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      if (item.children) {
                        e.preventDefault()
                        toggleExpanded(item.title)
                      }
                    }}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </div>
                    {item.children && (
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          expandedItems.includes(item.title) && "rotate-180"
                        )}
                      />
                    )}
                  </Link>
                  {item.children && expandedItems.includes(item.title) && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block rounded-lg px-3 py-2 text-sm transition-colors",
                            isActive(child.href)
                              ? "bg-accent text-accent-foreground font-medium"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          )}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </ScrollArea>

          {/* User Profile */}
          <div className="border-t p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 px-2"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={contractor.avatar || undefined} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {contractor.firstName[0]}
                      {contractor.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 flex-col items-start text-left">
                    <p className="text-sm font-medium">
                      {contractor.firstName} {contractor.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {contractor.businessName}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/contractor/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/contractor/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/auth/logout")}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-4 ml-auto">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-600" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
