import React, { useState } from 'react';
import { Icon } from '@iconify/react';

import { useConfirm } from "../hooks/confirmContext";
import { useLinkActions } from '../hooks/linkContext';

type LinkListProps = {
  id?: number;
  links: LinkProps[];
  setLinks: (links: LinkProps[]) => void;
  newLinkBaseId: number;
}

const LinkList = ({ id, links, setLinks, newLinkBaseId }: LinkListProps) => {
  const setConfirm = useConfirm();
  const { deleteLinkAction } = useLinkActions();

  const [newLinkCount, setNewLinkCount] = useState<number>(newLinkBaseId);

  const onClickAddLink = () => {
    setNewLinkCount(newLinkCount + 1);
    const newLinks = [...links, {
      Id: newLinkCount,
      CardId: id || newLinkBaseId,
      Title: '',
      Url: ''
    }];
    setLinks(newLinks);
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
              required
            />
            <input
              type="url"
              name="link-url"
              className="Edit-link-url"
              defaultValue={link.Url}
              title="Link URL"
              onChange={(e) => onChangeLinkUrl(link.Id, e.target.value)}
              required
            />
            <Icon icon="ci:trash-full" className="Edit-link-delete" onClick={() => onClickDeleteLink(linkType, link.Id)}></Icon>
          </div>
        )
      })}
      <Icon icon="ci:table-add" className="Edit-links-add" onClick={onClickAddLink}></Icon>
    </div>
  );
}

export default LinkList;
