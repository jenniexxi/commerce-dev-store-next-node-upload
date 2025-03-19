export const apiErrorHandler = (error: Error) => {
  if (error) {
    // 커스텀 에러 처리 로직
    // TODO: 공통에러 처리 정의 필요
    switch (error) {
      // case 400:
      //   // toast.error(`(${error.statusCode}) ${error.message}`);
      //   break;
      // case 401:
      //   // openDialog({
      //   //   type: 'alert',
      //   //   message: (
      //   //     <>
      //   //       인증이 필요합니다.
      //   //       <br />
      //   //       인증 페이지로 이동합니다.
      //   //     </>
      //   //   ),
      //   //   onCallback: () => {
      //   //     if (typeof window !== 'undefined') {
      //   //       window.location.replace('/refreshToken');
      //   //     }
      //   //   },
      //   // });
      //   break;
      // case 403:
      //   // openDialog({
      //   //   type: 'alert',
      //   //   message: (
      //   //     <>
      //   //       접근 권한이 없습니다.
      //   //       <br />
      //   //       인증 페이지로 이동합니다.
      //   //     </>
      //   //   ),
      //   //   onCallback: () => {
      //   //     if (typeof window !== 'undefined') {
      //   //       window.location.replace('/refreshToken');
      //   //     }
      //   //   },
      //   // });
      //   break;
      // case 500:
      //   // openDialog({
      //   //   type: 'alert',
      //   //   message: (
      //   //     <>
      //   //       서버가 요청을 처리할 수 없습니다.
      //   //       <br />
      //   //       잠시 후 다시 시도해주세요.
      //   //     </>
      //   //   ),
      //   // });
      //   break;
      default:
        // 기타 에러 처리
        console.error(`알 수 없는 에러: ${error.message}`);
    }
  }
  // 에러를 다시 던져서 상위 컴포넌트에서 처리할 수 있게 합니다.
  // throw error;
};
