import type { AcademicPerformance, PerformanceSnapshot, Project, RankingSnapshot, Student } from '../types'

export type RankingPeriod = 'current' | '2026-10' | '2026-09'
export type RankedStudent = { student: Student; score: number; academicScore: number; examAverage: number; instructorScore: number; projectAverage: number; assignmentScore: number; consistencyScore: number; portfolioProjects: number; recommendations: number; position: number; previousPosition: number | null; movement: number }

export const ACADEMIC_WEIGHTS = { instructor: 0.35, exams: 0.30, projects: 0.20, assignments: 0.10, consistency: 0.05 } as const
export const RANKING_WEIGHTS = { academic: 0.55, portfolio: 0.15, projectQuality: 0.15, recommendations: 0.15 } as const
const average = (values: number[]) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0
const round = (value: number) => Math.round(value * 10) / 10

export function performanceBreakdown(performance: AcademicPerformance, period: RankingPeriod = 'current') {
  const snapshot: PerformanceSnapshot | undefined = period === 'current'
    ? undefined
    : performance.history.find(item => item.period === period)
  const instructorScore = snapshot?.instructorScore ?? average(performance.instructorEvaluations.map(item => item.score))
  const examAverage = snapshot?.examScore ?? average(performance.examResults.map(item => item.score / item.maximumScore * 100))
  const projectAverage = snapshot?.projectScore ?? average(performance.projectEvaluations.filter(item => item.status === 'Evaluated').map(item => item.score))
  const assignmentScore = snapshot?.assignmentScore ?? performance.assignmentScore
  const consistencyScore = snapshot?.consistencyScore ?? performance.consistencyScore
  const score = round(instructorScore * ACADEMIC_WEIGHTS.instructor + examAverage * ACADEMIC_WEIGHTS.exams + projectAverage * ACADEMIC_WEIGHTS.projects + assignmentScore * ACADEMIC_WEIGHTS.assignments + consistencyScore * ACADEMIC_WEIGHTS.consistency)
  return { score, examAverage: round(examAverage), instructorScore: round(instructorScore), projectAverage: round(projectAverage), assignmentScore: round(assignmentScore), consistencyScore: round(consistencyScore) }
}

function portfolioBreakdown(student: Student, period: RankingPeriod, projects?: Project[]) {
  const academic = performanceBreakdown(student.academicPerformance, period)
  const ownProjects = projects?.filter(project => project.studentId === student.id)
  const portfolioProjects = ownProjects?.length ?? student.academicPerformance.projectEvaluations.length
  const completedProjects = ownProjects
    ? ownProjects.filter(project => project.status === 'Completed' && project.score > 0)
    : student.academicPerformance.projectEvaluations.filter(project => project.status === 'Evaluated')
  const projectAverage = completedProjects.length
    ? round(average(completedProjects.map(project => project.score)))
    : academic.projectAverage
  const recommendations = student.academicPerformance.instructorEvaluations.filter(item => item.score >= 85).length
  const portfolioScore = Math.min(100, portfolioProjects / 5 * 100)
  const recommendationScore = Math.min(100, recommendations / 4 * 100)
  const score = round(
    academic.score * RANKING_WEIGHTS.academic +
    portfolioScore * RANKING_WEIGHTS.portfolio +
    projectAverage * RANKING_WEIGHTS.projectQuality +
    recommendationScore * RANKING_WEIGHTS.recommendations,
  )
  return { ...academic, academicScore: academic.score, score, projectAverage, portfolioProjects, recommendations }
}

function sortedFor(students: Student[], period: RankingPeriod, projects?: Project[]) {
  return students.map(student => ({ student, ...portfolioBreakdown(student, period, projects) }))
    .sort((a, b) => b.score - a.score || b.academicScore - a.academicScore || b.portfolioProjects - a.portfolioProjects || b.recommendations - a.recommendations || a.student.name.localeCompare(b.student.name))
}

export function getRankings(students: Student[], courseId: string | 'all' = 'all', period: RankingPeriod = 'current', projects?: Project[]): RankedStudent[] {
  const cohort = courseId === 'all' ? students : students.filter(student => student.courseId === courseId)
  const current = sortedFor(cohort, period, projects)
  const previous = sortedFor(cohort, period === 'current' ? '2026-10' : '2026-09', projects)
  const previousPositions = new Map(previous.map((item, index) => [item.student.id, index + 1]))
  return current.map((item, index) => {
    const previousPosition = previousPositions.get(item.student.id) ?? null
    return { ...item, position: index + 1, previousPosition, movement: previousPosition === null ? 0 : previousPosition - index - 1 }
  })
}

export function getRankingSnapshots(students: Student[], period: RankingPeriod = 'current', projects?: Project[]): RankingSnapshot[] {
  const periodKey = period === 'current' ? '2026-11' : period
  const createdAt = period === 'current' ? '2026-11-19' : `${period}-30`
  const courseIds = Array.from(new Set(students.map(student => student.courseId)))
  return courseIds.flatMap(courseId => getRankings(students, courseId, period, projects).map(result => ({ studentId: result.student.id, courseId, score: result.score, position: result.position, period: periodKey, createdAt })))
}

export function getStudentRanking(students: Student[], studentId: string, projects?: Project[]) {
  return getRankings(students, 'all', 'current', projects).find(item => item.student.id === studentId)
}

export function getStudentCourseRanking(students: Student[], studentId: string, projects?: Project[]) {
  const student = students.find(item => item.id === studentId)
  return student ? getRankings(students, student.courseId, 'current', projects).find(item => item.student.id === studentId) : undefined
}

export function historyFor(student: Student) {
  const previous = student.academicPerformance.history.map(snapshot => ({ period: snapshot.period, ...performanceBreakdown(student.academicPerformance, snapshot.period as RankingPeriod) }))
  return [...previous, { period: '2026-11', ...performanceBreakdown(student.academicPerformance, 'current') }]
}
