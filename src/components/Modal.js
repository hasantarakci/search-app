export default function Modal({ onSubmit, onCancel }) {
  return (
    <div className="modal">
      <div className="modal__body">
        <h5 className="modal__header">
          Ürünü silmek istediğinize emin misiniz?
        </h5>
        <hr />
        <div className="modal__content">
          <p className="modal__text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentiall....
          </p>
          <div className="modal__bottom">
            <button onClick={onSubmit}>EVET</button>
            <button onClick={onCancel}>HAYIR</button>
          </div>
        </div>
      </div>
    </div>
  );
}
