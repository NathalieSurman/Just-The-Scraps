import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FabricItem from "./FabricItem";

const AllFabric = () => {
  const [allFabrics, setAllFabrics] = useState("");
  const [filterFabrics, setFilterFabrics] = useState({});
  const [activeInput, setActiveInput] = useState("");

  useEffect(() => {
    fetch("/fabric").then((res) => {
      res.json().then((data) => {
        setAllFabrics(data.data);
        setFilterFabrics(data.data);
      });
    });

    // //We want to get only one item each time

    // //We want if one of the filters is picked
  }, []);
  const handleChange = (e) => {
    setFilterFabrics({ ...filterFabrics, [e.target.name]: [e.target.value] });
  };

  console.log(allFabrics);

  return (
    <Container>
      <Wrapper>
        {!allFabrics ? (
          <h1>Loading</h1>
        ) : (
          <div>
            <Title>Get your fabric</Title>
            <MapInfo>
              {allFabrics.map((fabric) => {
                //NOTE this keeps repeating the same data TODO
                return (
                  <React.Fragment key={fabric.location}>
                    <div>
                      <label>{fabric.location}</label>
                      <input
                        onChange={handleChange}
                        type="radio"
                        name="location"
                        value={fabric.location}
                      />
                    </div>
                    <div>
                      <label>{fabric.size}</label>
                      <input
                        onChange={handleChange}
                        type="radio"
                        name="size"
                        value={fabric.size}
                      />
                    </div>
                  </React.Fragment>
                );
              })}
            </MapInfo>
            <MapInfo>
              {allFabrics.map((fabric) => {
                return (
                  <FabricItem
                    key={fabric._id}
                    item={fabric}
                    img={fabric.imageSrc}
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
