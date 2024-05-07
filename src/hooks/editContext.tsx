import React, { createContext, useState, useEffect, useContext } from 'react';
import { Icon } from '@iconify/react';

import { AppContext } from "./appContext";

import "../styles/popups/popup.css";
import "../styles/popups/edit.css";

type EditProps = {
  type: 'ADD' | 'MODIFY';
  cluster: ClusterProps;
};

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
    <EditContext.Provider value={{ updateEdit: updateEdit, showEdit: showEdit, setShowEdit: setShowEdit }}>
      {children}
      {showEdit ?
        <EditForm edit={edit} routesArray={routesArray} setShowEdit={setShowEdit} />
        : null}
    </EditContext.Provider>
  );
};

type EditFormProps = {
  edit?: EditProps;
  routesArray: { value: string, label: unknown }[];
  setShowEdit: (show: boolean) => void;
}

const EditForm = ({ edit, routesArray, setShowEdit }: EditFormProps) => {
  const onClickClose = () => {
    setShowEdit(false);
  };

  return (
    <div className="Popup">
      <div className="Edit-title">Edit</div>
      <div className="Edit-input">
        <label htmlFor="collection">Collection</label>

        <select id="collection" name="collection">
          {routesArray.map((route, index) => (
            <option key={index} value={route.label as string}>
              {route.label as string}
            </option>
          ))}
        </select>

        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" defaultValue={edit?.type === 'MODIFY' ? edit.cluster?.Title : ''} />

        <label htmlFor="url">Url</label>
        <input type="url" id="url" name="url" defaultValue={edit?.type === 'MODIFY' ? edit.cluster?.Url : ''} />

        <label htmlFor="category">Category</label>
        <input type="text" id="category" name="category" defaultValue={edit?.type === 'MODIFY' ? edit.cluster?.Category : ''} />

        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" defaultValue={edit?.type === 'MODIFY' ? edit.cluster?.Description : ''} />

        <label htmlFor="detail">Detail</label>
        <textarea id="detail" name="detail" defaultValue={edit?.type === 'MODIFY' ? edit.cluster?.Detail : ''} />

        <label htmlFor="links">Links</label>
        <div className="Edit-links">
          {edit?.type === 'MODIFY' && edit.cluster?.links?.map((link) => (
            <div key={link.Url} className="Edit-link">
              <input type="text" name="link-title" className="Edit-link-title" defaultValue={link.Title} title="Link Title" />
              <input type="url" name="link-url" className="Edit-link-url" defaultValue={link.Url} title="Link URL" />
              <Icon icon="ci:trash-full" className="Edit-link-delete"></Icon>
            </div>
          ))}
          <Icon icon="ci:table-add" className="Edit-links-add"></Icon>
        </div>
      </div>
      <button type="button" className="Edit-ok" title="Save edit">Save</button>
      <button type="button" className="Edit-close" title="Close" onClick={onClickClose}>
        <Icon icon="ci:close-md" />
      </button>
    </div>
  );
}


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
