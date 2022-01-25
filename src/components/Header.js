import { useEffect, useRef, useState } from "react";
import logo from "../logo.svg";
import Modal from "./Modal";

export default function Header({
  inputVal,
  setInputVal,
  storageData,
  setStorageData,
}) {
  const inputPlaceholder = "25 milyondan fazla ürün içerisinde ara";
  const basketRef = useRef(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [activeClass, setActiveClass] = useState("");
  const [selectedProduct, setSelectedProduct] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = (item) => {
    const basket = storageData.filter((elem) => elem.id !== item.id);
    setStorageData(basket);
    localStorage.setItem("basket", JSON.stringify(basket));
  };

  const onSubmit = () => {
    if (selectedProduct) handleDelete(selectedProduct);
    setModalVisible(false);
    setSelectedProduct();
    document.body.style.overflow = "auto";
  };

  const onCancel = () => {
    setModalVisible(false);
    setSelectedProduct();
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (basketRef.current && !basketRef.current.contains(event.target)) {
        setPopupVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [basketRef]);

  useEffect(() => {
    if (popupVisible) setActiveClass(" active");
    else setActiveClass("");
  }, [popupVisible]);

  return (
    <div className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <input
        className="header__input"
        placeholder={inputPlaceholder}
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <div ref={basketRef} className="header__basket">
        <button
          onClick={() => setPopupVisible(!popupVisible)}
          className={`header__basket__button${activeClass}`}
        >
          Sepetim
        </button>
        <span className="header__basket__count">
          {storageData?.length || "0"}
        </span>
        {popupVisible && (
          <div>
            <div className="header__basket__line"></div>
            <div className={`header__basket__popup${activeClass}`}>
              {storageData?.map((item) => (
                <div className="header__basket__popup__item">
                  <img
                    src="https://media.istockphoto.com/vectors/smart-phone-realistic-mobile-phone-smartphone-with-blank-screen-on-vector-id834343646"
                    alt="telefon"
                  />
                  <div className="right-side">
                    <p className="name">
                      {item.name}
                      <p>{item.color}</p>
                    </p>
                    <button
                      onClick={() => {
                        setSelectedProduct(item);
                        setModalVisible(true);
                        document.body.style.overflow = "hidden";
                      }}
                      className="delete"
                    >
                      Kaldır
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {modalVisible && <Modal onSubmit={onSubmit} onCancel={onCancel} />}
    </div>
  );
}
