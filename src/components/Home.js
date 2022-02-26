import React from "react";
import { Container, Image } from "react-bootstrap";
import logo from "../world_map.jpg";

function Home() {
  return (
    <>
      <Container>
        <Image className="img-fluid" src={logo} responsive />
      </Container>
    </>
  );
}

export default Home;
