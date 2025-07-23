#!/bin/bash

# Script de déploiement rapide pour My Désir
# Usage: ./scripts/deploy.sh "message de commit"

set -e

echo "🚀 Déploiement de My Désir..."

# Vérifier que le message de commit est fourni
if [ -z "$1" ]; then
    echo "❌ Erreur: Veuillez fournir un message de commit"
    echo "Usage: ./scripts/deploy.sh \"votre message de commit\""
    exit 1
fi

COMMIT_MESSAGE="$1"

echo "📋 Vérification du build..."
npm run build

echo "🧹 Nettoyage des fichiers temporaires..."
rm -rf .next/cache
rm -rf node_modules/.cache

echo "📝 Ajout des fichiers au git..."
git add .

echo "💾 Commit des changements..."
git commit -m "$COMMIT_MESSAGE" || echo "Aucun changement à committer"

echo "📤 Push vers GitHub..."
git push origin main

echo "✅ Déploiement terminé !"
echo "🌐 L'application sera disponible sur Vercel dans quelques minutes"
echo "📊 Vérifiez le statut sur: https://vercel.com/dashboard"
