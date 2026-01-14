
import { useState } from "react";
import AddAttendeeForm from "./AddAttendeeForm";
import { Calendar, Clock, Users, Trash2, Lock} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Appointment({ appointment }) {
    const [showAttendeeForm,setShowAttendeeForm]=useState(false);
    const {isAppointmentFull,deleteAppointment}=useApp();
    const isFull = isAppointmentFull(appointment.id);

 


    function handleShowForm(){
        setShowAttendeeForm(show=>!show)
        console.log(showAttendeeForm)
    }


    return (
      <li className="list-none bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative group">
        {/* Butoni për fshirje që shfaqet kur kalon mausin (hover) */}
        <button 
          onClick={() => deleteAppointment(appointment.id)}
          className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
        >
          <Trash2 size={18} />
        </button>
  
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-slate-800 capitalize">
            {appointment.title}
          </h3>
  
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-md text-blue-700">
              <Calendar size={14} />
              <span>{appointment.date}</span>
            </div>
  
            <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-md text-amber-700">
              <Clock size={14} />
              <span>{appointment.time || "Pa orar"}</span>
            </div>
  
            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md text-slate-700">
              <Users size={14} />
              <span>Kapaciteti: {appointment.capacity || "0"}</span>
            </div>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                isFull 
                ? "bg-red-50 text-red-700 border border-red-100" 
                : "bg-slate-50 text-slate-700 border border-slate-100"
            }`}>
                {/* Kushti për Ikonën */}
                {isFull ? <Lock size={14} /> : <Users size={14} />}

                {/* Kushti për Tekstin */}
                {!isFull ? (
                <span>
                Vende te zena: <span className="font-bold">{appointment.attendees.length}</span>/{appointment.capacity}
                </span>
                ) : (
                <span className="font-semibold">Lista e plotesuar</span>
                )}
            </div>
          </div>
        </div>
        <button 
            onClick={handleShowForm}
             className={`
                mt-4 w-fit mx-auto md:mx-0 flex items-center justify-center gap-2 px-6 py-2.5 active:scale-95 rounded-lg text-sm font-semibold transition-all duration-200
                ${showAttendeeForm 
                ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200'
                }
                `}
                >
                {/* Mund të shtosh edhe një ikonë dinamike nëse ke lucide-react */}
                <span>
                    {
                    !isFull?(
                        showAttendeeForm ? 'Mbyll Listen' : 'Shto Pjesëmarrës'
                    ):
                    showAttendeeForm?"Lista e plotsuar/Mbyll":"Shiko pjesëmarrës"
                    }
                 
                    </span>
                </button>

            {showAttendeeForm && (
            <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <AddAttendeeForm appointmentId={appointment.id} isFull={isFull} />
            </div>
            )}
      </li>
    );
  }