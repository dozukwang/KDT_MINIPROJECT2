import React from 'react';
import { Col, List, ListGroupItem } from 'reactstrap'

const ProductList = (props) => {
  const { item, index, currentPage, length } = props

  return (
    <div>
      <ListGroupItem action>
        <List>
          <Col md={1}>
            {currentPage * length + (index + 1)}
          </Col>
          <Col md={2}>
            <img src={item.image} alt="썸네일" />
          </Col>
          <Col md={4}>
            <span>{item.title}</span>
          </Col>
          <Col md={1}>
            {item.lprice}
          </Col>
        </List>
      </ListGroupItem>
    </div>
  );
};

export default ProductList;
