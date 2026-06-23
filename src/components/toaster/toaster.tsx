import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/app.store";
import { useEffect } from "react";
import { hideToast } from "../../store/toasterSlice";

export default function Toaster() {

  const dispatch = useDispatch();
  const toastSelector = useSelector((state:RootState) => state.toaster);

  useEffect(() => {

      if(!toastSelector.show) return;

      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);

      return () => clearTimeout(timer);

  },[toastSelector.show]);

  if (!toastSelector.show) return null;


  return (
    <div className="toast toast-end toast-bottom z-50">
      <div className={`alert ${toastSelector.clsName}`}>
        <span>{toastSelector.message}</span>
      </div>
    </div>
  );
}