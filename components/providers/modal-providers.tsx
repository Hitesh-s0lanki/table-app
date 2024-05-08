"use client";

import CreateCategoryModel from "../modals/create-category";
import CreateSubCategorieModel from "../modals/create-subcategory";
import EditCategoryModal from "../modals/edit-category";
import EditSubCategoryModal from "../modals/edit-subcategory";

const ModalProviders = () => {
  return (
    <>
      <CreateCategoryModel />
      <CreateSubCategorieModel />
      <EditCategoryModal />
      <EditSubCategoryModal />
    </>
  );
};

export default ModalProviders;
