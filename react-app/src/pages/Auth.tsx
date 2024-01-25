import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from "react-hook-form";




type SignUpFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};



const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const schema = yup.object({
    firstName: yup.string().email().required("Field required"),
    lastName: yup.string().email().required("Field required"),
    email: yup.string().required("Field required"),
    password: yup.
    string()
    .required("password is required")
    .min(8, "Passowrd must be atleast 8 charchters long"),
    confirmPassword: yup
    .string()
    .required("password is required")
    .min(8, "Passowrd must be atleast 8 charchters long"),
  });
  const {register,handleSubmit,formState: { errors }} = useForm<SignUpFormFields>({resolver: yupResolver(schema)})
  const onSubmit: SubmitHandler<SignUpFormFields> = (data) => {
    console.log(data);
  };
  return (
    <>
      <h1>Auth</h1>
      <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="col-md-4">
          <label htmlFor="validationServer01" className="form-label">First name</label>
          <input
          className="form-control"
            {...register("firstName", {
              required: "First name is required fields",
            })}
            type="text"
            placeholder="First Name"
            name="firstName"
          />
          <div className={ errors.firstName ? 'invalid-feedback': 'valid-feedback'}>
            {errors.firstName? errors.firstName.message : ''}
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServer01" className="form-label">Last Name</label>
          <input
          className="form-control"
            {...register("lastName")}
            type="text"
            placeholder="Last Name"
            name="lastName"
          />
          <div className="valid-feedback">
          {errors.lastName && errors.lastName.message}
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServer01" className="form-label">Email</label>
          <input
          className="form-control"
            {...register("email", {
              required: "Email is required fields",
            })}
            type="text"
            placeholder="Email"
            name="email"
          />
          <div className="valid-feedback">
          {errors.email && errors.email.message}
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServer01" className="form-label">Password</label>
          <input
          className="form-control"
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            placeholder="Password"
            name="password"
          />
          <div className="valid-feedback">{errors.password && errors.password.message}</div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServer01" className="form-label">Confirm Password</label>
          <input
          className="form-control"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
            })}
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
          />
          <div className="valid-feedback">
          {errors.confirmPassword && errors.confirmPassword.message}
          </div>
        </div>

        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </>
  );
};

export default Auth;
