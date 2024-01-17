import type { Pojo } from 'objection'


interface StringObject { [key: string]: string }

export const lowerCaseObjectProperty = (obj: StringObject, propertyName: string): Pojo =>
  obj.hasOwnProperty(propertyName) && obj[propertyName]
    ? { ...obj, [propertyName]: obj[propertyName].toLocaleLowerCase() }
    : obj