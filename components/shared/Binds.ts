import { SubmissionStatus } from '@/data';

export const BIND_STATUS: { [key in SubmissionStatus]: [string, string] } = {
  PENDING: ['gray', 'user-submission-status-pending'],
  SUCCESS: ['green', 'user-submission-status-success'],
  PARTIALLY_ACCEPTED: ['blue', 'user-submission-status-partial-success'],
  WRONG_ANSWER: ['red', 'user-submission-status-wrong-answer'],
  CPU_TIME_LIMIT_EXCEEDED: ['red', 'user-submission-status-cpu-time-limit-exceeded'],
  REAL_TIME_LIMIT_EXCEEDED: ['red', 'user-submission-status-real-time-limit-exceeded'],
  MEMORY_LIMIT_EXCEEDED: ['red', 'user-submission-status-memory-limit-exceeded'],
  COMPILE_ERROR: ['black', 'user-submission-status-compile-error'],
  RUNTIME_ERROR: ['orange', 'user-submission-status-runtime-error'],
  SYSTEM_ERROR: ['red', 'user-submission-status-system-error'],
};
