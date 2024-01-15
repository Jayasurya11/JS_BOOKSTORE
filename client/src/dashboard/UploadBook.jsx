import React, { useState } from "react";
import {
  Button,
  
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";

import { toast } from "react-toastify";


const UploadBook = () => {
  
  const bookCategories = [
    "fiction",
    "non-fiction",
    "history",
    "finance",
    "biography",
    "humour",
    "horror",
    "fantasy",
    "self-help",
    "romance",
    "travel",
    "children"
  ];
  const [selectedCategory, setSelectedCategory] = useState(bookCategories[0]);
  const handleChangeSelectedvalue = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const price = form.price.value;
    const bookObj = {
      bookTitle,
      authorName,
      imageURL,
      category,
      bookDescription,
      price,
    };
    fetch(`${process.env.REACT_APP_SERVER}/upload-book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookObj),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Uploaded",{
          className:"toast-message"
        });
        form.reset();
      });
  };
  return (
    <div className=" px-12 my-12 ">
      <h2 className="mb-8 text-3xl font-bold">Upload A book</h2>
      <form
        onSubmit={handleSubmit}
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
      >
        {/* title and author */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" value="Book Title" />
            </div>
            <TextInput
              id="bookTitle"
              type="text"
              name="bookTitle"
              placeholder="Book name"
              required
            />
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="authorName" value="Author Name" />
            </div>
            <TextInput
              id="authorName"
              type="text"
              name="authorName"
              placeholder="Author name"
              required
            />
          </div>
        </div>
        {/* Book image and category */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="imageURL" value="Book Image URl" />
            </div>
            <TextInput
              id="imageURL"
              type="text"
              name="imageURL"
              placeholder="Book Image URL"
              required
            />
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Category" />
            </div>
            <Select
              id="inputState"
              name="categoryName"
              className="w-full rounded "
              value={selectedCategory}
              onChange={handleChangeSelectedvalue}
            >
              {bookCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        </div>
        {/* Description */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookDescription" value="Book Description " />
          </div>
          <Textarea
            id="bookDescription"
            name="bookDescription"
            type="text"
            placeholder="   Description"
            rows={6}
            className="w-full"
            required
          />
        </div>
        {/* book pdf link */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="Price" value="Price" />
          </div>
          <TextInput
            id="Price"
            type="number"
            placeholder="Eg. ₹ 150"
            name="price"
            required
          />
        </div>
        <Button type="submit" className="mt-5">
          Upload book
        </Button>
      </form>
    </div>
  );
};

export default UploadBook;
