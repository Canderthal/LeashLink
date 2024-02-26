import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Container, Row, Col } from "reactstrap";


const RegisterUser = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

          return (
            <Container>
                <h3>Register User</h3>
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
                <button> Create User</button>
            </Container>
          )
}

export default RegisterUser;