import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lpfgvawehdwnurkcovrg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwZmd2YXdlaGR3bnVya2NvdnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4OTU2OTQsImV4cCI6MjA1MzQ3MTY5NH0.QJEuZCtEkkImk9_8i5G26Xp7YssL7AOeb2kXocEztIM'

export const supabase = createClient(supabaseUrl, supabaseKey)