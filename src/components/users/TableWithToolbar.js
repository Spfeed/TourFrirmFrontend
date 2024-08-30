import Toolbar from "../cabinet/Toolbar";
import styles from "./TableWithToolbar.module.css";
import UsersTable from "../UI/UsersTable";

const TableWithToolbar = ({ userId, accessLevel }) => {
  return (
    <div className={styles["flexable"]}>
      <Toolbar userId={userId} accessLevel={accessLevel} />
      <div className={styles["content"]}>
        <UsersTable status={accessLevel} />
      </div>
    </div>
  );
};

export default TableWithToolbar;
