import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verifica se as variáveis existem para evitar erros silenciosos
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Erro: Variáveis do Supabase não encontradas no arquivo .env");
}

// Cria e exporta o cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey);