import React, { useRef } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Navigationbar } from "./components/navbar";
import {
  AuthProvider,
  ProtectRouteAdmin,
  ProtectRouteLogin,
  SessionHandler,
} from "./functions/authentication";
import Posts from "./pages/posts";
import NotFound from "./pages/notfound";
import Post from "./pages/post";
import Hjemmeside from "./pages/hjemmeside";
import MyPosts from "./pages/mine_posts";
import NyPosts from "./pages/ny_post";
import Admin from "./pages/admin";
import Brukere from "./pages/admin/brukere";
import "./App.css";
import NavigationSidebar from "./components/sidebar";
import "./styling/sidebar.css";
import Footer from "./components/footer";
import { QueryClient, QueryClientProvider } from "react-query";
import Notifications from "./pages/notifications";
import Favourites from "./pages/favourites";
import ScrollToTop from "./functions/scroll";
import Profile from "./pages/profile";
import Category from "./pages/admin/category";

const queryClient = new QueryClient();

export default function App() {
  const scrollRef = useRef();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ScrollToTop scrollRef={scrollRef} />

          <AuthProvider>
            <SessionHandler />
            <Navigationbar />
            <NavigationSidebar />
            <div className="main-content" ref={scrollRef}>
              <Routes>
                <Route exact path="/" element={<Hjemmeside />} />
                <Route exact path="/hjemmeside" element={<Hjemmeside />} />
                <Route exact path="/posts" element={<Posts />} />
                <Route exact path="/posts/mine" element={<MyPosts />} />
                <Route
                  exact
                  path="/notifications"
                  element={<Notifications />}
                />
                <Route
                  exact
                  path="/posts/favourites"
                  element={<Favourites />}
                />
                <Route
                  exact
                  path="/posts/opprett"
                  element={
                    <ProtectRouteLogin>
                      <NyPosts />
                    </ProtectRouteLogin>
                  }
                />
                <Route path="/posts/id/:id" element={<Post />} />
                <Route path="/profile" element={<Profile />} />

                <Route
                  path="/admin"
                  element={
                    <ProtectRouteAdmin>
                      <Admin />
                    </ProtectRouteAdmin>
                  }
                />
                <Route
                  path="/admin/brukere"
                  element={
                    <ProtectRouteAdmin>
                      <Brukere />
                    </ProtectRouteAdmin>
                  }
                />
                <Route
                  path="/admin/category"
                  element={
                    <ProtectRouteAdmin>
                      <Category />
                    </ProtectRouteAdmin>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </div>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}
