if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLISHABLE_KEY
);

async function fetchRefreshToken(user) {
  const { data, error } = await supabase
    .from('users')
    .select('google_refresh_token')
    .eq('email', user)
    .single();
  return { data, error };
}


module.exports = {supabase, fetchRefreshToken};