<script setup lang="ts">
import ExerciseLayout from '@/components/ExerciseLayout.vue'
import { useExercise, type Problem } from '@/composables/useExercise'
import type { HelpTip } from '@/components/HelpDrawer.vue'

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

const helpTips: HelpTip[] = [
  {
    title: 'Penser à la multiplication inverse',
    description: 'Demandez-vous : « quel nombre multiplié par le diviseur donne le dividende ? »',
    example: '156 ÷ 12 → 12 × ? = 156 → 12 × 13 = 156 → <strong>13</strong>',
  },
  {
    title: 'Diviser par étapes',
    description: 'Décomposez le dividende en parties facilement divisibles, puis additionnez les résultats.',
    example: '396 ÷ 6 → 360÷6 + 36÷6 = 60 + 6 = <strong>66</strong>',
  },
  {
    title: 'Utiliser les multiples connus',
    description: 'Repérez le multiple du diviseur le plus proche du dividende, puis ajustez.',
    example: '475 ÷ 25 → 25×10=250, 25×20=500 → trop de 25 → 25×19=475 → <strong>19</strong>',
  },
  {
    title: 'Diviser par 2 plusieurs fois',
    description: 'Pour diviser par 4, 8 ou 16… divisez successivement par 2.',
    example: '248 ÷ 8 → 248÷2=124, 124÷2=62, 62÷2=<strong>31</strong>',
  },
  {
    title: 'Critères de divisibilité',
    description: 'Utilisez les règles rapides : par 2 (chiffre pair), par 3 (somme des chiffres ÷ 3), par 5 (termine par 0 ou 5), par 9 (somme des chiffres ÷ 9).',
    example: '135 ÷ 9 → 1+3+5 = 9 ✓ → 135÷9 = <strong>15</strong>',
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
    :help-tips="helpTips"
    @check="checkAnswer"
    @next="nextProblem"
  />
</template>

