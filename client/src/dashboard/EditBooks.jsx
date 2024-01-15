import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import {
  Button,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import { toast } from "react-toastify";


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
const EditBooks = () => {
  
  const { id } = useParams();
  const { bookTitle, authorName, imageURL, category,bookDescription, price } =
    useLoaderData();

  const [selectedCategory, setSelectedCategory] = useState(bookCategories[0]);
  const handleChangeSelectedvalue = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleUpdate = (event) => {
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
    fetch(`${process.env.REACT_APP_SERVER}/book/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookObj),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Updated",{
          className:"toast-message"
        })
      });
  };
  return (
    <div className="px-12 my-12 ">
      <h2 className="mb-8 text-3xl font-bold">Update the book data</h2>
      <form
        onSubmit={handleUpdate}
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
              defaultValue={bookTitle}
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
              defaultValue={authorName}
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
              defaultValue={imageURL}
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
              
              defaultValue={category}
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
            <Label htmlFor="bookDescription" value="book Description " />
          </div>
          <Textarea
            id="bookDescription"
            name="bookDescription"
            type="text"
            placeholder="Description"
            rows={6}
            defaultValue={bookDescription}
            className="w-full"
            required
          />
        </div>
        {/* book pdf link */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="price" value="Price" />
          </div>
          <TextInput
            id="price"
            type="text"
            placeholder="book pdf url"
            name="price"
            defaultValue={price}
            required
          />
        </div>
        <Button type="submit" className="mt-5">
          Update book
        </Button>
      </form>
    </div>
  );
};

export default EditBooks;
