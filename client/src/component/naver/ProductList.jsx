import React from 'react';
import { Col, List, ListGroupItem } from 'reactstrap'

const ProductList = (props) => {
  const { item, index, currentPage, length } = props

  return (
    <div>
      <ListGroupItem action>
        <List className="row">
          <Col md={1}>
            {currentPage * length + (index + 1)}
          </Col>
          <Col md={2}>
            <img style={{width: 80, height: 80}} src={item.image} alt="썸네일" />
          </Col>
          <Col>
            {item.title}
          </Col>
          <Col md={1}>
            {item.lprice}
          </Col>
          <Col md={1}>
            <a href={item.link}>{item.mallName}</a>
          </Col>
        </List>
      </ListGroupItem>
    </div>
  );
};

export default ProductList;
