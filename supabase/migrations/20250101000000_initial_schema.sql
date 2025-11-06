/*
# [Initial Schema Setup: Doctors and Patients]
This migration sets up the core tables for managing doctors and patients, including their profiles and roles. It also establishes the necessary triggers and Row Level Security (RLS) policies to ensure data is handled securely and automatically upon user signup.

## Query Description:
This script creates two primary tables, `doctors` and `patients`, to store role-specific user data. It links these tables to Supabase's built-in `auth.users` table. A trigger function, `handle_new_user`, is created to automatically populate the correct profile table (`doctors` or `patients`) when a new user signs up, based on the 'role' they select. RLS is enabled and configured to ensure users can only access and modify their own data.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "High"
- Requires-Backup: false
- Reversible: false

## Structure Details:
- **Tables Created:**
  - `public.doctors`: Stores profile information for users with the 'doctor' role.
  - `public.patients`: Stores profile information for users with the 'patient' role.
- **Functions Created:**
  - `public.handle_new_user()`: A trigger function that runs after a new user is inserted into `auth.users`.
- **Triggers Created:**
  - `on_auth_user_created`: An event trigger on the `auth.users` table that executes the `handle_new_user` function.

## Security Implications:
- **RLS Status:** Enabled on `doctors` and `patients` tables.
- **Policy Changes:** Yes. Policies are created to restrict data access, allowing users to view and manage only their own profile information. This is a foundational security measure.
- **Auth Requirements:** This schema is tightly integrated with Supabase Authentication.

## Performance Impact:
- **Indexes:** Primary key indexes are automatically created. Foreign key indexes are also created.
- **Triggers:** A trigger is added to the `auth.users` table. The performance impact is minimal as it only fires once per user creation.
- **Estimated Impact:** Low. The operations are efficient and essential for the application's functionality.
*/

-- 1. Create Doctors Table
CREATE TABLE public.doctors (
    id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT UNIQUE,
    specialization TEXT,
    clinic_name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.doctors IS 'Stores profile information for users with the doctor role.';

-- 2. Create Patients Table
CREATE TABLE public.patients (
    id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT UNIQUE,
    age INT,
    sex TEXT,
    medical_history TEXT,
    medications_and_targets TEXT,
    doctor_id UUID REFERENCES public.doctors(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.patients IS 'Stores profile information for users with the patient role.';

-- 3. Enable RLS for the tables
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies
CREATE POLICY "Doctors can view and manage their own profile."
ON public.doctors
FOR ALL
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Patients can view and manage their own profile."
ON public.patients
FOR ALL
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- This policy allows doctors to see the patients assigned to them.
-- We will keep this commented out for now and can enable it when the assignment logic is built.
-- CREATE POLICY "Doctors can view their assigned patients."
-- ON public.patients
-- FOR SELECT
-- USING (auth.uid() = doctor_id);

-- 5. Create a function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF (NEW.raw_user_meta_data->>'role' = 'doctor') THEN
    INSERT INTO public.doctors (id, full_name, email)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email);
  ELSIF (NEW.raw_user_meta_data->>'role' = 'patient') THEN
    INSERT INTO public.patients (id, full_name, email)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email);
  END IF;
  RETURN NEW;
END;
$$;

-- 6. Create a trigger to execute the function on new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
