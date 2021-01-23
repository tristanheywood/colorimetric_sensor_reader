import React from 'react';
import { PickedCircle, ClipboardContent, PickStats, UIState, FolderImage, ActiveImage, ReadBlotch } from './protobuf_js/types_pb'

class SotcatContainer extends React.Component<{}, {uiState: UIState}> {

  constructor(props: {}) {
    super(props)
    this.state = {
      uiState: new UIState()
    }
  }

  render() {
    return (
      <Sotcat
        uiState = {this.state.uiState}
        request = {this.do_request.bind(this)}
        baseURL = {'http://localhost:8000'}
      />
    )
  }

  do_request(url: string, body: any = undefined) {

    let fetchProm;

    if (body) {
      fetchProm = fetch(url, {
        method: 'POST',
        body: body
      });
    } else {
      fetchProm = fetch(url);
    }
    fetchProm.then((res: Response) => {
      console.log(res);
      return res.arrayBuffer()
    }).then((buff: ArrayBuffer) => {
      let uiState = UIState.deserializeBinary(buff as Uint8Array);
      this.setState({
        uiState: uiState
      });
    })
  }
}

type SotcatProps = {
  uiState: UIState,
  request: (url: string, body?: any) => void,
  baseURL: string,
}

type SotcatState = {
  clipboardContent: ClipboardContent,
  selectedScanFname: string,
}

type Point = {
  x: number,
  y: number,
}


class Sotcat extends React.Component<SotcatProps, SotcatState> {

  amDrawingCircle: boolean;
  circleCenter?: Point;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgElement: HTMLImageElement;

  constructor(props: SotcatProps) {
    super(props);
    this.state = {
      clipboardContent: new ClipboardContent(),
      selectedScanFname: "",
    }
    this.amDrawingCircle = false;
    this.circleCenter = undefined;
    this.canvasRef = React.createRef();
    this.imgElement = new Image();
    console.log('Socat.constructor()')

  }

  componentDidMount() {
    // fetch('http://localhost:8000/pic')
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       console.log(result);
    //       // this.setState({
    //       //   imgData: result.imgData
    //       // })
    //       // let img = <img
    //       //   src={`data:image/png;base64,${imgData}`}
    //       //   width="800"
    //       // />;
    //       let img = new Image();
    //       // window.globals = {};
    //       // window.globals.img = img;
    //       // window.globals.ctx = this.ctx;
    //       img.src = `data:image/png;base64,${result.imgData}`;
    //       img.onload = () => {
    //         console.log("img.onload");

    //         this.setState({
    //           img: img,
    //         }, () => {
    //           this.canvasRef.current!.getContext("2d")!.drawImage(img, 0, 0, img.width * this.imgScale, img.height * this.imgScale);
    //         })

    //       }
    //     }
    //   )
  }

