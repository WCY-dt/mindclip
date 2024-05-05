import React, { useContext } from "react";
import { Icon } from '@iconify/react';

import { AppContext } from "../contexts/context";

import "../styles/popups/popup.css";
import "../styles/popups/edit.css";

function Edit() {
  const {
    routes,
    showEdit, setShowEdit,
    editContent,
    editType
  } = useContext(AppContext);

  const onClickClose = () => {
    setShowEdit(false);
  }

  if (!showEdit) {
    return null;
  }

  const routesArray = Object.entries(routes).map(([value, label]) => ({ value, label }));

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
        <input type="text" id="title" name="title" defaultValue={editType === 'modify' ? editContent?.Title : ''} />

        <label htmlFor="url">Url</label>
        <input type="url" id="url" name="url" defaultValue={editType === 'modify' ? editContent?.Url : ''} />

        <label htmlFor="category">Category</label>
        <input type="text" id="category" name="category" defaultValue={editType === 'modify' ? editContent?.Category : ''} />

        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" defaultValue={editType === 'modify' ? editContent?.Description : ''} />

        <label htmlFor="detail">Detail</label>
        <textarea id="detail" name="detail" defaultValue={editType === 'modify' ? editContent?.Detail : ''} />

        <label htmlFor="links">Links</label>
        <div className="Edit-links">
          {editType === 'modify' && editContent?.links?.map((link) => (
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

export default Edit;
