"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, UserIcon as Female, UserIcon as Male, ArrowLeft } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface Voice {
  id: string
  name: string
  gender: "male" | "female"
  description: string
  avatar: string
  sampleUrl: string
  introText: string
  elevenLabsId?: string
  apiKeyEnv?: string
}

const voices: Voice[] = [
  {
    id: "v1",
    name: "Alex",
    gender: "male",
    description: "Voix chaude et envoûtante qui te caresse l'âme",
    avatar: "/avatars/men/alex.jpg",
    sampleUrl: "/voices/alex.mp3",
    introText: "Salut, comment vas-tu ? Je suis Alex, et j'ai hâte de te faire vibrer...",
    elevenLabsId: "F9ZljpKJL3VvyyoqIGBi",
    apiKeyEnv: "ELEVENLABS_API_KEY_ALEX",
  },
  {
    id: "v2",
    name: "Damien",
    gender: "male",
    description: "Murmures doux qui font frissonner ta peau",
    avatar: "/avatars/men/damien.jpg",
    sampleUrl: "/voices/damien.mp3",
    introText: "Bonjour ma belle, c'est Damien. Laisse-moi te murmurer quelque chose à l'oreille...",
    elevenLabsId: "RNNSWRWzYFvNKmaXif2W",
    apiKeyEnv: "ELEVENLABS_API_KEY_DAMIEN",
  },
  {
    id: "v3",
    name: "Gabriel",
    gender: "male",
    description: "Intensité magnétique qui éveille tous tes sens",
    avatar: "/avatars/men/gabriel.jpg",
    sampleUrl: "/voices/gabriel.mp3",
    introText: "Hey, c'est Gabriel. Tu es prête à découvrir l'intensité de ma voix ?",
    elevenLabsId: "3LXcWrz9LjdUV1293dfQ",
    apiKeyEnv: "ELEVENLABS_API_KEY_GABRIEL",
  },
  {
    id: "v4",
    name: "Chloé",
    gender: "female",
    description: "Voix sensuelle et mélodieuse",
    avatar: "/avatars/women/chloe.jpg",
    sampleUrl: "/placeholder.mp3?query=female voice sample",
    introText: "Salut mon cœur, c'est Chloé. Ma voix va te faire fondre...",
  },
  {
    id: "v5",
    name: "Léa",
    gender: "female",
    description: "Voix douce et apaisante",
    avatar: "/avatars/women/lea.jpg",
    sampleUrl: "/placeholder.mp3?query=female voice sample",
    introText: "Bonjour, je suis Léa. Laisse-moi t'apaiser avec ma douceur...",
  },
  {
    id: "v6",
    name: "Manon",
    gender: "female",
    description: "Voix enivrante et mystérieuse",
    avatar: "/avatars/women/manon.jpg",
    sampleUrl: "/placeholder.mp3?query=female voice sample",
    introText: "Hey, c'est Manon. Prêt à plonger dans le mystère de ma voix ?",
  },
]

// Liste des images disponibles
const availableImages = [
  "Commentez le Caméléon Joueur Danse avec les Autres Types Sens.jpg",
  "ET MAINTENANT  L'AVENTURE CONTINUE.jpg",
  "L'Art de la Lecture Corporelle Décodez le Désir.jpg",
  "LES 5 STADES DE LA SEXUALITÉ.jpg",
  "shutterstock_121662979.jpg",
  "shutterstock_231274234.jpg",
  "shutterstock_275423666.jpg",
  "shutterstock_277246742.jpg",
  "shutterstock_294165818.jpg",
  "shutterstock_295933379.jpg",
  "shutterstock_316346645.jpg",
  "shutterstock_329224571.jpg",
  "shutterstock_437504260.jpg",
  "shutterstock_747051802.jpg",
  "shutterstock_783882814.jpg",
  "shutterstock_1029992581.jpg",
  "shutterstock_1086027962.jpg",
  "shutterstock_1326604619.jpg"
]

