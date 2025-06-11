import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log("初始化Supabase客户端:", { url: supabaseUrl, keyLength: supabaseKey?.length || 0 });

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false, // 禁用持久化会话，确保每次都是新会话
    autoRefreshToken: false, // 禁用自动刷新token
  },
});
