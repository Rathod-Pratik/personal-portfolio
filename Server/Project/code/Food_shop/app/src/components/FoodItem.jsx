import styled from "styled-components";
import { Button} from "../App";
// const URL="my-food-zone.vercel.app/api/food";
const URL="https://my-food-zone.vercel.app";
const FoodItem = ({ data }) => {
  return (
    <FoodItemContainer>
      <Container>
        <FoodCards>
          {data?.map(({ name, text, image, price }) => (
            <FoodItems key={name}>
              <div className="img">
                <img src={URL + image} alt="Food image" />
              </div>
              <div className="Food_info">
                <div>
                  <h2>{name}</h2>
                  <p>{text}</p>
                </div>
                <Button>${price.toFixed(2)}</Button>
              </div>
            </FoodItems>
          ))}
        </FoodCards>
      </Container>
    </FoodItemContainer>
  );
};

export default FoodItem;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const FoodItemContainer = styled.section`
  min-height: calc(100vh - 180px);
  background: url("/bg.png") no-repeat center center;
  background-size: cover;
`;
const FoodCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 32px;
  column-gap: 20px;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
`;
const FoodItems = styled.div`
.img img{
  object-fit: cover;
    object-position: center;
  border-radius: 50%;
  height: 153px;
  width: 153px;
}
  width: 340px;
  height: 167px;
  border: 0.66px solid;
  border-image-source: radial-gradient(
      80.69% 208.78% at 108.28% 112.58%,
      #eabfff 0%,
      rgba(135, 38, 183, 0) 100%
    ),
    radial-gradient(
      80.38% 222.5% at -13.75% -12.36%,
      #98f9ff 0%,
      rgba(255, 255, 255, 0) 100%
    );

  background: url(.png),
    radial-gradient(
      90.16% 143.01% at 15.32% 21.04%,
      rgba(165, 239, 255, 0.2) 0%,
      rgba(110, 191, 244, 0.0447917) 77.08%,
      rgba(70, 144, 213, 0) 100%
    );
  background-blend-mode: overlay, normal;
  backdrop-filter: blur(13.1842px);

  border-radius: 20px;
  display: flex;
  padding: 8px;

  .Food_info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;

    h3 {
      margin-top: 8px;
      font-size: 16px;
      font-weight: 500;
    }
    p {
      margin-top: 4px;
      font-size: 12px;
    }
  }
`;
