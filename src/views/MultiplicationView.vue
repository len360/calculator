<script setup lang="ts">
import ExerciseLayout from '@/components/ExerciseLayout.vue'
import { useExercise, type Problem } from '@/composables/useExercise'

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
    emoji="✖️"
    accent-color="var(--color-multiplication)"
    accent-light="var(--color-multiplication-light)"
    accent-dark="var(--color-multiplication-dark)"
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
    @check="checkAnswer"
    @next="nextProblem"
  />
</template>
