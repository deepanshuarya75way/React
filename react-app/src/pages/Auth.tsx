import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRegisterUserMutation } from "../services/AuthApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



type SignUpFormFields = {
  username: string
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};



const initialState = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(initialState);
  const {username, firstName, lastName, email, password, confirmPassword} = formValues


  const [registerUser, { data: registerData, isSuccess: isRegisterSuccess, isError: isRegisterError, error: registerError }] = useRegisterUserMutation()


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }
  
  useEffect(() => {
    if (isRegisterSuccess) {
      toast.success("Registered Successfuly")
      navigate('/auth/login')
    }

  }, [isRegisterSuccess, isRegisterError])

  const schema = yup.object({
    username: yup.string().min(1, "username cant be empty").required(),
    firstName: yup.string().min(1, "First name can't be empty").required("Field required"),
    lastName: yup.string().min(1, "Last name can't be empty").required("Field required"),
    email: yup.string().email("enter valid email").min(1, "email can't be empty").required("Field required"),
    password: yup.
      string()
      .required("password is required")
      .min(8, "Passowrd must be atleast 8 charchters long"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .min(8, "Passowrd must be atleast 8 charchters long"),
  });
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormFields>({ resolver: yupResolver(schema) })
  const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
    console.log(data);
    if(username && firstName && lastName && email && password && confirmPassword){
      await registerUser({username, firstName, lastName, email, password, confirmPassword})
    }
    
  };
  return (
    <>
      <h1>Auth</h1>
      <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>

      <div className="col-md-4">
          <label htmlFor="validationServer01" className="form-label">Username</label>
          <input
            className={errors.username ? 'form-control is-invalid' : 'form-control'}
            {...register("username", {
              required: "username is required fields",
            })}
            type="text"
            placeholder="First Name"
            name="username"
            onChange={handleChange}
          />
          <div className={errors.username ? 'invalid-feedback' : 'valid-feedback'}>
            {errors.username ? errors.username.message : ''}
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServer01" className="form-label">First name</label>
          <input
            className={errors.firstName ? 'form-control is-invalid' : 'form-control'}
            {...register("firstName", {
              required: "First name is required fields",
            })}
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
          />
          <div className={errors.firstName ? 'invalid-feedback' : 'valid-feedback'}>
            {errors.firstName ? errors.firstName.message : ''}
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServer01" className="form-label">Last Name</label>
          <input
            className={errors.lastName ? 'form-control is-invalid' : 'form-control'}
            {...register("lastName")}
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
          />
          <div className={errors.lastName ? 'invalid-feedback' : 'valid-feedback'}>
            {errors.lastName ? errors.lastName.message : ''}
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServer01" className="form-label">Email</label>
          <input
            className={errors.email ? 'form-control is-invalid' : 'form-control'}
            {...register("email", {
              required: "Email is required fields",
            })}
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <div className={errors.email ? 'invalid-feedback' : 'valid-feedback'}>
            {errors.email ? errors.email.message : ''}
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServer01" className="form-label">Password</label>
          <input
            className={errors.password ? 'form-control is-invalid' : 'form-control'}
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <div className={errors.password ? 'invalid-feedback' : 'valid-feedback'}>
            {errors.password ? errors.password.message : ''}
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServer01" className="form-label">Confirm Password</label>
          <input
            className={errors.confirmPassword ? 'form-control is-invalid' : 'form-control'}
            {...register("confirmPassword", {
              required: "Confirm Password is required",
            })}
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
          />
          <div className={errors.confirmPassword ? 'invalid-feedback' : 'valid-feedback'}>
            {errors.confirmPassword ? errors.confirmPassword.message : ''}
          </div>
        </div>

        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </>
  );
};

export default Auth;
