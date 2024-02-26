import { signInWithEmailAndPassword } from "firebase/auth";
import { Container, Row, Col, Button } from "reactstrap";
import { useState } from "react";
import { useSelector } from "react-redux";


const LoginUser = ({login, logout, loggedIn}) => {

  const user = useSelector((state) => state.user.user)
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const handleLogin = () => {
      login(loginEmail, loginPassword);
    };
    return (
        <Container className="mt-5">
            <h3 className="d-flex justify-content-center loginTitle">Login</h3>
            <Row>
              <Col className="d-flex justify-content-center mt-3">
                <input
                  className="accessInput"
                  placeholder="Email..."
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                  }}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col className="d-flex justify-content-center">
                <input
                  className="accessInput"
                  type="password"
                  placeholder="Password..."
                  onChange={(event) => {
                    setLoginPassword(event.target.value);
                  }}
                />
              </Col>
            </Row>
            <Row className="mt-3 d-flex justify-content-center">
              {user ? <Button className="logoutButton" onClick={logout}>Sign Out</Button> :
              <Button className="loginButton" onClick={handleLogin}>Login</Button> 
              }
            </Row>
        </Container>
    )
}

export default LoginUser;