import "./styles.scss";
import companyLogo from "../../assets/logo/logo-m3.png";
import shoppingCart from '../../assets/logo/shopping-cart.png'

export default function Header() {
  return (
    <header>
      <img src={companyLogo} alt="logo" />
      <img className="shopping-cart" src={shoppingCart} alt="logo" />
    </header>
  );
}
