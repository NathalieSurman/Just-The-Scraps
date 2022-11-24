import { useEffect, useState } from "react";
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
    <div>
      {!allFabrics ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <h2>Get your fabric</h2>
          <div>
            {allFabrics.map((fabric) => {
              return (
                <FabricItem
                  key={fabric._id}
                  item={fabric}
                  img={fabric.imageSrc}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllFabric;
