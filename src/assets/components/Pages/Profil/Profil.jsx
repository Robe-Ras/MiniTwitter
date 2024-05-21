import './Profil.css';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import 'animate.css/animate.min.css';

const Profil = () => {
  const [userData, setUserData] = useState({ username: '', email: '', description: '', password: '' });
  const [showEditForm, setShowEditForm] = useState(false);
  // const navigate = useNavigate();
  const [flashMessage, setFlashMessage] = useState('');
  const [flashMessageColor, setFlashMessageColor] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token');
      const response = await fetch('http://localhost:1337/api/users/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setUserData(data || { username: '', email: '', description: '', password: '' });
      setUserId(data.id); // Ajoutez cette ligne pour stocker l'ID de l'utilisateur
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    if (!token) {
      setFlashMessage('Token non trouvé. Veuillez vous reconnecter.');
      setFlashMessageColor('error');
      return;
    }
    const response = await fetch(`http://localhost:1337/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (response.ok) {
      const formWrap = document.getElementById('form-wrap');
      formWrap.classList.remove('slideInUp');
      formWrap.classList.add('slideOutDown');
      formWrap.addEventListener('animationend', (e) => {
        e.stopPropagation();
        setShowEditForm(false);
        setFlashMessage('Profil mis à jour avec succès!');
        setFlashMessageColor('success');
        setTimeout(() => setFlashMessage(''), 3000);
        formWrap.classList.add('hidden'); // Masquer le formulaire après l'animation
      }, { once: true });
    } else {
      setFlashMessage(`Erreur: ${data.message || 'Mise à jour échouée'}`);
      setFlashMessageColor('error');
    }
  };

  const handleOpen = () => {
    setShowEditForm(true);
    setTimeout(() => {
      const formWrap = document.getElementById('form-wrap');
      formWrap.classList.add('slideInUp');
    }, 0);
  };

  const handleClose = () => {
    const formWrap = document.getElementById('form-wrap');
    formWrap.classList.remove('slideInUp');
    formWrap.classList.add('slideOutDown');
    formWrap.addEventListener('animationend', (e) => {
      e.stopPropagation(); // Empêche la propagation de l'événement
      setShowEditForm(false);
      setFlashMessage('Modifications non enregistrées.');
      setFlashMessageColor('error');
      setTimeout(() => setFlashMessage(''), 3000); // Effacer le message après 3 secondes
      formWrap.classList.add('hidden'); // Ajoutez cette ligne pour masquer le formulaire après l'animation
    }, { once: true });
  };

  return (
    <main className="profile-page" style={{ zIndex: 1 }}>
      <section className="relative block h-500-px">
        <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')" }}>
          <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
          <div className="absolute top-0 right-0 m-4">
          <img width="50" height="50" src="https://img.icons8.com/ios-filled/100/FFFFFF/camera--v3.png" alt="camera--v3" className="camera-icon-circle"/>
          </div>
        </div>
        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{ transform: "translateZ(0px)" }}>
        </div>
      </section>
      {flashMessage && <div className={`flash-message ${flashMessageColor}`}>{flashMessage}</div>}
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" className="profil-picture shadow-xl rounded-full h-auto align-middle border-none max-w-150-px" />
                    <img width="24" height="24" src="https://img.icons8.com/ios-filled/24/FFFFFF/camera--v3.png" alt="camera--v3" className="camera-icon" />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="text-blueGray-600 edit-profile">
                    <a href="#" onClick={handleOpen}>
                      <img src="https://img.icons8.com/ios-filled/24/FFFFFF/edit.png" alt="Modifier le profile" />
                    </a>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="lg:mr-20 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{userData.post_likeds}</span><span className="text-sm text-blueGray-400">Post likés</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {userData.username}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase ">
                  <i className="fas fa-envelope mr-2 text-lg text-blueGray-400" style={{ position: 'relative', top: '1.5px' }}></i>
                  {userData.email}
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700 description-text">
                      {userData.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showEditForm && (
        <div id="form-wrap" className="p-4 animated slideInUp">
          <button id="close-modal" type="button" className="close" onClick={handleClose}>
            <i className="fa fa-times"></i>
          </button>
          <form onSubmit={handleSubmit} className="edit-profile-form">
            <h1 className="form-title">Modifier le profil</h1>
            <div className="form-group">
              <label htmlFor="username">Prénom Nom</label>
              <input type="text" id="username" name="username" value={userData.username || ''} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={userData.email || ''} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" value={userData.description || ''} onChange={handleChange} required></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="password">Nouveau mot de passe</label>
              <input type="password" id="password" name="password" value={userData.password || ''} onChange={handleChange}/>
            </div>
            <p className="text-center m-4">
              <button type="submit" className="btn btn-rounded">Enregistrer</button>
            </p>
          </form>
        </div>
      )}
    </main>
  );
};

export default Profil;

