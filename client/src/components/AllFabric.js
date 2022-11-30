import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FabricItem from "./FabricItem";

const AllFabric = () => {
  const [allFabrics, setAllFabrics] = useState("");
  const [filterFabrics, setFilterFabrics] = useState("");
  const [locations, setLocations] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    fetch("/fabric").then((res) => {
      res.json().then((data) => {
        setAllFabrics(data.data);

        setLocations([...new Set(data.data.map((item) => item.location))]);
        setSizes([...new Set(data.data.map((item) => item.size))]);
        setCategories([...new Set(data.data.map((item) => item.category))]);
      });
    });
  }, []);

  //============== All the fabric that will get filtered useEffect=======//
  useEffect(() => {
    setFilterFabrics(allFabrics);
  }, [allFabrics]);

  //============== Size useEffect=======//
  useEffect(() => {
    if (selectedSize !== "") {
      const filtered = allFabrics?.filter((item) => item.size === selectedSize);
      setFilterFabrics(filtered);
    }
  }, [selectedSize]);

  //============== Category useEffect=======//
  useEffect(() => {
    if (selectedCategory !== "") {
      const filterCatergory = allFabrics?.filter(
        (item) => item.category === selectedCategory
      );
      setFilterFabrics(filterCatergory);
    }
  }, [selectedCategory]);

  //============== Location useEffect=======//
  useEffect(() => {
    if (selectedLocation !== "") {
      const filterLocation = allFabrics?.filter(
        (item) => item.location === selectedLocation
      );
      setFilterFabrics(filterLocation);
    }
  }, [selectedLocation]);

  return (
    <Container>
      <Wrapper>
        {!filterFabrics ? (
          <h1>Loading</h1>
        ) : (
          <div>
            <Title>Get your fabric</Title>
            <MapInfo>
              <>
                <div>
                  <Subtile>By location</Subtile>
                  {locations.map((location) => {
                    return (
                      <>
                        <Buttons
                          onClick={() => {
                            setSelectedLocation(location);
                            selectedCategory("");
                            selectedSize("");
                          }}
                        >
                          {location}
                        </Buttons>
                      </>
                    );
                  })}
                </div>
                <div>
                  <Subtile>By Size</Subtile>
                  {sizes.map((size) => {
                    return (
                      <>
                        <Buttons
                          onClick={() => {
                            setSelectedSize(size);
                            selectedCategory("");
                            setSelectedLocation("");
                          }}
                        >
                          {size}
                        </Buttons>
                      </>
                    );
                  })}
                </div>
                <div>
                  <Subtile>By Category</Subtile>
                  {categories.map((category) => {
                    return (
                      <>
                        <Buttons
                          onClick={() => {
                            setSelectedCategory(category);
                            selectedSize("");
                            setSelectedLocation("");
                          }}
                        >
                          {category}
                        </Buttons>
                      </>
                    );
                  })}
                </div>
                <div>
                  <Buttons
                    onClick={() => {
                      setFilterFabrics(allFabrics);
                      selectedCategory("");
                      setSelectedSize("");
                      setSelectedLocation("");
                    }}
                  >
                    See all
                  </Buttons>
                </div>
              </>
            </MapInfo>
            <MapInfo>
              {filterFabrics.map((fabric) => {
                return (
                  <FabricItem
                    key={fabric._id}
                    item={fabric}
                    img={fabric.imageSrc}
                    filterFabrics={filterFabrics}
                  />
                );
              })}
            </MapInfo>
          </div>
        )}
      </Wrapper>
    </Container>
  );
};

export default AllFabric;

const Container = styled.div`
  margin: 0px;
  padding: 0px;
  height: fit-content;
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
`;
const Wrapper = styled.div`
  :before {
    content: "";
    background-image: url("/cover2.jpg");
    position: absolute;
    background-size: cover;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    opacity: 0.6;
  }
`;

const MapInfo = styled.div`
  padding-top: 50px;
  display: grid;
  grid-template-columns: 300px 300px 300px 300px;
  justify-content: center;
  align-items: center;
  gap: 50px;
  height: fit-content;
`;

const Title = styled.h2`
  color: #122620;
`;

const Subtile = styled.h4`
  color: #122620;
  text-transform: uppercase;
`;

const Buttons = styled.button`
  /* position: relative; */
  /* display: inline-block; */
  display: flex;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  font-size: inherit;
  font-family: inherit;
  font-weight: 100;
  color: #d6ad60;
  text-transform: uppercase;
  padding: 0.5em 1em;
  background: #1f4136; //$light-pink: #fff0f0;
  border: 2px solid #d6ad60; //$pink-border: #b18597;
  border-radius: 0.75em;
  transform-style: preserve-3d;
  box-sizing: border-box;
  &::before,
  &::after {
    box-sizing: border-box;
  }
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
    background 150ms cubic-bezier(0, 0, 0.58, 1);
  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #2c5b4c; //$dark-pink: #f9c4d2;
    border-radius: inherit;
    box-shadow: 0 0 0 2px #3f836d, 0 0.625em 0 0 #387663; //$pink-shadow: #ffe3e2;
    transform: translate3d(0, 0.75em, -1em);
    transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
      box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
  }
  &:hover {
    background: #ffe9e9; //$pink: #ffe9e9;
    transform: translate(0, 0.25em);
    &::before {
      box-shadow: 0 0 0 2px #b18597, 0 0.5em 0 0 #ffe3e2;
      transform: translate3d(0, 0.5em, -1em);
    }
  }
  &:active {
    background: #ffe9e9;
    transform: translate(0em, 0.75em);
    &::before {
      box-shadow: 0 0 0 2px #b18597, 0 0 #ffe3e2;
      transform: translate3d(0, 0, -1em);
    }
  }
`;
