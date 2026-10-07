CREATE TABLE public.contact_messages (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100), email text NOT NULL CHECK (char_length(email) <= 254), subject text NOT NULL CHECK (char_length(subject) BETWEEN 3 AND 150), message text NOT NULL CHECK (char_length(message) BETWEEN 10 AND 5000), created_at timestamptz NOT NULL DEFAULT now());
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.contact_messages IS 'Private portfolio inquiries. Server-only validated inserts; no public read access.';
CREATE INDEX contact_messages_email_created_idx ON public.contact_messages (email, created_at);