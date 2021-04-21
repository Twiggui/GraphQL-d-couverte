import React from 'react';
import { useQuery, gql } from '@apollo/client';

const EXCHANGE_RATES = gql`
  {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;

type type = {
  launch_date_utc: Date;
  launch_success: boolean;
  rocket: any;
  links: any;
  details: any;
};

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.launches.map(
    ({ launch_date_utc, launch_success, rocket, links, details }: type) => (
      <div key={launch_date_utc.toString()}>
        <p>
          {launch_date_utc}: {launch_success}: {rocket.rocket_name}:
          {links.video_link}: {details}
        </p>
      </div>
    )
  );
}

export default ExchangeRates;
