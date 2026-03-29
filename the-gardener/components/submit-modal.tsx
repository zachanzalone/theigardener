"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PenLine, Send, Check, Loader2 } from "lucide-react"

type SubmissionType = "artist" | "band" | "venue" | "event" | "promoter" | "other"

interface FormData {
  type: SubmissionType | ""
  name: string
  email: string
  location: string
  website: string
  socialLinks: string
  description: string
  additionalInfo: string
}

export function SubmitModal() {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    type: "",
    name: "",
    email: "",
    location: "",
    website: "",
    socialLinks: "",
    description: "",
    additionalInfo: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset after showing success
    setTimeout(() => {
      setOpen(false)
      setIsSubmitted(false)
      setFormData({
        type: "",
        name: "",
        email: "",
        location: "",
        website: "",
        socialLinks: "",
        description: "",
        additionalInfo: "",
      })
    }, 2000)
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getPlaceholders = () => {
    switch (formData.type) {
      case "artist":
        return {
          name: "Artist / Stage Name",
          description: "Tell us about your music, genre, and influences...",
          additionalInfo: "Upcoming releases, recent achievements, etc.",
        }
      case "band":
        return {
          name: "Band Name",
          description: "Tell us about your band, members, and sound...",
          additionalInfo: "Upcoming shows, recent releases, etc.",
        }
      case "venue":
        return {
          name: "Venue Name",
          description: "Describe your venue, capacity, and the types of shows you host...",
          additionalInfo: "Booking contact, typical show nights, etc.",
        }
      case "event":
        return {
          name: "Event Name",
          description: "Tell us about your event, lineup, and what makes it special...",
          additionalInfo: "Date, ticket info, etc.",
        }
      case "promoter":
        return {
          name: "Promoter / Company Name",
          description: "Tell us about your work, the shows you book, and venues you work with...",
          additionalInfo: "Upcoming shows, artists you represent, etc.",
        }
      case "other":
        return {
          name: "Name",
          description: "Tell us what you do in the NJ music scene and how you'd like to be involved...",
          additionalInfo: "Any relevant links or additional context...",
        }
      default:
        return {
          name: "Name",
          description: "Tell us about yourself...",
          additionalInfo: "Any additional information...",
        }
    }
  }

  const placeholders = getPlaceholders()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="gap-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
        >
          <PenLine className="h-4 w-4" />
          Submit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle 
            className="font-display text-2xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Submit to The Gardener
          </DialogTitle>
          <DialogDescription>
            Are you a venue, band, or artist from New Jersey? Submit your project 
            to be featured in our coverage of the local music scene.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-12 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center mb-4">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Submission Received
            </h3>
            <p className="text-sm text-muted-foreground">
              Thank you for your submission. Our editorial team will review it shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Submission Type */}
            <div className="space-y-2">
              <Label htmlFor="type">I am submitting as a...</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select submission type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="artist">Solo Artist</SelectItem>
                  <SelectItem value="band">Band</SelectItem>
                  <SelectItem value="venue">Venue</SelectItem>
                  <SelectItem value="event">Event / Show</SelectItem>
                  <SelectItem value="promoter">Promoter</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.type && (
              <>
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">{placeholders.name}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder={placeholders.name}
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location (City, NJ)</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="e.g., Asbury Park, NJ"
                    required
                  />
                </div>

                {/* Website */}
                <div className="space-y-2">
                  <Label htmlFor="website">Website (optional)</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleChange("website", e.target.value)}
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                {/* Social Links */}
                <div className="space-y-2">
                  <Label htmlFor="socialLinks">Social Media Links</Label>
                  <Input
                    id="socialLinks"
                    value={formData.socialLinks}
                    onChange={(e) => handleChange("socialLinks", e.target.value)}
                    placeholder="Instagram, Bandcamp, Spotify, etc."
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">About</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder={placeholders.description}
                    rows={3}
                    required
                  />
                </div>

                {/* Additional Info */}
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information (optional)</Label>
                  <Textarea
                    id="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={(e) => handleChange("additionalInfo", e.target.value)}
                    placeholder={placeholders.additionalInfo}
                    rows={2}
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit for Review
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Submissions are reviewed by our editorial team. We{"'"}ll reach out 
                  if we{"'"}d like to feature your project.
                </p>
              </>
            )}
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
