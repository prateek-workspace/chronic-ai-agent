/*
# [Corrective Migration] Make file_path Nullable
This migration alters the 'health_reports' table to allow the 'file_path' column to accept NULL values. This is necessary because the JSON import feature does not provide a file path, and the previous NOT NULL constraint was causing insertion errors.

## Query Description: [This operation modifies the table structure to relax a constraint. It is a non-destructive change and will not affect existing data. It makes the 'file_path' column optional.]

## Metadata:
- Schema-Category: ["Structural"]
- Impact-Level: ["Low"]
- Requires-Backup: [false]
- Reversible: [true]

## Structure Details:
- Table: public.health_reports
- Column: file_path
- Change: The NOT NULL constraint is removed.

## Security Implications:
- RLS Status: [No Change]
- Policy Changes: [No]
- Auth Requirements: [None]

## Performance Impact:
- Indexes: [No Change]
- Triggers: [No Change]
- Estimated Impact: [None]
*/

ALTER TABLE public.health_reports
ALTER COLUMN file_path DROP NOT NULL;
