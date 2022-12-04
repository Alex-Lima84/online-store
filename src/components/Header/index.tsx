import "./styles.scss";
import companyLogo from "../../assets/logo/logo-m3.png";

export default function Header() {
  return (
    <header>
      <img src={companyLogo} alt="logo" />
      <p>carrinho de compras</p>
    </header>
  );
}
