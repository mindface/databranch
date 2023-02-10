import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../store/modules/reducer";
import { AppDispatch } from "../store/index";

import { SchemaModel01 } from "./SchemaModel01";

export function ContentSchema() {
  const dispatch: AppDispatch = useDispatch();
  const cardList = useSelector((state: { base: RootStore }) => {
    return state.base.card.cards
  });

  const addAction = () => {
    const addItem = {
      id: 1,
      name: "title02",
      x: 20,
      y: 20,
      content: "tetetetet",
      contentId: "1",
    }
    dispatch({type:'card/add',card:addItem})
  }

  return <div className="ContentSchema">
    <div className='content'>
      <button onClick={addAction}>add</button>
      {cardList.length && cardList.map((item,index) => 
        <div key={index} className="item">{item.name}</div>
      )}
      <SchemaModel01 />
    </div>
  </div>
}
