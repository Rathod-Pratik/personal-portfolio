import style from "./button.module.css";
import { MdOutlineMessage } from "react-icons/md";

const button = ({ text, icon,outline }) => {
  return (
    <div>
      <button className={outline ? style.btn_outline : style.btn_primary}>
        {icon}
        {text}
      </button>
    </div>
  );
};

export default button;
