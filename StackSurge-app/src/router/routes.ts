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
  EventDetails = "/events/:id",
  Profile = "/profile",
}

type AppRoute = {
  title: string;
  path: AppPath;
  Component: () => JSX.Element;
};

export const ROUTES: AppRoute[] = [
  {
    title: "Home",
    path: AppPath.Home,
    Component: Home,
  },
  {
    title: "About Us",
    path: AppPath.AboutUs,
    Component: AboutUs,
  },
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
  {
    title: "Events",
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
  },
];
