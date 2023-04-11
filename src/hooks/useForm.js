import React, { useState } from 'react'
import { deepClone, isObjEmpty } from '../utils/object-utils';

function useForm({init, validate}) {

    const [state, setState] = useState(mapValuesToState(init));

    const handleChange = (e)=>{
        const {name: key,value, type} = e.target;

        const oldState = deepClone(state);
        if(type === 'checkbox'){
            oldState[key].value = 'checked'
        } else{
            oldState[key].value = value;
        }

        const { errors }= getErrors();
        if(oldState[key].touched && errors[key]){
            oldState[key].error = errors[key];
        } else{
            oldState[key].error = '';
        }
        setState(oldState);
    }

    const handleFocus = (e)=>{
        const {name} =  e.target;

        const oldState = deepClone(state);
        oldState[name].focused = true;
        if(oldState[name].touched){
            oldState[name].touched = true;
        }
        setState(oldState);
    }
    const handleBlur = (e)=>{
        const key = e.target.name;

        const {errors} = getErrors();
        const oldState = deepClone(state);
        if(oldState[key].touched  && errors[key]){
            oldState[key].error = errors[key];
        } else {
            oldState[key].error = ' ';
        }

        oldState[key].focused = false;
        setState(oldState);
    }
    const handleSubmit = (e, cb)=>{
        e.preventDefault();
        const {errors,hasError,values} = getErrors();

        cb({
            hasError,
            errors,
            values,
            touched: mapStateToKeys(state, 'touched'),
            focused: mapStateToKeys(state, 'focused'),
        });
    };
    const clear =()=>{
        const newState = mapValuesToState(init, true);
        setState(newState);
    }
    const getErrors = ()=>{
        let hasError = null,
        errors = null;

        const values = mapStateToKeys(state, 'value')
        if(typeof validate === 'boolean'){
            hasError = validate;
            errors = mapStateToKeys(state, 'errors');
        } else if(typeof validate === 'function'){
            const errorsFormCb = validate(values);
            hasError = !isObjEmpty(errorsFormCb);
            errors = errorsFormCb;
        } else {
            throw new Error('validate property must be bo0len or function');

        }
        return {
            hasError,
            errors,
            values,
        };
    };
  return {
    formState: state,
    handleChange,
    handleBlur,
    handleSubmit,
    handleFocus,
    clear
  };
};

export default useForm

// helper Function 
const mapValuesToState = (values, shouldClear = false) => {
	return Object.keys(values).reduce((acc, key) => {
		acc[key] = {
			value: shouldClear ? '' : values[key],
			error: '',
			focused: false,
			touched: false,
		};
		return acc;
	}, {});
};

const mapStateToKeys = (state, key) => {
	return Object.keys(state).reduce((acc, cur) => {
		acc[cur] = state[cur][key];
		return acc;
	}, {});
};