  render() {
    console.log("Sotcat.render()");
    return (
      <div style={{
        // border: "1px solid black",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        // backgroundColor: "rgba(252, 210, 207, 0.8)"
        backgroundColor: "dimgray",
      }}>
        {/* <img src="http://localhost:8000/image_bytes/test_uuid.png"/> */}
        <ScanViewer
          // onScanSelected={(fname: string) => {

          //   this.setState({
          //     selectedScanFname: fname,
          //     drops: [],
          //     clipboardContent: new ClipboardContent(),
          //   })

          //   let url = new URL('http://localhost:8000/select_scan')
          //   url.search = new URLSearchParams({
          //     fname: fname,
          //   }).toString();

          //   fetch(url.toString())
          //     .then(res => res.json())
          //     .then((result) => {
          //       console.log(result)

          //       let img = new Image();
          //       img.src = `data:image/png;base64,${result.imgData}`;
          //       img.onload = () => {
          //         this.setState({
          //           img: img,
          //         }, () => {
          //           this.canvasRef.current!.getContext("2d")!.drawImage(img, 0, 0, img.width * this.imgScale, img.height * this.imgScale);
          //         })
          //       }
          //     })

          // }}
          uiState = {this.props.uiState}
          request = {this.props.request}
          baseURL = {this.props.baseURL}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
            <canvas
              id="canvas"
              // width={(this.state.img && this.state.img!.width * this.imgScale) || "1600"}
              // height={(this.state.img && this.state.img!.height * this.imgScale) || "1000"}
              // width = "1600"
              // height = "1000"
              ref={this.canvasRef}
              onMouseDown={(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
                let canvas: HTMLCanvasElement = event.target as HTMLCanvasElement;

                if (this.amDrawingCircle) {
                  this.amDrawingCircle = false;
                  // return;

                  let imgScale = this.props.uiState.getActiveimage()?.getDownsamplefactor()!

                  this.postCircle(
                    {
                      x: this.circleCenter!.x * imgScale,
                      y: this.circleCenter!.y * imgScale,
                    },
                    this.getRadius(this.circleCenter!, this.getMousePosOnCanvas(canvas, event)) / imgScale
                  );
                  return;
                }
                this.amDrawingCircle = true;
                let pointer = this.getMousePosOnCanvas(canvas, event);
                this.circleCenter = pointer;

                let ctx = canvas.getContext("2d")!;


                this.drawCircle(ctx, pointer, 4, 'black');
                this.drawCircle(ctx, pointer, 6, 'black');
                this.drawCircle(ctx, pointer, 5, 'white');
              }}
              onMouseMove={(event) => {
                let canvas: HTMLCanvasElement = event.target as HTMLCanvasElement;

                if (!this.amDrawingCircle) {
                  return;
                }

                let pointer = this.getMousePosOnCanvas(canvas, event);

                let radius = this.getRadius(this.circleCenter!, pointer);

                if (radius > 2) {
                  let ctx = canvas.getContext("2d")!;

                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  // ctx.drawImage(this.state.img!, 0, 0, this.state.img!.width * this.imgScale, this.state.img!.height * this.imgScale);
                  ctx.drawImage(this.imgElement, 0, 0);
                  this.drawSelection(ctx, this.circleCenter!, radius);
                }
              }
            }
            style = {{
              backgroundImage: this.props.baseURL + '/image_bytes/' + this.props.uiState.getActiveimage()?.getImgdatavfn(),
              border: "1px solid red"
            }}
            >
              {/* <img src = {this.props.baseURL + '/image_bytes/' + this.props.uiState.getActiveimage()?.getImgdatavfn()}/> */}
            </canvas>
                  <div style={{
          display: "flex",
        }}>
          <ClipboardView
            content={this.state.clipboardContent}
          />
        </div>
        </div>
        <div style={{
          display: "flex",
        }}>
          {/* {this.state.drops} */}
          <BlotchCircleDisp
            blotches = {this.props.uiState.getActiveimage()?.getReadblotchesList() || []}
            baseURL = {this.props.baseURL}
          />
        </div>
      </div>
    )
  }

  componentDidUpdate() {
    this.imgElement = new Image();
    this.imgElement.src = this.props.baseURL + '/image_bytes/' + this.props.uiState.getActiveimage()?.getImgdatavfn();
    this.imgElement.onload = () => {
      this.canvasRef.current!.width = this.imgElement.width;
      this.canvasRef.current!.height = this.imgElement.height;
      this.canvasRef.current!.getContext('2d')!.drawImage(this.imgElement, 0, 0);
    }
  }

  drawSelection(ctx: CanvasRenderingContext2D, centerXY: Point, radius: number) {
    this.drawCircle(ctx, centerXY, radius - 1, 'black');
    this.drawCircle(ctx, centerXY, radius + 1, 'black');
    this.drawCircle(ctx, centerXY, radius, 'white');
  }

  postCircle(center: { x: number, y: number }, radius: number) {

    let pc = new PickedCircle();
    pc.setCentercol(center.x);
    pc.setCenterrow(center.y);
    pc.setRadius(radius);
    pc.setImgfilename(this.props.uiState.getActiveimage()?.getFilename()!);

    let msg = pc.serializeBinary();

    this.props.request(this.props.baseURL + '/new_circle', msg);

    // fetch('http://localhost:8000/new_circle', {
    //   method: 'POST',
    //   // body: JSON.stringify({
    //   //   center: center,
    //   //   radius: radius,
    //   //   fname: this.state.selectedScanFname,
    //   // })
    //   body: msg,
    // }).then(res => res.json())
    //   .then((result) => {
    //     console.log(result);
    //     this.setState(prevState => ({
    //       drops: [...prevState.drops, <Drop
    //         contextPicB64={result.circContext}
    //         colourComparePicB64={result.colourCompare}
    //         key={this.state.drops.length}
    //       />],
    //       clipboardContent: ClipboardContent.deserializeBinary(result.clipboardContent),
    //     }))
    //   })
  }

