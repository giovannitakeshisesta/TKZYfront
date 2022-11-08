import React from "react";
import CheckBoxInput from "./Forms/Inputs/CheckBoxInput";
import { useForm } from "react-hook-form";
import { allergens } from "../data/allergens";
import MenuDetails from "./MenuDetails";
import TextAreaInput from "./Forms/Inputs/TextAreaInput";
import ModalCard from "./ModalCard";

export default function Modal({
  data,
  setmodal,
  setSelectedAllergens,
  clickSaveMsg,
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      allergens: data.prefilledAllergens,
      message: data.prefillMsg,
    },
  });

  // -------------- FUNCTIONS -------------- //
  const saveAllergens = (formData) => {
    formData.allergens.length > 0
      ? setSelectedAllergens(formData.allergens)
      : setSelectedAllergens([]);
    setmodal(false);
  };

  const saveMsg = (formData) => {
    clickSaveMsg(data.id, formData.message);
    setmodal(false);
  };

  return (
    <div className="modalmain">
      {/* --------------- FILTER ALLERGENS --------------- */}
      {data.name === "allergens" && (
          <ModalCard
            setmodal={setmodal}
            header="Filter"
            body={
              <form
                onSubmit={handleSubmit(saveAllergens)}
                className="modalFilter"
              >
                <CheckBoxInput
                  name="allergens"
                  list={allergens}
                  register={register}
                  classAdditional="allergensCreate"
                />
                <div className="modalBtnDiv">
                  <input className="button-80 modalBtn" type="submit" />
                  <button
                    className="button-80 modalBtn"
                    onClick={() => reset({ allergens: [] })}
                  >
                    clear
                  </button>
                </div>
              </form>
            }
          />
      )}

      {/* --------------- DESCRIPTION --------------- */}
      {data.name === "description" && (
        <ModalCard
          setmodal={setmodal}
          header="Details"
          body={<MenuDetails data={data.info} />}
        />
      )}

      {/* --------------- MESSAGE --------------- */}
      {data.name === "message" && (
        <ModalCard
          setmodal={setmodal}
          header="Add a message"
          body={
            <form className="modalMessage" onSubmit={handleSubmit(saveMsg)}>
              <TextAreaInput
                // label="Message"
                name="message"
                register={register}
                rows="2"
              />
              <div className="modalBtnDiv">
                <input className="button-80 modalBtn" type="submit" />
              </div>
            </form>
          }
        />
      )}
    </div>
  );
}
