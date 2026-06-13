import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Without credentials the client is null and pages that need it show
// empty data instead of crashing the whole bundle at import time.
export const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

if (!supabase) {
  console.warn(
    "Supabase not configured — set VITE_SUPABASE_URL and VITE_SUPABASE_KEY in .env. Match/fixture data will be empty."
  );
}
