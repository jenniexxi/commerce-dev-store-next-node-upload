'use client';
import { useEffect, useRef } from 'react';

import axios from 'axios';
import { useRRoundPay } from '@ui/hooks';
import { ActionType } from '@ui/hooks/useRRoundPay';

type Props = {
  userActionType: ActionType;
  encDeviceSerial: string;
  encUserId: string;
  token: string;
  headersList: Record<string, string>;
};

const RequestPin = ({ userActionType, encDeviceSerial, encUserId, token, headersList }: Props) => {
  const shopId = 'rrpayg1t';
  const isInitialized = useRef(false);

  const { initialize, authenticate } = useRRoundPay();

  useEffect(() => {
    const initSDK = async () => {
      try {
        // API에서 shopId 가져오기

        // SDK 초기화
        await initialize({
          shopId: shopId,
          mode: 'development',
        });

        isInitialized.current = true;
        if (encDeviceSerial && encUserId && userActionType) {
          getUserToken();
        }
      } catch (err) {
        console.error('SDK 초기화 실패:', err);
      }
    };

    initSDK();
  }, [initialize, encDeviceSerial, encUserId, userActionType]);

  const getUserToken = async () => {
    axios
      .post(
        'https://rr-dev-api.hectoinnovation.co.kr/account/authclient/v1/pin/rrpay/token',
        {
          // 요청 바디 데이터
          encDeviceSerial,
          encUserId,
        },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Basic cnJvdW5kY2xpZW50MTpycm91bmRjbGllbnQxc2VjcmV0`,
          },
        },
      )
      .then((response) => {
        // 성공 처리

        authenticate(response.data.pinLoginToken, userActionType).then((result) => {
          alert(`userActionType : ${userActionType}\n
            resultCd:  ${result}\n
            `);
          switch (userActionType) {
            case 'requestSetPin':
              //로그인 설정 UI 호출

              //로그인 설정 성공, 실패 시 응답 결과 전달
              if (result.resCd === '0') {
                //성공
              } else if (result.resCd === '-1') {
                //로그인 비밀번호 잠김 (5회 이상 불일치)
              } else if (result.resCd === '-2') {
                //로그인 설정 창 닫기
              } else if (result.resCd === '-4') {
                //라운드 회원가입 정보와 일치 하지 않음
              }

              break;
            case 'requestPin':
              //로그인 인증 성공, 실패 시 응답 결과 전달
              if (result.resCd === '0') {
                //성공
              } else if (result.resCd === '-1') {
                //로그인 비밀번호 잠김 (5회 이상 불일치)
              } else if (result.resCd === '-2') {
                //로그인 인증 창 닫기
              } else if (result.resCd === '-3') {
                //본인인증으로 로그인 클릭
              }

              break;
            case 'requestChangePin':
              //로그인 비밀번호 변경 성공, 실패 시 응답 결과 전달
              if (result.resCd === '0') {
                //로그인 비밀번호 변경 성공
              } else if (result.resCd === '-2') {
                //로그인 비밀번호 변경 닫기
              }

              break;
            case 'requestInitPin':
              if (result.resCd === '0') {
                //로그인 재설정 변경 성공
              } else if (result.resCd === '-2') {
                //로그인 재설정 변경 닫기
              }

              break;
            case 'requestFido':
              if (result.resCd === '0') {
                //로그인 생체 인증 설정 성공
              } else if (result.resCd === '-2') {
                //로그인 생체 인증 설정 닫기
              }

              break;
          }
        });
      });
  };
  return (
    <table>
      <tbody>
        {Object.entries(headersList).map(([key, value], index) => (
          <tr key={index}>
            <td style={{ fontSize: 16 }}>{key}</td>
            <td style={{ fontSize: 16 }}>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RequestPin;

// +BgTscf5I+FcbsD6uczeRZQLenEI/sa7LrvOZl0UF04HpHWX5YwXwe7GGZor1QP+FIdewqzOsfuKd04iddubvg
