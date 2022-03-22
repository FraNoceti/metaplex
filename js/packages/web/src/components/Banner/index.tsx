import React from 'react';
import { Typography, Button, Alert } from 'antd';
import { TwitterOutlined } from '@ant-design/icons';
import { StorefrontSocialInfo, useMeta } from '@oyster/common';
import { useWallet } from '@oyster/common';
const { Text } = Typography;
import { Link } from 'react-router-dom';

export const Banner = ({
  src,
  headingText,
  subHeadingText,
  children,
  logo,
  twitterVerification,
  ownerAddress,
}: {
  src?: string;
  headingText: string;
  subHeadingText?: string;
  children?: React.ReactNode;
  logo: string;
  twitterVerification?: string;
  social?: StorefrontSocialInfo;
  ownerAddress?: string;
}) => {
  const wallet = useWallet();

  const { whitelistedCreatorsByCreator, store } = useMeta();

  const creators = whitelistedCreatorsByCreator[ownerAddress];

  console.log('creators', {
    whitelistedCreatorsByCreator,
    store,
    creators,
    ownerAddress,
  });

  return (
    <div id="metaplex-banner">
      {src ? (
        <img id="metaplex-banner-backdrop" src={src} />
      ) : (
        <div className="metaplex-margin-top-12"></div>
      )}

      <div className="logo-wrapper">
        <Link to="/" id="metaplex-header-logo">
          <img src={logo || ''} />
        </Link>
      </div>

      <div id="metaplex-banner-hero">
        <h1>{headingText}</h1>
        {subHeadingText && <Text>{subHeadingText}</Text>}
        <div className="flex items-center justify-between">
          {twitterVerification && (
            <a
              href={'https://twitter.com/' + twitterVerification}
              target="_blank"
              rel="noreferrer"
              className="twitter-button !m-0"
            >
              {' '}
              <Button shape="round" icon={<TwitterOutlined />}>
                @{twitterVerification}
              </Button>
            </a>
          )}
          {twitterVerification && (
            <svg
              width="1"
              height="24"
              viewBox="0 0 1 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="0.5" y1="2.18557e-08" x2="0.499999" y2="24" stroke="#616F72" />
            </svg>
          )}
          <div className="flex items-center">
            <span className="font-sans mr-4">Created by</span>
            <div className="flex -space-x-2 overflow-hidden">
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
          </div>
        </div>

        {twitterVerification ? (
          <a
            href={'https://twitter.com/' + twitterVerification}
            target="_blank"
            rel="noreferrer"
            className="twitter-button"
          >
            {' '}
            <Button shape="round" icon={<TwitterOutlined />}>
              @{twitterVerification}
            </Button>
          </a>
        ) : (
          wallet.connected &&
          ownerAddress === wallet.publicKey?.toBase58() && (
            <div className="metaplex-margin-top-8">
              <Alert
                className="metaplex-flex-align-items-center metaplex-align-left"
                message="Connect your Twitter account"
                description={
                  <>
                    Help protect collectors by connecting your store to a Twitter page on{' '}
                    <a
                      href="https://naming.bonfida.org/#/twitter-registration"
                      rel="noreferrer"
                      target="_blank"
                    >
                      Bonfida
                    </a>
                  </>
                }
                icon={<TwitterOutlined />}
                showIcon
              />
            </div>
          )
        )}
      </div>
      {children}
    </div>
  );
};
