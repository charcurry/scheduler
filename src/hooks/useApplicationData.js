import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])

  useEffect(() => {
    updateSpots()
  }, [state.appointments])

  function updateSpots() {
    let spots = 0
     for (let day of state.days) {
      if (day.name === state.day) {
        const dayID = day.id - 1
        for (let appointment of day.appointments) {
          if (state.appointments[appointment].interview !== null) {
            spots += 1
          }
        }
        const updatedDay = {
          ...state.days[dayID],
          spots: 5-spots
        }
        const days = [
          ...state.days,
          updatedDay
        ]
        console.log(days)
        // setState({
        //   ...state,
        //   days
        // })
      }
    }
  }


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview}).then(() => 

    setState({
      ...state,
     appointments
    })
    )
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`).then(() => setState({
      ...state,
     appointments
    })
    )
  }

  return {state, setDay, bookInterview, cancelInterview}
}