<script setup lang="ts">
import ExerciseLayout from '@/components/ExerciseLayout.vue'
import { useExercise, type Problem } from '@/composables/useExercise'

function generateSoustraction(): Problem {
  // Nombres décimaux entre 10.00 et 10000.00, avec A >= B
  let a = Math.round((Math.random() * 9990 + 10) * 100) / 100
  let b = Math.round((Math.random() * 9990 + 10) * 100) / 100

  // S'assurer que A >= B pour un résultat positif
  if (a < b) {
    ;[a, b] = [b, a]
  }

  return {
    operandA: a,
    operandB: b,
    operator: '−',
    correctAnswer: Math.round((a - b) * 100) / 100,
    isDecimal: true,
  }
}

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
} = useExercise(generateSoustraction)
</script>

<template>
  <ExerciseLayout
    title="Soustraction"
    :operand-a="formattedOperandA"
    :operand-b="formattedOperandB"
    operator="−"
    :correct-answer="formattedCorrectAnswer"
    v-model:user-answer="userAnswer"
    :is-answered="isAnswered"
    :is-correct="isCorrect"
    :score="score"
    :total="total"
    input-mode="decimal"
    @check="checkAnswer"
    @next="nextProblem"
  />
</template>
