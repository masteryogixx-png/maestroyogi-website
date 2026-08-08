// ==========================================
// SUPABASE CONNECTION
// ==========================================

const SUPABASE_URL = "https://vrqqcynfigempqrinnxo.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_pli3ubwxWBmRCeyMs44gvQ_Gp_VqXxU";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);