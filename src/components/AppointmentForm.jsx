import { useState } from "react"
import { useApp } from "../context/AppContext";


export default function AppointmentForm() {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [capacity, setCapacity] = useState('');
    const [errors, setErrors] = useState({});

    const { addAppointment, checkDoubleBooking } = useApp();

    function handleSubmit(e) {
        e.preventDefault();
        let validationErrors = {};
        const today = new Date().toISOString().split('T')[0];

        // 1. Validimet bazë
        if (!title.trim()) {
            validationErrors.title = "Titulli nuk mund te jetë i zbrazët!"
        }

        if (!date) {
            validationErrors.date = "Ju lutemi zgjidhni nje date!"
        } else if (date < today) {
            validationErrors.date = "Data nuk mund te jetë më e vjetër se e sotmja!"
        }

        if (!time) {
            validationErrors.time = "Ju lutem zgjidhni kohën!"
        }

        if (Number(capacity) <= 0) {
            validationErrors.capacity = "Kapaciteti duhet të jetë të paktën 1"
        }

      
        if (date && time) {
            const isBooked = checkDoubleBooking(date, time);
            if (isBooked) {
                validationErrors.time = `Ky orar është i zënë për datën ${date}!`;
            }
        }

        // 3. Kontrolli i Error-eve
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // 4. Ruajtja
        const newAppointment = {
            id: crypto.randomUUID(),
            title,
            date,
            time,
            capacity: Number(capacity),
            attendees: []
        }

        addAppointment(newAppointment);
        
        // Resetimi
        setErrors({});
        setTitle('');
        setDate('');
        setTime('');
        setCapacity('');
    }

    return (
        <div className="flex flex-col justify-center  items-center w-full p-4">
            <form 
              onSubmit={handleSubmit} 
              className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col gap-5"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Cakto Takimin</h2>
      
              {/* Grupi i Titullit */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Përshkrimi</label>
                <input 
                  className={`border-2 rounded-lg p-2.5 outline-none transition-all duration-300 ${
                    errors.title ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                  }`}
                  type="text" 
                  placeholder="Shkruani titullin..."
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <span className="text-red-500 text-xs font-medium italic">{errors.title}</span>}
              </div>
      
              {/* Grupi i Datës dhe Kohës */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-600">Data</label>
                  <input 
                    className={`border-2 rounded-lg p-2.5 outline-none transition-all ${
                        errors.date ? 'border-red-400' : 'border-gray-200'
                    }`}
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                  />
                  {errors.date && <span className="text-red-500 text-xs font-medium italic">{errors.date}</span>}
                </div>
      
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-600">Koha</label>
                  <input 
                    className={`border-2 rounded-lg p-2.5 outline-none transition-all ${
                        errors.time ? 'border-red-400' : 'border-gray-200'
                    }`}
                    type="time" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)}
                  />
                  {/* Error-i i Double Booking do të shfaqet këtu */}
                  {errors.time && <span className="text-red-500 text-xs font-medium italic">{errors.time}</span>}
                </div>
              </div>
      
              {/* Grupi i Kapacitetit */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Numri i studentëve</label>
                <input 
                  className={`border-2 rounded-lg p-2.5 outline-none transition-all ${
                      errors.capacity ? 'border-red-400' : 'border-gray-200'
                  }`}
                  type="number" 
                  value={capacity} 
                  onChange={(e) => setCapacity(e.target.value)}
                />
                {errors.capacity && <span className="text-red-500 text-xs font-medium italic">{errors.capacity}</span>}
              </div>
      
              <button 
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all active:transform active:scale-95"
                type="submit"
              >
                Create Appointment
              </button>
            </form>
        </div>
    )
}