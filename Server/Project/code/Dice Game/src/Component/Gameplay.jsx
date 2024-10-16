import Score from "./score";
import styled from "styled-components";
import RoleDice from "./RoleDice";
import Number from "./Number";
import { useState } from "react";
import Rules from "./Rules";

const Gameplay = () => {
  const [score, setscore] = useState(0);
  const [currentDice, setCurrentDice] = useState(1);
  const [selectnumber, setselectnumber] = useState();
  const [error,seterror]=useState();
  const [showrules,setshowrules]=useState(false);

  const Resetscore=()=>{
    setscore(0);
  }

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const rollDice = () => {
    if(!selectnumber){
      seterror("You have not selected any number");
      return;
    }
    else{
      seterror("");
    }
    const Randomnumber = getRandomNumber(1, 7);

    setCurrentDice((prev)=> Randomnumber);

    if(selectnumber===Randomnumber){
      setscore((prev)=> prev+Randomnumber);
    }
    else{
      setscore((prev)=> prev-2);
    }
    setselectnumber(undefined)
  };

  return (
    <>
      <Nav>
        <div className="score">
          <Score score={score}/>
        </div>
        <div>
          <Number
          error={error}
          seterror={seterror}
            selectnumber={selectnumber}
            setselectnumber={setselectnumber}
          />
        </div>
      </Nav>
      <RoleDice Resetscore={Resetscore} setshowrules={setshowrules} showrules={showrules} currentDice={currentDice} rollDice={rollDice} />

      {showrules && <Rules/>}
    </>
  );
};

export default Gameplay;

const Nav = styled.nav`
@media only screen and (max-width: 1024px ) {
flex-direction: column;
}
  display: flex;
  width: 80%;
  margin: auto;
  justify-content: space-between;

  .score{
    display: flex;
    align-items: center;
  }
`;
