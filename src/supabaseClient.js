import {createClient} from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const runningEnv = import.meta.env.VITE_REDIRECT_URI

const redirectUri = runningEnv === 'production'
    ? 'https://audioscript.uk/'
    : 'http://localhost:5173';


export const supabase = createClient(supabaseUrl, supabaseKey,{
    auth:{
        redirectTo: redirectUri
    }
})