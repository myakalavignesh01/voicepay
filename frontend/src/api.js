import axios from 'axios';

const API = 'http://localhost:8000';

export async function processVoice(text, lang = 'en-IN') {
  const res = await axios.post(`${API}/process`, {
    text,
    user_id: 'demo_user',
    lang,
  });
  return res.data;
}