// Scénarios prédéfinis pour l'inspiration
const predefinedScenarios = [
  {
    id: "custom",
    title: "Personnalisé",
    description: ""
  },
  {
    id: "library",
    title: "Rencontre inattendue dans une bibliothèque ancienne",
    description: "Dans une vieille bibliothèque aux étagères remplies de livres poussiéreux, deux inconnus se croisent dans une aile isolée, leurs doigts effleurant le même ouvrage rare. L'atmosphère feutrée, l'odeur du cuir et du papier ancien, et le silence oppressant amplifient la tension palpable entre eux. Écrivez une histoire où leur curiosité mutuelle pour la littérature se transforme en une danse subtile de séduction, où chaque mot chuchoté et chaque regard prolongé devient une promesse d'intimité."
  },
  {
    id: "masquerade",
    title: "Soirée masquée dans un manoir mystérieux",
    description: "Lors d'un bal masqué dans un manoir opulent, une femme portant un masque orné de plumes rencontre un homme dont le regard perçant la trouble immédiatement. Ils dansent, leurs corps se frôlant à chaque pas, tandis que l'anonymat des masques libère leurs inhibitions. Écrivez une histoire où leur jeu de séduction s'intensifie dans les couloirs sombres du manoir, chaque échange verbal et chaque toucher voilé révélant des désirs inavoués."
  },
  {
    id: "desert",
    title: "Voyage sensuel sous les étoiles dans le désert",
    description: "Deux voyageurs se retrouvent seuls sous un ciel étoilé dans un campement isolé au cœur du désert. La chaleur du feu de camp contraste avec la fraîcheur de la nuit, et leurs conversations autour des flammes deviennent de plus en plus personnelles. Écrivez une histoire où l'isolement du désert et la beauté brute de la nature éveillent une connexion physique et émotionnelle, les poussant à explorer leurs désirs dans un moment suspendu hors du temps."
  },
  {
    id: "artist",
    title: "Atelier d'artiste sous une pluie d'orage",
    description: "Un peintre invite un modèle dans son atelier un soir d'orage. La pluie tambourine sur les vitres, et la lumière tamisée des bougies éclaire leurs silhouettes. Alors que l'artiste guide le modèle pour une pose intime, leurs regards se croisent, et la tension créative se transforme en une attirance magnétique. Écrivez une histoire où chaque coup de pinceau, chaque ajustement de posture, devient une exploration sensuelle de leurs limites et de leurs désirs."
  }
]

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(0) // 0: voice selection, 1: fantasy input, 2: final
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null)
  const [selectedGender, setSelectedGender] = useState<"male" | "female">("male")
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionDirection, setTransitionDirection] = useState<"in" | "out">("in")

  // States for fantasy input
  const [fantasyDescription, setFantasyDescription] = useState<string>("")
  const [userName, setUserName] = useState<string>("")
  const [eroticIntensity, setEroticIntensity] = useState<number>(50)
  const [storyDuration, setStoryDuration] = useState<number>(3)
  const [selectedScenario, setSelectedScenario] = useState<string>("")

  // Audio player states
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Loading progress states
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingMessage, setLoadingMessage] = useState("")
  
  // Random image state
  const [randomImage, setRandomImage] = useState<string | null>(null)

  // Loading progress effect
  useEffect(() => {
    if (isGenerating) {
      setLoadingProgress(0)
      setLoadingMessage("Cela peut prendre quelques minutes...")
      
      const messages = [
        "Cela peut prendre quelques minutes...",
        "Surtout ne ferme pas l'application, ta patience sera récompensée...",
        "Ton histoire prend forme...",
        "Les mots s'assemblent pour ton plaisir...",
        "Presque prêt... encore quelques instants..."
      ]
      
      let messageIndex = 0
      let progress = 0
      
      const progressInterval = setInterval(() => {
        progress += 1.67 // Pour atteindre 100% en 60 secondes
        setLoadingProgress(Math.min(progress, 100))
        
        // Changer le message toutes les 20 secondes
        if (progress % 20 === 0 && messageIndex < messages.length - 1) {
          messageIndex++
          setLoadingMessage(messages[messageIndex])
        }
        
        if (progress >= 100) {
          clearInterval(progressInterval)
        }
      }, 1000)
      
      return () => clearInterval(progressInterval)
    }
  }, [isGenerating])

  // Function to select a random image
  const selectRandomImage = (): string | null => {
    try {
      if (availableImages.length === 0) return null
      const randomIndex = Math.floor(Math.random() * availableImages.length)
      const selectedImage = availableImages[randomIndex]
      console.log('🖼️ [FRONTEND] Image aléatoire sélectionnée:', selectedImage)
      return `/images/${selectedImage}`
    } catch (error) {
      console.error('❌ [FRONTEND] Erreur sélection image:', error)
      return null
    }
  }

  const handleVibrate = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  const handlePlaySample = async (voice: Voice) => {
    handleVibrate()
    
    // Pour les voix masculines, utiliser directement les fichiers audio locaux
    if (voice.gender === "male" && voice.sampleUrl.startsWith("/voices/")) {
      console.log(`🎵 [FRONTEND] Lecture du fichier audio local: ${voice.sampleUrl}`)
      if (audioRef.current) {
        audioRef.current.src = voice.sampleUrl
        audioRef.current.play().catch((error) => {
          console.error(`❌ [FRONTEND] Erreur lecture audio local pour ${voice.name}:`, error)
          // Fallback vers ElevenLabs si le fichier local ne fonctionne pas
          tryElevenLabsSample(voice)
        })
      }
      return
    }
    
    // Pour les autres voix, utiliser ElevenLabs ou fallback
    if (voice.elevenLabsId && voice.apiKeyEnv) {
      tryElevenLabsSample(voice)
    } else {
      if (audioRef.current) {
        audioRef.current.src = voice.sampleUrl
        audioRef.current.play()
      }
    }
  }

  const tryElevenLabsSample = async (voice: Voice) => {
    try {
      const response = await fetch('/api/elevenlabs/sample', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voiceId: voice.elevenLabsId,
          apiKeyEnv: voice.apiKeyEnv,
          text: voice.introText,
        }),
      })

      if (response.ok) {
        const audioBlob = await response.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        
        if (audioRef.current) {
          audioRef.current.src = audioUrl
          audioRef.current.play()
        }
      } else {
        console.error('Erreur lors de la génération de l\'échantillon audio')
        if (audioRef.current) {
          audioRef.current.src = voice.sampleUrl
          audioRef.current.play()
        }
      }
    } catch (error) {
      console.error('Erreur:', error)
      if (audioRef.current) {
        audioRef.current.src = voice.sampleUrl
        audioRef.current.play()
      }
    }
  }

  const handleTransition = (callback: () => void) => {
    setTransitionDirection("out")
    setIsTransitioning(true)
    setTimeout(() => {
      callback()
      setTransitionDirection("in")
    }, 500)
  }

  const handleSelectVoice = (voice: Voice) => {
    handleVibrate()
    setSelectedVoice(voice)
    handleTransition(() => setCurrentStep(1))
  }

  // Fonction pour gérer le changement de scénario
  const handleScenarioChange = (scenarioId: string) => {
    setSelectedScenario(scenarioId)
    const scenario = predefinedScenarios.find(s => s.id === scenarioId)
    if (scenario) {
      setFantasyDescription(scenario.description)
    }
  }

  const handleGenerateStory = async () => {
    handleVibrate()
    setIsGenerating(true)
    
    console.log('🎬 [FRONTEND] Début de la génération d\'histoire')
    
    if (!selectedVoice || !selectedVoice.elevenLabsId || !selectedVoice.apiKeyEnv) {
      console.error('❌ [FRONTEND] Voix non disponible:', selectedVoice)
      alert('Voix non disponible pour la génération d\'histoire')
      setIsGenerating(false)
      return
    }

    handleTransition(() => setCurrentStep(2))

    try {
      // Étape 1: Générer l'histoire avec Grok
      const storyResponse = await fetch('/api/grok/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voiceName: selectedVoice.name,
          fantasyDescription: fantasyDescription,
          userName: userName.trim() || null,
          intensity: eroticIntensity,
          duration: storyDuration,
        }),
      })

      if (!storyResponse.ok) {
        const errorData = await storyResponse.json().catch(() => ({ error: 'Erreur inconnue' }))
        throw new Error(`Erreur lors de la génération de l'histoire: ${errorData.error}`)
      }

      const storyData = await storyResponse.json()
      const generatedStory = storyData.story

      // Étape 2: Convertir l'histoire en audio avec ElevenLabs
      const audioResponse = await fetch('/api/elevenlabs/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voiceId: selectedVoice.elevenLabsId,
          apiKeyEnv: selectedVoice.apiKeyEnv,
          text: generatedStory,
          intensity: eroticIntensity,
          duration: storyDuration,
        }),
      })

      if (audioResponse.ok) {
        const audioBlob = await audioResponse.blob()
        const newAudioUrl = URL.createObjectURL(audioBlob)
        
        setAudioUrl(newAudioUrl)
        
        // Sélectionner une image aléatoire
        const selectedImage = selectRandomImage()
        setRandomImage(selectedImage)
        
        if (audioRef.current) {
          audioRef.current.src = newAudioUrl
          audioRef.current.load()
        }
      } else {
        const errorData = await audioResponse.json().catch(() => ({ error: 'Erreur inconnue' }))
        throw new Error(`Erreur lors de la conversion audio: ${errorData.error}`)
      }
    } catch (error) {
      console.error('❌ [FRONTEND] Erreur générale:', error)
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue'
      alert(`Erreur lors de la génération: ${errorMessage}`)
      handleTransition(() => setCurrentStep(1))
    } finally {
      setIsGenerating(false)
    }
  }

  // Audio player functions
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const getIntensityColorForValue = (value: number) => {
    const startHue = 330
    const startSaturation = 80
    const startLightness = 65

    const endHue = 300
    const endSaturation = 90
    const endLightness = 50

    const hue = startHue + (endHue - startHue) * (value / 100)
    const saturation = startSaturation + (endSaturation - startSaturation) * (value / 100)
    const lightness = startLightness + (endLightness - startLightness) * (value / 100)

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }

  const renderVoiceSelection = () => (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-screen p-4 text-center",
        isTransitioning && transitionDirection === "out" && "animate-fade-out-slide-right",
        isTransitioning && transitionDirection === "in" && "animate-fade-in-slide-left",
      )}
      onAnimationEnd={() => {
        if (transitionDirection === "in") setIsTransitioning(false)
      }}
    >
      <div className="flex flex-col items-center mb-12">
        <Image src="/logo1.png" alt="My Désir Logo" width={120} height={120} className="mb-2" />
        <h1 className="text-5xl md:text-7xl font-bold text-foreground text-center tracking-wide drop-shadow-lg">
          My Désir
        </h1>
      </div>

      <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 max-w-4xl leading-tight">
        Choisis la voix qui va faire{" "}
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">vibrer ton âme</span>
      </h2>

      <p className="text-lg text-muted-foreground mb-12">
        {"✨ Laisse-toi séduire par une voix... et commence ton voyage vers l'extase ✨"}
      </p>

      <div className="flex bg-muted rounded-full p-1 mb-12 shadow-lg">
        <Button
          className={cn(
            "flex-1 py-3 px-6 rounded-full text-lg font-semibold transition-all duration-300",
            selectedGender === "female"
              ? "bg-gradient-to-r from-primary to-purple-600 text-primary-foreground shadow-md"
              : "bg-transparent text-muted-foreground hover:bg-muted/50",
          )}
          onClick={() => setSelectedGender("female")}
        >
          <Female className="w-5 h-5 mr-2" />
          Voix Féminines
        </Button>
        <Button
          className={cn(
            "flex-1 py-3 px-6 rounded-full text-lg font-semibold transition-all duration-300",
            selectedGender === "male"
              ? "bg-gradient-to-r from-primary to-purple-600 text-primary-foreground shadow-md"
              : "bg-transparent text-muted-foreground hover:bg-muted/50",
          )}
          onClick={() => setSelectedGender("male")}
        >
          <Male className="w-5 h-5 mr-2" />
          Voix Masculines
        </Button>
      </div>

      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {voices
            .filter((v) => v.gender === selectedGender)
            .map((voice) => (
              <VoiceCard
                key={voice.id}
                voice={voice}
                onPlaySample={handlePlaySample}
                onSelectVoice={handleSelectVoice}
                isSelected={selectedVoice?.id === voice.id}
              />
            ))}
        </div>
      </div>

      <p className="text-lg text-muted-foreground mt-16">{"💫 Prête à vivre ta plus belle histoire d'amour ? 💫"}</p>
    </div>
  )

  const renderFantasyInputScreen = () => (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-screen p-4 text-center relative",
        isTransitioning && transitionDirection === "out" && "animate-fade-out-slide-right",
        isTransitioning && transitionDirection === "in" && "animate-fade-in-slide-left",
      )}
      onAnimationEnd={() => {
        if (transitionDirection === "in") setIsTransitioning(false)
      }}
    >
      {/* Bouton retour */}
      <Button
        onClick={() => {
          handleVibrate()
          handleTransition(() => setCurrentStep(0))
        }}
        className="absolute top-4 left-4 p-3 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-300 shadow-lg"
        aria-label="Retour à la sélection des voix"
      >
        <ArrowLeft className="w-6 h-6" />
      </Button>

      <p className="text-lg text-muted-foreground text-center mb-4">
        {selectedVoice
          ? `Avec la voix de ${selectedVoice.name}, laisse libre cours à ton imagination...`
          : "Laisse libre cours à ton imagination..."}
      </p>
      <h2 className="text-3xl md:text-5xl font-bold text-foreground text-center mb-8 max-w-3xl leading-tight">
        Décris ton fantasme et personnalise ton histoire
      </h2>

      <div className="w-full max-w-2xl px-4 space-y-8 p-6 rounded-2xl bg-card shadow-xl border border-muted/50">
        <div className="grid w-full gap-2">
          <Label htmlFor="user-name" className="text-xl font-semibold text-foreground text-left mb-2">
            Ton prénom <span className="text-muted-foreground text-base font-normal">(optionnel)</span> :
          </Label>
          <Input
            id="user-name"
            placeholder="Comment veux-tu que je t'appelle ?"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="bg-muted text-foreground border-muted focus-visible:ring-primary p-4 rounded-lg text-lg"
          />
        </div>

        <div className="grid w-full gap-2">
          <Label htmlFor="scenario-select" className="text-xl font-semibold text-foreground text-left mb-2">
            Inspirez-vous :
          </Label>
          <Select value={selectedScenario} onValueChange={handleScenarioChange}>
            <SelectTrigger className="bg-muted text-foreground border-muted focus-visible:ring-primary p-4 rounded-lg text-lg">
              <SelectValue placeholder="Choisissez un scénario..." />
            </SelectTrigger>
            <SelectContent>
              {predefinedScenarios.map((scenario) => (
                <SelectItem key={scenario.id} value={scenario.id}>
                  {scenario.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid w-full gap-2">
          <Label htmlFor="fantasy-description" className="text-xl font-semibold text-foreground text-left mb-2">
            Mon fantasme en quelques mots :
          </Label>
          <Textarea
            id="fantasy-description"
            placeholder="Décris ce qui t'excite le plus, le scénario, les personnages, l'ambiance..."
            value={fantasyDescription}
            onChange={(e) => setFantasyDescription(e.target.value)}
            className="min-h-[150px] bg-muted text-foreground border-muted focus-visible:ring-primary resize-y p-4 rounded-lg"
          />
        </div>

        <div className="grid w-full gap-2">
          <Label htmlFor="erotic-intensity" className="text-xl font-semibold text-foreground text-left mb-2">
            Intensité érotique :
          </Label>
          <Slider
            id="erotic-intensity"
            min={0}
            max={100}
            step={1}
            value={[eroticIntensity]}
            onValueChange={(val) => setEroticIntensity(val[0])}
            aria-label="Intensité érotique"
            className="w-full"
          />
          <div className="flex justify-between text-muted-foreground mt-2 text-sm">
            <span>Doux</span>
            <span className="font-bold text-lg text-primary">{eroticIntensity}</span>
            <span>Extrême</span>
          </div>
        </div>

        <div className="grid w-full gap-2">
          <Label htmlFor="story-duration" className="text-xl font-semibold text-foreground text-left mb-2">
            Durée de l'histoire :
          </Label>
          <Slider
            id="story-duration"
            min={2}
            max={5}
            step={1}
            value={[storyDuration]}
            onValueChange={(val) => setStoryDuration(val[0])}
            aria-label="Durée de l'histoire"
            className="w-full"
          />
          <div className="flex justify-between text-muted-foreground mt-2 text-sm">
            <span>2 min</span>
            <span className="font-bold text-lg text-primary">{storyDuration} min</span>
            <span>5 min</span>
          </div>
        </div>

        <Button
          className="mt-8 w-full py-6 text-xl rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300"
          onClick={handleGenerateStory}
          disabled={!fantasyDescription.trim() || !selectedVoice?.elevenLabsId || isGenerating}
        >
          {isGenerating ? "Création en cours..." : "Créer mon histoire"}
        </Button>
      </div>
    </div>
  )

  const renderFinalScreen = () => (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-screen p-4",
        isTransitioning && transitionDirection === "out" && "animate-fade-out-slide-right",
        isTransitioning && transitionDirection === "in" && "animate-fade-in-slide-left",
      )}
      onAnimationEnd={() => {
        if (transitionDirection === "in") setIsTransitioning(false)
      }}
    >
      {isGenerating ? (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl px-8">
          {/* Messages de chargement */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              {loadingMessage}
            </h2>
          </div>
          
          {/* Barre de progression */}
          <div className="w-full max-w-lg mb-8">
            <div className="relative">
              {/* Barre de fond */}
              <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden shadow-inner">
                {/* Barre de progression */}
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-full transition-all duration-1000 ease-out shadow-lg"
                  style={{ width: `${loadingProgress}%` }}
                >
                  {/* Effet de brillance */}
                  <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                </div>
              </div>
              
              {/* Pourcentage */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <span className="text-amber-400 font-bold text-lg">
                  {Math.round(loadingProgress)}%
                </span>
              </div>
            </div>
          </div>
          
          {/* Message d'encouragement */}
          <div className="text-center">
            <p className="text-xl text-gray-300 font-medium">
              Surtout ne ferme pas l'application,<br />
              ta patience sera récompensée...
            </p>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
            Votre histoire est prête !
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-8">
            {selectedVoice ? `${selectedVoice.name} va vous raconter votre histoire...` : "Votre histoire vous attend..."}
          </p>
          
          <div className="flex flex-col items-center space-y-6 w-full max-w-lg">
            {/* Random Image Display */}
            {randomImage && (
              <div className="w-full max-w-sm">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-primary/20">
                  <Image
                    src={randomImage}
                    alt="Image sensuelle aléatoire"
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                    onError={() => setRandomImage(null)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              </div>
            )}
            
            {/* Audio Player */}
            {audioUrl && (
              <div className="w-full bg-card rounded-2xl p-6 shadow-xl border border-muted/50">
                <div className="flex items-center justify-center mb-4">
                  <Button
                    onClick={togglePlayPause}
                    className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  
                  <Slider
                    value={[currentTime]}
                    max={duration}
                    step={1}
                    onValueChange={handleSeek}
                    className="w-full"
                  />
                  
                  <div className="flex items-center space-x-2">
                    <Volume2 className="w-4 h-4 text-muted-foreground" />
                    <Slider
                      value={[volume]}
                      max={1}
                      step={0.1}
                      onValueChange={handleVolumeChange}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <Button
            className="mt-8 py-3 px-8 rounded-full bg-muted text-muted-foreground hover:bg-muted/80"
            onClick={() => {
              setCurrentStep(0)
              setAudioUrl(null)
              setRandomImage(null)
              setSelectedVoice(null)
              setFantasyDescription("")
              setUserName("")
              setSelectedScenario("")
            }}
          >
            Créer une nouvelle histoire
          </Button>
        </>
      )}
    </div>
  )

  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/images/background-pattern.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        {currentStep === 0 && renderVoiceSelection()}
        {currentStep === 1 && renderFantasyInputScreen()}
        {currentStep === 2 && renderFinalScreen()}
      </div>
      
      {/* Hidden audio element for playback */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
    </div>
  )
}

interface VoiceCardProps {
  voice: Voice
  onPlaySample: (voice: Voice) => void
  onSelectVoice: (voice: Voice) => void
  isSelected: boolean
}

function VoiceCard({ voice, onPlaySample, onSelectVoice, isSelected }: VoiceCardProps) {
  const isDisabled = voice.gender === "female"
  
  return (
    <div
      className={cn(
        "relative flex flex-col items-center p-6 rounded-2xl bg-card shadow-xl transition-all duration-300 border border-transparent",
        !isDisabled && "cursor-pointer hover:scale-[1.03] hover:shadow-2xl hover:border-primary/50",
        isDisabled && "opacity-60 cursor-not-allowed",
        isSelected ? "ring-4 ring-primary animate-glow border-primary" : "",
      )}
    >
      <Image
        src={voice.avatar || "/placeholder.svg"}
        alt={`Avatar de ${voice.name}`}
        width={120}
        height={120}
        className={cn(
          "rounded-full mb-4 object-cover border-4 shadow-lg",
          isDisabled ? "border-gray-400" : "border-primary"
        )}
      />
      <h3 className={cn(
        "text-2xl font-bold mb-2",
        isDisabled ? "text-muted-foreground" : "text-foreground"
      )}>
        {voice.name}
      </h3>
      <p className="text-muted-foreground text-center mb-6 text-sm h-12 flex items-center justify-center">
        {voice.description}
      </p>
      <div className="flex flex-col gap-4 w-full">
        {isDisabled ? (
          <>
            <Button
              className="flex-1 py-3 text-lg rounded-full bg-gray-600 text-gray-400 cursor-not-allowed"
              disabled
            >
              <Play className="w-5 h-5 mr-2" />
              Bientôt disponible
            </Button>
            <Button
              className="flex-1 py-3 text-lg rounded-full bg-gray-600 text-gray-400 cursor-not-allowed"
              disabled
            >
              Bientôt disponible
            </Button>
          </>
        ) : (
          <>
            <Button
              className="flex-1 py-3 text-lg rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
              onClick={() => onPlaySample(voice)}
            >
              <Play className="w-5 h-5 mr-2" />
              Entendre ma voix
            </Button>
            <Button
              className={cn(
                "flex-1 py-3 text-lg rounded-full text-primary-foreground shadow-md transition-all duration-300",
                "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700",
                isSelected && "opacity-80",
              )}
              onClick={() => onSelectVoice(voice)}
            >
              <Image src="/devil-imp-icon.png" alt="Devil Imp Icon" width={20} height={20} className="mr-2" />
              Me choisir
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
