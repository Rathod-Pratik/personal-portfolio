import style from "./ContectForm.module.css";
import Button from "../button/button";
import { MdOutlineMessage } from "react-icons/md";
import { MdCall } from "react-icons/md";
import { MdMail } from "react-icons/md";
const ContectForm = () => {
  return (
    <section className={style.container}>
      <div className={style.contect_form}>
        <div className={style.btn}>
          <Button
            text="VIA SUPPORT CHAT"
            icon={<MdOutlineMessage fontSize="22" />}
          />
          <Button text="VIA CALL" icon={<MdCall fontSize="22" />} />
        </div>
        <Button
          outline={true}
          text="VIA EMAIL FORM"
          icon={<MdMail fontSize="22" />}
        />
        <div className={style.input_contect}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" />
        </div>
        <div className={style.input_contect}>
          <label htmlFor="email">E-mail</label>
          <input type="email" name="email" />
        </div>
        <div className={style.input_contect}>
          <label htmlFor="text">TEXT</label>
          <textarea name="text" rows={8} />
        </div>
        <div
          style={{
            justifyContent: 'end',
            display: 'flex',
            margin: `0 14px`,
          }}
        >
          <Button text="SUBMIT" />
        </div>
      </div>
      <div className={style.contect_img}>
        <img src="./Image/Contect.svg" alt="" />
      </div>
    </section>
  );
};

export default ContectForm;
