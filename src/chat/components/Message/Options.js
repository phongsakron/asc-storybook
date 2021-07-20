import React, { useState, useEffect } from 'react';
import { MessageEditorRepository, MessageFlagRepository } from '@amityco/js-sdk';

import Popover from '~/core/components/Popover';
import Menu, { MenuItem } from '~/core/components/Menu';
import { notification } from '~/core/components/Notification';

import { MessageOptionsIcon, SaveIcon, CloseIcon, EditingInput, EditingContainer } from './styles';

const Flagging = ({ messageId }) => {
  const [isFlaggedByMe, setIsFlaggedByMe] = useState(null);
  const [flagRepo, setFlagRepo] = useState(null);

  useEffect(() => {
    if (!messageId) return;
    const flagRepository = new MessageFlagRepository(messageId);
    setFlagRepo(flagRepository);
    flagRepository.isFlaggedByMe().then(setIsFlaggedByMe);
  }, [messageId]);

  const flagMessage = () => {
    if (!flagRepo) return;

    flagRepo.flag().then(() => {
      setIsFlaggedByMe(true);
    });
  };

  const unflagMessage = () => {
    if (!flagRepo) return;

    flagRepo.unflag().then(() => {
      setIsFlaggedByMe(false);
    });
  };

  if (isFlaggedByMe === null) return null;

  return isFlaggedByMe ? (
    <MenuItem onClick={unflagMessage}>unflag</MenuItem>
  ) : (
    <MenuItem onClick={flagMessage}>flag</MenuItem>
  );
};

const Options = ({ isIncoming, messageId, data, isSupportedMessageType }) => {
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const edit = e => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const [isOpen, setIsOpen] = useState(false);
  const open = () => {
    setText(data.text || data);
    setIsOpen(true);
    setIsEditing(false);
  };

  const close = () => {
    setIsOpen(false);
  };

  const save = () => {
    const editor = new MessageEditorRepository(messageId);
    editor
      .editText(text)
      .catch(() => {
        notification.error({
          content: 'There was an error processing your request',
        });
      })
      .then(close);
  };

  const deleteMessage = () => {
    const editor = new MessageEditorRepository(messageId);
    editor.delete().then(close);
  };

  const menu = (
    <Menu>
      {!isIncoming && isSupportedMessageType && <MenuItem onClick={edit}>edit</MenuItem>}
      {isIncoming && <Flagging messageId={messageId} />}
      {!isIncoming && <MenuItem onClick={deleteMessage}>delete</MenuItem>}
    </Menu>
  );

  const editing = (
    <EditingContainer>
      <EditingInput
        autoFocus
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') save();
          if (e.key === 'Escape') close();
        }}
      />
      <SaveIcon onClick={save} />
      <CloseIcon onClick={close} />
    </EditingContainer>
  );

  return (
    <Popover
      isOpen={isOpen}
      onClickOutside={close}
      position="bottom"
      align={isIncoming ? 'start' : 'end'}
      content={isEditing ? editing : menu}
    >
      <div role="button" tabIndex={0} onClick={open} onKeyDown={open}>
        <MessageOptionsIcon />
      </div>
    </Popover>
  );
};

export default Options;