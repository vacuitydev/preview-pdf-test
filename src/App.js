import "./App.css";
import { useEffect, useRef, useState } from "react";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { PDFViewer } from "@react-pdf/renderer";
import { usePdf } from "@mikecousins/react-pdf";
import { useSelector } from "react-redux";
const path1 = "pdfs/make a pdf.pdf";
const path2 = "pdfs/generated.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
function App() {
  const [path, setPath] = useState(path1);
  const statePath = useSelector(state=>state.pdf.pdfUrl)
  const pdfData = useSelector(state=>state.pdf.pdfData)
  const [once, setOnce] = useState(false);
  const counter = useSelector(state=>state.pdf.counter)

  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);

  const { pdfDocument, pdfPage } = usePdf({
    file: pdfData,
    page,
    canvasRef,
  });
  const refreshingRef = useRef();
  const {refreshingPDFDocument, refreshingPDFPages} = usePdf({
    file:`${path1}?counter=${counter}`,
     page,
    canvasRef: refreshingRef}
  )

  const alternate = () => {
    if (once) {
      console.log("Once");
      setPath(path1);
      setOnce(false);
    } else {
      console.log("Twice");
      setOnce(true);
      setPath(path2);
    }
  };
  useEffect(() => {
    let i1;
    let i2;
    const runner = async () => {
      const duration = 5000;
      i1 = setInterval(() => {
        console.log("Once");
        setPath(path1);
      }, duration);
      await new Promise((resolve) => setInterval(resolve, duration));
      i2 = setInterval(() => {
        console.log("Twice");
        setPath(path2);
      }, duration);
    };
    runner();
    return () => {
      clearInterval(i1);
      clearInterval(i2);
    };
  }, []);
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }) {
    console.log("Pages", numPages)
    setNumPages(numPages);
  }
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#888",
        display: "flex",
        color: "#eee",
        fontSize:"3rem"
      }}
    >
      <div
        style={{
          flexGrow: "1",
          width: "100%",
          height: "100%",
          backgroundColor: "#123",
        }}
      >
        <div> Embedded</div>
        <embed
          src={`${path}#toolbar=0`}
          onContextMenu={() => {}}
          width="100%"
          height="100%"
        />
      </div>
      <div
        style={{
          flexGrow: "1",
          width: "100%",
          height: "100%",
          backgroundColor: "#123",
        }}
      >
        <div> With react pdf</div>

        <PDFViewer pdf={statePath}/>
      </div>
      <div
        style={{
          flexGrow: "1",
          width: "100%",
          height: "100%",
          backgroundColor: "#123",
        }}
      >
        <div>With McPDF</div>
        {!pdfDocument && <span>Loading...</span>}
        <canvas ref={canvasRef} />
        {Boolean( refreshingPDFDocument  && refreshingPDFDocument.numPages) && (
          <nav>
            <ul className="pager">
              <li className="previous">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                  Previous
                </button>
              </li>
              <li className="next">
                <button
                  disabled={page === pdfDocument.numPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
      <div
        style={{
          flexGrow: "1",
          width: "100%",
          height: "100%",
          backgroundColor: "#123",
        }}
      >
        <div>With McPDF and refreshing</div>
        {!refreshingPDFDocument && <span>Loading. {counter}..</span>}
        <canvas ref={refreshingRef} />
        {Boolean(refreshingPDFDocument && refreshingPDFDocument.numPages) && (
          <nav>
            <ul className="pager">
              <li className="previous">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                  Previous
                </button>
              </li>
              <li className="next">
                <button
                  disabled={page === pdfDocument.numPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>

      <div
        style={{
          flexGrow: "1",
          width: "100%",
          height: "100%",
          backgroundColor: "#123",
          color: "#eee",
          fontSize: "4rem",
        }}
      >
        Rest of the layout
      </div>
    </div>
  );
}

export default App;