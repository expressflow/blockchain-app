import React from 'react';
import { ListItem, List, ListItemIcon, ListItemText } from '@material-ui/core';
import MessageIcon from '@material-ui/icons/Message';

export type TContact = {
    id: number,
    name: string
}

export interface IChatGroups {
    contacts: TContact[]
}

const ChatGroups: React.FC<IChatGroups> = ({contacts}) => {
    const groups = contacts.map((contact: TContact) => 
        <ListItem button key={contact.id}>
            <ListItemIcon><MessageIcon color="primary"/></ListItemIcon>
            <ListItemText>{contact.name}</ListItemText>
        </ListItem>
    );
    return (
        <List>
                  <div>
                    {groups}
                  </div>
        </List>
    );
}

export default ChatGroups;