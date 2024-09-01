import LoanForm from './components/LoanForm';
import LoanList from './components/LoanList';
import './App.css';

function App() {
  return (
    <div className="App">
    <h1>Micro Lending Platform</h1>
    <LoanForm />
    <LoanList />
  </div>
  );
}

export default App;
