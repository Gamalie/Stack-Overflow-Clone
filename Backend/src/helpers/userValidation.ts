import joi from 'joi'



export const registrationSchema=joi.object({
    Name:joi.string().required().min(5),
    Email:joi.string().email().required(),
    Password:joi.string().pattern(new  RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`))
    .required() as joi.SchemaLike

})