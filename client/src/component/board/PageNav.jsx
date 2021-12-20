import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PageNav = (props) => {
  const { currentPage, pageMove } = props
    //페이징 관련
    const [ totalPost, setTotalPost ] = useState(0)
    const [ totalPage, setTotalPage ] = useState(0)
    const limit = 10 //페이지 당 보여줄 게시글 수


  useEffect(()=>{
    // 페이징 처리 - 필요한 페이지 수 확인하기
    axios
    .post("/api/Board?type=count")
    .then((response)=>{
      setTotalPost(response.data.json[0].total_count)
    })
    .catch((error)=>{ console.log(error) })
  },[])

  useEffect(()=>{
    setTotalPage(Math.ceil(totalPost / limit))
  },[totalPost])
    
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
export default PageNav;
