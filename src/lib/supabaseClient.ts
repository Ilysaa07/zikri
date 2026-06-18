import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== 'undefined') {
    console.warn(
      'Supabase URL atau Anon Key belum dikonfigurasi. Harap buat file .env.local dan isi variabel NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
  }
}

// Menggunakan URL fallback agar inisialisasi tidak melempar error saat build tanpa env
const targetUrl = supabaseUrl || 'https://placeholder-project-id.supabase.co';
const targetKey = supabaseAnonKey || 'placeholder-anon-key-value-to-prevent-build-errors';

export const supabase = createClient(targetUrl, targetKey);
