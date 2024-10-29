import "./App.css";
import Navbar from './component/Navbar/Navbar';
import ContectHeader from './component/Contect/ContectHeader';
import ContectForm from './component/ContectForm/ContectForm'
function App() {
  return (
    <div>
      <Navbar/>
      <main className="main_container">
      <ContectHeader/>
      <ContectForm/>
      </main>
    </div>
  );
}

export default App;
