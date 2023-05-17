import React, { useEffect } from 'react';
import contactArrays from '../../util/constants/Contact';
import { ConfigProvider, Tag, Dropdown, Button, Input, Avatar, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../util/functions/ThemeFunction';
import StyleTotal from './cssAddLinkComponent';
import { closeModal, setHandleSubmit } from '../../redux/Slice/ModalHOCSlice';
import { DownOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPlus, faInfo } from '@fortawesome/free-solid-svg-icons';
import { forEach, set } from 'lodash';
const AddLinkComponent = (Props: any) => {
  const dispatch = useDispatch();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const contactArray = [...contactArrays];

  const [addLinkArr, setAddLinkArr] = React.useState([...Props.links]);

  const [addTooltips, setAddTooltips] = React.useState(false);

  const [save, setSave] = React.useState<boolean>(false);

  // let addLinkArrTemp = [...addLinkArr];
  let addLinkArrTemp = addLinkArr.map((obj) => ({ ...obj }));

  // console.log(addLinkArrTemp);

  const handleSubmit = () => {
    Props.callback(addLinkArr);
  };
  const handleDropClick = (e: any, index: any) => {
    addLinkArrTemp[index].key = e.key;
    switch (e.key) {
      case '0':
        addLinkArrTemp[index].tooltip = contactArray[0].label;
        break;
      case '1':
        addLinkArrTemp[index].tooltip = contactArray[1].label;
        break;
      case '2':
        addLinkArrTemp[index].tooltip = contactArray[2].label;
        break;
      case '3':
        addLinkArrTemp[index].tooltip = contactArray[3].label;
        break;
      case '4':
        addLinkArrTemp[index].tooltip = contactArray[4].label;
        break;
    }
    console.log(addLinkArrTemp[index].tooltip);
    setAddLinkArr(addLinkArrTemp);
  };

  const handleDelete = (index: any) => {
    addLinkArrTemp.splice(index, 1);
    setAddLinkArr(addLinkArrTemp);
  };

  const handleEnterLink = (e: any, index: any) => {
    if (isValidLink(e.target.value)) {
      addLinkArrTemp[index].link = e.target.value;
      setAddLinkArr(addLinkArrTemp);
    }
  };

  const isValidLink = (link: string): boolean => {
    try {
      new URL(link);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleClickSubmit = () => {
    addLinkArrTemp = addLinkArrTemp.filter((item: any) => isValidLink(item.link));
  };

  function handleEditTooltip(index: any) {
    setAddTooltips(!addTooltips);
  }

  useEffect(() => {
    setSave(false);
    handleSubmit();
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
                    className="flex items-center"
                    size="large"
                    style={{
                      maxWidth: 200,
                      width: 100,
                      fontWeight: 600,
                      fontSize: 16,
                      color: themeColorSet.colorText1,
                    }}
                  >
                    <Avatar className="item" icon={contactArray[parseInt(item.key)].icon} />
                    <DownOutlined style={{}} />
                  </Button>
                </a>
              </Dropdown>
              <Input
                key={index}
                className="w-full ml-2 pl-2 inputlink"
                placeholder="eg. https://example.com"
                defaultValue={addLinkArr[index]?.link}
                inputMode="url"
                onChange={(e) => {
                  handleEnterLink(e, index);
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

              <Input
                key={index}
                className={addTooltips ? 'w-full ml-2 pl-2 inputlink' : 'w-full ml-2 pl-2 inputlink hidden'}
                inputMode="text"
                defaultValue={addLinkArr[index]?.tooltip}
                onChange={(e) => {
                  addLinkArrTemp[index].tooltip = e.target.value;
                  // setAddLinkArr(addLinkArrTemp);
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

              <Tooltip title="Click to edit tooltip">
                <Button
                  className="icon-edit-tooltip ml-3"
                  shape="circle"
                  style={{ border: 'none', backgroundColor: themeColorSet.colorBg3 }}
                  onClick={() => {
                    handleEditTooltip(index);
                  }}
                >
                  <FontAwesomeIcon icon={faInfo} className="w-4 h-4" />
                </Button>
              </Tooltip>
              <Tooltip title="Remove" style={{ transition: 'all 1.5s' }}>
                <Button
                  className="icon-trash"
                  style={{ border: 'none' }}
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  <FontAwesomeIcon icon={faTrashCan} className="w-5 h-5" />
                </Button>
              </Tooltip>
            </div>
          ))}
          <Button
            className="mb-2"
            onClick={() => {
              setAddLinkArr([...addLinkArr, { key: '0', tooltip: 'Facebook', link: '' }]);
              addLinkArrTemp = [...addLinkArr, { key: '0', tooltip: 'Facebook', link: '' }];
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add
          </Button>
          <Button
            className="mb-2"
            onClick={() => {
              handleClickSubmit();
              setAddLinkArr(addLinkArrTemp);
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
