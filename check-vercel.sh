#!/bin/bash
echo "🔍 VÉRIFICATION AVANT DÉPLOIEMENT VERCEL"
echo "========================================"
echo ""

# Vérifier la structure
echo "📁 Structure du projet :"
find . -maxdepth 2 -type f -name "*.js" -o -name "*.jsx" -o -name "*.json" | sort

echo ""
echo "📦 Dependencies :"
npm list --depth=0

echo ""
echo "⚙️  Configuration Next.js :"
if [ -f "next.config.js" ]; then
  echo "✅ next.config.js présent"
else
  echo "❌ next.config.js manquant"
fi

echo ""
echo "🔐 Variables d'environnement nécessaires sur Vercel :"
echo "-----------------------------------------------------"
echo "1. NEXT_PUBLIC_RECAPTCHA_SITE_KEY = 6LebOkQsAAAAAB6oVrVjfDvuf7GH27R0qca-aCBr"
echo "2. RECAPTCHA_SECRET_KEY = 6LebOkQsAAAAAE05883YRoIar2LMmgGhktXGhVUf"
echo "3. SESSION_SECRET = ce16bb2057b44c6e939b9db070d698c5a3a4a08810b9d1b6680cfc3f24f60b41"
echo "4. NEXT_PUBLIC_APP_URL = https://testpoo.vercel.app"
echo "5. NODE_ENV = production"

echo ""
echo "🚀 Test de build :"
npm run build 2>&1 | tail -20

echo ""
echo "✅ Si tout est vert, tu es prêt pour Vercel !"
echo "🌐 URL de déploiement : https://vercel.com/new"
