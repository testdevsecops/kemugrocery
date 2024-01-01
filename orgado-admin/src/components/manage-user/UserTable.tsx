"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import PaginationComponent from "../all-products/PaginationComponent ";
import updateIcon from "../../../public/assets/img/icon/action-2.png";
import deleteIcon from "../../../public/assets/img/icon/action-6.png";
import { toast } from "react-toastify";
import Image from "next/image";
import { IUser } from "@/interFace/interFace";
import useGlobalContext from "@/hooks/use-context";
import ChartPreloader from "@/preloaders/ChartPreloader";
import NiceSelectThree from "@/utils/NiceSelectThree";

const UserTable = () => {
  const { header, user } = useGlobalContext();
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [match, setMatch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setotalPages] = useState<number>(0);
  const [currentPage, setcurrentPage] = useState<number>(0);
  const selectHandler = () => {};
  const handleOpen = (id: string) => {
    setMatch(id);
    setOpen(!open);
  };
  const handleDeleteUser = (id: string) => {
    axios
      .delete(
        `${process.env.BASE_URL}user/delete-user?id=${id}&email=${user?.email}`,
        header
      )
      .then((res) => {
        if (res.data.message === "success") {
          const remainingProduct = users.filter((item) => item._id !== id);
          setUsers(remainingProduct);
          toast.success(`User Deleted`, {
            position: "top-left",
          });
        }
        if (res.data.message === "something is wrong") {
          toast.error(`Something Is Wrong`, {
            position: "top-left",
          }); 
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          toast.error("CURD Operation Is Disabled");
        } else {
          toast.error("CURD Operation Is Disabled");
        }
      });
  };

  // update user to admin
  const handleMakeAdmin = (id: string) => {
    const updateUserToAdmin = {
      id,
    };

    axios
      .put(
        `${process.env.BASE_URL}user/make-admin?email=${user?.email}`,
        updateUserToAdmin,
        header
      )
      .then((res) => {
        if (res.data.message === "success") {
          toast.success(`User Role Updated`, {
            position: "top-left",
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          toast.error("CURD Operation Is Disabled");
        } else {
          toast.error("CURD Operation Is Disabled");
        }
      });
  };

  // update admin to user

  const handleMakeUser = (id: string) => {
    const updateAdminToUser = {
      id,
    };

    axios
      .put(
        `${process.env.BASE_URL}user/make-user?email=${user?.email}`,
        updateAdminToUser,
        header
      )
      .then((res) => {
        if (res.data.message === "success") {
          toast.success(`User Role Updated`, {
            position: "top-left",
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          toast.error("CURD Operation Is Disabled");
        } else {
          toast.error("CURD Operation Is Disabled");
        }
      });
  };

  const handleInputChange = (e: any) => {
    setSearchValue(e.target.value);
    axios
      .get(`${process.env.BASE_URL}user/search-users?search=${searchValue}&email=${user?.email}`,header)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.BASE_URL}user/users-info?page=${page}&limit=${limit}&email=${user?.email}`,
        header
      )
      .then((res) => {
        setUsers(res.data.users);
        setotalPages(res.data.totalPages);
        setcurrentPage(res.data.currentPage);
      })
      .catch((e) => console.log(e));
  }, [page, limit,user?.email,header]);
  // get search products

  const pageLimitArray = [
    {
      id: 1,
      value: 5,
    },
    {
      id: 2,
      value: 10,
    },
    {
      id: 3,
      value: 15,
    },
    {
      id: 4,
      value: 20,
    },
  ];

  return (
    <>
      <div className="cashier-content-area mt-[30px] px-7">
        <div className="cashier-salereturns-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
         
         {
          users?.length ?
          <>
           <div className="cashier-table-header-search-area">
            <div className="grid grid-cols-12 gap-x-5 mb-7 pb-0.5">
              <div className="md:col-span-6 col-span-12">
                <div className="cashier-table-header-search relative maxSm:mb-4">
                  <input
                    type="text"
                    placeholder="Search List"
                    value={searchValue}
                    onChange={handleInputChange}
                  />
                  <span>
                    <i className="fa-light fa-magnifying-glass"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="cashier-salereturns-table-area relative">
            <div className="cashier-salereturns-table-innerD">
              <div className="cashier-salereturns-table-inner-wrapperD border border-solid border-grayBorder border-b-0 mb-7">
                <div className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12">
                
                  <div className="cashier-salereturns-table-dateF ml-5">
                    <h5>Name</h5>
                  </div>
                  <div className="cashier-salereturns-table-referenceF">
                    <h5>Email</h5>
                  </div>
                  <div className="cashier-salereturns-table-customerF">
                    <h5>Role</h5>
                  </div>
                  <div className="cashier-salereturns-table-companyF">
                    <h5>Phone</h5>
                  </div>
                  <div className="cashier-salereturns-table-warehouseF">
                    <h5>Join Date</h5>
                  </div>
                  <div className="cashier-salereturns-table-actionF">
                    <h5>Action</h5>
                  </div>
                </div>

                {users.length ? (
                  users.map((item) => (
                    <div
                      key={item._id}
                      className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12"
                    >
                      
                      <div className="cashier-salereturns-table-dateF ml-5">
                        <span> {item.name} </span>
                      </div>
                      <div className="cashier-salereturns-table-referenceF">
                        <span> {item.email} </span>
                      </div>
                      <div className="cashier-salereturns-table-customerF">
                        <span> {item.role} </span>
                      </div>
                      <div className="cashier-salereturns-table-companyF">
                        <span> {item.phone} </span>
                      </div>
                      <div className="cashier-salereturns-table-warehouseF">
                        <span> {item.date} </span>
                      </div>
                      <div className="cashier-salereturns-table-actionF">
                        <div className="dropdown">
                          <button
                            onClick={() => handleOpen(item._id)}
                            className="common-action-menu-style"
                          >
                            Action
                            <i className="fa-sharp fa-solid fa-caret-down"></i>
                          </button>
                          <div
                            className="dropdown-list"
                            style={{
                              display: `${
                                item._id === match && open ? "block" : "none"
                              }`,
                            }}
                          >
                            <button
                              onClick={() => handleMakeAdmin(item._id)}
                              className="dropdown-menu-item"
                            >
                              <Image src={updateIcon} alt="icon not found" />

                              <span>Make Admin</span>
                            </button>
                            <button
                              onClick={() => handleMakeUser(item._id)}
                              className="dropdown-menu-item"
                            >
                              <Image src={updateIcon} alt="icon not found" />

                              <span>Make User</span>
                            </button>
                            <button
                              onClick={() => handleDeleteUser(item._id)}
                              className="dropdown-menu-item"
                            >
                              <Image src={deleteIcon} alt="icon not found" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <ChartPreloader />
                  </>
                )}
              </div>
            </div>
            <div className="cashier-pagination-area">
              <div className="cashier-pagination-wrapper">
                <div className="grid grid-cols-12">
                  <div className="single-input-field w-full">
                    <NiceSelectThree
                      options={pageLimitArray}
                      defaultCurrent={0}
                      onChange={selectHandler}
                      name=""
                      setLimit={setLimit}
                      className=""
                    />
                  </div>

                  <div className="lg:col-span-9 md:col-span-6 col-span-12">
                    <PaginationComponent
                      totalPages={totalPages}
                      currentPage={currentPage}
                      setPage={setPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>
          :
          <>
          </>
         }


        </div>
      </div>
    </>
  );
};

export default UserTable;
