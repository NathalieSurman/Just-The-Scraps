import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const FiberCategory = () => {
  //Get current category to view based on url
  const { category } = useParams();

  //All categories state initially an empty array that will get set from fetch below
  const [allCategories, setAllCategories] = useState([]);

  const [categoryItems, setCategoryItems] = useState("");

  //Fetch all categories on component render
  useEffect(() => {
    fetch(`/categories`).then((res) => {
      res.json().then((data) => {
        console.log(data.categories);
        setAllCategories(data.categories);
      });
    });
  }, []);

  //Fetch current category based on URL and set into categoryIems state
  useEffect(() => {
    fetch(`/categories/${category}`).then((res) => {
      res.json().then((data) => {
        setCategoryItems(data.data);
      });
    });
  }, [category]);
  return (
    <Container>
      {allCategories.length === 0 ? (
        <h1>Loading</h1>
      ) : (
        <MapInfo>
          {/*Map allCategories onto Category NavLinks */}
          {allCategories.map((link) => {
            return (
              <div>
                <CategoryLink key={link} to={`/categories/${link}`}>
                  {link}
                </CategoryLink>
                {/* <Image src="/natural2.jpg" alt="fabric" /> */}
              </div>
            );
          })}
        </MapInfo>
      )}
    </Container>
  );
};

export default FiberCategory;

const Container = styled.div``;

const MapInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h2`
  color: white;
  margin-bottom: 20px;
`;
const CategoryLink = styled(Link)``;
const Image = styled.img`
  /* width: 100%;
  height: 100%;
  object-fit: cover; */
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: grey;
  cursor: pointer;
`;

///categories
