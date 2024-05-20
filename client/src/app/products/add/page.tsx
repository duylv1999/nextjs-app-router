import { cookies } from "next/headers";
import accountApiRequest from "~/apiRequests/account";
import ProductAddForm from "./product-add-form";

export default async function AddProduct() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");

  const result = await accountApiRequest.me(sessionToken?.value ?? "");

  return <div className="flex flex-col items-center">
      <h1>Add Product</h1> 
      <ProductAddForm />
    </div>;
}
