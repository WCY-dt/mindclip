import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Icon } from '@iconify/react';

import { AppContext } from "../hooks/appContext";
import { useConfirm } from "../hooks/confirmContext";
import { useNotification } from "../hooks/notificationContext";
import putCardHandler from "../services/putCardHandler";
import postCardHandler from "../services/postCardHandler";
import deleteLinkHandler from '../services/deleteLinkHandler';

import "../hooks/styles/popup.css";
import "../hooks/styles/edit.css";

type EditFormProps = {
  edit: EditProps;
  routesArray: { value: string, label: unknown }[];
  setShowEdit: (show: boolean) => void;
}

const EditForm = ({ edit, routesArray, setShowEdit }: EditFormProps) => {
  const {
    token,
    setReload
  } = useContext(AppContext);

  const setConfirm = useConfirm();
  const setNotification = useNotification();

  const [id, setId] = useState<number | undefined>(0);
  const [collection, setCollection] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [detail, setDetail] = useState<string>('');
  const [links, setLinks] = useState<LinkProps[]>([]);

  const newLinkBaseId = 10000;
  const [newLinkCount, setNewLinkCount] = useState<number>(newLinkBaseId);

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

  const saveCardAction = async (cluster: ClusterProps) => {
    let saveCardResult;
    if (edit.type === 'MODIFY') {
      saveCardResult = await putCardHandler({ cluster, token });
    } else if (edit.type === 'ADD') {
      saveCardResult = await postCardHandler({ cluster, token });
    }

    if (saveCardResult === true) {
      setShowEdit(false);
      setNotification({
        type: 'SUCCESS',
        message: 'Card saved'
      });
      setReload(true);
    } else {
      setNotification({
        type: 'ERROR',
        message: 'Card saved'
      });
    }
  }

  const onClickSave = () => {
    // 检查是否有未填写的必填项
    if (collection === '' || title === '' || url === '' || category === '' || description === '') {
      setNotification({
        type: 'ERROR',
        message: 'Unfilled fields detected. Save'
      });
      return;
    }
    for (const link of links) {
      if (link.Title === '' || link.Url === '') {
        setNotification({
          type: 'ERROR',
          message: 'Unfilled fields detected. Save'
        });
        return;
      }
    }

    // 检查url是否合法
    try {
      new URL(url);
    } catch {
      setNotification({
        type: 'ERROR',
        message: 'Invalid URL. Save'
      });
      return;
    }
    for (const link of links) {
      try {
        new URL(link.Url);
      } catch {
        setNotification({
          type: 'ERROR',
          message: 'Invalid URL. Save'
        });
        return;
      }
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

    console.log('cluster:', cluster);

    setConfirm({
      message: 'Are you sure to save the edit?',
      confirmAction: () => saveCardAction(cluster)
    });
  }

  const onClickAddLink = () => {
    setNewLinkCount(newLinkCount + 1);
    const newLinks = [...links, {
      Id: newLinkCount,
      CardId: id || undefined,
      Title: '',
      Url: ''
    }];
    setLinks(newLinks);
  }

  const deleteLinkAction = async (id: number) => {
    if (id === undefined) {
      return;
    }

    const deleteLinkResult = await deleteLinkHandler({ id, token });

    if (deleteLinkResult === true) {
      setNotification({
        type: 'SUCCESS',
        message: 'Link delete'
      });
      setReload(true);

      const links = document.getElementById(id.toString());
      if (links) {
        links.remove();
      }
    } else {
      setNotification({
        type: 'ERROR',
        message: 'Link delete'
      });
    }
  }

  const onClickDeleteLink = (type: 'MODIFYLINK' | 'NEWLINK', id: number) => {
    if (type === 'MODIFYLINK') {
      setConfirm({
        message: 'Are you sure to delete this link?',
        confirmAction: () => deleteLinkAction(id as number)
      });
    } else if (type === 'NEWLINK') {
      const newLinks = links.filter((link) => link.Id !== id);
      setLinks(newLinks);
    }
  }

  const onChangeLinkTitle = (id: number, title: string) => {
    const newLinks = links.map((link) => {
      if (link.Id === id) {
        return { ...link, Title: title };
      }
      return link;
    });

    setLinks(newLinks);
  }

  const onChangeLinkUrl = (id: number, url: string) => {
    const newLinks = links.map((link) => {
      if (link.Id === id) {
        return { ...link, Url: url };
      }
      return link;
    });

    setLinks(newLinks);
  }

  return (
    <div className="Popup">
      <div className="Edit-title">Edit</div>
      <div className="Edit-input">
        <label htmlFor="id" hidden>Id</label>
        <input type="text" id="id" name="id" defaultValue={id} hidden />

        <label htmlFor="collection">Collection</label>
        <select id="collection" name="collection"
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
        <input type="text" id="title" name="title"
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="url">Url</label>
        <input type="url" id="url" name="url"
          defaultValue={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <label htmlFor="category">Category</label>
        <input type="text" id="category" name="category"
          defaultValue={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description"
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="detail">Detail</label>
        <textarea id="detail" name="detail"
          defaultValue={detail}
          onChange={(e) => setDetail(e.target.value)}
        />

        <label htmlFor="links">Links</label>
        <div className="Edit-links">
          {links.map((link) => {
            const linkType = (link.Id >= newLinkBaseId ? 'NEWLINK' : 'MODIFYLINK');
            return (
              <div key={link.Id} className="Edit-link" id={link.Id.toString()}>
                <input type="text" name="link-id" defaultValue={link.Id} hidden />
                <input type="text" name="link-card-id" defaultValue={link.CardId} hidden />
                <input
                  type="text"
                  name="link-title"
                  className="Edit-link-title"
                  defaultValue={link.Title}
                  title="Link Title"
                  onChange={(e) => onChangeLinkTitle(link.Id, e.target.value)}
                />
                <input
                  type="url"
                  name="link-url"
                  className="Edit-link-url"
                  defaultValue={link.Url}
                  title="Link URL"
                  onChange={(e) => onChangeLinkUrl(link.Id, e.target.value)}
                />
                <Icon icon="ci:trash-full" className="Edit-link-delete" onClick={() => onClickDeleteLink(linkType, link.Id)}></Icon>
              </div>
            )
          })}
          <Icon icon="ci:table-add" className="Edit-links-add" onClick={onClickAddLink}></Icon>
        </div>
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
