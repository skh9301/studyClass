import { useRecoilState } from "recoil";
import { NoticeModalStyled } from "./styled";
import { modalState } from "../../../../stores/modalState";
import { FC, useEffect, useRef, useState } from "react";
import { loginInfoState } from "../../../../stores/userInfo";
import { useUserInfo } from "./../../../../hook/useUserInfo";
import axios, { AxiosResponse } from "axios";
import { ILoginInfo } from "../../../../models/interface/store/userInfo";
import { IDetailResponse, INoticeDetail, IPostResponse } from "../../../../models/interface/iNotice";
import { NoticeSearch } from "../NoticeSearch/NoticeSearch";
import { postNoticeApi } from "../../../../api/postNoticeApi";
import { Notice } from "../../../../api/api";

export interface INoticeModalProps {
  onSuccess: () => void;
  noticeSeq: number;
  setNoticeSeq: (noticeSeq?) => void;
}

export const NoticeModal: FC<INoticeModalProps> = ({ onSuccess, noticeSeq, setNoticeSeq }) => {
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const [useUserInfo] = useRecoilState<ILoginInfo>(loginInfoState);
  const [noticeDetail, setNoticeDetail] = useState<INoticeDetail>();
  const title = useRef<HTMLInputElement>();
  const context = useRef<HTMLInputElement>();

  useEffect(() => {
    noticeSeq && searchDetail();

    return () => {
      //컴포넌트가 닫히기 직전의 return
      noticeSeq && setNoticeSeq(undefined);
    }; // cleanUp 함수 컴퍼넌트가 실행되기 이전언마운트 되기전의 콜백함수
  }, []);

  const searchDetail = async () => {
    const detail = await postNoticeApi<IDetailResponse>(Notice.getDetail, { noticeSeq });

    if (detail) {
      setNoticeDetail(detail.detail);
    }
    // axios.post("/board/noticeDetailBody.do", { noticeSeq }).then((res: AxiosResponse<IDetailResponse>) => {
    //   setNoticeDetail(res.data.detail);
    // });
  };

  const handlerModal = () => {
    setModal(!modal);
  };

  const handlerSave = async () => {
    const param = {
      title: title.current.value,
      context: context.current.value,
      loginId: useUserInfo.loginId,
    };
    const save = await postNoticeApi<IPostResponse>(Notice.getSave, param);
    if (save.result === "success") {
      alert("성공했습니다.");
      onSuccess();
    } else if (save.result === "fail") {
      alert("실패했습니다.");
      onSuccess();
    }
    // axios.post("/board/noticeSaveBody.do", param).then((res: AxiosResponse<IPostResponse>) => {
    //   res.data.result === "success" && onSuccess();
    // });
    // 후처리 search는 main에 있기때문에 지금 modal에서 prop으로 받아 사용가능하게한다
  };

  const handlerUpdate = async () => {
    const param = {
      title: title.current.value,
      context: context.current.value,
      noticeSeq,
    };
    const update = await postNoticeApi<IPostResponse>(Notice.getUpdate, param);

    if (update.result === "success") {
      alert("성공했습니다.");
      onSuccess();
    } else if (update.result === "fail") {
      alert("실패했습니다.");
      onSuccess();
    }
    // axios.post("/board/noticeUpdateBody.do", param).then((res: AxiosResponse<IPostResponse>) => {
    //   res.data.result === "success" && onSuccess();
    // });
  };

  const handlerDelete = async () => {
    const param = {
      noticeSeq,
    };
    const noticeDelete = await postNoticeApi<IPostResponse>(Notice.getDelete, param);

    if (noticeDelete.result === "success") {
      alert("성공했습니다.");
      onSuccess();
    } else if (noticeDelete.result === "fail") {
      alert("실패했습니다.");
      onSuccess();
    }

    // axios.post("/board/noticeDeleteBody.do", param).then((res: AxiosResponse<IPostResponse>) => {
    //   res.data.result === "success" && onSuccess();
    // });
  };

  return (
    <NoticeModalStyled>
      <div className="container">
        <label>
          제목 :<input type="text" ref={title} defaultValue={noticeDetail?.title}></input>
        </label>
        <label>
          내용 : <input type="text" ref={context} defaultValue={noticeDetail?.content}></input>
        </label>
        파일 :<input type="file" id="fileInput" style={{ display: "none" }}></input>
        <label className="img-label" htmlFor="fileInput">
          파일 첨부하기
        </label>
        <div>
          <div>
            <label>미리보기</label>
            <img src="" />
          </div>
        </div>
        <div className={"button-container"}>
          <button onClick={noticeSeq ? handlerUpdate : handlerSave}>{noticeSeq ? "수정" : "등록"}</button>
          {noticeSeq && <button onClick={handlerDelete}>삭제</button>}
          <button onClick={handlerModal}>나가기</button>
        </div>
      </div>
    </NoticeModalStyled>
  );
};
