import React from "react";

function Footer() {
  return (
    <footer className="footer fixed-bottom">
      <div className="container">
        <div className="row mt-1">
          <div className="col col-sm-3 mx-auto mb-2  text-center">
            <h6 className="text-white text-uppercase fw-bold mt-2 mb-2">
              Contact
            </h6>
            <div>
              <a
                className="text-white"
                href="mailto:info@adoptme.webapp.gmail.com"
              >
                adoptme.webapp@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
