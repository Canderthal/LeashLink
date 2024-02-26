import { useState, useEffect } from "react";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { Container, Col, Row, Button} from "reactstrap";
import { useNavigate } from "react-router-dom";
import db from "../firebase"
import LoginUser from "../components/LoginUser";
import RegUser from "../components/RegUser";


import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from '../redux/userActions';
import { getUserProfile } from "../util/fetchUserProfile";

const LoginMenu = ({ onUserLogin, onUserLogout, loggedIn } ) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const [isCardFlipped, setCardFlipped] = useState(false);
  const [content, setActiveContent] = useState("login")


  const handleContent = (activeContent) => {
    setCardFlipped(true); // Trigger the card flip animation
    setTimeout(() => {
      setActiveContent(activeContent);
    }, 500);

    setTimeout(() => {
      setCardFlipped(false); // Reset the card flip animation
    }, 1000);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Fetch user profile from Firestore
        const userProfile = await getUserProfile(currentUser.email);
        // Dispatch user information including profile
        const userPayload = {
          uid: currentUser.uid,
          email: currentUser.email,
          profile: userProfile
        };
        dispatch(loginUser(userPayload));
        setUser(userPayload);
        saveUserToLocalStorage(userPayload);
      } else {
        dispatch(logoutUser());
        setUser(null);
        localStorage.removeItem("user");
      }
    });
    return unsubscribe;
  }, []);


  const saveUserToLocalStorage = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null); // Set user state to null if no user info found in local storage
    }
  }, []);


  
  const register = async (email, password, phone, firstName) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // After successful registration, set default role in Firestore
      const userDocRef = doc(db, "users", email);

      // Set default values for the user document, including the default role
      await setDoc(userDocRef, {
        role: "client",
        email,
        uid: newUser.user.uid,
        phone,
        firstName
      });
  
      // Fetch user profile from Firestore
      const userProfile = await getUserProfile(newUser.user.email);
  
      // Dispatch user information including profile
      const userPayload = {
        uid: newUser.user.uid,
        email,
        profile: userProfile
      };
      dispatch(loginUser(userPayload));
      saveUserToLocalStorage(userPayload);
      navigate('/dashboard');
    } catch (error) {
      console.log(error.message);
    }
  };


  //Saving to local storage.

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);




  const login = async (email, password) => {
    try {
      const loggedInUser = await signInWithEmailAndPassword(auth, email, password);
      const userProfile = await getUserProfile(loggedInUser.user.email);
      const userPayload = {
        uid: loggedInUser.user.uid,
        email: loggedInUser.user.email,
        profile: userProfile
      };
        dispatch(loginUser(userPayload)); // Dispatch only the necessary user information
        
        navigate('/dashboard');
      } catch (error) {
        console.log(error.message);
      }
    };

  const logout = async () => {
    await signOut(auth);
    dispatch(logoutUser());
    localStorage.removeItem("user");
  };

  return (
    <>    


    <Container className={`loginBox mt-5 card-container ${isCardFlipped ? 'rotate' : ''}`}>
      <Row className="LEASHLINK">
      <h1 className={`loginTitle ${isCardFlipped ? 'rotate' : ''}`}>Leash Link</h1>
      </Row>
      <Row className={` ${isCardFlipped ? 'rotate' : ""}`}>
        
      {content === "login" ? (
        <LoginUser className="card" login={login} logout={logout} loggedIn={user !== null} />
        ) : (
          <RegUser className="card" register={register}/>
        )}
      </Row>
        <Row className="mt-5 ">
          <Col className={` ${isCardFlipped ? 'rotate' : ""} d-flex justify-content-center loginTitle`} >
            {content === 'login' ? 
              <a onClick={() => handleContent("register")} style={{ cursor: 'pointer'}}>Register</a> :
              <a onClick={() => handleContent("login")} style={{ cursor: 'pointer'}}>Login</a>
            }
        </Col>
      </Row>

    </Container>
    
    </>
  );
}

export default LoginMenu;
