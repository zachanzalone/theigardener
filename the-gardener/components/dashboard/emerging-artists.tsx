"use client"

import { useState, useEffect } from "react"
import { Users, Headphones, TrendingUp, Calendar, MapPin,
         RefreshCw, Share2, ExternalLink, Play, Check,
         ArrowUp, ArrowDown, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"

interface EmergingArtist {
  id: string
  name: string
  genre: string
  origin: string
  monthlyListeners: string
  recentRelease: string
  bio: string
  socialFollowers: string
  bandcampUrl: string
  growth: string
}

export function EmergingArtists() {
  const [artists, setArtists] = useState<EmergingArtist[]>([])
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  async function fetchArtists() {
    const { data, error } = await supabase
      .from("artists")
      .select(`
        id,
        name,
        city,
        genres,
        bio,
        instagram_handle,
        bandcamp_url,
        featured
      `)
      .eq("active", true)
      .eq("verified", true)
      .order("featured", { ascending: false })
      .order("name", { ascending: true })
      .limit(20)

    if (error) {
      console.error("Error fetching artists:", error.message)
      setLoading(false)
      return
    }

    const mapped: EmergingArtist[] = (data || []).map((row: any) => ({
      id: row.id,
      name: row.name,
      genre: (row.genres ?? []).join(", ") || "NJ Music",
      origin: row.city ?? "NJ",
      monthlyListeners: "—",
      recentRelease: "—",
      bio: row.bio ?? "Based in New Jersey.",
      socialFollowers: row.instagram_handle ? `@${row.instagram_handle}` : "—",
      bandcampUrl: row.bandcamp_url ?? "#",
      growth: "—",
    }))

    setArtists(mapped)
    setLoading(false)
  }

  useEffect(() => {
    fetchArtists()
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchArtists()
    setIsRefreshing(false)
  }

  const copyToClipboard = (artist: EmergingArtist) => {
    const outline = `# Feature: ${artist.name}\n\nGenre: ${artist.genre}\nFrom: ${artist.origin}, NJ\n\n${artist.bio}`
    navigator.clipboard.writeText(outline)
    setCopiedId(artist.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Left Column - Artist Profiles */}
      <div className="lg:col-span-5">
        <section className="border-t-2 border-foreground pt-4">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
            <h3
              className="font-display text-xl md:text-2xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Rising Artists
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-7 w-7 p-0"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>

          <div className="space-y-4">
            {loading && (
              <div className="py-8 text-center">
                <p className="text-sm text-muted-foreground">Loading artists...</p>
              </div>
            )}

            {!loading && artists.length === 0 && (
              <div className="py-8 text-center">
                <Users className="h-8 w-8 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-sm text-muted-foreground">No artists to display</p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Add verified artists in the admin dashboard
                </p>
              </div>
            )}

            {!loading && artists.map((artist) => (
              <article
                key={artist.id}
                className="group border-b border-border pb-4 last:border-0"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-foreground leading-tight">
                        {artist.name}
                      </h4>
                      <Badge variant="secondary" className="text-[9px] font-normal px-1.5 py-0">
                        {artist.origin}
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground italic">
                      {artist.genre}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground leading-snug">
                      {artist.bio}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      {artist.socialFollowers !== "—" && (
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {artist.socialFollowers}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(artist)}
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {copiedId === artist.id ? (
                        <Check className="h-3 w-3 text-primary" />
                      ) : (
                        <Share2 className="h-3 w-3" />
                      )}
                    </Button>
                    {artist.bandcampUrl !== "#" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <a href={artist.bandcampUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Center Column — placeholder for shows/trending (populated later) */}
      <div className="lg:col-span-4 space-y-8">
        <section className="border-t-2 border-foreground pt-4">
          <h3
            className="font-display text-xl md:text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Upcoming Shows
          </h3>
          <div className="py-6 text-center">
            <Calendar className="h-6 w-6 mx-auto text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">
              Add shows in the admin to see them here
            </p>
          </div>
        </section>
      </div>

      {/* Right Column — placeholder for videos */}
      <div className="lg:col-span-3">
        <section className="border-t-2 border-foreground pt-4">
          <h3
            className="font-display text-xl md:text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border"
            style={{ fontFamily: "var(--font-display)" }}
          >
            New Music Videos
          </h3>
          <div className="py-6 text-center">
            <Play className="h-6 w-6 mx-auto text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">
              YouTube integration coming soon
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
