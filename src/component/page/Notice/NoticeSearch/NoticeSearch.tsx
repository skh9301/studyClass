import { NoticeSearchStyled } from "./styled";
import { Button } from "../../../common/Button/Button";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";

export const NoticeSearch = () => {
  const title = useRef<HTMLInputElement>();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const navigate = useNavigate();
  const [modal, setModal] = useRecoilState<boolean>(modalState);

  useEffect(() => {
    window.location.search && navigate(window.location.pathname, { replace: true });
  }, [navigate]);

  const handlerSearch = () => {
    const query: string[] = [];

    !title.current.value || query.push(`searchTitle=${title.current.value}`);
    !startDate || query.push(`searchStDate=${startDate}`);
    !endDate || query.push(`searchEdDate=${endDate}`);

    const querString = query.length > 0 ? `?${query.join("&")}` : "";
    navigate(`/react/board/notice.do${querString}`);
  };

  const handlerModal = () => {
    setModal(!modal);
  };

  return (
    <NoticeSearchStyled>
      <div className="input-box">
        <input ref={title}></input>
        <input type="date" onChange={(e) => setStartDate(e.target.value)}></input>
        <input type="date" onChange={(e) => setEndDate(e.target.value)}></input>
        <Button onClick={handlerSearch}>검색</Button>
        <Button onClick={handlerModal}>등록</Button>
      </div>
    </NoticeSearchStyled>
  );
};
