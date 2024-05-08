import React, { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';

import { useConfirm } from "../hooks/confirmContext";
import { useNotification } from "../hooks/notificationContext";
import { useCardActions } from '../hooks/cardContext';
import LinkList from '../components/linkList';

import "../hooks/styles/popup.css";
import "../hooks/styles/edit.css";

type EditFormProps = {
  edit: EditProps;
  routesArray: { value: string, label: unknown }[];
  setShowEdit: (show: boolean) => void;
}

const EditForm = ({ edit, routesArray, setShowEdit }: EditFormProps) => {
  const setConfirm = useConfirm();
  const setNotification = useNotification();
  const { saveCardAction } = useCardActions();

  const [id, setId] = useState<number | undefined>(0);
  const [collection, setCollection] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [detail, setDetail] = useState<string>('');
  const [links, setLinks] = useState<LinkProps[]>([]);

  const newLinkBaseId = 10000;

  useEffect(() => {
    setId(edit.cluster.Id as number);
    setCollection(edit.cluster.Collection);
    setTitle(edit.cluster.Title);
    setUrl(edit.cluster.Url);
    setCategory(edit.cluster.Category);
    setDescription(edit.cluster.Description);
    setDetail(edit.cluster.Detail);
    setLinks(edit.cluster.links);
  }, [edit]);

  const onClickClose = useCallback(() => {
    setShowEdit(false);
  }, [setShowEdit]);

  const checkRequiredFields = (fields: string[]): boolean => {
    return fields.some(field => field === '');
  }

  const checkValidUrl = (urls: string[]): boolean => {
    return urls.some(url => {
      try {
        new URL(url);
      } catch {
        return true;
      }
      return false;
    });
  }

  const onClickSave = () => {
    const requiredFields = [collection, title, url, category, description];
    const linkFields = links.map(link => [link.Title, link.Url]).flat();
    const urls = [url, ...links.map(link => link.Url)];

    if (checkRequiredFields(requiredFields) || checkRequiredFields(linkFields)) {
      setNotification({
        type: 'ERROR',
        message: 'Unfilled fields detected. Save'
      });
      return;
    }

    if (checkValidUrl(urls)) {
      setNotification({
        type: 'ERROR',
        message: 'Invalid URL. Save'
      });
      return;
    }

    const cluster: ClusterProps = {
      Id: id,
      Collection: collection,
      Category: category,
      Title: title,
      Url: url,
      Description: description,
      Detail: detail,
      links: links,
    };

    setConfirm({
      message: 'Are you sure to save the edit?',
      confirmAction: () => saveCardAction(cluster, id ? 'MODIFY' : 'ADD')
    });
  }

  return (
    <div className="Popup">
      <div className="Edit-title">Edit</div>
      <div className="Edit-input">
        <label htmlFor="id" hidden>Id</label>
        <input type="text" id="id" name="id" defaultValue={id} hidden />

        <label htmlFor="collection">Collection</label>
        <select id="collection" name="collection" required
          defaultValue={collection}
          onChange={(e) => setCollection(e.target.value)}
        >
          {routesArray.map((route, index) => (
            <option key={index} value={route.label as string}>
              {route.label as string}
            </option>
          ))}
        </select>

        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="url">Url</label>
        <input type="url" id="url" name="url" required
          defaultValue={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <label htmlFor="category">Category</label>
        <input type="text" id="category" name="category" required
          defaultValue={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" required
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="detail">Detail</label>
        <textarea id="detail" name="detail"
          defaultValue={detail}
          onChange={(e) => setDetail(e.target.value)}
        />

        <label htmlFor="links">Links</label>
        <LinkList id={id} links={links} setLinks={setLinks} newLinkBaseId={newLinkBaseId} />

      </div>
      <button type="button" className="Edit-ok" title="Save edit" onClick={onClickSave}>
        Save
      </button>
      <button type="button" className="Edit-close" title="Close" onClick={onClickClose}>
        <Icon icon="ci:close-md" />
      </button>
    </div>
  );
}

export default EditForm;
