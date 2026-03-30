"use client"

import { useState } from "react"
import { UpcomingShows } from "@/components/dashboard/upcoming-shows"
import { UpcomingReleases } from "@/components/dashboard/upcoming-releases"
import { TrendingSongs } from "@/components/dashboard/trending-songs"
import { NewMusicVideos } from "@/components/dashboard/new-music-videos"
import { EmergingArtists } from "@/components/dashboard/emerging-artists"
import { CalendarView } from "@/components/dashboard/calendar-view"
import { MusicPlayer } from "@/components/dashboard/music-player"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { SubmitModal } from "@/components/submit-modal"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { Calendar, FileText, TrendingUp, Users, X, Bell } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type Section = "established" | "emerging" | "calendar"

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<Section>("established")
  const [showBanner, setShowBanner] = useState(true)

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Welcome Banner - Conversion Optimization */}
      {showBanner && (
        <div className="bg-primary text-primary-foreground py-2 px-4">
          <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Bell className="h-4 w-4 shrink-0" />
              <p className="text-sm">
                <span className="font-semibold">New to The Gardener?</span>
                {" "}Subscribe to get weekly updates on NJ shows and releases.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="secondary"
                className="text-xs h-7"
                onClick={() => {
                  const newsletter = document.getElementById('newsletter-signup')
                  newsletter?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Subscribe Now
              </Button>
              <button 
                onClick={() => setShowBanner(false)}
                className="p-1 hover:bg-primary-foreground/10 rounded"
                aria-label="Dismiss banner"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Newspaper Masthead */}
      <header className="border-b-4 border-double border-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-2 border-b border-border text-xs">
            <span className="tracking-widest uppercase text-muted-foreground">
              Est. 2026
            </span>
            <span className="text-muted-foreground">{currentDate}</span>
            <div className="flex items-center gap-4">
              <span className="tracking-widest uppercase text-muted-foreground hidden sm:inline">
                NJ Shore Edition
              </span>
              <SubmitModal />
              <ThemeToggle />
            </div>
          </div>
          
          {/* Masthead Title */}
          <div className="py-6 text-center">
            <h1 
              className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              The Gardener
            </h1>
            <div className="mt-2 flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>Asbury Park</span>
              <span className="text-primary">*</span>
              <span>New Brunswick</span>
              <span className="text-primary">*</span>
              <span>Hoboken</span>
              <span className="text-primary">*</span>
              <span>Jersey City</span>
            </div>
          </div>
        </div>
      </header>

/*      {/* Featured Articles Section */}
      <section className="border-b-2 border-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Feature */}
            <div className="md:col-span-2 border-r-0 md:border-r border-border md:pr-6">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-xs uppercase tracking-widest text-primary font-semibold">Featured</span>
              </div>
              <h2 
                className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                NJ Music Scene Continues to Thrive
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                From basement shows in New Brunswick to sold-out nights at the Stone Pony, 
                the Garden State{"'"}s music community remains one of the most vibrant in the country. 
                Connect a data source to see the latest coverage.
              </p>
              <div className="aspect-[16/9] bg-muted rounded flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Featured article placeholder</p>
                </div>
              </div>
            </div>

            {/* Secondary Stories */}
            <div className="space-y-6">
              <div className="pb-6 border-b border-border">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Latest</span>
                <h3 
                  className="font-display text-xl font-bold mt-2 leading-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Local Venues Report Record Attendance
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Asbury Park venues see surge in concert-goers as summer approaches.
                </p>
              </div>
              <div className="pb-6 border-b border-border">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Profile</span>
                <h3 
                  className="font-display text-xl font-bold mt-2 leading-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Rising Stars: The Next Generation
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Meet the emerging artists shaping NJ{"'"}s sound.
                </p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Opinion</span>
                <h3 
                  className="font-display text-xl font-bold mt-2 leading-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Why the Shore Sound Endures
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  A reflection on decades of musical heritage.
                </p>
              </div>
            </div>
          </div>
        </div>
*/      </section>
*/
      {/* Section Navigation */}
      <nav className="border-b border-border sticky top-0 z-40 bg-background">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center justify-center gap-8 py-3">
            <button
              onClick={() => setActiveSection("established")}
              className={cn(
                "flex items-center gap-2 text-sm uppercase tracking-widest transition-colors",
                activeSection === "established" 
                  ? "text-foreground font-semibold border-b-2 border-primary pb-1" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <TrendingUp className="h-4 w-4" />
              Shows & Releases
            </button>
            <span className="text-border">|</span>
            <button
              onClick={() => setActiveSection("emerging")}
              className={cn(
                "flex items-center gap-2 text-sm uppercase tracking-widest transition-colors",
                activeSection === "emerging" 
                  ? "text-foreground font-semibold border-b-2 border-primary pb-1" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Users className="h-4 w-4" />
              Rising Artists
            </button>
            <span className="text-border">|</span>
            <button
              onClick={() => setActiveSection("calendar")}
              className={cn(
                "flex items-center gap-2 text-sm uppercase tracking-widest transition-colors",
                activeSection === "calendar" 
                  ? "text-foreground font-semibold border-b-2 border-primary pb-1" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Calendar className="h-4 w-4" />
              Calendar
            </button>
            <span className="text-border">|</span>
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm uppercase tracking-widest transition-colors text-muted-foreground hover:text-foreground"
            >
              <FileText className="h-4 w-4" />
              Blog
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {activeSection === "established" && (
            <>
              {/* Section Header */}
              <div className="text-center mb-8 pb-4 border-b-2 border-foreground">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  This Week in New Jersey
                </p>
                <h2 
                  className="font-display text-3xl md:text-4xl font-bold tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Shows, Releases & What{"'"}s Trending
                </h2>
              </div>

              {/* Three Column Layout */}
              <div className="grid lg:grid-cols-12 gap-8">
                {/* Left Column - Upcoming Shows */}
                <div className="lg:col-span-5">
                  <div className="border-t-2 border-foreground pt-4">
                    <h3 
                      className="font-display text-xl md:text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Upcoming Shows
                    </h3>
                    <UpcomingShows />
                  </div>
                </div>

                {/* Center Column - Trending & Releases */}
                <div className="lg:col-span-4 space-y-8">
                  <div className="border-t-2 border-foreground pt-4">
                    <h3 
                      className="font-display text-xl md:text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Trending This Week
                    </h3>
                    <TrendingSongs />
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <h3 
                      className="font-display text-xl md:text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      New Music Videos
                    </h3>
                    <NewMusicVideos />
                  </div>
                </div>

                {/* Right Column - Releases */}
                <div className="lg:col-span-3">
                  <div className="border-t-2 border-foreground pt-4">
                    <h3 
                      className="font-display text-xl md:text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      New Releases
                    </h3>
                    <UpcomingReleases />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSection === "emerging" && (
            <>
              {/* Section Header */}
              <div className="text-center mb-8 pb-4 border-b-2 border-foreground">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Discover the Next Wave
                </p>
                <h2 
                  className="font-display text-3xl md:text-4xl font-bold tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Rising Talent from the Garden State
                </h2>
                <p className="mt-3 text-sm text-muted-foreground max-w-2xl mx-auto">
                  Small to mid-sized artists building momentum across New Jersey{"'"}s vibrant local scene. 
                  From basement shows to opening slots, these are the acts to watch.
                </p>
              </div>

              <EmergingArtists />
            </>
          )}

          {activeSection === "calendar" && (
            <>
              {/* Section Header */}
              <div className="text-center mb-8 pb-4 border-b-2 border-foreground">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Plan Your Month
                </p>
                <h2 
                  className="font-display text-3xl md:text-4xl font-bold tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  NJ Music Calendar
                </h2>
                <p className="mt-3 text-sm text-muted-foreground max-w-2xl mx-auto">
                  All shows and releases from the Garden State in one place. 
                  Click any date to see what{"'"}s happening.
                </p>
              </div>

              <CalendarView />
            </>
          )}
        </div>
      </main>

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Footer */}
      <footer className="border-t-2 border-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-8">
          <div className="text-center">
            <h3 
              className="font-display text-2xl md:text-3xl tracking-tight mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              The Gardener
            </h3>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">
              Covering New Jersey Music Since 2020
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span>Asbury Park</span>
              <span className="text-primary">*</span>
              <span>New Brunswick</span>
              <span className="text-primary">*</span>
              <span>Hoboken</span>
              <span className="text-primary">*</span>
              <span>Jersey City</span>
            </div>
            <p className="mt-6 text-xs text-muted-foreground/60">
              Connect a data source to populate this dashboard with real show dates, releases, and events.
            </p>
          </div>
        </div>
      </footer>

      {/* Music Player */}
      <MusicPlayer />
    </div>
  )
}
