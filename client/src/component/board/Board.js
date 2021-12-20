import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Button, Container, Table } from 'reactstrap'
import BoardList from "./BoardList";
import { Link } from "react-router-dom";

const Board = () => {
  const [ searchedList, setSearchedList ] = useState([])

  useEffect(()=>{
    axios
    .post("/api/Board?type=list")
    .then((response)=>{
      setSearchedList(response.data.json)
    })
    .catch((error)=>{ console.log(error) })

  },[])

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
              <BoardList key={post.id} post={post} index={index} />
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Board;
