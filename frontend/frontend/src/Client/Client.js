import React from 'react';
import { useState, useCallback } from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, Page, getJson, setOptions } from '@mobiscroll/react';
import '../App.css';
import axios from "axios"

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

function Client() {
    const min = '2022-02-11T00:00';
    const max = '2022-08-11T00:00';
    const [datetimeLabels, setDatetimeLabels] = useState([]);
    const [datetimeInvalid, setDatetimeInvalid] = useState([]);
    const [appointments, setAppointments] = useState([])
    
    const getData = (date) => {
      var a = new Date(date)
      var txt = a.getFullYear() + '-' + String(a.getMonth()+1) + '-' + a.getDate()
      console.log(txt)
      axios.get('http://127.0.0.1:8000/appointment/client', {date:txt})
        .then(res => setAppointments(res))
    }

    const onPageLoadingDatetime = useCallback((event, inst) => {
        getDatetimes(event.firstDay, (bookings) => {
            setDatetimeLabels(bookings.labels);
            setDatetimeInvalid(bookings.invalid);
        });
    }, []);
    
    const getDatetimes = (d, callback) => {
        let invalid = [];
        let labels = [];

        // getJson('https://trial.mobiscroll.com/getbookingtime/?year=' + d.getFullYear() + '&month=' + d.getMonth(), (bookings) => {
        getJson('https://trial.mobiscroll.com/getbookingtime/?year=' + d.getFullYear() + '&month=' + d.getMonth(), (bookings) => {
          for (let i = 0; i < bookings.length; ++i) {
                const booking = bookings[i];
                const bDate = new Date(booking.d);

                if (booking.nr > 0) {
                    labels.push({
                        start: bDate,
                        title: booking.nr + ' events',
                        textColor: '#e1528f'
                    });
                    invalid = [...invalid, ...booking.invalid];
                } else {
                    invalid.push(d);
                }
            }
            callback({ labels: labels, invalid: invalid });
        }, 'jsonp');
    }
    
    const deleteApp = (id) => {
        axios.delete(`http://127.0.0.1:8000/appointment/${id}`)
            .then(res => setAppointments(res))
    }

    return (
        <div>
        <Page className="md-calendar-booking">
            <div className="mbsc-form-group">
                <div className="mbsc-form-group-title">Select date & time</div>
                <Datepicker 
                    display="inline"
                    controls={['calendar', 'timegrid']}
                    min={min}
                    max={max}
                    minTime="08:00"
                    maxTime="19:59"
                    stepMinute={60}
                    width={null}
                    labels={datetimeLabels}
                    invalid={datetimeInvalid}
                    onPageLoading={onPageLoadingDatetime}
                    cssClass="booking-datetime"
                    onChange={(date) => getData(date.value)}
                />
            </div>
            <div className="mbsc-form-group">
                <div className="mbsc-form-group-title">Appointment</div>
                <a className='content' href='/add'>Add Appointment</a>
            </div>
        </Page>
        <div>
            <ul>
                {appointments.map(appointment => {
                    <li style={{display:'flex',justifyContent:'space-between'}}>
                        <span>{appointment.start_time} - {appointment.end_time}: <a href='/{appointment.id}'>{appointment.service}({appointment.business})</a></span>
                        <span>status: {appointment.status}</span>
                        <button onClick={deleteApp(this, appointment.id)}>delete</button>
                    </li>
                })}
            </ul>
        </div>
        </div>
    );
}

export default Client;