import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { v4 as uuid } from "uuid";
import AuthWrapper from "./components/AuthWrapper/AuthWrapper";
import ErrorPage from "./components/ErrorPage";
import SideNavLayout from "./components/layouts/SideNavLayout/SideNavLayout";
// Screens
import Appointments from "./modules/Appointments/Appointments";
import LoginFormWrapper from "./modules/Login/LoginFormWrapper";
import UserListingWrapper from "./modules/User/screens/List/UserListingWrapper";
import InquiryListingWrapper from "./modules/inquiry/screens/List/InquiryListingWrapper";
import InquiryView from "./modules/inquiry/screens/View/InquiryView";
import AddUserFormWrapper from "./modules/CultureOfMarketing/screens/Add/AddUserFormWrapper";
// Import PageRoute Above

const PageRoutes = () => {
  const deviceId = localStorage.getItem("deviceId") || "";

  if (deviceId === "") {
    const uniqueId = uuid();
    localStorage.setItem("deviceId", uniqueId);
  }

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginFormWrapper />,
    },
    {
      path: "/",
      element: (
        <AuthWrapper>
          <SideNavLayout />
        </AuthWrapper>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "user",
          element: <UserListingWrapper />,
        },

        {
          path: "inquiry/",
          element: <InquiryListingWrapper />,
        },

        {
          path: "inquiry/:id",
          element: <InquiryView />,
        },
        {
          path: "appointments",
          element: <Appointments />,
        },
        {
          path: "culture-of-marketing",
          element: <AddUserFormWrapper />,
        },
        // Import PageRoute Wrapper Above
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default PageRoutes;
