import { CalendarCheck2, LayoutDashboard } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Header() {
  const { appointments } = useApp();
  const count = appointments.length;

  return (
    <header className="w-full py-10 flex flex-col items-center justify-center text-center">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-100 ring-4 ring-indigo-50">
          <CalendarCheck2 className="text-white" size={32} />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
          Appoint<span className="text-indigo-600">Me</span>
        </h1>
      </div>

      {/* Badge për statistikat */}
      <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full shadow-sm">
        <div className={`w-2 h-2 rounded-full ${count > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
        <span className="text-sm font-bold text-slate-700">
          {count === 0 ? "Nuk keni takime" : `${count} Takime Aktive`}
        </span>
      </div>
      
      <p className="mt-4 text-slate-500 text-sm max-w-xs font-medium italic">
        "Organizimi është çelësi i suksesit."
      </p>
    </header>
  );
}