/*
  # [Operation Name]
  Add 'medications' column to patients table

  ## Query Description: [This operation adds a new 'medications' text column to the 'patients' table to store information about a patient's current medications and health targets. This change is non-destructive and is required for the My Profile and AI Suggestions features to function correctly.]

  ## Metadata:
  - Schema-Category: ["Structural"]
  - Impact-Level: ["Low"]
  - Requires-Backup: [false]
  - Reversible: [true]

  ## Structure Details:
  - Table: public.patients
  - Column Added: medications (type: text)

  ## Security Implications:
  - RLS Status: [Enabled]
  - Policy Changes: [No]
  - Auth Requirements: [This column will be accessible to authenticated users for their own profile, based on existing RLS policies.]

  ## Performance Impact:
  - Indexes: [None]
  - Triggers: [None]
  - Estimated Impact: [Negligible performance impact. The table will be slightly larger, but queries should not be affected.]
*/

ALTER TABLE public.patients
ADD COLUMN medications TEXT;
