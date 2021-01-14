import './App.css';
import PrivateRoutes from './PrivateRoutes/PrivateRoutes';
import LocalStorage from "./services/localStorage"
import { useState } from 'react';

function App() {
   const [role, setRole] = useState(LocalStorage.getRole());

   return (
      <>
         <PrivateRoutes role={role} setRole={setRole} />
      </>
   );
}

export default App;
