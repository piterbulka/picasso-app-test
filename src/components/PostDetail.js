import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchPostById = async (postId) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  return response.data;
};

const PostDetail = () => {
  const { postId } = useParams();

  const { data, isLoading, isError } = useQuery(['post', postId], () =>
    fetchPostById(postId)
  );

  const handleBackClick = () => {
    // В React Router DOM 6 используйте `useNavigate` для навигации назад
    window.history.back();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading post</div>;
  }

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
      <button onClick={handleBackClick}>Назад</button>
    </div>
  );
};

export default PostDetail;