import { ref, computed } from "vue"

export interface AuthUser {
  name: string
  email: string
  avatar?: string
  plan: "free" | "pro"
  joined: string
  loggedAt: string
}

const STORAGE_KEY = "githubcms_user"

function loadUser(): AuthUser | null {
  try {
    if (typeof window === "undefined" || typeof localStorage === "undefined") return null
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function saveUser(user: AuthUser) {
  if (typeof window === "undefined" || typeof localStorage === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

const user = ref<AuthUser | null>(loadUser())
const isLoggedIn = computed(() => !!user.value)

function login(name: string, email: string, plan: "free" | "pro" = "free") {
  const u: AuthUser = {
    name, email,
    avatar: name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2),
    plan,
    joined: new Date().toISOString().slice(0, 10),
    loggedAt: new Date().toISOString(),
  }
  user.value = u
  saveUser(u)
}

function logout() {
  user.value = null
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    localStorage.removeItem(STORAGE_KEY)
  }
}

function getUser(): AuthUser | null {
  return user.value
}

function getDemoUser(): AuthUser {
  return {
    name: "Alex Johnson",
    email: "alex@githubcms.com",
    plan: "pro",
    joined: "2026-01-15",
    loggedAt: new Date().toISOString(),
  };
}

export function useAuth() {
  return { user, isLoggedIn, login, logout, getUser, demoUser: getDemoUser };
}
