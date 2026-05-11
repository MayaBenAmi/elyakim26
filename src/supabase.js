// Supabase is loaded via CDN in public/index.html and available as window.supabase
export const supabase = window.supabase.createClient(
  process.env.VUE_APP_SUPABASE_URL,
  process.env.VUE_APP_SUPABASE_ANON_KEY
)
