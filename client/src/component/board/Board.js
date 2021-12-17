import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Button, Container, Table } from 'reactstrap'
import Post from "./Post";

const Board = () => {
  const [ BoardList, setBoardList ] = useState([])

  useEffect(()=>{
    axios
    .post("/api/Board?type=list", { content: '내용' })
    .then((response)=>{
      setBoardList(response.data.json)
    })
    .catch((error)=>{ console.log(error) })

  },[])

  return (
    <div>
      <h2>게시판</h2>
      <div>
      <Container>
        <div className="d-flex justify-content-between">
          <span>10건의 게시물</span>
          <Button size="sm" className="">게시글 쓰기</Button>
        </div>
        <Table bordered hover>
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
            {BoardList.map((post, index) => (
              <Post key={post.id} post={post} index={index} />
            ))}
          </tbody>
        </Table>
      </Container>
      </div>
    </div>
  );
};

export default Board;
