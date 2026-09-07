import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://miuucikxekkpzkifgfqo.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pdXVjaWt4ZWtrcHpraWZnZnFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3NzQ5NDUsImV4cCI6MjEwNDM1MDk0NX0.-Xoj8hMVSug7yv4WVqHgWy-H6ePX8tjjv4D225iAANA";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes("your-project-ref") &&
  supabaseUrl.startsWith("http")
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;
