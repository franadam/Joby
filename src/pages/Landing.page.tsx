import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import main from '../assets/main.svg';
import { Logo } from '../components';

const Landing = (): JSX.Element => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>Job Tracking App</h1>
          <p>
            Incenderat autem audaces usque ad insaniam homines ad haec, quae
            nefariis egere conatibus, Luscus quidam curator urbis subito visus:
            eosque ut heiulans baiolorum praecentor ad expediendum quod orsi
            sunt incitans vocibus crebris. qui haut longe postea ideo vivus
            exustus est.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login / Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Landing;
