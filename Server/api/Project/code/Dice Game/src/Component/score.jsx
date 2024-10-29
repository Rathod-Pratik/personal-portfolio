import styled from 'styled-components';
import React from 'react'

const score = ({score}) => {
  return (
    <Scored >
     <h1>{score}</h1>
     <span>Total Score</span>
    </Scored>
  )
}

export default score

const Scored=styled.div`
@media only screen and (max-width: 1024px ) {
margin: auto;
}
    display: flex;
    flex-direction: column;
h1{
    font-size: 100px;
    margin: auto;
}
span{
    font-size: 24px;
    margin: auto;
}
`
