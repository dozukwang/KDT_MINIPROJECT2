import React, { useState } from "react";
import axios from 'axios'
import dayjs from 'dayjs'


const Post = ({post, index}) => {
  const [ postView, setPostView ] = useState(post.view_count)

  // 게시글 클릭 -> 조회 및 카운트 추가
  const openBoardPost = (postId) => {
    console.log(postId)
    axios
    .post('/api/Board?type=upCount', {id: postId})
    .then((resonse)=>{
      console.log(resonse)
      setPostView((prevState)=> prevState += 1)
    })
    .catch((error)=>{console.log(error)})
  }

  return (
    <tr onClick={()=>{openBoardPost(post.id)}}>
      <td>{index + 1}</td>
      <td className="text-start">{post.title}</td>
      <td>{post.insert_user}</td>
      <td>{dayjs(post.insert_date).format('YYYY.MM.DD')}</td>
      <td>{postView}</td>
    </tr>
  )
}

export default Post;
