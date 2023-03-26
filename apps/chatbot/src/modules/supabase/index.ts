import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '../../configs/supabase.config';

export const supabase = createClient(supabaseConfig.url, supabaseConfig.key, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
