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
              <CategoryLink key={link} to={`/categories/${link}`}>
                {link}
              </CategoryLink>
            );
          })}
        </MapInfo>
      )}
    </Container>
  );
};

export default FiberCategory;

const Container = styled.div``;

const MapInfo = styled.div``;

const Title = styled.h2``;
const CategoryLink = styled(Link)``;
///categories
