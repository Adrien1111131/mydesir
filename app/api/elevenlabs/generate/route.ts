import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('🎤 [ELEVENLABS API] Début de la génération audio')
    
    const { voiceId, apiKeyEnv, text, intensity, duration } = await request.json()
    
    console.log('🎤 [ELEVENLABS API] Paramètres reçus:', {
      voiceId,
      apiKeyEnv,
      textLength: text?.length || 0,
      textPreview: text?.substring(0, 100) + '...',
      intensity,
      duration
    })
    
    if (!voiceId || !text) {
      console.error('❌ [ELEVENLABS API] Paramètres manquants:', { voiceId: !!voiceId, text: !!text })
      return NextResponse.json({ error: 'Voice ID and text are required' }, { status: 400 })
    }

    if (!apiKeyEnv) {
      console.error('❌ [ELEVENLABS API] API key environment variable manquant')
      return NextResponse.json({ error: 'API key environment variable is required' }, { status: 400 })
    }

    const apiKey = process.env[apiKeyEnv]
    if (!apiKey) {
      console.error(`❌ [ELEVENLABS API] Clé API non configurée pour ${apiKeyEnv}`)
      return NextResponse.json({ error: `ElevenLabs API key not configured for ${apiKeyEnv}` }, { status: 500 })
    }

    console.log(`✅ [ELEVENLABS API] Clé API trouvée pour ${apiKeyEnv}`)

    // Ajuster les paramètres de voix selon l'intensité
    const stability = Math.max(0.3, Math.min(0.8, intensity / 100))
    const similarityBoost = Math.max(0.4, Math.min(0.9, intensity / 100))

    console.log('🎛️ [ELEVENLABS API] Paramètres de voix:', { stability, similarityBoost })
    console.log('🚀 [ELEVENLABS API] Appel à ElevenLabs API...')

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: stability,
          similarity_boost: similarityBoost,
        },
      }),
    })

    console.log('📡 [ELEVENLABS API] Réponse ElevenLabs:', response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ [ELEVENLABS API] Erreur ElevenLabs:', errorText)
      return NextResponse.json({ error: 'Failed to generate audio' }, { status: response.status })
    }

    const audioBuffer = await response.arrayBuffer()
    console.log('✅ [ELEVENLABS API] Audio généré avec succès, taille:', audioBuffer.byteLength, 'bytes')
    
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('❌ [ELEVENLABS API] Erreur générale:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
