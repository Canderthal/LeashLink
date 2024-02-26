
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items);
    const cartAmount = cartItems.length;
    return (
      <div className="cart">
        <FontAwesomeIcon icon={faCartShopping} size="lg" style={{ color: "#f7f9fd" }} />
        <span className="cart-amount">{cartAmount}</span>
      </div>
    );
};

export default Cart;