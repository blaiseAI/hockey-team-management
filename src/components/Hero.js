import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import {LinkContainer} from 'react-router-bootstrap'
function Hero() {
  return (
    <div>
      <Jumbotron>
        <div className="container">
        <h1>Hockey Players - Team Management</h1>
        <p>
          This is a simple React CRUD application using <a href="https://dexie.org/">Dexie.js</a> (IndexedDb)
        </p>
        <p>
        <LinkContainer to="/players">
          <Button variant="primary">View Players</Button>
        </LinkContainer>
        </p>
        </div>
      </Jumbotron>
    </div>
  )
}
export default Hero;