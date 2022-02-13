import React from 'react'
import axios from 'axios'

const handlesubmit = (e) => {
  e.preventDefault();
    axios.post('http://127.0.0.1:8000/appointment/add',{
        business: e.target.elements.business.value,
        date: e.target.elements.date.value,
        start_time: e.target.elements.start_time.value,
        end_time: e.target.elements.end_time.value,
    })
        .then(res => alert(res.message))
}

function Add() {
  return (
    <form style={{margin:'50px'}}>
        <label for="business" className="form-label" >Business:</label>
        <input type='text' className="form-control" name='business' id='business' />
        <label for="date" className="form-label">Date:</label>
        <input type='date' className="form-control" name='date' id='date' />
        <label for="start_time" className="form-label">Start-time:</label>
        <input type='time' className="form-control" name='start_time' id='start_time' />
        <label for="end_time" className="form-label">End-time:</label>
        <input type='time' name='end_time' className="form-control" id="end_time" />
        <input type='submit' value='Send Appointment' onSubmit={handlesubmit} className="btn btn-primary" />
    </form>
  )
}

export default Add