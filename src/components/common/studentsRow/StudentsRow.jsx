"use client";

import { Table } from "flowbite-react";
import "./StudentsRow.css";
import DeleteModal from "../deleteModal/DeleteModal";
import { useState } from "react";
import SitesSelect from "../sitesSelect/SitesSelect";
import axios from "axios";

export default function StudentsRow({ student }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState({
    name: student.name,
    age: student.age,
    site: student.site,
  });

  return (
    <>
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {isEditing ? (
            <input
              className="border rounded-md px-3 py-2 w-full focus:border-blue-400 focus:outline-none"
              value={editedStudent.name}
              onChange={(e) =>
                setEditedStudent({ ...editedStudent, name: e.target.value })
              }
            />
          ) : (
            student.name
          )}
        </Table.Cell>
        <Table.Cell>
          {isEditing ? (
            <input
              type="number"
              className="border rounded-md px-3 py-2 w-full focus:border-blue-400 focus:outline-none"
              value={editedStudent.age}
              onChange={(e) =>
                setEditedStudent({ ...editedStudent, age: e.target.value })
              }
            />
          ) : (
            student.age
          )}
        </Table.Cell>
        <Table.Cell>
          {isEditing ? (
            <SitesSelect
              selectedSiteValue={editedStudent.site}
              onSiteSelected={(site) =>
                setEditedStudent((prevStudent) => ({
                  ...prevStudent,
                  site: site,
                }))
              }
            />
          ) : (
            student.site
          )}
        </Table.Cell>
        <Table.Cell>
          <a
            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
            onClick={() => {
              if (isEditing) {
                const formattedData = {
                  actionType: "edit",
                  values: [
                    student.name,
                    student.site,
                    editedStudent.name,
                    editedStudent.age,
                    editedStudent.site,
                  ],
                };

                console.log(formattedData);

                axios
                  .post(
                    "https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbxMWDqUjbFKvv46u13RV1GwzthjSkucPTTsZLH0l_CxJY3vtmZu0gWMsEjLxFL_KK-r/exec",
                    JSON.stringify(formattedData),
                    {
                      headers: {
                        "Content-Type": "application/json",
                        "x-requested-with": "XMLHttpRequest",
                      },
                    }
                  )
                  .then((response) => {
                    console.log("success:", response);
                    // Handle successful response, maybe show a message to the user?
                  })
                  .catch((error) => {
                    console.log("error:", error);
                    // Handle errors, maybe show an error message to the user?
                  });
              }
              setIsEditing(!isEditing);
            }}
          >
            <p>{isEditing ? "Save" : "Edit"}</p>
          </a>
        </Table.Cell>
        <Table.Cell>
          <button
            className="font-medium text-red-600 hover:underline dark:text-red-500"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </button>
        </Table.Cell>
      </Table.Row>
      {showDeleteModal && (
        <DeleteModal
          student={student}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}
