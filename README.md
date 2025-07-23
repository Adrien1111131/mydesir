# My Désir 🔥

Une application web moderne de génération d'histoires érotiques personnalisées avec synthèse vocale IA.

## ✨ Fonctionnalités

- **Sélection de voix** : 6 personnages avec voix uniques (3 hommes, 3 femmes)
- **Génération d'histoires** : IA Grok pour créer des histoires personnalisées
- **Synthèse vocale** : ElevenLabs pour convertir les histoires en audio
- **Interface moderne** : Design élégant avec Tailwind CSS
- **Expérience immersive** : Images aléatoires et lecteur audio intégré
- **Écran de chargement** : Barre de progression avec messages motivants

## 🛠️ Technologies

- **Framework** : Next.js 15 avec TypeScript
- **Styling** : Tailwind CSS + Radix UI
- **IA** : Grok API pour la génération de texte
- **Audio** : ElevenLabs API pour la synthèse vocale
- **Déploiement** : Vercel

## 🚀 Installation

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/my-desir.git
cd my-desir
```

2. **Installer les dépendances**
```bash
npm install
# ou
pnpm install
```

3. **Configurer les variables d'environnement**
Créer un fichier `.env.local` avec :
```env
# ElevenLabs API Keys
ELEVENLABS_API_KEY_GABRIEL=votre_cle_api_gabriel
ELEVENLABS_API_KEY_DAMIEN=votre_cle_api_damien
ELEVENLABS_API_KEY_ALEX=votre_cle_api_alex

# Grok API Key
GROK_API_KEY=votre_cle_api_grok
```

4. **Lancer l'application**
```bash
npm run dev
# ou
pnpm dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📦 Déploiement sur Vercel

1. **Pousser sur GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connecter à Vercel**
- Aller sur [vercel.com](https://vercel.com)
- Importer le repository GitHub
- Configurer les variables d'environnement dans les settings Vercel

3. **Variables d'environnement Vercel**
Ajouter dans les settings du projet :
- `ELEVENLABS_API_KEY_GABRIEL`
- `ELEVENLABS_API_KEY_DAMIEN`
- `ELEVENLABS_API_KEY_ALEX`
- `GROK_API_KEY`

## 🎭 Personnages

### Voix Masculines
- **Alex** : Voix chaude et envoûtante
- **Damien** : Murmures doux et frissonnants
- **Gabriel** : Intensité magnétique

### Voix Féminines
- **Chloé** : Voix sensuelle et mélodieuse
- **Léa** : Voix douce et apaisante
- **Manon** : Voix enivrante et mystérieuse

## 🔧 Structure du projet

```
my-desir/
├── app/
│   ├── api/
│   │   ├── elevenlabs/
│   │   │   ├── generate/
│   │   │   └── sample/
│   │   └── grok/
│   │       └── generate-story/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
├── public/
│   ├── avatars/
│   └── images/
└── lib/
```

## 🔒 Sécurité

- Les clés API sont stockées dans des variables d'environnement
- Aucune donnée sensible n'est exposée côté client
- Les fichiers `.env*` sont exclus du repository

## 📄 Licence

Ce projet est privé et propriétaire.

## 🤝 Contribution

Ce projet est actuellement fermé aux contributions externes.

---

Développé avec ❤️ pour une expérience immersive unique.
