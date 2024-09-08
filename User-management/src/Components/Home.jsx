import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// imported nextui Table component below ------------->
// imported popup component from nextui below----->
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
//imported popup component from nextui---->
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { EditIcon } from "../NextUIComponenets/EditIcon";
import { DeleteIcon } from "../NextUIComponenets/DeleteIcon";
import { columns } from "../NextUIComponenets/data";
import { Spinner } from "@nextui-org/react";
//imported nextui Table component above ------------->

export default function Home(props) {
  //state management-------->
  const [user, setuser] = useState([]);
  const [loading, setloading] = useState(true);
  const [userId, setUserId] = useState("");
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  //API Calling for get all user (get methode)------->
  const fetchUsers = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setuser(response.data);
        setloading(false);
      })
      .catch((error) => {
        alert(`${error.message} occurred please try again`);
        setloading(false);
      });
  };

  //API Calling for add new user (post methode)------------>
  const addUser = async () => {
    await axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then((response) => {
        //alert after successfully Add data
        alert(
          `
        successfully created with data
        Name : ${response.data.name}
        Username : ${response.data.username}
        Email : ${response.data.email}
        Phone No : ${response.data.phone}
        `
        );
      })
      .catch((error) => {
        // error handling if error occurred-------------->
        alert(`${error.message} occurred please try again`);
      });
  };

  // API Calling for delete user (delete methode)------->
  const deleteUser = async (userId) => {
    setUserId(userId);
    await axios
      .delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(() => {
        // open popup after successfully delete
        setIsOpenDelete(true);
      })
      .catch((error) => {
        // error handling if error occurred-------------->
        alert(`${error.message} occurred please try again`);
      });
  };

  //API Calling for update user (put methode) -------->
  const updateUser = async () => {
    await axios
      .put(`https://jsonplaceholder.typicode.com/users/${userId}`, newUser)
      .then((response) => {
        //alert on successfully updation--------->
        alert(
          `
        Data Updated successfully
        id : ${response.data.id}
        Name : ${response.data.name}
        Username : ${response.data.username}
        Email : ${response.data.email}
        Phone No : ${response.data.phone}
        `
        );
      })
      .catch((error) => {
        // error handling if error occurred-------------->
        alert(`${error.message} occurred please try again`);
      });
  };

  // setting the default value on updation------>
  const getValue = (user) => {
    setUserId(user.id);
    setNewUser({
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
    });
    setIsOpenUpdate(true);
  };

  // useEffect for frist rendring------------>
  useEffect(() => {
    fetchUsers();
  }, []);

  // nextui Table code  below ---------------->
  const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };

  // nextui popup code  below----------->
  const { onOpenChange } = useDisclosure();
  // nextui popup code  above----------->

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit user">
              <span
                onClick={() => {
                  getValue(user);
                }} /////   Pending..................
                className="capitalize text-lg cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span
                onClick={() => deleteUser(user.id)}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </span>
            </Tooltip>
            <Tooltip color="dark" content="view detail">
              <Link to={`/id=${user.id}`}>   {/* nevigate to UserDetail page*/}
                <span
                  onClick={() => props.sendData(user.id)}
                  className="text-lg cursor-pointer active:opacity-50"
                >
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                    >
                      <path d="M200-120q-33 0-56.5-23.5T120-200v-160h80v160h560v-560H200v160h-80v-160q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm220-160-56-58 102-102H120v-80h346L364-622l56-58 200 200-200 200Z" />
                    </svg>
                  </button>
                </span>
              </Link>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  //spinner from nextui --------->
  if (loading) {
    return (
      <Spinner
        className="text-center w-full mt-10"
        label="Loading..."
        color="warning"
      />
    );
  }

  // getting data from Add user form---------->
  function getdata(event) {
    let name = event.target.name;
    let value = event.target.value;
    setNewUser((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  return (
    <>
    {/* Table from nextui */}
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={user}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* popup code from nextui below ----------> */}
      {/* Popup for data addition below */}
      <Modal
        isOpen={isOpenAdd}
        onClose={() => setIsOpenAdd(false)}
        backdrop="blur"
        size="xl"
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add User
              </ModalHeader>
              <ModalBody>
                <form className=" space-y-5">
                  <Input
                    className="w-full"
                    name="name"
                    onChange={getdata}
                    type="text"
                    label="Name"
                  />
                  <Input
                    className="w-full"
                    name="username"
                    onChange={getdata}
                    type="text"
                    label="Username"
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
                    name="phone"
                    onChange={getdata}
                    type="text"
                    label="Phone no"
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    addUser();
                    onClose();
                  }}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* Popup for data addition above */}

      {/* Popup for data Updation below */}
      <Modal
        isOpen={isOpenUpdate}
        onClose={() => setIsOpenUpdate(false)}
        backdrop="blur"
        size="xl"
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update User
              </ModalHeader>
              <ModalBody>
                <form className=" space-y-5">
                  <Input
                    className="w-full"
                    name="name"
                    onChange={getdata}
                    type="text"
                    label="Name"
                    value={newUser.name}
                  />
                  <Input
                    className="w-full"
                    name="username"
                    onChange={getdata}
                    type="text"
                    label="Username"
                    value={newUser.username}
                  />
                  <Input
                    className="w-full"
                    name="email"
                    onChange={getdata}
                    type="email"
                    label="Email"
                    value={newUser.email}
                  />
                  <Input
                    className="w-full"
                    name="phone"
                    onChange={getdata}
                    type="text"
                    label="Phone no"
                    value={newUser.phone}
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    updateUser();
                    onClose();
                  }}
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* Popup for data Updation above */}

      {/* Popup on data delete below */}
      <Modal
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        backdrop="blur"
        size="xl"
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update User
              </ModalHeader>
              <ModalBody>
                <p>UserId : {userId} data deleted successfully</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={onClose}>
                  Ok
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* Popup on data delete above */}
      {/* popup code from nextui above----------> */}
      {/* Nextui code above---------------> */}

      {/* Add new user nevigation button below---------> */}
      <button
        onClick={() => setIsOpenAdd(true)}
        className="bg-blue-600 rounded-md min-w-[10vw] text-white float-right mr-10 p-2"
      >
        Add New User
      </button>
    </>
  );
}
