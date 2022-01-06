// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import AdmZip from "adm-zip"
import { firebaseAdmin } from '../../lib/firebaseAdmin';

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
  if(!textdata) {
    res.status(200).json({url: '#'})  
  }
  const fileId = Math.random().toString(32).substring(2);
  const zip = new AdmZip();
  for(const item of textdata) {
    const name = 'button-' + fileId + '.' + item.ext;
    zip.addFile(name, Buffer.from(item.text, "utf-8"));
  }

  const zipFileName = 'button-' + fileId + ".zip";
  const buffer = zip.toBuffer()
  const bucket = firebaseAdmin.storage().bucket()
  const file = bucket.file(zipFileName);
  await file.save(buffer, {
    metadata: {
      contentType: 'application/zip'
    }
  });
  const url = await bucket.file(zipFileName).getSignedUrl({
    action: 'read',
    expires: '12-31-2022'
  })
  res.status(200).json({url})
}