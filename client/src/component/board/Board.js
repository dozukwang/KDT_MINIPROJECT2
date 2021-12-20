import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Table } from 'reactstrap'
import axios from 'axios'
import BoardList from "./BoardList";
import PageNav from "./PageNav";

const Board = () => {
  const [ searchedList, setSearchedList ] = useState([])
  const [ currentPage, setCurrentPage ] = useState(0)
  const length = 10
  const start = 0

  useEffect(()=>{
    selectBoardPost()
  },[])
  
  // 페이지 이동 시 새로운 검색 정보 가져오기
  const pageMove = (pageNumber) => {
    console.log('pageMove 실행됨', pageNumber)
    selectBoardPost(pageNumber)
    setCurrentPage(pageNumber)
  }

  const selectBoardPost = (pageNumber = 1) => {
    axios
    .post("/api/Board?type=page", {
      length,
      start: (pageNumber * length) + start
    })
    .then((response)=>{
      setSearchedList(response.data.json)
    })
    .catch((error)=>{ console.log(error) })
  }
  return (
    <div>
      <h2>게시판</h2>
      <Container>
        <div className="d-flex justify-content-between">
          <span>10건의 게시물</span>
          <Link to="/board/newpost">
            <Button size="sm" className="">게시글 쓰기</Button>
          </Link>
        </div>
        <Table hover>
          <thead>
            <tr>
              <th className="col-1">번호</th>
              <th className="col">제목</th>
              <th className="col-1">작성자</th>
              <th className="col-1">작성일</th>
              <th className="col-1" >조회수</th>
            </tr>
          </thead>
          <tbody>
            {searchedList.map((post, index) => (
              <BoardList key={post.id} post={post} index={index} currentPage={currentPage} length={length} />
            ))}
          </tbody>
        </Table>
      </Container>
      <PageNav pageMove={pageMove} currentPage={currentPage} />
    </div>
  );
};

export default Board;
