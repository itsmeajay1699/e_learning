import { memo } from "react";
import Logo from "../../public/images/login_img.png";

const Loading = ({ text = <></> }) => {
  return (
    <div className="loader">
      <Logo />
      <p className="loader_text">{text}</p>
    </div>
  );
};

const NamedLoading = memo(Loading);
export default NamedLoading;
