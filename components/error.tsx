const ErrorPage = ({ title }: { title: string }) => {
  return (
    <div className="h-full w-full flex  justify-center items-center">
      <h1 className=" rounded-md text-black bg-rose-400 p-2">{title}</h1>
    </div>
  );
};

export default ErrorPage;
