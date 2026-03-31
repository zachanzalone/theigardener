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
import { Calendar, TrendingUp, Users, X, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

// Social icon components (inline SVG — no extra package needed)
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.54V6.78a4.85 4.85 0 0 1-1.02-.09z" />
    </svg>
  )
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
    </svg>
  )
}

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

      {/* Welcome Banner */}
      {showBanner && (
        <div className="bg-primary text-primary-foreground py-2 px-4">
          <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Bell className="h-4 w-4 shrink-0" />
              <p className="text-sm truncate">
                <span className="font-semibold">New to The Gardener?</span>
                {" "}Subscribe for weekly NJ show and release updates.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="sm"
                variant="secondary"
                className="text-xs h-7"
                onClick={() => {
                  document.getElementById("newsletter-signup")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Subscribe
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

      {/* Masthead */}
      <header className="border-b-4 border-double border-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-2 border-b border-border text-xs">
            <span className="tracking-widest uppercase text-muted-foreground">Est. 2025</span>
            <span className="text-muted-foreground hidden sm:block">{currentDate}</span>
            <div className="flex items-center gap-3">
              <span className="tracking-widest uppercase text-muted-foreground hidden md:inline">
                Asbury Park Edition
              </span>
              <SubmitModal />
              <ThemeToggle />
            </div>
          </div>

          {/* Title */}
          <div className="py-6 text-center">
            <h1
              className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The Gardener
            </h1>
            <div className="mt-2 flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground flex-wrap">
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

      {/* Hero — minimal, no placeholder blog posts */}
      <section className="border-b-2 border-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
              NJ Shore Music
            </p>
            <h2
              className="font-display text-3xl md:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your guide to the Garden State music scene
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Shows, releases, and rising artists from Asbury Park and beyond.
              Updated constantly. Always local.
            </p>
          </div>
        </div>
      </section>

      {/* Section Navigation */}
      <nav className="border-b border-border sticky top-0 z-40 bg-background">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center justify-center gap-4 sm:gap-8 py-3 overflow-x-auto">
            <button
              onClick={() => setActiveSection("established")}
              className={cn(
                "flex items-center gap-1.5 text-xs sm:text-sm uppercase tracking-widest transition-colors whitespace-nowrap",
                activeSection === "established"
                  ? "text-foreground font-semibold border-b-2 border-primary pb-1"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Shows & Releases
            </button>
            <span className="text-border">|</span>
            <button
              onClick={() => setActiveSection("emerging")}
              className={cn(
                "flex items-center gap-1.5 text-xs sm:text-sm uppercase tracking-widest transition-colors whitespace-nowrap",
                activeSection === "emerging"
                  ? "text-foreground font-semibold border-b-2 border-primary pb-1"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Rising Artists
            </button>
            <span className="text-border">|</span>
            <button
              onClick={() => setActiveSection("calendar")}
              className={cn(
                "flex items-center gap-1.5 text-xs sm:text-sm uppercase tracking-widest transition-colors whitespace-nowrap",
                activeSection === "calendar"
                  ? "text-foreground font-semibold border-b-2 border-primary pb-1"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Calendar
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 md:px-8">

          {activeSection === "established" && (
            <>
              <div className="text-center mb-6 sm:mb-8 pb-4 border-b-2 border-foreground">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  This Week in New Jersey
                </p>
                <h2
                  className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Shows, Releases & What{"'"}s Trending
                </h2>
              </div>

              {/* Responsive grid: stacks on mobile, 3 cols on large screens */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
                {/* Shows — full width mobile, left col desktop */}
                <div className="md:col-span-1 lg:col-span-5">
                  <div className="border-t-2 border-foreground pt-4">
                    <h3
                      className="font-display text-xl md:text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Upcoming Shows
                    </h3>
                    <UpcomingShows />
                  </div>
                </div>

                {/* Trending & Videos — full width mobile, center col desktop */}
                <div className="md:col-span-1 lg:col-span-4 space-y-6 sm:space-y-8">
                  <div className="border-t-2 border-foreground pt-4">
                    <h3
                      className="font-display text-xl md:text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Trending This Week
                    </h3>
                    <TrendingSongs />
                  </div>
                  <div className="border-t border-border pt-4">
                    <h3
                      className="font-display text-xl md:text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      New Music Videos
                    </h3>
                    <NewMusicVideos />
                  </div>
                </div>

                {/* Releases — full width mobile, right col desktop */}
                <div className="md:col-span-2 lg:col-span-3">
                  <div className="border-t-2 border-foreground pt-4">
                    <h3
                      className="font-display text-xl md:text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border"
                      style={{ fontFamily: "var(--font-display)" }}
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
              <div className="text-center mb-6 sm:mb-8 pb-4 border-b-2 border-foreground">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Discover the Next Wave
                </p>
                <h2
                  className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Rising Talent from the Garden State
                </h2>
                <p className="mt-3 text-sm text-muted-foreground max-w-2xl mx-auto px-4">
                  Small to mid-sized artists building momentum across New Jersey{"'"}s vibrant local scene.
                </p>
              </div>
              <EmergingArtists />
            </>
          )}

          {activeSection === "calendar" && (
            <>
              <div className="text-center mb-6 sm:mb-8 pb-4 border-b-2 border-foreground">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Plan Your Month
                </p>
                <h2
                  className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  NJ Music Calendar
                </h2>
                <p className="mt-3 text-sm text-muted-foreground max-w-2xl mx-auto px-4">
                  All shows and releases from the Garden State in one place.
                </p>
              </div>
              <CalendarView />
            </>
          )}

        </div>
      </main>

      {/* Newsletter */}
      <NewsletterSignup />

      {/* Footer */}
      <footer className="border-t-2 border-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-8">
          <div className="text-center">
            <h3
              className="font-display text-2xl md:text-3xl tracking-tight mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The Gardener
            </h3>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">
              Covering NJ Music — Asbury Park &amp; Beyond
            </p>

            {/* City list */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs text-muted-foreground flex-wrap mb-6">
              <span>Asbury Park</span>
              <span className="text-primary">*</span>
              <span>New Brunswick</span>
              <span className="text-primary">*</span>
              <span>Hoboken</span>
              <span className="text-primary">*</span>
              <span>Jersey City</span>
            </div>

            {/* Social icons */}
            <div className="flex items-center justify-center gap-5">
              <a
                href="https://instagram.com/thegardenernj"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com/@thegardenernj"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/@thegardenernj"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <YouTubeIcon className="h-5 w-5" />
              </a>
            </div>

          </div>
        </div>
      </footer>

      {/* Music Player */}
      <MusicPlayer />

    </div>
  )
}
