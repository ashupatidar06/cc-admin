import { IconLogout, IconMenu2 } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsNavBarExpanded } from "../../../slices/SideNavLayoutSlice";
import { AppDispatch, RootState } from "../../../store";
import { clearLocalStorage } from "../../../utils/auth/authUtils";
import {
  resetState,
  setAccessToken,
  setIsLogin,
  setRefreshToken,
  setUserData,
} from "../../../slices/AuthSlice";
import ATMConfirmationDialog from "../../../components/atoms/ATMConfirmationDialog/ATMConfirmationDialog";

type Props = {};

const ATMAppHeader = (props: Props) => {
  const { isNavBarExpanded } = useSelector(
    (state: RootState) => state.sideNavLayout
  );

  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    dispatch(resetState(""));
    clearLocalStorage();
    navigate("/login");
    dispatch(setUserData(null));
    dispatch(setIsLogin(false));
    dispatch(setAccessToken(null));
    dispatch(setRefreshToken(null));
  };

  return (
    <>
      <div className="flex items-center justify-between h-full px-4 border-b bg-white">
        <div className="flex items-center gap-2 -ml-2">
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center overflow-hidden">
            <img
              src="/CCIcon.png"
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>

          <button
            type="button"
            onClick={() => dispatch(setIsNavBarExpanded(!isNavBarExpanded))}
            className={`text-primary ${isNavBarExpanded && "text-primary"}`}
          >
            <IconMenu2 />
          </button>
        </div>

        {/* User Profile and Logout Button */}
        <div className="flex items-center gap-4">
          {/* User Profile */}
          {/* <div className="size-[30px] bg-secondary-10 flex justify-center items-center text-white font-medium rounded-full text-xs capitalize">
            {userData?.userName?.[0]}
          </div> */}

          {/* Logout Button (Opens Confirmation Dialog) */}
          <div
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-2 p-2 text-xs font-medium cursor-pointer text-slate-600 hover:font-semibold"
          >
            <IconLogout className="size-4" /> Sign Out
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showLogoutConfirm && (
        <ATMConfirmationDialog
          type="INFO"
          title="Sign Out"
          message="Are you sure you want to sign out?"
          confirmationText="Yes, Sign Out"
          declineText="Cancel"
          onConfirm={(closeDialog, setIsLoading) => {
            setIsLoading(true);
            setTimeout(() => {
              handleLogout();
              setIsLoading(false);
              closeDialog();
            }, 1000);
          }}
          onDecline={() => setShowLogoutConfirm(false)}
          closeDialog={() => setShowLogoutConfirm(false)}
        />
      )}
    </>
  );
};

export default ATMAppHeader;
