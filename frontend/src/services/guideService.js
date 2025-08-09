const API_BASE_URL = 'http://localhost:3001/api';

export async function startGuide(userId, guideName, token) {
  const response = await fetch(`${API_BASE_URL}/game/user/${userId}/guides`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ guide_name: guideName })
  });
  if (!response.ok) throw new Error('Erreur lors de la création du guide');
  return response.json();
}