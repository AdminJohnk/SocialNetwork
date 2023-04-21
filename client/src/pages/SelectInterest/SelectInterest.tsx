import { ConfigProvider } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { commonColor } from "../../util/cssVariable/cssVariable";
import { getTheme } from "../../util/functions/ThemeFunction";
import StyleTotal from "./cssSelectInterest";

const SelectInterest = () => {
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <div className="flex justify-center w-full h-full selectInterest">
          <div className="content w-1/2 h-1/2 mt-10">
            <div>
              <span
                className="mr-3"
                style={{ color: themeColorSet.colorText2 }}
              >
                Step 03:
              </span>
              <span style={{ color: themeColorSet.colorText3 }}>
                Select interest
              </span>
            </div>
            <div className="slide w-full flex justify-between mt-2">
              <span
                style={{
                  width: "19.4%",
                  height: "2px",
                  backgroundColor: commonColor.colorGreen1,
                  display: "inline-block",
                }}
              ></span>
              <span
                style={{
                  width: "19.4%",
                  height: "2px",
                  backgroundColor: commonColor.colorGreen1,
                  display: "inline-block",
                }}
              ></span>
              <span
                style={{
                  width: "19.4%",
                  height: "2px",
                  backgroundColor: commonColor.colorBlue1,
                  display: "inline-block",
                }}
              ></span>
              <span
                style={{
                  width: "19.4%",
                  height: "2px",
                  backgroundColor: commonColor.colorGreen1,
                  display: "inline-block",
                }}
              ></span>
              <span
                style={{
                  width: "19.4%",
                  height: "2px",
                  backgroundColor: commonColor.colorGreen1,
                  display: "inline-block",
                }}
              ></span>
            </div>
            <div
              className="textMax mt-4"
              style={{
                fontSize: "1.8rem",
                fontWeight: "600",
              }}
            >
              Select your interest
            </div>
            <div
              className="textMin mt-5"
              style={{
                fontSize: "1rem",
                color: themeColorSet.colorText3,
              }}
            >
              Choose at least 5 interest to get started
            </div>
          </div>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default SelectInterest;