  drawCircle(ctx: CanvasRenderingContext2D, locXY: Point, radius: number, colour: string) {
    ctx.beginPath();
    ctx.strokeStyle = colour;
    ctx.arc(locXY.x, locXY.y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
  }

  getMousePosOnCanvas(canvas: HTMLCanvasElement, event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

  getRadius(center: Point, pointer: Point) {
    return Math.sqrt(
      (pointer.x - center.x) ** 2 + (pointer.y - center.y) ** 2
    ) / 5;
  }
}

// ReactDOM.render(
//   <Socat />,
//   document.getElementById('root')
// );

type DropProps = {
  contextVFN: string,
  compareVFN: string,
  baseURL: string,
};

type DropState = {

};

class Drop extends React.Component<DropProps, DropState> {

  constructor(props: DropProps) {
    super(props)
  }

  render() {
    return (
      <div style={{
        border: "1px solid blue",
        display: "flex",
        flexDirection: "column",
      }}>
        <div>
          <img
            // src={`data:image/png;base64,${this.props.contextPicB64}`}
            src = {this.props.baseURL + '/image_bytes/' + this.props.contextVFN}
            width="150"
          />
        </div>
        <div>
          <img
            // src={`data:image/png;base64,${this.props.colourComparePicB64}`}
            src = {this.props.baseURL + '/image_bytes/' + this.props.compareVFN}
            width="150"
          />
        </div>
      </div>
    )
  }
}

class ClipboardView extends React.Component<{ content: ClipboardContent }, {}> {

  thStyle = {textAlign: "center",  width: 40,};
  trStyle = {
    borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
  };

  render() {
    // console.log(this.props.content.getRowsList().map(row => {
    //   <tr>
    //     {row.split("\t").map(elt => {
    //       <td>
    //         {elt}
    //       </td>
    //     })}
    //   </tr>
    // }));
    return (
      <table style = {{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        border: "1px solid rgba(0, 0, 0, 0.2)",
        borderRadius: 5,
        margin: 3,
        borderCollapse: "collapse",
      }}>
        <thead style = {{
          borderBottom: "1px solid gray",
          borderRadius: 5,
        }}>
          <tr style = {this.trStyle}>
            {["", "μR", "μG", "μB","%R", "%G", "%B", "σR", "σG", "σB", ].map((header, idx) => {
              console.log(idx, idx % 3 == 1);
              return (
              <th style = {{
                textAlign: "center",
                width: 40,
                borderRight: idx % 3 == 0 ? "1px solid rgba(0, 0, 0, 0.2)" : undefined
              }}>{header}</th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {this.props.content.getRowsList().map((row: PickStats) =>
            <tr style = {this.trStyle}>
              {[
                <td style = {{
                  borderRight: "1px solid rgba(0, 0, 0, 0.2)",
                }}>
                  <div style = {{
                    backgroundColor: `rgb(${[row.getMur(), row.getMub(), row.getMug()].join(",")})`,
                    width: 20,
                    marginLeft: 10,
                    height: "100%",
                    borderRadius: 2,
                  }}/>
                </td>
              ].concat([row.getMur(), row.getMug(), row.getMub(), row.getPercr(), row.getPercg(), row.getPercb(), row.getSigmar(), row.getSigmag(), row.getSigmab()].map((elt, idx) =>
                <td style={{
                  textAlign: "center",
                  borderRight: idx == 2 ? "1px solid rgba(0, 0, 0, 0.2)" : undefined,
                }}>
                  {elt}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

type ScanViewerProps = {
  uiState: UIState;
  request: (url: string) => void;
  baseURL: string;
}

class ScanViewer extends React.Component<ScanViewerProps, {}> {

  selectedTNRef: React.RefObject<HTMLImageElement>;
  scansDivRef: React.RefObject<HTMLDivElement>;

  constructor(props: ScanViewerProps) {
    super(props)

    this.selectedTNRef = React.createRef();
    this.scansDivRef = React.createRef();
  }

  render() {
    return (
      <div style={{
        // border: "1px solid black",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        minHeight: 100,
      }}>
        <div>
          <button
            style={{
              height: "100%",
              width: 70,
              fontSize: 12,
              marginRight: 3,
            }}
            onClick={() => {
              this.props.request(this.props.baseURL + '/open_folder');
              // fetch('http://localhost:8000/open_folder')
                // .then(res => res.json())
                // .then(res => {
                //   console.log(res)

                //   if (!res.hasImages) {
                //     alert("Selected Folder is Empty");
                //     return;
                //   }

                //   res.thumbnails.map((tn: { fileName: string, img: string }) => {
                //     this.setState(prevState => ({
                //       thumbnails: [...prevState.thumbnails, {
                //         fileName: tn.fileName,
                //         img64: tn.img,
                //       }]
                //     }), () => {
                //       this._on_selection(0);
                //     })
                //   });
                // })
            }}
          >Open Folder</button>
        </div>
        <div>
          <button
            style={{
              height: "100%",
              width: 50,
              marginRight: 3,
            }}
            onClick={() => {
              this._on_selection(this.props.uiState.getSelectedfolderimgidx() - 1);
            }}
          >◀</button>
        </div>
        <div>
          <button
            style={{
              width: 50,
              height: "100%",
              marginRight: 3,
            }}
            onClick={() => {
              this._on_selection(this.props.uiState.getSelectedfolderimgidx() + 1);
            }}
          >▶</button>
        </div>
        <div
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
          ref={this.scansDivRef}
        >
          {/* {this.state.thumbnails.map((tn, i) => <img
            key={i}
            src={`data:image/png;base64,${tn.img64}`}
            width="150"
            style={i == this.state.selectedIdx ? {
              border: "3px solid rgb(112, 167, 255)",
              borderRadius: 5,
              boxShadow: "0 4px 8px 0 rgba(0, 0, 50, 0.4), 0 6px 20px 0 rgba(0, 0, 50, 0.4)",
              marginRight: 3,
            } : {
              marginRight: 3,
            }}
            ref={i == this.state.selectedIdx ? this.selectedTNRef : undefined}
            onClick={() => {
              this._on_selection(i);
            }}
          />)} */}
          {this.props.uiState.getOpenfolder()?.getFolderimagesList().map((fi: FolderImage, idx) => (
            <img
              key={idx}
              src={this.props.baseURL + "/image_bytes/" + fi.getThumbnailimgvfn()}
              width="150"
              style={idx == this.props.uiState.getSelectedfolderimgidx() ? {
                border: "3px solid rgb(112, 167, 255)",
                borderRadius: 5,
                boxShadow: "0 4px 8px 0 rgba(0, 0, 50, 0.4), 0 6px 20px 0 rgba(0, 0, 50, 0.4)",
                marginRight: 3,
              } : {
                marginRight: 3,
              }}
              ref={idx == this.props.uiState.getSelectedfolderimgidx() ? this.selectedTNRef : undefined}
              onClick={() => {
                this._on_selection(idx);
            }}
            />
          ))}
        </div>
      </div>
    )
  }

  componentDidUpdate() {
    let selectedPos = this.selectedTNRef.current!.offsetLeft;
    this.scansDivRef.current!.scrollLeft = selectedPos - 400;
  }

  _on_selection(selectedIdx: number) {
    if (selectedIdx == this.props.uiState.getSelectedfolderimgidx() || selectedIdx < 0 || selectedIdx >= this.props.uiState.getOpenfolder()!.getFolderimagesList()!.length) {
      return;
    }
    let url = new URL('http://localhost:8000/select_scan')
    url.search = new URLSearchParams({
      fname: this.props.uiState.getOpenfolder()?.getFolderimagesList()[selectedIdx].getFilename()!,
      selectedIdx: selectedIdx.toString(),
    }).toString();
    this.props.request(url.toString());

    // this.props.onScanSelected(this.state.thumbnails[selectedIdx].fileName);
    // this.setState({
    //   selectedIdx: selectedIdx
    // }, () => {
    //   let selectedPos = this.selectedTNRef.current!.offsetLeft;
    //   console.log(selectedPos);
    //   this.scansDivRef.current!.scrollLeft = selectedPos - 400;
    // })
  }
}

type BlotchCircleDispProps = {
  blotches: Array<ReadBlotch>,
  baseURL: string,
}

class BlotchCircleDisp extends React.Component<BlotchCircleDispProps, {}> {

  render() {
    return (
      <div>
        {this.props.blotches.map((rb: ReadBlotch) => {
          return (<Drop
            baseURL = {this.props.baseURL}
            contextVFN = {rb.getContextvfn()}
            compareVFN = {rb.getComparevfn()}
          />)
        })}
      </div>
    )
  }

}

export default SotcatContainer;
