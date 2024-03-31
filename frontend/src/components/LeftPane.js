import React from "react";
import "./../styles/leftpane.css";

const LeftPane = () => {
    return (
<header>
  <nav id="sidebarMenu" class="collapse d-lg-block collapse">
    <div class="position-sticky">
      <div class="list-group list-group-flush mx-3 mt-4">
        <a
          href="#"
          class="list-group-item"
          aria-current="true">
          <i class="fas fa-tachometer-alt fa-fw me-3"></i><span>Auction Items</span>
        </a>
        <a href="#" class="list-group-item">
          <i class="fas fa-chart-area fa-fw me-3"></i><span>Upcoming Events</span>
        </a>
        <a href="#" class="list-group-item"
          ><i class="fas fa-lock fa-fw me-3"></i><span>Services</span></a>
      </div>
    </div>
  </nav>
</header>

    );
}

export default LeftPane;