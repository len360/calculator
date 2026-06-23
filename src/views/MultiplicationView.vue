<script setup lang="ts">
import ExerciseLayout from '@/components/ExerciseLayout.vue'
import { useExercise, type Problem } from '@/composables/useExercise'
import type { HelpTip } from '@/components/HelpDrawer.vue'

function generateMultiplication(): Problem {
  // Deux entiers à 2 chiffres (10 à 99)
  const a = Math.floor(Math.random() * 90) + 10
  const b = Math.floor(Math.random() * 90) + 10
  return {
    operandA: a,
    operandB: b,
    operator: '×',
    correctAnswer: a * b,
    isDecimal: false,
  }
}

const helpTips: HelpTip[] = [
  {
    title: 'Décomposer un facteur',
    description: 'Décomposez l\'un des nombres en dizaines + unités, multipliez chaque partie, puis additionnez.',
    example: '23 × 14 → 23×10 + 23×4 = 230 + 92 = <strong>322</strong>',
  },
  {
    title: 'Arrondir puis ajuster',
    description: 'Arrondissez un facteur à un nombre rond, multipliez, puis retranchez la différence.',
    example: '19 × 6 → 20×6 − 1×6 = 120 − 6 = <strong>114</strong>',
  },
  {
    title: 'Doubler et diviser par deux',
    description: 'Doublez un facteur et divisez l\'autre par 2 pour simplifier (fonctionne si l\'un est pair).',
    example: '25 × 16 → 50 × 8 = <strong>400</strong>',
  },
  {
    title: 'Multiplier par 11 facilement',
    description: 'Pour multiplier un nombre de 2 chiffres par 11, écartez les deux chiffres et placez leur somme au milieu.',
    example: '36 × 11 → 3_(3+6)_6 = 3_9_6 = <strong>396</strong>',
  },
  {
    title: 'Astuce des carrés proches',
    description: 'Pour a × b, utilisez la formule (a+b)/2² − ((a−b)/2)² si les deux nombres sont proches.',
    example: '21 × 19 → 20² − 1² = 400 − 1 = <strong>399</strong>',
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
} = useExercise(generateMultiplication)
</script>

<template>
  <ExerciseLayout
    title="Multiplication"
    :operand-a="formattedOperandA"
    :operand-b="formattedOperandB"
    operator="×"
    :correct-answer="formattedCorrectAnswer"
    v-model:user-answer="userAnswer"
    :is-answered="isAnswered"
    :is-correct="isCorrect"
    :score="score"
    :total="total"
    input-mode="numeric"
    :help-tips="helpTips"
    @check="checkAnswer"
    @next="nextProblem"
  />
</template>

