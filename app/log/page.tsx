"use client"

import { useState, type FormEvent } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { getConfig } from "@/lib/config-store"
import { useRouter } from "next/navigation"

export default function LogPage() {
  const [celsius, setCelsius] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    const config = getConfig()
    if (!config) {
      setError("Please view config first to load drone information")
      return
    }

    const temp = Number.parseFloat(celsius)
    if (isNaN(temp)) {
      setError("Please enter a valid temperature")
      return
    }

    setLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL

      const response = await fetch(`${apiUrl}/logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          drone_id: config.drone_id,
          drone_name: config.drone_name,
          country: config.country,
          celsius: temp,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit log")
      }

      setSuccess(true)
      setCelsius("")

      setTimeout(() => {
        router.push("/logs")
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <Navigation />

      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <div className="inline-block mb-6">
              <Badge
                variant="secondary"
                className="px-6 py-2 text-sm font-semibold uppercase tracking-wider border border-primary/30"
              >
                Data Input
              </Badge>
            </div>
            <h1 className="text-7xl md:text-8xl font-bold mb-6 glow-text">
              Temperature
              <br />
              <span className="text-primary">Log</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Record real-time temperature data
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl" />
            <Card className="relative border-primary/30 bg-card/50 backdrop-blur-sm glow-border">
              <CardContent className="p-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-4">
                    <Label htmlFor="celsius" className="text-lg font-semibold uppercase tracking-wider">
                      Temperature Reading
                    </Label>
                    <div className="relative">
                      <Input
                        id="celsius"
                        type="number"
                        step="0.1"
                        placeholder="25.5"
                        value={celsius}
                        onChange={(e) => setCelsius(e.target.value)}
                        required
                        className="text-4xl font-bold h-24 text-center bg-muted/30 border-primary/30 focus:border-primary focus:ring-primary/50"
                      />
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-4xl font-bold text-muted-foreground">
                        °C
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="p-6 rounded-xl bg-destructive/10 border border-destructive/30 animate-in fade-in slide-in-from-top-2">
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-6 h-6 text-destructive flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-destructive font-semibold">{error}</p>
                      </div>
                    </div>
                  )}

                  {success && (
                    <div className="p-6 rounded-xl bg-primary/10 border border-primary/30 animate-in fade-in slide-in-from-top-2">
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-6 h-6 text-primary flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-primary font-semibold">Temperature logged successfully! Redirecting...</p>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-16 text-lg font-bold uppercase tracking-wider shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
                    size="lg"
                  >
                    {loading ? (
                      <span className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        Submitting Data...
                      </span>
                    ) : (
                      <span className="flex items-center gap-3">
                        Submit Temperature
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
