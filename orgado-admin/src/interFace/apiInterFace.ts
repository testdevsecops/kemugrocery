export interface SubCategoryType {
  _id: string;
  subCategoryName: string;
  subcategoryclass: string;
  categoryName: string;
  brandImg: string;
}

export interface ProductType {
  _id: string;
  categoryName: string;
  oldPrice: number;
  price: number;
  productDetails: string;
  productImages: string[];
  productName: string;
  productQuantity: number;
  subcategoryName: string;
  img: string;
  date: string;
  offer: boolean;
  offerPersent: number;
  rettings: number[];
  productStatus: string;
}

export interface OrderDataType {
  _id:string;
  buyerEmail: string | undefined;
  Country: string;
  name: string;
  Address: string;
  City: string;
  Postcode: string;
  EmailAddress: string;
  date: string;
  Phone: string;
  totalPrice: number;
  orderProducts?: any;
  paymentId: string;
}

export interface blogDataType {
  _id:string;
  title: string;
  blogDetails: string;
  img: string;
  date: string;
  author: string;
  commentsArray: [];
  authorEmail: string;
  comment: number;
}
export interface CategoryType {
  _id:string;
  categoryName: string;
  categoryclass: string;
  categoryThumb: string;
}



// team interface

export interface TeamMember {
  _id:string;
  title: string;
  subTitle: string;
  img: string;
  imgTwo: string;
  imgThree: string;
  date: string;
  aboutMe: string;
  phone: string;
  email: string;
  location: string;
  skills: Skill[];
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

export interface Skill {
  skillName: string;
  precent: string;
}



// offer Product Type 

export interface offerProductType {
  _id:string;
  productId:string;
  productName:string;
  banner: string;
  date:string;
  offerPersent:number;
  price: number;
  oldPrice:number;
  productDetails:string;
}

export interface UserContactType {
  _id:string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date:string
}


// team

export interface TeamMemberType {
  _id:string;
  title: string;
  subTitle: string;
  img: string;
  imgTwo: string;
  imgThree: string;
  date: string;
  aboutMe: string;
  phone: string;
  email: string;
  location: string;
  skills: Skill[];
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

export interface Skill {
  skillName: string;
  precent: string;
}

export interface RefundRequest {

  _id: string;
  name: string;
  date: string;
  email: string;
  phone: string;
  message: string;
  productId: string;
  paymentId: string;
  productName: string;
}

export interface UserReviewType {
  _id: string;
  productName:string;
  review: string;
  name: string;
  email: string;
  date: string;
  productId: string;
  categoryName: string;
  retting: number;
  img:string;
}