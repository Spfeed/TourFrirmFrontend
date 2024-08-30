import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./DropdownNav.module.css";
import { NavLink } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const DropdownNav = (props) => {
  const { listTitle, items, country } = props;
  const history = useHistory();

  const handleClick = (item) => {
    const route = country ? `/country/${item}` : `/city/${item}`;
    history.push(route);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        id="dropdown-basic"
        className={styles["custom-dropdown-toggle"]}
      >
        {listTitle}
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles["custom-dropdown-menu"]}>
        {items.map((item, index) => (
          <Dropdown.Item
            key={index}
            className={styles["custom-dropdown-item"]}
            onClick={() => handleClick(item)}
          >
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownNav;
