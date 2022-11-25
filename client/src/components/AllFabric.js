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
  background-color: #122620;
`;

const MapInfo = styled.div`
  padding-top: 50px;
  display: grid;
  grid-template-columns: 300px 300px 300px 300px;
  justify-content: center;
  align-items: center;
  gap: 30px;
  height: fit-content;
`;

const Title = styled.h2``;
