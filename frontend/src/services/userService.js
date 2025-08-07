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
