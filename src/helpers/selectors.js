export function getAppointmentsForDay(state, day) {
  const appointments = []
  for (let aDay of state.days) {
    if (aDay.name === day) {
      for (let id of aDay.appointments) {
        appointments.push(state.appointments[`${id}`])
      }
    }
  }
  return appointments
}

export function getInterview(state, interview) {
  const Interview = {}
  if (interview === null) {
    return null
  }
  Interview['student'] = interview.student
  Interview['interviewer'] = state.interviewers[`${interview.interviewer}`]
  return Interview
}

export function getInterviewersForDay(state, day) {
  const interviewers = []
  for (let aDay of state.days) {
    if (aDay.name === day) {
      for (let id of aDay.interviewers) {
        interviewers.push(state.interviewers[`${id}`])
      }
    }
  }
  return interviewers
}