import React, { useEffect, useState } from 'react';
import { List, ListGroupItem } from 'reactstrap'

const AutoKeyword = (props) => {
  const { keyword, getClickedValue } = props

  return (
    <ListGroupItem action>
      <List onClick={getClickedValue}>{ keyword }</List>
    </ListGroupItem>
  );
};

export default AutoKeyword;
