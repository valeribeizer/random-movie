import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
      <footer>
        <p class="footer-p">Built by Valeryia B. Copyright {currentYear}.</p>
      </footer>
  );
}

export default Footer;
