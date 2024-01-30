import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

const Signup = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col gap-1 justify-center">
        <div className="rounded-lg flex flex-col gap-2 bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox  placeholder={"Enter FirstName"} label={"First Name"} 
            onChange={(e)=>{
              setFirstName(e.target.value)
            }}
          />
          <InputBox placeholder="Enter LastName" label={"Last Name"} />
          <InputBox placeholder="kushagram63@gmail.com" label={"Email"} />
          <InputBox placeholder="123456" label={"Password"} />
          <div className="pt-4">
            <Button label={"Sign up"} />
          </div>
          <BottomWarning
            label={"Already have an account"}
            buttonText={"Sign in"}
            to={"/login"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
