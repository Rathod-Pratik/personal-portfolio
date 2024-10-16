import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FoodItem from "./components/FoodItem";

export const URL = "https://my-food-zone.vercel.app/api/food";

const App = () => {
  const [data, setData] = useState([]);  // Initialize with an empty array
  const [loading, setLoading] = useState(true);  // Start with loading true
  const [error, setError] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const parsedData = await response.json();
        setData(parsedData);
        setFilterData(parsedData);
      } catch (error) {
        setError("Unable to fetch data");
      } finally {
        setLoading(false);  // Ensure loading is set to false in finally block
      }
    };
    fetchData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;
    if (searchValue === "") {
      setFilterData(data);  // Reset filter data if search is empty
    } else {
      const filtered = data.filter((food) =>
        food.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilterData(filtered);
    }
  };

  const filterFood = (type) => {
    setSelectedBtn(type);
    if (type === "all") {
      setFilterData(data);
    } else {
      const filtered = data.filter((food) =>
        food.type.toLowerCase() === type.toLowerCase()
      );
      setFilterData(filtered);
    }
  };

  const filterBtns = [
    { name: "All", type: "all" },
    { name: "Breakfast", type: "Breakfast" },
    { name: "Lunch", type: "Lunch" },
    { name: "Dinner", type: "Dinner" },
  ];

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;  // Display loading state

  return (
    <Container>
      <Navbar>
        <div className="nav">
          <div className="logo">
            <img src="/logo.svg" alt="Logo" />
          </div>
          <div className="search">
            <input
              onChange={searchFood}
              type="search"
              placeholder="Search Food...."
              disabled={loading}  // Disable while loading
            />
          </div>
        </div>
        <div className="btn">
          {filterBtns.map((value) => (
            <Button
              isSelectedBtn={selectedBtn === value.type}
              key={value.type}
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </div>
      </Navbar>
      <FoodItem data={filterData} />
    </Container>
  );
};

export default App;

// Styled components can be defined here if needed


const Container = styled.div`
  background-color: #323334;
  margin: 0 auto;
`;
const Navbar = styled.div`
  height: 180px;

  .nav {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    max-width: 1200px;
    align-items: center;
    margin: 0 auto;
    padding: 32px 12px;
    @media (0<width<600px) {
      flex-direction: column;
      height: 120px;
      gap: 12px;
    }
  }
  .search input {
    border: 2px solid red;
    background-color: transparent;
    width: 285px;
    height: 40px;
    border-radius: 5px;
    padding: 0px 12px;
    outline: none;
    font-size: 16px;
    color: white;
    &::placeholder {
      color: white;
    }
  }
  .btn {
    display: flex;
    justify-content: center;
    gap: 22px;
  }
`;
export const Button = styled.button`
  background-color: ${({ isselectedbtn }) =>
    isselectedbtn ? "#f22f2f" : "#ff4343"};
  outline: 1px solid
    ${({ isselectedbtn }) => (isselectedbtn ? "white" : "#ff4343")};
  border: none;
  color: white;
  padding: 7px 15px;
  border-radius: 5px;
  margin: 19px 0px;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`;
