-- Ensure RLS is enabled on the table
ALTER TABLE public.health_reports ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to prevent errors, then recreate them
DROP POLICY IF EXISTS "Users can insert their own health reports" ON public.health_reports;
CREATE POLICY "Users can insert their own health reports"
  ON public.health_reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own health reports" ON public.health_reports;
CREATE POLICY "Users can view their own health reports"
  ON public.health_reports FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own health reports" ON public.health_reports;
CREATE POLICY "Users can update their own health reports"
  ON public.health_reports FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own health reports" ON public.health_reports;
CREATE POLICY "Users can delete their own health reports"
  ON public.health_reports FOR DELETE
  USING (auth.uid() = user_id);
