import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PageNav = (props) => {
  const { currentPage, pageMove, length, pageName, totalProduct } = props
    //페이징 사용 페이지의 총 게시글 수 및 필요 페이지 수
    const [ totalPost, setTotalPost ] = useState(0)
    const [ totalPage, setTotalPage ] = useState(0)

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
    setTotalPage(Math.ceil(totalPost / length))
  },[totalPost > 0])

  useEffect(()=>{
    setTotalPage(Math.ceil(totalProduct / length))
  },[totalProduct > 0])
    
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
          onClick={() =>
            0 === currentPage ? null : pageMove(currentPage - 1)
          }
        />
      </PaginationItem>
      {[...Array(totalPage)].map((data, i) => (
      <PaginationItem active={i === currentPage} key={i}>
        <PaginationLink onClick={() => pageMove(i)} href="#">
          {i + 1}
        </PaginationLink>
      </PaginationItem>
    ))}
      <PaginationItem>
        <PaginationLink
          href="#"
          next
          onClick={() =>
            totalPage - 1 === currentPage ? null : pageMove(currentPage + 1)
          }
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
