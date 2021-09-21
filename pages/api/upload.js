// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Request, Response } from "express";
import { File } from "formidable";
import Formidable from "formidable-serverless";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function uploadFormFiles(req,res) {
  return new Promise(async (resolve, reject) => {
    
    const form = new Formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
    });

    form
      .on("file", (f, file) => {
        const data = fs.readFileSync(file.path);
        let dir = "./documents/"
        let dest = dir + Date.now()
        let filename = renamer(file.name)

        !fs.existsSync(dest) && fs.mkdirSync(dest, { recursive: true });
        fs.writeFileSync(`${dest}/${filename}`, data);
        fs.writeFileSync(`${dest}/${filename}.txt`, f);
        fs.unlinkSync(file.path);
      })
      
      .on("aborted", () => { reject(res.status(500).send('Aborted'))  })
      .on("end", () => {
        resolve(res.status(200).send('done')) ; 
        
      
      });

    await form.parse(req)
  });
}


function renamer(originalFilename,userId = "001") {
  
  let nameInParts = originalFilename.toLocaleLowerCase('en-US').split(".")
  
  let fileType = "." + nameInParts[nameInParts.length - 1]

  console.log(aceptedFileTypes(fileType)?"Tipo aceptado":"Tipo no aceptado")

  return`${userId}-${Date.now()}${fileType}`
    
}


function aceptedFileTypes(fileType){
  console.log(fileType)
  return [".pdf",".doc",".docx",".xls",".xlsx",".xlsm",".tif"].includes(fileType)
}