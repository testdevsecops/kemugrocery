"use client";
import moment from "moment/moment";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import useGlobalContext from "@/hooks/use-context";
interface FormData {
  img: string;
  imgTwo: string;
  imgThree: string;
  subTitle: string;
  title: string;
  aboutMe: string;
  phone: string;
  email: string;
  location: string;
  skillOne: string;
  skillTwo: string;
  skillThree: string;
  skillOnePersend: string;
  skillTwoPersend: string;
  skillThreePersend: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

const CreateTeamMain = () => {
  const { user, header } = useGlobalContext();
  const [upload, setupload] = useState<boolean>(false);
  const [uploadTwo, setuploadTwo] = useState<boolean>(false);
  const [uploadThree, setuploadThree] = useState<boolean>(false);
  const [teamImg, setTeamImg] = useState<string>("");
  const [teamImgTwo, setTeamImgTwo] = useState<string>("");
  const [teamImgThree, setTeamImgThree] = useState<string>("");
  const now = moment();
  const date = now.format("MM/DD/YY hh:mm a");
  const [loginError, setloginError] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    // setLoading(true);

    const title = data.title;
    const subTitle = data.subTitle;
    const aboutMe = data.aboutMe;
    const phone = data.phone;
    const email = data.email;
    const location = data.location;
    const skillOne = data.skillOne;
    const skillOnePersend = data.skillOnePersend;
    const skillTwo = data.skillTwo;
    const skillTwoPersend = data.skillTwoPersend;
    const skillThree = data.skillThree;
    const skillThreePersend = data.skillThreePersend;
    const facebook = data.facebook;
    const twitter = data.twitter;
    const instagram = data.instagram;
    const linkedin = data.linkedin;

    const memberInfo = {
      title,
      subTitle,
      img: teamImg,
      imgTwo: teamImgTwo,
      imgThree: teamImgThree,
      date,
      aboutMe,
      phone,
      email,
      location,
      skills: [
        { skillName: skillOne, precent: skillOnePersend },
        { skillName: skillTwo, precent: skillTwoPersend },
        { skillName: skillThree, precent: skillThreePersend },
      ],
      facebook,
      twitter,
      instagram,
      linkedin,
    };
    axios
      .post(
        `${process.env.BASE_URL}team/create-team-member?email=${user?.email}`,
        memberInfo,
        header
      )
      .then((res) => {
        switch (res.data.message) {
          case "success":
            reset();
            setupload(false);
            setuploadTwo(false);
            setuploadThree(false);
            toast.success(`Member added`, {
              position: "top-left",
            });
            break;

          case "Already Exist":
            setloginError("Member is Already Exist");
            toast.error(`Member is Already Exist`, {
              position: "top-left",
            });
            break;
          case "custom error":
            reset();
            setupload(false);
            setuploadTwo(false);
            setuploadThree(false);
            setloginError("something is wrong");
            toast.error(`something is wrong`, {
              position: "top-left",
            });
            break;
          default:
            break;
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

  // handle single image

  const handleSingleImgUpload = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_URL}`,
        formData
      );
      const imageUrl = response.data.data.url;
      if (response.data.success === true) {
        setupload(true);
      }
      setTeamImg(imageUrl);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleClearSingleImg = () => {
    setupload(false);
    setTeamImg("");
  };

  //   handle second img

  const handleSingleImgUploadTwo = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_URL}`,
        formData
      );
      const imageUrl = response.data.data.url;
      if (response.data.success === true) {
        setuploadTwo(true);
      }
      setTeamImgTwo(imageUrl);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleClearSingleImgTwo = () => {
    setuploadTwo(false);
    setTeamImgTwo("");
  };

  //   third img

  const handleSingleImgUploadThree = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_URL}`,
        formData
      );
      const imageUrl = response.data.data.url;
      if (response.data.success === true) {
        setuploadThree(true);
      }
      setTeamImgThree(imageUrl);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleClearSingleImgThree = () => {
    setuploadThree(false);
    setTeamImgThree("");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-content-area mt-[30px] px-7"
      >
        <div className="cashier-addsupplier-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
          <h4 className="text-[20px] font-bold text-heading mb-9">
            Create Member
          </h4>
          <div className="grid grid-cols-12 gap-x-5">
            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Member Name
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Add Member Name"
                      {...register("title", {
                        required: "subCategoryName Name is required",
                      })}
                    />
                    {errors.title && <span>{errors.title.message}</span>}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Sub Title
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Add Sub Title"
                      {...register("subTitle", {
                        required: "subTitle is required",
                      })}
                    />
                    {errors.subTitle && <span>{errors.subTitle.message}</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Phone
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Add phone"
                      {...register("phone", {
                        required: "phone  is required",
                      })}
                    />
                    {errors.phone && <span>{errors.phone.message}</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Email
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Add Email"
                      {...register("email", {
                        required: "email  is required",
                      })}
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Location
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Add Location"
                      {...register("location", {
                        required: "location  is required",
                      })}
                    />
                    {errors.location && <span>{errors.location.message}</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  skill One
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Add skill One"
                      {...register("skillOne", {
                        required: "skillOne  is required",
                      })}
                    />
                    {errors.skillOne && <span>{errors.skillOne.message}</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  skill One %
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Add skill One %"
                      {...register("skillOnePersend", {
                        required: "skillOnePersend  is required",
                      })}
                    />
                    {errors.skillOnePersend && (
                      <span>{errors.skillOnePersend.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Skill Two
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Add skill Two"
                      {...register("skillTwo", {
                        required: "skillTwo  is required",
                      })}
                    />
                    {errors.skillTwo && <span>{errors.skillTwo.message}</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Skill Two %
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Add Skill Two %"
                      {...register("skillTwoPersend", {
                        required: "skillTwoPersend  is required",
                      })}
                    />
                    {errors.skillTwoPersend && (
                      <span>{errors.skillTwoPersend.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Skill Three
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Add Skill Three"
                      {...register("skillThree", {
                        required: "skillThree  is required",
                      })}
                    />
                    {errors.skillThree && (
                      <span>{errors.skillThree.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Skill Three %
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Add Skill Three %"
                      {...register("skillThreePersend", {
                        required: "skillThreePersend  is required",
                      })}
                    />
                    {errors.skillThreePersend && (
                      <span>{errors.skillThreePersend.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Facebook Link
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Add Facebook Link"
                      {...register("facebook", {
                        required: "facebook Link  is required",
                      })}
                    />
                    {errors.facebook && <span>{errors.facebook.message}</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Twitter Link
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Add Twitter Link"
                      {...register("twitter", {
                        required: "twitter Link  is required",
                      })}
                    />
                    {errors.twitter && <span>{errors.twitter.message}</span>}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Instagram Link
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Add Instagram Link"
                      {...register("instagram", {
                        required: "instagram Link  is required",
                      })}
                    />
                    {errors.instagram && (
                      <span>{errors.instagram.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  LinkedIn Link
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Add linkedin Link"
                      {...register("linkedin", {
                        required: "linkedin Link  is required",
                      })}
                    />
                    {errors.instagram && (
                      <span>{errors.instagram.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Thumbnail Image
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full single-input-field-file">
                    {upload === false ? (
                      <>
                        <label htmlFor="profileImage5">
                          <i className="fa-regular fa-folder-arrow-up"></i> File
                          Upload
                        </label>
                        <input
                          type="file"
                          id="profileImage5"
                          className="hidden"
                          accept="image/*"
                          onChange={handleSingleImgUpload}
                          required
                        />
                      </>
                    ) : (
                      <div className="img_upload_preview">
                        <Image
                          src={teamImg}
                          alt="category Img"
                          width={500}
                          height={500}
                          style={{ width: "100%", height: "auto" }}
                        />
                        <button
                          onClick={handleClearSingleImg}
                          className="custome_remove_icon"
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Second Image
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full single-input-field-file">
                    {uploadTwo === false ? (
                      <>
                        <label htmlFor="profileImage6">
                          <i className="fa-regular fa-folder-arrow-up"></i> File
                          Upload
                        </label>
                        <input
                          type="file"
                          id="profileImage6"
                          className="hidden"
                          accept="image/*"
                          onChange={handleSingleImgUploadTwo}
                          required
                        />
                      </>
                    ) : (
                      <div className="img_upload_preview">
                        <Image
                          src={teamImgTwo}
                          alt="category Img"
                          width={500}
                          height={500}
                          style={{ width: "100%", height: "auto" }}
                        />
                        <button
                          onClick={handleClearSingleImgTwo}
                          className="custome_remove_icon"
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Third Image
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full single-input-field-file">
                    {uploadThree === false ? (
                      <>
                        <label htmlFor="profileImage7">
                          <i className="fa-regular fa-folder-arrow-up"></i> File
                          Upload
                        </label>
                        <input
                          type="file"
                          id="profileImage7"
                          className="hidden"
                          accept="image/*"
                          onChange={handleSingleImgUploadThree}
                          required
                        />
                      </>
                    ) : (
                      <div className="img_upload_preview">
                        <Image
                          src={teamImgThree}
                          alt="category Img"
                          width={500}
                          height={500}
                          style={{ width: "100%", height: "auto" }}
                        />
                        <button
                          onClick={handleClearSingleImgThree}
                          className="custome_remove_icon"
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-12 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  About Member
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <textarea
                      placeholder="Add Member Details...."
                      {...register("aboutMe", {
                        required: "aboutMe is required",
                      })}
                    />
                    {errors.aboutMe && <span>{errors.aboutMe.message}</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12">
              <div className="cashier-managesale-top-btn default-light-theme pt-2.5">
                <button className="btn-primary" type="submit">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateTeamMain;
