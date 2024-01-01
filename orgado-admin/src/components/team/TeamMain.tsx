"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import PaginationComponent from "../all-products/PaginationComponent ";
import deleteIcon from "../../../public/assets/img/icon/action-6.png";
import updateIcon from "../../../public/assets/img/icon/action-2.png";
import { toast } from "react-toastify";
import Image from "next/image";
import { TeamMember } from "@/interFace/apiInterFace";
import useGlobalContext from "@/hooks/use-context";
import ChartPreloader from "@/preloaders/ChartPreloader";
import NiceSelectThree from "@/utils/NiceSelectThree";
import Link from "next/link";
import AddButton from "../common/AddButton";

const TeamMain = () => {
  const { user, header } = useGlobalContext();
  const [users, setUsers] = useState<TeamMember[]>([]);
  // states
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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
        `${process.env.BASE_URL}team/delete-user?id=${id}&email=${user?.email}`,
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
  const handleInputChange = (e: any) => {
    setSearchValue(e.target.value);
    setLoading(true);
    axios
      .get(`${process.env.BASE_URL}team/search-users?search=${searchValue}`)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.BASE_URL}team/team-member-admin?page=${page}&limit=${limit}`
      )
      .then((res) => {
        setUsers(res.data.users);
        setotalPages(res.data.totalPages);
        setcurrentPage(res.data.currentPage);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [page, limit]);
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
        <AddButton title="Add Member" link="team/add-members" />
        <div className="cashier-salereturns-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
          {users?.length ? (
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
                      <div className="cashier-salereturns-table-dateF team-table-box">
                        <h5>Social Links</h5>
                      </div>
                      <div className="cashier-salereturns-table-referenceF team-table-box">
                        <h5>Email</h5>
                      </div>

                      <div className="cashier-salereturns-table-companyF">
                        <h5>Phone</h5>
                      </div>

                      <div className="cashier-salereturns-table-actionF">
                        <h5>Action</h5>
                      </div>
                    </div>

                    {users?.length ? (
                      users?.map((item) => (
                        <div
                          key={item._id}
                          className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12"
                        >
                          <div className="cashier-salereturns-table-dateF ml-5">
                            <span> {item.title} </span>
                          </div>
                          <div className="cashier-salereturns-table-dateF team-table-box">
                            <div className="soclial_links">
                              <Link href={item.facebook}>
                                {" "}
                                <i className="fab fa-facebook-f"></i>
                              </Link>
                              <Link href={item.twitter}>
                                <i className="fab fa-twitter"></i>
                              </Link>
                              <Link href={item.instagram}>
                                <i className="fab fa-instagram"></i>
                              </Link>
                              <Link href={item.linkedin}>
                                <i className="fab fa-linkedin"></i>
                              </Link>
                            </div>
                          </div>
                          <div className="cashier-salereturns-table-referenceF team-table-box">
                            <span> {item.email} </span>
                          </div>

                          <div className="cashier-salereturns-table-companyF">
                            <span> {item.phone} </span>
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
                                    item._id === match && open
                                      ? "block"
                                      : "none"
                                  }`,
                                }}
                              >
                                <button className="dropdown-menu-item">
                                  <Image
                                    src={updateIcon}
                                    alt="icon not found"
                                  />
                                  <Link href={`/team/update-team/${item._id}`}>
                                    Edit
                                  </Link>
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(item._id)}
                                  className="dropdown-menu-item"
                                >
                                  <Image
                                    src={deleteIcon}
                                    alt="icon not found"
                                  />
                                  <span>Delete</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <></>
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
          ) : (
            <>
              {loading ? (
                <>
                  <ChartPreloader />
                </>
              ) : (
                <>
                  <p className="text-center mt-5"> No Member Found </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TeamMain;
