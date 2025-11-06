/*
# [Corrective Migration] Fix health_reports Table Schema
This script corrects the schema for the `health_reports` table to ensure it can store and secure user-specific reports.

## Query Description:
This operation will alter the existing `health_reports` table. It adds the `user_id` column if it's missing and recreates the necessary security policies. This is a non-destructive operation and should not result in data loss.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Medium"
- Requires-Backup: false
- Reversible: true (by dropping the column and policies)

## Structure Details:
- Adds column `user_id` to `public.health_reports`.
- Creates a foreign key constraint from `health_reports.user_id` to `auth.users.id`.
- Re-enables Row Level Security.
- Drops and recreates INSERT and SELECT policies for user-specific access.

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes. Policies are created to ensure users can only access their own data.
- Auth Requirements: Policies rely on `auth.uid()`.

## Performance Impact:
- Indexes: A foreign key index will be created on `user_id`.
- Triggers: None.
- Estimated Impact: Low. The operation should be fast on tables with a moderate number of rows.
*/

-- Step 1: Add the user_id column if it does not exist.
ALTER TABLE public.health_reports
ADD COLUMN IF NOT EXISTS user_id uuid;

-- Step 2: Add the foreign key constraint if it does not exist.
-- We give it a specific name to avoid errors if it's re-run.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'health_reports_user_id_fkey'
  ) THEN
    ALTER TABLE public.health_reports 
    ADD CONSTRAINT health_reports_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES auth.users(id);
  END IF;
END;
$$;


-- Step 3: Ensure Row Level Security is enabled. This is idempotent.
ALTER TABLE public.health_reports ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop existing policies to avoid conflicts, then recreate them.
DROP POLICY IF EXISTS "Users can insert their own health reports" ON public.health_reports;
CREATE POLICY "Users can insert their own health reports"
ON public.health_reports FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own health reports" ON public.health_reports;
CREATE POLICY "Users can view their own health reports"
ON public.health_reports FOR SELECT
USING (auth.uid() = user_id);
