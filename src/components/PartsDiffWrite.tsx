import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../store/modules/reducer";
import { AppDispatch } from "../store/index";

export function PartsDiffWrite() {
  const dispatch: AppDispatch = useDispatch();

  return <div className="PartDiffWrite box-shadow p-2">
    <div className="parts-content">
      <h3 className="parts-title p-b1">比較対象との差を記録</h3>
      <div className="parts-body">
        <div className="fields">
          <div className="fields-item p-b1">
            <label className="s-db" htmlFor="point">評価するポイント</label>
            <input type="text" id="point" className="w-100" />
          </div>
          <div className="fields-item p-b1">
            <label className="s-db" htmlFor="point-move">ポイントが連動する結果までの構造</label>
            <input type="text" id="point-move" className="w-100" placeholder="右手首を注意すると普通のスィングで右方向に飛ぶ" />
            <p>部分的に注意した箇所がプレーやコードに連動して調整されて結果に関与する例</p>
          </div>
          <div className="fields-item p-b1">
            <label className="s-db" htmlFor="point-result">結果とモデルのイメージの差</label>
            <input type="text" id="point-result" className="w-100" />
          </div>
          <div className="fields-item">
            <label className="s-db" htmlFor="point-detail">詳細</label>
            <textarea
              id="point-detail"
              className="w-100"
            />
          </div>    
        </div>
      </div>
    </div>
  </div>
}
