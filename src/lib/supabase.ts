import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

const supabaseUrl = "https://xvsslgczdraxltbmwisi.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2c3NsZ2N6ZHJheGx0Ym13aXNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NjAzOTksImV4cCI6MjA2NTAzNjM5OX0.hcJqY29WuOQaj9JhEfpvdCFk5KyLb-ES6LZ0SDqJzdU";

console.log("初始化Supabase客户端:", { url: supabaseUrl, keyLength: supabaseKey?.length || 0 });

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false, // 禁用持久化会话，确保每次都是新会话
    autoRefreshToken: false, // 禁用自动刷新token
  },
});
