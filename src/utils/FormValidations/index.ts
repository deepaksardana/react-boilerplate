export const maxLength = (max: number) => (value: any) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength = (min: number) => (value: any) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const patternMatch = (pattren: any, message: string) => (value: string) =>
value && !pattren.test(value) ?
message : undefined;

export const required = (value: string) => value === undefined || value.length === 0;

export const requiredWithMessage = (message?: string) => (value: string) =>
!!!value || value.length === 0  ?
message ? message : "Required" : undefined;

export const numberOnly = (value: any) => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

export const minValue = (min: number) => (value: any) =>
  value && Number(value) < min ? `Must be at least ${min}` : undefined;
  
export const maxValue = (max: number, message?: string) => (value: any) =>
  value && Number(value) > max ? message ? message : `Must be less than ${max}` : undefined;

export const emailValidation = (value: any) => 
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

