"use server";

import { createClient } from "../utils/supabase/server";

export async function createTask(formData) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("tasks").insert({
      tags: JSON.parse(formData.get("tags") || "[]"),
      activity_description: formData?.get("activity_description"),
      user_id: user?.id,
      hours: formData?.get("hours"),
      title: formData?.get("title"),
    });
  } catch (e) {
    console.log(e);
  }
}

export async function deleteTask({ record_id }) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const response = await supabase
      .from("tasks")
      .delete()
      .equal("id", record_id);
  } catch (e) {
    console.log(e);
  }
}
