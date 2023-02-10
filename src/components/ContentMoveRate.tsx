import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../store/modules/reducer";
import { AppDispatch } from "../store/index";

export function ContentMoveRate() {
  const dispatch: AppDispatch = useDispatch();
  const cardList = useSelector((state: { base: RootStore }) => {
    return state.base.card.cards
  });

  return <div className="ContentMoveRate">
    <div className='content'>
      <div className="fields">
        <div className="field"></div>
        <div className="field"></div>
        <div className="field"></div>
      </div>
    </div>
  </div>
}
