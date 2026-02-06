import { supabase } from '../supabase'

export async function signUpAdmin(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signInAdmin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOutAdmin() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email)
  if (error) throw error
}

export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })
  if (error) throw error
}

// Check if email is authorized as admin
export async function isAdminUser(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('admin_users')
    .select('id')
    .eq('email', email)
    .single()

  if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows found
  return !!data
}
