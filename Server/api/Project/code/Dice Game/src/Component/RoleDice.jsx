import styled from "styled-components";
import { Button, OutlineButton } from "../Styled/button";

const RoleDice = ({showrules,setshowrules,Resetscore, rollDice, currentDice }) => {
  return (
    <>
      <RollDice>
        <div onClick={rollDice}>
          <img src={`Image/dice_${currentDice}.png`} alt="Dice" />
        </div>
        <p>Click on Dice to roll</p>
      <div className="btn">
        <OutlineButton onClick={Resetscore}>Reset Score</OutlineButton>
        <Button onClick={() => setshowrules((prev) => !prev)}>{showrules ?"Hide":"Show"} Rules</Button>
      </div>
      </RollDice>
    </>
  );
};

export default RoleDice;

const RollDice = styled.div`
  line-height: 48px;
  display: flex;
  margin: auto;
  flex-direction: column;
  p {
    font-size: 24px;
    display: flex;
    margin: auto;
    font-weight: bold;
  }
  .btn {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
  div {
    margin: auto;
  }
  img {
    height: 250px;
    width: 250px;
  }
`;
