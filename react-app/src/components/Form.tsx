import { SubmitHandler, useForm } from "react-hook-form";

type FormFields = {
  email: string;
  password: string;
};

const Form = () => {
  const { register, handleSubmit, formState: {errors} } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", {
            required: "Email is required fields"
          })}
          type="text"
          placeholder="Email"
          name="email"
        />
        {errors.email && errors.email.message}
        <input
          {...register("password",{
            required: "Password is required"
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
