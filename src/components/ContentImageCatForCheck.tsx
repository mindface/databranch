import React, { useEffect ,ChangeEventHandler, useState, useRef, Fragment } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../store/modules/reducer";
import { AppDispatch } from "../store/index";
import { FabricMaker } from "../lib/fabric";
import { fabric } from 'fabric';
import { PartsLangRate } from "./PartsLangRate";
import { PartsDiffWrite } from "./PartsDiffWrite";

export function ContentImageCatForCheck() {
  const dispatch: AppDispatch = useDispatch();
  const video = useRef<HTMLVideoElement>(null);
  const [partsNumber,setPartsNumber] = useState(1);
  const [addText,setAddText] = useState('');
  const canvas = useRef<HTMLCanvasElement>(null);
  const writeCanvas = useRef<HTMLCanvasElement>(null);
  const writeCanvasContent = useRef<HTMLDivElement>(null);
  const videoFile = useRef<HTMLInputElement>(null);
  const putImgArea = useRef<HTMLDivElement>(null);
  const [fabricCanvas,setFabricCanvas] = useState(new fabric.Canvas(''));
  const cardList = useSelector((state: { base: RootStore }) => {
    return state.base.card.cards
  });
  const movePath = {
    x1: 10,
    y1: 30,
    x2: 40,
    y2: 60,
  }

  const addImage = (imgSrc?: string) => {
    const newImg = document.querySelector('.view-img img') as HTMLImageElement;
    if(!newImg) return;
    const fabricImage = new fabric.Image(newImg, {
      left: 100,
      top: 100,
    });
    fabricCanvas.add(fabricImage);
  }

  const addMovieLoadAction: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.currentTarget?.files![0]
    const url = URL.createObjectURL(file)
    if(!video.current) return;
    video.current!.src = url;
    // canvasに描画する場合
    // video.current?.addEventListener('timeupdate' , (e) => {
    // const ctx = canvas.current?.getContext('2d');
    //   const w = video.current?.clientWidth;
    //   const h = video.current?.clientHeight;
    //   canvas.current!.width = w ?? 100;
    //   canvas.current!.height = h ?? 100;
    //   ctx?.drawImage(video.current!,0,0,w!,h!);
    // })
  }
  const RowaddMovieAction = () => {
    canvas.current?.toBlob((result) => {
      const imgBox = document.createElement('div');
      imgBox.className = 'img-box';
      const newImg = fabric.util.createImage();
      const url = URL.createObjectURL(result!);
      // putImgArea.current?.appendChild(newImg);
      newImg.onload = function() {
        URL.revokeObjectURL(url);
        const fabricImage = new fabric.Image(newImg,{
          top: 10,
          left: 10,
          padding: 10,
        });
        fabricCanvas.add(fabricImage);
        fabricCanvas.renderAll();
      };
      fabric.util.loadImage(url, img => {
        const fabImage = new fabric.Image(img as unknown as HTMLImageElement);
        fabricCanvas.add(fabImage);
        // fabricCanvas.current.renderAll();
      })
    });
  }

  const addMovieAction = () => {
    const canvasElement = document.createElement('canvas');
    if(!video.current) return;
      const ctx = canvasElement?.getContext('2d');
      const w = video.current?.clientWidth;
      const h = video.current?.clientHeight;
      canvasElement!.width = w ?? 100;
      canvasElement!.height = h ?? 100;
      ctx?.drawImage(video.current!,0,0,w!,h!);
      canvasElement?.toBlob((result) => {
        const url = URL.createObjectURL(result!);
        fabric.util.loadImage(url, img => {
          const fabImage = new fabric.Image(img as unknown as HTMLImageElement);
          fabricCanvas.add(fabImage);
        });
      });
  }

  const addTextAction = () => {
    const text = new fabric.IText(addText, {
      left: 55,
      top: 30,
      fontFamily: 'helvetica',
      fill: '#f55',
      angle: 0,
    });
    fabricCanvas.add(text);
  }

  const addRectAction = () => {
    const rect = new fabric.Rect({
      width: 100,
      height: 100,
      top: 10,
      left: 10,
      fill: 'rgba(255,0,0,0.5)'
    });
    fabricCanvas.add(rect);
  }

  const addCircleAction = () => {
    const circle = new fabric.Circle({
      radius: 30, fill: '#f55', top: 100, left: 100
    });
    fabricCanvas.add(circle);
  }

  const addlineAction = () => {
    const line = FabricMaker().makeLine([movePath.x1,movePath.y1,movePath.x2,movePath.y2]);
    fabricCanvas.add(line);
  }

  const addPanelAction = () => {
    const line = FabricMaker().makeLine([movePath.x1,movePath.y1,movePath.x2,movePath.y2]);
    const c1 = FabricMaker().makeCircle(movePath.x1,movePath.y1);
    const c2 = FabricMaker().makeCircle(movePath.x2,movePath.y2);
    fabricCanvas.on('object:moving', (e) => {
      const canvas = e.target?.canvas as fabric.Canvas
      const line_ = canvas._objects
      line.y1 = e.target?.top;
    });
    fabricCanvas.add(c1,c2,line);
  }

  const deleteAction = () => {
    const obj = fabricCanvas.getActiveObject();
    if(obj) {
      fabricCanvas.remove(obj);
    }
  }

  useEffect(() => {
    setFabricCanvas(new fabric.Canvas(writeCanvas.current,{
      renderOnAddRemove: true,
    }));
    fabricCanvas.selection = true;
    const w = writeCanvasContent.current?.clientWidth;
    const h = writeCanvasContent.current?.clientHeight;

    fabricCanvas.setWidth(w ?? 200);
    fabricCanvas.setHeight(h ?? 300);
    writeCanvas.current!.width = w ?? 200;
    writeCanvas.current!.height = h ?? 300;
  },[]);

  const imgDownload = () => {
    const a = document.createElement('a');
    const hrefData = writeCanvas.current?.toDataURL('imagew/png');
    if(!hrefData) return;
    a.href = hrefData;
    a.download = 'canvas.png'
    a.click();
  }

  return <div className="ContentImageCatForCheck">
    <div className='content'>
      <div className="content-part-action p-b2">
        <button onClick={() => setPartsNumber(1)}>PartsLangRate</button>
        <button onClick={() => setPartsNumber(2)}>PartsDiffWrite</button>
      </div>
      <div className="content-header">
        <input type="file" ref={videoFile} onChange={addMovieLoadAction} />
        <button onClick={addMovieAction}>addMovieAction</button>
        <button onClick={() => addImage()}>addImage</button>
      </div>
      <div className="view-contents">
        <div className="view-content video">
          <video controls ref={video}></video>
        </div>
        <div className="view-content canvas">
          <div className="controls">
            <button onClick={() => video.current?.play()}>start</button>
            <button onClick={() => video.current?.pause()}>pause</button>
          </div>
          <canvas ref={canvas}></canvas>
        </div>
        <div className="view-img" ref={putImgArea}>
        </div>
      </div>
      <div className="btn-action">
        <span className='box'>
          <input type="text" value={addText} onChange={(e) => setAddText(e.target.value)} />
          <button onClick={addTextAction} >add text</button>
        </span>
        <button onClick={() => addRectAction()} >add rect</button>
        <button onClick={() => addCircleAction()}>addCircle</button>
        <button onClick={() => addlineAction()}>addline</button>
        <button onClick={() => addPanelAction()}>addPanel</button>
        <button onClick={() => deleteAction()}>delete</button>
      </div>
      <div className="write-img" ref={writeCanvasContent}>
        <canvas className="write-canvas" height={400} ref={writeCanvas}></canvas>
        <button onClick={() => imgDownload()}>imgDownload</button>
      </div>
    </div>
    { partsNumber === 1 && <PartsLangRate /> }
    { partsNumber === 2 && <PartsDiffWrite /> }
  </div>
}
