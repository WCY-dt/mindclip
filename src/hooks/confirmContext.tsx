import React, { createContext, useState, useEffect, useContext } from 'react';

import { AppContext } from '../contexts/context';

import '../styles/popups/popup.css';
import '../styles/popups/confirm.css';

type ConfirmAction = {
  message: string;
  confirmAction: () => void;
};

type ConfirmContextType = {
  updateConfirm: (action: ConfirmAction) => void;
  showConfirm: boolean;
  setShowConfirm: (show: boolean) => void;
}

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export const ConfirmProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    setReload
  } = useContext(AppContext);
  const [confirm, setConfirm] = useState<ConfirmAction>({ message: '', confirmAction: () => {} });
  const [showConfirm, setShowConfirm] = useState(false);

  const updateConfirm = (action: ConfirmAction) => {
    setConfirm(action);
  };

  useEffect(() => {
    if (confirm.message) {
      setShowConfirm(true);
    }
  }, [confirm]);

  const onClickConfirm = async () => {
    await confirm.confirmAction();
    setShowConfirm(false);
    setReload(true);
  }

  const onClickCancel = () => {
    setShowConfirm(false);
  }

  return (
    <ConfirmContext.Provider value={{ updateConfirm, showConfirm, setShowConfirm }}>
      {children}
      {showConfirm ?
        <div className="Popup">
          <div className="Confirm-message">{confirm.message}</div>
          <div className="Confirm-button-pair">
            <button type="button" className="Confirm-button Confirm-button-cancel" onClick={onClickCancel}>cancel</button>
            <button type="button" className="Confirm-button Confirm-button-ok" onClick={onClickConfirm} >confirm</button>
          </div>
        </div>
      : null}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return context.updateConfirm;
};

export const useShowConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useShowConfirm must be used within a ConfirmProvider');
  }
  return [context.showConfirm, context.setShowConfirm] as const;
};
