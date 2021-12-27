import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Table } from 'reactstrap'
import axios from 'axios'
import BoardList from "./BoardList";
import PageNav from "./PageNav";

const Board = () => {
  const [ searchedList, setSearchedList ] = useState([])
  const [ currentPage, setCurrentPage ] = useState(0)
  const pageName = 'Board'
  const length = 10 // 불러올 길이 = 페이지 당 보여줄 게시글 수

  useEffect(()=>{
    selectBoardPost()
  },[])
  
  // 페이지 이동 시 새로운 검색 정보 가져오기
  const pageMove = (pageNumber) => {
    console.log('pageMove 실행됨', pageNumber)
    selectBoardPost(pageNumber)
    setCurrentPage(pageNumber)
  }

  const selectBoardPost = (pageNumber = 0) => {
    axios
    .post("/api/Board?type=page", {
      length,
      start: (pageNumber * length)
    })
    .then((response)=>{
      setSearchedList(response.data.json)
    })
    .catch((error)=>{ console.log(error) })
  }
  return (
    <div>
      <Container>
        <h2>게시판</h2>
        <div className="d-flex justify-content-between">
          <span>게시물</span>
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
      <div>
        <PageNav pageName={pageName} length={length} pageMove={pageMove} currentPage={currentPage} />
      </div>
    </div>
  );
};

export default Board;
