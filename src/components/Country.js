import React from "react";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Container } from "react-bootstrap";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const client = new ApolloClient({
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
      }
    }
  }
`;

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Ülkeler Grafiği",
    },
  },
};

export default function Country() {
  const { data } = useQuery(continentList, { client });

  var kita = [];
  var ulkeSayisi = [];

  for (let i = 0; i < data?.continents.length; i++) {
    kita.push(data.continents[i].name);
  }
  for (let i = 0; i < data?.continents.length; i++) {
    ulkeSayisi.push(data?.continents[i].countries.length);
  }

  const labels = kita;
  const data2 = {
    labels,
    datasets: [
      {
        label: "Ülke Sayısı",
        data: ulkeSayisi,
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  return (
    <>
      <Container>
        <Bar options={options} data={data2} />
      </Container>
    </>
  );
}
