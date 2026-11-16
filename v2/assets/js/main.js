import { rpc } from './supabase.js';
const status = document.getElementById('status');
try {
  const config = await rpc('ss_get_config', {});
  status.textContent = `Nowy frontend działa · katalog: ${config.heroes.length} bohaterów · ${config.themes.length} map`;
} catch (e) {
  status.textContent = 'Błąd połączenia z Supabase: ' + e.message;
}