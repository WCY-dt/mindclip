import React, { createContext, useState, useEffect, useContext } from 'react';

import { AppContext } from "./appContext";
import EditForm from '../components/editForm';

import "./styles/popup.css";
import "./styles/edit.css";

type EditContextType = {
  updateEdit: (action: EditProps) => void;
  showEdit: boolean;
  setShowEdit: (show: boolean) => void;
}

const EditContext = createContext<EditContextType | null>(null);

export const EditProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    routes
  } = useContext(AppContext);

  const [edit, setEdit] = useState<EditProps>();
  const [showEdit, setShowEdit] = useState(false);

  const updateEdit = (action: EditProps) => {
    setEdit(action);
  };

  useEffect(() => {
    if (edit) {
      setShowEdit(true);
    }
  }, [edit]);

  const routesArray = Object.entries(routes).map(([value, label]) => ({ value, label }));

  return (
    <EditContext.Provider value={{ updateEdit, showEdit, setShowEdit }}>
      {children}
      {showEdit ?
        <EditForm edit={edit as EditProps} routesArray={routesArray} setShowEdit={setShowEdit} />
        : null}
    </EditContext.Provider>
  );
};


export const useEdit = () => {
  const context = useContext(EditContext);
  if (!context) {
    throw new Error('useEdit must be used within a EditProvider');
  }
  return context.updateEdit;
};

export const useShowEdit = () => {
  const context = useContext(EditContext);
  if (!context) {
    throw new Error('useShowEdit must be used within a EditProvider');
  }
  return [context.showEdit, context.setShowEdit] as const;
};
