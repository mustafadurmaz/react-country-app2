import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import { Container, ListGroup } from "react-bootstrap";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

const client2 = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

const continentList = gql`
  {
    continents {
      name
      code
      countries {
        name
        capital
        emoji
        languages {
          name
        }
      }
    }
  }
`;

function CountryDetail({ continentcode }) {
  const { data, loading, error } = useQuery(continentList, { client });

  const [languages, setLanguages] = useState([]);
  const [countries, setCountries] = useState([]);

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }

  for (let i = 0; i < data.continents.length; i++) {
    countries.push(data.continents[i].countries);
  }

  var select1 = [];
  var select2 = [];
  var select3 = [];

  //   console.log(countries);

  const array = [
    ...countries[0],
    ...countries[1],
    ...countries[2],
    ...countries[3],
    ...countries[4],
    ...countries[5],
    ...countries[6],
  ];

  for (let i = 0; i < languages.length; i++) {
    select1.push(languages[i].name);
  }

  console.log(array);

  //   array.forEach(o => {
  //     if (select1.includes(o.languages[0]?.name)) {
  //         select2.push(o.name);
  //     }
  //     if (select1.includes(o.languages[1]?.name)) {
  //         select2.push(o.name);
  //     }
  //     if (select1.includes(o.languages[2]?.name)) {
  //         select2.push(o.name);
  //     }
  //     if (select1.includes(o.languages[3]?.name)) {
  //         select2.push(o.name);
  //     }
  //     if (select1.includes(o.languages[4]?.name)) {
  //         select2.push(o.name);
  //     }
  // });

  array.forEach((o) => {
    for (let i = 0; i < o.languages.length; i++) {
      if (select1.includes(o.languages[i]?.name)) {
        select2.push(o.name);
      }
    }
  });

  data.continents.forEach((o) => {
    for (let i = 0; i < o.countries.length; i++) {
      if (select2.includes(o.countries[i]?.name)) {
        select3.push({
          kita: o.name,
          ulke: o.countries[i].name,
        });
      }
    }
  });

  const groupBy = (key) => (array) =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});

  const groupByKita = groupBy("kita");
  const ulkeler = groupByKita(select3);
  const ulke = Object.entries(ulkeler).map(([title, data]) => ({
    title,
    data,
  }));

  console.log(ulke);

  console.log(select2);
  console.log(select3);

  const filteredData = data.continents.filter(
    (continent) => continent.code === continentcode
  );

  console.log(data.continents);

  return (
    <>
      <Container>
        {filteredData[0].countries.map((country) => (
          <ListGroup key={country.name}>
            <ListGroup.Item>Ülke ismi: {country.name}</ListGroup.Item>
            <ListGroup.Item>Ülke başkenti: {country.capital}</ListGroup.Item>
            <ListGroup.Item>Ülke Bayrağı: {country.emoji}</ListGroup.Item>
            <ListGroup.Item>
              <div className="container">
                <button
                  type="button"
                  className="btn btn-primary float-center rounded-pill"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => {
                    setLanguages({ country }.country.languages);
                  }}
                >
                  Detay
                </button>

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <div className="modal-body modal-lg">
                          {ulke.map(({ title, data }, i) => (
                            <div key={i}>
                              <div>
                                <h1>{title}</h1>
                                {data.map((prem, j) => (
                                  <p key={j}>{prem.ulke}</p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        ))}
      </Container>
    </>
  );
}

export default CountryDetail;
