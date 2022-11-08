import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { create1, findByIdAndUpdateMenu } from "../services/MenuService";
import InputGroup from "./Forms/Inputs/InputGroup";
import RadioInput from "./Forms/Inputs/RadioInput";
import TextAreaInput from "./Forms/Inputs/TextAreaInput";
import CheckBoxInput from "./Forms/Inputs/CheckBoxInput";
import BackBtn from "./buttons/BackBtn";
import {allergens} from '../data/allergens';

// --------------------  YUP validations  --------------------
const getSchema = (prefillValues) => {
  return yup
    .object()
    .shape({
      type: yup.string().typeError("Required").required(""),
      name: yup.string().required("Required"),
      price: yup.number().required().typeError("Required").min(1),
      description: yup.string().required("Required").min(2),
      allergens: yup.array().typeError("Required").min(1, "min 1 required."),
      course: yup.string().typeError("Required").required(""),
      image: yup.lazy((value) => {
        if (!prefillValues?.image || prefillValues?.image !== value) {
          return yup
            .mixed()
            .test("required", "Required", (value) => {
              return value && value.length;
            })
            .test("fileSize", "The file is too large", (value) => {
              return value && value[0] && value[0].size <= 5000000;
            })
            .test("type", "We only support jpeg & png", function (value) {
              return (
                (value && value[0] && value[0]?.type === "image/jpeg") ||
                value[0]?.type === "image/png"
              );
            });
        } else {
          return yup.mixed();
        }
      }),
    })
    .required();
};

// --------------------  Component --------------------
export default function MenuForm({
  prefillValues,
  toggleComponent,
  openDetails,
}) {
  const resolver = getSchema(prefillValues);
  const [backErrors, setBackErrors] = useState(false);
  const [duplicateErr, setDuplicateErr] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resolver),
    defaultValues: prefillValues,
  });
  const showCourses = watch("type");

  const setBackEndErrors = (err) => {
    if (err.response.data.errors) {
      return setBackErrors(err?.response?.data.errors);
    }
    if (err.response.data.message?.includes("Duplicate")) {
      return setDuplicateErr(err.response.data.message);
    }
    if (err.response.data.message.includes("Image")) {
      return setBackErrors({ image: err.response.data.message });
    }
  };

// --------------------  Create item  --------------------
  const create = (data) => {
    setBackErrors({});
    setDuplicateErr("");

    const bodyFormData = new FormData();
    const { image, allergens, ...rest } = data;

    allergens.forEach((allergen) =>
      bodyFormData.append("allergens[]", allergen)
    );

    Object.keys(rest).forEach((key) => {
      bodyFormData.append(key, rest[key]);
    });
    if (image[0]) {
      bodyFormData.append("image", image[0]);
    }

    create1(bodyFormData)
      .then((response) => {
        reset();
        openDetails(response);
      })
      .catch((err) => {
        console.log(">>>>", err.response.data.errors);
        setBackEndErrors(err);
      });
  };

  // --------------------  Edit item  --------------------
  const edit = (data) => {
    const bodyFormData = new FormData();
    const { image, allergens, _id, ...rest } = data;

    allergens.forEach((allergen) => {
      bodyFormData.append("allergens[]", allergen);
    });

    Object.keys(rest).forEach((key) => {
      bodyFormData.append(key, rest[key]);
    });
    if (!image[0].length) {
      bodyFormData.append("image", image[0]);
    }
    findByIdAndUpdateMenu(_id, bodyFormData)
      .then((response) => openDetails(response))
      .catch((err) => setBackEndErrors(err));
  };

  // --------------------  JSX  --------------------
  return (
    <div className="menuFormMain">
      <div className="center">
        <h3>Create a new item</h3>
      </div>

      <div className="topRightPosition2" >
        <BackBtn func={() => toggleComponent()} />
      </div>

      <form className="menuForm">
        {/* TYPE */}
        <RadioInput
          label="Type"
          name="type"
          list={["Food", "Drink"]}
          register={register}
          errors={backErrors?.type || errors.type?.message}
          classAdditional="frcb"
          disabled={prefillValues ? "disabled" : ""}
        />

        {/* COURSE */}
        {showCourses && showCourses === "Food" && (
          <RadioInput
            label="Course"
            name="course"
            list={["Starters", "main_courses", "Desserts"]}
            register={register}
            errors={backErrors?.course || errors.course?.message}
            classAdditional="frcb"
          />
        )}

        {showCourses && showCourses === "Drink" && (
          <RadioInput
            label="Course"
            name="course"
            list={["Drinks"]}
            register={register}
            errors={backErrors?.course || errors.course?.message}
            classAdditional="hidden"
            checked
          />
        )}

        <div className="frcb">
          {/* NAME */}
          <InputGroup
            label="Name"
            id="name"
            type="text"
            register={register}
            error={backErrors?.name || errors.name?.message}
            duplicateErr={duplicateErr}
            classWidth="nameInput"
          />

          {/* PRICE */}
          <InputGroup
            label="Price"
            id="price"
            type="number"
            register={register}
            error={backErrors?.price || errors.price?.message}
            classWidth="priceInput"
          />
        </div>

        {/* DESCRIPTION */}
        <TextAreaInput
          label="Description"
          name="description"
          register={register}
          error={backErrors?.description || errors.description?.message}
          rows="2"
        />

        {/* ALLERGENS */}
        <CheckBoxInput
          label="Allergens / Not reccomended to"
          name="allergens"
          list={allergens}
          register={register}
          errors={backErrors?.allergens || errors.allergens?.message}
          classAdditional="allergensCreate"
        />

        {/* IMAGE */}
        <InputGroup
          label="Image"
          id="image"
          type="file"
          register={register}
          error={backErrors?.image || errors.image?.message}
        />

        <div className="frcc">
          {prefillValues ? (
            <button className="button-80 menuFormBtn" onClick={handleSubmit(edit)}>
              Edit
            </button>
          ) : (
            <button className="button-80 menuFormBtn" onClick={handleSubmit(create)}>
              Create
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
