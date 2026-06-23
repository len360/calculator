<script setup lang="ts">
import { RouterLink } from 'vue-router'

const modules = [
  {
    name: 'Addition',
    emoji: '➕',
    route: '/addition',
    color: 'var(--color-addition)',
    colorDark: 'var(--color-addition-dark)',
    description: 'Nombres décimaux',
  },
  {
    name: 'Soustraction',
    emoji: '➖',
    route: '/soustraction',
    color: 'var(--color-soustraction)',
    colorDark: 'var(--color-soustraction-dark)',
    description: 'Nombres décimaux',
  },
  {
    name: 'Multiplication',
    emoji: '✖️',
    route: '/multiplication',
    color: 'var(--color-multiplication)',
    colorDark: 'var(--color-multiplication-dark)',
    description: 'Nombres entiers',
  },
  {
    name: 'Division',
    emoji: '➗',
    route: '/division',
    color: 'var(--color-division)',
    colorDark: 'var(--color-division-dark)',
    description: 'Division exacte',
  },
]
</script>

<template>
  <div class="min-h-dvh flex flex-col items-center justify-center px-5 py-10">
    <!-- Header -->
    <header class="text-center mb-12">
      <div class="text-6xl mb-4">🧠</div>
      <h1 class="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight">
        Calcul Mental
      </h1>
      <p class="mt-3 text-xl text-text-secondary font-medium">
        Choisissez votre exercice
      </p>
    </header>

    <!-- Grille de modules -->
    <nav class="w-full max-w-lg flex flex-col gap-4" aria-label="Modules d'exercices">
      <RouterLink
        v-for="mod in modules"
        :key="mod.name"
        :to="mod.route"
        class="group flex items-center gap-5 p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-200 active:scale-[0.98] border-2 border-transparent hover:border-current"
        :style="{ '--tw-border-opacity': '0.3', color: mod.color }"
      >
        <span
          class="flex items-center justify-center w-16 h-16 rounded-xl text-3xl shrink-0 transition-transform duration-200 group-hover:scale-110"
          :style="{ backgroundColor: mod.color, color: 'white' }"
        >
          {{ mod.emoji }}
        </span>
        <div class="flex flex-col">
          <span
            class="text-2xl font-bold transition-colors duration-200"
            :style="{ color: 'var(--color-text-primary)' }"
          >
            {{ mod.name }}
          </span>
          <span class="text-base text-text-secondary font-medium">
            {{ mod.description }}
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 ml-auto opacity-40 group-hover:opacity-80 transition-all duration-200 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2.5"
          :style="{ color: mod.color }"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </RouterLink>
    </nav>

    <!-- Footer -->
    <footer class="mt-12 text-center text-text-secondary text-sm">
      <p>Entraînez-vous chaque jour 💪</p>
    </footer>
  </div>
</template>
