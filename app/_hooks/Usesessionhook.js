"use client";

const DEFAULT_TTL = 50 * 60 * 1000; // 5 minutes

function isBrowser() {
  return typeof window !== "undefined";
}

export function useSessionCache(namespace, ttl = DEFAULT_TTL) {
  function getKey(key) {
    return `${namespace}:${key}`;
  }

  function get(key) {
    if (!isBrowser()) return null;

    try {
      const raw = sessionStorage.getItem(getKey(key));
      if (!raw) return null;

      const { data, ts } = JSON.parse(raw);
      if (Date.now() - ts > ttl) {
        sessionStorage.removeItem(getKey(key));
        return null;
      }

      return data;
    } catch {
      return null;
    }
  }

  function set(key, data) {
    if (!isBrowser()) return;

    try {
      sessionStorage.setItem(
        getKey(key),
        JSON.stringify({ data, ts: Date.now() }),
      );
    } catch {}
  }

  function remove(key) {
    if (!isBrowser()) return;
    sessionStorage.removeItem(getKey(key));
  }

  function clear() {
    if (!isBrowser()) return;
    Object.keys(sessionStorage)
      .filter((k) => k.startsWith(namespace + ":"))
      .forEach((k) => sessionStorage.removeItem(k));
  }

  return { get, set, remove, clear };
}
