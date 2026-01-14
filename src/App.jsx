import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentList";
import Header from "./components/Header";
import { AppProvider } from "./context/AppContext";


function App() {
  return (
  
    <AppProvider>
      <div className="min-h-screen bg-slate-50 font-sans">
        <div className="max-w-5xl mx-auto px-4">
          
          <Header /> 

          <main className="flex flex-col gap-8 pb-20 mt-8">
            <AppointmentForm />
            <AppointmentList />
          </main>

        </div>
      </div>
    </AppProvider>
  );
}

export default App;