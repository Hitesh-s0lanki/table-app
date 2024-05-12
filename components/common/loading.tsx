import { ImSpinner2 } from "react-icons/im";
const Loading = () => {
  return (
    <div className="h-full flex items-center justify-center w-full">
      <ImSpinner2 className="animate-spin h-12 w-12" />
    </div>
  );
};

export default Loading;
