import { ToastContainer, Toast } from "react-bootstrap";
import { toastActions } from "../../store/toastSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ToastEvent.module.css";

const ToastEvent = (props) => {
  const dispatch = useDispatch();
  const { showToast, toastTitle, toastMessage } = useSelector(
    (state) => state.toast
  );

  console.log("showToast:", showToast);
  console.log("toastMessage:", toastMessage);
  return (
    <ToastContainer position="bottom-end" className={styles["toast-cont"]}>
      <Toast
        show={showToast}
        onClose={() => dispatch(toastActions.hideToast())}
        delay={4000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">{toastTitle}</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastEvent;
