#!/bin/bash

# Script de test pour l'API Professor Oak Challenge
API_URL="http://localhost:3001"

echo "🧪 Test de l'API Professor Oak Challenge"
echo "======================================="

# Test 1: Vérifier que l'API répond
echo "1. Test de connexion..."
curl -s $API_URL | jq '.'

echo -e "\n2. Test d'inscription..."
REGISTER_RESPONSE=$(curl -s -X POST $API_URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@pokemon.com",
    "username": "test_trainer",
    "password": "password123"
  }')

echo $REGISTER_RESPONSE | jq '.'

# Extraire le token
TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.token')

if [ "$TOKEN" != "null" ] && [ "$TOKEN" != "" ]; then
  echo -e "\n✅ Token obtenu: ${TOKEN:0:20}..."
  
  echo -e "\n3. Test des statistiques..."
  curl -s -X GET $API_URL/api/game/user/1 \
    -H "Authorization: Bearer $TOKEN" | jq '.'
    
  echo -e "\n4. Test capture de Pokémon..."
  curl -s -X POST $API_URL/api/game/catch-pokemon \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "pokemonId": 25,
      "pokemonName": "Pikachu",
      "level": 5,
      "nickname": "Sparky"
    }' | jq '.'
    
  echo -e "\n5. Test liste des Pokémon capturés..."
  curl -s -X GET $API_URL/api/game/caught-pokemon \
    -H "Authorization: Bearer $TOKEN" | jq '.'
    
else
  echo "❌ Erreur: Token non reçu"
fi

echo -e "\n🎯 Tests terminés !"
