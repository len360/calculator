<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import HelpDrawer from '@/components/HelpDrawer.vue'
import type { HelpTip } from '@/components/HelpDrawer.vue'
import OptionsDrawer from '@/components/OptionsDrawer.vue'

const props = defineProps<{
  title: string
  operandA: string
  operandB: string
  operator: string
  correctAnswer: string
  userAnswer: string
  isAnswered: boolean
  isCorrect: boolean
  score: number
  total: number
  inputMode?:
    | 'text'
    | 'none'
    | 'email'
    | 'search'
    | 'tel'
    | 'url'
    | 'numeric'
    | 'decimal'
    | undefined
  helpTips?: HelpTip[]
  hasOptions?: boolean
  optionMin?: number
  optionMax?: number
  optionDecimals?: number
}>()

const emit = defineEmits<{
  'update:userAnswer': [value: string]
  check: []
  next: []
  'update:optionMin': [value: number]
  'update:optionMax': [value: number]
  'update:optionDecimals': [value: number]
}>()

const router = useRouter()
const inputRef = ref<HTMLInputElement | null>(null)
const showFeedback = ref(false)
const shakeInput = ref(false)
const showHelp = ref(false)
const showOptions = ref(false)

function handleCheck() {
  emit('check')
  setTimeout(() => {
    showFeedback.value = true
    if (!props.isCorrect) {
      shakeInput.value = true
      setTimeout(() => {
        shakeInput.value = false
      }, 400)
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
  <div class="min-h-dvh flex flex-col bg-surface">
    <!-- Header -->
    <header class="py-5 px-4 flex items-center justify-between bg-primary">
      <div class="flex gap-2 items-center">
        <button
          @click="goHome"
          class="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-lg font-medium cursor-pointer"
          aria-label="Retour à l'accueil"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-2xl font-bold text-white">
          {{ title }}
        </h1>
      </div>
      <div class="flex items-center gap-2">
        <button
          v-if="hasOptions"
          @click="showOptions = true"
          class="p-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/15 transition-all duration-200 cursor-pointer"
          aria-label="Options"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
        <button
          v-if="helpTips && helpTips.length"
          @click="showHelp = true"
          class="p-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/15 transition-all duration-200 cursor-pointer"
          aria-label="Afficher les astuces"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </button>
        <div class="text-white/80 font-semibold text-lg tabular-nums">{{ score }}/{{ total }}</div>
      </div>
    </header>

    <!-- Calculation — centered in the remaining space -->
    <main class="flex-1 flex flex-col items-center justify-center px-5">
      <!-- Expression -->
      <div class="flex items-baseline gap-3 flex-wrap justify-center">
        <span
          class="text-5xl sm:text-6xl md:text-7xl font-extrabold text-text-primary tabular-nums"
        >
          {{ operandA }}
        </span>
        <span class="text-4xl sm:text-5xl md:text-6xl font-bold text-primary">
          {{ operator }}
        </span>
        <span
          class="text-5xl sm:text-6xl md:text-7xl font-extrabold text-text-primary tabular-nums"
        >
          {{ operandB }}
        </span>
      </div>

      <!-- Feedback -->
      <Transition name="page">
        <div v-if="isAnswered && showFeedback" class="mt-8 animate-pop-in">
          <div
            class="flex items-center justify-center gap-3 py-3 px-6 rounded-xl text-lg font-semibold bg-success-light text-success"
          >
            <span>Correct</span>
          </div>
        </div>
      </Transition>
    </main>

    <!-- Input bar — pinned at bottom -->
    <footer class="px-5 pb-6 pt-4 bg-surface">
      <div class="w-full max-w-lg mx-auto flex flex-col gap-3">
        <!-- Input field -->
        <div class="relative">
          <span
            class="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-text-secondary"
            >=</span
          >
          <input
            ref="inputRef"
            type="text"
            :inputmode="inputMode || 'numeric'"
            :value="userAnswer"
            @input="emit('update:userAnswer', ($event.target as HTMLInputElement).value)"
            @keydown="handleKeydown"
            :disabled="isAnswered"
            :class="[
              'w-full pl-12 pr-4 py-4 text-3xl font-bold text-center rounded-2xl border-2 outline-none transition-all duration-200 tabular-nums bg-surface-card',
              shakeInput ? 'animate-shake border-error bg-error-light text-error' : '',
              isAnswered
                ? 'border-success bg-success-light text-success'
                : !shakeInput
                  ? 'border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/15'
                  : '',
            ]"
            placeholder="?"
            autocomplete="off"
            aria-label="Saisissez votre réponse"
          />
        </div>

        <!-- Action button -->
        <button
          v-if="!isAnswered"
          @click="handleCheck"
          :disabled="userAnswer.trim() === ''"
          :class="[
            'w-full py-4 rounded-2xl text-xl font-bold text-white transition-all duration-200 bg-primary',
            userAnswer.trim() === ''
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-primary-dark active:scale-[0.98] cursor-pointer',
          ]"
        >
          Valider
        </button>
        <button
          v-else
          @click="handleNext"
          class="w-full py-4 rounded-2xl text-xl font-bold text-white bg-primary-dark hover:bg-primary active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          Suivant
        </button>
      </div>
    </footer>

    <!-- Help Drawer -->
    <HelpDrawer
      v-if="helpTips && helpTips.length"
      :open="showHelp"
      @update:open="showHelp = $event"
      :tips="helpTips"
      :operation-name="title"
    />

    <!-- Options Drawer -->
    <OptionsDrawer
      v-if="hasOptions"
      :open="showOptions"
      @update:open="showOptions = $event"
      :min="optionMin ?? 10"
      :max="optionMax ?? 10000"
      :decimals="optionDecimals ?? 2"
      :operation-name="title"
      @update:min="emit('update:optionMin', $event)"
      @update:max="emit('update:optionMax', $event)"
      @update:decimals="emit('update:optionDecimals', $event)"
    />
  </div>
</template>
