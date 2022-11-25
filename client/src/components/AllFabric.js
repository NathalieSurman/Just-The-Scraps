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
  console.log(allFabrics);
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

const Container = styled.div``;

const MapInfo = styled.div``;

const Title = styled.h2``;
