import React from "react";
import { Toast } from "flowbite-react";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

const SavingToast = () => {
  return (
    <Toast>
    <LoadingSpinner />
    <div className="ml-3 text-sm font-normal">
      Saving changes...
    </div>
    <Toast.Toggle />
  </Toast>
  )
}

export default SavingToast