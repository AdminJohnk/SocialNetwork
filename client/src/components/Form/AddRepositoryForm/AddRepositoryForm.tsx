import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTheme } from '../../../util/functions/ThemeFunction';
import { Checkbox, ConfigProvider, Space } from 'antd';
import StyleTotal from './cssAddRepositoryForm';
import { GetGitHubUrl } from '../../../util/functions/GetGithubUrl';
import { GET_REPOSITORY_SAGA } from '../../../redux/actionSaga/UserActionSaga';
import { Value } from 'react-quill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { TOKEN_GITHUB } from '../../../util/constants/SettingSystem';
import { closeModal } from '../../../redux/Slice/ModalHOCSlice';

interface ReposProps {
  linkRepos: String;
}

const AddRepositoryForm = (Props: ReposProps) => {
  const dispatch = useDispatch();
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const [access_token_github, setAccess_token_github] = useState(localStorage.getItem(TOKEN_GITHUB));

  const openPopup = () => {
    const width = 500; // Width of the pop-up window
    const height = 800; // Height of the pop-up window
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(GetGitHubUrl(), 'GithubAuth', `width=${width},height=${height},left=${left},top=${top}`);

    let userData:any = undefined;

    const handleMessage = (event: any) => {
      if (event.origin === 'http://localhost:7000') {
        userData = event.data;
        if (userData) {
          localStorage.setItem(TOKEN_GITHUB, userData.accessToken);
          setAccess_token_github(userData.accessToken);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    const pollOAuthStatus = setInterval(() => {
      if (popup?.closed) {
        clearInterval(pollOAuthStatus);
        window.removeEventListener('message', handleMessage);
        !userData && dispatch(closeModal());
      }
    }, 300);
  };

  useEffect(() => {
    if (Props.linkRepos && access_token_github) {
      dispatch(GET_REPOSITORY_SAGA(Props.linkRepos));
    } else {
      openPopup();
    }
  }, [access_token_github]);

  const { repos } = useSelector((state: any) => state.userReducer);

  const renderItemRepos = (item: any, index: number) => {
    return (
      <div
        className="repositoriesItem px-3 py-4"
        key={index}
        style={{
          border: `1px solid ${themeColorSet.colorBg4}`,
          borderTop: index === 0 ? `1px solid ${themeColorSet.colorBg4}` : 'none',
          height: '100px',
        }}
      >
        <Space className="left" direction="vertical">
          <span className="name" style={{ fontSize: '1rem', color: themeColorSet.colorText1, fontWeight: '600' }}>
            {item.name}
          </span>
          <div className="bottom items-center">
            <span className="mr-2">
              <span className="mr-2 text-xl">•</span>
              {item.language}
            </span>
            <span className="mr-1">
              {' '}
              <FontAwesomeIcon size="xs" icon={faStar} />
            </span>
            <span>{item.watchers_count}</span>
          </div>
        </Space>
        <div className="right">
          <Checkbox onChange={() => {}}></Checkbox>
        </div>
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
        <div className="addRepositories">
          {!Props.linkRepos || !access_token_github ? (
            <div className="flex justify-between items-center mb-10">
              <div className="Linkgithub form__group field" style={{ width: '70%' }}>
                <input
                  //   defaultValue={companyName}
                  pattern="[A-Za-z ]*"
                  type="input"
                  className="form__field"
                  placeholder="Link Github"
                  name="linkgithub"
                  id="linkgithub"
                  required
                  onChange={(e) => {}}
                  autoComplete="off"
                />
                <label htmlFor="name" className="form__label">
                  Link Github
                </label>
              </div>
              <div style={{ width: '20%' }}>
                <button className="connectButton mt-10 px-4 rounded-xl py-2" onClick={() => {}}>
                  Connect
                </button>
              </div>
            </div>
          ) : (
            // Nếu có link github thì hiển thị danh sách repos
            <div>
              <div className="title mt-5" style={{ fontSize: '1.1rem', color: themeColorSet.colorText1 }}>
                Select the repositories you want to feature
              </div>
              <div className="repositories mt-5 px-2 py-2">
                {repos.map((item: any, index: number) => {
                  return renderItemRepos(item, index);
                })}
              </div>
            </div>
          )}
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default AddRepositoryForm;
