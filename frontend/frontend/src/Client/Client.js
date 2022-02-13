import React, { useEffect } from 'react';
import { useState, useCallback } from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, Page, getJson, setOptions } from '@mobiscroll/react';
import '../App.css';
import axios from "axios"
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Image,
    List,
    Menu,
    Segment
  } from "semantic-ui-react";
//   import "semantic-ui-css/semantic.min.css";
  import {Link} from 'react-router-dom'
  import { Navigate } from 'react-router';

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

function Client() {
    // const business = document.getElementById('id_business').value
    // console.log(business)
    const token = localStorage.getItem("token");
    const [data, setData] = useState([])
    // const [datetimeLabels, setDatetimeLabels] = useState([]);
    // const [datetimeInvalid, setDatetimeInvalid] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const getData = (date) => {
      var txt = date.getFullYear() + '-' + 0+String(date.getMonth()+1) + '-' + date.getDate()
      console.log(txt)
      console.log(data)
      axios.get('http://127.0.0.1:8000/appointment/business/')
        .then(res => setData(res.data))
      axios.get('http://127.0.0.1:8000/appointment/client/',{date:txt})
        .then(res => console.log(res)
        // setAppointments(res)
        )
    }

    const getDatetimes = (d, callback) => {
      let invalid = [];
      let labels = [];

      // getJson('https://trial.mobiscroll.com/getbookingtime/?year=' + d.getFullYear() + '&month=' + d.getMonth(), (bookings) => {
      //   for (let i = 0; i < bookings.length; ++i) {
      //         const booking = bookings[i];
      //         const bDate = new Date(booking.d);

      //         if (booking.nr > 0) {
      //             labels.push({
      //                 start: bDate,
      //                 title: booking.nr + ' events',
      //                 textColor: '#e1528f'
      //             });
      //             invalid = [...invalid, ...booking.invalid];
      //         } else {
      //             invalid.push(d);
      //         }
      //     }
      //     callback({ labels: labels, invalid: invalid });
      // }, 'jsonp');
  }

    const myInvalid = React.useMemo(() => {
      return [{
          start: '2022-02-13T08:00',
          end: '2022-02-13T13:00'
      }, {
          start: '2022-02-13T15:00',
          end: '2022-02-13T17:00'
      }, {
          start: '2022-02-13T19:00',
          end: '2022-02-13T20:00'
      }];
  }, []);
    
    const deleteApp = (id) => {
        axios.delete(`http://127.0.0.1:8000/appointment/${id}`)
            .then(res => setAppointments(res))
    }

    const logout = () => {
        localStorage.removeItem('token')
        return <Navigate to="/" />;
    }

    return (
        <div>
        <Menu fixed="top" inverted>
          <Container>
            <Link to="/">
              <Menu.Item header>Home</Menu.Item>
            </Link>
            {token ? (
              <Menu.Item header onClick={logout}>
                Logout
              </Menu.Item>
            ) : (
              <React.Fragment>
                <Link to="/login">
                  <Menu.Item header>Login</Menu.Item>
                </Link>
                <Link to="/signup">
                  <Menu.Item header>Signup</Menu.Item>
                </Link>
              </React.Fragment>
            )}
          </Container>
        </Menu>
        <Page className="md-calendar-booking">
            <div className="mbsc-form-group">
                <div className="mbsc-form-group-title">Select date & time</div>
                <Datepicker 
                    display="inline"
                    controls={['calendar', 'timegrid']}
                    minTime="08:00"
                    maxTime="19:59"
                    stepMinute={30}
                    width={null}
                    // labels={datetimeLabels}
                    invalid={myInvalid}
                    cssClass="booking-datetime"
                    onChange={(date) => getData(date.value)}
                />
            </div>
        </Page>
        <div>
          <div className="mbsc-form-group">
            Business:<select name="business" required="" id="id_business">
                  <option selected="">---------</option>
                  {data.map((business) => {
                    return <option key={business.id}>{business.name}</option>
                  })}
                </select>
                <div className="mbsc-form-group-title">Appointment</div>
                <a className='content' href='/add'>Add Appointment</a>
            </div>
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