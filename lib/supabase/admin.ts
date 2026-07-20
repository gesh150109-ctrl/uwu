import "server-only";

import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database.types.ts";

export function createAdminClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabaseSecretKey =
    process.env.SUPABASE_SECRET_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "Falta NEXT_PUBLIC_SUPABASE_URL.",
    );
  }

  if (!supabaseSecretKey) {
    throw new Error(
      "Falta SUPABASE_SECRET_KEY o SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  return createClient<Database>(
    supabaseUrl,
    supabaseSecretKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    },
  );
}