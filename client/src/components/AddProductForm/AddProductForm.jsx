import axios from "axios";
import { useState } from "react";
import { server } from "../../server";
import { toast } from "react-toastify";

export default function AddProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [totalSell, setTotalSell] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = new FormData();
    newForm.append("name", name);
    newForm.append("price", price);
    newForm.append("discountedPrice", discountedPrice);
    newForm.append("category", category);
    newForm.append("rating", rating);
    newForm.append("description", description);
    newForm.append("totalSell", totalSell);
    newForm.append("image", image);

    try {
      const response = await axios.post(`${server}/product/add-product`, newForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
      // Reset the form
      setName("");
      setPrice("");
      setDiscountedPrice("");
      setCategory("");
      setRating("");
      setDescription("");
      setTotalSell("");
      setImage(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "There was an error submitting the form!");
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="mt-[5%] text-2xl font-bold">Add a Product</h1>
      <form className="flex flex-col space-y-4 mt-5" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <label htmlFor="name" className="mr-2 w-40 text-right">Product Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="description" className="mr-2 w-40 text-right">Description:</label>
          <textarea
            id="description"
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="totalSell" className="mr-2 w-40 text-right">Total Sell:</label>
          <input
            id="totalSell"
            type="number"
            placeholder="Total Sell"
            value={totalSell}
            onChange={(e) => setTotalSell(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="price" className="mr-2 w-40 text-right">Price:</label>
          <input
            id="price"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="discountedPrice" className="mr-2 w-40 text-right">Discounted Price:</label>
          <input
            id="discountedPrice"
            type="number"
            placeholder="Discounted Price"
            value={discountedPrice}
            onChange={(e) => setDiscountedPrice(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="category" className="mr-2 w-40 text-right">Category:</label>
          <input
            id="category"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="rating" className="mr-2 w-40 text-right">Rating:</label>
          <input
            id="rating"
            type="number"
            placeholder="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="image" className="mr-2 w-40 text-right">Image:</label>
          <input
            id="image"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileInputChange}
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="p-2 bg-blue-500 text-white">Add Product</button>
      </form>
    </div>
  );
}
