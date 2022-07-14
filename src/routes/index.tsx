import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomSuspense from "../web/components/CustomSuspense";

const Group = React.lazy(() => import("../web/pages/Group"));
const Event = React.lazy(() => import("../web/pages/Event"));
const Download = React.lazy(() => import("../web/pages/Download"));

const AppRouter: React.FC = (): JSX.Element => {
  return (
    <Routes>
      <Route
        path="/event/:id"
        element={
          <CustomSuspense>
            <Event />
          </CustomSuspense>
        }
      />

      <Route
        path="/group/:id"
        element={
          <CustomSuspense>
            <Group />
          </CustomSuspense>
        }
      />
      <Route
        path="/download"
        element={
          <CustomSuspense>
            <Download />
          </CustomSuspense>
        }
      />
      <Route path="/event/googleplay" element={<Event />} />
      <Route path="/event/appstore" element={<Event />} />
      <Route path="/group/googleplay" element={<Group />} />
      <Route path="/group/appstore" element={<Group />} />
      <Route path="/download/googleplay" element={<Download />} />
      <Route path="/download/appstore" element={<Download />} />
      {/* <Route path="/appstore/:id" element={<RedirectPage />} />
      <Route path="/googleplay/:id" element={<RedirectPage />} /> */}
      <Route
        path="/"
        element={
          <CustomSuspense>
            <Download />
          </CustomSuspense>
        }
      />
    </Routes>
  );
};

export default AppRouter;
