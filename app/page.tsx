"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { DroneVisual } from "@/components/drone-visual"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { setConfig } from "@/lib/config-store"

interface DroneConfig {
  drone_id: string
  drone_name: string
  light: string
  country: string
}

export default function ConfigPage() {
  const [config, setConfigState] = useState<DroneConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchConfig() {
      try {
        const droneId = process.env.NEXT_PUBLIC_DRONE_ID
        const apiUrl = process.env.NEXT_PUBLIC_API_URL

        const response = await fetch(`${apiUrl}/configs/${droneId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch config")
        }

        const data = await response.json()
        setConfigState(data)
        setConfig(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchConfig()
  }, [])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <Navigation />

      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <div className="inline-block mb-6">
              <Badge
                variant="secondary"
                className="px-6 py-2 text-sm font-semibold uppercase tracking-wider border border-primary/30"
              >
                System Configuration
              </Badge>
            </div>
            <h1 className="text-7xl md:text-8xl font-bold mb-6 glow-text">
              Drone
              <br />
              <span className="text-primary">Configuration</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Real-time drone system configuration and status monitoring
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl" />
              <Card className="relative border-primary/30 bg-card/50 backdrop-blur-sm glow-border">
                <CardContent className="p-8">
                  {loading && (
                    <div className="flex items-center justify-center py-20">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                        <div
                          className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-primary/50 rounded-full animate-spin"
                          style={{ animationDirection: "reverse", animationDuration: "1s" }}
                        />
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="py-12 text-center">
                      <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-destructive/10 border border-destructive/30">
                        <svg className="w-6 h-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                  {config && (
                    <div className="space-y-6">
                      <div className="flex items-start justify-between pb-6 border-b border-border/50">
                        <div>
                          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Drone ID
                          </p>
                          <Badge
                            variant="secondary"
                            className="font-mono text-lg px-4 py-2 bg-primary/10 border-primary/30"
                          >
                            {config.drone_id}
                          </Badge>
                        </div>
                        <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-lg shadow-primary/50" />
                      </div>

                      <div className="grid gap-6">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/30">
                          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Drone Name
                          </span>
                          <span className="text-xl font-bold">{config.drone_name}</span>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/30">
                          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Light Status
                          </span>
                          <Badge
                            variant={config.light === "on" ? "default" : "outline"}
                            className={config.light === "on" ? "shadow-lg shadow-primary/30" : ""}
                          >
                            {config.light.toUpperCase()}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/30">
                          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Country
                          </span>
                          <span className="text-xl font-bold">{config.country}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <DroneVisual />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-primary/20">TEMP</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
