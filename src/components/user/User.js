/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createUser,
  deleteUser,
  getUser,
  getUserList,
  updateUser,
} from "../../store/user/userSlice";
import { useForm } from "react-hook-form";
import { IoIosArrowDown, IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { FaFilter, FaSearch } from "react-icons/fa";

export function User() {
  const { user, userList } = useSelector(
    (state) => state.user || state.userList
  );
  console.log("🚀 ~ User ~ userList:", userList)
  const dispatch = useDispatch();
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [editableUserId, setEditableUserId] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    designation: "",
    email: "",
    phone: "",
    age: "",
  });

  const [pagination, setPagination] = useState({ page: 1, limit: 5, sortBy: "name", order: "asc" });
  console.log("🚀 ~ User ~ pagination:", pagination)
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getUserList({ ...pagination, filter: searchQuery }));
  }, [pagination, searchQuery, dispatch]);

  // Function to handle sort change
  const handleSortChange = (newSort) => {
    if (pagination.sortBy === newSort) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortOrder("asc");
    }
    setPagination({ ...pagination, sortBy: newSort, order: sortOrder });
  };

  // Function to handle order change
  const handleOrderChange = (newOrder) => {
    console.log("🚀 ~ handleOrderChange ~ newOrder:", newOrder)
    setPagination({ ...pagination, order: newOrder });
  };

  // Function to handle limit change
  const handleLimitChange = (newLimit) => {
    setPagination({ ...pagination, limit: newLimit });
  };

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createUser(data));
    setNewUser({
      name: "",
      designation: "",
      email: "",
      phone: "",
      age: "",
    });
  };

  const [isOpen, setIsOpen] = useState(false);

  const totalRows = userList?.count || 0;

  // Function to handle previous page
  const handlePrevPage = () => {
    if (pagination.page > 1) {
      setPagination((prevPagination) => ({ ...prevPagination, page: prevPagination.page - 1 }));
    }
  };

  // Function to handle next page
  const handleNextPage = () => {
    const maxPage = Math.ceil(totalRows / pagination.limit);
    if (pagination.page < maxPage) {
      setPagination((prevPagination) => ({ ...prevPagination, page: prevPagination.page + 1 }));
    }
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
    dispatch(getUserList(pagination));
  };

  const handleUpdateUser = (userId) => {
    setEditableUserId(userId);
    const userToUpdate = userList?.employees?.find((user) => user._id === userId);
    setUpdatedUserData(userToUpdate);
  };

  const handleSaveUpdate = () => {
    dispatch(updateUser({ id: editableUserId, updatedUserData }));
    setEditableUserId(null);
    setUpdatedUserData({});
    dispatch(getUserList());
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({ ...updatedUserData, [name]: value });
  };
  const rows = userList?.employees || [];

  const tableHead = ["name", "designation", "email", "phone", "age",]

  const getIconRotation = (sortBy) => {
    if (pagination.sortBy === sortBy) {
      return pagination.order === "desc" ? "rotate-180" : "";
    }
    return "";
  };

  const [openFilter, setOpenFilter] = useState(false);

  return (
    <>
      <div>
        <form
          className="flex flex-col justify-center items-center gap-10 mt-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <input
              className="outline-none w-60 border-2 border-blue-500 rounded-md text-center text-slate-400 font-medium bg-slate-700"
              type="name"
              id="name"
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
                pattern: { value: /^[a-zA-Z\s]+$/i, message: "Only alphabets are allowed" },
              })}
            />
            {errors.name && (
              <span className="text-red-500">{errors?.name?.message}</span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              className="outline-none w-60 border-2 border-blue-500 rounded-md text-center text-slate-400 font-medium bg-slate-700"
              type="text"
              id="designation"
              placeholder="Designation"
              min={0}
              max={100}
              {...register("designation", {
                required: "Designation is required",
              })}
            />
            {errors.designation && (
              <span className="text-red-500">
                {errors?.designation?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              className="outline-none w-60 border-2 border-blue-500 rounded-md text-center text-slate-400 font-medium bg-slate-700"
              type="email"
              id="email"
              placeholder="demo@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Oops! Please enter a valid email address.",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500">{errors?.email?.message}</span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              className="outline-none w-60 border-2 border-blue-500 rounded-md text-center text-slate-400 font-medium bg-slate-700"
              type="tel"
              id="phone"
              placeholder="Phone"
              {...register("phone", {
                required: "Phone is required",
                pattern: /^[0-9]+$/i,
              })}
            />
            {errors.phone && (
              <span className="text-red-500">{errors?.phone?.message}</span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              className="outline-none w-60 border-2 border-blue-500 rounded-md text-center text-slate-400 font-medium bg-slate-700"
              type="text"
              id="age"
              placeholder="Age"
              {...register("age", {
                required: "Age is required",
                pattern: {
                  value: /^[0-9]+$/i,
                  message: "Please enter a number!!",
                },
                min: {
                  value: 18,
                  message: "Sorry, you must be at least 18 years old.",
                },
                max: {
                  value: 100,
                  message: "Sorry, you must be less than 100 years old.",
                },
              })}
            />
            {errors.age && (
              <span className="text-red-500">{errors?.age?.message}</span>
            )}
          </div>
          <button
            className="bg-green-500 rounded-md text-white w-40 h-10"
            type="submit"
          >
            Create User
          </button>
        </form>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between px-6 py-4 bg-gray-700 text-gray-400 w-full">
          <h1 className="text-lg font-semibold">User Detail's List</h1>
          <div className="flex items-center justify-center gap-2">
            {openFilter && <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="border-2 border-blue-500 rounded-md text-center text-slate-400 font-medium outline-none bg-transparent"
            />}
            <FaFilter className="text-2xl cursor-pointer" onClick={() => setOpenFilter(!openFilter)} />
          </div>
        </div>
        <table className="w-full text-sm text-center text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              {tableHead.map((head, index) => {
                return <th key={index} scope="col" className="px-6 py-3">
                  <span className="flex items-center justify-center gap-2" onClick={() => handleSortChange(head)}>
                    <IoIosArrowDown className={`cursor-pointer text-lg ${pagination.sortBy === head ? "text-blue-500" : ""} transform ${getIconRotation(head)}`} />
                    {head}
                  </span>
                </th>
              })}
              <th scope="col" className="px-6 py-3">
                update
              </th>
              <th scope="col" className="px-6 py-3">
                delete
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((data) => (
              <tr
                key={data._id}
                className="border-b bg-gray-800 border-gray-700"
              >
                {/* <td className="px-6 py-4">{data._id}</td> */}
                <td className="px-6 py-4">
                  {editableUserId === data._id ? (
                    <input
                      className="outline-none w-32 border-2 border-blue-500 text-center text-slate-400 font-medium bg-slate-700"
                      type="text"
                      name="name"
                      value={updatedUserData.name}
                      onChange={handleUpdateInputChange}
                    />
                  ) : (
                    data.name
                  )}
                </td>
                <td className="px-6 py-4">
                  {editableUserId === data._id ? (
                    <input
                      className="outline-none w-28 border-2 border-blue-500 text-center text-slate-400 font-medium bg-slate-700"
                      type="text"
                      name="designation"
                      value={updatedUserData.designation}
                      onChange={handleUpdateInputChange}
                    />
                  ) : (
                    data.designation
                  )}
                </td>
                <td className="px-6 py-4">
                  {editableUserId === data._id ? (
                    <input
                      className="outline-none w-40 border-2 border-blue-500 text-center text-slate-400 font-medium bg-slate-700"
                      type="text"
                      name="email"
                      value={updatedUserData.email}
                      onChange={handleUpdateInputChange}
                    />
                  ) : (
                    data.email
                  )}
                </td>
                <td className="px-6 py-4">
                  {editableUserId === data._id ? (
                    <input
                      className="outline-none w-24 border-2 border-blue-500 text-center text-slate-400 font-medium bg-slate-700"
                      type="text"
                      name="phone"
                      value={updatedUserData.phone}
                      onChange={handleUpdateInputChange}
                    />
                  ) : (
                    data.phone
                  )}
                </td>
                <td className="px-6 py-4">
                  {editableUserId === data._id ? (
                    <input
                      className="outline-none w-7 border-2 border-blue-500 text-center text-slate-400 font-medium bg-slate-700"
                      type="text"
                      name="age"
                      value={updatedUserData.age}
                      onChange={handleUpdateInputChange}
                    />
                  ) : (
                    data.age
                  )}
                </td>
                <td>
                  {editableUserId === data._id ? (
                    <button
                      className="bg-blue-500 rounded-md text-white w-40 h-10"
                      onClick={handleSaveUpdate}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 rounded-md text-white w-40 h-10"
                      onClick={() => handleUpdateUser(data._id)}
                    >
                      Update
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="bg-red-500 rounded-md text-white w-40 h-10"
                    onClick={() => handleDeleteUser(data._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-b bg-gray-800 border-gray-700">
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              {/* <td className="px-6 py-4"></td> */}
              <td className="px-6 py-4">Rows per page:
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      type="button"
                      className="inline-flex justify-center items-center gap-2 w-full px-4 py-2"
                    >
                      {pagination.limit}
                      <IoIosArrowDown className="text-lg" />
                    </button>
                  </div>

                  {isOpen && (
                    <div
                      className="origin-top-right absolute top-[-160px] right-0 mt-2 w-12 rounded-md shadow-lg bg-[#374151] ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div className="py-1" role="none">
                        <button
                          className="block w-full active:bg-slate-400 px-4 py-2 text-sm hover:bg-[#9ca1af] hover:text-[#1f2937]"
                          role="menuitem"
                          onClick={() => handleLimitChange(1)}
                        >
                          1
                        </button>
                        <button
                          className="block w-full active:bg-slate-400 px-4 py-2 text-sm hover:bg-[#9ca1af] hover:text-[#1f2937]"
                          role="menuitem"
                          onClick={() => handleLimitChange(5)}
                        >
                          5
                        </button>
                        <button
                          className="block w-full active:bg-slate-400 px-4 py-2 text-sm hover:bg-[#9ca1af] hover:text-[#1f2937]"
                          role="menuitem"
                          onClick={() => handleLimitChange(10)}
                        >
                          10
                        </button>
                        <button
                          className="block w-full active:bg-slate-400 px-4 py-2 text-sm hover:bg-[#9ca1af] hover:text-[#1f2937]"
                          role="menuitem"
                          onClick={() => handleLimitChange(15)}
                        >
                          15
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">{`${(pagination.page - 1) * pagination.limit + 1} - ${Math.min(pagination.page * pagination.limit, totalRows)} of ${totalRows}`}</td>
              <td className="px-6 py-4">
                <div className="flex gap-4 items-center justify-center">
                  <button
                    onClick={handlePrevPage}
                    className="text-lg cursor-pointer text-white disabled:text-[#626262] disabled:cursor-not-allowed"
                    disabled={pagination.page === 1}
                  >
                    <IoMdArrowRoundBack />
                  </button>
                  <button
                    onClick={handleNextPage}
                    className="text-lg cursor-pointer text-white disabled:text-[#626262] disabled:cursor-not-allowed"
                    disabled={pagination.page * pagination.limit >= totalRows}
                  >
                    <IoMdArrowRoundForward />
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

    </>
  );
}
