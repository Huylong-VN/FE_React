// import React,{ useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
// import PropTypes from 'prop-types'

function About(props) {
  const history = useHistory();
  return (
    <div>
    fsds
      <button onClick={() => history.push("/Home")}>Pre</button>
    </div>
  );
}

// About.propTypes = {

// }

export default About;
