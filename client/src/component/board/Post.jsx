import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs'
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { Container, Row, Col, Form, Input, Button } from 'reactstrap';

const Post = () => {
  // history.push로 전달받은 props
  const history = useHistory()
  const location = useLocation()
  const post = location.state.post

  const [ isPasswordWrong, setIsPasswordWrong ] = useState(false)
  const [ postInfo, setPostInfo ] = useState({})

  useEffect(()=>{
    console.log('Post 실행됨')
    axios
    .post("/api/Board?type=list", { id: post })
    .then((response)=>{
      setPostInfo(response.data.json[0])
    })
    .catch((error)=>{ console.log(error) })
  },[])
  
  const submitFormEdit = (event) => {
    event.preventDefault()
    const data = event.target.elements.editPassword
    
    if (data.value !== postInfo.write_password) {
      setIsPasswordWrong(true)
      console.log(postInfo)
    } else if (data.value === postInfo.write_password) {
      history.push({
        pathname: `/board/editpost/${postInfo.id}`,
        state: { post: postInfo }
      })
    }
  }

  return (
      <Container className="border">
        <Row className="border-bottom">
          <Col>{postInfo.title}</Col>
          <Col sm={1}>{dayjs(postInfo.insert_date).format('YYYY.MM.DD')}</Col>
        </Row>
        <Row className="justify-content-end border-bottom">
          <Col className="text-end col-md-auto">작성자: <span>{postInfo.insert_user}</span></Col>
          <Col className="text-end col-md-auto">조회수: <span>{postInfo.view_count}</span></Col>
        </Row>
        <Row>
          <p>{postInfo.content}</p>
        </Row>
        <Row>
          <Form onSubmit={submitFormEdit}>
              <Input id="editPassword" invalid={isPasswordWrong}placeholder="비밀번호"/>
              <Button size="sm">수정하기</Button>
          </Form>
        </Row>
      </Container>
  );
};

export default Post;
