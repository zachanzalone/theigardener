"use client"

import { useState, useEffect } from "react"
import { Disc3, Share2, Check, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"

interface Release {
  id: string
  artist: string
  title: string
  releaseDate: string
  genre: string
  type: "album" | "ep" | "single"
  streamingLink: string
  artistOrigin: string
}

export function UpcomingReleases() {
  const [releases, setReleases] = useState<Release[]>([])
  const [loading, setLoading] = useState(true)
  const [genreFilter, setGenreFilter] = useState("all")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    async function fetchReleases() {
      const { data, error } = await supabase
        .from("releases")
        .select(`
          id,
          title,
          type,
          release_date,
          bandcamp_url,
          soundcloud_url,
          youtube_url,
          artist_name,
          artists ( name, genres, city )
        `)
        .order("release_date", { ascending: false })
        .limit(20)

      if (error) {
        console.error("Error fetching releases:", error.message)
        setLoading(false)
        return
      }

      const mapped: Release[] = (data || []).map((row: any) => {
        const artistName = row.artists?.name ?? row.artist_name ?? "Unknown Artist"
        const genres: string[] = row.artists?.genres ?? []
        const streamingLink =
          row.bandcamp_url ?? row.youtube_url ?? row.soundcloud_url ?? "#"

        return {
          id: row.id,
          artist: artistName,
          title: row.title,
          releaseDate: row.release_date ?? "",
          genre: genres[0] ?? "other",
          type: (row.type as "album" | "ep" | "single") ?? "single",
          streamingLink,
          artistOrigin: row.artists?.city ?? "NJ",
        }
      })

      setReleases(mapped)
      setLoading(false)
    }

    fetchReleases()
  }, [])

  const shareRelease = async (release: Release) => {
    const shareText = `${release.artist} - "${release.title}" (${release.type.toUpperCase()}) — new release`
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${release.artist} - ${release.title}`,
          text: shareText,
          url: release.streamingLink,
        })
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          navigator.clipboard.writeText(`${shareText}\nListen: ${release.streamingLink}`)
          setCopiedId(release.id)
          setTimeout(() => setCopiedId(null), 2000)
        }
      }
    } else {
      navigator.clipboard.writeText(`${shareText}\nListen: ${release.streamingLink}`)
      setCopiedId(release.id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  const getDaysUntilRelease = (date: string) => {
    if (!mounted || !date) return null
    const [year, month, day] = date.split("-").map(Number)
    const releaseDate = new Date(year, month - 1, day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const diffDays = Math.ceil(
      (releaseDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    )
    return diffDays
  }

  const filteredReleases = releases.filter(
    (r) => genreFilter === "all" || r.genre === genreFilter
  )

  return (
    <div>
      <div className="mb-6">
        <Select value={genreFilter} onValueChange={setGenreFilter}>
          <SelectTrigger className="h-9 w-full text-sm">
            <SelectValue placeholder="Filter by genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            <SelectItem value="indie">Indie</SelectItem>
            <SelectItem value="punk">Punk</SelectItem>
            <SelectItem value="rock">Rock</SelectItem>
            <SelectItem value="hip-hop">Hip-Hop</SelectItem>
            <SelectItem value="electronic">Electronic</SelectItem>
            <SelectItem value="folk">Folk</SelectItem>
            <SelectItem value="soul">Soul / R&B</SelectItem>
            <SelectItem value="jazz">Jazz</SelectItem>
            <SelectItem value="metal">Metal</SelectItem>
            <SelectItem value="pop">Pop</SelectItem>
            <SelectItem value="experimental">Experimental</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {loading && (
          <div className="py-8 text-center">
            <p className="text-sm text-muted-foreground">Loading releases...</p>
          </div>
        )}

        {!loading && filteredReleases.map((release) => {
          const daysUntil = getDaysUntilRelease(release.releaseDate)
          return (
            <article
              key={release.id}
              className="group border-b border-border pb-3 last:border-0 last:pb-0"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-foreground">{release.artist}</h4>
                    <Badge variant="secondary" className="text-[9px] font-normal px-1.5 py-0">
                      {release.artistOrigin}
                    </Badge>
                    <Badge variant="outline" className="text-[9px] uppercase px-1.5 py-0">
                      {release.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground italic">{release.title}</p>
                  {daysUntil !== null && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {daysUntil <= 0
                        ? "Out now"
                        : daysUntil === 1
                        ? "Tomorrow"
                        : `In ${daysUntil} days`}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => shareRelease(release)}
                  >
                    {copiedId === release.id ? (
                      <Check className="h-3 w-3 text-primary" />
                    ) : (
                      <Share2 className="h-3 w-3" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                    <a href={release.streamingLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          )
        })}

        {!loading && filteredReleases.length === 0 && (
          <div className="py-8 text-center">
            <Disc3 className="h-8 w-8 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground">No releases to display</p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Add releases in the admin dashboard to see them here
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
