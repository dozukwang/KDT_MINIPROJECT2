import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PageNav = (props) => {
  const { currentPage, pageMove, length, pageName, totalProduct } = props
    //페이징 사용 페이지의 총 게시글 수 및 필요 페이지 수
    const [ totalPost, setTotalPost ] = useState(0)
    const [ totalPage, setTotalPage ] = useState(0)
    //페이징바 시작&끝 번호
    const [ startIndex, setStartIndex ] = useState(0);
    const [ endIndex, setEndIndex ] = useState(10);
    const PagingNum = 10 // 보여줄 페이징 번호 수

  useEffect(()=>{
    // 필요한 페이지 수 확인하기
    switch(pageName){
    case 'Board': {
      axios
      .post("/api/Board?type=count")
      .then((response)=>{
        setTotalPost(response.data.json[0].total_count)
      })
      .catch((error)=>{ console.log(error) })
    }
    default: return
  }},[])

  useEffect(()=>{
    setTotalPage(Math.ceil(totalPost / PagingNum))
  },[totalPost > 0])

  useEffect(()=>{
    setTotalPage(Math.ceil(totalProduct / PagingNum))
  },[totalProduct > 0])

  // 페이징 번호 제한
  const validateIndex = (index) => {
    let result = false;
    if (index >= 0 && index <= totalPage) {
      result = true;
    }
    if (index >= 0 && index - PagingNum <= totalPage) {
      result = true;
    }
    return result;
  };

  let pageNumber = Array.from({ length: totalPage }, (num, index) => index)

  const prevPage = (event) => {
    event.preventDefault()
    if (
      validateIndex(startIndex - PagingNum) &&
      validateIndex(endIndex - PagingNum)
    ) {
      setStartIndex(startIndex - PagingNum);
      setEndIndex(endIndex - PagingNum);
    }
  };

  const nextPage = (event) => {
    event.preventDefault()
    if (
      validateIndex(startIndex + PagingNum) &&
      validateIndex(endIndex + PagingNum)
    ) {
      setStartIndex(startIndex + PagingNum);
      setEndIndex(endIndex + PagingNum);
    }
  };

  return (
    <Pagination size="sm justify-content-center">
      <PaginationItem>
        <PaginationLink
          first
          href="#"
          onClick={() => pageMove(0)}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          previous
          onClick={prevPage}
        />
      </PaginationItem>
      {pageNumber.slice(startIndex, endIndex).map((number) => (
      <PaginationItem active={number === currentPage} key={number}>
        <PaginationLink onClick={() => pageMove(number)} href="#">
          {number + 1}
        </PaginationLink>
      </PaginationItem>
    ))}
      <PaginationItem>
        <PaginationLink
          href="#"
          next
          onClick={nextPage}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          last
          onClick={() => pageMove(totalPage - 1)}
        />
      </PaginationItem>
    </Pagination>
  );

};

PageNav.defaultProps = {
  totalProduct: 0,
}

export default PageNav;
