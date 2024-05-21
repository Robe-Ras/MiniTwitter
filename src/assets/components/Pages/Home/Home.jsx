import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { atom, useAtom } from 'jotai';
import 'animate.css/animate.min.css';
import './Home.css';
import PostCard from '/src/assets/components/PostCard/PostCard'; 

const postsAtom = atom([]); // Changed this line
const userAtom = atom({ id: null, description: '' });

const Home = () => {
  const [posts, setPosts] = useAtom(postsAtom);
  const [userData, setUserData] = useAtom(userAtom);
  const [flashMessage, setFlashMessage] = useState('');
  const [flashMessageColor, setFlashMessageColor] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = Cookies.get('token');
      const response = await fetch('http://localhost:1337/api/posts', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      console.log('Fetched posts:', data); // Added this line to log the fetched posts
      setPosts(data.data);
    };
    fetchPosts();
  }, [setPosts]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token');
      const response = await fetch('http://localhost:1337/api/users/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setUserData({ id: data.id, description: '' });
    };
    fetchUserData();
  }, [setUserData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    const postData = { data: { text: userData.description, author: userData.id } };
    console.log('Submitting post:', postData);

    const response = await fetch('http://localhost:1337/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });

    const result = await response.json();
    console.log('Response from server:', result);

    if (response.ok) {
      setPosts(prevPosts => [result.data, ...(Array.isArray(prevPosts) ? prevPosts : [])]);
      setShowEditForm(false);
      setFlashMessage('Article créé avec succès!');
      setFlashMessageColor('success');
      setTimeout(() => setFlashMessage(''), 3000);
    } else {
      console.error('Erreur:', result.error);
      setFlashMessage(`Erreur: ${result.error.message || 'Création échouée'}`);
      setFlashMessageColor('error');
    }
  };

  return (
    <div>
      {flashMessage && <div className={`flash-message ${flashMessageColor}`}>{flashMessage}</div>}
      <div className="form_button_home">
        <a href="#" onClick={() => setShowEditForm(true)}>
          <img src="https://img.icons8.com/ios-filled/24/FFFFFF/edit.png" alt="Écrivez votre article"/>
        </a>
      </div>
      {showEditForm && (
        <div id="form-wrap" className="p-4 animated slideInUp">
          <button id="close-modal" type="button" className="close" onClick={() => setShowEditForm(false)}>
            <i className="fa fa-times"></i>
          </button>
          <form onSubmit={handleSubmit} className="edit-article-form">
            <h1 className="form-title">Écrivez votre article</h1>
            <div className="form-group">
              <label htmlFor="article_texte">Texte</label>
              <textarea id="article_texte" name="article_texte" value={userData.description} onChange={(e) => setUserData({ ...userData, description: e.target.value })} required></textarea>
            </div>
            <button type="submit" className="btn btn-rounded">Enregistrer</button>
          </form>
        </div>
      )}
      <div className="posts-container">
        {Array.isArray(posts) && posts.map(post => (
          <PostCard
            key={post.id}
            author={post.author?.username || 'Inconnu'}
            date={new Date(post.attributes.createdAt).toLocaleString()}
            text={post.attributes.text || 'Aucun texte'}
            likes={post.attributes.likes || 0}
            authorImage={post.author?.profilePicture || 'https://via.placeholder.com/150'}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

