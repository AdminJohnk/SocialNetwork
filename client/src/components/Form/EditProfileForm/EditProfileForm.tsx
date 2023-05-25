import { ConfigProvider, Space, Tag, Avatar, Tooltip } from 'antd';
import React from 'react';
import StyleTotal from './cssEditProfileForm';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../../util/functions/ThemeFunction';
import { faFacebookF, faTwitter, faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { commonColor } from '../../../util/cssVariable/cssVariable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { openModal } from '../../../redux/Slice/ModalHOCSlice';
import AddTagComponent from '../../AddTagComponent/AddTagComponent';
import AddLinkComponent from '../../AddLinkComponent/AddLinkComponent';
import descArray from '../../../util/constants/Description';
import { UPDATE_USER_SAGA } from '../../../redux/actionSaga/UserActionSaga';
import { callBackSubmitDrawer } from '../../../redux/Slice/DrawerHOCSlice';
import { icon } from '@fortawesome/fontawesome-svg-core';

const EditProfileForm = () => {
  const dispatch = useDispatch();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const userInfo = useSelector((state: any) => state.postReducer.ownerInfo);

  const [tags, setTags] = React.useState(userInfo?.tags);

  const [links, setLinks] = React.useState<any>(userInfo?.contacts || []);

  const isHaveCover = true;

  const [firstname, setFirstName] = React.useState(userInfo?.firstname);

  const [lastname, setLastName] = React.useState(userInfo?.lastname);

  const openInNewTab = (url: any) => {
    window.open(url, '_blank', 'noreferrer');
  };

  const handleChangeFirstName = (e: any) => {
    setFirstName(e.target.value);
  };

  const handleChangeLastName = (e: any) => {
    setLastName(e.target.value);
  };

  const handleChangeTags = (tags: any) => {
    setTags(tags);
  };

  const handleChangeLinks = (links: any) => {
    setLinks(links);
  };

  const onSubmit = () => {
    dispatch(
      UPDATE_USER_SAGA({
        id: userInfo?.id,
        userUpdate: {
          contacts: links,
          tags: tags,
          firstname: firstname,
          lastname: lastname,
          username: lastname + ' ' + firstname,
        },
      }),
    );
  };

  React.useEffect(() => {
    dispatch(callBackSubmitDrawer(onSubmit));
  }, [tags, firstname, lastname, links]);

  const componentNoInfo = (title: String, description: String, buttonContent: String) => {
    return (
      <div className="componentNoInfo text-center px-16">
        <div className="title mb-3" style={{ fontSize: '1.1rem', fontWeight: 600 }}>
          {title}
        </div>
        <div className="tags" style={{ color: themeColorSet.colorText3 }}>
          {tags}
        </div>
        <button
          className="btnContent mt-4 px-4 py-2"
          style={{
            color: themeColorSet.colorText1,
            fontWeight: 600,
            backgroundColor: commonColor.colorBlue2,
          }}
        >
          {buttonContent}
        </button>
      </div>
    );
  };

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <div className="editProfileForm">
          <section className="coverSection">
            <div
              className="mainTitle mb-2"
              style={{
                color: themeColorSet.colorText1,
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              Update Profile Cover Image
            </div>
            <div className="subTitle mb-3" style={{color: themeColorSet.colorText2}}>Recommended dimensions 1500px x 400px (max. 4MB)</div>
            <div className="cover relative">
              <div
                className="coverImage w-full h-72 rounded-xl"
                style={{
                  backgroundImage: `url("${userInfo?.coverImage || `/images/ProfilePage/cover.jpg`}")`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              ></div>
              <Space className="coverButton absolute bottom-8 right-5">
                <button
                  className="btnChangeCover px-4 py-2"
                  style={{
                    backgroundColor: commonColor.colorBlue2,
                    fontWeight: 600,
                  }}
                >
                  Change Cover Image
                </button>
                <button
                  className="btnRemove px-4 py-2"
                  style={{
                    backgroundColor: commonColor.colorRed1,
                    fontWeight: 600,
                  }}
                >
                  Remove
                </button>
              </Space>
            </div>
          </section>
          <section className="avatar mt-3 flex items-center">
            <div className="avatarImage">
              <img
                src={userInfo?.userImage || '/images/TimeLinePage/avatar.jpg'}
                alt="avatar"
                style={{
                  width: '7rem',
                  height: '7rem',
                  borderRadius: '50%',
                }}
              />
            </div>
            <Space className="changeAvatar ml-3" direction="vertical">
              <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>Set profile photo</div>
              <button
                className="btnChange px-4 py-2"
                style={{
                  backgroundColor: commonColor.colorBlue2,
                  fontWeight: 600,
                }}
              >
                Change photo
              </button>
            </Space>
          </section>
          <section className="addLinks mt-3">
            {links?.map((item: any, index: any) => {
              switch (item.key) {
                case '0':
                  return (
                    <Tooltip title={item.tooltip}>
                      <Avatar
                        onClick={() => {
                          openInNewTab(item.link);
                        }}
                        className="item"
                        icon={<FontAwesomeIcon icon={icon(faFacebookF)} />}
                      />
                    </Tooltip>
                  );
                case '1':
                  return (
                    <Tooltip title={item.tooltip}>
                      <Avatar
                        onClick={() => {
                          openInNewTab(item.link);
                        }}
                        className="item"
                        icon={<FontAwesomeIcon icon={icon(faGithub)} />}
                      />
                    </Tooltip>
                  );
                case '2':
                  return (
                    <Tooltip title={item.tooltip}>
                      <Avatar
                        onClick={() => {
                          openInNewTab(item.link);
                        }}
                        className="item"
                        icon={<FontAwesomeIcon icon={icon(faTwitter)} />}
                      />
                    </Tooltip>
                  );
                case '3':
                  return (
                    <Tooltip title={item.tooltip}>
                      <Avatar
                        onClick={() => {
                          openInNewTab(item.link);
                        }}
                        className="item"
                        icon={<FontAwesomeIcon icon={icon(faInstagram)} />}
                      />
                    </Tooltip>
                  );
                case '4':
                  return (
                    <Tooltip title={item.tooltip}>
                      <Avatar
                        onClick={() => {
                          openInNewTab(item.link);
                        }}
                        className="item"
                        icon={<FontAwesomeIcon icon={icon(faLinkedin)} />}
                      />
                    </Tooltip>
                  );
                default:
                  return null;
              }
            })}
            <button
              className="addLinks mt-2 px-4 py-1 cursor-pointer"
              onClick={() => {
                dispatch(
                  openModal({
                    title: 'Update Social Links',
                    component: <AddLinkComponent key={Math.random()} callback={handleChangeLinks} links={links} />,
                    footer: false,
                  }),
                );
              }}
              style={{
                border: '1px solid',
                borderColor: themeColorSet.colorBg4,
              }}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add Links
            </button>
          </section>
          <section className="inputInformation mt-5">
            <div
              className="title mb-2"
              style={{
                color: themeColorSet.colorText1,
                fontWeight: 600,
                fontSize: '1.2rem',
              }}
            >
              Information
            </div>
            <div className="line1 flex justify-between items-center mb-5">
              <div className="firstName form__group field" style={{ width: '48%' }}>
                <input
                  defaultValue={userInfo?.firstname}
                  type="input"
                  className="form__field"
                  placeholder="First Name"
                  name="firstname"
                  id="firstname"
                  required
                  onChange={handleChangeFirstName}
                />
                <label htmlFor="name" className="form__label">
                  First Name
                </label>
              </div>
              <div className="LastName form__group field" style={{ width: '48%' }}>
                <input
                  defaultValue={userInfo?.lastname}
                  type="input"
                  className="form__field"
                  placeholder="Last Name"
                  name="lastname"
                  id="lastname"
                  required
                  onChange={handleChangeLastName}
                />
                <label htmlFor="name" className="form__label">
                  Last Name
                </label>
              </div>
            </div>
            <div className="line2 flex justify-between items-center">
              <div className="firstName form__group field" style={{ width: '48%' }}>
                <input
                  defaultValue="@nguyenhoanghai"
                  type="input"
                  className="form__field"
                  placeholder="User ID"
                  name="userID"
                  id="userID"
                  required
                />
                <label htmlFor="name" className="form__label">
                  User ID
                </label>
              </div>
              <div className="LastName form__group field" style={{ width: '48%' }}>
                <input
                  defaultValue="Ninh Hòa- Khánh Hòa - Việt Nam"
                  type="input"
                  className="form__field"
                  placeholder="Location"
                  name="name"
                  id="name"
                  required
                />
                <label htmlFor="name" className="form__label">
                  Location
                </label>
              </div>
            </div>
            <div className="line2"></div>
          </section>
          <section className="expertise mt-7">
            <div
              className="title mb-2"
              style={{
                color: themeColorSet.colorText1,
                fontWeight: 600,
                fontSize: '1.2rem',
              }}
            >
              Expertise
            </div>
            <div className="tags flex flex-wrap">
              {descArray.map((item, index) => {
                if (tags?.indexOf(item.title) !== -1) {
                  return (
                    <Tag
                      className="item mx-2 my-2 px-4 py-1"
                      key={index}
                      color={themeColorSet.colorBg1}
                      style={{
                        border: 'none',
                      }}
                    >
                      {item.svg} &nbsp;
                      {item.title}
                    </Tag>
                  );
                }
                return null;
              })}
              <button
                className="addTags mt-2 px-4 py-1 cursor-pointer"
                style={{
                  border: '1px solid',
                  borderColor: themeColorSet.colorBg4,
                }}
                onClick={() => {
                  dispatch(
                    openModal({
                      title: 'Add Tags',
                      component: <AddTagComponent key={Math.random()} callback={handleChangeTags} tags={tags} />,
                      footer: true,
                    }),
                  );
                }}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Tags
              </button>
            </div>
          </section>
          <section className="about mt-7">
            <div
              className="title mb-2"
              style={{
                color: themeColorSet.colorText1,
                fontWeight: 600,
                fontSize: '1.2rem',
              }}
            >
              About
            </div>
            {componentNoInfo(
              'Share something about yourself',
              'Use Markdown to share more about who you are with the developer community on Showwcase.',
              'Add About',
            )}
          </section>
          <section className="experiences mt-7">
            <div
              className="title mb-2"
              style={{
                color: themeColorSet.colorText1,
                fontWeight: 600,
                fontSize: '1.2rem',
              }}
            >
              Experiences
            </div>
            {componentNoInfo(
              'Share a timeline of your Positions',
              'Add your professional history so others know you’ve put your skills to good use.',
              'Add Positions',
            )}
          </section>
          <section className="techStack mt-7">
            <div
              className="title mb-2"
              style={{
                color: themeColorSet.colorText1,
                fontWeight: 600,
                fontSize: '1.2rem',
              }}
            >
              Tech Stack
            </div>
            {componentNoInfo(
              'Add your familiar Skills',
              'Showcase your familiar skills and technologies and label them by years of experience so others know what you like working with.',
              'Add Tech Stack',
            )}
          </section>
          <section className="repositories mt-7">
            <div
              className="title mb-2"
              style={{
                color: themeColorSet.colorText1,
                fontWeight: 600,
                fontSize: '1.2rem',
              }}
            >
              Repositories
            </div>
            {componentNoInfo(
              'Highlight your top Repositories',
              'Showwcase integrates with Github to help you pull your top repositories right into your profile. If you’ve got something to show, get it in!',
              'Feature Repositories',
            )}
          </section>
          <section className="memberOf mt-7">
            <div
              className="title mb-2"
              style={{
                color: themeColorSet.colorText1,
                fontWeight: 600,
                fontSize: '1.2rem',
              }}
            >
              Member of
            </div>
            {componentNoInfo(
              'You currently have no featured Communities',
              'Showcase your featured communities to be highlighted on your profile',
              'Feature Communities',
            )}
          </section>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default EditProfileForm;
