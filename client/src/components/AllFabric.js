import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FabricItem from "./FabricItem";

const AllFabric = () => {
  const [allFabrics, setAllFabrics] = useState("");
  const [filterFabrics, setFilterFabrics] = useState({});
  const [locations, setLocations] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeInput, setActiveInput] = useState("");

  useEffect(() => {
    fetch("/fabric").then((res) => {
      res.json().then((data) => {
        setAllFabrics(data.data);

        setLocations([...new Set(data.data.map((item) => item.location))]);
        setSizes([...new Set(data.data.map((item) => item.size))]);
        setCategories([...new Set(data.data.map((item) => item.category))]);
      });
      // .then(() => {
      //   if (filterFabrics.size) {
      //     const sizeFilter = allFabrics.filter(
      //       (item) => item.size === filterFabrics.size
      //     );
      //     setAllFabrics(sizeFilter);
      //   }
      // })
      // .then(() => {
      //   const categoryFilter = allFabrics.filter(
      //     (item) => item.category === filterFabrics.category
      //   );
      //   setAllFabrics(categoryFilter);
      // })
      // .then(() => {
      //   const locationFilter = allFabrics.filter(
      //     (item) => item.location === filterFabrics.location
      //   );
      //   setAllFabrics(locationFilter);
      // });
    });
  }, [filterFabrics]);

  // let filteredData = allFabrics;
  // if (allFabrics && Object.values(filterFabrics).length) {
  //   const keys = Object.keys(filterFabrics);

  //   console.log("keys", keys);
  //   Object.values(filterFabrics).forEach((filter, index) => {
  //     filteredData = allFabrics.filter((item) => {
  //       return item[keys[index]] === filterFabrics[keys[index]];
  //     });
  //   });
  // }
  //setAllFabrics(filteredData);

  // console.log("filteredData", filteredData);
  // console.log("filterFabrics", filterFabrics);

  const handleChange = (e) => {
    // if (e.target.name === "location") {
    //   console.log("here");

    //   const test = allFabrics.filter(
    //     (item) => item.location === e.target.value
    //   );

    //   console.log("test", test);
    //   setAllFabrics(
    //     allFabrics.filter((item) => item.location === e.target.value[0])
    //   );
    // }
    setFilterFabrics({
      ...filterFabrics,
      [e.target.name]: [e.target.value][0],
    });
  };

  console.log("filterFabrics", filterFabrics);

  return (
    <Container>
      <Wrapper>
        {!allFabrics ? (
          <h1>Loading</h1>
        ) : (
          <div>
            <Title>Get your fabric</Title>
            <MapInfo>
              <React.Fragment>
                <div>
                  <p>location</p>
                  {locations.map((location) => {
                    return (
                      <>
                        <label>{location}</label>
                        <input
                          onChange={handleChange}
                          type="radio"
                          name="location"
                          value={location}
                        />
                      </>
                    );
                  })}
                </div>
                <div>
                  <p>Size</p>
                  {sizes.map((size) => {
                    return (
                      <>
                        <label>{size}</label>
                        <input
                          onChange={handleChange}
                          type="radio"
                          name="size"
                          value={size}
                        />
                      </>
                    );
                  })}
                </div>
                <div>
                  <p>Category</p>
                  {categories.map((category) => {
                    return (
                      <>
                        <label>{category}</label>
                        <input
                          onChange={handleChange}
                          type="radio"
                          name="category"
                          value={category}
                        />
                      </>
                    );
                  })}
                </div>
              </React.Fragment>
            </MapInfo>
            <MapInfo>
              {allFabrics.map((fabric) => {
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
