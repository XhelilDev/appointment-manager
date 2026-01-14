import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Trash2 } from "lucide-react"; // Importo ikonat

export default function AddAttendeeForm({ appointmentId,isFull }) {
    const [name, setName] = useState('');
    const { addAttendee, appointments,removeAttendee } = useApp(); // Merr funksionin këtu



    // Gjej takimin aktual për të renderuar listën e emrave
    const currentApp = appointments.find(a => a.id === appointmentId);

    function handleSubmit(e) {
      e.preventDefault();
      if (!name.trim() || isFull) return; // Mos lejo shtimin nëse është full
  
      addAttendee(appointmentId, name.trim());
      setName('');
    }
  
    return (
        <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
          {/* Pjesa e Formës (e pandryshuar) */}
          {!isFull ? (
            <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Emri i pjesëmarrësit..."
                className="border p-2 rounded flex-grow text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <button className="bg-indigo-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-indigo-700 transition-all shadow-sm active:scale-95">
                Shto
              </button>
            </form>
          ) : (
            <div className="mb-4 p-2 bg-amber-50 text-amber-700 text-xs rounded border border-amber-100 flex items-center gap-2 font-medium">
               <span>⚠️ Kapaciteti është plotësuar.</span>
            </div>
          )}
    
          {/* Lista e Pjesëmarrësve me Butonin Delete */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Pjesëmarrësit ({currentApp?.attendees?.length || 0})
            </h4>
            <ul className="space-y-1.5">
              {currentApp?.attendees?.map((attendee, index) => (
                <li 
                  key={index} 
                  className="group text-sm text-slate-700 bg-white p-2 px-3 rounded-md border border-slate-200 flex justify-between items-center hover:border-red-200 hover:bg-red-50/30 transition-all"
                >
                  <span className="font-medium">{attendee}</span>
                  
                  <button
                    onClick={() => removeAttendee(appointmentId, attendee)}
                    className="text-slate-300 hover:text-red-500 p-1 rounded-md hover:bg-red-100 transition-colors"
                    title="Hiq nga lista"
                  >
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
              {currentApp?.attendees?.length === 0 && (
                <p className="text-xs text-slate-400 italic py-2 text-center underline-offset-4 underline decoration-slate-200">
                  Asnjë person i regjistruar.
                </p>
              )}
            </ul>
          </div>
        </div>
      );
}