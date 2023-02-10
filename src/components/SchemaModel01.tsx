import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../store/modules/reducer";
import { AppDispatch } from "../store/index";
import { useState, CSSProperties, useEffect } from "react";
import { getAbilityData } from "../store/modules/data_action/ability";

const setList = [{
  id: 1,
  setName: 'name',
  setValue: '10'
}];

type RateValue = {id:number;setValue:string;setName:string};

export function SchemaModel01() {
  const dispatch: AppDispatch = useDispatch();
  const abilityList = useSelector((state: { base: RootStore }) => {
    return state.base.ability.abilityList
  });
  const [inputList,setInputList] = useState<RateValue[]>(setList)

  const viewSetAction = () => {
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

  const inputAddAction = () => {
    setInputList([...inputList,{id: inputList.length+1,setValue: '',setName: ''}])
  }

  const inputEditAction = (id:number,key: string,value: string) => {
    const list = inputList.map((inputItem) => {
      if(id === inputItem.id) {
        return {
          ...inputItem,
          [key]: value
        }
      }
      return inputItem;
    })
    setInputList(list)
  }

  const totalNumber = () => {
    let setNumber = 0;
    inputList.forEach((item) => {
      setNumber = setNumber + Number(item.setValue)
    })
    return setNumber;
  }

  const setWidth = (value:string):CSSProperties => {
    const num = Math.round((Number(value)/totalNumber())*10)/10;
    const color = Math.floor(Math.random()*16777215).toString(16)
    return { width: `${(num ?? 1)*100}%`, backgroundColor: `#${color}` }
  }

  useEffect(() => {
    dispatch(getAbilityData('/ability01.json'))
  },[])

  return <div className="SchemaModel01">
    <div className='content'>
      <button onClick={viewSetAction}>set</button>
      <div className="setting-box">
        <div className="fields p-1">
          <div className="field">
            <button className="btn" onClick={inputAddAction}>add</button>
          </div>
          <div className="p-1">
            {inputList.map((item,index) => <div key={item.id} className="field">
              <label htmlFor={`viewer${index}`}>No{item.id}
                <input
                  type="number"
                  step={0.5}
                  id={`viewer${index}`}
                  value={item.setValue}
                  className="input"
                  onChange={(e) => {
                    inputEditAction(item.id,'setValue',e.target.value)
                  }}
                />
              </label>
              <label htmlFor={`viewerName${index}`}>name | {item.id}
                <input type="text"
                  id={`viewerName${index}`}
                  value={item.setName}
                  onChange={(e) => {
                    inputEditAction(item.id,'setName',e.target.value)
                  }}
                />
              </label>
            </div>)}
          </div>
          <div className="field">
            <ul className="list">
              <li className="item">total : {totalNumber()}</li>
              <li className="item">
                <div className="setnumber-view s-flex">
                  {inputList.map((item,index) => <div key={index} className="view-item p-1" style={item.setValue ? setWidth(item.setValue) : {}}>
                    {item.id}
                    <div className="info box-shadow">
                      <p>{item.setValue}</p>
                      <p>{item.setName}</p>
                    </div>
                  </div>)}
                </div>
                {totalNumber()}
              </li>
            </ul>
            {abilityList.map((item) => {
              return <>{item.id}</>
            })}
          </div>
        </div>
      </div>
    </div>
  </div>
}
