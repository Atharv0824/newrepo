import { createClient } from '@supabase/supabase-js'

// Supabase Configuration - YOUR ACTUAL CREDENTIALS
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gzxfigbkpkopcmwxmjij.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'sb_publishable_SsZUqBk24JMtOH-pvj7Ksg_1eKM0jUV';

// Create Supabase client with proper configuration
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Test connection function
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('colleges').select('count', { count: 'exact' });
    if (error) {
      console.error('Supabase connection test failed:', error.message);
      return false;
    }
    console.log('✅ Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Supabase connection error:', error.message);
    return false;
  }
};

// Export for use in other components
export default supabase;
