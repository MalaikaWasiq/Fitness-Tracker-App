// src/context/RoutineContext.js
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const RoutineContext = createContext();

export const RoutineProvider = ({ children }) => {
  const [routines, setRoutines] = useState([]);

  const addRoutine = (routine) => {
    const newRoutine = { id: uuidv4(), ...routine };
    setRoutines((prev) => [newRoutine, ...prev]);
  };

  const deleteRoutine = (id) => {
    setRoutines((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <RoutineContext.Provider value={{ routines, addRoutine, deleteRoutine }}>
      {children}
    </RoutineContext.Provider>
  );
};

export const useRoutines = () => useContext(RoutineContext);
