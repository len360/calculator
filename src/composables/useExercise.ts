import { ref, computed } from 'vue'

export interface Problem {
  operandA: number
  operandB: number
  operator: string
  correctAnswer: number
  /** Whether the answer should be checked as a decimal (with tolerance) */
  isDecimal: boolean
}

export function useExercise(generateFn: () => Problem) {
  const problem = ref<Problem>(generateFn())
  const userAnswer = ref('')
  const isAnswered = ref(false)
  const isCorrect = ref(false)
  const score = ref(0)
  const total = ref(0)

  const formattedOperandA = computed(() => {
    return problem.value.isDecimal
      ? problem.value.operandA.toFixed(2).replace('.', ',')
      : problem.value.operandA.toString()
  })

  const formattedOperandB = computed(() => {
    return problem.value.isDecimal
      ? problem.value.operandB.toFixed(2).replace('.', ',')
      : problem.value.operandB.toString()
  })

  const formattedCorrectAnswer = computed(() => {
    return problem.value.isDecimal
      ? problem.value.correctAnswer.toFixed(2).replace('.', ',')
      : problem.value.correctAnswer.toString()
  })

  function checkAnswer() {
    if (userAnswer.value.trim() === '' || isAnswered.value) return

    // Normalize input: accept both comma and dot as decimal separator
    const normalized = userAnswer.value.replace(',', '.')
    const parsed = parseFloat(normalized)

    if (isNaN(parsed)) return

    total.value++
    isAnswered.value = true

    if (problem.value.isDecimal) {
      // For decimals, round both to 2 decimal places and compare
      isCorrect.value =
        Math.round(parsed * 100) === Math.round(problem.value.correctAnswer * 100)
    } else {
      isCorrect.value = parsed === problem.value.correctAnswer
    }

    if (isCorrect.value) {
      score.value++
    }
  }

  function nextProblem() {
    problem.value = generateFn()
    userAnswer.value = ''
    isAnswered.value = false
    isCorrect.value = false
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
