import  { useState, useEffect, FC, memo } from 'react';
import { useSmoothScroll } from 'hooks/useSmoothScroll';
import { useAuthUser } from '@/hooks/useAuthUser';
import { Skeleton } from '@mui/material';
import { formatTime } from '@/utils/formatTime';
import { getUserInfo } from '@/utils/getUserInfo';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Message } from '@/types/Message';

import Avatar from './avatar';
import InfoMessage from './infoMessage';

import styles from '@/styles/components/ChatMessage.module.scss';
import Image from 'next/image';

type Info = {
  displayName: string;
  photoURL: string | null;
};

const ChatMessage: FC<Message> = memo(function ChatMessage({
  from,
  to,
  createdAt,
  id,
  message,
  info,
  status,
  displayName,
  isLastMessage,
  image,
}) {
  const { authUser } = useAuthUser();
  const [userInfo, setUserInfo] = useState<Info>({
    displayName: '',
    photoURL: '',
  });
  const { chatRef, smoothScroll } = useSmoothScroll(isLastMessage);

  useEffect(() => {
    smoothScroll(chatRef);
  }, [chatRef, smoothScroll]);
  useEffect(() => {
    getUserInfo(from).then((user) => {
      if (user) {
        setUserInfo({
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        setUserInfo({
          displayName: 'Unknown',
          photoURL: null,
        });
      }
    });
  }, [from]);

  return (
    <>
      {info ? (
        <InfoMessage
          status={status!}
          to={to!}
          from={from}
          isLastMessage={isLastMessage}
        />
      ) : from === authUser?.uid ? (
        <li className={[styles.message, styles.own].join(' ')} ref={chatRef}>
          {
            message !== "" && (
            <div className={styles.text}>
              <p className={styles.bubble}>{message}</p>
              {createdAt !== null && (
                <p className={styles.time}>{formatTime(createdAt)}</p>
              )}
            </div>
            )
          }
          {image && (
            <div className={styles.chatImage}>
              <Image
                src={image}
                alt=""
                width={200}
                height={150}
                priority={true}
                style={{objectFit: "cover"}}
              />
              {createdAt !== null && (
              <p className={styles.time}>{formatTime(createdAt)}</p>
              )}
            </div>
          )}
        </li>
      ) : (
        <li
          className={[styles.message, styles.partner].join(' ')}
          ref={chatRef}
        >
          <div className={styles.profile}>
            {userInfo.photoURL ? (
              <Avatar size={40} storageRef={userInfo.photoURL} chat />
            ) : (
              <AccountCircleIcon sx={{ width: '40px', height: '40px' }} />
            )}
            <p>
              {userInfo.displayName !== undefined
                ? userInfo.displayName
                : 'Unknown'}
            </p>
          </div>
          {
            message !== "" && (
            <div className={styles.text}>
              <p className={styles.bubble}>{message}</p>
              {createdAt !== null ? (
              <p className={styles.time}>{formatTime(createdAt)}</p>
              ) : (
              <Skeleton variant="text" width={40} height={24} />
              )}
            </div>
            )
          }
          {image && (
            <div className={styles.chatImage}>
              <Image
                src={image}
                alt=""
                width={250}
                height={150}
                priority={true}
                style={{objectFit: "cover"}}
              />
              {createdAt !== null && (
                <p className={styles.time}>{formatTime(createdAt)}</p>
              )}
            </div>
          )}
        </li>
      )}
    </>
  );
});

export default ChatMessage;
