<script setup lang="ts">
import ExerciseLayout from '@/components/ExerciseLayout.vue'
import { useExercise, type Problem } from '@/composables/useExercise'

function generateDivision(): Problem {
  // Division exacte : on génère le diviseur et le quotient, puis on calcule le dividende
  const diviseur = Math.floor(Math.random() * 90) + 10 // 10 à 99
  const quotient = Math.floor(Math.random() * 9) + 2   // 2 à 10
  const dividende = diviseur * quotient                 // Garantit un résultat entier

  return {
    operandA: dividende,
    operandB: diviseur,
    operator: '÷',
    correctAnswer: quotient,
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
} = useExercise(generateDivision)
</script>

<template>
  <ExerciseLayout
    title="Division"
    :operand-a="formattedOperandA"
    :operand-b="formattedOperandB"
    operator="÷"
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
