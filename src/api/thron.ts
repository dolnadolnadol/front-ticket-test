import axios from "axios";

export async function getProduct(): Promise<any> {
  const result = await axios.get(
    "https://thedeadstock.shop/api/product/get-all"
  );
  console.log(result.data.products);
  return result.data.products;
}
