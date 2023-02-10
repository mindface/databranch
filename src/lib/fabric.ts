import { fabric } from 'fabric';

export function FabricMaker() {
  fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
  const makeCircle = (left:number,top:number) => {
    const circle = new fabric.Circle({
      left: left,
      top: top,
      strokeWidth: 3,
      radius: 6,
      fill: '#fff',
      stroke: '#666'
    });
    circle.hasControls = circle.hasBorders = false;
    return circle
  }
  const makeLine = (coords:number[]) => {
    const line = new fabric.Line(coords,{
      fill: 'red',
      stroke: 'red',
      strokeWidth: 3,
      // selectable: false,
      // evented: false
    })
    return line
  }

  return {
    makeCircle,
    makeLine
  }
}
