import { TStringArray, TBooleanArray, TUseForm } from './../utils/types';
import { useState } from "react";


export function useForm(props:TUseForm) {
    const { initialValues, disableRules } = props;
    const [values, setFieldValue] = useState<TStringArray>(initialValues);
    const [disableValue, setFieldDisabled] = useState<TBooleanArray>(disableRules);

    return { values, setFieldValue, setFieldDisabled, disableValue };
}
