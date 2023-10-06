import { createSlice } from "@reduxjs/toolkit";
const fileReader = new FileReader();
fileReader.onload = ()=>{
    const data = fileReader.result;
    console.log(data)
}
// fileReader.readAsDataURL(file1)
const path1 = "pdfs/make a pdf.pdf";
const path2 = "pdfs/generated.pdf";
fetch(path1)
.then((result)=>result.blob)
// .then(blob=>fileReader.readAsDataURL(blob))

const initialState ={
    pdfUrl: path1,
    loading: false,
    pdfData: 1,
    counter: 0
}
const pdfSlice = createSlice({
    name:"pdf",
    initialState,
    reducers:{
        togglePdf:(state,action)=>{
            console.log("Alternating")
            state.counter++;
            if(state.counter % 2){
                state.pdfUrl=path2
                state.pdfData= 2
            }else{
                state.pdfUrl=path1
                state.pdfData= 1
            }
        }
    }
})
export const {togglePdf} = pdfSlice.actions
export default pdfSlice