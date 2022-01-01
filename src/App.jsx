import logo from './logo.svg';
import './App.css';
import { useRef } from 'react';
import { useState } from 'react'; 
import { Form } from './components/Form';
function App() {  
  //=========
// const test = useRef(1) 
// console.log("TEST :",test)
//  const [testit, settestit] = useState(1);

//   const handle = ()=>{ 
//     test
// console.log(test.current + 1)
//   } 

//  const handleClick = ()=>{
//    settestit(testit+1)
//   console.log("Rerensder",testit)
//  } 

 //================
  return ( 

 
    <div className="App">

      <Form />
      
    </div>
  );
}

export default App;
