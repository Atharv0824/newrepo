const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || 'https://gzxfigbkpkopcmwxmjij.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'sb_publishable_SsZUqBk24JMtOH-pvj7Ksg_1eKM0jUV';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

module.exports = supabase;