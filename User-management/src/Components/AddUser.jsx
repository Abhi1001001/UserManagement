import { Input } from "@nextui-org/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  // state management-------------->
  const [newUser, setuser] = useState({
    name: "",
    email: "",
    phoneno: "",
  });
  const nevigate = useNavigate();

  // getdata from inputs----------->
  function getdata(event) {
    let name = event.target.name;
    let value = event.target.value;
    setuser((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  //post data in API on submit------------>
  async function postdata(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        {
          name: newUser.name,
          email: newUser.email,
          phoneno: newUser.phoneno,
        }
      );
      alert(
        `
        successfully created with data
        Name : ${response.data.name}
        Email : ${response.data.email}
        Phone No : ${response.data.phoneno}
        `
      );
    } catch (error) {
      alert(
        `
        ${error} occured please try again!
        `
      );
    }
    event.target.reset();
    nevigate("/")
  }

  return (
    <>
      <div className="bg-gray-400 w-[80%] lg:max-w-[50%] mt-10 rounded-md m-auto p-20">
        <form className=" space-y-5" onSubmit={postdata}>
          <Input
            className="w-full"
            name="name"
            onChange={getdata}
            type="text"
            label="Name"
          />
          <Input
            className="w-full"
            name="email"
            onChange={getdata}
            type="email"
            label="Email"
          />
          <Input
            className="w-full"
            name="phoneno"
            onChange={getdata}
            type="text"
            label="Phone no"
          />
          <button
            className="bg-blue-600 min-w-[10vw] rounded-lg text-white float-right p-2"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
