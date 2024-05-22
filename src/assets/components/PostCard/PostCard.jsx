import PropTypes from 'prop-types';
import { useState } from 'react';
import Cookies from 'js-cookie';
import './PostCard.css';

const PostCard = ({ author, date, text, likes, authorImage, postId, usersLikes, userId, setLikes }) => {
  const [isLiked, setIsLiked] = useState(Array.isArray(usersLikes) && usersLikes.includes(userId));
  const handleLike = async () => {
    const token = Cookies.get('token');
    const newLikes = isLiked ? likes - 1 : likes + 1;
    const updatedUsersLikes = isLiked ? usersLikes.filter(id => id !== userId) : [...usersLikes, userId];
    const response = await fetch(`http://localhost:1337/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ likes: newLikes, users_likes: updatedUsersLikes })
    });
    if (response.ok) {
      setIsLiked(!isLiked);
      setLikes(newLikes);
    }
  };

  console.log('PostCard props:', { author, date, text, likes, authorImage });
  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 flex justify-center ">
      <div className="px-5 py-4 bg-white dark:bg-gray-800 shadow rounded-lg max-w-lg w-full">
        <div className="flex mb-4">
          <div className="flex">
            <img className="w-12 h-12 rounded-full object-cover" src={authorImage} alt="Author" />
          </div>
          <div className="ml-2 mt-0.5">
            <span className="block font-medium text-base leading-snug text-black dark:text-gray-100">{author}</span>
            <span className="block text-sm text-gray-500 dark:text-gray-400 font-light leading-snug">{date}</span>
          </div>
        </div>
        <p className="text-gray-800 dark:text-gray-100 leading-snug md:leading-normal text-justify break-words">{text}</p>
        <div className="flex justify-between items-center mt-5">
          <div className="flex">
            <button onClick={handleLike} className="like-button cursor-pointer">
              {isLiked ? 'Unlike' : 'Like'}
            </button>
            <span className="ml-4 text-white flex items-center">{likes || 0} likes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  authorImage: PropTypes.string,
  postId: PropTypes.string.isRequired,
  usersLikes: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired,
  setLikes: PropTypes.func.isRequired,
};

export default PostCard;

