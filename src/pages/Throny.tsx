import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/thron";

const Throny = () => {
  const { isLoading, isSuccess, isError, data, refetch } = useQuery({
    queryKey: ["allProduct"],
    queryFn: getProduct,
  });

  if (isLoading || isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">{isLoading ? "LOADING..." : isError}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-[10rem]">
      {data &&
        data.map((result: any) => (
          <div key={result.product_id} className="bg-white rounded-lg shadow-md p-6">
            <div className="font-semibold mb-2">Product ID: {result.product_id}</div>
            <img src={result.image_url} alt={result.product_name} className="h-36 object-contain mb-2" />
            <div className="font-semibold mb-2">Product Name: {result.product_name}</div>
            <div className="text-sm text-gray-600">{result.description}</div>
          </div>
        ))}
    </div>
  );
};

export default Throny;
