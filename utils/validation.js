import { useState } from "react";

export default function useValidation(params) {
  // const [isRender, setIsRender] = useState(isReactivityValdiation);
  const defaultState = { ...params };
  const [value, setValue] = useState(params);
  const [validationResponse, setValidationResponse] = useState(() => {
    const { errorFields, error } = _getFields(params, true);
    return { error, validation: errorFields };
  });

  function getDefafultConfig() {
    setValue(defaultState);
    setValidationResponse(() => {
      const { errorFields, error } = _getFields(defaultState, true);
      return { error, validation: errorFields };
    });
  }

  function onChangeHandler(event, name) {
    if (typeof event !== "string") event.preventDefault();
    setValue((prev) => ({
      ...prev,
      [name || event?.target?.name]: {
        ...prev[name || event?.target?.name],
        value: event?.target?.value || event,
      },
    }));
  }

  function startValidation(customFunc) {
    const { errorFields, error } = _getFields(value);
    setValidationResponse((pr) => ({
      ...pr,
      error,
      validation: errorFields.sort((a, b) => a.id > b.id),
    }));
    return customFunc(errorFields, error);
  }

  function maxLengthValidation(field) {
    const v = Number(field?.value);
    if (field?.maxLength < v) {
      field = { ...field, errors: `${field.errors.maxLength}` };
      return field;
    }
    field = { ...field, errors: "" };
    return field;
  }

  function minLengthValidation(field) {
    const v = Number(field?.value);
    if (field?.minLength > v) {
      field = {
        ...field,
        errors: `${field?.errors?.minLength}`,
      };
      return field;
    }
    field = { ...field, errors: "" };
    return field;
  }

  function _checkFields(field, isFirstRender) {
    if (field?.type === "number") {
      const isNotNumber = isNaN(Number(field.value));
      if (isNotNumber) {
        field = { ...field, errors: field.errors.isNumber };
        return field;
      }
      if (field.value && maxLengthValidation(field).errors) {
        return maxLengthValidation(field);
      }
      if (field.value && minLengthValidation(field).errors) {
        return minLengthValidation(field);
      }
      if (field.integer) {
        if (!field.value || field.value % 1 === 0) {
          field = { ...field, errors: "" };
          return field;
        }
        return (field = {
          ...field,
          errors: `"${field?.value}" ${field?.errors?.integer}`,
        });
      }
    }

    if (!field?.value && !isFirstRender && field.required) {
      field = { ...field, errors: field.errors.value };
      return field;
    }
    if (field?.regexp && field?.value !== null) {
      field = {
        ...field,
        errors: field.regexp.test(field.value) ? "" : field?.errors?.regexp,
      };
      return field;
    }
    if (maxLengthValidation(field).errors) {
      return maxLengthValidation(field);
    }
    if (minLengthValidation(field).errors) {
      return minLengthValidation(field);
    }
    field = { ...field, errors: "" };
    return field;
  }

  function _getFields(params, isFirstRender) {
    let error = false;
    const fields = Object.values(params);
    const errorFields = fields.map((field) => {
      if (_checkFields(field, isFirstRender).errors) {
        error = true;
        return _checkFields(field, isFirstRender);
      }
      return _checkFields(field, isFirstRender);
    });
    return { errorFields, error };
  }
  return [
    ...validationResponse.validation,
    value,
    onChangeHandler,
    startValidation,
    getDefafultConfig,
  ];
}
