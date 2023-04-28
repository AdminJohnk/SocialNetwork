import React, { useEffect } from "react";
import descArray from "../../util/constants/Description";
import { ConfigProvider, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "../../util/functions/ThemeFunction";
import StyleTotal from "./cssAddTagComponent";

const AddTagComponent = () => {

    const dispatch = useDispatch();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const addTagArr: any = [];

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <div className="flex flex-wrap">
          {descArray.map((item, index) => (
            <span
              key={index}
              className="itemAddTag mx-2 my-2 px-4 py-2"
              onClick={(e) => {
                if (e.currentTarget.classList.contains("active")) {
                  addTagArr.splice(addTagArr.indexOf(item.title), 1);
                  e.currentTarget.classList.remove("active");
                  return;
                } else {
                  addTagArr.push(item.title);
                  e.currentTarget.classList.add("active");
                  return;
                }
              }}
            >
              <span className="mr-2">{item.svg}</span>
              <span>{item.title}</span>
            </span>
          ))}
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default AddTagComponent;
