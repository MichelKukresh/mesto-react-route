import PopupWithForm from "./PopupWithForm";

function EditCourseDeletePopup(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleCardDelete(props.cardDelete);    
  };

  const isFormIsValid = "popup__save_valid";
  const isDisableStatus = false;

  return (
    <PopupWithForm
    isDisableStatus={isDisableStatus}
      isFormIsValid={isFormIsValid}
      onSubmit={handleSubmit}
      name="sure-del"
      title="Вы уверены ?"
      buttonText={props.buttonInfomationDelete}
      isOpen={props.isOpen}
      closeAllPopups={props.closeAllPopups}
    ></PopupWithForm>
  );
}

export default EditCourseDeletePopup;
