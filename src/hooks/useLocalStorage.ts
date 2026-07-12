import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

function readStoredValue<T>(
  key: string,
  initialValue: T,
  isValid?: (value: unknown) => value is T,
): T {
  if (typeof window === 'undefined') {
    return initialValue
  }

  try {
    const item = window.localStorage.getItem(key)
    if (item === null) {
      return initialValue
    }

    const parsed = JSON.parse(item)
    if (isValid && !isValid(parsed)) {
      return initialValue
    }

    return parsed as T
  } catch {
    return initialValue
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  isValid?: (value: unknown) => value is T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() =>
    readStoredValue(key, initialValue, isValid),
  )

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // localStorage may be unavailable (private mode, quota exceeded, etc.)
    }
  }, [key, value])

  return [value, setValue]
}
