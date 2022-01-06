// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import AdmZip from "adm-zip"
import { firebaseAdmin } from '../../lib/firebaseAdmin';
import fs from 'fs'

interface TextData {
  text: string,
  ext: string
}

interface Props {
  textdata: TextData[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { textdata }: Props = req.body
  const fileId = Math.random().toString(32).substring(2);
  const zip = new AdmZip();
  for(let item of textdata) {
    const name = 'file-' + fileId + '.' + item.ext;
    zip.addFile("./file/" + name, Buffer.from(item.text, "utf-8"));
  }
  const zipFileName = fileId + ".zip";
  const filePath = './files/' + zipFileName;
  zip.writeZip(filePath);

  const bucket = firebaseAdmin.storage().bucket()
  const file = await bucket.upload(filePath)
  const url = await bucket.file(zipFileName).getSignedUrl({
    action: 'read',
    expires: '12-31-2022'
  })
  fs.unlink(filePath, (err) => {
    if (err) throw err;
  });
  res.status(200).json({url})
}