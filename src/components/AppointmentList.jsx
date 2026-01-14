import { useEffect, useState, } from "react";
import { useApp } from "../context/AppContext";
import Appointment from "./Appointment";

export default function AppointmentList() {
  const { appointments } = useApp();

  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setLoading(false);
  }, []);

 

  if (loading) {
    return (
      <div className="w-full text-center p-10">
        <p className="text-slate-400 animate-pulse">
          Duke ngarkuar terminet...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {appointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {appointments
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((appointment) => (
              <Appointment 
                appointment={appointment} 
                key={appointment.id} 
              />
            ))}
        </div>
      ) : (
        <div className="text-center p-10 border-2 border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-400 font-medium">Nuk ka termine te regjistruara</p>
        </div>
      )}
    </div>
  );
}

