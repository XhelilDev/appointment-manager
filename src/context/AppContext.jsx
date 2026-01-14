import { createContext, useContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext);

const AppContext = createContext();

export function AppProvider({ children }) {
    const [appointments, setAppointments] = useState(() => {
        const stored = localStorage.getItem("appointments");
        return stored ? JSON.parse(stored) : [];
      });



    function addAppointment(appointment){
      setAppointments(appointments=>[...appointments,appointment])
  
    }

    const addAttendee = (appointmentId, attendeeName) => {
        setAppointments((prev) =>
          prev.map((app) => {
            if (app.id === appointmentId) {
              if (app.attendees.length >= app.capacity) return app;
              return {
                ...app,
                attendees: [...app.attendees, attendeeName],
              };
            }
            return app;
          })
        );
      };
      
      

      function deleteAppointment (appointmentId) {
        setAppointments(prev=>prev.filter(app => app.id !== appointmentId));
      };

       function isAppointmentFull(appointmentId){

        const appointment=appointments.find(a=>a.id===appointmentId);
        if (!appointment) return false;

        return appointment.attendees.length>=appointment.capacity;
      }

      function removeAttendee(appointmentId,attendeeName){
        setAppointments((prevAppointments)=>
        prevAppointments.map((app)=>
        app.id===appointmentId?{
            ...app,
            attendees:app.attendees.filter((name)=>name!==attendeeName)
        }
        :app
        ))
      }

      function checkDoubleBooking(date,time){
        return appointments.some((app)=>
        app.date===date&&app.time===time
        )
      }

      useEffect(() => {
        localStorage.setItem(
          "appointments",
          JSON.stringify(appointments)
        );
      }, [appointments]);
      
     

  return (
    <AppContext.Provider value={{ 
        appointments, 
        addAppointment,
        checkDoubleBooking,
        addAttendee,
        deleteAppointment,
        isAppointmentFull,
        removeAttendee}}>
      {children}
    </AppContext.Provider>
  );
}


    

