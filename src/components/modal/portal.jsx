// ModalPortal.jsx
import { createPortal } from "react-dom";

const ModalPortal = ({ children }) => {
  if (typeof window === "undefined") return null;
  const modalRoot = document.getElementById("modal-root");
  return createPortal(children, modalRoot);
};

export default ModalPortal;
