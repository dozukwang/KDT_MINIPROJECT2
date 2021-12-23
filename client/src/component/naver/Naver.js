import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Container, Input, Label, ListGroup, ListGroupItem } from 'reactstrap'
import AutoKeyword from './AutoKeyword';

const Naver = () => {
  const [ searchKeyword, setSearchKeyword ] = useState([])
  const [ keywordList, setKeywordList ] = useState([])
  const [ inputKeyword, setInputKeyword ] = useState('')

  // 자동검색어 키워드 추출
  useEffect(()=>{
    setKeywordList([])
    searchKeyword.forEach((word, index)=>{
      console.log('실행됨', index + 1, word[0])
      setKeywordList((prev) => ([...prev, word[0]]))
    })
  },[searchKeyword])

  // 자동검색어 호출
  const getAutoKeyword = (event) => {
    axios
    .post(`/api/naverApi?type=search`, { query: event.target.value })
    .then((response) => {
      setSearchKeyword(response.data.items[0])
    })
    .catch((error) => console.log(error))
  }

  const getClickedValue = (event) => {
    console.log(event.target.innerText)
    setInputKeyword(event.target.innerText)
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
      <h2>최저가 상품 조회</h2>
      <Container>
        <Label htmlFor="keyword"> 찾고 싶은 상품 </Label>
        <Input id="keyword" type="search" autoComplete="off" onChange={getAutoKeyword} defaultValue={inputKeyword} placeholder="검색어 입력"/>
        <ListGroup>
          {keywordList.map((keyword, index)=>(
              <AutoKeyword key={index} keyword={keyword} index={index} getClickedValue={getClickedValue}/>
          ))}
      </ListGroup>
      </Container>

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
