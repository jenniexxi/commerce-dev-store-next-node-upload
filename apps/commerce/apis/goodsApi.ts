import {
  DetailsResp,
  GoodsOptionResp,
  GoodsRelationVideoResp,
  GoodsRecommendedListResp,
  GoodsPriceResp,
  GoodsFeedbackAboveFourResp,
  GoodsStoreBestResp,
  GoodsAnnouncementResp,
  GoodsReturnExchangesResp,
  GoodsStoreInfoResp,
  GoodsFeedbackQuery,
  FeedbackListResp,
  GoodsQnasInquiryBodyGet,
  GetGoodsQnasResp,
  GoodsQnaInquiryBody,
  GoodsQnasInquiryMeResp,
  UpdateGoodsQnasResp,
  DeleteGoodsQnasResp,
} from 'type/api/goods';
import { APIResponse, axiosInstance } from './api';
import { GoodsDetailsUrl } from './urls';

const GoodsAPI = {
  getGoods: (goodsId: number): Promise<DetailsResp> => {
    return axiosInstance
      .get(GoodsDetailsUrl.goods(goodsId))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getGoodsOptions: (goodsId: number): Promise<GoodsOptionResp> => {
    return axiosInstance
      .get(GoodsDetailsUrl.goodsOptions(goodsId))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getGoodsRelationVideo: (goodsId: number): Promise<GoodsRelationVideoResp> => {
    return axiosInstance
      .get(GoodsDetailsUrl.goodsRelationVideo(goodsId))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getGoodsRecommended: (goodsId: number): Promise<GoodsRecommendedListResp> => {
    const url = GoodsDetailsUrl.goodsRecommended(goodsId);
    return axiosInstance
      .get(url)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getGoodsPrice: (goodsId: number): Promise<GoodsPriceResp> => {
    return axiosInstance
      .get(GoodsDetailsUrl.goodsPrice(goodsId))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getGoodsFeedbackAboveFour: (goodsId: number): Promise<GoodsFeedbackAboveFourResp> => {
    return axiosInstance
      .get(GoodsDetailsUrl.goodsFeedbackAboveFour(goodsId))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getGoodsStoreBest: (goodsId: number): Promise<GoodsStoreBestResp> => {
    return axiosInstance
      .get(GoodsDetailsUrl.goodsStoreBest(goodsId))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getGoodsAnnouncement: (goodsId: number): Promise<GoodsAnnouncementResp> => {
    return axiosInstance
      .get(GoodsDetailsUrl.goodsAnnouncement(goodsId))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getGoodsReturnExchanges: (goodsId: number): Promise<GoodsReturnExchangesResp> => {
    return axiosInstance
      .get(GoodsDetailsUrl.goodsReturnExchanges(goodsId))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getGoodsStoreInfo: (goodsId: number): Promise<GoodsStoreInfoResp> => {
    return axiosInstance
      .get(GoodsDetailsUrl.goodsStoreInfo(goodsId))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },

  getGoodsFeedback: (goodsId: number, query: GoodsFeedbackQuery): Promise<FeedbackListResp> => {
    const params: GoodsFeedbackQuery = {
      page: query.page,
      size: query.size,
    };

    if (query.feedbackSortTypeEnum) {
      params.feedbackSortTypeEnum = query.feedbackSortTypeEnum;
    }

    if (query.feedbackTypeEnum) {
      params.feedbackTypeEnum = query.feedbackTypeEnum;
    }
    const queryString = new URLSearchParams(params);
    return axiosInstance
      .get(GoodsDetailsUrl.goodsFeedbackList(goodsId) + '?' + queryString.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getGoodsCheckRestock: (goodsId: number): Promise<void> => {
    return axiosInstance
      .get(GoodsDetailsUrl.goodsCheckRestock(goodsId))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getGoodsQnas: (goodsId: number, query: GoodsQnasInquiryBodyGet): Promise<GetGoodsQnasResp> => {
    const queryParam = new URLSearchParams();

    queryParam.set('page', query.page.toString());
    queryParam.set('size', query.size.toString());

    if (query.myGoodsQnaYn !== undefined) {
      queryParam.set('myGoodsQnaYn', String(query.myGoodsQnaYn));
    }

    if (query.bbsTypeId) {
      queryParam.set('bbsTypeId', query.bbsTypeId);
    }

    if (query.openYn !== undefined) {
      queryParam.set('openYn', String(query.openYn));
    }

    if (query.statusEnum) {
      queryParam.set('statusEnum', query.statusEnum);
    }

    return axiosInstance
      .get(GoodsDetailsUrl.getGoodsQnas(goodsId) + '?' + queryParam.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },

  postGoodsQna: ({ goodsId, body }: { goodsId: number; body: GoodsQnaInquiryBody }): Promise<APIResponse> => {
    return axiosInstance
      .post(GoodsDetailsUrl.postGoodsQnas(goodsId), body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getGoodsQnasMeInquiry: ({
    page,
    size,
    bbsTypeId,
    startDate,
    endDate,
    answerHoldYn,
    answerDoneYn,
  }: {
    page: number;
    size: number;
    bbsTypeId?: number;
    startDate: string;
    endDate: string;
    answerHoldYn?: boolean;
    answerDoneYn?: boolean;
  }): Promise<GoodsQnasInquiryMeResp> => {
    const query = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      ...(bbsTypeId && { bbsTypeId: bbsTypeId.toString() }),
      startDate,
      endDate,
      ...(answerHoldYn !== undefined && { answerHoldYn: answerHoldYn.toString() }),
      ...(answerDoneYn !== undefined && { answerDoneYn: answerDoneYn.toString() }),
    });

    return axiosInstance
      .get(GoodsDetailsUrl.getGoodsQnasMe + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  updateGoodsQna: (goodsQnaIdEncrypt: string, body: GoodsQnaInquiryBody): Promise<UpdateGoodsQnasResp> => {
    const url = GoodsDetailsUrl.putGoodsQnasUpdate(goodsQnaIdEncrypt);
    return axiosInstance
      .put(url, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  deleteGoodsQnas: (goodsQnaIdEncrypt: string): Promise<DeleteGoodsQnasResp> => {
    const url = GoodsDetailsUrl.deleteGoodsQnas(goodsQnaIdEncrypt);
    return axiosInstance
      .delete(url)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
};

export default GoodsAPI;
