/*
# [Operation Name]
Make file_path optional in health_reports

## Query Description: [This operation modifies the health_reports table to allow the file_path column to be NULL. This is a safe, non-destructive change required to fix an error when importing JSON data, as this feature does not involve file uploads. No data will be lost.]

## Metadata:
- Schema-Category: ["Structural"]
- Impact-Level: ["Low"]
- Requires-Backup: [false]
- Reversible: [true]

## Structure Details:
- Table: health_reports
- Column: file_path
- Change: Removing NOT NULL constraint

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
