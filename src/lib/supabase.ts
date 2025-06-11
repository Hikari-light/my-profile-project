import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

const supabaseUrl = "";
const supabaseKey = "";

console.log("初始化Supabase客户端:", { url: supabaseUrl, keyLength: supabaseKey?.length || 0 });

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false, // 禁用持久化会话，确保每次都是新会话
    autoRefreshToken: false, // 禁用自动刷新token
  },
});
