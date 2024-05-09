import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/thron";

const Throny = () => {
  const { isLoading, isSuccess, isError, data, refetch } = useQuery({
    queryKey: ["allProduct"],
    queryFn: getProduct,
  });
  if (isLoading || isError) {
    return (
      <>
        <div>LOADING...</div>
      </>
    );
  }
  return (
    <>
      <div className="grid grid-cols-4 space-x-3 space-y-2">
        {data &&
          data.map((result: any) => (
            <>
              <div className="shadow-xl transition ease-in-out hover:-translate-y-1 hover:scale-110 bg-white p-5 w-36">
                <img src={result.image_url} className="h-36" />
                <div>{result.product_name}</div>
                <div>{result.description}</div>
              </div>
            </>
          ))}
      </div>
    </>
  );
};

export default Throny;
