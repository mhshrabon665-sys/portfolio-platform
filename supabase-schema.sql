-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- 1. Portfolios table
CREATE TABLE portfolios (
  username       TEXT PRIMARY KEY,
  password_hash  TEXT NOT NULL,
  portfolio_data JSONB NOT NULL,
  photo_url      TEXT,
  theme_id       TEXT DEFAULT 'ocean',
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Index for fast username lookups
CREATE INDEX idx_portfolios_username ON portfolios(username);

-- 3. Storage bucket for profile photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-photos', 'portfolio-photos', true);

-- 4. Allow public read of photos
CREATE POLICY "Public photo read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-photos');

-- 5. Allow anyone to upload photos (API uses service role so this is fine)
CREATE POLICY "Service role upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'portfolio-photos');

CREATE POLICY "Service role update"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'portfolio-photos');

-- 6. Row Level Security — public can read portfolios, only service role writes
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read portfolios"
  ON portfolios FOR SELECT
  USING (true);

-- Writes go through API routes which use service role key (bypasses RLS)
