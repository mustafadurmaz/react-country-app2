import React, { useState } from "react";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import CountryDetail from "./CountryDetail";
import { Container, Form } from "react-bootstrap";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

const continentList = gql`
  {
    continents {
      name
      code
    }
  }
`;

function Continent() {
  const [continent, setCountry] = useState("AF");
  const { data, loading, error } = useQuery(continentList, { client });

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }
  //   console.log(data);
  return (
    <>
      <Container>
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
      </Container>
    </>
  );
}

export default Continent;

