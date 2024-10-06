import axios from "axios";
import React, { useEffect, useState } from "react";

//import next ui table componenet below------------>
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
//import next ui table componenet above------------>

export default function UserDetail(props) {
  //state management------------->
  const [user, setUser] = useState({});

  // API calling for user detail (get methode)---------->
  const getUser = async () => {
    await axios
      .get(`https://jsonplaceholder.typicode.com/users/${props.userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        alert(`${error.message} occurred please try again`);
      });
  };

  // useEffect hook for initial rendring
  useEffect(() => {
    getUser();
  }, []);
  
  return (
    <>
      {/* Table from nextui */}
      <Table
        className="max-w-[80vw] md:max-w-[60vw] lg:max-w-[45vw] m-auto "
        hideHeader
        shadow="lg"
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ROLE</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              colSpan="2"
              className="text-center border-2 border-gray-500"
            >
              Personal Detail
            </TableCell>
            <TableCell hidden className=""></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="">Name :</TableCell>
            <TableCell className="">{user.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="">Username :</TableCell>
            <TableCell className="">{user.username}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="">Email :</TableCell>
            <TableCell className="">{user.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="">Phone No. :</TableCell>
            <TableCell className="">{user.phone}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="">Website :</TableCell>
            <TableCell className="">{user.website}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              colSpan="2"
              className="text-center border-2 rounded-md border-gray-500"
            >
              Company :
            </TableCell>
            <TableCell hidden className=""></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="">Name :</TableCell>
            <TableCell className="">{user.company?.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="">CatchPhrase :</TableCell>
            <TableCell className="">{user.company?.catchPhrase}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="">bs :</TableCell>
            <TableCell className="">{user.company?.bs}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              colSpan="2"
              className="text-center border-2 rounded-md  border-gray-500"
            >
              Address :
            </TableCell>
            <TableCell hidden className=""></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="">Street :</TableCell>
            <TableCell className="">{user.address?.street}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="">Suite :</TableCell>
            <TableCell className="">{user.address?.suite}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="">City :</TableCell>
            <TableCell className="">{user.address?.city}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="">Zipcode :</TableCell>
            <TableCell className="">{user.address?.zipcode}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
