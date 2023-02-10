import { ReactNode, useState } from 'react'

type Props = {
  dialogHeaderTitle?: string;
  content: ReactNode
  dialogFooterTitle?: string;
}

export default function Dialog(props: Props) {
  const [dialogView,setDialogView] = useState(false);

  return <div className="dialog-box">
    <button className='btn' onClick={() => setDialogView(true)}>open</button>
    <dialog className={dialogView ? "dialog on" : "dialog"}>
      {props.dialogHeaderTitle && <div className="dialog-header">{props.dialogHeaderTitle}</div>}
      <div className="dialog-content">{props.content}</div>
      <div className="dialog-footer">
        {props.dialogFooterTitle}
        <div className="btns"><button className='btn' onClick={() => setDialogView(false)}>close</button></div>
      </div>
    </dialog>
  </div>
}
