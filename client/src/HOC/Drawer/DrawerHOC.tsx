import { ConfigProvider } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "../../util/functions/ThemeFunction";
import StyleTotal from "./cssDrawerHOC";
import { Button, Drawer, Space } from 'antd';
import { closeDrawer } from "../../redux/Slice/DrawerHOCSlice";

const DrawerHOC = () => {
    const dispatch = useDispatch();
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  // Hàm xử lý Drawer
  const { visible, ComponentContentDrawer, callBackSubmit, title } =
    useSelector((state: any) => state.drawerHOCReducer);

  const onClose = () => {
    dispatch(closeDrawer({})); 
  };

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <>
          <Drawer
            title={title}
            width={720}
            onClose={onClose}
            open={visible}
            bodyStyle={{
              paddingBottom: 80,
            }}
            footer={
              <div style={{ textAlign: "right" }}>
                <Space>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button onClick={callBackSubmit} type="primary">
                    Submit
                  </Button>
                </Space>
              </div>
            }
          >
            {ComponentContentDrawer}
          </Drawer>
        </>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default DrawerHOC;
