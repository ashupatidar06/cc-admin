import {
  Icon,
  IconHome,
  IconUserCog,
  IconMessage2Question,
  IconArrowNarrowRight,
  IconUsersGroup,
  IconCalendarWeek,
  IconSwipe
  // IconCategoryFilled,
  // IconGoGame,
  // IconBrandFlickr,
  // IconInfinityOff,
  // IconTopologyRing,
  // IconCurrencyBaht,
  // IconLanguage,
  // IconFileTypeJpg,
  // IconAssembly,
} from "@tabler/icons-react";

import { PermissionType } from "./utils/authorization";
import { getPermittedNavigations } from "./utils/getPermittedNavigations";

export type GroupItemWithChildren = {
  title: string;
  icon: Icon;
  path?: never;
  searchParams?: never;
  children: GroupItem[];
  badgeContent?: string;
  permission?: PermissionType;
};

export type GroupItemWithPath = {
  title: string;
  icon: Icon;
  path: string;
  searchParams?: {
    [field: string]: string;
  };
  children?: never;
  badgeContent?: string;
  permission?: PermissionType;
};

export type GroupItem = GroupItemWithPath | GroupItemWithChildren;

export type NavigationItem = {
  groupLable: string;
  permissions?: PermissionType[];
  items: GroupItem[];
};

const navigation: (params?: {
  badgeData: { batches: string; courses: string };
}) => NavigationItem[] = (params) => {
  const navigations: NavigationItem[] = [
    {
      groupLable: "Dashboard",
      items: [
        // {
        //   title: "Dashboard",
        //   icon: IconHome,
        //   path: "",
        // },
        {
          title: "User",
          icon: IconUserCog,
          path: "user",
          searchParams: {
            page: "1",
            limit: "10",
          },
          // permission: "NAV_ADMIN_USER",
        },
        {
          title: "Inquiry",
          icon: IconMessage2Question,
          path: "inquiry",
          searchParams: {
            page: "1",
            limit: "10",
          },
          // permission: "NAV_ADMIN_USER",
        },
        {
          title: "Appointments",
          icon: IconCalendarWeek,
          path: "appointments",
        },
        {
          title: "Swipe Cards",
          icon: IconSwipe,
          path: "swipe-cards",
        },
        {
          title: "Culture of Marketing",
          icon: IconArrowNarrowRight,
          path: "culture-of-marketing",
        },
        {
          title: "Culture of Origin",
          icon: IconArrowNarrowRight,
          path: "culture-of-origin",
        },
        {
          title: "Motioncult",
          icon: IconArrowNarrowRight,
          path: "motion-cult",
        },
        {
          title: "Story",
          icon: IconArrowNarrowRight,
          path: "story",
        },
        {
          title: "Explore",
          icon: IconArrowNarrowRight,
          path: "explore",
        },
        {
          title: "About Us",
          icon: IconUsersGroup,
          path: "about-us",
        },
      ],
    },
    // {
    //   groupLable: "Cooming Soon Features!",
    //   items: [
    //     {
    //       title: "Boards",
    //       icon: IconCardboards,
    //       path: "boards",
    //       searchParams: {
    //         page: "1",
    //         limit: "10",
    //       },
    //     },
    //     {
    //       title: "Categories",
    //       icon: IconCategoryFilled,
    //       path: "categories",
    //       searchParams: {
    //         page: "1",
    //         limit: "10",
    //       },
    //     },
    //     {
    //       title: "Group Category",
    //       icon: IconGoGame,
    //       path: "group-category",
    //       searchParams: {
    //         page: "1",
    //         limit: "10",
    //       },
    //     },
    //     {
    //       title: "Facilities",
    //       icon: IconBrandFlickr,
    //       path: "facilities",
    //       searchParams: {
    //         page: "1",
    //         limit: "10",
    //       },
    //     },
    //     {
    //       title: "Facility Group",
    //       icon: IconInfinityOff,
    //       path: "facility-group",
    //       searchParams: {
    //         page: "1",
    //         limit: "10",
    //       },
    //     },
    //     {
    //       title: "Facility Typologies",
    //       icon: IconTopologyRing,
    //       path: "facility-typologies",
    //       searchParams: {
    //         page: "1",
    //         limit: "10",
    //       },
    //     },
    //     {
    //       title: "Currency",
    //       icon: IconCurrencyBaht,
    //       path: "currency",
    //       searchParams: {
    //         page: "1",
    //         limit: "10",
    //       },
    //     },
    //     {
    //       title: "Locations",
    //       icon: IconMapPinFilled,
    //       path: "currency",
    //       searchParams: {
    //         page: "1",
    //         limit: "10",
    //       },
    //     },
    //     {
    //       title: "Language",
    //       icon: IconLanguage,
    //       path: "language",
    //       searchParams: {
    //         page: "1",
    //         limit: "10",
    //       },
    //     },
    //     {
    //       title: "Image Type",
    //       icon: IconFileTypeJpg,
    //       path: "image-type",
    //       searchParams: {
    //         page: "1",
    //         limit: "10",
    //       },
    //     },
    //     {
    //       title: "Issue",
    //       icon: IconAssembly,
    //       path: "issue",
    //       searchParams: {
    //         page: "1",
    //         limit: "10",
    //       },
    //     },
    //   ],
    // },
  ];

  return getPermittedNavigations(navigations);
};

export default navigation;
