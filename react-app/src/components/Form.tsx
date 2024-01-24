import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup'
type FormFields = {
    email: string;
    password: string;
};

const Form = () => {
    const schema = yup.object({
        email: yup.string().email().required("username is required"),
        password: yup
            .string()
            .required("password is required")
            .min(8, "Passowrd must be atleast 8 charchters long"),
    });
    const {register, handleSubmit, formState: { errors }} = useForm<FormFields>({resolver: yupResolver(schema)});
    const onSubmit: SubmitHandler<FormFields> = (data) => {
        console.log(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("email", {
                        required: "Email is required fields",
                    })}
                    type="text"
                    placeholder="Email"
                    name="email"
                />
                {errors.email && errors.email.message}
                <input
                    {...register("password", {
                        required: "Password is required",
                    })}
                    type="password"
                    placeholder="Password"
                    name="password"
                />
                {errors.password && errors.password.message}
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default Form;
