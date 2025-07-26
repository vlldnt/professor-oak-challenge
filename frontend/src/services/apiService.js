// Service pour communiquer avec l'API backend
const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('auth_token');
    this.baseURL = API_BASE_URL;
  }

  // Sauvegarder le token
  setToken(token) {
    localStorage.setItem('auth_token', token);
    this.token = token;
  }

  // Récupérer le token
  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  // Supprimer le token
  removeToken() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    this.token = null;
  }

  // Sauvegarder l'utilisateur actuel
  saveCurrentUser(user) {
    localStorage.setItem('current_user', JSON.stringify(user));
  }

  // Récupérer l'utilisateur actuel
  getCurrentUser() {
    const userStr = localStorage.getItem('current_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Headers avec authentification
  getAuthHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Gestion des erreurs
  async handleResponse(response) {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur API');
    }
    return response.json();
  }

  // === AUTHENTIFICATION ===
  
  async register(userData) {
    try {
      const response = await fetch(`${this.baseURL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const result = await this.handleResponse(response);
      
      if (result.success && result.token) {
        this.setToken(result.token);
        this.saveCurrentUser(result.user);
      }
      
      return result;
    } catch (error) {
      console.error('Erreur inscription:', error);
      throw error;
    }
  }

  async login(credentials) {
    try {
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const result = await this.handleResponse(response);
      
      if (result.success && result.token) {
        this.setToken(result.token);
        this.saveCurrentUser(result.user);
      }
      
      return result;
    } catch (error) {
      console.error('Erreur connexion:', error);
      throw error;
    }
  }

  async verify() {
    try {
      const response = await fetch(`${this.baseURL}/auth/verify`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('Erreur vérification:', error);
      this.removeToken();
      throw error;
    }
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated() {
    return !!this.getToken();
  }

  // === DONNÉES DE JEU ===
  
  // Récupérer les statistiques de l'utilisateur connecté
  async getUserStats() {
    const user = this.getCurrentUser();
    if (!user || !user.id) {
      throw new Error('Utilisateur non connecté');
    }

    const response = await fetch(`${this.baseURL}/game/user/${user.id}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la récupération des statistiques');
    }

    return data;
  }

  // Mettre à jour les statistiques utilisateur
  async updateUserStats(userId, stats) {
    const response = await fetch(`${this.baseURL}/game/user/${userId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(stats)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la mise à jour');
    }

    return data;
  }

  // Capturer un Pokémon
  async catchPokemon(pokemonName) {
    const response = await fetch(`${this.baseURL}/game/catch-pokemon`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ pokemonName })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la capture');
    }

    return data;
  }

  // Récupérer les Pokémon capturés
  async getCaughtPokemon() {
    const response = await fetch(`${this.baseURL}/game/caught-pokemon`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la récupération');
    }

    return data;
  }

  // Déconnexion
  logout() {
    this.removeToken();
  }
}

export default new ApiService();
