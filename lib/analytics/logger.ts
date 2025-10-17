/**
 * Query Logger
 * Logs query executions and errors
 */

export interface LogEntry {
  level: "info" | "warn" | "error"
  message: string
  timestamp: Date
  metadata?: Record<string, any>
}

export class QueryLogger {
  private logs: LogEntry[]
  private maxLogs: number

  constructor(maxLogs = 500) {
    this.logs = []
    this.maxLogs = maxLogs
  }

  /**
   * Log an info message
   */
  info(message: string, metadata?: Record<string, any>) {
    this.addLog("info", message, metadata)
  }

  /**
   * Log a warning
   */
  warn(message: string, metadata?: Record<string, any>) {
    this.addLog("warn", message, metadata)
  }

  /**
   * Log an error
   */
  error(message: string, metadata?: Record<string, any>) {
    this.addLog("error", message, metadata)
  }

  /**
   * Add a log entry
   */
  private addLog(level: LogEntry["level"], message: string, metadata?: Record<string, any>) {
    this.logs.push({
      level,
      message,
      timestamp: new Date(),
      metadata,
    })

    // Keep only recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs.shift()
    }

    // In production, send to external logging service
    if (level === "error") {
      console.error(`[QueryLogger] ${message}`, metadata)
    }
  }

  /**
   * Get recent logs
   */
  getRecentLogs(limit = 50): LogEntry[] {
    return this.logs.slice(-limit).reverse()
  }

  /**
   * Get logs by level
   */
  getLogsByLevel(level: LogEntry["level"]): LogEntry[] {
    return this.logs.filter((log) => log.level === level)
  }

  /**
   * Clear all logs
   */
  clear() {
    this.logs = []
  }
}
