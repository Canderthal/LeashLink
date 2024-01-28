import { useState, useEffect } from "react";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { Container, Col, Row} from "reactstrap";
import { useNavigate } from "react-router-dom";
import db from "../firebase"


const LoginMenu = ({ onUserLogin, onUserLogout}) => {
  const navigate = useNavigate();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Only update user if the authentication state changes
      if (currentUser !== user) {
        setUser(currentUser);

      }
    });
  
    return () => unsubscribe();
  }, [user]);;

  const register = async () => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
  
      // After successful registration, set default role in Firestore
      const userDocRef = doc(db, "users", registerEmail);
  
      // Set default values for the user document, including the default role
      await setDoc(userDocRef, {
        
        role: "test",
        email: registerEmail,
        uid: newUser.user.uid  
        
      });
  
      navigate('/dashboard');
    } catch (error) {
      console.log(error.message);
    }
  }


  const login = async () => {
    try {
      const loggedInUser = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      onUserLogin(loggedInUser);
      navigate('/dashboard');
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    onUserLogout();
  };

  return (
    <Container className="loginBox mt-5">
      <Row className="LEASHLINK">
      <h1>Leash Link</h1>
      </Row>
      <Row>
        <Col>
          <h3> Register</h3>
        </Col>
      </Row>
      <Row>
        <Col>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />
        </Col>
      </Row>
        <button onClick={register}> Create User</button>
      <Row className="mt-3">
        <Col>
          <h3> Login </h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            placeholder="Email..."
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <input
          type="password"
            placeholder="Password..."
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />

        </Col>
      </Row>
          <button onClick={login}> Login</button>
        <button onClick={logout}> Sign Out </button>
      <Row>
        {/* 
        <Col>
          <button onClick={signInWithGoogle}> Sign In With Google</button>
        </Col>
        */}
      </Row>
      <Row>
        <Col>
        <p>Test Account Info</p>
        <p>Email: test@test.com</p>
        <p>Password: password</p>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginMenu;
