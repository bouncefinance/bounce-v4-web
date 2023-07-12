import { StringSchema, ObjectSchema } from 'yup'
declare module 'yup' {
  interface StringSchema {
    append(val: string): StringSchema
    text(): StringSchema
  }
  interface ObjectSchema<TShape, TContext, TIn, TOut> {
    hasInput(): this
  }
}

StringSchema.prototype.append = function (val: string) {
  console.log(val)

  return this.transform(val => val)
}
StringSchema.prototype.text = function () {
  console.log('StringSchemaStringSchema')

  return this
}
ObjectSchema.prototype.hasInput = function () {
  console.log('this this')

  console.log(this.fields)
  this.transform(val => {
    console.log('transform')

    console.log(val)
  })
  return this
}
