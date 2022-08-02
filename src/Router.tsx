import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading/Loading";

const Auth = lazy(() => import("./pages/Auth"));

export default function Router() {
  const loading = () => <Loading />;

  return (
    <Suspense fallback={loading()}>
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    </Suspense>
  );
}
