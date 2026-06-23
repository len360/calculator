<script setup lang="ts">
import ExerciseLayout from '@/components/ExerciseLayout.vue'
import { useExercise, type Problem } from '@/composables/useExercise'

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
    emoji="➕"
    accent-color="var(--color-addition)"
    accent-light="var(--color-addition-light)"
    accent-dark="var(--color-addition-dark)"
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
    @check="checkAnswer"
    @next="nextProblem"
  />
</template>
