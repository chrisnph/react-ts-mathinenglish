import { useFormik } from "formik";
import type { FormikHelpers, FormikValues } from "formik";
import type { ObjectSchema } from "yup";

const useForm = <T extends FormikValues>(
  initialValues: T,
  validationSchema: ObjectSchema<T>,
  onSubmit: (values: T, actions: FormikHelpers<T>) => void
) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const resetForm = () => {
    formik.resetForm();
  };

  return {
    handleChange: formik.handleChange,
    handleSubmit: formik.handleSubmit,
    values: formik.values,
    errors: formik.errors,
    touched: formik.touched,
    resetForm,
  };
};

export default useForm;
