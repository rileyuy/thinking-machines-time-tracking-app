"use server";

import { createClient } from "../utils/supabase/server";

export async function handleSignIn(formData) {
  const supabase = await createClient();
  const email = formData.get("email");
  const password = formData.get("password");

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: error.message };
  }
  return { success: true };
}

export async function handleSignUp(formData) {
  const supabase = await createClient();
  const email = formData.get("email");
  const password = formData.get("password");

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    return { error: error.message };
  }
  return { success: true };
}

export async function handleSignOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
