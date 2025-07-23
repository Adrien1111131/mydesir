import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('📖 [GROK API] Début de la génération d\'histoire')
    
    const { voiceName, fantasyDescription, userName, intensity, duration } = await request.json()
    
    console.log('📖 [GROK API] Paramètres reçus:', {
      voiceName,
      fantasyDescription: fantasyDescription?.substring(0, 100) + '...',
      userName,
      intensity,
      duration
    })
    
    if (!voiceName || !fantasyDescription) {
      console.error('❌ [GROK API] Paramètres manquants:', { voiceName: !!voiceName, fantasyDescription: !!fantasyDescription })
      return NextResponse.json({ error: 'Voice name and fantasy description are required' }, { status: 400 })
    }

    const apiKey = process.env.GROK_API_KEY
    if (!apiKey) {
      console.error('❌ [GROK API] Clé API Grok non configurée')
      return NextResponse.json({ error: 'Grok API key not configured' }, { status: 500 })
    }

    console.log('✅ [GROK API] Clé API Grok trouvée')

    // Créer un prompt personnalisé selon la voix
    const voicePersonalities = {
      'Alex': 'Tu es Alex, un homme charismatique avec une voix chaude et envoûtante. Tu es confiant, séducteur et tu sais exactement comment caresser l\'âme de ton interlocuteur avec tes mots.',
      'Damien': 'Tu es Damien, un homme mystérieux aux murmures doux. Tu es tendre, sensuel et tu excelles dans l\'art de faire frissonner la peau avec tes paroles délicates.',
      'Gabriel': 'Tu es Gabriel, un homme magnétique à l\'intensité captivante. Tu es passionné, intense et tu sais comment éveiller tous les sens avec ta présence magnétique.'
    }

    const personality = voicePersonalities[voiceName as keyof typeof voicePersonalities] || `Tu es ${voiceName}, une voix séductrice et envoûtante.`
    console.log('🎭 [GROK API] Personnalité sélectionnée:', personality.substring(0, 50) + '...')

    // Ajuster le niveau d'intensité
    const intensityLevels = {
      low: 'doux et romantique, avec des sous-entendus subtils',
      medium: 'sensuel et passionné, avec une tension érotique palpable',
      high: 'intense et explicite, avec une passion débordante'
    }

    let intensityLevel = 'medium'
    if (intensity < 30) intensityLevel = 'low'
    else if (intensity > 70) intensityLevel = 'high'

    console.log('🌡️ [GROK API] Niveau d\'intensité:', intensityLevel, `(${intensity}/100)`)

    // Calculer le nombre de mots approximatif (150 mots par minute de lecture)
    const targetWords = duration * 150
    console.log('📏 [GROK API] Mots cibles:', targetWords, `(${duration} minutes)`)

    const userNameInstruction = userName 
      ? `- L'utilisateur s'appelle ${userName}. Utilise son prénom naturellement dans l'histoire pour créer une connexion personnelle`
      : `- Tu peux t'adresser à l'utilisateur directement sans utiliser de prénom spécifique`

    console.log('👤 [GROK API] Instruction nom utilisateur:', userNameInstruction)

    const prompt = `${personality}

Tu vas créer une histoire érotique personnalisée où tu t'adresses directement à l'utilisateur à la première personne. 

CONSIGNES IMPORTANTES :
- Parle directement à l'utilisateur en utilisant "tu", "toi", "ton/ta"
- Raconte l'histoire comme si tu étais présent avec l'utilisateur
${userNameInstruction}
- Le ton doit être ${intensityLevels[intensityLevel as keyof typeof intensityLevels]}
- L'histoire doit faire environ ${targetWords} mots (${duration} minutes de lecture)
- STYLE ORAL NATUREL : Écris comme si tu parlais spontanément, pas comme un texte lu
- CONNECTEURS FLUIDES : Utilise des transitions naturelles entre les idées
- RYTHME CONVERSATIONNEL : Varie la longueur des phrases pour un débit naturel
- LANGAGE PARLÉ : Emploie des expressions et tournures qu'on utilise à l'oral
- OPTIMISÉ TTS : Évite abréviations et symboles, écris tout en toutes lettres
- Crée une progression narrative avec une montée en tension
- Termine par une conclusion satisfaisante

SCÉNARIO DEMANDÉ :
${fantasyDescription}

Commence ton histoire maintenant, en t'adressant directement à l'utilisateur :`

    console.log('📝 [GROK API] Prompt créé, longueur:', prompt.length, 'caractères')
    console.log('🚀 [GROK API] Appel à l\'API Grok...')

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        model: 'grok-3-latest',
        stream: false,
        temperature: 0.8,
        max_tokens: Math.min(4000, Math.max(500, targetWords * 2)) // Ajuster selon la durée
      }),
    })

    console.log('📡 [GROK API] Réponse Grok:', response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ [GROK API] Erreur Grok:', errorText)
      return NextResponse.json({ error: 'Failed to generate story' }, { status: response.status })
    }

    const data = await response.json()
    console.log('📊 [GROK API] Données reçues:', {
      choices: data.choices?.length || 0,
      hasContent: !!data.choices?.[0]?.message?.content
    })

    const generatedStory = data.choices?.[0]?.message?.content

    if (!generatedStory) {
      console.error('❌ [GROK API] Aucune histoire générée')
      return NextResponse.json({ error: 'No story generated' }, { status: 500 })
    }

    const wordCount = generatedStory.split(' ').length
    console.log('✅ [GROK API] Histoire générée avec succès!')
    console.log('📈 [GROK API] Statistiques:', {
      longueur: generatedStory.length,
      mots: wordCount,
      preview: generatedStory.substring(0, 100) + '...'
    })

    return NextResponse.json({ 
      story: generatedStory,
      metadata: {
        voiceName,
        intensity,
        duration,
        estimatedWords: wordCount
      }
    })

  } catch (error) {
    console.error('❌ [GROK API] Erreur générale:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
