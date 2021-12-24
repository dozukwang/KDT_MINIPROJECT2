import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Col, Container, Input, Label, List, ListGroup, ListGroupItem } from 'reactstrap'
import AutoKeyword from './AutoKeyword';
import ProductList from './ProductList';
import PageNav from '../board/PageNav';

const Naver = () => {
  const [ autoKeyword, setAutoKeyword ] = useState([])
  const [ keywordList, setKeywordList ] = useState([])
  const [ inputKeyword, setInputKeyword ] = useState('')
  const [ ItemList, setItemList ] = useState([])
  //페이징 관련
  const [ totalProduct, setTotalProduct ] = useState(0)
  const [ currentPage, setCurrentPage ] = useState(0)
  const pageName = 'Product'
  const length = 20
  const start = 1

  // 자동검색어 키워드 추출
  useEffect(()=>{
    setKeywordList([])
    autoKeyword.forEach((word)=>{
      setKeywordList((prev) => ([...prev, word[0]]))
    })
  },[autoKeyword])

  // 자동검색어 호출 API
  const getAutoKeyword = (event) => {
    setInputKeyword(event.target.value)
    axios
    .post(`/api/naverApi?type=search`, { 
      query: event.target.value
    })
    .then((response) => {
      setAutoKeyword(response.data.items[0])
    })
    .catch((error) => console.log(error))
  }

  // 자동검색어를 클릭했을 때
  const handleClickedSearch = (event) => {
    setInputKeyword(event.target.innerText)
    getDataSearched(event.target.innerText) // 상품 리스트 조회
    setKeywordList([]) //자동 검색어 결과 리셋
  }

  // 검색창에서 Enter 했을 때
  const handleEnterSearch = (event) => {
    if(event.code === 'Enter') {
      getDataSearched(event.target.value) // 상품 리스트 조회
      setKeywordList([]) //자동 검색어 결과 리셋
    }
  }
  // 상품검색 API
  const getDataSearched = (keyword, pageNumber = 0) => {
    console.log(keyword)
    axios
    .post('/api/naverApi?type=shopList', {
      query: keyword,
      start: (pageNumber * length) + 1
    })
    .then((response) => {
      console.log(response.data)
      setItemList(response.data.items)
      setTotalProduct(response.data.total)
    })
    .catch((error) => console.log(error))
  }

  // 페이지 이동 시 새로운 검색 정보 가져오기
  const pageMove = (pageNumber) => {
    console.log('pageMove 실행됨', pageNumber)
    getDataSearched(inputKeyword, pageNumber)
    setCurrentPage(pageNumber)
  }

  const check = () => {
    console.log(totalProduct)
  }


  
  return (
    <div>
      <button onClick={check}>test</button>
      <h2>최저가 상품 조회</h2>
      <Container>
        <Label htmlFor="keyword"> 찾고 싶은 상품 </Label>
        <Input id="keyword" type="search" autoComplete="off" onKeyPress={handleEnterSearch} onChange={getAutoKeyword} value={inputKeyword} placeholder="검색어 입력"/>
        <ListGroup>
          {keywordList.map((keyword, index)=>(
              <AutoKeyword key={index} keyword={keyword} index={index} handleClickedSearch={handleClickedSearch}/>
          ))}
      </ListGroup>
      </Container>

      <div>검색결과(리스트)</div>
      <ListGroup>
      <ListGroupItem>
        <List>
          <Col></Col>
          <Col>상품 이미지</Col>
          <Col>상품명</Col>
          <Col>최저가</Col>
          <Col>판매처</Col>
        </List>
      </ListGroupItem>
      {ItemList.map((item, index)=>(
          <ProductList key={item.productId} item={item} index={index} length={length} currentPage={currentPage} />
          ))}
      </ListGroup>
      <PageNav pageName={pageName} length={length} pageMove={pageMove} currentPage={currentPage} totalProduct={totalProduct} />
    </div>
  );
};

export default Naver;
