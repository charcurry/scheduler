// the getAppointmentsForDay function retrieves each appointment for the selected day and returns them in the form of an array
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

// the getInterview function retrieves the interview object for the selected appointment and returns it in the form of an object
export function getInterview(state, interview) {
  const Interview = {}
  if (interview === null) {
    return null
  }
  Interview['student'] = interview.student
  Interview['interviewer'] = state.interviewers[`${interview.interviewer}`]
  return Interview
}

// the getInterviewersForDay function retrieves each interviewer for the selected day and returns them in the form of an array
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