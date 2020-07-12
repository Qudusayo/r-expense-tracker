import React from "react";
import './header.css'
function Header() {
  return (
    <React.Fragment>
      <h1 className="title">EXPENSE TRACKER</h1>
      <p className="abt">
        <q>
          This expense tracker helps you track your expenses for as long as you
          wish. Whenever you wish to start tracking afresh (This can be after a
          week or a month or any period of time), click on the clear records
          button to clear everything. Click on the 'Export as CSV button to
          export the records as a .csv file'
        </q>
        <small> -- Manaswini</small>
      </p>
    </React.Fragment>
  );
}

export default Header;
