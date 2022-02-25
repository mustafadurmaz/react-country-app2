import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import CountryDetail from "./CountryDetail";

// initialize a GraphQL client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

// write a GraphQL query that asks for names and codes for all countries
const continentList = gql`
  {
    continents {
      name
      code
    }
  }
`;

// create a component that renders a select input for coutries
function Continent() {
  const [continent, setCountry] = useState("AF");
  const { data, loading, error } = useQuery(continentList, { client });

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }
//   console.log(data);
  return (
    <>
      <select
        value={continent}
        onChange={(event) => setCountry(event.target.value)}
      >
        {data.continents.map((continent) => (
          <option key={continent.code} value={continent.code}>
            {continent.name}
          </option>
        ))}
      </select>
      <CountryDetail continentcode={continent} />
    </>
  );
}

export default Continent;
