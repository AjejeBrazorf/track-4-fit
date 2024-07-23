import type { PATHS } from './PATHS'

// Utility type to recursively extract all string values from an object
type ExtractPaths<T> = T extends object
  ? {
      [K in keyof T]-?: T[K] extends string ? T[K] : never | ExtractPaths<T[K]>
    }[keyof T]
  : never

// Use the utility type to get the union of all path strings
type PathName = ExtractPaths<typeof PATHS>
