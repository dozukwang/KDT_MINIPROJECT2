import React, { useEffect, useState } from 'react';
import { List, ListGroupItem } from 'reactstrap'

const AutoKeyword = (props) => {
  const { keyword, handleClickedSearch } = props

  return (
    <ListGroupItem action>
      <List onClick={handleClickedSearch}>{ keyword }</List>
    </ListGroupItem>
  );
};

export default AutoKeyword;
