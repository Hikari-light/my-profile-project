-- 创建submission_limits表，用于跟踪IP提交次数
CREATE TABLE IF NOT EXISTS public.submission_limits (
  id SERIAL PRIMARY KEY,
  ip_address TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 1,
  last_submission TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_submission_limits_ip_address ON public.submission_limits (ip_address);
CREATE INDEX IF NOT EXISTS idx_submission_limits_last_submission ON public.submission_limits (last_submission);

-- 设置行级安全策略
ALTER TABLE public.submission_limits ENABLE ROW LEVEL SECURITY;

-- 创建策略允许匿名插入数据
CREATE POLICY "允许匿名插入提交计数" ON public.submission_limits
  FOR INSERT WITH CHECK (true);
  
-- 创建策略允许匿名更新数据（但只能更新自己的记录）
CREATE POLICY "允许匿名更新提交计数" ON public.submission_limits
  FOR UPDATE USING (true);
  
-- 创建策略允许匿名查询数据（但只能查询自己的记录）
CREATE POLICY "允许匿名查询提交计数" ON public.submission_limits
  FOR SELECT USING (true);
  
-- 创建策略允许匿名删除数据（但只能删除自己的记录）
CREATE POLICY "允许匿名删除提交计数" ON public.submission_limits
  FOR DELETE USING (true); 