import { object, string } from "yup";

export const initialValues = {
  name: "",
};

export const validationSchema = object({
  name: string()
    .required("Your name is required")
    .min(3, "Name need to be at least 3 characters"),
});
