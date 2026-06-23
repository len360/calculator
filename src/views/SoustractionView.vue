<script setup lang="ts">
import { ref } from 'vue'
import ExerciseLayout from '@/components/ExerciseLayout.vue'
import { useExercise, type Problem } from '@/composables/useExercise'
import type { HelpTip } from '@/components/HelpDrawer.vue'

// Reactive settings
const rangeMin = ref(10)
const rangeMax = ref(10000)
const decimals = ref(2)

function generateSoustraction(): Problem {
  const factor = Math.pow(10, decimals.value)
  const range = rangeMax.value - rangeMin.value
  let a = Math.round((Math.random() * range + rangeMin.value) * factor) / factor
  let b = Math.round((Math.random() * range + rangeMin.value) * factor) / factor

  // S'assurer que A >= B pour un résultat positif
  if (a < b) {
    ;[a, b] = [b, a]
  }

  return {
    operandA: a,
    operandB: b,
    operator: '−',
    correctAnswer: Math.round((a - b) * factor) / factor,
    isDecimal: decimals.value > 0,
  }
}

const helpTips: HelpTip[] = [
  {
    title: 'Arrondir puis compenser',
    description: 'Arrondissez le nombre à soustraire, effectuez le calcul, puis ajustez le résultat.',
    example: '543 − 198 → 543 − 200 + 2 = <strong>345</strong>',
  },
  {
    title: 'Soustraire en ajoutant',
    description: 'Au lieu de soustraire, demandez-vous combien il faut ajouter au petit nombre pour arriver au grand.',
    example: '82 − 57 → 57 + ? = 82 → 57 + 3 = 60, 60 + 22 = 82 → <strong>25</strong>',
  },
  {
    title: 'Décomposer le nombre à soustraire',
    description: 'Décomposez le nombre à enlever en morceaux faciles et soustrayez étape par étape.',
    example: '735 − 268 → 735 − 200 = 535, 535 − 60 = 475, 475 − 8 = <strong>467</strong>',
  },
  {
    title: 'Traiter les décimales à part',
    description: 'Séparez les parties entières et décimales, puis soustrayez-les indépendamment.',
    example: '45.80 − 12.35 → (45−12) + (0.80−0.35) = 33 + 0.45 = <strong>33.45</strong>',
  },
  {
    title: 'Ajouter la même valeur aux deux nombres',
    description: 'La différence reste identique si vous ajoutez (ou ôtez) le même montant aux deux opérandes.',
    example: '83 − 47 → 86 − 50 = <strong>36</strong>',
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
} = useExercise(generateSoustraction, () => decimals.value)
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
    :input-mode="decimals > 0 ? 'decimal' : 'numeric'"
    :help-tips="helpTips"
    has-options
    :option-min="rangeMin"
    :option-max="rangeMax"
    :option-decimals="decimals"
    @update:option-min="rangeMin = $event"
    @update:option-max="rangeMax = $event"
    @update:option-decimals="decimals = $event"
    @check="checkAnswer"
    @next="nextProblem"
  />
</template>


