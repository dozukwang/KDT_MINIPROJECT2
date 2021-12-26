import axios from 'axios';
import React from 'react';
import { Button, Col, List, ListGroupItem } from 'reactstrap'

const ProductList = (props) => {
  const { item, index, currentPage, length } = props

  const addProduct = () => {
    const info = {
      brand: item.brand,
      category1: item.category1,
      category2: item.category2,
      category3: item.category3,
      category4: item.category4,
      h_price: item.hprice,
      image: item.image,
      l_price: item.lprice,
      link: item.link,
      maker: item.maker,
      mall_name: item.mallName,
      product_id: item.productId,
      title: item.title,
      product_count: 1
    }
    axios
    .post('/api/naverApi?type=save', {
      ...info
    })
    .then((response) => {
      console.log('상품추가 완료', response.data)
    })
    .catch((error) => console.log(error))
  }

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
          <Col md={1}>
            <Button onClick={addProduct}>구매</Button>
          </Col>
        </List>
      </ListGroupItem>
    </div>
  );
};

export default ProductList;
