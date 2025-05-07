/*
 * A simple in-memory fetch cache with concurrency de-duplication.
 * - Uses Map for predictable iteration.
 * - No TTL: entries persist until manual invalidation.
 */

const cache = new Map<string, Blob>()
const inFlight = new Map<string, Promise<Blob>>()

/**
 * Fetches a resource and caches the Blob result.
 * @param url - The resource URL.
 * @param options - Standard Fetch API options.
 * @returns Promise resolving to Blob.
 */
export async function cfetch(url: string, options: RequestInit = {}): Promise<Blob> {
    // Return from cache if available
    if (cache.has(url)) {
        return cache.get(url)!
    }

    // If there's already a request in-flight, return its promise
    if (inFlight.has(url)) {
        return inFlight.get(url)!
    }

    // Launch new fetch
    const promise = (async () => {
        const response = await fetch(url, options)
        if (!response.ok) {
            throw new Error(
                `Network response was not ok: ${response.status} ${response.statusText}`,
            )
        }
        const blob = await response.blob()
        // Store in cache
        cache.set(url, blob)
        return blob
    })()

    inFlight.set(url, promise)

    try {
        return await promise
    } finally {
        inFlight.delete(url)
    }
}

/**
 * Clears the entire cache.
 */
export function clearCache() {
    cache.clear()
}

/**
 * Invalidates a specific URL from the cache.
 * @param url - The resource URL to remove.
 */
export function invalidateCache(url: string) {
    cache.delete(url)
}
