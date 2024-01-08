import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";


const FidoPage = () => {
    const [textContent, setTextContent] = useState();
    const [password, setPasswordValue] = useState();


    const navigate = useNavigate();
    const handleLoginClick = () => {
      setPasswordValue(document.getElementById('pwd').value);
      if (password === "Pokemon") {
        setPasswordValue("");
        navigate('/homepage');
      } else {
        setTextContent("WRONG PASSWORD");
      }
    };

    return (

        <Container className={`text-center mt-5 loginMenu` } fluid="sm">
            
            <Row>
                <Col><h3>Sign In</h3></Col>
            </Row>

            <Row>
                <Col>
                    <h2 className="text-danger">{textContent}</h2>
                </Col>
            </Row>

            <Row className="d-flex justify-content-center login">
                <Col xs='1'>
                    <p>👤</p>
                </Col>
                <Col xs='6'>
                    <input   type="text" id="username" name='username' placeholder="username"></input>
                </Col>
            </Row>

            <Row className="d-flex justify-content-center login">
                <Col xs='1'>
                    <p>🔒</p>
                </Col>
                <Col xs='6'>
                    <input type="password" id="pwd" name='pwd' placeholder="password" onChange={(e) => setPasswordValue(e.target.value)}></input>
                </Col>
            </Row>

            <Row>
                <Col>
                    <button onClick={handleLoginClick}>Login</button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p></p>
                </Col>
            </Row>
        </Container>
    )
};

export default FidoPage;