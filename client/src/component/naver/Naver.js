import React from 'react';
import axios from 'axios'
import { Container, Input, ListGroup, ListGroupItem } from 'reactstrap'

const Naver = (props) => {

  const getAutoKeyword = (event) => {
    axios
    .post(`/api/naverApi?type=search`, { query: event.target.value })
    .then((response) => {
      console.log('자동키워드', response.data.items)
      console.log('입력키워드', event.target.value)
    })
    .catch((error) => console.log(error))
  }

  // const getDataSearched = (event) => {
  //   console.log(event.target.value)
  //   axios
  //   .post('https://openapi.naver.com/v1/search/shop.json?query=' + encodeURI('피카츄'), {
  //     headers: {
  //     'X-Naver-Client-Id': process.env.REACT_APP_NAVER_CLIENT_ID,
  //     'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_CLIENT_SECRET 
  //     }
  //   })
  //   .then((response) => {
  //     console.log(response)
  //     console.log(response.data)
  //   })
  //   .catch((error) => console.log(error))
  // }

  return (
    <div>
      <h2>최저가 상품 조회 및 등록 하기</h2>
      <Container>
        <Input type="search" onChange={getAutoKeyword}/>
      </Container>
      <ListGroup>
        <ListGroupItem>
          검색어
        </ListGroupItem>
      </ListGroup>
      <div>검색결과(리스트)</div>
      <ListGroup>
        <ListGroupItem>
          확인
        </ListGroupItem>
        <ListGroupItem action >
          확인
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

export default Naver;
