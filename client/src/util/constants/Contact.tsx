import { icon } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faTwitter, faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const contactArrays = [
  {
    key: '0',
    label: 'Facebook',
    icon: <FontAwesomeIcon icon={icon(faFacebookF)} />,
  },
  {
    key: '1',
    label: 'Github',
    icon: <FontAwesomeIcon icon={icon(faGithub)} />,
  },
  {
    key: '2',
    label: 'Twitter',
    icon: <FontAwesomeIcon icon={icon(faTwitter)} />,
  },
  {
    key: '3',
    label: 'Instagram',
    icon: <FontAwesomeIcon icon={icon(faInstagram)} />,
  },
  {
    key: '4',
    label: 'Linkedin',
    icon: <FontAwesomeIcon icon={icon(faLinkedin)} />,
  },
];
export default contactArrays;
