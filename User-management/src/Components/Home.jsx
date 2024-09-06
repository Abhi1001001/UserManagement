import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// imported nextui component below ------------->
// popup from nextui below----->
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
//popup from nextui above---->
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
//imported nextui component above ------------->

export default function Home() {
  //state management-------->
  const [user, setuser] = useState([]);
  const [loading, setloading] = useState(true);

  //API calling with get methode------->
  const fetchUsers = async () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setuser(response.data);
        setloading(false);
      })
      .catch((error) => {
        console.error(error, "occured please try again");
        setloading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // nextui code below ---------------->
  const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };

  // popup code from nextui below----------->
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // popup code from nextui above----------->

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
                onClick={onOpen}
                className="capitalize text-lg cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span
                onClick={onOpen}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  if (loading) {
    return (
      <Spinner
        className="text-center w-full mt-10"
        label="Loading..."
        color="warning"
      />
    );
  }

  return (
    <>
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
      <Modal
        isOpen={isOpen}
        backdrop="blur"
        size="4xl"
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  I haven't been able to implement all things, 2 more things is
                  pending data editing and deleting from API I need a little
                  more time to implement all these remaining things.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={onClose}>
                  Ok
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* popup code from nextui above----------> */}
      {/* Nextui code above---------------> */}

      {/* Add user nevigation button below---------> */}
      <button className="bg-blue-600 rounded-md min-w-[10vw] text-white float-right mr-10 p-2">
        <Link to="/new-user">Add User</Link>
      </button>
    </>
  );
}
