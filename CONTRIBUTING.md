# Guide de Contribution - My Désir

## 🚀 Démarrage rapide

1. **Fork** le repository
2. **Clone** votre fork localement
3. **Créez** une branche pour votre feature : `git checkout -b feature/ma-nouvelle-feature`
4. **Installez** les dépendances : `npm install`
5. **Configurez** les variables d'environnement (voir `.env.example`)

## 📋 Standards de développement

### Structure des commits
Utilisez des messages de commit clairs et descriptifs :
```
feat: ajouter nouvelle voix féminine
fix: corriger problème de lecture audio
docs: mettre à jour README
style: améliorer design des cartes
refactor: optimiser génération d'histoires
```

### Code Style
- **TypeScript** strict activé
- **ESLint** et **Prettier** pour le formatage
- **Tailwind CSS** pour les styles
- **Composants réutilisables** dans `/components/ui/`

### Tests
- Tester les nouvelles fonctionnalités
- Vérifier la compatibilité navigateur
- Tester les API routes

## 🔧 Développement

### Variables d'environnement requises
```bash
cp .env.example .env.local
```

### Commandes utiles
```bash
npm run dev          # Démarrer en mode développement
npm run build        # Build de production
npm run lint         # Vérifier le code
npm run type-check   # Vérifier TypeScript
```

## 📦 Déploiement

L'application est automatiquement déployée sur Vercel lors des push sur `main`.

### Configuration Vercel
- Variables d'environnement configurées
- Domaine personnalisé si nécessaire
- Headers de sécurité activés

## 🎯 Fonctionnalités prioritaires

### En cours
- ✅ Voix masculines avec audio personnalisé
- ✅ Interface utilisateur optimisée
- ✅ Génération d'histoires IA

### À venir
- 🔄 Activation des voix féminines
- 🔄 Système de favoris
- 🔄 Partage d'histoires
- 🔄 Mode sombre/clair

## 🔒 Sécurité

- **Jamais** committer les clés API
- **Toujours** utiliser les variables d'environnement
- **Vérifier** les permissions des fichiers
- **Tester** les vulnérabilités avant déploiement

## 📞 Support

Pour toute question ou problème :
- Créer une **issue** sur GitHub
- Documenter le problème clairement
- Inclure les étapes de reproduction

---

Merci de contribuer à My Désir ! 🔥
