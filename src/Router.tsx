import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import Nav from "./components/Nav/Nav";

const Auth = lazy(() => import("./pages/Auth"));
const Register = lazy(() => import("./pages/Register"));
const Main = lazy(() => import("./pages/Main"));

export default function Router() {
  const loading = () => <Loading />;

  return (
    <Suspense fallback={loading()}>
      <Nav />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Suspense>
  );
}
