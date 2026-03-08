import Joi from "joi";

let studentQuerySchema = Joi.object({
  subject: Joi.string().alphanum().min(3).max(20),
  dedmark: Joi.number().integer().min(0).max(100).required().messages({
    "number.base": `dedmarkni qiymati son bo'lishi kerak`,
    "number.empty": `dedmarkni qiymati  bo'sh  bo'lmasligi kerak`,
    "number.min": `dedmark  {#limit} dan katta bo'lsin`,
    "number.max": `dedmark  {#limit} dan kichik bo'lsin`,
    "any.required": `dedmark kiritish majburiy`,
  }),
});
export { studentQuerySchema };
