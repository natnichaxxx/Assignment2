"use client"

interface DroneConfig {
  drone_id: string
  drone_name: string
  light: string
  country: string
}

let configCache: DroneConfig | null = null

export function setConfig(config: DroneConfig) {
  configCache = config
  if (typeof window !== "undefined") {
    localStorage.setItem("drone_config", JSON.stringify(config))
  }
}

export function getConfig(): DroneConfig | null {
  if (configCache) return configCache

  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("drone_config")
    if (stored) {
      configCache = JSON.parse(stored)
      return configCache
    }
  }

  return null
}
