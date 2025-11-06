/*
# [Schema Correction] Add 'report_name' column to 'health_reports' table
This script adds the missing `report_name` column to the `public.health_reports` table. This is necessary for storing and retrieving the name of each generated health report.

## Query Description: [This operation adds a new `report_name` column to the `health_reports` table. It is a non-destructive operation and is safe to run on the existing table. It will not affect any existing data.]

## Metadata:
- Schema-Category: ["Structural"]
- Impact-Level: ["Low"]
- Requires-Backup: [false]
- Reversible: [true]

## Structure Details:
- Table: `public.health_reports`
- Column Added: `report_name` (type: `text`)

## Security Implications:
- RLS Status: [No Change]
- Policy Changes: [No]
- Auth Requirements: [None]

## Performance Impact:
- Indexes: [None]
- Triggers: [None]
- Estimated Impact: [Negligible performance impact.]
*/

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'health_reports'
        AND column_name = 'report_name'
    ) THEN
        ALTER TABLE public.health_reports ADD COLUMN report_name TEXT NOT NULL DEFAULT 'Health Report';
    END IF;
END $$;
