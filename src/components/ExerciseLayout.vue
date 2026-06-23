<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  title: string
  emoji: string
  accentColor: string
  accentLight: string
  accentDark: string
  operandA: string
  operandB: string
  operator: string
  correctAnswer: string
  userAnswer: string
  isAnswered: boolean
  isCorrect: boolean
  score: number
  total: number
  inputMode?: string
}>()

const emit = defineEmits<{
  'update:userAnswer': [value: string]
  'check': []
  'next': []
}>()

const router = useRouter()
const inputRef = ref<HTMLInputElement | null>(null)
const showFeedback = ref(false)
const shakeInput = ref(false)

function handleCheck() {
  emit('check')
  // Trigger feedback animation on next tick
  setTimeout(() => {
    showFeedback.value = true
    if (!props.isCorrect) {
      shakeInput.value = true
      setTimeout(() => { shakeInput.value = false }, 400)
    }
  }, 50)
}

function handleNext() {
  showFeedback.value = false
  emit('next')
  nextTick(() => {
    inputRef.value?.focus()
  })
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    if (props.isAnswered) {
      handleNext()
    } else {
      handleCheck()
    }
  }
}

function goHome() {
  router.push('/')
}

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <div class="min-h-dvh flex flex-col">
    <!-- Header -->
    <header
      class="px-5 py-4 flex items-center justify-between shadow-sm"
      :style="{ backgroundColor: accentColor }"
    >
      <button
        @click="goHome"
        class="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-lg font-medium"
        aria-label="Retour à l'accueil"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Accueil
      </button>
      <h1 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-2xl">{{ emoji }}</span>
        {{ title }}
      </h1>
      <div class="text-white/90 font-semibold text-lg tabular-nums">
        {{ score }}/{{ total }}
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-1 flex flex-col items-center justify-center px-5 py-8 gap-8">
      <!-- Calcul affiché -->
      <div class="w-full max-w-lg bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center gap-6">
        <!-- Expression -->
        <div class="flex items-baseline gap-3 flex-wrap justify-center">
          <span class="text-5xl sm:text-6xl md:text-7xl font-extrabold text-text-primary tabular-nums">
            {{ operandA }}
          </span>
          <span
            class="text-4xl sm:text-5xl md:text-6xl font-bold"
            :style="{ color: accentColor }"
          >
            {{ operator }}
          </span>
          <span class="text-5xl sm:text-6xl md:text-7xl font-extrabold text-text-primary tabular-nums">
            {{ operandB }}
          </span>
        </div>

        <!-- Séparateur -->
        <div class="w-full h-px bg-gray-200"></div>

        <!-- Zone de saisie -->
        <div class="w-full flex flex-col items-center gap-4">
          <label class="text-xl text-text-secondary font-medium">Votre réponse</label>
          <div class="relative w-full max-w-xs">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-text-secondary">=</span>
            <input
              ref="inputRef"
              type="text"
              :inputmode="inputMode || 'numeric'"
              :value="userAnswer"
              @input="emit('update:userAnswer', ($event.target as HTMLInputElement).value)"
              @keydown="handleKeydown"
              :disabled="isAnswered"
              :class="[
                'w-full pl-12 pr-4 py-4 text-4xl font-bold text-center rounded-2xl border-3 outline-none transition-all duration-200 tabular-nums',
                shakeInput ? 'animate-shake' : '',
                isAnswered && isCorrect
                  ? 'border-success bg-success-light text-success'
                  : isAnswered && !isCorrect
                    ? 'border-error bg-error-light text-error'
                    : 'border-gray-300 focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-ring)]'
              ]"
              :style="{
                '--accent': accentColor,
                '--accent-ring': accentLight,
              } as Record<string, string>"
              placeholder="?"
              autocomplete="off"
              aria-label="Saisissez votre réponse"
            />
          </div>
        </div>

        <!-- Feedback -->
        <Transition name="page">
          <div v-if="isAnswered && showFeedback" class="w-full animate-pop-in">
            <div
              :class="[
                'flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-xl font-semibold',
                isCorrect
                  ? 'bg-success-light text-success'
                  : 'bg-error-light text-error'
              ]"
            >
              <span class="text-3xl">{{ isCorrect ? '✅' : '❌' }}</span>
              <span v-if="isCorrect">Bravo, c'est correct !</span>
              <span v-else>
                La bonne réponse était <strong class="ml-1">{{ correctAnswer }}</strong>
              </span>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Boutons d'action -->
      <div class="w-full max-w-lg flex flex-col gap-3">
        <button
          v-if="!isAnswered"
          @click="handleCheck"
          :disabled="userAnswer.trim() === ''"
          :class="[
            'w-full py-5 rounded-2xl text-2xl font-bold text-white shadow-lg transition-all duration-200',
            userAnswer.trim() === ''
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:shadow-xl active:scale-[0.98] cursor-pointer'
          ]"
          :style="{
            backgroundColor: userAnswer.trim() === '' ? accentColor : accentColor,
          }"
        >
          Valider
        </button>
        <button
          v-else
          @click="handleNext"
          class="w-full py-5 rounded-2xl text-2xl font-bold text-white shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200 cursor-pointer"
          :style="{ backgroundColor: accentDark }"
        >
          Calcul suivant →
        </button>
      </div>
    </main>
  </div>
</template>
