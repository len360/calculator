<script setup lang="ts">
import { RouterLink } from 'vue-router'

const modules = [
  {
    name: 'Addition',
    symbol: '+',
    route: '/addition',
    description: 'Nombres décimaux',
  },
  {
    name: 'Soustraction',
    symbol: '−',
    route: '/soustraction',
    description: 'Nombres décimaux',
  },
  {
    name: 'Multiplication',
    symbol: '×',
    route: '/multiplication',
    description: 'Nombres entiers',
  },
  {
    name: 'Division',
    symbol: '÷',
    route: '/division',
    description: 'Division exacte',
  },
]
</script>

<template>
  <div class="min-h-dvh flex flex-col items-center justify-center px-5 py-10">
    <!-- Header -->
    <header class="text-center mb-18">
      <h1 class="text-5xl sm:text-6xl font-extrabold text-text-primary tracking-tight">
        Calcul Mental
      </h1>
      <p class="mt-4 text-lg text-text-secondary font-medium">Choisissez votre exercice</p>
    </header>

    <!-- Module grid -->
    <nav class="w-full max-w-11/12 flex flex-col gap-3" aria-label="Modules d'exercices">
      <RouterLink
        v-for="mod in modules"
        :key="mod.name"
        :to="mod.route"
        class="group flex items-center justify-between px-6 py-5 rounded-2xl bg-surface-card transition-all duration-200 active:scale-[0.98] hover:shadow-md"
      >
        <div class="flex items-center gap-4">
          <span
            class="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-white text-xl font-bold shrink-0"
          >
            {{ mod.symbol }}
          </span>
          <div class="flex flex-col">
            <span class="text-xl font-semibold text-text-primary">
              {{ mod.name }}
            </span>
            <span class="text-sm text-text-secondary">
              {{ mod.description }}
            </span>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-text-secondary opacity-40 group-hover:opacity-80 transition-all duration-200 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </RouterLink>
    </nav>
  </div>
</template>
