import { useState, useEffect } from "react";
import axios from "axios";

// the useApplicationData function deals with all of the logic to do with the Application component
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // sets the day in the state
  const setDay = day => setState({ ...state, day });

  // axios.gets each api component and sets the state with the information gathered from them
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])

  // updates the spot for one day
  function spotUpdate(weekday, day, variable, id, appointment) {
    let spots = day.spots
    if (weekday === day.name && variable === "REMOVE_SPOTS" && appointment[id].interview === null) {
      return spots - 1
    }
    if (weekday === day.name && variable === "REMOVE_SPOTS" && appointment[id].interview !== null) {
      return spots
    }
    if (weekday === day.name && variable === "ADD_SPOTS" && appointment[id].interview !== null) {
      return spots + 1
    }
    return spots
  }

  // updates the spots for every day
  function updateSpots(weekday, days, appointments, id, variable) {
    if (variable === "REMOVE_SPOTS") {
      const updateDaysArray = days.map(day => {
        return {
          ...day,
          spots: spotUpdate(weekday, day, variable, id, appointments)
        }
      })
      return updateDaysArray
    }
    if (variable === "ADD_SPOTS") {
      const updateDaysArray = days.map(day => {
        return {
          ...day,
          spots: spotUpdate(weekday, day, variable, id, appointments)
        }
      })
      return updateDaysArray
    }
  }

  // books an interview with a given appointment id and interview object
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview }).then(() => {
      const spotUpdate = updateSpots(state.day, state.days, state.appointments, id, "REMOVE_SPOTS")
      setState({
        ...state,
        appointments,
        days: spotUpdate
      })
    }
    )
  }

  // cancels an interview with a given appointment id
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`).then(() => {
      const spotUpdate = updateSpots(state.day, state.days, state.appointments, id, "ADD_SPOTS")
      setState({
        ...state,
        appointments,
        days: spotUpdate
      })
    }

    )
  }

  return { state, setDay, bookInterview, cancelInterview }
}