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
    <form>
        <strong>Business:</strong><input type='text' name='business' />
        <strong>Date:</strong><input type='date' name='date' />
        <strong>Start-time:</strong><input type='time' name='start_time' />
        <strong>End-time:</strong><input type='time' name='end_time' />
        <input type='submit' value='Send Appointment' onSubmit={handlesubmit} />
    </form>
  )
}

export default Add