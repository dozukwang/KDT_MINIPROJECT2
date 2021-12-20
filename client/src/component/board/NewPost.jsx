import axios from 'axios';
import React, { useState } from 'react';
import { Button,Container, Form, FormGroup, Input, Label} from 'reactstrap'

const NewPost = ({ history }) => {
  const [ isTitleEmpty, setIsTitleEmpty ] =  useState(false)
  const [ isAuthorEmpty, setIsAuthorEmpty ] =  useState(false)
  const [ isPasswordEmpty, setIsPasswordEmpty ] =  useState(false)
  const [ isContentEmpty, setIsContentEmpty ] =  useState(false)

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
      history.replace("/board")
    } else (console.log('error: 비어있는 내용 존재'))
  }

  const insertNewPost = (data) => {
      console.log('게시글 추가요청')
      axios
      .post("/api/Board?type=save", {
        title: data.title.value,
        content: data.content.value,
        insert_user: data.author.value,
        view_count: 0,
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
      <h2>새글 작성하기</h2>
      <Container>
        <Form onSubmit={submitFormPost}>
          <FormGroup>
            <Label for="title"> 글제목 </Label>
            <Input id="title" type="text" bsSize="sm" invalid={isTitleEmpty}/>
          </FormGroup>
          <FormGroup>
            <Label for="author"> 작성자 </Label>
            <Input id="author" type="text" bsSize="sm" invalid={isAuthorEmpty}/>
          </FormGroup>
          <FormGroup>
            <Label for="password"> 비밀번호 </Label>
            <Input id="password" type="password" bsSize="sm" invalid={isPasswordEmpty}/>
          </FormGroup>
          <FormGroup>
            <Label for="content"> 내용 </Label>
            <Input id="content" type="textarea" invalid={isContentEmpty}/>
          </FormGroup>
          <Button type="submit"> 작성 </Button>
        </Form>
      </Container>
    </div>
  );
};

export default NewPost;
