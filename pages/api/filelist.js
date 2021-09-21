// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Request, Response } from "express";
import fs from "fs";

export const config = {
  api: {
    bodyParser: true,
  },
};


export default function filelist(req,res){
  console.log("pepe",req.body.pepe)
  console.log("body",req.body.dir)
        fs.readdir(req.body.dir, (err, files) => {
          err ? 
            res.status(404).send(err) 
          :
            res.status(200).send(files)
        
    });
}


