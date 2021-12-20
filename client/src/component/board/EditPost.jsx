import axios from 'axios';
import React, { useState } from 'react';
import { Button,Container, Form, FormGroup, Input, Label} from 'reactstrap'

const EditPost = ({history, location}) => {
  const [ isTitleEmpty, setIsTitleEmpty ] =  useState(false)
  const [ isAuthorEmpty, setIsAuthorEmpty ] =  useState(false)
  const [ isPasswordEmpty, setIsPasswordEmpty ] =  useState(false)
  const [ isContentEmpty, setIsContentEmpty ] =  useState(false)

  const prevPostData = location.state.post

  const submitFormPost = (event) => {
    event.preventDefault()
    let emptyCount = 0
    const data = event.target.elements
    for (let i = 0; i < data.length - 1; i += 1) {
      if (data[i].value === "") {
        emptyCount += 1
        changeValid(data[i].id, true)
      } else {
        changeValid(data[i].id, false)
        }
    }
    if (emptyCount === 0) {
      console.log('전부 입력됨')
      insertNewPost(data)
      history.replace({
        pathname: `/board/${prevPostData.id}`,
        state: { post: prevPostData.id }
      })
    } else (console.log('error: 비어있는 내용 존재'))
  }

  const insertNewPost = (data) => {
      console.log('게시글 수정요청')
      axios
      .post("/api/Board?type=save", {
        id: prevPostData.id,
        title: data.title.value,
        content: data.content.value,
        insert_user: data.author.value,
        view_count: prevPostData.view_count,
        write_password: data.password.value,
      })
      .then((response)=>{
        console.log(response)
      })
      .catch((error)=>{ console.log(error) })
  }

  const changeValid = (id, value) => {
    switch(id) {
      case 'title':
          return (setIsTitleEmpty(value))
      case 'author':
        return (setIsAuthorEmpty(value))
      case 'password':
        return (setIsPasswordEmpty(value))
      case 'content':
        return (setIsContentEmpty(value))
      default:
        return null
    }
  }

  return (
    <div>
      <h2>게시글 수정하기</h2>
      <Container>
        <Form onSubmit={submitFormPost}>
          <FormGroup>
            <Label for="title"> 글제목 </Label>
            <Input id="title" type="text" bsSize="sm" invalid={isTitleEmpty} defaultValue={prevPostData.title} />
          </FormGroup>
          <FormGroup>
            <Label for="author"> 작성자 </Label>
            <Input id="author" type="text" bsSize="sm" invalid={isAuthorEmpty} defaultValue={prevPostData.insert_user} />
          </FormGroup>
          <FormGroup>
            <Label for="password"> 비밀번호 </Label>
            <Input id="password" type="password" bsSize="sm" invalid={isPasswordEmpty} />
          </FormGroup>
          <FormGroup>
            <Label for="content"> 내용 </Label>
            <Input id="content" type="textarea" invalid={isContentEmpty} defaultValue={prevPostData.content} />
          </FormGroup>
          <Button type="submit"> 작성 </Button>
        </Form>
      </Container>
    </div>
  );
};

export default EditPost;
