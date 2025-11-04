"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getConfig } from "@/lib/config-store"

interface LogEntry {
  id: string
  created: string
  country: string
  drone_id: string
  drone_name: string
  celsius: number
}

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalLogs, setTotalLogs] = useState(0)
  const logsPerPage = 12

  useEffect(() => {
    async function fetchLogs() {
      try {
        const config = getConfig()
        if (!config) {
          throw new Error("Please view config first to load drone information")
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL

        const response = await fetch(
          `${apiUrl}/logs/${config.drone_id}?page=${currentPage}&perPage=${logsPerPage}`
        )

        if (!response.ok) {
          throw new Error("Failed to fetch logs")
        }

        const data = await response.json()
        setTotalLogs(data.totalItems || 0)

        setLogs(data.items || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [currentPage])

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const totalPages = Math.ceil(totalLogs / logsPerPage)
  const startItem = (currentPage - 1) * logsPerPage + 1
  const endItem = Math.min(currentPage * logsPerPage, totalLogs)

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <Navigation />

      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="inline-block mb-6">
              <Badge
                variant="secondary"
                className="px-6 py-2 text-sm font-semibold uppercase tracking-wider border border-primary/30"
              >
                Data Archive
              </Badge>
            </div>
            <h1 className="text-7xl md:text-8xl font-bold mb-6 glow-text">
              Temperature
              <br />
              <span className="text-primary">Logs</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Historical temperature data from your drone monitoring system
            </p>
          </div>

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

                {!loading && !error && logs.length === 0 && (
                  <div className="py-20 text-center">
                    <div className="inline-flex flex-col items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-muted-foreground"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                      </div>
                      <p className="text-xl text-muted-foreground font-semibold">No logs found</p>
                      <p className="text-sm text-muted-foreground">Start by logging a temperature reading</p>
                    </div>
                  </div>
                )}

                {!loading && !error && logs.length > 0 && (
                  <>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-border/50 hover:bg-transparent">
                            <TableHead className="text-muted-foreground font-bold uppercase tracking-wider">
                              Created
                            </TableHead>
                            <TableHead className="text-muted-foreground font-bold uppercase tracking-wider">
                              Country
                            </TableHead>
                            <TableHead className="text-muted-foreground font-bold uppercase tracking-wider">
                              Drone ID
                            </TableHead>
                            <TableHead className="text-muted-foreground font-bold uppercase tracking-wider">
                              Drone Name
                            </TableHead>
                            <TableHead className="text-right text-muted-foreground font-bold uppercase tracking-wider">
                              Celsius
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {logs.map((log, index) => (
                            <TableRow
                              key={log.created}
                              className="border-border/30 hover:bg-muted/20 transition-colors"
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              <TableCell className="font-medium text-foreground">{formatDate(log.created)}</TableCell>
                              <TableCell className="text-foreground">{log.country}</TableCell>
                              <TableCell>
                                <Badge
                                  variant="secondary"
                                  className="font-mono text-xs bg-primary/10 border-primary/30"
                                >
                                  {log.drone_id}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-semibold text-foreground">{log.drone_name}</TableCell>
                              <TableCell className="text-right">
                                <span className="text-2xl font-bold text-primary">{log.celsius.toFixed(1)}°C</span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-border/30 pt-8">
                      <div className="text-sm text-muted-foreground">
                        Showing {startItem} to {endItem} of {totalLogs} logs
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="border-primary/30 hover:bg-primary/10 disabled:opacity-50"
                        >
                          Previous
                        </Button>

                        <div className="flex items-center gap-1">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(page)}
                              className={
                                currentPage === page
                                  ? "bg-primary text-primary-foreground"
                                  : "border-primary/30 hover:bg-primary/10"
                              }
                            >
                              {page}
                            </Button>
                          ))}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                          className="border-primary/30 hover:bg-primary/10 disabled:opacity-50"
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}