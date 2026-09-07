-- ==============================================================================
-- JANTA SUNWAI (जनता सुनुवाइ) - SUPABASE DATABASE SCHEMA
-- Official Citizen Grievance Redressal System
-- Hon. Prabhu Sah | Aam Janata Party (AJP) | Personal Secretariat Portal
-- ==============================================================================

-- 1. Create sequence for human-readable tracking ticket numbers
CREATE SEQUENCE IF NOT EXISTS janta_sunwai_ticket_seq START 1001;

-- 2. Create the main Janta Sunwai tickets table
CREATE TABLE IF NOT EXISTS janta_sunwai_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_code VARCHAR(32) UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    municipality TEXT NOT NULL,
    ward VARCHAR(10) NOT NULL,
    category TEXT NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Received',
    status_ne TEXT NOT NULL DEFAULT 'व्यक्तिगत सचिवालयमा दर्ता भयो',
    estimated_resolution VARCHAR(100) NOT NULL DEFAULT '3-5 Working Days',
    priority VARCHAR(20) NOT NULL DEFAULT 'Normal',
    assigned_officer TEXT,
    official_remarks TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Automatic Ticket Code Generator Trigger
-- Formats reference codes as: AJP-RT-[YEAR]-[SEQUENTIAL_NUMBER], e.g., AJP-RT-2026-1001
CREATE OR REPLACE FUNCTION generate_janta_sunwai_ticket_code()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.ticket_code IS NULL OR NEW.ticket_code = '' THEN
        NEW.ticket_code := 'AJP-RT-' || TO_CHAR(CURRENT_DATE, 'YYYY') || '-' || LPAD(nextval('janta_sunwai_ticket_seq')::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_set_ticket_code ON janta_sunwai_tickets;
CREATE TRIGGER trg_set_ticket_code
BEFORE INSERT ON janta_sunwai_tickets
FOR EACH ROW
EXECUTE FUNCTION generate_janta_sunwai_ticket_code();

-- 4. Automatic updated_at timestamp trigger
CREATE OR REPLACE FUNCTION set_janta_sunwai_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_set_updated_at ON janta_sunwai_tickets;
CREATE TRIGGER trg_set_updated_at
BEFORE UPDATE ON janta_sunwai_tickets
FOR EACH ROW
EXECUTE FUNCTION set_janta_sunwai_updated_at();

-- 5. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_janta_sunwai_ticket_code ON janta_sunwai_tickets (ticket_code);
CREATE INDEX IF NOT EXISTS idx_janta_sunwai_phone ON janta_sunwai_tickets (phone);
CREATE INDEX IF NOT EXISTS idx_janta_sunwai_municipality ON janta_sunwai_tickets (municipality);
CREATE INDEX IF NOT EXISTS idx_janta_sunwai_status ON janta_sunwai_tickets (status);
CREATE INDEX IF NOT EXISTS idx_janta_sunwai_created_at ON janta_sunwai_tickets (created_at DESC);

-- 6. Row Level Security (RLS) Configuration
ALTER TABLE janta_sunwai_tickets ENABLE ROW LEVEL SECURITY;

-- Policy A: Allow any citizen (public/anon) to submit a grievance ticket
DROP POLICY IF EXISTS "Allow public submission of grievances" ON janta_sunwai_tickets;
CREATE POLICY "Allow public submission of grievances"
ON janta_sunwai_tickets
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy B: Allow public/anon to view and track grievance tickets (read-only for tracking)
DROP POLICY IF EXISTS "Allow public tracking of grievances" ON janta_sunwai_tickets;
CREATE POLICY "Allow public tracking of grievances"
ON janta_sunwai_tickets
FOR SELECT
TO anon, authenticated
USING (true);

-- Policy C: Allow authenticated secretariat/staff full access to manage & resolve tickets
DROP POLICY IF EXISTS "Allow secretariat staff full access" ON janta_sunwai_tickets;
CREATE POLICY "Allow secretariat staff full access"
ON janta_sunwai_tickets
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ==============================================================================
-- 7. Seed initial sample grievance (Optional for immediate testing)
-- ==============================================================================
INSERT INTO janta_sunwai_tickets (
    ticket_code,
    full_name,
    phone,
    municipality,
    ward,
    category,
    message,
    status,
    status_ne,
    estimated_resolution,
    assigned_officer,
    official_remarks
) VALUES (
    'AJP-RT-2026-1001',
    'Ramesh Kumar Yadav',
    '9855012345',
    'Maulapur Municipality',
    '3',
    'Agriculture',
    'Requirement of additional solar deep-boring tube wells for seasonal wheat irrigation in ward 3.',
    'Assigned to Secretariat Team',
    'सचिवालय टोलीलाई जिम्मा लगाइएको',
    '48 Hours',
    'Er. S. Mahato (Field Coordinator)',
    'Site inspection scheduled by technical team.'
) ON CONFLICT (ticket_code) DO NOTHING;
