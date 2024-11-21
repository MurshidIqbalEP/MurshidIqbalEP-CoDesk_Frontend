import Header from "../components/header"
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function userLayout() {
  
  return (
    <div>
      <Header />
     
       <main>
         <Outlet /> 
       </main>

      
    </div>
  )
}