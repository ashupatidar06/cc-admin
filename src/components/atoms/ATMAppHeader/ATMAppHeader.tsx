import { IconLogout, IconMenu2 } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

type Props = {};

const ATMAppHeader = (props: Props) => {
  const { isNavBarExpanded } = useSelector(
    (state: RootState) => state.sideNavLayout
  );

  const dispatch = useDispatch<AppDispatch>();

  const { userData } = useSelector((state: RootState) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });

  const buttonRef = useRef<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (buttonRef.current && !buttonRef?.current?.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const togglePortal = (e: any) => {
    const buttonRect = e.currentTarget.getBoundingClientRect();

    setDropdownPosition({
      top: buttonRect.bottom + 4,
      right: document.body.getBoundingClientRect().width - buttonRect.right,
    });
    setDropdownOpen(!dropdownOpen);
  };

  const className =
    "flex items-center justify-between h-full px-4 border-b bg-white  ";
  return (
    <div className={className}>
      <div className="flex items-center gap-2 -ml-2">
        <div className="w-10 h-10 rounded-full bg-black flex  items-center justify-center overflow-hidden">
          <img
            src="/CCIcon.png"
            alt="logo"
            className="w-full h-full object-contain  "
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

      {/* User Profile */}
      <div className="relative">
        <div
          onClick={(e) => togglePortal(e)}
          className="size-[30px] bg-secondary-10 flex justify-center items-center text-white font-medium rounded-full text-xs capitalize cursor-pointer"
        >
          {userData?.userName?.[0]}
        </div>

        {dropdownOpen &&
          createPortal(
            <div
              style={{
                top: dropdownPosition.top,
                right: dropdownPosition.right,
              }}
              className="absolute bg-white border border-gray-200 rounded-md  w-[250px]"
            >
              <div className="flex items-center gap-2 p-2 capitalize bg-gray-100">
                <div className="size-[25px] bg-secondary-10 flex justify-center items-center text-white font-medium rounded text-xs capitalize">
                  {userData?.userName?.[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-700">
                    {userData?.userName}
                  </div>
                  <div className="text-[0.60rem] text-slate-600 font-medium">
                    {userData?.email}
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                {/* TODO: */}
                {/* <div className="flex items-center gap-2 p-2 text-xs font-medium text-slate-600">
                  <IconKey className="size-4" /> Change Password
                </div> */}
                <div
                  onClick={() => {
                    dispatch(resetState(""));
                    clearLocalStorage();
                    navigate("/login");
                    dispatch(setUserData(null));
                    dispatch(setIsLogin(false));
                    dispatch(setAccessToken(null));
                    dispatch(setRefreshToken(null));
                  }}
                  className="flex items-center gap-2 p-2 text-xs font-medium border-t cursor-pointer text-slate-600 hover:font-semibold"
                >
                  <IconLogout className="size-4" /> Sign Out
                </div>
              </div>
            </div>,
            document.body
          )}
      </div>
    </div>
  );
};

export default ATMAppHeader;
