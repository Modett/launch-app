import { createClient } from "@supabase/supabase-js";

// Vercel automatically loads environment variables, no dotenv needed in production
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing required environment variables: SUPABASE_URL and SUPABASE_ANON_KEY",
  );
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
