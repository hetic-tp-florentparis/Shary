import React, {useEffect, useRef, useState} from 'react';
import Auth from './pages/authentification/Auth';
import {Routes, Route, Navigate} from 'react-router-dom';
import HideIfLogged from './components/common/HideIfLogged';
import HideIfNotLogged from './components/common/HideIfNotLogged';

/* Pages */
import Homepage from './pages/homepage';
import Profil from './pages/profil';
import EventToCome from './pages/event-to-come';
import EventPass from './pages/event-pass';
import GuestList from './pages/guest-list';
import Modules from './pages/modules';
import Alert from './pages/alert';
import Information from './pages/information';
import Moderation from './pages/moderation';
import Settings from './pages/settings';
import Contact from './pages/contact-us';

/* Components */
import NavbarLeft from './components/navbar/vertical/NavbarVertical';
import NavbarTop from './components/navbar/top/NavbarTop';

/* Interfaces */
import UserInterface from './interfaces/UserInterface';
import NavbarBottomMobile from './components/navbar/bottomMobile/NavbarBottomMobile';
import MenuProfil from './components/navbar/top/MenuProfil';

import useGetUsers from './hooks/useGetUsers';
import useGetEvents from './hooks/useGetEvents';
import BurgerMenu from './components/navbar/burger-menu/BurgerMenu';

function App() {

  const [displayMenuProfil, setDisplayMenuProfil] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState<UserInterface>({
    status: 'error',
    mail: '',
    token: 'bdhuaz'
  });

  const closeProfile = () => {
    if (displayMenuProfil == true) {
      setDisplayMenuProfil(false)
    }
  }


  const getUsers = useGetUsers();
  const getEvents = useGetEvents();
  const [needsUpdate, setNeedsUpdate] = useState<boolean>(false)

  const [user, setUser] = useState([])
  const [event, setEvent] = useState([])

  useEffect(() => {
    getUsers()
        .then(data => {
            setUser(data)
            setNeedsUpdate(false)
        })
  }, [needsUpdate])

  useEffect(() => {
    getEvents()
        .then(data => {
            setEvent(data)
            setNeedsUpdate(false)
        })
  }, [needsUpdate])

  console.log(event);

  return (
    <>
      <HideIfLogged loggedUser={loggedUser}>
        <Routes>
          <Route  path="/*" element={<Navigate to="auth/login" />} />
          <Route path="/auth/*" element={<Auth />} />
        </Routes>
      </HideIfLogged>
      <HideIfNotLogged loggedUser={loggedUser}>
        <>
          <NavbarTop displayMenuProfil={displayMenuProfil} setDisplayMenuProfil={setDisplayMenuProfil} />
          {displayMenuProfil ? <MenuProfil />: ''}
          {displayMenuProfil ? <BurgerMenu /> : '' }
          <div className="content-layout" onClick={closeProfile}>
            <NavbarLeft />
            <div className="main-layout" >
              <Routes>
                <Route path="/*" element={<Navigate to="/" />} />
                <Route path="/" element={<Homepage />} />
                <Route path="/event-to-come" element={<EventToCome />} />
                <Route path="/event-pass" element={<EventPass />} />
                <Route path="/information" element={<Information />} />
                <Route path="/guest-list" element={<GuestList />} />
                <Route path="/alert" element={<Alert />} />
                <Route path="/modules" element={<Modules />} />
                <Route path="/moderation" element={<Moderation />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/contact-us" element={<Contact />} />
              </Routes>
            </div>
            <NavbarBottomMobile displayMenuProfil={displayMenuProfil} setDisplayMenuProfil={setDisplayMenuProfil}/>
          </div>
        </>
      </HideIfNotLogged>
    </>
  );
}

export default App;
