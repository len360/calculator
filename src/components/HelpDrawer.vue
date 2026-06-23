<script setup lang="ts">
import { watch } from 'vue'

export interface HelpTip {
  title: string
  description: string
  example?: string
}

const props = defineProps<{
  open: boolean
  tips: HelpTip[]
  operationName: string
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

function close() {
  emit('update:open', false)
}

// Prevent body scroll when drawer is open
watch(() => props.open, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        @click="close"
      />
    </Transition>

    <!-- Drawer -->
    <Transition name="slide-up">
      <div
        v-if="open"
        class="fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] flex flex-col bg-white rounded-t-3xl shadow-2xl"
        role="dialog"
        aria-modal="true"
        :aria-label="`Astuces pour ${operationName}`"
      >
        <!-- Handle bar -->
        <div class="flex justify-center pt-3 pb-1 shrink-0">
          <div class="w-10 h-1.5 rounded-full bg-gray-300" />
        </div>

        <!-- Header -->
        <div class="flex items-center justify-between px-6 pb-4 pt-2 border-b border-gray-100 shrink-0">
          <h2 class="text-xl font-bold text-text-primary">
            Astuces — {{ operationName }}
          </h2>
          <button
            @click="close"
            class="p-2 -mr-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Tips list -->
        <div class="overflow-y-auto overscroll-contain px-6 py-5">
          <div
            v-for="(tip, index) in tips"
            :key="index"
          >
            <div v-if="index > 0" class="border-t border-gray-100 my-5" />

            <p class="text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">
              Méthode {{ index + 1 }}
            </p>
            <h3 class="text-lg font-bold text-text-primary mb-1">{{ tip.title }}</h3>
            <p class="text-base text-text-secondary leading-relaxed">{{ tip.description }}</p>
            <p
              v-if="tip.example"
              class="mt-2.5 text-[0.9rem] text-text-primary/80 leading-relaxed pl-3 border-l-2 border-primary/25"
              v-html="tip.example"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Fade for backdrop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide up for drawer */
.slide-up-enter-active {
  transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1);
}
.slide-up-leave-active {
  transition: transform 0.25s cubic-bezier(0.32, 0.72, 0, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
