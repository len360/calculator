<script setup lang="ts">
import ExerciseLayout from '@/components/ExerciseLayout.vue'
import { useExercise, type Problem } from '@/composables/useExercise'
import type { HelpTip } from '@/components/HelpDrawer.vue'

function generateAddition(): Problem {
  // Nombres décimaux entre 10.00 et 10000.00
  const a = Math.round((Math.random() * 9990 + 10) * 100) / 100
  const b = Math.round((Math.random() * 9990 + 10) * 100) / 100
  return {
    operandA: a,
    operandB: b,
    operator: '+',
    correctAnswer: Math.round((a + b) * 100) / 100,
    isDecimal: true,
  }
}

const helpTips: HelpTip[] = [
  {
    title: 'Décomposer les nombres',
    description: 'Séparez chaque nombre en parties plus simples : unités, dizaines, centaines… puis additionnez chaque partie séparément.',
    example: '347 + 256 → (300+200) + (40+50) + (7+6) = 500 + 90 + 13 = <strong>603</strong>',
  },
  {
    title: 'Arrondir puis ajuster',
    description: 'Arrondissez un nombre au dizain ou centaine la plus proche, faites l\'addition, puis corrigez.',
    example: '198 + 45 → 200 + 45 − 2 = <strong>243</strong>',
  },
  {
    title: 'Compenser entre les deux nombres',
    description: 'Transférez une quantité d\'un nombre vers l\'autre pour obtenir un calcul plus facile.',
    example: '67 + 28 → 65 + 30 = <strong>95</strong>',
  },
  {
    title: 'Additionner les décimales séparément',
    description: 'Pour les nombres à virgule, additionnez d\'abord les parties entières, puis les décimales.',
    example: '12.75 + 8.50 → 12 + 8 = 20, puis 0.75 + 0.50 = 1.25 → <strong>21.25</strong>',
  },
  {
    title: 'Chercher les compléments à 10',
    description: 'Repérez les paires de chiffres qui font 10 pour simplifier vos calculs.',
    example: '6 + 7 + 4 + 3 → (6+4) + (7+3) = 10 + 10 = <strong>20</strong>',
  },
]

const {
  userAnswer,
  isAnswered,
  isCorrect,
  score,
  total,
  formattedOperandA,
  formattedOperandB,
  formattedCorrectAnswer,
  checkAnswer,
  nextProblem,
} = useExercise(generateAddition)
</script>

<template>
  <ExerciseLayout
    title="Addition"
    :operand-a="formattedOperandA"
    :operand-b="formattedOperandB"
    operator="+"
    :correct-answer="formattedCorrectAnswer"
    v-model:user-answer="userAnswer"
    :is-answered="isAnswered"
    :is-correct="isCorrect"
    :score="score"
    :total="total"
    input-mode="decimal"
    :help-tips="helpTips"
    @check="checkAnswer"
    @next="nextProblem"
  />
</template>

