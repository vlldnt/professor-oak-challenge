// Service pour récupérer les infos utilisateur et guide en cours
const API_BASE_URL = 'http://localhost:3001/api';

class UserService {
  async getUserByUsername(username) {
    const response = await fetch(`${API_BASE_URL}/auth/user/by-username/${username}`);
    if (!response.ok) throw new Error('Utilisateur non trouvé');
    return response.json();
  }

  async getCurrentGuide(userId) {
    const response = await fetch(`${API_BASE_URL}/game/user/${userId}/current-guide`);
    if (!response.ok) return null;
    return response.json();
  }
}

export default new UserService();

export async function updateUser(id, data) {
  const response = await fetch(`http://localhost:3001/api/auth/user/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteUser(id) {
  const response = await fetch(`http://localhost:3001/api/auth/user/delete/${id}`, {
    method: 'DELETE',
  });
  return response.ok;
}
