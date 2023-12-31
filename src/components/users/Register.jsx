import React, { useState } from "react";
// reactstrap components
import 'font-awesome/css/font-awesome.min.css';
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import { useHistory } from "react-router";
import { registerUser } from "Service/api";
import MovingClouds from "components/MovingClouds";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// core components
const initialValue = {
  name: '',
  email: '',
  password: '',
  cpassword: ''
}
const Register = () => {
  const [user, setUser] = useState(initialValue);
  const { name, email, password, cpassword } = user;
  let history = useHistory();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const registerNewUser = async (e) => {
    e.preventDefault();
    try {
      if (name && email && password && cpassword) {
        if (password === cpassword) {
          const response = await registerUser(user);
          if (response.status === 200) {
            toast.success('User registered successfully!', {
              position: "top-center",
              autoClose: 3500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
            });
            history.push('/signin');
          }
        } else {
          toast.error('Password did not match!', {
            position: "top-center",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          });
        }

      } else {
        toast.error('Please Fill All Fields!', {
          position: "top-center",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
      }
    } catch (error) {
      toast.error('Email Alreday Register!', {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }
  };

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
            <Col className="ml-auto mr-auto" lg="6">
              <Card style={{ backgroundColor: '#FF8F5E' }} className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">REGISTER</h3>
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
                  <label>Name</label>
                  <Input placeholder="Your Name" type="text" onChange={(e) => handleChange(e)} name="name" value={name} required />
                  <label>Username or Email</label>
                  <Input placeholder="Email" type="email" onChange={(e) => handleChange(e)} name="email" value={email} required />
                  <label>Password</label>
                  <Input placeholder="Password" type="password" onChange={(e) => handleChange(e)} name="password" value={password} required />
                  <label>Confirm Password</label>
                  <Input placeholder="Password" type="password" onChange={(e) => handleChange(e)} name="cpassword" value={cpassword} required />
                  <Button block className="btn-round" color="dark" type="submit" onClick={registerNewUser}>Register</Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
export default Register;