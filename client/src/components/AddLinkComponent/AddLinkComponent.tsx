import React, { useEffect } from 'react';
import contactArrays from '../../util/constants/Contact';
import { ConfigProvider, Tag, Dropdown, Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../util/functions/ThemeFunction';
import StyleTotal from './cssAddLinkComponent';
import { closeModal, setHandleSubmit } from '../../redux/Slice/ModalHOCSlice';
import { DownOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { set } from 'lodash';
const AddLinkComponent = (Props: any) => {
  const dispatch = useDispatch();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const contactArray = [...contactArrays];

  const [addLinkArr, setAddLinkArr] = React.useState<any>([...Props.links]);

  const [save, setSave] = React.useState<any>(false);

  let addLinkArrTemp = [...addLinkArr];

  const handleSubmit = () => {
    Props.callback(addLinkArr);
  };
  const handleDropClick = (e: any, index: any) => {
    addLinkArrTemp[index].key = e.key;
    setAddLinkArr(addLinkArrTemp);
  };

  const handleDelete = (index: any) => {
    addLinkArrTemp.splice(index, 1);
    setAddLinkArr(addLinkArrTemp);
  };

  const isValidLink = (link: string): boolean => {
    try {
      new URL(link);
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    dispatch(setHandleSubmit(handleSubmit));
  }, [save]);

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <div className="flex flex-col">
          {addLinkArrTemp.map((item: any, index: any) => (
            <div className="flex flex-row items-center mb-2">
              <Dropdown
                menu={{
                  items: contactArray,
                  onClick: (e) => {
                    handleDropClick(e, index);
                  },
                }}
                trigger={['click']}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Button
                    size="large"
                    style={{
                      maxWidth: 200,
                      width: 100,
                      fontWeight: 600,
                      fontSize: 16,
                      color: themeColorSet.colorText1,
                    }}
                  >
                    {contactArray[parseInt(item.key)].svg}
                    <DownOutlined style={{}} />
                  </Button>
                </a>
              </Dropdown>
              <Input
                key={Math.random()}
                className="w-full ml-2 pl-2 inputlink"
                placeholder="eg. https://example.com"
                defaultValue={item?.link}
                inputMode="url"
                onChange={(e) => {
                  addLinkArrTemp[index].link = e.target.value;
                  if (isValidLink(e.target.value)) {
                    setAddLinkArr(addLinkArrTemp);
                  }
                }}
                style={{
                  height: 38,
                  backgroundColor: themeColorSet.colorBg2,
                  border: '1px solid',
                  borderColor: themeColorSet.colorBg4,
                  color: themeColorSet.colorText1,
                  borderRadius: 8,
                }}
              />
              <Button
                className="icon-trash ml-3"
                style={{ border: 'none' }}
                onClick={() => {
                  handleDelete?.(index);
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} className="w-5 h-5" />
              </Button>
            </div>
          ))}
          <Button
            className="mb-2"
            onClick={() => {
              setAddLinkArr([...addLinkArr, { key: '0', link: '' }]);
              addLinkArrTemp = [...addLinkArr, { key: '0', link: '' }];
            }}
          >
            Add
          </Button>
          <Button
            className="mb-2"
            onClick={() => {
              dispatch(closeModal(setSave(true)));
            }}
            style={{
              backgroundColor: themeColorSet.colorBg4,
              color: themeColorSet.colorText1,
            }}
          >
            UPDATE
          </Button>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default AddLinkComponent;
