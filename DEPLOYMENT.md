# Guide de Déploiement - My Désir 🚀

## 📋 Checklist avant déploiement

### ✅ Vérifications obligatoires
- [ ] Variables d'environnement configurées
- [ ] Application build sans erreur (`npm run build`)
- [ ] Tests passent (si applicable)
- [ ] Fichiers sensibles exclus du git
- [ ] README.md à jour

### ✅ Configuration Vercel
- [ ] Projet connecté à GitHub
- [ ] Variables d'environnement ajoutées dans Vercel
- [ ] Domaine configuré (si nécessaire)

## 🚀 Méthodes de déploiement

### 1. Déploiement automatique (Recommandé)
```bash
# Push sur main déclenche automatiquement le déploiement
git add .
git commit -m "feat: nouvelle fonctionnalité"
git push origin main
```

### 2. Script de déploiement rapide
```bash
# Sur Linux/Mac
./scripts/deploy.sh "message de commit"

# Sur Windows
bash scripts/deploy.sh "message de commit"
```

### 3. Déploiement manuel via Vercel CLI
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod
```

## 🔧 Variables d'environnement

### Développement (.env.local)
```env
ELEVENLABS_API_KEY_GABRIEL=your_key_here
ELEVENLABS_API_KEY_DAMIEN=your_key_here
ELEVENLABS_API_KEY_ALEX=your_key_here
GROK_API_KEY=your_key_here
```

### Production (Vercel Dashboard)
Ajouter les mêmes variables dans les settings du projet Vercel.

## 📊 Monitoring

### Vérifications post-déploiement
- [ ] Site accessible sur le domaine
- [ ] API routes fonctionnelles
- [ ] Fichiers audio chargent correctement
- [ ] Génération d'histoires fonctionne
- [ ] Pas d'erreurs dans les logs Vercel

### Logs et debugging
```bash
# Voir les logs Vercel
vercel logs

# Logs en temps réel
vercel logs --follow
```

## 🔄 Rollback

### En cas de problème
```bash
# Revenir au commit précédent
git revert HEAD
git push origin main

# Ou déployer une version spécifique
vercel --prod --target=production
```

## 📈 Performance

### Optimisations appliquées
- ✅ Images optimisées avec Next.js
- ✅ Code splitting automatique
- ✅ Headers de sécurité configurés
- ✅ Cache optimisé
- ✅ Bundle size optimisé

### Métriques à surveiller
- Temps de chargement initial
- Taille des bundles JavaScript
- Performance des API routes
- Temps de génération d'histoires

## 🔒 Sécurité

### Mesures en place
- ✅ Variables d'environnement sécurisées
- ✅ Headers de sécurité (XSS, CSRF, etc.)
- ✅ Validation des entrées utilisateur
- ✅ Rate limiting sur les API
- ✅ HTTPS forcé

## 📞 Support

### En cas de problème
1. Vérifier les logs Vercel
2. Tester en local avec `npm run build`
3. Vérifier les variables d'environnement
4. Consulter la documentation Vercel
5. Créer une issue GitHub si nécessaire

---

🎯 **Objectif** : Déploiement fluide et sécurisé de My Désir sur Vercel
