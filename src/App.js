import React, { useState, useEffect } from "react"
import axios from "axios"
import moment from "moment"
import API_ENDPOINTS from "./constants/api"

export default function App() {
  /* Seat current data values */
  const [appCurrentState, setCurrentState] = useState({
    meta: {
      current_positive: 0,
      current_positive_increase: 0,
      current_recovered: 0,
      current_death: 0,
      current_death_increase: 0,
      current_data_quality: "",
      last_updated: 0
    },
  })

  const setCurrentData = async () => {
    let api_current_response
    try {
      api_current_response = await axios.get(API_ENDPOINTS.OH_CURRENT)
    } catch (error) {
      console.log("Error:", error)
      return
    }

    setCurrentState({
      meta: {
        current_positive: api_current_response.data.positive,
        current_positive_increase: api_current_response.data.positiveIncrease,
        current_recovered: api_current_response.data.recovered,
        current_death: api_current_response.data.death,
        current_death_increase: api_current_response.data.deathConfirmed,
        current_data_quality: api_current_response.data.dataQualityGrade,
        last_updated: api_current_response.data.lastUpdateEt
      },
    })
  }


  /* Set historic data values */
  const [appHistoryState, setHistoryState] = useState({
    meta: {
      history_positive: 0,
      history_positive_increase: 0,
      history_recovered: 0,
      history_death: 0,
      history_death_increase: 0,
      last_updated: 0
    },
  })

  const setHistoryData = async () => {
    let api_history_response
    try {
      api_history_response = await axios.get(API_ENDPOINTS.OH_HISTORY)
    } catch (error) {
      console.log("Error:", error)
      return
    }

    setHistoryState({
      meta: {
        history_positive: api_history_response.data.positive,
        history_positive_increase: api_history_response.data.positiveIncrease,
        history_recovered: api_history_response.data.recovered,
        history_death: api_history_response.data.death,
        history_death_increase: api_history_response.data.deathConfirmed,
        last_updated: api_history_response.data.lastUpdateEt
      },
    })
  }

  useEffect(() => {
    setCurrentData(appCurrentState)
    setHistoryData(appHistoryState)
  }, [])


  return(
    <div>
      <p>Current Positive: {appCurrentState.meta.current_positive}</p>
      <p>Current Positive Increase: {appCurrentState.meta.current_positive_increase}</p>
      <p>Current Recovered: {appCurrentState.meta.current_recovered}</p>
      <p>Current Death: {appCurrentState.meta.current_death}</p>
      <p>Current Death Increase: {appCurrentState.meta.current_death_increase}</p>
      <p>Current Data Quality: {appCurrentState.meta.current_data_quality}</p>
      <br />
      <p>History Positive: {appHistoryState.meta.history_positive}</p>
      <p>History Positive Increase: {appHistoryState.meta.history_positive_increase}</p>
      <p>History Recovered: {appHistoryState.meta.history_recovered}</p>
      <p>History Death: {appHistoryState.meta.history_death}</p>
      <p>History Death Increase: {appHistoryState.meta.history_death_increase}</p>
      <br />
      <p>Last Updated: {appCurrentState.meta.last_updated}</p>
    </div>
  )
}