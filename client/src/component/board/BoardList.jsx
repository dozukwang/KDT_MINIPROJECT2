import React, { useState } from "react";
import axios from 'axios'
import dayjs from 'dayjs'
import { useHistory } from "react-router-dom";


const BoardList = ({post, index}) => {
  const [ postView, setPostView ] = useState(post.view_count)
  const history = useHistory()

  // 게시글 클릭 -> 게시글 페이지로 이동 및 카운트 추가
  const openBoardPost = () => {
    console.log('클릭됨', post.id)
    axios
    .post('/api/Board?type=upCount', {id: post.id})
    .then((resonse)=>{
      setPostView((prevState)=> prevState += 1)
      // 게시글 페이지로 이동(동적 라우트)
      history.push({
        pathname: `/board/${post.id}`,
        state: { post: post.id }
      })
    })
    .catch((error)=>{console.log(error)})
  }

  return (
    <tr onClick={openBoardPost}>
      <td>{index + 1}</td>
      <td className="text-start">{post.title}</td>
      <td>{post.insert_user}</td>
      <td>{dayjs(post.insert_date).format('YYYY.MM.DD')}</td>
      <td>{postView}</td>
    </tr>
  )
}

export default BoardList;
