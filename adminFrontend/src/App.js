import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateEmployee from './components/CreateEmployee';
import CreateVendor from './components/CreateVendor';
import SendEmail from './components/SendEmail';
import EmailLogs from './components/EmailLogs';
import Employees from './components/Employees';
import Vendors from './components/Vendors';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/create-vendor" element={<CreateVendor />} />
          <Route path="/send-email" element={<SendEmail />} />
          <Route path="/email-logs" element={<EmailLogs />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/vendors" element={<Vendors />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
