import React, { useEffect, useState, useContext } from "react";
// reactstrap components
import 'font-awesome/css/font-awesome.min.css';
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import { signIn, getAll } from "Service/api";
import { useHistory } from "react-router";
import MovingClouds from "components/MovingClouds";
import { UserContext } from "Main";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { red } from "@material-ui/core/colors";

// core components
const initialValue = {
  email: "",
  password: "",
}

const SignIn = () => {
  const { state, dispatch } = useContext(UserContext);
  const [user, setUser] = useState(initialValue);
  const history = useHistory();
  const { email, password } = user;


  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  };

  const logInUser = async (e) => {
    e.preventDefault();
    try {
      if (email && password) {
        const response = await signIn(user);
        if (response.status === 200) {
          dispatch({ type: "USER", payload: true });
          // localStorage.setItem("initState", true);
          history.push('/universities');
          toast.success('Welcome! Successfully signIn!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          });
        }
      }
      else {
        toast.error('Invalid Input', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
      }
    } catch (error) {
      toast.error('Invalid Credentials!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }
  }

  React.useEffect(() => {
    document.body.classList.add("register-page");
  });
  return (
    <>
     <ToastContainer />
      <div className="page-header" style={{ backgroundImage: "url(" + require("assets/img/login-image.jpg").default + ")" }}>
        <MovingClouds />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card style={{ backgroundColor: '#8fce00' }} className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto ">SIGN IN</h3>
                <div className="social-line text-center">
                  <Button className="btn-neutral btn-just-icon mr-1" color="facebook" href="#" onClick={(e) => e.preventDefault()}>
                    <i className="fa fa-facebook-square" />
                  </Button>
                  <Button className="btn-neutral btn-just-icon mr-1" color="google" href="#" onClick={(e) => e.preventDefault()} >
                    <i className="fa fa-google-plus" />
                  </Button>
                  <Button className="btn-neutral btn-just-icon" color="twitter" href="#" onClick={(e) => e.preventDefault()} >
                    <i className="fa fa-twitter" />
                  </Button>
                </div>
                <Form className="register-form">
                  <label>Email</label>
                  <Input placeholder="Email" type="text" onChange={(e) => handleChange(e)} name="email" value={email} />
                  <label>Password</label>
                  <Input placeholder="Password" type="password" onChange={(e) => handleChange(e)} name="password" value={password} />
                  <Button block className="btn-round" color="danger" onClick={(e) => logInUser(e)}>Sign In</Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
export default SignIn;
