"use client";
import { idType } from "@/interFace/interFace";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { TeamMemberType } from "@/interFace/apiInterFace";
import Image from "next/image";
import Modal from "@/sheardComponent/Modal";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useGlobalContext from "@/hooks/use-context";
import UpdateTeamImgOne from "./UpdateTeamImg";
import UpdateImgTwo from "./UpdateImgTwo";
import UpdateImgThree from "./UpdateImgThree";
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

const TeamUpdateMain = ({ id }: idType) => {
  const { user, header } = useGlobalContext();
  const [product, setProduct] = useState<TeamMemberType[]>([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [modalIsOpen3, setModalIsOpen3] = useState(false);
  const [changeImage, setchangeImage] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const openModal2 = () => setModalIsOpen2(true);
  const openModal3 = () => setModalIsOpen3(true);

  const closeModal = () => {
    setModalIsOpen(false);
    setchangeImage(!changeImage)
  }
  const closeModal2 = () =>{
    setModalIsOpen2(false);
    setchangeImage(!changeImage)
  }
  const closeModal3 = () => {
    setModalIsOpen3(false);
    setchangeImage(!changeImage)
  }


  const router = useRouter();
  const myproduct = product[0];

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}team/single-member/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((e) => console.log(e));
  }, [id, changeImage]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
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
      id:myproduct?._id,
      title,
      subTitle,
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
      .put(
        `${process.env.BASE_URL}team/update-team-info?email=${user?.email}`,
        memberInfo,
        header
      )
      .then((res) => {
        if (res.data.message === "success") {
          router.push("/team");
          toast.success(`Details Updated`, {
            position: "top-left",
          });
        }
      })
      .catch((e) => {
        toast.error(`Update Feaild`, {
          position: "top-left",
        });
      });
  };

  return (
    <>
      {product.length && (
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
                        defaultValue={myproduct?.title}
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
                    SubTitle
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        defaultValue={myproduct?.subTitle}
                        placeholder="Add Member Name"
                        {...register("subTitle", {
                          required: "subTitle is required",
                        })}
                      />
                      {errors.subTitle && (
                        <span>{errors.subTitle.message}</span>
                      )}
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
                        defaultValue={myproduct?.phone}
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
                        defaultValue={myproduct?.email}
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
                        defaultValue={myproduct?.location}
                        placeholder="Add phone"
                        {...register("location", {
                          required: "location  is required",
                        })}
                      />
                      {errors.location && (
                        <span>{errors.location.message}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    SkillOne
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        defaultValue={myproduct?.skills[0].skillName}
                        placeholder="Add skillOne"
                        {...register("skillOne", {
                          required: "skillOne  is required",
                        })}
                      />
                      {errors.skillOne && (
                        <span>{errors.skillOne.message}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    SkillOnePersend
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        defaultValue={myproduct?.skills[0].precent}
                        placeholder="Add skillOne"
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
                    SkillTwo
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        defaultValue={myproduct?.skills[1].skillName}
                        placeholder="Add skillTwo"
                        {...register("skillTwo", {
                          required: "skillTwo  is required",
                        })}
                      />
                      {errors.skillTwo && (
                        <span>{errors.skillTwo.message}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    SkillTwoPersend
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        defaultValue={myproduct?.skills[1].precent}
                        placeholder="Add skillTwo Persend"
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
                    SkillThree
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        defaultValue={myproduct?.skills[2].skillName}
                        placeholder="Add skillThree"
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
                    SkillThreePersend
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        defaultValue={myproduct?.skills[2].precent}
                        placeholder="Add skillThree Persend"
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
                      defaultValue={myproduct?.facebook ? myproduct?.facebook : "https://www.facebook.com/"}
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
                      defaultValue={myproduct?.twitter ? myproduct?.twitter : "https://twitter.com/"}
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
                      defaultValue={myproduct?.instagram ? myproduct?.instagram : "https://www.instagram.com/"}
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
                      defaultValue={myproduct?.linkedin ? myproduct?.linkedin : "https://www.linkedin.com/"}
                      placeholder="Add linkedin Link"
                      {...register("linkedin", {
                        required: "linkedin Link  is required",
                      })}
                    />
                    {errors.linkedin && (
                      <span>{errors.linkedin.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

        
              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    Images
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <Image
                        onClick={openModal}
                        src={myproduct?.img}
                        alt="category Img"
                        width={100}
                        height={100}
                        style={{ width: "100px", height: "100px" }}
                      />
                      <Image
                      onClick={openModal2}
                        src={myproduct?.imgTwo}
                        alt="category Img"
                        width={100}
                        height={100}
                        style={{ width: "100px", height: "100px" }}
                      />
                      <Image
                      onClick={openModal3}
                        src={myproduct?.imgThree}
                        alt="category Img"
                        width={100}
                        height={100}
                        style={{ width: "100px", height: "100px" }}
                      />
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
                         defaultValue={myproduct?.aboutMe}
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
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      <Modal modalClass="custom-modal" overly="overlay" isOpen={modalIsOpen} onRequestClose={closeModal}>
        <UpdateTeamImgOne
          myproduct={myproduct}
          setchangeImage={setchangeImage}
          closeModal={closeModal}
        />
      </Modal>
      <Modal modalClass="custom-modal" overly="overlay" isOpen={modalIsOpen2} onRequestClose={closeModal2}>
        <UpdateImgTwo
          myproduct={myproduct}
          setchangeImage={setchangeImage}
          closeModal={closeModal2}
        />
      </Modal>
      <Modal modalClass="custom-modal" overly="overlay" isOpen={modalIsOpen3} onRequestClose={closeModal3}>
        <UpdateImgThree
          myproduct={myproduct}
          setchangeImage={setchangeImage}
          closeModal={closeModal3}
        />
      </Modal>
    </>
  );
};

export default TeamUpdateMain;
