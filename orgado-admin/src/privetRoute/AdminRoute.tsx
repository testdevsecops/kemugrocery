"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Preloader from "@/sheardComponent/Preloader/Preloader";
import { childrenType } from "@/interFace/interFace";
import useGlobalContext from "@/hooks/use-context";
const AdminRoute: React.FC<childrenType> = ({ children }) => {
  const { user, loading,logout } = useGlobalContext();
  const router = useRouter();
  const [showLoader, setShowLoader] = useState<boolean>(true);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (showLoader) {
    return <Preloader />;
  }

  if (user?.email) {
    return <>{children}</>;
  }

  // if (user?.role === "admin") {
  //   return <>{children}</>;
  // }


  router.replace("/login");
    if(logout){
      logout()
    }
  return null;
};

export default AdminRoute;

