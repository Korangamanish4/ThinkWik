import * as yup from "yup";

export const FormValidation = yup.object().shape({
    id: yup.string().required("ID REQUIRED"),
    code: yup.string().required("CODE REQUIRED"),
    name: yup.string().required("NAME REQUIRED"),
    description: yup.string().required("DESCRIPTION REQUIRED"),
    price: yup.string().required("PRICE REQUIRED"),
    category: yup.string().required("CATEGORY REQUIRED"),
    quantity: yup.string().required("QUANTITY REQUIRED"),
    inventoryStatus: yup.string().required("INVENTORY STATUS REQUIRED"),
    rating: yup.string().required("RATING REQUIRED"),
  });