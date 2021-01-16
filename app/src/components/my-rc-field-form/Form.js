import React from "react";
import FieldContext from "./FieldContext";
import useForm from "./useForm";

export default function Form({form,children, onFinish, onFinishFailed}) {
  // const [formInstance] = useForm(form);
  form.setCallback({
    onFinish,
    onFinishFailed
  });
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        form.submit();
      }}>
      <FieldContext.Provider value={form}>
        {children}
      </FieldContext.Provider>
    </form>
  );
}
