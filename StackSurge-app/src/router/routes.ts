import { Home } from "../pages/Home";
import { AboutUs } from "../pages/AboutUs";
import { SignUp } from "../pages/SignUp";
import { Login } from "../pages/Login";
import { Events } from "../pages/Events";
import { EventDetails } from "../pages/EventDetails";
import { Profile } from "../pages/Profile";

export enum AppPath {
  Home = "/",
  AboutUs = "/about-us",
  SignUp = "/sign-up",
  Login = "/login",
  Events = "/events",
  EventDetails = "/events/:eventId",
  Profile = "/profile",
}

export type AppRoute = {
  title: string;
  path: AppPath;
  Component: () => JSX.Element;
};

export const AUTH_ROUTES: AppRoute[] = [
  {
    title: "Sign Up",
    path: AppPath.SignUp,
    Component: SignUp,
  },
  {
    title: "Login",
    path: AppPath.Login,
    Component: Login,
  },
];

export const PUBLIC_ROUTES: AppRoute[] = [
  {
    title: "Home",
    path: AppPath.Home,
    Component: Home,
  },
  {
    title: "About Us",
    path: AppPath.AboutUs,
    Component: AboutUs,
  }
];

export const PRIVATE_ROUTES: AppRoute[] = [
  { title: "Events",
    path: AppPath.Events,
    Component: Events,
  },
  {
    title: "Event Details",
    path: AppPath.EventDetails,
    Component: EventDetails,
  },
  {
    title: "Profile",
    path: AppPath.Profile,
    Component: Profile,
  }

];
