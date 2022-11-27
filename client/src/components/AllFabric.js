import { useEffect, useState } from "react";
import styled from "styled-components";
import FabricItem from "./FabricItem";

const AllFabric = () => {
  const [allFabrics, setAllFabrics] = useState("");

  useEffect(() => {
    fetch("/fabric").then((res) => {
      res.json().then((data) => {
        setAllFabrics(data.data);
      });
    });
  }, []);

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
                return (
                  <>
                    <div>
                      <label>{fabric.location}</label>
                      <input
                        type="radio"
                        name="location"
                        value={fabric.location}
                      />
                    </div>
                    <div>
                      <label>{fabric.size}</label>
                      <input type="radio" name="size" value={fabric.size} />
                    </div>
                  </>
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
