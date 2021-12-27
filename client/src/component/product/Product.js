import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Button, Col, Container, Form, FormGroup, Input, Label, List, ListGroup, ListGroupItem } from 'reactstrap'

const Product = (props) => {
  const { userId } = props
  const [ titleKeyword, setTitleKeyword ] = useState("")
  // 카테고리 별 선택항목
  const [ category1, setCategory1 ] = useState([])
  const [ category2, setCategory2 ] = useState([])
  const [ category3, setCategory3 ] = useState([])
  const [ category4, setCategory4 ] = useState([])
  // 카테고리 목록 검색 API에 넣을 검색데이터(선택한 카테고리)
  const [ cateKeyword, setCateKeyword ] = useState({
    place1: '',
    place2: '',
    place3: ''
  })

  useEffect(() => {
    getProductList(1)
  },[])

  // 카테고리 목록 검색 API
  const getProductList = (categoryNum, place1 = '', place2 = '', place3 = '') => {
    axios
    .post('/api/product?type=category', {
      num: categoryNum,
      category1: place1,
      category2: place2,
      category3: place3,
    })
    .then((response) => {
      const data = response.data.json
      console.log(data)
      switch (categoryNum) { // 입력 넘버와 맞는 category의 선택지 출력하기
        case 1:
          setCategory1(data)
          setCategory2([]) // 하위 카테고리의 값 초기화
          setCategory3([])
          setCategory4([])
          break;
        case 2: 
          setCateKeyword({ // 선택한 카테고리 데이터 업데이트
            ...cateKeyword,
            place1
          })
          setCategory2(data)
          setCategory3([])
          setCategory4([])
          break;
        case 3: 
          setCateKeyword({
            ...cateKeyword,
            place2
          })
          setCategory3(data)
          setCategory4([])
          break;
        case 4: 
        setCateKeyword({
            ...cateKeyword,
            place3
          })
          setCategory4(data)
          break;
        default: return null
      }
    })
    .catch((error) => console.log(error))
  }

  // onSubmit
  const submitFormProduct = (event) => {
    event.preventDefault()
    console.log(event.target.elements)
    const data = event.target.elements
    axios
    .post('/api/product?type=list', {
      user_id: userId,
    })
    .then((response) => {
      console.log(response.data.json)
    })
    .catch((error) => console.log(error))
  }

  return (
    <Container>
      <h2>찜한 상품 목록</h2>
      <Form onSubmit={submitFormProduct}>
        <FormGroup>
          <Label htmlFor="title">검색어</Label>
          <Input id="title" type="text" placeholder="검색할 상품 키워드를 입력하세요." />
          <Label htmlFor="category1">카테고리 1번</Label>
          <Input id="category1" type="select" defaultValue="" onChange={(event)=>{getProductList(2, event.target.value)}}>
            <option value="" disabled>카테고리1</option>
            {category1.map((c) => (
            <option key={c.category1} value={c.category1}>{c.category1}</option>
            ))}
          </Input>
          <Label htmlFor="category2">카테고리 2번</Label>
          <Input id="category2" type="select" defaultValue="" onChange={(event)=>{getProductList(3, cateKeyword.place1, event.target.value)}}>
            <option value="" disabled>카테고리2</option>
            {category2.map((c) => (
            <option key={c.category2} value={c.category2}>{c.category2}</option>
            ))}
          </Input>
          <Label htmlFor="category3">카테고리 3번</Label>
          <Input id="category3" type="select" defaultValue="" onChange={(event)=>{getProductList(4, cateKeyword.place1, cateKeyword.place2, event.target.value)}}>
            <option value="" disabled>카테고리3</option>
            {category3.map((c) => (
            <option key={c.category3} value={c.category3}>{c.category3}</option>
            ))}
          </Input>
          <Label htmlFor="category4">카테고리 4번</Label>
          <Input id="category4" type="select" defaultValue="">
            <option value="" disabled>카테고리4</option>
            {category4.map((c) => (
            <option key={c.category4} value={c.category4}>{c.category4}</option>
            ))}
          </Input>
        </FormGroup>
        <Button type="submit"> 검색 </Button>
      </Form>
    </Container>
  );
};

export default Product;
