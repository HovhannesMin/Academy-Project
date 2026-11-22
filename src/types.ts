export type StudentStatus = 'Active' | 'Graduated' | 'Paused' | 'At risk'
export type Proficiency = 'Beginner' | 'Developing' | 'Intermediate' | 'Advanced'
export type SkillCategory = 'Programming Languages' | 'Frameworks' | 'Databases' | 'Tools & Platforms' | 'AI & Machine Learning' | 'Design & Creative Tools' | 'Computer Science Fundamentals' | 'DevOps & Infrastructure'

export interface SkillEvidence {
  name: string
  category: SkillCategory
  proficiency: Proficiency
  module: string
  evidence: string
}

export interface Project {
  id: string
  studentId: string
  title: string
  description: string
  technologies: string[]
  category: string
  completedAt: string
  score: number
  status: 'Completed' | 'In review' | 'In progress'
  art: string
}

export interface Achievement {
  title: string
  kind: 'Milestone' | 'Certificate' | 'Exam' | 'Recognition'
  date: string
  note: string
}

export interface Student {
  id: string
  name: string
  photoUrl: string
  socialProfiles: { linkedin: string; github: string }
  courseId: string
  level: 'Foundation' | 'Intermediate' | 'Advanced'
  stage: string
  progress: number
  status: StudentStatus
  enrolledAt: string
  bio: string
  skills: SkillEvidence[]
  achievements: Achievement[]
  readiness: { technical: number; projects: number; problemSolving: number; portfolio: number }
  academicPerformance: AcademicPerformance
}

export interface InstructorEvaluation {
  id: string
  instructorId: string
  score: number
  feedback: string
  evaluationDate: string
}

export interface ExamResult {
  id: string
  courseId: string
  examTitle: string
  score: number
  maximumScore: number
  examDate: string
}

export interface ProjectEvaluation {
  id: string
  projectId: string
  score: number
  feedback: string
  submissionDate: string
  status: 'Evaluated' | 'Pending'
}

export interface UpcomingAssessment {
  id: string
  title: string
  scheduledDate: string
  kind: 'Exam' | 'Project review'
}

export interface PerformanceSnapshot {
  period: string
  instructorScore: number
  examScore: number
  projectScore: number
  assignmentScore: number
  consistencyScore: number
}

export interface AcademicPerformance {
  instructorEvaluations: InstructorEvaluation[]
  examResults: ExamResult[]
  projectEvaluations: ProjectEvaluation[]
  upcomingAssessments: UpcomingAssessment[]
  assignmentScore: number
  consistencyScore: number
  history: PerformanceSnapshot[]
}

export interface RankingSnapshot {
  studentId: string
  courseId: string
  score: number
  position: number
  period: string
  createdAt: string
}

export interface Module {
  name: string
  topics: string[]
  skills: string[]
  assignment: string
}

export interface RoadmapPhase {
  name: string
  modules: Module[]
}

export interface Course {
  id: string
  title: string
  track: string
  duration: string
  learningLevel: string
  summary: string
  objectives: string[]
  technologies: string[]
  colors: [string, string]
  icon: string
  publicInfo: 'Verified public details' | 'Illustrative demo roadmap'
  source: string
  phases: RoadmapPhase[]
  professionalOutcomes: string[]
}
