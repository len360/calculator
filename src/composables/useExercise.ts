import { ref, computed } from 'vue'

export interface Problem {
  operandA: number
  operandB: number
  operator: string
  correctAnswer: number
  /** Whether the answer should be checked as a decimal (with tolerance) */
  isDecimal: boolean
}

export function useExercise(generateFn: () => Problem, getDecimals?: () => number) {
  const problem = ref<Problem>(generateFn())
  const userAnswer = ref('')
  const isAnswered = ref(false)
  const isCorrect = ref(false)
  const score = ref(0)
  const total = ref(0)

  const hasAttempted = ref(false)
  const hasFailed = ref(false)

  const decimals = computed(() => getDecimals ? getDecimals() : 2)

  const formattedOperandA = computed(() => {
    return problem.value.isDecimal
      ? problem.value.operandA.toFixed(decimals.value).replace('.', ',')
      : problem.value.operandA.toString()
  })

  const formattedOperandB = computed(() => {
    return problem.value.isDecimal
      ? problem.value.operandB.toFixed(decimals.value).replace('.', ',')
      : problem.value.operandB.toString()
  })

  const formattedCorrectAnswer = computed(() => {
    return problem.value.isDecimal
      ? problem.value.correctAnswer.toFixed(decimals.value).replace('.', ',')
      : problem.value.correctAnswer.toString()
  })

  function checkAnswer() {
    if (userAnswer.value.trim() === '' || isAnswered.value) return

    // Normalize input: accept both comma and dot as decimal separator
    const normalized = userAnswer.value.replace(',', '.')
    const parsed = parseFloat(normalized)

    if (isNaN(parsed)) return

    if (!hasAttempted.value) {
      total.value++
      hasAttempted.value = true
    }

    if (problem.value.isDecimal) {
      // For decimals, round both to the configured decimal places and compare
      const factor = Math.pow(10, decimals.value)
      isCorrect.value =
        Math.round(parsed * factor) === Math.round(problem.value.correctAnswer * factor)
    } else {
      isCorrect.value = parsed === problem.value.correctAnswer
    }

    if (isCorrect.value) {
      isAnswered.value = true
      if (!hasFailed.value) {
        score.value++
      }
    } else {
      hasFailed.value = true
    }
  }

  function nextProblem() {
    problem.value = generateFn()
    userAnswer.value = ''
    isAnswered.value = false
    isCorrect.value = false
    hasAttempted.value = false
    hasFailed.value = false
  }

  return {
    problem,
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
  }
}

