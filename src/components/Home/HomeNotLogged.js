import React from "react";
import { NavLink } from "react-router-dom";
import "./HomeNotLogged.scss";
// photos
import waiter from "../../assets/h-waiterHome.jpeg";
import allergens from "../../assets/h-allergens.png";
import bill from "../../assets/h-bill.png";
import chef from "../../assets/h-chef.png";
import menu from "../../assets/h-menu.png";
import show from "../../assets/h-show.png";
import table from "../../assets/h-table.png";
import handmockup from "../../assets/h-hand-mockup.png";
import devices from "../../assets/flat-devices-mockup.png";
import ironHack from "../../assets/h-IH_logo.png";
import mern from "../../assets/h-mern.png";

export default function HomeNotLogged() {
  function copyText() {
    navigator.clipboard.writeText("userTest@ticketeazy.com");
  }

  return (
    <div className="landingPage">
      {/*--------------- NAVBAR --------------- */}
      <nav
        className="navbar navbar-dark  navbar-expand-md"
        style={{ backgroundColor: "black" }}
      >
        <div className="container-fluid">
          <p className="navbar-brand me-5">TicketEazy</p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link" href="#what">
                What
              </a>
              <a className="nav-link" href="#how">
                How
              </a>
              <a className="nav-link" href="#video">
                Video
              </a>
              <a className="nav-link" href="#login">
                Login
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/*--------------- HEADER --------------- */}
        <header style={{ backgroundImage: `url(${waiter})` }}>
          <h1>
            <span>TICKETEAZY</span>
            <span>MY</span>
            <span>FRIEND</span>
          </h1>
        </header>

        {/*--------------- SECTION 1 INTRO --------------- */}
        <section id="intro">
          <div className="quotes">
            <div className="quotesInner">
              <i className="fas fa-quote-left fa2"></i>
              <div className="text">
                <i className="fas fa-quote-right fa1"></i>
                <div>
                  <p>Do you want to pay a waiter a sh!t </p>
                  <p>BUT</p>
                  <p>at same time</p>
                  <p>GET THE JOB DONE ?</p>
                </div>
              </div>
            </div>
          </div>

          <div className="loopdiv ">
            <ul className="loop">
              <li>SOLUTION</li>
              <li>THE</li>
              <li>IS</li>
              <li>TICKETEAZY</li>
            </ul>
          </div>
          <img src={devices} alt="devices mockup" />
        </section>

        {/*--------------- SECTION 2 WHAT --------------- */}
        <section id="what">
          <div className="sectionTitle">
            <p>What is TicketEazy?</p>
          </div>

          <div className="whatBody sectionBody">
            <div className="whatBodyTitle">
              <p>All you need is in your hand!</p>
            </div>

            <div className="row frcc mb-4">
              <img
                src={handmockup}
                alt=""
                className="handImg col-sm-12 col-md-4"
              />

              <div className=" col-sm-12 col-md-8 colText">
                <p>
                  Is a web application designed to help waiters and kitchen
                  staff take and modify orders quickly and efficiently by
                  tapping on chosen items on their smartphone device.
                </p>
                <img src={ironHack} alt="ironhack logo" className="ironHack" />
                <p>
                  TicketEazy is my final project of the Ironhack Web Dev
                  bootcamp.
                </p>
                <img src={mern} alt="mern logos" className="mern" />

                <p>Is a MERN full stack application.</p>
              </div>
            </div>
          </div>
        </section>

        {/*--------------- SECTION 3 HOW --------------- */}
        <section id="how">
          <div className="sectionTitle">
            <p>What can I do with it?</p>
          </div>

          <div className="howBody sectionBody">
            <p>
              The purpose of the application is to accelerate guest service as
              well as personnel work.
            </p>
            <p>
              By using the application you will make work easier for your staff
              and increase the income of the entire facility while guests will
              be satisfied with a quick and quality service.
            </p>

            <div className="row">
              <div className="feature col-md-6 col-lg-4">
                <img src={menu} alt="menu icon" className="featureImg" />
                <p className="featureTitle">Create a menu</p>
                <p>
                  Build your digital menu, filling a simple form add all the
                  most important informations of every item, as course,
                  description, price, photos, allergens...
                </p>
              </div>

              <div className="feature col-md-6 col-lg-4">
                <img src={show} alt="show icon" className="featureImg" />
                <p className="featureTitle">Upsell</p>
                <p>
                  The application gives waiters quick access to the informations
                  of every menu item, so that they can provide guests a better
                  experience showing ingredients, photos, description and so on.
                </p>
              </div>
              <div className="feature col-md-6 col-lg-4">
                <img
                  src={allergens}
                  alt="allergens icon"
                  className="featureImg"
                />
                <p className="featureTitle">Allergens</p>
                <p>
                  Give a fast and detailed answer to the customers filtering the
                  menu by allergens or by products recomended for vegan ,
                  vegetarian ...
                </p>
              </div>
              <div className="feature col-md-6 col-lg-4">
                <img src={table} alt="table icon" className="featureImg" />
                <p className="featureTitle">Get Orders</p>
                <p>
                  Easily get orders , adding messages, indicating the flow of
                  the dishes.
                </p>
                <p>
                  Check the tables status, which dishes are served or which are
                  waiting.
                </p>
                <p>
                  Send the order to the kitchen directly from the dining room,
                  saving time and steps.
                </p>
              </div>
              <div className="feature col-md-6 col-lg-4">
                <img src={chef} alt="chef icon" className="featureImg" />
                <p className="featureTitle">Kitchen management</p>
                <p>
                  The kitchen staff can manage the execution and timing of the
                  orders by moving them across the 4 order holders and crossing
                  all the items already served.
                </p>
              </div>
              <div className="feature col-md-6 col-lg-4">
                <img src={bill} alt="bill icon" className="featureImg" />
                <p className="featureTitle">Payment</p>
                <p>
                  Doesnt matter how many orders the table has done, get a single
                  bill and boost customer satisfaction allowing them to split
                  the bill and pay individually.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/*--------------- SECTION 4 VIDEO --------------- */}
        <section id="video">
          <div className="sectionTitle">
            <p>Tutorial</p>
          </div>
          <div className="videoBody sectionBody">
            <p>Check all the functions in the video!!</p>
            <iframe
              src="https://www.youtube.com/embed/rk6RpebrHws"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/*--------------- SECTION 5 LOGIN --------------- */}
        <section id="login">
          <div className="sectionTitle">
            <p>Login</p>
          </div>

          <div className="sectionBody">
            <p className=" mb-3">
              The app is deployed on a free platform, so please be patient the
              login will take a while!
            </p>

            <div className="row mt3">
              <div className="col-md-8 credentials">
                <p>
                  To skip the registration you can use the following
                  credentials:
                </p>
                <span className="frc mt-1">
                  <p>
                    <b>Email</b>: userTest@ticketeazy.com
                  </p>
                  <i
                    className="fa-regular fa-copy copyBtn"
                    onClick={() => copyText()}
                  ></i>
                </span>
                <p>
                  <b>Password</b>: 123123123{" "}
                </p>
              </div>

              <div className="col-md-4 frcc">
                <NavLink to="/login" className="button-80 ">
                  Login
                </NavLink>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/*--------------- FOOTER --------------- */}
      <footer>
        <a
          href="https://github.com/giovannitakeshisesta"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-github homeIcons" />
        </a>
        <a
          href="https://www.linkedin.com/in/giovanni-takeshi-sesta/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-linkedin homeIcons" />
        </a>
      </footer>
    </div>
  );
}
