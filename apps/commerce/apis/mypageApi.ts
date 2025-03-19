import { AxiosResponse } from 'axios';
import { axiosInstance } from './api';
import { MyPageUrl } from './urls';
import { MyPageMain } from 'type/api/mypage';

const MyPageAPI = {
  getMyPageMainInfo: () =>
    axiosInstance
      .get<AxiosResponse<MyPageMain>>(MyPageUrl.getMyPage)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      }),
};

export default MyPageAPI;
