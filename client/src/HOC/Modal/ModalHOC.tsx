import { ConfigProvider } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StyleTotal from "./cssModalHOC";
import { getTheme } from "../../util/functions/ThemeFunction";
import { Button, Modal, Space } from "antd";
import { closeModal } from "../../redux/Slice/ModalHOCSlice";

const ModalHOC = () => {
  const dispatch = useDispatch();
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  // Hàm xử lý Modal
  const { visible, ComponentContentModal, footer, title } = useSelector(
    (state: any) => state.modalHOCReducer
  );

  const onClose = () => {
    dispatch(closeModal({}));
  };
  console.log("title", title);

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <div>
          <Modal
            title={title}
            width={720}
            onCancel={onClose}
            open={visible}
            footer={footer}
          >
            {ComponentContentModal}
          </Modal>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default ModalHOC;