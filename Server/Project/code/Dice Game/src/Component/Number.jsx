import styled from "styled-components"
const Number = ({seterror,error,selectnumber, setselectnumber}) => {
    const number = [1, 2, 3, 4, 5, 6];
    const selectedNumber=(value)=>{
      setselectnumber(value);
      seterror("");
    }
  return (
    <SelectNumber>
       <div className="flex">
        <div className="error">
      <p>{error}</p>
        </div>
          <div className="number">
            {number.map((value, i) => (
              <Box key={i} onClick={() => selectedNumber(value)} isvalue={value == selectnumber}>
              {value}
            </Box>
            ))}
          </div>
          <div>
            <p className="select-number">Select Number</p>
          </div>
        </div>
    </SelectNumber>
  )
}

export default Number

const SelectNumber = styled.div`
@media only screen and (max-width: 1024px ) {
p{
  margin: auto;
  gap:6px !important;
}
.number{
  flex-wrap: wrap;
  gap:6px !important ;
}
}
.error{
  display: flex;
    justify-content: end;
    color: red;
    font-size: 24px;
}
  .number {
    display: flex;
    flex-direction: row;
    gap: 30px;
  }
  .flex{
    display: flex;
    gap: 24px;
    flex-direction: column;
    margin-top: 40px;
  }
  .select-number{
     display: flex;
    justify-content: end;
    font-size: 30px;
    font-weight: bold;
  }
`;
const Box = styled.p`
  border: 2px solid black;
  color: black;
  height: 72px;
  width: 72px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: ${(props) => props.isvalue ?"black":"white"};
  color: ${(props) => !props.isvalue ?"black":"white"};
`;
