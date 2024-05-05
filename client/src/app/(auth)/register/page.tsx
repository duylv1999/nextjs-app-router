import RegisterForm from "~/app/(auth)/register/register-form";

const Register = () => {
  return (
    <div>
      <h1 className="text-xl text-center font-semibold">Đăng ký</h1>
      <div className="flex justify-center ">
        <RegisterForm />
      </div>
    </div>
  );
};
export default Register;
