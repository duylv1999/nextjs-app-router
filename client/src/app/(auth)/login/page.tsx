import LoginForm from "~/app/(auth)/login/login-form";

const Register = () => {
  return (
    <div>
      <h1 className="text-xl text-center font-semibold">Đăng nhập</h1>
      <div className="flex justify-center ">
        <LoginForm />
      </div>
    </div>
  );
};
export default Register;
