import { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";
import { registerUser } from "../redux/userActions";

const RegUser = ({ register }) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch()

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    // You can add further validation for email format, password strength, etc.

    // Call the register function if all validation passes
    dispatch(registerUser(email, password, phone, firstName));
    register(email, password, phone, firstName);
  };

  return (
    <Container className="mt-5">
      <h3 className="d-flex justify-content-center loginTitle">Register User</h3>
      <Row>
        <Col className="d-flex justify-content-center mt-3">
          <input
            className="accessInput"
            placeholder="First Name..."
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col className="d-flex justify-content-center">
          <input
            className="accessInput"
            placeholder="Email..."
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col className="d-flex justify-content-center">
          <input
            type="password"
            className="accessInput"
            placeholder="Password..."
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col className="d-flex justify-content-center">
          <input
            type="password"
            className="accessInput"
            placeholder="Confirm Password..."
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col className="d-flex justify-content-center">
          <input
            className="accessInput"
            placeholder="Phone Number..."
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        </Col>
      </Row>
      {errorMessage && (
        <Row className="mt-2">
          <Col className="d-flex justify-content-center text-danger">
            {errorMessage}
          </Col>
        </Row>
      )}
      <Row className="mt-3">
        <Button className="createUserButton" onClick={handleRegister}>
          Register
        </Button>
      </Row>
    </Container>
  );
};

export default RegUser;




// import { useState } from "react";
// import { Container, Row, Col, Button } from "reactstrap";


// const RegUser = ({register}) => {
//     const [registerEmail, setRegisterEmail] = useState("");
//     const [registerPassword, setRegisterPassword] = useState("");

//     const handleRegister = () => {
//         register(registerEmail, registerPassword)
//     } 
//           return (
//             <Container className="mt-5">
//                 <h3 className="d-flex justify-content-center loginTitle">Register User</h3>
//                 <Row>
//                     <Col className="d-flex justify-content-center mt-3">
//                     <input
//                         className="accessInput"
//                         placeholder="Email..."
//                         onChange={(event) => {
//                             setRegisterEmail(event.target.value);
//                         }}
//                     />
//                     </Col>
//                 </Row>

//                 <Row className="mt-2">
//                     <Col className="d-flex justify-content-center">
//                         <input
//                             className="accessInput"
//                             placeholder="Password..."
//                             onChange={(event) => {
//                                 setRegisterPassword(event.target.value);
//                             }}
//                         />
//                     </Col>
//                 </Row>
//                 <Row className="mt-3">
//                     <Button className="createUserButton" onClick={handleRegister}>Register</Button>
//                 </Row>
//             </Container>
//           )
// }

// export default RegUser;