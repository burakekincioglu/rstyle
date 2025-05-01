import { createClient } from '@supabase/supabase-js'
import { apiKeys } from './keys'

const supabaseUrl = apiKeys.supabaseUrl
const supabaseAnonKey = apiKeys.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
})

export const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    if (error) throw error

    console.log('Kayıt başarılı:', data)
    return data
  } catch (error) {
    console.error('Kayıt hatası:', error.message)
    return null
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;

    console.log('Giriş başarılı:', data);
    return data;
  } catch (error) {
    console.error('Giriş hatası:', error.message);
    return null;
  }
};
