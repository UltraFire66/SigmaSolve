import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uqwqhxadgzwrcarwuxmn.supabase.co/'
const supabaseKey = "sb_publishable_3wQ1GnLmKSFxOiAEzjVnsg_1EkoRyxV"


export const supabase = createClient(supabaseUrl, supabaseKey);