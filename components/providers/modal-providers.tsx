"use client";

import { useEffect, useState } from "react";
import CreateCategoryModel from "../modals/create-category";
import CreateSubCategorieModel from "../modals/create-subcategory";
import EditCategoryModal from "../modals/edit-category";
import EditSubCategoryModal from "../modals/edit-subcategory";
import EditTaskModal from "../modals/edit-task";
import AuthModel from "../modals/auth-model";
import EditUserRoleModal from "../modals/edit-user-role";

const ModalProviders = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  if (!isMounted) return null;

  return (
    <>
      <AuthModel />
      <CreateCategoryModel />
      <CreateSubCategorieModel />
      <EditCategoryModal />
      <EditSubCategoryModal />
      <EditTaskModal />
      <EditUserRoleModal />
    </>
  );
};

export default ModalProviders;
