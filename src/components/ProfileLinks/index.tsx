import React from 'react';
import clsx  from 'clsx';
import {
  FaGithub,
  FaFacebook,
  FaTwitter,
  FaLinkedinIn,
  FaRegEnvelope,
  FaStackOverflow,
} from 'react-icons/fa';
import ScreenConfig from '../../config/screen';
import { link } from 'fs';

interface Props {
  className?: string;
}

const ProfileLinks: React.FC<Props> = props => {

  const links = [
    {
      link:     'mailto:m.eshanized@gmail.com',
      icon:     FaRegEnvelope,
      label:    'Mail',
      useTitle: 'Leave an Email',
    },
    {
      link:  'https://github.com/eshanized',
      icon:  FaGithub,
      label: 'GitHub',
      // useTitle: 'Github',
    },
    {
      link: 'https://facebook.com/eshanized/',
      icon: FaFacebook,
      label: 'Facebook',
      // useTitle: 'Facebook',
    },
    {
      link:     'https://stackoverflow.com/users/5646942/john-zenith/',
      icon:     FaStackOverflow,
      label:    'Stack Overflow',
      useTitle: 'StackOverflow/john-zenith',
    },
    {
      link:  'https://twitter.com/eshanized',
      icon:  FaTwitter,
      label: 'Twitter',
      // useTitle: 'Twitter',
    },
    {
      link:     'https://www.linkedin.com/in/eshanized/',
      icon:     FaLinkedinIn,
      label:    'LinkedIn',
      useTitle: 'LinkedIn/john-zenith',
      hidden: false,
    },
  ];

  const renderLinks = links.filter(link => !link.hidden).map(link => {
    const isMail = 'Mail' === link.label;
    const rel    = isMail ? {} : { rel: 'noreferrer', target: '_blank' };
    
    return (
      <a
        key={link.label}
        className="w-full flex font-sans dark:text-textColorDark text-sm mt-[10px]  hover:!text-textColorEmphasis hover:underline transition-all"
        href={link.link}
        {...rel}
      >
        <span className="flex items-center w-[22px] !text-headerTextColor profileLinkText">
          <link.icon size={14} />
        </span>
        {link?.useTitle || link.link}
      </a>
    );
  });

  return (
    <div
      className={clsx(
        'flex mt-4 w-full flex-col items-center',
        ScreenConfig.mobile.alignLeft ? '' : 'max-w-[389px]',
        props?.className || ''
      )}
    >
      {renderLinks}
    </div>
  );
};

export default ProfileLinks;