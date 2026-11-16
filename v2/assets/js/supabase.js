const PROJECT_URL = 'https://rwnbxhrkjjlfuljhwdpt.supabase.co';
const PUBLISHABLE_KEY = 'sb_publishable_K613s8nvoUQTzIc-BLn2VQ_8kfTLWAm';
export async function rpc(name, body = {}) {
  const res = await fetch(`${PROJECT_URL}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: { apikey: PUBLISHABLE_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`RPC ${name} failed: ${res.status}`);
  return res.json();
}