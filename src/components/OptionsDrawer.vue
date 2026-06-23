<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{
  open: boolean
  min: number
  max: number
  decimals: number
  operationName: string
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  'update:min': [value: number]
  'update:max': [value: number]
  'update:decimals': [value: number]
}>()

function close() {
  emit('update:open', false)
}

function updateMin(e: Event) {
  const val = parseFloat((e.target as HTMLInputElement).value)
  if (!isNaN(val) && val >= 0) {
    emit('update:min', val)
  }
}

function updateMax(e: Event) {
  const val = parseFloat((e.target as HTMLInputElement).value)
  if (!isNaN(val) && val > 0) {
    emit('update:max', val)
  }
}

function setDecimals(value: number) {
  emit('update:decimals', value)
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
        :aria-label="`Options pour ${operationName}`"
      >
        <!-- Handle bar -->
        <div class="flex justify-center pt-3 pb-1 shrink-0">
          <div class="w-10 h-1.5 rounded-full bg-gray-300" />
        </div>

        <!-- Header -->
        <div class="flex items-center justify-between px-6 pb-4 pt-2 border-b border-gray-100 shrink-0">
          <h2 class="text-xl font-bold text-text-primary">
            Options — {{ operationName }}
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

        <!-- Options content -->
        <div class="overflow-y-auto overscroll-contain px-6 py-5">

          <!-- Range section -->
          <p class="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
            Plage des nombres
          </p>

          <div class="flex items-center gap-4 mb-2">
            <div class="flex-1">
              <label class="block text-sm font-medium text-text-secondary mb-1.5">Minimum</label>
              <input
                type="number"
                :value="min"
                @change="updateMin"
                min="0"
                step="1"
                class="w-full px-4 py-3 text-lg font-semibold text-text-primary bg-surface rounded-xl border border-gray-200 outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all tabular-nums"
              />
            </div>
            <span class="text-text-secondary font-medium mt-6">à</span>
            <div class="flex-1">
              <label class="block text-sm font-medium text-text-secondary mb-1.5">Maximum</label>
              <input
                type="number"
                :value="max"
                @change="updateMax"
                min="1"
                step="1"
                class="w-full px-4 py-3 text-lg font-semibold text-text-primary bg-surface rounded-xl border border-gray-200 outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all tabular-nums"
              />
            </div>
          </div>

          <p class="text-sm text-text-secondary mb-6">
            Les opérandes seront générés entre ces deux valeurs.
          </p>

          <!-- Decimals section -->
          <div class="border-t border-gray-100 pt-5">
            <p class="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              Chiffres après la virgule
            </p>

            <div class="flex gap-2">
              <button
                v-for="n in [0, 1, 2, 3]"
                :key="n"
                @click="setDecimals(n)"
                :class="[
                  'flex-1 py-3 rounded-xl text-lg font-bold transition-all duration-200 cursor-pointer',
                  decimals === n
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-surface text-text-secondary border border-gray-200 hover:border-primary/40 hover:text-text-primary'
                ]"
              >
                {{ n }}
              </button>
            </div>

            <p class="text-sm text-text-secondary mt-2">
              {{ decimals === 0 ? 'Nombres entiers uniquement.' : `Les nombres auront jusqu'à ${decimals} décimale${decimals > 1 ? 's' : ''}.` }}
            </p>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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
